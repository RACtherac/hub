/// <reference types="node" />

import { test } from "node:test";
import assert from "node:assert/strict";

import {
    connectCousins,
    connectParentChild,
    connectSiblings,
    connectSpouses,
    createPerson,
} from "./FamilyTreeUtils";
import { buildConnectionPaths, type CardBox } from "./familyTreeLines";
import type { FamilyTreeData } from "../types/FamilyTreeTypes";

function person(firstName: string) {
    const member = createPerson();
    member.firstName = firstName;
    return member;
}

const box = (column: number, row: number): CardBox => ({
    left: column * 240,
    top: row * 260,
    width: 180,
    height: 190,
});

// Every path is made of straight horizontal and vertical segments only.
function isOrthogonal(d: string) {
    const points = d.split(/[ML]/).filter(Boolean).map(pair => pair.trim().split(" ").map(Number));
    return points.slice(1).every(([x, y], i) => x === points[i][0] || y === points[i][1]);
}

function family() {
    const dad = person("Dad");
    const mum = person("Mum");
    const kid1 = person("Kid1");
    const kid2 = person("Kid2");

    let tree: FamilyTreeData = { members: [dad, mum, kid1, kid2] };
    tree = connectSpouses(tree, dad.id, mum.id);
    [kid1, kid2].forEach(kid => {
        tree = connectParentChild(tree, dad.id, kid.id);
        tree = connectParentChild(tree, mum.id, kid.id);
    });
    tree = connectSiblings(tree, kid1.id, kid2.id);

    const boxes = {
        [dad.id]: box(0, 0),
        [mum.id]: box(1, 0),
        [kid1.id]: box(0, 1),
        [kid2.id]: box(1, 1),
    };

    return { tree, boxes, dad, mum, kid1, kid2 };
}

test("couple's children hang from one bus dropped from the marriage line", () => {
    const { tree, boxes } = family();
    const lines = buildConnectionPaths(tree.members, boxes);

    const parentLines = lines.filter(line => line.type === "parent");
    const drops = parentLines.filter(line => line.id.includes("-drop-"));
    const buses = parentLines.filter(line => line.id.endsWith("-bus"));

    assert.equal(drops.length, 1, "one drop for the couple, not one per parent");
    assert.equal(buses.length, 1);
    // The drop starts in the gap between the two cards, on the marriage line.
    assert.equal(drops[0].d, "M 210 60 L 210 225");
    assert.ok(lines.every(line => isOrthogonal(line.d)), "only straight segments");
});

test("marriage line joins the facing edges of two cards on the same row", () => {
    const { tree, boxes } = family();
    const spouse = buildConnectionPaths(tree.members, boxes).find(line => line.type === "spouse");

    assert.equal(spouse?.d, "M 180 60 L 240 60");
});

test("siblings who share a parent get no extra line", () => {
    const { tree, boxes } = family();
    const lines = buildConnectionPaths(tree.members, boxes);

    assert.ok(!lines.some(line => line.type === "sibling"));
});

test("siblings without parents in the tree get a bracket above their cards", () => {
    const a = person("A");
    const b = person("B");
    const tree = connectSiblings({ members: [a, b] }, a.id, b.id);

    const lines = buildConnectionPaths(tree.members, { [a.id]: box(0, 1), [b.id]: box(2, 1) });

    // Drawn from whichever id sorts first, so accept both directions.
    assert.equal(lines.length, 1);
    assert.ok([
        "M 90 260 L 90 246 L 570 246 L 570 260",
        "M 570 260 L 570 246 L 90 246 L 90 260",
    ].includes(lines[0].d), lines[0].d);
});

test("cousins through parents get no line; hand-added cousins do", () => {
    const g = person("G");
    const a = person("A");
    const b = person("B");
    const a1 = person("A1");
    const b1 = person("B1");
    const loner = person("Loner");

    let tree: FamilyTreeData = { members: [g, a, b, a1, b1, loner] };
    tree = connectParentChild(tree, g.id, a.id);
    tree = connectParentChild(tree, g.id, b.id);
    tree = connectSiblings(tree, a.id, b.id);
    tree = connectParentChild(tree, a.id, a1.id);
    tree = connectParentChild(tree, b.id, b1.id);
    tree = connectCousins(tree, a1.id, b1.id);
    tree = connectCousins(tree, a1.id, loner.id);

    const boxes = {
        [g.id]: box(0, 0),
        [a.id]: box(0, 1),
        [b.id]: box(1, 1),
        [a1.id]: box(0, 2),
        [b1.id]: box(1, 2),
        [loner.id]: box(3, 2),
    };

    const cousinLines = buildConnectionPaths(tree.members, boxes).filter(line => line.type === "cousin");

    assert.equal(cousinLines.length, 1);
    assert.ok(cousinLines[0].id.includes(loner.id));
});

test("hidden people get no lines", () => {
    const { tree, boxes, kid2 } = family();
    delete boxes[kid2.id];

    const lines = buildConnectionPaths(tree.members, boxes);

    assert.ok(!lines.some(line => line.id.includes(kid2.id)));
});

test("a child with a line colour gets its own full line from each parent, in that colour", () => {
    const { tree, boxes, kid2 } = family();
    const coloured = {
        members: tree.members.map(m => m.id === kid2.id ? { ...m, lineColor: "#ff6b6b" } : m),
    };

    const lines = buildConnectionPaths(coloured.members, boxes);
    const colouredLines = lines.filter(line => line.color);

    // Parents are an adjacent couple, so one line from the middle of the marriage line.
    assert.equal(colouredLines.length, 1);
    assert.equal(colouredLines[0].color, "#ff6b6b");
    // Marriage line -> own lane 6px below the bus -> down to the child's top.
    assert.equal(colouredLines[0].d, "M 210 60 L 210 231 L 330 231 L 330 260");
    // Drawn on top of everything else.
    assert.equal(lines[lines.length - 1], colouredLines[0]);
    // The other child still uses the shared blue bus.
    assert.ok(lines.some(line => !line.color && line.id.endsWith("-bus")));
});

test("when every child is coloured there is no shared bus", () => {
    const { tree, boxes } = family();
    const coloured = tree.members.map(m => m.parents.length > 0 ? { ...m, lineColor: "#69db7c" } : m);

    const lines = buildConnectionPaths(coloured, boxes);

    assert.ok(!lines.some(line => line.type === "parent" && !line.color));
    const lanes = lines.filter(line => line.color).map(line => line.d.split(" ")[5]);
    assert.equal(new Set(lanes).size, 2, "each coloured child is on its own lane");
});
