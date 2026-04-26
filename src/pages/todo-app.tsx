import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import "../components/styles/todo-app.css";
import { sanitizeText } from "../lib/security";

interface Todo {
  id: string;
  text: string;
  done: boolean;
  createdAt: string;
}

const STORAGE_KEY = "todo-app-items";

function loadTodos(): Todo[] {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
  } catch {
    return [];
  }
}

function saveTodos(todos: Todo[]) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(todos));
}

type Filter = "all" | "active" | "done";

export default function TodoApp() {
  const navigate = useNavigate();
  const [todos, setTodos] = useState<Todo[]>(loadTodos);
  const [input, setInput] = useState("");
  const [filter, setFilter] = useState<Filter>("all");
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    saveTodos(todos);
  }, [todos]);

  function addTodo() {
    const text = sanitizeText(input);
    if (!text) return;
    setTodos((prev) => [
      { id: crypto.randomUUID(), text, done: false, createdAt: new Date().toISOString() },
      ...prev,
    ]);
    setInput("");
    inputRef.current?.focus();
  }

  function toggleTodo(id: string) {
    setTodos((prev) =>
      prev.map((t) => (t.id === id ? { ...t, done: !t.done } : t))
    );
  }

  function deleteTodo(id: string) {
    setTodos((prev) => prev.filter((t) => t.id !== id));
  }

  function clearDone() {
    setTodos((prev) => prev.filter((t) => !t.done));
  }

  const filtered = todos.filter((t) => {
    if (filter === "active") return !t.done;
    if (filter === "done") return t.done;
    return true;
  });

  const activeCount = todos.filter((t) => !t.done).length;
  const doneCount = todos.filter((t) => t.done).length;

  return (
    <div className="td-page">
      {/* Top bar */}
      <div className="td-topbar">
        <button className="td-topbar-back" onClick={() => navigate("/")}>
          OH<span>/</span>Hub
        </button>
        <span className="td-topbar-title">Todo App</span>
      </div>

      <div className="td-body">
        {/* Hero */}
        <header className="td-hero">
          <p className="td-eyebrow">// task list</p>
          <h1 className="td-title">
            Get things <em>done</em>
          </h1>
          <p className="td-subtitle">
            {activeCount} remaining &nbsp;·&nbsp; {doneCount} completed
          </p>
        </header>

        {/* Input */}
        <div className="td-input-row">
          <input
            ref={inputRef}
            className="td-input"
            placeholder="Add a new task…"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && addTodo()}
          />
          <button className="td-add-btn" onClick={addTodo}>
            Add
          </button>
        </div>

        {/* Filters */}
        <div className="td-filters">
          {(["all", "active", "done"] as Filter[]).map((f) => (
            <button
              key={f}
              className={`td-filter-btn ${filter === f ? "td-filter-btn--active" : ""}`}
              onClick={() => setFilter(f)}
            >
              {f}
            </button>
          ))}
          {doneCount > 0 && (
            <button className="td-clear-btn" onClick={clearDone}>
              clear completed
            </button>
          )}
        </div>

        {/* List */}
        {filtered.length === 0 ? (
          <div className="td-empty">
            {filter === "done"
              ? "Nothing completed yet."
              : filter === "active"
              ? "No active tasks."
              : "Add a task to get started."}
          </div>
        ) : (
          <ul className="td-list">
            {filtered.map((todo) => (
              <li key={todo.id} className={`td-item ${todo.done ? "td-item--done" : ""}`}>
                <button
                  className="td-check"
                  onClick={() => toggleTodo(todo.id)}
                  aria-label={todo.done ? "Mark incomplete" : "Mark complete"}
                >
                  {todo.done && <span className="td-check-mark">✓</span>}
                </button>
                <span className="td-text">{todo.text}</span>
                <button
                  className="td-delete"
                  onClick={() => deleteTodo(todo.id)}
                  aria-label="Delete task"
                >
                  ×
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
