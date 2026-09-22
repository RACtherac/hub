/// <reference types="node" />

import { test } from "node:test";
import assert from "node:assert/strict";

import {
    connectParentChild,
    connectSpouses,
    createFolder,
    createPerson,
    createAutoLayoutPositions,
    getBranchMembers,
    getFolderMembers,
    saveFolder,
} from "./FamilyTreeUtils";

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
