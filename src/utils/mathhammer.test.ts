/// <reference types="node" />

import { test } from "node:test";
import assert from "node:assert/strict";

import {
    DEFAULT_SITUATION,
    MathhammerInputError,
    calculate,
    failSaveChance,
    parseDice,
    rollChances,
    woundTarget,
    type AttackProfile,
    type Target,
} from "./mathhammer";

const close = (actual: number, expected: number, message?: string) =>
    assert.ok(Math.abs(actual - expected) < 1e-9, `${message ?? ""} expected ${expected}, got ${actual}`);

const bolter = (models: number, extra: Partial<AttackProfile> = {}): AttackProfile => ({
    name: "Boltgun",
    models,
    attacks: "2",
    skill: "3+",
    strength: "4",
    ap: "0",
    damage: "1",
    keywords: [],
    ...extra,
});

const marines: Target = { toughness: 4, save: 3, wounds: 2, models: 5, keywords: ["INFANTRY"], cover: false, damageReduction: false };
const noSave = (wounds: number, models: number): Target => ({ toughness: 1, save: 7, wounds, models, keywords: [], cover: false, damageReduction: false });

test("parseDice handles flat values and dice expressions", () => {
    assert.deepEqual(parseDice("3"), [0, 0, 0, 1]);
    close(parseDice("D6")!.reduce((s, p, v) => s + p * v, 0), 3.5);
    close(parseDice("2D6")!.reduce((s, p, v) => s + p * v, 0), 7);
    close(parseDice("D3+3")!.reduce((s, p, v) => s + p * v, 0), 5);
    close(parseDice("d6 + 1")!.reduce((s, p, v) => s + p * v, 0), 4.5);
    assert.equal(parseDice("lots"), null);
});

test("wound roll table follows strength vs toughness", () => {
    assert.equal(woundTarget(8, 4), 2);
    assert.equal(woundTarget(5, 4), 3);
    assert.equal(woundTarget(4, 4), 4);
    assert.equal(woundTarget(4, 5), 5);
    assert.equal(woundTarget(4, 8), 6);
});

test("re-rolling 1s and failures", () => {
    close(rollChances(3, 0, 6, "none").success, 4 / 6);
    close(rollChances(3, 0, 6, "ones").success, 4 / 6 + (1 / 6) * (4 / 6));
    close(rollChances(3, 0, 6, "fails").success, 4 / 6 + (2 / 6) * (4 / 6));
    // Unmodified 1s fail and modifiers cap at +1.
    close(rollChances(2, 3, 6, "none").success, 5 / 6);
    // A 6 always hits even when the modified target is out of reach.
    close(rollChances(6, -1, 6, "none").success, 1 / 6);
});

test("cover doesn't help a 3+ save against AP 0, and invulnerable saves cap AP", () => {
    close(failSaveChance({ ...marines, cover: true }, 0, false), 1 / 3);
    close(failSaveChance({ ...marines, save: 4, cover: true }, 0, false), 1 / 3);
    close(failSaveChance({ ...marines, cover: true }, -1, true), 1 / 2);
    close(failSaveChance({ ...marines, invuln: 4 }, -4, false), 1 / 2);
});

test("10 boltguns into Intercessors: the classic sum", () => {
    const result = calculate([bolter(10)], marines, DEFAULT_SITUATION);
    const [profile] = result.profiles;

    close(profile.expectedAttacks, 20);
    close(profile.expectedHits, 40 / 3);
    close(profile.expectedWounds, 20 / 3);
    close(profile.expectedUnsaved, 20 / 9);
    close(result.expectedDamage, 20 / 9);
    close(result.killDistribution.reduce((s, p) => s + p, 0), 1, "kill distribution sums to 1");
});

test("Lethal Hits auto-wound on a critical hit; Sustained Hits adds hits", () => {
    const lethal = calculate([bolter(1, { attacks: "6", keywords: ["LETHAL HITS"] })], marines, DEFAULT_SITUATION);
    close(lethal.profiles[0].expectedWounds, 6 * (3 / 6 * 1 / 2 + 1 / 6));

    const sustained = calculate([bolter(1, { attacks: "6", keywords: ["SUSTAINED HITS 1"] })], marines, DEFAULT_SITUATION);
    close(sustained.profiles[0].expectedHits, 6 * (3 / 6 + (1 / 6) * 2));
});

test("Devastating Wounds can't be saved", () => {
    const target: Target = { ...marines, save: 2, invuln: 4 };
    const plain = calculate([bolter(1, { attacks: "6", strength: "4" })], target, DEFAULT_SITUATION);
    const devastating = calculate([bolter(1, { attacks: "6", strength: "4", keywords: ["DEVASTATING WOUNDS"] })], target, DEFAULT_SITUATION);

    // 4 hits; per hit: crit wound 1/6 (unsaveable) + normal wound 2/6 at 1/6 fail chance.
    close(plain.profiles[0].expectedUnsaved, 4 * (3 / 6) * (1 / 6));
    close(devastating.profiles[0].expectedUnsaved, 4 * (1 / 6 + (2 / 6) * (1 / 6)));
});

test("Anti-X lowers the critical wound roll only against matching targets", () => {
    const anti = bolter(1, { attacks: "6", strength: "1", keywords: ["ANTI-VEHICLE 4+", "DEVASTATING WOUNDS"] });

    const vsVehicle = calculate([anti], { ...marines, toughness: 10, keywords: ["VEHICLE"] }, DEFAULT_SITUATION);
    const vsInfantry = calculate([anti], { ...marines, toughness: 10 }, DEFAULT_SITUATION);

    // Only critical wounds get through S1 vs T10, and with Devastating Wounds they can't be saved.
    close(vsVehicle.profiles[0].expectedUnsaved, 4 * (3 / 6));
    close(vsInfantry.profiles[0].expectedUnsaved, 4 * (1 / 6));
});

test("Torrent always hits, Blast adds attacks, Rapid Fire and Melta need half range", () => {
    const torrent = calculate([bolter(1, { attacks: "3", skill: "N/A", keywords: ["TORRENT"] })], marines, DEFAULT_SITUATION);
    close(torrent.profiles[0].expectedHits, 3);

    const blast = calculate([bolter(1, { attacks: "1", keywords: ["BLAST"] })], { ...marines, models: 11 }, DEFAULT_SITUATION);
    close(blast.profiles[0].expectedAttacks, 3);

    const rapid = bolter(2, { attacks: "1", keywords: ["RAPID FIRE 1"] });
    close(calculate([rapid], marines, DEFAULT_SITUATION).profiles[0].expectedAttacks, 2);
    close(calculate([rapid], marines, { ...DEFAULT_SITUATION, halfRange: true }).profiles[0].expectedAttacks, 4);

    const melta = bolter(1, { attacks: "1", skill: "N/A", strength: "10", damage: "1", keywords: ["MELTA 2"] });
    // Wounds on 2+, then 1 + Melta 2 damage.
    close(calculate([melta], noSave(10, 1), { ...DEFAULT_SITUATION, halfRange: true }).expectedDamage, (5 / 6) * 3);
});

test("excess damage on a model is lost, not carried over", () => {
    // Two 3-damage attacks (each wounds on 2+) into three 2-wound models.
    // Each wound kills exactly one model; if damage carried over, two
    // wounds (6 damage) would kill all three.
    const twoShots = bolter(1, { attacks: "2", skill: "N/A", strength: "10", damage: "3" });
    const result = calculate([twoShots], noSave(2, 3), DEFAULT_SITUATION);
    const wounds = 5 / 6;

    close(result.killDistribution[2], wounds ** 2);
    close(result.killDistribution[1], 2 * wounds * (1 - wounds));
    close(result.wipeChance, 0);
    close(result.expectedDamage, 2 * wounds * 3);
});

test("wipe chance and kill distribution are exact", () => {
    // One torrent attack, S10 vs T1 wounds on 2+: kills the single model 5/6 of the time.
    const shot = bolter(1, { attacks: "1", skill: "N/A", strength: "10" });
    const result = calculate([shot], noSave(1, 1), DEFAULT_SITUATION);

    close(result.wipeChance, 5 / 6);
    close(result.killAtLeast[0], 1);
    close(result.killAtLeast[1], 5 / 6);
});

test("Feel No Pain and -1 damage reduce damage", () => {
    const shot = bolter(1, { attacks: "1", skill: "N/A", strength: "10", damage: "2" });

    close(calculate([shot], { ...noSave(10, 1), feelNoPain: 5 }, DEFAULT_SITUATION).expectedDamage, (5 / 6) * 2 * (4 / 6));
    close(calculate([shot], { ...noSave(10, 1), damageReduction: true }, DEFAULT_SITUATION).expectedDamage, 5 / 6);
});

test("several weapons share one kill calculation", () => {
    const shot = bolter(1, { attacks: "1", skill: "N/A", strength: "10", damage: "1" });
    const result = calculate([shot, shot], noSave(1, 2), DEFAULT_SITUATION);

    close(result.wipeChance, (5 / 6) ** 2);
    close(result.expectedKills, 2 * (5 / 6));
});

test("bad input gives a readable error", () => {
    assert.throws(() => calculate([bolter(1, { attacks: "lots" })], marines, DEFAULT_SITUATION), MathhammerInputError);
    assert.throws(() => calculate([bolter(1, { skill: "three" })], marines, DEFAULT_SITUATION), MathhammerInputError);
    assert.throws(() => calculate([bolter(1)], { ...marines, models: 0 }, DEFAULT_SITUATION), MathhammerInputError);
});
