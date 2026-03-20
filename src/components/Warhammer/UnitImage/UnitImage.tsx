import type { Unit, Character } from "../../../types/warhammer";
import "./UnitImage.css";

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

  let unitImage = unit.image5;
  if (modelCount === 10) {
    unitImage = unit.image10;
  }

  const wargearImages = unit.wargear
    .filter((w) => selectedWargear.includes(w.id) && w.image)
    .map((w) => w.image);

  const character = characters.find((c) => c.id === attachedCharacter);

  const characterWargearImages =
    character?.wargear
      ?.filter((w) => characterWargear.includes(w.id) && w.image)
      .map((w) => w.image) || [];

  return (
    <div className="unit-container">

      {/* UNIT FRAME */}
      <div className="image-frame">
        <div className="image-stack">

          {/* Wargear behind */}
          {wargearImages.map((img, index) => (
            <img
              key={index}
              src={img}
              className="stack-image wargear"
              style={{ zIndex: index }}
            />
          ))}

          {/* Unit on top */}
          <img
            src={unitImage}
            className="stack-image unit"
            style={{ zIndex: 100 }}
          />

        </div>
      </div>

      {/* CHARACTER FRAME (FIXED) */}
      {character && (
        <div className="image-frame">
          <div className="image-stack">

            {/* Character wargear behind */}
            {characterWargearImages.map((img, index) => (
              <img
                key={index}
                src={img}
                className="stack-image wargear"
                style={{ zIndex: index }}
              />
            ))}

            {/* Character on top */}
            <img
              src={character.image}
              className="stack-image unit"
              style={{ zIndex: 100 }}
            />

          </div>
        </div>
      )}

    </div>
  );
}