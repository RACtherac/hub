import { Fragment, useMemo, useState, type Dispatch, type SetStateAction } from "react";

import { relativeTime } from "../../utils/devTools";
import { buildLoreIndex, nameKey, splitLinks, type LoreRef } from "../../utils/dmLore";
import { formatDate } from "../../utils/dmCalendar";
import {
    createSessionRecap,
    endedCards,
    nextSessionNumber,
    recapDraft,
    recapLabel,
    recapMatches,
    removeSessionRecap,
    sortedRecaps,
    todayIso,
    updateSessionRecap,
    type DmScreenData,
    type SessionRecap,
} from "../../utils/dmScreen";
import ConfirmButton from "./ConfirmButton";
import RecapDialog from "./RecapDialog";

interface RecapManagerProps {
    data: DmScreenData;
    setData: Dispatch<SetStateAction<DmScreenData>>;
    onShowCard: (boardId: string, nodeId: string) => void;
    onOpenLore: (ref: LoreRef) => void;
}

const preview = (body: string) => body.trim().split("\n")[0]?.replace(/\[\[([^\]|]+)\|?([^\]]*)\]\]/g, (_, name, label) => label || name).slice(0, 80) ?? "";

// "16 Nov 2026" for a YYYY-MM-DD date.
const playedLabel = (iso: string) => (iso ? new Date(`${iso}T12:00:00`).toLocaleDateString(undefined, { day: "numeric", month: "short", year: "numeric" }) : "");

export default function RecapManager({ data, setData, onShowCard, onOpenLore }: RecapManagerProps) {
    const [query, setQuery] = useState("");
    const ordered = sortedRecaps(data.recaps);
    const recap = data.recaps.find((r) => r.id === data.activeRecapId) ?? ordered[0];
    const shown = ordered.filter((r) => recapMatches(r, query));

    const addRecap = () => {
        const created = createSessionRecap({
            number: nextSessionNumber(data.recaps),
            playedOn: todayIso(),
            inGameDate: formatDate(data.calendar, data.calendar.today),
        });
        setData((current) => ({ ...current, recaps: [...current.recaps, created], activeRecapId: created.id }));
        setQuery("");
    };

    return (
        <div className="dms-tracker dms-recaps-tab">
            {/* ---------------- Session list ---------------- */}
            <aside className="dms-panel dms-encounter-list" aria-label="Sessions">
                <h2 className="dms-panel-title">Sessions</h2>
                {data.recaps.length > 0 && (
                    <label className="dms-field dms-list-search">
                        <span>Search</span>
                        <input type="search" value={query} placeholder="Title, date or text…" onChange={(e) => setQuery(e.target.value)} />
                    </label>
                )}
                {data.recaps.length > 0 && shown.length === 0 && <p className="dms-empty">No sessions match "{query.trim()}".</p>}
                {shown.length > 0 && (
                    <ul>
                        {shown.map((r) => (
                            <li key={r.id}>
                                <button
                                    type="button"
                                    className={r.id === recap?.id ? "dms-encounter-item active" : "dms-encounter-item"}
                                    aria-current={r.id === recap?.id}
                                    onClick={() => setData((current) => ({ ...current, activeRecapId: r.id }))}
                                >
                                    <span>{recapLabel(r)}</span>
                                    <small>{[playedLabel(r.playedOn), r.boardId ? "📜 linked" : ""].filter(Boolean).join(" · ") || preview(r.body)}</small>
                                </button>
                            </li>
                        ))}
                    </ul>
                )}
                <button type="button" className="dms-button dms-button--ghost" onClick={addRecap}>
                    + New session recap
                </button>
            </aside>

            {/* ---------------- Selected recap ---------------- */}
            <section className="dms-panel dms-encounter">
                {recap ? (
                    <RecapSheet key={recap.id} recap={recap} ordered={ordered} data={data} setData={setData} onShowCard={onShowCard} onOpenLore={onOpenLore} />
                ) : (
                    <div className="dms-recap-empty">
                        <p className="dms-empty">
                            No session recaps yet. Write up what happened after each session, so you (and the players) can catch up before the next one.
                        </p>
                        <p className="dms-inspector-help">
                            Tip: end a session on the story board with an End story card and press <strong>✍ Write recap</strong> on it. You'll get a recap
                            here with what happened on the board already listed, ready to tidy up.
                        </p>
                    </div>
                )}
            </section>
        </div>
    );
}

interface RecapSheetProps extends RecapManagerProps {
    recap: SessionRecap;
    ordered: SessionRecap[];
}

function RecapSheet({ recap, ordered, data, setData, onShowCard, onOpenLore }: RecapSheetProps) {
    const [mode, setMode] = useState<"write" | "read">(recap.body.trim() ? "read" : "write");
    const [boardRecapShown, setBoardRecapShown] = useState(false);
    const set = (fields: Partial<Omit<SessionRecap, "id" | "updatedAt">>) => setData((current) => updateSessionRecap(current, recap.id, fields));

    const ended = endedCards(data);
    const linked = ended.find((c) => c.board.id === recap.boardId && c.node.id === recap.endNodeId);
    // Cards already linked to another recap can't be picked again.
    const taken = new Set(data.recaps.filter((r) => r.id !== recap.id && r.boardId).map((r) => `${r.boardId}>${r.endNodeId}`));
    const linkable = ended.filter((c) => !taken.has(`${c.board.id}>${c.node.id}`));

    // Older and newer sessions, in list order (newest first).
    const at = ordered.findIndex((r) => r.id === recap.id);
    const newer = at > 0 ? ordered[at - 1] : undefined;
    const older = at >= 0 ? ordered[at + 1] : undefined;
    const open = (r: SessionRecap) => setData((current) => ({ ...current, activeRecapId: r.id }));

    const insertDraft = () => {
        if (!linked) return;
        const draft = recapDraft(linked.recap);
        set({ body: recap.body.trim() ? `${recap.body.trimEnd()}\n\n${draft}` : draft });
        setMode("write");
    };

    return (
        <>
            <div className="dms-encounter-header">
                <label className="dms-field dms-recap-number">
                    <span>Session</span>
                    <input type="number" min={0} value={recap.number || ""} placeholder="#" onChange={(e) => set({ number: Math.max(0, Math.trunc(Number(e.target.value) || 0)) })} />
                </label>
                <label className="dms-field dms-encounter-name">
                    <span>Title</span>
                    <input value={recap.title} placeholder="The Old Mill" onChange={(e) => set({ title: e.target.value })} />
                </label>
                <ConfirmButton label="Delete recap" onConfirm={() => setData((current) => removeSessionRecap(current, recap.id))} />
            </div>

            <div className="dms-npc-sheet">
                <div className="dms-recap-main">
                    <div className="dms-recap-dates">
                        <label className="dms-field">
                            <span>Played on</span>
                            <input type="date" value={recap.playedOn} onChange={(e) => set({ playedOn: e.target.value })} />
                        </label>
                        <label className="dms-field">
                            <span>In game</span>
                            <input value={recap.inGameDate} placeholder="e.g. 3rd of Frostmoon" onChange={(e) => set({ inGameDate: e.target.value })} />
                        </label>
                        <button
                            type="button"
                            className="dms-button dms-button--ghost"
                            title="Use the calendar's current date"
                            onClick={() => set({ inGameDate: formatDate(data.calendar, data.calendar.today) })}
                        >
                            📅 Today in game
                        </button>
                    </div>

                    <div className="dms-item-filters" role="group" aria-label="Write or read">
                        <button type="button" className={mode === "write" ? "dms-chip active" : "dms-chip"} aria-pressed={mode === "write"} onClick={() => setMode("write")}>
                            ✍ Write
                        </button>
                        <button type="button" className={mode === "read" ? "dms-chip active" : "dms-chip"} aria-pressed={mode === "read"} onClick={() => setMode("read")}>
                            📖 Read
                        </button>
                    </div>

                    {mode === "write" ? (
                        <label className="dms-field dms-notes dms-note-body">
                            <span>What happened</span>
                            <textarea
                                rows={20}
                                value={recap.body}
                                placeholder={"Where the party went, who they met, what they decided, what's left hanging…\n\nType [[Name]] to link an NPC, place, item or quest."}
                                onChange={(e) => set({ body: e.target.value })}
                            />
                            {recap.updatedAt > 0 && <small className="dms-inspector-help">Edited {relativeTime(new Date(recap.updatedAt), new Date())}</small>}
                        </label>
                    ) : (
                        <RecapReader recap={recap} data={data} onOpenLore={onOpenLore} />
                    )}

                    <nav className="dms-recap-pager" aria-label="Other sessions">
                        {older ? (
                            <button type="button" className="dms-link-button" onClick={() => open(older)}>
                                ← {recapLabel(older)}
                            </button>
                        ) : (
                            <span />
                        )}
                        {newer && (
                            <button type="button" className="dms-link-button" onClick={() => open(newer)}>
                                {recapLabel(newer)} →
                            </button>
                        )}
                    </nav>
                </div>

                <div className="dms-npc-side">
                    <div className="dms-inspector-section">
                        <span className="dms-subtitle">End story card</span>
                        {linked ? (
                            <>
                                <p className="dms-inspector-help">
                                    {linked.board.name || "Untitled board"}: ended {new Date(linked.recap.endedAt).toLocaleDateString()}
                                    {linked.recap.endedOn && ` (${linked.recap.endedOn} in game)`} · {linked.recap.steps.length} cards
                                </p>
                                <div className="dms-inspector-buttons">
                                    <button type="button" className="dms-button dms-button--ghost" onClick={() => setBoardRecapShown(true)}>
                                        📜 What happened on the board
                                    </button>
                                    <button type="button" className="dms-button dms-button--ghost" onClick={insertDraft}>
                                        + Add board summary to the text
                                    </button>
                                    <button type="button" className="dms-button dms-button--ghost" onClick={() => onShowCard(linked.board.id, linked.node.id)}>
                                        Show card →
                                    </button>
                                </div>
                                <button type="button" className="dms-link-button" onClick={() => set({ boardId: undefined, endNodeId: undefined })}>
                                    Unlink
                                </button>
                            </>
                        ) : (
                            <>
                                <p className="dms-inspector-help">
                                    Link the End story card this session finished on to see what happened on the board, and jump between the two.
                                </p>
                                {linkable.length === 0 ? (
                                    <p className="dms-inspector-help">
                                        {ended.length === 0 ? "No stories have been ended yet." : "Every ended story already has a recap."} Use <strong>■ End story</strong> on an
                                        End story card first.
                                    </p>
                                ) : (
                                    <label className="dms-field">
                                        <span>Link to</span>
                                        <select
                                            value=""
                                            onChange={(e) => {
                                                const [boardId, endNodeId] = e.target.value.split(">");
                                                if (boardId && endNodeId) set({ boardId, endNodeId });
                                            }}
                                        >
                                            <option value="">Choose an ended story…</option>
                                            {linkable.map(({ board, node, recap: story }) => (
                                                <option key={node.id} value={`${board.id}>${node.id}`}>
                                                    {board.name || "Untitled board"}: {node.title || "The end"} ({new Date(story.endedAt).toLocaleDateString()})
                                                </option>
                                            ))}
                                        </select>
                                    </label>
                                )}
                            </>
                        )}
                    </div>
                </div>
            </div>

            {boardRecapShown && linked && <RecapDialog recap={linked.recap} ended onClose={() => setBoardRecapShown(false)} />}
        </>
    );
}

// The recap with [[links]] that open the page in the Lore tab.
function RecapReader({ recap, data, onOpenLore }: { recap: SessionRecap; data: DmScreenData; onOpenLore: (ref: LoreRef) => void }) {
    const index = useMemo(() => buildLoreIndex(data), [data]);
    if (!recap.body.trim()) return <p className="dms-empty">Nothing written yet. Switch to ✍ Write to start.</p>;
    return (
        <div className="dms-recap-reader">
            <p className="dms-lore-text">
                {splitLinks(recap.body).map((chunk, i) => {
                    if (chunk.type === "text") return <Fragment key={i}>{chunk.text}</Fragment>;
                    const target = index.byName.get(nameKey(chunk.name));
                    return target ? (
                        <button key={i} type="button" className="dms-lore-link" title={`Open ${target.title} in Lore`} onClick={() => onOpenLore(target.ref)}>
                            {chunk.label}
                        </button>
                    ) : (
                        <span key={i} className="dms-lore-link missing" title={`No page called "${chunk.name}" yet`}>
                            {chunk.label}
                        </span>
                    );
                })}
            </p>
        </div>
    );
}
