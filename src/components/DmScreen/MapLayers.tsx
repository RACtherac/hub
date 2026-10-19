import {
    BRUSHES,
    GRID,
    ROOM_WALL,
    assetInfo,
    groundStyle,
    itemLayer,
    strokePath,
    type BattleMap,
    type Brush,
    type Fog,
    type FogOp,
    type MapItem,
    type MapRoom,
    type MapStroke,
} from "../../utils/dmMap";
import { AssetArt, type RoadPart } from "./mapAssets";

// =====================================
// Drawing a map
// =====================================
//
// Shared by the DM's map maker and the player view. The DM sees pieces marked
// hidden (faded); the players don't see them at all.

export type Audience = "dm" | "player";

// Big enough that the edges are never on screen.
export const WORLD_EXTENT = 20000;

const ROOM_WALL_COLOR = "#4a4540";

const WORLD_RECT = { x: -WORLD_EXTENT, y: -WORLD_EXTENT, width: WORLD_EXTENT * 2, height: WORLD_EXTENT * 2 };

// Patterns are in world units, so they line up with the grid.
function MapPatterns({ gridLine }: { gridLine: string }) {
    return (
        <defs>
            <pattern id="dms-map-grid" width={GRID} height={GRID} patternUnits="userSpaceOnUse">
                <path d={`M ${GRID} 0 L 0 0 0 ${GRID}`} fill="none" stroke={gridLine} strokeWidth={1} />
            </pattern>
            <pattern id="dms-floor-flagstone" width={GRID} height={GRID} patternUnits="userSpaceOnUse">
                <rect width={GRID} height={GRID} fill="#b8b1a3" />
                <path d="M 0 0.5 H 40 M 0 20 H 40 M 20 0 V 20 M 0.5 20 V 40" stroke="#8f887b" strokeWidth={1.5} fill="none" />
                <rect x={3} y={4} width={12} height={6} fill="#c4bdb0" />
                <rect x={24} y={25} width={10} height={8} fill="#ada597" />
            </pattern>
            <pattern id="dms-floor-tiles" width={GRID / 2} height={GRID / 2} patternUnits="userSpaceOnUse">
                <rect width={GRID / 2} height={GRID / 2} fill="#cbc5b8" stroke="#9c9588" strokeWidth={1.5} />
            </pattern>
            <pattern id="dms-floor-wood" width={GRID} height={GRID} patternUnits="userSpaceOnUse">
                <rect width={GRID} height={GRID} fill="#a87b4f" />
                <path d="M 0 0.5 H 40 M 0 10 H 40 M 0 20 H 40 M 0 30 H 40 M 12 0 V 10 M 30 10 V 20 M 6 20 V 30 M 24 30 V 40" stroke="#7d5634" strokeWidth={1.2} fill="none" />
            </pattern>
            <pattern id="dms-floor-cave" width={GRID * 2} height={GRID * 2} patternUnits="userSpaceOnUse">
                <rect width={GRID * 2} height={GRID * 2} fill="#857868" />
                <circle cx={14} cy={18} r={6} fill="#7a6e5f" />
                <circle cx={58} cy={30} r={9} fill="#8e8272" />
                <circle cx={30} cy={62} r={7} fill="#776b5c" />
                <circle cx={68} cy={70} r={3} fill="#6d6253" />
            </pattern>
        </defs>
    );
}

// Everything on the map except fog: ground, rooms, pieces and strokes, in
// the order they stack.
export function MapContent({ map, audience }: { map: BattleMap; audience: Audience }) {
    const ground = groundStyle(map.ground);
    const items = audience === "player" ? map.items.filter((i) => !i.hidden) : map.items;
    const strokesFor = (brushes: Brush[]) => map.strokes.filter((s) => brushes.includes(s.brush));
    const groundItems = items.filter((i) => itemLayer(i.asset) === "ground");
    const roadItems = items.filter((i) => itemLayer(i.asset) === "road");
    const objectItems = items.filter((i) => itemLayer(i.asset) === "object");

    return (
        <>
            <MapPatterns gridLine={ground.line} />
            <rect {...WORLD_RECT} fill={ground.color} />

            <RoomLayer rooms={map.rooms} />
            {/* Over the rooms so floors show the grid, but clicks go through to them. */}
            {map.showGrid && <rect {...WORLD_RECT} fill="url(#dms-map-grid)" pointerEvents="none" />}

            {groundItems.map((item) => <ItemShape key={item.id} item={item} />)}

            <StrokeLayer strokes={strokesFor(["river"])} />

            {/* Roads: every edge first, then every fill, so crossings merge. */}
            {roadItems.map((item) => <ItemShape key={`${item.id}-edge`} item={item} part="edge" />)}
            <StrokeLayer strokes={strokesFor(["road", "cobble"])} part="edge" />
            {roadItems.map((item) => <ItemShape key={`${item.id}-fill`} item={item} part="fill" />)}
            <StrokeLayer strokes={strokesFor(["road", "cobble"])} part="fill" />

            {objectItems.map((item) => <ItemShape key={item.id} item={item} faded={audience === "dm" && item.hidden} />)}

            <StrokeLayer strokes={strokesFor(["wall"])} />
            <StrokeLayer strokes={strokesFor(["ink"])} />
        </>
    );
}

// All walls first, then all floors on top: where rooms touch, one room's
// floor covers the other's wall, so they open into each other.
function RoomLayer({ rooms }: { rooms: MapRoom[] }) {
    if (rooms.length === 0) return null;
    return (
        <>
            {rooms.map((room) => (
                <rect
                    key={`${room.id}-wall`}
                    data-room-id={room.id}
                    x={room.x}
                    y={room.y}
                    width={room.w}
                    height={room.h}
                    fill={ROOM_WALL_COLOR}
                    stroke={ROOM_WALL_COLOR}
                    strokeWidth={ROOM_WALL * 2}
                />
            ))}
            {rooms.map((room) => (
                <rect
                    key={`${room.id}-floor`}
                    data-room-id={room.id}
                    x={room.x}
                    y={room.y}
                    width={room.w}
                    height={room.h}
                    fill={`url(#dms-floor-${room.floor})`}
                />
            ))}
        </>
    );
}

export function ItemShape({ item, part, faded }: { item: MapItem; part?: RoadPart; faded?: boolean }) {
    const info = assetInfo(item.asset);
    const w = info?.w ?? GRID;
    const h = info?.h ?? GRID;
    const showLabel = item.label && item.asset !== "text" && part !== "edge";
    return (
        <g data-item-id={item.id} transform={`translate(${item.x} ${item.y})`} opacity={faded ? 0.5 : undefined}>
            <g transform={`rotate(${item.rotation}) scale(${item.scale})`}>
                <AssetArt asset={item.asset} label={item.label} part={part} />
                {/* Makes the whole box grabbable, not just the painted parts. */}
                <rect x={-w / 2} y={-h / 2} width={w} height={h} fill="transparent" />
            </g>
            {showLabel && (
                <text
                    y={(Math.max(w, h) / 2) * item.scale + 14}
                    textAnchor="middle"
                    fontFamily="Georgia, 'Times New Roman', serif"
                    fontSize={14}
                    fontWeight={700}
                    fill="#1c1c1c"
                    stroke="#f6f0e0"
                    strokeWidth={3}
                    strokeLinejoin="round"
                    paintOrder="stroke"
                >
                    {item.label}
                </text>
            )}
        </g>
    );
}

export function StrokeShape({ stroke, part }: { stroke: MapStroke; part?: RoadPart }) {
    const style = BRUSHES[stroke.brush];
    const d = strokePath(stroke.points);
    const common = { d, fill: "none", strokeLinecap: "round" as const, strokeLinejoin: "round" as const };
    return (
        <g data-stroke-id={stroke.id}>
            {part !== "fill" && style.edgeExtra > 0 && (
                <path {...common} stroke={style.edge} strokeWidth={stroke.width + style.edgeExtra} />
            )}
            {part !== "edge" && <path {...common} stroke={stroke.color ?? style.fill} strokeWidth={stroke.width} />}
            {/* Thin ink is hard to click; give it a wider invisible target. */}
            {part !== "edge" && stroke.width < 12 && <path {...common} stroke="transparent" strokeWidth={12} />}
        </g>
    );
}

function StrokeLayer({ strokes, part }: { strokes: MapStroke[]; part?: RoadPart }) {
    if (part) return <>{strokes.map((s) => <StrokeShape key={s.id} stroke={s} part={part} />)}</>;
    // Rivers and walls also merge where they cross: edges first, then fills.
    return (
        <>
            {strokes.map((s) => <StrokeShape key={`${s.id}-edge`} stroke={s} part="edge" />)}
            {strokes.map((s) => <StrokeShape key={`${s.id}-fill`} stroke={s} part="fill" />)}
        </>
    );
}

// =====================================
// Fog of war
// =====================================
//
// A mask: white is fogged, black is clear. It starts all one or the other,
// then each fog op paints on top in order.

function FogShape({ op }: { op: FogOp }) {
    const colour = op.mode === "hide" ? "white" : "black";
    if (op.shape === "box") {
        const [x1, y1, x2, y2] = op.points;
        return <rect x={x1} y={y1} width={x2 - x1} height={y2 - y1} fill={colour} />;
    }
    return (
        <path
            d={strokePath(op.points)}
            fill="none"
            stroke={colour}
            strokeWidth={op.width}
            strokeLinecap="round"
            strokeLinejoin="round"
        />
    );
}

interface FogLayerProps {
    fog: Fog;
    audience: Audience;
    // A fog stroke or box still being drawn.
    draft?: FogOp | null;
}

export function FogLayer({ fog, audience, draft }: FogLayerProps) {
    if (!fog.enabled) return null;
    const id = `dms-fog-${audience}`;
    return (
        <g pointerEvents="none">
            <defs>
                <mask id={id} maskUnits="userSpaceOnUse" {...WORLD_RECT}>
                    <rect {...WORLD_RECT} fill={fog.start === "hidden" ? "white" : "black"} />
                    {fog.ops.map((op) => <FogShape key={op.id} op={op} />)}
                    {draft && <FogShape op={draft} />}
                </mask>
            </defs>
            {/* The DM sees through a blue tint, so fogged areas stand out even on a dark map; the players see solid black. */}
            <rect {...WORLD_RECT} fill={audience === "player" ? "#060608" : "#1b2a6b"} opacity={audience === "player" ? 1 : 0.6} mask={`url(#${id})`} />
        </g>
    );
}
