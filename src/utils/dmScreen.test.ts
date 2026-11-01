/// <reference types="node" />

import { test } from "node:test";
import assert from "node:assert/strict";

import {
    addLink,
    branchState,
    clearTaken,
    endStory,
    latestRecap,
    applyDamage,
    applyHeal,
    cardTitle,
    activeBoard,
    addPartyToEncounter,
    combatantFromNpc,
    combatantFromPlayer,
    createLocation,
    combatantsFromMonster,
    createMonster,
    monsterFromCombatant,
    removeMonster,
    rollFormula,
    createPlayer,
    linkedEvent,
    linkedLocation,
    locationCards,
    removeEvent,
    timeSkip,
    travelFields,
    createTracker,
    removeLocation,
    removePlayer,
    shareWithPlayer,
    stepTracker,
    createAttack,
    createBoard,
    createCombatant,
    createDefaultData,
    createEncounter,
    createItem,
    createNode,
    createNote,
    createNpc,
    duplicateCombatant,
    duplicateName,
    encounterOutcome,
    holderLabel,
    itemCards,
    itemMatches,
    itemStatLine,
    itemsHeldBy,
    locationNames,
    nextTurn,
    normalizeData,
    noteCards,
    noteMatches,
    npcCards,
    npcCombatants,
    npcMatches,
    parseData,
    previousTurn,
    playerRecord,
    recordResult,
    restParty,
    rollDeathSave,
    deathSaveState,
    removeBoard,
    removeCombatant,
    removeItem,
    removeNote,
    shareWithNpc,
    sortedNotes,
    updateNote,
    removeNode,
    removeNpc,
    rollInitiative,
    sortCombatants,
    toggleCondition,
    toggleTaken,
    unlinkEncounter,
    updateActiveBoard,
    zoomAt,
    type Board,
    type Encounter,
} from "./dmScreen";
import { starterMonsters } from "./dmMonsters";

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
    assert.equal(data.boards[0].nodes[0].kind, "note");
    assert.equal(data.boards[0].nodes[0].encounterId, undefined);
    assert.equal(data.boards[0].nodes[1].encounterId, "e1");
    assert.equal(data.boards[0].links.length, 1);
    assert.equal(data.boards[0].links[0].label, "leads to");
    assert.equal(data.boards[0].view.zoom, 2.5);
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

    const data = { ...createDefaultData(), boards: [{ ...createBoard(), ...board }] };
    const reloaded = normalizeData(JSON.parse(JSON.stringify(data)))!;
    assert.equal(reloaded.boards[0].nodes.find((n) => n.id === "A")?.taken, true);

    assert.equal(branchState(toggleTaken(board, "A")).greyNodes.size, 0);
    assert.equal(branchState(clearTaken(board)).greyNodes.size, 0);
    assert.ok(!clearTaken(board).nodes.some((n) => "taken" in n));
});

// A board in data, with the card named "End" turned into an End story card.
function storyData(board: Board) {
    const named = { ...createBoard("Act 1"), ...board, nodes: board.nodes.map((n) => (n.id === "End" ? { ...n, kind: "end" as const } : n)) };
    return { ...createDefaultData(), boards: [named], activeBoardId: named.id };
}

test("ending a story keeps the cards that led to it, in order, without untaken branches", () => {
    let board = boardFrom("Start>Fight", "Start>Sneak", "Sneak>Vault", "Fight>Boss", "Boss>End", "Vault>End");
    board = toggleTaken(board, "Fight");
    const ended = endStory(storyData(board), "End");
    const recap = activeBoard(ended).nodes.find((n) => n.id === "End")!.recap!;

    assert.deepEqual(recap.steps.map((s) => s.title), ["Start", "Fight", "Boss"]);
    assert.equal(recap.boardName, "Act 1");
    const fight = recap.steps[1];
    assert.equal(fight.taken, true);
    assert.deepEqual(fight.passedOver, ["Sneak"]);
});

test("an unconnected end card recaps the whole board, and the recap survives a reload", () => {
    const data = storyData(boardFrom("Start>Middle", "Lonely>End"));
    const board = activeBoard(data);
    const unlinked = { ...board, links: board.links.filter((l) => l.to !== "End") };
    const ended = endStory({ ...data, boards: [unlinked] }, "End");

    assert.deepEqual(latestRecap(ended, unlinked.id)!.steps.map((s) => s.title), ["Start", "Middle", "Lonely"]);
    const reloaded = normalizeData(JSON.parse(JSON.stringify(ended)))!;
    assert.deepEqual(latestRecap(reloaded, unlinked.id), latestRecap(ended, unlinked.id));
});

test("a board with no ended story has no recap, and deleting a board unlinks resume cards", () => {
    const first = createBoard("Act 1");
    const resume = { ...createNode("resume", 0, 0), resumeBoardId: first.id };
    const second = { ...createBoard("Act 2"), nodes: [resume] };
    const data = { ...createDefaultData(), boards: [first, second], activeBoardId: second.id };

    assert.equal(latestRecap(data, first.id), null);
    assert.equal(removeBoard(data, first.id).boards[0].nodes[0].resumeBoardId, undefined);
});

test("parseData keeps image data URLs on cards and drops anything else", () => {
    const data = parseData(JSON.stringify({
        ...createDefaultData(),
        boards: [{
            nodes: [
                { id: "n1", kind: "image", image: "data:image/webp;base64,AAAA" },
                { id: "n2", kind: "image", image: "https://example.com/x.png" },
            ],
            links: [],
        }],
    }));
    assert.ok(data);
    assert.equal(data.boards[0].nodes[0].kind, "image");
    assert.equal(data.boards[0].nodes[0].image, "data:image/webp;base64,AAAA");
    assert.equal(data.boards[0].nodes[1].image, undefined);
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

test("a save with a single board loads as the first of several boards", () => {
    const data = normalizeData({
        encounters: [],
        board: { nodes: [{ id: "n1", kind: "scene", title: "Tavern" }], links: [] },
    });
    assert.ok(data);
    assert.equal(data.boards.length, 1);
    assert.equal(data.boards[0].name, "Story board");
    assert.equal(data.boards[0].nodes[0].title, "Tavern");
    assert.equal(data.activeBoardId, data.boards[0].id);
});

test("boards keep their names and the active one through a reload", () => {
    const first = createBoard("Act 1");
    const second = { ...createBoard("Act 2"), nodes: [createNode("scene", 0, 0)] };
    const data = { ...createDefaultData(), boards: [first, second], activeBoardId: second.id };
    const reloaded = parseData(JSON.stringify(data))!;
    assert.deepEqual(reloaded.boards.map((b) => b.name), ["Act 1", "Act 2"]);
    assert.equal(activeBoard(reloaded).id, second.id);

    // An unknown active id falls back to the first board.
    assert.equal(parseData(JSON.stringify({ ...data, activeBoardId: "gone" }))!.activeBoardId, first.id);
});

test("changes go to the active board only", () => {
    const first = createBoard("Act 1");
    const second = createBoard("Act 2");
    const data = { ...createDefaultData(), boards: [first, second], activeBoardId: second.id };
    const changed = updateActiveBoard(data, (b) => ({ ...b, nodes: [createNode("clue", 0, 0)] }));
    assert.equal(changed.boards[0].nodes.length, 0);
    assert.equal(changed.boards[1].nodes.length, 1);
    assert.equal(changed.boards[1].name, "Act 2");
});

test("removing boards always leaves one, and moves off a removed active board", () => {
    const first = createBoard("Act 1");
    const second = createBoard("Act 2");
    const data = { ...createDefaultData(), boards: [first, second], activeBoardId: second.id };

    const one = removeBoard(data, second.id);
    assert.deepEqual(one.boards.map((b) => b.id), [first.id]);
    assert.equal(one.activeBoardId, first.id);
    assert.equal(removeBoard(data, first.id).activeBoardId, second.id);

    const none = removeBoard(one, first.id);
    assert.equal(none.boards.length, 1);
    assert.notEqual(none.boards[0].id, first.id);
    assert.equal(none.activeBoardId, none.boards[0].id);
});

test("deleting an encounter unlinks it from cards on every board", () => {
    const linked = (id: string) => ({ ...createNode("encounter", 0, 0), encounterId: id });
    const data = {
        ...createDefaultData(),
        boards: [
            { ...createBoard("Act 1"), nodes: [linked("e1"), linked("e2")] },
            { ...createBoard("Act 2"), nodes: [linked("e1")] },
        ],
    };
    const unlinked = unlinkEncounter(data, "e1");
    assert.deepEqual(unlinked.boards.flatMap((b) => b.nodes.map((n) => n.encounterId)), [undefined, "e2", undefined]);
});

test("size/type and alignment default to empty and survive a reload", () => {
    const goblin = createCombatant({ name: "Goblin", creatureType: "Small humanoid", alignment: "Neutral evil" });
    assert.equal(createCombatant().creatureType, "");
    assert.equal(createCombatant().alignment, "");

    const encounter = { ...createEncounter(), combatants: [goblin] };
    const data = { ...createDefaultData(), encounters: [encounter], activeEncounterId: encounter.id };
    const reloaded = parseData(JSON.stringify(data))!.encounters[0].combatants[0];
    assert.equal(reloaded.creatureType, "Small humanoid");
    assert.equal(reloaded.alignment, "Neutral evil");

    // Older saves without the fields load with them empty.
    const old = parseData(JSON.stringify({ encounters: [{ combatants: [{ name: "Orc" }] }] }))!;
    assert.equal(old.encounters[0].combatants[0].creatureType, "");
});

test("NPCs and their card links survive a reload; links to missing NPCs are dropped", () => {
    const ulf = createNpc({ name: "Ulf", race: "Dwarf", alignment: "Lawful good", ac: "14", maxHp: 30, hp: 22, location: "Tavern" });
    const board = { ...createBoard("Act 1"), nodes: [{ ...createNode("npc", 0, 0), npcId: ulf.id }, { ...createNode("npc", 0, 0), npcId: "gone" }] };
    const data = { ...createDefaultData(), boards: [board], activeBoardId: board.id, npcs: [ulf], activeNpcId: ulf.id };

    const reloaded = parseData(JSON.stringify(data))!;
    assert.deepEqual(reloaded.npcs, [ulf]);
    assert.equal(reloaded.activeNpcId, ulf.id);
    assert.equal(reloaded.boards[0].nodes[0].npcId, ulf.id);
    assert.equal(reloaded.boards[0].nodes[1].npcId, undefined);

    // Older saves have no NPCs.
    const old = parseData(JSON.stringify({ encounters: [] }))!;
    assert.deepEqual(old.npcs, []);
    assert.equal(old.activeNpcId, "");
});

test("an NPC's HP stays between 0 and max", () => {
    assert.equal(createNpc({ maxHp: 10, hp: 50 }).hp, 10);
    assert.equal(createNpc({ maxHp: 10 }).hp, 10);
    const reloaded = parseData(JSON.stringify({ encounters: [], npcs: [{ name: "X", maxHp: 5, hp: -3 }] }))!;
    assert.equal(reloaded.npcs[0].hp, 0);
});

test("NPC cards are found on every board, and deleting the NPC unlinks them", () => {
    const ulf = createNpc({ name: "Ulf" });
    const vex = createNpc({ name: "Vex" });
    const first = { ...createBoard("Act 1"), nodes: [{ ...createNode("npc", 0, 0), npcId: ulf.id }] };
    const second = { ...createBoard("Act 2"), nodes: [{ ...createNode("npc", 0, 0), npcId: ulf.id }, { ...createNode("npc", 0, 0), npcId: vex.id }] };
    const data = { ...createDefaultData(), boards: [first, second], npcs: [ulf, vex], activeNpcId: ulf.id };

    assert.deepEqual(npcCards(data, ulf.id).map(({ board }) => board.name), ["Act 1", "Act 2"]);

    const removed = removeNpc(data, ulf.id);
    assert.deepEqual(removed.npcs.map((n) => n.name), ["Vex"]);
    assert.equal(removed.activeNpcId, vex.id);
    assert.equal(npcCards(removed, ulf.id).length, 0);
    assert.equal(npcCards(removed, vex.id).length, 1);
    // The cards stay on the board.
    assert.equal(removed.boards[1].nodes.length, 2);

    assert.equal(removeNpc(removed, vex.id).activeNpcId, "");
});

test("location suggestions are the Location card titles on every board, once each", () => {
    const loc = (title: string) => ({ ...createNode("location", 0, 0), title });
    const data = {
        ...createDefaultData(),
        boards: [
            { ...createBoard("Act 1"), nodes: [loc("Tavern"), loc("  "), { ...createNode("scene", 0, 0), title: "Ambush" }] },
            { ...createBoard("Act 2"), nodes: [loc("Castle"), loc("Tavern")] },
        ],
    };
    assert.deepEqual(locationNames(data), ["Castle", "Tavern"]);
});

test("a card linked to an NPC is titled with the NPC's name; unlinked cards keep their own", () => {
    const ulf = createNpc({ name: "Ulf the Barkeep" });
    const linked = { ...createNode("npc", 0, 0), title: "old title", npcId: ulf.id };
    const unlinked = { ...createNode("npc", 0, 0), title: "Mysterious stranger" };
    const data = { ...createDefaultData(), npcs: [ulf] };
    assert.equal(cardTitle(data, linked), "Ulf the Barkeep");
    assert.equal(cardTitle(data, unlinked), "Mysterious stranger");
    // Renaming the NPC renames the card.
    assert.equal(cardTitle({ ...data, npcs: [{ ...ulf, name: "Ulf" }] }, linked), "Ulf");
});

test("items, their holders and card links survive a reload; bad links and holders are fixed", () => {
    const vex = createNpc({ name: "Vex" });
    const amulet = createItem({ name: "Amulet", type: "other", rarity: "rare", value: "500 gp", holder: { kind: "npc", npcId: vex.id } });
    const potion = createItem({ name: "Potion", type: "potion", holder: { kind: "party", character: "Mira" } });
    const board = {
        ...createBoard("Act 1"),
        nodes: [{ ...createNode("item", 0, 0), itemId: amulet.id }, { ...createNode("item", 0, 0), itemId: "gone" }],
    };
    const data = { ...createDefaultData(), boards: [board], activeBoardId: board.id, npcs: [vex], items: [amulet, potion], activeItemId: potion.id };

    const reloaded = parseData(JSON.stringify(data))!;
    assert.deepEqual(reloaded.items, [amulet, potion]);
    assert.equal(reloaded.activeItemId, potion.id);
    assert.equal(reloaded.boards[0].nodes[0].itemId, amulet.id);
    assert.equal(reloaded.boards[0].nodes[1].itemId, undefined);

    // An item held by an NPC that no longer exists has no holder; junk fields get defaults.
    const broken = parseData(JSON.stringify({
        encounters: [],
        items: [{ name: "Sword", type: "laser", rarity: "mythic", holder: { kind: "npc", npcId: "gone" } }],
    }))!;
    assert.deepEqual(broken.items[0].holder, { kind: "none" });
    assert.equal(broken.items[0].type, "other");
    assert.equal(broken.items[0].rarity, "");

    // Older saves have no items.
    assert.deepEqual(parseData(JSON.stringify({ encounters: [] }))!.items, []);
});

test("holder labels read naturally", () => {
    const vex = createNpc({ name: "Vex" });
    const data = { ...createDefaultData(), npcs: [vex] };
    assert.equal(holderLabel(data, { kind: "none" }), "Not found yet");
    assert.equal(holderLabel(data, { kind: "npc", npcId: vex.id }), "Held by Vex");
    assert.equal(holderLabel(data, { kind: "location", name: " the Tavern " }), "At the Tavern");
    assert.equal(holderLabel(data, { kind: "party", character: "" }), "With the party");
    assert.equal(holderLabel(data, { kind: "party", character: "Mira" }), "With the party (Mira)");
});

test("deleting an NPC drops what they carried to no holder; deleting an item unlinks its cards", () => {
    const vex = createNpc({ name: "Vex" });
    const amulet = createItem({ name: "Amulet", holder: { kind: "npc", npcId: vex.id } });
    const potion = createItem({ name: "Potion", holder: { kind: "party", character: "" } });
    const board = { ...createBoard("Act 1"), nodes: [{ ...createNode("item", 0, 0), itemId: amulet.id }] };
    const data = { ...createDefaultData(), boards: [board], npcs: [vex], items: [amulet, potion], activeItemId: amulet.id };

    assert.deepEqual(itemsHeldBy(data, vex.id).map((i) => i.name), ["Amulet"]);
    const npcGone = removeNpc(data, vex.id);
    assert.deepEqual(npcGone.items[0].holder, { kind: "none" });
    assert.deepEqual(npcGone.items[1].holder, { kind: "party", character: "" });

    assert.equal(itemCards(data, amulet.id).length, 1);
    const itemGone = removeItem(data, amulet.id);
    assert.deepEqual(itemGone.items.map((i) => i.name), ["Potion"]);
    assert.equal(itemGone.activeItemId, potion.id);
    assert.equal(itemGone.boards[0].nodes[0].itemId, undefined);
    assert.equal(itemGone.boards[0].nodes.length, 1);
});

test("a card linked to an item is titled with the item's name", () => {
    const amulet = createItem({ name: "Amulet of the Deep" });
    const card = { ...createNode("item", 0, 0), title: "old", itemId: amulet.id };
    assert.equal(cardTitle({ ...createDefaultData(), items: [amulet] }, card), "Amulet of the Deep");
});

test("an item's stat line shows what matters for its type", () => {
    const sword = createItem({ type: "weapon", stats: { attack: "melee", hit: "+5", damage: "1d8 + 3", damageType: "Slashing", range: "5 ft" } });
    assert.equal(itemStatLine(sword), "Melee · +5 · 1d8 + 3 slashing · 5 ft");

    const plate = createItem({ type: "armour", stats: { armourType: "heavy", ac: "18", stealth: "disadvantage" } });
    assert.equal(itemStatLine(plate), "Heavy · AC 18 · Stealth disadv.");

    assert.equal(itemStatLine(createItem({ type: "potion", stats: { effect: "Regain 2d4 + 2 HP" } })), "Regain 2d4 + 2 HP");
    assert.equal(itemStatLine(createItem({ type: "treasure", stats: { quantity: "12" } })), "×12");
    // Empty fields are skipped, and stats from another type don't show.
    assert.equal(itemStatLine(createItem({ type: "weapon", stats: { damage: "1d6", ac: "18" } })), "1d6");
    assert.equal(itemStatLine(createItem({ type: "other", stats: { damage: "1d6" } })), "");
});

test("item stats survive a reload, keeping only text values", () => {
    const sword = createItem({ type: "weapon", stats: { damage: "1d8", hit: "+5" } });
    const reloaded = parseData(JSON.stringify({ ...createDefaultData(), items: [sword] }))!;
    assert.deepEqual(reloaded.items[0].stats, { damage: "1d8", hit: "+5" });

    const junk = parseData(JSON.stringify({ encounters: [], items: [{ name: "X", stats: { damage: 5, hit: "+2", nested: {} } }] }))!;
    assert.deepEqual(junk.items[0].stats, { hit: "+2" });
    assert.deepEqual(parseData(JSON.stringify({ encounters: [], items: [{ name: "Old" }] }))!.items[0].stats, {});
});

test("items saved before Wondrous was removed load as Other, keeping their stats", () => {
    const data = parseData(JSON.stringify({
        encounters: [],
        items: [{ name: "Cloak", type: "wondrous", attunement: true, stats: { charges: "3" } }],
    }))!;
    assert.equal(data.items[0].type, "other");
    assert.equal("attunement" in data.items[0], false);
    assert.deepEqual(data.items[0].stats, { charges: "3" });
});

test("NPC search matches every word anywhere on the sheet, ignoring case", () => {
    const ulf = createNpc({ name: "Ulf", race: "Half-elf", alignment: "Lawful good", location: "The Rusty Tavern", notes: "Owes the guild money" });
    assert.ok(npcMatches(ulf, ""));
    assert.ok(npcMatches(ulf, "ulf"));
    assert.ok(npcMatches(ulf, "ELF tavern"));
    assert.ok(npcMatches(ulf, "guild"));
    assert.ok(!npcMatches(ulf, "elf castle"));
});

test("item search covers type, rarity, holder and the stats for its type", () => {
    const vex = createNpc({ name: "Vex" });
    const sword = createItem({
        name: "Frostbrand",
        type: "weapon",
        rarity: "very-rare",
        stats: { attack: "melee", damageType: "Cold", ac: "hidden" },
        holder: { kind: "npc", npcId: vex.id },
    });
    const data = { ...createDefaultData(), npcs: [vex], items: [sword] };
    assert.ok(itemMatches(data, sword, "frost"));
    assert.ok(itemMatches(data, sword, "weapon very rare"));
    assert.ok(itemMatches(data, sword, "held by vex"));
    assert.ok(itemMatches(data, sword, "melee cold"));
    // Stats left over from another type aren't searched.
    assert.ok(!itemMatches(data, sword, "hidden"));
    assert.ok(!itemMatches(data, sword, "with the party"));
});

test("adding an NPC to an encounter copies their stats and links the combatant to the sheet", () => {
    const vex = createNpc({
        name: "Vex",
        race: "Tiefling",
        alignment: "Neutral evil",
        ac: "15",
        maxHp: 40,
        hp: 33,
        notes: "Flees at half HP",
        attacks: [createAttack("weapon", { name: "Rapier", hit: "+6", damage: "1d8 + 4 piercing" }), createAttack("magic", { name: "Hellish Rebuke", hit: "DC 13 Dex" })],
        loot: "23 gp",
    });
    const c = combatantFromNpc(vex);
    assert.equal(c.npcId, vex.id);
    assert.equal(c.name, "Vex");
    assert.equal(c.kind, "npc");
    assert.equal(c.ac, "15");
    assert.equal(c.maxHp, 40);
    assert.equal(c.hp, 33);
    assert.equal(c.creatureType, "Tiefling");
    assert.equal(c.alignment, "Neutral evil");
    assert.equal(c.notes, "Flees at half HP");
    assert.deepEqual(c.attacks, vex.attacks);
    // Carried items are shown live in the tracker, not written into the shared loot.
    assert.equal(c.loot, "23 gp");
});

test("attacks and loot changed on either side show on the NPC and every combatant from it", () => {
    const vex = createNpc({ name: "Vex", attacks: [createAttack("weapon", { name: "Rapier" })], loot: "23 gp" });
    const ulf = createNpc({ name: "Ulf", loot: "a mug" });
    const goblin = createCombatant({ name: "Goblin", loot: "3 cp" });
    const ambush = { ...createEncounter("Ambush"), combatants: [combatantFromNpc(vex), goblin, combatantFromNpc(ulf)] };
    const finale = { ...createEncounter("Finale"), combatants: [{ ...combatantFromNpc(vex), hp: 5 }] };
    const data = { ...createDefaultData(), encounters: [ambush, finale], npcs: [vex, ulf] };

    // From the sheet.
    const dagger = createAttack("weapon", { name: "Dagger" });
    const fromSheet = shareWithNpc(data, vex.id, { attacks: [...vex.attacks, dagger] });
    assert.deepEqual(fromSheet.npcs[0].attacks.map((a) => a.name), ["Rapier", "Dagger"]);
    assert.deepEqual(fromSheet.encounters[0].combatants[0].attacks.map((a) => a.name), ["Rapier", "Dagger"]);
    assert.deepEqual(fromSheet.encounters[1].combatants[0].attacks.map((a) => a.name), ["Rapier", "Dagger"]);
    // Only Vex's: the goblin and Ulf are untouched, and the combatant keeps its own HP.
    assert.deepEqual(fromSheet.encounters[0].combatants[1], goblin);
    assert.equal(fromSheet.encounters[0].combatants[2].loot, "a mug");
    assert.equal(fromSheet.npcs[1].loot, "a mug");
    assert.equal(fromSheet.encounters[1].combatants[0].hp, 5);

    // From a combatant: the same call, so the sheet and the other encounter follow.
    const fromTracker = shareWithNpc(fromSheet, vex.id, { loot: "23 gp, a black key" });
    assert.equal(fromTracker.npcs[0].loot, "23 gp, a black key");
    assert.equal(fromTracker.encounters[1].combatants[0].loot, "23 gp, a black key");
    assert.deepEqual(fromTracker.encounters[0].combatants[0].attacks.map((a) => a.name), ["Rapier", "Dagger"]);

    assert.deepEqual(npcCombatants(fromTracker, vex.id).map(({ encounter }) => encounter.name), ["Ambush", "Finale"]);
});

test("deleting an NPC leaves its combatants with their attacks and loot, no longer shared", () => {
    const vex = createNpc({ name: "Vex", attacks: [createAttack("weapon", { name: "Rapier" })], loot: "23 gp" });
    const encounter = { ...createEncounter(), combatants: [combatantFromNpc(vex)] };
    const data = { ...createDefaultData(), encounters: [encounter], npcs: [vex] };

    const left = removeNpc(data, vex.id).encounters[0].combatants[0];
    assert.equal(left.npcId, undefined);
    assert.deepEqual(left.attacks.map((a) => a.name), ["Rapier"]);
    assert.equal(left.loot, "23 gp");
});

test("a combatant's NPC link survives a reload, and a link to a missing NPC is dropped", () => {
    const vex = createNpc({ name: "Vex" });
    const encounter = { ...createEncounter(), combatants: [combatantFromNpc(vex), { ...createCombatant(), npcId: "gone" }] };
    const data = { ...createDefaultData(), encounters: [encounter], activeEncounterId: encounter.id, npcs: [vex] };

    const reloaded = parseData(JSON.stringify(data))!.encounters[0].combatants;
    assert.equal(reloaded[0].npcId, vex.id);
    assert.equal(reloaded[1].npcId, undefined);
});

test("attacks and loot survive a reload on NPCs and combatants; older saves get none", () => {
    const rapier = createAttack("weapon", { name: "Rapier", hit: "+6", damage: "1d8", range: "5 ft" });
    const goblin = createCombatant({ name: "Goblin", attacks: [rapier], loot: "3 cp" });
    const encounter = { ...createEncounter(), combatants: [goblin] };
    const vex = createNpc({ name: "Vex", attacks: [createAttack("magic", { name: "Fire Bolt" })], loot: "a key" });
    const data = { ...createDefaultData(), encounters: [encounter], activeEncounterId: encounter.id, npcs: [vex] };

    const reloaded = parseData(JSON.stringify(data))!;
    assert.deepEqual(reloaded.encounters[0].combatants[0].attacks, [rapier]);
    assert.equal(reloaded.encounters[0].combatants[0].loot, "3 cp");
    assert.deepEqual(reloaded.npcs[0].attacks, vex.attacks);
    assert.equal(reloaded.npcs[0].loot, "a key");

    const old = parseData(JSON.stringify({
        encounters: [{ combatants: [{ name: "Orc", attacks: [{ kind: "laser", name: "Axe" }, 3] }] }],
        npcs: [{ name: "Old NPC" }],
    }))!;
    assert.deepEqual(old.encounters[0].combatants[0].attacks.map((a) => [a.kind, a.name]), [["weapon", "Axe"]]);
    assert.equal(old.encounters[0].combatants[0].loot, "");
    assert.deepEqual(old.npcs[0].attacks, []);
    assert.equal(old.npcs[0].loot, "");
});

test("notes and their card links survive a reload; older saves have none", () => {
    const lore = createNote({ title: "The Sunken Abbey", body: "Flooded in the year of the comet.", pinned: true }, 1000);
    const board = { ...createBoard("Act 1"), nodes: [{ ...createNode("note", 0, 0), noteId: lore.id }, { ...createNode("note", 0, 0), noteId: "gone" }] };
    const data = { ...createDefaultData(), boards: [board], activeBoardId: board.id, notes: [lore], activeNoteId: lore.id };

    const reloaded = parseData(JSON.stringify(data))!;
    assert.deepEqual(reloaded.notes, [lore]);
    assert.equal(reloaded.activeNoteId, lore.id);
    assert.equal(reloaded.boards[0].nodes[0].noteId, lore.id);
    assert.equal(reloaded.boards[0].nodes[1].noteId, undefined);

    const old = parseData(JSON.stringify({ encounters: [] }))!;
    assert.deepEqual(old.notes, []);
    assert.equal(old.activeNoteId, "");
});

test("a linked note card is titled with the note; notes sort pinned first, then newest", () => {
    const note = createNote({ title: "Rumours" });
    const card = { ...createNode("note", 0, 0), title: "old", noteId: note.id };
    assert.equal(cardTitle({ ...createDefaultData(), notes: [note] }, card), "Rumours");

    const a = createNote({ title: "a" }, 100);
    const b = createNote({ title: "b" }, 300);
    const c = createNote({ title: "c", pinned: true }, 50);
    assert.deepEqual(sortedNotes([a, b, c]).map((n) => n.title), ["c", "b", "a"]);
});

test("editing a note stamps the time; search covers title and text", () => {
    const note = createNote({ title: "Rumours", body: "The miller saw lights on the hill" }, 100);
    const data = { ...createDefaultData(), notes: [note] };
    const edited = updateNote(data, note.id, { body: "changed" }, 500).notes[0];
    assert.equal(edited.body, "changed");
    assert.equal(edited.updatedAt, 500);
    assert.equal(edited.title, "Rumours");

    assert.ok(noteMatches(note, "rumours"));
    assert.ok(noteMatches(note, "miller hill"));
    assert.ok(!noteMatches(note, "castle"));
});

test("deleting a note leaves its cards on the board with the note's text", () => {
    const note = createNote({ title: "Rumours", body: "Lights on the hill" });
    const other = createNote({ title: "Recap" });
    const card = { ...createNode("note", 0, 0), title: "", text: "", noteId: note.id };
    const data = { ...createDefaultData(), boards: [{ ...createBoard("Act 1"), nodes: [card] }], notes: [note, other], activeNoteId: note.id };

    assert.equal(noteCards(data, note.id).length, 1);
    const removed = removeNote(data, note.id);
    assert.deepEqual(removed.notes.map((n) => n.title), ["Recap"]);
    assert.equal(removed.activeNoteId, other.id);
    const left = removed.boards[0].nodes[0];
    assert.equal(left.noteId, undefined);
    assert.equal(left.title, "Rumours");
    assert.equal(left.text, "Lights on the hill");
});

test("trackers step between 0 and their max, or without a max", () => {
    const slots = createTracker({ name: "Spell slots", value: 1, max: 2 });
    assert.equal(stepTracker(slots, 1).value, 2);
    assert.equal(stepTracker(stepTracker(slots, 1), 1).value, 2);
    assert.equal(stepTracker(slots, -5).value, 0);
    assert.equal(stepTracker(createTracker({ value: 40 }), 10).value, 50);
});

test("a player's HP, AC and trackers are shared with every encounter they're in", () => {
    const ayla = createPlayer({ name: "Ayla", maxHp: 30, ac: "15", trackers: [createTracker({ name: "Rage", value: 3, max: 3 })] });
    const bram = createPlayer({ name: "Bram", maxHp: 20 });
    const ambush = addPartyToEncounter(createEncounter("Ambush"), [ayla, bram]);
    const finale = { ...createEncounter("Finale"), combatants: [combatantFromPlayer(ayla)] };
    const data = { ...createDefaultData(), encounters: [ambush, finale], players: [ayla, bram] };

    assert.deepEqual(ambush.combatants.map((c) => [c.name, c.kind, c.playerId]), [["Ayla", "pc", ayla.id], ["Bram", "pc", bram.id]]);
    // Nobody is added twice.
    assert.equal(addPartyToEncounter(ambush, [ayla, bram]), ambush);

    const rage = { ...ayla.trackers[0], value: 2 };
    const hurt = shareWithPlayer(data, ayla.id, { hp: 12, trackers: [rage] });
    assert.equal(hurt.players[0].hp, 12);
    assert.equal(hurt.encounters[0].combatants[0].hp, 12);
    assert.equal(hurt.encounters[1].combatants[0].hp, 12);
    assert.equal(hurt.encounters[1].combatants[0].trackers[0].value, 2);
    // Bram is untouched.
    assert.equal(hurt.encounters[0].combatants[1].hp, 20);
    assert.equal(hurt.players[1].hp, 20);
});

test("deleting a player keeps their combatants, unlinked, and links survive a reload", () => {
    const ayla = createPlayer({ name: "Ayla", trackers: [createTracker({ name: "Ki", value: 9, max: 4 })] });
    const encounter = { ...createEncounter(), combatants: [combatantFromPlayer(ayla), { ...createCombatant(), playerId: "gone" }] };
    const data = { ...createDefaultData(), encounters: [encounter], activeEncounterId: encounter.id, players: [ayla], activePlayerId: ayla.id };

    const reloaded = parseData(JSON.stringify(data))!;
    assert.equal(reloaded.activePlayerId, ayla.id);
    assert.equal(reloaded.encounters[0].combatants[0].playerId, ayla.id);
    assert.equal(reloaded.encounters[0].combatants[1].playerId, undefined);
    // A value over the max is clamped on load.
    assert.equal(reloaded.players[0].trackers[0].value, 4);

    const removed = removePlayer(data, ayla.id);
    assert.deepEqual(removed.players, []);
    assert.equal(removed.activePlayerId, "");
    assert.equal(removed.encounters[0].combatants[0].playerId, undefined);
    assert.equal(removed.encounters[0].combatants[0].name, "Ayla");
});

test("saves from before the Players tab load with no players", () => {
    const old: Record<string, unknown> = { ...createDefaultData() };
    delete old.players;
    delete old.activePlayerId;
    const loaded = normalizeData(old)!;
    assert.deepEqual(loaded.players, []);
    assert.equal(loaded.activePlayerId, "");
    assert.deepEqual(loaded.encounters[0].combatants, []);
});

test("recording a win or loss moves the players out and puts it on their sheets", () => {
    const ayla = createPlayer({ name: "Ayla" });
    const bram = createPlayer({ name: "Bram" });
    const orc = createCombatant({ name: "Orc", kind: "monster", hp: 0 });
    const ally = createCombatant({ name: "Guard", kind: "npc" });
    const fight = { ...addPartyToEncounter(createEncounter("Ambush"), [ayla, bram]), round: 3 };
    const encounter = { ...fight, combatants: [...fight.combatants, orc, ally], turnId: fight.combatants[0].id };
    const data = { ...createDefaultData(), encounters: [encounter], players: [ayla, bram] };
    assert.equal(encounterOutcome(encounter), "pcs");

    const after = recordResult(data, encounter.id, "won", 1000);
    const won = after.encounters[0];
    assert.deepEqual(won.combatants.map((c) => c.name), ["Orc", "Guard"]);
    assert.equal(won.turnId, null);
    assert.deepEqual(won.result, { outcome: "won", at: 1000, round: 3, by: ["Ayla", "Bram"] });
    // Still shows its result with the PCs gone.
    assert.equal(encounterOutcome(won), "pcs");
    assert.deepEqual(after.players[0].results, [{ encounterId: encounter.id, name: "Ambush", outcome: "won", round: 3, at: 1000 }]);
    assert.equal(recordResult(after, encounter.id, "won"), after);

    const rematch = addPartyToEncounter(createEncounter("Rematch"), [after.players[0]]);
    const lost = recordResult({ ...after, encounters: [...after.encounters, { ...rematch, round: 6 }] }, rematch.id, "lost", 2000);
    assert.equal(encounterOutcome(lost.encounters[1]), "monsters");
    assert.deepEqual(playerRecord(lost.players[0]), { wins: 1, losses: 1, winRate: 50, averageRounds: 4.5 });
    assert.deepEqual(playerRecord(lost.players[1]), { wins: 1, losses: 0, winRate: 100, averageRounds: 3 });
    assert.deepEqual(playerRecord(createPlayer()), { wins: 0, losses: 0, winRate: null, averageRounds: null });

    const reloaded = parseData(JSON.stringify(lost))!;
    assert.deepEqual(reloaded.encounters[1].result, lost.encounters[1].result);
    assert.deepEqual(reloaded.players[0].results, lost.players[0].results);
});

test("wins saved before losses were tracked load as wins", () => {
    const ayla = createPlayer({ name: "Ayla" });
    const encounter = createEncounter("Ambush");
    const old = {
        ...createDefaultData(),
        encounters: [{ ...encounter, won: { at: 5, round: 2, by: ["Ayla"] } }],
        players: [{ ...ayla, results: undefined, victories: [{ encounterId: encounter.id, name: "Ambush", round: 2, at: 5 }] }],
    };
    const loaded = normalizeData(JSON.parse(JSON.stringify(old)))!;
    assert.deepEqual(loaded.encounters[0].result, { outcome: "won", at: 5, round: 2, by: ["Ayla"] });
    assert.deepEqual(loaded.players[0].results, [{ encounterId: encounter.id, name: "Ambush", outcome: "won", round: 2, at: 5 }]);
});

test("rests refill the right trackers, and a long rest restores HP and clears death saves", () => {
    const ayla = createPlayer({
        name: "Ayla",
        maxHp: 30,
        hp: 0,
        tempHp: 4,
        deathSaves: { successes: 1, failures: 2 },
        trackers: [
            createTracker({ name: "Ki", value: 0, max: 3, resets: "short" }),
            createTracker({ name: "Slots", value: 1, max: 4, resets: "long" }),
            createTracker({ name: "Luck", value: 0, max: 1, resets: "none" }),
        ],
    });
    const encounter = { ...createEncounter(), combatants: [combatantFromPlayer(ayla)] };
    const data = { ...createDefaultData(), encounters: [encounter], players: [ayla] };

    const short = restParty(data, "short");
    assert.deepEqual(short.players[0].trackers.map((t) => t.value), [3, 1, 0]);
    // Default lengths: a short rest is an hour, a long rest eight.
    assert.equal(short.calendar.minutes, data.calendar.minutes + 60);
    assert.equal(short.players[0].hp, 0);
    assert.deepEqual(short.players[0].deathSaves, { successes: 1, failures: 2 });

    const long = restParty(data, "long");
    const rested = long.players[0];
    assert.deepEqual(rested.trackers.map((t) => t.value), [3, 4, 0]);
    assert.equal(rested.hp, 30);
    assert.equal(rested.tempHp, 0);
    assert.deepEqual(rested.deathSaves, { successes: 0, failures: 0 });
    // The encounter copy rests too.
    assert.equal(long.encounters[0].combatants[0].hp, 30);
    assert.equal(long.calendar.minutes, data.calendar.minutes + 8 * 60);

    // The DM's own lengths: a 24-hour long rest lands on the next day.
    const slow = restParty({ ...data, settings: { shortRestMinutes: 10, longRestMinutes: 24 * 60 } }, "long");
    assert.equal(slow.calendar.minutes, data.calendar.minutes);
    assert.equal(slow.calendar.today.day, data.calendar.today.day + 1);
    assert.equal(restParty({ ...data, settings: { shortRestMinutes: 10, longRestMinutes: 0 } }, "short").calendar.minutes, data.calendar.minutes + 10);

    // Settings load back, clamped; old saves get the defaults.
    const loaded = parseData(JSON.stringify({ ...data, settings: { shortRestMinutes: -5, longRestMinutes: 99999 } }))!;
    assert.deepEqual(loaded.settings, { shortRestMinutes: 0, longRestMinutes: 7 * 24 * 60 });
    assert.deepEqual(parseData(JSON.stringify({ ...data, settings: undefined }))!.settings, { shortRestMinutes: 60, longRestMinutes: 480 });
});

test("death saves: 10+ succeeds, a 1 is two failures, a 20 is back up, and healing clears them", () => {
    const down = createCombatant({ kind: "pc", maxHp: 10, hp: 0 });
    assert.deepEqual(rollDeathSave(down, 12).deathSaves, { successes: 1, failures: 0 });
    assert.deepEqual(rollDeathSave(down, 9).deathSaves, { successes: 0, failures: 1 });
    assert.deepEqual(rollDeathSave(down, 1).deathSaves, { successes: 0, failures: 2 });
    const up = rollDeathSave({ ...down, deathSaves: { successes: 1, failures: 2 } }, 20);
    assert.equal(up.hp, 1);
    assert.deepEqual(up.deathSaves, { successes: 0, failures: 0 });

    const dying = { ...down, deathSaves: { successes: 0, failures: 2 } };
    const dead = rollDeathSave(dying, 1);
    assert.equal(deathSaveState(dead.deathSaves), "dead");
    // No more rolls once it's decided.
    assert.equal(rollDeathSave(dead, 20), dead);
    assert.equal(deathSaveState({ successes: 3, failures: 1 }), "stable");

    // Healing a linked player clears the saves on the sheet and in the fight.
    const ayla = createPlayer({ maxHp: 10, hp: 0, deathSaves: { successes: 2, failures: 1 } });
    const data = { ...createDefaultData(), encounters: [{ ...createEncounter(), combatants: [combatantFromPlayer(ayla)] }], players: [ayla] };
    const healed = shareWithPlayer(data, ayla.id, { hp: 4 });
    assert.deepEqual(healed.players[0].deathSaves, { successes: 0, failures: 0 });
    assert.deepEqual(healed.encounters[0].combatants[0].deathSaves, { successes: 0, failures: 0 });
    // Saves load back clamped.
    const loaded = parseData(JSON.stringify({ ...data, players: [{ ...ayla, deathSaves: { successes: 9, failures: -1 } }] }))!;
    assert.deepEqual(loaded.players[0].deathSaves, { successes: 3, failures: 0 });
});

test("locations save and load, and their names are offered as NPC locations", () => {
    const inn = createLocation({ name: "The Rusty Lantern", kind: "Tavern", rumour: "Lights at night" });
    const data = { ...createDefaultData(), locations: [inn], activeLocationId: inn.id };
    assert.ok(locationNames(data).includes("The Rusty Lantern"));

    const reloaded = parseData(JSON.stringify(data))!;
    assert.deepEqual(reloaded.locations, [inn]);
    assert.equal(reloaded.activeLocationId, inn.id);

    const removed = removeLocation(data, inn.id);
    assert.deepEqual(removed.locations, []);
    assert.equal(removed.activeLocationId, "");

    // Saves from before locations and the calendar still load.
    const old: Record<string, unknown> = { ...createDefaultData() };
    delete old.locations;
    delete old.calendar;
    const loaded = normalizeData(old)!;
    assert.deepEqual(loaded.locations, []);
    assert.equal(loaded.calendar.months.length, 12);
});

test("location and time cards link to their sheet and event, and keep their names when it's deleted", () => {
    const inn = createLocation({ name: "The Rusty Lantern" });
    const feast = { id: "feast", title: "Harvest feast", notes: "", year: 1, month: 0, day: 3 };
    const placeCard = { ...createNode("location", 0, 0), title: "", locationId: inn.id };
    const timeCard = { ...createNode("time", 0, 0), title: "", eventId: feast.id };
    const base = createDefaultData();
    const data = {
        ...base,
        boards: [{ ...createBoard("Act 1"), nodes: [placeCard, timeCard] }],
        locations: [inn],
        calendar: { ...base.calendar, events: [feast] },
    };

    assert.equal(linkedLocation(data, placeCard), inn);
    assert.equal(linkedEvent(data, timeCard), feast);
    assert.equal(cardTitle(data, placeCard), "The Rusty Lantern");
    assert.equal(cardTitle(data, timeCard), "Harvest feast");
    assert.equal(locationCards(data, inn.id).length, 1);

    const reloaded = parseData(JSON.stringify(data))!;
    assert.equal(reloaded.boards[0].nodes[0].locationId, inn.id);
    assert.equal(reloaded.boards[0].nodes[1].eventId, feast.id);
    assert.equal(reloaded.boards[0].nodes[1].kind, "time");

    const noPlace = removeLocation(data, inn.id).boards[0].nodes[0];
    assert.equal(noPlace.locationId, undefined);
    assert.equal(noPlace.title, "The Rusty Lantern");
    const noEvent = removeEvent(data, feast.id);
    assert.deepEqual(noEvent.calendar.events, []);
    assert.equal(noEvent.boards[0].nodes[1].eventId, undefined);
    assert.equal(noEvent.boards[0].nodes[1].title, "Harvest feast");

    // Links to things that are gone are dropped on load.
    const dangling = parseData(JSON.stringify({ ...data, locations: [], calendar: { ...data.calendar, events: [] } }))!;
    assert.equal(dangling.boards[0].nodes[0].locationId, undefined);
    assert.equal(dangling.boards[0].nodes[1].eventId, undefined);
});

test("a time card skips the calendar once, and undo moves it back", () => {
    const card = { ...createNode("time", 0, 0), skipMinutes: 3 * 24 * 60 + 90 };
    const plain = createNode("time", 0, 0);
    const base = createDefaultData();
    const board = { ...base.boards[0], nodes: [card, plain] };
    const data = { ...base, boards: [board], activeBoardId: board.id };
    const start = data.calendar;

    const skipped = timeSkip(data, card.id);
    assert.equal(skipped.calendar.today.day, start.today.day + 3);
    assert.equal(skipped.calendar.minutes, start.minutes + 90);
    assert.equal(skipped.boards[0].nodes[0].skipped, true);
    // A second click does nothing until it's undone.
    assert.equal(timeSkip(skipped, card.id), skipped);

    const undone = timeSkip(skipped, card.id, true);
    assert.deepEqual(undone.calendar, start);
    assert.equal(undone.boards[0].nodes[0].skipped, undefined);
    assert.equal(timeSkip(undone, card.id, true), undone);

    // No length, no skip.
    assert.equal(timeSkip(data, plain.id), data);
    // Survives a reload.
    const reloaded = parseData(JSON.stringify(skipped))!;
    assert.equal(reloaded.boards[0].nodes[0].skipMinutes, card.skipMinutes);
    assert.equal(reloaded.boards[0].nodes[0].skipped, true);
});

test("a travel card's journey sets its skip, and skipping it moves the calendar", () => {
    const blank = createNode("travel", 0, 0);
    const walk = { ...blank, ...travelFields(blank, { travelDistance: 60, travelUnit: "mi", travelMode: "walk" }) };
    // 24 miles a day walking: two full days and 4 hours.
    assert.equal(walk.skipMinutes, 2 * 24 * 60 + 4 * 60);
    const km = { ...walk, ...travelFields(walk, { travelDistance: 60 * 1.609344, travelUnit: "km", travelMode: "walk" }) };
    assert.equal(km.skipMinutes, walk.skipMinutes);
    assert.equal(travelFields(blank, { travelDistance: undefined }).skipMinutes, undefined);

    const base = createDefaultData();
    const board = { ...base.boards[0], nodes: [walk] };
    const data = { ...base, boards: [board], activeBoardId: board.id };
    const skipped = timeSkip(data, walk.id);
    assert.equal(skipped.calendar.today.day, data.calendar.today.day + 2);

    const reloaded = parseData(JSON.stringify(skipped))!.boards[0].nodes[0];
    assert.equal(reloaded.kind, "travel");
    assert.equal(reloaded.travelDistance, 60);
    assert.equal(reloaded.travelMode, "walk");
    assert.equal(reloaded.skipped, true);
});

test("dice formulas roll within range, and junk isn't a formula", () => {
    const low = () => 0;
    const high = () => 0.9999;
    assert.equal(rollFormula("2d6 + 2", low), 4);
    assert.equal(rollFormula("2d6 + 2", high), 14);
    assert.equal(rollFormula("d20", high), 20);
    assert.equal(rollFormula("3d8-1", low), 2);
    assert.equal(rollFormula("7", low), 7);
    assert.equal(rollFormula("", low), null);
    assert.equal(rollFormula("2d", low), null);
    assert.equal(rollFormula("lots", low), null);
});

test("library monsters become numbered combatants, with rolled or average HP", () => {
    const goblin = createMonster({
        name: "Goblin", hp: 7, hpDice: "2d6", ac: "15", initiativeMod: 2,
        attacks: [createAttack("weapon", { name: "Scimitar" })], traits: "Nimble Escape", loot: "3 cp",
    });
    const copies = combatantsFromMonster(goblin, 3, ["Goblin"]);
    assert.deepEqual(copies.map((c) => c.name), ["Goblin 2", "Goblin 3", "Goblin 4"]);
    assert.ok(copies.every((c) => c.kind === "monster" && c.maxHp === 7 && c.hp === 7 && c.ac === "15" && c.notes === "Nimble Escape"));
    // Each copy has its own attacks, so editing one doesn't edit the others.
    assert.notEqual(copies[0].attacks[0].id, copies[1].attacks[0].id);

    const rolled = combatantsFromMonster(goblin, 2, [], true, () => 0.9999);
    assert.deepEqual(rolled.map((c) => [c.name, c.maxHp]), [["Goblin", 12], ["Goblin 2", 12]]);
    // No valid dice: falls back to average.
    assert.equal(combatantsFromMonster({ ...goblin, hpDice: "?" }, 1, [], true)[0].maxHp, 7);

    const saved = monsterFromCombatant(copies[1]);
    assert.equal(saved.name, "Goblin");
    assert.equal(saved.hp, 7);
    assert.equal(saved.attacks[0].name, "Scimitar");

    const data = { ...createDefaultData(), monsters: [goblin], activeMonsterId: goblin.id };
    const reloaded = parseData(JSON.stringify(data))!;
    assert.deepEqual(reloaded.monsters, [goblin]);
    assert.equal(removeMonster(reloaded, goblin.id).activeMonsterId, "");
});

test("starter monsters have hit dice that roll around their average HP", () => {
    const starters = starterMonsters();
    assert.ok(starters.length >= 5);
    for (const m of starters) {
        const low = rollFormula(m.hpDice, () => 0)!;
        const high = rollFormula(m.hpDice, () => 0.9999)!;
        assert.ok(low <= m.hp && m.hp <= high, `${m.name}: ${m.hp} not in ${low}-${high}`);
    }
    // Fresh ids each time, so adding them twice doesn't clash.
    assert.notEqual(starterMonsters()[0].id, starters[0].id);
});
