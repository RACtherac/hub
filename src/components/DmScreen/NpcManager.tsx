import { useState, type Dispatch, type SetStateAction } from "react";

import { toInt } from "../../utils/makeId";
import {
    activeBoard,
    combatantFromNpc,
    createNode,
    createNpc,
    holderLabel,
    itemsHeldBy,
    locationNames,
    npcCards,
    npcMatches,
    removeNpc,
    updateActiveBoard,
    type DmScreenData,
    type ItemHolder,
    type Npc,
} from "../../utils/dmScreen";
import AttackList from "./AttackList";
import ConfirmButton from "./ConfirmButton";
import ImageField from "./ImageField";

interface NpcManagerProps {
    data: DmScreenData;
    setData: Dispatch<SetStateAction<DmScreenData>>;
    onShowCard: (boardId: string, nodeId: string) => void;
    onOpenItem: (itemId: string) => void;
}

export default function NpcManager({ data, setData, onShowCard, onOpenItem }: NpcManagerProps) {
    const [query, setQuery] = useState("");
    const npc = data.npcs.find((n) => n.id === data.activeNpcId) ?? data.npcs[0];
    const shown = data.npcs.filter((n) => npcMatches(n, query));

    const addNpc = () => {
        const created = createNpc({ name: `NPC ${data.npcs.length + 1}` });
        setData((current) => ({ ...current, npcs: [...current.npcs, created], activeNpcId: created.id }));
        // So the new NPC shows in the list.
        setQuery("");
    };

    return (
        <div className="dms-tracker dms-npcs">
            {/* ---------------- NPC list ---------------- */}
            <aside className="dms-panel dms-encounter-list" aria-label="NPCs">
                <h2 className="dms-panel-title">NPCs</h2>
                {data.npcs.length > 0 && (
                    <label className="dms-field dms-list-search">
                        <span>Search</span>
                        <input
                            type="search"
                            value={query}
                            placeholder="Name, race, location, notes…"
                            onChange={(e) => setQuery(e.target.value)}
                        />
                    </label>
                )}
                {data.npcs.length > 0 && shown.length === 0 && (
                    <p className="dms-empty">No NPCs match "{query.trim()}".</p>
                )}
                {shown.length > 0 && (
                    <ul>
                        {shown.map((n) => (
                            <li key={n.id}>
                                <button
                                    type="button"
                                    className={n.id === npc?.id ? "dms-encounter-item active" : "dms-encounter-item"}
                                    aria-current={n.id === npc?.id}
                                    onClick={() => setData((current) => ({ ...current, activeNpcId: n.id }))}
                                >
                                    <span>{n.name || "Unnamed"}</span>
                                    {(n.race || n.location) && <small>{[n.race, n.location].filter(Boolean).join(" · ")}</small>}
                                </button>
                            </li>
                        ))}
                    </ul>
                )}
                <button type="button" className="dms-button dms-button--ghost" onClick={addNpc}>
                    + New NPC
                </button>
            </aside>

            {/* ---------------- Selected NPC ---------------- */}
            <section className="dms-panel dms-encounter">
                {npc ? (
                    <NpcSheet key={npc.id} npc={npc} data={data} setData={setData} onShowCard={onShowCard} onOpenItem={onOpenItem} />
                ) : (
                    <p className="dms-empty">
                        No NPCs yet. Add the named characters worth a sheet: the innkeeper, the villain, the quest giver.
                        Link them from NPC cards on the story board.
                    </p>
                )}
            </section>
        </div>
    );
}

interface NpcSheetProps extends NpcManagerProps {
    npc: Npc;
}

function NpcSheet({ npc, data, setData, onShowCard, onOpenItem }: NpcSheetProps) {
    const [addedTo, setAddedTo] = useState("");
    const carrying = itemsHeldBy(data, npc.id);
    const givable = data.items.filter((i) => !(i.holder.kind === "npc" && i.holder.npcId === npc.id));

    const setHolder = (itemId: string, holder: ItemHolder) =>
        setData((current) => ({ ...current, items: current.items.map((i) => (i.id === itemId ? { ...i, holder } : i)) }));
    const set = (fields: Partial<Npc>) =>
        setData((current) => ({ ...current, npcs: current.npcs.map((n) => (n.id === npc.id ? { ...n, ...fields } : n)) }));

    const cards = npcCards(data, npc.id);
    const locations = locationNames(data);
    const encounter = data.encounters.find((e) => e.id === data.activeEncounterId) ?? data.encounters[0];

    // A new NPC card on the current story board, linked to this NPC.
    const putOnBoard = () => {
        const board = activeBoard(data);
        const offset = (board.nodes.length % 5) * 24;
        const node = { ...createNode("npc", 40 + offset, 40 + offset), title: npc.name, npcId: npc.id };
        setData((current) => updateActiveBoard(current, (b) => ({ ...b, nodes: [...b.nodes, node] })));
        onShowCard(board.id, node.id);
    };

    const addToEncounter = () => {
        const combatant = combatantFromNpc(data, npc);
        setData((current) => ({
            ...current,
            encounters: current.encounters.map((e) => (e.id === encounter.id ? { ...e, combatants: [...e.combatants, combatant] } : e)),
        }));
        setAddedTo(encounter.name || "the encounter");
    };

    return (
        <>
            <div className="dms-encounter-header">
                <label className="dms-field dms-encounter-name">
                    <span>Name</span>
                    <input value={npc.name} onChange={(e) => set({ name: e.target.value })} />
                </label>
                <ConfirmButton label="Delete NPC" onConfirm={() => setData((current) => removeNpc(current, npc.id))} />
            </div>

            <div className="dms-npc-sheet">
                <div className="dms-npc-fields">
                    <div className="dms-npc-row">
                        <label className="dms-field">
                            <span>Race</span>
                            <input value={npc.race} placeholder="e.g. Half-elf" onChange={(e) => set({ race: e.target.value })} />
                        </label>
                        <label className="dms-field">
                            <span>Alignment</span>
                            <input value={npc.alignment} placeholder="e.g. Lawful neutral" onChange={(e) => set({ alignment: e.target.value })} />
                        </label>
                    </div>
                    <div className="dms-npc-row dms-npc-stats">
                        <label className="dms-field">
                            <span>AC / Def</span>
                            <input value={npc.ac} onChange={(e) => set({ ac: e.target.value })} />
                        </label>
                        <label className="dms-field">
                            <span>HP</span>
                            <input
                                inputMode="numeric"
                                value={npc.hp}
                                onChange={(e) => set({ hp: Math.min(npc.maxHp, Math.max(0, toInt(e.target.value))) })}
                            />
                        </label>
                        <label className="dms-field">
                            <span>Max HP</span>
                            <input
                                inputMode="numeric"
                                value={npc.maxHp}
                                onChange={(e) => {
                                    const maxHp = Math.max(0, toInt(e.target.value));
                                    set({ maxHp, hp: Math.min(npc.hp, maxHp) });
                                }}
                            />
                        </label>
                    </div>
                    <div className="dms-inspector-section">
                        <span className="dms-subtitle">Attacks &amp; spells</span>
                        <AttackList attacks={npc.attacks} onChange={(attacks) => set({ attacks })} />
                    </div>
                    <label className="dms-field">
                        <span>Loot</span>
                        <textarea
                            rows={3}
                            value={npc.loot}
                            placeholder="What they drop: 23 gp, a silver key, a letter from the duke…"
                            onChange={(e) => set({ loot: e.target.value })}
                        />
                    </label>
                    <label className="dms-field">
                        <span>Location</span>
                        <input
                            value={npc.location}
                            placeholder="Where they can be found"
                            list={locations.length ? `dms-locations-${npc.id}` : undefined}
                            onChange={(e) => set({ location: e.target.value })}
                        />
                        {locations.length > 0 && (
                            <datalist id={`dms-locations-${npc.id}`}>
                                {locations.map((name) => <option key={name} value={name} />)}
                            </datalist>
                        )}
                    </label>
                    <label className="dms-field dms-notes">
                        <span>Notes</span>
                        <textarea
                            rows={8}
                            value={npc.notes}
                            placeholder="Personality, goals, secrets, what they know…"
                            onChange={(e) => set({ notes: e.target.value })}
                        />
                    </label>
                </div>

                <div className="dms-npc-side">
                    <ImageField image={npc.image} alt={npc.name} onChange={(image) => set({ image })} />

                    <div className="dms-inspector-section">
                        <span className="dms-subtitle">Carrying</span>
                        {carrying.length === 0 ? (
                            <p className="dms-inspector-help">Nothing from the Items tab.</p>
                        ) : (
                            <ul className="dms-carry-list">
                                {carrying.map((item) => (
                                    <li key={item.id}>
                                        <button type="button" className="dms-link-button" onClick={() => onOpenItem(item.id)}>
                                            🎒 {item.name || "Unnamed"}
                                        </button>
                                        <button
                                            type="button"
                                            className="dms-link-button"
                                            title="The players took it"
                                            onClick={() => setHolder(item.id, { kind: "party", character: "" })}
                                        >
                                            → Party
                                        </button>
                                    </li>
                                ))}
                            </ul>
                        )}
                        {givable.length > 0 && (
                            <label className="dms-field">
                                <span>Give an item…</span>
                                <select value="" onChange={(e) => e.target.value && setHolder(e.target.value, { kind: "npc", npcId: npc.id })}>
                                    <option value="">Pick an item</option>
                                    {givable.map((i) => (
                                        <option key={i.id} value={i.id}>{i.name || "Unnamed"} ({holderLabel(data, i.holder).toLowerCase()})</option>
                                    ))}
                                </select>
                            </label>
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
                            <button type="button" className="dms-button dms-button--ghost" onClick={addToEncounter}>
                                + Add to {encounter.name || "encounter"}
                            </button>
                        </div>
                        {addedTo && <p className="dms-inspector-help" role="status">Added to {addedTo} in the tracker.</p>}
                    </div>
                </div>
            </div>
        </>
    );
}
