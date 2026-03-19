import React from "react"
import type { Character } from "../../../types/warhammer"

interface Props {
  unitId: string
  characters: Character[]
  attachedCharacter?: string
  characterWargear?: string[]
  onAttach: (characterId?: string) => void
  onCharacterWargearChange: (wargear: string[]) => void
}

export default function CharacterAttachment({
  unitId,
  characters,
  attachedCharacter,
  characterWargear = [],
  onAttach,
  onCharacterWargearChange,
}: Props) {

  // Only show characters that can attach to this unit
  const availableCharacters = characters.filter((c) =>
    c.canAttachTo.includes(unitId)
  )

  const character = characters.find((c) => c.id === attachedCharacter)

  const toggleCharacterWargear = (id: string) => {

    if (characterWargear.includes(id)) {
      onCharacterWargearChange(
        characterWargear.filter((w) => w !== id)
      )
    } else {
      onCharacterWargearChange([...characterWargear, id])
    }

  }

  return (
    <div>

      <h4>Attach Character</h4>

      <select
        value={attachedCharacter || ""}
        onChange={(e) => onAttach(e.target.value || undefined)}
      >

        <option value="">None</option>

        {availableCharacters.map((c) => (
          <option key={c.id} value={c.id}>
            {c.name}
          </option>
        ))}

      </select>

      {character?.wargear && (
        <div style={{ marginTop: "10px" }}>

          <h4>{character.name} Wargear</h4>

          {character.wargear.map((gear) => (

            <label key={gear.id} style={{ display: "block" }}>

              <input
                type="checkbox"
                checked={characterWargear.includes(gear.id)}
                onChange={() => toggleCharacterWargear(gear.id)}
              />

              {gear.name}

            </label>

          ))}

        </div>
      )}

    </div>
  )
}