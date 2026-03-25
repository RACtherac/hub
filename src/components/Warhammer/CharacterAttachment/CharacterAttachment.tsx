import type { Character } from "../../../types/warhammer";

interface Props {
  characters: Character[];
  selectedCharacter?: string;
  onChange: (char?: string) => void;
}

export default function CharacterAttachment({
  characters,
  selectedCharacter,
  onChange,
}: Props) {
  return (
    <div style={{ marginTop: "15px" }}>
      <h4>Attach Character</h4>

      <select
        value={selectedCharacter || ""}
        onChange={(e) =>
          onChange(e.target.value || undefined)
        }
        style={{
          padding: "6px",
          borderRadius: "5px",
          border: "1px solid black",
        }}
      >
        <option value="">None</option>

        {characters.map((character) => (
          <option
            key={character.id}
            value={character.id}
          >
            {character.name}
          </option>
        ))}
      </select>
    </div>
  );
}