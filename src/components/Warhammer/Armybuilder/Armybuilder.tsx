import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useWarhammerData } from "../../../hooks/useWarhammerData";
import UnitCard from "../Unitcard/Unitcard";
import CharacterCard from "../CharacterCard/CharacterCard";
import type { UnitCategory, Faction, SuperFaction } from "../../../types/warhammer";

interface ArmyUnit {
  id: number;
  unitId: string;
  modelCount: number;
  wargear: string[];
  attachedCharacter?: string;
  characterWargear: string[];
  transportedUnits: string[];
}

interface ArmyCharacter {
  id: number;
  characterId: string;
  wargear: string[];
}

const SUPERFACTIONS: Record<SuperFaction, Faction[]> = {
  imperium: ["space-marines", "astra-militarum", "adeptus-mechanicus"],
  chaos:    ["chaos-space-marine", "death-guard", "thousand-sons"],
  xenos:    ["tyranids", "necrons", "orks"],
};

const SUPERFACTION_LABELS: Record<SuperFaction, string> = {
  imperium: "Imperium",
  chaos: "Chaos",
  xenos: "Xenos",
};

const FACTION_LABELS: Record<Faction, string> = {
  "space-marines": "Space Marines",
  "astra-militarum": "Astra Militarum",
  "adeptus-mechanicus": "Adeptus Mechanicus",
  "chaos-space-marine": "Chaos Space Marines",
  "death-guard": "Death Guard",
  "thousand-sons": "Thousand Sons",
  "tyranids": "Tyranids",
  "necrons": "Necrons",
  "orks": "Orks",
};

const BASE_CATEGORIES: UnitCategory[] = ["battleline", "infantry", "vehicle", "transport"];

const CATEGORY_COLORS: Record<string, string> = {
  battleline: "#4a9eff",
  infantry:   "#7ec87e",
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
  const [addingUnit, setAddingUnit] = useState(false);
  const [openCategory, setOpenCategory] = useState<UnitCategory | null>(null);
  const [characterMenuOpen, setCharacterMenuOpen] = useState(false);
  const [selectedFaction, setSelectedFaction] = useState<Faction>("space-marines");
  const [openSuperFaction, setOpenSuperFaction] = useState<SuperFaction | null>(null);
  const navRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (navRef.current && !navRef.current.contains(e.target as Node)) {
        setOpenSuperFaction(null);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const categories = selectedFaction === "tyranids"
    ? BASE_CATEGORIES.map((c) => (c === "vehicle" ? "monster" : c))
    : BASE_CATEGORIES;

  const getUnitsByCategory = (category: UnitCategory) =>
    units.filter((u) => u.category === category && u.faction === selectedFaction);

  const factionCharacters = characters.filter((c) => c.faction === selectedFaction);

  const addUnit = (unitId: string) => {
    setArmyUnits([
      ...armyUnits,
      { id: Date.now(), unitId, modelCount: 5, wargear: [], characterWargear: [], transportedUnits: [] },
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
    const unit = units.find((u) => u.id === armyUnit.unitId);
    if (!unit) return 0;
    let total = unit.points;
    armyUnit.wargear.forEach((w) => {
      const pts = unit.wargear.find((g) => g.id === w)?.points;
      if (pts) total += pts;
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
          <div>
            <div style={s.pointsLabel}>Army Strength</div>
            <div style={s.pointsValue}>{totalPoints} <span style={{ fontSize: "12px", color: "var(--text-dim)" }}>pts</span></div>
          </div>
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
                    {available.length === 0 ? (
                      <div style={{ ...s.dropdownItem, color: "var(--text-dim)", cursor: "default" }}>
                        No units available
                      </div>
                    ) : available.map((unit) => (
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
                        onClick={() => addUnit(unit.id)}
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
            onClick={(e) => { e.stopPropagation(); setAddingUnit(!addingUnit); if (addingUnit) setOpenCategory(null); }}
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
                const selectedUnit = units.find((u) => u.id === armyUnit.unitId);
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
                    transportedUnits={armyUnit.transportedUnits}
                    points={calculateUnitPoints(armyUnit)}
                    onModelCountChange={(count) => updateUnit(armyUnit.id, { modelCount: count })}
                    onWargearChange={(gear) => updateUnit(armyUnit.id, { wargear: gear })}
                    onCharacterChange={(char) => updateUnit(armyUnit.id, { attachedCharacter: char, characterWargear: [] })}
                    onCharacterWargearChange={(gear) => updateUnit(armyUnit.id, { characterWargear: gear })}
                    onTransportChange={(u) => updateUnit(armyUnit.id, { transportedUnits: u })}
                    onRemove={() => removeUnit(armyUnit.id)}
                  />
                );
              })}
            </div>
          </div>
        )}

      </main>
    </div>
  );
}
