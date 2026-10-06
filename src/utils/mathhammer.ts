// =====================================
// Mathhammer
// =====================================
//
// Exact probabilities for Warhammer 40,000 (10th edition) attack sequences:
// attacks -> hit roll -> wound roll -> saving throw -> damage -> Feel No Pain
// -> models destroyed. Everything is computed as full probability
// distributions (no random simulation), so "chance to kill the whole unit"
// is exact.

// P(value = index)
export type Dist = number[];

export type Reroll = "none" | "ones" | "fails";

export interface AttackProfile {
    name: string;
    models: number;
    attacks: string;
    skill: string;
    strength: string;
    ap: string;
    damage: string;
    keywords: string[];
}

export interface Target {
    toughness: number;
    save: number;
    invuln?: number;
    wounds: number;
    models: number;
    feelNoPain?: number;
    keywords: string[];
    cover: boolean;
    damageReduction: boolean;
}

export interface Situation {
    halfRange: boolean;
    stationary: boolean;
    charged: boolean;
    hitModifier: number;
    woundModifier: number;
    rerollHits: Reroll;
    rerollWounds: Reroll;
    critHitOn: number;
}

export interface ProfileResult {
    name: string;
    expectedAttacks: number;
    expectedHits: number;
    expectedWounds: number;
    expectedUnsaved: number;
    expectedDamage: number;
    hitChance: number;
    woundChance: number;
    failSaveChance: number;
}

export interface MathhammerResult {
    profiles: ProfileResult[];
    expectedDamage: number;
    expectedKills: number;
    // P(exactly k models destroyed), k = 0..target.models
    killDistribution: Dist;
    // P(at least k models destroyed), k = 0..target.models
    killAtLeast: number[];
    wipeChance: number;
}

export class MathhammerInputError extends Error {}

// =====================================
// Distributions
// =====================================

export function pointMass(value: number): Dist {
    const dist = new Array(value + 1).fill(0);
    dist[value] = 1;
    return dist;
}

export function convolve(a: Dist, b: Dist): Dist {
    const result = new Array(a.length + b.length - 1).fill(0);
    a.forEach((pa, i) => {
        if (pa === 0) return;
        b.forEach((pb, j) => {
            result[i + j] += pa * pb;
        });
    });
    return result;
}

function convolvePower(dist: Dist, times: number): Dist {
    let result: Dist = [1];
    for (let i = 0; i < times; i++) result = convolve(result, dist);
    return result;
}

function addInto(target: Dist, source: Dist, weight: number) {
    while (target.length < source.length) target.push(0);
    source.forEach((p, i) => {
        target[i] += p * weight;
    });
}

function binomial(n: number, p: number): Dist {
    return convolvePower([1 - p, p], n);
}

export function expectedValue(dist: Dist): number {
    return dist.reduce((sum, p, value) => sum + p * value, 0);
}

// "3", "D6", "2D6", "D3+3", "D6+1"
export function parseDice(expression: string): Dist | null {
    const text = expression.trim().toUpperCase().replace(/\s+/g, "");

    if (/^\d+$/.test(text)) return pointMass(Number(text));

    const match = text.match(/^(\d*)D(\d+)([+-]\d+)?$/);
    if (!match) return null;

    const count = match[1] === "" ? 1 : Number(match[1]);
    const sides = Number(match[2]);
    const offset = match[3] ? Number(match[3]) : 0;
    if (count < 1 || count > 20 || sides < 2 || sides > 20) return null;

    const die = [0, ...new Array(sides).fill(1 / sides)];
    const rolled = convolvePower(die, count);

    const result: Dist = new Array(Math.max(0, rolled.length + offset)).fill(0);
    rolled.forEach((p, value) => {
        const shifted = Math.max(0, value + offset);
        while (result.length <= shifted) result.push(0);
        result[shifted] += p;
    });
    return result;
}

// =====================================
// Dice rolls
// =====================================

// Chance a D6 roll scores a critical / any success. Unmodified 1s always fail,
// criticals always succeed, and modifiers are capped at +1/-1.
export function rollChances(
    target: number,
    modifier: number,
    critOn: number,
    reroll: Reroll
): { crit: number; success: number } {
    const mod = Math.max(-1, Math.min(1, modifier));

    const faces = [1, 2, 3, 4, 5, 6].map((face) => {
        const crit = face >= critOn;
        const success = face !== 1 && (crit || face + mod >= target);
        return { face, crit, success };
    });

    const base = {
        crit: faces.filter((f) => f.crit).length / 6,
        success: faces.filter((f) => f.success).length / 6,
    };

    let crit = 0;
    let success = 0;
    faces.forEach(({ face, crit: isCrit, success: isSuccess }) => {
        const rerolled = (reroll === "ones" && face === 1) || (reroll === "fails" && !isSuccess);
        if (rerolled) {
            crit += base.crit / 6;
            success += base.success / 6;
        }
        else {
            if (isCrit) crit += 1 / 6;
            if (isSuccess) success += 1 / 6;
        }
    });

    return { crit, success };
}

export function woundTarget(strength: number, toughness: number): number {
    if (strength >= toughness * 2) return 2;
    if (strength > toughness) return 3;
    if (strength === toughness) return 4;
    if (strength * 2 <= toughness) return 6;
    return 5;
}

// Chance that one wound gets through the saving throw.
export function failSaveChance(target: Target, ap: number, ignoresCover: boolean): number {
    let armour = target.save - ap;
    if (target.cover && !ignoresCover && !(target.save <= 3 && ap === 0)) armour -= 1;

    const best = Math.max(2, Math.min(armour, target.invuln ?? 7));
    if (best >= 7) return 1;
    return 1 - (7 - best) / 6;
}

// =====================================
// Weapon keywords
// =====================================

export interface WeaponRules {
    torrent: boolean;
    lethalHits: boolean;
    devastatingWounds: boolean;
    twinLinked: boolean;
    blast: boolean;
    heavy: boolean;
    lance: boolean;
    ignoresCover: boolean;
    sustainedHits: Dist;
    rapidFire: Dist;
    melta: Dist;
    anti: { keyword: string; on: number }[];
}

export function parseKeywords(keywords: string[]): WeaponRules {
    const rules: WeaponRules = {
        torrent: false,
        lethalHits: false,
        devastatingWounds: false,
        twinLinked: false,
        blast: false,
        heavy: false,
        lance: false,
        ignoresCover: false,
        sustainedHits: [1],
        rapidFire: [1],
        melta: [1],
        anti: [],
    };

    keywords.forEach((raw) => {
        const keyword = raw.trim().toUpperCase();

        if (keyword === "TORRENT") rules.torrent = true;
        else if (keyword === "LETHAL HITS") rules.lethalHits = true;
        else if (keyword === "DEVASTATING WOUNDS") rules.devastatingWounds = true;
        else if (keyword === "TWIN-LINKED") rules.twinLinked = true;
        else if (keyword === "BLAST") rules.blast = true;
        else if (keyword === "HEAVY") rules.heavy = true;
        else if (keyword === "LANCE") rules.lance = true;
        else if (keyword === "IGNORES COVER") rules.ignoresCover = true;

        const valued = keyword.match(/^(SUSTAINED HITS|RAPID FIRE|MELTA) (\S+)$/);
        if (valued) {
            const dist = parseDice(valued[2]);
            if (dist) {
                if (valued[1] === "SUSTAINED HITS") rules.sustainedHits = dist;
                if (valued[1] === "RAPID FIRE") rules.rapidFire = dist;
                if (valued[1] === "MELTA") rules.melta = dist;
            }
        }

        const anti = keyword.match(/^ANTI-(.+) (\d)\+$/);
        if (anti) rules.anti.push({ keyword: anti[1], on: Number(anti[2]) });
    });

    return rules;
}

// =====================================
// One attack profile
// =====================================

function parseStat(value: string, field: string, profileName: string): number {
    const number = Number(value.trim().replace(/"$/, ""));
    if (!Number.isFinite(number)) {
        throw new MathhammerInputError(`${profileName}: ${field} "${value}" must be a number.`);
    }
    return number;
}

function parseSkill(value: string, profileName: string): number | null {
    const text = value.trim().toUpperCase();
    if (text === "N/A" || text === "-" || text === "") return null;
    const match = text.match(/^(\d)\+?$/);
    if (!match) throw new MathhammerInputError(`${profileName}: skill "${value}" should look like 3+.`);
    return Number(match[1]);
}

function requireDice(value: string, field: string, profileName: string): Dist {
    const dist = parseDice(value);
    if (!dist) throw new MathhammerInputError(`${profileName}: ${field} "${value}" should look like 3, D6 or 2D6+1.`);
    return dist;
}

interface ProfileOutcome {
    result: ProfileResult;
    // Number of unsaved wounds this profile causes
    unsaved: Dist;
    // Damage per unsaved wound, after damage changes and Feel No Pain
    damage: Dist;
}

function evaluateProfile(profile: AttackProfile, target: Target, situation: Situation): ProfileOutcome {
    const name = profile.name || "Weapon";
    const rules = parseKeywords(profile.keywords);

    const models = Math.max(0, Math.floor(profile.models));
    const skill = parseSkill(profile.skill, name);
    const strength = parseStat(profile.strength, "strength", name);
    const ap = -Math.abs(parseStat(profile.ap, "AP", name));

    // ---- Attacks --------------------------------------------------------
    let attacksPerModel = requireDice(profile.attacks, "attacks", name);
    if (rules.blast) attacksPerModel = convolve(attacksPerModel, pointMass(Math.floor(target.models / 5)));
    if (situation.halfRange) attacksPerModel = convolve(attacksPerModel, rules.rapidFire);
    const attacks = convolvePower(attacksPerModel, models);

    // ---- Hit roll ---------------------------------------------------------
    const autoHit = rules.torrent || skill === null;
    const hitModifier = situation.hitModifier + (rules.heavy && situation.stationary ? 1 : 0);
    const hit = autoHit
        ? { crit: 0, success: 1 }
        : rollChances(skill!, hitModifier, situation.critHitOn, situation.rerollHits);
    const normalHit = hit.success - hit.crit;

    // ---- Wound roll -------------------------------------------------------
    const targetKeywords = target.keywords.map((k) => k.toUpperCase());
    const antiOn = rules.anti
        .filter((anti) => targetKeywords.includes(anti.keyword))
        .reduce((best, anti) => Math.min(best, anti.on), 6);
    const woundModifier = situation.woundModifier + (rules.lance && situation.charged ? 1 : 0);
    const wound = rollChances(
        woundTarget(strength, target.toughness),
        woundModifier,
        antiOn,
        rules.twinLinked ? "fails" : situation.rerollWounds
    );

    // ---- Saving throw ---------------------------------------------------
    const failSave = failSaveChance(target, ap, rules.ignoresCover);

    // Chance that one hit which rolls to wound ends up as an unsaved wound.
    // Critical wounds with Devastating Wounds can't be saved at all.
    const unsavedPerHit =
        wound.crit * (rules.devastatingWounds ? 1 : failSave) +
        (wound.success - wound.crit) * failSave;

    // Unsaved wounds from one attack.
    let perAttack: Dist;
    if (autoHit) {
        perAttack = [1 - unsavedPerHit, unsavedPerHit];
    }
    else {
        perAttack = [];
        addInto(perAttack, [1], 1 - hit.success);
        addInto(perAttack, [1 - unsavedPerHit, unsavedPerHit], normalHit);

        rules.sustainedHits.forEach((pExtra, extraHits) => {
            if (pExtra === 0) return;
            const fromCrit = rules.lethalHits
                // The critical hit wounds automatically; the extra hits roll to wound.
                ? convolve([1 - failSave, failSave], binomial(extraHits, unsavedPerHit))
                : binomial(1 + extraHits, unsavedPerHit);
            addInto(perAttack, fromCrit, hit.crit * pExtra);
        });
    }

    const unsaved: Dist = [];
    let power: Dist = [1];
    attacks.forEach((pAttacks, count) => {
        if (count > 0) power = convolve(power, perAttack);
        if (pAttacks > 0) addInto(unsaved, power, pAttacks);
    });

    // ---- Damage ---------------------------------------------------------
    let damageRoll = requireDice(profile.damage, "damage", name);
    if (situation.halfRange) damageRoll = convolve(damageRoll, rules.melta);

    const damage: Dist = [];
    damageRoll.forEach((p, value) => {
        if (p === 0) return;
        const afterReduction = target.damageReduction ? Math.max(1, value - 1) : value;
        const ignoreChance = target.feelNoPain ? Math.max(0, (7 - target.feelNoPain) / 6) : 0;
        addInto(damage, binomial(afterReduction, 1 - ignoreChance), p);
    });

    // ---- Expected values for the step-by-step table -----------------------
    const expectedAttacks = expectedValue(attacks);
    const expectedExtraHits = expectedValue(rules.sustainedHits);
    const woundChance = wound.success;

    const expectedHits = autoHit
        ? expectedAttacks
        : expectedAttacks * (normalHit + hit.crit * (1 + expectedExtraHits));

    const expectedWounds = autoHit
        ? expectedAttacks * woundChance
        : expectedAttacks * (
            normalHit * woundChance +
            hit.crit * (rules.lethalHits
                ? 1 + expectedExtraHits * woundChance
                : (1 + expectedExtraHits) * woundChance)
        );

    const expectedUnsaved = expectedValue(unsaved);

    return {
        result: {
            name,
            expectedAttacks,
            expectedHits,
            expectedWounds,
            expectedUnsaved,
            expectedDamage: expectedUnsaved * expectedValue(damage),
            hitChance: hit.success,
            woundChance,
            failSaveChance: failSave,
        },
        unsaved,
        damage,
    };
}

// =====================================
// Whole calculation
// =====================================

// State while allocating damage: models destroyed so far and wounds left on
// the model currently taking damage. Excess damage on a model is lost.
function applyDamage(
    states: Dist,
    damage: Dist,
    models: number,
    wounds: number
): Dist {
    const next: Dist = new Array(states.length).fill(0);
    const wipedIndex = models * wounds;

    states.forEach((p, index) => {
        if (p === 0) return;
        if (index === wipedIndex) {
            next[index] += p;
            return;
        }

        const dead = Math.floor(index / wounds);
        const remaining = wounds - (index % wounds);

        damage.forEach((pd, amount) => {
            if (pd === 0) return;
            if (amount === 0) {
                next[index] += p * pd;
            }
            else if (amount >= remaining) {
                const nowDead = dead + 1;
                next[nowDead >= models ? wipedIndex : nowDead * wounds] += p * pd;
            }
            else {
                next[dead * wounds + (wounds - remaining + amount)] += p * pd;
            }
        });
    });

    return next;
}

const NEGLIGIBLE = 1e-12;

export function calculate(
    profiles: AttackProfile[],
    target: Target,
    situation: Situation
): MathhammerResult {
    if (!(target.toughness >= 1)) throw new MathhammerInputError("Target toughness must be at least 1.");
    if (!(target.save >= 2 && target.save <= 7)) throw new MathhammerInputError("Target save must be between 2+ and 7 (no save).");
    if (!(target.wounds >= 1 && target.wounds <= 100)) throw new MathhammerInputError("Target wounds must be between 1 and 100.");
    if (!(target.models >= 1 && target.models <= 100)) throw new MathhammerInputError("Target models must be between 1 and 100.");

    const models = Math.floor(target.models);
    const wounds = Math.floor(target.wounds);
    const outcomes = profiles.map((profile) => evaluateProfile(profile, { ...target, models, wounds }, situation));

    // Damage from each profile is allocated in order, one unsaved wound at a time.
    let states: Dist = new Array(models * wounds + 1).fill(0);
    states[0] = 1;

    outcomes.forEach(({ unsaved, damage }) => {
        const mixed: Dist = new Array(states.length).fill(0);
        let current = states;
        let remainingProbability = 1;

        for (let count = 0; count < unsaved.length; count++) {
            if (count > 0) current = applyDamage(current, damage, models, wounds);
            if (unsaved[count] > 0) {
                addInto(mixed, current, unsaved[count]);
                remainingProbability -= unsaved[count];
            }
            if (remainingProbability < NEGLIGIBLE) break;
        }

        states = mixed;
    });

    const killDistribution: Dist = new Array(models + 1).fill(0);
    states.forEach((p, index) => {
        killDistribution[Math.min(models, Math.floor(index / wounds))] += p;
    });

    const killAtLeast = killDistribution.map((_, k) =>
        killDistribution.slice(k).reduce((sum, p) => sum + p, 0)
    );

    return {
        profiles: outcomes.map((outcome) => outcome.result),
        expectedDamage: outcomes.reduce((sum, outcome) => sum + outcome.result.expectedDamage, 0),
        expectedKills: expectedValue(killDistribution),
        killDistribution,
        killAtLeast,
        wipeChance: killDistribution[models],
    };
}

// =====================================
// Presets
// =====================================

export const DEFAULT_SITUATION: Situation = {
    halfRange: false,
    stationary: false,
    charged: false,
    hitModifier: 0,
    woundModifier: 0,
    rerollHits: "none",
    rerollWounds: "none",
    critHitOn: 6,
};

export const TARGET_KEYWORDS = [
    "INFANTRY",
    "VEHICLE",
    "MONSTER",
    "CHARACTER",
    "PSYKER",
    "FLY",
    "WALKER",
    "TITANIC",
] as const;

export const TARGET_PRESETS: { name: string; target: Target }[] = [
    { name: "Guardsmen (T3 5+ W1 ×10)", target: { toughness: 3, save: 5, wounds: 1, models: 10, keywords: ["INFANTRY"], cover: false, damageReduction: false } },
    { name: "Ork Boyz (T5 5+ W1 ×10)", target: { toughness: 5, save: 5, wounds: 1, models: 10, keywords: ["INFANTRY"], cover: false, damageReduction: false } },
    { name: "Necron Warriors (T4 4+ W1 ×10)", target: { toughness: 4, save: 4, wounds: 1, models: 10, keywords: ["INFANTRY"], cover: false, damageReduction: false } },
    { name: "Intercessors (T4 3+ W2 ×5)", target: { toughness: 4, save: 3, wounds: 2, models: 5, keywords: ["INFANTRY"], cover: false, damageReduction: false } },
    { name: "Plague Marines (T5 3+ W2 ×5, 5+++)", target: { toughness: 5, save: 3, wounds: 2, models: 5, feelNoPain: 5, keywords: ["INFANTRY"], cover: false, damageReduction: false } },
    { name: "Terminators (T5 2+ 4++ W3 ×5)", target: { toughness: 5, save: 2, invuln: 4, wounds: 3, models: 5, keywords: ["INFANTRY"], cover: false, damageReduction: false } },
    { name: "Custodian Guard (T6 2+ 4++ W3 ×4)", target: { toughness: 6, save: 2, invuln: 4, wounds: 3, models: 4, keywords: ["INFANTRY"], cover: false, damageReduction: false } },
    { name: "Rhino (T9 3+ W10)", target: { toughness: 9, save: 3, wounds: 10, models: 1, keywords: ["VEHICLE"], cover: false, damageReduction: false } },
    { name: "Carnifex (T9 2+ W8)", target: { toughness: 9, save: 2, wounds: 8, models: 1, keywords: ["MONSTER"], cover: false, damageReduction: false } },
    { name: "Leman Russ (T11 2+ W13)", target: { toughness: 11, save: 2, wounds: 13, models: 1, keywords: ["VEHICLE"], cover: false, damageReduction: false } },
    { name: "Imperial Knight (T12 3+ 5++ W22)", target: { toughness: 12, save: 3, invuln: 5, wounds: 22, models: 1, keywords: ["VEHICLE", "WALKER", "TITANIC"], cover: false, damageReduction: false } },
];
