import PokemonSlot from "./PokemonSlot";
import type { PlayerBoard as PB } from "../../types/pokemon";

type Props = {
  title: string;
  board: PB;
  selectedSlot: { type: "active" | "bench"; index?: number } | null;
  onSelectSlot: (slot: "active" | "bench", index?: number) => void;
};

export default function PlayerBoard({
  title,
  board,
  selectedSlot,
  onSelectSlot,
}: Props) {
  return (
    <div style={{ marginBottom: "30px" }}>
      <h2>{title}</h2>

      <h3>Active</h3>
      <PokemonSlot
        pokemon={board.active}
        selected={selectedSlot?.type === "active"}
        onSelect={() => onSelectSlot("active")}
      />

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
          />
        ))}
      </div>
    </div>
  );
}