/// <reference types="node" />

import { test } from "node:test";
import assert from "node:assert/strict";

import * as wg from "../components/WrathGlory/wrathGloryData";
import * as db from "../components/Dragonbane/dragonbaneData";
import * as coc from "../components/CallOfCthulhu/cocData";
import { createBlankSheet, normalizeSheet, parseImport, createBackup } from "./rpgSheets";

test("Wrath & Glory: dice pool is attribute + skill rating", () => {
    const data = wg.createDefaultWrathGlory();
    data.attributes.A = 4;
    data.skills["Ballistic Skill"] = 3;
    assert.equal(wg.skillPool(data, { name: "Ballistic Skill", attribute: "A" }), 7);
    assert.equal(wg.skillPool(data, { name: "Tech", attribute: "Int" }), data.attributes.Int);
});

test("Wrath & Glory: derived traits follow the Revised sheet", () => {
    const data = wg.createDefaultWrathGlory();
    data.attributes = { S: 3, T: 4, A: 3, I: 3, Wil: 3, Int: 2, Fel: 2 };
    data.skills = { Awareness: 3 };
    data.tier = "2";
    data.armourRating = "3";
    const traits = wg.derivedTraits(data);
    assert.equal(traits.defence, 2);
    assert.equal(traits.resilience, 8);
    assert.equal(traits.maxWounds, 8);
    assert.equal(traits.maxShock, 5);
    assert.equal(traits.resolve, 2);
    assert.equal(traits.conviction, 3);
    assert.equal(traits.passiveAwareness, 3); // pool 5 → 3
    assert.equal(traits.influence, 1);
    assert.equal(traits.wealth, 2);
});

test("Dragonbane: base chance table and trained skills", () => {
    assert.deepEqual([3, 5, 6, 8, 9, 12, 13, 15, 16, 18].map(db.baseChance), [3, 3, 4, 4, 5, 5, 6, 6, 7, 7]);

    const data = db.createDefaultDragonbane();
    data.attributes.AGL = 15;
    data.skills = { Evade: { trained: true, mark: false }, Mentalism: { trained: false, mark: false } };
    const skill = (name: string) => db.SKILLS.find((item) => item.name === name)!;
    assert.equal(db.skillLevel(data, skill("Evade")), 12);
    assert.equal(db.skillLevel(data, skill("Sneaking")), 6);
    assert.equal(db.skillLevel(data, skill("Mentalism")), 0, "untrained secondary skills can't be used");

    data.skills.Evade.level = 14;
    assert.equal(db.skillLevel(data, skill("Evade")), 14, "a typed level wins");
});

test("Dragonbane: HP, WP, movement, damage bonus and carry limit", () => {
    const data = db.createDefaultDragonbane();
    data.attributes = { STR: 17, CON: 11, AGL: 6, INT: 10, WIL: 14, CHA: 10 };
    data.kin = "Wolfkin";
    const stats = db.derivedStats(data);
    assert.equal(stats.maxHp, 11);
    assert.equal(stats.maxWp, 14);
    assert.equal(stats.movement, 8); // 12 − 4
    assert.equal(stats.strDamage, "+D6");
    assert.equal(stats.aglDamage, "—");
    assert.equal(stats.carryLimit, 9);
    assert.equal(db.damageBonus(13), "+D4");
    assert.equal(db.damageBonus(16), "+D4");
});

test("Call of Cthulhu: half and fifth values", () => {
    assert.deepEqual(coc.thresholds(65), { full: 65, half: 32, fifth: 13 });
});

test("Call of Cthulhu: HP, MP, sanity and skill bases", () => {
    const data = coc.createDefaultCoc();
    data.characteristics = { STR: 50, CON: 55, SIZ: 65, DEX: 45, APP: 50, INT: 70, POW: 60, EDU: 75 };
    data.skills = { "Cthulhu Mythos": 6 };
    const stats = coc.derivedStats(data);
    assert.equal(stats.maxHp, 12);
    assert.equal(stats.maxMp, 12);
    assert.equal(stats.startingSanity, 60);
    assert.equal(stats.maxSanity, 93);

    const skill = (name: string) => coc.SKILLS.find((item) => item.name === name)!;
    assert.equal(coc.skillValue(data, skill("Dodge")), 22);
    assert.equal(coc.skillValue(data, skill("Language (Own)")), 75);
    assert.equal(coc.skillValue(data, skill("Spot Hidden")), 25);
});

test("Call of Cthulhu: damage bonus and build table", () => {
    const cases: [number, string, number][] = [
        [64, "−2", -2], [65, "−1", -1], [84, "−1", -1], [85, "None", 0], [124, "None", 0],
        [125, "+1D4", 1], [165, "+1D6", 2], [205, "+2D6", 3], [284, "+2D6", 3], [285, "+3D6", 4], [365, "+4D6", 5],
    ];
    for (const [total, damageBonus, build] of cases) {
        assert.deepEqual(coc.damageBonusAndBuild(total, 0), { damageBonus, build }, `STR+SIZ ${total}`);
    }
});

test("Call of Cthulhu: move rate and age penalty", () => {
    const data = coc.createDefaultCoc();
    data.age = "25";
    data.characteristics = { ...data.characteristics, STR: 40, DEX: 40, SIZ: 60 };
    assert.equal(coc.moveRate(data), 7);
    data.characteristics = { ...data.characteristics, STR: 70, DEX: 70 };
    assert.equal(coc.moveRate(data), 9);
    data.characteristics = { ...data.characteristics, DEX: 60 };
    assert.equal(coc.moveRate(data), 8);
    data.age = "45";
    assert.equal(coc.moveRate(data), 7);
    data.age = "88";
    assert.equal(coc.moveRate(data), 3);
});

test("new templates create, survive a JSON round trip and fill gaps in old data", () => {
    for (const templateId of ["wrath-glory", "dragonbane", "call-of-cthulhu"] as const) {
        const sheet = createBlankSheet(templateId);
        const [restored] = parseImport(JSON.stringify(createBackup([sheet])));
        assert.deepEqual(restored, sheet, templateId);
    }

    const partial = normalizeSheet({ templateId: "dragonbane", dragonbane: { attributes: { STR: 16 } } } as never);
    assert.equal(partial.dragonbane?.attributes.STR, 16);
    assert.equal(partial.dragonbane?.attributes.CON, 13);
    assert.equal(partial.dragonbane?.conditions.WIL, false);

    const empty = normalizeSheet({ templateId: "call-of-cthulhu" });
    assert.ok(empty.coc?.weapons.length);
    assert.ok(normalizeSheet({ templateId: "wrath-glory" }).wrathGlory);
});
