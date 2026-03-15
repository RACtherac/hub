import type { Unit } from "../../../types/warhammer";

interface Props {
  unit: Unit;
  selectedWargear: string[];
  onChange: (wargear: string[]) => void;
}

export default function WargearSelector({
  unit,
  selectedWargear,
  onChange,
}: Props) {
  const toggle = (id: string) => {
    if (selectedWargear.includes(id)) {
      onChange(selectedWargear.filter((w) => w !== id));
    } else {
      onChange([...selectedWargear, id]);
    }
  };

  return (
    <div>
      <h4>Wargear</h4>

      {unit.wargear.map((gear) => (
        <label key={gear.id} style={{ display: "block" }}>
          <input
            type="checkbox"
            checked={selectedWargear.includes(gear.id)}
            onChange={() => toggle(gear.id)}
          />
          {gear.name}
        </label>
      ))}
    </div>
  );
}