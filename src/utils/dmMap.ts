import { makeId } from "./makeId";

// =====================================
// DM Screen: map maker
// =====================================
//
// Pure data helpers for the Map tab. A map is a set of placed pieces (houses,
// trees, road tiles...), freehand strokes (roads, rivers, walls, ink), dungeon
// rooms, and fog of war that hides parts of the map from the players.
// The art for each piece lives in components/DmScreen/mapAssets.tsx; this file
// only knows their names and sizes so it can be tested without React.

// One grid square, in world pixels (5 ft on a battle map).
export const GRID = 40;

export const MAP_ZOOM_MIN = 0.2;
export const MAP_ZOOM_MAX = 4;

export type AssetCategory = "buildings" | "roads" | "nature" | "props" | "dungeon";

export interface AssetInfo {
    key: string;
    label: string;
    category: AssetCategory;
    w: number;
    h: number;
}

export const ASSET_CATEGORIES: { value: AssetCategory; label: string }[] = [
    { value: "buildings", label: "Buildings" },
    { value: "roads", label: "Roads" },
    { value: "nature", label: "Nature" },
    { value: "props", label: "Props" },
    { value: "dungeon", label: "Dungeon" },
];

export const ASSETS: AssetInfo[] = [
    { key: "house-small", label: "Cottage", category: "buildings", w: 80, h: 60 },
    { key: "house-large", label: "House", category: "buildings", w: 120, h: 80 },
    { key: "house-hip", label: "Square house", category: "buildings", w: 80, h: 80 },
    { key: "house-l", label: "L-house", category: "buildings", w: 120, h: 120 },
    { key: "tavern", label: "Tavern", category: "buildings", w: 160, h: 100 },
    { key: "barn", label: "Barn", category: "buildings", w: 120, h: 80 },
    { key: "temple", label: "Temple", category: "buildings", w: 120, h: 160 },
    { key: "tower", label: "Tower", category: "buildings", w: 80, h: 80 },
    { key: "keep", label: "Keep", category: "buildings", w: 160, h: 160 },
    { key: "hut", label: "Hut", category: "buildings", w: 60, h: 60 },
    { key: "tent", label: "Tent", category: "buildings", w: 60, h: 60 },
    { key: "stall", label: "Market stall", category: "buildings", w: 60, h: 40 },

    { key: "road-straight", label: "Straight", category: "roads", w: 120, h: 40 },
    { key: "road-curve", label: "Curve", category: "roads", w: 120, h: 120 },
    { key: "road-t", label: "T-junction", category: "roads", w: 120, h: 80 },
    { key: "road-cross", label: "Crossroads", category: "roads", w: 120, h: 120 },
    { key: "plaza", label: "Plaza", category: "roads", w: 160, h: 160 },
    { key: "bridge", label: "Bridge", category: "roads", w: 120, h: 48 },

    { key: "tree", label: "Tree", category: "nature", w: 60, h: 60 },
    { key: "pine", label: "Pine", category: "nature", w: 50, h: 50 },
    { key: "bush", label: "Bush", category: "nature", w: 30, h: 30 },
    { key: "rock", label: "Rock", category: "nature", w: 36, h: 28 },
    { key: "pond", label: "Pond", category: "nature", w: 120, h: 80 },
    { key: "field", label: "Field", category: "nature", w: 160, h: 120 },

    { key: "well", label: "Well", category: "props", w: 36, h: 36 },
    { key: "fence", label: "Fence", category: "props", w: 80, h: 10 },
    { key: "cart", label: "Cart", category: "props", w: 50, h: 30 },
    { key: "campfire", label: "Campfire", category: "props", w: 30, h: 30 },
    { key: "barrel", label: "Barrel", category: "props", w: 20, h: 20 },
    { key: "crate", label: "Crate", category: "props", w: 24, h: 24 },
    { key: "statue", label: "Statue", category: "props", w: 40, h: 40 },
    { key: "grave", label: "Grave", category: "props", w: 20, h: 30 },
    { key: "text", label: "Text", category: "props", w: 120, h: 30 },

    { key: "door", label: "Door", category: "dungeon", w: 40, h: 12 },
    { key: "door-double", label: "Double door", category: "dungeon", w: 80, h: 12 },
    { key: "secret-door", label: "Secret door", category: "dungeon", w: 40, h: 12 },
    { key: "bars", label: "Portcullis", category: "dungeon", w: 40, h: 8 },
    { key: "stairs", label: "Stairs", category: "dungeon", w: 40, h: 80 },
    { key: "pillar", label: "Pillar", category: "dungeon", w: 30, h: 30 },
    { key: "chest", label: "Chest", category: "dungeon", w: 30, h: 20 },
    { key: "altar", label: "Altar", category: "dungeon", w: 80, h: 40 },
    { key: "sarcophagus", label: "Sarcophagus", category: "dungeon", w: 40, h: 80 },
    { key: "rubble", label: "Rubble", category: "dungeon", w: 40, h: 40 },
    { key: "bones", label: "Bones", category: "dungeon", w: 30, h: 24 },
    { key: "trap", label: "Trap", category: "dungeon", w: 40, h: 40 },
    { key: "pit", label: "Pit", category: "dungeon", w: 40, h: 40 },
    { key: "torch", label: "Torch", category: "dungeon", w: 16, h: 16 },
    { key: "brazier", label: "Brazier", category: "dungeon", w: 30, h: 30 },
    { key: "table", label: "Table", category: "dungeon", w: 80, h: 40 },
];

// Pieces the players shouldn't see until the DM says so.
const HIDDEN_BY_DEFAULT = new Set(["secret-door", "trap"]);

const assetByKey = new Map(ASSETS.map((a) => [a.key, a]));

export function assetInfo(key: string): AssetInfo | undefined {
    return assetByKey.get(key);
}

// Which layer a piece is drawn in. Ground pieces sit under everything; road
// tiles are drawn with the drawn roads so they merge; the rest go on top.
const GROUND_PIECES = new Set(["field", "pond", "plaza"]);
const ROAD_TILES = new Set(["road-straight", "road-curve", "road-t", "road-cross"]);

export function itemLayer(asset: string): "ground" | "road" | "object" {
    if (GROUND_PIECES.has(asset)) return "ground";
    if (ROAD_TILES.has(asset)) return "road";
    return "object";
}

export type Brush = "road" | "cobble" | "river" | "wall" | "ink";

export interface BrushStyle {
    label: string;
    width: number;
    // Drawn first, a little wider, so the stroke gets an edge.
    edge: string;
    fill: string;
    // How much wider the edge is than the fill.
    edgeExtra: number;
}

export const BRUSHES: Record<Brush, BrushStyle> = {
    road: { label: "Dirt road", width: 32, edge: "#8a6a43", fill: "#c9a46d", edgeExtra: 6 },
    cobble: { label: "Stone road", width: 32, edge: "#5f5f63", fill: "#a3a2a0", edgeExtra: 6 },
    river: { label: "River", width: 44, edge: "#2f5f8c", fill: "#5b9bd5", edgeExtra: 8 },
    wall: { label: "Wall", width: 10, edge: "#33333a", fill: "#7a7a82", edgeExtra: 4 },
    ink: { label: "Ink", width: 3, edge: "transparent", fill: "#1c1c1c", edgeExtra: 0 },
};

export const BRUSH_KEYS = Object.keys(BRUSHES) as Brush[];

export type Ground = "grass" | "dirt" | "sand" | "stone" | "snow" | "parchment" | "dungeon" | "void";

export const GROUNDS: { value: Ground; label: string; color: string; line: string }[] = [
    { value: "grass", label: "Grass", color: "#7fa65a", line: "rgba(0,0,0,0.12)" },
    { value: "dirt", label: "Dirt", color: "#a88a62", line: "rgba(0,0,0,0.12)" },
    { value: "sand", label: "Sand", color: "#e2cf9a", line: "rgba(0,0,0,0.1)" },
    { value: "stone", label: "Stone floor", color: "#8d8b88", line: "rgba(0,0,0,0.18)" },
    { value: "snow", label: "Snow", color: "#eef2f5", line: "rgba(0,0,0,0.08)" },
    { value: "parchment", label: "Parchment", color: "#efe2c2", line: "rgba(90,60,20,0.15)" },
    { value: "dungeon", label: "Dungeon rock", color: "#2c2a28", line: "rgba(255,255,255,0.05)" },
    { value: "void", label: "Black", color: "#0d0d0f", line: "rgba(255,255,255,0.04)" },
];

export type RoomFloor = "flagstone" | "tiles" | "wood" | "cave";

export const ROOM_FLOORS: { value: RoomFloor; label: string }[] = [
    { value: "flagstone", label: "Flagstone" },
    { value: "tiles", label: "Square tiles" },
    { value: "wood", label: "Wooden planks" },
    { value: "cave", label: "Cave floor" },
];

// How far a room's wall reaches outside its floor.
export const ROOM_WALL = 8;

export function groundStyle(ground: Ground) {
    return GROUNDS.find((g) => g.value === ground) ?? GROUNDS[0];
}

export interface MapItem {
    id: string;
    asset: string;
    // Centre of the piece, in world pixels.
    x: number;
    y: number;
    rotation: number;
    scale: number;
    label: string;
    // Only the DM sees it; it's left out of the player view.
    hidden?: boolean;
}

// A rectangle of floor with walls around it. Rooms that touch or overlap
// merge into one open space; walls only show along the outside.
export interface MapRoom {
    id: string;
    x: number;
    y: number;
    w: number;
    h: number;
    floor: RoomFloor;
}

export type FogMode = "reveal" | "hide";

// One stroke of the fog brush or one fog box. They're applied in order on top
// of the starting state, so later ones win.
export interface FogOp {
    id: string;
    mode: FogMode;
    shape: "brush" | "box";
    // Brush: flat x, y pairs. Box: x1, y1, x2, y2.
    points: number[];
    width: number;
}

export interface Fog {
    enabled: boolean;
    // What the map is before any fog ops: all hidden or all revealed.
    start: "hidden" | "revealed";
    ops: FogOp[];
}

export interface MapStroke {
    id: string;
    brush: Brush;
    width: number;
    // Only used by ink; the other brushes have fixed colours.
    color?: string;
    // Flat list of x, y pairs.
    points: number[];
}

export interface MapView {
    x: number;
    y: number;
    zoom: number;
}

export interface BattleMap {
    id: string;
    name: string;
    ground: Ground;
    showGrid: boolean;
    items: MapItem[];
    strokes: MapStroke[];
    rooms: MapRoom[];
    fog: Fog;
    view: MapView;
    // The area the DM last sent to the player view: its centre and how much of
    // the world it spans across. `at` changes each time it's sent.
    playerView?: { cx: number; cy: number; span: number; at: number };
}

// =====================================
// Creating and changing things
// =====================================

function clamp(value: number, min: number, max: number) {
    return Math.min(max, Math.max(min, value));
}

const round1 = (value: number) => Math.round(value * 10) / 10;

export function createMap(name = "New map"): BattleMap {
    return {
        id: makeId(),
        name,
        ground: "grass",
        showGrid: true,
        items: [],
        strokes: [],
        rooms: [],
        fog: { enabled: false, start: "hidden", ops: [] },
        view: { x: 0, y: 0, zoom: 1 },
    };
}

export function createItem(asset: string, x: number, y: number, fields: Partial<MapItem> = {}): MapItem {
    const item: MapItem = {
        id: makeId(),
        asset,
        x: Math.round(x),
        y: Math.round(y),
        rotation: 0,
        scale: 1,
        label: asset === "text" ? "Label" : "",
    };
    if (HIDDEN_BY_DEFAULT.has(asset)) item.hidden = true;
    return { ...item, ...fields };
}

// Snaps a piece to the grid. Along a side measured in half squares its edges
// line up with the grid; along a thin side (a door, a fence) its middle sits
// on a grid line, so doors land in walls.
export function snapItem(item: MapItem): MapItem {
    const info = assetInfo(item.asset);
    const quarterTurn = Math.round(item.rotation / 90) % 2 !== 0;
    const w = (info?.w ?? GRID) * item.scale;
    const h = (info?.h ?? GRID) * item.scale;
    const [bw, bh] = quarterTurn ? [h, w] : [w, h];
    const step = GRID / 2;
    const snapAxis = (centre: number, size: number) => {
        if (size < step) return Math.round(centre / step) * step;
        return Math.round((centre - size / 2) / step) * step + size / 2;
    };
    return { ...item, x: snapAxis(item.x, bw), y: snapAxis(item.y, bh) };
}

// A room from two corners dragged on the map, snapped out to whole squares.
// Returns null for a click or a tiny drag, so a stray click makes no room.
export function roomFromCorners(x1: number, y1: number, x2: number, y2: number, floor: RoomFloor = "flagstone"): MapRoom | null {
    if (Math.abs(x2 - x1) < GRID / 2 && Math.abs(y2 - y1) < GRID / 2) return null;
    const left = Math.floor(Math.min(x1, x2) / GRID) * GRID;
    const top = Math.floor(Math.min(y1, y2) / GRID) * GRID;
    const right = Math.ceil(Math.max(x1, x2) / GRID) * GRID;
    const bottom = Math.ceil(Math.max(y1, y2) / GRID) * GRID;
    if (right - left < GRID || bottom - top < GRID) return null;
    return { id: makeId(), x: left, y: top, w: right - left, h: bottom - top, floor };
}

// A fog box from two corners, snapped out to whole squares.
export function fogBox(mode: FogMode, x1: number, y1: number, x2: number, y2: number): FogOp {
    return {
        id: makeId(),
        mode,
        shape: "box",
        points: [
            Math.floor(Math.min(x1, x2) / GRID) * GRID,
            Math.floor(Math.min(y1, y2) / GRID) * GRID,
            Math.ceil(Math.max(x1, x2) / GRID) * GRID,
            Math.ceil(Math.max(y1, y2) / GRID) * GRID,
        ],
        width: 0,
    };
}

// Reveals the area of a room (and its walls).
export function revealRoom(room: MapRoom): FogOp {
    return {
        id: makeId(),
        mode: "reveal",
        shape: "box",
        points: [room.x - ROOM_WALL, room.y - ROOM_WALL, room.x + room.w + ROOM_WALL, room.y + room.h + ROOM_WALL],
        width: 0,
    };
}

export function normalizeRotation(degrees: number) {
    return ((Math.round(degrees) % 360) + 360) % 360;
}

export function duplicateItem(map: BattleMap, id: string): { map: BattleMap; copy: MapItem | null } {
    const source = map.items.find((i) => i.id === id);
    if (!source) return { map, copy: null };
    const copy = { ...source, id: makeId(), x: source.x + GRID, y: source.y + GRID };
    return { map: { ...map, items: [...map.items, copy] }, copy };
}

// Moves an item to the top (drawn last) or bottom of the stack.
export function restackItem(map: BattleMap, id: string, where: "front" | "back"): BattleMap {
    const item = map.items.find((i) => i.id === id);
    if (!item) return map;
    const rest = map.items.filter((i) => i.id !== id);
    return { ...map, items: where === "front" ? [...rest, item] : [item, ...rest] };
}

export function moveStroke(stroke: MapStroke, dx: number, dy: number): MapStroke {
    return { ...stroke, points: stroke.points.map((value, i) => round1(value + (i % 2 === 0 ? dx : dy))) };
}

// Drops points that are within `tolerance` of the line through their
// neighbours (Ramer-Douglas-Peucker), so freehand strokes stay small in storage.
export function simplifyPoints(points: number[], tolerance = 1.5): number[] {
    const count = points.length / 2;
    if (count <= 2) return points.map(round1);

    const keep = new Array<boolean>(count).fill(false);
    keep[0] = keep[count - 1] = true;
    const stack: [number, number][] = [[0, count - 1]];

    while (stack.length > 0) {
        const [first, last] = stack.pop()!;
        const ax = points[first * 2], ay = points[first * 2 + 1];
        const bx = points[last * 2], by = points[last * 2 + 1];
        const length = Math.hypot(bx - ax, by - ay);

        let furthest = -1;
        let furthestDistance = tolerance;
        for (let i = first + 1; i < last; i++) {
            const px = points[i * 2], py = points[i * 2 + 1];
            const distance = length === 0
                ? Math.hypot(px - ax, py - ay)
                : Math.abs((bx - ax) * (ay - py) - (ax - px) * (by - ay)) / length;
            if (distance > furthestDistance) {
                furthest = i;
                furthestDistance = distance;
            }
        }
        if (furthest !== -1) {
            keep[furthest] = true;
            stack.push([first, furthest], [furthest, last]);
        }
    }

    return points.filter((_, i) => keep[Math.floor(i / 2)]).map(round1);
}

// Smooth SVG path through the points: straight to the first midpoint, then
// quadratic curves from midpoint to midpoint using each point as the control.
export function strokePath(points: number[]): string {
    const count = points.length / 2;
    if (count === 0) return "";
    const x = (i: number) => points[i * 2];
    const y = (i: number) => points[i * 2 + 1];
    if (count === 1) return `M ${x(0)} ${y(0)} L ${x(0) + 0.01} ${y(0)}`;
    if (count === 2) return `M ${x(0)} ${y(0)} L ${x(1)} ${y(1)}`;

    let path = `M ${x(0)} ${y(0)}`;
    for (let i = 1; i < count - 1; i++) {
        const mx = (x(i) + x(i + 1)) / 2;
        const my = (y(i) + y(i + 1)) / 2;
        path += ` Q ${x(i)} ${y(i)} ${round1(mx)} ${round1(my)}`;
    }
    path += ` L ${x(count - 1)} ${y(count - 1)}`;
    return path;
}

// The area covered by everything on the map, for "fit" and image export.
export function mapBounds(map: BattleMap): { minX: number; minY: number; maxX: number; maxY: number } | null {
    let minX = Infinity, minY = Infinity, maxX = -Infinity, maxY = -Infinity;
    const grow = (x1: number, y1: number, x2: number, y2: number) => {
        minX = Math.min(minX, x1);
        minY = Math.min(minY, y1);
        maxX = Math.max(maxX, x2);
        maxY = Math.max(maxY, y2);
    };

    map.items.forEach((item) => {
        const info = assetInfo(item.asset);
        // Half the diagonal covers the piece at any rotation.
        const radius = (Math.hypot(info?.w ?? GRID, info?.h ?? GRID) / 2) * item.scale;
        grow(item.x - radius, item.y - radius, item.x + radius, item.y + radius + (item.label && item.asset !== "text" ? 24 : 0));
    });
    map.rooms.forEach((room) => {
        grow(room.x - ROOM_WALL, room.y - ROOM_WALL, room.x + room.w + ROOM_WALL, room.y + room.h + ROOM_WALL);
    });
    map.strokes.forEach((stroke) => {
        const pad = (stroke.width + BRUSHES[stroke.brush].edgeExtra) / 2;
        for (let i = 0; i < stroke.points.length; i += 2) {
            grow(stroke.points[i] - pad, stroke.points[i + 1] - pad, stroke.points[i] + pad, stroke.points[i + 1] + pad);
        }
    });

    return Number.isFinite(minX) ? { minX, minY, maxX, maxY } : null;
}

export function zoomMapAt(view: MapView, factor: number, screenX: number, screenY: number): MapView {
    const zoom = clamp(view.zoom * factor, MAP_ZOOM_MIN, MAP_ZOOM_MAX);
    const worldX = (screenX - view.x) / view.zoom;
    const worldY = (screenY - view.y) / view.zoom;
    return { zoom, x: screenX - worldX * zoom, y: screenY - worldY * zoom };
}

// =====================================
// Loading and validation
// =====================================

const isObject = (value: unknown): value is Record<string, unknown> =>
    typeof value === "object" && value !== null && !Array.isArray(value);

const str = (value: unknown, fallback = "") => (typeof value === "string" ? value : fallback);
const num = (value: unknown, fallback = 0) =>
    typeof value === "number" && Number.isFinite(value) ? value : fallback;

function normalizeItem(value: unknown): MapItem | null {
    if (!isObject(value) || !assetInfo(str(value.asset))) return null;
    const item: MapItem = {
        id: str(value.id) || makeId(),
        asset: str(value.asset),
        x: num(value.x),
        y: num(value.y),
        rotation: normalizeRotation(num(value.rotation)),
        scale: clamp(num(value.scale, 1), 0.25, 4),
        label: str(value.label),
    };
    if (value.hidden === true) item.hidden = true;
    return item;
}

function normalizeRoom(value: unknown): MapRoom | null {
    if (!isObject(value)) return null;
    const w = Math.round(num(value.w));
    const h = Math.round(num(value.h));
    if (w < 1 || h < 1) return null;
    return {
        id: str(value.id) || makeId(),
        x: Math.round(num(value.x)),
        y: Math.round(num(value.y)),
        w,
        h,
        floor: ROOM_FLOORS.some((f) => f.value === value.floor) ? (value.floor as RoomFloor) : "flagstone",
    };
}

function normalizeFogOp(value: unknown): FogOp | null {
    if (!isObject(value)) return null;
    const shape = value.shape === "box" ? "box" : "brush";
    const points = Array.isArray(value.points) ? value.points.filter((p): p is number => typeof p === "number" && Number.isFinite(p)) : [];
    if (shape === "box" ? points.length !== 4 : points.length < 2 || points.length % 2 !== 0) return null;
    return {
        id: str(value.id) || makeId(),
        mode: value.mode === "hide" ? "hide" : "reveal",
        shape,
        points,
        width: clamp(num(value.width, GRID * 2), 0, 2000),
    };
}

function normalizeFog(value: unknown): Fog {
    const source = isObject(value) ? value : {};
    return {
        enabled: source.enabled === true,
        start: source.start === "revealed" ? "revealed" : "hidden",
        ops: Array.isArray(source.ops) ? source.ops.map(normalizeFogOp).filter((o): o is FogOp => o !== null) : [],
    };
}

function normalizeStroke(value: unknown): MapStroke | null {
    if (!isObject(value) || !BRUSH_KEYS.includes(value.brush as Brush)) return null;
    const brush = value.brush as Brush;
    const points = Array.isArray(value.points) ? value.points.filter((p): p is number => typeof p === "number" && Number.isFinite(p)) : [];
    if (points.length < 2) return null;
    const stroke: MapStroke = {
        id: str(value.id) || makeId(),
        brush,
        width: clamp(num(value.width, BRUSHES[brush].width), 1, 200),
        points: points.length % 2 === 0 ? points : points.slice(0, -1),
    };
    const color = str(value.color);
    if (brush === "ink" && /^#[0-9a-f]{3,8}$/i.test(color)) stroke.color = color;
    return stroke;
}

export function normalizeMap(value: unknown): BattleMap | null {
    if (!isObject(value)) return null;
    const view = isObject(value.view) ? value.view : {};
    const ground = GROUNDS.some((g) => g.value === value.ground) ? (value.ground as Ground) : "grass";
    const playerView = isObject(value.playerView) && num(value.playerView.span) > 0
        ? { cx: num(value.playerView.cx), cy: num(value.playerView.cy), span: num(value.playerView.span), at: num(value.playerView.at) }
        : undefined;
    return {
        id: str(value.id) || makeId(),
        name: str(value.name, "Map"),
        ground,
        showGrid: value.showGrid !== false,
        items: Array.isArray(value.items) ? value.items.map(normalizeItem).filter((i): i is MapItem => i !== null) : [],
        strokes: Array.isArray(value.strokes) ? value.strokes.map(normalizeStroke).filter((s): s is MapStroke => s !== null) : [],
        rooms: Array.isArray(value.rooms) ? value.rooms.map(normalizeRoom).filter((r): r is MapRoom => r !== null) : [],
        fog: normalizeFog(value.fog),
        view: { x: num(view.x), y: num(view.y), zoom: clamp(num(view.zoom, 1), MAP_ZOOM_MIN, MAP_ZOOM_MAX) },
        ...(playerView ? { playerView } : {}),
    };
}
