import { useState } from "react";
import type { WargearOption } from "../../../types/warhammer";

interface Props {
  label?: string;
  wargear: WargearOption[];
  selected: string[];
  onChange: (gear: string[]) => void;
}

export default function WargearSelector({ label = "Wargear", wargear, selected, onChange }: Props) {
  const [showImages, setShowImages] = useState(false);

  const toggle = (id: string) => {
    if (selected.includes(id)) onChange(selected.filter((g) => g !== id));
    else onChange([...selected, id]);
  };

  const withImages = wargear.filter((g) => g.image);

  return (
    <div>
      <div style={{
        display: "flex",
        alignItems: "center",
        gap: "10px",
        marginBottom: "10px",
      }}>
        <div style={{
          fontFamily: "var(--font-mono)",
          fontSize: "10px",
          letterSpacing: "0.15em",
          textTransform: "uppercase",
          color: "var(--text-dim)",
        }}>
          {label}
        </div>

        {withImages.length > 0 && (
          <button
            onClick={() => setShowImages(!showImages)}
            style={{
              background: showImages ? "var(--accent-dim)" : "none",
              border: `1px solid ${showImages ? "var(--accent)" : "var(--border-2)"}`,
              color: showImages ? "var(--accent)" : "var(--text-dim)",
              fontFamily: "var(--font-mono)",
              fontSize: "9px",
              letterSpacing: "0.1em",
              textTransform: "uppercase",
              padding: "2px 8px",
              cursor: "pointer",
              transition: "all 0.15s",
            }}
          >
            {showImages ? "hide images" : "show images"}
          </button>
        )}
      </div>

      {showImages && (
        <div style={{
          display: "flex",
          flexWrap: "wrap",
          gap: "12px",
          marginBottom: "12px",
          padding: "12px",
          background: "var(--surface-2, rgba(255,255,255,0.03))",
          border: "1px solid var(--border)",
        }}>
          {withImages.map((gear) => (
            <div
              key={gear.id}
              onClick={() => toggle(gear.id)}
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: "6px",
                cursor: "pointer",
                opacity: selected.includes(gear.id) ? 1 : 0.45,
                transition: "opacity 0.15s",
              }}
            >
              <div style={{
                width: "80px",
                height: "80px",
                border: `1px solid ${selected.includes(gear.id) ? "var(--accent)" : "var(--border-2)"}`,
                background: selected.includes(gear.id) ? "var(--accent-dim)" : "none",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                transition: "border-color 0.15s, background 0.15s",
              }}>
                <img
                  src={gear.image}
                  alt={gear.name}
                  style={{ maxWidth: "68px", maxHeight: "68px", objectFit: "contain" }}
                />
              </div>
              <span style={{
                fontFamily: "var(--font-mono)",
                fontSize: "9px",
                letterSpacing: "0.08em",
                color: selected.includes(gear.id) ? "var(--accent)" : "var(--text-dim)",
                textAlign: "center",
                maxWidth: "80px",
                transition: "color 0.15s",
              }}>
                {gear.name}
              </span>
            </div>
          ))}
        </div>
      )}


      <div style={{ display: "flex", flexWrap: "wrap", gap: "4px" }}>
        {wargear.map((gear) => {
          const active = selected.includes(gear.id);
          return (
            <button
              key={gear.id}
              onClick={() => toggle(gear.id)}
              style={{
                background: active ? "var(--accent-dim)" : "none",
                border: `1px solid ${active ? "var(--accent)" : "var(--border-2)"}`,
                color: active ? "var(--accent)" : "var(--text-dim)",
                fontFamily: "var(--font-mono)",
                fontSize: "10px",
                letterSpacing: "0.08em",
                padding: "5px 12px",
                cursor: "pointer",
                transition: "all 0.15s",
                display: "flex",
                alignItems: "center",
                gap: "6px",
              }}
            >
              <span style={{
                width: "5px",
                height: "5px",
                background: active ? "var(--accent)" : "var(--border-2)",
                clipPath: "polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)",
                flexShrink: 0,
                transition: "background 0.15s",
              }} />
              {gear.name}
              {gear.points != null && gear.points > 0 && (
                <span style={{ color: active ? "var(--accent)" : "var(--text-dim)", opacity: 0.7 }}>
                  +{gear.points}
                </span>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}
