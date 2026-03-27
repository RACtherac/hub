import { useState } from "react";
import type { Character } from "../../../types/warhammer";
import WargearSelector from "../WargearSelector/WargearSelector";

interface Props {
  character: Character;
  selectedWargear: string[];
  points: number;
  onWargearChange: (gear: string[]) => void;
  onRemove: () => void;
}

export default function CharacterCard({
  character, selectedWargear, points, onWargearChange, onRemove,
}: Props) {
  const [expanded, setExpanded] = useState(true);

  return (
    <div style={{
      background: "var(--surface)",
      border: "1px solid var(--border-2)",
      borderLeft: "3px solid var(--accent)",
      marginBottom: "2px",
    }}>

      {/* HEADER */}
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
        {/* Character pip */}
        <div style={{
          width: "6px",
          height: "6px",
          background: "var(--accent)",
          borderRadius: "50%",
          flexShrink: 0,
        }} />

        {/* Name */}
        <span style={{
          fontFamily: "var(--font-display)",
          fontSize: "13px",
          fontWeight: 700,
          letterSpacing: "0.06em",
          textTransform: "uppercase",
          flex: 1,
        }}>
          {character.name}
        </span>

        {/* Character badge */}
        <span style={{
          fontFamily: "var(--font-mono)",
          fontSize: "9px",
          letterSpacing: "0.15em",
          textTransform: "uppercase",
          color: "var(--accent)",
          opacity: 0.8,
          border: "1px solid var(--accent)",
          padding: "2px 8px",
        }}>
          Character
        </span>

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

      {/* BODY */}
      {expanded && (
        <div style={{
          display: "grid",
          gridTemplateColumns: "auto 1fr",
          gap: "24px",
          padding: "20px",
        }}>

          {/* LEFT: image */}
          <div style={{
            position: "relative",
            width: 200,
            height: 200,
            background: "var(--surface-2)",
            border: "1px solid var(--border-2)",
            overflow: "hidden",
            flexShrink: 0,
          }}>
            <div style={{ position: "absolute", top: 0, left: 0, width: "12px", height: "12px", borderTop: "2px solid var(--accent)", borderLeft: "2px solid var(--accent)", zIndex: 10 }} />
            <div style={{ position: "absolute", top: 0, right: 0, width: "12px", height: "12px", borderTop: "2px solid var(--accent)", borderRight: "2px solid var(--accent)", zIndex: 10 }} />
            <div style={{ position: "absolute", bottom: 0, left: 0, width: "12px", height: "12px", borderBottom: "2px solid var(--accent)", borderLeft: "2px solid var(--accent)", zIndex: 10 }} />
            <div style={{ position: "absolute", bottom: 0, right: 0, width: "12px", height: "12px", borderBottom: "2px solid var(--accent)", borderRight: "2px solid var(--accent)", zIndex: 10 }} />

            {character.image ? (
              <img src={character.image} style={{
                position: "absolute",
                width: "180px",
                bottom: 0,
                left: "10px",
                objectFit: "contain",
              }} />
            ) : (
              <div style={{
                position: "absolute",
                inset: 0,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "var(--text-dim)",
                fontFamily: "var(--font-mono)",
                fontSize: "10px",
                letterSpacing: "0.1em",
                opacity: 0.4,
              }}>
                NO IMAGE
              </div>
            )}
          </div>

          {/* RIGHT: wargear */}
          <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
            {character.wargear && character.wargear.length > 0 ? (
              <WargearSelector
                label="Wargear"
                wargear={character.wargear}
                selected={selectedWargear}
                onChange={onWargearChange}
              />
            ) : (
              <div style={{
                fontFamily: "var(--font-mono)",
                fontSize: "10px",
                color: "var(--text-dim)",
                letterSpacing: "0.1em",
                opacity: 0.5,
              }}>
                No wargear options
              </div>
            )}
          </div>

        </div>
      )}
    </div>
  );
}
