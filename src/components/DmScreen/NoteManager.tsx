import { useState, type Dispatch, type SetStateAction } from "react";

import { relativeTime } from "../../utils/devTools";
import {
    activeBoard,
    createNode,
    createNote,
    noteCards,
    noteMatches,
    removeNote,
    sortedNotes,
    updateActiveBoard,
    updateNote,
    type DmScreenData,
    type Note,
} from "../../utils/dmScreen";
import ConfirmButton from "./ConfirmButton";

interface NoteManagerProps {
    data: DmScreenData;
    setData: Dispatch<SetStateAction<DmScreenData>>;
    onShowCard: (boardId: string, nodeId: string) => void;
}

// The first line of a note's body, for the list.
const preview = (body: string) => body.trim().split("\n")[0]?.slice(0, 80) ?? "";

export default function NoteManager({ data, setData, onShowCard }: NoteManagerProps) {
    const [query, setQuery] = useState("");
    const note = data.notes.find((n) => n.id === data.activeNoteId) ?? sortedNotes(data.notes)[0];
    const shown = sortedNotes(data.notes).filter((n) => noteMatches(n, query));

    const addNote = () => {
        const created = createNote({ title: `Note ${data.notes.length + 1}` });
        setData((current) => ({ ...current, notes: [...current.notes, created], activeNoteId: created.id }));
        // So the new note shows in the list.
        setQuery("");
    };

    return (
        <div className="dms-tracker dms-notes-tab">
            {/* ---------------- Note list ---------------- */}
            <aside className="dms-panel dms-encounter-list" aria-label="Notes">
                <h2 className="dms-panel-title">Notes</h2>
                {data.notes.length > 0 && (
                    <label className="dms-field dms-list-search">
                        <span>Search</span>
                        <input type="search" value={query} placeholder="Title or text…" onChange={(e) => setQuery(e.target.value)} />
                    </label>
                )}
                {data.notes.length > 0 && shown.length === 0 && <p className="dms-empty">No notes match "{query.trim()}".</p>}
                {shown.length > 0 && (
                    <ul>
                        {shown.map((n) => (
                            <li key={n.id}>
                                <button
                                    type="button"
                                    className={n.id === note?.id ? "dms-encounter-item active" : "dms-encounter-item"}
                                    aria-current={n.id === note?.id}
                                    onClick={() => setData((current) => ({ ...current, activeNoteId: n.id }))}
                                >
                                    <span>{n.pinned && <span className="dms-pin" aria-label="Pinned">★ </span>}{n.title || "Untitled"}</span>
                                    {preview(n.body) && <small>{preview(n.body)}</small>}
                                </button>
                            </li>
                        ))}
                    </ul>
                )}
                <button type="button" className="dms-button dms-button--ghost" onClick={addNote}>
                    + New note
                </button>
            </aside>

            {/* ---------------- Selected note ---------------- */}
            <section className="dms-panel dms-encounter">
                {note ? (
                    <NoteSheet key={note.id} note={note} data={data} setData={setData} onShowCard={onShowCard} />
                ) : (
                    <p className="dms-empty">
                        No notes yet. Keep lore, rumours, session recaps and anything else worth remembering here,
                        and put them on the story board as Note cards.
                    </p>
                )}
            </section>
        </div>
    );
}

interface NoteSheetProps extends NoteManagerProps {
    note: Note;
}

function NoteSheet({ note, data, setData, onShowCard }: NoteSheetProps) {
    const set = (fields: Partial<Omit<Note, "id" | "updatedAt">>) => setData((current) => updateNote(current, note.id, fields));
    const cards = noteCards(data, note.id);

    const putOnBoard = () => {
        const board = activeBoard(data);
        const offset = (board.nodes.length % 5) * 24;
        const node = { ...createNode("note", 40 + offset, 40 + offset), title: note.title, noteId: note.id };
        setData((current) => updateActiveBoard(current, (b) => ({ ...b, nodes: [...b.nodes, node] })));
        onShowCard(board.id, node.id);
    };

    return (
        <>
            <div className="dms-encounter-header">
                <label className="dms-field dms-encounter-name">
                    <span>Title</span>
                    <input value={note.title} onChange={(e) => set({ title: e.target.value })} />
                </label>
                <button
                    type="button"
                    className={note.pinned ? "dms-button" : "dms-button dms-button--ghost"}
                    aria-pressed={note.pinned}
                    onClick={() => set({ pinned: !note.pinned })}
                >
                    {note.pinned ? "★ Pinned" : "☆ Pin"}
                </button>
                <ConfirmButton label="Delete note" onConfirm={() => setData((current) => removeNote(current, note.id))} />
            </div>

            <div className="dms-npc-sheet">
                <label className="dms-field dms-notes dms-note-body">
                    <span>Note</span>
                    <textarea
                        rows={18}
                        value={note.body}
                        placeholder="Lore, rumours, what happened last session, a riddle's answer…"
                        onChange={(e) => set({ body: e.target.value })}
                    />
                    {note.updatedAt > 0 && <small className="dms-inspector-help">Edited {relativeTime(new Date(note.updatedAt), new Date())}</small>}
                </label>

                <div className="dms-npc-side">
                    <div className="dms-inspector-section">
                        <span className="dms-subtitle">On the story board</span>
                        {cards.length === 0 ? (
                            <p className="dms-inspector-help">Not on any board yet.</p>
                        ) : (
                            <ul className="dms-connection-list">
                                {cards.map(({ board, node }) => (
                                    <li key={node.id}>
                                        <button type="button" className="dms-link-button" onClick={() => onShowCard(board.id, node.id)}>
                                            {board.name || "Untitled board"} →
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
                        <p className="dms-inspector-help">
                            A linked Note card shows this note, and editing it there edits it here too.
                        </p>
                    </div>
                </div>
            </div>
        </>
    );
}
