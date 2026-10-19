import type { ReactNode } from "react";

import { BRUSHES, assetInfo, itemLayer } from "../../utils/dmMap";

// =====================================
// Map pieces, drawn top-down
// =====================================
//
// Every piece is drawn centred on 0,0 inside its own w × h box (sizes are in
// utils/dmMap.ts). Colours are inline so an exported PNG looks the same as the
// screen.

const OUTLINE = "#2b2118";

// Road tiles are drawn in two passes, all edges first and then all fills, so
// tiles and drawn roads merge where they meet instead of showing seams.
export type RoadPart = "edge" | "fill";

const ROAD_EDGE_WIDTH = 40;
const ROAD_FILL_WIDTH = 34;

function RoadPaths({ d, part }: { d: string[]; part: RoadPart }) {
    const road = BRUSHES.road;
    return (
        <>
            {d.map((path) => (
                <path
                    key={path}
                    d={path}
                    fill="none"
                    stroke={part === "edge" ? road.edge : road.fill}
                    strokeWidth={part === "edge" ? ROAD_EDGE_WIDTH : ROAD_FILL_WIDTH}
                />
            ))}
        </>
    );
}

// A pitched roof seen from above: two halves either side of a ridge, with
// rows of tiles running along it. Drawn horizontally; rotate for vertical.
function GableRoof({ w, h, light, dark, x = 0, y = 0, vertical = false }: {
    w: number; h: number; light: string; dark: string; x?: number; y?: number; vertical?: boolean;
}) {
    const rows: number[] = [];
    for (let d = 7; d < h / 2 - 3; d += 7) rows.push(d);
    return (
        <g transform={`translate(${x} ${y})${vertical ? " rotate(90)" : ""}`}>
            <rect x={-w / 2} y={-h / 2} width={w} height={h} rx={2} fill={dark} stroke={OUTLINE} strokeWidth={2} />
            <rect x={-w / 2 + 1} y={-h / 2 + 1} width={w - 2} height={h / 2 - 1} fill={light} />
            {rows.map((d) => (
                <g key={d} stroke={OUTLINE} strokeOpacity={0.25} strokeWidth={1}>
                    <line x1={-w / 2 + 2} y1={-d} x2={w / 2 - 2} y2={-d} />
                    <line x1={-w / 2 + 2} y1={d} x2={w / 2 - 2} y2={d} />
                </g>
            ))}
            <line x1={-w / 2} y1={0} x2={w / 2} y2={0} stroke={OUTLINE} strokeWidth={2} />
        </g>
    );
}

// A pyramid roof seen from above: four faces meeting in the middle.
function HipRoof({ s, light, mid, dark, x = 0, y = 0 }: {
    s: number; light: string; mid: string; dark: string; x?: number; y?: number;
}) {
    const h = s / 2;
    return (
        <g transform={`translate(${x} ${y})`} stroke={OUTLINE} strokeWidth={1.5} strokeLinejoin="round">
            <polygon points={`${-h},${-h} ${h},${-h} 0,0`} fill={light} />
            <polygon points={`${h},${-h} ${h},${h} 0,0`} fill={mid} />
            <polygon points={`${h},${h} ${-h},${h} 0,0`} fill={dark} />
            <polygon points={`${-h},${h} ${-h},${-h} 0,0`} fill={mid} />
            <rect x={-h} y={-h} width={s} height={s} fill="none" strokeWidth={2} />
        </g>
    );
}

const Chimney = ({ x, y }: { x: number; y: number }) => (
    <rect x={x - 4} y={y - 4} width={8} height={8} fill="#6d6a66" stroke={OUTLINE} strokeWidth={1.5} />
);

function Tree({ x = 0, y = 0, r = 30 }: { x?: number; y?: number; r?: number }) {
    const k = r / 30;
    return (
        <g transform={`translate(${x} ${y}) scale(${k})`}>
            <circle r={29} fill="#1f3d1c" opacity={0.35} cx={3} cy={4} />
            <circle r={18} cx={-10} cy={-6} fill="#3f7d3a" stroke="#244a21" strokeWidth={1.5} />
            <circle r={17} cx={10} cy={-8} fill="#468a40" stroke="#244a21" strokeWidth={1.5} />
            <circle r={18} cx={0} cy={10} fill="#3f7d3a" stroke="#244a21" strokeWidth={1.5} />
            <circle r={14} cx={0} cy={-2} fill="#55a04c" />
            <circle r={6} cx={-5} cy={-8} fill="#6dba60" />
        </g>
    );
}

function star(points: number, outer: number, inner: number) {
    return Array.from({ length: points * 2 }, (_, i) => {
        const r = i % 2 === 0 ? outer : inner;
        const a = (Math.PI * i) / points - Math.PI / 2;
        return `${(Math.cos(a) * r).toFixed(1)},${(Math.sin(a) * r).toFixed(1)}`;
    }).join(" ");
}

const ART: Record<string, (part: RoadPart | undefined) => ReactNode> = {
    // ---- Buildings
    "house-small": () => (
        <>
            <GableRoof w={80} h={60} light="#b5743f" dark="#8f5730" />
            <Chimney x={22} y={-18} />
        </>
    ),
    "house-large": () => (
        <>
            <GableRoof w={120} h={80} light="#7a8794" dark="#5c6874" />
            <Chimney x={-38} y={-24} />
            <Chimney x={40} y={22} />
        </>
    ),
    "house-hip": () => <HipRoof s={80} light="#c0814a" mid="#a46a3b" dark="#85532c" />,
    "house-l": () => (
        <>
            <GableRoof w={120} h={48} light="#a0603a" dark="#7e4a2c" x={-36} y={0} vertical />
            <GableRoof w={120} h={48} light="#b06a40" dark="#8a5232" x={0} y={-36} />
            <Chimney x={30} y={-48} />
        </>
    ),
    tavern: () => (
        <>
            <rect x={-60} y={20} width={120} height={30} fill="#9b6b3c" stroke={OUTLINE} strokeWidth={2} />
            {[-48, -36, -24, -12, 0, 12, 24, 36, 48].map((x) => (
                <line key={x} x1={x} y1={20} x2={x} y2={50} stroke={OUTLINE} strokeOpacity={0.3} />
            ))}
            <GableRoof w={160} h={70} light="#a8473a" dark="#82362c" y={-15} />
            <Chimney x={-58} y={-36} />
            <Chimney x={58} y={4} />
            <circle cx={50} cy={36} r={7} fill="#e8c547" stroke={OUTLINE} strokeWidth={1.5} />
        </>
    ),
    barn: () => (
        <>
            <GableRoof w={120} h={80} light="#9c3a2e" dark="#772b22" />
            <rect x={-12} y={-6} width={24} height={12} fill="#d9cfb8" stroke={OUTLINE} strokeWidth={1.5} />
        </>
    ),
    temple: () => (
        <>
            <GableRoof w={160} h={64} light="#8a96a3" dark="#6a7581" vertical />
            <GableRoof w={120} h={48} light="#8a96a3" dark="#6a7581" y={-34} />
            <HipRoof s={44} light="#a6b0ba" mid="#87929d" dark="#6a7581" y={56} />
            <circle cy={56} r={4} fill="#e8c547" stroke={OUTLINE} />
        </>
    ),
    tower: () => (
        <>
            <circle r={39} fill="#8a8680" stroke={OUTLINE} strokeWidth={2} />
            <circle r={31} fill="#5d6b7a" stroke={OUTLINE} strokeWidth={1.5} />
            {Array.from({ length: 8 }, (_, i) => {
                const a = (Math.PI * i) / 4;
                return <line key={i} x1={0} y1={0} x2={Math.cos(a) * 31} y2={Math.sin(a) * 31} stroke={OUTLINE} strokeOpacity={0.45} />;
            })}
            <circle r={4} fill="#e8c547" stroke={OUTLINE} />
        </>
    ),
    keep: () => {
        const merlons = [-64, -40, -16, 8, 32, 56];
        return (
            <>
                <rect x={-80} y={-80} width={160} height={160} fill="#8a8680" stroke={OUTLINE} strokeWidth={2.5} />
                <rect x={-64} y={-64} width={128} height={128} fill="#a88a62" stroke={OUTLINE} strokeWidth={1.5} />
                {merlons.map((m) => (
                    <g key={m} fill="#6f6b66">
                        <rect x={m} y={-78} width={8} height={8} />
                        <rect x={m} y={70} width={8} height={8} />
                        <rect x={-78} y={m} width={8} height={8} />
                        <rect x={70} y={m} width={8} height={8} />
                    </g>
                ))}
                <HipRoof s={64} light="#7a8794" mid="#5f6b77" dark="#4c5661" x={-8} y={-8} />
                {[[-66, -66], [66, -66], [-66, 66], [66, 66]].map(([x, y]) => (
                    <g key={`${x},${y}`}>
                        <circle cx={x} cy={y} r={18} fill="#8a8680" stroke={OUTLINE} strokeWidth={2} />
                        <circle cx={x} cy={y} r={11} fill="#5d6b7a" stroke={OUTLINE} />
                    </g>
                ))}
                <rect x={-12} y={66} width={24} height={14} fill="#5c3b1e" stroke={OUTLINE} strokeWidth={1.5} />
            </>
        );
    },
    hut: () => (
        <>
            <circle r={29} fill="#c9a24f" stroke={OUTLINE} strokeWidth={2} />
            <circle r={20} fill="none" stroke="#9c7a33" strokeWidth={2} />
            <circle r={11} fill="none" stroke="#9c7a33" strokeWidth={2} />
            <circle r={3} fill="#6d5222" />
        </>
    ),
    tent: () => (
        <g stroke={OUTLINE} strokeWidth={1.5} strokeLinejoin="round">
            <polygon points="-28,-28 28,-28 0,0" fill="#e2d6b0" />
            <polygon points="28,-28 28,28 0,0" fill="#c9b98c" />
            <polygon points="28,28 -28,28 0,0" fill="#b3a275" />
            <polygon points="-28,28 -28,-28 0,0" fill="#c9b98c" />
            <circle r={3} fill="#5c3b1e" />
        </g>
    ),
    stall: () => (
        <>
            {[0, 1, 2, 3, 4, 5].map((i) => (
                <rect key={i} x={-30 + i * 10} y={-20} width={10} height={40} fill={i % 2 === 0 ? "#c0392b" : "#f2ead8"} />
            ))}
            <rect x={-30} y={-20} width={60} height={40} fill="none" stroke={OUTLINE} strokeWidth={2} />
            <line x1={-30} y1={0} x2={30} y2={0} stroke={OUTLINE} strokeOpacity={0.4} />
        </>
    ),

    // ---- Roads
    "road-straight": (part) => <RoadPaths part={part ?? "fill"} d={["M -60 0 L 60 0"]} />,
    "road-curve": (part) => <RoadPaths part={part ?? "fill"} d={["M -60 0 A 60 60 0 0 1 0 60"]} />,
    "road-t": (part) => <RoadPaths part={part ?? "fill"} d={["M -60 -20 L 60 -20", "M 0 -20 L 0 40"]} />,
    "road-cross": (part) => <RoadPaths part={part ?? "fill"} d={["M -60 0 L 60 0", "M 0 -60 L 0 60"]} />,
    plaza: () => (
        <>
            <circle r={79} fill={BRUSHES.cobble.fill} stroke={BRUSHES.cobble.edge} strokeWidth={3} />
            {[64, 50, 36].map((r) => (
                <circle key={r} r={r} fill="none" stroke={BRUSHES.cobble.edge} strokeOpacity={0.35} strokeDasharray="6 4" />
            ))}
            <circle r={20} fill="#8a8680" stroke={OUTLINE} strokeWidth={2} />
            <circle r={14} fill="#5b9bd5" stroke="#2f5f8c" strokeWidth={1.5} />
            <circle r={4} fill="#8a8680" stroke={OUTLINE} />
        </>
    ),
    bridge: () => (
        <>
            <rect x={-60} y={-18} width={120} height={36} fill="#9b6b3c" stroke={OUTLINE} strokeWidth={2} />
            {Array.from({ length: 14 }, (_, i) => -52 + i * 8).map((x) => (
                <line key={x} x1={x} y1={-18} x2={x} y2={18} stroke={OUTLINE} strokeOpacity={0.35} />
            ))}
            <rect x={-60} y={-24} width={120} height={6} fill="#6b4524" stroke={OUTLINE} strokeWidth={1.5} />
            <rect x={-60} y={18} width={120} height={6} fill="#6b4524" stroke={OUTLINE} strokeWidth={1.5} />
        </>
    ),

    // ---- Nature
    tree: () => <Tree />,
    pine: () => (
        <>
            <polygon points={star(9, 25, 15)} fill="#24472b" opacity={0.35} transform="translate(3 4)" />
            <polygon points={star(9, 24, 14)} fill="#2f5e3a" stroke="#1d3a24" strokeWidth={1.5} strokeLinejoin="round" />
            <polygon points={star(9, 14, 8)} fill="#3d7448" />
            <circle r={3} fill="#5c3b1e" />
        </>
    ),
    bush: () => (
        <g stroke="#2c5a26" strokeWidth={1.2}>
            <circle cx={-6} cy={-3} r={9} fill="#4a8a3f" />
            <circle cx={6} cy={-4} r={8} fill="#559848" />
            <circle cx={0} cy={6} r={9} fill="#4a8a3f" />
        </g>
    ),
    rock: () => (
        <>
            <polygon points="-17,4 -10,-12 6,-14 17,-3 13,12 -6,13" fill="#8c8a86" stroke="#55534f" strokeWidth={2} strokeLinejoin="round" />
            <polygon points="-10,-10 5,-12 0,-2 -9,0" fill="#aaa8a3" />
        </>
    ),
    pond: () => (
        <>
            <path d="M -56 -6 C -54 -34, -10 -40, 20 -36 C 50 -32, 60 -10, 56 10 C 52 34, 10 40, -20 36 C -46 32, -58 18, -56 -6 Z" fill="#4f8fc7" stroke="#2f5f8c" strokeWidth={3} />
            <path d="M -36 -4 C -34 -20, -4 -24, 16 -20 C 34 -16, 38 -4, 34 8 C 28 22, 0 24, -18 20 C -32 16, -38 8, -36 -4 Z" fill="#6aa7dc" />
            <circle cx={30} cy={-20} r={5} fill="#5fa852" stroke="#2c5a26" />
        </>
    ),
    field: () => (
        <>
            <rect x={-80} y={-60} width={160} height={120} fill="#c9ad52" stroke="#7d6a2c" strokeWidth={3} />
            {Array.from({ length: 11 }, (_, i) => -50 + i * 10).map((y) => (
                <line key={y} x1={-76} y1={y} x2={76} y2={y} stroke="#9c8435" strokeWidth={2} />
            ))}
        </>
    ),

    // ---- Props
    well: () => (
        <>
            <circle r={17} fill="#8a8680" stroke={OUTLINE} strokeWidth={2} />
            <circle r={10} fill="#2b4c6e" stroke={OUTLINE} strokeWidth={1.5} />
            <rect x={-18} y={-2} width={36} height={4} fill="#6b4524" stroke={OUTLINE} />
        </>
    ),
    fence: () => (
        <>
            <rect x={-40} y={-2} width={80} height={4} fill="#9b6b3c" stroke={OUTLINE} strokeWidth={1} />
            {[-38, -19, 0, 19, 38].map((x) => (
                <rect key={x} x={x - 3} y={-5} width={6} height={10} fill="#6b4524" stroke={OUTLINE} strokeWidth={1} />
            ))}
        </>
    ),
    cart: () => (
        <>
            <line x1={14} y1={-5} x2={25} y2={-3} stroke="#6b4524" strokeWidth={3} />
            <line x1={14} y1={5} x2={25} y2={3} stroke="#6b4524" strokeWidth={3} />
            <rect x={-13} y={-15} width={10} height={4} fill="#3a2a1c" />
            <rect x={-13} y={11} width={10} height={4} fill="#3a2a1c" />
            <rect x={-24} y={-11} width={38} height={22} fill="#9b6b3c" stroke={OUTLINE} strokeWidth={2} />
            <line x1={-24} y1={0} x2={14} y2={0} stroke={OUTLINE} strokeOpacity={0.35} />
        </>
    ),
    campfire: () => (
        <>
            {Array.from({ length: 8 }, (_, i) => {
                const a = (Math.PI * i) / 4;
                return <circle key={i} cx={Math.cos(a) * 11} cy={Math.sin(a) * 11} r={4} fill="#8a8680" stroke={OUTLINE} />;
            })}
            <circle r={8} fill="#e8732e" />
            <circle r={4.5} fill="#f6c443" />
        </>
    ),
    barrel: () => (
        <>
            <circle r={9} fill="#9b6b3c" stroke={OUTLINE} strokeWidth={1.5} />
            <circle r={6} fill="none" stroke="#5a5854" strokeWidth={1.5} />
        </>
    ),
    crate: () => (
        <>
            <rect x={-11} y={-11} width={22} height={22} fill="#b5864c" stroke={OUTLINE} strokeWidth={1.5} />
            <path d="M -11 -11 L 11 11 M 11 -11 L -11 11" stroke={OUTLINE} strokeOpacity={0.5} />
        </>
    ),
    statue: () => (
        <>
            <rect x={-19} y={-19} width={38} height={38} fill="#a9a7a2" stroke={OUTLINE} strokeWidth={2} />
            <rect x={-13} y={-13} width={26} height={26} fill="#8c8a86" />
            <circle r={7} fill="#cfcac0" stroke={OUTLINE} strokeWidth={1.5} />
        </>
    ),
    grave: () => (
        <>
            <rect x={-9} y={-14} width={18} height={28} rx={8} fill="#a9a7a2" stroke={OUTLINE} strokeWidth={1.5} />
            <path d="M 0 -8 L 0 6 M -5 -3 L 5 -3" stroke={OUTLINE} strokeWidth={1.5} />
        </>
    ),
    text: () => null,

    // ---- Dungeon
    door: () => (
        <>
            <rect x={-20} y={-6} width={40} height={12} fill="#8b5a2b" stroke={OUTLINE} strokeWidth={2} />
            <line x1={-20} y1={0} x2={20} y2={0} stroke={OUTLINE} strokeOpacity={0.35} />
            <rect x={-20} y={-6} width={5} height={12} fill="#3a2a1c" />
            <rect x={15} y={-6} width={5} height={12} fill="#3a2a1c" />
        </>
    ),
    "door-double": () => (
        <>
            <rect x={-40} y={-6} width={80} height={12} fill="#8b5a2b" stroke={OUTLINE} strokeWidth={2} />
            <line x1={0} y1={-6} x2={0} y2={6} stroke={OUTLINE} strokeWidth={2} />
            <line x1={-40} y1={0} x2={40} y2={0} stroke={OUTLINE} strokeOpacity={0.35} />
            <rect x={-40} y={-6} width={5} height={12} fill="#3a2a1c" />
            <rect x={35} y={-6} width={5} height={12} fill="#3a2a1c" />
        </>
    ),
    "secret-door": () => (
        <>
            <rect x={-20} y={-6} width={40} height={12} fill="#1d1b1a" stroke="#c0392b" strokeWidth={1.5} strokeDasharray="4 3" />
            <text textAnchor="middle" dominantBaseline="central" fontFamily="Georgia, serif" fontSize={11} fontWeight={700} fill="#e06656">S</text>
        </>
    ),
    bars: () => (
        <>
            <rect x={-20} y={-3} width={40} height={6} fill="#4a4a50" stroke={OUTLINE} strokeWidth={1.5} />
            {[-15, -9, -3, 3, 9, 15].map((x) => <circle key={x} cx={x} cy={0} r={2} fill="#9a9aa2" />)}
        </>
    ),
    stairs: () => (
        <>
            {Array.from({ length: 8 }, (_, i) => (
                <rect
                    key={i}
                    x={-20}
                    y={-40 + i * 10}
                    width={40}
                    height={10}
                    fill={`hsl(30 6% ${78 - i * 6}%)`}
                    stroke={OUTLINE}
                    strokeWidth={1}
                />
            ))}
            <rect x={-20} y={-40} width={40} height={80} fill="none" stroke={OUTLINE} strokeWidth={2} />
            <path d="M 0 -28 L 0 26 M -6 18 L 0 26 L 6 18" fill="none" stroke="#f2ead8" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
        </>
    ),
    pillar: () => (
        <>
            <circle r={14} cx={2} cy={3} fill="#000" opacity={0.35} />
            <circle r={13} fill="#a9a59c" stroke={OUTLINE} strokeWidth={2} />
            <circle r={8} fill="#c4bfb4" />
        </>
    ),
    chest: () => (
        <>
            <rect x={-14} y={-9} width={28} height={18} rx={2} fill="#9b6b3c" stroke={OUTLINE} strokeWidth={2} />
            <rect x={-14} y={-2} width={28} height={4} fill="#d4a93a" />
            <rect x={-3} y={-3} width={6} height={6} fill="#d4a93a" stroke={OUTLINE} />
        </>
    ),
    altar: () => (
        <>
            <rect x={-38} y={-18} width={76} height={36} fill="#8f8a80" stroke={OUTLINE} strokeWidth={2} />
            <rect x={-32} y={-12} width={64} height={24} fill="#b3ada1" />
            <rect x={-30} y={-6} width={60} height={12} fill="#6e2a2a" />
            {[-26, 26].map((x) => (
                <g key={x}>
                    <circle cx={x} cy={-10} r={3} fill="#f2ead8" stroke={OUTLINE} strokeWidth={0.8} />
                    <circle cx={x} cy={-10} r={1.4} fill="#f6c443" />
                </g>
            ))}
        </>
    ),
    sarcophagus: () => (
        <>
            <polygon points="-14,-38 14,-38 19,-18 14,38 -14,38 -19,-18" fill="#8f8a80" stroke={OUTLINE} strokeWidth={2} strokeLinejoin="round" />
            <polygon points="-9,-30 9,-30 13,-16 9,30 -9,30 -13,-16" fill="#aaa498" />
            <path d="M 0 -24 L 0 10 M -7 -12 L 7 -12" stroke={OUTLINE} strokeOpacity={0.5} strokeWidth={2} />
        </>
    ),
    rubble: () => (
        <g stroke="#3f3d3a" strokeWidth={1.2} strokeLinejoin="round">
            <polygon points="-16,-4 -8,-14 2,-10 0,0 -10,4" fill="#8c8a86" />
            <polygon points="2,-6 12,-12 18,-2 10,6" fill="#7a7874" />
            <polygon points="-12,8 -2,4 4,14 -6,18" fill="#9a9894" />
            <polygon points="6,8 14,6 16,16 8,18" fill="#85837f" />
            <circle cx={-2} cy={-2} r={2.5} fill="#6f6d6a" />
            <circle cx={14} cy={-14} r={2} fill="#6f6d6a" />
        </g>
    ),
    bones: () => (
        <g stroke="#6b6458" strokeWidth={1}>
            <path d="M -13 6 L 6 -6" stroke="#ece5d3" strokeWidth={3} strokeLinecap="round" />
            <path d="M -8 -8 L 10 8" stroke="#ece5d3" strokeWidth={3} strokeLinecap="round" />
            <circle cx={8} cy={-1} r={6} fill="#ece5d3" />
            <circle cx={6} cy={-2} r={1.4} fill="#3a3530" stroke="none" />
            <circle cx={10} cy={-2} r={1.4} fill="#3a3530" stroke="none" />
        </g>
    ),
    trap: () => (
        <>
            <rect x={-19} y={-19} width={38} height={38} fill="#c0392b" fillOpacity={0.15} stroke="#c0392b" strokeWidth={2} strokeDasharray="5 3" />
            <path d="M -10 -10 L 10 10 M 10 -10 L -10 10" stroke="#c0392b" strokeWidth={2.5} strokeLinecap="round" />
        </>
    ),
    pit: () => (
        <>
            <rect x={-19} y={-19} width={38} height={38} fill="#5a5651" stroke={OUTLINE} strokeWidth={2} />
            <rect x={-14} y={-14} width={28} height={28} fill="#2a2725" />
            <rect x={-9} y={-9} width={18} height={18} fill="#0d0c0b" />
        </>
    ),
    torch: () => (
        <>
            <circle r={8} fill="#f6c443" opacity={0.25} />
            <rect x={-2} y={-1} width={4} height={8} fill="#5c3b1e" />
            <circle cy={-2} r={3.5} fill="#e8732e" />
            <circle cy={-2} r={1.8} fill="#f6e08a" />
        </>
    ),
    brazier: () => (
        <>
            <circle r={15} fill="#f6c443" opacity={0.2} />
            <circle r={11} fill="#3a3a40" stroke={OUTLINE} strokeWidth={2} />
            <circle r={7} fill="#e8732e" />
            <circle r={3.5} fill="#f6e08a" />
        </>
    ),
    table: () => (
        <>
            {[-26, -6, 14].flatMap((x) => [
                <rect key={`t${x}`} x={x} y={-19} width={12} height={6} rx={1.5} fill="#6b4524" stroke={OUTLINE} strokeWidth={1} />,
                <rect key={`b${x}`} x={x} y={13} width={12} height={6} rx={1.5} fill="#6b4524" stroke={OUTLINE} strokeWidth={1} />,
            ])}
            <rect x={-34} y={-12} width={68} height={24} rx={2} fill="#9b6b3c" stroke={OUTLINE} strokeWidth={2} />
            <line x1={-34} y1={0} x2={34} y2={0} stroke={OUTLINE} strokeOpacity={0.25} />
        </>
    ),
};

interface AssetArtProps {
    asset: string;
    label?: string;
    part?: RoadPart;
}

// The drawing for one piece, centred on 0,0 and not rotated.
export function AssetArt({ asset, label = "", part }: AssetArtProps) {
    if (asset === "text") {
        return (
            <text
                textAnchor="middle"
                dominantBaseline="central"
                fontFamily="Georgia, 'Times New Roman', serif"
                fontSize={22}
                fontWeight={700}
                fill="#1c1c1c"
                stroke="#f6f0e0"
                strokeWidth={4}
                strokeLinejoin="round"
                paintOrder="stroke"
            >
                {label || "Label"}
            </text>
        );
    }
    return <>{ART[asset]?.(part) ?? null}</>;
}

// A small preview for the palette.
export function AssetIcon({ asset }: { asset: string }) {
    const info = assetInfo(asset);
    if (!info) return null;
    const pad = 6;
    const w = info.w + pad * 2;
    const h = info.h + pad * 2;
    return (
        <svg viewBox={`${-w / 2} ${-h / 2} ${w} ${h}`} aria-hidden="true">
            {itemLayer(asset) === "road" && <AssetArt asset={asset} part="edge" />}
            <AssetArt asset={asset} label="Abc" part="fill" />
        </svg>
    );
}
