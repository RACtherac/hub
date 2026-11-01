import { useState, type Dispatch, type SetStateAction } from "react";

import { LOCATION_KINDS, generateField, generateLocation, type LocationField } from "../../utils/dmGenerators";
import {
    activeBoard,
    createLocation,
    createNode,
    locationCards,
    locationMatches,
    removeLocation,
    updateActiveBoard,
    type DmScreenData,
    type Location,
} from "../../utils/dmScreen";
import ConfirmButton from "./ConfirmButton";

interface LocationManagerProps {
    data: DmScreenData;
    setData: Dispatch<SetStateAction<DmScreenData>>;
    onShowCard: (boardId: string, nodeId: string) => void;
}

// The generated text fields, in the order they show on the sheet.
const FIELDS: { key: Exclude<LocationField, "name" | "kind">; label: string; placeholder: string; rows: number }[] = [
    { key: "description", label: "Description", placeholder: "What the party sees, hears and smells…", rows: 3 },
    { key: "feature", label: "Notable feature", placeholder: "A landmark, an oddity, something worth a closer look…", rows: 2 },
    { key: "npc", label: "Who's there", placeholder: "Someone the party can meet…", rows: 2 },
    { key: "rumour", label: "Rumour / hook", placeholder: "What people whisper about it…", rows: 2 },
    { key: "danger", label: "Danger", placeholder: "What could go wrong here…", rows: 2 },
];

export default function LocationManager({ data, setData, onShowCard }: LocationManagerProps) {
    const [query, setQuery] = useState("");
    const location = data.locations.find((l) => l.id === data.activeLocationId) ?? data.locations[0];
    const shown = data.locations.filter((l) => locationMatches(l, query));

    const add = (fields: Partial<Location>) => {
        const created = createLocation(fields);
        setData((current) => ({ ...current, locations: [...current.locations, created], activeLocationId: created.id }));
        // So the new location shows in the list.
        setQuery("");
    };

    return (
        <div className="dms-tracker dms-npcs">
            {/* ---------------- Location list ---------------- */}
            <aside className="dms-panel dms-encounter-list" aria-label="Locations">
                <h2 className="dms-panel-title">Locations</h2>
                {data.locations.length > 0 && (
                    <label className="dms-field dms-list-search">
                        <span>Search</span>
                        <input type="search" value={query} placeholder="Name, type, description…" onChange={(e) => setQuery(e.target.value)} />
                    </label>
                )}
                {data.locations.length > 0 && shown.length === 0 && <p className="dms-empty">No locations match "{query.trim()}".</p>}
                {shown.length > 0 && (
                    <ul>
                        {shown.map((l) => (
                            <li key={l.id}>
                                <button
                                    type="button"
                                    className={l.id === location?.id ? "dms-encounter-item active" : "dms-encounter-item"}
                                    aria-current={l.id === location?.id}
                                    onClick={() => setData((current) => ({ ...current, activeLocationId: l.id }))}
                                >
                                    <span>{l.name || "Unnamed"}</span>
                                    {l.kind && <small>{l.kind}</small>}
                                </button>
                            </li>
                        ))}
                    </ul>
                )}
                <div className="dms-inspector-buttons">
                    <button type="button" className="dms-button dms-button--ghost" onClick={() => add({ name: `Location ${data.locations.length + 1}` })}>
                        + Blank location
                    </button>
                    <button type="button" className="dms-button" onClick={() => add(generateLocation())}>
                        🎲 Generate one
                    </button>
                </div>
            </aside>

            {/* ---------------- Selected location ---------------- */}
            <section className="dms-panel dms-encounter">
                {location ? (
                    <LocationSheet key={location.id} location={location} data={data} setData={setData} onShowCard={onShowCard} />
                ) : (
                    <p className="dms-empty">
                        No locations yet. Write your own towns, taverns and dungeons, or generate one and change what you don't like.
                        Their names are suggested when you set where an NPC can be found.
                    </p>
                )}
            </section>
        </div>
    );
}

interface LocationSheetProps extends LocationManagerProps {
    location: Location;
}

function LocationSheet({ location, setData, data, onShowCard }: LocationSheetProps) {
    const set = (fields: Partial<Location>) =>
        setData((current) => ({ ...current, locations: current.locations.map((l) => (l.id === location.id ? { ...l, ...fields } : l)) }));
    const roll = (field: LocationField) => set({ [field]: generateField(field, location.kind) });
    const cards = locationCards(data, location.id);
    const npcsHere = data.npcs.filter((n) => location.name.trim() && n.location.trim().toLowerCase() === location.name.trim().toLowerCase());

    // A location card on the current story board, with the description as its text.
    const putOnBoard = () => {
        const board = activeBoard(data);
        const offset = (board.nodes.length % 5) * 24;
        const node = { ...createNode("location", 40 + offset, 40 + offset), title: location.name, locationId: location.id };
        setData((current) => updateActiveBoard(current, (b) => ({ ...b, nodes: [...b.nodes, node] })));
        onShowCard(board.id, node.id);
    };

    const dice = (field: LocationField, label: string) => (
        <button type="button" className="dms-icon-button dms-dice-button" title={`Generate ${label.toLowerCase()}`} aria-label={`Generate ${label.toLowerCase()}`} onClick={() => roll(field)}>
            🎲
        </button>
    );

    return (
        <>
            <div className="dms-encounter-header">
                <div className="dms-field dms-encounter-name">
                    <label htmlFor={`loc-name-${location.id}`}>Name</label>
                    <div className="dms-generate-row">
                        <input id={`loc-name-${location.id}`} value={location.name} onChange={(e) => set({ name: e.target.value })} />
                        {dice("name", "Name")}
                    </div>
                </div>
                <ConfirmButton label="Delete location" onConfirm={() => setData((current) => removeLocation(current, location.id))} />
            </div>

            <div className="dms-npc-sheet">
                <div className="dms-npc-fields">
                    <div className="dms-field">
                        <label htmlFor={`loc-kind-${location.id}`}>Type</label>
                        <div className="dms-generate-row">
                            <input
                                id={`loc-kind-${location.id}`}
                                value={location.kind}
                                placeholder="e.g. Village, Tavern, Ruins"
                                list="dms-location-kinds"
                                onChange={(e) => set({ kind: e.target.value })}
                            />
                            <datalist id="dms-location-kinds">
                                {LOCATION_KINDS.map((k) => <option key={k} value={k} />)}
                            </datalist>
                            <button
                                type="button"
                                className="dms-button dms-button--ghost"
                                title="Fill every field for this type; your notes are kept"
                                onClick={() => set(generateLocation(location.kind))}
                            >
                                🎲 Generate all
                            </button>
                        </div>
                    </div>

                    {FIELDS.map(({ key, label, placeholder, rows }) => (
                        <div key={key} className="dms-field">
                            <label htmlFor={`loc-${key}-${location.id}`}>{label}</label>
                            <div className="dms-generate-row">
                                <textarea
                                    id={`loc-${key}-${location.id}`}
                                    rows={rows}
                                    value={location[key]}
                                    placeholder={placeholder}
                                    onChange={(e) => set({ [key]: e.target.value })}
                                />
                                {dice(key, label)}
                            </div>
                        </div>
                    ))}

                    <label className="dms-field dms-notes">
                        <span>Your notes</span>
                        <textarea
                            rows={6}
                            value={location.notes}
                            placeholder="Secrets, maps, what happened here last session… (never generated)"
                            onChange={(e) => set({ notes: e.target.value })}
                        />
                    </label>
                </div>

                <div className="dms-npc-side">
                    <div className="dms-inspector-section">
                        <span className="dms-subtitle">NPCs found here</span>
                        {npcsHere.length === 0 ? (
                            <p className="dms-inspector-help">None yet. Set an NPC's location to "{location.name || "this name"}" to list them here.</p>
                        ) : (
                            <ul className="dms-connection-list">
                                {npcsHere.map((n) => <li key={n.id}>👤 {n.name || "Unnamed"}</li>)}
                            </ul>
                        )}
                    </div>
                    <div className="dms-inspector-section">
                        <span className="dms-subtitle">On the story board</span>
                        {cards.length === 0 ? (
                            <p className="dms-inspector-help">Not on any board yet.</p>
                        ) : (
                            <ul className="dms-connection-list">
                                {cards.map(({ board, node }) => (
                                    <li key={node.id}>
                                        <button type="button" className="dms-link-button" onClick={() => onShowCard(board.id, node.id)}>
                                            {board.name || "Untitled board"}{node.text.trim() && `: ${node.text.trim().slice(0, 40)}`} →
                                        </button>
                                    </li>
                                ))}
                            </ul>
                        )}
                        <div className="dms-inspector-buttons">
                            <button type="button" className="dms-button dms-button--ghost" onClick={putOnBoard}>
                                + Put on story board
                            </button>
                        </div>
                        <p className="dms-inspector-help">A linked location card shows this name, type and description, and opens this sheet.</p>
                    </div>
                </div>
            </div>
        </>
    );
}
