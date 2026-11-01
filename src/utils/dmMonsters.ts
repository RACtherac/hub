import { createAttack, createMonster, type Monster } from "./dmScreen";

// A few common monsters to start the library with (D&D 5e SRD stats), so the
// Monsters tab isn't empty on day one. Fresh ids every time.
export function starterMonsters(): Monster[] {
    return [
        createMonster({
            name: "Goblin", creatureType: "Small humanoid (goblinoid)", alignment: "Neutral evil", challenge: "1/4",
            ac: "15", hp: 7, hpDice: "2d6", initiativeMod: 2, speed: "30 ft",
            attacks: [
                createAttack("weapon", { name: "Scimitar", hit: "+4", damage: "1d6 + 2 slashing", range: "5 ft" }),
                createAttack("weapon", { name: "Shortbow", hit: "+4", damage: "1d6 + 2 piercing", range: "80/320 ft" }),
            ],
            traits: "Nimble Escape: can Disengage or Hide as a bonus action.",
            loot: "1d6 cp, a rusty knife",
        }),
        createMonster({
            name: "Orc", creatureType: "Medium humanoid (orc)", alignment: "Chaotic evil", challenge: "1/2",
            ac: "13", hp: 15, hpDice: "2d8 + 6", initiativeMod: 1, speed: "30 ft",
            attacks: [
                createAttack("weapon", { name: "Greataxe", hit: "+5", damage: "1d12 + 3 slashing", range: "5 ft" }),
                createAttack("weapon", { name: "Javelin", hit: "+5", damage: "1d6 + 3 piercing", range: "30/120 ft" }),
            ],
            traits: "Aggressive: as a bonus action, moves up to its speed toward a hostile creature it can see.",
            loot: "2d6 sp",
        }),
        createMonster({
            name: "Skeleton", creatureType: "Medium undead", alignment: "Lawful evil", challenge: "1/4",
            ac: "13", hp: 13, hpDice: "2d8 + 4", initiativeMod: 2, speed: "30 ft",
            attacks: [
                createAttack("weapon", { name: "Shortsword", hit: "+4", damage: "1d6 + 2 piercing", range: "5 ft" }),
                createAttack("weapon", { name: "Shortbow", hit: "+4", damage: "1d6 + 2 piercing", range: "80/320 ft" }),
            ],
            traits: "Vulnerable to bludgeoning. Immune to poison and exhaustion.",
            loot: "",
        }),
        createMonster({
            name: "Zombie", creatureType: "Medium undead", alignment: "Neutral evil", challenge: "1/4",
            ac: "8", hp: 22, hpDice: "3d8 + 9", initiativeMod: -2, speed: "20 ft",
            attacks: [createAttack("weapon", { name: "Slam", hit: "+3", damage: "1d6 + 1 bludgeoning", range: "5 ft" })],
            traits: "Undead Fortitude: when dropped to 0 HP (not by radiant damage or a crit), Con save DC 5 + damage taken to drop to 1 HP instead.",
            loot: "",
        }),
        createMonster({
            name: "Wolf", creatureType: "Medium beast", alignment: "Unaligned", challenge: "1/4",
            ac: "13", hp: 11, hpDice: "2d8 + 2", initiativeMod: 2, speed: "40 ft",
            attacks: [createAttack("weapon", { name: "Bite", hit: "+4", damage: "2d4 + 2 piercing, DC 11 Str or knocked prone", range: "5 ft" })],
            traits: "Pack Tactics: advantage when an ally is within 5 ft of the target. Keen hearing and smell.",
            loot: "",
        }),
        createMonster({
            name: "Bandit", creatureType: "Medium humanoid", alignment: "Any non-lawful", challenge: "1/8",
            ac: "12", hp: 11, hpDice: "2d8 + 2", initiativeMod: 1, speed: "30 ft",
            attacks: [
                createAttack("weapon", { name: "Scimitar", hit: "+3", damage: "1d6 + 1 slashing", range: "5 ft" }),
                createAttack("weapon", { name: "Light crossbow", hit: "+3", damage: "1d8 + 1 piercing", range: "80/320 ft" }),
            ],
            traits: "",
            loot: "2d6 sp, a stolen ring",
        }),
    ];
}
