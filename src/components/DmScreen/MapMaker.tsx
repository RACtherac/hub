import {
    useEffect,
    useRef,
    useState,
    type Dispatch,
    type DragEvent as ReactDragEvent,
    type PointerEvent as ReactPointerEvent,
    type SetStateAction,
} from "react";

import {
    ASSET_CATEGORIES,
    ASSETS,
    BRUSHES,
    BRUSH_KEYS,
    GRID,
    GROUNDS,
    MAP_ZOOM_MAX,
    MAP_ZOOM_MIN,
    ROOM_FLOORS,
    ROOM_WALL,
    assetInfo,
    createItem,
    createMap,
    duplicateItem,
    fogBox,
    groundStyle,
    mapBounds,
    moveStroke,
    normalizeRotation,
    restackItem,
    revealRoom,
    roomFromCorners,
    simplifyPoints,
    snapItem,
    strokePath,
    zoomMapAt,
    type AssetCategory,
    type BattleMap,
    type Brush,
    type FogOp,
    type Ground,
    type MapItem,
    type MapRoom,
    type MapStroke,
    type MapView,
    type RoomFloor,
} from "../../utils/dmMap";
import type { DmScreenData } from "../../utils/dmScreen";
import { makeId } from "../../utils/makeId";
import ConfirmButton from "./ConfirmButton";
import { FogLayer, MapContent, StrokeShape } from "./MapLayers";
import { AssetIcon } from "./mapAssets";

interface MapMakerProps {
    data: DmScreenData;
    setData: Dispatch<SetStateAction<DmScreenData>>;
}

type Tool = "select" | "erase" | "room" | "fog-reveal" | "fog-hide" | Brush;

type Selection = { type: "item" | "stroke" | "room"; id: string } | null;

// `changed` is set on the first real movement, so a plain click doesn't add
// an undo step.
type Drag =
    | { kind: "pan"; startX: number; startY: number; viewX: number; viewY: number }
    | { kind: "move-item"; id: string; startX: number; startY: number; itemX: number; itemY: number; changed: boolean }
    | { kind: "move-stroke"; id: string; startX: number; startY: number; original: MapStroke; changed: boolean }
    | { kind: "rotate"; id: string; changed: boolean }
    | { kind: "scale"; id: string; startDistance: number; startScale: number; changed: boolean }
    | { kind: "move-room"; id: string; startX: number; startY: number; roomX: number; roomY: number; changed: boolean }
    | { kind: "draw" }
    | { kind: "erase"; changed: boolean }
    // A box being dragged out for a room or a fog box.
    | { kind: "box"; x: number; y: number }
    | { kind: "fog-brush" };

interface Draft {
    brush: Brush;
    width: number;
    color?: string;
    points: number[];
}

interface Point { x: number; y: number }

const ASSET_MIME = "application/x-dms-map-asset";
const HISTORY_LIMIT = 100;
const PLAYER_WINDOW = "dms-player-view";

const brushLabel = (brush: Brush) => BRUSHES[brush].label;
const assetLabel = (key: string) => assetInfo(key)?.label ?? key;
const isBrush = (tool: Tool): tool is Brush => (BRUSH_KEYS as string[]).includes(tool);
const isFogTool = (tool: Tool): tool is "fog-reveal" | "fog-hide" => tool === "fog-reveal" || tool === "fog-hide";

function isTyping(target: EventTarget | null) {
    const element = target as HTMLElement | null;
    return !!element && (element.isContentEditable || ["INPUT", "TEXTAREA", "SELECT"].includes(element.tagName));
}

export default function MapMaker({ data, setData }: MapMakerProps) {
    const map = data.maps.find((m) => m.id === data.activeMapId) ?? data.maps[0];
    const { view } = map;

    const boardRef = useRef<HTMLDivElement>(null);
    const layerRef = useRef<SVGGElement>(null);
    const dragRef = useRef<Drag | null>(null);
    const spaceHeld = useRef(false);
    const history = useRef<{ past: BattleMap[]; future: BattleMap[] }>({ past: [], future: [] });

    const [tool, setTool] = useState<Tool>("select");
    const [selection, setSelection] = useState<Selection>(null);
    const [draft, setDraft] = useState<Draft | null>(null);
    const [category, setCategory] = useState<AssetCategory>("buildings");
    const [widths, setWidths] = useState<Record<Brush, number>>(
        () => Object.fromEntries(BRUSH_KEYS.map((b) => [b, BRUSHES[b].width])) as Record<Brush, number>
    );
    const [inkColor, setInkColor] = useState("#1c1c1c");
    const [snap, setSnap] = useState(true);
    const [historySize, setHistorySize] = useState({ past: 0, future: 0 });
    const [exporting, setExporting] = useState(false);
    const [roomFloor, setRoomFloor] = useState<RoomFloor>("flagstone");
    const [fogShape, setFogShape] = useState<"brush" | "box">("box");
    const [fogWidth, setFogWidth] = useState(GRID * 3);
    // A room or fog box being dragged out, in world units.
    const [box, setBox] = useState<{ x1: number; y1: number; x2: number; y2: number } | null>(null);
    const [fogDraft, setFogDraft] = useState<FogOp | null>(null);

    // ---- Changing the map

    const updateMap = (change: (current: BattleMap) => BattleMap) =>
        setData((current) => ({
            ...current,
            maps: current.maps.map((m) => (m.id === map.id ? change(m) : m)),
        }));

    const setView = (change: (current: MapView) => MapView) =>
        updateMap((current) => ({ ...current, view: change(current.view) }));

    const syncHistory = () =>
        setHistorySize({ past: history.current.past.length, future: history.current.future.length });

    // Call before a change that should be undoable.
    const checkpoint = () => {
        const { past } = history.current;
        history.current = { past: [...past.slice(-(HISTORY_LIMIT - 1)), map], future: [] };
        syncHistory();
    };

    const change = (apply: (current: BattleMap) => BattleMap) => {
        checkpoint();
        updateMap(apply);
    };

    // Undo and redo keep the current pan and zoom.
    const undo = () => {
        const { past, future } = history.current;
        const previous = past[past.length - 1];
        if (!previous) return;
        history.current = { past: past.slice(0, -1), future: [map, ...future] };
        updateMap((current) => ({ ...previous, view: current.view }));
        setSelection(null);
        syncHistory();
    };

    const redo = () => {
        const { past, future } = history.current;
        const next = future[0];
        if (!next) return;
        history.current = { past: [...past, map], future: future.slice(1) };
        updateMap((current) => ({ ...next, view: current.view }));
        setSelection(null);
        syncHistory();
    };

    // Each map has its own history.
    useEffect(() => {
        history.current = { past: [], future: [] };
        setSelection(null);
        syncHistory();
    }, [map.id]);

    const updateItem = (id: string, fields: Partial<MapItem>) =>
        updateMap((current) => ({ ...current, items: current.items.map((i) => (i.id === id ? { ...i, ...fields } : i)) }));

    const updateStroke = (id: string, fields: Partial<MapStroke>) =>
        updateMap((current) => ({ ...current, strokes: current.strokes.map((s) => (s.id === id ? { ...s, ...fields } : s)) }));

    const deleteSelection = () => {
        if (!selection) return;
        change((current) => ({
            ...current,
            items: selection.type === "item" ? current.items.filter((i) => i.id !== selection.id) : current.items,
            strokes: selection.type === "stroke" ? current.strokes.filter((s) => s.id !== selection.id) : current.strokes,
            rooms: selection.type === "room" ? current.rooms.filter((r) => r.id !== selection.id) : current.rooms,
        }));
        setSelection(null);
    };

    const updateRoom = (id: string, fields: Partial<MapRoom>) =>
        change((current) => ({ ...current, rooms: current.rooms.map((r) => (r.id === id ? { ...r, ...fields } : r)) }));

    const addFogOp = (op: FogOp) => change((current) => ({ ...current, fog: { ...current.fog, ops: [...current.fog.ops, op] } }));

    const duplicateSelected = () => {
        if (selection?.type !== "item") return;
        const { copy } = duplicateItem(map, selection.id);
        if (!copy) return;
        change((current) => ({ ...current, items: [...current.items, snap ? snapItem(copy) : copy] }));
        setSelection({ type: "item", id: copy.id });
    };

    const rotateSelected = (degrees: number) => {
        if (selection?.type !== "item") return;
        const item = map.items.find((i) => i.id === selection.id);
        if (!item) return;
        change((current) => ({
            ...current,
            items: current.items.map((i) => {
                if (i.id !== item.id) return i;
                const rotated = { ...i, rotation: normalizeRotation(i.rotation + degrees) };
                return snap ? snapItem(rotated) : rotated;
            }),
        }));
    };

    // ---- Coordinates

    const toWorld = (clientX: number, clientY: number): Point => {
        const rect = boardRef.current!.getBoundingClientRect();
        return { x: (clientX - rect.left - view.x) / view.zoom, y: (clientY - rect.top - view.y) / view.zoom };
    };

    const viewCentre = (): Point => {
        const rect = boardRef.current?.getBoundingClientRect();
        return {
            x: ((rect?.width ?? 600) / 2 - view.x) / view.zoom,
            y: ((rect?.height ?? 400) / 2 - view.y) / view.zoom,
        };
    };

    const placeAsset = (asset: string, x: number, y: number) => {
        let item = createItem(asset, x, y);
        if (snap) item = snapItem(item);
        change((current) => ({ ...current, items: [...current.items, item] }));
        setSelection({ type: "item", id: item.id });
        setTool("select");
    };

    const addAssetInView = (asset: string) => {
        const centre = viewCentre();
        // Nudge each new piece a little so several don't stack exactly.
        const offset = (map.items.length % 5) * (GRID / 2);
        placeAsset(asset, centre.x + offset, centre.y + offset);
    };

    const zoomBy = (factor: number) => {
        const rect = boardRef.current?.getBoundingClientRect();
        setView((current) => zoomMapAt(current, factor, (rect?.width ?? 0) / 2, (rect?.height ?? 0) / 2));
    };

    const fitView = () => {
        const rect = boardRef.current?.getBoundingClientRect();
        const bounds = mapBounds(map);
        if (!rect || !bounds) {
            setView(() => ({ x: 0, y: 0, zoom: 1 }));
            return;
        }
        const padding = 48;
        const zoom = Math.min(MAP_ZOOM_MAX, Math.max(MAP_ZOOM_MIN, Math.min(
            (rect.width - padding * 2) / Math.max(1, bounds.maxX - bounds.minX),
            (rect.height - padding * 2) / Math.max(1, bounds.maxY - bounds.minY),
            2
        )));
        setView(() => ({
            zoom,
            x: rect.width / 2 - ((bounds.minX + bounds.maxX) / 2) * zoom,
            y: rect.height / 2 - ((bounds.minY + bounds.maxY) / 2) * zoom,
        }));
    };

    // ---- Wheel zoom (needs a non-passive listener to stop the page scrolling)
    useEffect(() => {
        const element = boardRef.current;
        if (!element) return;
        const onWheel = (event: WheelEvent) => {
            event.preventDefault();
            const rect = element.getBoundingClientRect();
            const factor = Math.exp(-event.deltaY * 0.0015);
            setData((current) => ({
                ...current,
                maps: current.maps.map((m) => (m.id === current.activeMapId
                    ? { ...m, view: zoomMapAt(m.view, factor, event.clientX - rect.left, event.clientY - rect.top) }
                    : m)),
            }));
        };
        element.addEventListener("wheel", onWheel, { passive: false });
        return () => element.removeEventListener("wheel", onWheel);
    }, [setData]);

    // ---- Keyboard
    useEffect(() => {
        const onKeyDown = (event: KeyboardEvent) => {
            if (isTyping(event.target)) return;
            const key = event.key.toLowerCase();
            const mod = event.ctrlKey || event.metaKey;

            if (key === " ") {
                spaceHeld.current = true;
                if (event.target === document.body || boardRef.current?.contains(event.target as Node)) event.preventDefault();
                return;
            }
            if (mod && key === "z") {
                event.preventDefault();
                if (event.shiftKey) redo();
                else undo();
                return;
            }
            if (mod && key === "y") {
                event.preventDefault();
                redo();
                return;
            }
            if (mod && key === "d") {
                event.preventDefault();
                duplicateSelected();
                return;
            }
            if (mod) return;

            if (event.key === "Escape") {
                setSelection(null);
                setTool("select");
                return;
            }
            if (key === "v") setTool("select");
            if (key === "e") setTool("erase");
            if (!selection) return;

            if (event.key === "Delete" || event.key === "Backspace") {
                event.preventDefault();
                deleteSelection();
                return;
            }
            if (key === "r" && selection.type === "item") {
                rotateSelected(event.shiftKey ? -90 : 90);
                return;
            }

            // Rooms stay on whole squares.
            const step = event.shiftKey || selection.type === "room" ? GRID : GRID / 4;
            const moves: Record<string, Point> = {
                ArrowLeft: { x: -step, y: 0 },
                ArrowRight: { x: step, y: 0 },
                ArrowUp: { x: 0, y: -step },
                ArrowDown: { x: 0, y: step },
            };
            const move = moves[event.key];
            if (!move) return;
            event.preventDefault();
            change((current) => ({
                ...current,
                items: current.items.map((i) => (selection.type === "item" && i.id === selection.id ? { ...i, x: i.x + move.x, y: i.y + move.y } : i)),
                strokes: current.strokes.map((s) => (selection.type === "stroke" && s.id === selection.id ? moveStroke(s, move.x, move.y) : s)),
                rooms: current.rooms.map((r) => (selection.type === "room" && r.id === selection.id ? { ...r, x: r.x + move.x, y: r.y + move.y } : r)),
            }));
        };
        const onKeyUp = (event: KeyboardEvent) => {
            if (event.key === " ") spaceHeld.current = false;
        };
        window.addEventListener("keydown", onKeyDown);
        window.addEventListener("keyup", onKeyUp);
        return () => {
            window.removeEventListener("keydown", onKeyDown);
            window.removeEventListener("keyup", onKeyUp);
        };
    });

    // ---- Pointer handling. The board captures the pointer for every drag so
    // moves keep arriving even when the pointer leaves what was grabbed.

    const hitAt = (target: Element | null) => ({
        handle: target?.closest("[data-handle]")?.getAttribute("data-handle") ?? null,
        itemId: target?.closest("[data-item-id]")?.getAttribute("data-item-id") ?? null,
        strokeId: target?.closest("[data-stroke-id]")?.getAttribute("data-stroke-id") ?? null,
        roomId: target?.closest("[data-room-id]")?.getAttribute("data-room-id") ?? null,
    });

    // Erases whatever is on top under the pointer. Returns true if it did.
    const eraseAt = (clientX: number, clientY: number, changed: boolean) => {
        const { itemId, strokeId, roomId } = hitAt(document.elementFromPoint(clientX, clientY));
        if (!itemId && !strokeId && !roomId) return false;
        if (!changed) checkpoint();
        updateMap((current) => {
            if (itemId) return { ...current, items: current.items.filter((i) => i.id !== itemId) };
            if (strokeId) return { ...current, strokes: current.strokes.filter((s) => s.id !== strokeId) };
            return { ...current, rooms: current.rooms.filter((r) => r.id !== roomId) };
        });
        if (selection && [itemId, strokeId, roomId].includes(selection.id)) setSelection(null);
        return true;
    };

    const startPan = (event: ReactPointerEvent) => {
        dragRef.current = { kind: "pan", startX: event.clientX, startY: event.clientY, viewX: view.x, viewY: view.y };
    };

    const onPointerDown = (event: ReactPointerEvent<HTMLDivElement>) => {
        const board = boardRef.current;
        if (!board) return;

        if (event.button === 1 || (event.button === 0 && spaceHeld.current)) {
            event.preventDefault();
            startPan(event);
            board.setPointerCapture(event.pointerId);
            return;
        }
        if (event.button !== 0) return;

        const { handle, itemId, strokeId, roomId } = hitAt(event.target as Element);
        const point = toWorld(event.clientX, event.clientY);

        if (tool === "select") {
            const selectedItem = selection?.type === "item" ? map.items.find((i) => i.id === selection.id) : undefined;
            if (handle && selectedItem) {
                dragRef.current = handle === "rotate"
                    ? { kind: "rotate", id: selectedItem.id, changed: false }
                    : {
                        kind: "scale",
                        id: selectedItem.id,
                        startDistance: Math.max(1, Math.hypot(point.x - selectedItem.x, point.y - selectedItem.y)),
                        startScale: selectedItem.scale,
                        changed: false,
                    };
            }
            else if (itemId) {
                const item = map.items.find((i) => i.id === itemId)!;
                setSelection({ type: "item", id: itemId });
                dragRef.current = { kind: "move-item", id: itemId, startX: event.clientX, startY: event.clientY, itemX: item.x, itemY: item.y, changed: false };
            }
            else if (strokeId) {
                const stroke = map.strokes.find((s) => s.id === strokeId)!;
                setSelection({ type: "stroke", id: strokeId });
                dragRef.current = { kind: "move-stroke", id: strokeId, startX: event.clientX, startY: event.clientY, original: stroke, changed: false };
            }
            else if (roomId) {
                const room = map.rooms.find((r) => r.id === roomId)!;
                setSelection({ type: "room", id: roomId });
                dragRef.current = { kind: "move-room", id: roomId, startX: event.clientX, startY: event.clientY, roomX: room.x, roomY: room.y, changed: false };
            }
            else {
                setSelection(null);
                startPan(event);
            }
        }
        else if (tool === "erase") {
            dragRef.current = { kind: "erase", changed: eraseAt(event.clientX, event.clientY, false) };
        }
        else if (tool === "room" || (isFogTool(tool) && fogShape === "box")) {
            setSelection(null);
            dragRef.current = { kind: "box", x: point.x, y: point.y };
            setBox({ x1: point.x, y1: point.y, x2: point.x, y2: point.y });
        }
        else if (isFogTool(tool)) {
            dragRef.current = { kind: "fog-brush" };
            setFogDraft({
                id: makeId(),
                mode: tool === "fog-reveal" ? "reveal" : "hide",
                shape: "brush",
                points: [Math.round(point.x), Math.round(point.y)],
                width: fogWidth,
            });
        }
        else {
            setSelection(null);
            dragRef.current = { kind: "draw" };
            setDraft({
                brush: tool,
                width: widths[tool],
                color: tool === "ink" ? inkColor : undefined,
                points: [Math.round(point.x * 10) / 10, Math.round(point.y * 10) / 10],
            });
        }
        board.setPointerCapture(event.pointerId);
    };

    const onPointerMove = (event: ReactPointerEvent) => {
        const drag = dragRef.current;
        if (!drag) return;

        // The first real movement of a drag is what makes it undoable.
        const markChanged = () => {
            if ("changed" in drag && !drag.changed) {
                drag.changed = true;
                checkpoint();
            }
        };

        if (drag.kind === "pan") {
            setView((current) => ({ ...current, x: drag.viewX + event.clientX - drag.startX, y: drag.viewY + event.clientY - drag.startY }));
        }
        else if (drag.kind === "move-item") {
            const dx = (event.clientX - drag.startX) / view.zoom;
            const dy = (event.clientY - drag.startY) / view.zoom;
            if (!drag.changed && Math.hypot(dx, dy) < 2) return;
            markChanged();
            const item = map.items.find((i) => i.id === drag.id);
            if (!item) return;
            let moved = { ...item, x: Math.round(drag.itemX + dx), y: Math.round(drag.itemY + dy) };
            if (snap && !event.altKey) moved = snapItem(moved);
            updateItem(drag.id, { x: moved.x, y: moved.y });
        }
        else if (drag.kind === "move-stroke") {
            const dx = (event.clientX - drag.startX) / view.zoom;
            const dy = (event.clientY - drag.startY) / view.zoom;
            if (!drag.changed && Math.hypot(dx, dy) < 2) return;
            markChanged();
            updateStroke(drag.id, { points: moveStroke(drag.original, dx, dy).points });
        }
        else if (drag.kind === "move-room") {
            const dx = Math.round((event.clientX - drag.startX) / view.zoom / GRID) * GRID;
            const dy = Math.round((event.clientY - drag.startY) / view.zoom / GRID) * GRID;
            const room = map.rooms.find((r) => r.id === drag.id);
            if (!room || (room.x === drag.roomX + dx && room.y === drag.roomY + dy)) return;
            markChanged();
            updateMap((current) => ({
                ...current,
                rooms: current.rooms.map((r) => (r.id === drag.id ? { ...r, x: drag.roomX + dx, y: drag.roomY + dy } : r)),
            }));
        }
        else if (drag.kind === "box") {
            const point = toWorld(event.clientX, event.clientY);
            setBox({ x1: drag.x, y1: drag.y, x2: point.x, y2: point.y });
        }
        else if (drag.kind === "fog-brush") {
            const point = toWorld(event.clientX, event.clientY);
            setFogDraft((current) => {
                if (!current) return current;
                const n = current.points.length;
                if (Math.hypot(point.x - current.points[n - 2], point.y - current.points[n - 1]) < 6 / view.zoom) return current;
                return { ...current, points: [...current.points, Math.round(point.x), Math.round(point.y)] };
            });
        }
        else if (drag.kind === "rotate") {
            const item = map.items.find((i) => i.id === drag.id);
            if (!item) return;
            markChanged();
            const point = toWorld(event.clientX, event.clientY);
            // The handle sits above the piece, so straight up is 0°.
            let degrees = (Math.atan2(point.y - item.y, point.x - item.x) * 180) / Math.PI + 90;
            if (!event.shiftKey) degrees = Math.round(degrees / 15) * 15;
            updateItem(drag.id, { rotation: normalizeRotation(degrees) });
        }
        else if (drag.kind === "scale") {
            const item = map.items.find((i) => i.id === drag.id);
            if (!item) return;
            markChanged();
            const point = toWorld(event.clientX, event.clientY);
            const ratio = Math.hypot(point.x - item.x, point.y - item.y) / drag.startDistance;
            const scale = Math.min(4, Math.max(0.25, Math.round(drag.startScale * ratio * 20) / 20));
            updateItem(drag.id, { scale });
        }
        else if (drag.kind === "draw") {
            const point = toWorld(event.clientX, event.clientY);
            const x = Math.round(point.x * 10) / 10;
            const y = Math.round(point.y * 10) / 10;
            setDraft((current) => {
                if (!current) return current;
                // Shift draws a straight line from where the stroke started.
                if (event.shiftKey) return { ...current, points: [current.points[0], current.points[1], x, y] };
                const n = current.points.length;
                if (Math.hypot(x - current.points[n - 2], y - current.points[n - 1]) < 3 / view.zoom) return current;
                return { ...current, points: [...current.points, x, y] };
            });
        }
        else if (drag.kind === "erase") {
            if (eraseAt(event.clientX, event.clientY, drag.changed)) drag.changed = true;
        }
    };

    // Turns the dragged-out box into a room or a fog box.
    const finishBox = () => {
        if (!box) return;
        setBox(null);
        if (tool === "room") {
            const room = roomFromCorners(box.x1, box.y1, box.x2, box.y2, roomFloor);
            if (!room) return;
            change((current) => ({ ...current, rooms: [...current.rooms, room] }));
        }
        else if (isFogTool(tool)) {
            addFogOp(fogBox(tool === "fog-reveal" ? "reveal" : "hide", box.x1, box.y1, box.x2, box.y2));
        }
    };

    const finishFogBrush = () => {
        if (!fogDraft) return;
        setFogDraft(null);
        addFogOp({ ...fogDraft, points: simplifyPoints(fogDraft.points, 2).map(Math.round) });
    };

    const finishDraft = () => {
        if (!draft) return;
        const stroke: MapStroke = {
            id: makeId(),
            brush: draft.brush,
            width: draft.width,
            points: simplifyPoints(draft.points, 1.2 / Math.max(view.zoom, 0.5)),
        };
        if (draft.color) stroke.color = draft.color;
        setDraft(null);
        change((current) => ({ ...current, strokes: [...current.strokes, stroke] }));
    };

    const onPointerUp = (event: ReactPointerEvent) => {
        const drag = dragRef.current;
        dragRef.current = null;
        if (boardRef.current?.hasPointerCapture(event.pointerId)) boardRef.current.releasePointerCapture(event.pointerId);
        if (drag?.kind === "draw") finishDraft();
        if (drag?.kind === "box") finishBox();
        if (drag?.kind === "fog-brush") finishFogBrush();
    };

    const onPointerCancel = () => {
        dragRef.current = null;
        setDraft(null);
        setBox(null);
        setFogDraft(null);
    };

    // ---- Fog of war and the player view

    const setFogEnabled = (enabled: boolean) => {
        change((current) => ({ ...current, fog: { ...current.fog, enabled } }));
        if (!enabled && isFogTool(tool)) setTool("select");
    };

    const openPlayerView = () => {
        window.open("/dm-screen?view=player", PLAYER_WINDOW, "popup,width=1280,height=800");
    };

    // Moves the player view to show what the DM is looking at now.
    const sendViewToPlayers = () => {
        const rect = boardRef.current?.getBoundingClientRect();
        if (!rect) return;
        const centre = viewCentre();
        updateMap((current) => ({
            ...current,
            playerView: { cx: Math.round(centre.x), cy: Math.round(centre.y), span: Math.round(rect.width / view.zoom), at: Date.now() },
        }));
    };

    // ---- Drag and drop from the palette

    const onDragOver = (event: ReactDragEvent) => {
        if (!event.dataTransfer.types.includes(ASSET_MIME)) return;
        event.preventDefault();
        event.dataTransfer.dropEffect = "copy";
    };

    const onDrop = (event: ReactDragEvent) => {
        const asset = event.dataTransfer.getData(ASSET_MIME);
        if (!asset || !assetInfo(asset)) return;
        event.preventDefault();
        const point = toWorld(event.clientX, event.clientY);
        placeAsset(asset, point.x, point.y);
    };

    // ---- Maps

    const addMap = () => {
        const created = createMap(`Map ${data.maps.length + 1}`);
        setData((current) => ({ ...current, maps: [...current.maps, created], activeMapId: created.id }));
    };

    const deleteMap = () => {
        setData((current) => {
            const maps = current.maps.filter((m) => m.id !== map.id);
            if (maps.length === 0) maps.push(createMap("First map"));
            return { ...current, maps, activeMapId: maps[0].id };
        });
    };

    // ---- Export: draws the map layer (no selection handles) into a PNG.

    const exportPng = async () => {
        const layer = layerRef.current;
        const bounds = mapBounds(map);
        if (!layer || !bounds) return;
        setExporting(true);
        try {
            const minX = Math.floor((bounds.minX - GRID) / GRID) * GRID;
            const minY = Math.floor((bounds.minY - GRID) / GRID) * GRID;
            const width = Math.ceil((bounds.maxX + GRID) / GRID) * GRID - minX;
            const height = Math.ceil((bounds.maxY + GRID) / GRID) * GRID - minY;
            const scale = Math.min(2, 8000 / Math.max(width, height));

            const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
            svg.setAttribute("xmlns", "http://www.w3.org/2000/svg");
            svg.setAttribute("viewBox", `${minX} ${minY} ${width} ${height}`);
            svg.setAttribute("width", String(Math.round(width * scale)));
            svg.setAttribute("height", String(Math.round(height * scale)));
            svg.appendChild(layer.cloneNode(true));
            const markup = new XMLSerializer().serializeToString(svg);

            const image = new Image();
            const url = URL.createObjectURL(new Blob([markup], { type: "image/svg+xml" }));
            await new Promise<void>((resolve, reject) => {
                image.onload = () => resolve();
                image.onerror = () => reject(new Error("Could not draw the map"));
                image.src = url;
            });
            const canvas = document.createElement("canvas");
            canvas.width = Math.round(width * scale);
            canvas.height = Math.round(height * scale);
            canvas.getContext("2d")!.drawImage(image, 0, 0, canvas.width, canvas.height);
            URL.revokeObjectURL(url);

            const blob = await new Promise<Blob | null>((resolve) => canvas.toBlob(resolve, "image/png"));
            if (!blob) return;
            const link = document.createElement("a");
            link.href = URL.createObjectURL(blob);
            link.download = `${(map.name || "map").replace(/[^\w-]+/g, "-").toLowerCase()}.png`;
            link.click();
            URL.revokeObjectURL(link.href);
        }
        finally {
            setExporting(false);
        }
    };

    // ---- Derived drawing data

    const ground = groundStyle(map.ground);

    const selectedItem = selection?.type === "item" ? map.items.find((i) => i.id === selection.id) : undefined;
    const selectedStroke = selection?.type === "stroke" ? map.strokes.find((s) => s.id === selection.id) : undefined;
    const selectedRoom = selection?.type === "room" ? map.rooms.find((r) => r.id === selection.id) : undefined;
    const isEmpty = map.items.length === 0 && map.strokes.length === 0 && map.rooms.length === 0;
    const canUndo = historySize.past > 0;
    const canRedo = historySize.future > 0;
    const brushTool = isBrush(tool) ? tool : null;

    const boardClass = ["dms-map-board", `tool-${tool === "select" || tool === "erase" ? tool : "draw"}`].join(" ");
    const chip = (active: boolean) => (active ? "dms-chip active" : "dms-chip");
    const boxRect = box && (() => {
        if (tool === "room") {
            const room = roomFromCorners(box.x1, box.y1, box.x2, box.y2);
            return room && { x: room.x, y: room.y, w: room.w, h: room.h };
        }
        const [x1, y1, x2, y2] = fogBox("reveal", box.x1, box.y1, box.x2, box.y2).points;
        return { x: x1, y: y1, w: x2 - x1, h: y2 - y1 };
    })();

    return (
        <div className="dms-mapmaker">
            {/* ---------------- Palette ---------------- */}
            <aside className="dms-panel dms-map-palette" aria-label="Map pieces">
                <h2 className="dms-panel-title">Pieces</h2>
                <div className="dms-map-categories" role="group" aria-label="Piece category">
                    {ASSET_CATEGORIES.map((c) => (
                        <button
                            key={c.value}
                            type="button"
                            className={category === c.value ? "dms-chip active" : "dms-chip"}
                            aria-pressed={category === c.value}
                            onClick={() => setCategory(c.value)}
                        >
                            {c.label}
                        </button>
                    ))}
                </div>
                <div className="dms-map-assets">
                    {ASSETS.filter((a) => a.category === category).map((a) => (
                        // A div, not a button: Firefox won't start a drag from a button.
                        <div
                            key={a.key}
                            role="button"
                            tabIndex={0}
                            className="dms-map-asset"
                            draggable
                            title={`Drag onto the map, or click to add ${a.label.toLowerCase()}`}
                            onDragStart={(event) => {
                                event.dataTransfer.setData(ASSET_MIME, a.key);
                                event.dataTransfer.effectAllowed = "copy";
                            }}
                            onClick={() => addAssetInView(a.key)}
                            onKeyDown={(event) => {
                                if (event.key === "Enter" || event.key === " ") {
                                    event.preventDefault();
                                    addAssetInView(a.key);
                                }
                            }}
                        >
                            <AssetIcon asset={a.key} />
                            <span>{a.label}</span>
                        </div>
                    ))}
                </div>
                <p className="dms-inspector-help">Drag a piece onto the map, or click it to drop it in the middle.</p>
            </aside>

            {/* ---------------- Board ---------------- */}
            <div className="dms-board-area">
                <div className="dms-board-toolbar">
                    <div className="dms-board-add">
                        <select aria-label="Map" value={map.id} onChange={(e) => setData((current) => ({ ...current, activeMapId: e.target.value }))}>
                            {data.maps.map((m) => <option key={m.id} value={m.id}>{m.name || "Untitled"}</option>)}
                        </select>
                        <button type="button" className="dms-button dms-button--ghost" onClick={addMap}>+ New map</button>
                    </div>
                    <div className="dms-board-zoom">
                        <button type="button" className="dms-icon-button" aria-label="Undo" title="Undo (Ctrl+Z)" disabled={!canUndo} onClick={undo}>↶</button>
                        <button type="button" className="dms-icon-button" aria-label="Redo" title="Redo (Ctrl+Y)" disabled={!canRedo} onClick={redo}>↷</button>
                        <button type="button" className="dms-icon-button" aria-label="Zoom out" onClick={() => zoomBy(1 / 1.2)}>−</button>
                        <span className="dms-zoom-value">{Math.round(view.zoom * 100)}%</span>
                        <button type="button" className="dms-icon-button" aria-label="Zoom in" onClick={() => zoomBy(1.2)}>+</button>
                        <button type="button" className="dms-button dms-button--ghost" onClick={fitView}>Fit</button>
                    </div>
                </div>

                <div className="dms-map-tools" role="toolbar" aria-label="Map tools">
                    <button type="button" className={tool === "select" ? "dms-chip active" : "dms-chip"} aria-pressed={tool === "select"} title="Select and move (V)" onClick={() => setTool("select")}>
                        ✥ Select
                    </button>
                    {BRUSH_KEYS.map((brush) => (
                        <button
                            key={brush}
                            type="button"
                            className={tool === brush ? "dms-chip active" : "dms-chip"}
                            aria-pressed={tool === brush}
                            onClick={() => {
                                setTool(brush);
                                setSelection(null);
                            }}
                        >
                            <span className="dms-map-brush-swatch" style={{ background: brush === "ink" ? inkColor : BRUSHES[brush].fill, borderColor: BRUSHES[brush].edge }} />
                            {brushLabel(brush)}
                        </button>
                    ))}
                    <button
                        type="button"
                        className={chip(tool === "room")}
                        aria-pressed={tool === "room"}
                        title="Drag out a room. Rooms that touch open into each other."
                        onClick={() => {
                            setTool("room");
                            setSelection(null);
                        }}
                    >
                        ▭ Room
                    </button>
                    <button type="button" className={chip(tool === "erase")} aria-pressed={tool === "erase"} title="Erase (E)" onClick={() => setTool("erase")}>
                        ⌫ Erase
                    </button>
                    {tool === "room" && (
                        <span className="dms-map-brush-options">
                            <select aria-label="Room floor" value={roomFloor} onChange={(e) => setRoomFloor(e.target.value as RoomFloor)}>
                                {ROOM_FLOORS.map((f) => <option key={f.value} value={f.value}>{f.label}</option>)}
                            </select>
                        </span>
                    )}
                    {brushTool && (
                        <span className="dms-map-brush-options">
                            <label>
                                <span>Width</span>
                                <input
                                    type="range"
                                    min={brushTool === "ink" ? 1 : 4}
                                    max={brushTool === "ink" ? 16 : 120}
                                    value={widths[brushTool]}
                                    onChange={(e) => setWidths((current) => ({ ...current, [brushTool]: Number(e.target.value) }))}
                                />
                            </label>
                            {brushTool === "ink" && (
                                <input type="color" aria-label="Ink colour" value={inkColor} onChange={(e) => setInkColor(e.target.value)} />
                            )}
                        </span>
                    )}
                </div>

                <div className="dms-map-tools dms-map-fog-tools" role="toolbar" aria-label="Fog of war">
                    <label className="dms-check">
                        <input type="checkbox" checked={map.fog.enabled} onChange={(e) => setFogEnabled(e.target.checked)} />
                        Fog of war
                    </label>
                    {map.fog.enabled && (
                        <>
                            <button type="button" className={chip(tool === "fog-reveal")} aria-pressed={tool === "fog-reveal"} onClick={() => setTool("fog-reveal")}>
                                ☀ Reveal
                            </button>
                            <button type="button" className={chip(tool === "fog-hide")} aria-pressed={tool === "fog-hide"} onClick={() => setTool("fog-hide")}>
                                ☁ Hide
                            </button>
                            {isFogTool(tool) && (
                                <span className="dms-map-brush-options">
                                    <button type="button" className={chip(fogShape === "box")} aria-pressed={fogShape === "box"} onClick={() => setFogShape("box")}>Box</button>
                                    <button type="button" className={chip(fogShape === "brush")} aria-pressed={fogShape === "brush"} onClick={() => setFogShape("brush")}>Brush</button>
                                    {fogShape === "brush" && (
                                        <label>
                                            <span>Size</span>
                                            <input type="range" min={GRID} max={GRID * 10} step={GRID / 2} value={fogWidth} onChange={(e) => setFogWidth(Number(e.target.value))} />
                                        </label>
                                    )}
                                </span>
                            )}
                            <ConfirmButton
                                className="dms-chip"
                                label="Reveal all"
                                confirmLabel="Click again"
                                onConfirm={() => change((current) => ({ ...current, fog: { ...current.fog, start: "revealed", ops: [] } }))}
                            />
                            <ConfirmButton
                                className="dms-chip"
                                label="Hide all"
                                confirmLabel="Click again"
                                onConfirm={() => change((current) => ({ ...current, fog: { ...current.fog, start: "hidden", ops: [] } }))}
                            />
                        </>
                    )}
                    <span className="dms-map-player-buttons">
                        <button type="button" className="dms-button dms-button--ghost" onClick={openPlayerView} title="Open a window to show on the players' screen">
                            Open player view ↗
                        </button>
                        <button type="button" className="dms-button dms-button--ghost" onClick={sendViewToPlayers} title="Make the player view show what you see now">
                            Show players this view
                        </button>
                    </span>
                </div>

                <div
                    ref={boardRef}
                    className={boardClass}
                    style={{ backgroundColor: ground.color }}
                    onPointerDown={onPointerDown}
                    onPointerMove={onPointerMove}
                    onPointerUp={onPointerUp}
                    onPointerCancel={onPointerCancel}
                    onDragOver={onDragOver}
                    onDrop={onDrop}
                    onContextMenu={(e) => e.preventDefault()}
                >
                    <svg className="dms-map-svg">
                        <g transform={`translate(${view.x} ${view.y}) scale(${view.zoom})`}>
                            {/* Everything the PNG export includes; fog and handles are drawn after it. */}
                            <g ref={layerRef}>
                                <MapContent map={map} audience="dm" />
                            </g>

                            <FogLayer fog={map.fog} audience="dm" draft={fogDraft} />

                            {draft && (
                                <g opacity={0.85} pointerEvents="none">
                                    <StrokeShape stroke={{ id: "draft", ...draft }} />
                                </g>
                            )}
                            {boxRect && (
                                <rect
                                    className={tool === "fog-hide" ? "dms-map-box hide" : "dms-map-box"}
                                    x={boxRect.x}
                                    y={boxRect.y}
                                    width={boxRect.w}
                                    height={boxRect.h}
                                    strokeWidth={2 / view.zoom}
                                    strokeDasharray={`${6 / view.zoom} ${4 / view.zoom}`}
                                    pointerEvents="none"
                                />
                            )}
                            {selectedStroke && <StrokeSelection stroke={selectedStroke} zoom={view.zoom} />}
                            {selectedRoom && (
                                <rect
                                    className="dms-map-outline"
                                    x={selectedRoom.x - ROOM_WALL}
                                    y={selectedRoom.y - ROOM_WALL}
                                    width={selectedRoom.w + ROOM_WALL * 2}
                                    height={selectedRoom.h + ROOM_WALL * 2}
                                    fill="none"
                                    strokeWidth={2 / view.zoom}
                                    strokeDasharray={`${6 / view.zoom} ${4 / view.zoom}`}
                                    pointerEvents="none"
                                />
                            )}
                            {selectedItem && tool === "select" && <ItemSelection item={selectedItem} zoom={view.zoom} />}
                        </g>
                    </svg>

                    {isEmpty && !draft && !box && (
                        <p className={map.ground === "dungeon" || map.ground === "void" ? "dms-board-empty dms-map-empty dark" : "dms-board-empty dms-map-empty"}>
                            Drag houses and roads in from the left, pick a brush above and draw, or use Room to drag out a dungeon.
                        </p>
                    )}
                </div>
                <p className="dms-hint">
                    Select: drag pieces to move, use the round handle to rotate and the square one to resize; drag the ground to pan.
                    Brushes: hold Shift for a straight line. Room: drag a box; rooms that touch open into each other, and doors snap into walls.
                    Fog: reveal or hide by box or brush; the player view only shows what's revealed. Scroll to zoom, Space or middle-drag to pan.
                    R rotates, Ctrl+D duplicates, Ctrl+Z undoes.
                </p>
            </div>

            {/* ---------------- Inspector ---------------- */}
            <aside className="dms-panel dms-inspector" aria-label="Selected piece or map settings">
                {selectedItem ? (
                    <ItemInspector
                        item={selectedItem}
                        onChange={(fields) => change((current) => ({
                            ...current,
                            items: current.items.map((i) => (i.id === selectedItem.id ? { ...i, ...fields } : i)),
                        }))}
                        onType={(fields) => updateItem(selectedItem.id, fields)}
                        onCheckpoint={checkpoint}
                        onRotate={rotateSelected}
                        onDuplicate={duplicateSelected}
                        onRestack={(where) => change((current) => restackItem(current, selectedItem.id, where))}
                        onDelete={deleteSelection}
                    />
                ) : selectedRoom ? (
                    <RoomInspector
                        room={selectedRoom}
                        fogEnabled={map.fog.enabled}
                        onChange={(fields) => updateRoom(selectedRoom.id, fields)}
                        onReveal={() => addFogOp(revealRoom(selectedRoom))}
                        onDelete={deleteSelection}
                    />
                ) : selectedStroke ? (
                    <StrokeInspector
                        stroke={selectedStroke}
                        onChange={(fields) => updateStroke(selectedStroke.id, fields)}
                        onCheckpoint={checkpoint}
                        onDelete={deleteSelection}
                    />
                ) : (
                    <>
                        <h2 className="dms-panel-title">Map</h2>
                        <label className="dms-field">
                            <span>Name</span>
                            <input value={map.name} onChange={(e) => updateMap((current) => ({ ...current, name: e.target.value }))} />
                        </label>
                        <label className="dms-field">
                            <span>Ground</span>
                            <select value={map.ground} onChange={(e) => change((current) => ({ ...current, ground: e.target.value as Ground }))}>
                                {GROUNDS.map((g) => <option key={g.value} value={g.value}>{g.label}</option>)}
                            </select>
                        </label>
                        <label className="dms-check">
                            <input type="checkbox" checked={map.showGrid} onChange={(e) => updateMap((current) => ({ ...current, showGrid: e.target.checked }))} />
                            Show grid (1 square = 5 ft)
                        </label>
                        <label className="dms-check">
                            <input type="checkbox" checked={snap} onChange={(e) => setSnap(e.target.checked)} />
                            Snap pieces to the grid (hold Alt to place freely)
                        </label>
                        <p className="dms-inspector-help">
                            {map.rooms.length} rooms · {map.items.length} pieces · {map.strokes.length} strokes
                        </p>
                        <p className="dms-inspector-help">
                            The PNG is the DM's copy: no fog, and hidden pieces included.
                        </p>
                        <div className="dms-inspector-buttons">
                            <button type="button" className="dms-button" disabled={exporting || isEmpty} onClick={() => void exportPng()}>
                                {exporting ? "Exporting…" : "Export PNG"}
                            </button>
                        </div>
                        <div className="dms-inspector-buttons">
                            <ConfirmButton
                                className="dms-button dms-button--ghost"
                                label="Clear map"
                                confirmLabel="Click again to clear"
                                onConfirm={() => change((current) => ({ ...current, items: [], strokes: [], rooms: [], fog: { ...current.fog, ops: [] } }))}
                            />
                            <ConfirmButton className="dms-button dms-button--danger" label="Delete map" onConfirm={deleteMap} />
                        </div>
                    </>
                )}
            </aside>
        </div>
    );
}

// =====================================
// Drawing
// =====================================

function StrokeSelection({ stroke, zoom }: { stroke: MapStroke; zoom: number }) {
    return (
        <path
            className="dms-map-selection"
            d={strokePath(stroke.points)}
            fill="none"
            strokeWidth={stroke.width + BRUSHES[stroke.brush].edgeExtra + 6 / zoom}
            strokeLinecap="round"
            strokeLinejoin="round"
            pointerEvents="none"
        />
    );
}

function ItemSelection({ item, zoom }: { item: MapItem; zoom: number }) {
    const info = assetInfo(item.asset);
    const w = (info?.w ?? GRID) * item.scale;
    const h = (info?.h ?? GRID) * item.scale;
    const pad = 4 / zoom;
    const handle = 7 / zoom;
    const reach = 26 / zoom;
    return (
        <g transform={`translate(${item.x} ${item.y}) rotate(${item.rotation})`}>
            <rect
                className="dms-map-outline"
                x={-w / 2 - pad}
                y={-h / 2 - pad}
                width={w + pad * 2}
                height={h + pad * 2}
                fill="none"
                strokeWidth={1.5 / zoom}
                strokeDasharray={`${5 / zoom} ${4 / zoom}`}
                pointerEvents="none"
            />
            <line className="dms-map-outline" x1={0} y1={-h / 2 - pad} x2={0} y2={-h / 2 - reach} strokeWidth={1.5 / zoom} pointerEvents="none" />
            <circle data-handle="rotate" className="dms-map-handle rotate" cx={0} cy={-h / 2 - reach} r={handle} strokeWidth={1.5 / zoom}>
                <title>Drag to rotate (Shift for free rotation)</title>
            </circle>
            <rect
                data-handle="scale"
                className="dms-map-handle scale"
                x={w / 2 + pad - handle}
                y={h / 2 + pad - handle}
                width={handle * 2}
                height={handle * 2}
                strokeWidth={1.5 / zoom}
            >
                <title>Drag to resize</title>
            </rect>
        </g>
    );
}

// =====================================
// Inspectors
// =====================================

interface ItemInspectorProps {
    item: MapItem;
    // An undoable change (sliders, buttons).
    onChange: (fields: Partial<MapItem>) => void;
    // Typing and sliding; not an undo step per keystroke or slider tick.
    onType: (fields: Partial<MapItem>) => void;
    // Starts one undo step for a slider drag or a round of typing.
    onCheckpoint: () => void;
    onRotate: (degrees: number) => void;
    onDuplicate: () => void;
    onRestack: (where: "front" | "back") => void;
    onDelete: () => void;
}

function ItemInspector({ item, onChange, onType, onCheckpoint, onRotate, onDuplicate, onRestack, onDelete }: ItemInspectorProps) {
    return (
        <>
            <h2 className="dms-panel-title">{assetLabel(item.asset)}</h2>
            <label className="dms-field">
                <span>{item.asset === "text" ? "Text" : "Label (shown on the map)"}</span>
                <input
                    value={item.label}
                    placeholder={item.asset === "text" ? "" : "e.g. The Prancing Pony"}
                    onFocus={onCheckpoint}
                    onChange={(e) => onType({ label: e.target.value })}
                />
            </label>
            <label className="dms-check">
                <input type="checkbox" checked={!!item.hidden} onChange={(e) => onChange({ hidden: e.target.checked || undefined })} />
                Hidden from players
            </label>
            <label className="dms-field">
                <span>Rotation · {item.rotation}°</span>
                <input type="range" min={0} max={359} value={item.rotation} onPointerDown={onCheckpoint} onChange={(e) => onType({ rotation: Number(e.target.value) })} />
            </label>
            <div className="dms-inspector-buttons">
                <button type="button" className="dms-button dms-button--ghost" onClick={() => onRotate(-90)}>⟲ 90°</button>
                <button type="button" className="dms-button dms-button--ghost" onClick={() => onRotate(90)}>⟳ 90°</button>
            </div>
            <label className="dms-field">
                <span>Size · {Math.round(item.scale * 100)}%</span>
                <input type="range" min={0.25} max={4} step={0.05} value={item.scale} onPointerDown={onCheckpoint} onChange={(e) => onType({ scale: Number(e.target.value) })} />
            </label>
            <div className="dms-inspector-buttons">
                <button type="button" className="dms-button dms-button--ghost" onClick={() => onChange({ scale: 1 })}>Reset size</button>
                <button type="button" className="dms-button dms-button--ghost" onClick={onDuplicate}>Duplicate</button>
            </div>
            <div className="dms-inspector-buttons">
                <button type="button" className="dms-button dms-button--ghost" onClick={() => onRestack("front")}>Bring to front</button>
                <button type="button" className="dms-button dms-button--ghost" onClick={() => onRestack("back")}>Send to back</button>
            </div>
            <button type="button" className="dms-button dms-button--danger" onClick={onDelete}>Delete piece</button>
        </>
    );
}

interface StrokeInspectorProps {
    stroke: MapStroke;
    onChange: (fields: Partial<MapStroke>) => void;
    onCheckpoint: () => void;
    onDelete: () => void;
}

function StrokeInspector({ stroke, onChange, onCheckpoint, onDelete }: StrokeInspectorProps) {
    return (
        <>
            <h2 className="dms-panel-title">{brushLabel(stroke.brush)}</h2>
            <label className="dms-field">
                <span>Width · {stroke.width}</span>
                <input
                    type="range"
                    min={stroke.brush === "ink" ? 1 : 4}
                    max={stroke.brush === "ink" ? 16 : 120}
                    value={stroke.width}
                    onPointerDown={onCheckpoint}
                    onChange={(e) => onChange({ width: Number(e.target.value) })}
                />
            </label>
            {stroke.brush === "ink" && (
                <label className="dms-field">
                    <span>Colour</span>
                    <input type="color" value={stroke.color ?? BRUSHES.ink.fill} onClick={onCheckpoint} onChange={(e) => onChange({ color: e.target.value })} />
                </label>
            )}
            <p className="dms-inspector-help">Drag the stroke to move it. Arrow keys nudge it.</p>
            <button type="button" className="dms-button dms-button--danger" onClick={onDelete}>Delete stroke</button>
        </>
    );
}

interface RoomInspectorProps {
    room: MapRoom;
    fogEnabled: boolean;
    onChange: (fields: Partial<MapRoom>) => void;
    onReveal: () => void;
    onDelete: () => void;
}

function RoomInspector({ room, fogEnabled, onChange, onReveal, onDelete }: RoomInspectorProps) {
    const squares = (value: string) => Math.max(1, Math.min(200, Math.round(Number(value) || 1))) * GRID;
    return (
        <>
            <h2 className="dms-panel-title">Room</h2>
            <div className="dms-map-size">
                <label className="dms-field">
                    <span>Width (squares)</span>
                    <input type="number" min={1} max={200} value={room.w / GRID} onChange={(e) => onChange({ w: squares(e.target.value) })} />
                </label>
                <label className="dms-field">
                    <span>Height (squares)</span>
                    <input type="number" min={1} max={200} value={room.h / GRID} onChange={(e) => onChange({ h: squares(e.target.value) })} />
                </label>
            </div>
            <p className="dms-inspector-help">{(room.w / GRID) * 5} × {(room.h / GRID) * 5} ft</p>
            <label className="dms-field">
                <span>Floor</span>
                <select value={room.floor} onChange={(e) => onChange({ floor: e.target.value as RoomFloor })}>
                    {ROOM_FLOORS.map((f) => <option key={f.value} value={f.value}>{f.label}</option>)}
                </select>
            </label>
            {fogEnabled && (
                <button type="button" className="dms-button" onClick={onReveal}>☀ Reveal room to players</button>
            )}
            <p className="dms-inspector-help">Drag the room to move it. Overlap or touch another room to join them.</p>
            <button type="button" className="dms-button dms-button--danger" onClick={onDelete}>Delete room</button>
        </>
    );
}
