import { useState, type Dispatch, type SetStateAction } from "react";

import {
    ITEM_HOLDERS,
    ITEM_RARITIES,
    ITEM_STAT_FIELDS,
    ITEM_TYPES,
    activeBoard,
    createItem,
    createNode,
    holderLabel,
    itemCards,
    itemMatches,
    itemTypeLabel,
    removeItem,
    updateActiveBoard,
    type DmScreenData,
    type Item,
    type ItemHolderKind,
    type ItemRarity,
    type ItemType,
} from "../../utils/dmScreen";
import ConfirmButton from "./ConfirmButton";
import HolderField from "./HolderField";
import ImageField from "./ImageField";

interface ItemManagerProps {
    data: DmScreenData;
    setData: Dispatch<SetStateAction<DmScreenData>>;
    onShowCard: (boardId: string, nodeId: string) => void;
}

type Filter = "all" | ItemHolderKind;

const FILTERS: { value: Filter; label: string }[] = [
    { value: "all", label: "All" },
    ...ITEM_HOLDERS.map((h) => ({ value: h.value, label: h.value === "npc" ? "NPCs" : h.value === "location" ? "Locations" : h.label })),
];

export default function ItemManager({ data, setData, onShowCard }: ItemManagerProps) {
    const [filter, setFilter] = useState<Filter>("all");
    const [query, setQuery] = useState("");
    const item = data.items.find((i) => i.id === data.activeItemId) ?? data.items[0];
    const shown = data.items.filter((i) => (filter === "all" || i.holder.kind === filter) && itemMatches(data, i, query));

    const addItem = () => {
        const created = createItem({ name: `Item ${data.items.length + 1}` });
        setData((current) => ({ ...current, items: [...current.items, created], activeItemId: created.id }));
        // So the new item shows in the list.
        setFilter("all");
        setQuery("");
    };

    return (
        <div className="dms-tracker dms-items">
            {/* ---------------- Item list ---------------- */}
            <aside className="dms-panel dms-encounter-list" aria-label="Items">
                <h2 className="dms-panel-title">Items</h2>
                {data.items.length > 0 && (
                    <label className="dms-field dms-list-search">
                        <span>Search</span>
                        <input
                            type="search"
                            value={query}
                            placeholder="Name, type, rarity, holder…"
                            onChange={(e) => setQuery(e.target.value)}
                        />
                    </label>
                )}
                {data.items.length > 0 && (
                    <div className="dms-item-filters" role="group" aria-label="Show items held by">
                        {FILTERS.map((f) => (
                            <button
                                key={f.value}
                                type="button"
                                className={filter === f.value ? "dms-chip active" : "dms-chip"}
                                aria-pressed={filter === f.value}
                                onClick={() => setFilter(f.value)}
                            >
                                {f.label}
                            </button>
                        ))}
                    </div>
                )}
                {shown.length > 0 && (
                    <ul>
                        {shown.map((i) => (
                            <li key={i.id}>
                                <button
                                    type="button"
                                    className={i.id === item?.id ? "dms-encounter-item active" : "dms-encounter-item"}
                                    aria-current={i.id === item?.id}
                                    onClick={() => setData((current) => ({ ...current, activeItemId: i.id }))}
                                >
                                    <span>{i.name || "Unnamed"}</span>
                                    <small>{holderLabel(data, i.holder)}</small>
                                </button>
                            </li>
                        ))}
                    </ul>
                )}
                {data.items.length > 0 && shown.length === 0 && (
                    <p className="dms-empty">{query.trim() ? `No items match "${query.trim()}".` : "No items here."}</p>
                )}
                <button type="button" className="dms-button dms-button--ghost" onClick={addItem}>
                    + New item
                </button>
            </aside>

            {/* ---------------- Selected item ---------------- */}
            <section className="dms-panel dms-encounter">
                {item ? (
                    <ItemSheet key={item.id} item={item} data={data} setData={setData} onShowCard={onShowCard} />
                ) : (
                    <p className="dms-empty">
                        No items yet. Add the loot worth tracking: magic items, quest items, treasure. Then set who has it
                        as it changes hands, and link it from Item cards on the story board.
                    </p>
                )}
            </section>
        </div>
    );
}

interface ItemSheetProps extends ItemManagerProps {
    item: Item;
}

function ItemSheet({ item, data, setData, onShowCard }: ItemSheetProps) {
    const set = (fields: Partial<Item>) =>
        setData((current) => ({ ...current, items: current.items.map((i) => (i.id === item.id ? { ...i, ...fields } : i)) }));

    const cards = itemCards(data, item.id);

    const putOnBoard = () => {
        const board = activeBoard(data);
        const offset = (board.nodes.length % 5) * 24;
        const node = { ...createNode("item", 40 + offset, 40 + offset), title: item.name, itemId: item.id };
        setData((current) => updateActiveBoard(current, (b) => ({ ...b, nodes: [...b.nodes, node] })));
        onShowCard(board.id, node.id);
    };

    return (
        <>
            <div className="dms-encounter-header">
                <label className="dms-field dms-encounter-name">
                    <span>Name</span>
                    <input value={item.name} onChange={(e) => set({ name: e.target.value })} />
                </label>
                <ConfirmButton label="Delete item" onConfirm={() => setData((current) => removeItem(current, item.id))} />
            </div>

            <div className="dms-npc-sheet">
                <div className="dms-npc-fields">
                    <div className="dms-npc-row dms-npc-stats">
                        <label className="dms-field">
                            <span>Type</span>
                            <select value={item.type} onChange={(e) => set({ type: e.target.value as ItemType })}>
                                {ITEM_TYPES.map((t) => <option key={t.value} value={t.value}>{t.label}</option>)}
                            </select>
                        </label>
                        <label className="dms-field">
                            <span>Rarity</span>
                            <select value={item.rarity} onChange={(e) => set({ rarity: e.target.value as ItemRarity })}>
                                {ITEM_RARITIES.map((r) => <option key={r.value} value={r.value}>{r.label}</option>)}
                            </select>
                        </label>
                        <label className="dms-field">
                            <span>Value</span>
                            <input value={item.value} placeholder="e.g. 500 gp" onChange={(e) => set({ value: e.target.value })} />
                        </label>
                    </div>
                    {ITEM_STAT_FIELDS[item.type].length > 0 && (
                        <fieldset className="dms-item-stats">
                            <legend>{itemTypeLabel(item.type)} stats</legend>
                            {ITEM_STAT_FIELDS[item.type].map((field) => {
                                const value = item.stats[field.key] ?? "";
                                const setStat = (next: string) => set({ stats: { ...item.stats, [field.key]: next } });
                                return (
                                    <label key={field.key} className="dms-field">
                                        <span>{field.label}</span>
                                        {field.options ? (
                                            <select value={value} onChange={(e) => setStat(e.target.value)}>
                                                <option value="">{field.key === "stealth" ? "No penalty" : "—"}</option>
                                                {field.options.map((o) => <option key={o.value} value={o.value}>{o.label}</option>)}
                                            </select>
                                        ) : (
                                            <input value={value} placeholder={field.placeholder} onChange={(e) => setStat(e.target.value)} />
                                        )}
                                    </label>
                                );
                            })}
                        </fieldset>
                    )}
                    <div className="dms-inspector-section">
                        <HolderField id={item.id} holder={item.holder} data={data} onChange={(holder) => set({ holder })} />
                    </div>
                    <label className="dms-field dms-notes">
                        <span>Description / effect</span>
                        <textarea
                            rows={8}
                            value={item.description}
                            placeholder="What it does, charges, curses, where it came from…"
                            onChange={(e) => set({ description: e.target.value })}
                        />
                    </label>
                </div>

                <div className="dms-npc-side">
                    <ImageField image={item.image} alt={item.name} onChange={(image) => set({ image })} />

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
                    </div>
                </div>
            </div>
        </>
    );
}
