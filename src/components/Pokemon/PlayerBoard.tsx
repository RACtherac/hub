import PokemonSlot from "./PokemonSlot";
import EnergyPool from "./EnergyPool";
import type { PlayerBoard as PB, EnergyType, Pokemon } from "../../types/pokemon";

type Props = {
  playerId: "player1" | "player2";
  board: PB;
  isActive: boolean;
  isAttackTarget?: boolean;
  energyPool: EnergyType[];
  selectedSlot: { type: "active" | "bench"; index?: number } | null;
  onSelectSlot: (slot: "active" | "bench", index?: number) => void;
  onCreatePokemon: (type: "active" | "bench", index: number | undefined, hp: number) => void;
  onDamage: (type: "active" | "bench", index?: number) => void;
  onHeal: (type: "active" | "bench", index?: number) => void;
  onDropEnergy: (type: "active" | "bench", index: number | undefined, energy: EnergyType) => void;
  onMovePokemon: (type: "active" | "bench", index: number | undefined, pokemon: Pokemon, fromType: "active" | "bench", fromIndex?: number) => void;
  onAttack?: (type: "active" | "bench", index?: number) => void;
};

export default function PlayerBoard({
  playerId, board, isActive, isAttackTarget, energyPool, selectedSlot,
  onSelectSlot, onCreatePokemon, onDamage, onHeal, onDropEnergy, onMovePokemon, onAttack,
}: Props) {
  const label = playerId === "player1" ? "Player 1" : "Player 2";
  const isP2 = playerId === "player2";

  return (
    <div className={`pkm-board${isP2 ? " pkm-board--p2" : ""}${!isActive && !isAttackTarget ? " pkm-board--inactive" : ""}${isAttackTarget ? " pkm-board--attack-target" : ""}`}>
      <div className="pkm-board-header">
        <span className="pkm-board-label">{label}</span>
        {isActive && <span className="pkm-board-turn-badge">your turn</span>}
        <div className="pkm-board-line" />
      </div>

      {/* Active slot */}
      <div className="pkm-row">
        <span className="pkm-row-label">Active</span>
        <div className="pkm-slots">
          <PokemonSlot
            slotType="active"
            pokemon={board.active}
            selected={selectedSlot?.type === "active"}
            isAttackTarget={isAttackTarget}
            onSelect={() => onSelectSlot("active")}
            onCreate={(hp) => onCreatePokemon("active", undefined, hp)}
            onDamage={() => onDamage("active")}
            onHeal={() => onHeal("active")}
            onDropEnergy={(energy) => onDropEnergy("active", undefined, energy)}
            onPokemonDrop={(pokemon, fromType, fromIndex) => onMovePokemon("active", undefined, pokemon, fromType, fromIndex)}
            onAttack={onAttack ? () => onAttack("active") : undefined}
          />
        </div>
      </div>

      {/* Bench */}
      <div className="pkm-row">
        <span className="pkm-row-label">Bench</span>
        <div className="pkm-slots">
          {board.bench.map((p, i) => (
            <PokemonSlot
              key={i}
              slotType="bench"
              slotIndex={i}
              pokemon={p}
              selected={selectedSlot?.type === "bench" && selectedSlot.index === i}
              isAttackTarget={isAttackTarget}
              onSelect={() => onSelectSlot("bench", i)}
              onCreate={(hp) => onCreatePokemon("bench", i, hp)}
              onDamage={() => onDamage("bench", i)}
              onHeal={() => onHeal("bench", i)}
              onDropEnergy={(energy) => onDropEnergy("bench", i, energy)}
              onPokemonDrop={(pokemon, fromType, fromIndex) => onMovePokemon("bench", i, pokemon, fromType, fromIndex)}
              onAttack={onAttack ? () => onAttack("bench", i) : undefined}
            />
          ))}
        </div>
      </div>

      {/* Each player's own energy pool */}
      <div className="pkm-row">
        <EnergyPool energies={energyPool} />
      </div>
    </div>
  );
}
