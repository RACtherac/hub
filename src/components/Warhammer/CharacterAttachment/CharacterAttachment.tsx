import React from "react"
import type { Character } from "../../../types/warhammer"

interface Props {
  unitId: string
  characters: Character[]
  attachedCharacter?: string
  onAttach: (characterId?: string) => void
}

export default function CharacterAttachment({
  unitId,
  characters,
  attachedCharacter,
  onAttach,
}: Props) {

  const availableCharacters = characters.filter((c) =>
    c.canAttachTo.includes(unitId)
  )

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
    </div>
  )
}