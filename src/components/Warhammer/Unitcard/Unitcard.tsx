import type { Unit, Character } from "../../../types/Warhammer";
import UnitImage from "../UnitImage/UnitImage";
import WargearSelector from "../WargearSelector/WargearSelector";
import CharacterAttachment from "../CharacterAttachment/CharacterAttachment";

interface Props {
  unit: Unit;
  characters: Character[];
  allUnits: Unit[];

  modelCount: number;
  selectedWargear: string[];

  attachedCharacter?: string;
  characterWargear: string[];

  transportedUnits: string[];

  onModelCountChange: (count: number) => void;
  onWargearChange: (gear: string[]) => void;

  onCharacterChange: (char?: string) => void;
  onCharacterWargearChange: (gear: string[]) => void;

  onTransportChange: (units: string[]) => void;
}

export default function UnitCard({
  unit,
  characters,
  allUnits,

  modelCount,
  selectedWargear,

  attachedCharacter,
  characterWargear,

  transportedUnits,

  onModelCountChange,
  onWargearChange,

  onCharacterChange,
  onCharacterWargearChange,

  onTransportChange,
}: Props) {

  const isVehicle = unit.category === "vehicle";
  const isTransport = unit.category === "transport";

  const allowedCharacters = characters.filter((c) =>
    c.canAttachTo.includes(unit.id)
  );

  const selectedCharacter = characters.find(
    (c) => c.id === attachedCharacter
  );

  return (
    <div>

      <h3>{unit.name}</h3>

      {/* MODEL COUNT (only infantry/battleline) */}
      {!isVehicle && !isTransport && (
        <div>
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
      )}

      {/* IMAGE */}
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
      {!isVehicle && !isTransport && (
        <CharacterAttachment
          characters={allowedCharacters}
          selectedCharacter={attachedCharacter}
          onChange={onCharacterChange}
        />
      )}

      {/* CHARACTER WARGEAR */}
      {selectedCharacter && selectedCharacter.wargear && (
        <WargearSelector
          wargear={selectedCharacter.wargear}
          selected={characterWargear}
          onChange={onCharacterWargearChange}
        />
      )}

      {/* TRANSPORT */}
      {isTransport && (
        <div>

          <h4>Units Inside</h4>

          <select
            multiple
            value={transportedUnits}
            onChange={(e) => {

              const selected = Array.from(
                e.target.selectedOptions
              ).map((o) => o.value);

              onTransportChange(selected);
            }}
          >
            {allUnits
              .filter((u) => u.category !== "vehicle")
              .map((u) => (
                <option key={u.id} value={u.id}>
                  {u.name}
                </option>
              ))}
          </select>

        </div>
      )}

    </div>
  );
}