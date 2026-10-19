/// <reference types="node" />

import { test } from "node:test";
import assert from "node:assert/strict";

import {
    addLink,
    branchState,
    clearTaken,
    applyDamage,
    applyHeal,
    createCombatant,
    createDefaultData,
    createEncounter,
    createNode,
    duplicateCombatant,
    duplicateName,
    encounterOutcome,
    nextTurn,
    normalizeData,
    parseData,
    previousTurn,
    removeCombatant,
    removeNode,
    rollInitiative,
    sortCombatants,
    toggleCondition,
    toggleTaken,
    zoomAt,
    type Board,
    type Encounter,
} from "./dmScreen";

function encounterWith(...specs: [string, number][]): Encounter {
    return {
        ...createEncounter(),
        combatants: specs.map(([name, initiative]) => createCombatant({ name, initiative })),
    };
}

test("combatants sort by initiative, then modifier, then name", () => {
    const order = sortCombatants([
        createCombatant({ name: "B", initiative: 10, initiativeMod: 1 }),
        createCombatant({ name: "A", initiative: 10, initiativeMod: 1 }),
        createCombatant({ name: "C", initiative: 10, initiativeMod: 3 }),
        createCombatant({ name: "D", initiative: 18 }),
    ]);
    assert.deepEqual(order.map((c) => c.name), ["D", "C", "A", "B"]);
});

test("damage eats temporary HP first and stops at 0", () => {
    const hero = createCombatant({ maxHp: 20, hp: 20, tempHp: 5 });
    const hit = applyDamage(hero, 8);
    assert.equal(hit.tempHp, 0);
    assert.equal(hit.hp, 17);
    assert.equal(applyDamage(hit, 100).hp, 0);
});

test("healing never goes above max HP", () => {
    const hero = createCombatant({ maxHp: 20, hp: 5 });
    assert.equal(applyHeal(hero, 4).hp, 9);
    assert.equal(applyHeal(hero, 50).hp, 20);
    assert.equal(applyHeal(hero, -3).hp, 5);
});

test("next turn follows initiative order and wraps into a new round", () => {
    let encounter = encounterWith(["Slow", 3], ["Fast", 19], ["Mid", 10]);
    encounter = nextTurn(encounter);
    const name = () => encounter.combatants.find((c) => c.id === encounter.turnId)?.name;
    assert.equal(name(), "Fast");
    assert.equal(encounter.round, 1);
    encounter = nextTurn(nextTurn(encounter));
    assert.equal(name(), "Slow");
    encounter = nextTurn(encounter);
    assert.equal(name(), "Fast");
    assert.equal(encounter.round, 2);
});

test("previous turn steps back across rounds but not before round 1", () => {
    let encounter = nextTurn(encounterWith(["A", 10], ["B", 5]));
    assert.equal(previousTurn(encounter).turnId, null);

    encounter = nextTurn(nextTurn(encounter)); // round 2, A
    assert.equal(encounter.round, 2);
    const back = previousTurn(encounter);
    assert.equal(back.round, 1);
    assert.equal(back.combatants.find((c) => c.id === back.turnId)?.name, "B");
});

test("rolling initiative can skip player characters", () => {
    const encounter: Encounter = {
        ...createEncounter(),
        combatants: [
            createCombatant({ name: "Hero", kind: "pc", initiative: 12, initiativeMod: 2 }),
            createCombatant({ name: "Orc", kind: "monster", initiativeMod: 1 }),
        ],
    };
    const rolled = rollInitiative(encounter, "non-pc", () => 0.5); // d20 = 11
    assert.equal(rolled.combatants[0].initiative, 12);
    assert.equal(rolled.combatants[1].initiative, 12);
    assert.equal(rollInitiative(encounter, "all", () => 0.99).combatants[0].initiative, 22);
});

test("duplicates get the next free number", () => {
    assert.equal(duplicateName("Goblin", ["Goblin"]), "Goblin 2");
    assert.equal(duplicateName("Goblin", ["Goblin", "Goblin 2", "Goblin 4"]), "Goblin 5");
    assert.equal(duplicateName("Goblin 2", ["Goblin", "Goblin 2"]), "Goblin 3");

    const encounter = encounterWith(["Goblin", 10]);
    encounter.combatants[0].hp = 1;
    const copy = duplicateCombatant(encounter, encounter.combatants[0].id).combatants[1];
    assert.equal(copy.name, "Goblin 2");
    assert.equal(copy.hp, copy.maxHp);
    assert.notEqual(copy.id, encounter.combatants[0].id);
});

test("removing the active combatant passes the turn on", () => {
    let encounter = nextTurn(encounterWith(["A", 10], ["B", 5]));
    encounter = removeCombatant(encounter, encounter.turnId!);
    assert.equal(encounter.combatants.find((c) => c.id === encounter.turnId)?.name, "B");
});

test("conditions toggle case-insensitively", () => {
    const hero = toggleCondition(createCombatant(), "Prone");
    assert.deepEqual(hero.conditions, ["Prone"]);
    assert.deepEqual(toggleCondition(hero, "prone").conditions, []);
    assert.deepEqual(toggleCondition(hero, "  ").conditions, ["Prone"]);
});

test("links are not duplicated, self-linked or dangling", () => {
    const a = createNode("scene", 0, 0);
    const b = createNode("encounter", 300, 0);
    let board: Board = { nodes: [a, b], links: [], view: { x: 0, y: 0, zoom: 1 } };
    board = addLink(board, a.id, b.id);
    board = addLink(board, a.id, b.id);
    board = addLink(board, a.id, a.id);
    board = addLink(board, a.id, "missing");
    assert.equal(board.links.length, 1);

    board = addLink(board, b.id, a.id);
    assert.equal(board.links.length, 2, "the reverse direction is a different connection");

    board = removeNode(board, a.id);
    assert.equal(board.nodes.length, 1);
    assert.equal(board.links.length, 0);
});

test("zooming keeps the point under the cursor in place", () => {
    const view = zoomAt({ x: 0, y: 0, zoom: 1 }, 2, 100, 50);
    assert.deepEqual(view, { x: -100, y: -50, zoom: 2 });
    assert.equal(zoomAt({ x: 0, y: 0, zoom: 1 }, 100, 0, 0).zoom, 2.5);
});

test("loading rejects junk and repairs partial data", () => {
    assert.equal(parseData(null), null);
    assert.equal(parseData("not json"), null);
    assert.equal(parseData("[]"), null);
    assert.equal(parseData('{"hello":1}'), null);

    const data = normalizeData({
        encounters: [{ id: "e1", name: "Ambush", turnId: "gone", combatants: [{ id: "c1", name: "Orc", hp: 50, maxHp: 15 }, 7] }],
        activeEncounterId: "missing",
        board: {
            nodes: [{ id: "n1", kind: "weird", x: 10, encounterId: "nope" }, { id: "n2", kind: "encounter", encounterId: "e1" }],
            links: [{ from: "n1", to: "n2", label: "leads to" }, { from: "n1", to: "n2" }, { from: "n1", to: "x" }],
            view: { zoom: 99 },
        },
    });
    assert.ok(data);
    assert.equal(data.activeEncounterId, "e1");
    assert.equal(data.encounters[0].turnId, null);
    assert.equal(data.encounters[0].combatants.length, 1);
    assert.equal(data.encounters[0].combatants[0].hp, 15);
    assert.equal(data.board.nodes[0].kind, "note");
    assert.equal(data.board.nodes[0].encounterId, undefined);
    assert.equal(data.board.nodes[1].encounterId, "e1");
    assert.equal(data.board.links.length, 1);
    assert.equal(data.board.links[0].label, "leads to");
    assert.equal(data.board.view.zoom, 2.5);
});

test("default data round-trips through JSON", () => {
    const data = createDefaultData();
    assert.deepEqual(parseData(JSON.stringify(data)), data);
});

// Builds a board from "A>B" style edges; cards are named by their ids.
function boardFrom(...edges: string[]): Board {
    let board: Board = { nodes: [], links: [], view: { x: 0, y: 0, zoom: 1 } };
    const ids = [...new Set(edges.flatMap((edge) => edge.split(">")))];
    board = { ...board, nodes: ids.map((id) => ({ ...createNode("scene", 0, 0), id, title: id })) };
    edges.forEach((edge) => {
        const [from, to] = edge.split(">");
        board = addLink(board, from, to);
    });
    return board;
}

const sorted = (set: Set<string>) => [...set].sort();
const linkId = (board: Board, from: string, to: string) => board.links.find((l) => l.from === from && l.to === to)!.id;

test("branches from the same card are choices; nothing is grey until one is taken", () => {
    const board = boardFrom("Start>Fight", "Start>Sneak", "Fight>Boss");
    const state = branchState(board);
    assert.deepEqual(sorted(state.choices), ["Fight", "Sneak"]);
    assert.equal(state.greyNodes.size, 0);
    assert.equal(state.greyLinks.size, 0);
});

test("taking a branch greys out the other branch and everything after it", () => {
    let board = boardFrom("Start>Fight", "Start>Sneak", "Sneak>Vault", "Vault>Escape", "Fight>Boss");
    board = toggleTaken(board, "Fight");
    const state = branchState(board);

    assert.deepEqual(sorted(state.greyNodes), ["Escape", "Sneak", "Vault"]);
    assert.ok(state.greyLinks.has(linkId(board, "Start", "Sneak")));
    assert.ok(state.greyLinks.has(linkId(board, "Vault", "Escape")));
    assert.ok(!state.greyLinks.has(linkId(board, "Start", "Fight")));
    assert.ok(!state.greyNodes.has("Boss"));
});

test("branches that join up again stay open where the taken path reaches", () => {
    // Both routes lead to the Throne room; only the Sneak-only Vault goes grey.
    let board = boardFrom("Start>Fight", "Start>Sneak", "Fight>Throne", "Sneak>Throne", "Sneak>Vault");
    board = toggleTaken(board, "Fight");
    const state = branchState(board);

    assert.deepEqual(sorted(state.greyNodes), ["Sneak", "Vault"]);
    assert.ok(state.greyLinks.has(linkId(board, "Sneak", "Throne")), "the line from the untaken branch is grey");
});

test("taking two branches of the same choice keeps both open", () => {
    let board = boardFrom("Start>A", "Start>B", "Start>C");
    board = toggleTaken(toggleTaken(board, "A"), "B");
    assert.deepEqual(sorted(branchState(board).greyNodes), ["C"]);
});

test("cycles don't loop forever or keep a dead branch alive", () => {
    let board = boardFrom("Start>A", "Start>B", "B>C", "C>B");
    board = toggleTaken(board, "A");
    assert.deepEqual(sorted(branchState(board).greyNodes), ["B", "C"]);
});

test("ticking again or clearing undoes the choice, and taken survives a reload", () => {
    let board = boardFrom("Start>A", "Start>B");
    board = toggleTaken(board, "A");

    const data = { ...createDefaultData(), board };
    const reloaded = normalizeData(JSON.parse(JSON.stringify(data)))!;
    assert.equal(reloaded.board.nodes.find((n) => n.id === "A")?.taken, true);

    assert.equal(branchState(toggleTaken(board, "A")).greyNodes.size, 0);
    assert.equal(branchState(clearTaken(board)).greyNodes.size, 0);
    assert.ok(!clearTaken(board).nodes.some((n) => "taken" in n));
});

test("parseData keeps image data URLs on cards and drops anything else", () => {
    const data = parseData(JSON.stringify({
        ...createDefaultData(),
        board: {
            nodes: [
                { id: "n1", kind: "image", image: "data:image/webp;base64,AAAA" },
                { id: "n2", kind: "image", image: "https://example.com/x.png" },
            ],
            links: [],
        },
    }));
    assert.ok(data);
    assert.equal(data.board.nodes[0].kind, "image");
    assert.equal(data.board.nodes[0].image, "data:image/webp;base64,AAAA");
    assert.equal(data.board.nodes[1].image, undefined);
});

test("an encounter is won once one side is all down; NPCs don't decide it", () => {
    const pc = createCombatant({ kind: "pc", maxHp: 10 });
    const orc = createCombatant({ kind: "monster", maxHp: 10 });
    const ally = createCombatant({ kind: "npc", maxHp: 10 });
    const fight = (...combatants: ReturnType<typeof createCombatant>[]) => ({ ...createEncounter(), combatants });

    assert.equal(encounterOutcome(fight(pc, orc, ally)), null);
    assert.equal(encounterOutcome(fight(pc, { ...orc, hp: 0 }, ally)), "pcs");
    assert.equal(encounterOutcome(fight({ ...pc, hp: 0 }, orc, ally)), "monsters");
    // One side missing means there's no fight to win yet.
    assert.equal(encounterOutcome(fight(pc, ally)), null);
    assert.equal(encounterOutcome(fight({ ...orc, hp: 0 })), null);
});
