import PokemonSlot from "./PokemonSlot";
import type { PlayerBoard as PB, EnergyType } from "../../types/pokemon";

type Props = {
  title: string;
  board: PB;
  selectedSlot: { type: "active" | "bench"; index?: number } | null;
  onSelectSlot: (slot: "active" | "bench", index?: number) => void;

  onCreatePokemon: (type: "active" | "bench", index: number | undefined, hp: number) => void;
  onDamage: (type: "active" | "bench", index?: number) => void;
  onHeal: (type: "active" | "bench", index?: number) => void;
  onDropEnergy: (type: "active" | "bench", index: number | undefined, energy: EnergyType) => void;
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
}: Props) {
  return (
    <div style={{ marginBottom: "30px" }}>
      <h2>{title}</h2>

      <h3>Active</h3>

      <PokemonSlot
        pokemon={board.active}
        selected={selectedSlot?.type === "active"}
        onSelect={() => onSelectSlot("active")}
        onCreate={(hp: number) => onCreatePokemon("active", undefined, hp)}
        onDamage={() => onDamage("active")}
        onHeal={() => onHeal("active")}
onDropEnergy={(e) => onDropEnergy("active", undefined, e)}      />

      ```tsx
<h3>Bench</h3>

<div style={{ display: "flex", gap: "10px" }}>
  {board.bench.map((p, i) => (
    <PokemonSlot
      key={i}
      pokemon={p}
      selected={
        selectedSlot?.type === "bench" && selectedSlot.index === i
      }
      onSelect={() => onSelectSlot("bench", i)}
      onCreate={(hp) => onCreatePokemon("bench", i, hp)}
      onDamage={() => onDamage("bench", i)}
      onHeal={() => onHeal("bench", i)}

      // THIS LINE IS IMPORTANT
      onDropEnergy={(energy) => onDropEnergy("bench", i, energy)}
    />
  ))}
</div>
```

    </div>
  );
}