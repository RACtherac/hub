/// <reference types="node" />

import { test } from "node:test";
import assert from "node:assert/strict";

import {
    buildLoreIndex,
    linkNames,
    loreCards,
    loreRef,
    parseLoreRef,
    searchLore,
    splitLinks,
} from "./dmLore";
import {
    createBoard,
    createDefaultData,
    createItem,
    createLocation,
    createNode,
    createNote,
    createNpc,
    createPlayer,
    createQuest,
    createQuestStage,
    type DmScreenData,
} from "./dmScreen";

function campaign(): DmScreenData {
    const mira = createNpc({ name: "Mira the Smith", location: "Oakvale" });
    const oakvale = createLocation({ name: "Oakvale", npc: "Mira the Smith", rumour: "Wolves near [[Old Mill]]." });
    const hammer = createItem({ name: "Runed Hammer", holder: { kind: "npc", npcId: mira.id } });
    const ring = createItem({ name: "Ring", holder: { kind: "location", name: "oakvale" } });
    const quest = createQuest({
        title: "Lost Hammer",
        summary: "[[Mira the Smith|Mira]] wants it back.",
        rewardItemIds: [hammer.id],
        stages: {
            begin: createQuestStage({ npcIds: [mira.id] }),
            middle: createQuestStage(),
            end: createQuestStage(),
            reward: createQuestStage(),
        },
    });
    const note = createNote({ title: "Session 1", body: "Met [[mira the smith]] in [[Oakvale]]. Visited [[Dragon Peak]]." });
    return { ...createDefaultData(), npcs: [mira], locations: [oakvale], items: [hammer, ring], quests: [quest], notes: [note] };
}

test("splitLinks separates plain text and [[links]], with optional shown text", () => {
    assert.deepEqual(splitLinks("Ask [[Mira]] or [[Old Tom|Tom]]."), [
        { type: "text", text: "Ask " },
        { type: "link", name: "Mira", label: "Mira" },
        { type: "text", text: " or " },
        { type: "link", name: "Old Tom", label: "Tom" },
        { type: "text", text: "." },
    ]);
    assert.deepEqual(splitLinks("no links"), [{ type: "text", text: "no links" }]);
    assert.deepEqual(linkNames("[[A]] [[A]] [[B|b]] [[]]"), ["A", "B"]);
});

test("parseLoreRef reads page addresses and rejects junk", () => {
    assert.deepEqual(parseLoreRef("npc:abc"), { kind: "npc", id: "abc" });
    assert.equal(parseLoreRef("dragon:abc"), null);
    assert.equal(parseLoreRef("npc:"), null);
    assert.equal(parseLoreRef(null), null);
});

test("buildLoreIndex makes a page for every entity", () => {
    const index = buildLoreIndex(campaign());
    assert.equal(index.pages.length, 6);
    assert.equal(index.byName.get("oakvale")?.kind, "location");
});

test("links come from stored ids, free-text names and [[mentions]], with backlinks", () => {
    const data = campaign();
    const index = buildLoreIndex(data);
    const [mira] = data.npcs;
    const [hammer, ring] = data.items;
    const miraRef = loreRef("npc", mira.id);
    const oakRef = loreRef("location", data.locations[0].id);

    const from = (ref: string) => (index.linksFrom.get(ref as never) ?? []).map((l) => `${l.reason} ${l.to}`).sort();
    assert.deepEqual(from(miraRef), [`carries item:${hammer.id}`, `is found at ${oakRef}`].sort());
    assert.ok(from(oakRef).includes(`holds item:${ring.id}`));
    assert.ok(from(oakRef).includes(`is home to ${miraRef}`));

    const quest = loreRef("quest", data.quests[0].id);
    // The quest also writes [[Mira]], but already involves her, so no extra "mentions" link.
    assert.deepEqual(from(quest), [`involves ${miraRef}`, `rewards item:${hammer.id}`].sort());

    // Backlinks: everything pointing at Mira, case-insensitive [[mira the smith]] included.
    const to = (index.linksTo.get(miraRef) ?? []).map((l) => l.from);
    assert.ok(to.includes(loreRef("note", data.notes[0].id)));
    assert.ok(to.includes(quest));
    assert.ok(to.includes(oakRef));
});

test("[[links]] to pages that don't exist are listed as missing", () => {
    const data = campaign();
    const index = buildLoreIndex(data);
    assert.deepEqual(
        index.missing.map((m) => m.name),
        ["Dragon Peak", "Old Mill"],
    );
    assert.deepEqual(index.missing[0].from, [loreRef("note", data.notes[0].id)]);
});

test("party items link to the player carrying them by name", () => {
    const hero = createPlayer({ name: "Brann" });
    const sword = createItem({ name: "Sword", holder: { kind: "party", character: "brann" } });
    const index = buildLoreIndex({ ...createDefaultData(), players: [hero], items: [sword] });
    assert.deepEqual(index.linksTo.get(loreRef("item", sword.id))?.map((l) => l.from), [loreRef("player", hero.id)]);
});

test("loreCards finds linked cards and cards that mention the page", () => {
    const data = campaign();
    const mira = data.npcs[0];
    const linked = { ...createNode("npc", 0, 0), npcId: mira.id };
    const mention = { ...createNode("scene", 0, 0), text: "The forge of [[Mira the Smith]]" };
    const other = { ...createNode("scene", 0, 0), text: "Nothing here" };
    const board = { ...createBoard(), id: "b1", name: "Act 1", nodes: [linked, mention, other] };
    const page = buildLoreIndex(data).byRef.get(loreRef("npc", mira.id))!;
    assert.deepEqual(loreCards({ ...data, boards: [board] }, page).map((c) => c.node.id), [linked.id, mention.id]);
});

test("searchLore ranks title matches first", () => {
    const index = buildLoreIndex(campaign());
    const titles = searchLore(index.pages, "mira").map((p) => p.title);
    assert.equal(titles[0], "Mira the Smith");
    assert.ok(titles.includes("Session 1"));
    assert.equal(searchLore(index.pages, "").length, index.pages.length);
    assert.equal(searchLore(index.pages, "zzz").length, 0);
});
