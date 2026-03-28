import { useState } from "react";
import type { Pokemon, EnergyType } from "../../types/pokemon";

type Props = {
  pokemon: Pokemon | null;
  selected: boolean;
  slotType: "active" | "bench";
  slotIndex?: number;
  onSelect: () => void;
  onCreate: (hp: number) => void;
  onDamage: () => void;
  onHeal: () => void;
  onDropEnergy: (energy: EnergyType) => void;
  onPokemonDrop: (pokemon: Pokemon, fromType: "active" | "bench", fromIndex?: number) => void;
};

const ENERGY_ICONS: Record<EnergyType, string> = {
  Fire: "🔥", Water: "💧", Electric: "⚡",
  Grass: "🌿", Psychic: "🔮", Fighting: "🥊",
};

export default function PokemonSlot({
  pokemon, selected, slotType, slotIndex,
  onSelect, onCreate, onDamage, onHeal, onDropEnergy, onPokemonDrop,
}: Props) {
  const [adding, setAdding] = useState(false);
  const [hpInput, setHpInput] = useState("100");
  const [dragOver, setDragOver] = useState(false);

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
    const pokemonData = e.dataTransfer.getData("pokemon");
    if (pokemonData) {
      const data = JSON.parse(pokemonData);
      onPokemonDrop(data.pokemon, data.fromType, data.fromIndex);
      return;
    }
    const energy = e.dataTransfer.getData("energy") as EnergyType;
    if (energy && pokemon) onDropEnergy(energy);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(true);
  };

  const handleDragLeave = () => setDragOver(false);

  const confirmAdd = () => {
    const hp = parseInt(hpInput, 10);
    if (hp > 0) { onCreate(hp); setAdding(false); setHpInput("100"); }
  };

  const isActiveSlot = slotType === "active";

  if (!pokemon) {
    return (
      <div
        className={`pkm-slot pkm-slot--empty${isActiveSlot ? " pkm-slot--active-slot" : ""}${dragOver ? " pkm-slot--drag-over" : ""}`}
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onClick={() => !adding && setAdding(true)}
      >
        {adding ? (
          <div className="pkm-slot-add-form" onClick={(e) => e.stopPropagation()}>
            <input
              type="number"
              value={hpInput}
              onChange={(e) => setHpInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && confirmAdd()}
              autoFocus
              placeholder="HP"
            />
            <button onClick={confirmAdd}>Add</button>
          </div>
        ) : (
          <span className="pkm-slot-empty-label">+ add</span>
        )}
      </div>
    );
  }

  const hpPct = Math.max(0, Math.min(100, (pokemon.hp / pokemon.maxHp) * 100));
  const hpColor = hpPct > 50 ? "#22c55e" : hpPct > 25 ? "#e8c547" : "#ef4444";

  return (
    <div
      draggable
      onDragStart={(e) => {
        e.dataTransfer.setData("pokemon", JSON.stringify({ pokemon, fromType: slotType, fromIndex: slotIndex }));
      }}
      onDrop={handleDrop}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onClick={onSelect}
      className={`pkm-slot${isActiveSlot ? " pkm-slot--active-slot" : ""}${dragOver ? " pkm-slot--drag-over" : ""}`}
    >
      <div className={`pkm-pokemon${selected ? " pkm-pokemon--selected" : ""}`}>
        <div className="pkm-hp-row">
          <span className="pkm-hp-label">HP</span>
          <span className="pkm-hp-value">{pokemon.hp}</span>
          <div className="pkm-hp-bar-wrap">
            <div className="pkm-hp-bar" style={{ width: `${hpPct}%`, backgroundColor: hpColor }} />
          </div>
        </div>

        <div className="pkm-energy-row">
          {pokemon.energy.map((e, i) => (
            <div key={i} className={`pkm-energy-pip pkm-pip--${e}`} title={e}>
              {ENERGY_ICONS[e]}
            </div>
          ))}
        </div>

        <div className="pkm-hp-btns">
          <button onClick={(e) => { e.stopPropagation(); onDamage(); }}>−10</button>
          <button onClick={(e) => { e.stopPropagation(); onHeal(); }}>+10</button>
        </div>
      </div>
    </div>
  );
}
