import type{ EnergyType } from "../../types/pokemon";

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
    <div style={{ marginTop: "30px" }}>
      <h2>Energy Pool</h2>

      <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
        {energies.map((energy) => (
          <div
            key={energy}
            draggable
            onDragStart={(e) => {
              e.dataTransfer.setData("energy", energy);
            }}
            style={{
              padding: "10px 14px",
              border: "2px solid black",
              borderRadius: "6px",
              cursor: "grab",
              background: "#fff",
              userSelect: "none",
            }}
          >
            {energyIcon(energy)} {energy}
          </div>
        ))}
      </div>
    </div>
  );
}

function energyIcon(type: EnergyType) {
  const icons: Record<EnergyType, string> = {
    Fire: "🔥",
    Water: "💧",
    Electric: "⚡",
    Grass: "🌿",
    Psychic: "🔮",
    Fighting: "🥊",
  };

  return icons[type];
}
