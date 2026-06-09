import { useRef } from "react";
import type { EnergyType } from "../../types/pokemon";

const ICONS: Record<EnergyType, string> = {
  Fire: "🔥", Water: "💧", Electric: "⚡",
  Grass: "🌿", Psychic: "🔮", Fighting: "🥊",
};

type Props = { energies: EnergyType[] };

export default function EnergyPool({ energies }: Props) {
  const draggedEnergyRef = useRef<EnergyType | null>(null);

  const handleTouchStart = (e: React.TouchEvent, energy: EnergyType) => {
    draggedEnergyRef.current = energy;
    // Set data for compatibility with drag event listeners
    const element = e.currentTarget as HTMLElement;
    element.style.opacity = "0.5";
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    const element = e.currentTarget as HTMLElement;
    element.style.opacity = "1";
    draggedEnergyRef.current = null;
  };

  const handleDragStart = (e: React.DragEvent, energy: EnergyType) => {
    e.dataTransfer.setData("energy", energy);
    e.dataTransfer.effectAllowed = "copy";
  };

  return (
    <div className="pkm-energy-pool">
      <span className="pkm-energy-pool-label">Energy</span>
      {energies.map((energy, i) => (
        <div
          key={`${energy}-${i}`}
          draggable
          onDragStart={(e) => handleDragStart(e, energy)}
          onTouchStart={(e) => handleTouchStart(e, energy)}
          onTouchEnd={(e) => handleTouchEnd(e)}
          className={`pkm-energy-chip pkm-energy--${energy}`}
        >
          <span>{ICONS[energy]}</span>
          <span>{energy}</span>
        </div>
      ))}
    </div>
  );
}
