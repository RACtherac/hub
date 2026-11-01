import { memo, useEffect, useMemo } from "react";
import { ExtrudeGeometry, Shape } from "three";

import { roadLinks, roadShape, tileNoise, type PieceType, type Rotation, type Town } from "../../utils/townBuilder";

// Every piece is drawn from simple shapes inside one 1×1 tile, centred on the
// origin, with its front facing +z (south) before rotation.

const HOUSE_WALLS = ["#f1e3c8", "#e9d8a6", "#f6d6ad", "#d8e2dc", "#ffe5d9", "#e2ece9"];
const ROOFS = ["#9d4e3d", "#7f5539", "#6d597a", "#b56576", "#495867", "#8a5a44"];
const APARTMENT_WALLS = ["#8ecae6", "#bde0fe", "#cdb4db", "#a8dadc", "#e0e1dd"];
const SHOP_AWNINGS = ["#e76f51", "#2a9d8f", "#e9c46a", "#d62828", "#457b9d"];
const LEAVES = ["#52b788", "#40916c", "#74c69d", "#2d6a4f"];

const pick = <T,>(list: T[], value: number) => list[Math.floor(value * list.length) % list.length];

// The road surface's top is at 0.02; lane markings (0.005 thick) sit just on it.
const LINE_Y = 0.0235;

interface Placement {
    position?: [number, number, number];
    rotation?: [number, number, number];
}

function Box({ size, color, position, rotation, metal = 0, rough = 0.8 }: Placement & { size: [number, number, number]; color: string; metal?: number; rough?: number }) {
    return (
        <mesh position={position} rotation={rotation} castShadow receiveShadow>
            <boxGeometry args={size} />
            <meshStandardMaterial color={color} metalness={metal} roughness={rough} />
        </mesh>
    );
}

// A square pyramid roof: a 4-sided cone turned 45° so its edges line up with the walls.
function Roof({ width, height, color, position }: { width: number; height: number; color: string; position: [number, number, number] }) {
    return (
        <mesh position={position} rotation={[0, Math.PI / 4, 0]} castShadow>
            <coneGeometry args={[width * Math.SQRT1_2, height, 4]} />
            <meshStandardMaterial color={color} roughness={0.9} flatShading />
        </mesh>
    );
}

// A gable roof: a triangle (depth × height) extruded along the ridge, which
// runs east-west. `position` is the middle of the roof's base.
function GableRoof({ width, depth, height, color, position }: { width: number; depth: number; height: number; color: string; position: [number, number, number] }) {
    const geometry = useMemo(() => {
        const shape = new Shape();
        shape.moveTo(-depth / 2, 0);
        shape.lineTo(depth / 2, 0);
        shape.lineTo(0, height);
        shape.closePath();
        const extruded = new ExtrudeGeometry(shape, { depth: width, bevelEnabled: false });
        // Centre it on the ridge, then turn it so the ridge runs along x.
        extruded.translate(0, 0, -width / 2);
        extruded.rotateY(Math.PI / 2);
        return extruded;
    }, [width, depth, height]);
    useEffect(() => () => geometry.dispose(), [geometry]);

    return (
        <mesh geometry={geometry} position={position} castShadow>
            <meshStandardMaterial color={color} roughness={0.9} flatShading />
        </mesh>
    );
}

function Door({ z, color = "#3d2c29" }: { z: number; color?: string }) {
    return <Box size={[0.14, 0.24, 0.02]} position={[0, 0.12, z]} color={color} />;
}

// ---- Pieces

function Road({ town, x, z }: { town: Town; x: number; z: number }) {
    const links = roadLinks(town, x, z);
    const shape = roadShape(links);
    const dash = "#f2e8cf";
    // A dashed centre line from the middle towards each linked side.
    const arms = ([
        ["north", [0, LINE_Y, -0.25], [0.04, 0.005, 0.28]],
        ["south", [0, LINE_Y, 0.25], [0.04, 0.005, 0.28]],
        ["east", [0.25, LINE_Y, 0], [0.28, 0.005, 0.04]],
        ["west", [-0.25, LINE_Y, 0], [0.28, 0.005, 0.04]],
    ] as const).filter(([side]) => links[side]);

    return (
        <group>
            <Box size={[1, 0.02, 1]} position={[0, 0.01, 0]} color="#3d4250" rough={0.95} />
            {/* Pavement edges on the sides that don't continue. */}
            {!links.north && <Box size={[1, 0.04, 0.08]} position={[0, 0.02, -0.46]} color="#9aa0ab" />}
            {!links.south && <Box size={[1, 0.04, 0.08]} position={[0, 0.02, 0.46]} color="#9aa0ab" />}
            {!links.east && <Box size={[0.08, 0.04, 1]} position={[0.46, 0.02, 0]} color="#9aa0ab" />}
            {!links.west && <Box size={[0.08, 0.04, 1]} position={[-0.46, 0.02, 0]} color="#9aa0ab" />}
            {shape !== "cross" && shape !== "tee" && arms.map(([side, [px, py, pz], [sx, sy, sz]]) => (
                <Box key={side} size={[sx, sy, sz]} position={[px, py, pz]} color={dash} />
            ))}
            {(shape === "cross" || shape === "tee") && (
                // Crossings get a zebra crossing instead of centre lines.
                [-0.24, -0.08, 0.08, 0.24].map((offset) => (
                    <Box key={offset} size={[0.08, 0.005, 0.5]} position={[offset, LINE_Y, 0]} color={dash} />
                ))
            )}
        </group>
    );
}

function Cottage({ x, z }: { x: number; z: number }) {
    const wall = pick(HOUSE_WALLS, tileNoise(x, z, 1));
    const roof = pick(ROOFS, tileNoise(x, z, 2));
    return (
        <group>
            <Box size={[0.52, 0.34, 0.46]} position={[0, 0.17, 0]} color={wall} />
            <GableRoof width={0.6} depth={0.56} height={0.3} color={roof} position={[0, 0.48, 0]} />
            <Box size={[0.08, 0.22, 0.08]} position={[0.15, 0.6, -0.08]} color="#7f5539" />
            <Door z={0.235} />
        </group>
    );
}

function House({ x, z }: { x: number; z: number }) {
    const wall = pick(HOUSE_WALLS, tileNoise(x, z, 1));
    const roof = pick(ROOFS, tileNoise(x, z, 2));
    const height = 0.5 + tileNoise(x, z, 3) * 0.15;
    return (
        <group>
            <Box size={[0.66, height, 0.6]} position={[0, height / 2, 0]} color={wall} />
            <Roof width={0.8} height={0.38} color={roof} position={[0, height + 0.19, 0]} />
            <Door z={0.305} />
            {[-0.2, 0.2].map((wx) => (
                <Box key={wx} size={[0.12, 0.12, 0.02]} position={[wx, height * 0.62, 0.305]} color="#a9d6e5" rough={0.2} />
            ))}
        </group>
    );
}

function Apartment({ x, z }: { x: number; z: number }) {
    const wall = pick(APARTMENT_WALLS, tileNoise(x, z, 1));
    const floors = 4 + Math.floor(tileNoise(x, z, 3) * 4);
    const floorHeight = 0.3;
    const height = floors * floorHeight;
    return (
        <group>
            <Box size={[0.78, height, 0.78]} position={[0, height / 2, 0]} color={wall} />
            {/* A band of windows on every floor, on all four sides. */}
            {Array.from({ length: floors }, (_, f) => {
                const y = f * floorHeight + floorHeight * 0.55;
                return (
                    <group key={f}>
                        <Box size={[0.66, 0.1, 0.8]} position={[0, y, 0]} color="#5c7a99" rough={0.25} metal={0.2} />
                        <Box size={[0.8, 0.1, 0.66]} position={[0, y, 0]} color="#5c7a99" rough={0.25} metal={0.2} />
                    </group>
                );
            })}
            <Box size={[0.84, 0.05, 0.84]} position={[0, height + 0.025, 0]} color="#6c757d" />
            <Box size={[0.2, 0.2, 0.2]} position={[0.2, height + 0.15, -0.2]} color="#adb5bd" />
            <Door z={0.395} color="#2b2d42" />
        </group>
    );
}

function Shop({ x, z }: { x: number; z: number }) {
    const awning = pick(SHOP_AWNINGS, tileNoise(x, z, 1));
    return (
        <group>
            <Box size={[0.8, 0.5, 0.7]} position={[0, 0.25, -0.03]} color="#f8f1e5" />
            <Box size={[0.84, 0.06, 0.74]} position={[0, 0.53, -0.03]} color="#6c757d" />
            {/* Shop window and a sloping awning over it. */}
            <Box size={[0.62, 0.24, 0.02]} position={[0, 0.2, 0.325]} color="#a9d6e5" rough={0.15} />
            <Box size={[0.8, 0.03, 0.2]} position={[0, 0.4, 0.4]} rotation={[0.35, 0, 0]} color={awning} />
            <Box size={[0.5, 0.1, 0.02]} position={[0, 0.47, 0.325]} color={awning} />
        </group>
    );
}

function Tower({ x, z }: { x: number; z: number }) {
    const height = 2.4 + tileNoise(x, z, 3) * 2;
    return (
        <group>
            <Box size={[0.7, height, 0.7]} position={[0, height / 2, 0]} color="#7d8fae" metal={0.6} rough={0.25} />
            {/* Vertical mullions give the glass some structure. */}
            {[-0.2, 0, 0.2].map((offset) => (
                <group key={offset}>
                    <Box size={[0.03, height, 0.72]} position={[offset, height / 2, 0]} color="#cfd8e6" metal={0.3} />
                    <Box size={[0.72, height, 0.03]} position={[0, height / 2, offset]} color="#cfd8e6" metal={0.3} />
                </group>
            ))}
            <Box size={[0.5, 0.18, 0.5]} position={[0, height + 0.09, 0]} color="#adb5bd" />
            <Box size={[0.02, 0.4, 0.02]} position={[0.15, height + 0.38, 0.15]} color="#e9ecef" />
        </group>
    );
}

function TownHall() {
    return (
        <group>
            <Box size={[0.94, 0.12, 0.84]} position={[0, 0.06, 0]} color="#d6ccc2" />
            <Box size={[0.82, 0.55, 0.62]} position={[0, 0.395, -0.05]} color="#f5ebe0" />
            {/* Columns along the front. */}
            {[-0.3, -0.1, 0.1, 0.3].map((cx) => (
                <mesh key={cx} position={[cx, 0.4, 0.31]} castShadow>
                    <cylinderGeometry args={[0.035, 0.035, 0.55, 10]} />
                    <meshStandardMaterial color="#ffffff" />
                </mesh>
            ))}
            <GableRoof width={0.9} depth={0.3} height={0.16} color="#d5bdaf" position={[0, 0.75, 0.25]} />
            <Box size={[0.3, 0.45, 0.3]} position={[0, 0.9, -0.1]} color="#f5ebe0" />
            <mesh position={[0, 0.9, 0.055]}>
                <circleGeometry args={[0.08, 24]} />
                <meshStandardMaterial color="#fefae0" />
            </mesh>
            <mesh position={[0, 1.2, -0.1]} castShadow>
                <sphereGeometry args={[0.17, 24, 12, 0, Math.PI * 2, 0, Math.PI / 2]} />
                <meshStandardMaterial color="#e8c547" metalness={0.6} roughness={0.3} />
            </mesh>
        </group>
    );
}

function TreeShape({ x, z, scale = 1, offset = [0, 0] }: { x: number; z: number; scale?: number; offset?: [number, number] }) {
    const leaves = pick(LEAVES, tileNoise(x, z, 4 + offset[0] * 10));
    const height = (0.35 + tileNoise(x, z, 5 + offset[1] * 10) * 0.25) * scale;
    const round = tileNoise(x, z, 6) > 0.5;
    return (
        <group position={[offset[0], 0, offset[1]]}>
            <mesh position={[0, height / 2, 0]} castShadow>
                <cylinderGeometry args={[0.04 * scale, 0.06 * scale, height, 8]} />
                <meshStandardMaterial color="#7f5539" />
            </mesh>
            {round ? (
                <mesh position={[0, height + 0.16 * scale, 0]} castShadow>
                    <icosahedronGeometry args={[0.24 * scale, 0]} />
                    <meshStandardMaterial color={leaves} flatShading />
                </mesh>
            ) : (
                <mesh position={[0, height + 0.22 * scale, 0]} castShadow>
                    <coneGeometry args={[0.24 * scale, 0.6 * scale, 7]} />
                    <meshStandardMaterial color={leaves} flatShading />
                </mesh>
            )}
        </group>
    );
}

function Park({ x, z }: { x: number; z: number }) {
    return (
        <group>
            <Box size={[0.98, 0.03, 0.98]} position={[0, 0.015, 0]} color="#74c69d" />
            <Box size={[0.98, 0.035, 0.14]} position={[0, 0.02, 0]} color="#e9d8a6" />
            <TreeShape x={x} z={z} scale={0.7} offset={[-0.27, -0.27]} />
            <TreeShape x={x + 7} z={z} scale={0.6} offset={[0.28, 0.27]} />
            <Box size={[0.22, 0.05, 0.07]} position={[0.22, 0.07, -0.12]} color="#7f5539" />
        </group>
    );
}

function Fountain() {
    return (
        <group>
            <Box size={[0.98, 0.03, 0.98]} position={[0, 0.015, 0]} color="#d6ccc2" />
            <mesh position={[0, 0.08, 0]} castShadow receiveShadow>
                <cylinderGeometry args={[0.38, 0.4, 0.12, 24]} />
                <meshStandardMaterial color="#adb5bd" />
            </mesh>
            <mesh position={[0, 0.135, 0]}>
                <cylinderGeometry args={[0.33, 0.33, 0.02, 24]} />
                <meshStandardMaterial color="#48cae4" metalness={0.2} roughness={0.1} />
            </mesh>
            <mesh position={[0, 0.3, 0]} castShadow>
                <cylinderGeometry args={[0.05, 0.07, 0.35, 10]} />
                <meshStandardMaterial color="#ced4da" />
            </mesh>
            <mesh position={[0, 0.5, 0]}>
                <sphereGeometry args={[0.08, 16, 10]} />
                <meshStandardMaterial color="#90e0ef" transparent opacity={0.8} />
            </mesh>
        </group>
    );
}

function Water() {
    return (
        <mesh position={[0, 0.005, 0]} receiveShadow>
            <boxGeometry args={[1, 0.01, 1]} />
            <meshStandardMaterial color="#3a86ff" metalness={0.3} roughness={0.15} transparent opacity={0.85} />
        </mesh>
    );
}

interface PieceProps {
    town: Town;
    type: PieceType;
    rotation: Rotation;
    x: number;
    z: number;
}

// One piece, rotated in quarter turns clockwise seen from above. Roads and
// water don't turn: their look comes from their neighbours.
export const Piece = memo(function Piece({ town, type, rotation, x, z }: PieceProps) {
    const turns = type === "road" || type === "water" ? 0 : rotation;
    return (
        <group rotation={[0, -turns * (Math.PI / 2), 0]}>
            {type === "road" && <Road town={town} x={x} z={z} />}
            {type === "cottage" && <Cottage x={x} z={z} />}
            {type === "house" && <House x={x} z={z} />}
            {type === "apartment" && <Apartment x={x} z={z} />}
            {type === "shop" && <Shop x={x} z={z} />}
            {type === "tower" && <Tower x={x} z={z} />}
            {type === "townhall" && <TownHall />}
            {type === "tree" && <TreeShape x={x} z={z} />}
            {type === "park" && <Park x={x} z={z} />}
            {type === "fountain" && <Fountain />}
            {type === "water" && <Water />}
        </group>
    );
}, (prev, next) =>
    prev.type === next.type && prev.rotation === next.rotation && prev.x === next.x && prev.z === next.z
    // Roads redraw when a neighbour changes, since their lanes depend on it.
    && (prev.type !== "road" || JSON.stringify(roadLinks(prev.town, prev.x, prev.z)) === JSON.stringify(roadLinks(next.town, next.x, next.z))));
