import type { Pokemon, EnergyType } from "../../types/pokemon";

type Props = {
  pokemon: Pokemon | null;
  selected: boolean;
  onSelect: () => void;
  onCreate: (hp: number) => void;
  onDamage: () => void;
  onHeal: () => void;
  onDropEnergy: (type: EnergyType) => void;
};

export default function PokemonSlot({
  pokemon,
  selected,
  onSelect,
  onCreate,
  onDamage,
  onHeal,
  onDropEnergy,
}: Props) {

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    const energy = e.dataTransfer.getData("energy") as EnergyType;
    if (energy) {
      onDropEnergy(energy);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  // EMPTY SLOT
  if (!pokemon) {
    return (
      <div
        onClick={() => {
          const hp = prompt("Enter Pokémon HP");
          if (hp) onCreate(Number(hp));
        }}
        style={{
          border: "2px dashed gray",
          width: "120px",
          height: "90px",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          cursor: "pointer",
          borderRadius: "8px",
        }}
      >
        Add Pokémon
      </div>
    );
  }

  return (
    <div
      onClick={onSelect}
      onDrop={handleDrop}
      onDragOver={(e) => e.preventDefault()}      style={{
        border: selected ? "3px solid gold" : "1px solid gray",
        padding: "10px",
        width: "120px",
        borderRadius: "8px",
        background: "#f4f4f4",
        cursor: "pointer",
      }}
    >
      <div>❤️ HP: {pokemon.hp}</div>

      <div style={{ marginTop: "5px" }}>
        {pokemon.energy.map((e, i) => (
          <span key={i} style={{ marginRight: "4px" }}>
            {energyIcon(e)}
          </span>
        ))}
      </div>

      <div style={{ marginTop: "8px", display: "flex", gap: "5px" }}>
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
