// src/components/PokemonSlot.tsx
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

  onPokemonDrop: (
    pokemon: Pokemon,
    fromType: "active" | "bench",
    fromIndex?: number
  ) => void;
};

export default function PokemonSlot({
  pokemon,
  selected,
  slotType,
  slotIndex,
  onSelect,
  onCreate,
  onDamage,
  onHeal,
  onDropEnergy,
  onPokemonDrop,
}: Props) {
  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();

    const pokemonData = e.dataTransfer.getData("pokemon");
    if (pokemonData) {
      const data = JSON.parse(pokemonData);
      onPokemonDrop(data.pokemon, data.fromType, data.fromIndex);
      return;
    }

    const energy = e.dataTransfer.getData("energy") as EnergyType;
    if (energy) onDropEnergy(energy);
  };

  const handleDragOver = (e: React.DragEvent) => e.preventDefault();

  if (!pokemon) {
    return (
      <div
        onClick={() => {
          const hp = prompt("Enter Pokémon HP");
          if (hp) onCreate(Number(hp));
        }}
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        style={{
          border: "2px dashed gray",
          width: "120px",
          height: "100px",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          borderRadius: "8px",
          cursor: "pointer",
        }}
      >
        Add Pokémon
      </div>
    );
  }

  return (
    <div
      draggable
      onDragStart={(e) => {
        e.dataTransfer.setData(
          "pokemon",
          JSON.stringify({ pokemon, fromType: slotType, fromIndex: slotIndex })
        );
      }}
      onClick={onSelect}
      onDrop={handleDrop}
      onDragOver={handleDragOver}
      style={{
        border: selected ? "3px solid gold" : "1px solid gray",
        padding: "10px",
        width: "120px",
        borderRadius: "8px",
        background: "#f4f4f4",
        cursor: "grab",
      }}
    >
      <div>❤️ HP: {pokemon.hp}</div>
      <div style={{ marginTop: "6px" }}>
        {pokemon.energy.map((e, i) => (
          <span key={i} style={{ marginRight: "4px" }}>
            {energyIcon(e)}
          </span>
        ))}
      </div>
      <div style={{ marginTop: "8px", display: "flex", gap: "4px" }}>
        <button
          onClick={(e) => {
            e.stopPropagation();
            onDamage();
          }}
        >
          -10
        </button>
        <button
          onClick={(e) => {
            e.stopPropagation();
            onHeal();
          }}
        >
          +10
        </button>
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