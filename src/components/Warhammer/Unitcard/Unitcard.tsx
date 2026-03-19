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
  characterWargear?: string[];

  onModelCountChange: (count: number) => void;
  onWargearChange: (w: string[]) => void;
  onCharacterAttach: (c?: string) => void;
  onCharacterWargearChange: (w: string[]) => void;
}

export default function UnitCard({
  unit,
  characters,
  modelCount,
  selectedWargear,
  attachedCharacter,
  characterWargear = [],
  onModelCountChange,
  onWargearChange,
  onCharacterAttach,
  onCharacterWargearChange,
}: Props) {
  return (
    <div style={{ border: "1px solid gray", padding: 20, marginBottom: 20 }}>
      <h3>{unit.name}</h3>

      <UnitImage
        unit={unit}
        modelCount={modelCount}
        selectedWargear={selectedWargear}
        characters={characters}
        attachedCharacter={attachedCharacter}
        characterWargear={characterWargear}
      />

      {/* Squad size */}
      <h4>Squad Size</h4>
      <select
        value={modelCount}
        onChange={(e) => onModelCountChange(Number(e.target.value))}
      >
        <option value={5}>5 Models</option>
        <option value={10}>10 Models</option>
      </select>

      {/* Unit wargear */}
      <WargearSelector
        unit={unit}
        selectedWargear={selectedWargear}
        onChange={onWargearChange}
      />

      {/* Character */}
      <CharacterAttachment
        unitId={unit.id}
        characters={characters}
        attachedCharacter={attachedCharacter}
        characterWargear={characterWargear}
        onAttach={onCharacterAttach}
        onCharacterWargearChange={onCharacterWargearChange}
      />
    </div>
  );
}