import { useCallback, useEffect, useRef, useState } from "react";
// three.js is big, so this page is loaded on its own (see App.tsx).
import { useNavigate } from "react-router-dom";

import "../components/styles/town-builder.css";

import TownScene, { type Tool } from "../components/TownBuilder/TownScene";
import {
    MAX_SIZE,
    MIN_SIZE,
    PIECES,
    STORAGE_KEY,
    createStarterTown,
    createTown,
    facingRoad,
    parseTown,
    pieceInfo,
    placePiece,
    removePiece,
    resizeTown,
    rotatePiece,
    tileKey,
    townStats,
    type PieceCategory,
    type PieceType,
    type Rotation,
    type Town,
} from "../utils/townBuilder";

const HISTORY_LIMIT = 100;
const CATEGORIES: PieceCategory[] = ["Roads", "Homes", "Town", "Nature"];
const FACING = ["south", "west", "north", "east"];

function loadTown(): Town {
    try {
        return parseTown(localStorage.getItem(STORAGE_KEY)) ?? createStarterTown();
    }
    catch {
        return createStarterTown();
    }
}

// The town and its undo history in one state, so every change is one pure
// update. `strokeBase` is the town when the current click or drag began, so
// a whole dragged road is one undo step.
interface History {
    past: Town[];
    present: Town;
    future: Town[];
    strokeBase: Town | null;
}

function record(history: History, before: Town, after: Town): History {
    if (before === after) return { ...history, present: after };
    return { past: [...history.past.slice(-(HISTORY_LIMIT - 1)), before], present: after, future: [], strokeBase: null };
}

export default function TownBuilder() {
    const navigate = useNavigate();
    const [history, setHistory] = useState<History>(() => ({ past: [], present: loadTown(), future: [], strokeBase: null }));
    const town = history.present;
    const [tool, setTool] = useState<Tool>("build");
    const [piece, setPiece] = useState<PieceType>("road");
    // The rotation new pieces get when there's no road beside them to face.
    const [placeRotation, setPlaceRotation] = useState<Rotation>(0);
    const [hovered, setHovered] = useState<[number, number] | null>(null);
    const [showGrid, setShowGrid] = useState(true);
    const [message, setMessage] = useState("");
    const canvasRef = useRef<HTMLCanvasElement | null>(null);
    const fileInput = useRef<HTMLInputElement>(null);

    useEffect(() => {
        try {
            localStorage.setItem(STORAGE_KEY, JSON.stringify(town));
        }
        catch {
            // Storage full or blocked; the town still works in memory.
        }
    }, [town]);

    useEffect(() => {
        if (!message) return;
        const timer = window.setTimeout(() => setMessage(""), 2500);
        return () => window.clearTimeout(timer);
    }, [message]);

    // A change that can be undone in one step.
    const change = (update: (current: Town) => Town) =>
        setHistory((h) => record(h, h.present, update(h.present)));

    // A change that isn't worth an undo step, like typing the town's name.
    const setTownQuietly = (update: (current: Town) => Town) =>
        setHistory((h) => ({ ...h, present: update(h.present) }));

    const undo = useCallback(() => setHistory((h) => (h.past.length === 0 ? h : {
        past: h.past.slice(0, -1),
        present: h.past[h.past.length - 1],
        future: [h.present, ...h.future],
        strokeBase: null,
    })), []);

    const redo = useCallback(() => setHistory((h) => (h.future.length === 0 ? h : {
        past: [...h.past, h.present],
        present: h.future[0],
        future: h.future.slice(1),
        strokeBase: null,
    })), []);

    // ---- Building with clicks and drags

    const onStrokeStart = useCallback(() => setHistory((h) => ({ ...h, strokeBase: h.present })), []);

    const onStrokeTile = useCallback((x: number, z: number) => setHistory((h) => {
        const current = h.present;
        let next = current;
        if (tool === "erase") next = removePiece(current, x, z);
        // Rotate once per click, not on every tile a drag passes over.
        else if (tool === "rotate") next = h.strokeBase === current ? rotatePiece(current, x, z) : current;
        // New buildings face a road beside them, if there is one.
        else next = placePiece(current, x, z, piece, facingRoad(current, x, z) ?? placeRotation);
        return next === current ? h : { ...h, present: next };
    }), [tool, piece, placeRotation]);

    const onStrokeEnd = useCallback(() => setHistory((h) => (h.strokeBase
        ? { ...record(h, h.strokeBase, h.present), strokeBase: null }
        : h)), []);

    // ---- Keyboard

    useEffect(() => {
        const onKey = (event: KeyboardEvent) => {
            const target = event.target as HTMLElement | null;
            if (target && (target.isContentEditable || ["INPUT", "TEXTAREA", "SELECT"].includes(target.tagName))) return;
            const key = event.key.toLowerCase();
            if ((event.ctrlKey || event.metaKey) && key === "z") {
                event.preventDefault();
                if (event.shiftKey) redo();
                else undo();
                return;
            }
            if ((event.ctrlKey || event.metaKey) && key === "y") {
                event.preventDefault();
                redo();
                return;
            }
            if (event.ctrlKey || event.metaKey || event.altKey) return;
            if (key === "r") {
                // Turns the piece under the mouse, or the direction new pieces face.
                const tile = hovered && town.tiles[tileKey(hovered[0], hovered[1])];
                if (hovered && tile) change((t) => rotatePiece(t, hovered[0], hovered[1]));
                else setPlaceRotation((r) => ((r + 1) % 4) as Rotation);
            }
            else if (key === "e") setTool((t) => (t === "erase" ? "build" : "erase"));
            else if (key === "b") setTool("build");
            else if (key === "g") setShowGrid((g) => !g);
            else if (key === "delete" || key === "backspace") {
                if (hovered) change((t) => removePiece(t, hovered[0], hovered[1]));
            }
            else if (/^[1-9]$/.test(key)) {
                const next = PIECES[Number(key) - 1];
                if (next) {
                    setPiece(next.type);
                    setTool("build");
                }
            }
        };
        window.addEventListener("keydown", onKey);
        return () => window.removeEventListener("keydown", onKey);
    });

    // ---- Saving

    const exportJson = () => {
        const url = URL.createObjectURL(new Blob([JSON.stringify(town, null, 2)], { type: "application/json" }));
        const link = document.createElement("a");
        link.href = url;
        link.download = `${town.name.trim().replace(/\s+/g, "-") || "town"}.json`;
        link.click();
        URL.revokeObjectURL(url);
    };

    const importJson = async (file: File | undefined) => {
        if (!file) return;
        const imported = parseTown(await file.text());
        if (!imported) {
            setMessage("That file isn't a town from this builder.");
            return;
        }
        change(() => imported);
        setMessage(`Loaded ${imported.name}.`);
    };

    const savePicture = () => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const link = document.createElement("a");
        link.href = canvas.toDataURL("image/png");
        link.download = `${town.name.trim().replace(/\s+/g, "-") || "town"}.png`;
        link.click();
    };

    const stats = townStats(town);
    const hoveredTile = hovered ? town.tiles[tileKey(hovered[0], hovered[1])] : undefined;

    return (
        <div className="tb-page">
            <header className="tb-topbar">
                <button className="tb-back" onClick={() => navigate("/")}>
                    ← OH<span>/</span>Hub
                </button>
                <input
                    className="tb-name"
                    value={town.name}
                    aria-label="Town name"
                    onChange={(e) => setTownQuietly((t) => ({ ...t, name: e.target.value }))}
                />
                <div className="tb-topbar-actions">
                    <button type="button" className="tb-button tb-button--ghost" onClick={undo} disabled={history.past.length === 0} title="Undo (Ctrl+Z)" aria-label="Undo">↶</button>
                    <button type="button" className="tb-button tb-button--ghost" onClick={redo} disabled={history.future.length === 0} title="Redo (Ctrl+Y)" aria-label="Redo">↷</button>
                    <button type="button" className="tb-button tb-button--ghost" onClick={savePicture}>Save picture</button>
                    <button type="button" className="tb-button tb-button--ghost" onClick={exportJson}>Export</button>
                    <button type="button" className="tb-button tb-button--ghost" onClick={() => fileInput.current?.click()}>Import</button>
                    <input
                        ref={fileInput}
                        type="file"
                        accept="application/json,.json"
                        hidden
                        onChange={(e) => {
                            void importJson(e.target.files?.[0]);
                            e.target.value = "";
                        }}
                    />
                </div>
            </header>

            <div className="tb-workspace">
                <aside className="tb-panel" aria-label="Build tools">
                    <div className="tb-tools" role="group" aria-label="Tool">
                        {(["build", "erase", "rotate"] as Tool[]).map((t) => (
                            <button key={t} type="button" className={tool === t ? "active" : ""} aria-pressed={tool === t} onClick={() => setTool(t)}>
                                {t === "build" ? "🏗 Build" : t === "erase" ? "🧹 Erase" : "↻ Rotate"}
                            </button>
                        ))}
                    </div>

                    {CATEGORIES.map((category) => (
                        <section key={category} className="tb-category">
                            <h2>{category}</h2>
                            <div className="tb-palette">
                                {PIECES.filter((p) => p.category === category).map((p) => {
                                    const index = PIECES.indexOf(p) + 1;
                                    const selected = tool === "build" && piece === p.type;
                                    return (
                                        <button
                                            key={p.type}
                                            type="button"
                                            className={selected ? "tb-piece selected" : "tb-piece"}
                                            aria-pressed={selected}
                                            title={index <= 9 ? `Shortcut: ${index}` : undefined}
                                            onClick={() => {
                                                setPiece(p.type);
                                                setTool("build");
                                            }}
                                        >
                                            <span className="tb-swatch" style={{ background: p.color }} aria-hidden="true" />
                                            {p.label}
                                        </button>
                                    );
                                })}
                            </div>
                        </section>
                    ))}

                    <section className="tb-category">
                        <h2>Town</h2>
                        <dl className="tb-stats">
                            <div><dt>Residents</dt><dd>{stats.residents.toLocaleString()}</dd></div>
                            <div><dt>Jobs</dt><dd>{stats.jobs.toLocaleString()}</dd></div>
                            <div><dt>Road tiles</dt><dd>{stats.roads}</dd></div>
                            <div><dt>By a road</dt><dd>{stats.connected}%</dd></div>
                        </dl>
                        {stats.connected < 100 && <p className="tb-hint">Some buildings have no road beside them.</p>}
                    </section>

                    <section className="tb-category">
                        <h2>Settings</h2>
                        <label className="tb-check">
                            <input type="checkbox" checked={showGrid} onChange={(e) => setShowGrid(e.target.checked)} />
                            Show grid (G)
                        </label>
                        <label className="tb-field">
                            <span>Size: {town.size} × {town.size}</span>
                            <input
                                type="range"
                                min={MIN_SIZE}
                                max={MAX_SIZE}
                                step={2}
                                value={town.size}
                                onChange={(e) => change((t) => resizeTown(t, Number(e.target.value)))}
                            />
                        </label>
                        <div className="tb-row">
                            <button type="button" className="tb-button tb-button--ghost" onClick={() => change(() => createStarterTown())}>Starter town</button>
                            <button type="button" className="tb-button tb-button--danger" onClick={() => change((t) => createTown(t.name, t.size))}>Clear all</button>
                        </div>
                    </section>
                </aside>

                <main className="tb-stage">
                    <TownScene
                        town={town}
                        tool={tool}
                        hovered={hovered}
                        showGrid={showGrid}
                        onHover={setHovered}
                        onStrokeStart={onStrokeStart}
                        onStrokeTile={onStrokeTile}
                        onStrokeEnd={onStrokeEnd}
                        onCanvas={(canvas) => { canvasRef.current = canvas; }}
                    />
                    <div className="tb-status" aria-live="polite">
                        {message || (
                            <>
                                {tool === "build" && <>Placing <strong>{pieceInfo(piece).label}</strong> · facing {FACING[placeRotation]} (R)</>}
                                {tool === "erase" && <>Erasing · click or drag over pieces</>}
                                {tool === "rotate" && <>Rotating · click a piece</>}
                                {hovered && <> · tile {hovered[0] + 1}, {hovered[1] + 1}{hoveredTile ? ` · ${pieceInfo(hoveredTile.type).label}` : ""}</>}
                            </>
                        )}
                    </div>
                    <p className="tb-help">
                        Left-click or drag to build · right-drag to turn · middle-drag to pan · scroll to zoom · R rotate · E erase · 1–9 pieces · Ctrl+Z undo
                    </p>
                </main>
            </div>
        </div>
    );
}
