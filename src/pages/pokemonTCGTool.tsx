// src/pages/PokemonTCGTool.tsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import PlayerBoard from "../components/Pokemon/PlayerBoard";
import EnergyPool from "../components/Pokemon/EnergyPool";
import type { GameBoard, PlayerTurn, EnergyType, Pokemon } from "../types/pokemon";

export default function PokemonTCGTool() {
  const navigate = useNavigate();

  const [board, setBoard] = useState<GameBoard>({
    player1: { active: null, bench: [null, null, null] },
    player2: { active: null, bench: [null, null, null] },
  });

  const [turn, setTurn] = useState<PlayerTurn>("player1");

  // Create Pokémon in a slot
  const createPokemon = (
    type: "active" | "bench",
    index: number | undefined,
    hp: number
  ) => {
    const updated = { ...board };
    const player = updated[turn];
    const pokemon: Pokemon = { hp, energy: [] };

    if (type === "active") player.active = pokemon;
    if (type === "bench" && index !== undefined) player.bench[index] = pokemon;

    setBoard(updated);
  };

  // Damage Pokémon
  const damagePokemon = (type: "active" | "bench", index?: number) => {
    const updated = { ...board };
    const player = updated[turn];

    if (type === "active" && player.active) {
      player.active.hp -= 10;
      if (player.active.hp <= 0) player.active = null;
    }

    if (type === "bench" && index !== undefined && player.bench[index]) {
      player.bench[index]!.hp -= 10;
      if (player.bench[index]!.hp <= 0) player.bench[index] = null;
    }

    setBoard(updated);
  };

  // Heal Pokémon
  const healPokemon = (type: "active" | "bench", index?: number) => {
    const updated = { ...board };
    const player = updated[turn];

    if (type === "active" && player.active) player.active.hp += 10;
    if (type === "bench" && index !== undefined && player.bench[index])
      player.bench[index]!.hp += 10;

    setBoard(updated);
  };

  // Drop energy
  const dropEnergy = (
    type: "active" | "bench",
    index: number | undefined,
    energy: EnergyType
  ) => {
    const updated = { ...board };
    const player = updated[turn];

    if (type === "active" && player.active) player.active.energy.push(energy);
    if (type === "bench" && index !== undefined && player.bench[index])
      player.bench[index]!.energy.push(energy);

    setBoard(updated);
  };

  // Move Pokémon between slots
  const movePokemon = (
    toType: "active" | "bench",
    toIndex: number | undefined,
    pokemon: Pokemon,
    fromType: "active" | "bench",
    fromIndex?: number
  ) => {
    const updated = { ...board };
    const player = updated[turn];

    // Remove from original location
    if (fromType === "active") player.active = null;
    if (fromType === "bench" && fromIndex !== undefined)
      player.bench[fromIndex] = null;

    // Place in new location
    if (toType === "active") player.active = pokemon;
    if (toType === "bench" && toIndex !== undefined) player.bench[toIndex] = pokemon;

    setBoard(updated);
  };

  // End turn
  const endTurn = () => {
    setTurn(turn === "player1" ? "player2" : "player1");
  };

  return (
    <div style={{ padding: "2rem", textAlign: "center" }}>
      <button onClick={() => navigate("/")}>← Back to Hub</button>

      <h1>Pokémon TCG Battle Tool</h1>
      <h2>Current Turn: {turn}</h2>
      <button onClick={endTurn}>End Turn</button>

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "50px",
          marginTop: "40px",
          alignItems: "center",
        }}
      >
        {/* Player 2 */}
        <PlayerBoard
          title="Player 2"
          board={board.player2}
          selectedSlot={null}
          onSelectSlot={() => {}}
          onCreatePokemon={createPokemon}
          onDamage={damagePokemon}
          onHeal={healPokemon}
          onDropEnergy={dropEnergy}
          onMovePokemon={movePokemon}
        />

        {/* Energy Pool */}
        <EnergyPool />

        {/* Player 1 */}
        <PlayerBoard
          title="Player 1"
          board={board.player1}
          selectedSlot={null}
          onSelectSlot={() => {}}
          onCreatePokemon={createPokemon}
          onDamage={damagePokemon}
          onHeal={healPokemon}
          onDropEnergy={dropEnergy}
          onMovePokemon={movePokemon}
        />
      </div>
    </div>
  );
}