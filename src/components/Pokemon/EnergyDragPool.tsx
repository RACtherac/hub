import type { EnergyType } from "../../types/pokemon";

const energies: EnergyType[] = [
  "Fire",
  "Water",
  "Electric",
  "Grass",
  "Psychic",
  "Fighting",
];

export default function EnergyPool() {
  return (
    <div style={{ marginTop: "20px" }}>
      <h2>Energy Pool</h2>

      {energies.map((e) => (
        <div
          key={e}
          draggable
          onDragStart={(ev) => ev.dataTransfer.setData("energy", e)}
          style={{
            display: "inline-block",
            padding: "10px",
            margin: "5px",
            border: "1px solid black",
            cursor: "grab",
          }}
        >
          {e}
        </div>
      ))}
    </div>
  );
}