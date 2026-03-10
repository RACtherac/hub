import React from "react"
import type { Unit, Character } from "../../../types/warhammer"
import UnitImage from "../../../assets/WarhammerImages/UnitImage/UnitImage"
import WargearSelector from "../WargearSelector/WargearSelector"
import CharacterAttachment from "../CharacterAttachment/CharacterAttachment"

interface Props {
  unit: Unit
  characters: Character[]
  selectedWargear: string[]
  attachedCharacter?: string
  onWargearChange: (wargear: string[]) => void
  onCharacterAttach: (characterId?: string) => void
}

export default function UnitCard({
  unit,
  characters,
  selectedWargear,
  attachedCharacter,
  onWargearChange,
  onCharacterAttach,
}: Props) {

  return (
    <div
      style={{
        border: "1px solid gray",
        padding: "16px",
        marginBottom: "16px",
      }}
    >
      <h3>{unit.name}</h3>

      <UnitImage unit={unit} selectedWargear={selectedWargear} />

      <WargearSelector
        unit={unit}
        selectedWargear={selectedWargear}
        onChange={onWargearChange}
      />

      <CharacterAttachment
        unitId={unit.id}
        characters={characters}
        attachedCharacter={attachedCharacter}
        onAttach={onCharacterAttach}
      />
    </div>
  )
}