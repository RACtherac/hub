
import { useState } from "react";
import { useNavigate } from "react-router-dom";

import PlayerBoard from "../components/Pokemon/PlayerBoard";
import EnergyPool from "../components/Pokemon/EnergyPool";

import type { GameBoard, PlayerTurn, EnergyType } from "../types/pokemon";

export default function PokemonTCGTool() {
  const navigate = useNavigate();

  const [board, setBoard] = useState<GameBoard>({
    player1: {
      active: null,
      bench: [null, null, null],
    },
    player2: {
      active: null,
      bench: [null, null, null],
    },
  });

  const [turn, setTurn] = useState<PlayerTurn>("player1");

  const [selectedSlot, setSelectedSlot] = useState<{
    type: "active" | "bench";
    index?: number;
  } | null>(null);

  const selectSlot = (type: "active" | "bench", index?: number) => {
    setSelectedSlot({ type, index });
  };

  const createPokemon = (
    type: "active" | "bench",
    index: number | undefined,
    hp: number
  ) => {
    const updated = { ...board };
    const player = updated[turn];

    const newPokemon = {
      hp: hp,
      energy: [],
    };

    if (type === "active") {
      player.active = newPokemon;
    }

    if (type === "bench" && index !== undefined) {
      player.bench[index] = newPokemon;
    }

    setBoard(updated);
  };

  const damagePokemon = (type: "active" | "bench", index?: number) => {
    const updated = { ...board };
    const player = updated[turn];

    if (type === "active" && player.active) {
      player.active.hp -= 10;
    }

    if (type === "bench" && index !== undefined && player.bench[index]) {
      player.bench[index]!.hp -= 10;
    }

    setBoard(updated);
  };

  const healPokemon = (type: "active" | "bench", index?: number) => {
    const updated = { ...board };
    const player = updated[turn];

    if (type === "active" && player.active) {
      player.active.hp += 10;
    }

    if (type === "bench" && index !== undefined && player.bench[index]) {
      player.bench[index]!.hp += 10;
    }

    setBoard(updated);
  };

  const dropEnergy = (
    type: "active" | "bench",
    index: number | undefined,
    energy: EnergyType
  ) => {
    const updated = { ...board };
    const player = updated[turn];

    if (type === "active" && player.active) {
      player.active.energy.push(energy);
    }

    if (type === "bench" && index !== undefined && player.bench[index]) {
      player.bench[index]!.energy.push(energy);
    }

    setBoard(updated);
  };

  const endTurn = () => {
    setTurn(turn === "player1" ? "player2" : "player1");
    setSelectedSlot(null);
  };

  return (
    <div style={{ padding: "2rem" }}>
      <button onClick={() => navigate("/")}>← Back to Hub</button>

      <h1>Pokémon TCG Battle Tool</h1>

      <h2>Current Turn: {turn}</h2>

      <button onClick={endTurn}>End Turn</button>

      <hr />

      {/* Player 2 */}
      <PlayerBoard
        title="Player 2"
        board={board.player2}
        selectedSlot={turn === "player2" ? selectedSlot : null}
        onSelectSlot={(type, index) =>
          turn === "player2" && selectSlot(type, index)
        }
        onCreatePokemon={(type, index, hp) =>
          turn === "player2" && createPokemon(type, index, hp)
        }
        onDamage={(type, index) =>
          turn === "player2" && damagePokemon(type, index)
        }
        onHeal={(type, index) =>
          turn === "player2" && healPokemon(type, index)
        }
        onDropEnergy={(type, index, energy) =>
          turn === "player2" && dropEnergy(type, index, energy)
        }
      />

      <hr />

      {/* Player 1 */}
      <PlayerBoard
        title="Player 1"
        board={board.player1}
        selectedSlot={turn === "player1" ? selectedSlot : null}
        onSelectSlot={(type, index) =>
          turn === "player1" && selectSlot(type, index)
        }
        onCreatePokemon={(type, index, hp) =>
          turn === "player1" && createPokemon(type, index, hp)
        }
        onDamage={(type, index) =>
          turn === "player1" && damagePokemon(type, index)
        }
        onHeal={(type, index) =>
          turn === "player1" && healPokemon(type, index)
        }
        onDropEnergy={(type, index, energy) =>
          turn === "player1" && dropEnergy(type, index, energy)
        }
      />

      <hr />

      {/* Energy Drag Area */}
      <EnergyPool />
    </div>
  );
}
