import {
    useCallback,
    useEffect,
    useLayoutEffect,
    useRef,
    useState,
    type Dispatch,
    type KeyboardEvent as ReactKeyboardEvent,
    type PointerEvent as ReactPointerEvent,
    type SetStateAction,
} from "react";

import {
    NODE_KINDS,
    activeBoard,
    addLink,
    branchState,
    clearTaken,
    createBoard,
    createEncounter,
    createNpc,
    createItem,
    cardTitle,
    holderLabel,
    itemStatLine,
    itemTypeLabel,
    itemsHeldBy,
    createNote,
    linkedItem,
    createLocation,
    linkedEvent,
    linkedLocation,
    linkedNote,
    linkedNpc,
    cardTravel,
    timeSkip,
    travelFields,
    sortedNotes,
    updateNote,
    rarityLabel,
    createNode,
    endStory,
    latestRecap,
    storyRecap,
    encounterOutcome,
    OUTCOME_LABELS,
    removeBoard,
    removeLink,
    removeNode,
    toggleTaken,
    updateActiveBoard,
    zoomAt,
    ZOOM_MAX,
    ZOOM_MIN,
    type Board,
    type BoardLink,
    type BoardNode,
    type DmScreenData,
    type EncounterOutcome,
    type Item,
    type ItemHolder,
    type Location,
    type NodeKind,
    type Note,
    type Npc,
    type StoryRecap,
} from "../../utils/dmScreen";
import { KM_PER_MILE, MINUTES_PER_DAY, TRAVEL_MODES, createEvent, dayNumber, formatDate, formatDuration, type Calendar, type CalendarDate, type CalendarEvent } from "../../utils/dmCalendar";
import ConfirmButton from "./ConfirmButton";
import HolderField from "./HolderField";
import ImageField from "./ImageField";
import { imageFileIn, readImageFile } from "./imageFile";
import RecapDialog from "./RecapDialog";

interface StoryBoardProps {
    data: DmScreenData;
    setData: Dispatch<SetStateAction<DmScreenData>>;
    onRunEncounter: (encounterId: string) => void;
    onOpenNpc: (npcId: string) => void;
    onOpenItem: (itemId: string) => void;
    onOpenNote: (noteId: string) => void;
    onOpenLocation: (locationId: string) => void;
    onOpenCalendar: (date: CalendarDate) => void;
    // Select this card and bring it into view when the board opens.
    focusNodeId: string | null;
    onFocused: () => void;
}

type Selection = { type: "node"; id: string } | { type: "link"; id: string } | null;

type Drag =
    | { kind: "pan"; startX: number; startY: number; viewX: number; viewY: number }
    | { kind: "node"; id: string; startX: number; startY: number; nodeX: number; nodeY: number }
    | { kind: "connect"; from: string };

interface Size { w: number; h: number }
interface Point { x: number; y: number }

// Cards are measured after render; this is used until a card has a size.
const DEFAULT_SIZE: Size = { w: 220, h: 96 };

// The side panel toggle and board height are a per-browser preference, not
// part of the DM screen data.
const LAYOUT_KEY = "dm-screen-board-layout";
const MIN_BOARD_HEIGHT = 320;

interface BoardLayout { panelOpen: boolean; height: number | null }

function loadLayout(): BoardLayout {
    try {
        const saved = JSON.parse(localStorage.getItem(LAYOUT_KEY) ?? "{}");
        return {
            panelOpen: saved.panelOpen !== false,
            height: typeof saved.height === "number" && saved.height >= MIN_BOARD_HEIGHT ? saved.height : null,
        };
    }
    catch {
        return { panelOpen: true, height: null };
    }
}

const kindLabel =(kind: NodeKind) => NODE_KINDS.find((k) => k.value === kind)?.label ?? "Note";

// A travel card's journey: distance and how the party travels, which set
// the card's time skip.
function TravelField({ node, update }: { node: BoardNode; update: (fields: Partial<BoardNode>) => void }) {
    const { mode, unit, distance, minutes } = cardTravel(node);
    // Typed as text, so "2." or "1,5" isn't fought while typing.
    const [text, setText] = useState(distance ? String(distance) : "");
    const perDay = mode.milesPerHour * mode.hoursPerDay * (unit === "km" ? KM_PER_MILE : 1);
    const change = (fields: Parameters<typeof travelFields>[1]) =>
        update(travelFields(node, { travelDistance: node.travelDistance, travelUnit: node.travelUnit, travelMode: node.travelMode, ...fields }));

    return (
        <div className="dms-field">
            <span>Journey</span>
            <div className="dms-travel-row">
                <label className="dms-field dms-small">
                    <span>Distance</span>
                    <input
                        inputMode="decimal"
                        value={text}
                        placeholder="0"
                        disabled={node.skipped}
                        onChange={(e) => {
                            setText(e.target.value);
                            const value = Math.max(0, Number(e.target.value.replace(",", ".")) || 0);
                            change({ travelDistance: value || undefined });
                        }}
                    />
                </label>
                <label className="dms-field dms-small">
                    <span>Unit</span>
                    <select value={unit} disabled={node.skipped} onChange={(e) => change({ travelUnit: e.target.value as "mi" | "km" })}>
                        <option value="mi">miles</option>
                        <option value="km">km</option>
                    </select>
                </label>
                <label className="dms-field dms-travel-mode">
                    <span>Going by</span>
                    <select value={mode.id} disabled={node.skipped} onChange={(e) => change({ travelMode: e.target.value })}>
                        {TRAVEL_MODES.map((m) => <option key={m.id} value={m.id}>{m.label}</option>)}
                    </select>
                </label>
            </div>
            <p className="dms-inspector-help">
                About {Math.round(perDay)} {unit} a day ({mode.hoursPerDay} h on the move).
                {minutes > 0 && <> This trip takes <strong>{formatDuration(minutes)}</strong>.</>}
            </p>
        </div>
    );
}

// A time card's skip length, and its skip / undo buttons.
function TimeSkipField({ node, update, onTimeSkip }: { node: BoardNode; update: (fields: Partial<BoardNode>) => void; onTimeSkip: (undo: boolean) => void }) {
    const total = node.skipMinutes ?? 0;
    const parts = { days: Math.floor(total / MINUTES_PER_DAY), hours: Math.floor((total % MINUTES_PER_DAY) / 60), minutes: total % 60 };
    const setPart = (key: keyof typeof parts, value: string) => {
        const next = { ...parts, [key]: Math.max(0, Math.trunc(Number(value)) || 0) };
        const minutes = Math.min(365 * MINUTES_PER_DAY, next.days * MINUTES_PER_DAY + Math.min(23, next.hours) * 60 + Math.min(59, next.minutes));
        update({ skipMinutes: minutes || undefined });
    };

    return (
        <div className="dms-field">
            <span>Time skip</span>
            <div className="dms-time-skip">
                {(["days", "hours", "minutes"] as const).map((key) => (
                    <label key={key} className="dms-field dms-small">
                        <span>{key[0].toUpperCase() + key.slice(1)}</span>
                        <input inputMode="numeric" value={parts[key]} disabled={node.skipped} onChange={(e) => setPart(key, e.target.value)} />
                    </label>
                ))}
            </div>
            {total ? (
                <SkipButtons node={node} onTimeSkip={onTimeSkip} />
            ) : (
                <p className="dms-inspector-help">Set a length to put a skip button on the card, e.g. a night's sleep.</p>
            )}
        </div>
    );
}

// Skip / undo for a time or travel card with a skip length.
function SkipButtons({ node, onTimeSkip }: { node: BoardNode; onTimeSkip: (undo: boolean) => void }) {
    const total = node.skipMinutes ?? 0;
    if (!total) return null;
    return node.skipped ? (
        <div className="dms-inspector-buttons">
            <span className="dms-inspector-help">✓ Skipped {formatDuration(total)}.</span>
            <button type="button" className="dms-button dms-button--ghost" onClick={() => onTimeSkip(true)}>↩ Undo skip</button>
        </div>
    ) : (
        <div className="dms-inspector-buttons">
            <button type="button" className="dms-button" onClick={() => onTimeSkip(false)}>⏩ Skip {formatDuration(total)}</button>
        </div>
    );
}

// "3 Harvest, 1492 · in 4 days" for a time card.
function eventWhen(calendar: Calendar, event: CalendarEvent): string {
    const diff = dayNumber(calendar, event) - dayNumber(calendar, calendar.today);
    const relative = diff === 0 ? "today" : diff === 1 ? "tomorrow" : diff > 0 ? `in ${diff} days` : diff === -1 ? "yesterday" : `${-diff} days ago`;
    return `${formatDate(calendar, event)} · ${relative}`;
}

function isTyping(target: EventTarget | null) {
    const element = target as HTMLElement | null;
    return !!element && (element.isContentEditable || ["INPUT", "TEXTAREA", "SELECT"].includes(element.tagName));
}

// Curved connection between the facing sides of two cards.
function linkGeometry(a: BoardNode, aSize: Size, b: BoardNode, bSize: Size) {
    const ac = { x: a.x + aSize.w / 2, y: a.y + aSize.h / 2 };
    const bc = { x: b.x + bSize.w / 2, y: b.y + bSize.h / 2 };
    const dx = bc.x - ac.x;
    const dy = bc.y - ac.y;

    let start: Point, end: Point, c1: Point, c2: Point;
    if (Math.abs(dx) >= Math.abs(dy)) {
        const sign = dx >= 0 ? 1 : -1;
        start = { x: sign > 0 ? a.x + aSize.w : a.x, y: ac.y };
        end = { x: sign > 0 ? b.x : b.x + bSize.w, y: bc.y };
        const bend = Math.max(40, Math.abs(end.x - start.x) / 2);
        c1 = { x: start.x + sign * bend, y: start.y };
        c2 = { x: end.x - sign * bend, y: end.y };
    }
    else {
        const sign = dy >= 0 ? 1 : -1;
        start = { x: ac.x, y: sign > 0 ? a.y + aSize.h : a.y };
        end = { x: bc.x, y: sign > 0 ? b.y : b.y + bSize.h };
        const bend = Math.max(40, Math.abs(end.y - start.y) / 2);
        c1 = { x: start.x, y: start.y + sign * bend };
        c2 = { x: end.x, y: end.y - sign * bend };
    }

    return {
        path: `M ${start.x} ${start.y} C ${c1.x} ${c1.y}, ${c2.x} ${c2.y}, ${end.x} ${end.y}`,
        // Point on the curve at t = 0.5
        mid: { x: (start.x + 3 * c1.x + 3 * c2.x + end.x) / 8, y: (start.y + 3 * c1.y + 3 * c2.y + end.y) / 8 },
    };
}

export default function StoryBoard({ data, setData, onRunEncounter, onOpenNpc, onOpenItem, onOpenNote, onOpenLocation, onOpenCalendar, focusNodeId, onFocused }: StoryBoardProps) {
    const board = activeBoard(data);
    const { view } = board;

    const boardRef = useRef<HTMLDivElement>(null);
    const dragRef = useRef<Drag | null>(null);
    const [connect, setConnect] = useState<{ from: string; point: Point } | null>(null);
    const [selection, setSelection] = useState<Selection>(() => (focusNodeId ? { type: "node", id: focusNodeId } : null));
    const [sizes, setSizes] = useState<Record<string, Size>>({});
    const [newKind, setNewKind] = useState<NodeKind>("scene");
    const [layout, setLayout] = useState<BoardLayout>(loadLayout);
    // The "Previously on…" popup: a saved recap, or the board so far if it was never ended.
    const [recapShown, setRecapShown] = useState<{ recap: StoryRecap; ended: boolean } | null>(null);
    const resizeRef = useRef<{ startY: number; startHeight: number } | null>(null);

    useEffect(() => {
        try {
            localStorage.setItem(LAYOUT_KEY, JSON.stringify(layout));
        }
        catch {
            // Storage can be blocked; the layout just isn't remembered.
        }
    }, [layout]);

    const setPanelOpen = (panelOpen: boolean) => setLayout((current) => ({ ...current, panelOpen }));

    // ---- Dragging the grip under the board changes its height.
    const onResizeDown = (event: ReactPointerEvent<HTMLDivElement>) => {
        if (event.button !== 0) return;
        resizeRef.current = { startY: event.clientY, startHeight: boardRef.current?.offsetHeight ?? 600 };
        event.currentTarget.setPointerCapture(event.pointerId);
    };
    const onResizeMove = (event: ReactPointerEvent<HTMLDivElement>) => {
        const resize = resizeRef.current;
        if (!resize) return;
        const height = Math.max(MIN_BOARD_HEIGHT, Math.round(resize.startHeight + event.clientY - resize.startY));
        setLayout((current) => ({ ...current, height }));
    };
    const onResizeUp = (event: ReactPointerEvent<HTMLDivElement>) => {
        resizeRef.current = null;
        if (event.currentTarget.hasPointerCapture(event.pointerId)) event.currentTarget.releasePointerCapture(event.pointerId);
    };
    const onResizeKey = (event: ReactKeyboardEvent<HTMLDivElement>) => {
        const step = event.shiftKey ? 100 : 40;
        const delta = event.key === "ArrowDown" ? step : event.key === "ArrowUp" ? -step : 0;
        if (!delta) return;
        event.preventDefault();
        const current = boardRef.current?.offsetHeight ?? 600;
        setLayout((l) => ({ ...l, height: Math.max(MIN_BOARD_HEIGHT, current + delta) }));
    };

    const updateBoard = (change: (current: Board) => Board) =>
        setData((current) => updateActiveBoard(current, change));

    const switchBoard = (id: string) => {
        cancelConnect();
        setSelection(null);
        setData((current) => ({ ...current, activeBoardId: id }));
    };

    const addBoard = () => {
        const created = createBoard(`Story board ${data.boards.length + 1}`);
        cancelConnect();
        setSelection(null);
        setData((current) => ({ ...current, boards: [...current.boards, created], activeBoardId: created.id }));
    };

    const renameBoard = (name: string) =>
        setData((current) => ({ ...current, boards: current.boards.map((b) => (b.id === board.id ? { ...b, name } : b)) }));

    const updateNode = (id: string, fields: Partial<BoardNode>) =>
        updateBoard((current) => ({
            ...current,
            nodes: current.nodes.map((n) => (n.id === id ? { ...n, ...fields } : n)),
        }));

    const updateLink = (id: string, fields: Partial<BoardLink>) =>
        updateBoard((current) => ({
            ...current,
            links: current.links.map((l) => (l.id === id ? { ...l, ...fields } : l)),
        }));

    const setView = (change: (current: Board["view"]) => Board["view"]) =>
        updateBoard((current) => ({ ...current, view: change(current.view) }));

    const sizeOf = (id: string) => sizes[id] ?? DEFAULT_SIZE;

    const toWorld = (clientX: number, clientY: number): Point => {
        const rect = boardRef.current!.getBoundingClientRect();
        return { x: (clientX - rect.left - view.x) / view.zoom, y: (clientY - rect.top - view.y) / view.zoom };
    };

    const deleteSelection = () => {
        if (!selection) return;
        updateBoard((current) => (selection.type === "node" ? removeNode(current, selection.id) : removeLink(current, selection.id)));
        setSelection(null);
    };

    const cancelConnect = () => {
        if (dragRef.current?.kind === "connect") dragRef.current = null;
        setConnect(null);
    };

    const addNodeAt = (kind: NodeKind, x: number, y: number, fields: Partial<BoardNode> = {}) => {
        const node = { ...createNode(kind, Math.round(x), Math.round(y)), ...fields };
        updateBoard((current) => ({ ...current, nodes: [...current.nodes, node] }));
        setSelection({ type: "node", id: node.id });
    };

    const addNodeInView = () => {
        const rect = boardRef.current?.getBoundingClientRect();
        const width = rect?.width ?? 600;
        const height = rect?.height ?? 400;
        // Nudge each new card a little so several don't stack exactly.
        const offset = (board.nodes.length % 5) * 24;
        addNodeAt(
            newKind,
            (width / 2 - view.x) / view.zoom - DEFAULT_SIZE.w / 2 + offset,
            (height / 2 - view.y) / view.zoom - DEFAULT_SIZE.h / 2 + offset
        );
    };

    const fitView = () => {
        const rect = boardRef.current?.getBoundingClientRect();
        if (!rect || board.nodes.length === 0) {
            setView(() => ({ x: 0, y: 0, zoom: 1 }));
            return;
        }
        const minX = Math.min(...board.nodes.map((n) => n.x));
        const minY = Math.min(...board.nodes.map((n) => n.y));
        const maxX = Math.max(...board.nodes.map((n) => n.x + sizeOf(n.id).w));
        const maxY = Math.max(...board.nodes.map((n) => n.y + sizeOf(n.id).h));
        const padding = 48;
        const zoom = Math.min(ZOOM_MAX, Math.max(ZOOM_MIN, Math.min(
            (rect.width - padding * 2) / Math.max(1, maxX - minX),
            (rect.height - padding * 2) / Math.max(1, maxY - minY),
            1.25
        )));
        setView(() => ({
            zoom,
            x: rect.width / 2 - ((minX + maxX) / 2) * zoom,
            y: rect.height / 2 - ((minY + maxY) / 2) * zoom,
        }));
    };

    const zoomBy = (factor: number) => {
        const rect = boardRef.current?.getBoundingClientRect();
        setView((current) => zoomAt(current, factor, (rect?.width ?? 0) / 2, (rect?.height ?? 0) / 2));
    };

    // ---- Opened to show a card (e.g. from the NPCs tab): centre it.
    useLayoutEffect(() => {
        if (!focusNodeId) return;
        const rect = boardRef.current?.getBoundingClientRect();
        const node = board.nodes.find((n) => n.id === focusNodeId);
        if (rect && node) {
            setView((current) => ({
                ...current,
                x: rect.width / 2 - (node.x + DEFAULT_SIZE.w / 2) * current.zoom,
                y: rect.height / 2 - (node.y + DEFAULT_SIZE.h / 2) * current.zoom,
            }));
        }
        onFocused();
        // Only when the board opens with a card to show.
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [focusNodeId]);

    // ---- Wheel zoom (needs a non-passive listener to stop the page scrolling)
    useEffect(() => {
        const element = boardRef.current;
        if (!element) return;
        const onWheel = (event: WheelEvent) => {
            event.preventDefault();
            const rect = element.getBoundingClientRect();
            const factor = Math.exp(-event.deltaY * 0.0015);
            setData((current) => updateActiveBoard(current, (b) => ({
                ...b,
                view: zoomAt(b.view, factor, event.clientX - rect.left, event.clientY - rect.top),
            })));
        };
        element.addEventListener("wheel", onWheel, { passive: false });
        return () => element.removeEventListener("wheel", onWheel);
    }, [setData]);

    // ---- Keyboard: delete, escape, nudge with arrows
    useEffect(() => {
        const onKey = (event: KeyboardEvent) => {
            if (event.key === "Escape") {
                cancelConnect();
                setSelection(null);
                return;
            }
            if (isTyping(event.target) || !selection) return;

            if (event.key === "Delete" || event.key === "Backspace") {
                event.preventDefault();
                deleteSelection();
                return;
            }

            const step = event.shiftKey ? 50 : 10;
            const moves: Record<string, Point> = {
                ArrowLeft: { x: -step, y: 0 },
                ArrowRight: { x: step, y: 0 },
                ArrowUp: { x: 0, y: -step },
                ArrowDown: { x: 0, y: step },
            };
            const move = moves[event.key];
            if (move && selection.type === "node") {
                event.preventDefault();
                updateBoard((current) => ({
                    ...current,
                    nodes: current.nodes.map((n) => (n.id === selection.id ? { ...n, x: n.x + move.x, y: n.y + move.y } : n)),
                }));
            }
        };
        window.addEventListener("keydown", onKey);
        return () => window.removeEventListener("keydown", onKey);
    });

    // ---- Pointer handling. The board captures the pointer for every drag so
    // moves keep arriving even when the pointer leaves the card.
    const capture = (event: ReactPointerEvent) => boardRef.current?.setPointerCapture(event.pointerId);

    const onBoardPointerDown = (event: ReactPointerEvent<HTMLDivElement>) => {
        if (event.button !== 0 || event.target !== event.currentTarget) return;
        dragRef.current = { kind: "pan", startX: event.clientX, startY: event.clientY, viewX: view.x, viewY: view.y };
        setSelection(null);
        capture(event);
    };

    const onNodePointerDown = (event: ReactPointerEvent, node: BoardNode) => {
        if (event.button !== 0) return;
        event.stopPropagation();
        dragRef.current = { kind: "node", id: node.id, startX: event.clientX, startY: event.clientY, nodeX: node.x, nodeY: node.y };
        setSelection({ type: "node", id: node.id });
        capture(event);
    };

    const onHandlePointerDown = (event: ReactPointerEvent, node: BoardNode) => {
        if (event.button !== 0) return;
        event.stopPropagation();
        dragRef.current = { kind: "connect", from: node.id };
        setConnect({ from: node.id, point: toWorld(event.clientX, event.clientY) });
        capture(event);
    };

    const onPointerMove = (event: ReactPointerEvent) => {
        const drag = dragRef.current;
        if (!drag) return;
        if (drag.kind === "pan") {
            setView((current) => ({
                ...current,
                x: drag.viewX + event.clientX - drag.startX,
                y: drag.viewY + event.clientY - drag.startY,
            }));
        }
        else if (drag.kind === "node") {
            updateNode(drag.id, {
                x: Math.round(drag.nodeX + (event.clientX - drag.startX) / view.zoom),
                y: Math.round(drag.nodeY + (event.clientY - drag.startY) / view.zoom),
            });
        }
        else {
            const point = toWorld(event.clientX, event.clientY);
            setConnect((current) => current && { ...current, point });
        }
    };

    const onPointerUp = (event: ReactPointerEvent) => {
        const drag = dragRef.current;
        dragRef.current = null;
        if (boardRef.current?.hasPointerCapture(event.pointerId)) boardRef.current.releasePointerCapture(event.pointerId);
        if (drag?.kind !== "connect") return;

        setConnect(null);
        const hit = document.elementFromPoint(event.clientX, event.clientY)?.closest<HTMLElement>("[data-node-id]");
        const to = hit?.dataset.nodeId;
        if (to && to !== drag.from) updateBoard((current) => addLink(current, drag.from, to));
    };

    const onPointerCancel = () => {
        dragRef.current = null;
        setConnect(null);
    };

    const onSize = useCallback((id: string, size: Size) =>
        setSizes((current) => {
            const known = current[id];
            return known && known.w === size.w && known.h === size.h ? current : { ...current, [id]: size };
        }), []);

    // ---- Derived drawing data
    const nodeById = new Map(board.nodes.map((n) => [n.id, n]));
    const titleOf = (id: string) => {
        const node = nodeById.get(id);
        return node ? cardTitle(data, node) : "?";
    };
    const drawnLinks = board.links.flatMap((link) => {
        const from = nodeById.get(link.from);
        const to = nodeById.get(link.to);
        if (!from || !to) return [];
        return [{ link, ...linkGeometry(from, sizeOf(from.id), to, sizeOf(to.id)) }];
    });

    // Which branches the players took, and what that rules out.
    const branches = branchState(board);
    const anyTaken = board.nodes.some((n) => n.taken);
    const onToggleTaken = (id: string) => updateBoard((current) => toggleTaken(current, id));
    const onTimeSkip = (id: string, undo: boolean) => setData((current) => timeSkip(current, id, undo));

    // ---- Ending and resuming stories
    const onEndStory = (id: string) => setData((current) => endStory(current, id));
    const showRecapOf = (boardId: string | undefined) => {
        const saved = latestRecap(data, boardId);
        const from = data.boards.find((b) => b.id === boardId);
        if (saved) setRecapShown({ recap: saved, ended: true });
        else if (from) setRecapShown({ recap: storyRecap(data, from, ""), ended: false });
    };
    const showRecapOn = (node: BoardNode) => {
        if (node.kind === "resume") showRecapOf(node.resumeBoardId);
        else setRecapShown(node.recap ? { recap: node.recap, ended: true } : { recap: storyRecap(data, board, node.id), ended: false });
    };
    // From an End story card: end it if it wasn't, then open a new board that starts by resuming it.
    const startNextBoard = (endId: string) => {
        const resume = { ...createNode("resume", 80, 80), resumeBoardId: board.id };
        const next = { ...createBoard(`Story board ${data.boards.length + 1}`), nodes: [resume] };
        cancelConnect();
        setSelection({ type: "node", id: resume.id });
        setData((current) => {
            const ended = activeBoard(current).nodes.find((n) => n.id === endId)?.recap ? current : endStory(current, endId);
            return { ...ended, boards: [...ended.boards, next], activeBoardId: next.id };
        });
    };
    const boardName = (id: string | undefined) => {
        const found = data.boards.find((b) => b.id === id);
        return found ? found.name || "Untitled" : undefined;
    };

    const connectFrom = connect ? nodeById.get(connect.from) : undefined;
    const selectedNode = selection?.type === "node" ? nodeById.get(selection.id) : undefined;
    const selectedLink = selection?.type === "link" ? board.links.find((l) => l.id === selection.id) : undefined;

    const gridSize = 24 * view.zoom;

    return (
        <div className={layout.panelOpen ? "dms-storyboard" : "dms-storyboard panel-hidden"}>
            <div className="dms-board-area">
                <div className="dms-board-toolbar">
                    <div className="dms-board-add">
                        <select aria-label="Story board" value={board.id} onChange={(e) => switchBoard(e.target.value)}>
                            {data.boards.map((b) => <option key={b.id} value={b.id}>{b.name || "Untitled"}</option>)}
                        </select>
                        <button type="button" className="dms-button dms-button--ghost" onClick={addBoard}>+ New board</button>
                        <span className="dms-toolbar-divider" aria-hidden="true" />
                        <select aria-label="Card type" value={newKind} onChange={(e) => setNewKind(e.target.value as NodeKind)}>
                            {NODE_KINDS.map((k) => <option key={k.value} value={k.value}>{k.label}</option>)}
                        </select>
                        <button type="button" className="dms-button" onClick={addNodeInView}>+ Add card</button>
                        {anyTaken && (
                            <ConfirmButton
                                className="dms-button dms-button--ghost"
                                label="Clear choices"
                                confirmLabel="Click again to clear"
                                onConfirm={() => updateBoard(clearTaken)}
                            />
                        )}
                    </div>
                    <div className="dms-board-zoom">
                        <button type="button" className="dms-icon-button" aria-label="Zoom out" onClick={() => zoomBy(1 / 1.2)}>−</button>
                        <span className="dms-zoom-value">{Math.round(view.zoom * 100)}%</span>
                        <button type="button" className="dms-icon-button" aria-label="Zoom in" onClick={() => zoomBy(1.2)}>+</button>
                        <button type="button" className="dms-button dms-button--ghost" onClick={() => setView(() => ({ x: 0, y: 0, zoom: 1 }))}>Reset</button>
                        <button type="button" className="dms-button dms-button--ghost" onClick={fitView}>Fit</button>
                        <button
                            type="button"
                            className="dms-button dms-button--ghost"
                            aria-expanded={layout.panelOpen}
                            aria-controls="dms-board-panel"
                            onClick={() => setPanelOpen(!layout.panelOpen)}
                        >
                            {layout.panelOpen ? "Hide panel ▸" : "◂ Show panel"}
                        </button>
                    </div>
                </div>

                <div
                    ref={boardRef}
                    className={connect ? "dms-board connecting" : "dms-board"}
                    style={{
                        backgroundSize: `${gridSize}px ${gridSize}px`,
                        backgroundPosition: `${view.x}px ${view.y}px`,
                        ...(layout.height ? { height: layout.height } : {}),
                    }}
                    onPointerDown={onBoardPointerDown}
                    onPointerMove={onPointerMove}
                    onPointerUp={onPointerUp}
                    onPointerCancel={onPointerCancel}
                    onDoubleClick={(event) => {
                        if (event.target !== event.currentTarget) return;
                        const point = toWorld(event.clientX, event.clientY);
                        addNodeAt("note", point.x - DEFAULT_SIZE.w / 2, point.y - 20);
                    }}
                    onDragOver={(event) => {
                        if (Array.from(event.dataTransfer.items).some((i) => i.kind === "file")) event.preventDefault();
                    }}
                    onDrop={(event) => {
                        const file = imageFileIn(event.dataTransfer);
                        if (!file) return;
                        event.preventDefault();
                        const point = toWorld(event.clientX, event.clientY);
                        const title = file.name.replace(/\.[^.]+$/, "") || "Image";
                        readImageFile(file)
                            .then((image) => addNodeAt("image", point.x - DEFAULT_SIZE.w / 2, point.y - 20, { title, image }))
                            .catch(() => {});
                    }}
                >
                    {board.nodes.length === 0 && (
                        <p className="dms-board-empty">
                            Add a card, or double-click the board. Drag the ● on a card onto another card to connect them.
                        </p>
                    )}

                    <div className="dms-world" style={{ transform: `translate(${view.x}px, ${view.y}px) scale(${view.zoom})` }}>
                        <svg className="dms-links" width="1" height="1" aria-hidden="true">
                            <defs>
                                <marker id="dms-arrow" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
                                    <path d="M 0 0 L 10 5 L 0 10 z" className="dms-arrow" />
                                </marker>
                                <marker id="dms-arrow-selected" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
                                    <path d="M 0 0 L 10 5 L 0 10 z" className="dms-arrow selected" />
                                </marker>
                            </defs>
                            {drawnLinks.map(({ link, path }) => {
                                const selected = selection?.type === "link" && selection.id === link.id;
                                return (
                                    <g key={link.id} className={branches.greyLinks.has(link.id) ? "dms-link-group grey" : "dms-link-group"}>
                                        <path d={path} className={selected ? "dms-link selected" : "dms-link"} markerEnd={`url(#${selected ? "dms-arrow-selected" : "dms-arrow"})`} />
                                        <path
                                            d={path}
                                            className="dms-link-hit"
                                            onPointerDown={(event) => {
                                                event.stopPropagation();
                                                setSelection({ type: "link", id: link.id });
                                            }}
                                        />
                                    </g>
                                );
                            })}
                            {connectFrom && connect && (
                                <line
                                    className="dms-link-draft"
                                    x1={connectFrom.x + sizeOf(connectFrom.id).w}
                                    y1={connectFrom.y + sizeOf(connectFrom.id).h / 2}
                                    x2={connect.point.x}
                                    y2={connect.point.y}
                                />
                            )}
                        </svg>

                        {drawnLinks.filter(({ link }) => link.label.trim()).map(({ link, mid }) => (
                            <button
                                key={link.id}
                                type="button"
                                className={[
                                    "dms-link-label",
                                    selection?.type === "link" && selection.id === link.id ? "selected" : "",
                                    branches.greyLinks.has(link.id) ? "grey" : "",
                                ].filter(Boolean).join(" ")}
                                style={{ left: mid.x, top: mid.y }}
                                onPointerDown={(event) => {
                                    event.stopPropagation();
                                    setSelection({ type: "link", id: link.id });
                                }}
                            >
                                {link.label}
                            </button>
                        ))}

                        {board.nodes.map((node) => {
                            const encounter = data.encounters.find((e) => e.id === node.encounterId);
                            const npc = linkedNpc(data, node);
                            const item = linkedItem(data, node);
                            const note = linkedNote(data, node);
                            const location = linkedLocation(data, node);
                            const event = linkedEvent(data, node);
                            return (
                                <NodeCard
                                    key={node.id}
                                    node={node}
                                    selected={selection?.type === "node" && selection.id === node.id}
                                    encounterName={encounter?.name}
                                    outcome={encounter ? encounterOutcome(encounter) : null}
                                    npc={npc}
                                    carrying={npc ? itemsHeldBy(data, npc.id) : []}
                                    onOpenNpc={onOpenNpc}
                                    item={item}
                                    note={note}
                                    onOpenNote={onOpenNote}
                                    location={location}
                                    onOpenLocation={onOpenLocation}
                                    event={event}
                                    eventWhen={event ? eventWhen(data.calendar, event) : ""}
                                    onOpenCalendar={onOpenCalendar}
                                    holder={item ? holderLabel(data, item.holder) : ""}
                                    onOpenItem={onOpenItem}
                                    isChoice={branches.choices.has(node.id)}
                                    grey={branches.greyNodes.has(node.id)}
                                    onToggleTaken={() => onToggleTaken(node.id)}
                                    onTimeSkip={(undo) => onTimeSkip(node.id, undo)}
                                    resumeBoardName={boardName(node.resumeBoardId)}
                                    onEndStory={() => onEndStory(node.id)}
                                    onShowRecap={() => showRecapOn(node)}
                                    onSize={onSize}
                                    onHeaderPointerDown={(event) => onNodePointerDown(event, node)}
                                    onHandlePointerDown={(event) => onHandlePointerDown(event, node)}
                                    onSelect={() => setSelection({ type: "node", id: node.id })}
                                    onOpen={() => {
                                        setSelection({ type: "node", id: node.id });
                                        setPanelOpen(true);
                                    }}
                                />
                            );
                        })}
                    </div>
                </div>
                <div
                    className="dms-board-resize"
                    role="separator"
                    aria-orientation="horizontal"
                    aria-label="Board height (drag, or use the arrow keys)"
                    aria-valuenow={layout.height ?? undefined}
                    tabIndex={0}
                    title="Drag to make the board taller or shorter. Double-click to reset."
                    onPointerDown={onResizeDown}
                    onPointerMove={onResizeMove}
                    onPointerUp={onResizeUp}
                    onPointerCancel={onResizeUp}
                    onKeyDown={onResizeKey}
                    onDoubleClick={() => setLayout((current) => ({ ...current, height: null }))}
                />
                <p className="dms-hint">
                    Drag the background to pan, scroll to zoom. Drag a card by its header. Drag ● onto another card to connect. Drop an image file on the board for an image card. Drag the bar under the board to resize it. Delete removes the selection, Esc cancels.
                    {!layout.panelOpen && " Double-click a card to edit it."}
                </p>
            </div>

            {/* ---------------- Side panel ---------------- */}
            {layout.panelOpen && <aside id="dms-board-panel" className="dms-panel dms-inspector" aria-label="Selected card or connection">
                {selectedNode ? (
                    <NodeInspector
                        node={selectedNode}
                        data={data}
                        update={(fields) => updateNode(selectedNode.id, fields)}
                        isChoice={branches.choices.has(selectedNode.id)}
                        grey={branches.greyNodes.has(selectedNode.id)}
                        onToggleTaken={() => onToggleTaken(selectedNode.id)}
                        onTimeSkip={(undo) => onTimeSkip(selectedNode.id, undo)}
                        onEndStory={() => onEndStory(selectedNode.id)}
                        onShowRecap={() => showRecapOn(selectedNode)}
                        onStartNextBoard={() => startNextBoard(selectedNode.id)}
                        onResumeBoard={(id) => {
                            updateNode(selectedNode.id, { resumeBoardId: id || undefined });
                            // Picking a board shows what happened there last time.
                            if (id) showRecapOf(id);
                        }}
                        onSwitchBoard={switchBoard}
                        onCreateEncounter={() => {
                            const encounter = createEncounter(cardTitle(data, selectedNode) || "New encounter");
                            setData((current) => updateActiveBoard(
                                { ...current, encounters: [...current.encounters, encounter] },
                                (b) => ({ ...b, nodes: b.nodes.map((n) => (n.id === selectedNode.id ? { ...n, encounterId: encounter.id } : n)) })
                            ));
                        }}
                        onRunEncounter={onRunEncounter}
                        onCreateNpc={() => {
                            const npc = createNpc({ name: selectedNode.title || "New NPC" });
                            setData((current) => updateActiveBoard(
                                { ...current, npcs: [...current.npcs, npc], activeNpcId: npc.id },
                                (b) => ({ ...b, nodes: b.nodes.map((n) => (n.id === selectedNode.id ? { ...n, npcId: npc.id } : n)) })
                            ));
                        }}
                        onOpenNpc={onOpenNpc}
                        onCreateItem={() => {
                            const item = createItem({ name: selectedNode.title || "New item" });
                            setData((current) => updateActiveBoard(
                                { ...current, items: [...current.items, item], activeItemId: item.id },
                                (b) => ({ ...b, nodes: b.nodes.map((n) => (n.id === selectedNode.id ? { ...n, itemId: item.id } : n)) })
                            ));
                        }}
                        onOpenItem={onOpenItem}
                        onCreateNote={() => {
                            // The card's text moves into the note, which the card then shows.
                            const note = createNote({ title: selectedNode.title || "New note", body: selectedNode.text });
                            setData((current) => updateActiveBoard(
                                { ...current, notes: [...current.notes, note], activeNoteId: note.id },
                                (b) => ({ ...b, nodes: b.nodes.map((n) => (n.id === selectedNode.id ? { ...n, noteId: note.id, text: "" } : n)) })
                            ));
                        }}
                        onOpenNote={onOpenNote}
                        onUpdateNote={(noteId, fields) => setData((current) => updateNote(current, noteId, fields))}
                        onCreateLocation={() => {
                            const location = createLocation({ name: selectedNode.title || "New location", description: selectedNode.text });
                            setData((current) => updateActiveBoard(
                                { ...current, locations: [...current.locations, location], activeLocationId: location.id },
                                (b) => ({ ...b, nodes: b.nodes.map((n) => (n.id === selectedNode.id ? { ...n, locationId: location.id } : n)) })
                            ));
                        }}
                        onOpenLocation={onOpenLocation}
                        onCreateEvent={() => {
                            // On today's date; move it in the Calendar tab.
                            const event = createEvent(data.calendar.today, { title: selectedNode.title || "New event", notes: selectedNode.text });
                            setData((current) => updateActiveBoard(
                                { ...current, calendar: { ...current.calendar, events: [...current.calendar.events, event] } },
                                (b) => ({ ...b, nodes: b.nodes.map((n) => (n.id === selectedNode.id ? { ...n, eventId: event.id } : n)) })
                            ));
                        }}
                        onOpenCalendar={onOpenCalendar}
                        onSetHolder={(itemId, holder) => setData((current) => ({
                            ...current,
                            items: current.items.map((i) => (i.id === itemId ? { ...i, holder } : i)),
                        }))}
                        onConnect={(to) => updateBoard((current) => addLink(current, selectedNode.id, to))}
                        onSelectLink={(id) => setSelection({ type: "link", id })}
                        onDelete={deleteSelection}
                    />
                ) : selectedLink ? (
                    <LinkInspector
                        link={selectedLink}
                        fromTitle={titleOf(selectedLink.from)}
                        toTitle={titleOf(selectedLink.to)}
                        update={(fields) => updateLink(selectedLink.id, fields)}
                        onReverse={() => {
                            const reversed = { from: selectedLink.to, to: selectedLink.from };
                            if (board.links.some((l) => l.from === reversed.from && l.to === reversed.to)) return;
                            updateLink(selectedLink.id, reversed);
                        }}
                        onDelete={deleteSelection}
                    />
                ) : (
                    <>
                        <h2 className="dms-panel-title">Story board</h2>
                        <label className="dms-field">
                            <span>Board name</span>
                            <input value={board.name} onChange={(e) => renameBoard(e.target.value)} />
                        </label>
                        <p className="dms-inspector-help">
                            Select a card or a connection to edit it here. Switch boards, or start a new one, from the
                            dropdown above the board.
                        </p>
                        <p className="dms-inspector-help">
                            When a card has several branches, tick ✓ on the one the players took. The other branches,
                            and everything only reachable through them, are greyed out.
                        </p>
                        <p className="dms-inspector-help">
                            {board.nodes.length} cards · {board.links.length} connections
                        </p>
                        <ul className="dms-legend">
                            {NODE_KINDS.map((k) => (
                                <li key={k.value}><span className={`dms-swatch dms-node--${k.value}`} />{k.label}</li>
                            ))}
                        </ul>
                        <ConfirmButton
                            className="dms-button dms-button--danger"
                            label="Delete board"
                            confirmLabel={board.nodes.length ? `Delete ${board.nodes.length} cards?` : "Click again to delete"}
                            onConfirm={() => {
                                setSelection(null);
                                setData((current) => removeBoard(current, board.id));
                            }}
                        />
                    </>
                )}
            </aside>}

            {recapShown && <RecapDialog recap={recapShown.recap} ended={recapShown.ended} onClose={() => setRecapShown(null)} />}
        </div>
    );
}

// =====================================
// Card
// =====================================

interface NodeCardProps {
    node: BoardNode;
    selected: boolean;
    encounterName?: string;
    // Who won the linked encounter, once one side is all down.
    outcome: EncounterOutcome | null;
    // The linked NPC, shown as a tag that opens its sheet.
    npc?: Npc;
    // Items the linked NPC carries, as tags too.
    carrying: Item[];
    onOpenNpc: (npcId: string) => void;
    // The linked item, and who has it ("With the party", ...).
    item?: Item;
    holder: string;
    onOpenItem: (itemId: string) => void;
    // The linked note, whose title and text the card shows.
    note?: Note;
    onOpenNote: (noteId: string) => void;
    // The linked location, shown as a tag that opens its sheet.
    location?: Location;
    onOpenLocation: (locationId: string) => void;
    // The linked calendar event, and when it is ("in 3 days").
    event?: CalendarEvent;
    eventWhen: string;
    onOpenCalendar: (date: CalendarDate) => void;
    // One of several branches from the same card, so it can be ticked.
    isChoice: boolean;
    grey: boolean;
    onToggleTaken: () => void;
    // Time cards: skip time, or undo the skip.
    onTimeSkip: (undo: boolean) => void;
    // Resume story cards: the board they carry on from.
    resumeBoardName?: string;
    onEndStory: () => void;
    onShowRecap: () => void;
    onSize: (id: string, size: Size) => void;
    onHeaderPointerDown: (event: ReactPointerEvent) => void;
    onHandlePointerDown: (event: ReactPointerEvent) => void;
    onSelect: () => void;
    // Double-click: select and show the side panel.
    onOpen: () => void;
}

function NodeCard({
    node,
    selected,
    encounterName,
    outcome,
    npc,
    carrying,
    onOpenNpc,
    item,
    holder,
    onOpenItem,
    note,
    onOpenNote,
    location,
    onOpenLocation,
    event,
    eventWhen,
    onOpenCalendar,
    isChoice,
    grey,
    onToggleTaken,
    onTimeSkip,
    resumeBoardName,
    onEndStory,
    onShowRecap,
    onSize,
    onHeaderPointerDown,
    onHandlePointerDown,
    onSelect,
    onOpen,
}: NodeCardProps) {
    const ref = useRef<HTMLDivElement>(null);
    // A linked NPC's or item's name is the card's title.
    const title = npc?.name ?? item?.name ?? note?.title ?? location?.name ?? event?.title ?? node.title;
    // A linked note's text replaces the card's own.
    const text = note ? note.body : node.text;

    // Report the card's size so connections meet its edges.
    useLayoutEffect(() => {
        const element = ref.current;
        if (!element) return;
        const report = () => onSize(node.id, { w: element.offsetWidth, h: element.offsetHeight });
        report();
        const observer = new ResizeObserver(report);
        observer.observe(element);
        return () => observer.disconnect();
    }, [node.id, onSize]);

    return (
        <div
            ref={ref}
            data-node-id={node.id}
            className={[
                "dms-node",
                `dms-node--${node.kind}`,
                selected ? "selected" : "",
                node.taken ? "taken" : "",
                grey ? "grey" : "",
            ].filter(Boolean).join(" ")}
            style={{ transform: `translate(${node.x}px, ${node.y}px)` }}
            tabIndex={0}
            role="button"
            aria-label={`${kindLabel(node.kind)}: ${title}${node.taken ? " (taken)" : grey ? " (not taken)" : ""}`}
            aria-pressed={selected}
            onPointerDown={(event) => {
                event.stopPropagation();
                onSelect();
            }}
            onDoubleClick={(event) => {
                event.stopPropagation();
                onOpen();
            }}
            onKeyDown={(event) => {
                if (event.key === "Enter" || event.key === " ") {
                    event.preventDefault();
                    onOpen();
                }
            }}
        >
            <div className="dms-node-header" onPointerDown={onHeaderPointerDown}>
                <span className="dms-node-kind">
                    {kindLabel(node.kind)}
                    {grey && <span className="dms-node-status">Not taken</span>}
                </span>
                <span className="dms-node-title">{title || "Untitled"}</span>
                {(isChoice || node.taken) && (
                    <button
                        type="button"
                        className={node.taken ? "dms-node-check checked" : "dms-node-check"}
                        aria-pressed={!!node.taken}
                        aria-label={node.taken ? "Players took this branch (click to undo)" : "Mark as the branch the players took"}
                        title={node.taken ? "Players took this branch (click to undo)" : "Mark as the branch the players took"}
                        // Don't start a drag or select the card.
                        onPointerDown={(event) => event.stopPropagation()}
                        onClick={(event) => {
                            event.stopPropagation();
                            onToggleTaken();
                        }}
                    >
                        ✓
                    </button>
                )}
            </div>
            {node.kind === "image" && (node.image
                ? <img className="dms-node-image" src={node.image} alt={node.title} draggable={false} />
                : <p className="dms-node-image-empty">No image yet</p>
            )}
            {npc && (
                <div className="dms-node-npc">
                    {npc.image && <img className="dms-node-npc-portrait" src={npc.image} alt="" draggable={false} />}
                    <div className="dms-node-npc-info">
                        <CardTag label={`👤 ${npc.name || "Unnamed"}`} title={`Open ${npc.name || "this NPC"} in the NPCs tab`} onOpen={() => onOpenNpc(npc.id)} />
                        {(npc.race || npc.location) && (
                            <span className="dms-node-npc-meta">{[npc.race, npc.location].filter(Boolean).join(" · ")}</span>
                        )}
                    </div>
                </div>
            )}
            {carrying.length > 0 && (
                <div className="dms-node-carrying" aria-label="Carrying">
                    {carrying.map((i) => (
                        <CardTag key={i.id} label={`🎒 ${i.name || "Unnamed"}`} title={`Open ${i.name || "this item"} in the Items tab`} onOpen={() => onOpenItem(i.id)} />
                    ))}
                </div>
            )}
            {item && (
                <div className="dms-node-npc">
                    {item.image && <img className="dms-node-item-image" src={item.image} alt="" draggable={false} />}
                    <div className="dms-node-npc-info">
                        <CardTag label={`🎒 ${item.name || "Unnamed"}`} title={`Open ${item.name || "this item"} in the Items tab`} onOpen={() => onOpenItem(item.id)} />
                        <span className="dms-node-npc-meta">
                            {[rarityLabel(item.rarity), itemTypeLabel(item.type)].filter(Boolean).join(" · ")}
                        </span>
                        {itemStatLine(item) && <span className="dms-node-item-stats">{itemStatLine(item)}</span>}
                        <span className={`dms-holder-badge dms-holder--${item.holder.kind}`}>{holder}</span>
                    </div>
                </div>
            )}
            {note && (
                <div className="dms-node-carrying">
                    <CardTag label={note.pinned ? "★ 📝 Note" : "📝 Note"} title={`Open ${note.title || "this note"} in the Notes tab`} onOpen={() => onOpenNote(note.id)} />
                </div>
            )}
            {location && (
                <div className="dms-node-npc-info">
                    <CardTag label={`📍 ${location.name || "Unnamed"}`} title={`Open ${location.name || "this location"} in the Locations tab`} onOpen={() => onOpenLocation(location.id)} />
                    {location.kind && <span className="dms-node-npc-meta">{location.kind}</span>}
                    {location.description && <span className="dms-node-item-stats">{location.description}</span>}
                </div>
            )}
            {event && (
                <div className="dms-node-npc-info">
                    <CardTag label={`🕒 ${eventWhen}`} title="Open this day in the Calendar tab" onOpen={() => onOpenCalendar(event)} />
                    {event.notes && <span className="dms-node-item-stats">{event.notes}</span>}
                </div>
            )}
            {(text || encounterName) && (
                <div className="dms-node-body">
                    {encounterName && (
                        <p className="dms-node-encounter">
                            ⚔ {encounterName}
                            {outcome && <span className={`dms-outcome-tag dms-outcome--${outcome}`}>{OUTCOME_LABELS[outcome]}</span>}
                        </p>
                    )}
                    {text && <p>{text}</p>}
                </div>
            )}
            {node.kind === "travel" && (() => {
                const { mode, unit, distance } = cardTravel(node);
                return (
                    <p className="dms-node-travel">
                        🧭 {distance ? `${distance} ${unit}` : "No distance yet"} · {mode.label}
                    </p>
                );
            })()}
            {(node.kind === "time" || node.kind === "travel") && !!node.skipMinutes && (
                <div className="dms-node-skip">
                    {node.skipped ? (
                        <>
                            <span className="dms-node-skip-done">✓ Skipped {formatDuration(node.skipMinutes)}</span>
                            <CardButton label="↩ Undo" title="Move the calendar back again" onClick={() => onTimeSkip(true)} />
                        </>
                    ) : (
                        <CardButton label={`⏩ Skip ${formatDuration(node.skipMinutes)}`} title="Move the calendar forward" onClick={() => onTimeSkip(false)} />
                    )}
                </div>
            )}
            {node.kind === "end" && (
                <div className="dms-node-skip">
                    {node.recap ? (
                        <>
                            <span className="dms-node-skip-done">■ Ended · {node.recap.steps.length} cards</span>
                            <CardButton label="📜 Recap" title="Show what happened on this board" onClick={onShowRecap} />
                        </>
                    ) : (
                        <CardButton label="■ End story" title="Save everything that happened on the way to this card" onClick={onEndStory} />
                    )}
                </div>
            )}
            {node.kind === "resume" && (
                <div className="dms-node-skip">
                    {resumeBoardName !== undefined ? (
                        <CardButton label={`📜 Previously on ${resumeBoardName}`} title="Show what happened last time" onClick={onShowRecap} />
                    ) : (
                        <span className="dms-node-npc-meta">Pick a board to resume</span>
                    )}
                </div>
            )}
            <span
                className="dms-node-handle"
                title="Drag onto another card to connect"
                onPointerDown={onHandlePointerDown}
            />
        </div>
    );
}

// A button on a card that works without dragging or selecting the card.
function CardButton({ label, title, onClick }: { label: string; title: string; onClick: () => void }) {
    return (
        <button
            type="button"
            className="dms-node-skip-button"
            title={title}
            onPointerDown={(event) => event.stopPropagation()}
            onClick={(event) => {
                event.stopPropagation();
                onClick();
            }}
        >
            {label}
        </button>
    );
}

// A tag on a card that opens the linked NPC or item, without dragging or selecting the card.
function CardTag({ label, title, onOpen }: { label: string; title: string; onOpen: () => void }) {
    return (
        <button
            type="button"
            className="dms-npc-tag"
            title={title}
            onPointerDown={(event) => event.stopPropagation()}
            onClick={(event) => {
                event.stopPropagation();
                onOpen();
            }}
        >
            {label}
        </button>
    );
}

// =====================================
// Inspectors
// =====================================

interface NodeInspectorProps {
    node: BoardNode;
    data: DmScreenData;
    update: (fields: Partial<BoardNode>) => void;
    isChoice: boolean;
    grey: boolean;
    onToggleTaken: () => void;
    onTimeSkip: (undo: boolean) => void;
    onEndStory: () => void;
    onShowRecap: () => void;
    onStartNextBoard: () => void;
    onResumeBoard: (boardId: string) => void;
    onSwitchBoard: (boardId: string) => void;
    onCreateEncounter: () => void;
    onRunEncounter: (encounterId: string) => void;
    onCreateNpc: () => void;
    onOpenNpc: (npcId: string) => void;
    onCreateItem: () => void;
    onOpenItem: (itemId: string) => void;
    onCreateNote: () => void;
    onOpenNote: (noteId: string) => void;
    onUpdateNote: (noteId: string, fields: Partial<Pick<Note, "title" | "body">>) => void;
    onCreateLocation: () => void;
    onOpenLocation: (locationId: string) => void;
    onCreateEvent: () => void;
    onOpenCalendar: (date: CalendarDate) => void;
    onSetHolder: (itemId: string, holder: ItemHolder) => void;
    onConnect: (to: string) => void;
    onSelectLink: (id: string) => void;
    onDelete: () => void;
}

function NodeInspector({
    node,
    data,
    update,
    isChoice,
    grey,
    onToggleTaken,
    onTimeSkip,
    onEndStory,
    onShowRecap,
    onStartNextBoard,
    onResumeBoard,
    onSwitchBoard,
    onCreateEncounter,
    onRunEncounter,
    onCreateNpc,
    onOpenNpc,
    onCreateItem,
    onOpenItem,
    onCreateNote,
    onOpenNote,
    onUpdateNote,
    onCreateLocation,
    onOpenLocation,
    onCreateEvent,
    onOpenCalendar,
    onSetHolder,
    onConnect,
    onSelectLink,
    onDelete,
}: NodeInspectorProps) {
    const { id: boardId, nodes, links } = activeBoard(data);
    const carriedOnIn = data.boards.filter((b) => b.nodes.some((n) => n.resumeBoardId === boardId));
    const npc = linkedNpc(data, node);
    const item = linkedItem(data, node);
    const note = linkedNote(data, node);
    const location = linkedLocation(data, node);
    const event = linkedEvent(data, node);
    // A linked NPC, item, location or event owns the card's name.
    const linkedName = npc?.name ?? item?.name ?? location?.name ?? event?.title;
    const sortedEvents = [...data.calendar.events].sort((a, b) => dayNumber(data.calendar, a) - dayNumber(data.calendar, b));
    const title = (id: string) => {
        const other = nodes.find((n) => n.id === id);
        return (other && cardTitle(data, other)) || "Untitled";
    };
    const outgoing = links.filter((l) => l.from === node.id);
    const incoming = links.filter((l) => l.to === node.id);
    const connectable = nodes.filter((n) => n.id !== node.id && !outgoing.some((l) => l.to === n.id));
    const linkedEncounter = data.encounters.find((e) => e.id === node.encounterId);
    const linkedOutcome = linkedEncounter ? encounterOutcome(linkedEncounter) : null;

    return (
        <>
            <h2 className="dms-panel-title">Card</h2>

            {(isChoice || node.taken) && (
                <div className="dms-inspector-section dms-branch-status">
                    <button
                        type="button"
                        className={node.taken ? "dms-button" : "dms-button dms-button--ghost"}
                        aria-pressed={!!node.taken}
                        onClick={onToggleTaken}
                    >
                        {node.taken ? "✓ Players took this branch" : "✓ Mark as taken"}
                    </button>
                    {grey && !node.taken && <p className="dms-inspector-help">Greyed out: the players took another branch.</p>}
                </div>
            )}
            {grey && !isChoice && !node.taken && (
                <p className="dms-inspector-help">Greyed out: it's only reachable through a branch the players didn't take.</p>
            )}

            {/* An NPC card is either linked to a named NPC, which then owns its
                name, or unlinked and written by hand like any other card. */}
            {(node.kind === "npc" || npc) && (
                <div className="dms-inspector-section">
                    <label className="dms-field">
                        <span>Named NPC</span>
                        <select
                            value={npc?.id ?? ""}
                            onChange={(e) => {
                                const id = e.target.value;
                                // Unlinking keeps the name, so the card doesn't jump back to an old title.
                                update(id ? { npcId: id } : { npcId: undefined, title: npc?.name ?? node.title });
                            }}
                        >
                            <option value="">Not linked (write it yourself)</option>
                            {data.npcs.map((n) => <option key={n.id} value={n.id}>{n.name || "Unnamed"}</option>)}
                        </select>
                    </label>
                    <div className="dms-inspector-buttons">
                        {npc ? (
                            <button type="button" className="dms-button" onClick={() => onOpenNpc(npc.id)}>
                                Open NPC →
                            </button>
                        ) : (
                            <button type="button" className="dms-button dms-button--ghost" onClick={onCreateNpc}>
                                + Create NPC from this card
                            </button>
                        )}
                    </div>
                </div>
            )}

            {/* Item cards work the same way, plus who has the item right now. */}
            {(node.kind === "item" || item) && (
                <div className="dms-inspector-section">
                    <label className="dms-field">
                        <span>Item</span>
                        <select
                            value={item?.id ?? ""}
                            onChange={(e) => {
                                const id = e.target.value;
                                update(id ? { itemId: id } : { itemId: undefined, title: item?.name ?? node.title });
                            }}
                        >
                            <option value="">Not linked (write it yourself)</option>
                            {data.items.map((i) => <option key={i.id} value={i.id}>{i.name || "Unnamed"}</option>)}
                        </select>
                    </label>
                    {item && (
                        <HolderField id={`card-${node.id}`} holder={item.holder} data={data} onChange={(holder) => onSetHolder(item.id, holder)} />
                    )}
                    <div className="dms-inspector-buttons">
                        {item ? (
                            <button type="button" className="dms-button" onClick={() => onOpenItem(item.id)}>
                                Open item →
                            </button>
                        ) : (
                            <button type="button" className="dms-button dms-button--ghost" onClick={onCreateItem}>
                                + Create item from this card
                            </button>
                        )}
                    </div>
                </div>
            )}

            {/* Note cards link to a note from the Notes tab. Unlike NPCs and
                items, the note is edited right here: its title and text are
                all there is to it. */}
            {(node.kind === "note" || note) && !npc && !item && (
                <div className="dms-inspector-section">
                    <label className="dms-field">
                        <span>Note</span>
                        <select
                            value={note?.id ?? ""}
                            onChange={(e) => {
                                const id = e.target.value;
                                // Unlinking keeps the note's text on the card.
                                update(id ? { noteId: id } : { noteId: undefined, title: note?.title ?? node.title, text: note?.body ?? node.text });
                            }}
                        >
                            <option value="">Not linked (write it yourself)</option>
                            {sortedNotes(data.notes).map((n) => <option key={n.id} value={n.id}>{n.pinned ? "★ " : ""}{n.title || "Untitled"}</option>)}
                        </select>
                    </label>
                    <div className="dms-inspector-buttons">
                        {note ? (
                            <button type="button" className="dms-button" onClick={() => onOpenNote(note.id)}>
                                Open in Notes →
                            </button>
                        ) : (
                            <button type="button" className="dms-button dms-button--ghost" onClick={onCreateNote}>
                                + Create note from this card
                            </button>
                        )}
                    </div>
                </div>
            )}

            {/* Location cards link to a sheet in the Locations tab, like NPC cards. */}
            {(node.kind === "location" || location) && !npc && !item && !note && (
                <div className="dms-inspector-section">
                    <label className="dms-field">
                        <span>Location</span>
                        <select
                            value={location?.id ?? ""}
                            onChange={(e) => {
                                const id = e.target.value;
                                update(id ? { locationId: id } : { locationId: undefined, title: location?.name ?? node.title });
                            }}
                        >
                            <option value="">Not linked (write it yourself)</option>
                            {data.locations.map((l) => <option key={l.id} value={l.id}>{l.name || "Unnamed"}{l.kind && ` (${l.kind})`}</option>)}
                        </select>
                    </label>
                    <div className="dms-inspector-buttons">
                        {location ? (
                            <button type="button" className="dms-button" onClick={() => onOpenLocation(location.id)}>
                                Open location →
                            </button>
                        ) : (
                            <button type="button" className="dms-button dms-button--ghost" onClick={onCreateLocation}>
                                + Create location from this card
                            </button>
                        )}
                    </div>
                </div>
            )}

            {/* Time cards link to an event on the calendar and show when it is. */}
            {(node.kind === "time" || event) && !npc && !item && !note && !location && (
                <div className="dms-inspector-section">
                    <label className="dms-field">
                        <span>Calendar event</span>
                        <select
                            value={event?.id ?? ""}
                            onChange={(e) => {
                                const id = e.target.value;
                                update(id ? { eventId: id } : { eventId: undefined, title: event?.title ?? node.title });
                            }}
                        >
                            <option value="">Not linked (write it yourself)</option>
                            {sortedEvents.map((ev) => (
                                <option key={ev.id} value={ev.id}>{ev.title || "Untitled"} · {formatDate(data.calendar, ev)}</option>
                            ))}
                        </select>
                    </label>
                    {event && <p className="dms-inspector-help">🕒 {eventWhen(data.calendar, event)}</p>}
                    <TimeSkipField node={node} update={update} onTimeSkip={onTimeSkip} />
                    <div className="dms-inspector-buttons">
                        {event ? (
                            <button type="button" className="dms-button" onClick={() => onOpenCalendar(event)}>
                                Open in Calendar →
                            </button>
                        ) : (
                            <button type="button" className="dms-button dms-button--ghost" onClick={onCreateEvent}>
                                + Create event from this card
                            </button>
                        )}
                    </div>
                </div>
            )}

            {/* Travel cards work out the trip's length and skip it on the calendar. */}
            {node.kind === "travel" && !npc && !item && !note && !location && !event && (
                <div className="dms-inspector-section">
                    <TravelField key={node.id} node={node} update={update} />
                    <SkipButtons node={node} onTimeSkip={onTimeSkip} />
                </div>
            )}

            {note ? (
                <>
                    <label className="dms-field">
                        <span>Title</span>
                        <input value={note.title} onChange={(e) => onUpdateNote(note.id, { title: e.target.value })} />
                    </label>
                    <label className="dms-field">
                        <span>Note text</span>
                        <textarea rows={10} value={note.body} onChange={(e) => onUpdateNote(note.id, { body: e.target.value })} />
                    </label>
                    <p className="dms-inspector-help">This edits the note in the Notes tab, and every card linked to it.</p>
                </>
            ) : linkedName !== undefined ? (
                <div className="dms-field">
                    <span>Title</span>
                    <p className="dms-locked-value">{linkedName || "Unnamed"}</p>
                    <p className="dms-inspector-help">
                        {npc
                            ? "The name, race, stats and image come from the NPCs tab. Unlink the NPC to write this card yourself."
                            : item
                                ? "The name, details and image come from the Items tab. Unlink the item to write this card yourself."
                                : location
                                    ? "The name, type and description come from the Locations tab. Unlink it to write this card yourself."
                                    : "The title and date come from the Calendar tab. Unlink the event to write this card yourself."}
                    </p>
                </div>
            ) : (
                <>
                    <label className="dms-field">
                        <span>Title</span>
                        <input value={node.title} onChange={(e) => update({ title: e.target.value })} />
                    </label>
                    <label className="dms-field">
                        <span>Type</span>
                        <select value={node.kind} onChange={(e) => update({ kind: e.target.value as NodeKind })}>
                            {NODE_KINDS.map((k) => <option key={k.value} value={k.value}>{k.label}</option>)}
                        </select>
                    </label>
                </>
            )}
            {!note && (
                <label className="dms-field">
                    <span>Notes</span>
                    <textarea rows={6} value={node.text} onChange={(e) => update({ text: e.target.value })} />
                </label>
            )}

            {node.kind === "end" && (
                <div className="dms-inspector-section">
                    <p className="dms-inspector-help">
                        Ending the story saves every card leading here that wasn't greyed out, which branches the
                        players took, and how fights went. A Resume story card on another board shows it.
                    </p>
                    {node.recap && (
                        <p className="dms-inspector-help">
                            Ended {new Date(node.recap.endedAt).toLocaleString()}{node.recap.endedOn && ` (${node.recap.endedOn} in game)`} · {node.recap.steps.length} cards
                        </p>
                    )}
                    <div className="dms-inspector-buttons">
                        <button type="button" className={node.recap ? "dms-button dms-button--ghost" : "dms-button"} onClick={onEndStory}>
                            {node.recap ? "↻ Update recap" : "■ End story"}
                        </button>
                        <button type="button" className="dms-button dms-button--ghost" onClick={onShowRecap}>
                            📜 {node.recap ? "Show recap" : "Preview recap"}
                        </button>
                        <button type="button" className="dms-button dms-button--ghost" onClick={onStartNextBoard}>
                            + Carry on in a new board →
                        </button>
                    </div>
                    {carriedOnIn.length > 0 && (
                        <>
                            <h3 className="dms-subtitle">Carried on in</h3>
                            <ul className="dms-connection-list">
                                {carriedOnIn.map((b) => (
                                    <li key={b.id}>
                                        <button type="button" className="dms-link-button" onClick={() => onSwitchBoard(b.id)}>→ {b.name || "Untitled"}</button>
                                    </li>
                                ))}
                            </ul>
                        </>
                    )}
                </div>
            )}

            {node.kind === "resume" && (
                <div className="dms-inspector-section">
                    <label className="dms-field">
                        <span>Carry on from</span>
                        <select value={node.resumeBoardId ?? ""} onChange={(e) => onResumeBoard(e.target.value)}>
                            <option value="">Pick a board</option>
                            {data.boards.filter((b) => b.id !== boardId).map((b) => (
                                <option key={b.id} value={b.id}>{b.name || "Untitled"}{latestRecap(data, b.id) ? "" : " (not ended yet)"}</option>
                            ))}
                        </select>
                    </label>
                    {node.resumeBoardId && (
                        <div className="dms-inspector-buttons">
                            <button type="button" className="dms-button" onClick={onShowRecap}>📜 Previously on…</button>
                            <button type="button" className="dms-button dms-button--ghost" onClick={() => onSwitchBoard(node.resumeBoardId!)}>
                                Go to that board →
                            </button>
                        </div>
                    )}
                </div>
            )}

            {node.kind === "image" && <ImageField image={node.image} alt={node.title} onChange={(image) => update({ image })} />}

            {node.kind === "encounter" && (
                <div className="dms-inspector-section">
                    <label className="dms-field">
                        <span>Tracker encounter</span>
                        <select
                            value={node.encounterId ?? ""}
                            onChange={(e) => update({ encounterId: e.target.value || undefined })}
                        >
                            <option value="">Not linked</option>
                            {data.encounters.map((e) => <option key={e.id} value={e.id}>{e.name || "Untitled"}</option>)}
                        </select>
                    </label>
                    {linkedOutcome && (
                        <p className={`dms-outcome dms-outcome--${linkedOutcome}`}>
                            <strong>Combat over: {OUTCOME_LABELS[linkedOutcome]}.</strong>
                        </p>
                    )}
                    <div className="dms-inspector-buttons">
                        {node.encounterId ? (
                            <button type="button" className="dms-button" onClick={() => onRunEncounter(node.encounterId!)}>
                                Run in tracker →
                            </button>
                        ) : (
                            <button type="button" className="dms-button dms-button--ghost" onClick={onCreateEncounter}>
                                + Create encounter
                            </button>
                        )}
                    </div>
                </div>
            )}

            <div className="dms-inspector-section">
                <h3 className="dms-subtitle">Connections</h3>
                {outgoing.length + incoming.length === 0 && <p className="dms-inspector-help">None yet.</p>}
                <ul className="dms-connection-list">
                    {outgoing.map((l) => (
                        <li key={l.id}>
                            <button type="button" className="dms-link-button" onClick={() => onSelectLink(l.id)}>
                                → {title(l.to)}{l.label && ` (${l.label})`}
                            </button>
                        </li>
                    ))}
                    {incoming.map((l) => (
                        <li key={l.id}>
                            <button type="button" className="dms-link-button" onClick={() => onSelectLink(l.id)}>
                                ← {title(l.from)}{l.label && ` (${l.label})`}
                            </button>
                        </li>
                    ))}
                </ul>
                {connectable.length > 0 && (
                    <label className="dms-field">
                        <span>Connect to…</span>
                        <select value="" onChange={(e) => e.target.value && onConnect(e.target.value)}>
                            <option value="">Pick a card</option>
                            {connectable.map((n) => <option key={n.id} value={n.id}>{cardTitle(data, n) || "Untitled"}</option>)}
                        </select>
                    </label>
                )}
            </div>

            <ConfirmButton className="dms-button dms-button--danger" label="Delete card" onConfirm={onDelete} />
        </>
    );
}

interface LinkInspectorProps {
    link: BoardLink;
    fromTitle: string;
    toTitle: string;
    update: (fields: Partial<BoardLink>) => void;
    onReverse: () => void;
    onDelete: () => void;
}

function LinkInspector({ link, fromTitle, toTitle, update, onReverse, onDelete }: LinkInspectorProps) {
    return (
        <>
            <h2 className="dms-panel-title">Connection</h2>
            <p className="dms-connection-route">
                <strong>{fromTitle || "Untitled"}</strong> → <strong>{toTitle || "Untitled"}</strong>
            </p>
            <label className="dms-field">
                <span>Label</span>
                <input
                    value={link.label}
                    placeholder="e.g. if they spare the guard"
                    autoFocus
                    onChange={(e) => update({ label: e.target.value })}
                />
            </label>
            <div className="dms-inspector-buttons">
                <button type="button" className="dms-button dms-button--ghost" onClick={onReverse}>⇄ Reverse</button>
                <button type="button" className="dms-button dms-button--danger" onClick={onDelete}>Delete connection</button>
            </div>
        </>
    );
}
