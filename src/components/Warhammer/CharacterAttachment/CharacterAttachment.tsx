import type { Character } from "../../../types/warhammer";

interface Props {
  characters: Character[];
  selectedCharacter?: string;
  onChange: (char?: string) => void;
  label?: string;
}

export default function CharacterAttachment({ characters, selectedCharacter, onChange, label = "Attached Character" }: Props) {
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
        {label}
      </div>

      <div style={{ display: "flex", flexWrap: "wrap", gap: "4px" }}>
        <button
          onClick={() => onChange(undefined)}
          style={{
            background: !selectedCharacter ? "var(--accent-dim)" : "none",
            border: `1px solid ${!selectedCharacter ? "var(--accent)" : "var(--border-2)"}`,
            color: !selectedCharacter ? "var(--accent)" : "var(--text-dim)",
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

        {characters.map((char) => {
          const active = selectedCharacter === char.id;
          return (
            <button
              key={char.id}
              onClick={() => onChange(active ? undefined : char.id)}
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
              {char.name}
              <span style={{ opacity: 0.6 }}>{char.points}pts</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
