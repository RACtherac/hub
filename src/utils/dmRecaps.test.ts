/// <reference types="node" />

import { test } from "node:test";
import assert from "node:assert/strict";

import {
    addLink,
    createBoard,
    createDefaultData,
    createNode,
    createNote,
    createSessionRecap,
    endedCards,
    endStory,
    nextSessionNumber,
    noteCards,
    noteToRecap,
    parseData,
    recapDraft,
    recapForCard,
    recapFromEndCard,
    recapLabel,
    recapMatches,
    removeSessionRecap,
    sortedRecaps,
    todayIso,
    type DmScreenData,
} from "./dmScreen";
import { buildLoreIndex, loreCards, loreRef } from "./dmLore";

// A board where a scene leads to an End story card.
function storyData(): { data: DmScreenData; boardId: string; endId: string } {
    const scene = { ...createNode("scene", 0, 0), title: "Arrive in Oakvale", text: "Met [[Mira]] at the forge." };
    const end = createNode("end", 300, 0);
    let board = { ...createBoard("The Old Mill"), nodes: [scene, end] };
    board = { ...board, ...addLink(board, scene.id, end.id) };
    const data = { ...createDefaultData(), boards: [board], activeBoardId: board.id };
    return { data, boardId: board.id, endId: end.id };
}

test("recapLabel names sessions by number and title", () => {
    assert.equal(recapLabel(createSessionRecap({ number: 3, title: "The Old Mill" })), "Session 3: The Old Mill");
    assert.equal(recapLabel(createSessionRecap({ number: 3 })), "Session 3");
    assert.equal(recapLabel(createSessionRecap({ title: "Prologue" })), "Prologue");
    assert.equal(recapLabel(createSessionRecap()), "Untitled session");
});

test("sortedRecaps puts the newest session first and nextSessionNumber counts on", () => {
    const one = createSessionRecap({ number: 1 });
    const ten = createSessionRecap({ number: 10 });
    const two = createSessionRecap({ number: 2 });
    assert.deepEqual(sortedRecaps([one, ten, two]).map((r) => r.number), [10, 2, 1]);
    assert.equal(nextSessionNumber([one, ten, two]), 11);
    assert.equal(nextSessionNumber([]), 1);
});

test("todayIso formats a local date for date inputs", () => {
    assert.equal(todayIso(new Date(2026, 0, 5, 23, 30)), "2026-01-05");
});

test("recapFromEndCard ends the story and drafts a linked recap from it", () => {
    const { data, boardId, endId } = storyData();
    const { data: next, recapId } = recapFromEndCard(data, boardId, endId, new Date(2026, 10, 16).getTime());

    const recap = next.recaps.find((r) => r.id === recapId)!;
    assert.equal(next.activeRecapId, recapId);
    assert.equal(recap.number, 1);
    assert.equal(recap.title, "The Old Mill");
    assert.equal(recap.playedOn, "2026-11-16");
    assert.equal(recap.boardId, boardId);
    assert.equal(recap.endNodeId, endId);
    assert.match(recap.body, /^- Arrive in Oakvale: Met \[\[Mira\]\] at the forge\./);

    // The story was ended on the way, so the card has its saved recap.
    assert.ok(next.boards[0].nodes.find((n) => n.id === endId)?.recap);
    assert.equal(recapForCard(next, boardId, endId)?.id, recapId);
});

test("recapFromEndCard opens the existing recap instead of writing a second one", () => {
    const { data, boardId, endId } = storyData();
    const first = recapFromEndCard(data, boardId, endId);
    const again = recapFromEndCard({ ...first.data, activeRecapId: "" }, boardId, endId);
    assert.equal(again.recapId, first.recapId);
    assert.equal(again.data.recaps.length, 1);
    assert.equal(again.data.activeRecapId, first.recapId);
});

test("recapFromEndCard ignores cards that aren't End story cards", () => {
    const { data, boardId } = storyData();
    const sceneId = data.boards[0].nodes[0].id;
    const result = recapFromEndCard(data, boardId, sceneId);
    assert.equal(result.recapId, "");
    assert.equal(result.data, data);
});

test("recapDraft lists each card with its details and the branches passed over", () => {
    const draft = recapDraft({
        boardName: "B",
        endedAt: 0,
        endedOn: "",
        steps: [
            { kind: "scene", title: "Crossroads", text: "Two roads.\nBoth muddy.", via: "", taken: false, passedOver: [], details: [] },
            { kind: "encounter", title: "Ambush", text: "", via: "", taken: true, passedOver: ["Bridge"], details: ["⚔ Players won"] },
        ],
    });
    assert.equal(draft, "- Crossroads: Two roads. Both muddy.\n- Ambush (⚔ Players won; instead of Bridge)");
});

test("endedCards lists only ended End story cards, newest first", () => {
    const { data, endId } = storyData();
    assert.equal(endedCards(data).length, 0);
    const ended = endStory(data, endId);
    assert.deepEqual(endedCards(ended).map((c) => c.node.id), [endId]);
});

test("noteToRecap moves a note into the recaps and unlinks its cards", () => {
    const note = createNote({ title: "Session 1", body: "We met." });
    const card = { ...createNode("note", 0, 0), noteId: note.id };
    const board = { ...createBoard(), nodes: [card] };
    const data = { ...createDefaultData(), boards: [board], activeBoardId: board.id, notes: [note] };

    const { data: next, recapId } = noteToRecap(data, note.id);
    assert.equal(next.notes.length, 0);
    assert.equal(next.recaps[0].id, recapId);
    assert.equal(next.recaps[0].title, "Session 1");
    assert.equal(next.recaps[0].body, "We met.");
    assert.equal(next.activeRecapId, recapId);
    // The card keeps the text it showed.
    assert.equal(noteCards(next, note.id).length, 0);
    assert.equal(next.boards[0].nodes[0].text, "We met.");
});

test("removeSessionRecap picks the next newest as the open one", () => {
    const a = createSessionRecap({ number: 1 });
    const b = createSessionRecap({ number: 2 });
    const data = { ...createDefaultData(), recaps: [a, b], activeRecapId: b.id };
    const next = removeSessionRecap(data, b.id);
    assert.deepEqual(next.recaps.map((r) => r.id), [a.id]);
    assert.equal(next.activeRecapId, a.id);
});

test("recapMatches searches the label, dates and text", () => {
    const recap = createSessionRecap({ number: 4, title: "Mill", inGameDate: "3rd Frostmoon", body: "The wolves fled." });
    assert.ok(recapMatches(recap, "session 4"));
    assert.ok(recapMatches(recap, "frostmoon wolves"));
    assert.ok(!recapMatches(recap, "dragon"));
});

test("saved recaps load back, and links to deleted End story cards are dropped", () => {
    const { data, boardId, endId } = storyData();
    const { data: withRecap } = recapFromEndCard(data, boardId, endId);
    const loaded = parseData(JSON.stringify(withRecap))!;
    assert.equal(loaded.recaps.length, 1);
    assert.equal(loaded.recaps[0].endNodeId, endId);
    assert.equal(loaded.activeRecapId, loaded.recaps[0].id);

    const cardGone = { ...withRecap, boards: withRecap.boards.map((b) => ({ ...b, nodes: b.nodes.filter((n) => n.id !== endId) })) };
    const reloaded = parseData(JSON.stringify(cardGone))!;
    assert.equal(reloaded.recaps.length, 1);
    assert.equal(reloaded.recaps[0].endNodeId, undefined);
    assert.equal(reloaded.recaps[0].boardId, undefined);

    // Saves from before this tab have no recaps.
    const old: Partial<DmScreenData> = { ...data };
    delete old.recaps;
    delete old.activeRecapId;
    const fromOld = parseData(JSON.stringify(old))!;
    assert.deepEqual(fromOld.recaps, []);
    assert.equal(fromOld.activeRecapId, "");
});

test("recaps are Lore pages: their [[links]] become backlinks, and the End card is their board card", () => {
    const { data, boardId, endId } = storyData();
    const { data: next, recapId } = recapFromEndCard(data, boardId, endId);
    const withMira = { ...next, notes: [createNote({ title: "Mira" })] };
    const index = buildLoreIndex(withMira);
    const recapPage = index.byRef.get(loreRef("recap", recapId))!;
    assert.equal(recapPage.title, "Session 1: The Old Mill");
    const miraRef = loreRef("note", withMira.notes[0].id);
    assert.ok(index.linksTo.get(miraRef)?.some((l) => l.from === recapPage.ref));
    assert.deepEqual(loreCards(withMira, recapPage).map((c) => c.node.id), [endId]);
});
