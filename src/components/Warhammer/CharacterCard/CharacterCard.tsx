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
  const [showWargear, setShowWargear] = useState(false);
  const [statsOpen, setStatsOpen] = useState(false);

  const hasStats = [...(character.defaultWargear ?? []), ...(character.wargear ?? [])].some(w => w.profiles?.length) || !!character.abilities?.length;

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
            onMouseEnter={(e) => { e.currentTarget.style.color = "var(--accent)"; e.currentTarget.style.borderColor = "var(--accent)"; }}
            onMouseLeave={(e) => { e.currentTarget.style.color = "var(--text-dim)"; e.currentTarget.style.borderColor = "var(--border-2)"; }}
          >
            Stats
          </button>
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
      {statsOpen && (() => {
        const allWeapons = [...(character.defaultWargear ?? []), ...(character.wargear ?? []).filter(w => selectedWargear.includes(w.id))].filter(w => w.profiles?.length);
        return (
          <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.7)", zIndex: 1000, display: "flex", alignItems: "center", justifyContent: "center", padding: "20px" }} onClick={() => setStatsOpen(false)}>
            <div style={{ background: "var(--surface)", border: "1px solid var(--border-2)", width: "100%", maxWidth: "860px", maxHeight: "85vh", overflowY: "auto" }} onClick={e => e.stopPropagation()}>
              <div style={{ display: "flex", alignItems: "center", padding: "14px 20px", borderBottom: "1px solid var(--border-2)", gap: "12px" }}>
                <span style={{ fontFamily: "var(--font-display)", fontSize: "13px", fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase", flex: 1 }}>
                  {character.name} — Stats
                </span>
                <button onClick={() => setStatsOpen(false)} style={{ background: "none", border: "none", color: "var(--text-dim)", fontFamily: "var(--font-mono)", fontSize: "18px", cursor: "pointer", padding: 0, lineHeight: 1 }}
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
                {character.abilities && character.abilities.length > 0 && (
                  <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                    {character.abilities.map(a => (
                      <div key={a.name} style={{ background: "rgba(255,255,255,0.02)", border: "1px solid var(--border-2)", padding: "10px 14px" }}>
                        <div style={{ fontFamily: "var(--font-mono)", fontSize: "11px", fontWeight: 700, letterSpacing: "0.06em", color: "var(--accent)", marginBottom: "4px" }}>{a.name}</div>
                        <div style={{ fontFamily: "var(--font-mono)", fontSize: "11px", color: "var(--text-dim)", lineHeight: 1.6 }}>{a.description}</div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        );
      })()}

      {/* BODY */}
      {expanded && (
        <div style={{
          display: "grid",
          gridTemplateColumns: "auto 1fr",
          gap: "24px",
          padding: "20px",
        }}>

          {/* LEFT: frame */}
          <div style={{ display: "flex", alignItems: "flex-end" }}>

            {/* Main frame */}
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
                  position: "absolute", inset: 0,
                  display: "flex", alignItems: "center", justifyContent: "center",
                  color: "var(--text-dim)", fontFamily: "var(--font-mono)",
                  fontSize: "10px", letterSpacing: "0.1em", opacity: 0.4,
                }}>NO IMAGE</div>
              )}
            </div>

          </div>

          {/* RIGHT: info + wargear */}
          <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>

            {/* Always Equipped */}
            {character.defaultWargear && character.defaultWargear.length > 0 && (
              <div>
                <div style={{
                  fontFamily: "var(--font-mono)", fontSize: "10px",
                  letterSpacing: "0.15em", textTransform: "uppercase",
                  color: "var(--text-dim)", marginBottom: "8px",
                }}>
                  Always Equipped
                </div>
                <div style={{ display: "flex", flexWrap: "wrap", gap: "4px" }}>
                  {character.defaultWargear.map((w) => (
                    <span key={w.id} style={{
                      fontFamily: "var(--font-mono)", fontSize: "10px",
                      letterSpacing: "0.06em", color: "var(--text)",
                      border: "1px solid var(--border-2)", padding: "3px 8px",
                      background: "rgba(255,255,255,0.03)",
                    }}>
                      {w.name}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Wargear toggle */}
            {character.wargear && character.wargear.length > 0 && (
              <div>
                <button
                  onClick={() => setShowWargear(!showWargear)}
                  style={{
                    background: showWargear ? "var(--accent-dim)" : "none",
                    border: `1px solid ${showWargear ? "var(--accent)" : "var(--border-2)"}`,
                    color: showWargear ? "var(--accent)" : "var(--text-dim)",
                    fontFamily: "var(--font-mono)", fontSize: "10px",
                    letterSpacing: "0.12em", textTransform: "uppercase",
                    padding: "5px 14px", cursor: "pointer", transition: "all 0.15s",
                    display: "flex", alignItems: "center", gap: "8px",
                    marginBottom: showWargear ? "12px" : "0",
                  }}
                >
                  <span style={{
                    width: "5px", height: "5px", flexShrink: 0,
                    background: showWargear ? "var(--accent)" : "var(--border-2)",
                    clipPath: "polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)",
                    transition: "background 0.15s",
                  }} />
                  {showWargear ? "Hide Wargear" : "Show Wargear"}
                </button>
                {showWargear && (
                  character.wargearSections ? (
                    <>
                      {character.wargearSections.map((section) => {
                        const sectionWargear = section.ids
                          .map(id => character.wargear!.find(w => w.id === id))
                          .filter(Boolean) as NonNullable<typeof character.wargear>;
                        if (sectionWargear.length === 0) return null;
                        return (
                          <WargearSelector
                            key={section.label}
                            label={section.label}
                            wargear={sectionWargear}
                            selected={selectedWargear}
                            onChange={onWargearChange}
                            groups={character.wargearGroups}
                          />
                        );
                      })}
                    </>
                  ) : (
                    <WargearSelector
                      label="Wargear Options"
                      wargear={character.wargear}
                      selected={selectedWargear}
                      onChange={onWargearChange}
                      groups={character.wargearGroups}
                    />
                  )
                )}
              </div>
            )}

          </div>

        </div>
      )}
    </div>
  );
}
