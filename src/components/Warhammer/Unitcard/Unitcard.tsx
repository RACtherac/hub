import { useState } from "react";
import type { Unit, Character } from "../../../types/warhammer";
import UnitImage from "../UnitImage/UnitImage";
import WargearSelector from "../WargearSelector/WargearSelector";
import CharacterAttachment from "../CharacterAttachment/CharacterAttachment";

const CATEGORY_COLORS: Record<string, string> = {
  battleline: "#4a9eff",
  infantry:   "#7ec87e",
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
  transportedUnits: string[];
  points: number;
  onModelCountChange: (count: number) => void;
  onWargearChange: (gear: string[]) => void;
  onCharacterChange: (char?: string) => void;
  onCharacterWargearChange: (gear: string[]) => void;
  onTransportChange: (units: string[]) => void;
  onRemove: () => void;
}

export default function UnitCard({
  unit, characters, allUnits,
  modelCount, selectedWargear,
  attachedCharacter, characterWargear,
  transportedUnits, points,
  onModelCountChange, onWargearChange,
  onCharacterChange, onCharacterWargearChange,
  onTransportChange, onRemove,
}: Props) {
  const [expanded, setExpanded] = useState(true);

  const isVehicle = unit.category === "vehicle" || unit.category === "monster";
  const isTransport = unit.category === "transport";

  const allowedCharacters = characters.filter((c) => c.canAttachTo.includes(unit.id));
  const selectedCharacter = characters.find((c) => c.id === attachedCharacter);
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

        {/* Model count badge (non-vehicle) */}
        {!isVehicle && !isTransport && (
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
            />

            {/* Model count toggle */}
            {!isVehicle && !isTransport && (
              <div style={{
                display: "flex",
                marginTop: "8px",
                border: "1px solid var(--border-2)",
                overflow: "hidden",
              }}>
                {[5, 10].map((n) => (
                  <button
                    key={n}
                    onClick={() => onModelCountChange(n)}
                    style={{
                      flex: 1,
                      background: modelCount === n ? "var(--accent-dim)" : "none",
                      border: "none",
                      borderRight: n === 5 ? "1px solid var(--border-2)" : "none",
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

            {/* Unit wargear */}
            {unit.wargear.length > 0 && (
              <WargearSelector
                label="Wargear"
                wargear={unit.wargear}
                selected={selectedWargear}
                onChange={onWargearChange}
              />
            )}

            {/* Character attachment */}
            {!isVehicle && !isTransport && allowedCharacters.length > 0 && (
              <CharacterAttachment
                characters={allowedCharacters}
                selectedCharacter={attachedCharacter}
                onChange={onCharacterChange}
              />
            )}

            {/* Character wargear */}
            {selectedCharacter?.wargear && selectedCharacter.wargear.length > 0 && (
              <WargearSelector
                label={`${selectedCharacter.name} — Wargear`}
                wargear={selectedCharacter.wargear}
                selected={characterWargear}
                onChange={onCharacterWargearChange}
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
                }}>
                  Embarked Units
                  {unit.transportCapacity && (
                    <span style={{ color: "var(--accent)", marginLeft: "8px" }}>
                      cap. {unit.transportCapacity}
                    </span>
                  )}
                </div>
                <div style={{ display: "flex", flexWrap: "wrap", gap: "4px" }}>
                  {allUnits
                    .filter((u) => u.category !== "vehicle" && u.category !== "transport" && u.category !== "monster")
                    .map((u) => {
                      const active = transportedUnits.includes(u.id);
                      return (
                        <button
                          key={u.id}
                          onClick={() => {
                            if (active) onTransportChange(transportedUnits.filter((x) => x !== u.id));
                            else onTransportChange([...transportedUnits, u.id]);
                          }}
                          style={{
                            background: active ? "var(--accent-dim)" : "none",
                            border: `1px solid ${active ? "var(--accent)" : "var(--border-2)"}`,
                            color: active ? "var(--accent)" : "var(--text-dim)",
                            fontFamily: "var(--font-mono)",
                            fontSize: "10px",
                            letterSpacing: "0.08em",
                            padding: "4px 10px",
                            cursor: "pointer",
                            transition: "all 0.15s",
                          }}
                        >
                          {u.name}
                        </button>
                      );
                    })}
                </div>
              </div>
            )}

          </div>
        </div>
      )}
    </div>
  );
}
