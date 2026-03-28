import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { ARMIES } from "../data/tactics/armies";
import type { Army, TacticsUnit, Ability } from "../data/tactics/armies";
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
  portrait: string;  // emoji fallback
  image?: string;    // optional image URL
  armyColor: string;
  ability: Ability;
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
  shielded: boolean;
  undyingUsed: boolean;
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

function getAttackable(unit: GameUnit, all: GameUnit[], overrideRange?: number): GameUnit[] {
  const r = overrideRange ?? unit.range;
  return all.filter(u => u.team !== unit.team && manhattan(unit.x, unit.y, u.x, u.y) <= r);
}

function getAdjacentFriendlies(unit: GameUnit, all: GameUnit[]): number {
  return all.filter(u => u.team === unit.team && u.instanceId !== unit.instanceId && manhattan(u.x, u.y, unit.x, unit.y) === 1).length;
}

function effectiveAttack(attacker: GameUnit, all: GameUnit[], isRanged = false): number {
  let atk = attacker.attack;
  if (attacker.ability.id === "berserker" && attacker.hp <= attacker.maxHp / 2) atk += 2;
  if (attacker.ability.id === "pack-tactics") atk += getAdjacentFriendlies(attacker, all);
  if (attacker.ability.id === "overwatch" && isRanged) atk += 1;
  return atk;
}

function applyDamage(dmg: number, target: GameUnit): number {
  let d = dmg;
  if (target.ability.id === "tough") d = Math.max(1, d - 1);
  if (target.shielded) d = Math.max(1, d - 1);
  return d;
}

// Returns new unit list after one attack; handles drain + undying
function resolveAttack(
  attacker: GameUnit,
  target: GameUnit,
  units: GameUnit[],
  log: (msg: string) => void,
  isRanged = false,
): GameUnit[] {
  const dmg = applyDamage(effectiveAttack(attacker, units, isRanged), target);
  log(`${attacker.name} strikes ${target.name} for ${dmg}!`);

  let next = units.map(u => {
    if (u.instanceId === target.instanceId) return { ...u, hp: u.hp - dmg };
    if (u.instanceId === attacker.instanceId) return { ...u, hasAttacked: true };
    return u;
  });

  const targetAfter = next.find(u => u.instanceId === target.instanceId)!;
  if (targetAfter.hp <= 0) {
    if (target.ability.id === "undying" && !target.undyingUsed) {
      log(`${target.name} rises from the dead with 1 HP!`);
      next = next.map(u => u.instanceId === target.instanceId ? { ...u, hp: 1, undyingUsed: true } : u);
    } else {
      log(`${target.name} is destroyed!`);
      next = next.filter(u => u.instanceId !== target.instanceId);
      if (attacker.ability.id === "drain") {
        next = next.map(u => u.instanceId === attacker.instanceId ? { ...u, hp: Math.min(u.maxHp, u.hp + 2) } : u);
        log(`${attacker.name} drains 2 HP!`);
      }
    }
  }
  return next;
}

function buildGameUnits(units: TacticsUnit[], army: Army, team: 0 | 1): GameUnit[] {
  const startY = team === 0 ? GRID - 1 : 0;
  return units.map((u, i) => ({
    instanceId: `t${team}-${u.id}`,
    unitId: u.id,
    name: u.name,
    portrait: u.portrait,
    image: u.image,
    armyColor: army.color,
    ability: u.ability,
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
    shielded: false,
    undyingUsed: false,
  }));
}

// ── AI ─────────────────────────────────────────────────────────────────────────

function runAI(units: GameUnit[]): { units: GameUnit[]; log: string[] } {
  let state = [...units];
  const msgs: string[] = [];
  const log = (m: string) => msgs.push(m);

  for (const aiUnit of units.filter(u => u.team === 1)) {
    let cur = state.find(u => u.instanceId === aiUnit.instanceId);
    if (!cur) continue;

    // Use fortify if low HP and not yet attacked
    if (!cur.hasAttacked && cur.ability.id === "fortify" && cur.hp <= cur.maxHp / 2 && !cur.shielded) {
      log(`${cur.name} uses ${cur.ability.name}!`);
      state = state.map(u => u.instanceId === cur!.instanceId ? { ...u, shielded: true, hasAttacked: true } : u);
      cur = state.find(u => u.instanceId === aiUnit.instanceId);
      if (!cur) continue;
    }

    // Use heal if low HP
    if (!cur.hasAttacked && cur.ability.id === "heal" && cur.hp <= cur.maxHp / 2) {
      log(`${cur.name} uses ${cur.ability.name} and heals 2 HP!`);
      state = state.map(u => u.instanceId === cur!.instanceId ? { ...u, hp: Math.min(u.maxHp, u.hp + 2), hasAttacked: true } : u);
      cur = state.find(u => u.instanceId === aiUnit.instanceId);
      if (!cur) continue;
    }

    // Use volley if multiple targets in range
    if (!cur.hasAttacked && cur.ability.id === "volley") {
      const targets = getAttackable(cur, state);
      if (targets.length > 1) {
        log(`${cur.name} uses ${cur.ability.name}!`);
        for (const t of targets) {
          const fresh = state.find(u => u.instanceId === cur!.instanceId);
          const tgt = state.find(u => u.instanceId === t.instanceId);
          if (fresh && tgt) state = resolveAttack(fresh, tgt, state, log, cur.range > 1);
        }
        state = state.map(u => u.instanceId === cur!.instanceId ? { ...u, hasAttacked: true } : u);
        cur = state.find(u => u.instanceId === aiUnit.instanceId);
        if (!cur) continue;
      }
    }

    // Normal attack or long-shot
    if (!cur.hasAttacked) {
      let targets = getAttackable(cur, state);
      let isLongShot = false;
      if (!targets.length && cur.ability.id === "long-shot") {
        targets = getAttackable(cur, state, cur.range * 3);
        isLongShot = true;
        if (targets.length) log(`${cur.name} uses ${cur.ability.name}!`);
      }
      if (targets.length) {
        const target = [...targets].sort((a, b) => a.hp - b.hp)[0];
        const isRanged = (isLongShot ? cur.range * 3 : cur.range) > 1;
        state = resolveAttack(cur, target, state, log, isRanged);
        if (cur.ability.id === "double-strike") {
          const curNow = state.find(u => u.instanceId === cur!.instanceId);
          const tgtNow = state.find(u => u.instanceId === target.instanceId);
          if (curNow && tgtNow) {
            log(`${cur.name} strikes again!`);
            state = resolveAttack(curNow, tgtNow, state, log, isRanged);
          }
        }
        cur = state.find(u => u.instanceId === aiUnit.instanceId);
        if (!cur) continue;
      }
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
        state = state.map(u => u.instanceId === cur!.instanceId ? { ...u, x: best.x, y: best.y, hasMoved: true } : u);
        cur = state.find(u => u.instanceId === aiUnit.instanceId);
        if (!cur) continue;
      }

      // Attack after moving
      if (!cur.hasAttacked) {
        const targets = getAttackable(cur, state);
        if (targets.length) {
          const target = [...targets].sort((a, b) => a.hp - b.hp)[0];
          state = resolveAttack(cur, target, state, log, cur.range > 1);
          cur = state.find(u => u.instanceId === aiUnit.instanceId);
          if (!cur) continue;
        }
      }
    }
  }

  return {
    units: state.map(u => u.team === 1 ? { ...u, hasMoved: false, hasAttacked: false, shielded: false } : u),
    log: msgs,
  };
}

// ── Portrait helper ────────────────────────────────────────────────────────────
// Shows an image if one is set on the unit, otherwise falls back to the emoji.
// To add your own image to a unit, set image: "/portraits/my-unit.png" in armies.ts.

function Portrait({
  portrait,
  image,
  className,
}: {
  portrait: string;
  image?: string;
  className?: string;
}) {
  if (image) {
    return (
      <img
        src={image}
        alt={portrait}
        className={`wt-portrait-img ${className ?? ""}`}
        draggable={false}
      />
    );
  }
  return <span className={className}>{portrait}</span>;
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

function ArmySelect({ player, takenId, onSelect }: { player: 1 | 2; takenId?: string; onSelect: (id: string) => void }) {
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
                <Portrait portrait={u.portrait} image={u.image} className="wt-army-preview-portrait" />
                <span className="wt-army-preview-name">{u.name}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

// Side panel: 2 large portrait slots. Indices 0,1 on the left; 2,3 on the right.
function SidePortraits({ units, slots }: { units: (TacticsUnit | undefined)[]; slots: number[] }) {
  return (
    <div className="wt-side-portraits">
      {slots.map(i => {
        const unit = units[i];
        return (
          <div key={i} className={`wt-side-slot ${unit ? "wt-side-slot--filled" : "wt-side-slot--empty"}`}>
            {unit?.image ? (
              <img src={unit.image} alt={unit.name} className="wt-side-img" draggable={false} />
            ) : unit ? (
              <>
                <span className="wt-side-emoji">{unit.portrait}</span>
                <span className="wt-side-name">{unit.name}</span>
              </>
            ) : (
              <span className="wt-side-placeholder">?</span>
            )}
          </div>
        );
      })}
    </div>
  );
}

function UnitSelect({ player, army, onDeploy }: { player: 1 | 2; army: Army; onDeploy: (units: TacticsUnit[]) => void }) {
  const [selected, setSelected] = useState<string[]>([]);
  function toggle(id: string) {
    setSelected(prev => prev.includes(id) ? prev.filter(x => x !== id) : prev.length < 4 ? [...prev, id] : prev);
  }
  const selectedUnits = army.units.filter(u => selected.includes(u.id));
  // Pad to 4 slots so side panels always show 2 each
  const slots: (TacticsUnit | undefined)[] = [
    selectedUnits[0], selectedUnits[1], selectedUnits[2], selectedUnits[3],
  ];

  return (
    <div className="wt-setup wt-setup--framed" style={{ "--army-color": army.color } as React.CSSProperties}>
      {/* Left side: soldiers 1 & 2 */}
      <SidePortraits units={slots} slots={[0, 1]} />

      {/* Center content */}
      <div className="wt-setup-center">
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
                  <Portrait portrait={unit.portrait} image={unit.image} className="wt-unit-portrait-emoji" />
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
                  <div className={`wt-unit-select-ability wt-unit-select-ability--${unit.ability.type}`}>
                    <span className="wt-ability-pip">{unit.ability.type === "active" ? "⚡" : "◆"}</span>
                    <span className="wt-ability-name">{unit.ability.name}</span>
                    <span className="wt-ability-desc">{unit.ability.description}</span>
                  </div>
                </div>
              </button>
            );
          })}
        </div>
        <button className="wt-deploy-btn" disabled={selected.length < 4} onClick={() => onDeploy(selectedUnits)}>
          {selected.length < 4 ? `Select ${4 - selected.length} more` : "Deploy Forces →"}
        </button>

        {/* Small emoji row at the bottom */}
        <div className="wt-frame-row">
          {slots.map((unit, i) =>
            unit ? (
              <div key={unit.id} className="wt-frame-token" title={unit.name}>
                <Portrait portrait={unit.portrait} image={unit.image} className="wt-frame-token-emoji" />
                <span className="wt-frame-token-name">{unit.name}</span>
              </div>
            ) : (
              <div key={`empty-${i}`} className="wt-frame-token wt-frame-token--empty">
                <span className="wt-frame-token-emoji">·</span>
              </div>
            )
          )}
        </div>
      </div>

      {/* Right side: soldiers 3 & 4 */}
      <SidePortraits units={slots} slots={[2, 3]} />
    </div>
  );
}

// ── Main page ──────────────────────────────────────────────────────────────────

export default function WarhammerTactics() {
  const navigate = useNavigate();

  const [phase, setPhase]           = useState<Phase>("mode-select");
  const [gameMode, setGameMode]     = useState<GameMode>("1vPC");
  const [p1ArmyId, setP1ArmyId]   = useState("");
  const [p2ArmyId, setP2ArmyId]   = useState("");
  const [units, setUnits]           = useState<GameUnit[]>([]);
  const [currentTeam, setCurrentTeam] = useState<0 | 1>(0);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [abilityMode, setAbilityMode] = useState<"long-shot" | null>(null);
  const [log, setLog]               = useState<string[]>([]);
  const [winner, setWinner]         = useState<0 | 1 | null>(null);
  const aiRunning = useRef(false);
  const pendingLog = useRef<string[]>([]);

  function addLog(...msgs: string[]) {
    setLog(prev => [...msgs, ...prev].slice(0, 12));
  }

  function resetGame() {
    setPhase("mode-select");
    setP1ArmyId(""); setP2ArmyId("");
    setUnits([]); setLog([]); setWinner(null);
    setSelectedId(null); setAbilityMode(null);
    aiRunning.current = false;
  }

  // ── Setup ─────────────────────────────────────────────────────────────────

  function handleModeSelect(mode: GameMode) { setGameMode(mode); setPhase("p1-army"); }
  function handleP1Army(id: string) { setP1ArmyId(id); setPhase("p1-units"); }
  function handleP2Army(id: string) { setP2ArmyId(id); setPhase("p2-units"); }

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
      setCurrentTeam(0); setSelectedId(null); setWinner(null);
      addLog(`${p1Army.name} vs ${aiArmy.name} — battle begins!`);
      setPhase("playing");
    }
  }

  function handleP2Units(selected: TacticsUnit[]) {
    const p1Army = ARMIES.find(a => a.id === p1ArmyId)!;
    const p2Army = ARMIES.find(a => a.id === p2ArmyId)!;
    const team0 = units.filter(u => u.team === 0);
    const team1 = buildGameUnits(selected, p2Army, 1);
    setUnits([...team0, ...team1]);
    setCurrentTeam(0); setSelectedId(null); setWinner(null);
    addLog(`${p1Army.name} vs ${p2Army.name} — battle begins!`);
    setPhase("playing");
  }

  // ── Game logic ────────────────────────────────────────────────────────────

  function checkWin(unitList: GameUnit[]): 0 | 1 | null {
    if (!unitList.some(u => u.team === 0)) return 1;
    if (!unitList.some(u => u.team === 1)) return 0;
    return null;
  }

  function commitUnits(next: GameUnit[], extraLog: string[] = []) {
    setUnits(next);
    if (extraLog.length) addLog(...extraLog);
    const w = checkWin(next);
    if (w !== null) { setWinner(w); setPhase("gameover"); return true; }
    return false;
  }

  function endTurn(forTeam: 0 | 1) {
    if (forTeam !== currentTeam) return;
    setSelectedId(null);
    setAbilityMode(null);
    const reset = units.map(u =>
      u.team === currentTeam ? { ...u, hasMoved: false, hasAttacked: false, shielded: false } : u
    );

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
        addLog(...(aiLog.length ? aiLog : ["Enemy forces have acted."]), "Your turn.");
        if (w !== null) { setWinner(w); setPhase("gameover"); }
        else setCurrentTeam(0);
      }, 600);
    }
  }

  // ── Ability actions ───────────────────────────────────────────────────────

  function handleAbilityClick(unit: GameUnit) {
    if (unit.hasAttacked || unit.team !== currentTeam) return;
    const logs: string[] = [];
    const logFn = (m: string) => logs.push(m);

    switch (unit.ability.id) {
      case "fortify": {
        const next = units.map(u => u.instanceId === unit.instanceId ? { ...u, shielded: true, hasAttacked: true } : u);
        logFn(`${unit.name} uses ${unit.ability.name}! (takes 1 less damage this turn)`);
        commitUnits(next, logs);
        break;
      }
      case "heal": {
        const healed = Math.min(2, unit.maxHp - unit.hp);
        const next = units.map(u => u.instanceId === unit.instanceId ? { ...u, hp: Math.min(u.maxHp, u.hp + 2), hasAttacked: true } : u);
        logFn(`${unit.name} uses ${unit.ability.name} and recovers ${healed} HP!`);
        commitUnits(next, logs);
        break;
      }
      case "volley": {
        const targets = getAttackable(unit, units);
        if (!targets.length) { addLog("No targets in range for volley!"); return; }
        logFn(`${unit.name} uses ${unit.ability.name}!`);
        let next = [...units];
        for (const t of targets) {
          const freshAttacker = next.find(u => u.instanceId === unit.instanceId);
          const freshTarget   = next.find(u => u.instanceId === t.instanceId);
          if (freshAttacker && freshTarget) next = resolveAttack(freshAttacker, freshTarget, next, logFn, unit.range > 1);
        }
        next = next.map(u => u.instanceId === unit.instanceId ? { ...u, hasAttacked: true } : u);
        if (commitUnits(next, logs)) return;
        setUnits(next);
        addLog(...logs);
        break;
      }
      case "long-shot":
        setAbilityMode("long-shot");
        addLog(`${unit.name} readying ${unit.ability.name} — pick a target…`);
        break;
      case "double-strike":
        addLog(`${unit.name} readying ${unit.ability.name} — pick a target to strike twice!`);
        // double-strike is resolved in handleCellClick when abilityMode is null but unit has the ability
        break;
    }
  }

  // ── Cell click ────────────────────────────────────────────────────────────

  const selectedUnit = units.find(u => u.instanceId === selectedId) ?? null;

  const attackRange = abilityMode === "long-shot" ? (selectedUnit?.range ?? 1) * 3 : selectedUnit?.range ?? 1;

  const moveRange =
    selectedUnit && !selectedUnit.hasMoved && selectedUnit.team === currentTeam && !abilityMode
      ? getMoveRange(selectedUnit, units)
      : new Set<string>();

  const attackable =
    selectedUnit && !selectedUnit.hasAttacked && selectedUnit.team === currentTeam
      ? new Set(getAttackable(selectedUnit, units, attackRange).map(u => u.instanceId))
      : new Set<string>();

  function handleCellClick(x: number, y: number) {
    if (aiRunning.current) return;
    if (gameMode === "1vPC" && currentTeam !== 0) return;

    const clicked = units.find(u => u.x === x && u.y === y);

    // Select own unit
    if (clicked?.team === currentTeam) {
      setSelectedId(clicked.instanceId);
      setAbilityMode(null);
      return;
    }

    if (!selectedUnit) return;

    // Attack (normal or ability-powered)
    if (clicked && attackable.has(clicked.instanceId)) {
      const logs: string[] = [];
      const logFn = (m: string) => logs.push(m);
      const isRanged = attackRange > 1;
      const isDoubleStrike = selectedUnit.ability.id === "double-strike" && !abilityMode;
      const isLongShot = abilityMode === "long-shot";

      if (isLongShot) logFn(`${selectedUnit.name} uses ${selectedUnit.ability.name}!`);

      let next = resolveAttack(selectedUnit, clicked, units, logFn, isRanged);

      if (isDoubleStrike) {
        const updAttacker = next.find(u => u.instanceId === selectedUnit.instanceId);
        const updTarget   = next.find(u => u.instanceId === clicked.instanceId);
        if (updAttacker && updTarget) {
          logFn(`${selectedUnit.name} strikes again!`);
          next = resolveAttack(updAttacker, updTarget, next, logFn, isRanged);
        }
      }

      setAbilityMode(null);
      if (commitUnits(next, logs)) return;

      const upd = next.find(u => u.instanceId === selectedUnit.instanceId);
      if (upd?.hasMoved && upd?.hasAttacked) setSelectedId(null);
      return;
    }

    // Move
    if (!abilityMode && moveRange.has(`${x},${y}`)) {
      const next = units.map(u => u.instanceId === selectedUnit.instanceId ? { ...u, x, y, hasMoved: true } : u);
      setUnits(next);
      const upd = next.find(u => u.instanceId === selectedUnit.instanceId);
      if (upd?.hasAttacked) setSelectedId(null);
      return;
    }

    // Cancel ability mode or deselect
    if (abilityMode) { setAbilityMode(null); return; }
    setSelectedId(null);
  }

  // ── Render ────────────────────────────────────────────────────────────────

  const p1Army = ARMIES.find(a => a.id === p1ArmyId);
  const p2Army = ARMIES.find(a => a.id === p2ArmyId);
  function teamLabel(t: 0 | 1) { return gameMode === "1v1" ? `Player ${t + 1}` : t === 0 ? "You" : "AI"; }

  function UnitPanel({ team }: { team: 0 | 1 }) {
    const isActive = currentTeam === team && phase === "playing" && !aiRunning.current;
    const panelUnits = units.filter(u => u.team === team);
    return (
      <aside className={`wt-panel ${isActive ? "wt-panel--active" : "wt-panel--dim"}`}>
        <div className="wt-panel-label">// {teamLabel(team)}</div>
        <div className="wt-panel-units">
          {panelUnits.map(u => {
            const isSel = u.instanceId === selectedId;
            const canAct = isActive && isSel && !u.hasAttacked;
            return (
              <div
                key={u.instanceId}
                className={`wt-unit-card ${isSel ? "wt-unit-card--selected" : ""}`}
                style={{ "--army-color": u.armyColor } as React.CSSProperties}
                onClick={() => isActive && setSelectedId(u.instanceId)}
              >
                <Portrait portrait={u.portrait} image={u.image} className="wt-card-portrait" />
                <div className="wt-card-body">
                  <div className="wt-card-name-row">
                    <span className="wt-card-name">{u.name}</span>
                    {u.shielded && <span className="wt-card-status">🛡</span>}
                    {u.undyingUsed && <span className="wt-card-status">💀</span>}
                  </div>
                  <div className="wt-card-hp-bar">
                    <div className="wt-card-hp-fill" style={{ width: `${(u.hp / u.maxHp) * 100}%`, background: u.armyColor }} />
                  </div>
                  <div className="wt-card-stats">
                    <span>♥{u.hp}/{u.maxHp}</span>
                    <span>⊕{u.move}</span>
                    <span>⚔{u.attack}</span>
                    <span>◎{u.range}</span>
                  </div>
                  {isSel && (
                    <div className={`wt-card-ability wt-card-ability--${u.ability.type}`}>
                      <span>{u.ability.type === "active" ? "⚡" : "◆"}</span>
                      <span>{u.ability.name}</span>
                    </div>
                  )}
                </div>
                {canAct && u.ability.type === "active" && (
                  <button
                    className="wt-ability-btn"
                    onClick={e => { e.stopPropagation(); handleAbilityClick(u); }}
                    title={u.ability.description}
                  >
                    ⚡
                  </button>
                )}
              </div>
            );
          })}
        </div>

        {(gameMode === "1v1" || team === 0) && (
          <button
            className="wt-end-btn"
            onClick={() => endTurn(team)}
            disabled={!isActive || (gameMode === "1vPC" && team !== 0)}
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

  const heroMap: Partial<Record<Phase, { eyebrow: string; title: JSX.Element; sub: string }>> = {
    "mode-select": { eyebrow: "// tactical battle",  title: <>Choose your <em>mode</em></>,   sub: "build your army · pick your soldiers · fight" },
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
                const inMove   = moveRange.has(key);
                const inAttack = unit ? attackable.has(unit.instanceId) : false;
                const isSel    = unit?.instanceId === selectedId;
                return (
                  <div
                    key={key}
                    className={`wt-cell${inMove ? " wt-cell--move" : ""}${inAttack ? (abilityMode === "long-shot" ? " wt-cell--longshot" : " wt-cell--attack") : ""}${isSel ? " wt-cell--selected" : ""}`}
                    onClick={() => handleCellClick(x, y)}
                  >
                    {unit && (
                      <div className="wt-token" style={{ background: unit.armyColor }}>
                        <Portrait portrait={unit.portrait} image={unit.image} className="wt-token-emoji" />
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
            {winner === 0 ? <><em>Victory!</em></> : gameMode === "1v1" ? <>Player 2 <em>wins!</em></> : <><em>Defeated.</em></>}
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
