/// <reference types="node" />

import { test } from "node:test";
import assert from "node:assert/strict";

import {
    addLink,
    branchState,
    clearTaken,
    applyDamage,
    applyHeal,
    cardTitle,
    activeBoard,
    combatantFromNpc,
    createAttack,
    createBoard,
    createCombatant,
    createDefaultData,
    createEncounter,
    createItem,
    createNode,
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
    npcCards,
    npcMatches,
    parseData,
    previousTurn,
    removeBoard,
    removeCombatant,
    removeItem,
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

test("adding an NPC to an encounter copies their stats, attacks and loot, plus what they carry", () => {
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
    const amulet = createItem({ name: "Amulet", holder: { kind: "npc", npcId: vex.id } });
    const data = { ...createDefaultData(), npcs: [vex], items: [amulet] };

    const c = combatantFromNpc(data, vex);
    assert.equal(c.name, "Vex");
    assert.equal(c.kind, "npc");
    assert.equal(c.ac, "15");
    assert.equal(c.maxHp, 40);
    assert.equal(c.hp, 33);
    assert.equal(c.creatureType, "Tiefling");
    assert.equal(c.alignment, "Neutral evil");
    assert.equal(c.notes, "Flees at half HP");
    assert.deepEqual(c.attacks.map((a) => [a.kind, a.name, a.hit]), [["weapon", "Rapier", "+6"], ["magic", "Hellish Rebuke", "DC 13 Dex"]]);
    // Own copies, so editing the combatant doesn't touch the NPC.
    assert.notEqual(c.attacks[0].id, vex.attacks[0].id);
    assert.equal(c.loot, "23 gp\nCarrying: Amulet");

    assert.equal(combatantFromNpc({ ...data, items: [] }, { ...vex, loot: "" }).loot, "");
    assert.equal(combatantFromNpc(data, { ...vex, loot: "" }).loot, "Carrying: Amulet");
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
