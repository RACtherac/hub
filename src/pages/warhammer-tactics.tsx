import { useState, useCallback, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { allUnits } from "../data/warhammer";
import type { Faction, UnitCategory } from "../types/warhammer";
import "../components/styles/warhammer-tactics.css";

// ── Types ──────────────────────────────────────────────────────────────────────

interface GameUnit {
  instanceId: string;
  name: string;
  shortName: string;
  faction: Faction;
  category: UnitCategory;
  hp: number;
  maxHp: number;
  move: number;
  attack: number;
  range: number;
  x: number;
  y: number;
  team: 0 | 1;
  hasMoved: boolean;
  hasAttacked: boolean;
}

type Phase = "setup" | "playing" | "gameover";

// ── Constants ──────────────────────────────────────────────────────────────────

const ALL_FACTIONS: Faction[] = [
  "space-marines",
  "astra-militarum",
  "adeptus-mechanicus",
  "chaos-space-marine",
  "death-guard",
  "thousand-sons",
  "tyranids",
  "necrons",
  "orks",
];

const FACTION_LABELS: Record<Faction, string> = {
  "space-marines": "Space Marines",
  "astra-militarum": "Astra Militarum",
  "adeptus-mechanicus": "Adeptus Mechanicus",
  "chaos-space-marine": "Chaos Space Marines",
  "death-guard": "Death Guard",
  "thousand-sons": "Thousand Sons",
  "tyranids": "Tyranids",
  "necrons": "Necrons",
  "orks": "Orks",
};

const FACTION_COLORS: Record<Faction, string> = {
  "space-marines": "#1a3a7a",
  "chaos-space-marine": "#6a0a0a",
  "tyranids": "#4a1a6a",
  "astra-militarum": "#5a4a1a",
  "necrons": "#0a5a3a",
  "orks": "#2a5a0a",
  "death-guard": "#3a4a1a",
  "thousand-sons": "#0a1a6a",
  "adeptus-mechanicus": "#5a1a3a",
};

const CATEGORY_STATS: Record<UnitCategory, { hp: number; move: number; attack: number; range: number }> = {
  battleline: { hp: 4, move: 3, attack: 2, range: 1 },
  infantry:   { hp: 5, move: 2, attack: 3, range: 1 },
  vehicle:    { hp: 10, move: 2, attack: 4, range: 2 },
  transport:  { hp: 8,  move: 3, attack: 2, range: 2 },
  monster:    { hp: 7,  move: 3, attack: 3, range: 1 },
};

const GRID_SIZE = 10;
const MAX_LOG = 8;
const PLAYER_XS = [1, 3, 5, 7];
const AI_XS = [1, 3, 5, 7];

// ── Helpers ────────────────────────────────────────────────────────────────────

function makeShortName(name: string): string {
  const words = name.trim().split(/\s+/);
  if (words.length === 1) return words[0].slice(0, 3).toUpperCase();
  return words
    .map((w) => w[0])
    .join("")
    .slice(0, 3)
    .toUpperCase();
}

function buildUnit(
  faction: Faction,
  unitIndex: number,
  xPos: number,
  yPos: number,
  team: 0 | 1
): GameUnit {
  const factionUnits = allUnits.filter((u) => u.faction === faction);
  const src = factionUnits[unitIndex % factionUnits.length];
  const stats = CATEGORY_STATS[src.category];
  return {
    instanceId: `t${team}-${src.id}-${unitIndex}`,
    name: src.name,
    shortName: makeShortName(src.name),
    faction: src.faction,
    category: src.category,
    hp: stats.hp,
    maxHp: stats.hp,
    move: stats.move,
    attack: stats.attack,
    range: stats.range,
    x: xPos,
    y: yPos,
    team,
    hasMoved: false,
    hasAttacked: false,
  };
}

function deployFaction(faction: Faction, team: 0 | 1): GameUnit[] {
  const xs = team === 0 ? PLAYER_XS : AI_XS;
  const y = team === 0 ? 9 : 0;
  return xs.map((x, i) => buildUnit(faction, i, x, y, team));
}

function cellKey(x: number, y: number): string {
  return `${x},${y}`;
}

function manhattan(ax: number, ay: number, bx: number, by: number): number {
  return Math.abs(ax - bx) + Math.abs(ay - by);
}

function getMoveRange(unit: GameUnit, allUnits: GameUnit[]): Set<string> {
  const occupied = new Set(allUnits.map((u) => cellKey(u.x, u.y)));
  const visited = new Set<string>();
  const result = new Set<string>();
  const queue: Array<{ x: number; y: number; steps: number }> = [
    { x: unit.x, y: unit.y, steps: 0 },
  ];
  visited.add(cellKey(unit.x, unit.y));

  while (queue.length > 0) {
    const current = queue.shift()!;
    if (current.steps > 0) {
      result.add(cellKey(current.x, current.y));
    }
    if (current.steps >= unit.move) continue;

    const dirs = [
      [0, 1], [0, -1], [1, 0], [-1, 0],
    ];
    for (const [dx, dy] of dirs) {
      const nx = current.x + dx;
      const ny = current.y + dy;
      const key = cellKey(nx, ny);
      if (nx < 0 || nx >= GRID_SIZE || ny < 0 || ny >= GRID_SIZE) continue;
      if (visited.has(key)) continue;
      if (occupied.has(key)) continue;
      visited.add(key);
      queue.push({ x: nx, y: ny, steps: current.steps + 1 });
    }
  }

  return result;
}

function getAttackTargets(unit: GameUnit, allUnits: GameUnit[]): GameUnit[] {
  return allUnits.filter(
    (u) =>
      u.team !== unit.team &&
      u.hp > 0 &&
      manhattan(unit.x, unit.y, u.x, u.y) <= unit.range
  );
}

function pickRandomFaction(exclude: Faction): Faction {
  const options = ALL_FACTIONS.filter((f) => f !== exclude);
  return options[Math.floor(Math.random() * options.length)];
}

// ── HP Bar ────────────────────────────────────────────────────────────────────

function HpBar({ hp, maxHp }: { hp: number; maxHp: number }) {
  const pct = Math.max(0, (hp / maxHp) * 100);
  return (
    <div className="wt-hp-bar">
      <div
        className={`wt-hp-bar-fill${pct <= 35 ? " wt-hp-bar-fill--low" : ""}`}
        style={{ width: `${pct}%` }}
      />
    </div>
  );
}

// ── Main Component ─────────────────────────────────────────────────────────────

export default function WarhammerTactics() {
  const navigate = useNavigate();
  const [phase, setPhase] = useState<Phase>("setup");
  const [selectedFaction, setSelectedFaction] = useState<Faction | null>(null);
  const [units, setUnits] = useState<GameUnit[]>([]);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [currentTeam, setCurrentTeam] = useState<0 | 1>(0);
  const [log, setLog] = useState<string[]>([]);
  const [winner, setWinner] = useState<0 | 1 | null>(null);
  const [aiTurn, setAiTurn] = useState(false);
  const aiRunning = useRef(false);

  // ── Log helpers ──────────────────────────────────────────────────────────────

  const addLog = useCallback((msg: string) => {
    setLog((prev) => [msg, ...prev].slice(0, MAX_LOG));
  }, []);

  // ── Derived state ────────────────────────────────────────────────────────────

  const selectedUnit = units.find((u) => u.instanceId === selectedId) ?? null;

  const moveRange: Set<string> =
    selectedUnit && !selectedUnit.hasMoved && currentTeam === 0 && !aiTurn
      ? getMoveRange(selectedUnit, units)
      : new Set();

  const attackTargets: GameUnit[] =
    selectedUnit && !selectedUnit.hasAttacked && currentTeam === 0 && !aiTurn
      ? getAttackTargets(selectedUnit, units)
      : [];

  const attackTargetIds = new Set(attackTargets.map((u) => u.instanceId));

  // ── Win check ────────────────────────────────────────────────────────────────

  function checkWin(nextUnits: GameUnit[]): boolean {
    const team0Alive = nextUnits.filter((u) => u.team === 0 && u.hp > 0).length;
    const team1Alive = nextUnits.filter((u) => u.team === 1 && u.hp > 0).length;
    if (team0Alive === 0) {
      setWinner(1);
      setPhase("gameover");
      return true;
    }
    if (team1Alive === 0) {
      setWinner(0);
      setPhase("gameover");
      return true;
    }
    return false;
  }

  // ── Deploy ───────────────────────────────────────────────────────────────────

  function handleDeploy() {
    if (!selectedFaction) return;
    const aiFaction = pickRandomFaction(selectedFaction);
    const playerUnits = deployFaction(selectedFaction, 0);
    const aiUnitsArr = deployFaction(aiFaction, 1);
    const allDeployed = [...playerUnits, ...aiUnitsArr];
    setUnits(allDeployed);
    setLog([
      `Your turn.`,
      `${FACTION_LABELS[selectedFaction]} vs ${FACTION_LABELS[aiFaction]} — battle begins!`,
    ]);
    setCurrentTeam(0);
    setSelectedId(null);
    setAiTurn(false);
    aiRunning.current = false;
    setPhase("playing");
  }

  // ── Player click on unit card / grid token ────────────────────────────────

  function handleSelectUnit(unit: GameUnit) {
    if (aiTurn) return;
    if (unit.team !== 0) return;
    if (unit.hp <= 0) return;
    setSelectedId((prev) => (prev === unit.instanceId ? null : unit.instanceId));
  }

  // ── Player move ───────────────────────────────────────────────────────────

  function handleCellClick(x: number, y: number) {
    if (aiTurn || !selectedUnit) return;
    const key = cellKey(x, y);

    if (moveRange.has(key)) {
      const nextUnits = units.map((u) =>
        u.instanceId === selectedUnit.instanceId
          ? { ...u, x, y, hasMoved: true }
          : u
      );
      setUnits(nextUnits);

      // Auto-deselect if both done
      const updated = nextUnits.find((u) => u.instanceId === selectedUnit.instanceId)!;
      if (updated.hasAttacked) {
        setSelectedId(null);
      }
    }
  }

  // ── Player attack ─────────────────────────────────────────────────────────

  function handleAttack(targetUnit: GameUnit) {
    if (aiTurn || !selectedUnit) return;
    if (!attackTargetIds.has(targetUnit.instanceId)) return;

    const dmg = selectedUnit.attack;
    const newHp = Math.max(0, targetUnit.hp - dmg);
    const killed = newHp <= 0;

    let nextUnits = units.map((u) => {
      if (u.instanceId === selectedUnit.instanceId) return { ...u, hasAttacked: true };
      if (u.instanceId === targetUnit.instanceId) return { ...u, hp: newHp };
      return u;
    });

    addLog(`${selectedUnit.name} strikes ${targetUnit.name} for ${dmg} damage.`);
    if (killed) addLog(`${targetUnit.name} is destroyed!`);

    setUnits(nextUnits);

    if (!checkWin(nextUnits)) {
      const attacker = nextUnits.find((u) => u.instanceId === selectedUnit.instanceId)!;
      if (attacker.hasMoved) setSelectedId(null);
    }
  }

  // ── Grid cell handler: routes to move or attack ────────────────────────────

  function handleGridCellClick(x: number, y: number) {
    if (aiTurn || !selectedUnit) return;

    // Check if there's an enemy at this cell that's in attack range
    const targetAtCell = units.find((u) => u.x === x && u.y === y && u.hp > 0);
    if (targetAtCell && attackTargetIds.has(targetAtCell.instanceId)) {
      handleAttack(targetAtCell);
      return;
    }

    // Otherwise try to move
    handleCellClick(x, y);
  }

  // ── End player turn ───────────────────────────────────────────────────────

  function handleEndTurn() {
    if (aiTurn || currentTeam !== 0) return;

    // Reset player units
    const resetPlayer = units.map((u) =>
      u.team === 0 ? { ...u, hasMoved: false, hasAttacked: false } : u
    );
    setSelectedId(null);
    setCurrentTeam(1);
    setAiTurn(true);
    aiRunning.current = true;

    setTimeout(() => {
      runAiTurn(resetPlayer);
    }, 400);
  }

  // ── AI Turn ───────────────────────────────────────────────────────────────

  function runAiTurn(startUnits: GameUnit[]) {
    let current = [...startUnits];
    const newLogs: string[] = [];

    const aiUnits = current.filter((u) => u.team === 1 && u.hp > 0);

    for (const aiUnit of aiUnits) {
      // Re-fetch this unit's latest state
      let me = current.find((u) => u.instanceId === aiUnit.instanceId);
      if (!me || me.hp <= 0) continue;

      // 1. Attack if possible and haven't attacked yet
      if (!me.hasAttacked) {
        const targets = getAttackTargets(me, current);
        if (targets.length > 0) {
          const target = targets.reduce((a, b) => (a.hp < b.hp ? a : b));
          const dmg = me.attack;
          const newHp = Math.max(0, target.hp - dmg);
          const killed = newHp <= 0;
          newLogs.push(`${me.name} strikes ${target.name} for ${dmg} damage.`);
          if (killed) newLogs.push(`${target.name} is destroyed!`);
          current = current.map((u) => {
            if (u.instanceId === me!.instanceId) return { ...u, hasAttacked: true };
            if (u.instanceId === target.instanceId) return { ...u, hp: newHp };
            return u;
          });
          me = current.find((u) => u.instanceId === aiUnit.instanceId)!;
        }
      }

      // 2. Move toward nearest player unit if haven't moved
      if (!me.hasAttacked || !me.hasMoved) {
        if (!me.hasMoved) {
          const playerAlive = current.filter((u) => u.team === 0 && u.hp > 0);
          if (playerAlive.length > 0) {
            const nearestTarget = playerAlive.reduce((a, b) =>
              manhattan(me!.x, me!.y, a.x, a.y) <= manhattan(me!.x, me!.y, b.x, b.y) ? a : b
            );
            const moveSet = getMoveRange(me, current);
            if (moveSet.size > 0) {
              let bestKey = "";
              let bestDist = Infinity;
              moveSet.forEach((key) => {
                const [kx, ky] = key.split(",").map(Number);
                const d = manhattan(kx, ky, nearestTarget.x, nearestTarget.y);
                if (d < bestDist) {
                  bestDist = d;
                  bestKey = key;
                }
              });
              if (bestKey) {
                const [nx, ny] = bestKey.split(",").map(Number);
                current = current.map((u) =>
                  u.instanceId === me!.instanceId
                    ? { ...u, x: nx, y: ny, hasMoved: true }
                    : u
                );
                me = current.find((u) => u.instanceId === aiUnit.instanceId)!;
              }
            }
          }
        }

        // 3. After moving, attack again if possible and not yet attacked
        if (!me.hasAttacked) {
          const targets = getAttackTargets(me, current);
          if (targets.length > 0) {
            const target = targets.reduce((a, b) => (a.hp < b.hp ? a : b));
            const dmg = me.attack;
            const newHp = Math.max(0, target.hp - dmg);
            const killed = newHp <= 0;
            newLogs.push(`${me.name} strikes ${target.name} for ${dmg} damage.`);
            if (killed) newLogs.push(`${target.name} is destroyed!`);
            current = current.map((u) => {
              if (u.instanceId === me!.instanceId) return { ...u, hasAttacked: true };
              if (u.instanceId === target.instanceId) return { ...u, hp: newHp };
              return u;
            });
          }
        }
      }
    }

    // Reset AI hasMoved/hasAttacked
    current = current.map((u) =>
      u.team === 1 ? { ...u, hasMoved: false, hasAttacked: false } : u
    );

    newLogs.push("Enemy forces have acted.");
    newLogs.push("Your turn.");

    setUnits(current);
    setLog((prev) => [...newLogs.reverse(), ...prev].slice(0, MAX_LOG));

    if (!checkWin(current)) {
      setCurrentTeam(0);
      setAiTurn(false);
      aiRunning.current = false;
    }
  }

  // ── Restart ───────────────────────────────────────────────────────────────

  function handleRestart() {
    setPhase("setup");
    setSelectedFaction(null);
    setUnits([]);
    setSelectedId(null);
    setCurrentTeam(0);
    setLog([]);
    setWinner(null);
    setAiTurn(false);
    aiRunning.current = false;
  }

  // ── Render ─────────────────────────────────────────────────────────────────

  const playerUnits = units.filter((u) => u.team === 0);
  const enemyUnits = units.filter((u) => u.team === 1);

  function renderGrid() {
    const cells: React.ReactElement[] = [];
    for (let row = 0; row < GRID_SIZE; row++) {
      for (let col = 0; col < GRID_SIZE; col++) {
        const x = col;
        const y = row;
        const key = cellKey(x, y);
        const unitHere = units.find((u) => u.x === x && u.y === y && u.hp > 0);
        const isSelected = unitHere?.instanceId === selectedId;
        const isMove = moveRange.has(key) && !unitHere;
        const isAttack = unitHere ? attackTargetIds.has(unitHere.instanceId) : false;

        let cellClass = "wt-cell";
        if (isMove) cellClass += " wt-cell--move";
        if (isAttack) cellClass += " wt-cell--attack";
        if (isSelected) cellClass += " wt-cell--selected";

        cells.push(
          <div
            key={key}
            className={cellClass}
            onClick={() => {
              if (unitHere && unitHere.team === 0) {
                handleSelectUnit(unitHere);
              } else {
                handleGridCellClick(x, y);
              }
            }}
          >
            {unitHere && (
              <div className="wt-token">
                <div
                  className={`wt-token-circle wt-token-circle--team${unitHere.team}`}
                  style={{ backgroundColor: FACTION_COLORS[unitHere.faction] }}
                >
                  {unitHere.shortName}
                </div>
                <div className="wt-token-hp">
                  <div
                    className={`wt-token-hp-fill${
                      unitHere.hp / unitHere.maxHp <= 0.35 ? " wt-token-hp-fill--low" : ""
                    }`}
                    style={{ width: `${(unitHere.hp / unitHere.maxHp) * 100}%` }}
                  />
                </div>
              </div>
            )}
          </div>
        );
      }
    }
    return cells;
  }

  function getStatusText(unit: GameUnit): string {
    if (unit.instanceId !== selectedId) return "";
    const parts: string[] = ["·"];
    if (!unit.hasMoved) parts.push("can move");
    else parts.push("moved");
    if (!unit.hasAttacked) parts.push("can attack");
    else parts.push("attacked");
    return parts.join(" · ");
  }

  return (
    <div className="wt-page">
      {/* Topbar */}
      <div className="wt-topbar">
        <button className="wt-topbar-back" onClick={() => navigate("/")}>
          OH<span>/</span>Hub
        </button>
        <span className="wt-topbar-title">Warhammer Tactics</span>
      </div>

      {/* Setup Phase */}
      {phase === "setup" && (
        <>
          <header className="wt-hero">
            <p className="wt-eyebrow">// tactical battle</p>
            <h1 className="wt-title">
              Choose your <em>faction</em>
            </h1>
            <p className="wt-subtitle">4 units per side · turn-based · fight the AI</p>
          </header>

          <div className="wt-setup">
            <div className="wt-faction-section">
              <p className="wt-section-label">// select faction</p>
              <div className="wt-faction-grid">
                {ALL_FACTIONS.map((faction) => {
                  const factionUnitCount = allUnits.filter((u) => u.faction === faction).length;
                  return (
                    <button
                      key={faction}
                      className={`wt-faction-btn${
                        selectedFaction === faction ? " wt-faction-btn--selected" : ""
                      }`}
                      onClick={() => setSelectedFaction(faction)}
                    >
                      <div className="wt-faction-header">
                        <div
                          className="wt-faction-dot"
                          style={{ backgroundColor: FACTION_COLORS[faction] }}
                        />
                        <span className="wt-faction-name">{FACTION_LABELS[faction]}</span>
                      </div>
                      <span className="wt-faction-units">{factionUnitCount} units available</span>
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="wt-setup-actions">
              <button
                className="wt-deploy-btn"
                disabled={!selectedFaction}
                onClick={handleDeploy}
              >
                Deploy Forces
              </button>
            </div>
          </div>
        </>
      )}

      {/* Playing Phase */}
      {phase === "playing" && (
        <div className="wt-playing">
          {/* Left Panel — Player Units */}
          <div className="wt-panel">
            <p className="wt-panel-label">// your units</p>
            {playerUnits.map((unit) => (
              <div
                key={unit.instanceId}
                className={`wt-unit-card${
                  unit.instanceId === selectedId ? " wt-unit-card--selected" : ""
                }${unit.hp <= 0 ? " wt-unit-card--dead" : ""}`}
                onClick={() => handleSelectUnit(unit)}
              >
                <div className="wt-card-header">
                  <div
                    className="wt-card-badge"
                    style={{ backgroundColor: FACTION_COLORS[unit.faction] }}
                  >
                    {unit.shortName}
                  </div>
                  <span className="wt-card-name">{unit.name}</span>
                </div>
                <HpBar hp={unit.hp} maxHp={unit.maxHp} />
                <div className="wt-card-stats">
                  <span className="wt-card-stat">
                    hp <span>{unit.hp}/{unit.maxHp}</span>
                  </span>
                  <span className="wt-card-stat">
                    mv <span>{unit.move}</span>
                  </span>
                  <span className="wt-card-stat">
                    atk <span>{unit.attack}</span>
                  </span>
                  <span className="wt-card-stat">
                    rng <span>{unit.range}</span>
                  </span>
                </div>
                {unit.instanceId === selectedId && (
                  <span className="wt-card-status">{getStatusText(unit)}</span>
                )}
              </div>
            ))}

            <div className="wt-turn-indicator" style={{ marginTop: "0.5rem" }}>
              {aiTurn ? (
                <span className="wt-turn-indicator--ai">enemy turn…</span>
              ) : (
                <span>your turn</span>
              )}
            </div>

            <button
              className="wt-end-turn-btn"
              disabled={aiTurn || currentTeam !== 0}
              onClick={handleEndTurn}
            >
              End Turn
            </button>
          </div>

          {/* Grid */}
          <div className="wt-grid-area">
            <div className="wt-grid">{renderGrid()}</div>
          </div>

          {/* Right Panel — Enemy Units + Log */}
          <div className="wt-panel wt-panel--right">
            <p className="wt-panel-label">// enemy units</p>
            {enemyUnits.map((unit) => (
              <div
                key={unit.instanceId}
                className={`wt-unit-card wt-unit-card--enemy${
                  unit.hp <= 0 ? " wt-unit-card--dead" : ""
                }`}
              >
                <div className="wt-card-header">
                  <div
                    className="wt-card-badge"
                    style={{ backgroundColor: FACTION_COLORS[unit.faction] }}
                  >
                    {unit.shortName}
                  </div>
                  <span className="wt-card-name">{unit.name}</span>
                </div>
                <HpBar hp={unit.hp} maxHp={unit.maxHp} />
              </div>
            ))}

            <p className="wt-panel-label" style={{ marginTop: "1rem" }}>
              // battle log
            </p>
            <div className="wt-log">
              {log.map((entry, i) => (
                <div
                  key={i}
                  className={`wt-log-entry${i === 0 ? " wt-log-entry--recent" : ""}`}
                >
                  {entry}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Gameover Phase */}
      {phase === "gameover" && (
        <div className="wt-gameover">
          <p className="wt-gameover-eyebrow">// battle complete</p>
          <h1 className="wt-gameover-title">
            {winner === 0 ? (
              <>
                <em>Victory</em>
              </>
            ) : (
              <>
                <em>Defeat</em>
              </>
            )}
          </h1>
          <p className="wt-gameover-subtitle">
            {winner === 0
              ? "Your forces have crushed the enemy. For the Emperor!"
              : "Your forces have been annihilated. Regroup and try again."}
          </p>
          <button className="wt-restart-btn" onClick={handleRestart}>
            Fight Again
          </button>
        </div>
      )}
    </div>
  );
}
