import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { ARMIES } from "../data/tactics/armies";
import type { Army, TacticsUnit } from "../data/tactics/armies";
import "../components/styles/warhammer-tactics.css";

// ── Types ──────────────────────────────────────────────────────────────────────

type GameMode = "1v1" | "1vPC";

type Phase =
  | "mode-select"
  | "p1-army"
  | "p1-units"
  | "p2-army"
  | "p2-units"
  | "playing"
  | "gameover";

interface GameUnit {
  instanceId: string;
  unitId: string;
  name: string;
  portrait: string;
  armyColor: string;
  team: 0 | 1;
  hp: number;
  maxHp: number;
  move: number;
  attack: number;
  range: number;
  x: number;
  y: number;
  hasMoved: boolean;
  hasAttacked: boolean;
}

// ── Constants ──────────────────────────────────────────────────────────────────

const GRID = 10;
const DEPLOY_XS = [1, 3, 5, 7];

// ── Helpers ────────────────────────────────────────────────────────────────────

function manhattan(ax: number, ay: number, bx: number, by: number) {
  return Math.abs(ax - bx) + Math.abs(ay - by);
}

function getMoveRange(unit: GameUnit, all: GameUnit[]): Set<string> {
  const occupied = new Set(
    all.filter(u => u.instanceId !== unit.instanceId).map(u => `${u.x},${u.y}`)
  );
  const reachable = new Set<string>();
  const queue = [{ x: unit.x, y: unit.y, steps: 0 }];
  const visited = new Set([`${unit.x},${unit.y}`]);

  while (queue.length) {
    const cur = queue.shift()!;
    if (cur.steps > 0) reachable.add(`${cur.x},${cur.y}`);
    if (cur.steps >= unit.move) continue;
    for (const [dx, dy] of [[-1, 0], [1, 0], [0, -1], [0, 1]]) {
      const nx = cur.x + dx, ny = cur.y + dy;
      const key = `${nx},${ny}`;
      if (nx < 0 || nx >= GRID || ny < 0 || ny >= GRID) continue;
      if (visited.has(key) || occupied.has(key)) continue;
      visited.add(key);
      queue.push({ x: nx, y: ny, steps: cur.steps + 1 });
    }
  }
  return reachable;
}

function getAttackable(unit: GameUnit, all: GameUnit[]): GameUnit[] {
  return all.filter(u => u.team !== unit.team && manhattan(unit.x, unit.y, u.x, u.y) <= unit.range);
}

function buildGameUnits(units: TacticsUnit[], army: Army, team: 0 | 1): GameUnit[] {
  const startY = team === 0 ? GRID - 1 : 0;
  return units.map((u, i) => ({
    instanceId: `t${team}-${u.id}`,
    unitId: u.id,
    name: u.name,
    portrait: u.portrait,
    armyColor: army.color,
    team,
    hp: u.hp,
    maxHp: u.hp,
    move: u.move,
    attack: u.attack,
    range: u.range,
    x: DEPLOY_XS[i] ?? i * 2,
    y: startY,
    hasMoved: false,
    hasAttacked: false,
  }));
}

// ── AI ─────────────────────────────────────────────────────────────────────────

function runAI(units: GameUnit[]): { units: GameUnit[]; log: string[] } {
  let state = [...units];
  const msgs: string[] = [];

  for (const aiUnit of units.filter(u => u.team === 1)) {
    let cur = state.find(u => u.instanceId === aiUnit.instanceId);
    if (!cur) continue;

    // Attack if in range
    let targets = getAttackable(cur, state);
    if (targets.length > 0 && !cur.hasAttacked) {
      const target = [...targets].sort((a, b) => a.hp - b.hp)[0];
      msgs.push(`${cur.name} strikes ${target.name} for ${cur.attack}.`);
      state = state
        .map(u => {
          if (u.instanceId === target.instanceId) return { ...u, hp: u.hp - cur!.attack };
          if (u.instanceId === cur!.instanceId) return { ...u, hasAttacked: true };
          return u;
        })
        .filter(u => u.hp > 0);
      if (!state.find(u => u.instanceId === target.instanceId))
        msgs.push(`${target.name} is destroyed!`);
      cur = state.find(u => u.instanceId === aiUnit.instanceId);
      if (!cur) continue;
    }

    // Move towards nearest enemy
    if (!cur.hasMoved) {
      const enemies = state.filter(u => u.team === 0);
      if (!enemies.length) break;
      const nearest = [...enemies].sort(
        (a, b) => manhattan(cur!.x, cur!.y, a.x, a.y) - manhattan(cur!.x, cur!.y, b.x, b.y)
      )[0];
      const range = getMoveRange(cur, state);
      if (range.size > 0) {
        const best = [...range]
          .map(k => { const [x, y] = k.split(",").map(Number); return { x, y, d: manhattan(x, y, nearest.x, nearest.y) }; })
          .sort((a, b) => a.d - b.d)[0];
        state = state.map(u =>
          u.instanceId === cur!.instanceId ? { ...u, x: best.x, y: best.y, hasMoved: true } : u
        );
        cur = state.find(u => u.instanceId === aiUnit.instanceId);
        if (!cur) continue;
      }

      // Attack again after moving
      targets = getAttackable(cur, state);
      if (targets.length > 0 && !cur.hasAttacked) {
        const target = [...targets].sort((a, b) => a.hp - b.hp)[0];
        msgs.push(`${cur.name} strikes ${target.name} for ${cur.attack}.`);
        state = state
          .map(u => {
            if (u.instanceId === target.instanceId) return { ...u, hp: u.hp - cur!.attack };
            if (u.instanceId === cur!.instanceId) return { ...u, hasAttacked: true };
            return u;
          })
          .filter(u => u.hp > 0);
        if (!state.find(u => u.instanceId === target.instanceId))
          msgs.push(`${target.name} is destroyed!`);
      }
    }
  }

  return {
    units: state.map(u => u.team === 1 ? { ...u, hasMoved: false, hasAttacked: false } : u),
    log: msgs,
  };
}

// ── Setup screens ──────────────────────────────────────────────────────────────

function ModeSelect({ onSelect }: { onSelect: (m: GameMode) => void }) {
  return (
    <div className="wt-setup">
      <div className="wt-mode-cards">
        <button className="wt-mode-card" onClick={() => onSelect("1vPC")}>
          <span className="wt-mode-icon">🤖</span>
          <span className="wt-mode-label">1 vs PC</span>
          <span className="wt-mode-desc">Solo challenge against the AI</span>
        </button>
        <button className="wt-mode-card" onClick={() => onSelect("1v1")}>
          <span className="wt-mode-icon">⚔️</span>
          <span className="wt-mode-label">1 vs 1</span>
          <span className="wt-mode-desc">Pass &amp; play with a friend</span>
        </button>
      </div>
    </div>
  );
}

function ArmySelect({
  player,
  takenId,
  onSelect,
}: {
  player: 1 | 2;
  takenId?: string;
  onSelect: (id: string) => void;
}) {
  const [hovered, setHovered] = useState<string | null>(null);
  const preview = ARMIES.find(a => a.id === (hovered ?? ""));

  return (
    <div className="wt-setup">
      <p className="wt-setup-hint">Player {player} — choose your army</p>
      <div className="wt-army-grid">
        {ARMIES.map(army => (
          <button
            key={army.id}
            className={`wt-army-card ${army.id === takenId ? "wt-army-card--taken" : ""}`}
            onClick={() => army.id !== takenId && onSelect(army.id)}
            onMouseEnter={() => setHovered(army.id)}
            onMouseLeave={() => setHovered(null)}
            disabled={army.id === takenId}
            style={{ "--army-color": army.color } as React.CSSProperties}
          >
            <span className="wt-army-card-emoji">{army.emoji}</span>
            <span className="wt-army-card-name">{army.name}</span>
            <span className="wt-army-card-desc">{army.description}</span>
          </button>
        ))}
      </div>

      {preview && (
        <div className="wt-army-preview" style={{ "--army-color": preview.color } as React.CSSProperties}>
          <p className="wt-army-preview-lore">{preview.lore}</p>
          <div className="wt-army-preview-roster">
            {preview.units.map(u => (
              <div key={u.id} className="wt-army-preview-unit">
                <span className="wt-army-preview-portrait">{u.portrait}</span>
                <span className="wt-army-preview-name">{u.name}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

function UnitSelect({
  player,
  army,
  onDeploy,
}: {
  player: 1 | 2;
  army: Army;
  onDeploy: (units: TacticsUnit[]) => void;
}) {
  const [selected, setSelected] = useState<string[]>([]);

  function toggle(id: string) {
    setSelected(prev =>
      prev.includes(id)
        ? prev.filter(x => x !== id)
        : prev.length < 4
        ? [...prev, id]
        : prev
    );
  }

  const selectedUnits = army.units.filter(u => selected.includes(u.id));

  return (
    <div className="wt-setup">
      <p className="wt-setup-hint">
        Player {player} · <strong>{army.name}</strong> · select 4 soldiers &nbsp;
        <span className="wt-select-count">{selected.length} / 4</span>
      </p>
      <div className="wt-unit-select-grid">
        {army.units.map(unit => {
          const isSel = selected.includes(unit.id);
          const isDisabled = !isSel && selected.length >= 4;
          return (
            <button
              key={unit.id}
              className={`wt-unit-select-card ${isSel ? "wt-unit-select-card--selected" : ""} ${isDisabled ? "wt-unit-select-card--disabled" : ""}`}
              onClick={() => toggle(unit.id)}
              style={{ "--army-color": army.color } as React.CSSProperties}
            >
              <div className="wt-unit-portrait-wrap">
                <span className="wt-unit-portrait-emoji">{unit.portrait}</span>
                {isSel && <span className="wt-unit-select-check">✓</span>}
              </div>
              <div className="wt-unit-select-body">
                <span className="wt-unit-select-name">{unit.name}</span>
                <span className="wt-unit-select-desc">{unit.description}</span>
                <div className="wt-unit-select-stats">
                  <span title="HP">♥ {unit.hp}</span>
                  <span title="Move">⊕ {unit.move}</span>
                  <span title="Attack">⚔ {unit.attack}</span>
                  <span title="Range">◎ {unit.range}</span>
                </div>
              </div>
            </button>
          );
        })}
      </div>
      <button
        className="wt-deploy-btn"
        disabled={selected.length < 4}
        onClick={() => onDeploy(selectedUnits)}
      >
        {selected.length < 4 ? `Select ${4 - selected.length} more` : "Deploy Forces →"}
      </button>
    </div>
  );
}

// ── Main page ──────────────────────────────────────────────────────────────────

export default function WarhammerTactics() {
  const navigate = useNavigate();

  const [phase, setPhase] = useState<Phase>("mode-select");
  const [gameMode, setGameMode] = useState<GameMode>("1vPC");
  const [p1ArmyId, setP1ArmyId] = useState("");
  const [p2ArmyId, setP2ArmyId] = useState("");
  const [units, setUnits] = useState<GameUnit[]>([]);
  const [currentTeam, setCurrentTeam] = useState<0 | 1>(0);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [log, setLog] = useState<string[]>([]);
  const [winner, setWinner] = useState<0 | 1 | null>(null);
  const aiRunning = useRef(false);

  function addLog(...msgs: string[]) {
    setLog(prev => [...msgs, ...prev].slice(0, 10));
  }

  function resetGame() {
    setPhase("mode-select");
    setP1ArmyId("");
    setP2ArmyId("");
    setUnits([]);
    setLog([]);
    setWinner(null);
    setSelectedId(null);
    aiRunning.current = false;
  }

  // ── Setup flow ────────────────────────────────────────────────────────────

  function handleModeSelect(mode: GameMode) {
    setGameMode(mode);
    setPhase("p1-army");
  }

  function handleP1Army(armyId: string) {
    setP1ArmyId(armyId);
    setPhase("p1-units");
  }

  function handleP1Units(selected: TacticsUnit[]) {
    const p1Army = ARMIES.find(a => a.id === p1ArmyId)!;
    const team0 = buildGameUnits(selected, p1Army, 0);

    if (gameMode === "1v1") {
      setUnits(team0);
      setPhase("p2-army");
    } else {
      const aiArmies = ARMIES.filter(a => a.id !== p1ArmyId);
      const aiArmy = aiArmies[Math.floor(Math.random() * aiArmies.length)];
      const aiUnits = [...aiArmy.units].sort(() => Math.random() - 0.5).slice(0, 4);
      const team1 = buildGameUnits(aiUnits, aiArmy, 1);
      setP2ArmyId(aiArmy.id);
      setUnits([...team0, ...team1]);
      setCurrentTeam(0);
      setSelectedId(null);
      setWinner(null);
      addLog(`${p1Army.name} vs ${aiArmy.name} — battle begins!`);
      setPhase("playing");
    }
  }

  function handleP2Army(armyId: string) {
    setP2ArmyId(armyId);
    setPhase("p2-units");
  }

  function handleP2Units(selected: TacticsUnit[]) {
    const p1Army = ARMIES.find(a => a.id === p1ArmyId)!;
    const p2Army = ARMIES.find(a => a.id === p2ArmyId)!;
    const team0 = units.filter(u => u.team === 0);
    const team1 = buildGameUnits(selected, p2Army, 1);
    setUnits([...team0, ...team1]);
    setCurrentTeam(0);
    setSelectedId(null);
    setWinner(null);
    addLog(`${p1Army.name} vs ${p2Army.name} — battle begins!`);
    setPhase("playing");
  }

  // ── Game logic ────────────────────────────────────────────────────────────

  function checkWin(unitList: GameUnit[]): 0 | 1 | null {
    if (!unitList.some(u => u.team === 0)) return 1;
    if (!unitList.some(u => u.team === 1)) return 0;
    return null;
  }

  function endTurn(forTeam: 0 | 1) {
    if (forTeam !== currentTeam) return;
    const reset = units.map(u => u.team === currentTeam ? { ...u, hasMoved: false, hasAttacked: false } : u);
    setSelectedId(null);

    if (gameMode === "1v1") {
      const next: 0 | 1 = currentTeam === 0 ? 1 : 0;
      setUnits(reset);
      setCurrentTeam(next);
      addLog(`Player ${next + 1}'s turn.`);
    } else {
      setCurrentTeam(1);
      setUnits(reset);
      aiRunning.current = true;
      setTimeout(() => {
        const { units: afterAI, log: aiLog } = runAI(reset);
        aiRunning.current = false;
        const w = checkWin(afterAI);
        setUnits(afterAI);
        if (aiLog.length) addLog(...aiLog, "Your turn.");
        else addLog("Enemy forces have acted.", "Your turn.");
        if (w !== null) { setWinner(w); setPhase("gameover"); }
        else setCurrentTeam(0);
      }, 600);
    }
  }

  // ── Cell interactions ─────────────────────────────────────────────────────

  const selectedUnit = units.find(u => u.instanceId === selectedId) ?? null;

  const moveRange =
    selectedUnit && !selectedUnit.hasMoved && selectedUnit.team === currentTeam
      ? getMoveRange(selectedUnit, units)
      : new Set<string>();

  const attackable =
    selectedUnit && !selectedUnit.hasAttacked && selectedUnit.team === currentTeam
      ? new Set(getAttackable(selectedUnit, units).map(u => u.instanceId))
      : new Set<string>();

  function handleCellClick(x: number, y: number) {
    if (aiRunning.current) return;
    if (gameMode === "1vPC" && currentTeam !== 0) return;

    const clicked = units.find(u => u.x === x && u.y === y);

    if (clicked?.team === currentTeam) {
      setSelectedId(clicked.instanceId);
      return;
    }

    if (!selectedUnit) return;

    // Attack
    if (clicked && attackable.has(clicked.instanceId)) {
      const dmg = selectedUnit.attack;
      let next = units
        .map(u => {
          if (u.instanceId === clicked.instanceId) return { ...u, hp: u.hp - dmg };
          if (u.instanceId === selectedUnit.instanceId) return { ...u, hasAttacked: true };
          return u;
        })
        .filter(u => u.hp > 0);

      addLog(`${selectedUnit.name} strikes ${clicked.name} for ${dmg}!`);
      if (!next.find(u => u.instanceId === clicked.instanceId))
        addLog(`${clicked.name} is destroyed!`);

      setUnits(next);
      const w = checkWin(next);
      if (w !== null) { setWinner(w); setPhase("gameover"); return; }
      const upd = next.find(u => u.instanceId === selectedUnit.instanceId);
      if (upd?.hasMoved && upd?.hasAttacked) setSelectedId(null);
      return;
    }

    // Move
    if (moveRange.has(`${x},${y}`)) {
      const next = units.map(u =>
        u.instanceId === selectedUnit.instanceId ? { ...u, x, y, hasMoved: true } : u
      );
      setUnits(next);
      const upd = next.find(u => u.instanceId === selectedUnit.instanceId);
      if (upd?.hasAttacked) setSelectedId(null);
      return;
    }

    setSelectedId(null);
  }

  // ── Render helpers ────────────────────────────────────────────────────────

  const p1Army = ARMIES.find(a => a.id === p1ArmyId);
  const p2Army = ARMIES.find(a => a.id === p2ArmyId);

  function teamLabel(t: 0 | 1): string {
    if (gameMode === "1v1") return `Player ${t + 1}`;
    return t === 0 ? "You" : "AI";
  }

  function UnitPanel({ team }: { team: 0 | 1 }) {
    const isActive = currentTeam === team && phase === "playing";
    const panelUnits = units.filter(u => u.team === team);
    return (
      <aside className={`wt-panel ${isActive ? "wt-panel--active" : "wt-panel--dim"}`}>
        <div className="wt-panel-label">// {teamLabel(team)}</div>
        <div className="wt-panel-units">
          {panelUnits.map(u => (
            <div
              key={u.instanceId}
              className={`wt-unit-card ${u.instanceId === selectedId ? "wt-unit-card--selected" : ""}`}
              style={{ "--army-color": u.armyColor } as React.CSSProperties}
              onClick={() => isActive && setSelectedId(u.instanceId)}
            >
              <span className="wt-card-portrait">{u.portrait}</span>
              <div className="wt-card-body">
                <span className="wt-card-name">{u.name}</span>
                <div className="wt-card-hp-bar">
                  <div className="wt-card-hp-fill" style={{ width: `${(u.hp / u.maxHp) * 100}%`, background: u.armyColor }} />
                </div>
                <div className="wt-card-stats">
                  <span>♥{u.hp}/{u.maxHp}</span>
                  <span>⊕{u.move}</span>
                  <span>⚔{u.attack}</span>
                  <span>◎{u.range}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {(gameMode === "1v1" || team === 0) && (
          <button
            className="wt-end-btn"
            onClick={() => endTurn(team)}
            disabled={!isActive || (gameMode === "1vPC" && team !== 0) || aiRunning.current}
          >
            End Turn
          </button>
        )}

        {team === 1 && (
          <>
            <div className="wt-panel-label" style={{ marginTop: "auto" }}>// battle log</div>
            <div className="wt-log">
              {log.map((msg, i) => (
                <p key={i} className={`wt-log-entry ${i === 0 ? "wt-log-entry--new" : ""}`}>{msg}</p>
              ))}
            </div>
          </>
        )}
      </aside>
    );
  }

  // ── Hero text by phase ────────────────────────────────────────────────────

  const heroMap: Partial<Record<Phase, { eyebrow: string; title: JSX.Element; sub: string }>> = {
    "mode-select": { eyebrow: "// tactical battle",  title: <>Choose your <em>mode</em></>,   sub: "build your army · deploy your forces · fight" },
    "p1-army":    { eyebrow: "// army selection",    title: <>Choose your <em>army</em></>,   sub: "Player 1 · hover to preview soldiers" },
    "p1-units":   { eyebrow: "// deploy",            title: <>Build your <em>warband</em></>, sub: `${p1Army?.name ?? ""} · select 4 soldiers` },
    "p2-army":    { eyebrow: "// army selection",    title: <>Choose your <em>army</em></>,   sub: "Player 2 · hover to preview soldiers" },
    "p2-units":   { eyebrow: "// deploy",            title: <>Build your <em>warband</em></>, sub: `${p2Army?.name ?? ""} · select 4 soldiers` },
  };

  const hero = heroMap[phase];

  return (
    <div className="wt-page">
      <div className="wt-topbar">
        <button className="wt-topbar-back" onClick={() => navigate("/")}>OH<span>/</span>Hub</button>
        <span className="wt-topbar-title">Tactics</span>
        {phase === "playing" && (
          <span className="wt-turn-badge">
            {aiRunning.current ? "AI thinking…" : `${teamLabel(currentTeam)}'s Turn`}
          </span>
        )}
      </div>

      {hero && (
        <header className="wt-hero">
          <p className="wt-eyebrow">{hero.eyebrow}</p>
          <h1 className="wt-title">{hero.title}</h1>
          <p className="wt-subtitle">{hero.sub}</p>
        </header>
      )}

      {phase === "mode-select" && <ModeSelect onSelect={handleModeSelect} />}
      {phase === "p1-army"    && <ArmySelect player={1} onSelect={handleP1Army} />}
      {phase === "p1-units"   && p1Army && <UnitSelect player={1} army={p1Army} onDeploy={handleP1Units} />}
      {phase === "p2-army"    && <ArmySelect player={2} takenId={p1ArmyId} onSelect={handleP2Army} />}
      {phase === "p2-units"   && p2Army && <UnitSelect player={2} army={p2Army} onDeploy={handleP2Units} />}

      {phase === "playing" && (
        <div className="wt-game">
          <UnitPanel team={0} />

          <div className="wt-grid-wrap">
            <div className="wt-grid">
              {Array.from({ length: GRID * GRID }, (_, i) => {
                const x = i % GRID, y = Math.floor(i / GRID);
                const unit = units.find(u => u.x === x && u.y === y);
                const key = `${x},${y}`;
                const inMove = moveRange.has(key);
                const inAttack = unit ? attackable.has(unit.instanceId) : false;
                const isSel = unit?.instanceId === selectedId;
                return (
                  <div
                    key={key}
                    className={`wt-cell${inMove ? " wt-cell--move" : ""}${inAttack ? " wt-cell--attack" : ""}${isSel ? " wt-cell--selected" : ""}`}
                    onClick={() => handleCellClick(x, y)}
                  >
                    {unit && (
                      <div className="wt-token" style={{ background: unit.armyColor }}>
                        <span className="wt-token-emoji">{unit.portrait}</span>
                        <div className="wt-token-hp">
                          <div className="wt-token-hp-fill" style={{ width: `${(unit.hp / unit.maxHp) * 100}%` }} />
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          <UnitPanel team={1} />
        </div>
      )}

      {phase === "gameover" && (
        <div className="wt-gameover">
          <p className="wt-eyebrow">// battle complete</p>
          <h1 className="wt-title">
            {winner === 0
              ? <><em>Victory!</em></>
              : gameMode === "1v1"
              ? <>Player 2 <em>wins!</em></>
              : <><em>Defeated.</em></>}
          </h1>
          <p className="wt-subtitle">
            {winner === 0
              ? gameMode === "1v1" ? "Player 1's forces stand victorious." : "Your forces have prevailed."
              : gameMode === "1v1" ? "Player 2's army crushed all opposition." : "The AI has annihilated your forces."}
          </p>
          <button className="wt-deploy-btn" onClick={resetGame}>Play Again</button>
        </div>
      )}
    </div>
  );
}
