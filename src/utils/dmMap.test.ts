/// <reference types="node" />

import { test } from "node:test";
import assert from "node:assert/strict";

import {
    GRID,
    ROOM_WALL,
    createItem,
    createMap,
    duplicateItem,
    fogBox,
    mapBounds,
    moveStroke,
    normalizeMap,
    normalizeRotation,
    restackItem,
    revealRoom,
    roomFromCorners,
    simplifyPoints,
    snapItem,
    strokePath,
    type MapStroke,
} from "./dmMap";
import { createDefaultData, normalizeData } from "./dmScreen";

test("snapItem lines a piece's edges up with the half-grid", () => {
    // Cottage is 80 × 60: its top-left corner should land on a multiple of 20.
    const snapped = snapItem(createItem("house-small", 53, 47));
    assert.equal((snapped.x - 40) % (GRID / 2), 0);
    assert.equal((snapped.y - 30) % (GRID / 2), 0);
});

test("snapItem swaps width and height for quarter turns", () => {
    const snapped = snapItem(createItem("house-small", 53, 47, { rotation: 90 }));
    assert.equal((snapped.x - 30) % (GRID / 2), 0);
    assert.equal((snapped.y - 40) % (GRID / 2), 0);
});

test("snapItem puts a door's middle on a grid line so it sits in a wall", () => {
    // Door is 40 × 12: its long side lines up with squares, its thin side centres on a line.
    const snapped = snapItem(createItem("door", 53, 83));
    assert.equal((snapped.x - 20) % (GRID / 2), 0);
    assert.equal(snapped.y % (GRID / 2), 0);

    const turned = snapItem(createItem("door", 83, 53, { rotation: 90 }));
    assert.equal(turned.x % (GRID / 2), 0);
    assert.equal((turned.y - 20) % (GRID / 2), 0);
});

test("secret doors and traps start hidden from players", () => {
    assert.equal(createItem("secret-door", 0, 0).hidden, true);
    assert.equal(createItem("trap", 0, 0).hidden, true);
    assert.equal(createItem("door", 0, 0).hidden, undefined);
});

test("roomFromCorners snaps out to whole squares in any drag direction", () => {
    const room = roomFromCorners(130, 95, 10, 210)!;
    assert.deepEqual([room.x, room.y, room.w, room.h], [0, 80, 160, 160]);
    assert.equal(room.floor, "flagstone");
    assert.equal(roomFromCorners(10, 10, 12, 12), null);
});

test("fogBox snaps out to whole squares and revealRoom covers the walls", () => {
    assert.deepEqual(fogBox("hide", 50, 50, 10, 130).points, [0, 40, 80, 160]);
    const room = roomFromCorners(0, 0, 80, 80)!;
    assert.deepEqual(revealRoom(room).points, [-ROOM_WALL, -ROOM_WALL, 80 + ROOM_WALL, 80 + ROOM_WALL]);
    assert.equal(revealRoom(room).mode, "reveal");
});

test("normalizeMap keeps rooms, fog and hidden pieces, and drops broken ones", () => {
    const map = normalizeMap({
        items: [{ asset: "trap", hidden: true }, { asset: "door", hidden: "yes" }],
        rooms: [{ x: 0, y: 0, w: 80, h: 40, floor: "lava" }, { x: 0, y: 0, w: 0, h: 40 }],
        fog: {
            enabled: true,
            start: "revealed",
            ops: [
                { mode: "hide", shape: "box", points: [0, 0, 40, 40] },
                { mode: "reveal", shape: "brush", points: [0, 0, 10, 10], width: 80 },
                { mode: "reveal", shape: "box", points: [0, 0] },
            ],
        },
        playerView: { cx: 10, cy: 20, span: 800, at: 5 },
    })!;
    assert.deepEqual(map.items.map((i) => i.hidden), [true, undefined]);
    assert.equal(map.rooms.length, 1);
    assert.equal(map.rooms[0].floor, "flagstone");
    assert.equal(map.fog.enabled, true);
    assert.equal(map.fog.start, "revealed");
    assert.deepEqual(map.fog.ops.map((o) => `${o.mode}:${o.shape}`), ["hide:box", "reveal:brush"]);
    assert.deepEqual(map.playerView, { cx: 10, cy: 20, span: 800, at: 5 });
});

test("maps saved before rooms and fog load with none, fog off", () => {
    const map = normalizeMap({ name: "Old", items: [], strokes: [] })!;
    assert.deepEqual(map.rooms, []);
    assert.deepEqual(map.fog, { enabled: false, start: "hidden", ops: [] });
    assert.equal(map.playerView, undefined);
});

test("mapBounds includes rooms and their walls", () => {
    const map = { ...createMap(), rooms: [roomFromCorners(0, 0, 80, 40)!] };
    assert.deepEqual(mapBounds(map), { minX: -ROOM_WALL, minY: -ROOM_WALL, maxX: 80 + ROOM_WALL, maxY: 40 + ROOM_WALL });
});

test("normalizeRotation wraps into 0-359", () => {
    assert.equal(normalizeRotation(-90), 270);
    assert.equal(normalizeRotation(450), 90);
    assert.equal(normalizeRotation(360), 0);
});

test("duplicateItem offsets the copy by one square", () => {
    const item = createItem("tree", 100, 100);
    const map = { ...createMap(), items: [item] };
    const { map: next, copy } = duplicateItem(map, item.id);
    assert.equal(next.items.length, 2);
    assert.ok(copy);
    assert.notEqual(copy.id, item.id);
    assert.deepEqual([copy.x, copy.y], [100 + GRID, 100 + GRID]);
});

test("restackItem moves a piece to the front or back", () => {
    const [a, b, c] = ["tree", "rock", "well"].map((asset) => createItem(asset, 0, 0));
    const map = { ...createMap(), items: [a, b, c] };
    assert.deepEqual(restackItem(map, a.id, "front").items.map((i) => i.id), [b.id, c.id, a.id]);
    assert.deepEqual(restackItem(map, c.id, "back").items.map((i) => i.id), [c.id, a.id, b.id]);
});

test("simplifyPoints drops points on a straight line and keeps corners", () => {
    const straight = [0, 0, 10, 0, 20, 0, 30, 0];
    assert.deepEqual(simplifyPoints(straight), [0, 0, 30, 0]);

    const corner = [0, 0, 10, 0, 20, 0, 20, 10, 20, 20];
    assert.deepEqual(simplifyPoints(corner), [0, 0, 20, 0, 20, 20]);
});

test("strokePath handles one, two and many points", () => {
    assert.match(strokePath([5, 5]), /^M 5 5 L/);
    assert.equal(strokePath([0, 0, 10, 10]), "M 0 0 L 10 10");
    assert.match(strokePath([0, 0, 10, 0, 20, 10]), /^M 0 0 Q 10 0 15 5 L 20 10$/);
});

test("moveStroke shifts every point", () => {
    const stroke: MapStroke = { id: "s", brush: "road", width: 30, points: [0, 0, 10, 20] };
    assert.deepEqual(moveStroke(stroke, 5, -5).points, [5, -5, 15, 15]);
});

test("mapBounds covers pieces and strokes, and is null for an empty map", () => {
    assert.equal(mapBounds(createMap()), null);
    const map = {
        ...createMap(),
        items: [createItem("crate", 0, 0)],
        strokes: [{ id: "s", brush: "ink" as const, width: 4, points: [100, 100, 200, 50] }],
    };
    const bounds = mapBounds(map)!;
    assert.ok(bounds.minX < -11 && bounds.minY < -11);
    assert.ok(bounds.maxX >= 202 && bounds.maxY >= 102);
});

test("normalizeMap drops unknown pieces and broken strokes", () => {
    const map = normalizeMap({
        name: "Town",
        ground: "lava",
        items: [{ asset: "tavern", x: 10, y: 20, rotation: -90, scale: 99 }, { asset: "spaceship" }],
        strokes: [
            { brush: "road", points: [0, 0, 10, 10] },
            { brush: "laser", points: [0, 0, 10, 10] },
            { brush: "ink", points: [1] },
            { brush: "ink", points: [0, 0, 5, 5], color: "url(evil)" },
        ],
    })!;
    assert.equal(map.name, "Town");
    assert.equal(map.ground, "grass");
    assert.equal(map.items.length, 1);
    assert.equal(map.items[0].rotation, 270);
    assert.equal(map.items[0].scale, 4);
    assert.deepEqual(map.strokes.map((s) => s.brush), ["road", "ink"]);
    assert.equal(map.strokes[1].color, undefined);
});

test("old DM screen saves get an empty map", () => {
    const old = createDefaultData() as Partial<ReturnType<typeof createDefaultData>>;
    delete old.maps;
    delete old.activeMapId;
    const loaded = normalizeData(JSON.parse(JSON.stringify(old)))!;
    assert.equal(loaded.maps.length, 1);
    assert.equal(loaded.activeMapId, loaded.maps[0].id);
});

test("maps survive a save and load", () => {
    const data = createDefaultData();
    data.maps[0].items.push(createItem("well", 40, 40, { label: "Old well" }));
    const loaded = normalizeData(JSON.parse(JSON.stringify(data)))!;
    assert.deepEqual(loaded.maps, data.maps);
    assert.equal(loaded.activeMapId, data.activeMapId);
});
