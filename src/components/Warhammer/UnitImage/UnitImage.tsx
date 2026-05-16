import type { Unit, Character } from "../../../types/warhammer";

interface Props {
  unit: Unit;
  modelCount: number;
  characters: Character[];
  attachedCharacter?: string;
  attachedCharacter2?: string;
  attachedUnit?: Unit;
}

export default function UnitImage({
  unit, modelCount,
  characters, attachedCharacter, attachedCharacter2,
  attachedUnit,
}: Props) {
  const selectedCharacter = characters.find((c) => c.id === attachedCharacter);
  const selectedCharacter2 = characters.find((c) => c.id === attachedCharacter2);

  const frameHeight = 260;

  const baseImage =
    unit.category === "vehicle" || unit.category === "transport" || unit.category === "monster"
      ? unit.image
      : modelCount === 20
      ? (unit.image20 ?? unit.image10 ?? unit.image)
      : modelCount === 10
      ? (unit.image10 ?? unit.image)
      : modelCount === 6
      ? (unit.image6 ?? unit.image)
      : modelCount === 3
      ? (unit.image3 ?? unit.image)
      : (unit.image5 ?? unit.image);


  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
    <div style={{ display: "flex", gap: "8px", alignItems: "flex-end" }}>
      {/* Unit frame */}
      <div style={{
        position: "relative",
        width: 280,
        height: frameHeight,
        background: "var(--surface-2)",
        border: "1px solid var(--border-2)",
        overflow: "hidden",
        flexShrink: 0,
      }}>
        {/* Corner accents */}
        <div style={{ position: "absolute", top: 0, left: 0, width: "12px", height: "12px", borderTop: "2px solid var(--accent)", borderLeft: "2px solid var(--accent)", zIndex: 10 }} />
        <div style={{ position: "absolute", top: 0, right: 0, width: "12px", height: "12px", borderTop: "2px solid var(--accent)", borderRight: "2px solid var(--accent)", zIndex: 10 }} />
        <div style={{ position: "absolute", bottom: 0, left: 0, width: "12px", height: "12px", borderBottom: "2px solid var(--accent)", borderLeft: "2px solid var(--accent)", zIndex: 10 }} />
        <div style={{ position: "absolute", bottom: 0, right: 0, width: "12px", height: "12px", borderBottom: "2px solid var(--accent)", borderRight: "2px solid var(--accent)", zIndex: 10 }} />

        {!baseImage && (
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

        {baseImage && (
          <img src={baseImage} style={{
            position: "absolute",
            width: "240px",
            left: 0,
            right: 0,
            margin: "0 auto",
            bottom: "10px",
            zIndex: 3,
            ...(unit.id !== "deathshroud-terminators" && { objectFit: "contain" }),
          }} />
        )}
      </div>

      {/* Character frame */}
      {selectedCharacter && (
        <div style={{
          position: "relative",
          width: 200,
          height: 200,
          background: "var(--surface-2)",
          border: "1px solid var(--border-2)",
          overflow: "hidden",
          flexShrink: 0,
        }}>
          <div style={{ position: "absolute", top: 0, left: 0, width: "8px", height: "8px", borderTop: "1px solid var(--accent)", borderLeft: "1px solid var(--accent)", zIndex: 10 }} />
          <div style={{ position: "absolute", top: 0, right: 0, width: "8px", height: "8px", borderTop: "1px solid var(--accent)", borderRight: "1px solid var(--accent)", zIndex: 10 }} />
          <div style={{ position: "absolute", bottom: 0, left: 0, width: "8px", height: "8px", borderBottom: "1px solid var(--accent)", borderLeft: "1px solid var(--accent)", zIndex: 10 }} />
          <div style={{ position: "absolute", bottom: 0, right: 0, width: "8px", height: "8px", borderBottom: "1px solid var(--accent)", borderRight: "1px solid var(--accent)", zIndex: 10 }} />
          <img src={selectedCharacter.image} style={{
            position: "absolute",
            width: "180px",
            height: "180px",
            bottom: "10px",
            left: "10px",
            zIndex: 4,
            objectFit: "contain",
            objectPosition: "bottom",
          }} />
        </div>
      )}

      {/* Second character frame */}
      {selectedCharacter2 && (
        <div style={{
          position: "relative",
          width: 200,
          height: 200,
          background: "var(--surface-2)",
          border: "1px solid var(--border-2)",
          overflow: "hidden",
          flexShrink: 0,
        }}>
          <div style={{ position: "absolute", top: 0, left: 0, width: "8px", height: "8px", borderTop: "1px solid var(--accent)", borderLeft: "1px solid var(--accent)", zIndex: 10 }} />
          <div style={{ position: "absolute", top: 0, right: 0, width: "8px", height: "8px", borderTop: "1px solid var(--accent)", borderRight: "1px solid var(--accent)", zIndex: 10 }} />
          <div style={{ position: "absolute", bottom: 0, left: 0, width: "8px", height: "8px", borderBottom: "1px solid var(--accent)", borderLeft: "1px solid var(--accent)", zIndex: 10 }} />
          <div style={{ position: "absolute", bottom: 0, right: 0, width: "8px", height: "8px", borderBottom: "1px solid var(--accent)", borderRight: "1px solid var(--accent)", zIndex: 10 }} />
          {selectedCharacter2.image ? (
            <img src={selectedCharacter2.image} style={{
              position: "absolute",
              width: "180px",
              height: "180px",
              bottom: "10px",
              left: "10px",
              zIndex: 4,
              objectFit: "contain",
              objectPosition: "bottom",
            }} />
          ) : (
            <div style={{
              position: "absolute", inset: 0,
              display: "flex", alignItems: "center", justifyContent: "center",
              color: "var(--text-dim)", fontFamily: "var(--font-mono)",
              fontSize: "9px", letterSpacing: "0.08em", opacity: 0.4,
            }}>NO IMAGE</div>
          )}
        </div>
      )}

      {/* Attached unit frame (e.g. Invader ATV) */}
      {attachedUnit && (
        <div style={{
          position: "relative",
          width: 120,
          height: 160,
          background: "var(--surface-2)",
          border: "1px solid var(--border-2)",
          overflow: "hidden",
          flexShrink: 0,
        }}>
          <div style={{ position: "absolute", top: 0, left: 0, width: "8px", height: "8px", borderTop: "1px solid var(--accent)", borderLeft: "1px solid var(--accent)", zIndex: 10 }} />
          <div style={{ position: "absolute", top: 0, right: 0, width: "8px", height: "8px", borderTop: "1px solid var(--accent)", borderRight: "1px solid var(--accent)", zIndex: 10 }} />
          <div style={{ position: "absolute", bottom: 0, left: 0, width: "8px", height: "8px", borderBottom: "1px solid var(--accent)", borderLeft: "1px solid var(--accent)", zIndex: 10 }} />
          <div style={{ position: "absolute", bottom: 0, right: 0, width: "8px", height: "8px", borderBottom: "1px solid var(--accent)", borderRight: "1px solid var(--accent)", zIndex: 10 }} />
          {attachedUnit.image ? (
            <img src={attachedUnit.image} style={{
              position: "absolute",
              width: "110px",
              bottom: "0",
              left: "5px",
              zIndex: 4,
              objectFit: "contain",
            }} />
          ) : (
            <div style={{
              position: "absolute", inset: 0,
              display: "flex", alignItems: "center", justifyContent: "center",
              color: "var(--text-dim)", fontFamily: "var(--font-mono)",
              fontSize: "9px", letterSpacing: "0.08em", opacity: 0.4,
            }}>NO IMAGE</div>
          )}
        </div>
      )}
    </div>
    {(() => {
      const credits: { label: string; credit: string }[] = [];
      if (unit.imageCredit) credits.push({ label: unit.name, credit: unit.imageCredit });
      if (selectedCharacter?.imageCredit) credits.push({ label: selectedCharacter.name, credit: selectedCharacter.imageCredit });
      if (selectedCharacter2?.imageCredit) credits.push({ label: selectedCharacter2.name, credit: selectedCharacter2.imageCredit });
      if (credits.length === 0) return null;
      return (
        <div style={{ display: "flex", flexDirection: "column", gap: "2px", alignSelf: "flex-start" }}>
          {credits.map(({ label, credit }) => (
            <div key={label} style={{
              display: "inline-flex",
              alignItems: "center",
              padding: "4px 10px",
              border: "1px solid var(--border-2)",
              background: "var(--surface-2)",
              fontFamily: "var(--font-mono)",
              fontSize: "9px",
              color: "white",
              opacity: 0.85,
              letterSpacing: "0.05em",
            }}>
              <span style={{ color: "var(--text-dim)", marginRight: "6px" }}>{label}:</span>
              {credit}
            </div>
          ))}
        </div>
      );
    })()}
    </div>
  );
}
