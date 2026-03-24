import type { WargearOption } from "../../../types/Warhammer";

interface Props {
  wargear: WargearOption[];
  selected: string[];
  onChange: (gear: string[]) => void;
}

export default function WargearSelector({
  wargear,
  selected,
  onChange,
}: Props) {

  const toggleWargear = (id: string) => {
    if (selected.includes(id)) {
      onChange(selected.filter((g) => g !== id));
    } else {
      onChange([...selected, id]);
    }
  };

  return (
    <div style={{ marginTop: "10px" }}>

      <h4>Wargear</h4>

      {wargear.map((gear) => (
        <label key={gear.id} style={{ display: "block" }}>
          <input
            type="checkbox"
            checked={selected.includes(gear.id)}
            onChange={() => toggleWargear(gear.id)}
          />
          {gear.name}
        </label>
      ))}

    </div>
  );
}