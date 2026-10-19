// =====================================
// Battle odds
// =====================================
//
// Two units attacking each other, built on the Mathhammer engine. Either a
// single exchange at full strength, or a fight to the death over several
// battle rounds where casualties shrink the attacks a unit gets back. Damage
// on a wounded model carries over between rounds, so big models can be worn
// down over several turns. Everything is exact (no random simulation).

import {
    MathhammerInputError,
    calculate,
    resolveAttacks,
    wipedState,
    type AttackProfile,
    type Dist,
    type MathhammerResult,
    type Situation,
    type Target,
} from "./mathhammer";

export interface BattleSide {
    name: string;
    // Weapons the unit uses when it attacks. `models` is how many carry each.
    profiles: AttackProfile[];
    // The unit's own defensive stats; `models` is its starting size.
    defence: Target;
    situation: Situation;
}

export type Fighter = "a" | "b";

export interface ExchangeResult {
    aOnB: MathhammerResult;
    bOnA: MathhammerResult;
}

export interface RoundOdds {
    round: number;
    // Cumulative chances by the end of this round.
    aWins: number;
    bWins: number;
    ongoing: number;
}

export interface DuelResult {
    rounds: RoundOdds[];
    aWins: number;
    bWins: number;
    ongoing: number;
    // P(k models of each unit still alive) at the end of the fight.
    aSurvivors: Dist;
    bSurvivors: Dist;
}

// Larger units would make the to-the-death calculation slow.
export const MAX_DUEL_STATES = 60;

export function aliveModels(defence: Target, state: number): number {
    const wounds = Math.floor(defence.wounds);
    return Math.max(0, Math.floor(defence.models) - Math.floor(state / wounds));
}

// Weapons for a unit that has lost models. Casualties are taken from models
// with the most common weapons first, so a weapon carried by fewer models
// than are still alive keeps all of them (special weapons die last).
export function scaleProfiles(profiles: AttackProfile[], alive: number): AttackProfile[] {
    return profiles.map((profile) => ({ ...profile, models: Math.min(profile.models, alive) }));
}

export function singleExchange(a: BattleSide, b: BattleSide): ExchangeResult {
    return {
        aOnB: calculate(a.profiles, b.defence, a.situation),
        bOnA: calculate(b.profiles, a.defence, b.situation),
    };
}

export function fightToTheDeath(
    a: BattleSide,
    b: BattleSide,
    options: { rounds: number; first: Fighter }
): DuelResult {
    const aWiped = wipedState(a.defence);
    const bWiped = wipedState(b.defence);
    if (aWiped > MAX_DUEL_STATES || bWiped > MAX_DUEL_STATES) {
        throw new MathhammerInputError(
            `Units are too big for a fight to the death (models × wounds must be at most ${MAX_DUEL_STATES} per side).`
        );
    }

    const rounds = Math.max(1, Math.min(20, Math.floor(options.rounds)));
    const width = bWiped + 1;

    // joint[stateA * width + stateB]
    let joint: Dist = new Array((aWiped + 1) * width).fill(0);
    joint[0] = 1;

    // Attacks only depend on how many attackers are alive and the defender's state.
    const cache = new Map<string, Dist>();
    const strike = (attacker: Fighter, attackerAlive: number, defenderState: number): Dist => {
        const key = `${attacker}:${attackerAlive}:${defenderState}`;
        let result = cache.get(key);
        if (!result) {
            const [from, to] = attacker === "a" ? [a, b] : [b, a];
            result = resolveAttacks(scaleProfiles(from.profiles, attackerAlive), to.defence, from.situation, defenderState);
            cache.set(key, result);
        }
        return result;
    };

    const attack = (current: Dist, attacker: Fighter): Dist => {
        const next: Dist = new Array(current.length).fill(0);
        current.forEach((p, index) => {
            if (p === 0) return;
            const stateA = Math.floor(index / width);
            const stateB = index % width;

            // A wiped unit can't attack, and there's nothing left to attack.
            if (stateA === aWiped || stateB === bWiped) {
                next[index] += p;
                return;
            }

            if (attacker === "a") {
                strike("a", aliveModels(a.defence, stateA), stateB).forEach((q, newB) => {
                    if (q > 0) next[stateA * width + newB] += p * q;
                });
            }
            else {
                strike("b", aliveModels(b.defence, stateB), stateA).forEach((q, newA) => {
                    if (q > 0) next[newA * width + stateB] += p * q;
                });
            }
        });
        return next;
    };

    const summarise = (current: Dist, round: number): RoundOdds => {
        let aWins = 0;
        let bWins = 0;
        current.forEach((p, index) => {
            const stateA = Math.floor(index / width);
            const stateB = index % width;
            if (stateB === bWiped && stateA !== aWiped) aWins += p;
            else if (stateA === aWiped) bWins += p;
        });
        return { round, aWins, bWins, ongoing: Math.max(0, 1 - aWins - bWins) };
    };

    const order: Fighter[] = options.first === "a" ? ["a", "b"] : ["b", "a"];
    const history: RoundOdds[] = [];
    for (let round = 1; round <= rounds; round++) {
        order.forEach((attacker) => {
            joint = attack(joint, attacker);
        });
        history.push(summarise(joint, round));
    }

    const aSurvivors: Dist = new Array(Math.floor(a.defence.models) + 1).fill(0);
    const bSurvivors: Dist = new Array(Math.floor(b.defence.models) + 1).fill(0);
    joint.forEach((p, index) => {
        if (p === 0) return;
        aSurvivors[aliveModels(a.defence, Math.floor(index / width))] += p;
        bSurvivors[aliveModels(b.defence, index % width)] += p;
    });

    const last = history[history.length - 1];
    return { rounds: history, aWins: last.aWins, bWins: last.bWins, ongoing: last.ongoing, aSurvivors, bSurvivors };
}
