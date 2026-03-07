import type { EnergyType } from "../../types/pokemon";

type Props = {
  addEnergy: (type: EnergyType) => void;
  disabled?: boolean;
};

const energies: EnergyType[] = ["Fire", "Water", "Electric", "Grass", "Psychic", "Fighting"];

export default function EnergyPool({ addEnergy, disabled }: Props) {
  return (
    <div>
      <h2>Energy Pool</h2>
      <div style={{ display: "flex", gap: "10px", marginBottom: "10px" }}>
        {energies.map((e) => (
          <button key={e} onClick={() => addEnergy(e)} disabled={disabled}>
            {energyIcon(e)} {e}
          </button>
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