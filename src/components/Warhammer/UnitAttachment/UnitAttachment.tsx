import type { Unit } from "../../../types/warhammer";

interface Props {
  units: Unit[];
  selectedUnit?: string;
  onChange: (unitId?: string) => void;
}

export default function UnitAttachment({ units, selectedUnit, onChange }: Props) {
  return (
    <div>
      <div style={{
        fontFamily: "var(--font-mono)",
        fontSize: "10px",
        letterSpacing: "0.15em",
        textTransform: "uppercase",
        color: "var(--text-dim)",
        marginBottom: "10px",
      }}>
        Attached Unit
      </div>

      <div style={{ display: "flex", flexWrap: "wrap", gap: "4px" }}>
        <button
          onClick={() => onChange(undefined)}
          style={{
            background: !selectedUnit ? "var(--accent-dim)" : "none",
            border: `1px solid ${!selectedUnit ? "var(--accent)" : "var(--border-2)"}`,
            color: !selectedUnit ? "var(--accent)" : "var(--text-dim)",
            fontFamily: "var(--font-mono)",
            fontSize: "10px",
            letterSpacing: "0.08em",
            padding: "5px 12px",
            cursor: "pointer",
            transition: "all 0.15s",
          }}
        >
          None
        </button>

        {units.map((unit) => {
          const active = selectedUnit === unit.id;
          return (
            <button
              key={unit.id}
              onClick={() => onChange(active ? undefined : unit.id)}
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
              {unit.name}
              <span style={{ opacity: 0.6 }}>{unit.points}pts</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
