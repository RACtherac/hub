import { test } from "node:test";
import assert from "node:assert/strict";

import {
    MAX_SIZE,
    MIN_SIZE,
    createStarterTown,
    createTown,
    facingRoad,
    parseTown,
    placePiece,
    removePiece,
    resizeTown,
    roadLinks,
    roadShape,
    rotatePiece,
    tileKey,
    tileNoise,
    tilesBetween,
    townStats,
    type PieceType,
    type Town,
} from "./townBuilder";

// Builds a town from rows of letters: r road, h house, a apartments, s shop, . empty.
function townFrom(...rows: string[]): Town {
    const types: Record<string, PieceType> = { r: "road", h: "house", a: "apartment", s: "shop", t: "tree" };
    let town = createTown("Test", Math.max(MIN_SIZE, rows.length, ...rows.map((r) => r.length)));
    rows.forEach((row, z) => [...row].forEach((c, x) => {
        if (types[c]) town = placePiece(town, x, z, types[c]);
    }));
    return town;
}

test("placing, replacing, rotating and removing pieces", () => {
    let town = createTown();
    town = placePiece(town, 2, 3, "house");
    assert.deepEqual(town.tiles[tileKey(2, 3)], { type: "house", rotation: 0 });

    // The same piece again is no change, so it can be compared by reference.
    assert.equal(placePiece(town, 2, 3, "house"), town);

    town = placePiece(town, 2, 3, "shop", 2);
    assert.deepEqual(town.tiles["2,3"], { type: "shop", rotation: 2 });
    town = rotatePiece(rotatePiece(town, 2, 3), 2, 3);
    assert.equal(town.tiles["2,3"].rotation, 0);

    town = removePiece(town, 2, 3);
    assert.equal(town.tiles["2,3"], undefined);
    assert.equal(removePiece(town, 2, 3), town);
    // Off the grid: nothing happens.
    assert.equal(placePiece(town, -1, 0, "road"), town);
    assert.equal(placePiece(town, town.size, 0, "road"), town);
});

test("tiles between two points fill a dragged line with side-by-side steps", () => {
    assert.deepEqual(tilesBetween([2, 2], [2, 2]), [[2, 2]]);
    assert.deepEqual(tilesBetween([0, 0], [3, 0]), [[0, 0], [1, 0], [2, 0], [3, 0]]);
    assert.deepEqual(tilesBetween([0, 3], [0, 0]), [[0, 3], [0, 2], [0, 1], [0, 0]]);

    for (const [a, b] of [[[0, 0], [5, 2]], [[7, 1], [2, 6]], [[3, 3], [0, 8]], [[0, 0], [4, 4]]] as [[number, number], [number, number]][]) {
        const line = tilesBetween(a, b);
        assert.deepEqual(line[0], a);
        assert.deepEqual(line[line.length - 1], b);
        // Every step moves exactly one tile up, down, left or right: no diagonal hops,
        // so a dragged road is always connected.
        for (let i = 1; i < line.length; i++) {
            const step = Math.abs(line[i][0] - line[i - 1][0]) + Math.abs(line[i][1] - line[i - 1][1]);
            assert.equal(step, 1, `step ${i} of ${JSON.stringify(line)}`);
        }
        assert.equal(line.length, Math.abs(b[0] - a[0]) + Math.abs(b[1] - a[1]) + 1);
    }
});

test("road shapes follow their road neighbours", () => {
    const town = townFrom(
        ".r..",
        "rrr.",
        ".r.r",
        "....",
    );
    assert.equal(roadShape(roadLinks(town, 1, 1)), "cross");
    assert.equal(roadShape(roadLinks(town, 0, 1)), "end");
    assert.equal(roadShape(roadLinks(town, 1, 0)), "end");
    assert.equal(roadShape(roadLinks(town, 3, 2)), "single");
    assert.deepEqual(roadLinks(town, 2, 1), { north: false, east: false, south: false, west: true });

    assert.equal(roadShape({ north: true, east: false, south: true, west: false }), "straight");
    assert.equal(roadShape({ north: true, east: true, south: false, west: false }), "corner");
    assert.equal(roadShape({ north: true, east: true, south: true, west: false }), "tee");
});

test("buildings face a road beside them", () => {
    const town = townFrom(
        ".h.",
        "hrh",
        ".h.",
        "...",
    );
    assert.equal(facingRoad(town, 1, 0), 0); // road to the south
    assert.equal(facingRoad(town, 2, 1), 1); // road to the west
    assert.equal(facingRoad(town, 1, 2), 2); // road to the north
    assert.equal(facingRoad(town, 0, 1), 3); // road to the east
    assert.equal(facingRoad(town, 0, 0), null);
});

test("stats count residents, jobs and how many buildings reach a road", () => {
    const town = townFrom(
        "hha.",
        "rrr.",
        "s..h",
    );
    const stats = townStats(town);
    assert.equal(stats.pieces, 8);
    assert.equal(stats.roads, 3);
    assert.equal(stats.residents, 4 + 4 + 24 + 4);
    assert.equal(stats.jobs, 6);
    // The house at (3, 2) has no road; the other four buildings do.
    assert.equal(stats.connected, 80);
    assert.deepEqual(stats.counts, { house: 3, apartment: 1, road: 3, shop: 1 });
    assert.equal(townStats(createTown()).connected, 100);
});

test("resizing clamps the size and drops pieces outside", () => {
    let town = placePiece(placePiece(createTown("T", 20), 18, 2, "tree"), 3, 3, "house");
    town = resizeTown(town, 10);
    assert.equal(town.size, 10);
    assert.deepEqual(Object.keys(town.tiles), ["3,3"]);
    assert.equal(resizeTown(town, 1000).size, MAX_SIZE);
    assert.equal(resizeTown(town, 2).size, MIN_SIZE);
});

test("saves round-trip, and junk is repaired or rejected", () => {
    const town = createStarterTown();
    assert.deepEqual(parseTown(JSON.stringify(town)), town);

    assert.equal(parseTown(null), null);
    assert.equal(parseTown("not json"), null);
    assert.equal(parseTown('{"name":"x"}'), null);

    const repaired = parseTown(JSON.stringify({
        size: 10,
        tiles: { "1,1": { type: "house", rotation: 7 }, "2,2": { type: "spaceship" }, "50,50": { type: "road" }, bad: { type: "road" } },
    }))!;
    assert.equal(repaired.name, "Town");
    assert.deepEqual(repaired.tiles, { "1,1": { type: "house", rotation: 0 } });
});

test("tile noise is stable and spread out", () => {
    assert.equal(tileNoise(3, 4), tileNoise(3, 4));
    assert.notEqual(tileNoise(3, 4), tileNoise(4, 3));
    const values = Array.from({ length: 400 }, (_, i) => tileNoise(i % 20, Math.floor(i / 20)));
    assert.ok(values.every((v) => v >= 0 && v <= 1));
    const mean = values.reduce((a, b) => a + b, 0) / values.length;
    assert.ok(mean > 0.4 && mean < 0.6, `mean ${mean}`);
});

test("the starter town is a connected little town", () => {
    const stats = townStats(createStarterTown());
    assert.ok(stats.residents > 50);
    assert.ok(stats.jobs > 20);
    assert.equal(stats.connected, 100);
});
