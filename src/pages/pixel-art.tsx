import { useState, useRef, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import "../components/styles/pixel-art.css";

type Tool = "pencil" | "eraser" | "fill" | "eyedropper";
type GridSize = 8 | 16 | 32;

const PALETTE = [
  "#000000", "#1a1a2e", "#2d2d2d", "#555555",
  "#f0ece4", "#ffffff", "#e8c99a", "#c8845a",
  "#e05a5a", "#e07a5a", "#e0c05a", "#5ae07a",
  "#5ab4e0", "#5a5ae0", "#a05ae0", "#e05ab4",
];

const GRID_SIZES: GridSize[] = [8, 16, 32];
const STORAGE_KEY = "pixel-art-data";
const MAX_UNDO = 20;

const TOOLS: { id: Tool; label: string; icon: string }[] = [
  { id: "pencil",     label: "Pencil",     icon: "✏" },
  { id: "eraser",     label: "Eraser",     icon: "◻" },
  { id: "fill",       label: "Fill",       icon: "▣" },
  { id: "eyedropper", label: "Pick",       icon: "◈" },
];

function makeGrid(size: number): string[] {
  return Array(size * size).fill("");
}

function floodFill(grid: string[], index: number, size: number, fillColor: string): string[] {
  const targetColor = grid[index];
  if (targetColor === fillColor) return grid;
  const next = [...grid];
  const stack = [index];
  const visited = new Set<number>();
  while (stack.length > 0) {
    const idx = stack.pop()!;
    if (visited.has(idx) || idx < 0 || idx >= size * size) continue;
    if (next[idx] !== targetColor) continue;
    visited.add(idx);
    next[idx] = fillColor;
    const row = Math.floor(idx / size);
    const col = idx % size;
    if (col > 0) stack.push(idx - 1);
    if (col < size - 1) stack.push(idx + 1);
    if (row > 0) stack.push(idx - size);
    if (row < size - 1) stack.push(idx + size);
  }
  return next;
}

function loadSaved(): { grid: string[]; size: GridSize } | null {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    return JSON.parse(raw);
  } catch { return null; }
}

function saveData(grid: string[], size: GridSize) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify({ grid, size }));
}

export default function PixelArt() {
  const navigate = useNavigate();

  const [gridSize, setGridSize] = useState<GridSize>(() => loadSaved()?.size ?? 16);
  const [grid, setGrid] = useState<string[]>(() => {
    const s = loadSaved();
    return s?.grid ?? makeGrid(s?.size ?? 16);
  });
  const [tool, setTool] = useState<Tool>("pencil");
  const [color, setColor] = useState("#e05a5a");
  const [undoStack, setUndoStack] = useState<string[][]>([]);
  const [highlightColor, setHighlightColor] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const isDrawing = useRef(false);
  const exportCanvasRef = useRef<HTMLCanvasElement>(null);

  // Derive used colors sorted by pixel count descending
  const usedColors = useMemo(() => {
    const map = new Map<string, number>();
    for (const c of grid) {
      if (c) map.set(c, (map.get(c) ?? 0) + 1);
    }
    return [...map.entries()].sort((a, b) => b[1] - a[1]);
  }, [grid]);

  const filteredColors = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    if (!q) return usedColors;
    return usedColors.filter(([c]) => c.toLowerCase().includes(q));
  }, [usedColors, searchQuery]);

  function pushUndo(snapshot: string[]) {
    setUndoStack(s => {
      const next = [...s, snapshot];
      return next.length > MAX_UNDO ? next.slice(next.length - MAX_UNDO) : next;
    });
  }

  function applyGrid(next: string[], size: GridSize = gridSize) {
    setGrid(next);
    saveData(next, size);
  }

  function undo() {
    if (undoStack.length === 0) return;
    const prev = undoStack[undoStack.length - 1];
    setUndoStack(s => s.slice(0, -1));
    applyGrid(prev);
  }

  function changeSize(size: GridSize) {
    const next = makeGrid(size);
    setGridSize(size);
    setUndoStack([]);
    setHighlightColor(null);
    setSearchQuery("");
    applyGrid(next, size);
  }

  function clear() {
    pushUndo(grid);
    setHighlightColor(null);
    setSearchQuery("");
    applyGrid(makeGrid(gridSize));
  }

  function paintCell(index: number, currentGrid: string[]): string[] {
    if (tool === "pencil") {
      const next = [...currentGrid];
      next[index] = color;
      return next;
    }
    if (tool === "eraser") {
      const next = [...currentGrid];
      next[index] = "";
      return next;
    }
    return currentGrid;
  }

  function handleMouseDown(index: number) {
    if (tool === "fill") {
      pushUndo(grid);
      applyGrid(floodFill(grid, index, gridSize, color));
      return;
    }
    if (tool === "eyedropper") {
      const picked = grid[index];
      if (picked) setColor(picked);
      setTool("pencil");
      return;
    }
    pushUndo(grid);
    isDrawing.current = true;
    applyGrid(paintCell(index, grid));
  }

  function handleMouseEnter(index: number) {
    if (!isDrawing.current) return;
    setGrid(g => {
      const next = paintCell(index, g);
      saveData(next, gridSize);
      return next;
    });
  }

  function handleMouseUp() {
    isDrawing.current = false;
  }

  function toggleHighlight(c: string) {
    setHighlightColor(h => h === c ? null : c);
  }

  function exportPNG() {
    const canvas = exportCanvasRef.current;
    if (!canvas) return;
    const px = 16;
    canvas.width = gridSize * px;
    canvas.height = gridSize * px;
    const ctx = canvas.getContext("2d")!;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    grid.forEach((cell, i) => {
      if (!cell) return;
      const row = Math.floor(i / gridSize);
      const col = i % gridSize;
      ctx.fillStyle = cell;
      ctx.fillRect(col * px, row * px, px, px);
    });
    const link = document.createElement("a");
    link.download = `pixel-${gridSize}x${gridSize}.png`;
    link.href = canvas.toDataURL("image/png");
    link.click();
  }

  const pixelCount = grid.filter(c => c !== "").length;
  const cellPx = gridSize === 8 ? 48 : gridSize === 16 ? 28 : 14;

  return (
    <div className="px-page" onMouseUp={handleMouseUp} onMouseLeave={handleMouseUp}>
      <div className="px-topbar">
        <button className="px-topbar-back" onClick={() => navigate("/")}>
          OH<span>/</span>Hub
        </button>
        <span className="px-topbar-title">Pixel Art Editor</span>
      </div>

      <header className="px-hero">
        <p className="px-eyebrow">// creative tool</p>
        <h1 className="px-title">Paint <em>pixel</em> by pixel</h1>
        <p className="px-subtitle">
          {gridSize}×{gridSize} canvas &nbsp;·&nbsp; {pixelCount} pixels painted &nbsp;·&nbsp; {usedColors.length} colors used
        </p>
      </header>

      <div className="px-editor">
        {/* Left Sidebar */}
        <aside className="px-sidebar">
          <div className="px-section-label">// tools</div>
          <div className="px-tools">
            {TOOLS.map(t => (
              <button
                key={t.id}
                className={`px-tool-btn ${tool === t.id ? "px-tool-btn--active" : ""}`}
                onClick={() => setTool(t.id)}
                title={t.label}
              >
                <span className="px-tool-icon">{t.icon}</span>
                <span className="px-tool-label">{t.label}</span>
              </button>
            ))}
          </div>

          <div className="px-section-label">// color</div>
          <div className="px-current-color" style={{ background: color }} />
          <div className="px-palette">
            {PALETTE.map(c => (
              <button
                key={c}
                className={`px-swatch ${color === c ? "px-swatch--active" : ""}`}
                style={{ background: c }}
                onClick={() => setColor(c)}
                title={c}
              />
            ))}
          </div>
          <div className="px-custom-row">
            <span className="px-custom-label">custom</span>
            <input
              type="color"
              className="px-color-input"
              value={color}
              onChange={e => setColor(e.target.value)}
            />
          </div>

          <div className="px-section-label">// canvas</div>
          <div className="px-size-btns">
            {GRID_SIZES.map(s => (
              <button
                key={s}
                className={`px-size-btn ${gridSize === s ? "px-size-btn--active" : ""}`}
                onClick={() => changeSize(s)}
              >
                {s}×{s}
              </button>
            ))}
          </div>

          <div className="px-actions">
            <button className="px-action-btn" onClick={undo} disabled={undoStack.length === 0}>
              Undo
            </button>
            <button className="px-action-btn px-action-btn--danger" onClick={clear}>
              Clear
            </button>
            <button className="px-action-btn px-action-btn--export" onClick={exportPNG}>
              Export PNG
            </button>
          </div>
        </aside>

        {/* Canvas */}
        <div className="px-canvas-wrap">
          <div
            className="px-canvas"
            style={{
              gridTemplateColumns: `repeat(${gridSize}, ${cellPx}px)`,
              gridTemplateRows: `repeat(${gridSize}, ${cellPx}px)`,
            }}
          >
            {grid.map((cell, i) => {
              const isHighlighted = highlightColor ? cell === highlightColor : null;
              return (
                <div
                  key={i}
                  className={`px-cell${
                    isHighlighted === true ? " px-cell--highlight" :
                    isHighlighted === false ? " px-cell--dim" : ""
                  }`}
                  style={{ width: cellPx, height: cellPx, background: cell || undefined }}
                  onMouseDown={() => handleMouseDown(i)}
                  onMouseEnter={() => handleMouseEnter(i)}
                />
              );
            })}
          </div>
        </div>

        {/* Right: Search Panel */}
        <aside className="px-search-panel">
          <div className="px-section-label">// color search</div>

          <div className="px-search-input-wrap">
            <input
              className="px-search-input"
              type="text"
              placeholder="#hex…"
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
            />
            {(searchQuery || highlightColor) && (
              <button
                className="px-search-clear"
                onClick={() => { setSearchQuery(""); setHighlightColor(null); }}
                title="Clear"
              >
                ×
              </button>
            )}
          </div>

          {usedColors.length === 0 ? (
            <p className="px-search-empty">No colors yet.</p>
          ) : filteredColors.length === 0 ? (
            <p className="px-search-empty">No match.</p>
          ) : (
            <div className="px-used-list">
              {filteredColors.map(([c, count]) => (
                <button
                  key={c}
                  className={`px-used-row ${highlightColor === c ? "px-used-row--active" : ""}`}
                  onClick={() => toggleHighlight(c)}
                  title={`Click to highlight ${c}`}
                >
                  <span className="px-used-swatch" style={{ background: c }} />
                  <span className="px-used-hex">{c}</span>
                  <span className="px-used-count">{count}px</span>
                </button>
              ))}
            </div>
          )}
        </aside>
      </div>

      <canvas ref={exportCanvasRef} style={{ display: "none" }} />
    </div>
  );
}
