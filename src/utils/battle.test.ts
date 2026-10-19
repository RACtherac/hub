/// <reference types="node" />

import { test } from "node:test";
import assert from "node:assert/strict";

import { MAX_DUEL_STATES, fightToTheDeath, scaleProfiles, singleExchange, type BattleSide } from "./battle";
import { DEFAULT_SITUATION, MathhammerInputError, resolveAttacks, type AttackProfile, type Target } from "./mathhammer";

const close = (actual: number, expected: number, message?: string) =>
    assert.ok(Math.abs(actual - expected) < 1e-9, `${message ?? ""} expected ${expected}, got ${actual}`);

const sum = (values: number[]) => values.reduce((total, value) => total + value, 0);

const weapon = (models: number, extra: Partial<AttackProfile> = {}): AttackProfile => ({
    name: "Weapon",
    models,
    attacks: "1",
    skill: "2+",
    strength: "4",
    ap: "0",
    damage: "1",
    keywords: [],
    ...extra,
});

const body = (models: number, wounds: number, extra: Partial<Target> = {}): Target => ({
    toughness: 4,
    save: 7,
    wounds,
    models,
    keywords: [],
    cover: false,
    damageReduction: false,
    ...extra,
});

const side = (name: string, profiles: AttackProfile[], defence: Target): BattleSide => ({
    name,
    profiles,
    defence,
    situation: DEFAULT_SITUATION,
});

// Torrent + S8 vs T4 + no save: each attack is an unsaved wound unless the
// wound roll is an unmodified 1.
const P = 5 / 6;
const sureHit = (models: number, damage = "1"): AttackProfile =>
    weapon(models, { skill: "N/A", strength: "8", damage, keywords: ["TORRENT"] });

test("resolveAttacks continues from a damaged state", () => {
    // One 1-damage hit on a 3-wound model that already has 2 damage kills it.
    const states = resolveAttacks([sureHit(1)], body(1, 3), DEFAULT_SITUATION, 2);
    close(states[3], P);
    close(states[2], 1 - P);
});

test("resolveAttacks counts only living models for Blast", () => {
    const blast = weapon(1, { skill: "N/A", strength: "8", attacks: "1", keywords: ["TORRENT", "BLAST"] });
    // 10 models alive: 1 + 2 attacks. With 5 dead, 5 alive: 1 + 1 attacks.
    const fresh = resolveAttacks([blast], body(10, 1), DEFAULT_SITUATION, 0);
    const damaged = resolveAttacks([blast], body(10, 1), DEFAULT_SITUATION, 5);
    close(fresh[3], P ** 3);
    assert.equal(fresh.length, 11);
    close(damaged[7], P ** 2);
    close(damaged[8] ?? 0, 0);
});

test("scaleProfiles keeps special weapons until they are the last models", () => {
    const scaled = scaleProfiles([weapon(5), weapon(1)], 3);
    assert.deepEqual(scaled.map((p) => p.models), [5, 1].map((m) => Math.min(m, 3)));
});

test("singleExchange attacks both ways at full strength", () => {
    const a = side("A", [sureHit(2)], body(2, 1));
    const b = side("B", [sureHit(1)], body(2, 1));
    const result = singleExchange(a, b);
    close(result.aOnB.wipeChance, P ** 2);
    close(result.bOnA.expectedKills, P);
});

test("fightToTheDeath: duelling single models alternate attempts", () => {
    const a = side("A", [sureHit(1)], body(1, 1));
    const b = side("B", [sureHit(1)], body(1, 1));
    const q = 1 - P;

    // A strikes first each round: A, B, A, B, A, B.
    const result = fightToTheDeath(a, b, { rounds: 3, first: "a" });
    close(result.aWins, P + q ** 2 * P + q ** 4 * P);
    close(result.bWins, q * P + q ** 3 * P + q ** 5 * P);
    close(result.ongoing, q ** 6);

    const reversed = fightToTheDeath(a, b, { rounds: 3, first: "b" });
    close(reversed.bWins, result.aWins);
});

test("fightToTheDeath carries damage between rounds", () => {
    // A deals at most 1 damage per round to a 3-wound model; B has no weapons.
    const a = side("A", [sureHit(1)], body(1, 1));
    const b = side("B", [weapon(0)], body(1, 3));
    const result = fightToTheDeath(a, b, { rounds: 3, first: "a" });

    assert.deepEqual(result.rounds.map((r) => r.aWins), [0, 0, result.aWins]);
    close(result.aWins, P ** 3);
    close(result.bSurvivors[0], P ** 3);
    close(result.bWins, 0);
});

test("fightToTheDeath probabilities add up and only grow over rounds", () => {
    const a = side("A", [weapon(5, { skill: "3+", attacks: "2" })], body(5, 2, { save: 3 }));
    const b = side("B", [weapon(10, { skill: "4+", attacks: "2", strength: "5" })], body(10, 1, { toughness: 5, save: 5 }));
    const result = fightToTheDeath(a, b, { rounds: 5, first: "a" });

    result.rounds.forEach((round, i) => {
        close(round.aWins + round.bWins + round.ongoing, 1, `round ${round.round}`);
        if (i > 0) {
            assert.ok(round.aWins >= result.rounds[i - 1].aWins - 1e-12);
            assert.ok(round.bWins >= result.rounds[i - 1].bWins - 1e-12);
        }
    });
    close(sum(result.aSurvivors), 1);
    close(sum(result.bSurvivors), 1);
});

test("fightToTheDeath refuses units that are too big", () => {
    const big = side("Big", [weapon(1)], body(MAX_DUEL_STATES + 1, 1));
    const small = side("Small", [weapon(1)], body(1, 1));
    assert.throws(() => fightToTheDeath(big, small, { rounds: 1, first: "a" }), MathhammerInputError);
});
