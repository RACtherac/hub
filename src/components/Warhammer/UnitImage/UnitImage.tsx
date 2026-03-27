import type { Unit, Character } from "../../../types/warhammer";

interface Props {
  unit: Unit;
  modelCount: number;
  characters: Character[];
  attachedCharacter?: string;
}

export default function UnitImage({
  unit, modelCount,
  characters, attachedCharacter,
}: Props) {
  const selectedCharacter = characters.find((c) => c.id === attachedCharacter);
  const hasCharacter = !!selectedCharacter;

  const frameWidth = hasCharacter ? 340 : 280;
  const frameHeight = 260;

  const baseImage =
    unit.category === "vehicle" || unit.category === "transport" || unit.category === "monster"
      ? unit.image
      : modelCount === 10
      ? unit.image10
      : modelCount === 6
      ? unit.image6
      : modelCount === 3
      ? unit.image3
      : unit.image5;


  return (
    <div style={{
      position: "relative",
      width: frameWidth,
      height: frameHeight,
      background: "var(--surface-2)",
      border: "1px solid var(--border-2)",
      overflow: "hidden",
      transition: "width 0.2s",
      flexShrink: 0,
    }}>
      {/* Corner accents */}
      <div style={{ position: "absolute", top: 0, left: 0, width: "12px", height: "12px", borderTop: "2px solid var(--accent)", borderLeft: "2px solid var(--accent)", zIndex: 10 }} />
      <div style={{ position: "absolute", top: 0, right: 0, width: "12px", height: "12px", borderTop: "2px solid var(--accent)", borderRight: "2px solid var(--accent)", zIndex: 10 }} />
      <div style={{ position: "absolute", bottom: 0, left: 0, width: "12px", height: "12px", borderBottom: "2px solid var(--accent)", borderLeft: "2px solid var(--accent)", zIndex: 10 }} />
      <div style={{ position: "absolute", bottom: 0, right: 0, width: "12px", height: "12px", borderBottom: "2px solid var(--accent)", borderRight: "2px solid var(--accent)", zIndex: 10 }} />

      {/* No image placeholder */}
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

      {/* Unit image */}
      {baseImage && (
        <img src={baseImage} style={{
          position: "absolute",
          width: "240px",
          left: "16px",
          bottom: "0",
          zIndex: 3,
          objectFit: "contain",
        }} />
      )}

      {/* Character image */}
      {selectedCharacter && (
        <img src={selectedCharacter.image} style={{
          position: "absolute",
          width: "120px",
          bottom: "0",
          right: "8px",
          zIndex: 4,
          objectFit: "contain",
        }} />
      )}
    </div>
  );
}
