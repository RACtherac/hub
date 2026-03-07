import { useState } from "react";
import { useNavigate } from "react-router-dom";
import PlayerBoard from "../components/Pokemon/PlayerBoard";
import type { GameBoard, PlayerTurn, Pokemon, EnergyType } from "../types/pokemon";

export default function PokemonTCGTool() {
  const navigate = useNavigate();

  // GameBoard: 2 players, each 1 active + 3 bench
  const [board, setBoard] = useState<GameBoard>({
    player1: { active: null, bench: [null, null, null] },
    player2: { active: null, bench: [null, null, null] },
  });

  const [turn, setTurn] = useState<PlayerTurn>("player1");

  // Track which slot is selected for energy placement
  const [selectedSlot, setSelectedSlot] = useState<{ type: "active" | "bench"; index?: number } | null>(null);

  const selectSlot = (type: "active" | "bench", index?: number) => {
    // Only select your own slots
    setSelectedSlot({ type, index });
  };

  const addEnergy = (type: EnergyType) => {
    if (!selectedSlot) return;
    const updated = { ...board };
    const playerBoard = updated[turn];

    if (selectedSlot.type === "active" && playerBoard.active) {
      playerBoard.active.energy.push(type);
    } else if (selectedSlot.type === "bench" && selectedSlot.index !== undefined && playerBoard.bench[selectedSlot.index]) {
      playerBoard.bench[selectedSlot.index]!.energy.push(type);
    }

    setBoard(updated);
  };

  const endTurn = () => {
    setTurn(turn === "player1" ? "player2" : "player1");
    setSelectedSlot(null);
  };

  const createPokemon = (hp: number, type: "active" | "bench", index?: number) => {
    const updated = { ...board };
    const playerBoard = updated[turn];

    const newPokemon: Pokemon = { hp, energy: [] };
    if (type === "active") playerBoard.active = newPokemon;
    else if (type === "bench" && index !== undefined) playerBoard.bench[index] = newPokemon;

    setBoard(updated);
  };

  return (
    <div style={{ padding: "2rem" }}>
      <button onClick={() => navigate("/")}>← Back to Hub</button>

      <h1>Pokémon TCG Battle Tool</h1>
      <h2>Current Turn: {turn}</h2>
      <button onClick={endTurn}>End Turn</button>

      <hr />

      <PlayerBoard
        title="Player 2"
        board={board.player2}
        selectedSlot={turn === "player2" ? selectedSlot : null}
        onSelectSlot={(type, index) => turn === "player2" && selectSlot(type, index)}
      />

      <hr />

      <PlayerBoard
        title="Player 1"
        board={board.player1}
        selectedSlot={turn === "player1" ? selectedSlot : null}
        onSelectSlot={(type, index) => turn === "player1" && selectSlot(type, index)}
      />

      <hr />

      <div>
        <h2>Energy Pool</h2>
        {["Fire", "Water", "Electric", "Grass", "Psychic", "Fighting"].map((e) => (
          <button key={e} onClick={() => addEnergy(e as EnergyType)} disabled={!selectedSlot || (turn !== "player1" && turn !== "player2")}>
            {e}
          </button>
        ))}
      </div>
    </div>
  );
}