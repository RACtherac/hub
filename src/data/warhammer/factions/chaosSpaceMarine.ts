import type { Unit } from "../../../types/warhammer";

export const chaosSpaceMarinesUnits: Unit[] = [

  // ── Battleline ──────────────────────────────────────────────────────────

  {
    id: "accursed-cultists",
    name: "Accursed Cultists",
    faction: "chaos-space-marine",
    category: "battleline",
    modelCountOptions: [8, 16],
    pointsByModelCount: { 8: 90, 16: 195 },
    defaultWargear: [
      {
        id: "accursed-cultists-blasphemous-appendages",
        name: "Blasphemous appendages",
        image: "",
        profiles: [{ range: "Melee", attacks: "2", skill: "4+", strength: "4", ap: "0", damage: "1" }],
      },
      {
        id: "accursed-cultists-hideous-mutations",
        name: "Hideous mutations",
        image: "",
        profiles: [{ range: "Melee", attacks: "D6+2", skill: "4+", strength: "5", ap: "-1", damage: "2" }],
      },
    ],
    wargear: [],
    abilities: [
      {
        name: "Accursed Horde",
        description: "Each time an enemy unit has shot, if one or more models from this unit were destroyed as a result of those attacks, this unit can make a Horde move. To do so, roll one D6: this unit can be moved a number of inches up to the result, but this unit must finish that move as close as possible to the closest enemy unit (excluding AIRCRAFT). When doing so, those models can be moved within Engagement Range of that enemy unit. A unit cannot make a Horde move while it is Battle-shocked.",
      },
    ],
    ledBy: ["cultist-firebrand", "dark-apostle", "dark-commune", "fabius-bile"],
  },

  {
    id: "cultist-mob",
    name: "Cultist Mob",
    faction: "chaos-space-marine",
    category: "battleline",
    points: 50,
    wargear: [],
  },

  {
    id: "khorne-berzerkers",
    name: "Khorne Berzerkers",
    faction: "chaos-space-marine",
    category: "battleline",
    points: 90,
    wargear: [],
  },

  {
    id: "legionaries",
    name: "Legionaries",
    faction: "chaos-space-marine",
    category: "battleline",
    points: 90,
    wargear: [],
  },

  {
    id: "plague-marines",
    name: "Plague Marines",
    faction: "chaos-space-marine",
    category: "battleline",
    points: 90,
    wargear: [],
  },

  {
    id: "abaddon-the-despoiler",
    name: "Abaddon The Despoiler",
    faction: "chaos-space-marine",
    category: "infantry",
    points: 280,
    wargear: [],
  },

  {
    id: "chaos-bikers",
    name: "Chaos Bikers",
    faction: "chaos-space-marine",
    category: "infantry",
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
  },

  {
    id: "chaos-lord",
    name: "Chaos Lord",
    faction: "chaos-space-marine",
    category: "infantry",
    points: 90,
    wargear: [
      {
        id: "chaos-lord-plasma-pistol",
        name: "Plasma pistol",
        image: "",
        profiles: [
          { profileName: "standard", range: '12"', attacks: "1", skill: "2+", strength: "7", ap: "-2", damage: "1", keywords: ["PISTOL"] },
          { profileName: "supercharge", range: '12"', attacks: "1", skill: "2+", strength: "8", ap: "-3", damage: "2", keywords: ["HAZARDOUS", "PISTOL"] },
        ],
      },
      {
        id: "chaos-lord-accursed-weapon",
        name: "Accursed weapon",
        image: "",
        profiles: [{ range: "Melee", attacks: "6", skill: "2+", strength: "5", ap: "-2", damage: "1" }],
      },
      {
        id: "chaos-lord-astartes-chainsword",
        name: "Astartes chainsword",
        image: "",
        profiles: [{ range: "Melee", attacks: "7", skill: "2+", strength: "4", ap: "-1", damage: "1" }],
      },
      {
        id: "chaos-lord-daemon-hammer",
        name: "Daemon hammer",
        image: "",
        profiles: [{ range: "Melee", attacks: "5", skill: "3+", strength: "8", ap: "-2", damage: "2", keywords: ["DEVASTATING WOUNDS"] }],
      },
      {
        id: "chaos-lord-power-fist",
        name: "Power fist",
        image: "",
        profiles: [{ range: "Melee", attacks: "5", skill: "2+", strength: "8", ap: "-2", damage: "2" }],
      },
    ],
    wargearGroups: [
      ["chaos-lord-daemon-hammer", "chaos-lord-accursed-weapon", "chaos-lord-astartes-chainsword"],
      ["chaos-lord-plasma-pistol", "chaos-lord-power-fist"],
    ],
    abilities: [
      {
        name: "Lord of Chaos",
        description: "Once per battle round, one unit from your army with this ability can use it when its unit is targeted with a Stratagem. If it does, reduce the CP cost of that use of that Stratagem by 1CP.",
      },
      {
        name: "Chance for Glory",
        description: "Once per battle, at the start of the Fight phase, this model can use this ability. If it does, until the end of the phase, improve the Strength, Attacks, Armour Penetration and Damage characteristics of melee weapons equipped by this model by 1.",
      },
    ],
  },

  {
    id: "chaos-lord-in-terminator-armour",
    name: "Chaos Lord In Terminator Armour",
    faction: "chaos-space-marine",
    category: "infantry",
    points: 95,
    wargear: [],
  },

  {
    id: "chaos-lord-on-bike",
    name: "Chaos Lord On Bike",
    faction: "chaos-space-marine",
    category: "infantry",
    points: 95,
    wargear: [],
  },

  {
    id: "chaos-lord-on-disc-of-tzeentch",
    name: "Chaos Lord On Disc Of Tzeentch",
    faction: "chaos-space-marine",
    category: "infantry",
    points: 100,
    wargear: [],
  },

  {
    id: "chaos-lord-on-juggernaut",
    name: "Chaos Lord On Juggernaut",
    faction: "chaos-space-marine",
    category: "infantry",
    points: 115,
    wargear: [],
  },

  {
    id: "chaos-lord-on-palanquin-of-nurgle",
    name: "Chaos Lord On Palanquin Of Nurgle",
    faction: "chaos-space-marine",
    category: "infantry",
    points: 90,
    wargear: [],
  },

  {
    id: "chaos-lord-on-steed-of-slaanesh",
    name: "Chaos Lord On Steed Of Slaanesh",
    faction: "chaos-space-marine",
    category: "infantry",
    points: 100,
    wargear: [],
  },

  {
    id: "chaos-lord-with-jump-pack",
    name: "Chaos Lord With Jump Pack",
    faction: "chaos-space-marine",
    category: "infantry",
    points: 90,
    wargear: [],
  },

  {
    id: "chaos-spawn",
    name: "Chaos Spawn",
    faction: "chaos-space-marine",
    category: "infantry",
    points: 70,
    wargear: [],
  },

  {
    id: "chaos-terminator-squad",
    name: "Chaos Terminator Squad",
    faction: "chaos-space-marine",
    category: "infantry",
    points: 180,
    wargear: [],
  },

  {
    id: "chosen",
    name: "Chosen",
    faction: "chaos-space-marine",
    category: "infantry",
    points: 125,
    wargear: [],
  },

  {
    id: "cultist-firebrand",
    name: "Cultist Firebrand",
    faction: "chaos-space-marine",
    category: "infantry",
    points: 45,
    wargear: [],
  },

  {
    id: "cypher",
    name: "Cypher",
    faction: "chaos-space-marine",
    category: "infantry",
    points: 90,
    wargear: [],
  },

  {
    id: "exalted-champion",
    name: "Exalted Champion",
    faction: "chaos-space-marine",
    category: "infantry",
    points: 70,
    wargear: [],
  },

  {
    id: "haarken-worldclaimer",
    name: "Haarken Worldclaimer",
    faction: "chaos-space-marine",
    category: "infantry",
    points: 90,
    wargear: [],
  },

  {
    id: "huron-blackheart",
    name: "Huron Blackheart",
    faction: "chaos-space-marine",
    category: "infantry",
    points: 80,
    wargear: [],
  },

  {
    id: "lord-discordant-on-helstalker",
    name: "Lord Discordant On Helstalker",
    faction: "chaos-space-marine",
    category: "infantry",
    points: 160,
    wargear: [],
  },

  {
    id: "lucius-the-eternal",
    name: "Lucius The Eternal",
    faction: "chaos-space-marine",
    category: "infantry",
    points: 95,
    wargear: [],
  },

  {
    id: "master-of-executions",
    name: "Master Of Executions",
    faction: "chaos-space-marine",
    category: "infantry",
    points: 80,
    wargear: [],
  },

  {
    id: "master-of-possession",
    name: "Master Of Possession",
    faction: "chaos-space-marine",
    category: "infantry",
    points: 70,
    wargear: [],
  },

  {
    id: "mutilators",
    name: "Mutilators",
    faction: "chaos-space-marine",
    category: "infantry",
    points: 200,
    defaultWargear: [
      {
        id: "mutilators-fleshmetal-weapons",
        name: "Fleshmetal weapons",
        image: "",
        profiles: [
          { profileName: "clawed sweeps", range: "Melee", attacks: "6", skill: "3+", strength: "6", ap: "-2", damage: "1" },
          { profileName: "rending strikes", range: "Melee", attacks: "4", skill: "3+", strength: "9", ap: "-3", damage: "3" },
          { profileName: "thunderous blows", range: "Melee", attacks: "2", skill: "3+", strength: "12", ap: "-4", damage: "D6+2" },
        ],
      },
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
    wargear: [],
  },

  {
    id: "negavolt-cultists",
    name: "Negavolt Cultists",
    faction: "chaos-space-marine",
    category: "infantry",
    points: 55,
    wargear: [],
  },

  {
    id: "noctilith-crown",
    name: "Noctilith Crown",
    faction: "chaos-space-marine",
    category: "infantry",
    points: 125,
    wargear: [],
  },

  {
    id: "noise-marines",
    name: "Noise Marines",
    faction: "chaos-space-marine",
    category: "infantry",
    points: 85,
    wargear: [],
  },

  {
    id: "obliterators",
    name: "Obliterators",
    faction: "chaos-space-marine",
    category: "infantry",
    points: 160,
    wargear: [],
  },

  {
    id: "possessed",
    name: "Possessed",
    faction: "chaos-space-marine",
    category: "infantry",
    points: 120,
    wargear: [],
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
    id: "renegade-enforcer",
    name: "Renegade Enforcer",
    faction: "chaos-space-marine",
    category: "infantry",
    points: 65,
    wargear: [],
  },

  {
    id: "renegade-heavy-weapons-squad",
    name: "Renegade Heavy Weapons Squad",
    faction: "chaos-space-marine",
    category: "infantry",
    points: 75,
    wargear: [],
  },

  {
    id: "renegade-ogryn-brutes",
    name: "Renegade Ogryn Brutes",
    faction: "chaos-space-marine",
    category: "infantry",
    points: 95,
    wargear: [],
  },

  {
    id: "renegade-plague-ogryns",
    name: "Renegade Plague Ogryns",
    faction: "chaos-space-marine",
    category: "infantry",
    points: 95,
    wargear: [],
  },

  {
    id: "rogue-psyker",
    name: "Rogue Psyker",
    faction: "chaos-space-marine",
    category: "infantry",
    points: 60,
    wargear: [],
  },

  {
    id: "sorcerer",
    name: "Sorcerer",
    faction: "chaos-space-marine",
    category: "infantry",
    points: 60,
    wargear: [],
  },

  {
    id: "sorcerer-in-terminator-armour",
    name: "Sorcerer In Terminator Armour",
    faction: "chaos-space-marine",
    category: "infantry",
    points: 80,
    wargear: [],
  },

  {
    id: "sorcerer-on-bike",
    name: "Sorcerer On Bike",
    faction: "chaos-space-marine",
    category: "infantry",
    points: 75,
    wargear: [],
  },

  {
    id: "sorcerer-on-disc-of-tzeentch",
    name: "Sorcerer On Disc Of Tzeentch",
    faction: "chaos-space-marine",
    category: "infantry",
    points: 80,
    wargear: [],
  },

  {
    id: "sorcerer-on-palanquin-of-nurgle",
    name: "Sorcerer On Palanquin Of Nurgle",
    faction: "chaos-space-marine",
    category: "infantry",
    points: 80,
    wargear: [],
  },

  {
    id: "sorcerer-on-steed-of-slaanesh",
    name: "Sorcerer On Steed Of Slaanesh",
    faction: "chaos-space-marine",
    category: "infantry",
    points: 85,
    wargear: [],
  },

  {
    id: "warp-talons",
    name: "Warp Talons",
    faction: "chaos-space-marine",
    category: "infantry",
    points: 125,
    wargear: [],
  },

  {
    id: "warpsmith",
    name: "Warpsmith",
    faction: "chaos-space-marine",
    category: "infantry",
    points: 70,
    wargear: [],
  },

  {
    id: "blood-slaughterer",
    name: "Blood Slaughterer",
    faction: "chaos-space-marine",
    category: "vehicle",
    points: 160,
    wargear: [],
  },

  {
    id: "cerberus",
    name: "Cerberus",
    faction: "chaos-space-marine",
    category: "vehicle",
    points: 285,
    wargear: [],
  },

  {
    id: "chaos-deimos-predator",
    name: "Chaos Deimos Predator",
    faction: "chaos-space-marine",
    category: "vehicle",
    points: 115,
    wargear: [],
  },

  {
    id: "chaos-predator-annihilator",
    name: "Chaos Predator Annihilator",
    faction: "chaos-space-marine",
    category: "vehicle",
    points: 135,
    wargear: [],
  },

  {
    id: "chaos-predator-destructor",
    name: "Chaos Predator Destructor",
    faction: "chaos-space-marine",
    category: "vehicle",
    points: 140,
    wargear: [],
  },

  {
    id: "chaos-vindicator",
    name: "Chaos Vindicator",
    faction: "chaos-space-marine",
    category: "vehicle",
    points: 185,
    wargear: [],
  },

  {
    id: "decimator",
    name: "Decimator",
    faction: "chaos-space-marine",
    category: "vehicle",
    points: 170,
    wargear: [],
  },

  {
    id: "defiler",
    name: "Defiler",
    faction: "chaos-space-marine",
    category: "vehicle",
    points: 190,
    wargear: [],
  },

  {
    id: "deredeo-dreadnought",
    name: "Deredeo Dreadnought",
    faction: "chaos-space-marine",
    category: "vehicle",
    points: 170,
    wargear: [],
  },

  {
    id: "falchion",
    name: "Falchion",
    faction: "chaos-space-marine",
    category: "vehicle",
    points: 515,
    wargear: [],
  },

  {
    id: "fellblade",
    name: "Fellblade",
    faction: "chaos-space-marine",
    category: "vehicle",
    points: 535,
    wargear: [],
  },

  {
    id: "fire-raptor-gunship",
    name: "Fire Raptor Gunship",
    faction: "chaos-space-marine",
    category: "vehicle",
    points: 290,
    wargear: [],
  },

  {
    id: "forgefiend",
    name: "Forgefiend",
    faction: "chaos-space-marine",
    category: "vehicle",
    points: 180,
    wargear: [],
  },

  {
    id: "greater-blight-drone",
    name: "Greater Blight Drone",
    faction: "chaos-space-marine",
    category: "vehicle",
    points: 150,
    wargear: [],
  },

  {
    id: "greater-brass-scorpion",
    name: "Greater Brass Scorpion",
    faction: "chaos-space-marine",
    category: "vehicle",
    points: 560,
    wargear: [],
  },

  {
    id: "helbrute",
    name: "Helbrute",
    faction: "chaos-space-marine",
    category: "vehicle",
    points: 130,
    wargear: [],
  },

  {
    id: "heldrake",
    name: "Heldrake",
    faction: "chaos-space-marine",
    category: "vehicle",
    points: 205,
    wargear: [],
  },

  {
    id: "hell-blade",
    name: "Hell Blade",
    faction: "chaos-space-marine",
    category: "vehicle",
    points: 115,
    wargear: [],
  },

  {
    id: "hell-talon",
    name: "Hell Talon",
    faction: "chaos-space-marine",
    category: "vehicle",
    points: 140,
    wargear: [],
  },

  {
    id: "khorne-lord-of-skulls",
    name: "Khorne Lord Of Skulls",
    faction: "chaos-space-marine",
    category: "vehicle",
    points: 450,
    wargear: [],
  },

  {
    id: "kratos",
    name: "Kratos",
    faction: "chaos-space-marine",
    category: "vehicle",
    points: 265,
    wargear: [],
  },

  {
    id: "kytan-ravager",
    name: "Kytan Ravager",
    faction: "chaos-space-marine",
    category: "vehicle",
    points: 425,
    wargear: [],
  },

  {
    id: "leviathan-dreadnought",
    name: "Leviathan Dreadnought",
    faction: "chaos-space-marine",
    category: "vehicle",
    points: 215,
    wargear: [],
  },

  {
    id: "maulerfiend",
    name: "Maulerfiend",
    faction: "chaos-space-marine",
    category: "vehicle",
    points: 130,
    defaultWargear: [
      {
        id: "maulerfiend-fists",
        name: "Maulerfiend fists",
        image: "",
        profiles: [{ range: "Melee", attacks: "6", skill: "3+", strength: "14", ap: "-2", damage: "D6+1" }],
      },
    ],
    wargear: [
      {
        id: "maulerfiend-lasher-tendrils",
        name: "Lasher tendrils",
        image: "",
        profiles: [{ range: "Melee", attacks: "6", skill: "3+", strength: "7", ap: "-1", damage: "1", keywords: ["EXTRA ATTACKS"] }],
      },
      {
        id: "maulerfiend-magma-cutters",
        name: "Magma cutters",
        image: "",
        profiles: [{ range: '6"', attacks: "2", skill: "3+", strength: "9", ap: "-4", damage: "D6", keywords: ["MELTA 2"] }],
      },
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
  },

  {
    id: "rapier-carrier",
    name: "Rapier Carrier",
    faction: "chaos-space-marine",
    category: "vehicle",
    points: 100,
    wargear: [],
  },

  {
    id: "relic-contemptor-dreadnought",
    name: "Relic Contemptor Dreadnought",
    faction: "chaos-space-marine",
    category: "vehicle",
    points: 180,
    wargear: [],
  },

  {
    id: "sicaran-battle-tank",
    name: "Sicaran Battle Tank",
    faction: "chaos-space-marine",
    category: "vehicle",
    points: 220,
    wargear: [],
  },

  {
    id: "sicaran-punisher",
    name: "Sicaran Punisher",
    faction: "chaos-space-marine",
    category: "vehicle",
    points: 220,
    wargear: [],
  },

  {
    id: "sicaran-venator",
    name: "Sicaran Venator",
    faction: "chaos-space-marine",
    category: "vehicle",
    points: 220,
    wargear: [],
  },

  {
    id: "typhon",
    name: "Typhon",
    faction: "chaos-space-marine",
    category: "vehicle",
    points: 385,
    wargear: [],
  },

  {
    id: "venomcrawler",
    name: "Venomcrawler",
    faction: "chaos-space-marine",
    category: "vehicle",
    points: 120,
    wargear: [],
  },

  {
    id: "whirlwind-scorpius",
    name: "Whirlwind Scorpius",
    faction: "chaos-space-marine",
    category: "vehicle",
    points: 115,
    wargear: [],
  },

  {
    id: "xiphon-interceptor",
    name: "Xiphon Interceptor",
    faction: "chaos-space-marine",
    category: "vehicle",
    points: 115,
    wargear: [],
  },

  {
    id: "heretic-astartes-daemon-prince",
    name: "Heretic Astartes Daemon Prince",
    faction: "chaos-space-marine",
    category: "monster",
    points: 165,
    wargear: [],
  },

  {
    id: "heretic-astartes-daemon-prince-with-wings",
    name: "Heretic Astartes Daemon Prince With Wings",
    faction: "chaos-space-marine",
    category: "monster",
    points: 180,
    wargear: [],
  },

  {
    id: "vashtorr-the-arkifane",
    name: "Vashtorr The Arkifane",
    faction: "chaos-space-marine",
    category: "monster",
    points: 175,
    wargear: [],
  },

  {
    id: "chaos-land-raider",
    name: "Chaos Land Raider",
    faction: "chaos-space-marine",
    category: "transport",
    points: 240,
    wargear: [],
  },

  {
    id: "chaos-rhino",
    name: "Chaos Rhino",
    faction: "chaos-space-marine",
    category: "transport",
    points: 75,
    transportCapacity: 12,
    defaultWargear: [
      {
        id: "chaos-rhino-combi-bolter",
        name: "Combi-bolter",
        image: "",
        profiles: [{ range: '24"', attacks: "2", skill: "3+", strength: "4", ap: "0", damage: "1", keywords: ["RAPID FIRE 2"] }],
      },
      {
        id: "chaos-rhino-armoured-tracks",
        name: "Armoured tracks",
        image: "",
        profiles: [{ range: "Melee", attacks: "3", skill: "4+", strength: "6", ap: "0", damage: "1" }],
      },
    ],
    wargear: [
      {
        id: "chaos-rhino-combi-weapon",
        name: "Combi-weapon",
        image: "",
        profiles: [{ range: '24"', attacks: "1", skill: "4+", strength: "4", ap: "0", damage: "1", keywords: ["ANTI-INFANTRY 4+", "DEVASTATING WOUNDS", "RAPID FIRE 1"] }],
      },
      {
        id: "chaos-rhino-havoc-launcher",
        name: "Havoc launcher",
        image: "",
        profiles: [{ range: '48"', attacks: "D6", skill: "3+", strength: "5", ap: "0", damage: "1", keywords: ["BLAST"] }],
      },
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
  },

  {
    id: "chaos-thunderhawk",
    name: "Chaos Thunderhawk",
    faction: "chaos-space-marine",
    category: "transport",
    points: 840,
    wargear: [],
  },

  {
    id: "dreadclaw-drop-pod",
    name: "Dreadclaw Drop Pod",
    faction: "chaos-space-marine",
    category: "transport",
    points: 115,
    wargear: [],
  },

  {
    id: "kharybdis-assault-claw",
    name: "Kharybdis Assault Claw",
    faction: "chaos-space-marine",
    category: "transport",
    points: 325,
    wargear: [],
  },

  {
    id: "land-raider-achilles",
    name: "Land Raider Achilles",
    faction: "chaos-space-marine",
    category: "transport",
    points: 285,
    wargear: [],
  },

  {
    id: "land-raider-proteus",
    name: "Land Raider Proteus",
    faction: "chaos-space-marine",
    category: "transport",
    points: 250,
    wargear: [],
  },

  {
    id: "mastodon",
    name: "Mastodon",
    faction: "chaos-space-marine",
    category: "transport",
    points: 610,
    wargear: [],
  },

  {
    id: "sokar-pattern-stormbird",
    name: "Sokar Pattern Stormbird",
    faction: "chaos-space-marine",
    category: "transport",
    points: 1100,
    wargear: [],
  },

  {
    id: "spartan",
    name: "Spartan",
    faction: "chaos-space-marine",
    category: "transport",
    points: 315,
    wargear: [],
  },

  {
    id: "storm-eagle-gunship",
    name: "Storm Eagle Gunship",
    faction: "chaos-space-marine",
    category: "transport",
    points: 255,
    wargear: [],
  },

  {
    id: "terrax-pattern-termite",
    name: "Terrax Pattern Termite",
    faction: "chaos-space-marine",
    category: "transport",
    points: 200,
    wargear: [],
  },

];
