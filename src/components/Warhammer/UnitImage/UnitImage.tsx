import type { Unit, Character } from "../../../types/warhammer";

interface Props {
  unit: Unit;
  modelCount: number;
  selectedWargear: string[];
  characters: Character[];
  attachedCharacter?: string;
  characterWargear?: string[];
}

export default function UnitImage({
  unit,
  modelCount,
  selectedWargear,
  characters,
  attachedCharacter,
  characterWargear = [],
}: Props) {

  // ✅ IF for 5 vs 10 models
  let unitImage = unit.image5;
  if (modelCount === 10) {
    unitImage = unit.image10;
  }

  // Unit wargear images
  const wargearImages = unit.wargear
    .filter((w) => selectedWargear.includes(w.id) && w.image)
    .map((w) => w.image);

  // Character
  const character = characters.find((c) => c.id === attachedCharacter);

  // Character wargear images
  const characterWargearImages =
    character?.wargear
      ?.filter((w) => characterWargear.includes(w.id) && w.image)
      .map((w) => w.image) || [];

  return (
    <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>

      {/* Unit */}
      <img src={unitImage} width={200} />

      {/* Unit wargear */}
      {wargearImages.map((img, i) => (
        <img key={i} src={img} width={80} />
      ))}

      {/* Character */}
      {character && (
        <img src={character.image} width={120} />
      )}

      {/* Character wargear */}
      {characterWargearImages.map((img, i) => (
        <img key={`char-${i}`} src={img} width={80} />
      ))}

    </div>
  );
}