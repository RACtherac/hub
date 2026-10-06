import { useEffect, useMemo, useState } from "react";

import { useWarhammerData } from "../../hooks/useWarhammerData";
import {
    PHASES,
    ROUNDS,
    createGame,
    gameReducer,
    getScore,
    getWinner,
    loadTracker,
    phaseLabel,
    pointsDestroyed,
    saveTracker,
    type GameAction,
    type GameState,
    type NewPlayer,
    type TrackerStorage,
} from "../../utils/gameTracker";
import { factionLabel, listFactions, loadArmyLists, type ArmyListOption } from "./armyData";

const UNDO_LIMIT = 100;

export default function GameTracker() {
    const [storage, setStorage] = useState<TrackerStorage>(loadTracker);
    const [undoStack, setUndoStack] = useState<GameState[]>([]);

    useEffect(() => {
        saveTracker(storage);
    }, [storage]);

    const game = storage.current;

    const dispatch = (action: GameAction) => {
        if (!game) return;
        const next = gameReducer(game, action);
        if (next === game) return;
        setUndoStack((stack) => [...stack.slice(-UNDO_LIMIT + 1), game]);
        setStorage((current) => ({ ...current, current: next }));
    };

    const undo = () => {
        const previous = undoStack[undoStack.length - 1];
        if (!previous) return;
        setUndoStack((stack) => stack.slice(0, -1));
        setStorage((current) => ({ ...current, current: previous }));
    };

    const archiveAndReset = () => {
        setStorage((current) => ({
            current: null,
            history: current.current?.finished ? [current.current, ...current.history] : current.history,
        }));
        setUndoStack([]);
    };

    if (!game) {
        return (
            <>
                <GameSetup
                    onStart={(players, firstPlayer, mission) => {
                        setStorage((current) => ({ ...current, current: createGame(players, firstPlayer, mission) }));
                        setUndoStack([]);
                    }}
                />
                <GameHistory
                    history={storage.history}
                    onDelete={(id) => setStorage((current) => ({ ...current, history: current.history.filter((g) => g.id !== id) }))}
                />
            </>
        );
    }

    return (
        <div className="whk-tracker">
            <TurnBar
                game={game}
                canUndo={undoStack.length > 0}
                onNextPhase={() => dispatch({ type: "nextPhase" })}
                onUndo={undo}
                onEndGame={() => {
                    if (window.confirm("End the game now and declare a result?")) dispatch({ type: "endGame" });
                }}
            />

            {game.finished && (
                <div className="whk-result-banner" role="status">
                    <strong>
                        {(() => {
                            const winner = getWinner(game);
                            return winner === "draw" ? "It's a draw!" : `${game.players[winner].name} wins!`;
                        })()}
                    </strong>
                    <span>
                        {getScore(game.players[0]).total} – {getScore(game.players[1]).total}
                    </span>
                    <button type="button" className="whk-button" onClick={archiveAndReset}>
                        Save to history & start a new game
                    </button>
                </div>
            )}

            <div className="whk-columns">
                {game.players.map((_, index) => (
                    <PlayerPanel
                        key={index}
                        game={game}
                        index={index as 0 | 1}
                        dispatch={dispatch}
                        opponentName={game.players[index === 0 ? 1 : 0].name}
                    />
                ))}
            </div>

            <div className="whk-tracker-bottom">
                <ScoreTable game={game} />
                <GameLog game={game} />
            </div>

            {!game.finished && (
                <button
                    type="button"
                    className="whk-link-button whk-abandon"
                    onClick={() => {
                        if (window.confirm("Abandon this game? It won't be saved to history.")) archiveAndReset();
                    }}
                >
                    Abandon game
                </button>
            )}
        </div>
    );
}

// =====================================
// Setup
// =====================================

interface PlayerDraft {
    name: string;
    faction: string;
    armyId: string;
}

function GameSetup({ onStart }: { onStart: (players: [NewPlayer, NewPlayer], firstPlayer: 0 | 1, mission: string) => void }) {
    const { units, characters } = useWarhammerData();
    const factions = useMemo(() => listFactions(units, characters), [units, characters]);
    const armyLists = useMemo(() => loadArmyLists(units, characters), [units, characters]);

    const [drafts, setDrafts] = useState<[PlayerDraft, PlayerDraft]>([
        { name: "", faction: "", armyId: "" },
        { name: "", faction: "", armyId: "" },
    ]);
    const [firstPlayer, setFirstPlayer] = useState<0 | 1>(0);
    const [mission, setMission] = useState("");

    const updateDraft = (index: 0 | 1, change: Partial<PlayerDraft>) =>
        setDrafts((current) => {
            const next = [...current] as [PlayerDraft, PlayerDraft];
            next[index] = { ...next[index], ...change };
            return next;
        });

    const toPlayer = (draft: PlayerDraft): NewPlayer => {
        const army = armyLists.find((a) => a.id === draft.armyId);
        return {
            name: draft.name,
            faction: draft.faction ? factionLabel(draft.faction) : "",
            armyName: army?.name ?? "",
            units: army?.units ?? [],
        };
    };

    return (
        <section className="whk-panel">
            <h2 className="whk-panel-title">New game</h2>

            <div className="whk-columns">
                {([0, 1] as const).map((index) => {
                    const draft = drafts[index];
                    const lists: ArmyListOption[] = armyLists.filter((a) => !draft.faction || a.faction === draft.faction);

                    return (
                        <div key={index} className="whk-setup-player">
                            <h3 className="whk-subtitle">Player {index + 1}</h3>
                            <label className="whk-field whk-field--wide">
                                <span>Name</span>
                                <input
                                    value={draft.name}
                                    placeholder={`Player ${index + 1}`}
                                    onChange={(e) => updateDraft(index, { name: e.target.value })}
                                />
                            </label>
                            <label className="whk-field whk-field--wide">
                                <span>Faction</span>
                                <select value={draft.faction} onChange={(e) => updateDraft(index, { faction: e.target.value, armyId: "" })}>
                                    <option value="">Any</option>
                                    {factions.map((f) => <option key={f} value={f}>{factionLabel(f)}</option>)}
                                </select>
                            </label>
                            <label className="whk-field whk-field--wide">
                                <span>Army list <small>(from the Army Builder, optional)</small></span>
                                <select
                                    value={draft.armyId}
                                    onChange={(e) => {
                                        const army = armyLists.find((a) => a.id === e.target.value);
                                        updateDraft(index, { armyId: e.target.value, faction: army?.faction ?? draft.faction });
                                    }}
                                    disabled={lists.length === 0}
                                >
                                    <option value="">{lists.length === 0 ? "No saved lists" : "None"}</option>
                                    {lists.map((a) => (
                                        <option key={a.id} value={a.id}>{a.name} ({a.totalPoints} pts)</option>
                                    ))}
                                </select>
                            </label>
                        </div>
                    );
                })}
            </div>

            <div className="whk-setup-row">
                <label className="whk-field">
                    <span>Mission (optional)</span>
                    <input value={mission} placeholder="e.g. Take and Hold" onChange={(e) => setMission(e.target.value)} />
                </label>
                <fieldset className="whk-field whk-radio-group">
                    <legend>First turn</legend>
                    {([0, 1] as const).map((index) => (
                        <label key={index} className="whk-check">
                            <input type="radio" name="first-player" checked={firstPlayer === index} onChange={() => setFirstPlayer(index)} />
                            {drafts[index].name || `Player ${index + 1}`}
                        </label>
                    ))}
                </fieldset>
            </div>

            <button
                type="button"
                className="whk-button"
                onClick={() => onStart([toPlayer(drafts[0]), toPlayer(drafts[1])], firstPlayer, mission)}
            >
                Start game
            </button>
        </section>
    );
}

// =====================================
// During the game
// =====================================

function TurnBar({ game, canUndo, onNextPhase, onUndo, onEndGame }: {
    game: GameState;
    canUndo: boolean;
    onNextPhase: () => void;
    onUndo: () => void;
    onEndGame: () => void;
}) {
    const isLastPhase = game.phase === PHASES[PHASES.length - 1];
    const isLastTurn = game.round === ROUNDS && game.activePlayer !== game.firstPlayer;

    return (
        <section className="whk-panel whk-turnbar">
            <div className="whk-turnbar-info">
                <span className="whk-round">Round {game.round} / {ROUNDS}</span>
                <span className="whk-active-player">
                    {game.finished ? "Game over" : `${game.players[game.activePlayer].name}'s turn`}
                </span>
                {game.mission && <span className="whk-mission">{game.mission}</span>}
            </div>

            <ol className="whk-phases" aria-label="Phases">
                {PHASES.map((phase) => (
                    <li
                        key={phase}
                        className={!game.finished && phase === game.phase ? "whk-phase active" : "whk-phase"}
                        aria-current={!game.finished && phase === game.phase ? "step" : undefined}
                    >
                        {phaseLabel(phase)}
                    </li>
                ))}
            </ol>

            <div className="whk-turnbar-actions">
                <button type="button" className="whk-button whk-button--ghost" onClick={onUndo} disabled={!canUndo}>
                    Undo
                </button>
                {!game.finished && (
                    <>
                        <button type="button" className="whk-button whk-button--ghost" onClick={onEndGame}>
                            End game
                        </button>
                        <button type="button" className="whk-button" onClick={onNextPhase}>
                            {!isLastPhase ? "Next phase →" : isLastTurn ? "Finish game" : "End turn →"}
                        </button>
                    </>
                )}
            </div>
        </section>
    );
}

function PlayerPanel({ game, index, dispatch, opponentName }: {
    game: GameState;
    index: 0 | 1;
    dispatch: (action: GameAction) => void;
    opponentName: string;
}) {
    const player = game.players[index];
    const score = getScore(player);
    const isActive = !game.finished && game.activePlayer === index;
    const roundIndex = game.round - 1;
    const disabled = game.finished;

    const scoreButtons = (kind: "primary" | "secondary", steps: number[]) => (
        <div className="whk-score-row">
            <span className="whk-score-label">
                {kind === "primary" ? "Primary" : "Secondary"}
                <small> this round: {player[kind][roundIndex]}</small>
            </span>
            <div className="whk-score-buttons">
                <button type="button" onClick={() => dispatch({ type: "score", player: index, kind, delta: -1 })} disabled={disabled} aria-label={`Remove 1 ${kind} VP`}>−1</button>
                {steps.map((step) => (
                    <button key={step} type="button" onClick={() => dispatch({ type: "score", player: index, kind, delta: step })} disabled={disabled}>
                        +{step}
                    </button>
                ))}
            </div>
        </div>
    );

    return (
        <section className={isActive ? "whk-panel whk-player active" : "whk-panel whk-player"}>
            <header className="whk-player-header">
                <div>
                    <h2 className="whk-panel-title">{player.name}</h2>
                    <p className="whk-player-meta">
                        {[player.faction, player.armyName].filter(Boolean).join(" · ") || "No army selected"}
                    </p>
                </div>
                <div className="whk-vp" aria-label={`${score.total} victory points`}>
                    <span className="whk-vp-value">{score.total}</span>
                    <span className="whk-vp-label">VP</span>
                </div>
            </header>

            <p className="whk-vp-breakdown">
                Primary {score.primary}/50 · Secondary {score.secondary}/40 · Painted {score.painted}/10
            </p>

            {scoreButtons("primary", [1, 3, 5])}
            {scoreButtons("secondary", [1, 2, 3])}

            <div className="whk-score-row">
                <span className="whk-score-label">Command points</span>
                <div className="whk-cp">
                    <button type="button" onClick={() => dispatch({ type: "adjustCp", player: index, delta: -1 })} disabled={disabled || player.cp === 0} aria-label="Spend 1 CP">−</button>
                    <span className="whk-cp-value">{player.cp}</span>
                    <button type="button" onClick={() => dispatch({ type: "adjustCp", player: index, delta: 1 })} disabled={disabled} aria-label="Gain 1 CP">+</button>
                </div>
            </div>

            <label className="whk-check">
                <input type="checkbox" checked={player.painted} onChange={() => dispatch({ type: "togglePainted", player: index })} disabled={disabled} />
                Painted army (+10 VP)
            </label>

            {player.units.length > 0 && (
                <div className="whk-units">
                    <h3 className="whk-subtitle">
                        Units <small>{pointsDestroyed(player)} pts destroyed by {opponentName}</small>
                    </h3>
                    <ul>
                        {player.units.map((unit) => (
                            <li key={unit.id}>
                                <button
                                    type="button"
                                    className={unit.destroyed ? "whk-unit destroyed" : "whk-unit"}
                                    aria-pressed={unit.destroyed}
                                    onClick={() => dispatch({ type: "toggleUnit", player: index, unitId: unit.id })}
                                    disabled={disabled}
                                    title={unit.destroyed ? "Mark as alive" : "Mark as destroyed"}
                                >
                                    <span>{unit.name}</span>
                                    <span className="whk-unit-points">{unit.destroyed ? "☠ " : ""}{unit.points} pts</span>
                                </button>
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </section>
    );
}

function ScoreTable({ game }: { game: GameState }) {
    const rounds = Array.from({ length: ROUNDS }, (_, i) => i);

    return (
        <section className="whk-panel">
            <div className="whk-table-wrap">
                <table className="whk-table">
                    <caption>Victory points per round</caption>
                    <thead>
                        <tr>
                            <th scope="col">Player</th>
                            {rounds.map((r) => (
                                <th key={r} scope="col" className={r + 1 === game.round && !game.finished ? "current" : undefined}>
                                    R{r + 1}
                                </th>
                            ))}
                            <th scope="col">Total</th>
                        </tr>
                    </thead>
                    <tbody>
                        {game.players.map((player, index) => (
                            <tr key={index}>
                                <th scope="row">{player.name}</th>
                                {rounds.map((r) => (
                                    <td key={r}>
                                        {player.primary[r] + player.secondary[r]}
                                        <small> {player.primary[r]}/{player.secondary[r]}</small>
                                    </td>
                                ))}
                                <td><strong>{getScore(player).total}</strong></td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <p className="whk-hint">Small numbers are primary / secondary. Totals include caps and the painted bonus.</p>
        </section>
    );
}

function GameLog({ game }: { game: GameState }) {
    const entries = [...game.log].reverse().slice(0, 40);

    return (
        <section className="whk-panel">
            <h2 className="whk-panel-title">Game log</h2>
            <ol className="whk-log">
                {entries.map((entry) => (
                    <li key={entry.id}>
                        <span className="whk-log-when">R{entry.round} · {phaseLabel(entry.phase)}</span>
                        <span>{entry.text}</span>
                    </li>
                ))}
            </ol>
        </section>
    );
}

// =====================================
// History
// =====================================

function GameHistory({ history, onDelete }: { history: GameState[]; onDelete: (id: string) => void }) {
    if (history.length === 0) return null;

    return (
        <section className="whk-panel">
            <h2 className="whk-panel-title">Past games</h2>
            <ul className="whk-history">
                {history.map((game) => {
                    const winner = getWinner(game);
                    const [a, b] = game.players;

                    return (
                        <li key={game.id}>
                            <div>
                                <strong>{a.name} {getScore(a).total} – {getScore(b).total} {b.name}</strong>
                                <span className="whk-player-meta">
                                    {new Date(game.startedAt).toLocaleDateString()}
                                    {game.mission ? ` · ${game.mission}` : ""}
                                    {" · "}
                                    {winner === "draw" ? "Draw" : `${game.players[winner].name} won`}
                                </span>
                            </div>
                            <button
                                type="button"
                                className="whk-link-button"
                                onClick={() => {
                                    if (window.confirm("Delete this game from history?")) onDelete(game.id);
                                }}
                            >
                                Delete
                            </button>
                        </li>
                    );
                })}
            </ul>
        </section>
    );
}
