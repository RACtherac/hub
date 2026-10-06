// =====================================
// Game Tracker
// =====================================
//
// State for tracking a Warhammer 40,000 (10th edition) game: five battle
// rounds, each player's turn split into phases, Command Points, and victory
// points. All changes go through gameReducer so the page can keep a simple
// undo history.

export const PHASES = ["command", "movement", "shooting", "charge", "fight"] as const;
export type Phase = typeof PHASES[number];

export const ROUNDS = 5;
export const PRIMARY_CAP = 50;
export const SECONDARY_CAP = 40;
export const PAINTED_BONUS = 10;

export interface RosterUnit {
    id: string;
    name: string;
    points: number;
    destroyed: boolean;
}

export interface PlayerState {
    name: string;
    faction: string;
    armyName: string;
    units: RosterUnit[];
    cp: number;
    // Victory points scored in each battle round (index 0 = round 1)
    primary: number[];
    secondary: number[];
    painted: boolean;
}

export interface LogEntry {
    id: number;
    round: number;
    phase: Phase;
    player: 0 | 1;
    text: string;
}

export interface GameState {
    id: string;
    mission: string;
    startedAt: string;
    players: [PlayerState, PlayerState];
    firstPlayer: 0 | 1;
    round: number;
    activePlayer: 0 | 1;
    phase: Phase;
    finished: boolean;
    log: LogEntry[];
}

export interface NewPlayer {
    name: string;
    faction: string;
    armyName: string;
    units: { name: string; points: number }[];
}

export type GameAction =
    | { type: "nextPhase" }
    | { type: "adjustCp"; player: 0 | 1; delta: number }
    | { type: "score"; player: 0 | 1; kind: "primary" | "secondary"; delta: number }
    | { type: "togglePainted"; player: 0 | 1 }
    | { type: "toggleUnit"; player: 0 | 1; unitId: string }
    | { type: "endGame" };

// =====================================
// Setup
// =====================================

function createPlayer(player: NewPlayer, index: number): PlayerState {
    return {
        name: player.name.trim() || `Player ${index + 1}`,
        faction: player.faction,
        armyName: player.armyName,
        units: player.units.map((unit, unitIndex) => ({
            id: `${index}-${unitIndex}`,
            name: unit.name,
            points: unit.points,
            destroyed: false,
        })),
        cp: 0,
        primary: new Array(ROUNDS).fill(0),
        secondary: new Array(ROUNDS).fill(0),
        painted: false,
    };
}

export function createGame(
    players: [NewPlayer, NewPlayer],
    firstPlayer: 0 | 1,
    mission: string
): GameState {
    const game: GameState = {
        id: crypto.randomUUID(),
        mission: mission.trim(),
        startedAt: new Date().toISOString(),
        players: [createPlayer(players[0], 0), createPlayer(players[1], 1)],
        firstPlayer,
        round: 1,
        activePlayer: firstPlayer,
        phase: "command",
        finished: false,
        log: [],
    };

    return startCommandPhase(addLog(game, `Game started. ${game.players[firstPlayer].name} goes first.`));
}

// =====================================
// Scores
// =====================================

const sum = (values: number[]) => values.reduce((total, value) => total + value, 0);

export function getScore(player: PlayerState) {
    const primary = Math.min(PRIMARY_CAP, sum(player.primary));
    const secondary = Math.min(SECONDARY_CAP, sum(player.secondary));
    const painted = player.painted ? PAINTED_BONUS : 0;

    return {
        primary,
        secondary,
        painted,
        total: primary + secondary + painted,
    };
}

export function getWinner(game: GameState): 0 | 1 | "draw" {
    const [first, second] = game.players.map((player) => getScore(player).total);
    if (first === second) return "draw";
    return first > second ? 0 : 1;
}

export function pointsDestroyed(player: PlayerState): number {
    return sum(player.units.filter((unit) => unit.destroyed).map((unit) => unit.points));
}

export function phaseLabel(phase: Phase): string {
    return phase.charAt(0).toUpperCase() + phase.slice(1);
}

// =====================================
// Reducer
// =====================================

function addLog(game: GameState, text: string, player: 0 | 1 = game.activePlayer): GameState {
    const id = (game.log[game.log.length - 1]?.id ?? 0) + 1;
    return {
        ...game,
        log: [...game.log, { id, round: game.round, phase: game.phase, player, text }],
    };
}

function updatePlayer(game: GameState, index: 0 | 1, change: (player: PlayerState) => PlayerState): GameState {
    const players = [...game.players] as [PlayerState, PlayerState];
    players[index] = change(players[index]);
    return { ...game, players };
}

// Both players gain 1 CP at the start of every Command phase.
function startCommandPhase(game: GameState): GameState {
    const withCp = {
        ...game,
        players: game.players.map((player) => ({ ...player, cp: player.cp + 1 })) as [PlayerState, PlayerState],
    };
    return addLog(withCp, `Round ${game.round}, ${game.players[game.activePlayer].name}'s turn. Both players gain 1 CP.`);
}

export function gameReducer(game: GameState, action: GameAction): GameState {
    if (game.finished) return game;

    switch (action.type) {
        case "nextPhase": {
            const phaseIndex = PHASES.indexOf(game.phase);

            if (phaseIndex < PHASES.length - 1) {
                return { ...game, phase: PHASES[phaseIndex + 1] };
            }

            // End of the turn: hand over to the other player, or start the next round.
            const secondPlayer = game.firstPlayer === 0 ? 1 : 0;
            if (game.activePlayer === game.firstPlayer) {
                return startCommandPhase({ ...game, activePlayer: secondPlayer, phase: "command" });
            }

            if (game.round >= ROUNDS) {
                return gameReducer(game, { type: "endGame" });
            }

            return startCommandPhase({ ...game, round: game.round + 1, activePlayer: game.firstPlayer, phase: "command" });
        }

        case "adjustCp": {
            const player = game.players[action.player];
            const cp = Math.max(0, player.cp + action.delta);
            if (cp === player.cp) return game;

            const verb = action.delta > 0 ? "gains" : "spends";
            return addLog(
                updatePlayer(game, action.player, (p) => ({ ...p, cp })),
                `${player.name} ${verb} ${Math.abs(cp - player.cp)} CP (${cp} left).`,
                action.player
            );
        }

        case "score": {
            const player = game.players[action.player];
            const roundIndex = game.round - 1;
            const current = player[action.kind][roundIndex];
            const next = Math.max(0, current + action.delta);
            if (next === current) return game;

            const scores = [...player[action.kind]];
            scores[roundIndex] = next;

            return addLog(
                updatePlayer(game, action.player, (p) => ({ ...p, [action.kind]: scores })),
                `${player.name} ${action.delta > 0 ? "scores" : "loses"} ${Math.abs(next - current)} ${action.kind} VP.`,
                action.player
            );
        }

        case "togglePainted": {
            const player = game.players[action.player];
            return addLog(
                updatePlayer(game, action.player, (p) => ({ ...p, painted: !p.painted })),
                `${player.name} ${player.painted ? "loses" : "gets"} the painted army bonus.`,
                action.player
            );
        }

        case "toggleUnit": {
            const player = game.players[action.player];
            const unit = player.units.find((u) => u.id === action.unitId);
            if (!unit) return game;

            return addLog(
                updatePlayer(game, action.player, (p) => ({
                    ...p,
                    units: p.units.map((u) => (u.id === unit.id ? { ...u, destroyed: !u.destroyed } : u)),
                })),
                unit.destroyed
                    ? `${player.name}'s ${unit.name} is back on the table.`
                    : `${player.name}'s ${unit.name} is destroyed (${unit.points} pts).`,
                action.player
            );
        }

        case "endGame": {
            const ended = { ...game, finished: true };
            const winner = getWinner(ended);
            return addLog(
                ended,
                winner === "draw" ? "Game over: it's a draw." : `Game over: ${game.players[winner].name} wins.`
            );
        }
    }
}

// =====================================
// Storage
// =====================================

const STORAGE_KEY = "warhammer-game-tracker";
const HISTORY_LIMIT = 50;

export interface TrackerStorage {
    current: GameState | null;
    history: GameState[];
}

function isGame(value: unknown): value is GameState {
    const game = value as GameState;
    return !!game
        && typeof game === "object"
        && typeof game.id === "string"
        && Array.isArray(game.players)
        && game.players.length === 2
        && game.players.every((p) => Array.isArray(p.primary) && Array.isArray(p.secondary) && Array.isArray(p.units))
        && Array.isArray(game.log)
        && PHASES.includes(game.phase);
}

export function loadTracker(): TrackerStorage {
    try {
        const parsed = JSON.parse(localStorage.getItem(STORAGE_KEY) ?? "null");
        return {
            current: isGame(parsed?.current) ? parsed.current : null,
            history: Array.isArray(parsed?.history) ? parsed.history.filter(isGame) : [],
        };
    }
    catch {
        return { current: null, history: [] };
    }
}

export function saveTracker(storage: TrackerStorage) {
    try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify({
            current: storage.current,
            history: storage.history.slice(0, HISTORY_LIMIT),
        }));
    }
    catch {
        // Ignore storage errors so the tracker stays usable.
    }
}
