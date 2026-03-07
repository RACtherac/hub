// src/components/PlayerBoard.tsx
import PokemonSlot from "./PokemonSlot";
import type { PlayerBoard as PB, EnergyType, Pokemon } from "../../types/pokemon";

type Props = {
  title: string;
  board: PB;
  selectedSlot: { type: "active" | "bench"; index?: number } | null;

  onSelectSlot: (slot: "active" | "bench", index?: number) => void;
  onCreatePokemon: (type: "active" | "bench", index: number | undefined, hp: number) => void;
  onDamage: (type: "active" | "bench", index?: number) => void;
  onHeal: (type: "active" | "bench", index?: number) => void;
  onDropEnergy: (type: "active" | "bench", index: number | undefined, energy: EnergyType) => void;
  onMovePokemon: (
    type: "active" | "bench",
    index: number | undefined,
    pokemon: Pokemon,
    fromType: "active" | "bench",
    fromIndex?: number
  ) => void;
};

export default function PlayerBoard({
  title,
  board,
  selectedSlot,
  onSelectSlot,
  onCreatePokemon,
  onDamage,
  onHeal,
  onDropEnergy,
  onMovePokemon,
}: Props) {
  return (
    <div style={{ textAlign: "center" }}>
      <h2>{title}</h2>

      <h3>Active</h3>
      <PokemonSlot
        slotType="active"
        pokemon={board.active}
        selected={selectedSlot?.type === "active"}
        onSelect={() => onSelectSlot("active")}
        onCreate={(hp) => onCreatePokemon("active", undefined, hp)}
        onDamage={() => onDamage("active")}
        onHeal={() => onHeal("active")}
        onDropEnergy={(energy) => onDropEnergy("active", undefined, energy)}
        onPokemonDrop={(pokemon, fromType, fromIndex) =>
          onMovePokemon("active", undefined, pokemon, fromType, fromIndex)
        }
      />

      <h3>Bench</h3>
      <div style={{ display: "flex", gap: "10px", justifyContent: "center" }}>
        {board.bench.map((p, i) => (
          <PokemonSlot
            key={i}
            slotType="bench"
            slotIndex={i}
            pokemon={p}
            selected={selectedSlot?.type === "bench" && selectedSlot.index === i}
            onSelect={() => onSelectSlot("bench", i)}
            onCreate={(hp) => onCreatePokemon("bench", i, hp)}
            onDamage={() => onDamage("bench", i)}
            onHeal={() => onHeal("bench", i)}
            onDropEnergy={(energy) => onDropEnergy("bench", i, energy)}
            onPokemonDrop={(pokemon, fromType, fromIndex) =>
              onMovePokemon("bench", i, pokemon, fromType, fromIndex)
            }
          />
        ))}
      </div>
    </div>
  );
}