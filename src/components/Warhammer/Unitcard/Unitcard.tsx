import type { Unit, Character } from "../../../types/warhammer";
import UnitImage from "../UnitImage/UnitImage";
import WargearSelector from "../WargearSelector/WargearSelector";
import CharacterAttachment from "../CharacterAttachment/CharacterAttachment";

interface Props {
  unit: Unit;
  characters: Character[];

  modelCount: number;
  selectedWargear: string[];

  attachedCharacter?: string;
  characterWargear: string[];

  onModelCountChange: (count: number) => void;
  onWargearChange: (gear: string[]) => void;

  onCharacterChange: (char?: string) => void;
  onCharacterWargearChange: (gear: string[]) => void;
}

export default function UnitCard({
  unit,
  characters,
  modelCount,
  selectedWargear,
  attachedCharacter,
  characterWargear,
  onModelCountChange,
  onWargearChange,
  onCharacterChange,
  onCharacterWargearChange,
}: Props) {

  const allowedCharacters = characters.filter((c) =>
    c.canAttachTo.includes(unit.id)
  );

  const selectedCharacter = characters.find(
    (c) => c.id === attachedCharacter
  );

  return (
    <div>

      <h3>{unit.name}</h3>

      {/* MODEL COUNT */}
      <div style={{ marginBottom: "10px" }}>
        <label>Models: </label>

        <select
          value={modelCount}
          onChange={(e) =>
            onModelCountChange(Number(e.target.value))
          }
        >
          <option value={5}>5</option>
          <option value={10}>10</option>
        </select>
      </div>

      {/* UNIT IMAGE */}
      <UnitImage
        unit={unit}
        modelCount={modelCount}
        selectedWargear={selectedWargear}
        characters={characters}
        attachedCharacter={attachedCharacter}
        characterWargear={characterWargear}
      />

      {/* UNIT WARGEAR */}
      <WargearSelector
        wargear={unit.wargear}
        selected={selectedWargear}
        onChange={onWargearChange}
      />

      {/* CHARACTER */}
      <CharacterAttachment
        characters={allowedCharacters}
        selectedCharacter={attachedCharacter}
        onChange={onCharacterChange}
      />

      {/* CHARACTER WARGEAR */}
      {selectedCharacter && selectedCharacter.wargear && (
  <WargearSelector
    wargear={selectedCharacter.wargear}
    selected={characterWargear}
    onChange={onCharacterWargearChange}
  />
)}

    </div>
  );
}