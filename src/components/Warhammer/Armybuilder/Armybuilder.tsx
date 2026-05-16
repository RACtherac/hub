import { useState, useRef, useEffect, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { useWarhammerData } from "../../../hooks/useWarhammerData";
import UnitCard from "../Unitcard/Unitcard";
import CharacterCard from "../CharacterCard/CharacterCard";
import type { UnitCategory, Faction, SuperFaction, Unit } from "../../../types/warhammer";

interface ArmyUnit {
  id: number;
  unitId: string;
  modelCount: number;
  wargear: string[];
  wargearCounts: Record<string, number>;
  attachedCharacter?: string;
  characterWargear: string[];
  attachedCharacter2?: string;
  characterWargear2: string[];
  attachedUnit?: string;
  attachedUnitWargear: string[];
  checkedNotes: string[];
  noteWeaponSelections: Record<string, string>;
  noteSlotSelections: Record<string, string[]>;
  noteCounts: Record<string, number>;
  transportedUnits: string[];
}

interface ArmyCharacter {
  id: number;
  characterId: string;
  wargear: string[];
}

interface ArmySave {
  id: string;
  faction: Faction;
  name: string;
  armyUnits: ArmyUnit[];
  armyCharacters: ArmyCharacter[];
  savedAt: string;
  totalPoints: number;
}

const SAVES_KEY = "army-builder-saves";

function readAllSaves(): ArmySave[] {
  try { return JSON.parse(localStorage.getItem(SAVES_KEY) || "[]"); }
  catch { return []; }
}

function writeSaves(saves: ArmySave[]) {
  localStorage.setItem(SAVES_KEY, JSON.stringify(saves));
}

function getSavesForFaction(faction: Faction): ArmySave[] {
  return readAllSaves().filter((s) => s.faction === faction);
}

const SUPERFACTIONS: Record<SuperFaction, Faction[]> = {
  imperium: ["space-marines", "astra-militarum", "adeptus-mechanicus", "adeptus-custodes", "adepta-sororitas", "grey-knights", "imperial-agents", "imperial-knights"],
  chaos:    ["chaos-space-marine", "death-guard", "thousand-sons", "world-eaters", "chaos-daemons", "chaos-knights", "emperors-children"],
  xenos:    ["tyranids", "necrons", "orks", "tau-empire", "aeldari", "drukhari", "genestealer-cults", "leagues-of-votann"],
};

const SUPERFACTION_LABELS: Record<SuperFaction, string> = {
  imperium: "Imperium",
  chaos: "Chaos",
  xenos: "Xenos",
};

const FACTION_LABELS: Record<Faction, string> = {
  "space-marines":      "Space Marines",
  "astra-militarum":    "Astra Militarum",
  "adeptus-mechanicus": "Adeptus Mechanicus",
  "adeptus-custodes":   "Adeptus Custodes",
  "adepta-sororitas":   "Adepta Sororitas",
  "grey-knights":       "Grey Knights",
  "imperial-agents":    "Imperial Agents",
  "imperial-knights":   "Imperial Knights",
  "chaos-space-marine": "Chaos Space Marines",
  "death-guard":        "Death Guard",
  "thousand-sons":      "Thousand Sons",
  "world-eaters":       "World Eaters",
  "chaos-daemons":      "Chaos Daemons",
  "chaos-knights":      "Chaos Knights",
  "emperors-children":  "Emperor's Children",
  "tyranids":           "Tyranids",
  "necrons":            "Necrons",
  "orks":               "Orks",
  "tau-empire":         "T'au Empire",
  "aeldari":            "Aeldari",
  "drukhari":           "Drukhari",
  "genestealer-cults":  "Genestealer Cults",
  "leagues-of-votann":  "Leagues of Votann",
};

const BASE_CATEGORIES: UnitCategory[] = ["battleline", "infantry", "mounted", "vehicle", "monster", "transport"];

const CATEGORY_COLORS: Record<string, string> = {
  battleline: "#4a9eff",
  infantry:   "#7ec87e",
  mounted:    "#c8a84a",
  vehicle:    "#e87c4a",
  transport:  "#a47ce8",
  monster:    "#e84a4a",
};

const s = {
  page: {
    minHeight: "100vh",
    background: "var(--bg)",
    color: "var(--text)",
    fontFamily: "var(--font-display)",
  } as React.CSSProperties,

  header: {
    borderBottom: "1px solid var(--border-2)",
    padding: "0 32px",
    display: "flex",
    alignItems: "stretch",
    gap: 0,
    background: "var(--surface)",
    position: "sticky" as const,
    top: 0,
    zIndex: 100,
  } as React.CSSProperties,

  headerTitle: {
    display: "flex",
    alignItems: "center",
    gap: "12px",
    padding: "16px 32px 16px 0",
    borderRight: "1px solid var(--border-2)",
    marginRight: "32px",
  } as React.CSSProperties,

  sigil: {
    width: "28px",
    height: "28px",
    background: "var(--accent)",
    clipPath: "polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)",
    flexShrink: 0,
  } as React.CSSProperties,

  titleText: {
    fontSize: "11px",
    fontFamily: "var(--font-mono)",
    letterSpacing: "0.2em",
    textTransform: "uppercase" as const,
    color: "var(--text-dim)",
  } as React.CSSProperties,

  titleMain: {
    fontSize: "15px",
    fontWeight: 700,
    letterSpacing: "0.08em",
    textTransform: "uppercase" as const,
    color: "var(--text)",
  } as React.CSSProperties,

  navGroup: {
    display: "flex",
    alignItems: "stretch",
    gap: 0,
    flex: 1,
  } as React.CSSProperties,

  sfBtn: (open: boolean, hasFaction: boolean): React.CSSProperties => ({
    background: open ? "var(--accent-dim)" : hasFaction ? "rgba(232,197,71,0.06)" : "none",
    border: "none",
    borderRight: "1px solid var(--border-2)",
    borderBottom: open ? "2px solid var(--accent)" : "2px solid transparent",
    color: hasFaction ? "var(--accent)" : open ? "var(--text)" : "var(--text-dim)",
    fontFamily: "var(--font-mono)",
    fontSize: "11px",
    fontWeight: 700,
    letterSpacing: "0.15em",
    textTransform: "uppercase",
    padding: "0 24px",
    cursor: "pointer",
    transition: "all 0.15s",
    display: "flex",
    alignItems: "center",
    gap: "8px",
    whiteSpace: "nowrap",
  }),

  sfDropdown: {
    position: "absolute" as const,
    top: "calc(100% + 1px)",
    left: 0,
    background: "var(--surface)",
    border: "1px solid var(--border-2)",
    borderTop: "2px solid var(--accent)",
    minWidth: "220px",
    zIndex: 200,
    boxShadow: "0 8px 32px rgba(0,0,0,0.7)",
  } as React.CSSProperties,

  pointsDisplay: {
    display: "flex",
    alignItems: "center",
    gap: "12px",
    padding: "16px 0 16px 32px",
    borderLeft: "1px solid var(--border-2)",
    marginLeft: "auto",
  } as React.CSSProperties,

  pointsLabel: {
    fontSize: "10px",
    fontFamily: "var(--font-mono)",
    letterSpacing: "0.15em",
    textTransform: "uppercase" as const,
    color: "var(--text-dim)",
  } as React.CSSProperties,

  pointsValue: {
    fontSize: "24px",
    fontFamily: "var(--font-mono)",
    color: "var(--accent)",
    fontWeight: 700,
    lineHeight: 1,
  } as React.CSSProperties,

  backBtn: {
    background: "none",
    border: "none",
    color: "var(--text-dim)",
    fontFamily: "var(--font-mono)",
    fontSize: "11px",
    letterSpacing: "0.1em",
    cursor: "pointer",
    padding: "8px 16px",
    marginLeft: "16px",
    transition: "color 0.15s",
  } as React.CSSProperties,

  body: {
    padding: "32px",
    maxWidth: "1100px",
    margin: "0 auto",
  } as React.CSSProperties,

  factionBar: {
    display: "flex",
    alignItems: "center",
    gap: "8px",
    marginBottom: "32px",
    flexWrap: "wrap" as const,
  } as React.CSSProperties,


  toolbar: {
    display: "flex",
    alignItems: "center",
    gap: "8px",
    marginBottom: "28px",
    paddingBottom: "20px",
    borderBottom: "1px solid var(--border)",
  } as React.CSSProperties,

  toolbarLabel: {
    fontSize: "10px",
    fontFamily: "var(--font-mono)",
    letterSpacing: "0.15em",
    color: "var(--text-dim)",
    textTransform: "uppercase" as const,
    marginRight: "4px",
  } as React.CSSProperties,

  categoryBtn: (active: boolean, disabled: boolean): React.CSSProperties => ({
    background: active ? "var(--accent-dim)" : "none",
    border: `1px solid ${active ? "var(--accent)" : "var(--border-2)"}`,
    color: active ? "var(--accent)" : disabled ? "var(--text-dim)" : "var(--text)",
    fontFamily: "var(--font-mono)",
    fontSize: "11px",
    letterSpacing: "0.1em",
    textTransform: "uppercase",
    padding: "8px 16px",
    cursor: disabled ? "not-allowed" : "pointer",
    opacity: disabled ? 0.5 : 1,
    transition: "all 0.15s",
    position: "relative",
  }),

  addBtn: (active: boolean): React.CSSProperties => ({
    background: active ? "var(--accent)" : "none",
    border: `1px solid ${active ? "var(--accent)" : "var(--border-2)"}`,
    color: active ? "#000" : "var(--text)",
    fontFamily: "var(--font-mono)",
    fontSize: "11px",
    fontWeight: 700,
    letterSpacing: "0.15em",
    textTransform: "uppercase",
    padding: "8px 20px",
    cursor: "pointer",
    transition: "all 0.15s",
    marginLeft: "auto",
  }),

  dropdown: {
    position: "absolute" as const,
    top: "calc(100% + 4px)",
    left: 0,
    background: "var(--surface)",
    border: "1px solid var(--border-2)",
    minWidth: "220px",
    zIndex: 50,
    boxShadow: "0 8px 32px rgba(0,0,0,0.6)",
  } as React.CSSProperties,

  dropdownItem: {
    display: "block",
    width: "100%",
    padding: "10px 16px",
    background: "none",
    border: "none",
    borderBottom: "1px solid var(--border)",
    color: "var(--text)",
    fontFamily: "var(--font-mono)",
    fontSize: "11px",
    letterSpacing: "0.08em",
    textAlign: "left" as const,
    cursor: "pointer",
    transition: "background 0.1s, color 0.1s",
  } as React.CSSProperties,

  unitList: {
    display: "flex",
    flexDirection: "column" as const,
    gap: "2px",
  } as React.CSSProperties,

  emptyState: {
    padding: "80px 40px",
    textAlign: "center" as const,
    color: "var(--text-dim)",
    fontFamily: "var(--font-mono)",
    fontSize: "12px",
    letterSpacing: "0.1em",
    border: "1px dashed var(--border)",
  } as React.CSSProperties,
};

export default function ArmyBuilder() {
  const navigate = useNavigate();
  const { units, characters, loading, error } = useWarhammerData();

  const [armyUnits, setArmyUnits] = useState<ArmyUnit[]>([]);
  const [armyCharacters, setArmyCharacters] = useState<ArmyCharacter[]>([]);
  const [infoOpen, setInfoOpen] = useState(false);
  const [addingUnit, setAddingUnit] = useState(false);
  const [openCategory, setOpenCategory] = useState<UnitCategory | null>(null);
  const [unitSearch, setUnitSearch] = useState("");
  const [pointsLimit, setPointsLimit] = useState<number>(0);
  const [characterMenuOpen, setCharacterMenuOpen] = useState(false);
  const [selectedFaction, setSelectedFaction] = useState<Faction>("space-marines");
  const [openSuperFaction, setOpenSuperFaction] = useState<SuperFaction | null>(null);
  const [showStartScreen, setShowStartScreen] = useState(true);
  const navRef = useRef<HTMLDivElement>(null);
  const importFileRef = useRef<HTMLInputElement>(null);
  const [saveFlash, setSaveFlash] = useState(false);
  const [saveTick, setSaveTick] = useState(0);
  const [armyName, setArmyName] = useState("Untitled Army");
  const factionSaves = useMemo(() => getSavesForFaction(selectedFaction), [selectedFaction, saveTick]);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (navRef.current && !navRef.current.contains(e.target as Node)) {
        setOpenSuperFaction(null);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const categories = BASE_CATEGORIES
    .filter((c) => c !== "mounted" || units.some((u) => u.category === "mounted" && u.faction === selectedFaction))
    .filter((c) => c !== "monster" || units.some((u) => u.category === "monster" && u.faction === selectedFaction))
    .filter((c) => selectedFaction !== "chaos-knights" || (c !== "battleline" && c !== "infantry"))
    .filter((c) => selectedFaction !== "tyranids" || c !== "vehicle");

  const getUnitsByCategory = (category: UnitCategory) =>
    units.filter((u) => u.category === category && u.faction === selectedFaction);

  const factionCharacters = characters.filter((c) => c.faction === selectedFaction);

  const addUnit = (unitId: string) => {
    const unit = units.find((u) => u.id === unitId && u.faction === selectedFaction);
    const defaultModelCount = unit?.modelCountOptions?.[0] ?? 5;
    setArmyUnits([
      ...armyUnits,
      { id: Date.now(), unitId, modelCount: defaultModelCount, wargear: unit?.defaultSelectedWargear ?? [], wargearCounts: {}, characterWargear: [], characterWargear2: [], attachedUnit: undefined, attachedUnitWargear: [], checkedNotes: [], noteWeaponSelections: {}, noteSlotSelections: {}, noteCounts: {}, transportedUnits: [] },
    ]);
    setAddingUnit(false);
    setOpenCategory(null);
  };

  const addCharacter = (characterId: string) => {
    setArmyCharacters([...armyCharacters, { id: Date.now(), characterId, wargear: [] }]);
    setCharacterMenuOpen(false);
  };

  const removeUnit = (id: number) => setArmyUnits(armyUnits.filter((u) => u.id !== id));
  const removeCharacter = (id: number) => setArmyCharacters(armyCharacters.filter((c) => c.id !== id));

  const updateUnit = (id: number, updated: Partial<ArmyUnit>) =>
    setArmyUnits(armyUnits.map((u) => (u.id === id ? { ...u, ...updated } : u)));

  const updateCharacter = (id: number, updated: Partial<ArmyCharacter>) =>
    setArmyCharacters(armyCharacters.map((c) => (c.id === id ? { ...c, ...updated } : c)));

  const calculateUnitPoints = (armyUnit: ArmyUnit) => {
    const unit = units.find((u) => u.id === armyUnit.unitId && u.faction === selectedFaction);
    if (!unit) return 0;
    let total = unit.pointsByModelCount?.[armyUnit.modelCount] ?? unit.points ?? 0;
    armyUnit.wargear.forEach((w) => {
      const pts = unit.wargear.find((g) => g.id === w)?.points;
      if (pts) total += pts;
    });
    Object.entries(armyUnit.wargearCounts ?? {}).forEach(([id, count]) => {
      const pts = unit.wargear.find((g) => g.id === id)?.points;
      if (pts && count > 0) total += pts * count;
    });
    if (armyUnit.attachedCharacter) {
      const char = characters.find((c) => c.id === armyUnit.attachedCharacter);
      if (char) {
        total += char.points;
        armyUnit.characterWargear.forEach((w) => {
          const pts = char.wargear?.find((g) => g.id === w)?.points;
          if (pts) total += pts;
        });
      }
    }
    if (armyUnit.attachedCharacter2) {
      const char2 = characters.find((c) => c.id === armyUnit.attachedCharacter2);
      if (char2) {
        total += char2.points;
        armyUnit.characterWargear2.forEach((w) => {
          const pts = char2.wargear?.find((g) => g.id === w)?.points;
          if (pts) total += pts;
        });
      }
    }
    if (armyUnit.attachedUnit) {
      const attached = units.find((u) => u.id === armyUnit.attachedUnit);
      if (attached) {
        total += attached.points ?? 0;
        armyUnit.attachedUnitWargear.forEach((w) => {
          const pts = attached.wargear?.find((g) => g.id === w)?.points;
          if (pts) total += pts;
        });
      }
    }
    return total;
  };

  const calculateCharacterPoints = (armyChar: ArmyCharacter) => {
    const char = characters.find((c) => c.id === armyChar.characterId);
    if (!char) return 0;
    let total = char.points;
    armyChar.wargear.forEach((w) => {
      const pts = char.wargear?.find((g) => g.id === w)?.points;
      if (pts) total += pts;
    });
    return total;
  };

  const totalPoints =
    armyUnits.reduce((sum, u) => sum + calculateUnitPoints(u), 0) +
    armyCharacters.reduce((sum, c) => sum + calculateCharacterPoints(c), 0);

  function saveArmy() {
    const all = readAllSaves();
    const existingIdx = all.findIndex((s) => s.faction === selectedFaction && s.name === armyName);
    const save: ArmySave = {
      id: existingIdx >= 0 ? all[existingIdx].id : crypto.randomUUID(),
      faction: selectedFaction,
      name: armyName,
      armyUnits,
      armyCharacters,
      savedAt: new Date().toISOString(),
      totalPoints,
    };
    if (existingIdx >= 0) { all[existingIdx] = save; } else { all.push(save); }
    writeSaves(all);
    setSaveFlash(true);
    setSaveTick((t) => t + 1);
    setTimeout(() => setSaveFlash(false), 1500);
  }

  function deleteSave(id: string) {
    writeSaves(readAllSaves().filter((s) => s.id !== id));
    setSaveTick((t) => t + 1);
  }

  function exportArmy() {
    const data = {
      faction: selectedFaction,
      factionLabel: FACTION_LABELS[selectedFaction],
      name: armyName,
      totalPoints,
      exportedAt: new Date().toISOString(),
      armyUnits,
      armyCharacters,
    };
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `${FACTION_LABELS[selectedFaction].replace(/[\s']+/g, "-").toLowerCase()}-army.json`;
    link.click();
    URL.revokeObjectURL(url);
  }

  function importArmy(file: File) {
    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const data = JSON.parse(e.target?.result as string);
        if (!data.armyUnits || !data.armyCharacters) { alert("Invalid army file."); return; }
        if (data.faction) setSelectedFaction(data.faction);
        setArmyUnits(data.armyUnits);
        setArmyCharacters(data.armyCharacters);
        setArmyName(data.name ?? data.factionLabel ?? "Imported Army");
        setShowStartScreen(false);
      } catch {
        alert("Could not read army file.");
      }
    };
    reader.readAsText(file);
  }

  if (loading) return (
    <div style={{ ...s.page, display: "flex", alignItems: "center", justifyContent: "center" }}>
      <span style={{ fontFamily: "var(--font-mono)", fontSize: "12px", letterSpacing: "0.2em", color: "var(--text-dim)" }}>
        LOADING COGITATOR DATA...
      </span>
    </div>
  );

  if (error) return (
    <div style={{ ...s.page, display: "flex", alignItems: "center", justifyContent: "center" }}>
      <div style={{ fontFamily: "var(--font-mono)", fontSize: "12px", color: "#c0392b", maxWidth: 400, textAlign: "center" }}>
        <div style={{ marginBottom: 8 }}>// DATA RETRIEVAL FAILURE</div>
        <div style={{ color: "var(--text-dim)" }}>{error}</div>
      </div>
    </div>
  );

  const SF_COLORS: Record<SuperFaction, string> = {
    imperium: "#e8c547",
    chaos:    "#cc4444",
    xenos:    "#44aacc",
  };

  if (showStartScreen) return (
    <div style={{
      minHeight: "100vh",
      background: "var(--bg)",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      fontFamily: "var(--font-display)",
      color: "var(--text)",
      position: "relative",
      overflow: "hidden",
    }}>
      {/* Decorative background grid */}
      <div style={{
        position: "absolute", inset: 0, pointerEvents: "none", zIndex: 0,
        backgroundImage: "linear-gradient(rgba(232,197,71,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(232,197,71,0.03) 1px, transparent 1px)",
        backgroundSize: "60px 60px",
      }} />
      {/* Corner accents */}
      <div style={{ position:"absolute", top:32, left:32, width:60, height:60, pointerEvents:"none", zIndex:0, borderTop:"1px solid var(--border-2)", borderLeft:"1px solid var(--border-2)" }} />
      <div style={{ position:"absolute", top:32, right:32, width:60, height:60, pointerEvents:"none", zIndex:0, borderTop:"1px solid var(--border-2)", borderRight:"1px solid var(--border-2)" }} />
      <div style={{ position:"absolute", bottom:32, left:32, width:60, height:60, pointerEvents:"none", zIndex:0, borderBottom:"1px solid var(--border-2)", borderLeft:"1px solid var(--border-2)" }} />
      <div style={{ position:"absolute", bottom:32, right:32, width:60, height:60, pointerEvents:"none", zIndex:0, borderBottom:"1px solid var(--border-2)", borderRight:"1px solid var(--border-2)" }} />

      <div style={{ zIndex: 1, width: "100%", maxWidth: "960px", padding: "40px 32px", textAlign: "center" }}>

        {/* Top ornament */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "16px", marginBottom: "32px" }}>
          <div style={{ flex: 1, height: "1px", background: "linear-gradient(to right, transparent, var(--border-2))" }} />
          <div style={{ width: "10px", height: "10px", background: "var(--accent)", clipPath: "polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)" }} />
          <div style={{ width: "6px", height: "6px", background: "var(--border-2)", clipPath: "polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)" }} />
          <div style={{ width: "10px", height: "10px", background: "var(--accent)", clipPath: "polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)" }} />
          <div style={{ flex: 1, height: "1px", background: "linear-gradient(to left, transparent, var(--border-2))" }} />
        </div>

        {/* Label */}
        <div style={{ fontFamily: "var(--font-mono)", fontSize: "10px", letterSpacing: "0.35em", color: "var(--text-dim)", textTransform: "uppercase", marginBottom: "12px" }}>
          Warhammer 40,000
        </div>

        {/* Title */}
        <h1 style={{ fontSize: "clamp(36px, 6vw, 60px)", fontWeight: 800, letterSpacing: "0.12em", textTransform: "uppercase", color: "var(--text)", lineHeight: 1, margin: "0 0 4px" }}>
          Army Builder
        </h1>
        <div style={{ fontFamily: "var(--font-mono)", fontSize: "10px", letterSpacing: "0.2em", color: "var(--accent)", textTransform: "uppercase", marginBottom: "40px", opacity: 0.8 }}>
          Muster your forces. Forge your warhost.
        </div>

        {/* Faction selector */}
        <div style={{ marginBottom: "40px" }}>
          <div style={{ fontFamily: "var(--font-mono)", fontSize: "9px", letterSpacing: "0.25em", color: "var(--text-dim)", textTransform: "uppercase", marginBottom: "20px" }}>
            // Select Allegiance
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "16px", textAlign: "left" }}>
            {(Object.keys(SUPERFACTIONS) as SuperFaction[]).map((sf) => {
              const sfColor = SF_COLORS[sf];
              const hasSel = SUPERFACTIONS[sf].includes(selectedFaction);
              return (
                <div key={sf} style={{
                  border: `1px solid ${hasSel ? sfColor + "55" : "var(--border-2)"}`,
                  background: hasSel ? sfColor + "08" : "var(--surface)",
                  transition: "border-color 0.2s, background 0.2s",
                }}>
                  <div style={{
                    padding: "10px 14px",
                    borderBottom: `1px solid ${hasSel ? sfColor + "44" : "var(--border)"}`,
                    background: "rgba(0,0,0,0.2)",
                    display: "flex",
                    alignItems: "center",
                    gap: "8px",
                  }}>
                    <div style={{ width: "6px", height: "6px", background: sfColor, clipPath: "polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)", flexShrink: 0 }} />
                    <span style={{ fontFamily: "var(--font-mono)", fontSize: "9px", letterSpacing: "0.2em", color: sfColor, textTransform: "uppercase", fontWeight: 700 }}>
                      {SUPERFACTION_LABELS[sf]}
                    </span>
                  </div>
                  {SUPERFACTIONS[sf].map((faction) => {
                    const active = selectedFaction === faction;
                    return (
                      <button
                        key={faction}
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: "8px",
                          width: "100%",
                          padding: "9px 14px",
                          border: "none",
                          borderBottom: "1px solid var(--border)",
                          background: active ? sfColor + "22" : "none",
                          color: active ? sfColor : "var(--text)",
                          fontFamily: "var(--font-mono)",
                          fontSize: "11px",
                          letterSpacing: "0.07em",
                          textAlign: "left",
                          cursor: "pointer",
                          transition: "background 0.1s, color 0.1s",
                        }}
                        onMouseEnter={(e) => { if (!active) { e.currentTarget.style.background = "rgba(255,255,255,0.04)"; } }}
                        onMouseLeave={(e) => { if (!active) { e.currentTarget.style.background = "none"; } }}
                        onClick={() => setSelectedFaction(faction)}
                      >
                        <span style={{
                          width: "5px", height: "5px", flexShrink: 0,
                          background: active ? sfColor : "var(--border-2)",
                          clipPath: "polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)",
                          transition: "background 0.15s",
                        }} />
                        {FACTION_LABELS[faction]}
                        {active && <span style={{ marginLeft: "auto", fontSize: "9px", opacity: 0.7 }}>◈</span>}
                      </button>
                    );
                  })}
                </div>
              );
            })}
          </div>
        </div>

        {/* Begin + saved armies */}
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "14px" }}>
          {factionSaves.length > 0 && (
            <div style={{ width: "100%", maxWidth: "480px", marginBottom: "4px" }}>
              <div style={{ fontFamily: "var(--font-mono)", fontSize: "9px", letterSpacing: "0.2em", color: "var(--accent)", textTransform: "uppercase", marginBottom: "10px", textAlign: "left" }}>
                // Saved Armies
              </div>
              {factionSaves.map((save) => (
                <div key={save.id} style={{
                  border: "1px solid var(--border-2)",
                  background: "rgba(232,197,71,0.03)",
                  padding: "10px 16px",
                  marginBottom: "4px",
                  display: "flex",
                  alignItems: "center",
                  gap: "12px",
                }}>
                  <div style={{ flex: 1, textAlign: "left" }}>
                    <div style={{ fontFamily: "var(--font-mono)", fontSize: "11px", color: "var(--text)", marginBottom: "2px" }}>{save.name}</div>
                    <div style={{ fontFamily: "var(--font-mono)", fontSize: "10px", color: "var(--text-dim)" }}>
                      {save.totalPoints} pts · {new Date(save.savedAt).toLocaleDateString()}
                    </div>
                  </div>
                  <button
                    style={{ padding: "6px 16px", background: "none", border: "1px solid var(--accent)", color: "var(--accent)", fontFamily: "var(--font-mono)", fontSize: "11px", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", cursor: "pointer", transition: "all 0.15s", whiteSpace: "nowrap" }}
                    onMouseEnter={(e) => { e.currentTarget.style.background = "var(--accent-dim)"; }}
                    onMouseLeave={(e) => { e.currentTarget.style.background = "none"; }}
                    onClick={() => { setArmyUnits(save.armyUnits); setArmyCharacters(save.armyCharacters); setArmyName(save.name); setShowStartScreen(false); }}
                  >
                    Resume →
                  </button>
                  <button
                    style={{ padding: "6px 10px", background: "none", border: "1px solid var(--border-2)", color: "var(--text-dim)", fontFamily: "var(--font-mono)", fontSize: "11px", cursor: "pointer", transition: "all 0.15s" }}
                    onMouseEnter={(e) => { e.currentTarget.style.borderColor = "#c04040"; e.currentTarget.style.color = "#c04040"; }}
                    onMouseLeave={(e) => { e.currentTarget.style.borderColor = "var(--border-2)"; e.currentTarget.style.color = "var(--text-dim)"; }}
                    onClick={() => deleteSave(save.id)}
                  >
                    ✕
                  </button>
                </div>
              ))}
            </div>
          )}
          <button
            style={{
              padding: "14px 56px",
              background: "var(--accent)",
              border: "none",
              color: "#000",
              fontFamily: "var(--font-mono)",
              fontSize: "12px",
              fontWeight: 700,
              letterSpacing: "0.25em",
              textTransform: "uppercase",
              cursor: "pointer",
              transition: "opacity 0.15s",
            }}
            onMouseEnter={(e) => { e.currentTarget.style.opacity = "0.85"; }}
            onMouseLeave={(e) => { e.currentTarget.style.opacity = "1"; }}
            onClick={() => { setArmyName("Untitled Army"); setShowStartScreen(false); }}
          >
            New Army
          </button>
          <div style={{ fontFamily: "var(--font-mono)", fontSize: "10px", letterSpacing: "0.15em", color: "var(--text-dim)" }}>
            FACTION // <span style={{ color: "var(--accent)" }}>{FACTION_LABELS[selectedFaction].toUpperCase()}</span>
          </div>
        </div>

        {/* Bottom ornament */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "16px", marginTop: "40px" }}>
          <div style={{ flex: 1, height: "1px", background: "linear-gradient(to right, transparent, var(--border))" }} />
          <div style={{ width: "4px", height: "4px", background: "var(--border-2)", clipPath: "polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)" }} />
          <div style={{ flex: 1, height: "1px", background: "linear-gradient(to left, transparent, var(--border))" }} />
        </div>
      </div>
    </div>
  );

  return (
    <div style={s.page} onClick={() => { setOpenCategory(null); setOpenSuperFaction(null); setCharacterMenuOpen(false); }}>

      {/* HEADER */}
      <header style={s.header}>
        <div style={s.headerTitle}>
          <div style={s.sigil} />
          <div>
            <div style={s.titleText}>Warhammer 40,000</div>
            <div style={s.titleMain}>Army Builder</div>
          </div>
        </div>

        <nav style={s.navGroup} ref={navRef}>
          {(Object.keys(SUPERFACTIONS) as SuperFaction[]).map((sf) => {
            const isOpen = openSuperFaction === sf;
            const hasFactionSelected = SUPERFACTIONS[sf].includes(selectedFaction);
            return (
              <div key={sf} style={{ position: "relative", display: "flex", alignItems: "stretch" }}>
                <button
                  style={s.sfBtn(isOpen, hasFactionSelected)}
                  onClick={(e) => { e.stopPropagation(); setOpenSuperFaction(isOpen ? null : sf); }}
                >
                  {hasFactionSelected && (
                    <span style={{ fontSize: "9px", opacity: 0.7 }}>
                      {FACTION_LABELS[selectedFaction].toUpperCase()}
                    </span>
                  )}
                  {!hasFactionSelected && SUPERFACTION_LABELS[sf]}
                  <span style={{ fontSize: "8px", opacity: 0.6 }}>{isOpen ? "▲" : "▼"}</span>
                </button>

                {isOpen && (
                  <div style={s.sfDropdown}>
                    <div style={{
                      padding: "8px 16px 6px",
                      fontFamily: "var(--font-mono)",
                      fontSize: "9px",
                      letterSpacing: "0.2em",
                      color: "var(--accent)",
                      textTransform: "uppercase",
                      borderBottom: "1px solid var(--border)",
                    }}>
                      {SUPERFACTION_LABELS[sf]}
                    </div>
                    {SUPERFACTIONS[sf].map((faction) => {
                      const active = selectedFaction === faction;
                      return (
                        <button
                          key={faction}
                          style={{
                            display: "flex",
                            alignItems: "center",
                            gap: "10px",
                            width: "100%",
                            padding: "10px 16px",
                            background: active ? "var(--accent-dim)" : "none",
                            border: "none",
                            borderBottom: "1px solid var(--border)",
                            color: active ? "var(--accent)" : "var(--text)",
                            fontFamily: "var(--font-mono)",
                            fontSize: "11px",
                            letterSpacing: "0.08em",
                            textAlign: "left",
                            cursor: "pointer",
                            transition: "background 0.1s",
                          }}
                          onMouseEnter={(e) => { if (!active) (e.currentTarget.style.background = "rgba(255,255,255,0.04)"); }}
                          onMouseLeave={(e) => { if (!active) (e.currentTarget.style.background = "none"); }}
                          onClick={(e) => { e.stopPropagation(); setSelectedFaction(faction); setOpenSuperFaction(null); }}
                        >
                          <span style={{
                            width: "5px", height: "5px", flexShrink: 0,
                            background: active ? "var(--accent)" : "var(--border-2)",
                            clipPath: "polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)",
                            transition: "background 0.15s",
                          }} />
                          {FACTION_LABELS[faction]}
                        </button>
                      );
                    })}
                  </div>
                )}
              </div>
            );
          })}
        </nav>

        <div style={s.pointsDisplay}>
          <input
            value={armyName}
            onChange={(e) => setArmyName(e.target.value)}
            onClick={(e) => e.stopPropagation()}
            style={{
              background: "none",
              border: "1px solid transparent",
              borderBottom: "1px solid var(--border-2)",
              color: "var(--text)",
              fontFamily: "var(--font-mono)",
              fontSize: "11px",
              letterSpacing: "0.08em",
              padding: "4px 6px",
              width: "160px",
              outline: "none",
              transition: "border-color 0.15s",
            }}
            onFocus={(e) => { e.currentTarget.style.borderColor = "var(--accent)"; e.currentTarget.style.borderBottomColor = "var(--accent)"; }}
            onBlur={(e) => { e.currentTarget.style.borderColor = "transparent"; e.currentTarget.style.borderBottomColor = "var(--border-2)"; }}
          />
          <div>
            <div style={{ ...s.pointsLabel, display: "flex", alignItems: "center", gap: "6px" }}>
              Army Strength
              {pointsLimit > 0 && totalPoints > pointsLimit && (
                <span style={{ color: "#e05252", fontSize: "9px", letterSpacing: "0.1em" }}>OVER LIMIT</span>
              )}
            </div>
            <div style={{
              ...s.pointsValue,
              color: pointsLimit > 0 && totalPoints > pointsLimit ? "#e05252" : "var(--accent)",
              transition: "color 0.2s",
            }}>
              {totalPoints}
              {pointsLimit > 0 && (
                <span style={{ fontSize: "13px", color: pointsLimit > 0 && totalPoints > pointsLimit ? "#e05252" : "var(--text-dim)", fontWeight: 400 }}>
                  {" "}/ {pointsLimit}
                </span>
              )}
              <span style={{ fontSize: "12px", color: "var(--text-dim)" }}> pts</span>
            </div>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: "3px" }}>
            <div style={{ ...s.pointsLabel }}>Limit</div>
            <input
              type="number"
              min={0}
              value={pointsLimit || ""}
              placeholder="—"
              onChange={(e) => setPointsLimit(Number(e.target.value) || 0)}
              onClick={(e) => e.stopPropagation()}
              style={{
                width: "72px",
                background: "none",
                border: "1px solid var(--border-2)",
                color: "var(--text)",
                fontFamily: "var(--font-mono)",
                fontSize: "13px",
                fontWeight: 700,
                padding: "3px 6px",
                outline: "none",
                textAlign: "center",
              }}
            />
          </div>
          <button
            style={{
              ...s.backBtn,
              border: `1px solid ${saveFlash ? "var(--accent)" : "var(--border-2)"}`,
              borderRadius: "3px",
              padding: "6px 14px",
              fontSize: "11px",
              color: saveFlash ? "var(--accent)" : "var(--text-dim)",
              transition: "all 0.2s",
            }}
            onClick={(e) => { e.stopPropagation(); saveArmy(); }}
          >
            {saveFlash ? "SAVED ✓" : "Save"}
          </button>
          <button
            style={{
              ...s.backBtn,
              border: "1px solid var(--border-2)",
              borderRadius: "3px",
              padding: "6px 14px",
              fontSize: "11px",
            }}
            onClick={(e) => { e.stopPropagation(); exportArmy(); }}
          >
            Export
          </button>
          <input
            ref={importFileRef}
            type="file"
            accept=".json"
            style={{ display: "none" }}
            onChange={(e) => { const f = e.target.files?.[0]; if (f) importArmy(f); e.target.value = ""; }}
          />
          <button
            style={{
              ...s.backBtn,
              border: "1px solid var(--border-2)",
              borderRadius: "3px",
              padding: "6px 14px",
              fontSize: "11px",
            }}
            onClick={(e) => { e.stopPropagation(); importFileRef.current?.click(); }}
          >
            Import
          </button>
          <button
            style={{
              ...s.backBtn,
              border: "1px solid var(--border-2)",
              borderRadius: "3px",
              padding: "6px 14px",
              fontSize: "11px",
            }}
            onClick={(e) => { e.stopPropagation(); setInfoOpen(true); }}
          >
            Info
          </button>
          <button style={s.backBtn} onClick={() => navigate("/")}>← HUB</button>
        </div>
      </header>

      {/* BODY */}
      <main style={s.body}>

        {/* DEPLOY TOOLBAR */}
        <div style={s.toolbar} onClick={(e) => e.stopPropagation()}>
          <span style={s.toolbarLabel}>Deploy</span>

          {categories.map((category) => {
            const available = getUnitsByCategory(category);
            const isOpen = openCategory === category;
            return (
              <div key={category} style={{ position: "relative" }}>
                <button
                  disabled={!addingUnit}
                  style={s.categoryBtn(isOpen, !addingUnit)}
                  onClick={() => setOpenCategory(isOpen ? null : category)}
                >
                  <span style={{
                    display: "inline-block",
                    width: "6px",
                    height: "6px",
                    background: CATEGORY_COLORS[category] ?? "var(--accent)",
                    marginRight: "8px",
                    verticalAlign: "middle",
                    clipPath: "polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)",
                  }} />
                  {category}
                </button>

                {isOpen && addingUnit && (
                  <div style={s.dropdown}>
                    <div style={{ padding: "6px 8px", borderBottom: "1px solid var(--border)" }}>
                      <input
                        autoFocus
                        value={unitSearch}
                        onChange={(e) => setUnitSearch(e.target.value)}
                        onClick={(e) => e.stopPropagation()}
                        placeholder="Search units…"
                        style={{
                          width: "100%",
                          background: "var(--bg)",
                          border: "1px solid var(--border-2)",
                          color: "var(--text)",
                          fontFamily: "var(--font-mono)",
                          fontSize: "11px",
                          letterSpacing: "0.05em",
                          padding: "5px 8px",
                          outline: "none",
                        }}
                      />
                    </div>
                    {available.filter((u) => u.name.toLowerCase().includes(unitSearch.toLowerCase())).length === 0 ? (
                      <div style={{ ...s.dropdownItem, color: "var(--text-dim)", cursor: "default" }}>
                        No units found
                      </div>
                    ) : available
                        .filter((u) => u.name.toLowerCase().includes(unitSearch.toLowerCase()))
                        .map((unit) => (
                          <button
                            key={unit.id}
                            style={s.dropdownItem}
                            onMouseEnter={(e) => {
                              (e.target as HTMLElement).style.background = "var(--accent-dim)";
                              (e.target as HTMLElement).style.color = "var(--accent)";
                            }}
                            onMouseLeave={(e) => {
                              (e.target as HTMLElement).style.background = "none";
                              (e.target as HTMLElement).style.color = "var(--text)";
                            }}
                            onClick={() => { addUnit(unit.id); setUnitSearch(""); }}
                          >
                            <span style={{ color: "var(--text-dim)", marginRight: "8px" }}>+</span>
                            {unit.name}
                            <span style={{ float: "right", color: "var(--accent)", fontFamily: "var(--font-mono)" }}>
                              {unit.points}
                            </span>
                          </button>
                        ))}
                  </div>
                )}
              </div>
            );
          })}

          {/* Characters button */}
          <div style={{ position: "relative", marginLeft: "auto" }}>
            <button
              style={{
                background: characterMenuOpen ? "rgba(232,197,71,0.15)" : "none",
                border: `1px solid ${characterMenuOpen ? "var(--accent)" : "var(--border-2)"}`,
                color: characterMenuOpen ? "var(--accent)" : "var(--text)",
                fontFamily: "var(--font-mono)",
                fontSize: "11px",
                fontWeight: 700,
                letterSpacing: "0.15em",
                textTransform: "uppercase",
                padding: "8px 20px",
                cursor: "pointer",
                transition: "all 0.15s",
                display: "flex",
                alignItems: "center",
                gap: "8px",
              }}
              onClick={(e) => {
                e.stopPropagation();
                setCharacterMenuOpen(!characterMenuOpen);
                setAddingUnit(false);
                setOpenCategory(null);
              }}
            >
              <span style={{
                width: "6px", height: "6px",
                background: characterMenuOpen ? "var(--accent)" : "var(--border-2)",
                borderRadius: "50%",
                transition: "background 0.15s",
              }} />
              Characters
              <span style={{ fontSize: "8px", opacity: 0.6 }}>{characterMenuOpen ? "▲" : "▼"}</span>
            </button>

            {characterMenuOpen && (
              <div style={{ ...s.dropdown, minWidth: "260px" }}>
                <div style={{
                  padding: "8px 16px 6px",
                  fontFamily: "var(--font-mono)",
                  fontSize: "9px",
                  letterSpacing: "0.2em",
                  color: "var(--accent)",
                  textTransform: "uppercase",
                  borderBottom: "1px solid var(--border)",
                }}>
                  {FACTION_LABELS[selectedFaction]}
                </div>
                {factionCharacters.length === 0 ? (
                  <div style={{ ...s.dropdownItem, color: "var(--text-dim)", cursor: "default" }}>
                    No characters available
                  </div>
                ) : factionCharacters.map((char) => (
                  <button
                    key={char.id}
                    style={s.dropdownItem}
                    onMouseEnter={(e) => {
                      (e.currentTarget.style.background = "var(--accent-dim)");
                      (e.currentTarget.style.color = "var(--accent)");
                    }}
                    onMouseLeave={(e) => {
                      (e.currentTarget.style.background = "none");
                      (e.currentTarget.style.color = "var(--text)");
                    }}
                    onClick={() => addCharacter(char.id)}
                  >
                    <span style={{ color: "var(--text-dim)", marginRight: "8px" }}>◎</span>
                    {char.name}
                    <span style={{ float: "right", color: "var(--accent)", fontFamily: "var(--font-mono)" }}>
                      {char.points}
                    </span>
                  </button>
                ))}
              </div>
            )}
          </div>

          <button
            style={s.addBtn(addingUnit)}
            onClick={(e) => { e.stopPropagation(); setAddingUnit(!addingUnit); if (addingUnit) { setOpenCategory(null); setUnitSearch(""); } }}
          >
            {addingUnit ? "✕ Cancel" : "+ Add Unit"}
          </button>
        </div>

        {/* CHARACTER LIST */}
        {armyCharacters.length > 0 && (
          <div style={{ marginBottom: "24px" }}>
            <div style={{
              display: "flex",
              alignItems: "center",
              gap: "12px",
              marginBottom: "8px",
            }}>
              <span style={{
                fontFamily: "var(--font-mono)",
                fontSize: "9px",
                letterSpacing: "0.2em",
                textTransform: "uppercase",
                color: "var(--accent)",
                opacity: 0.8,
              }}>
                Characters
              </span>
              <div style={{ flex: 1, height: "1px", background: "var(--border)" }} />
            </div>
            <div style={s.unitList}>
              {armyCharacters.map((armyChar) => {
                const char = characters.find((c) => c.id === armyChar.characterId);
                if (!char) return null;
                return (
                  <CharacterCard
                    key={armyChar.id}
                    character={char}
                    selectedWargear={armyChar.wargear}
                    points={calculateCharacterPoints(armyChar)}
                    onWargearChange={(gear) => updateCharacter(armyChar.id, { wargear: gear })}
                    onRemove={() => removeCharacter(armyChar.id)}
                  />
                );
              })}
            </div>
          </div>
        )}

        {/* UNIT LIST */}
        {(armyUnits.length > 0 || armyCharacters.length === 0) && (
          <div>
            {armyCharacters.length > 0 && armyUnits.length > 0 && (
              <div style={{
                display: "flex",
                alignItems: "center",
                gap: "12px",
                marginBottom: "8px",
              }}>
                <span style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: "9px",
                  letterSpacing: "0.2em",
                  textTransform: "uppercase",
                  color: "var(--text-dim)",
                  opacity: 0.8,
                }}>
                  Units
                </span>
                <div style={{ flex: 1, height: "1px", background: "var(--border)" }} />
              </div>
            )}
            <div style={s.unitList}>
              {armyUnits.length === 0 ? (
                <div style={s.emptyState}>
                  <div style={{ marginBottom: "12px", fontSize: "24px", opacity: 0.3 }}>◈</div>
                  <div>NO UNITS DEPLOYED</div>
                  <div style={{ marginTop: "8px", opacity: 0.6 }}>Press + ADD UNIT to begin mustering your forces</div>
                </div>
              ) : armyUnits.map((armyUnit) => {
                const selectedUnit = units.find((u) => u.id === armyUnit.unitId && u.faction === selectedFaction);
                if (!selectedUnit) return null;

                return (
                  <UnitCard
                    key={armyUnit.id}
                    unit={selectedUnit}
                    characters={characters}
                    allUnits={units}
                    modelCount={armyUnit.modelCount}
                    selectedWargear={armyUnit.wargear}
                    attachedCharacter={armyUnit.attachedCharacter}
                    characterWargear={armyUnit.characterWargear}
                    attachedCharacter2={armyUnit.attachedCharacter2}
                    characterWargear2={armyUnit.characterWargear2}
                    attachedUnit={armyUnit.attachedUnit}
                    attachedUnitWargear={armyUnit.attachedUnitWargear}
                    checkedNotes={armyUnit.checkedNotes}
                    noteWeaponSelections={armyUnit.noteWeaponSelections}
                    noteCounts={armyUnit.noteCounts}
                    transportedUnits={armyUnit.transportedUnits}
                    deployedUnits={armyUnits.filter((u) => u.id !== armyUnit.id).reduce<{ unit: Unit; modelCount: number; attachedCharacterCount: number }[]>((acc, u) => { const found = units.find((x) => x.id === u.unitId); if (found) acc.push({ unit: found, modelCount: u.modelCount, attachedCharacterCount: (u.attachedCharacter ? 1 : 0) + (u.attachedCharacter2 ? 1 : 0) }); return acc; }, [])}
                    points={calculateUnitPoints(armyUnit)}
                    onModelCountChange={(count) => updateUnit(armyUnit.id, { modelCount: count })}
                    onWargearChange={(gear) => updateUnit(armyUnit.id, { wargear: gear })}
                    onCharacterChange={(char) => updateUnit(armyUnit.id, { attachedCharacter: char, characterWargear: [], attachedCharacter2: undefined, characterWargear2: [] })}
                    onCharacterWargearChange={(gear) => updateUnit(armyUnit.id, { characterWargear: gear })}
                    onCharacter2Change={(char) => updateUnit(armyUnit.id, { attachedCharacter2: char, characterWargear2: [] })}
                    onCharacterWargear2Change={(gear) => updateUnit(armyUnit.id, { characterWargear2: gear })}
                    onAttachedUnitChange={(unitId) => updateUnit(armyUnit.id, { attachedUnit: unitId, attachedUnitWargear: [] })}
                    onAttachedUnitWargearChange={(gear) => updateUnit(armyUnit.id, { attachedUnitWargear: gear })}
                    wargearCounts={armyUnit.wargearCounts ?? {}}
                    onWargearCountsChange={(counts) => updateUnit(armyUnit.id, { wargearCounts: counts })}
                    onCheckedNotesChange={(notes) => updateUnit(armyUnit.id, { checkedNotes: notes })}
                    onNoteWeaponSelect={(noteId, weaponId) => updateUnit(armyUnit.id, { noteWeaponSelections: { ...armyUnit.noteWeaponSelections, [noteId]: weaponId } })}
                    noteSlotSelections={armyUnit.noteSlotSelections ?? {}}
                    onNoteSlotSelectionsChange={(slots) => updateUnit(armyUnit.id, { noteSlotSelections: slots })}
                    onNoteCountsChange={(counts) => updateUnit(armyUnit.id, { noteCounts: counts })}
                    onTransportChange={(u) => updateUnit(armyUnit.id, { transportedUnits: u })}
                    onRemove={() => removeUnit(armyUnit.id)}
                  />
                );
              })}
            </div>
          </div>
        )}

      </main>

      {/* INFO MODAL */}
      {infoOpen && (
        <div
          style={{
            position: "fixed", inset: 0, zIndex: 500,
            background: "rgba(0,0,0,0.75)",
            display: "flex", alignItems: "center", justifyContent: "center",
            padding: "24px",
          }}
          onClick={() => setInfoOpen(false)}
        >
          <div
            style={{
              background: "var(--surface)",
              border: "1px solid var(--border-2)",
              borderTop: "2px solid var(--accent)",
              maxWidth: "560px",
              width: "100%",
              padding: "32px",
              boxShadow: "0 16px 64px rgba(0,0,0,0.8)",
            }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal header */}
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "24px" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                <div style={s.sigil} />
                <div>
                  <div style={{ ...s.titleText, marginBottom: "2px" }}>Warhammer 40,000</div>
                  <div style={s.titleMain}>Army Builder</div>
                </div>
              </div>
              <button
                style={{ background: "none", border: "none", color: "var(--text-dim)", cursor: "pointer", fontSize: "18px", lineHeight: 1, padding: "4px 8px" }}
                onClick={() => setInfoOpen(false)}
              >
                ✕
              </button>
            </div>

            {/* Sections */}
            {[
              {
                label: "// about",
                content: "A browser-based army builder for Warhammer 40,000 10th Edition. Select a faction, deploy units and characters, configure wargear, and track your total army points.",
              },
              {
                label: "// data",
                content: `Unit and character data is served from a local Express API. The database covers all 22 factions with ${952} units and ${404} characters, including points costs, wargear options, model count variants, and special rules.`,
              },
              {
                label: "// how to use",
                content: "1. Pick a faction from the Imperium, Chaos, or Xenos menus.\n2. Click + Add Unit and select a category to browse available units.\n3. Use the Characters dropdown to attach named characters.\n4. Expand any card to configure wargear, model count, and attachments.\n5. Army strength is tracked live in the top-right corner.",
              },
              {
                label: "// tech stack",
                content: "React · TypeScript · Express · Node.js",
              },
              {
                label: "// IP & disclaimer",
                content: "Respectful usage of IP. Everything that makes this hobby great — from models to lore — is thanks to Games Workshop. I make every effort to credit IP ownership and take no credit for any creation except the models I have painted myself. Any other models shown are credited to their respective owners.\n\nThis project is not aiming to replace anything GW offers. It is a fun personal project built for portfolio purposes and as a complement to what GW provides. For official model information and datasheets, please refer to Games Workshop's official channels.",
              },
            ].map(({ label, content }) => (
              <div key={label} style={{ marginBottom: "20px" }}>
                <div style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: "9px",
                  letterSpacing: "0.2em",
                  color: "var(--accent)",
                  textTransform: "uppercase",
                  marginBottom: "8px",
                }}>
                  {label}
                </div>
                <div style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: "12px",
                  color: "var(--text-dim)",
                  lineHeight: 1.7,
                  whiteSpace: "pre-line",
                }}>
                  {content}
                </div>
              </div>
            ))}

            <button
              style={{
                marginTop: "8px",
                background: "none",
                border: "1px solid var(--border-2)",
                color: "var(--text-dim)",
                fontFamily: "var(--font-mono)",
                fontSize: "11px",
                letterSpacing: "0.1em",
                textTransform: "uppercase",
                padding: "8px 20px",
                cursor: "pointer",
                transition: "all 0.15s",
              }}
              onMouseEnter={(e) => { e.currentTarget.style.color = "var(--text)"; e.currentTarget.style.borderColor = "var(--text-dim)"; }}
              onMouseLeave={(e) => { e.currentTarget.style.color = "var(--text-dim)"; e.currentTarget.style.borderColor = "var(--border-2)"; }}
              onClick={() => setInfoOpen(false)}
            >
              Close
            </button>
          </div>
        </div>
      )}

    </div>
  );
}
