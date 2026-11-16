import { test } from "node:test";
import assert from "node:assert/strict";

import { buildBackup, parseBackup, restoreBackup, summarizeBackup, type KeyValueStore } from "./siteBackup";

function memoryStore(initial: Record<string, string> = {}): KeyValueStore & { data: Map<string, string> } {
    const data = new Map(Object.entries(initial));
    return {
        data,
        get length() {
            return data.size;
        },
        key: (i) => [...data.keys()][i] ?? null,
        getItem: (k) => data.get(k) ?? null,
        setItem: (k, v) => void data.set(k, v),
    };
}

test("buildBackup groups keys by project and skips empty values", () => {
    const store = memoryStore({
        "dm-screen-v1": JSON.stringify({ npcs: [{ name: "Bob" }] }),
        "kanban-app-items": "[]",
        "family-tree-line-style": "curved",
        "something-else": "x",
        "pixel-art-data": "",
    });
    const backup = buildBackup(store, new Date("2026-11-09T00:00:00Z"));

    assert.equal(backup.exportedAt, "2026-11-09T00:00:00.000Z");
    assert.deepEqual(backup.items["dm-screen-v1"], { project: "DM Screen", json: { npcs: [{ name: "Bob" }] } });
    assert.deepEqual(backup.items["family-tree-line-style"], { project: "Family Tree", text: "curved" });
    assert.equal(backup.items["something-else"].project, "Other");
    assert.equal(backup.items["pixel-art-data"], undefined);
    assert.deepEqual(summarizeBackup(backup), { "DM Screen": 1, "Kanban Board": 1, "Family Tree": 1, Other: 1 });
});

test("a backup round-trips through a file back to the exact same strings", () => {
    const original = {
        "dm-screen-v1": JSON.stringify({ a: 1, b: [true, null, "é"] }),
        "tools-json-draft": '{ "spaced": 1 }',
        "family-tree-line-style": "straight",
        "rpg-character-sheets": '"just a string"',
    };
    const file = JSON.stringify(buildBackup(memoryStore(original)));

    const target = memoryStore({ "kanban-app-items": "[1]" });
    const written = restoreBackup(parseBackup(file), target);

    assert.equal(written, 4);
    for (const [key, value] of Object.entries(original)) assert.equal(target.data.get(key), value);
    assert.equal(target.data.get("kanban-app-items"), "[1]");
});

test("parseBackup rejects files that aren't hub backups", () => {
    assert.throws(() => parseBackup("not json"), /valid JSON/);
    assert.throws(() => parseBackup(JSON.stringify({ records: [] })), /hub backup/);
    assert.throws(() => parseBackup(JSON.stringify({ app: "oh-hub", version: 99, items: {} })), /newer version/);
    assert.throws(
        () => parseBackup(JSON.stringify({ app: "oh-hub", version: 1, items: { k: { project: "x" } } })),
        /damaged/,
    );
});
