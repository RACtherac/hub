import { useState } from "react";
import { useNavigate } from "react-router-dom";
import PlayerBoard from "../components/Pokemon/PlayerBoard";
import type { GameBoard, PlayerTurn, EnergyType, Pokemon } from "../types/pokemon";
import "../components/styles/pokemon.css";

const ALL_ENERGIES: EnergyType[] = ["Fire", "Water", "Electric", "Grass", "Psychic", "Fighting"];

const ENERGY_ICONS: Record<EnergyType, string> = {
  Fire: "🔥", Water: "💧", Electric: "⚡",
  Grass: "🌿", Psychic: "🔮", Fighting: "🥊",
};

function drawOne(picks: EnergyType[]): EnergyType {
  return picks[Math.floor(Math.random() * picks.length)];
}

// ── Setup Screen ──────────────────────────────────────────────────────────────

function SetupScreen({ onStart }: { onStart: (p1: EnergyType[], p2: EnergyType[]) => void }) {
  const [p1Picks, setP1Picks] = useState<Set<EnergyType>>(new Set());
  const [p2Picks, setP2Picks] = useState<Set<EnergyType>>(new Set());

  function toggle(player: 1 | 2, energy: EnergyType) {
    const setter = player === 1 ? setP1Picks : setP2Picks;
    setter((prev) => {
      const next = new Set(prev);
      next.has(energy) ? next.delete(energy) : next.add(energy);
      return next;
    });
  }

  const canStart = p1Picks.size > 0 && p2Picks.size > 0;

  return (
    <div className="pkm-setup">
      <header className="pkm-setup-hero">
        <p className="pkm-setup-eyebrow">// pre-game</p>
        <h1 className="pkm-setup-title">Choose <em>Energy</em></h1>
        <p className="pkm-setup-sub">Each player picks the energy types they'll draw from each turn.</p>
      </header>

      <div className="pkm-setup-players">
        {([1, 2] as const).map((player) => {
          const picks = player === 1 ? p1Picks : p2Picks;
          return (
            <div key={player} className="pkm-setup-player">
              <div className="pkm-setup-player-header">
                <span className="pkm-setup-player-label">Player {player}</span>
                <span className="pkm-setup-player-count">{picks.size} selected</span>
              </div>
              <div className="pkm-setup-energy-grid">
                {ALL_ENERGIES.map((energy) => {
                  const selected = picks.has(energy);
                  return (
                    <button
                      key={energy}
                      className={`pkm-setup-energy-btn pkm-energy--${energy}${selected ? " pkm-setup-energy-btn--selected" : ""}`}
                      onClick={() => toggle(player, energy)}
                    >
                      <span className="pkm-setup-energy-icon">{ENERGY_ICONS[energy]}</span>
                      <span>{energy}</span>
                      {selected && <span className="pkm-setup-check">✓</span>}
                    </button>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>

      <div className="pkm-setup-footer">
        <p className="pkm-setup-hint">
          {!canStart
            ? "Both players must select at least one energy type."
            : "Each turn you'll draw 1 random energy from your selected types."}
        </p>
        <button className="pkm-start-btn" disabled={!canStart} onClick={() => onStart(Array.from(p1Picks), Array.from(p2Picks))}>
          Start →
        </button>
      </div>
    </div>
  );
}

// ── Main Page ─────────────────────────────────────────────────────────────────

export default function PokemonTCGTool() {
  const navigate = useNavigate();

  const [phase, setPhase] = useState<"setup" | "game">("setup");
  const [p1Picks, setP1Picks] = useState<EnergyType[]>([]);
  const [p2Picks, setP2Picks] = useState<EnergyType[]>([]);
  const [p1Energy, setP1Energy] = useState<EnergyType | null>(null);
  const [p2Energy, setP2Energy] = useState<EnergyType | null>(null);

  const [board, setBoard] = useState<GameBoard>({
    player1: { active: null, bench: [null, null, null] },
    player2: { active: null, bench: [null, null, null] },
  });
  const [turn, setTurn] = useState<PlayerTurn>("player1");
  const [attackMode, setAttackMode] = useState(false);
  const [attackDamage, setAttackDamage] = useState("30");

  function handleStart(picks1: EnergyType[], picks2: EnergyType[]) {
    setP1Picks(picks1);
    setP2Picks(picks2);
    // Player 1 goes first — draw their first energy
    setP1Energy(drawOne(picks1));
    setP2Energy(null);
    setPhase("game");
  }

  function endTurn() {
    const next: PlayerTurn = turn === "player1" ? "player2" : "player1";
    if (next === "player1") setP1Energy(drawOne(p1Picks));
    else setP2Energy(drawOne(p2Picks));
    setTurn(next);
    setAttackMode(false);
  }

  const attackPokemon = (targetPlayer: "player1" | "player2", type: "active" | "bench", index?: number) => {
    const dmg = parseInt(attackDamage, 10);
    if (!dmg || dmg <= 0) return;
    const updated = { ...board };
    const player = updated[targetPlayer];
    if (type === "active" && player.active) {
      player.active.hp -= dmg;
      if (player.active.hp <= 0) player.active = null;
    }
    if (type === "bench" && index !== undefined && player.bench[index]) {
      player.bench[index]!.hp -= dmg;
      if (player.bench[index]!.hp <= 0) player.bench[index] = null;
    }
    setBoard(updated);
    setAttackMode(false);
  };

  const createPokemon = (type: "active" | "bench", index: number | undefined, hp: number) => {
    const updated = { ...board };
    const player = updated[turn];
    const pokemon: Pokemon = { hp, maxHp: hp, energy: [] };
    if (type === "active") player.active = pokemon;
    if (type === "bench" && index !== undefined) player.bench[index] = pokemon;
    setBoard(updated);
  };

  const damagePokemon = (targetPlayer: "player1" | "player2", type: "active" | "bench", index?: number) => {
    const updated = { ...board };
    const player = updated[targetPlayer];
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

  const healPokemon = (targetPlayer: "player1" | "player2", type: "active" | "bench", index?: number) => {
    const updated = { ...board };
    const player = updated[targetPlayer];
    if (type === "active" && player.active)
      player.active.hp = Math.min(player.active.hp + 10, player.active.maxHp);
    if (type === "bench" && index !== undefined && player.bench[index])
      player.bench[index]!.hp = Math.min(player.bench[index]!.hp + 10, player.bench[index]!.maxHp);
    setBoard(updated);
  };

  const dropEnergy = (type: "active" | "bench", index: number | undefined, energy: EnergyType) => {
    const updated = { ...board };
    const player = updated[turn];
    if (type === "active" && player.active) player.active.energy.push(energy);
    if (type === "bench" && index !== undefined && player.bench[index])
      player.bench[index]!.energy.push(energy);
    setBoard(updated);
  };

  const movePokemon = (
    toType: "active" | "bench", toIndex: number | undefined,
    pokemon: Pokemon, fromType: "active" | "bench", fromIndex?: number
  ) => {
    const updated = { ...board };
    const player = { ...updated[turn], bench: [...updated[turn].bench] };
    updated[turn] = player;

    // Capture whatever is currently in the destination slot
    const displaced: Pokemon | null =
      toType === "active" ? player.active
      : toIndex !== undefined ? player.bench[toIndex]
      : null;

    // Place dragged pokemon into destination
    if (toType === "active") player.active = pokemon;
    if (toType === "bench" && toIndex !== undefined) player.bench[toIndex] = pokemon;

    // Put the displaced pokemon into the source slot (swap)
    if (fromType === "active") player.active = displaced;
    if (fromType === "bench" && fromIndex !== undefined) player.bench[fromIndex] = displaced;

    setBoard(updated);
  };

  return (
    <div className="pkm-page">
      <div className="pkm-topbar">
        <button className="pkm-topbar-back" onClick={() => navigate("/")}>
          ← OH<span>/</span>Hub
        </button>
        <span className="pkm-topbar-title">Pokémon TCG Tool</span>
        {phase === "game" && (
          <button
            className="pkm-reset-btn"
            onClick={() => {
              setPhase("setup");
              setBoard({ player1: { active: null, bench: [null, null, null] }, player2: { active: null, bench: [null, null, null] } });
              setTurn("player1");
              setP1Energy(null);
              setP2Energy(null);
            }}
          >
            New Game
          </button>
        )}
      </div>

      {phase === "setup" && <SetupScreen onStart={handleStart} />}

      {phase === "game" && (
        <div className="pkm-arena">
          <PlayerBoard
            playerId="player2"
            board={board.player2}
            isActive={turn === "player2"}
            isAttackTarget={attackMode && turn === "player1"}
            energyPool={p2Energy ? [p2Energy] : []}
            selectedSlot={null}
            onSelectSlot={() => {}}
            onCreatePokemon={createPokemon}
            onDamage={(type, index) => damagePokemon("player2", type, index)}
            onHeal={(type, index) => healPokemon("player2", type, index)}
            onDropEnergy={dropEnergy}
            onMovePokemon={movePokemon}
            onAttack={(type, index) => attackPokemon("player2", type, index)}
          />

          <div className="pkm-middle">
            <div className="pkm-turn-info">
              <span className="pkm-turn-label">Turn</span>
              <span className="pkm-turn-value">{turn === "player1" ? "Player 1" : "Player 2"}</span>
            </div>
            <div className="pkm-attack-area">
              {attackMode ? (
                <>
                  <span className="pkm-attack-hint">Damage:</span>
                  <input
                    className="pkm-attack-input"
                    type="number"
                    min={1}
                    value={attackDamage}
                    onChange={(e) => setAttackDamage(e.target.value)}
                    autoFocus
                  />
                  <span className="pkm-attack-hint">→ pick a target</span>
                  <button className="pkm-attack-cancel-btn" onClick={() => setAttackMode(false)}>Cancel</button>
                </>
              ) : (
                <button className="pkm-attack-btn" onClick={() => setAttackMode(true)}>⚔ Attack</button>
              )}
            </div>
            <button className="pkm-end-turn-btn" onClick={endTurn}>
              End Turn →
            </button>
          </div>

          <PlayerBoard
            playerId="player1"
            board={board.player1}
            isActive={turn === "player1"}
            isAttackTarget={attackMode && turn === "player2"}
            energyPool={p1Energy ? [p1Energy] : []}
            selectedSlot={null}
            onSelectSlot={() => {}}
            onCreatePokemon={createPokemon}
            onDamage={(type, index) => damagePokemon("player1", type, index)}
            onHeal={(type, index) => healPokemon("player1", type, index)}
            onDropEnergy={dropEnergy}
            onMovePokemon={movePokemon}
            onAttack={(type, index) => attackPokemon("player1", type, index)}
          />
        </div>
      )}
    </div>
  );
}
