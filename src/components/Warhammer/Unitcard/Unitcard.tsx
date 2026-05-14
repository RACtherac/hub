import { useState } from "react";
import type { Unit, Character, UnitNote } from "../../../types/warhammer";
import UnitImage from "../UnitImage/UnitImage";
import WargearSelector from "../WargearSelector/WargearSelector";
import CharacterAttachment from "../CharacterAttachment/CharacterAttachment";
import UnitAttachment from "../UnitAttachment/UnitAttachment";
import StatsModal from "../StatsModal/StatsModal";

const CATEGORY_COLORS: Record<string, string> = {
  battleline: "#4a9eff",
  infantry:   "#7ec87e",
  mounted:    "#c8a84a",
  vehicle:    "#e87c4a",
  transport:  "#a47ce8",
  monster:    "#e84a4a",
};

interface Props {
  unit: Unit;
  characters: Character[];
  allUnits: Unit[];
  modelCount: number;
  selectedWargear: string[];
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
  deployedUnits: { unit: Unit; modelCount: number; attachedCharacterCount: number }[];
  points: number;
  wargearCounts: Record<string, number>;
  onModelCountChange: (count: number) => void;
  onWargearChange: (gear: string[]) => void;
  onWargearCountsChange: (counts: Record<string, number>) => void;
  onCharacterChange: (char?: string) => void;
  onCharacterWargearChange: (gear: string[]) => void;
  onCharacter2Change: (char?: string) => void;
  onCharacterWargear2Change: (gear: string[]) => void;
  onAttachedUnitChange: (unitId?: string) => void;
  onAttachedUnitWargearChange: (gear: string[]) => void;
  onCheckedNotesChange: (notes: string[]) => void;
  onNoteWeaponSelect: (noteId: string, weaponId: string) => void;
  onNoteSlotSelectionsChange: (slots: Record<string, string[]>) => void;
  onNoteCountsChange: (counts: Record<string, number>) => void;
  onTransportChange: (units: string[]) => void;
  onRemove: () => void;
}

export default function UnitCard({
  unit, characters, allUnits,
  modelCount, selectedWargear,
  attachedCharacter, characterWargear,
  attachedCharacter2, characterWargear2,
  attachedUnit, attachedUnitWargear,
  checkedNotes, noteWeaponSelections, noteSlotSelections, noteCounts,
  transportedUnits, deployedUnits, points,
  wargearCounts, onWargearCountsChange,
  onModelCountChange, onWargearChange,
  onCharacterChange, onCharacterWargearChange,
  onCharacter2Change, onCharacterWargear2Change,
  onAttachedUnitChange, onAttachedUnitWargearChange,
  onCheckedNotesChange, onNoteWeaponSelect, onNoteSlotSelectionsChange, onNoteCountsChange,
  onTransportChange, onRemove,
}: Props) {
  const [expanded, setExpanded] = useState(true);
  const [noteImagesOpen, setNoteImagesOpen] = useState<string[]>([]);
  const [statsOpen, setStatsOpen] = useState(false);
  const [charStatsOpen, setCharStatsOpen] = useState<"char1" | "char2" | null>(null);

  const getConsumedSlots = (wargearId: string, gear = selectedWargear) =>
    unit.wargear.filter(w => w.consumesNoteWargear?.wargearId === wargearId && gear.includes(w.id)).length;

  const handleWargearChange = (gear: string[]) => {
    let newCounts = { ...wargearCounts };
    let newNotes = [...checkedNotes];

    // For each wargear item with consumesNoteWargear, recalculate effective max
    const affectedWargearIds = new Set(
      unit.wargear.filter(w => w.consumesNoteWargear).map(w => w.consumesNoteWargear!.wargearId)
    );
    for (const wargearId of affectedWargearIds) {
      const wargearItem = unit.wargear.find(w => w.id === wargearId);
      const baseMax = wargearItem?.maxCountByModelCount?.[modelCount] ?? 0;
      const consumed = getConsumedSlots(wargearId, gear);
      const effectiveMax = Math.max(0, baseMax - consumed);
      if (newCounts[wargearId] > effectiveMax) newCounts[wargearId] = effectiveMax;
      if (effectiveMax === 0) {
        const noteId = unit.wargear.find(w => w.consumesNoteWargear?.wargearId === wargearId)?.consumesNoteWargear?.noteId;
        if (noteId) newNotes = newNotes.filter(n => n !== noteId);
      }
    }

    onWargearCountsChange(newCounts);
    onCheckedNotesChange(newNotes);
    onWargearChange(gear);
  };

  const buildCharacterGroups = (char: typeof selectedCharacter): string[][] => {
    if (char?.wargearGroups && char.wargearGroups.length > 0) return char.wargearGroups;
    const wargear = char?.wargear ?? [];
    const pistols = wargear.filter(w => w.profiles?.some(p => p.keywords?.includes("PISTOL"))).map(w => w.id);
    const melee = wargear.filter(w => w.profiles?.some(p => p.range === "Melee")).map(w => w.id);
    const auto: string[][] = [];
    if (pistols.length > 1) auto.push(pistols);
    if (melee.length > 1) auto.push(melee);
    return auto;
  };

  const dedupWargearNames = (wargear: { id: string; name: string }[]) => {
    const seen = new Set<string>();
    return wargear.reduce<{ id: string; name: string }[]>((acc, w) => {
      const base = w.name.replace(/ [–\-] (strike|sweep)$/i, '').trim();
      if (!seen.has(base)) {
        seen.add(base);
        acc.push({ id: w.id, name: base });
      }
      return acc;
    }, []);
  };

  const selectedCharacter = characters.find((c) => c.id === attachedCharacter);
  const selectedCharacter2 = characters.find((c) => c.id === attachedCharacter2);
  const selectedAttachedUnit = allUnits.find((u) => u.id === attachedUnit);

  // Notes where triggered wargear is non-countable + has per-model-count slots → use per-slot dropdowns
  const slotDropdownNoteIds = new Set(
    (unit.notes ?? [])
      .filter((n) =>
        n.triggersWargear && n.triggersWargear.length > 0 &&
        n.maxCountByModelCount &&
        n.triggersWargear.every((wid) => !unit.wargear.find((w) => w.id === wid)?.countable)
      )
      .map((n) => n.id)
  );
  const slotDropdownTriggeredWargear = new Set(
    (unit.notes ?? [])
      .filter((n) => slotDropdownNoteIds.has(n.id))
      .flatMap((n) => n.triggersWargear ?? [])
  );
  const slotSelectedWargearIds = Object.values(noteSlotSelections).flat().filter(Boolean);
  const effectiveSelectedWargear = [...selectedWargear, ...slotSelectedWargearIds];

  const hasStats =
    [...(unit.defaultWargear ?? []), ...unit.wargear].some((w) => w.profiles && w.profiles.length > 0) ||
    !!unit.abilities?.length ||
    !![...(selectedCharacter?.defaultWargear ?? []), ...(selectedCharacter?.wargear ?? [])].some((w) => w.profiles && w.profiles.length > 0) ||
    !!selectedCharacter?.abilities?.length ||
    !![...(selectedCharacter2?.defaultWargear ?? []), ...(selectedCharacter2?.wargear ?? [])].some((w) => w.profiles && w.profiles.length > 0) ||
    !!selectedCharacter2?.abilities?.length ||
    !![...(selectedAttachedUnit?.defaultWargear ?? []), ...(selectedAttachedUnit?.wargear ?? [])].some((w) => w.profiles && w.profiles.length > 0);

  const isVehicle = unit.category === "vehicle" || unit.category === "monster";
  const isTransport = unit.category === "transport" || (!!unit.transportCapacity && (unit.category === "vehicle" || unit.category === "monster"));

  const modelCountOptions = unit.modelCountOptions ?? [5, 10];
  const allowedCharacters = characters
    .filter((c) => unit.ledBy?.includes(c.id))
    .filter((c, i, arr) => arr.findIndex((x) => x.id === c.id) === i);
  const attachableUnits = allUnits.filter((u) => unit.attachableUnits?.includes(u.id));
  const categoryColor = CATEGORY_COLORS[unit.category] ?? "var(--accent)";

  return (
    <div style={{
      background: "var(--surface)",
      border: "1px solid var(--border-2)",
      borderLeft: `3px solid ${categoryColor}`,
      marginBottom: "2px",
      transition: "border-color 0.15s",
    }}>

      {/* CARD HEADER */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          padding: "12px 16px",
          cursor: "pointer",
          gap: "12px",
          borderBottom: expanded ? "1px solid var(--border)" : "none",
        }}
        onClick={() => setExpanded(!expanded)}
      >
        {/* Category pip */}
        <div style={{
          width: "6px",
          height: "6px",
          background: categoryColor,
          clipPath: "polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)",
          flexShrink: 0,
        }} />

        {/* Unit name */}
        <span style={{
          fontFamily: "var(--font-display)",
          fontSize: "13px",
          fontWeight: 700,
          letterSpacing: "0.06em",
          textTransform: "uppercase",
          flex: 1,
        }}>
          {unit.name}
        </span>

        {/* Category badge */}
        <span style={{
          fontFamily: "var(--font-mono)",
          fontSize: "9px",
          letterSpacing: "0.15em",
          textTransform: "uppercase",
          color: categoryColor,
          opacity: 0.8,
          border: `1px solid ${categoryColor}`,
          padding: "2px 8px",
        }}>
          {unit.category}
        </span>

        {/* Stats button */}
        {hasStats && (
          <button
            onClick={(e) => { e.stopPropagation(); setStatsOpen(true); }}
            style={{
              background: "none",
              border: "1px solid var(--border-2)",
              color: "var(--text-dim)",
              fontFamily: "var(--font-mono)",
              fontSize: "9px",
              letterSpacing: "0.12em",
              textTransform: "uppercase",
              padding: "2px 8px",
              cursor: "pointer",
              transition: "all 0.15s",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.color = "var(--accent)";
              e.currentTarget.style.borderColor = "var(--accent)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.color = "var(--text-dim)";
              e.currentTarget.style.borderColor = "var(--border-2)";
            }}
          >
            Stats
          </button>
        )}


        {/* Model count badge (non-vehicle) */}
        {(unit.modelCountOptions != null || (!isVehicle && !isTransport)) && modelCountOptions.length > 1 && (
          <span style={{
            fontFamily: "var(--font-mono)",
            fontSize: "11px",
            color: "var(--text-dim)",
          }}>
            ×{modelCount}
          </span>
        )}

        {/* Points */}
        <span style={{
          fontFamily: "var(--font-mono)",
          fontSize: "14px",
          fontWeight: 700,
          color: "var(--accent)",
          minWidth: "60px",
          textAlign: "right",
        }}>
          {points} <span style={{ fontSize: "10px", color: "var(--text-dim)" }}>pts</span>
        </span>

        {/* Expand/collapse */}
        <span style={{
          fontFamily: "var(--font-mono)",
          fontSize: "10px",
          color: "var(--text-dim)",
          marginLeft: "8px",
          userSelect: "none",
        }}>
          {expanded ? "▲" : "▼"}
        </span>

        {/* Remove */}
        <button
          onClick={(e) => { e.stopPropagation(); onRemove(); }}
          style={{
            background: "none",
            border: "none",
            color: "var(--text-dim)",
            fontFamily: "var(--font-mono)",
            fontSize: "14px",
            cursor: "pointer",
            padding: "0 0 0 8px",
            lineHeight: 1,
            transition: "color 0.15s",
          }}
          onMouseEnter={(e) => (e.currentTarget.style.color = "#e84a4a")}
          onMouseLeave={(e) => (e.currentTarget.style.color = "var(--text-dim)")}
        >
          ×
        </button>
      </div>

      {/* STATS MODAL */}
      {statsOpen && (
        <StatsModal
          unit={unit}
          modelCount={modelCount}
          selectedWargear={effectiveSelectedWargear}
          wargearCounts={wargearCounts}
          checkedNotes={checkedNotes}
          noteWeaponSelections={noteWeaponSelections}
          character={selectedCharacter}
          characterWargear={characterWargear}
          character2={selectedCharacter2}
          characterWargear2={characterWargear2}
          attachedUnit={selectedAttachedUnit}
          attachedUnitWargear={attachedUnitWargear}
          onClose={() => setStatsOpen(false)}
        />
      )}

      {/* CHARACTER STATS MODAL */}
      {charStatsOpen && (() => {
        const char = charStatsOpen === "char1" ? selectedCharacter : selectedCharacter2;
        const charWargear = charStatsOpen === "char1" ? characterWargear : characterWargear2;
        if (!char) return null;
        const allWeapons = [...(char.defaultWargear ?? []), ...(char.wargear ?? []).filter(w => charWargear.includes(w.id))].filter(w => w.profiles?.length);
        const noteGear = [
          ...(char.defaultWargear ?? []).filter(w => w.note),
          ...(char.wargear ?? []).filter(w => charWargear.includes(w.id) && w.note),
        ];
        return (
          <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.7)", zIndex: 1000, display: "flex", alignItems: "center", justifyContent: "center", padding: "20px" }} onClick={() => setCharStatsOpen(null)}>
            <div style={{ background: "var(--surface)", border: "1px solid var(--border-2)", width: "100%", maxWidth: "860px", maxHeight: "85vh", overflowY: "auto" }} onClick={e => e.stopPropagation()}>
              <div style={{ display: "flex", alignItems: "center", padding: "14px 20px", borderBottom: "1px solid var(--border-2)", gap: "12px" }}>
                <span style={{ fontFamily: "var(--font-display)", fontSize: "13px", fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase", flex: 1 }}>
                  {char.name} — Stats
                </span>
                <button onClick={() => setCharStatsOpen(null)} style={{ background: "none", border: "none", color: "var(--text-dim)", fontFamily: "var(--font-mono)", fontSize: "18px", cursor: "pointer", padding: 0, lineHeight: 1 }}
                  onMouseEnter={e => (e.currentTarget.style.color = "#e84a4a")} onMouseLeave={e => (e.currentTarget.style.color = "var(--text-dim)")}>×</button>
              </div>
              <div style={{ padding: "20px", display: "flex", flexDirection: "column", gap: "24px" }}>
                {allWeapons.length > 0 && (
                  <div style={{ overflowX: "auto" }}>
                    <table style={{ width: "100%", borderCollapse: "collapse" }}>
                      <thead>
                        <tr>
                          {["Weapon","Range","A","BS/WS","S","AP","D","Keywords"].map((h, i) => (
                            <th key={h} style={{ fontFamily: "var(--font-mono)", fontSize: "9px", letterSpacing: "0.15em", textTransform: "uppercase", color: "var(--text-dim)", padding: "6px 10px", textAlign: i === 0 || i === 7 ? "left" : "center", borderBottom: "1px solid var(--border-2)", whiteSpace: "nowrap" }}>{h}</th>
                          ))}
                        </tr>
                      </thead>
                      <tbody>
                        {allWeapons.map(w => w.profiles!.map((p, i) => (
                          <tr key={`${w.id}-${i}`}>
                            <td style={{ fontFamily: "var(--font-mono)", fontSize: "11px", color: "var(--text)", padding: "6px 10px", fontWeight: 600, borderBottom: "1px solid rgba(255,255,255,0.04)" }}>
                              {w.name}{p.profileName && <span style={{ color: "var(--text-dim)", fontWeight: 400, marginLeft: "6px" }}>[{p.profileName}]</span>}
                            </td>
                            {[p.range, p.attacks, p.skill, p.strength, p.ap, p.damage].map((v, j) => (
                              <td key={j} style={{ fontFamily: "var(--font-mono)", fontSize: "11px", color: "var(--text)", padding: "6px 10px", textAlign: "center", borderBottom: "1px solid rgba(255,255,255,0.04)" }}>{v}</td>
                            ))}
                            <td style={{ fontFamily: "var(--font-mono)", fontSize: "11px", padding: "6px 10px", borderBottom: "1px solid rgba(255,255,255,0.04)" }}>
                              {p.keywords?.map(k => <span key={k} style={{ display: "inline-block", fontSize: "9px", letterSpacing: "0.08em", color: "var(--accent)", border: "1px solid var(--accent)", padding: "1px 5px", marginRight: "4px", opacity: 0.75 }}>{k}</span>)}
                            </td>
                          </tr>
                        )))}
                      </tbody>
                    </table>
                  </div>
                )}
                {char.abilities && char.abilities.length > 0 && (
                  <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                    {char.abilities.map(a => (
                      <div key={a.name} style={{ background: "rgba(255,255,255,0.02)", border: "1px solid var(--border-2)", padding: "10px 14px" }}>
                        <div style={{ fontFamily: "var(--font-mono)", fontSize: "11px", fontWeight: 700, letterSpacing: "0.06em", color: "var(--accent)", marginBottom: "4px" }}>{a.name}</div>
                        <div style={{ fontFamily: "var(--font-mono)", fontSize: "11px", color: "var(--text-dim)", lineHeight: 1.6 }}>{a.description}</div>
                      </div>
                    ))}
                  </div>
                )}
                {noteGear.length > 0 && (
                  <div>
                    <div style={{ fontFamily: "var(--font-mono)", fontSize: "10px", letterSpacing: "0.15em", textTransform: "uppercase", color: "var(--text-dim)", marginBottom: "10px" }}>
                      Wargear Rules
                    </div>
                    <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                      {noteGear.map(w => (
                        <div key={w.id} style={{ background: "rgba(255,255,255,0.02)", border: "1px solid var(--border-2)", padding: "10px 14px" }}>
                          <div style={{ fontFamily: "var(--font-mono)", fontSize: "11px", fontWeight: 700, letterSpacing: "0.06em", color: "var(--accent)", marginBottom: "4px" }}>{w.name}</div>
                          <div style={{ fontFamily: "var(--font-mono)", fontSize: "11px", color: "var(--text-dim)", lineHeight: 1.6 }}>{w.note}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        );
      })()}

      {/* CARD BODY */}
      {expanded && (
        <div style={{
          display: "grid",
          gridTemplateColumns: "auto 1fr",
          gap: "24px",
          padding: "20px",
        }}>

          {/* LEFT: image */}
          <div>
            <UnitImage
              unit={unit}
              modelCount={modelCount}
              characters={characters}
              attachedCharacter={attachedCharacter}
              attachedCharacter2={attachedCharacter2}
              attachedUnit={selectedAttachedUnit}
            />

            {/* Model count toggle */}
            {(unit.modelCountOptions != null || (!isVehicle && !isTransport)) && modelCountOptions.length > 1 && (
              <div style={{
                display: "flex",
                marginTop: "8px",
                border: "1px solid var(--border-2)",
                overflow: "hidden",
              }}>
                {modelCountOptions.map((n, i) => (
                  <button
                    key={n}
                    onClick={() => onModelCountChange(n)}
                    style={{
                      flex: 1,
                      background: modelCount === n ? "var(--accent-dim)" : "none",
                      border: "none",
                      borderRight: i < modelCountOptions.length - 1 ? "1px solid var(--border-2)" : "none",
                      color: modelCount === n ? "var(--accent)" : "var(--text-dim)",
                      fontFamily: "var(--font-mono)",
                      fontSize: "11px",
                      letterSpacing: "0.1em",
                      padding: "6px 0",
                      cursor: "pointer",
                      transition: "all 0.15s",
                    }}
                  >
                    {n} MODELS
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* RIGHT: controls */}
          <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>

            {/* Default wargear (always equipped) */}
            {(unit.defaultWargear?.length ?? 0) > 0 && (
              <div>
                <div style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: "10px",
                  letterSpacing: "0.15em",
                  textTransform: "uppercase",
                  color: "var(--text-dim)",
                  marginBottom: "8px",
                }}>
                  Always Equipped
                </div>
                <div style={{ display: "flex", flexWrap: "wrap", gap: "4px" }}>
                  {dedupWargearNames((unit.defaultWargear ?? []).filter((w) => {
                    const replaced = (unit.notes ?? []).some((n) => n.replacesDefaultWargear === w.id && checkedNotes.includes(n.id));
                    const hiddenByCount = w.showForModelCounts && !w.showForModelCounts.includes(modelCount);
                    return !replaced && !hiddenByCount;
                  })).map((w) => (
                    <span key={w.id} style={{
                      fontFamily: "var(--font-mono)",
                      fontSize: "10px",
                      letterSpacing: "0.06em",
                      color: "var(--text)",
                      border: "1px solid var(--border-2)",
                      padding: "3px 8px",
                      background: "rgba(255,255,255,0.03)",
                    }}>
                      {w.name}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Unit notes */}
            {unit.notes && unit.notes.length > 0 && (
              <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
                {unit.notes.filter((note: UnitNote) => !note.showForModelCounts || note.showForModelCounts.includes(modelCount)).map((note: UnitNote) => {
                  const noteText = note.textByModelCount?.[modelCount] ?? note.text;
                  const isChecked = checkedNotes.includes(note.id);
                  const imageOpen = noteImagesOpen.includes(note.id);
                  const triggeredWargearItem = note.triggersWargear?.[0]
                    ? unit.wargear.find(w => w.id === note.triggersWargear![0])
                    : undefined;
                  const baseMax = triggeredWargearItem?.maxCountByModelCount?.[modelCount] ?? 0;
                  const consumed = triggeredWargearItem ? getConsumedSlots(triggeredWargearItem.id) : 0;
                  const effectiveMax = Math.max(0, baseMax - consumed);
                  const allTriggersCountable = note.triggersWargear?.every(wid => unit.wargear.find(x => x.id === wid)?.countable) ?? true;
                  const groupLimit = note.noteGroup
                    ? (unit.noteGroupLimitsByModelCount?.[note.noteGroup]?.[modelCount]
                        ?? unit.noteGroupLimits?.[note.noteGroup]
                        ?? Infinity)
                    : Infinity;
                  const groupTotal = note.noteGroup
                    ? (unit.notes ?? [])
                        .filter((n) => n.noteGroup === note.noteGroup && checkedNotes.includes(n.id))
                        .reduce((sum, n) => sum + (noteCounts[n.id] ?? 1), 0)
                    : 0;
                  const groupAtMax = groupTotal >= groupLimit;
                  const requiredWargearMet = !note.requiredWargear || note.requiredWargear.some(id => selectedWargear.includes(id));
                  const noteDisabled = !requiredWargearMet || (note.triggersWargear && allTriggersCountable ? effectiveMax === 0 : false) || (groupAtMax && !checkedNotes.includes(note.id));
                  return (
                    <div key={note.id}>
                      <div style={{ display: "flex", alignItems: "flex-start", gap: "8px" }}>
                        {note.checkbox && (
                          <button
                            onClick={() => {
                              if (noteDisabled) return;
                              if (isChecked) {
                                onCheckedNotesChange(checkedNotes.filter((n) => n !== note.id));
                                if (slotDropdownNoteIds.has(note.id) && noteSlotSelections[note.id]) {
                                  const newSlots = { ...noteSlotSelections };
                                  delete newSlots[note.id];
                                  onNoteSlotSelectionsChange(newSlots);
                                }
                              } else {
                                const exclusive = note.exclusiveWith
                                  ? checkedNotes.filter((n) => {
                                      const excl = note.exclusiveWith!;
                                      return Array.isArray(excl) ? !excl.includes(n) : n !== excl;
                                    })
                                  : [...checkedNotes];
                                onCheckedNotesChange([...exclusive.filter((n) => n !== note.id), note.id]);
                              }
                            }}
                            style={{
                              width: "14px",
                              height: "14px",
                              flexShrink: 0,
                              marginTop: "1px",
                              background: isChecked ? "var(--accent)" : "none",
                              border: `1px solid ${noteDisabled ? "var(--border)" : isChecked ? "var(--accent)" : "var(--border-2)"}`,
                              cursor: noteDisabled ? "not-allowed" : "pointer",
                              opacity: noteDisabled ? 0.35 : 1,
                              padding: 0,
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                              transition: "all 0.15s",
                            }}
                          >
                            {isChecked && (
                              <span style={{ color: "#000", fontSize: "9px", lineHeight: 1, fontWeight: 700 }}>✓</span>
                            )}
                          </button>
                        )}
                        <span style={{
                          fontFamily: "var(--font-mono)",
                          fontSize: "10px",
                          letterSpacing: "0.06em",
                          color: isChecked ? "var(--accent)" : "var(--text-dim)",
                          lineHeight: 1.5,
                          flex: 1,
                          transition: "color 0.15s",
                        }}>
                          {noteText}
                        </span>
                        {isChecked && note.maxCountByModelCount && (() => {
                          const max = note.maxCountByModelCount[modelCount] ?? 1;
                          if (max <= 1) return null;
                          const count = noteCounts[note.id] ?? 1;
                          const plusDisabled = count >= max || groupAtMax;
                          return (
                            <div style={{ display: "flex", alignItems: "center", border: "1px solid var(--accent)", background: "var(--accent-dim)", flexShrink: 0 }}>
                              <button
                                onClick={() => onNoteCountsChange({ ...noteCounts, [note.id]: Math.max(1, count - 1) })}
                                disabled={count <= 1}
                                style={{ background: "none", border: "none", borderRight: "1px solid var(--accent)", color: count <= 1 ? "var(--border-2)" : "var(--accent)", fontFamily: "var(--font-mono)", fontSize: "13px", padding: "2px 7px", cursor: count <= 1 ? "default" : "pointer", lineHeight: 1 }}
                              >−</button>
                              <span style={{ fontFamily: "var(--font-mono)", fontSize: "11px", color: "var(--accent)", padding: "0 6px", minWidth: "24px", textAlign: "center" }}>{count}</span>
                              <button
                                onClick={() => onNoteCountsChange({ ...noteCounts, [note.id]: Math.min(max, count + 1) })}
                                disabled={plusDisabled}
                                style={{ background: "none", border: "none", borderLeft: "1px solid var(--accent)", color: plusDisabled ? "var(--border-2)" : "var(--accent)", fontFamily: "var(--font-mono)", fontSize: "13px", padding: "2px 7px", cursor: plusDisabled ? "default" : "pointer", lineHeight: 1 }}
                              >+</button>
                            </div>
                          );
                        })()}
                        {isChecked && note.triggersWargear && note.triggersWargear.map((wid) => {
                          const wargearItem = unit.wargear.find((w) => w.id === wid);
                          if (!wargearItem?.countable) return null;
                          const max = effectiveMax;
                          const count = wargearCounts[wid] ?? 0;
                          return (
                            <div key={wid} style={{ display: "flex", alignItems: "center", border: "1px solid var(--accent)", background: "var(--accent-dim)", flexShrink: 0 }}>
                              <button
                                onClick={() => onWargearCountsChange({ ...wargearCounts, [wid]: Math.max(0, count - 1) })}
                                disabled={count === 0}
                                style={{ background: "none", border: "none", borderRight: "1px solid var(--accent)", color: count === 0 ? "var(--border-2)" : "var(--accent)", fontFamily: "var(--font-mono)", fontSize: "13px", padding: "2px 7px", cursor: count === 0 ? "default" : "pointer", lineHeight: 1 }}
                              >−</button>
                              <span style={{ fontFamily: "var(--font-mono)", fontSize: "11px", color: "var(--accent)", padding: "0 6px", minWidth: "20px", textAlign: "center" }}>{count}</span>
                              <button
                                onClick={() => onWargearCountsChange({ ...wargearCounts, [wid]: Math.min(max, count + 1) })}
                                disabled={count >= max}
                                style={{ background: "none", border: "none", borderLeft: "1px solid var(--accent)", color: count >= max ? "var(--border-2)" : "var(--accent)", fontFamily: "var(--font-mono)", fontSize: "13px", padding: "2px 7px", cursor: count >= max ? "default" : "pointer", lineHeight: 1 }}
                              >+</button>
                            </div>
                          );
                        })}
                        {note.image && (
                          <button
                            onClick={() => setNoteImagesOpen(imageOpen ? noteImagesOpen.filter((n) => n !== note.id) : [...noteImagesOpen, note.id])}
                            style={{
                              flexShrink: 0,
                              background: imageOpen ? "var(--accent-dim)" : "none",
                              border: `1px solid ${imageOpen ? "var(--accent)" : "var(--border-2)"}`,
                              color: imageOpen ? "var(--accent)" : "var(--text-dim)",
                              fontFamily: "var(--font-mono)",
                              fontSize: "9px",
                              letterSpacing: "0.1em",
                              textTransform: "uppercase",
                              padding: "2px 8px",
                              cursor: "pointer",
                              transition: "all 0.15s",
                            }}
                          >
                            {imageOpen ? "hide" : "image"}
                          </button>
                        )}
                      </div>
                      {note.image && imageOpen && (
                        <div style={{
                          marginTop: "8px",
                          marginLeft: "22px",
                          padding: "8px",
                          background: "var(--surface-2)",
                          border: "1px solid var(--border-2)",
                          display: "inline-block",
                        }}>
                          <img
                            src={note.image}
                            alt={noteText}
                            style={{ maxWidth: "120px", maxHeight: "120px", objectFit: "contain", display: "block" }}
                          />
                        </div>
                      )}
                      {slotDropdownNoteIds.has(note.id) && isChecked && (() => {
                        const slotCount = note.maxCountByModelCount![modelCount] ?? 1;
                        const currentSlots = noteSlotSelections[note.id] ?? [];
                        return (
                          <div style={{ marginTop: "6px", marginLeft: "22px", display: "flex", flexDirection: "column", gap: "4px" }}>
                            {Array.from({ length: slotCount }).map((_, i) => (
                              <select
                                key={i}
                                value={currentSlots[i] ?? ""}
                                onChange={(e) => {
                                  const newSlots = [...currentSlots];
                                  newSlots[i] = e.target.value;
                                  onNoteSlotSelectionsChange({ ...noteSlotSelections, [note.id]: newSlots });
                                }}
                                style={{
                                  background: "var(--surface-2)",
                                  border: `1px solid ${currentSlots[i] ? "var(--accent)" : "var(--border-2)"}`,
                                  color: currentSlots[i] ? "var(--accent)" : "var(--text-dim)",
                                  fontFamily: "var(--font-mono)",
                                  fontSize: "10px",
                                  letterSpacing: "0.08em",
                                  padding: "4px 10px",
                                  cursor: "pointer",
                                  outline: "none",
                                }}
                              >
                                <option value="" style={{ background: "var(--surface)" }}>— select weapon —</option>
                                {(note.triggersWargear ?? []).map((wid) => {
                                  const w = unit.wargear.find((x) => x.id === wid);
                                  return w ? <option key={wid} value={wid} style={{ background: "var(--surface)" }}>{w.name}</option> : null;
                                })}
                              </select>
                            ))}
                          </div>
                        );
                      })()}
                      {note.weaponIds && note.weaponIds.length > 0 && isChecked && (
                        <div style={{ marginTop: "6px", marginLeft: "22px" }}>
                          <select
                            value={noteWeaponSelections[note.id] ?? ""}
                            onChange={(e) => onNoteWeaponSelect(note.id, e.target.value)}
                            style={{
                              background: "var(--surface-2)",
                              border: "1px solid var(--accent)",
                              color: "var(--accent)",
                              fontFamily: "var(--font-mono)",
                              fontSize: "10px",
                              letterSpacing: "0.08em",
                              padding: "4px 10px",
                              cursor: "pointer",
                              outline: "none",
                            }}
                          >
                            <option value="" disabled style={{ background: "var(--surface)" }}>Select weapon…</option>
                            {note.weaponIds.map((wid) => {
                              const w = unit.wargear.find((x) => x.id === wid);
                              return w ? (
                                <option key={wid} value={wid} style={{ background: "var(--surface)" }}>{w.name}</option>
                              ) : null;
                            })}
                          </select>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            )}

            {/* Optional wargear swaps */}
            {unit.wargear.length > 0 && (() => {
              const noteWeaponIds = new Set([
                ...(unit.notes ?? []).map((n) => n.weaponId).filter(Boolean),
                ...(unit.notes ?? []).flatMap((n) => n.weaponIds ?? []),
              ]);
              const triggeredWargear = new Set(
                (unit.notes ?? []).flatMap((n) => n.triggersWargear ?? [])
              );
              const unlockedNonCountable = new Set(
                (unit.notes ?? [])
                  .filter((n) => checkedNotes.includes(n.id))
                  .flatMap((n) => (n.triggersWargear ?? []).filter((wid) => !unit.wargear.find((x) => x.id === wid)?.countable))
              );
              const selectableWargear = unit.wargear.filter((w) => !noteWeaponIds.has(w.id) && !slotDropdownTriggeredWargear.has(w.id) && (!triggeredWargear.has(w.id) || unlockedNonCountable.has(w.id)));
              const unitWargear = selectableWargear.filter((w) => !w.sergeantOnly);
              const sergeantWargear = selectableWargear.filter((w) => w.sergeantOnly);
              return (
                <>
                  {unitWargear.length > 0 && (
                    <WargearSelector
                      label={unit.wargearLabel ?? "Wargear Options"}
                      wargear={unitWargear}
                      selected={selectedWargear}
                      onChange={handleWargearChange}
                      groups={unit.wargearGroups}
                      counts={wargearCounts}
                      onCountChange={(updates) => onWargearCountsChange({ ...wargearCounts, ...updates })}
                      modelCount={modelCount}
                      checkedNotes={checkedNotes}
                    />
                  )}
                  {sergeantWargear.length > 0 && (
                    unit.sergeantOptionGroups ? (
                      <>
                        {unit.sergeantOptionGroups.map((optGroup) => {
                          const groupWargear = optGroup.ids.map((id) => sergeantWargear.find((w) => w.id === id)).filter(Boolean) as typeof sergeantWargear;
                          if (groupWargear.length === 0) return null;
                          return (
                            <WargearSelector
                              key={optGroup.label}
                              label={optGroup.label}
                              wargear={groupWargear}
                              selected={selectedWargear}
                              onChange={handleWargearChange}
                              groups={unit.wargearGroups}
                            />
                          );
                        })}
                      </>
                    ) : (
                      <WargearSelector
                        label="Sergeant Wargear Options"
                        wargear={sergeantWargear}
                        selected={selectedWargear}
                        onChange={handleWargearChange}
                        groups={unit.wargearGroups}
                      />
                    )
                  )}
                </>
              );
            })()}

            {/* Character attachment */}
            {(!isVehicle || allowedCharacters.length > 0) && !isTransport && allowedCharacters.length > 0 && (
              <div>
                <CharacterAttachment
                  characters={allowedCharacters}
                  selectedCharacter={attachedCharacter}
                  onChange={onCharacterChange}
                />
                {selectedCharacter && (
                  <button
                    onClick={() => setCharStatsOpen("char1")}
                    style={{
                      marginTop: "6px",
                      background: "none",
                      border: "1px solid var(--border-2)",
                      color: "var(--text-dim)",
                      fontFamily: "var(--font-mono)",
                      fontSize: "9px",
                      letterSpacing: "0.12em",
                      textTransform: "uppercase",
                      padding: "2px 8px",
                      cursor: "pointer",
                      transition: "all 0.15s",
                    }}
                    onMouseEnter={(e) => { e.currentTarget.style.color = "var(--accent)"; e.currentTarget.style.borderColor = "var(--accent)"; }}
                    onMouseLeave={(e) => { e.currentTarget.style.color = "var(--text-dim)"; e.currentTarget.style.borderColor = "var(--border-2)"; }}
                  >
                    {selectedCharacter.name} — Stats
                  </button>
                )}
              </div>
            )}

            {/* Unit attachment (e.g. Invader ATV with Outriders) */}
            {attachableUnits.length > 0 && (
              <UnitAttachment
                units={attachableUnits}
                selectedUnit={attachedUnit}
                onChange={onAttachedUnitChange}
              />
            )}

            {/* Attached unit always equipped */}
            {selectedAttachedUnit && (selectedAttachedUnit.defaultWargear?.length ?? 0) > 0 && (
              <div>
                <div style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: "10px",
                  letterSpacing: "0.15em",
                  textTransform: "uppercase",
                  color: "var(--text-dim)",
                  marginBottom: "8px",
                }}>
                  {selectedAttachedUnit.name} — Always Equipped
                </div>
                <div style={{ display: "flex", flexWrap: "wrap", gap: "4px" }}>
                  {dedupWargearNames(selectedAttachedUnit.defaultWargear ?? []).map((w) => (
                    <span key={w.id} style={{
                      fontFamily: "var(--font-mono)",
                      fontSize: "10px",
                      letterSpacing: "0.06em",
                      color: "var(--text)",
                      border: "1px solid var(--border-2)",
                      padding: "3px 8px",
                      background: "rgba(255,255,255,0.03)",
                    }}>
                      {w.name}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Attached unit wargear */}
            {selectedAttachedUnit && selectedAttachedUnit.wargear.length > 0 && (
              <WargearSelector
                label={`${selectedAttachedUnit.name} — Wargear Options`}
                wargear={selectedAttachedUnit.wargear}
                selected={attachedUnitWargear}
                onChange={onAttachedUnitWargearChange}
                groups={selectedAttachedUnit.wargearGroups}
              />
            )}

            {/* Character default wargear */}
            {selectedCharacter?.defaultWargear && selectedCharacter.defaultWargear.length > 0 && (
              <div>
                <div style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: "10px",
                  letterSpacing: "0.15em",
                  textTransform: "uppercase",
                  color: "var(--text-dim)",
                  marginBottom: "8px",
                }}>
                  {selectedCharacter.name} — Always Equipped
                </div>
                <div style={{ display: "flex", flexWrap: "wrap", gap: "4px" }}>
                  {dedupWargearNames(selectedCharacter.defaultWargear).map((w) => (
                    <span key={w.id} style={{
                      fontFamily: "var(--font-mono)",
                      fontSize: "10px",
                      letterSpacing: "0.06em",
                      color: "var(--text)",
                      border: "1px solid var(--border-2)",
                      padding: "3px 8px",
                      background: "rgba(255,255,255,0.03)",
                    }}>
                      {w.name}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Character optional wargear */}
            {selectedCharacter?.wargear && selectedCharacter.wargear.length > 0 && (
              selectedCharacter.wargearSections ? (
                <>
                  {selectedCharacter.wargearSections.map((section) => {
                    const sectionWargear = section.ids
                      .map(id => selectedCharacter.wargear!.find(w => w.id === id))
                      .filter(Boolean) as NonNullable<typeof selectedCharacter.wargear>;
                    if (sectionWargear.length === 0) return null;
                    return (
                      <WargearSelector
                        key={section.label}
                        label={section.label}
                        wargear={sectionWargear}
                        selected={characterWargear}
                        onChange={onCharacterWargearChange}
                        groups={buildCharacterGroups(selectedCharacter)}
                      />
                    );
                  })}
                </>
              ) : (
                <WargearSelector
                  label={`${selectedCharacter.name} — Wargear Options`}
                  wargear={selectedCharacter.wargear}
                  selected={characterWargear}
                  onChange={onCharacterWargearChange}
                  groups={buildCharacterGroups(selectedCharacter)}
                />
              )
            )}

            {/* Second character slot (only shown if first character allows it) */}
            {selectedCharacter?.allowsSecondCharacter && (
              <div>
                <CharacterAttachment
                  label="Second Character"
                  characters={allowedCharacters.filter((c) => c.id !== attachedCharacter && (!selectedCharacter.secondCharacterOptions || selectedCharacter.secondCharacterOptions.includes(c.id)))}
                  selectedCharacter={attachedCharacter2}
                  onChange={onCharacter2Change}
                />
                {selectedCharacter2 && (
                  <button
                    onClick={() => setCharStatsOpen("char2")}
                    style={{
                      marginTop: "6px",
                      background: "none",
                      border: "1px solid var(--border-2)",
                      color: "var(--text-dim)",
                      fontFamily: "var(--font-mono)",
                      fontSize: "9px",
                      letterSpacing: "0.12em",
                      textTransform: "uppercase",
                      padding: "2px 8px",
                      cursor: "pointer",
                      transition: "all 0.15s",
                    }}
                    onMouseEnter={(e) => { e.currentTarget.style.color = "var(--accent)"; e.currentTarget.style.borderColor = "var(--accent)"; }}
                    onMouseLeave={(e) => { e.currentTarget.style.color = "var(--text-dim)"; e.currentTarget.style.borderColor = "var(--border-2)"; }}
                  >
                    {selectedCharacter2.name} — Stats
                  </button>
                )}
              </div>
            )}

            {/* Second character default wargear */}
            {selectedCharacter2?.defaultWargear && selectedCharacter2.defaultWargear.length > 0 && (
              <div>
                <div style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: "10px",
                  letterSpacing: "0.15em",
                  textTransform: "uppercase",
                  color: "var(--text-dim)",
                  marginBottom: "8px",
                }}>
                  {selectedCharacter2.name} — Always Equipped
                </div>
                <div style={{ display: "flex", flexWrap: "wrap", gap: "4px" }}>
                  {dedupWargearNames(selectedCharacter2.defaultWargear).map((w) => (
                    <span key={w.id} style={{
                      fontFamily: "var(--font-mono)",
                      fontSize: "10px",
                      letterSpacing: "0.06em",
                      color: "var(--text)",
                      border: "1px solid var(--border-2)",
                      padding: "3px 8px",
                      background: "rgba(255,255,255,0.03)",
                    }}>
                      {w.name}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Second character optional wargear */}
            {selectedCharacter2?.wargear && selectedCharacter2.wargear.length > 0 && (
              <WargearSelector
                label={`${selectedCharacter2.name} — Wargear Options`}
                wargear={selectedCharacter2.wargear}
                selected={characterWargear2}
                onChange={onCharacterWargear2Change}
                groups={buildCharacterGroups(selectedCharacter2)}
              />
            )}

            {/* Transport contents */}
            {isTransport && (
              <div>
                <div style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: "10px",
                  letterSpacing: "0.15em",
                  textTransform: "uppercase",
                  color: "var(--text-dim)",
                  marginBottom: "10px",
                  display: "flex",
                  alignItems: "center",
                  gap: "8px",
                }}>
                  Embarked Units
                  {unit.transportCapacity && (() => {
                    const usedSlots = transportedUnits.reduce((sum, id) => {
                      const du = deployedUnits.find((d) => d.unit.id === id);
                      if (!du || du.unit.category === "vehicle" || du.unit.category === "monster") return sum;
                      return sum + (du.modelCount * (du.unit.transportSlots ?? 1) + du.attachedCharacterCount);
                    }, 0);
                    return (
                      <span style={{ color: usedSlots >= unit.transportCapacity ? "#e84a4a" : "var(--accent)" }}>
                        {usedSlots}/{unit.transportCapacity}
                      </span>
                    );
                  })()}
                </div>
                <div style={{ display: "flex", flexWrap: "wrap", gap: "4px" }}>
                  {deployedUnits
                    .filter((d) => d.unit.category !== "vehicle" && d.unit.category !== "transport" && d.unit.category !== "monster")
                    .map((d) => {
                      const slotCost = d.modelCount * (d.unit.transportSlots ?? 1) + d.attachedCharacterCount;
                      const active = transportedUnits.includes(d.unit.id);
                      const usedSlots = transportedUnits.reduce((sum, id) => {
                        const du = deployedUnits.find((x) => x.unit.id === id);
                        if (!du || du.unit.category === "vehicle" || du.unit.category === "monster") return sum;
                        return sum + (du.modelCount * (du.unit.transportSlots ?? 1) + du.attachedCharacterCount);
                      }, 0);
                      const atCapacity = !!unit.transportCapacity && usedSlots + (active ? 0 : slotCost) > unit.transportCapacity;
                      const disabled = !active && atCapacity;
                      return (
                        <button
                          key={d.unit.id}
                          disabled={disabled}
                          onClick={() => {
                            if (active) onTransportChange(transportedUnits.filter((x) => x !== d.unit.id));
                            else onTransportChange([...transportedUnits, d.unit.id]);
                          }}
                          style={{
                            background: active ? "var(--accent-dim)" : "none",
                            border: `1px solid ${active ? "var(--accent)" : "var(--border-2)"}`,
                            color: active ? "var(--accent)" : "var(--text-dim)",
                            fontFamily: "var(--font-mono)",
                            fontSize: "10px",
                            letterSpacing: "0.08em",
                            padding: "4px 10px",
                            cursor: disabled ? "not-allowed" : "pointer",
                            opacity: disabled ? 0.35 : 1,
                            transition: "all 0.15s",
                          }}
                        >
                          {d.unit.name} <span style={{ opacity: 0.6 }}>·{slotCost}</span>
                        </button>
                      );
                    })}
                </div>

                {unit.monsterTransportCapacity && (() => {
                  const monsterUnits = deployedUnits.filter((d) => d.unit.category === "monster");
                  if (monsterUnits.length === 0) return null;
                  const monsterUsed = transportedUnits.filter((id) => deployedUnits.find((x) => x.unit.id === id)?.unit.category === "monster").length;
                  return (
                    <div style={{ marginTop: "8px" }}>
                      <div style={{
                        fontFamily: "var(--font-mono)",
                        fontSize: "10px",
                        letterSpacing: "0.1em",
                        textTransform: "uppercase",
                        color: "var(--text-dim)",
                        marginBottom: "6px",
                        display: "flex",
                        alignItems: "center",
                        gap: "8px",
                      }}>
                        Monster Slot
                        <span style={{ color: monsterUsed >= unit.monsterTransportCapacity ? "#e84a4a" : "var(--accent)" }}>
                          {monsterUsed}/{unit.monsterTransportCapacity}
                        </span>
                      </div>
                      <div style={{ display: "flex", flexWrap: "wrap", gap: "4px" }}>
                        {monsterUnits.map((d) => {
                          const active = transportedUnits.includes(d.unit.id);
                          const atCapacity = !active && monsterUsed >= unit.monsterTransportCapacity!;
                          return (
                            <button
                              key={d.unit.id}
                              disabled={atCapacity}
                              onClick={() => {
                                if (active) onTransportChange(transportedUnits.filter((x) => x !== d.unit.id));
                                else onTransportChange([...transportedUnits, d.unit.id]);
                              }}
                              style={{
                                background: active ? "var(--accent-dim)" : "none",
                                border: `1px solid ${active ? "var(--accent)" : "var(--border-2)"}`,
                                color: active ? "var(--accent)" : "var(--text-dim)",
                                fontFamily: "var(--font-mono)",
                                fontSize: "10px",
                                letterSpacing: "0.08em",
                                padding: "4px 10px",
                                cursor: atCapacity ? "not-allowed" : "pointer",
                                opacity: atCapacity ? 0.35 : 1,
                                transition: "all 0.15s",
                              }}
                            >
                              {d.unit.name}
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  );
                })()}

                {unit.dreadnoughtTransportCapacity && (() => {
                  const dreadnoughtUnits = deployedUnits.filter((d) => d.unit.category === "vehicle" && d.unit.id.includes("dreadnought"));
                  if (dreadnoughtUnits.length === 0) return null;
                  const dreadnoughtUsed = transportedUnits.filter((id) => deployedUnits.find((x) => x.unit.id === id && x.unit.category === "vehicle" && x.unit.id.includes("dreadnought"))).length;
                  return (
                    <div style={{ marginTop: "8px" }}>
                      <div style={{
                        fontFamily: "var(--font-mono)",
                        fontSize: "10px",
                        letterSpacing: "0.1em",
                        textTransform: "uppercase",
                        color: "var(--text-dim)",
                        marginBottom: "6px",
                        display: "flex",
                        alignItems: "center",
                        gap: "8px",
                      }}>
                        Dreadnought Slot
                        <span style={{ color: dreadnoughtUsed >= unit.dreadnoughtTransportCapacity ? "#e84a4a" : "var(--accent)" }}>
                          {dreadnoughtUsed}/{unit.dreadnoughtTransportCapacity}
                        </span>
                      </div>
                      <div style={{ display: "flex", flexWrap: "wrap", gap: "4px" }}>
                        {dreadnoughtUnits.map((d) => {
                          const active = transportedUnits.includes(d.unit.id);
                          const atCapacity = !active && dreadnoughtUsed >= unit.dreadnoughtTransportCapacity!;
                          return (
                            <button
                              key={d.unit.id}
                              disabled={atCapacity}
                              onClick={() => {
                                if (active) onTransportChange(transportedUnits.filter((x) => x !== d.unit.id));
                                else onTransportChange([...transportedUnits, d.unit.id]);
                              }}
                              style={{
                                background: active ? "var(--accent-dim)" : "none",
                                border: `1px solid ${active ? "var(--accent)" : "var(--border-2)"}`,
                                color: active ? "var(--accent)" : "var(--text-dim)",
                                fontFamily: "var(--font-mono)",
                                fontSize: "10px",
                                letterSpacing: "0.08em",
                                padding: "4px 10px",
                                cursor: atCapacity ? "not-allowed" : "pointer",
                                opacity: atCapacity ? 0.35 : 1,
                                transition: "all 0.15s",
                              }}
                            >
                              {d.unit.name}
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  );
                })()}
              </div>
            )}

          </div>
        </div>
      )}
    </div>
  );
}
