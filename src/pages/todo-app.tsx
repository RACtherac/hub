import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import "../components/styles/todo-app.css";
import { sanitizeText } from "../lib/security";

type Priority = "low" | "medium" | "high";

interface KanbanCard {
  id: string;
  text: string;
  column: Column;
  createdAt: string;
  deadline?: string; // YYYY-MM-DD
  priority?: Priority;
  notes?: string;
}

type Column = "todo" | "inprogress" | "done";

const COLUMNS: Column[] = ["todo", "inprogress", "done"];
const COLUMN_LABELS: Record<Column, string> = {
  todo: "To Do",
  inprogress: "In Progress",
  done: "Done",
};

const STORAGE_KEY = "kanban-app-items";

function loadCards(): KanbanCard[] {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
  } catch {
    return [];
  }
}

function saveCards(cards: KanbanCard[]) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(cards));
}

function formatDeadline(deadline: string): { label: string; overdue: boolean } | null {
  const d = new Date(deadline + "T00:00:00");
  if (isNaN(d.getTime())) return null;
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const dd = String(d.getDate()).padStart(2, "0");
  const mm = String(d.getMonth() + 1).padStart(2, "0");
  const yyyy = d.getFullYear();
  return { label: `${dd}/${mm}/${yyyy}`, overdue: d < today };
}

function isoToDMY(iso: string): string {
  const [y, m, d] = iso.split("-");
  return y && m && d ? `${d}/${m}/${y}` : "";
}

function dmyToIso(dmy: string): string | null {
  const [d, m, y] = dmy.split("/");
  if (!d || !m || !y || d.length !== 2 || m.length !== 2 || y.length !== 4) return null;
  const iso = `${y}-${m}-${d}`;
  const date = new Date(iso + "T00:00:00");
  return isNaN(date.getTime()) ? null : iso;
}

function DeadlineInput({ value, onChange }: { value: string; onChange: (iso: string) => void }) {
  const [draft, setDraft] = useState(() => (value ? isoToDMY(value) : ""));

  useEffect(() => {
    setDraft(value ? isoToDMY(value) : "");
  }, [value]);

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const digits = e.target.value.replace(/\D/g, "").slice(0, 8);
    let formatted = digits;
    if (digits.length > 2) formatted = `${digits.slice(0, 2)}/${digits.slice(2)}`;
    if (digits.length > 4) formatted = `${digits.slice(0, 2)}/${digits.slice(2, 4)}/${digits.slice(4)}`;
    setDraft(formatted);
    if (formatted.length === 10) {
      const iso = dmyToIso(formatted);
      if (iso) onChange(iso);
    } else if (!formatted) {
      onChange("");
    }
  }

  return (
    <input
      type="text"
      className="td-dropdown-date"
      placeholder="DD/MM/YYYY"
      maxLength={10}
      value={draft}
      onChange={handleChange}
    />
  );
}

export default function KanbanApp() {
  const navigate = useNavigate();
  const [cards, setCards] = useState<KanbanCard[]>(loadCards);
  const [input, setInput] = useState("");
  const [dragId, setDragId] = useState<string | null>(null);
  const [dragOverCol, setDragOverCol] = useState<Column | null>(null);
  const [editId, setEditId] = useState<string | null>(null);
  const [editText, setEditText] = useState("");
  const [menuCardId, setMenuCardId] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    saveCards(cards);
  }, [cards]);

  function addCard() {
    const text = sanitizeText(input);
    if (!text) return;
    setCards((prev) => [
      { id: crypto.randomUUID(), text, column: "todo", createdAt: new Date().toISOString() },
      ...prev,
    ]);
    setInput("");
    inputRef.current?.focus();
  }

  function deleteCard(id: string) {
    setCards((prev) => prev.filter((c) => c.id !== id));
    if (menuCardId === id) setMenuCardId(null);
  }

  function moveCard(id: string, col: Column) {
    setCards((prev) => prev.map((c) => (c.id === id ? { ...c, column: col } : c)));
    setMenuCardId(null);
  }

  function updateDeadline(id: string, deadline: string) {
    setCards((prev) =>
      prev.map((c) => (c.id === id ? { ...c, deadline: deadline || undefined } : c))
    );
  }

  function updatePriority(id: string, priority: Priority | undefined) {
    setCards((prev) => prev.map((c) => (c.id === id ? { ...c, priority } : c)));
  }

  function updateNotes(id: string, notes: string) {
    const sanitized = sanitizeText(notes, 1000);
    setCards((prev) =>
      prev.map((c) => (c.id === id ? { ...c, notes: sanitized || undefined } : c))
    );
  }

  function handleDrop(col: Column) {
    if (!dragId) return;
    setCards((prev) => prev.map((c) => (c.id === dragId ? { ...c, column: col } : c)));
    setDragId(null);
    setDragOverCol(null);
  }

  function startEdit(card: KanbanCard) {
    setMenuCardId(null);
    setEditId(card.id);
    setEditText(card.text);
  }

  function commitEdit() {
    if (!editId) return;
    const text = sanitizeText(editText);
    if (text) {
      setCards((prev) => prev.map((c) => (c.id === editId ? { ...c, text } : c)));
    }
    setEditId(null);
  }

  const totalCount = cards.length;
  const doneCount = cards.filter((c) => c.column === "done").length;

  return (
    <div className="td-page">
      <div className="td-topbar">
        <button className="td-topbar-back" onClick={() => navigate("/")}>
          ← OH<span>/</span>Hub
        </button>
        <span className="td-topbar-title">Kanban Board</span>
      </div>

      <div className="td-board-body">
        {menuCardId && (
          <div className="td-overlay" onClick={() => setMenuCardId(null)} />
        )}

        <header className="td-hero">
          <p className="td-eyebrow">// task board</p>
          <h1 className="td-title">
            Get things <em>done</em>
          </h1>
          <p className="td-subtitle">{doneCount} / {totalCount} completed</p>
          <div className="td-input-row">
            <input
              ref={inputRef}
              className="td-input"
              placeholder="Add a new task…"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && addCard()}
            />
            <button className="td-add-btn" onClick={addCard}>Add</button>
          </div>
        </header>

        <div className="td-columns">
          {COLUMNS.map((col) => {
            const colCards = cards.filter((c) => c.column === col);
            return (
              <div
                key={col}
                className={`td-column td-column--${col} ${dragOverCol === col ? "td-column--over" : ""}`}
                onDragOver={(e) => { e.preventDefault(); setDragOverCol(col); }}
                onDragLeave={(e) => {
                  if (!e.currentTarget.contains(e.relatedTarget as Node)) setDragOverCol(null);
                }}
                onDrop={() => handleDrop(col)}
              >
                <div className="td-column-header">
                  <span className="td-column-title">{COLUMN_LABELS[col]}</span>
                  <span className="td-column-count">{colCards.length}</span>
                </div>
                <div className="td-cards">
                  {colCards.length === 0 && (
                    <div className="td-column-empty">Drop here</div>
                  )}
                  {colCards.map((card) => {
                    const dl = card.deadline ? formatDeadline(card.deadline) : null;
                    return (
                      <div
                        key={card.id}
                        className={`td-card td-card--${col} ${card.priority ? `td-card--priority-${card.priority}` : ""} ${dragId === card.id ? "td-card--dragging" : ""} ${menuCardId === card.id ? "td-card--menu-open" : ""}`}
                        draggable={editId !== card.id && menuCardId !== card.id}
                        onDragStart={() => setDragId(card.id)}
                        onDragEnd={() => { setDragId(null); setDragOverCol(null); }}
                      >
                        <div className="td-card-content">
                          {editId === card.id ? (
                            <input
                              className="td-card-edit"
                              value={editText}
                              autoFocus
                              onChange={(e) => setEditText(e.target.value)}
                              onBlur={commitEdit}
                              onKeyDown={(e) => {
                                if (e.key === "Enter") commitEdit();
                                if (e.key === "Escape") setEditId(null);
                              }}
                            />
                          ) : (
                            <span
                              className="td-card-text"
                              onDoubleClick={() => startEdit(card)}
                              title="Double-click to edit"
                            >
                              {card.text}
                            </span>
                          )}
                          {card.notes && editId !== card.id && (
                            <span className="td-card-notes">{card.notes}</span>
                          )}
                          {(card.priority || dl) && (
                            <div className="td-card-meta">
                              {card.priority && (
                                <span className={`td-card-priority td-card-priority--${card.priority}`}>
                                  {card.priority}
                                </span>
                              )}
                              {dl && (
                                <span className={`td-card-deadline ${dl.overdue ? "td-card-deadline--overdue" : ""}`}>
                                  {dl.overdue ? "Overdue · " : "Due "}{dl.label}
                                </span>
                              )}
                            </div>
                          )}
                        </div>

                        <div className="td-card-actions">
                          <div className="td-menu-wrap">
                            <button
                              className={`td-card-menu-btn ${menuCardId === card.id ? "td-card-menu-btn--active" : ""}`}
                              onClick={(e) => {
                                e.stopPropagation();
                                setMenuCardId(menuCardId === card.id ? null : card.id);
                              }}
                              aria-label="Card options"
                            >
                              ⋯
                            </button>
                            {menuCardId === card.id && (
                              <div className="td-dropdown" onClick={(e) => e.stopPropagation()}>
                                <p className="td-dropdown-section">Move to</p>
                                {COLUMNS.filter((c) => c !== card.column).map((c) => (
                                  <button
                                    key={c}
                                    className="td-dropdown-item"
                                    onClick={() => moveCard(card.id, c)}
                                  >
                                    {COLUMN_LABELS[c]}
                                  </button>
                                ))}
                                <div className="td-dropdown-divider" />
                                <p className="td-dropdown-section">Priority</p>
                                <div className="td-priority-btns">
                                  {(["low", "medium", "high"] as Priority[]).map((p) => (
                                    <button
                                      key={p}
                                      className={`td-priority-btn td-priority-btn--${p} ${card.priority === p ? "td-priority-btn--active" : ""}`}
                                      onClick={() => updatePriority(card.id, card.priority === p ? undefined : p)}
                                    >
                                      {p}
                                    </button>
                                  ))}
                                </div>
                                <div className="td-dropdown-divider" />
                                <p className="td-dropdown-section">Deadline</p>
                                <DeadlineInput
                                  value={card.deadline || ""}
                                  onChange={(iso) => updateDeadline(card.id, iso)}
                                />
                                {card.deadline && (
                                  <button
                                    className="td-dropdown-item td-dropdown-item--danger"
                                    onClick={() => updateDeadline(card.id, "")}
                                  >
                                    Clear deadline
                                  </button>
                                )}
                                <div className="td-dropdown-divider" />
                                <p className="td-dropdown-section">Notes</p>
                                <textarea
                                  className="td-dropdown-notes"
                                  placeholder="Add a note…"
                                  rows={3}
                                  value={card.notes || ""}
                                  onChange={(e) => updateNotes(card.id, e.target.value)}
                                />
                              </div>
                            )}
                          </div>
                          <button
                            className="td-card-delete"
                            onClick={() => deleteCard(card.id)}
                            aria-label="Delete"
                          >
                            ×
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
