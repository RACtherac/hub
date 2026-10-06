/// <reference types="node" />

import { test } from "node:test";
import assert from "node:assert/strict";

import {
    connectParentChild,
    connectSiblings,
    connectSpouses,
    createFolder,
    createPerson,
    createAutoLayoutPositions,
    deletePerson,
    fillMissingPositions,
    getBranchMembers,
    getDerivedCousinIds,
    getFolderMembers,
    getStatistics,
    importJSON,
    saveFolder,
} from "./FamilyTreeUtils";
import type { FamilyTreeData } from "../types/FamilyTreeTypes";

function person(firstName: string) {
    const member = createPerson();
    member.firstName = firstName;
    return member;
}

// Grandparents G1+G2 with children A and B (siblings); A has child A1, B has child B1.
function cousinTree() {
    const g1 = person("G1");
    const g2 = person("G2");
    const a = person("A");
    const b = person("B");
    const a1 = person("A1");
    const b1 = person("B1");

    let tree: FamilyTreeData = { members: [g1, g2, a, b, a1, b1], folders: [] };
    tree = connectSpouses(tree, g1.id, g2.id);
    tree = connectParentChild(tree, g1.id, a.id);
    tree = connectParentChild(tree, g1.id, b.id);
    tree = connectSiblings(tree, a.id, b.id);
    tree = connectParentChild(tree, a.id, a1.id);
    tree = connectParentChild(tree, b.id, b1.id);

    return { tree, g1, g2, a, b, a1, b1 };
}

test("auto layout places descendants below their parents", () => {
    const rootA = createPerson();
    rootA.firstName = "Ada";
    rootA.lastName = "Lovelace";

    const rootB = createPerson();
    rootB.firstName = "Charles";
    rootB.lastName = "Babbage";

    const child = createPerson();
    child.firstName = "Emily";
    child.lastName = "Lovelace";

    let tree = {
        members: [rootA, rootB, child],
    };

    tree = connectSpouses(tree, rootA.id, rootB.id);
    tree = connectParentChild(tree, rootA.id, child.id);
    tree = connectParentChild(tree, rootB.id, child.id);

    const positions = createAutoLayoutPositions(tree.members);

    assert.equal(positions[rootA.id].y, 0);
    assert.equal(positions[rootB.id].y, 0);
    assert.ok(positions[child.id].y > positions[rootA.id].y);
    assert.ok(positions[child.id].y > positions[rootB.id].y);
    assert.ok(positions[rootA.id].x < positions[rootB.id].x || positions[rootA.id].x > positions[rootB.id].x);
});

test("getBranchMembers keeps the connected branch for a selected root", () => {
    const rootA = createPerson();
    rootA.firstName = "Ada";
    rootA.lastName = "Lovelace";

    const rootB = createPerson();
    rootB.firstName = "Charles";
    rootB.lastName = "Babbage";

    const child = createPerson();
    child.firstName = "Emily";
    child.lastName = "Lovelace";

    const outsider = createPerson();
    outsider.firstName = "Other";
    outsider.lastName = "Person";

    let tree = {
        members: [rootA, rootB, child, outsider],
    };

    tree = connectSpouses(tree, rootA.id, rootB.id);
    tree = connectParentChild(tree, rootA.id, child.id);
    tree = connectParentChild(tree, rootB.id, child.id);

    const branch = getBranchMembers(tree.members, rootA.id);
    const ids = branch.map(member => member.id);

    assert.ok(ids.includes(rootA.id));
    assert.ok(ids.includes(rootB.id));
    assert.ok(ids.includes(child.id));
    assert.ok(!ids.includes(outsider.id));
});

test("saveFolder keeps a custom folder's selected members", () => {
    const rootA = createPerson();
    rootA.firstName = "Ada";
    rootA.lastName = "Lovelace";

    const rootB = createPerson();
    rootB.firstName = "Charles";
    rootB.lastName = "Babbage";

    const tree = {
        members: [rootA, rootB],
        folders: [],
    };

    const folder = createFolder("Smith side", [rootA.id, rootB.id]);
    const updatedTree = saveFolder(tree, folder);
    const folderMembers = getFolderMembers(updatedTree, folder.id);

    assert.equal(updatedTree.folders?.length, 1);
    assert.equal(folderMembers.length, 2);
    assert.ok(folderMembers.some(member => member.id === rootA.id));
    assert.ok(folderMembers.some(member => member.id === rootB.id));
});

test("auto layout puts spouses next to each other on the same row", () => {
    const { tree, g1, g2 } = cousinTree();
    const positions = createAutoLayoutPositions(tree.members);

    assert.equal(positions[g1.id].y, positions[g2.id].y);
    assert.equal(Math.abs(positions[g1.id].x - positions[g2.id].x), 1);
});

test("auto layout never puts two people in the same cell", () => {
    const { tree } = cousinTree();
    const cells = Object.values(createAutoLayoutPositions(tree.members)).map(p => `${p.x},${p.y}`);

    assert.equal(new Set(cells).size, cells.length);
});

test("cousins are derived, not stored as siblings", () => {
    const { tree, a1, b1 } = cousinTree();
    const storedA1 = tree.members.find(m => m.id === a1.id)!;

    assert.ok(!storedA1.siblings.includes(b1.id));
    assert.deepEqual(getDerivedCousinIds(tree.members, storedA1), [b1.id]);
});

test("deletePerson removes every reference to the deleted person", () => {
    const { tree, a, g1, a1 } = cousinTree();
    const folder = createFolder("Branch A", [a.id, a1.id]);
    const withFolder = { ...saveFolder(tree, folder), positions: { [a.id]: { x: 0, y: 1 } } };

    const updated = deletePerson(withFolder, a.id);

    assert.ok(!updated.members.some(m => m.id === a.id));
    for (const member of updated.members) {
        for (const key of ["parents", "children", "spouses", "exSpouses", "siblings", "cousins"] as const) {
            assert.ok(!member[key].includes(a.id), `${member.firstName}.${key} still has A`);
        }
    }
    assert.deepEqual(updated.folders?.[0].memberIds, [a1.id]);
    assert.equal(updated.positions?.[a.id], undefined);
    assert.ok(updated.members.find(m => m.id === g1.id)!.children.length === 1);
});

test("importJSON fills missing fields, drops dangling links and makes links two-way", () => {
    const json = JSON.stringify({
        members: [
            { id: "p", firstName: "Parent", lastName: "X", children: ["c", "ghost"] },
            { id: "c", firstName: "Child", lastName: "X", parents: [] },
        ],
        positions: { p: { x: 2, y: 0 }, ghost: { x: 9, y: 9 }, c: { x: "bad" } },
    });

    const tree = importJSON(json);
    const parent = tree.members.find(m => m.id === "p")!;
    const child = tree.members.find(m => m.id === "c")!;

    assert.deepEqual(parent.children, ["c"]);
    assert.deepEqual(child.parents, ["p"]);
    assert.deepEqual(child.cousins, []);
    assert.deepEqual(tree.folders, []);
    assert.deepEqual(tree.positions, { p: { x: 2, y: 0 } });
});

test("importJSON rejects files that aren't family trees", () => {
    assert.throws(() => importJSON("{}"));
    assert.throws(() => importJSON("[1, 2, 3]"));
});

test("importJSON moves cousins saved as siblings by older versions out of siblings", () => {
    const { tree, a1, b1 } = cousinTree();
    const legacy = {
        members: tree.members.map(m =>
            m.id === a1.id ? { ...m, siblings: [b1.id] } :
            m.id === b1.id ? { ...m, siblings: [a1.id] } : m
        ),
    };

    const imported = importJSON(JSON.stringify(legacy));

    assert.deepEqual(imported.members.find(m => m.id === a1.id)!.siblings, []);
    assert.deepEqual(imported.members.find(m => m.id === b1.id)!.siblings, []);
});

test("fillMissingPositions keeps existing positions and places new people in free cells", () => {
    const { tree, g1, a1 } = cousinTree();
    const existing = createAutoLayoutPositions(tree.members);
    existing[g1.id] = { x: 7, y: 5 };
    delete existing[a1.id];

    const positions = fillMissingPositions(tree.members, existing);

    assert.deepEqual(positions[g1.id], { x: 7, y: 5 });
    assert.ok(positions[a1.id]);
    const cells = Object.values(positions).map(p => `${p.x},${p.y}`);
    assert.equal(new Set(cells).size, cells.length);
});

test("getStatistics counts generations", () => {
    const { tree } = cousinTree();
    assert.equal(getStatistics(tree.members).generations, 3);
});

test("importJSON keeps valid line colours and drops anything else", () => {
    const tree = importJSON(JSON.stringify({
        members: [
            { id: "a", firstName: "A", lineColor: "#FF6B6B" },
            { id: "b", firstName: "B", lineColor: "red; background: url(x)" },
        ],
    }));

    assert.equal(tree.members[0].lineColor, "#FF6B6B");
    assert.equal(tree.members[1].lineColor, undefined);
});
