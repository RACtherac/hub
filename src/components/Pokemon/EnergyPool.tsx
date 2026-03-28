import type { EnergyType } from "../../types/pokemon";

const ICONS: Record<EnergyType, string> = {
  Fire: "🔥", Water: "💧", Electric: "⚡",
  Grass: "🌿", Psychic: "🔮", Fighting: "🥊",
};

type Props = { energies: EnergyType[] };

export default function EnergyPool({ energies }: Props) {
  return (
    <div className="pkm-energy-pool">
      <span className="pkm-energy-pool-label">Energy</span>
      {energies.map((energy, i) => (
        <div
          key={`${energy}-${i}`}
          draggable
          onDragStart={(e) => e.dataTransfer.setData("energy", energy)}
          className={`pkm-energy-chip pkm-energy--${energy}`}
        >
          <span>{ICONS[energy]}</span>
          <span>{energy}</span>
        </div>
      ))}
    </div>
  );
}
