// =====================================
// Town builder
// =====================================
//
// The data behind the 3D town builder: a square grid where each tile holds at
// most one piece. Pure functions, so they can be tested without three.js.
// x runs west to east and z north to south; tile (0, 0) is the north-west corner.

export const STORAGE_KEY = "town-builder-v1";
export const DEFAULT_SIZE = 20;
export const MIN_SIZE = 8;
export const MAX_SIZE = 40;

export type PieceType =
    | "road"
    | "house"
    | "cottage"
    | "shop"
    | "apartment"
    | "tower"
    | "townhall"
    | "tree"
    | "park"
    | "fountain"
    | "water";

export type PieceCategory = "Roads" | "Homes" | "Town" | "Nature";

export interface PieceInfo {
    type: PieceType;
    label: string;
    category: PieceCategory;
    // People living there, for the population count.
    residents: number;
    // Jobs there, for the jobs count.
    jobs: number;
    // Swatch colour for the palette.
    color: string;
}

export const PIECES: PieceInfo[] = [
    { type: "road", label: "Road", category: "Roads", residents: 0, jobs: 0, color: "#3d4250" },
    { type: "cottage", label: "Cottage", category: "Homes", residents: 2, jobs: 0, color: "#e9d8a6" },
    { type: "house", label: "House", category: "Homes", residents: 4, jobs: 0, color: "#f4a261" },
    { type: "apartment", label: "Apartments", category: "Homes", residents: 24, jobs: 0, color: "#8ecae6" },
    { type: "shop", label: "Shop", category: "Town", residents: 0, jobs: 6, color: "#e76f51" },
    { type: "tower", label: "Office tower", category: "Town", residents: 0, jobs: 60, color: "#90a4c4" },
    { type: "townhall", label: "Town hall", category: "Town", residents: 0, jobs: 20, color: "#e8c547" },
    { type: "tree", label: "Tree", category: "Nature", residents: 0, jobs: 0, color: "#52b788" },
    { type: "park", label: "Park", category: "Nature", residents: 0, jobs: 1, color: "#74c69d" },
    { type: "fountain", label: "Fountain", category: "Nature", residents: 0, jobs: 0, color: "#a8dadc" },
    { type: "water", label: "Water", category: "Nature", residents: 0, jobs: 0, color: "#3a86ff" },
];

export const PIECE_TYPES = PIECES.map((p) => p.type);
export const pieceInfo = (type: PieceType) => PIECES.find((p) => p.type === type)!;

// Quarter turns clockwise, seen from above.
export type Rotation = 0 | 1 | 2 | 3;

export interface Tile {
    type: PieceType;
    rotation: Rotation;
}

export interface Town {
    version: 1;
    name: string;
    size: number;
    // Keyed "x,z". Empty tiles are left out.
    tiles: Record<string, Tile>;
}

export const tileKey = (x: number, z: number) => `${x},${z}`;

export function parseKey(key: string): [number, number] {
    const [x, z] = key.split(",").map(Number);
    return [x, z];
}

export const inBounds = (town: Pick<Town, "size">, x: number, z: number) =>
    Number.isInteger(x) && Number.isInteger(z) && x >= 0 && z >= 0 && x < town.size && z < town.size;

export function createTown(name = "New town", size = DEFAULT_SIZE): Town {
    return { version: 1, name, size: clampSize(size), tiles: {} };
}

function clampSize(size: number) {
    return Math.min(MAX_SIZE, Math.max(MIN_SIZE, Math.round(size) || DEFAULT_SIZE));
}

// ---- Editing

// Puts a piece on a tile, replacing what was there. Returns the same town
// when nothing changes, so a drag over the same tile doesn't add history.
export function placePiece(town: Town, x: number, z: number, type: PieceType, rotation: Rotation = 0): Town {
    if (!inBounds(town, x, z)) return town;
    const key = tileKey(x, z);
    const current = town.tiles[key];
    if (current && current.type === type && current.rotation === rotation) return town;
    return { ...town, tiles: { ...town.tiles, [key]: { type, rotation } } };
}

export function removePiece(town: Town, x: number, z: number): Town {
    const key = tileKey(x, z);
    if (!town.tiles[key]) return town;
    const tiles = { ...town.tiles };
    delete tiles[key];
    return { ...town, tiles };
}

export function rotatePiece(town: Town, x: number, z: number): Town {
    const key = tileKey(x, z);
    const tile = town.tiles[key];
    if (!tile) return town;
    return { ...town, tiles: { ...town.tiles, [key]: { ...tile, rotation: ((tile.rotation + 1) % 4) as Rotation } } };
}

// Grows or shrinks the grid. Shrinking drops pieces that fall outside.
export function resizeTown(town: Town, size: number): Town {
    const next = clampSize(size);
    const tiles = Object.fromEntries(Object.entries(town.tiles).filter(([key]) => {
        const [x, z] = parseKey(key);
        return x < next && z < next;
    }));
    return { ...town, size: next, tiles };
}

// Every tile on a straight line from a to b, both included (Bresenham). A fast
// drag reports the mouse only every few tiles; this fills in the ones between,
// stepping one tile at a time so a dragged road has no gaps or diagonal hops.
export function tilesBetween(a: [number, number], b: [number, number]): [number, number][] {
    const [x0, z0] = a;
    const [x1, z1] = b;
    const dx = Math.abs(x1 - x0);
    const dz = Math.abs(z1 - z0);
    const sx = x1 > x0 ? 1 : -1;
    const sz = z1 > z0 ? 1 : -1;
    const tiles: [number, number][] = [[x0, z0]];
    let x = x0;
    let z = z0;
    let error = dx - dz;
    while (x !== x1 || z !== z1) {
        // Move along one axis per step, so neighbouring tiles always share a side.
        if (2 * error > -dz && (error > 0 || z === z1)) {
            error -= dz;
            x += sx;
        }
        else {
            error += dx;
            z += sz;
        }
        tiles.push([x, z]);
    }
    return tiles;
}

// ---- Roads

export interface RoadLinks {
    north: boolean;
    east: boolean;
    south: boolean;
    west: boolean;
}

export type RoadShape = "single" | "end" | "straight" | "corner" | "tee" | "cross";

// Which neighbours are roads too, so a road tile can draw lanes towards them.
export function roadLinks(town: Town, x: number, z: number): RoadLinks {
    const isRoad = (dx: number, dz: number) => town.tiles[tileKey(x + dx, z + dz)]?.type === "road";
    return { north: isRoad(0, -1), east: isRoad(1, 0), south: isRoad(0, 1), west: isRoad(-1, 0) };
}

export function roadShape(links: RoadLinks): RoadShape {
    const count = [links.north, links.east, links.south, links.west].filter(Boolean).length;
    if (count === 4) return "cross";
    if (count === 3) return "tee";
    if (count === 1) return "end";
    if (count === 0) return "single";
    return (links.north && links.south) || (links.east && links.west) ? "straight" : "corner";
}

// Buildings face the road next to them, if there is one; otherwise they keep
// the rotation they were placed with. Checks south, east, north, west in turn.
export function facingRoad(town: Town, x: number, z: number): Rotation | null {
    const links = roadLinks(town, x, z);
    if (links.south) return 0;
    if (links.west) return 1;
    if (links.north) return 2;
    if (links.east) return 3;
    return null;
}

// ---- Stats

export interface TownStats {
    pieces: number;
    residents: number;
    jobs: number;
    roads: number;
    // Share of homes and workplaces with a road beside them, 0-100.
    connected: number;
    counts: Partial<Record<PieceType, number>>;
}

const NEEDS_ROAD: PieceType[] = ["cottage", "house", "apartment", "shop", "tower", "townhall"];

export function townStats(town: Town): TownStats {
    const counts: Partial<Record<PieceType, number>> = {};
    let residents = 0;
    let jobs = 0;
    let needRoad = 0;
    let haveRoad = 0;
    for (const [key, tile] of Object.entries(town.tiles)) {
        counts[tile.type] = (counts[tile.type] ?? 0) + 1;
        const info = pieceInfo(tile.type);
        residents += info.residents;
        jobs += info.jobs;
        if (NEEDS_ROAD.includes(tile.type)) {
            needRoad++;
            const [x, z] = parseKey(key);
            if (facingRoad(town, x, z) !== null) haveRoad++;
        }
    }
    return {
        pieces: Object.keys(town.tiles).length,
        residents,
        jobs,
        roads: counts.road ?? 0,
        connected: needRoad === 0 ? 100 : Math.round((haveRoad / needRoad) * 100),
        counts,
    };
}

// A stable 0-1 number per tile, so colours and heights vary between pieces
// but don't change every time the town is drawn.
export function tileNoise(x: number, z: number, salt = 0): number {
    let h = (x * 374761393 + z * 668265263 + salt * 2147483647) | 0;
    h = Math.imul(h ^ (h >>> 13), 1274126177);
    h ^= h >>> 16;
    return (h >>> 0) / 4294967295;
}

// ---- Saving

const isObject = (value: unknown): value is Record<string, unknown> =>
    typeof value === "object" && value !== null && !Array.isArray(value);

// Turns anything (a save, an import, junk) into a valid town, or null.
export function normalizeTown(value: unknown): Town | null {
    if (!isObject(value) || !isObject(value.tiles)) return null;
    const town = createTown(typeof value.name === "string" ? value.name : "Town", typeof value.size === "number" ? value.size : DEFAULT_SIZE);
    for (const [key, raw] of Object.entries(value.tiles)) {
        const [x, z] = parseKey(key);
        if (!inBounds(town, x, z) || !isObject(raw) || !PIECE_TYPES.includes(raw.type as PieceType)) continue;
        const rotation = [0, 1, 2, 3].includes(raw.rotation as number) ? (raw.rotation as Rotation) : 0;
        town.tiles[tileKey(x, z)] = { type: raw.type as PieceType, rotation };
    }
    return town;
}

export function parseTown(text: string | null): Town | null {
    if (!text) return null;
    try {
        return normalizeTown(JSON.parse(text));
    }
    catch {
        return null;
    }
}

// A small starter town, so the first visit isn't an empty field.
export function createStarterTown(): Town {
    let town = createTown("Oakvale");
    const road = (x: number, z: number) => { town = placePiece(town, x, z, "road"); };
    for (let x = 3; x <= 16; x++) road(x, 10);
    for (let z = 4; z <= 16; z++) road(10, z);
    const put = (x: number, z: number, type: PieceType) => { town = placePiece(town, x, z, type); };
    put(9, 9, "townhall");
    put(11, 9, "fountain");
    [[6, 9], [7, 9], [8, 9], [12, 9], [13, 9]].forEach(([x, z]) => put(x, z, "house"));
    [[6, 11], [7, 11], [13, 11], [14, 11]].forEach(([x, z]) => put(x, z, "cottage"));
    [[9, 11], [11, 11]].forEach(([x, z]) => put(x, z, "shop"));
    [[9, 6], [11, 6]].forEach(([x, z]) => put(x, z, "apartment"));
    put(11, 13, "park");
    [[3, 4], [4, 5], [15, 4], [16, 15], [3, 15], [5, 14], [14, 5]].forEach(([x, z]) => put(x, z, "tree"));
    [[16, 3], [17, 3], [17, 4], [16, 4]].forEach(([x, z]) => put(x, z, "water"));
    return town;
}
