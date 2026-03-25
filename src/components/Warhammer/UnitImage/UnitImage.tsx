import type { Unit, Character } from "../../../types/warhammer";

interface Props {
  unit: Unit;
  modelCount: number;
  selectedWargear: string[];

  characters: Character[];
  attachedCharacter?: string;
  characterWargear: string[];
}

export default function UnitImage({
  unit,
  modelCount,
  selectedWargear,
  characters,
  attachedCharacter,
  characterWargear,
}: Props) {

  const selectedCharacter = characters.find(
    (c) => c.id === attachedCharacter
  );

  const hasCharacter = !!selectedCharacter;

  // Frame size grows if character exists
  const frameWidth = hasCharacter ? 360 : 300;
  const frameHeight = hasCharacter ? 320 : 300;

  const baseImage =
    unit.category === "vehicle" ||
    unit.category === "transport"
      ? unit.image
      : modelCount === 10
      ? unit.image10
      : unit.image5;

  const unitWargearImages = unit.wargear
    .filter((g) => selectedWargear.includes(g.id))
    .map((g) => g.image)
    .filter(Boolean);

  const characterWargearImages =
    selectedCharacter?.wargear
      ?.filter((g) =>
        characterWargear.includes(g.id)
      )
      .map((g) => g.image)
      .filter(Boolean) || [];

  return (
    <div
      style={{
        position: "relative",
        width: frameWidth,
        height: frameHeight,
        border: "3px solid black",
        backgroundColor: "white",
        marginTop: "15px",
        transition: "0.2s",
      }}
    >

      {/* UNIT WARGEAR */}
      {unitWargearImages.map((img, index) => (
        <img
          key={index}
          src={img}
          style={{
            position: "absolute",
            width: "260px",
            left: `${10 + index * 20}px`,
            top: `${10 + index * 20}px`,
            opacity: 0.4,
            zIndex: 1,
          }}
        />
      ))}

      {/* CHARACTER WARGEAR */}
      {characterWargearImages.map((img, index) => (
        <img
          key={index}
          src={img}
          style={{
            position: "absolute",
            width: "260px",
            right: `${10 + index * 20}px`,
            top: `${10 + index * 20}px`,
            opacity: 0.4,
            zIndex: 2,
          }}
        />
      ))}

      {/* UNIT IMAGE */}
      {baseImage && (
        <img
          src={baseImage}
          style={{
            position: "absolute",
            width: "280px",
            left: "10px",
            top: "10px",
            zIndex: 3,
          }}
        />
      )}

      {/* CHARACTER IMAGE */}
      {selectedCharacter && (
        <img
          src={selectedCharacter.image}
          style={{
            position: "absolute",
            width: "160px",
            bottom: "0",
            right: "0",
            zIndex: 4,
          }}
        />
      )}

    </div>
  );
}