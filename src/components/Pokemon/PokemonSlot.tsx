import type { Pokemon, EnergyType } from "../../types/pokemon";

type Props = {
  pokemon: Pokemon | null;
  selected: boolean;
  onSelect: () => void;
};

export default function PokemonSlot({ pokemon, selected, onSelect }: Props) {
  const slotStyle: React.CSSProperties = {
    border: selected ? "3px solid gold" : "1px solid gray",
    padding: "10px",
    width: "120px",
    height: "90px",
    borderRadius: "8px",
    cursor: "pointer",
    background: "#f4f4f4",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  };

  const emptyStyle: React.CSSProperties = {
    border: "2px dashed gray",
    width: "120px",
    height: "90px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    cursor: "pointer",
  };

  if (!pokemon) {
    return (
      <div style={emptyStyle} onClick={onSelect}>
        Empty
      </div>
    );
  }

  return (
    <div style={slotStyle} onClick={onSelect}>
      ❤️ HP: {pokemon.hp}
      <br />
      ⚡ {pokemon.energy.map((e, i) => (
        <span key={i} style={{ marginRight: "3px" }}>{energyIcon(e)}</span>
      ))}
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