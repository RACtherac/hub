import type { Unit } from "../../src/types/warhammer";

export const chaosSpaceMarinesUnits: Unit[] = [

  {
    id: "chaos-bikers",
    name: "Chaos Bikers",
    faction: "chaos-space-marine",
    category: "mounted",
    modelCountOptions: [3, 6],
    pointsByModelCount: { 3: 70, 6: 130 },
    defaultWargear: [
      { id: "biker-bolt-pistol", name: "Bolt pistol", image: "", profiles: [{ range: '12"', attacks: "1", skill: "3+", strength: "4", ap: "0", damage: "1", keywords: ["PISTOL"] }] },
      { id: "biker-astartes-chainsword", name: "Astartes chainsword", image: "", profiles: [{ range: "Melee", attacks: "4", skill: "3+", strength: "4", ap: "-1", damage: "1" }] },
    ],
    wargear: [
      // Champion ranged options
      { id: "biker-champ-bolt-pistol", name: "Champion: Bolt pistol", image: "", sergeantOnly: true, profiles: [{ range: '12"', attacks: "1", skill: "3+", strength: "4", ap: "0", damage: "1", keywords: ["PISTOL"] }] },
      { id: "biker-champ-plasma-pistol", name: "Champion: Plasma pistol", image: "", sergeantOnly: true, profiles: [
        { profileName: "standard", range: '12"', attacks: "1", skill: "3+", strength: "7", ap: "-2", damage: "1", keywords: ["PISTOL"] },
        { profileName: "supercharge", range: '12"', attacks: "1", skill: "3+", strength: "8", ap: "-3", damage: "2", keywords: ["HAZARDOUS", "PISTOL"] },
      ]},
      // Champion melee options
      { id: "biker-champ-astartes-chainsword", name: "Champion: Astartes chainsword", image: "", sergeantOnly: true, profiles: [{ range: "Melee", attacks: "4", skill: "3+", strength: "4", ap: "-1", damage: "1" }] },
      { id: "biker-champ-accursed-weapon", name: "Champion: Accursed weapon", image: "", sergeantOnly: true, profiles: [{ range: "Melee", attacks: "4", skill: "3+", strength: "5", ap: "-2", damage: "1" }] },
      { id: "biker-champ-power-fist", name: "Champion: Power fist", image: "", sergeantOnly: true, profiles: [{ range: "Melee", attacks: "3", skill: "3+", strength: "8", ap: "-2", damage: "2" }] },
      // Special weapons (note-linked)
      { id: "biker-combi-bolter", name: "Combi-bolter", image: "", profiles: [{ range: '24"', attacks: "2", skill: "3+", strength: "4", ap: "0", damage: "1", keywords: ["RAPID FIRE 2"] }] },
      { id: "biker-combi-weapon", name: "Combi-weapon", image: "", profiles: [{ range: '24"', attacks: "1", skill: "4+", strength: "4", ap: "0", damage: "1", keywords: ["ANTI-INFANTRY 4+", "DEVASTATING WOUNDS", "RAPID FIRE 1"] }] },
      { id: "biker-flamer", name: "Flamer", image: "", profiles: [{ range: '12"', attacks: "D6", skill: "N/A", strength: "4", ap: "0", damage: "1", keywords: ["IGNORES COVER", "TORRENT"] }] },
      { id: "biker-meltagun", name: "Meltagun", image: "", profiles: [{ range: '12"', attacks: "1", skill: "3+", strength: "9", ap: "-4", damage: "D6", keywords: ["MELTA 2"] }] },
      { id: "biker-plasma-gun", name: "Plasma gun", image: "", profiles: [
        { profileName: "standard", range: '24"', attacks: "1", skill: "3+", strength: "7", ap: "-2", damage: "1", keywords: ["RAPID FIRE 1"] },
        { profileName: "supercharge", range: '24"', attacks: "1", skill: "3+", strength: "8", ap: "-3", damage: "2", keywords: ["HAZARDOUS", "RAPID FIRE 1"] },
      ]},
    ],
    wargearGroups: [
      ["biker-champ-bolt-pistol", "biker-champ-plasma-pistol"],
      ["biker-champ-astartes-chainsword", "biker-champ-accursed-weapon", "biker-champ-power-fist"],
    ],
    sergeantOptionGroups: [
      { label: "Champion: Ranged Options", ids: ["biker-champ-bolt-pistol", "biker-champ-plasma-pistol"] },
      { label: "Champion: Melee Options", ids: ["biker-champ-astartes-chainsword", "biker-champ-accursed-weapon", "biker-champ-power-fist"] },
    ],
    notes: [
      {
        id: "biker-combi-bolter-note",
        text: "Up to 2 Chaos Bikers can each replace their bolt pistol with a combi-bolter.",
        textByModelCount: { 6: "Up to 4 Chaos Bikers (2 per 3 models) can each replace their bolt pistol with a combi-bolter." },
        checkbox: true,
        weaponId: "biker-combi-bolter",
        maxCountByModelCount: { 3: 2, 6: 4 },
        noteGroup: "biker-specials",
      },
      {
        id: "biker-combi-weapon-note",
        text: "Up to 2 Chaos Bikers can each replace their bolt pistol with a combi-weapon.",
        textByModelCount: { 6: "Up to 4 Chaos Bikers (2 per 3 models) can each replace their bolt pistol with a combi-weapon." },
        checkbox: true,
        weaponId: "biker-combi-weapon",
        maxCountByModelCount: { 3: 2, 6: 4 },
        noteGroup: "biker-specials",
      },
      {
        id: "biker-flamer-note",
        text: "Up to 2 Chaos Bikers can each replace their bolt pistol with a flamer.",
        textByModelCount: { 6: "Up to 4 Chaos Bikers (2 per 3 models) can each replace their bolt pistol with a flamer." },
        checkbox: true,
        weaponId: "biker-flamer",
        maxCountByModelCount: { 3: 2, 6: 4 },
        noteGroup: "biker-specials",
      },
      {
        id: "biker-meltagun-note",
        text: "Up to 2 Chaos Bikers can each replace their bolt pistol with a meltagun.",
        textByModelCount: { 6: "Up to 4 Chaos Bikers (2 per 3 models) can each replace their bolt pistol with a meltagun." },
        checkbox: true,
        weaponId: "biker-meltagun",
        maxCountByModelCount: { 3: 2, 6: 4 },
        noteGroup: "biker-specials",
      },
      {
        id: "biker-plasma-gun-note",
        text: "Up to 2 Chaos Bikers can each replace their bolt pistol with a plasma gun.",
        textByModelCount: { 6: "Up to 4 Chaos Bikers (2 per 3 models) can each replace their bolt pistol with a plasma gun." },
        checkbox: true,
        weaponId: "biker-plasma-gun",
        maxCountByModelCount: { 3: 2, 6: 4 },
        noteGroup: "biker-specials",
      },
      {
        id: "biker-chaos-icon-note",
        text: "Chaos Icon: Each time the bearer's unit takes a Leadership test for the Dark Pacts ability, you can re-roll that test.",
        checkbox: true,
      },
    ],
    noteGroupLimitsByModelCount: { "biker-specials": { 3: 2, 6: 4 } },
    abilities: [
      {
        name: "Outmanoeuvre",
        description: "Each time a model in this unit makes a melee attack, if this unit made a Charge move this turn, improve the Strength characteristic of that attack by 1.",
      },
    ],
    ledBy: [],
  },

  {
    id: "cultist-mob",
    name: "Cultist Mob",
    faction: "chaos-space-marine",
    category: "battleline",
    image10: "/Warhammerimages/ChaosSpaceMarine/Cultist-10.png",
    image20: "/Warhammerimages/ChaosSpaceMarine/Cultist-20.png",
    points: 50,
    imageCredit: "Painted by Emily Setzer",
    modelCountOptions: [10, 20],
    pointsByModelCount: { 10: 50, 20: 100 },
    defaultWargear: [
      { id: "autopistol", name: "Autopistol", image: "", profiles: [{ range: '12"', attacks: "1", skill: "4+", strength: "3", ap: "0", damage: "1", keywords: ["PISTOL"] }] },
      { id: "brutal-assault-weapon", name: "Brutal assault weapon", image: "", profiles: [{ range: "Melee", attacks: "2", skill: "4+", strength: "3", ap: "0", damage: "1" }] },
    ],
    wargear: [
      { id: "champ-bolt-pistol", name: "Bolt pistol", image: "/Warhammerimages/ChaosSpaceMarine/Cultist pistol.png", sergeantOnly: true, profiles: [{ range: '12"', attacks: "1", skill: "4+", strength: "4", ap: "0", damage: "1", keywords: ["PISTOL"] }] },
    ],
    abilities: [
      {
        name: "For the Dark Gods",
        description: "At the end of your Command phase, if this unit is within range of an objective marker you control, that objective marker remains under your control, even if you have no models within range of it, until your opponent controls it at the start or end of any turn.",
      },
    ],
    ledBy: ["cultist-firebrand","dark-apostle","dark-commune","fabius-bile"],
  },

  {
    id: "cultist-mob-with-firearms",
    name: "Cultist Mob With Firearms",
    faction: "chaos-space-marine",
    category: "battleline",
    points: 50,
    defaultWargear: [
      { id: "autopistol", name: "Autopistol", image: "" },
      { id: "brutal-assault-weapon", name: "Brutal assault weapon", image: "" },
    ],
    wargear: [
      { id: "autogun", name: "Autogun", image: "" },
      { id: "bolt-pistol", name: "Bolt pistol", image: "" },
      { id: "flamer", name: "Flamer", image: "" },
      { id: "grenade-launcher-frag", name: "Grenade launcher – frag", image: "" },
      { id: "grenade-launcher-krak", name: "Grenade launcher – krak", image: "" },
      { id: "heavy-stubber", name: "Heavy stubber", image: "" },
      { id: "close-combat-weapon", name: "Close combat weapon", image: "" },
    ],
    ledBy: [],
  },

  {
    id: "khorne-berzerkers",
    name: "Khorne Berzerkers",
    faction: "chaos-space-marine",
    category: "battleline",
    points: 90,
    defaultWargear: [
      { id: "bolt-pistol", name: "Bolt pistol", image: "" },
      { id: "berzerker-chainblade", name: "Berzerker chainblade", image: "" },
    ],
    wargear: [],
    ledBy: [],
  },

  {
    id: "legionaries",
    name: "Legionaries",
    faction: "chaos-space-marine",
    category: "battleline",
    points: 90,
    modelCountOptions: [5, 10],
    pointsByModelCount: { 5: 90, 10: 170 },
    image5: "/Warhammerimages/ChaosSpaceMarine/legionaries5.png",
    image10: "/Warhammerimages/ChaosSpaceMarine/legionaries10.png",
    imageCredit: "Painted by Emily Setzer",
    defaultWargear: [
      { id: "bolt-pistol", name: "Bolt pistol", image: "", profiles: [{ range: '12"', attacks: "1", skill: "3+", strength: "4", ap: "0", damage: "1", keywords: ["PISTOL"] }] },
      { id: "boltgun", name: "Boltgun", image: "", profiles: [{ range: '24"', attacks: "2", skill: "3+", strength: "4", ap: "0", damage: "1" }] },
      { id: "close-combat-weapon", name: "Close combat weapon", image: "", profiles: [{ range: "Melee", attacks: "3", skill: "3+", strength: "4", ap: "0", damage: "1" }] },
    ],
    wargear: [
      // Champion: replaces boltgun (pick one)
      { id: "champ-boltgun-plasma-pistol", name: "Plasma pistol", image: "", sergeantOnly: true, profiles: [{ profileName: "standard", range: '12"', attacks: "1", skill: "3+", strength: "7", ap: "-2", damage: "1", keywords: ["PISTOL"] }, { profileName: "supercharge", range: '12"', attacks: "1", skill: "3+", strength: "8", ap: "-3", damage: "2", keywords: ["PISTOL", "HAZARDOUS"] }] },
      { id: "champ-boltgun-accursed-weapon", name: "Accursed weapon", image: "", sergeantOnly: true, profiles: [{ range: "Melee", attacks: "4", skill: "3+", strength: "5", ap: "-2", damage: "1" }] },
      { id: "champ-boltgun-astartes-chainsword", name: "Astartes chainsword", image: "", sergeantOnly: true, profiles: [{ range: "Melee", attacks: "4", skill: "3+", strength: "4", ap: "-1", damage: "1" }] },
      { id: "champ-boltgun-heavy-melee-weapon", name: "Heavy melee weapon", image: "", sergeantOnly: true, profiles: [{ range: "Melee", attacks: "3", skill: "3+", strength: "8", ap: "-2", damage: "2" }] },
      // Champion: replaces bolt pistol (pick one)
      { id: "champ-pistol-plasma-pistol", name: "Plasma pistol", image: "", sergeantOnly: true, profiles: [{ profileName: "standard", range: '12"', attacks: "1", skill: "3+", strength: "7", ap: "-2", damage: "1", keywords: ["PISTOL"] }, { profileName: "supercharge", range: '12"', attacks: "1", skill: "3+", strength: "8", ap: "-3", damage: "2", keywords: ["PISTOL", "HAZARDOUS"] }] },
      { id: "champ-pistol-accursed-weapon", name: "Accursed weapon", image: "", sergeantOnly: true, profiles: [{ range: "Melee", attacks: "4", skill: "3+", strength: "5", ap: "-2", damage: "1" }] },
      { id: "champ-pistol-astartes-chainsword", name: "Astartes chainsword", image: "", sergeantOnly: true, profiles: [{ range: "Melee", attacks: "4", skill: "3+", strength: "4", ap: "-1", damage: "1" }] },
      { id: "champ-pistol-heavy-melee-weapon", name: "Heavy melee weapon", image: "", sergeantOnly: true, profiles: [{ range: "Melee", attacks: "3", skill: "3+", strength: "8", ap: "-2", damage: "2" }] },
      // Any number: boltgun → Astartes chainsword
      { id: "astartes-chainsword-count", name: "Astartes chainsword", image: "", countable: true, maxCountByModelCount: { 5: 4, 10: 9 }, profiles: [{ range: "Melee", attacks: "4", skill: "3+", strength: "4", ap: "-1", damage: "1" }] },
      // Special weapon slot (per 5 models) and one-off swaps
      { id: "chaos-icon", name: "Chaos icon", image: "" },
      { id: "balefire-tome", name: "Balefire tome", image: "", profiles: [{ range: '18"', attacks: "2", skill: "3+", strength: "5", ap: "-1", damage: "1", keywords: ["PSYCHIC"] }] },
      { id: "flamer", name: "Flamer", image: "", profiles: [{ range: '12"', attacks: "D6", skill: "N/A", strength: "4", ap: "0", damage: "1", keywords: ["IGNORES COVER", "TORRENT"] }] },
      { id: "havoc-autocannon", name: "Havoc autocannon", image: "", profiles: [{ range: '48"', attacks: "2", skill: "4+", strength: "9", ap: "-1", damage: "3" }] },
      { id: "heavy-bolter", name: "Heavy bolter", image: "", profiles: [{ range: '36"', attacks: "3", skill: "4+", strength: "5", ap: "-1", damage: "2", keywords: ["HEAVY", "SUSTAINED HITS 1"] }] },
      { id: "meltagun", name: "Meltagun", image: "", profiles: [{ range: '12"', attacks: "1", skill: "3+", strength: "9", ap: "-4", damage: "D6", keywords: ["MELTA 2"] }] },
      { id: "lascannon", name: "Lascannon", image: "", profiles: [{ range: '48"', attacks: "1", skill: "4+", strength: "12", ap: "-3", damage: "D6+1", keywords: ["HEAVY"] }] },
      { id: "missile-launcher", name: "Missile launcher", image: "", profiles: [{ profileName: "frag", range: '48"', attacks: "D6", skill: "4+", strength: "4", ap: "0", damage: "1", keywords: ["BLAST", "HEAVY"] }, { profileName: "krak", range: '48"', attacks: "1", skill: "4+", strength: "9", ap: "-2", damage: "D6", keywords: ["HEAVY"] }] },
      { id: "plasma-gun", name: "Plasma gun", image: "", profiles: [{ profileName: "standard", range: '24"', attacks: "1", skill: "3+", strength: "7", ap: "-2", damage: "1", keywords: ["RAPID FIRE 1"] }, { profileName: "supercharge", range: '24"', attacks: "1", skill: "3+", strength: "8", ap: "-3", damage: "2", keywords: ["HAZARDOUS", "RAPID FIRE 1"] }] },
      { id: "reaper-chaincannon", name: "Reaper chaincannon", image: "", profiles: [{ range: '24"', attacks: "8", skill: "4+", strength: "5", ap: "0", damage: "1", keywords: ["HEAVY"] }] },
      { id: "plasma-pistol-and-chainsword", name: "Plasma pistol + Astartes chainsword", image: "", profiles: [{ profileName: "Plasma pistol – standard", range: '12"', attacks: "1", skill: "3+", strength: "7", ap: "-2", damage: "1", keywords: ["PISTOL"] }, { profileName: "Plasma pistol – supercharge", range: '12"', attacks: "1", skill: "3+", strength: "8", ap: "-3", damage: "2", keywords: ["PISTOL", "HAZARDOUS"] }, { profileName: "Astartes chainsword", range: "Melee", attacks: "4", skill: "3+", strength: "4", ap: "-1", damage: "1" }] },
      { id: "accursed-weapon", name: "Accursed weapon", image: "", profiles: [{ range: "Melee", attacks: "4", skill: "3+", strength: "5", ap: "-2", damage: "1" }] },
      { id: "heavy-melee-weapon", name: "Heavy melee weapon", image: "", profiles: [{ range: "Melee", attacks: "3", skill: "3+", strength: "8", ap: "-2", damage: "2" }] },
    ],
    wargearGroups: [
      ["champ-boltgun-plasma-pistol", "champ-boltgun-accursed-weapon", "champ-boltgun-astartes-chainsword", "champ-boltgun-heavy-melee-weapon"],
      ["champ-pistol-plasma-pistol", "champ-pistol-accursed-weapon", "champ-pistol-astartes-chainsword", "champ-pistol-heavy-melee-weapon"],
      ["champ-boltgun-plasma-pistol", "champ-pistol-plasma-pistol"],
    ],
    sergeantOptionGroups: [
      { label: "Option 1 – replaces boltgun", ids: ["champ-boltgun-plasma-pistol", "champ-boltgun-accursed-weapon", "champ-boltgun-astartes-chainsword", "champ-boltgun-heavy-melee-weapon"] },
      { label: "Option 2 – replaces bolt pistol", ids: ["champ-pistol-plasma-pistol", "champ-pistol-accursed-weapon", "champ-pistol-astartes-chainsword", "champ-pistol-heavy-melee-weapon"] },
    ],
    abilities: [
      {
        name: "Veterans of the Long War",
        description: "Each time a model in this unit targets an enemy unit with a melee attack, re-roll a Wound roll of 1. If that enemy unit is within range of an objective marker, you can re-roll the Wound roll instead.",
      },
      {
        name: "Chaos Icon",
        description: "WARGEAR ABILITY: Each time the bearer's unit takes a Leadership test for the Dark Pacts ability, you can re-roll that test.",
      },
    ],
    notes: [
      { id: "chaos-icon", text: "" },
      { id: "heavy-melee-swap", text: "" },
      { id: "balefire-tome-swap", text: "" },
      {
        id: "special-weapon",
        text: "1 Legionary's boltgun can be replaced with one of the following (duplicates are not allowed):",
        textByModelCount: { 10: "2 Legionaries' boltguns can each be replaced with one of the following (duplicates are not allowed):" },
        checkbox: true,
        image: "/Warhammerimages/ChaosSpaceMarines/special-weapon.png",
        weaponIds: ["plasma-pistol-and-chainsword", "flamer", "havoc-autocannon", "heavy-bolter", "lascannon", "meltagun", "missile-launcher", "plasma-gun", "reaper-chaincannon"],
      },
    ],
    ledBy: ["chaos-lord","dark-apostle","fabius-bile","huron-blackheart","master-of-executions","master-of-possession","sorcerer","warpsmith","lucius-the-eternal"],
  },

  {
    id: "accursed-cultists",
    name: "Accursed Cultists",
    faction: "chaos-space-marine",
    category: "infantry",
    modelCountOptions: [8, 16],
    pointsByModelCount: { 8: 90, 16: 195 },
    defaultWargear: [
      { id: "accursed-cultists-blasphemous-appendages", name: "Blasphemous appendages", image: "", profiles: [{ range: "Melee", attacks: "2", skill: "4+", strength: "4", ap: "0", damage: "1" }] },
      { id: "accursed-cultists-hideous-mutations", name: "Hideous mutations", image: "", profiles: [{ range: "Melee", attacks: "D6+2", skill: "4+", strength: "5", ap: "-1", damage: "2" }] },
    ],
    wargear: [],
    abilities: [
      {
        name: "Accursed Horde",
        description: "Each time an enemy unit has shot, if one or more models from this unit were destroyed as a result of those attacks, this unit can make a Horde move. To do so, roll one D6: this unit can be moved a number of inches up to the result, but this unit must finish that move as close as possible to the closest enemy unit (excluding AIRCRAFT). When doing so, those models can be moved within Engagement Range of that enemy unit. A unit cannot make a Horde move while it is Battle-shocked.",
      },
    ],
    ledBy: ["cultist-firebrand","dark-apostle","dark-commune","fabius-bile"],
  },

  {
    id: "chaos-spawn",
    name: "Chaos Spawn",
    faction: "chaos-space-marine",
    category: "infantry",
    modelCountOptions: [2],
    pointsByModelCount: { 2: 70 },
    defaultWargear: [
      { id: "hideous-mutations", name: "Hideous mutations", image: "", profiles: [{ range: "Melee", attacks: "D6+2", skill: "4+", strength: "5", ap: "-1", damage: "2" }] },
    ],
    wargear: [],
    abilities: [
      {
        name: "Mind-breaking Mutations (Aura)",
        description: "While an enemy unit (excluding VEHICLE units) is within 3\" of this unit, subtract 1 from the Objective Control characteristic of models in that enemy unit.",
      },
    ],
    ledBy: [],
  },

  {
    id: "chaos-terminator-squad",
    name: "Chaos Terminator Squad",
    faction: "chaos-space-marine",
    category: "infantry",
    modelCountOptions: [5, 10],
    pointsByModelCount: { 5: 180, 10: 360 },
    defaultWargear: [
      { id: "chaos-term-combi-bolter", name: "Combi-bolter", image: "", profiles: [{ range: '24"', attacks: "2", skill: "3+", strength: "4", ap: "0", damage: "1", keywords: ["RAPID FIRE 2"] }] },
      { id: "chaos-term-accursed-weapon", name: "Accursed weapon", image: "", profiles: [{ range: "Melee", attacks: "4", skill: "3+", strength: "5", ap: "-2", damage: "1" }] },
    ],
    wargear: [
      { id: "chaos-term-heavy-flamer", name: "Heavy flamer", image: "", countable: true, maxCountByModelCount: { 5: 1, 10: 2 }, profiles: [{ range: '12"', attacks: "D6", skill: "N/A", strength: "5", ap: "-1", damage: "1", keywords: ["IGNORES COVER", "TORRENT"] }] },
      { id: "chaos-term-reaper-autocannon", name: "Reaper autocannon", image: "", countable: true, maxCountByModelCount: { 5: 1, 10: 2 }, profiles: [{ range: '36"', attacks: "4", skill: "3+", strength: "7", ap: "-1", damage: "1", keywords: ["DEVASTATING WOUNDS", "SUSTAINED HITS 1"] }] },
      { id: "chaos-term-combi-weapon", name: "Combi-weapon", image: "", countable: true, maxCountByModelCount: { 5: 5, 10: 10 }, profiles: [{ range: '24"', attacks: "1", skill: "4+", strength: "4", ap: "0", damage: "1", keywords: ["ANTI-INFANTRY 4+", "DEVASTATING WOUNDS", "RAPID FIRE 1"] }] },
      { id: "chaos-term-paired-accursed-weapons", name: "Paired accursed weapons", image: "", countable: true, maxCountByModelCount: { 5: 1, 10: 2 }, profiles: [{ range: "Melee", attacks: "5", skill: "3+", strength: "5", ap: "-2", damage: "1", keywords: ["TWIN-LINKED"] }] },
      { id: "chaos-term-power-fist", name: "Power fist", image: "", countable: true, maxCountByModelCount: { 5: 3, 10: 6 }, profiles: [{ range: "Melee", attacks: "3", skill: "3+", strength: "8", ap: "-2", damage: "2" }] },
      { id: "chaos-term-chainfist", name: "Chainfist", image: "", countable: true, maxCountByModelCount: { 5: 1, 10: 2 }, profiles: [{ range: "Melee", attacks: "3", skill: "4+", strength: "8", ap: "-2", damage: "2", keywords: ["ANTI-VEHICLE 3+"] }] },
    ],
    notes: [
      {
        id: "chaos-term-special-ranged",
        text: "For every 5 models, 1 Terminator's combi-bolter can be replaced with one of the following:",
        checkbox: true,
        image: "",
        weaponIds: ["chaos-term-heavy-flamer", "chaos-term-reaper-autocannon"],
      },
      {
        id: "chaos-term-combi-weapon-swap",
        text: "Any number of models can each have their combi-bolter replaced with 1 combi-weapon:",
        checkbox: true,
        image: "",
        triggersWargear: ["chaos-term-combi-weapon"],
      },
      {
        id: "chaos-term-paired-swap",
        text: "For every 5 models, 1 model's combi-bolter and accursed weapon can be replaced with 1 paired accursed weapons:",
        checkbox: true,
        image: "",
        triggersWargear: ["chaos-term-paired-accursed-weapons"],
      },
      {
        id: "chaos-term-power-fist-swap",
        text: "For every 5 models, up to 3 models can each have their accursed weapon replaced with 1 power fist:",
        checkbox: true,
        image: "",
        triggersWargear: ["chaos-term-power-fist"],
      },
      {
        id: "chaos-term-chainfist-swap",
        text: "For every 5 models, 1 model's accursed weapon can be replaced with 1 chainfist:",
        checkbox: true,
        image: "",
        triggersWargear: ["chaos-term-chainfist"],
      },
    ],
    abilities: [
      {
        name: "Despoilers",
        description: "Each time this unit makes a Dark Pact, until the end of the phase, each time a model in this unit makes an attack, you can re-roll the Hit roll.",
      },
    ],
    ledBy: ["abaddon-the-despoiler","chaos-lord-in-terminator-armour","sorcerer-in-terminator-armour"],
  },

  {
    id: "chosen",
    name: "Chosen",
    faction: "chaos-space-marine",
    category: "infantry",
    modelCountOptions: [5, 10],
    pointsByModelCount: { 5: 125, 10: 250 },
    defaultWargear: [
      { id: "chosen-bolt-pistol", name: "Bolt pistol", image: "", profiles: [{ range: '12"', attacks: "1", skill: "3+", strength: "4", ap: "0", damage: "1", keywords: ["PISTOL"] }] },
      { id: "chosen-boltgun", name: "Boltgun", image: "", profiles: [{ range: '24"', attacks: "2", skill: "3+", strength: "4", ap: "0", damage: "1" }] },
      { id: "chosen-accursed-weapon", name: "Accursed weapon", image: "", profiles: [{ range: "Melee", attacks: "4", skill: "3+", strength: "5", ap: "-2", damage: "1" }] },
    ],
    wargear: [
      { id: "chosen-plasma-pistol", name: "► Plasma pistol", image: "", countable: true, maxCountByModelCount: { 5: 2, 10: 4 }, profiles: [{ profileName: "standard", range: '12"', attacks: "1", skill: "3+", strength: "7", ap: "-2", damage: "1", keywords: ["PISTOL"] }, { profileName: "supercharge", range: '12"', attacks: "1", skill: "3+", strength: "8", ap: "-3", damage: "2", keywords: ["HAZARDOUS", "PISTOL"] }] },
      { id: "chosen-combi-weapon", name: "Combi-weapon", image: "", countable: true, maxCountByModelCount: { 5: 2, 10: 4 }, profiles: [{ range: '24"', attacks: "1", skill: "4+", strength: "4", ap: "0", damage: "1", keywords: ["ANTI-INFANTRY 4+", "DEVASTATING WOUNDS", "RAPID FIRE 1"] }] },
      { id: "chosen-paired-accursed-weapons", name: "Paired accursed weapons", image: "", countable: true, maxCountByModelCount: { 5: 1, 10: 2 }, profiles: [{ range: "Melee", attacks: "5", skill: "3+", strength: "5", ap: "-2", damage: "1", keywords: ["TWIN-LINKED"] }] },
      { id: "chosen-power-fist", name: "Power fist", image: "", countable: true, maxCountByModelCount: { 5: 1, 10: 2 }, profiles: [{ range: "Melee", attacks: "4", skill: "3+", strength: "8", ap: "-2", damage: "2" }] },
      { id: "chosen-chaos-icon", name: "Chaos Icon", image: "", note: "Chaos Icon: Each time the bearer's unit takes a Leadership test for the Dark Pacts ability, you can re-roll that test." },
    ],
    notes: [
      {
        id: "chosen-plasma-pistol-note",
        text: "For every 5 models, up to 2 models can each have their bolt pistol replaced with 1 plasma pistol:",
        checkbox: true,
        image: "",
        triggersWargear: ["chosen-plasma-pistol"],
      },
      {
        id: "chosen-combi-weapon-note",
        text: "For every 5 models, up to 2 models can each have their boltgun replaced with 1 combi-weapon:",
        checkbox: true,
        image: "",
        triggersWargear: ["chosen-combi-weapon"],
      },
      {
        id: "chosen-paired-note",
        text: "For every 5 models, 1 model's boltgun and accursed weapon can be replaced with 1 paired accursed weapons:",
        checkbox: true,
        image: "",
        triggersWargear: ["chosen-paired-accursed-weapons"],
      },
      {
        id: "chosen-power-fist-note",
        text: "For every 5 models, 1 model equipped with a boltgun can have its accursed weapon replaced with 1 power fist. That model's boltgun cannot be replaced:",
        checkbox: true,
        image: "",
        triggersWargear: ["chosen-power-fist"],
      },
    ],
    abilities: [
      {
        name: "Chosen Marauders",
        description: "This unit is eligible to shoot and declare a charge in a turn in which it Advanced or Fell Back.",
      },
    ],
    ledBy: ["abaddon-the-despoiler","chaos-lord","dark-apostle","fabius-bile","huron-blackheart","master-of-executions","master-of-possession","sorcerer","warpsmith"],
  },


  {
    id: "fellgor-beastmen",
    name: "Fellgor Beastmen",
    faction: "chaos-space-marine",
    category: "infantry",
    points: 85,
    defaultWargear: [
      { id: "bolt-pistol", name: "Bolt pistol", image: "" },
      { id: "chainsword", name: "Chainsword", image: "" },
    ],
    wargear: [
      { id: "corrupted-stave", name: "Corrupted stave", image: "" },
      { id: "close-combat-weapon", name: "Close combat weapon", image: "" },
      { id: "great-weapon", name: "Great weapon", image: "" },
    ],
    ledBy: [],
  },

  {
    id: "gellerpox-infected",
    name: "Gellerpox Infected",
    faction: "chaos-space-marine",
    category: "infantry",
    points: 125,
    defaultWargear: [
      { id: "brutal-weapons", name: "Brutal weapons", image: "" },
    ],
    wargear: [
      { id: "belly-flamer", name: "Belly-flamer", image: "" },
      { id: "hideous-mutations", name: "Hideous mutations", image: "" },
    ],
    ledBy: [],
  },

  {
    id: "havocs",
    name: "Havocs",
    faction: "chaos-space-marine",
    category: "infantry",
    modelCountOptions: [5],
    points: 125,
    defaultWargear: [
      { id: "havocs-boltgun", name: "Boltgun", image: "", profiles: [{ range: '24"', attacks: "2", skill: "3+", strength: "4", ap: "0", damage: "1" }] },
      { id: "havocs-close-combat-weapon", name: "Close combat weapon", image: "", profiles: [{ range: "Melee", attacks: "3", skill: "3+", strength: "4", ap: "0", damage: "1" }] },
    ],
    wargear: [
      // Heavy weapons (note-linked, combined max 4)
      { id: "havoc-autocannon", name: "Havoc autocannon", image: "", profiles: [{ range: '48"', attacks: "2", skill: "3+", strength: "9", ap: "-1", damage: "3" }] },
      { id: "havoc-heavy-bolter", name: "Havoc heavy bolter", image: "", profiles: [{ range: '36"', attacks: "3", skill: "3+", strength: "5", ap: "-1", damage: "2", keywords: ["SUSTAINED HITS 1"] }] },
      { id: "havoc-lascannon", name: "Havoc lascannon", image: "", profiles: [{ range: '48"', attacks: "1", skill: "3+", strength: "12", ap: "-3", damage: "D6+1" }] },
      { id: "havoc-missile-launcher", name: "Havoc missile launcher", image: "", profiles: [
        { profileName: "frag", range: '48"', attacks: "D6", skill: "3+", strength: "4", ap: "0", damage: "1", keywords: ["BLAST"] },
        { profileName: "krak", range: '48"', attacks: "1", skill: "3+", strength: "9", ap: "-2", damage: "D6" },
      ]},
      { id: "havoc-reaper-chaincannon", name: "Havoc reaper chaincannon", image: "", profiles: [{ range: '24"', attacks: "8", skill: "3+", strength: "5", ap: "0", damage: "1" }] },
      // Champion melee options
      { id: "havoc-champ-astartes-chainsword", name: "Champion: Astartes chainsword", image: "", sergeantOnly: true, profiles: [{ range: "Melee", attacks: "5", skill: "3+", strength: "4", ap: "-1", damage: "1" }] },
      { id: "havoc-champ-accursed-weapon", name: "Champion: Accursed weapon", image: "", sergeantOnly: true, profiles: [{ range: "Melee", attacks: "4", skill: "3+", strength: "5", ap: "-2", damage: "1" }] },
      { id: "havoc-champ-power-fist", name: "Champion: Power fist", image: "", sergeantOnly: true, profiles: [{ range: "Melee", attacks: "3", skill: "3+", strength: "8", ap: "-2", damage: "2" }] },
      // Champion ranged options
      { id: "havoc-champ-flamer", name: "Champion: Flamer", image: "", sergeantOnly: true, profiles: [{ range: '12"', attacks: "D6", skill: "N/A", strength: "4", ap: "0", damage: "1", keywords: ["IGNORES COVER", "TORRENT"] }] },
      { id: "havoc-champ-boltgun", name: "Champion: Boltgun", image: "", sergeantOnly: true, profiles: [{ range: '24"', attacks: "2", skill: "3+", strength: "4", ap: "0", damage: "1" }] },
      { id: "havoc-champ-meltagun", name: "Champion: Meltagun", image: "", sergeantOnly: true, profiles: [{ range: '12"', attacks: "1", skill: "3+", strength: "9", ap: "-4", damage: "D6", keywords: ["MELTA 2"] }] },
      { id: "havoc-champ-plasma-gun", name: "Champion: Plasma gun", image: "", sergeantOnly: true, profiles: [
        { profileName: "standard", range: '24"', attacks: "1", skill: "3+", strength: "7", ap: "-2", damage: "1", keywords: ["RAPID FIRE 1"] },
        { profileName: "supercharge", range: '24"', attacks: "1", skill: "3+", strength: "8", ap: "-3", damage: "2", keywords: ["HAZARDOUS", "RAPID FIRE 1"] },
      ]},
      { id: "havoc-champ-plasma-pistol", name: "Champion: Plasma pistol", image: "", sergeantOnly: true, profiles: [
        { profileName: "standard", range: '12"', attacks: "1", skill: "3+", strength: "7", ap: "-2", damage: "1", keywords: ["PISTOL"] },
        { profileName: "supercharge", range: '12"', attacks: "1", skill: "3+", strength: "8", ap: "-3", damage: "2", keywords: ["PISTOL", "HAZARDOUS"] },
      ]},
      { id: "havoc-champ-ranged-accursed-weapon", name: "Champion: Accursed weapon", image: "", sergeantOnly: true, profiles: [{ range: "Melee", attacks: "4", skill: "3+", strength: "5", ap: "-2", damage: "1" }] },
      { id: "havoc-champ-ranged-power-fist", name: "Champion: Power fist", image: "", sergeantOnly: true, profiles: [{ range: "Melee", attacks: "3", skill: "3+", strength: "8", ap: "-2", damage: "2" }] },
    ],
    wargearGroups: [
      ["havoc-champ-astartes-chainsword", "havoc-champ-accursed-weapon", "havoc-champ-power-fist"],
      ["havoc-champ-flamer", "havoc-champ-boltgun", "havoc-champ-meltagun", "havoc-champ-plasma-gun", "havoc-champ-plasma-pistol", "havoc-champ-ranged-accursed-weapon", "havoc-champ-ranged-power-fist"],
    ],
    notes: [
      { id: "havoc-autocannon-note", text: "Up to 4 Havocs can each replace their boltgun with a Havoc autocannon.", checkbox: true, weaponId: "havoc-autocannon", maxCountByModelCount: { 5: 4 }, noteGroup: "havoc-weapons" },
      { id: "havoc-heavy-bolter-note", text: "Up to 4 Havocs can each replace their boltgun with a Havoc heavy bolter.", checkbox: true, weaponId: "havoc-heavy-bolter", maxCountByModelCount: { 5: 4 }, noteGroup: "havoc-weapons" },
      { id: "havoc-lascannon-note", text: "Up to 4 Havocs can each replace their boltgun with a Havoc lascannon.", checkbox: true, weaponId: "havoc-lascannon", maxCountByModelCount: { 5: 4 }, noteGroup: "havoc-weapons" },
      { id: "havoc-missile-launcher-note", text: "Up to 4 Havocs can each replace their boltgun with a Havoc missile launcher.", checkbox: true, weaponId: "havoc-missile-launcher", maxCountByModelCount: { 5: 4 }, noteGroup: "havoc-weapons" },
      { id: "havoc-reaper-chaincannon-note", text: "Up to 4 Havocs can each replace their boltgun with a Havoc reaper chaincannon.", checkbox: true, weaponId: "havoc-reaper-chaincannon", maxCountByModelCount: { 5: 4 }, noteGroup: "havoc-weapons" },
    ],
    noteGroupLimitsByModelCount: { "havoc-weapons": { 5: 4 } },
    abilities: [
      {
        name: "Stabilisation Talons",
        description: "Each time a model in this unit makes an attack with a ranged weapon, you can ignore any or all modifiers to the Hit roll and any or all modifiers to the Ballistic Skill characteristic of that weapon.",
      },
    ],
    ledBy: ["warpsmith"],
  },

  {
    id: "mutilators",
    name: "Mutilators",
    faction: "chaos-space-marine",
    category: "infantry",
    modelCountOptions: [3],
    pointsByModelCount: { 3: 200 },
    defaultWargear: [
      { id: "mutilators-fleshmetal-weapons", name: "Fleshmetal weapons", image: "", profiles: [
        { profileName: "clawed sweeps", range: "Melee", attacks: "6", skill: "3+", strength: "6", ap: "-2", damage: "1" },
        { profileName: "rending strikes", range: "Melee", attacks: "4", skill: "3+", strength: "9", ap: "-3", damage: "3" },
        { profileName: "thunderous blows", range: "Melee", attacks: "2", skill: "3+", strength: "12", ap: "-4", damage: "D6+2" },
      ]},
    ],
    wargear: [],
    abilities: [
      {
        name: "Crushing Charge",
        description: "You can re-roll charge rolls made for this unit, and each time this unit makes a Charge move, select one enemy unit and roll one D6 for each model in this unit that is within Engagement Range of that unit: for each 4+, that enemy unit suffers D3 mortal wounds.",
      },
    ],
    ledBy: ["kravek-morne"],
  },

  {
    id: "mutoid-vermin",
    name: "Mutoid Vermin",
    faction: "chaos-space-marine",
    category: "infantry",
    points: 85,
    defaultWargear: [
      { id: "diseased-claws-and-fangs", name: "Diseased claws and fangs", image: "" },
    ],
    wargear: [],
    ledBy: [],
  },

  {
    id: "negavolt-cultists",
    name: "Negavolt Cultists",
    faction: "chaos-space-marine",
    category: "infantry",
    points: 55,
    defaultWargear: [
      { id: "electro-goads", name: "Electro-goads", image: "" },
    ],
    wargear: [],
    ledBy: [],
  },

  {
    id: "nemesis-claw",
    name: "Nemesis Claw",
    faction: "chaos-space-marine",
    category: "infantry",
    points: 110,
    defaultWargear: [
      { id: "bolt-pistol", name: "Bolt pistol", image: "" },
      { id: "nostraman-chainblade", name: "Nostraman chainblade", image: "" },
    ],
    wargear: [
      { id: "flamer", name: "Flamer", image: "" },
      { id: "heavy-bolter", name: "Heavy bolter", image: "" },
      { id: "meltagun", name: "Meltagun", image: "" },
      { id: "missile-launcher-frag", name: "Missile launcher – frag", image: "" },
      { id: "missile-launcher-krak", name: "Missile launcher – krak", image: "" },
      { id: "plasma-gun-standard", name: "Plasma gun – standard", image: "" },
      { id: "plasma-gun-supercharge", name: "Plasma gun – supercharge", image: "" },
      { id: "accursed-weapon", name: "Accursed weapon", image: "" },
      { id: "astartes-chainsword", name: "Astartes chainsword", image: "" },
      { id: "nostraman-chainglaive", name: "Nostraman chainglaive", image: "" },
      { id: "paired-accursed-weapons", name: "Paired accursed weapons", image: "" },
      { id: "power-fist", name: "Power fist", image: "" },
    ],
    ledBy: ["chaos-lord","dark-apostle","master-of-executions","master-of-possession","sorcerer","warpsmith"],
  },

  {
    id: "noctilith-crown",
    name: "Noctilith Crown",
    faction: "chaos-space-marine",
    category: "infantry",
    points: 125,
    defaultWargear: [
      { id: "lashing-warp-energies", name: "Lashing warp energies", image: "" },
    ],
    wargear: [],
    ledBy: [],
  },

  {
    id: "noise-marines",
    name: "Noise Marines",
    faction: "chaos-space-marine",
    category: "infantry",
    points: 85,
    defaultWargear: [
      { id: "bolt-pistol", name: "Bolt pistol", image: "" },
      { id: "boltgun", name: "Boltgun", image: "" },
      { id: "close-combat-weapon", name: "Close combat weapon", image: "" },
    ],
    wargear: [
      { id: "plasma-pistol", name: "Plasma pistol", image: "", profiles: [{ profileName: "standard", range: '12"', attacks: "1", skill: "3+", strength: "7", ap: "-2", damage: "1", keywords: ["PISTOL"] }, { profileName: "supercharge", range: '12"', attacks: "1", skill: "3+", strength: "8", ap: "-3", damage: "2", keywords: ["PISTOL", "HAZARDOUS"] }] },
      { id: "sonic-blaster", name: "Sonic blaster", image: "" },
      { id: "accursed-weapon", name: "Accursed weapon", image: "" },
      { id: "astartes-chainsword", name: "Astartes chainsword", image: "" },
      { id: "power-fist", name: "Power fist", image: "" },
    ],
    ledBy: [],
  },

  {
    id: "obliterators",
    name: "Obliterators",
    faction: "chaos-space-marine",
    category: "infantry",
    modelCountOptions: [2],
    points: 160,
    abilities: [
      {
        name: "Warp Rift Firepower",
        description: "Once per battle, during the shooting phase, this unit can use this ability. If it does, until the end of the phase, ranged weapons equipped by models in this unit have the [INDIRECT FIRE] ability.",
      },
    ],
    defaultWargear: [
      { id: "fleshmetal-guns-focused-malice", name: "Fleshmetal guns – focused malice", image: "", profiles: [
        { range: '18"', attacks: "D3", skill: "3+", strength: "12", ap: "-3", damage: "4", keywords: ["MELTA 2"] },
      ]},
      { id: "fleshmetal-guns-ruinous-salvo", name: "Fleshmetal guns – ruinous salvo", image: "", profiles: [
        { range: '24"', attacks: "D6", skill: "3+", strength: "8", ap: "-2", damage: "2", keywords: ["BLAST"] },
      ]},
      { id: "fleshmetal-guns-warp-hail", name: "Fleshmetal guns – warp hail", image: "", profiles: [
        { range: '24"', attacks: "D6+3", skill: "3+", strength: "5", ap: "-1", damage: "1", keywords: ["SUSTAINED HITS 1"] },
      ]},
      { id: "crushing-fists", name: "Crushing fists", image: "", profiles: [
        { range: "Melee", attacks: "4", skill: "3+", strength: "9", ap: "-2", damage: "2" },
      ]},
    ],
    wargear: [],
    ledBy: [],
  },

  {
    id: "possessed",
    name: "Possessed",
    faction: "chaos-space-marine",
    category: "infantry",
    modelCountOptions: [5, 10],
    pointsByModelCount: { 5: 120, 10: 240 },
    defaultWargear: [
      { id: "possessed-hideous-mutations", name: "Hideous mutations", image: "", profiles: [{ range: "Melee", attacks: "4", skill: "3+", strength: "5", ap: "-1", damage: "2" }] },
      { id: "possessed-chaos-icon", name: "Chaos Icon", image: "", note: "Chaos Icon: Each time the bearer's unit takes a Leadership test for the Dark Pacts ability, you can re-roll that test." },
    ],
    wargear: [],
    notes: [
      {
        id: "possessed-chaos-icon-note",
        text: "1 model can be equipped with a Chaos Icon:",
        checkbox: true,
        image: "",
        triggersWargear: ["possessed-chaos-icon"],
      },
    ],
    abilities: [
      {
        name: "Unholy Bloodshed",
        description: "Once per battle, when this unit makes a Dark Pact, until the end of the phase, weapons equipped by models in this unit have the [DEVASTATING WOUNDS] ability.",
      },
    ],
    ledBy: [],
  },

  {
    id: "raptors",
    name: "Raptors",
    faction: "chaos-space-marine",
    category: "infantry",
    modelCountOptions: [5, 10],
    pointsByModelCount: { 5: 110, 10: 210 },
    defaultWargear: [
      { id: "raptor-bolt-pistol", name: "Bolt pistol", image: "", profiles: [{ range: '12"', attacks: "1", skill: "3+", strength: "4", ap: "0", damage: "1", keywords: ["PISTOL"] }] },
      { id: "raptor-astartes-chainsword", name: "Astartes chainsword", image: "", profiles: [{ range: "Melee", attacks: "4", skill: "3+", strength: "4", ap: "-1", damage: "1" }] },
    ],
    wargear: [
      // Champion options
      { id: "raptor-champ-plasma-pistol", name: "Champion: Plasma pistol", image: "", sergeantOnly: true, profiles: [
        { profileName: "standard", range: '12"', attacks: "1", skill: "3+", strength: "7", ap: "-2", damage: "1", keywords: ["PISTOL"] },
        { profileName: "supercharge", range: '12"', attacks: "1", skill: "3+", strength: "8", ap: "-3", damage: "2", keywords: ["HAZARDOUS", "PISTOL"] },
      ]},
      { id: "raptor-champ-accursed-weapon", name: "Champion: Accursed weapon", image: "", sergeantOnly: true, profiles: [{ range: "Melee", attacks: "4", skill: "3+", strength: "5", ap: "-2", damage: "1" }] },
      { id: "raptor-champ-heavy-melee-weapon", name: "Champion: Heavy melee weapon", image: "", sergeantOnly: true, profiles: [{ range: "Melee", attacks: "3", skill: "3+", strength: "8", ap: "-2", damage: "2" }] },
      // Note-linked weapons (hidden from WargearSelector, shown via notes)
      { id: "raptor-squad-plasma-pistol", name: "Plasma pistol", image: "", profiles: [
        { profileName: "standard", range: '12"', attacks: "1", skill: "3+", strength: "7", ap: "-2", damage: "1", keywords: ["PISTOL"] },
        { profileName: "supercharge", range: '12"', attacks: "1", skill: "3+", strength: "8", ap: "-3", damage: "2", keywords: ["HAZARDOUS", "PISTOL"] },
      ]},
      { id: "raptor-squad-heavy-melee-weapon", name: "Heavy melee weapon", image: "", profiles: [{ range: "Melee", attacks: "3", skill: "3+", strength: "8", ap: "-2", damage: "2" }] },
      { id: "raptor-squad-mutations", name: "Mutations", image: "", profiles: [{ range: "Melee", attacks: "4", skill: "3+", strength: "5", ap: "-2", damage: "1" }] },
      { id: "raptor-squad-flamer", name: "Flamer", image: "", profiles: [{ range: '12"', attacks: "D6", skill: "N/A", strength: "4", ap: "0", damage: "1", keywords: ["IGNORES COVER", "TORRENT"] }] },
      { id: "raptor-squad-meltagun", name: "Meltagun", image: "", profiles: [{ range: '12"', attacks: "1", skill: "3+", strength: "9", ap: "-4", damage: "D6", keywords: ["MELTA 2"] }] },
      { id: "raptor-squad-plasma-gun", name: "Plasma gun", image: "", profiles: [
        { profileName: "standard", range: '24"', attacks: "1", skill: "3+", strength: "7", ap: "-2", damage: "1", keywords: ["RAPID FIRE 1"] },
        { profileName: "supercharge", range: '24"', attacks: "1", skill: "3+", strength: "8", ap: "-3", damage: "2", keywords: ["HAZARDOUS", "RAPID FIRE 1"] },
      ]},
      // Countable — taken alongside a special weapon (flamer / meltagun / plasma gun)
      { id: "raptor-squad-close-combat-weapon", name: "Close combat weapon", image: "", countable: true, maxCountByModelCount: { 5: 2, 10: 4 }, profiles: [{ range: "Melee", attacks: "3", skill: "3+", strength: "4", ap: "0", damage: "1" }] },
    ],
    wargearGroups: [
      ["raptor-champ-accursed-weapon", "raptor-champ-heavy-melee-weapon"],
    ],
    notes: [
      {
        id: "raptor-plasma-pistol-note",
        text: "Up to 2 Raptors can each replace their bolt pistol with 1 plasma pistol. These models' Astartes chainswords cannot be replaced.",
        textByModelCount: { 10: "Up to 4 Raptors can each replace their bolt pistol with 1 plasma pistol (up to 2 per 5 models). These models' Astartes chainswords cannot be replaced." },
        checkbox: true,
        weaponId: "raptor-squad-plasma-pistol",
        maxCountByModelCount: { 5: 2, 10: 4 },
      },
      {
        id: "raptor-heavy-melee-note",
        text: "Up to 2 Raptors can each replace their Astartes chainsword with 1 heavy melee weapon.",
        textByModelCount: { 10: "Up to 4 Raptors can each replace their Astartes chainsword with 1 heavy melee weapon (up to 2 per 5 models)." },
        checkbox: true,
        weaponId: "raptor-squad-heavy-melee-weapon",
        maxCountByModelCount: { 5: 2, 10: 4 },
      },
      {
        id: "raptor-mutations-note",
        text: "1 Raptor can replace their Astartes chainsword with 1 mutations.",
        textByModelCount: { 10: "Up to 2 Raptors can each replace their Astartes chainsword with 1 mutations (1 per 5 models)." },
        checkbox: true,
        weaponId: "raptor-squad-mutations",
        maxCountByModelCount: { 5: 1, 10: 2 },
      },
      {
        id: "raptor-flamer-note",
        text: "1 Raptor can replace their Astartes chainsword with 1 flamer and 1 close combat weapon (cannot select the same option more than once; max 2 combined).",
        textByModelCount: { 10: "Up to 2 Raptors per group of 5 can replace their Astartes chainsword with 1 flamer and 1 close combat weapon (cannot select the same option more than once per group; max 4 combined)." },
        checkbox: true,
        weaponId: "raptor-squad-flamer",
        maxCountByModelCount: { 5: 1, 10: 2 },
        noteGroup: "raptor-specials",
      },
      {
        id: "raptor-meltagun-note",
        text: "1 Raptor can replace their Astartes chainsword with 1 meltagun and 1 close combat weapon (cannot select the same option more than once; max 2 combined).",
        textByModelCount: { 10: "Up to 2 Raptors per group of 5 can replace their Astartes chainsword with 1 meltagun and 1 close combat weapon (cannot select the same option more than once per group; max 4 combined)." },
        checkbox: true,
        weaponId: "raptor-squad-meltagun",
        maxCountByModelCount: { 5: 1, 10: 2 },
        noteGroup: "raptor-specials",
      },
      {
        id: "raptor-plasma-gun-note",
        text: "1 Raptor can replace their Astartes chainsword with 1 plasma gun and 1 close combat weapon (cannot select the same option more than once; max 2 combined).",
        textByModelCount: { 10: "Up to 2 Raptors per group of 5 can replace their Astartes chainsword with 1 plasma gun and 1 close combat weapon (cannot select the same option more than once per group; max 4 combined)." },
        checkbox: true,
        weaponId: "raptor-squad-plasma-gun",
        maxCountByModelCount: { 5: 1, 10: 2 },
        noteGroup: "raptor-specials",
      },
    ],
    noteGroupLimitsByModelCount: { "raptor-specials": { 5: 2, 10: 4 } },
    abilities: [
      {
        name: "Fearsome (Aura)",
        description: "While an enemy unit is within 6\" of this unit, each time that enemy unit takes a Battle-shock or Leadership test, subtract 1 from the result.",
      },
      {
        name: "Terrifying Assault",
        description: "At the start of the Fight phase, each enemy unit within Engagement Range of one or more units with this ability must take a Battle-shock test.",
      },
    ],
    ledBy: ["chaos-lord-with-jump-pack", "haarken-worldclaimer"],
  },

  {
    id: "renegade-heavy-weapons-squad",
    name: "Renegade Heavy Weapons Squad",
    faction: "chaos-space-marine",
    category: "infantry",
    points: 75,
    defaultWargear: [
      { id: "heavy-stubber", name: "Heavy stubber", image: "" },
      { id: "renegade-firearm", name: "Renegade firearm", image: "" },
      { id: "close-combat-weapons", name: "Close combat weapons", image: "" },
    ],
    wargear: [
      { id: "autocannon", name: "Autocannon", image: "" },
      { id: "heavy-bolter", name: "Heavy bolter", image: "" },
      { id: "lascannon", name: "Lascannon", image: "" },
      { id: "missile-launcher-frag", name: "Missile launcher – frag", image: "" },
      { id: "missile-launcher-krak", name: "Missile launcher – krak", image: "" },
      { id: "mortar", name: "Mortar", image: "" },
    ],
    ledBy: [],
  },

  {
    id: "renegade-ogryn-beast-handler",
    name: "Renegade Ogryn Beast Handler",
    faction: "chaos-space-marine",
    category: "infantry",
    points: 40,
    defaultWargear: [
      { id: "mauler-goad-and-ripper-claw", name: "Mauler goad and ripper claw", image: "" },
    ],
    wargear: [
      { id: "befouled-claws-and-fangs", name: "Befouled claws and fangs", image: "" },
    ],
    ledBy: [],
  },

  {
    id: "renegade-ogryn-brutes",
    name: "Renegade Ogryn Brutes",
    faction: "chaos-space-marine",
    category: "infantry",
    points: 95,
    defaultWargear: [
      { id: "ogryn-weapon", name: "Ogryn weapon", image: "" },
    ],
    wargear: [
      { id: "ogryn-power-drill", name: "Ogryn power drill", image: "" },
    ],
    ledBy: [],
  },

  {
    id: "renegade-plague-ogryns",
    name: "Renegade Plague Ogryns",
    faction: "chaos-space-marine",
    category: "infantry",
    points: 95,
    defaultWargear: [
      { id: "ogryn-plague-claws", name: "Ogryn plague claws", image: "" },
    ],
    wargear: [],
    ledBy: [],
  },

  {
    id: "rubric-marines",
    name: "Rubric Marines",
    faction: "chaos-space-marine",
    category: "infantry",
    points: 110,
    defaultWargear: [
      { id: "inferno-bolt-pistol", name: "Inferno bolt pistol", image: "" },
      { id: "warpsmite", name: "Warpsmite", image: "" },
      { id: "force-weapon", name: "Force weapon", image: "" },
    ],
    wargear: [
      { id: "inferno-boltgun", name: "Inferno boltgun", image: "" },
      { id: "plasma-pistol", name: "Plasma pistol", image: "", profiles: [{ profileName: "standard", range: '12"', attacks: "1", skill: "3+", strength: "7", ap: "-2", damage: "1", keywords: ["PISTOL"] }, { profileName: "supercharge", range: '12"', attacks: "1", skill: "3+", strength: "8", ap: "-3", damage: "2", keywords: ["PISTOL", "HAZARDOUS"] }] },
      { id: "soulreaper-cannon", name: "Soulreaper cannon", image: "" },
      { id: "warpflame-pistol", name: "Warpflame pistol", image: "" },
    ],
    ledBy: [],
  },

  {
    id: "traitor-enforcer",
    name: "Traitor Enforcer",
    faction: "chaos-space-marine",
    category: "infantry",
    points: 65,
    defaultWargear: [
      { id: "bolt-pistol", name: "Bolt pistol", image: "" },
      { id: "power-fist", name: "Power fist", image: "" },
    ],
    wargear: [
      { id: "ogryn-weapons", name: "Ogryn weapons", image: "" },
    ],
    ledBy: [],
  },

  {
    id: "traitor-guardsmen-squad",
    name: "Traitor Guardsmen Squad",
    faction: "chaos-space-marine",
    category: "infantry",
    points: 70,
    defaultWargear: [
      { id: "corrupted-pistol", name: "Corrupted pistol", image: "" },
      { id: "close-combat-weapon", name: "Close combat weapon", image: "" },
    ],
    wargear: [
      { id: "cultist-grenade-launcher-frag", name: "Cultist grenade launcher – frag", image: "" },
      { id: "cultist-grenade-launcher-krak", name: "Cultist grenade launcher – krak", image: "" },
      { id: "cultist-sniper-rifle", name: "Cultist sniper rifle", image: "" },
      { id: "flamer", name: "Flamer", image: "" },
      { id: "meltagun", name: "Meltagun", image: "" },
      { id: "plasma-gun-standard", name: "Plasma gun – standard", image: "" },
      { id: "plasma-gun-supercharge", name: "Plasma gun – supercharge", image: "" },
      { id: "chainsword", name: "Chainsword", image: "" },
      { id: "power-weapon", name: "Power weapon", image: "" },
    ],
    ledBy: ["traitor-enforcer"],
  },

  {
    id: "warp-talons",
    name: "Warp Talons",
    faction: "chaos-space-marine",
    category: "infantry",
    points: 125,
    defaultWargear: [
      { id: "warp-claws", name: "Warp claws", image: "" },
    ],
    wargear: [],
    ledBy: [],
  },

  {
    id: "blood-slaughterer",
    name: "Blood Slaughterer",
    faction: "chaos-space-marine",
    category: "vehicle",
    points: 160,
    defaultWargear: [
      { id: "impaler-harpoon", name: "Impaler harpoon", image: "" },
      { id: "slaughter-blade", name: "Slaughter blade", image: "" },
      { id: "twin-slaughter-blade", name: "Twin slaughter blade", image: "" },
    ],
    wargear: [],
    ledBy: [],
  },

  {
    id: "cerberus",
    name: "Cerberus",
    faction: "chaos-space-marine",
    category: "vehicle",
    points: 285,
    defaultWargear: [
      { id: "cerberus-neutron-pulse-array", name: "Cerberus neutron pulse array", image: "" },
      { id: "armoured-tracks", name: "Armoured tracks", image: "" },
    ],
    wargear: [
      { id: "heavy-bolter", name: "Heavy bolter", image: "" },
      { id: "heavy-flamer", name: "Heavy flamer", image: "" },
      { id: "lascannon", name: "Lascannon", image: "" },
      { id: "multi-melta", name: "Multi-melta", image: "" },
      { id: "storm-bolter", name: "Storm bolter", image: "" },
    ],
    ledBy: [],
  },

  {
    id: "chaos-deimos-predator",
    name: "Chaos Deimos Predator",
    faction: "chaos-space-marine",
    category: "vehicle",
    points: 115,
    defaultWargear: [
      { id: "plasma-destroyer-standard", name: "Plasma destroyer – standard", image: "" },
      { id: "plasma-destroyer-supercharge", name: "Plasma destroyer – supercharge", image: "" },
      { id: "armoured-tracks", name: "Armoured tracks", image: "" },
    ],
    wargear: [
      { id: "conversion-beam-cannon", name: "Conversion beam cannon", image: "" },
      { id: "heavy-bolter", name: "Heavy bolter", image: "" },
      { id: "heavy-flamer", name: "Heavy flamer", image: "" },
      { id: "infernus-cannon", name: "Infernus cannon", image: "" },
      { id: "lascannon", name: "Lascannon", image: "" },
      { id: "magna-melta-cannon", name: "Magna-melta cannon", image: "" },
    ],
    ledBy: [],
  },

  {
    id: "chaos-predator-annihilator",
    name: "Chaos Predator Annihilator",
    faction: "chaos-space-marine",
    category: "vehicle",
    points: 135,
    defaultWargear: [
      { id: "cpa-predator-twin-lascannon", name: "Predator twin lascannon", image: "", profiles: [{ range: '48"', attacks: "1", skill: "3+", strength: "14", ap: "-3", damage: "D6+1", keywords: ["TWIN-LINKED"] }] },
      { id: "cpa-armoured-tracks", name: "Armoured tracks", image: "", profiles: [{ range: "Melee", attacks: "3", skill: "4+", strength: "6", ap: "0", damage: "1" }] },
    ],
    wargear: [
      { id: "cpa-heavy-bolter", name: "Heavy bolter", image: "", wargearGroup: "cpa-sponson-slot", profiles: [{ range: '36"', attacks: "3", skill: "3+", strength: "5", ap: "-1", damage: "2", keywords: ["SUSTAINED HITS 1"] }] },
      { id: "cpa-lascannon", name: "Lascannon", image: "", wargearGroup: "cpa-sponson-slot", profiles: [{ range: '48"', attacks: "1", skill: "3+", strength: "12", ap: "-3", damage: "D6+1" }] },
      { id: "cpa-combi-bolter", name: "Combi-bolter", image: "", wargearGroup: "cpa-hull-slot", profiles: [{ range: '24"', attacks: "2", skill: "3+", strength: "4", ap: "0", damage: "1", keywords: ["RAPID FIRE 2"] }] },
      { id: "cpa-combi-weapon", name: "Combi-weapon", image: "", wargearGroup: "cpa-hull-slot", profiles: [{ range: '24"', attacks: "1", skill: "4+", strength: "4", ap: "0", damage: "1", keywords: ["ANTI-INFANTRY 4+", "DEVASTATING WOUNDS", "RAPID FIRE 1"] }] },
      { id: "cpa-havoc-launcher", name: "Havoc launcher", image: "", profiles: [{ range: '48"', attacks: "D6", skill: "3+", strength: "5", ap: "0", damage: "1", keywords: ["BLAST"] }] },
    ],
    abilities: [
      {
        name: "Annihilator",
        description: "Each time a ranged attack made by this model is allocated to a MONSTER or VEHICLE model, you can re-roll the Damage roll.",
      },
      {
        name: "Damaged: 1-4 Wounds Remaining",
        description: "While this model has 1-4 wounds remaining, each time this model makes an attack, subtract 1 from the Hit roll.",
      },
    ],
    ledBy: [],
  },

  {
    id: "chaos-predator-destructor",
    name: "Chaos Predator Destructor",
    faction: "chaos-space-marine",
    category: "vehicle",
    points: 140,
    defaultWargear: [
      { id: "cpd-predator-autocannon", name: "Predator autocannon", image: "" },
      { id: "cpd-armoured-tracks", name: "Armoured tracks", image: "", profiles: [{ range: "Melee", attacks: "3", skill: "4+", strength: "6", ap: "0", damage: "1" }] },
    ],
    wargear: [
      { id: "cpd-heavy-bolter", name: "Heavy bolter", image: "", wargearGroup: "cpd-sponson-slot", profiles: [{ range: '36"', attacks: "3", skill: "3+", strength: "5", ap: "-1", damage: "2", keywords: ["SUSTAINED HITS 1"] }] },
      { id: "cpd-lascannon", name: "Lascannon", image: "", wargearGroup: "cpd-sponson-slot", profiles: [{ range: '48"', attacks: "1", skill: "3+", strength: "12", ap: "-3", damage: "D6+1" }] },
      { id: "cpd-combi-bolter", name: "Combi-bolter", image: "", wargearGroup: "cpd-hull-slot", profiles: [{ range: '24"', attacks: "2", skill: "3+", strength: "4", ap: "0", damage: "1", keywords: ["RAPID FIRE 2"] }] },
      { id: "cpd-combi-weapon", name: "Combi-weapon", image: "", wargearGroup: "cpd-hull-slot", profiles: [{ range: '24"', attacks: "1", skill: "4+", strength: "4", ap: "0", damage: "1", keywords: ["ANTI-INFANTRY 4+", "DEVASTATING WOUNDS", "RAPID FIRE 1"] }] },
      { id: "cpd-havoc-launcher", name: "Havoc launcher", image: "", profiles: [{ range: '48"', attacks: "D6", skill: "3+", strength: "5", ap: "0", damage: "1", keywords: ["BLAST"] }] },
    ],
    abilities: [
      {
        name: "Destructor",
        description: "Each time a ranged attack made by this model targets an enemy INFANTRY unit, improve the Armour Penetration characteristic of that attack by 1.",
      },
      {
        name: "Damaged: 1-4 Wounds Remaining",
        description: "While this model has 1-4 wounds remaining, each time this model makes an attack, subtract 1 from the Hit roll.",
      },
    ],
    ledBy: [],
  },

  {
    id: "csm-defiler",
    name: "Defiler",
    faction: "chaos-space-marine",
    category: "vehicle",
    points: 250,
    defaultWargear: [
      { id: "csm-defiler-shearing-claws", name: "Shearing claws", image: "", profiles: [
        { profileName: "strike", range: "Melee", attacks: "5", skill: "3+", strength: "16", ap: "-3", damage: "D6+1", keywords: ["LETHAL HITS"] },
        { profileName: "sweep", range: "Melee", attacks: "10", skill: "3+", strength: "6", ap: "-2", damage: "1", keywords: ["LETHAL HITS"] },
      ]},
    ],
    wargear: [
      { id: "csm-defiler-hades-bc", name: "Hades battle cannon", image: "", profiles: [{ range: '48"', attacks: "D6+3", skill: "3+", strength: "10", ap: "-1", damage: "3", keywords: ["BLAST", "LETHAL HITS"] }] },
      { id: "csm-defiler-ecto-destructor", name: "Ectoplasma destructor", image: "", profiles: [{ range: '36"', attacks: "D6", skill: "3+", strength: "12", ap: "-3", damage: "3", keywords: ["BLAST", "LETHAL HITS"] }] },
      { id: "csm-defiler-excruciator", name: "Excruciator cannon", image: "", profiles: [{ range: '36"', attacks: "6", skill: "3+", strength: "6", ap: "-1", damage: "2", keywords: ["LETHAL HITS"] }] },
      { id: "csm-defiler-magma-cutters", name: "Magma cutters", image: "", profiles: [{ range: '12"', attacks: "2", skill: "3+", strength: "9", ap: "-4", damage: "D6", keywords: ["LETHAL HITS", "MELTA 2"] }] },
      { id: "csm-defiler-baleflamer", name: "Heavy baleflamer", image: "", profiles: [{ range: '12"', attacks: "D6+3", skill: "N/A", strength: "7", ap: "-2", damage: "2", keywords: ["IGNORES COVER", "TORRENT"] }] },
      { id: "csm-defiler-lascannon-a", name: "Hades lascannon", image: "", profiles: [{ range: '48"', attacks: "2", skill: "3+", strength: "12", ap: "-3", damage: "D6+1", keywords: ["LETHAL HITS"] }] },
      { id: "csm-defiler-reaper-a", name: "Heavy reaper autocannon", image: "", profiles: [{ range: '48"', attacks: "4", skill: "3+", strength: "9", ap: "-1", damage: "3", keywords: ["DEVASTATING WOUNDS", "LETHAL HITS", "SUSTAINED HITS 1"] }] },
      { id: "csm-defiler-electroscourge-a", name: "Electroscourge", image: "", profiles: [{ range: "Melee", attacks: "5", skill: "3+", strength: "12", ap: "-2", damage: "2", keywords: ["EXTRA ATTACKS", "SUSTAINED HITS 2"] }] },
      { id: "csm-defiler-missile-launcher", name: "Heavy missile launcher", image: "", profiles: [
        { profileName: "krak", range: '48"', attacks: "2", skill: "3+", strength: "10", ap: "-2", damage: "D6+1", keywords: ["LETHAL HITS"] },
        { profileName: "frag", range: '48"', attacks: "2D6", skill: "3+", strength: "5", ap: "-1", damage: "1", keywords: ["BLAST", "LETHAL HITS"] },
      ]},
      { id: "csm-defiler-lascannon-b", name: "Hades lascannon", image: "", profiles: [{ range: '48"', attacks: "2", skill: "3+", strength: "12", ap: "-3", damage: "D6+1", keywords: ["LETHAL HITS"] }] },
      { id: "csm-defiler-reaper-b", name: "Heavy reaper autocannon", image: "", profiles: [{ range: '48"', attacks: "4", skill: "3+", strength: "9", ap: "-1", damage: "3", keywords: ["DEVASTATING WOUNDS", "LETHAL HITS", "SUSTAINED HITS 1"] }] },
      { id: "csm-defiler-electroscourge-b", name: "Electroscourge", image: "", profiles: [{ range: "Melee", attacks: "5", skill: "3+", strength: "12", ap: "-2", damage: "2", keywords: ["EXTRA ATTACKS", "SUSTAINED HITS 2"] }] },
    ],
    notes: [
      { id: "csm-defiler-note-hbc", text: "Hades battle cannon", checkbox: true, weaponId: "csm-defiler-hades-bc", exclusiveWith: "csm-defiler-note-ecto" },
      { id: "csm-defiler-note-ecto", text: "Ectoplasma destructor", checkbox: true, weaponId: "csm-defiler-ecto-destructor", exclusiveWith: "csm-defiler-note-hbc" },
      { id: "csm-defiler-note-excruciator", text: "Excruciator cannons", checkbox: true, weaponId: "csm-defiler-excruciator", exclusiveWith: "csm-defiler-note-magma" },
      { id: "csm-defiler-note-magma", text: "Magma cutters", checkbox: true, weaponId: "csm-defiler-magma-cutters", exclusiveWith: "csm-defiler-note-excruciator" },
      { id: "csm-defiler-note-baleflamer", text: "Heavy baleflamer", checkbox: true, weaponId: "csm-defiler-baleflamer", exclusiveWith: ["csm-defiler-note-lascannon-a", "csm-defiler-note-reaper-a", "csm-defiler-note-escourge-a"] },
      { id: "csm-defiler-note-lascannon-a", text: "Hades lascannon", checkbox: true, weaponId: "csm-defiler-lascannon-a", exclusiveWith: ["csm-defiler-note-baleflamer", "csm-defiler-note-reaper-a", "csm-defiler-note-escourge-a"] },
      { id: "csm-defiler-note-reaper-a", text: "Heavy reaper autocannon", checkbox: true, weaponId: "csm-defiler-reaper-a", exclusiveWith: ["csm-defiler-note-baleflamer", "csm-defiler-note-lascannon-a", "csm-defiler-note-escourge-a"] },
      { id: "csm-defiler-note-escourge-a", text: "Electroscourge", checkbox: true, weaponId: "csm-defiler-electroscourge-a", exclusiveWith: ["csm-defiler-note-baleflamer", "csm-defiler-note-lascannon-a", "csm-defiler-note-reaper-a", "csm-defiler-note-escourge-b"] },
      { id: "csm-defiler-note-missile", text: "Heavy missile launcher", checkbox: true, weaponId: "csm-defiler-missile-launcher", exclusiveWith: ["csm-defiler-note-lascannon-b", "csm-defiler-note-reaper-b", "csm-defiler-note-escourge-b"] },
      { id: "csm-defiler-note-lascannon-b", text: "Hades lascannon", checkbox: true, weaponId: "csm-defiler-lascannon-b", exclusiveWith: ["csm-defiler-note-missile", "csm-defiler-note-reaper-b", "csm-defiler-note-escourge-b"] },
      { id: "csm-defiler-note-reaper-b", text: "Heavy reaper autocannon", checkbox: true, weaponId: "csm-defiler-reaper-b", exclusiveWith: ["csm-defiler-note-missile", "csm-defiler-note-lascannon-b", "csm-defiler-note-escourge-b"] },
      { id: "csm-defiler-note-escourge-b", text: "Electroscourge", checkbox: true, weaponId: "csm-defiler-electroscourge-b", exclusiveWith: ["csm-defiler-note-missile", "csm-defiler-note-lascannon-b", "csm-defiler-note-reaper-b", "csm-defiler-note-escourge-a"] },
    ],
    abilities: [
      {
        name: "Scuttling Walker",
        description: "Each time this unit makes a Normal, Advance or Fall Back move, it can move through models (excluding TITANIC models) and terrain features. When doing so, it can move within Engagement Range of enemy models, but cannot end that move within Engagement Range of them, and any Desperate Escape test is automatically passed.",
      },
      {
        name: "Daemonforge",
        description: "Each time this unit makes a Dark Pact, until the end of the phase, each time this model makes an attack, re-roll a Wound roll of 1. In addition, once per battle, when this unit makes a Dark Pact, before making the resulting Leadership test, you can declare it will overcharge its daemonforge. If it does: If the resulting Leadership test is failed, this model suffers 3 mortal wounds instead of D3 mortal wounds. Until the end of the phase, each time this model makes an attack, you can re-roll the Wound roll.",
      },
      {
        name: "Damaged: 1-6 Wounds Remaining",
        description: "While this model has 1-6 wounds remaining, each time this model makes an attack, subtract 1 from the Hit roll.",
      },
    ],
    ledBy: [],
  },

  {
    id: "chaos-vindicator",
    name: "Chaos Vindicator",
    faction: "chaos-space-marine",
    category: "vehicle",
    points: 185,
    defaultWargear: [
      { id: "demolisher-cannon", name: "Demolisher cannon", image: "" },
      { id: "armoured-tracks", name: "Armoured tracks", image: "" },
    ],
    wargear: [
      { id: "combi-bolter", name: "Combi-bolter", image: "" },
      { id: "combi-weapon", name: "Combi-weapon", image: "" },
    ],
    ledBy: [],
  },

  {
    id: "decimator",
    name: "Decimator",
    faction: "chaos-space-marine",
    category: "vehicle",
    points: 170,
    defaultWargear: [
      { id: "decimator-butcher-cannon", name: "Decimator butcher cannon", image: "" },
      { id: "armoured-feet", name: "Armoured feet", image: "" },
    ],
    wargear: [
      { id: "decimator-conversion-beamer", name: "Decimator conversion beamer", image: "" },
      { id: "hellflamer", name: "Hellflamer", image: "" },
      { id: "soulburner-petard", name: "Soulburner petard", image: "" },
      { id: "storm-laser", name: "Storm laser", image: "" },
      { id: "decimator-claw", name: "Decimator claw", image: "" },
    ],
    ledBy: [],
  },

  {
    id: "defiler",
    name: "Defiler",
    faction: "chaos-space-marine",
    category: "vehicle",
    points: 190,
    defaultWargear: [
      { id: "defiler-cannon", name: "Defiler cannon", image: "" },
      { id: "reaper-autocannon", name: "Reaper autocannon", image: "" },
      { id: "twin-heavy-flamer", name: "Twin heavy flamer", image: "" },
      { id: "defiler-claws", name: "Defiler claws", image: "" },
    ],
    wargear: [
      { id: "combi-bolter", name: "Combi-bolter", image: "" },
      { id: "combi-weapon", name: "Combi-weapon", image: "" },
      { id: "havoc-launcher", name: "Havoc launcher", image: "" },
      { id: "twin-heavy-bolter", name: "Twin heavy bolter", image: "" },
      { id: "twin-lascannon", name: "Twin lascannon", image: "" },
      { id: "defiler-scourge", name: "Defiler scourge", image: "" },
    ],
    ledBy: [],
  },

  {
    id: "deredeo-dreadnought",
    name: "Deredeo Dreadnought",
    faction: "chaos-space-marine",
    category: "vehicle",
    points: 170,
    defaultWargear: [
      { id: "anvilus-autocannon-battery", name: "Anvilus autocannon battery", image: "" },
      { id: "twin-heavy-bolter", name: "Twin heavy bolter", image: "" },
      { id: "armoured-feet", name: "Armoured feet", image: "" },
    ],
    wargear: [
      { id: "aiolos-missile-launcher", name: "Aiolos missile launcher", image: "" },
      { id: "arachnus-heavy-lascannon-battery", name: "Arachnus heavy lascannon battery", image: "" },
      { id: "boreas-air-defence-missiles", name: "Boreas air defence missiles", image: "" },
      { id: "volkite-falconet-battery", name: "Volkite falconet battery", image: "" },
    ],
    ledBy: [],
  },

  {
    id: "falchion",
    name: "Falchion",
    faction: "chaos-space-marine",
    category: "vehicle",
    points: 515,
    defaultWargear: [
      { id: "heavy-bolter", name: "Heavy bolter", image: "" },
      { id: "quad-lascannon", name: "Quad lascannon", image: "" },
      { id: "twin-falchion-volcano-cannon", name: "Twin Falchion volcano cannon", image: "" },
      { id: "twin-heavy-bolter", name: "Twin heavy bolter", image: "" },
      { id: "armoured-tracks", name: "Armoured tracks", image: "" },
    ],
    wargear: [
      { id: "heavy-flamer", name: "Heavy flamer", image: "" },
      { id: "multi-melta", name: "Multi-melta", image: "" },
      { id: "storm-bolter", name: "Storm bolter", image: "" },
      { id: "twin-heavy-flamer", name: "Twin heavy flamer", image: "" },
    ],
    ledBy: [],
  },

  {
    id: "fellblade",
    name: "Fellblade",
    faction: "chaos-space-marine",
    category: "vehicle",
    points: 535,
    defaultWargear: [
      { id: "demolisher-cannon", name: "Demolisher cannon", image: "" },
      { id: "fellblade-accelerator-cannon-ap-shells", name: "Fellblade accelerator cannon – AP shells", image: "" },
      { id: "fellblade-accelerator-cannon-he-shells", name: "Fellblade accelerator cannon – HE shells", image: "" },
      { id: "heavy-bolter", name: "Heavy bolter", image: "" },
      { id: "quad-lascannon", name: "Quad lascannon", image: "" },
      { id: "twin-heavy-bolter", name: "Twin heavy bolter", image: "" },
      { id: "armoured-tracks", name: "Armoured tracks", image: "" },
    ],
    wargear: [
      { id: "heavy-flamer", name: "Heavy flamer", image: "" },
      { id: "multi-melta", name: "Multi-melta", image: "" },
      { id: "storm-bolter", name: "Storm bolter", image: "" },
      { id: "twin-heavy-flamer", name: "Twin heavy flamer", image: "" },
    ],
    ledBy: [],
  },

  {
    id: "fire-raptor-gunship",
    name: "Fire Raptor Gunship",
    faction: "chaos-space-marine",
    category: "vehicle",
    points: 290,
    defaultWargear: [
      { id: "twin-autocannon", name: "Twin autocannon", image: "" },
      { id: "twin-avenger-bolt-cannon", name: "Twin avenger bolt cannon", image: "" },
      { id: "twin-hellstrike-launcher", name: "Twin hellstrike launcher", image: "" },
      { id: "armoured-hull", name: "Armoured hull", image: "" },
    ],
    wargear: [
      { id: "quad-heavy-bolter", name: "Quad heavy bolter", image: "" },
      { id: "twin-lascannon", name: "Twin lascannon", image: "" },
    ],
    ledBy: [],
  },

  {
    id: "forgefiend",
    name: "Forgefiend",
    faction: "chaos-space-marine",
    category: "vehicle",
    image: "/Warhammerimages/ChaosSpaceMarine/Forgefiend.png",
    points: 170,
    defaultWargear: [],
    defaultSelectedWargear: ["hades-autocannon", "forgefiend-jaws"],
    wargear: [
      { id: "hades-autocannon", name: "Hades autocannon", image: "", profiles: [{ range: '36"', attacks: "6", skill: "3+", strength: "8", ap: "-1", damage: "2" }] },
      { id: "ectoplasma-cannon", name: "Ectoplasma cannon", image: "/Warhammerimages/ChaosSpaceMarine/Ectoplasma cannon.png", profiles: [{ profileName: "blast", range: '36"', attacks: "D3", skill: "3+", strength: "10", ap: "-3", damage: "3", keywords: ["BLAST"] }] },
      { id: "forgefiend-jaws", name: "Forgefiend jaws", image: "/Warhammerimages/ChaosSpaceMarine/Forgefiend jaw.png", profiles: [{ range: "Melee", attacks: "5", skill: "3+", strength: "7", ap: "0", damage: "2" }] },
      { id: "ectoplasma-cannon-and-armoured-limbs", name: "Ectoplasma cannon & Armoured limbs", image: "", profiles: [{ profileName: "Ectoplasma cannon – blast", range: '36"', attacks: "D3", skill: "3+", strength: "10", ap: "-3", damage: "3", keywords: ["BLAST"] }, { profileName: "Armoured limbs", range: "Melee", attacks: "2", skill: "3+", strength: "6", ap: "0", damage: "2" }] },
    ],
    wargearGroups: [
      ["hades-autocannon", "ectoplasma-cannon"],
      ["forgefiend-jaws", "ectoplasma-cannon-and-armoured-limbs"],
    ],
    abilities: [
      {
        name: "Daemonic Ordnance",
        description: "Each time this model is selected to shoot, it can use this ability. If it does, until the end of the phase, its ranged weapons have the [DEVASTATING WOUNDS] and [HAZARDOUS] abilities.",
      },
    ],
    ledBy: [],
  },

  {
    id: "greater-blight-drone",
    name: "Greater Blight Drone",
    faction: "chaos-space-marine",
    category: "vehicle",
    points: 150,
    defaultWargear: [
      { id: "bile-maw", name: "Bile maw", image: "" },
      { id: "blightreaper-cannon", name: "Blightreaper cannon", image: "" },
      { id: "greater-plague-probe", name: "Greater plague probe", image: "" },
    ],
    wargear: [],
    ledBy: [],
  },

  {
    id: "greater-brass-scorpion",
    name: "Greater Brass Scorpion",
    faction: "chaos-space-marine",
    category: "vehicle",
    points: 560,
    defaultWargear: [
      { id: "demolisher-cannon", name: "Demolisher cannon", image: "" },
      { id: "hellmaw-flame-cannons", name: "Hellmaw flame cannons", image: "" },
      { id: "scorpion-cannon", name: "Scorpion cannon", image: "" },
      { id: "hellcrusher-claws-strike", name: "Hellcrusher claws – strike", image: "" },
      { id: "hellcrusher-claws-sweep", name: "Hellcrusher claws – sweep", image: "" },
    ],
    wargear: [],
    ledBy: [],
  },

  {
    id: "helbrute",
    name: "Helbrute",
    faction: "chaos-space-marine",
    category: "vehicle",
    points: 130,
    defaultWargear: [
      { id: "hb-close-combat-weapon", name: "Close combat weapon", image: "", profiles: [{ range: "Melee", attacks: "5", skill: "3+", strength: "6", ap: "0", damage: "1" }] },
    ],
    wargear: [
      // Ranged arm – pick one
      { id: "multi-melta", name: "Multi-melta", image: "", wargearGroup: "helbrute-ranged", profiles: [{ range: '18"', attacks: "2", skill: "3+", strength: "9", ap: "-4", damage: "D6", keywords: ["MELTA 2"] }] },
      { id: "helbrute-plasma-cannon", name: "Helbrute plasma cannon", image: "", wargearGroup: "helbrute-ranged", profiles: [{ range: '36"', attacks: "D3", skill: "3+", strength: "8", ap: "-3", damage: "3", keywords: ["BLAST", "HAZARDOUS"] }] },
      { id: "twin-autocannon", name: "Twin autocannon", image: "", wargearGroup: "helbrute-ranged", profiles: [{ range: '48"', attacks: "2", skill: "3+", strength: "9", ap: "-1", damage: "3", keywords: ["TWIN-LINKED"] }] },
      { id: "twin-heavy-bolter", name: "Twin heavy bolter", image: "", wargearGroup: "helbrute-ranged", profiles: [{ range: '36"', attacks: "3", skill: "3+", strength: "5", ap: "-1", damage: "2", keywords: ["SUSTAINED HITS 1", "TWIN-LINKED"] }] },
      { id: "twin-lascannon", name: "Twin lascannon", image: "", wargearGroup: "helbrute-ranged", profiles: [{ range: '48"', attacks: "1", skill: "3+", strength: "12", ap: "-3", damage: "D6+1", keywords: ["TWIN-LINKED"] }] },
      { id: "helbrute-fist-arm", name: "Helbrute fist", image: "", wargearGroup: "helbrute-ranged", profiles: [{ range: "Melee", attacks: "5", skill: "3+", strength: "12", ap: "-2", damage: "3" }] },
      // Melee arm – pick one
      { id: "helbrute-missile-launcher", name: "Missile launcher", image: "", wargearGroup: "helbrute-melee", profiles: [{ profileName: "► Missile launcher – frag", range: '48"', attacks: "D6", skill: "3+", strength: "4", ap: "0", damage: "1", keywords: ["BLAST"] }, { profileName: "► Missile launcher – krak", range: '48"', attacks: "1", skill: "3+", strength: "9", ap: "-2", damage: "D6" }] },
      { id: "helbrute-fist", name: "Helbrute fist", image: "", wargearGroup: "helbrute-melee", profiles: [{ range: "Melee", attacks: "5", skill: "3+", strength: "12", ap: "-2", damage: "3" }] },
      { id: "helbrute-hammer", name: "Helbrute hammer", image: "", wargearGroup: "helbrute-melee", profiles: [{ range: "Melee", attacks: "5", skill: "4+", strength: "14", ap: "-3", damage: "D6+1" }] },
      { id: "power-scourge", name: "Power scourge", image: "", wargearGroup: "helbrute-melee", profiles: [{ range: "Melee", attacks: "8", skill: "3+", strength: "7", ap: "-1", damage: "2" }] },
      // Torso weapon (only if Helbrute fist taken for ranged arm) – pick one
      { id: "combi-bolter", name: "Combi-bolter", image: "", wargearGroup: "helbrute-torso", profiles: [{ range: '24"', attacks: "2", skill: "3+", strength: "4", ap: "0", damage: "1", keywords: ["RAPID FIRE 2"] }] },
      { id: "heavy-flamer", name: "Heavy flamer", image: "", wargearGroup: "helbrute-torso", profiles: [{ range: '12"', attacks: "D6", skill: "N/A", strength: "5", ap: "-1", damage: "1", keywords: ["IGNORES COVER", "TORRENT"] }] },
    ],
    notes: [
      {
        id: "helbrute-torso-note",
        text: "If this model is equipped with a Helbrute fist in place of its ranged arm, it can be equipped with one of the following:",
        checkbox: true,
        image: "",
        triggersWargear: ["combi-bolter", "heavy-flamer"],
        requiredWargear: ["helbrute-fist-arm"],
      },
    ],
    abilities: [
      {
        name: "Dark Ascension (Aura)",
        description: "While a friendly HERETIC ASTARTES unit is within 6\" of this model, each time that unit makes a Dark Pact, until the end of the phase, weapons equipped by models in that unit gain both abilities conferred by that pact (instead of only one).",
      },
      {
        name: "Devoted to Destruction",
        description: "If this model is equipped with two melee weapons in addition to its close combat weapon, add 2 to the Attacks characteristic of those two weapons.",
      },
    ],
    ledBy: [],
  },

  {
    id: "heldrake",
    name: "Heldrake",
    faction: "chaos-space-marine",
    category: "vehicle",
    points: 205,
    defaultWargear: [
      { id: "heldrake-claws", name: "Heldrake claws", image: "", profiles: [{ range: "Melee", attacks: "5", skill: "3+", strength: "7", ap: "-1", damage: "2", keywords: ["ANTI-FLY 2+", "DEVASTATING WOUNDS"] }] },
    ],
    wargear: [
      { id: "heldrake-hades-autocannon", name: "Hades autocannon", image: "", wargearGroup: "heldrake-ranged-slot", profiles: [{ range: '36"', attacks: "6", skill: "3+", strength: "8", ap: "-1", damage: "2" }] },
      { id: "heldrake-baleflamer", name: "Baleflamer", image: "", wargearGroup: "heldrake-ranged-slot", profiles: [{ range: '12"', attacks: "D6+3", skill: "N/A", strength: "6", ap: "-1", damage: "2", keywords: ["IGNORES COVER", "TORRENT"] }] },
    ],
    abilities: [
      {
        name: "Airborne Predator",
        description: "Each time this model makes an attack that targets a unit that can FLY, add 1 to the Hit roll.",
      },
      {
        name: "Damaged: 1-4 Wounds Remaining",
        description: "While this model has 1-4 wounds remaining, each time this model makes an attack, subtract 1 from the Hit roll.",
      },
    ],
    ledBy: [],
  },

  {
    id: "hell-blade",
    name: "Hell Blade",
    faction: "chaos-space-marine",
    category: "vehicle",
    points: 115,
    defaultWargear: [
      { id: "twin-autocannon", name: "Twin autocannon", image: "" },
      { id: "armoured-hull", name: "Armoured hull", image: "" },
    ],
    wargear: [
      { id: "twin-lascannon", name: "Twin lascannon", image: "" },
    ],
    ledBy: [],
  },

  {
    id: "hell-talon",
    name: "Hell Talon",
    faction: "chaos-space-marine",
    category: "vehicle",
    points: 140,
    defaultWargear: [
      { id: "autocannon", name: "Autocannon", image: "" },
      { id: "twin-lascannon", name: "Twin lascannon", image: "" },
      { id: "armoured-hull", name: "Armoured hull", image: "" },
    ],
    wargear: [
      { id: "havoc-launcher", name: "Havoc launcher", image: "" },
    ],
    ledBy: [],
  },

  {
    id: "khorne-lord-of-skulls",
    name: "Khorne Lord Of Skulls",
    faction: "chaos-space-marine",
    category: "vehicle",
    points: 450,
    defaultWargear: [
      { id: "gorestorm-cannon", name: "Gorestorm cannon", image: "" },
      { id: "hades-gatling-cannon", name: "Hades gatling cannon", image: "" },
      { id: "great-cleaver-of-khorne-strike", name: "Great cleaver of Khorne – strike", image: "" },
      { id: "great-cleaver-of-khorne-sweep", name: "Great cleaver of Khorne – sweep", image: "" },
    ],
    wargear: [
      { id: "daemongore-cannon", name: "Daemongore cannon", image: "" },
      { id: "ichor-cannon", name: "Ichor cannon", image: "" },
    ],
    ledBy: [],
  },

  {
    id: "kratos",
    name: "Kratos",
    faction: "chaos-space-marine",
    category: "vehicle",
    points: 265,
    defaultWargear: [
      { id: "autocannon", name: "Autocannon", image: "" },
      { id: "heavy-bolter", name: "Heavy bolter", image: "" },
      { id: "kratos-battle-cannon-ap", name: "Kratos battle cannon – AP", image: "" },
      { id: "kratos-battle-cannon-he", name: "Kratos battle cannon – HE", image: "" },
      { id: "armoured-tracks", name: "Armoured tracks", image: "" },
    ],
    wargear: [
      { id: "combi-weapon", name: "Combi-weapon", image: "" },
      { id: "havoc-launcher", name: "Havoc launcher", image: "" },
      { id: "heavy-flamer", name: "Heavy flamer", image: "" },
      { id: "lascannons", name: "Lascannons", image: "" },
      { id: "melta-blast-gun", name: "Melta blast-gun", image: "" },
      { id: "multi-melta", name: "Multi-melta", image: "" },
      { id: "twin-boltgun", name: "Twin boltgun", image: "" },
      { id: "volkite-caliver", name: "Volkite caliver", image: "" },
      { id: "volkite-cardanelle", name: "Volkite cardanelle", image: "" },
      { id: "volkite-culverin", name: "Volkite culverin", image: "" },
    ],
    ledBy: [],
  },

  {
    id: "kytan-ravager",
    name: "Kytan Ravager",
    faction: "chaos-space-marine",
    category: "vehicle",
    points: 425,
    defaultWargear: [
      { id: "kytan-gatling-cannon", name: "Kytan gatling cannon", image: "" },
      { id: "kytan-cleaver-strike", name: "Kytan cleaver – strike", image: "" },
      { id: "kytan-cleaver-sweep", name: "Kytan cleaver – sweep", image: "" },
    ],
    wargear: [],
    ledBy: [],
  },

  {
    id: "leviathan-dreadnought",
    name: "Leviathan Dreadnought",
    faction: "chaos-space-marine",
    category: "vehicle",
    points: 215,
    defaultWargear: [
      { id: "grav-flux-bombard", name: "Grav-flux bombard", image: "" },
      { id: "heavy-flamer", name: "Heavy flamer", image: "" },
      { id: "armoured-feet", name: "Armoured feet", image: "" },
    ],
    wargear: [
      { id: "cyclonic-melta-lance", name: "Cyclonic melta lance", image: "" },
      { id: "meltagun", name: "Meltagun", image: "" },
      { id: "storm-cannon", name: "Storm cannon", image: "" },
      { id: "leviathan-siege-claw", name: "Leviathan siege claw", image: "" },
      { id: "leviathan-siege-drill", name: "Leviathan siege drill", image: "" },
    ],
    ledBy: [],
  },

  {
    id: "maulerfiend",
    name: "Maulerfiend",
    faction: "chaos-space-marine",
    category: "vehicle",
    points: 130,
    defaultWargear: [
      { id: "maulerfiend-fists", name: "Maulerfiend fists", image: "", profiles: [{ range: "Melee", attacks: "6", skill: "3+", strength: "14", ap: "-2", damage: "D6+1" }] },
    ],
    wargear: [
      { id: "maulerfiend-lasher-tendrils", name: "Lasher tendrils", image: "", profiles: [{ range: "Melee", attacks: "6", skill: "3+", strength: "7", ap: "-1", damage: "1", keywords: ["EXTRA ATTACKS"] }] },
      { id: "maulerfiend-magma-cutters", name: "Magma cutters", image: "", profiles: [{ range: '6"', attacks: "2", skill: "3+", strength: "9", ap: "-4", damage: "D6", keywords: ["MELTA 2"] }] },
    ],
    wargearGroups: [
      ["maulerfiend-lasher-tendrils", "maulerfiend-magma-cutters"],
    ],
    abilities: [
      {
        name: "Siege Crawler",
        description: "You can ignore any or all modifiers to this model's Move characteristic and to Advance and Charge rolls made for it.",
      },
      {
        name: "Damaged: 1-4 Wounds Remaining",
        description: "While this model has 1-4 wounds remaining, each time this model makes an attack, subtract 1 from the Hit roll.",
      },
    ],
    ledBy: [],
  },

  {
    id: "rapier-carrier",
    name: "Rapier Carrier",
    faction: "chaos-space-marine",
    category: "vehicle",
    points: 100,
    defaultWargear: [
      { id: "boltgun", name: "Boltgun", image: "" },
      { id: "quad-heavy-bolter", name: "Quad heavy bolter", image: "" },
      { id: "close-combat-weapon", name: "Close combat weapon", image: "" },
    ],
    wargear: [
      { id: "graviton-cannon", name: "Graviton cannon", image: "" },
      { id: "laser-destroyer", name: "Laser destroyer", image: "" },
      { id: "quad-launcher-shatter-shells", name: "Quad launcher – shatter shells", image: "" },
      { id: "quad-launcher-thunderfire-shells", name: "Quad launcher – thunderfire shells", image: "" },
    ],
    ledBy: [],
  },

  {
    id: "relic-contemptor-dreadnought",
    name: "Relic Contemptor Dreadnought",
    faction: "chaos-space-marine",
    category: "vehicle",
    points: 180,
    defaultWargear: [
      { id: "armoured-feet", name: "Armoured feet", image: "" },
    ],
    wargear: [
      { id: "combi-bolter", name: "Combi-bolter", image: "" },
      { id: "conversion-beam-cannon", name: "Conversion beam cannon", image: "" },
      { id: "graviton-blaster", name: "Graviton blaster", image: "" },
      { id: "twin-autocannon", name: "Twin autocannon", image: "" },
      { id: "twin-heavy-bolter", name: "Twin heavy bolter", image: "" },
      { id: "twin-lascannon", name: "Twin lascannon", image: "" },
      { id: "heavy-flamer", name: "Heavy flamer", image: "" },
      { id: "kheres-pattern-assault-cannon", name: "Kheres-pattern assault cannon", image: "" },
      { id: "multi-melta", name: "Multi-melta", image: "" },
      { id: "plasma-blaster-standard", name: "Plasma blaster – standard", image: "" },
      { id: "plasma-blaster-supercharge", name: "Plasma blaster – supercharge", image: "" },
      { id: "twin-volkite-culverin", name: "Twin volkite culverin", image: "" },
      { id: "dreadnought-chainfist", name: "Dreadnought chainfist", image: "" },
      { id: "dreadnought-combat-weapon", name: "Dreadnought combat weapon", image: "" },
    ],
    ledBy: [],
  },

  {
    id: "sicaran-battle-tank",
    name: "Sicaran Battle Tank",
    faction: "chaos-space-marine",
    category: "vehicle",
    points: 220,
    defaultWargear: [
      { id: "heavy-bolter", name: "Heavy bolter", image: "" },
      { id: "herakles-pattern-autocannon", name: "Herakles-pattern autocannon", image: "" },
      { id: "armoured-tracks", name: "Armoured tracks", image: "" },
    ],
    wargear: [
      { id: "lascannon", name: "Lascannon", image: "" },
    ],
    ledBy: [],
  },

  {
    id: "sicaran-punisher",
    name: "Sicaran Punisher",
    faction: "chaos-space-marine",
    category: "vehicle",
    points: 220,
    defaultWargear: [
      { id: "heavy-bolter", name: "Heavy bolter", image: "" },
      { id: "punisher-rotary-cannon", name: "Punisher rotary cannon", image: "" },
      { id: "armoured-tracks", name: "Armoured tracks", image: "" },
    ],
    wargear: [
      { id: "lascannon", name: "Lascannon", image: "" },
    ],
    ledBy: [],
  },

  {
    id: "sicaran-venator",
    name: "Sicaran Venator",
    faction: "chaos-space-marine",
    category: "vehicle",
    points: 220,
    defaultWargear: [
      { id: "heavy-bolter", name: "Heavy bolter", image: "" },
      { id: "venator-neutron-laser", name: "Venator neutron laser", image: "" },
      { id: "armoured-tracks", name: "Armoured tracks", image: "" },
    ],
    wargear: [
      { id: "lascannon", name: "Lascannon", image: "" },
    ],
    ledBy: [],
  },

  {
    id: "typhon",
    name: "Typhon",
    faction: "chaos-space-marine",
    category: "vehicle",
    points: 385,
    defaultWargear: [
      { id: "dreadhammer-siege-cannon", name: "Dreadhammer siege cannon", image: "" },
      { id: "armoured-tracks", name: "Armoured tracks", image: "" },
    ],
    wargear: [
      { id: "heavy-bolter", name: "Heavy bolter", image: "" },
      { id: "heavy-flamer", name: "Heavy flamer", image: "" },
      { id: "lascannon", name: "Lascannon", image: "" },
      { id: "multi-melta", name: "Multi-melta", image: "" },
      { id: "storm-bolter", name: "Storm bolter", image: "" },
    ],
    ledBy: [],
  },

  {
    id: "venomcrawler",
    name: "Venomcrawler",
    faction: "chaos-space-marine",
    category: "vehicle",
    points: 110,
    defaultWargear: [
      { id: "excruciator-cannon", name: "Excruciator cannon", image: "", profiles: [{ range: '36"', attacks: "6", skill: "3+", strength: "6", ap: "-1", damage: "2" }] },
      { id: "soulflayer-tendrils-and-claws", name: "Soulflayer tendrils and claws", image: "", profiles: [{ range: "Melee", attacks: "6", skill: "3+", strength: "6", ap: "-1", damage: "2" }] },
    ],
    wargear: [],
    abilities: [
      {
        name: "Soul Eater",
        description: "At the end of the Fight phase, if one or more attacks made by this model this phase destroyed one or more enemy units, until the end of the battle, add 1 to the Attacks characteristic of this model's weapons.",
      },
    ],
    ledBy: [],
  },

  {
    id: "whirlwind-scorpius",
    name: "Whirlwind Scorpius",
    faction: "chaos-space-marine",
    category: "vehicle",
    points: 115,
    defaultWargear: [
      { id: "scorpius-multi-launcher", name: "Scorpius multi-launcher", image: "" },
      { id: "armoured-tracks", name: "Armoured tracks", image: "" },
    ],
    wargear: [
      { id: "hunter-killer-missile", name: "Hunter-killer missile", image: "" },
      { id: "storm-bolter", name: "Storm bolter", image: "" },
    ],
    ledBy: [],
  },

  {
    id: "xiphon-interceptor",
    name: "Xiphon Interceptor",
    faction: "chaos-space-marine",
    category: "vehicle",
    points: 115,
    defaultWargear: [
      { id: "twin-lascannon", name: "Twin lascannon", image: "" },
      { id: "xiphon-missile-battery", name: "Xiphon missile battery", image: "" },
      { id: "armoured-hull", name: "Armoured hull", image: "" },
    ],
    wargear: [],
    ledBy: [],
  },

  {
    id: "chaos-land-raider",
    name: "Chaos Land Raider",
    faction: "chaos-space-marine",
    category: "transport",
    points: 240,
    defaultWargear: [
      { id: "soulshatter-lascannon", name: "Soulshatter lascannon", image: "" },
      { id: "twin-heavy-bolter", name: "Twin heavy bolter", image: "" },
      { id: "armoured-tracks", name: "Armoured tracks", image: "" },
    ],
    wargear: [
      { id: "combi-bolter", name: "Combi-bolter", image: "" },
      { id: "combi-weapon", name: "Combi-weapon", image: "" },
    ],
    ledBy: [],
  },

  {
    id: "chaos-rhino",
    name: "Chaos Rhino",
    faction: "chaos-space-marine",
    category: "transport",
    points: 75,
    transportCapacity: 12,
    defaultWargear: [
      { id: "chaos-rhino-combi-bolter", name: "Combi-bolter", image: "", profiles: [{ range: '24"', attacks: "2", skill: "3+", strength: "4", ap: "0", damage: "1", keywords: ["RAPID FIRE 2"] }] },
      { id: "chaos-rhino-armoured-tracks", name: "Armoured tracks", image: "", profiles: [{ range: "Melee", attacks: "3", skill: "4+", strength: "6", ap: "0", damage: "1" }] },
    ],
    wargear: [
      { id: "chaos-rhino-combi-weapon", name: "Combi-weapon", image: "", profiles: [{ range: '24"', attacks: "1", skill: "4+", strength: "4", ap: "0", damage: "1", keywords: ["ANTI-INFANTRY 4+", "DEVASTATING WOUNDS", "RAPID FIRE 1"] }] },
      { id: "chaos-rhino-havoc-launcher", name: "Havoc launcher", image: "", profiles: [{ range: '48"', attacks: "D6", skill: "3+", strength: "5", ap: "0", damage: "1", keywords: ["BLAST"] }] },
    ],
    notes: [
      {
        id: "chaos-rhino-combi-weapon-note",
        text: "This model can replace its combi-bolter with a combi-weapon.",
        checkbox: true,
        weaponId: "chaos-rhino-combi-weapon",
        replacesDefaultWargear: "chaos-rhino-combi-bolter",
      },
      {
        id: "chaos-rhino-havoc-launcher-note",
        text: "This model can be equipped with a havoc launcher.",
        checkbox: true,
        weaponId: "chaos-rhino-havoc-launcher",
      },
    ],
    abilities: [
      {
        name: "Self Repair",
        description: "At the start of your Command phase, this model regains 1 lost wound.",
      },
    ],
    ledBy: [],
  },

  {
    id: "chaos-thunderhawk",
    name: "Chaos Thunderhawk",
    faction: "chaos-space-marine",
    category: "transport",
    points: 840,
    defaultWargear: [
      { id: "lascannon", name: "Lascannon", image: "" },
      { id: "thunderhawk-heavy-cannon", name: "Thunderhawk heavy cannon", image: "" },
      { id: "twin-heavy-bolter", name: "Twin heavy bolter", image: "" },
      { id: "armoured-hull", name: "Armoured hull", image: "" },
    ],
    wargear: [
      { id: "hellstrike-missile-battery", name: "Hellstrike missile battery", image: "" },
      { id: "turbo-laser-destructor", name: "Turbo-laser destructor", image: "" },
    ],
    ledBy: [],
  },

  {
    id: "dreadclaw-drop-pod",
    name: "Dreadclaw Drop Pod",
    faction: "chaos-space-marine",
    category: "transport",
    points: 115,
    defaultWargear: [
      { id: "blade-struts", name: "Blade struts", image: "" },
    ],
    wargear: [],
    ledBy: [],
  },

  {
    id: "kharybdis-assault-claw",
    name: "Kharybdis Assault Claw",
    faction: "chaos-space-marine",
    category: "transport",
    points: 325,
    defaultWargear: [
      { id: "blade-struts", name: "Blade struts", image: "" },
      { id: "melta-array", name: "Melta array", image: "" },
    ],
    wargear: [
      { id: "kharybdis-storm-launcher-frag", name: "Kharybdis storm launcher – frag", image: "" },
      { id: "kharybdis-storm-launcher-krak", name: "Kharybdis storm launcher – krak", image: "" },
    ],
    ledBy: [],
  },

  {
    id: "land-raider-achilles",
    name: "Land Raider Achilles",
    faction: "chaos-space-marine",
    category: "transport",
    points: 285,
    defaultWargear: [
      { id: "quad-launcher-shatter-shells", name: "Quad launcher – shatter shells", image: "" },
      { id: "quad-launcher-thunderfire-shells", name: "Quad launcher – thunderfire shells", image: "" },
      { id: "twin-volkite-culverin", name: "Twin volkite culverin", image: "" },
      { id: "armoured-tracks", name: "Armoured tracks", image: "" },
    ],
    wargear: [
      { id: "hunter-killer-missile", name: "Hunter-killer missile", image: "" },
      { id: "storm-bolter", name: "Storm bolter", image: "" },
      { id: "twin-multi-melta", name: "Twin multi-melta", image: "" },
    ],
    ledBy: [],
  },

  {
    id: "land-raider-proteus",
    name: "Land Raider Proteus",
    faction: "chaos-space-marine",
    category: "transport",
    points: 250,
    defaultWargear: [
      { id: "twin-lascannon", name: "Twin lascannon", image: "" },
      { id: "armoured-tracks", name: "Armoured tracks", image: "" },
    ],
    wargear: [
      { id: "heavy-bolter", name: "Heavy bolter", image: "" },
      { id: "multi-melta", name: "Multi-melta", image: "" },
      { id: "twin-heavy-bolter", name: "Twin heavy bolter", image: "" },
      { id: "twin-heavy-flamer", name: "Twin heavy flamer", image: "" },
    ],
    ledBy: [],
  },

  {
    id: "mastodon",
    name: "Mastodon",
    faction: "chaos-space-marine",
    category: "transport",
    points: 610,
    defaultWargear: [
      { id: "heavy-flamer", name: "Heavy flamer", image: "" },
      { id: "lascannon", name: "Lascannon", image: "" },
      { id: "siege-melta-array", name: "Siege melta array", image: "" },
      { id: "skyreaper-battery", name: "Skyreaper battery", image: "" },
      { id: "armoured-tracks", name: "Armoured tracks", image: "" },
    ],
    wargear: [
      { id: "heavy-bolter", name: "Heavy bolter", image: "" },
      { id: "volkite-culverin", name: "Volkite culverin", image: "" },
    ],
    ledBy: [],
  },

  {
    id: "sokar-pattern-stormbird",
    name: "Sokar Pattern Stormbird",
    faction: "chaos-space-marine",
    category: "transport",
    points: 1100,
    defaultWargear: [
      { id: "hellstrike-missile-battery", name: "Hellstrike missile battery", image: "" },
      { id: "twin-heavy-bolter", name: "Twin heavy bolter", image: "" },
      { id: "twin-lascannon", name: "Twin lascannon", image: "" },
      { id: "armoured-hull", name: "Armoured hull", image: "" },
    ],
    wargear: [],
    ledBy: [],
  },

  {
    id: "spartan",
    name: "Spartan",
    faction: "chaos-space-marine",
    category: "transport",
    points: 315,
    defaultWargear: [
      { id: "heavy-bolter", name: "Heavy bolter", image: "" },
      { id: "quad-lascannon", name: "Quad lascannon", image: "" },
      { id: "twin-heavy-bolter", name: "Twin heavy bolter", image: "" },
      { id: "armoured-tracks", name: "Armoured tracks", image: "" },
    ],
    wargear: [
      { id: "heavy-flamer", name: "Heavy flamer", image: "" },
      { id: "multi-melta", name: "Multi-melta", image: "" },
      { id: "storm-bolter", name: "Storm bolter", image: "" },
      { id: "twin-heavy-flamer", name: "Twin heavy flamer", image: "" },
    ],
    ledBy: [],
  },

  {
    id: "storm-eagle-gunship",
    name: "Storm Eagle Gunship",
    faction: "chaos-space-marine",
    category: "transport",
    points: 255,
    defaultWargear: [
      { id: "twin-heavy-bolter", name: "Twin heavy bolter", image: "" },
      { id: "twin-hellstrike-launcher", name: "Twin hellstrike launcher", image: "" },
      { id: "vengeance-launcher", name: "Vengeance launcher", image: "" },
      { id: "armoured-hull", name: "Armoured hull", image: "" },
    ],
    wargear: [
      { id: "twin-multi-melta", name: "Twin multi-melta", image: "" },
      { id: "typhoon-missile-launcher-frag", name: "Typhoon missile launcher – frag", image: "" },
      { id: "typhoon-missile-launcher-krak", name: "Typhoon missile launcher – krak", image: "" },
    ],
    ledBy: [],
  },

  {
    id: "terrax-pattern-termite",
    name: "Terrax Pattern Termite",
    faction: "chaos-space-marine",
    category: "transport",
    points: 200,
    defaultWargear: [
      { id: "combi-bolter", name: "Combi-bolter", image: "" },
      { id: "terrax-melta-cutter", name: "Terrax melta cutter", image: "" },
      { id: "termite-drill", name: "Termite drill", image: "" },
    ],
    wargear: [
      { id: "heavy-flamer", name: "Heavy flamer", image: "" },
      { id: "twin-volkite-charger", name: "Twin volkite charger", image: "" },
    ],
    ledBy: [],
  },

];
