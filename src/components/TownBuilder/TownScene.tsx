import { useEffect, useRef } from "react";
import { Canvas, type ThreeEvent } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { MOUSE, TOUCH, type Object3D } from "three";

import { parseKey, tilesBetween, type Town } from "../../utils/townBuilder";
import { Piece } from "./pieces";

export type Tool = "build" | "erase" | "rotate";

interface TownSceneProps {
    town: Town;
    tool: Tool;
    hovered: [number, number] | null;
    showGrid: boolean;
    onHover: (tile: [number, number] | null) => void;
    // Called for every tile a click or drag passes over, between start and end.
    onStrokeStart: () => void;
    onStrokeTile: (x: number, z: number) => void;
    onStrokeEnd: () => void;
    // The canvas, for saving a picture of the town.
    onCanvas: (canvas: HTMLCanvasElement) => void;
}

const HIGHLIGHT: Record<Tool, string> = { build: "#7ae582", erase: "#ff6b6b", rotate: "#e8c547" };

// Tile (x, z) sits with its centre at world (x - size/2 + 0.5, 0, z - size/2 + 0.5).
const toWorld = (size: number, x: number, z: number): [number, number, number] => [x - size / 2 + 0.5, 0, z - size / 2 + 0.5];

// The tile under the pointer: the piece that was hit, or the ground point.
function tileFromEvent(event: ThreeEvent<PointerEvent>, size: number): [number, number] | null {
    for (const hit of event.intersections) {
        let object: Object3D | null = hit.object;
        while (object) {
            if (object.userData.tile) return object.userData.tile as [number, number];
            object = object.parent;
        }
        if (hit.object.userData.ground) {
            const x = Math.floor(hit.point.x + size / 2);
            const z = Math.floor(hit.point.z + size / 2);
            return x >= 0 && z >= 0 && x < size && z < size ? [x, z] : null;
        }
    }
    return null;
}

export default function TownScene({ town, tool, hovered, showGrid, onHover, onStrokeStart, onStrokeTile, onStrokeEnd, onCanvas }: TownSceneProps) {
    const stroking = useRef(false);
    // The last tile a drag passed, so the tiles between it and the next one get filled in.
    const lastTile = useRef<[number, number] | null>(null);
    const { size } = town;

    // A stroke ends wherever the mouse is let go, even off the canvas.
    useEffect(() => {
        const end = () => {
            if (!stroking.current) return;
            stroking.current = false;
            lastTile.current = null;
            onStrokeEnd();
        };
        window.addEventListener("pointerup", end);
        window.addEventListener("pointercancel", end);
        return () => {
            window.removeEventListener("pointerup", end);
            window.removeEventListener("pointercancel", end);
        };
    }, [onStrokeEnd]);

    const onPointerMove = (event: ThreeEvent<PointerEvent>) => {
        event.stopPropagation();
        const tile = tileFromEvent(event, size);
        onHover(tile);
        if (!stroking.current || !tile) return;
        const from = lastTile.current ?? tile;
        if (from[0] === tile[0] && from[1] === tile[1]) return;
        // Skip the first tile: it was already done.
        tilesBetween(from, tile).slice(1).forEach(([x, z]) => onStrokeTile(x, z));
        lastTile.current = tile;
    };

    const onPointerDown = (event: ThreeEvent<PointerEvent>) => {
        // Left mouse button only; touch builds on tap (onClick) so a finger can still turn the camera.
        if (event.button !== 0 || event.pointerType === "touch") return;
        event.stopPropagation();
        const tile = tileFromEvent(event, size);
        if (!tile) return;
        stroking.current = true;
        lastTile.current = tile;
        onStrokeStart();
        onStrokeTile(tile[0], tile[1]);
    };

    const onClick = (event: ThreeEvent<MouseEvent>) => {
        if ((event.nativeEvent as PointerEvent).pointerType !== "touch") return;
        event.stopPropagation();
        const tile = tileFromEvent(event as unknown as ThreeEvent<PointerEvent>, size);
        if (!tile) return;
        onStrokeStart();
        onStrokeTile(tile[0], tile[1]);
        onStrokeEnd();
    };

    const half = size / 2;

    return (
        <Canvas
            shadows
            dpr={[1, 2]}
            // Close enough that a starter-sized town fills most of the view.
            camera={{ position: [size * 0.32, size * 0.42, size * 0.5], fov: 45, near: 0.1, far: 500 }}
            // Keeps the last frame, so "Save picture" can read it.
            gl={{ preserveDrawingBuffer: true, antialias: true }}
            onCreated={({ gl }) => onCanvas(gl.domElement)}
            onPointerMissed={() => onHover(null)}
        >
            <color attach="background" args={["#bfe3f5"]} />
            <fog attach="fog" args={["#bfe3f5", size * 1.6, size * 4]} />
            <hemisphereLight args={["#ffffff", "#7a9a65", 0.7]} />
            <directionalLight
                position={[size * 0.4, size * 0.9, size * 0.3]}
                intensity={1.6}
                castShadow
                shadow-mapSize={[2048, 2048]}
                shadow-camera-left={-half - 2}
                shadow-camera-right={half + 2}
                shadow-camera-top={half + 2}
                shadow-camera-bottom={-half - 2}
                shadow-bias={-0.0005}
            />

            <group onPointerMove={onPointerMove} onPointerDown={onPointerDown} onClick={onClick} onPointerLeave={() => onHover(null)}>
                {/* The grass the town stands on, a little larger than the grid. */}
                <mesh rotation={[-Math.PI / 2, 0, 0]} receiveShadow userData={{ ground: true }}>
                    <planeGeometry args={[size, size]} />
                    <meshStandardMaterial color="#8fbf6a" />
                </mesh>
                <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.02, 0]} receiveShadow>
                    <planeGeometry args={[size + 6, size + 6]} />
                    <meshStandardMaterial color="#7aa95a" />
                </mesh>

                {Object.entries(town.tiles).map(([key, tile]) => {
                    const [x, z] = parseKey(key);
                    return (
                        <group key={key} position={toWorld(size, x, z)} userData={{ tile: [x, z] }}>
                            <Piece town={town} type={tile.type} rotation={tile.rotation} x={x} z={z} />
                        </group>
                    );
                })}
            </group>

            {showGrid && <gridHelper args={[size, size, "#5b7c46", "#6f9353"]} position={[0, 0.003, 0]} />}

            {hovered && (
                <mesh position={[toWorld(size, hovered[0], hovered[1])[0], 0.03, toWorld(size, hovered[0], hovered[1])[2]]} rotation={[-Math.PI / 2, 0, 0]} raycast={() => null}>
                    <planeGeometry args={[1, 1]} />
                    <meshBasicMaterial color={HIGHLIGHT[tool]} transparent opacity={0.45} depthWrite={false} />
                </mesh>
            )}

            <OrbitControls
                makeDefault
                // Left mouse builds; right turns the camera, middle pans, the wheel zooms.
                mouseButtons={{ LEFT: undefined as unknown as MOUSE, MIDDLE: MOUSE.PAN, RIGHT: MOUSE.ROTATE }}
                touches={{ ONE: TOUCH.ROTATE, TWO: TOUCH.DOLLY_PAN }}
                maxPolarAngle={Math.PI / 2.15}
                minDistance={3}
                maxDistance={size * 2.5}
                target={[0, 0, 0]}
            />
        </Canvas>
    );
}
