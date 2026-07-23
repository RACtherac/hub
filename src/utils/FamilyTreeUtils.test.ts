import test from "node:test";
import assert from "node:assert/strict";

import {
    connectParentChild,
    connectSpouses,
    createPerson,
    createAutoLayoutPositions,
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
