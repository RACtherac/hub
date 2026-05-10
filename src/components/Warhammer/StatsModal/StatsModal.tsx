import type { Unit, Character, WargearOption } from "../../../types/warhammer";

interface Props {
  unit: Unit;
  modelCount: number;
  selectedWargear: string[];
  wargearCounts: Record<string, number>;
  checkedNotes: string[];
  noteWeaponSelections: Record<string, string>;
  character?: Character;
  characterWargear: string[];
  character2?: Character;
  characterWargear2: string[];
  attachedUnit?: Unit;
  attachedUnitWargear: string[];
  onClose: () => void;
}

const TH_STYLE: React.CSSProperties = {
  fontFamily: "var(--font-mono)",
  fontSize: "9px",
  letterSpacing: "0.15em",
  textTransform: "uppercase",
  color: "var(--text-dim)",
  padding: "6px 10px",
  textAlign: "center",
  borderBottom: "1px solid var(--border-2)",
  whiteSpace: "nowrap",
};

const TD_STYLE: React.CSSProperties = {
  fontFamily: "var(--font-mono)",
  fontSize: "11px",
  color: "var(--text)",
  padding: "6px 10px",
  textAlign: "center",
  borderBottom: "1px solid rgba(255,255,255,0.04)",
};

const TD_NAME_STYLE: React.CSSProperties = {
  ...TD_STYLE,
  textAlign: "left",
  color: "var(--text)",
  fontWeight: 600,
};

function WeaponRows({ weapons, selected }: { weapons: WargearOption[]; selected?: string[] }) {
  const visible = (selected
    ? weapons.filter((w) => selected.includes(w.id))
    : weapons
  ).filter((w) => w.profiles && w.profiles.length > 0);

  if (visible.length === 0) return null;

  return (
    <>
      {visible.map((w) => {
        return w.profiles!.map((p, i) => (
          <tr key={`${w.id}-${i}`}>
            <td style={TD_NAME_STYLE}>
              {w.name}
              {p.profileName && (
                <span style={{ color: "var(--text-dim)", fontWeight: 400, marginLeft: "6px" }}>
                  [{p.profileName}]
                </span>
              )}
            </td>
            <td style={TD_STYLE}>{p.range}</td>
            <td style={TD_STYLE}>{p.attacks}</td>
            <td style={TD_STYLE}>{p.skill}</td>
            <td style={TD_STYLE}>{p.strength}</td>
            <td style={TD_STYLE}>{p.ap}</td>
            <td style={TD_STYLE}>{p.damage}</td>
            <td style={{ ...TD_STYLE, textAlign: "left" }}>
              {p.keywords?.map((k) => (
                <span key={k} style={{
                  display: "inline-block",
                  fontSize: "9px",
                  letterSpacing: "0.08em",
                  color: "var(--accent)",
                  border: "1px solid var(--accent)",
                  padding: "1px 5px",
                  marginRight: "4px",
                  marginBottom: "2px",
                  opacity: 0.75,
                }}>
                  {k}
                </span>
              ))}
            </td>
          </tr>
        ));
      })}
    </>
  );
}

export default function StatsModal({ unit, modelCount, selectedWargear, wargearCounts, checkedNotes, noteWeaponSelections, character, characterWargear, character2, characterWargear2, attachedUnit, attachedUnitWargear, onClose }: Props) {
  // Weapons from checked notes (single weaponId or selected from weaponIds dropdown)
  const noteWeaponIds = new Set(
    (unit.notes ?? [])
      .filter((n) => checkedNotes.includes(n.id))
      .flatMap((n) => {
        if (n.weaponIds && n.weaponIds.length > 0) {
          const sel = noteWeaponSelections[n.id];
          return sel ? [sel] : [];
        }
        return n.weaponId ? [n.weaponId] : [];
      })
  );
  const noteWeapons = unit.wargear.filter((w) => noteWeaponIds.has(w.id));

  const replacedDefaultIds = new Set(
    (unit.notes ?? [])
      .filter((n) => n.replacesDefaultWargear && checkedNotes.includes(n.id))
      .map((n) => n.replacesDefaultWargear!)
  );

  const hasAnyStats =
    unit.defaultWargear.length > 0 ||
    unit.wargear.length > 0 ||
    !!character ||
    !!character2;

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        background: "rgba(0,0,0,0.7)",
        zIndex: 1000,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "20px",
      }}
      onClick={onClose}
    >
      <div
        style={{
          background: "var(--surface)",
          border: "1px solid var(--border-2)",
          width: "100%",
          maxWidth: "860px",
          maxHeight: "85vh",
          overflowY: "auto",
          display: "flex",
          flexDirection: "column",
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div style={{
          display: "flex",
          alignItems: "center",
          padding: "14px 20px",
          borderBottom: "1px solid var(--border-2)",
          gap: "12px",
        }}>
          <span style={{
            fontFamily: "var(--font-display)",
            fontSize: "13px",
            fontWeight: 700,
            letterSpacing: "0.08em",
            textTransform: "uppercase",
            flex: 1,
          }}>
            {unit.name} — Stats
          </span>
          <button
            onClick={onClose}
            style={{
              background: "none",
              border: "none",
              color: "var(--text-dim)",
              fontFamily: "var(--font-mono)",
              fontSize: "18px",
              cursor: "pointer",
              padding: "0",
              lineHeight: 1,
            }}
            onMouseEnter={(e) => (e.currentTarget.style.color = "#e84a4a")}
            onMouseLeave={(e) => (e.currentTarget.style.color = "var(--text-dim)")}
          >
            ×
          </button>
        </div>

        <div style={{ padding: "20px", display: "flex", flexDirection: "column", gap: "24px" }}>

          {/* Weapons table */}
          {hasAnyStats && (
            <div>
              <div style={{
                fontFamily: "var(--font-mono)",
                fontSize: "10px",
                letterSpacing: "0.15em",
                textTransform: "uppercase",
                color: "var(--text-dim)",
                marginBottom: "10px",
              }}>
                Weapons
              </div>
              <div style={{ overflowX: "auto" }}>
                <table style={{ width: "100%", borderCollapse: "collapse", tableLayout: "auto" }}>
                  <thead>
                    <tr>
                      <th style={{ ...TH_STYLE, textAlign: "left" }}>Weapon</th>
                      <th style={TH_STYLE}>Range</th>
                      <th style={TH_STYLE}>A</th>
                      <th style={TH_STYLE}>BS/WS</th>
                      <th style={TH_STYLE}>S</th>
                      <th style={TH_STYLE}>AP</th>
                      <th style={TH_STYLE}>D</th>
                      <th style={{ ...TH_STYLE, textAlign: "left" }}>Keywords</th>
                    </tr>
                  </thead>
                  <tbody>
                    {/* Unit default weapons (always equipped, minus any replaced by checked notes) */}
                    <WeaponRows weapons={unit.defaultWargear.filter((w) => !replacedDefaultIds.has(w.id))} />
                    {/* Unit selected optional weapons (toggled or countable with count > 0) */}
                    <WeaponRows weapons={unit.wargear.filter((w) => {
                      if (!w.countable) return selectedWargear.includes(w.id);
                      if (w.linkedCounterId) {
                        const baseMax = w.maxCountByModelCount?.[modelCount] ?? 0;
                        return (baseMax - (wargearCounts[w.linkedCounterId] ?? 0)) > 0;
                      }
                      return (wargearCounts[w.id] ?? 0) > 0;
                    })} />
                    {/* Note-linked weapons (e.g. grenade launcher when checkbox is ticked) */}
                    <WeaponRows weapons={noteWeapons} />
                    {/* Character weapons */}
                    {character && (
                      <>
                        <tr>
                          <td colSpan={8} style={{
                            fontFamily: "var(--font-mono)",
                            fontSize: "9px",
                            letterSpacing: "0.12em",
                            textTransform: "uppercase",
                            color: "var(--accent)",
                            padding: "10px 10px 4px",
                            opacity: 0.7,
                          }}>
                            {character.name}
                          </td>
                        </tr>
                        <WeaponRows weapons={character.defaultWargear ?? []} />
                        <WeaponRows weapons={(character.wargear ?? []).filter((w) => characterWargear.includes(w.id))} />
                      </>
                    )}
                    {/* Second character weapons */}
                    {character2 && (
                      <>
                        <tr>
                          <td colSpan={8} style={{
                            fontFamily: "var(--font-mono)",
                            fontSize: "9px",
                            letterSpacing: "0.12em",
                            textTransform: "uppercase",
                            color: "var(--accent)",
                            padding: "10px 10px 4px",
                            opacity: 0.7,
                          }}>
                            {character2.name}
                          </td>
                        </tr>
                        <WeaponRows weapons={character2.defaultWargear ?? []} />
                        <WeaponRows weapons={(character2.wargear ?? []).filter((w) => characterWargear2.includes(w.id))} />
                      </>
                    )}
                    {/* Attached unit weapons */}
                    {attachedUnit && (
                      <>
                        <tr>
                          <td colSpan={8} style={{
                            fontFamily: "var(--font-mono)",
                            fontSize: "9px",
                            letterSpacing: "0.12em",
                            textTransform: "uppercase",
                            color: "var(--accent)",
                            padding: "10px 10px 4px",
                            opacity: 0.7,
                          }}>
                            {attachedUnit.name}
                          </td>
                        </tr>
                        <WeaponRows weapons={attachedUnit.defaultWargear} />
                        <WeaponRows weapons={attachedUnit.wargear.filter((w) => attachedUnitWargear.includes(w.id))} />
                      </>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Unit abilities */}
          {unit.abilities && unit.abilities.filter((a) => !a.requiresNote || checkedNotes.includes(a.requiresNote)).length > 0 && (
            <div>
              <div style={{
                fontFamily: "var(--font-mono)",
                fontSize: "10px",
                letterSpacing: "0.15em",
                textTransform: "uppercase",
                color: "var(--text-dim)",
                marginBottom: "10px",
              }}>
                Unit Abilities
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                {unit.abilities.filter((a) => !a.requiresNote || checkedNotes.includes(a.requiresNote)).map((a) => (
                  <div key={a.name} style={{
                    background: "rgba(255,255,255,0.02)",
                    border: "1px solid var(--border-2)",
                    padding: "10px 14px",
                  }}>
                    <div style={{
                      fontFamily: "var(--font-mono)",
                      fontSize: "11px",
                      fontWeight: 700,
                      letterSpacing: "0.06em",
                      color: "var(--accent)",
                      marginBottom: "4px",
                    }}>
                      {a.name}
                    </div>
                    <div style={{
                      fontFamily: "var(--font-mono)",
                      fontSize: "11px",
                      color: "var(--text-dim)",
                      lineHeight: 1.6,
                    }}>
                      {a.description}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Unit wargear notes (for selected optional wargear and note-linked wargear) */}
          {(() => {
            const noteGear = [
              ...unit.defaultWargear.filter((w) => w.note),
              ...unit.wargear.filter((w) => selectedWargear.includes(w.id) && w.note),
              ...unit.wargear.filter((w) => noteWeaponIds.has(w.id) && w.note),
            ];
            return noteGear.length > 0 ? (
              <div>
                <div style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: "10px",
                  letterSpacing: "0.15em",
                  textTransform: "uppercase",
                  color: "var(--text-dim)",
                  marginBottom: "10px",
                }}>
                  Wargear Rules
                </div>
                <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                  {noteGear.map((w) => (
                    <div key={w.id} style={{
                      background: "rgba(255,255,255,0.02)",
                      border: "1px solid var(--border-2)",
                      padding: "10px 14px",
                    }}>
                      <div style={{
                        fontFamily: "var(--font-mono)",
                        fontSize: "11px",
                        fontWeight: 700,
                        letterSpacing: "0.06em",
                        color: "var(--accent)",
                        marginBottom: "4px",
                      }}>
                        {w.name}
                      </div>
                      <div style={{
                        fontFamily: "var(--font-mono)",
                        fontSize: "11px",
                        color: "var(--text-dim)",
                        lineHeight: 1.6,
                      }}>
                        {w.note}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ) : null;
          })()}

          {/* Character wargear notes */}
          {character && (() => {
            const noteGear = [
              ...(character.defaultWargear ?? []).filter((w) => w.note),
              ...(character.wargear ?? []).filter((w) => characterWargear.includes(w.id) && w.note),
            ];
            return noteGear.length > 0 ? (
              <div>
                <div style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: "10px",
                  letterSpacing: "0.15em",
                  textTransform: "uppercase",
                  color: "var(--text-dim)",
                  marginBottom: "10px",
                }}>
                  {character.name} — Wargear Rules
                </div>
                <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                  {noteGear.map((w) => (
                    <div key={w.id} style={{
                      background: "rgba(255,255,255,0.02)",
                      border: "1px solid var(--border-2)",
                      padding: "10px 14px",
                    }}>
                      <div style={{
                        fontFamily: "var(--font-mono)",
                        fontSize: "11px",
                        fontWeight: 700,
                        letterSpacing: "0.06em",
                        color: "var(--accent)",
                        marginBottom: "4px",
                      }}>
                        {w.name}
                      </div>
                      <div style={{
                        fontFamily: "var(--font-mono)",
                        fontSize: "11px",
                        color: "var(--text-dim)",
                        lineHeight: 1.6,
                      }}>
                        {w.note}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ) : null;
          })()}

          {/* Character abilities */}
          {character?.abilities && character.abilities.length > 0 && (
            <div>
              <div style={{
                fontFamily: "var(--font-mono)",
                fontSize: "10px",
                letterSpacing: "0.15em",
                textTransform: "uppercase",
                color: "var(--text-dim)",
                marginBottom: "10px",
              }}>
                {character.name} — Abilities
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                {character.abilities.map((a) => (
                  <div key={a.name} style={{
                    background: "rgba(255,255,255,0.02)",
                    border: "1px solid var(--border-2)",
                    padding: "10px 14px",
                  }}>
                    <div style={{
                      fontFamily: "var(--font-mono)",
                      fontSize: "11px",
                      fontWeight: 700,
                      letterSpacing: "0.06em",
                      color: "var(--accent)",
                      marginBottom: "4px",
                    }}>
                      {a.name}
                    </div>
                    <div style={{
                      fontFamily: "var(--font-mono)",
                      fontSize: "11px",
                      color: "var(--text-dim)",
                      lineHeight: 1.6,
                    }}>
                      {a.description}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Second character wargear notes */}
          {character2 && (() => {
            const noteGear = [
              ...(character2.defaultWargear ?? []).filter((w) => w.note),
              ...(character2.wargear ?? []).filter((w) => characterWargear2.includes(w.id) && w.note),
            ];
            return noteGear.length > 0 ? (
              <div>
                <div style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: "10px",
                  letterSpacing: "0.15em",
                  textTransform: "uppercase",
                  color: "var(--text-dim)",
                  marginBottom: "10px",
                }}>
                  {character2.name} — Wargear Rules
                </div>
                <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                  {noteGear.map((w) => (
                    <div key={w.id} style={{
                      background: "rgba(255,255,255,0.02)",
                      border: "1px solid var(--border-2)",
                      padding: "10px 14px",
                    }}>
                      <div style={{
                        fontFamily: "var(--font-mono)",
                        fontSize: "11px",
                        fontWeight: 700,
                        letterSpacing: "0.06em",
                        color: "var(--accent)",
                        marginBottom: "4px",
                      }}>
                        {w.name}
                      </div>
                      <div style={{
                        fontFamily: "var(--font-mono)",
                        fontSize: "11px",
                        color: "var(--text-dim)",
                        lineHeight: 1.6,
                      }}>
                        {w.note}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ) : null;
          })()}

          {/* Second character abilities */}
          {character2?.abilities && character2.abilities.length > 0 && (
            <div>
              <div style={{
                fontFamily: "var(--font-mono)",
                fontSize: "10px",
                letterSpacing: "0.15em",
                textTransform: "uppercase",
                color: "var(--text-dim)",
                marginBottom: "10px",
              }}>
                {character2.name} — Abilities
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                {character2.abilities.map((a) => (
                  <div key={a.name} style={{
                    background: "rgba(255,255,255,0.02)",
                    border: "1px solid var(--border-2)",
                    padding: "10px 14px",
                  }}>
                    <div style={{
                      fontFamily: "var(--font-mono)",
                      fontSize: "11px",
                      fontWeight: 700,
                      letterSpacing: "0.06em",
                      color: "var(--accent)",
                      marginBottom: "4px",
                    }}>
                      {a.name}
                    </div>
                    <div style={{
                      fontFamily: "var(--font-mono)",
                      fontSize: "11px",
                      color: "var(--text-dim)",
                      lineHeight: 1.6,
                    }}>
                      {a.description}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}
