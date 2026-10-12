/// <reference types="node" />

import { test } from "node:test";
import assert from "node:assert/strict";

import {
    BACKUP_FORMAT,
    STORAGE_KEY,
    TEMPLATE_LIBRARY,
    createBackup,
    createBlankSheet,
    dwSkillTarget,
    fileSlug,
    loadStoredSheets,
    mergeImported,
    normalizeSheet,
    parseImport,
    skillModifier,
} from "./rpgSheets";

function storageWith(value: string | null) {
    return { getItem: (key: string) => (key === STORAGE_KEY ? value : null) };
}

test("every template builds a sheet with its own sheet type and extras", () => {
    for (const template of TEMPLATE_LIBRARY) {
        const sheet = createBlankSheet(template.id);
        assert.equal(sheet.templateId, template.id);
        assert.equal(sheet.sheetType, template.sheetType);
    }
    assert.ok(createBlankSheet("shoot-them").shootThem);
    assert.ok(createBlankSheet("deathwatch-real").dwReal);
    assert.ok(createBlankSheet("deathwatch").characteristics);
    assert.equal(createBlankSheet("dnd-5e").skills.Perception, "proficient");
});

test("blank sheets do not share arrays", () => {
    const a = createBlankSheet("dnd-5e");
    const b = createBlankSheet("dnd-5e");
    a.traits.push("Changed");
    assert.notDeepEqual(a.traits, b.traits);
});

test("loading keeps a custom sheet whose fields were all removed", () => {
    const sheet = { ...createBlankSheet("custom"), customFields: [] };
    const [loaded] = loadStoredSheets(storageWith(JSON.stringify([sheet])));
    assert.deepEqual(loaded.customFields, []);
});

test("loading falls back to one D&D sheet on empty or broken storage", () => {
    for (const raw of [null, "", "not json", "{}", "[]", "[1, 2]"]) {
        const sheets = loadStoredSheets(storageWith(raw));
        assert.equal(sheets.length, 1, `for ${raw}`);
        assert.equal(sheets[0].templateId, "dnd-5e");
    }
});

test("normalize fills missing template data on old saves", () => {
    const old = { id: "abc", templateId: "shoot-them", name: "Old", shootThem: { abilities: { Bang: "3" } } } as never;
    const sheet = normalizeSheet(old);
    assert.equal(sheet.id, "abc");
    assert.equal(sheet.shootThem?.abilities.Bang, "3");
    assert.equal(sheet.shootThem?.abilities.Mek, "0");
    assert.equal(sheet.shootThem?.bodyZones.head, "0");
    assert.ok(Array.isArray(sheet.attacks));
});

test("normalize derives template from sheetType for sheets saved before templates", () => {
    assert.equal(normalizeSheet({ sheetType: "dnd" }).templateId, "dnd-5e");
    assert.equal(normalizeSheet({ sheetType: "custom" }).templateId, "custom");
    assert.equal(normalizeSheet({ templateId: "nope" as never, sheetType: "custom" }).templateId, "custom");
});

test("import reads a backup, a bare array and a single legacy sheet", () => {
    const a = createBlankSheet("dnd-5e");
    const b = createBlankSheet("deathwatch-real");

    const backup = createBackup([a, b], new Date("2026-10-12T10:00:00Z"));
    assert.equal(backup.format, BACKUP_FORMAT);
    assert.equal(backup.exportedAt, "2026-10-12T10:00:00.000Z");

    assert.deepEqual(parseImport(JSON.stringify(backup)).map((s) => s.id), [a.id, b.id]);
    assert.deepEqual(parseImport(JSON.stringify([a, b])).map((s) => s.id), [a.id, b.id]);
    assert.deepEqual(parseImport(JSON.stringify(a)).map((s) => s.id), [a.id]);
});

test("import rejects files without sheets", () => {
    assert.throws(() => parseImport("not json"));
    assert.throws(() => parseImport("{}"));
    assert.throws(() => parseImport(JSON.stringify({ format: BACKUP_FORMAT, version: 1, sheets: [] })));
});

test("merge replaces sheets with matching ids and puts new ones first", () => {
    const a = createBlankSheet("dnd-5e");
    const b = createBlankSheet("custom");
    const updatedA = { ...a, name: "Updated" };
    const c = createBlankSheet("shoot-them");

    const merged = mergeImported([a, b], [updatedA, c]);
    assert.deepEqual(merged.map((s) => s.id), [c.id, a.id, b.id]);
    assert.equal(merged[1].name, "Updated");
});

test("file slugs are safe filenames", () => {
    assert.equal(fileSlug("Brother Kaelen / Ultramarines!"), "brother-kaelen-ultramarines");
    assert.equal(fileSlug("  "), "sheet");
});

test("skill and characteristic maths", () => {
    const sheet = createBlankSheet("dnd-5e");
    // WIS 15 → +2, proficient with +2 proficiency → +4
    assert.equal(skillModifier(sheet, { key: "Perception", stat: "WIS" }), 4);
    assert.equal(skillModifier(sheet, { key: "Arcana", stat: "INT" }), 0);
    assert.equal(dwSkillTarget(41, "untrained"), 20);
    assert.equal(dwSkillTarget(41, "plus20"), 61);
});
