import { useEffect, useRef, useState, type Dispatch, type SetStateAction } from "react";

import { toInt } from "../../utils/makeId";
import {
    combatantFromPlayer,
    createPlayer,
    playerMatches,
    playerRecord,
    removePlayer,
    restMinutes,
    restParty,
    shareWithPlayer,
    type DmScreenData,
    type EncounterResult,
    type Player,
    type RestKind,
    type SharedPlayerFields,
} from "../../utils/dmScreen";
import ConfirmButton from "./ConfirmButton";
import DeathSaveTracker from "./DeathSaveTracker";
import ImageField from "./ImageField";
import TrackerList from "./TrackerList";

interface PlayerManagerProps {
    data: DmScreenData;
    setData: Dispatch<SetStateAction<DmScreenData>>;
    onOpenEncounter: (encounterId: string) => void;
}

export default function PlayerManager({ data, setData, onOpenEncounter }: PlayerManagerProps) {
    const [query, setQuery] = useState("");
    const [rested, setRested] = useState("");
    const player = data.players.find((p) => p.id === data.activePlayerId) ?? data.players[0];
    const shown = data.players.filter((p) => playerMatches(p, query));

    const addPlayer = () => {
        const created = createPlayer({ name: `Player ${data.players.length + 1}` });
        setData((current) => ({ ...current, players: [...current.players, created], activePlayerId: created.id }));
        // So the new player shows in the list.
        setQuery("");
    };

    const rest = (kind: RestKind) => {
        const minutes = restMinutes(data.settings, kind);
        const time = minutes % 60 ? `${Math.floor(minutes / 60)} h ${minutes % 60} min` : `${minutes / 60} h`;
        setData((current) => restParty(current, kind));
        setRested(kind === "long"
            ? `Long rest (${time} passed): full HP, no temp HP, death saves cleared, and trackers set to refill are full.`
            : `Short rest (${time} passed): trackers set to refill on a short rest are full.`);
    };

    return (
        <div className="dms-tracker dms-npcs">
            {/* ---------------- Player list ---------------- */}
            <aside className="dms-panel dms-encounter-list" aria-label="Players">
                <h2 className="dms-panel-title">Players</h2>
                {data.players.length > 0 && (
                    <label className="dms-field dms-list-search">
                        <span>Search</span>
                        <input
                            type="search"
                            value={query}
                            placeholder="Character, player, class, notes…"
                            onChange={(e) => setQuery(e.target.value)}
                        />
                    </label>
                )}
                {data.players.length > 0 && shown.length === 0 && (
                    <p className="dms-empty">No players match "{query.trim()}".</p>
                )}
                {shown.length > 0 && (
                    <ul>
                        {shown.map((p) => (
                            <li key={p.id}>
                                <button
                                    type="button"
                                    className={p.id === player?.id ? "dms-encounter-item active" : "dms-encounter-item"}
                                    aria-current={p.id === player?.id}
                                    onClick={() => setData((current) => ({ ...current, activePlayerId: p.id }))}
                                >
                                    <span>{p.name || "Unnamed"}</span>
                                    <small>
                                        {[p.ancestryClass, p.playerName && `played by ${p.playerName}`].filter(Boolean).join(" · ")}
                                        {(p.ancestryClass || p.playerName) && " · "}HP {p.hp}/{p.maxHp}
                                        {p.results.length > 0 && ` · ${playerRecord(p).wins}–${playerRecord(p).losses}`}
                                    </small>
                                </button>
                            </li>
                        ))}
                    </ul>
                )}
                <button type="button" className="dms-button dms-button--ghost" onClick={addPlayer}>
                    + New player
                </button>
                {data.players.length > 0 && (
                    <div className="dms-inspector-section dms-party-rest">
                        <span className="dms-subtitle">Party rest</span>
                        <div className="dms-inspector-buttons">
                            <ConfirmButton label="☕ Short rest" confirmLabel="Rest everyone?" onConfirm={() => rest("short")} />
                            <ConfirmButton label="🌙 Long rest" confirmLabel="Rest everyone?" onConfirm={() => rest("long")} />
                        </div>
                        {rested && <p className="dms-inspector-help" role="status">{rested}</p>}
                        <p className="dms-inspector-help">Rest lengths are set in the Settings tab.</p>
                    </div>
                )}
            </aside>

            {/* ---------------- Selected player ---------------- */}
            <section className="dms-panel dms-encounter">
                {player ? (
                    <PlayerSheet key={player.id} player={player} data={data} setData={setData} onOpenEncounter={onOpenEncounter} />
                ) : (
                    <p className="dms-empty">
                        No players yet. Add a sheet for each character in the party, then add them to encounters from here
                        or with "Add party" in the tracker. HP and trackers carry over from fight to fight.
                    </p>
                )}
            </section>
        </div>
    );
}

interface PlayerSheetProps extends PlayerManagerProps {
    player: Player;
}

function PlayerSheet({ player, data, setData, onOpenEncounter }: PlayerSheetProps) {
    const [addedTo, setAddedTo] = useState("");
    const [recordOpen, setRecordOpen] = useState(false);
    const record = playerRecord(player);
    const encounter = data.encounters.find((e) => e.id === data.activeEncounterId) ?? data.encounters[0];
    const inEncounter = encounter.combatants.some((c) => c.playerId === player.id);
    const linkedEncounters = data.encounters
        .filter((e) => e.combatants.some((c) => c.playerId === player.id))
        .map((e) => e.name || "Untitled");

    const set = (fields: Partial<Player>) =>
        setData((current) => ({ ...current, players: current.players.map((p) => (p.id === player.id ? { ...p, ...fields } : p)) }));
    // HP, AC and trackers also change on this player in every encounter.
    const share = (fields: SharedPlayerFields) => setData((current) => shareWithPlayer(current, player.id, fields));

    const addToEncounter = () => {
        setData((current) => ({
            ...current,
            encounters: current.encounters.map((e) =>
                e.id === encounter.id ? { ...e, combatants: [...e.combatants, combatantFromPlayer(player)] } : e
            ),
        }));
        setAddedTo(encounter.name || "the encounter");
    };

    return (
        <>
            <div className="dms-encounter-header">
                <label className="dms-field dms-encounter-name">
                    <span>Character</span>
                    <input value={player.name} onChange={(e) => set({ name: e.target.value })} />
                </label>
                <div className="dms-row-actions">
                    <button
                        type="button"
                        className="dms-button dms-button--ghost"
                        title="Wins and losses"
                        onClick={() => setRecordOpen(true)}
                    >
                        W/L {record.wins}–{record.losses}
                    </button>
                    <ConfirmButton label="Delete player" onConfirm={() => setData((current) => removePlayer(current, player.id))} />
                </div>
            </div>

            {recordOpen && (
                <RecordDialog
                    player={player}
                    data={data}
                    onRemove={(result) => set({ results: player.results.filter((r) => r !== result) })}
                    onOpenEncounter={(id) => {
                        setRecordOpen(false);
                        onOpenEncounter(id);
                    }}
                    onClose={() => setRecordOpen(false)}
                />
            )}

            <div className="dms-npc-sheet">
                <div className="dms-npc-fields">
                    <div className="dms-npc-row dms-npc-stats">
                        <label className="dms-field">
                            <span>Played by</span>
                            <input value={player.playerName} onChange={(e) => set({ playerName: e.target.value })} />
                        </label>
                        <label className="dms-field">
                            <span>Race / class</span>
                            <input value={player.ancestryClass} placeholder="e.g. Half-elf ranger" onChange={(e) => set({ ancestryClass: e.target.value })} />
                        </label>
                        <label className="dms-field">
                            <span>Level</span>
                            <input value={player.level} onChange={(e) => set({ level: e.target.value })} />
                        </label>
                    </div>
                    <div className="dms-npc-row dms-player-stats">
                        <label className="dms-field">
                            <span>AC / Def</span>
                            <input value={player.ac} onChange={(e) => share({ ac: e.target.value })} />
                        </label>
                        <label className="dms-field">
                            <span>HP</span>
                            <input
                                inputMode="numeric"
                                value={player.hp}
                                onChange={(e) => share({ hp: Math.min(player.maxHp, Math.max(0, toInt(e.target.value))) })}
                            />
                        </label>
                        <label className="dms-field">
                            <span>Max HP</span>
                            <input
                                inputMode="numeric"
                                value={player.maxHp}
                                onChange={(e) => {
                                    const maxHp = Math.max(0, toInt(e.target.value));
                                    share({ maxHp, hp: Math.min(player.hp, maxHp) });
                                }}
                            />
                        </label>
                        <label className="dms-field">
                            <span>Temp HP</span>
                            <input inputMode="numeric" value={player.tempHp} onChange={(e) => share({ tempHp: Math.max(0, toInt(e.target.value)) })} />
                        </label>
                    </div>
                    {player.hp === 0 && player.maxHp > 0 && (
                        <DeathSaveTracker target={player} onChange={(fields) => share(fields)} />
                    )}
                    <div className="dms-npc-row dms-npc-stats">
                        <label className="dms-field">
                            <span>Init mod</span>
                            <input inputMode="numeric" value={player.initiativeMod} onChange={(e) => set({ initiativeMod: toInt(e.target.value) })} />
                        </label>
                        <label className="dms-field">
                            <span>Passive perception</span>
                            <input value={player.passive} onChange={(e) => set({ passive: e.target.value })} />
                        </label>
                        <label className="dms-field">
                            <span>Speed</span>
                            <input value={player.speed} placeholder="e.g. 30 ft" onChange={(e) => set({ speed: e.target.value })} />
                        </label>
                    </div>
                    <div className="dms-inspector-section">
                        <span className="dms-subtitle">Trackers</span>
                        <TrackerList trackers={player.trackers} onChange={(trackers) => share({ trackers })} />
                    </div>
                    {linkedEncounters.length > 0 && (
                        <p className="dms-shared-note">
                            🔗 HP, AC and trackers are shared with this player in {linkedEncounters.join(", ")}: a change here or there shows in both.
                        </p>
                    )}
                    <label className="dms-field dms-notes">
                        <span>Notes</span>
                        <textarea
                            rows={8}
                            value={player.notes}
                            placeholder="Backstory hooks, goals, what they owe, who they've angered…"
                            onChange={(e) => set({ notes: e.target.value })}
                        />
                    </label>
                </div>

                <div className="dms-npc-side">
                    <ImageField image={player.image} alt={player.name} onChange={(image) => set({ image })} />

                    <div className="dms-inspector-section">
                        <span className="dms-subtitle">Encounters</span>
                        <div className="dms-inspector-buttons">
                            <button type="button" className="dms-button dms-button--ghost" onClick={addToEncounter} disabled={inEncounter}>
                                {inEncounter ? `In ${encounter.name || "encounter"}` : `+ Add to ${encounter.name || "encounter"}`}
                            </button>
                        </div>
                        {addedTo && <p className="dms-inspector-help" role="status">Added to {addedTo} in the tracker.</p>}
                    </div>

                </div>
            </div>
        </>
    );
}

interface RecordDialogProps {
    player: Player;
    data: DmScreenData;
    onRemove: (result: EncounterResult) => void;
    onOpenEncounter: (encounterId: string) => void;
    onClose: () => void;
}

// A player's wins and losses, as a modal over the sheet.
function RecordDialog({ player, data, onRemove, onOpenEncounter, onClose }: RecordDialogProps) {
    const dialog = useRef<HTMLDialogElement>(null);
    const record = playerRecord(player);

    useEffect(() => {
        dialog.current?.showModal();
    }, []);

    return (
        <dialog
            ref={dialog}
            className="dms-dialog"
            aria-labelledby="dms-record-title"
            onClose={onClose}
            // A click on the backdrop lands on the dialog itself.
            onClick={(e) => e.target === e.currentTarget && dialog.current?.close()}
        >
            <div className="dms-dialog-body">
                <div className="dms-dialog-header">
                    <h2 id="dms-record-title" className="dms-panel-title">{player.name || "Unnamed"}: wins &amp; losses</h2>
                    <button type="button" className="dms-icon-button" aria-label="Close" onClick={() => dialog.current?.close()}>×</button>
                </div>

                <dl className="dms-record-stats">
                    <div className="dms-record-stat dms-outcome--pcs">
                        <dt>Wins</dt>
                        <dd>{record.wins}</dd>
                    </div>
                    <div className="dms-record-stat dms-outcome--monsters">
                        <dt>Losses</dt>
                        <dd>{record.losses}</dd>
                    </div>
                    <div className="dms-record-stat">
                        <dt>Win rate</dt>
                        <dd>{record.winRate === null ? "—" : `${record.winRate}%`}</dd>
                    </div>
                    <div className="dms-record-stat">
                        <dt>Avg rounds</dt>
                        <dd>{record.averageRounds ?? "—"}</dd>
                    </div>
                </dl>
                {record.winRate !== null && (
                    <div className="dms-record-bar" aria-hidden="true">
                        <span style={{ width: `${record.winRate}%` }} />
                    </div>
                )}

                {player.results.length === 0 ? (
                    <p className="dms-empty">No fights recorded yet. Record a win or loss from the tracker once one side is down.</p>
                ) : (
                    <ul className="dms-record-list">
                        {[...player.results].reverse().map((result) => {
                            const current = data.encounters.find((e) => e.id === result.encounterId);
                            const name = current?.name || result.name;
                            return (
                                <li key={`${result.encounterId}-${result.at}`}>
                                    <span className={`dms-outcome-tag dms-outcome--${result.outcome === "won" ? "pcs" : "monsters"}`}>
                                        {result.outcome === "won" ? "W" : "L"}
                                    </span>
                                    {current ? (
                                        <button type="button" className="dms-link-button dms-record-name" onClick={() => onOpenEncounter(current.id)}>
                                            {name} →
                                        </button>
                                    ) : (
                                        <span className="dms-record-name">{name} <small>(deleted)</small></span>
                                    )}
                                    <small>
                                        round {result.round}
                                        {result.at > 0 && ` · ${new Date(result.at).toLocaleDateString()}`}
                                    </small>
                                    <ConfirmButton label="Remove" confirmLabel="Sure?" onConfirm={() => onRemove(result)} />
                                </li>
                            );
                        })}
                    </ul>
                )}
            </div>
        </dialog>
    );
}
