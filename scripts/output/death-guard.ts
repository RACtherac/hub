import type { Unit } from "../../src/types/warhammer";

export const deathGuardUnits: Unit[] = [

  {
    id: "plague-marines",
    name: "Plague Marines",
    faction: "death-guard",
    category: "battleline",
    imageCredit: "Oscar // Alana",
    points: 95,
    modelCountOptions: [5, 7, 10],
    pointsByModelCount: { 5: 95, 7: 130, 10: 190 },
    defaultWargear: [
      { id: "plague-boltgun", name: "Plague boltgun", image: "", profiles: [{ range: '24"', attacks: "2", skill: "3+", strength: "4", ap: "0", damage: "1", keywords: ["LETHAL HITS", "RAPID FIRE 1"] }] },
      { id: "plague-knives", name: "Plague knives", image: "", profiles: [{ range: "Melee", attacks: "3", skill: "3+", strength: "4", ap: "0", damage: "1", keywords: ["LETHAL HITS"] }] },
    ],
    wargear: [
      // Champion ranged options (wargear groups)
      { id: "champ-bolt-pistol", name: "Champion: Bolt pistol", image: "", profiles: [{ range: '12"', attacks: "1", skill: "3+", strength: "4", ap: "0", damage: "1", keywords: ["LETHAL HITS", "PISTOL"] }] },
      { id: "champ-plasma-gun", name: "Champion: Plasma gun", image: "", profiles: [
        { profileName: "standard", range: '24"', attacks: "1", skill: "3+", strength: "7", ap: "-2", damage: "1", keywords: ["RAPID FIRE 1"] },
        { profileName: "supercharge", range: '24"', attacks: "1", skill: "3+", strength: "8", ap: "-3", damage: "2", keywords: ["HAZARDOUS", "RAPID FIRE 1"] },
      ]},
      { id: "champ-plasma-pistol", name: "Champion: Plasma pistol", image: "", profiles: [
        { profileName: "standard", range: '12"', attacks: "1", skill: "3+", strength: "7", ap: "-2", damage: "1", keywords: ["PISTOL"] },
        { profileName: "supercharge", range: '12"', attacks: "1", skill: "3+", strength: "8", ap: "-3", damage: "2", keywords: ["HAZARDOUS", "PISTOL"] },
      ]},
      // Champion melee options (wargear groups)
      { id: "champ-bubotic-weapons", name: "Champion: Bubotic weapons", image: "", profiles: [{ range: "Melee", attacks: "4", skill: "3+", strength: "5", ap: "-2", damage: "1", keywords: ["LETHAL HITS"] }] },
      { id: "champ-power-fist", name: "Champion: Power fist", image: "", profiles: [{ range: "Melee", attacks: "3", skill: "3+", strength: "8", ap: "-2", damage: "2", keywords: ["LETHAL HITS"] }] },
      // Hidden weapons (used by notes via weaponId/weaponIds — filtered from selector)
      { id: "blight-launcher", name: "Blight launcher", image: "", profiles: [{ range: '24"', attacks: "D3", skill: "3+", strength: "6", ap: "-1", damage: "2", keywords: ["BLAST", "LETHAL HITS"] }] },
      { id: "plague-spewer", name: "Plague spewer", image: "", profiles: [{ range: '12"', attacks: "D6", skill: "N/A", strength: "5", ap: "-1", damage: "1", keywords: ["ANTI-INFANTRY 2+", "IGNORES COVER", "TORRENT"] }] },
      { id: "meltagun", name: "Meltagun", image: "", profiles: [{ range: '12"', attacks: "1", skill: "3+", strength: "9", ap: "-4", damage: "D6", keywords: ["MELTA 2"] }] },
      { id: "plague-belcher", name: "Plague belcher", image: "", profiles: [{ range: '12"', attacks: "D6", skill: "N/A", strength: "4", ap: "0", damage: "1", keywords: ["ANTI-INFANTRY 4+", "IGNORES COVER", "TORRENT"] }] },
      { id: "plasma-gun", name: "Plasma gun", image: "", profiles: [
        { profileName: "standard", range: '24"', attacks: "1", skill: "3+", strength: "7", ap: "-2", damage: "1", keywords: ["RAPID FIRE 1"] },
        { profileName: "supercharge", range: '24"', attacks: "1", skill: "3+", strength: "8", ap: "-3", damage: "2", keywords: ["HAZARDOUS", "RAPID FIRE 1"] },
      ]},
      { id: "bubotic-weapons", name: "Bubotic weapons", image: "", profiles: [{ range: "Melee", attacks: "4", skill: "3+", strength: "5", ap: "-2", damage: "1", keywords: ["LETHAL HITS"] }] },
      { id: "heavy-plague-weapon", name: "Heavy plague weapon", image: "", profiles: [{ range: "Melee", attacks: "3", skill: "4+", strength: "8", ap: "-2", damage: "2", keywords: ["LETHAL HITS"] }] },
      { id: "icon-of-despair", name: "Icon of Despair", image: "", note: "Icon of Despair (Aura): While an enemy unit is within 6\" of the bearer, worsen the Leadership characteristic of models in that unit by 1." },
    ],
    wargearGroups: [
      ["champ-bolt-pistol", "champ-plasma-gun", "champ-plasma-pistol"],
      ["champ-bubotic-weapons", "champ-power-fist"],
    ],
    notes: [
      {
        id: "blight-launcher",
        text: "1 Plague Marine's boltgun can be replaced with 1 blight launcher.",
        textByModelCount: { 10: "2 Plague Marines' boltguns can each be replaced with 1 blight launcher." },
        checkbox: true,
        weaponId: "blight-launcher",
        maxCountByModelCount: { 5: 1, 7: 1, 10: 2 },
      },
      {
        id: "plague-spewer-note",
        text: "1 Plague Marine's boltgun can be replaced with 1 plague spewer.",
        textByModelCount: { 10: "2 Plague Marines' boltguns can each be replaced with 1 plague spewer." },
        checkbox: true,
        weaponId: "plague-spewer",
        maxCountByModelCount: { 5: 1, 7: 1, 10: 2 },
      },
      {
        id: "special-weapon",
        text: "1 Plague Marine's boltgun can be replaced with a special weapon.",
        textByModelCount: { 10: "2 Plague Marines' boltguns can each be replaced with a special weapon." },
        checkbox: true,
        weaponIds: ["meltagun", "plague-belcher", "plasma-gun"],
        maxCountByModelCount: { 5: 1, 7: 1, 10: 2 },
      },
      {
        id: "bubotic-weapons-swap",
        text: "Up to 2 Plague Marines can each have their plague knives replaced with bubotic weapons.",
        textByModelCount: { 10: "Up to 4 Plague Marines can each have their plague knives replaced with bubotic weapons." },
        checkbox: true,
        weaponId: "bubotic-weapons",
        maxCountByModelCount: { 5: 2, 7: 2, 10: 4 },
      },
      {
        id: "heavy-plague-weapon-swap",
        text: "Up to 2 Plague Marines can each have their plague knives replaced with a heavy plague weapon.",
        textByModelCount: { 10: "Up to 4 Plague Marines can each have their plague knives replaced with a heavy plague weapon." },
        checkbox: true,
        weaponId: "heavy-plague-weapon",
        maxCountByModelCount: { 5: 2, 7: 2, 10: 4 },
      },
      {
        id: "icon-of-despair",
        text: "One Plague Marine equipped with a boltgun can be equipped with 1 icon of despair (boltgun cannot be replaced).",
        checkbox: true,
        weaponId: "icon-of-despair",
      },
    ],
    abilities: [
      {
        name: "Infused with the Blessings of Nurgle",
        description: "In your Shooting phase, each time this unit is selected to shoot, after this unit has shot, select one enemy unit hit by one or more of those attacks. Until the start of your next turn, that enemy unit is Afflicted.",
      },
    ],
    ledBy: ["biologus-putrifier", "foul-blightspawn", "death-guard-icon-bearer", "malignant-plaguecaster", "noxious-blightbringer", "plague-surgeon", "tallyman"],
  },

  {
    id: "blightlord-terminators",
    name: "Blightlord Terminators",
    faction: "death-guard",
    category: "infantry",
    points: 115,
    modelCountOptions: [3, 5, 10],
    pointsByModelCount: { 3: 115, 5: 185, 10: 370 },
    defaultWargear: [
      { id: "combi-bolter", name: "Combi-bolter", image: "", profiles: [{ range: '24"', attacks: "2", skill: "3+", strength: "4", ap: "0", damage: "1", keywords: ["LETHAL HITS", "RAPID FIRE 2"] }] },
      { id: "bubotic-blade", name: "Bubotic blade", image: "", profiles: [{ range: "Melee", attacks: "3", skill: "3+", strength: "5", ap: "-2", damage: "2", keywords: ["LETHAL HITS"] }] },
    ],
    wargear: [
      { id: "combi-weapon", name: "Combi-weapon", image: "", countable: true, maxCountByModelCount: { 5: 3, 10: 6 }, profiles: [{ range: '24"', attacks: "1", skill: "4+", strength: "4", ap: "0", damage: "1", keywords: ["ANTI-INFANTRY 4+", "DEVASTATING WOUNDS", "RAPID FIRE 1"] }] },
      { id: "flail-of-corruption", name: "Flail of corruption", image: "", countable: true, maxCountByModelCount: { 5: 1, 10: 2 }, profiles: [{ range: "Melee", attacks: "6", skill: "3+", strength: "5", ap: "-1", damage: "2", keywords: ["LETHAL HITS"] }] },
      { id: "blight-launcher", name: "Blight launcher", image: "", countable: true, maxCountByModelCount: { 5: 1, 10: 2 }, profiles: [{ range: '24"', attacks: "D3", skill: "3+", strength: "6", ap: "-1", damage: "2", keywords: ["BLAST", "LETHAL HITS"] }] },
      { id: "reaper-autocannon", name: "Reaper autocannon", image: "", countable: true, maxCountByModelCount: { 5: 1, 10: 2 }, profiles: [{ range: '36"', attacks: "4", skill: "3+", strength: "7", ap: "-1", damage: "1", keywords: ["DEVASTATING WOUNDS", "SUSTAINED HITS 1"] }] },
      { id: "plague-spewer", name: "Plague spewer", image: "", countable: true, maxCountByModelCount: { 5: 1, 10: 2 }, profiles: [{ range: '12"', attacks: "D6", skill: "N/A", strength: "5", ap: "-1", damage: "1", keywords: ["ANTI-INFANTRY 2+", "IGNORES COVER", "TORRENT"] }] },
      { id: "plague-spewer-and-ccw", name: "Plague spewer & Close combat weapon", image: "", profiles: [{ profileName: "Plague spewer", range: '12"', attacks: "D6", skill: "N/A", strength: "5", ap: "-1", damage: "1", keywords: ["ANTI-INFANTRY 2+", "IGNORES COVER", "TORRENT"] }, { profileName: "Close combat weapon", range: "Melee", attacks: "3", skill: "3+", strength: "4", ap: "0", damage: "1" }] },
    ],
    notes: [
      {
        id: "combi-weapon-swap",
        text: "For every 5 models, up to 3 models' combi-bolters can each be replaced with 1 combi-weapon:",
        checkbox: true,
        image: "",
        triggersWargear: ["combi-weapon"],
        showForModelCounts: [5, 10],
      },
      {
        id: "flail-swap",
        text: "For every 5 models, 1 model's combi-bolter and bubotic blade can be replaced with 1 flail of corruption:",
        textByModelCount: { 10: "For every 5 models, up to 2 models' combi-bolters and bubotic blades can each be replaced with 1 flail of corruption:" },
        checkbox: true,
        image: "",
        triggersWargear: ["flail-of-corruption"],
        showForModelCounts: [5, 10],
      },
      {
        id: "blight-launcher-swap",
        text: "For every 5 models, 1 model's combi-bolter can be replaced with 1 blight launcher:",
        textByModelCount: { 10: "For every 5 models, up to 2 models' combi-bolters can each be replaced with 1 blight launcher:" },
        checkbox: true,
        image: "",
        triggersWargear: ["blight-launcher"],
        showForModelCounts: [5, 10],
      },
      {
        id: "reaper-autocannon-swap",
        text: "For every 5 models, 1 model's combi-bolter can be replaced with 1 reaper autocannon:",
        textByModelCount: { 10: "For every 5 models, up to 2 models' combi-bolters can each be replaced with 1 reaper autocannon:" },
        checkbox: true,
        image: "",
        triggersWargear: ["reaper-autocannon"],
        showForModelCounts: [5, 10],
      },
      {
        id: "plague-spewer-swap",
        text: "For every 5 models, 1 model's combi-bolter can be replaced with 1 plague spewer:",
        textByModelCount: { 10: "For every 5 models, up to 2 models' combi-bolters can each be replaced with 1 plague spewer:" },
        checkbox: true,
        image: "",
        triggersWargear: ["plague-spewer"],
        showForModelCounts: [5, 10],
      },
      {
        id: "plague-spewer-3-swap",
        text: "1 model's combi-bolter and bubotic blade can be replaced with 1 plague spewer and 1 close combat weapon:",
        checkbox: true,
        image: "",
        triggersWargear: ["plague-spewer-and-ccw"],
        showForModelCounts: [3],
      },
    ],
    abilities: [
      {
        name: "Blistering Fusillade",
        description: "If this unit has a Starting Strength of 5 or more, or if a CHARACTER is leading this unit, then each time a model in this unit makes a ranged attack that targets an Afflicted unit, improve the Strength and Armour Penetration characteristics of that attack by 1.",
      },
    ],
    ledBy: ["death-guard-chaos-lord-in-terminator-armour","death-guard-sorcerer-in-terminator-armour","lord-of-contagion","lord-of-virulence","typhus"],
  },

  {
    id: "death-guard-chaos-spawn",
    name: "Death Guard Chaos Spawn",
    faction: "death-guard",
    category: "infantry",
    modelCountOptions: [2],
    pointsByModelCount: { 2: 80 },
    defaultWargear: [
      { id: "dg-hideous-mutations", name: "Hideous mutations", image: "", profiles: [{ range: "Melee", attacks: "D6+2", skill: "4+", strength: "5", ap: "-1", damage: "2" }] },
    ],
    wargear: [],
    abilities: [
      {
        name: "Lethal Ichor",
        description: "Each time a melee attack is allocated to a model in this unit, after the attacking unit has finished making its attacks, roll one D6 (to a maximum of six D6 per attacking unit): for each 4+, the attacking unit suffers 1 mortal wound.",
      },
    ],
    ledBy: [],
  },

  {
    id: "death-guard-cultists",
    name: "Death Guard Cultists",
    faction: "death-guard",
    category: "infantry",
    points: 50,
    defaultWargear: [
      { id: "cultist-firearm", name: "Cultist firearm", image: "" },
      { id: "brutal-assault-weapon", name: "Brutal assault weapon", image: "" },
    ],
    wargear: [
      { id: "flamer", name: "Flamer", image: "" },
      { id: "grenade-launcher-frag", name: "Grenade launcher – frag", image: "" },
      { id: "grenade-launcher-krak", name: "Grenade launcher – krak", image: "" },
      { id: "heavy-stubber", name: "Heavy stubber", image: "" },
    ],
    ledBy: [],
  },

  {
    id: "death-guard-possessed",
    name: "Death Guard Possessed",
    faction: "death-guard",
    category: "infantry",
    points: 155,
    defaultWargear: [
      { id: "hideous-mutations", name: "Hideous mutations", image: "" },
    ],
    wargear: [],
    ledBy: [],
  },

  {
    id: "deathshroud-terminators",
    name: "Deathshroud Terminators",
    faction: "death-guard",
    category: "infantry",
    image3: "/Warhammerimages/Death guard/Deathshroud terminators-3.png",
    image6: "/Warhammerimages/Death guard/Deathshroud terminators-6.png",
    imageCredit: "Oscar Hugosson",
    points: 160,
    pointsByModelCount: { 3: 160, 6: 320 },
    modelCountOptions: [3, 6],
    abilities: [
      {
        name: "Silent Bodyguard",
        description: "While a CHARACTER model is leading this unit, that CHARACTER model has the Feel No Pain 4+ ability.",
      },
      {
        name: "Death Approaches",
        description: "In your Movement phase, when this unit is set up on the battlefield using the Deep Strike ability, it can be set up anywhere on the battlefield that is more than 6\" horizontally away from all Afflicted enemy units, and more than 9\" horizontally away from all other enemy units.",
      },
    ],
    defaultWargear: [
      { id: "plaguespurt-gauntlet", name: "Plaguespurt gauntlet", image: "" },
      { id: "manreaper", name: "Manreaper", image: "" },
    ],
    wargear: [
      { id: "plaguespurt-gauntlet-champion", name: "Plaguespurt gauntlet", image: "/Warhammerimages/Death guard/Plaugespwer gauntlet.png", note: "The Deathshroud Champion can be equipped with 1 additional plaguespurt gauntlet." },
      { id: "icon-of-despair", name: "Icon of despair", image: "/Warhammerimages/Death guard/Deathshroud terminators icon of despair.png", note: "Icon of Despair (Aura): While an enemy unit is within 6\" of the bearer, worsen the Leadership characteristic of models in that unit by 1." },
    ],
    ledBy: ["death-guard-chaos-lord-in-terminator-armour","death-guard-sorcerer-in-terminator-armour","lord-of-contagion","lord-of-virulence","typhus"],
  },

  {
    id: "gellerpox-infected",
    name: "Gellerpox Infected",
    faction: "death-guard",
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
    id: "miasmic-malignifier",
    name: "Miasmic Malignifier",
    faction: "death-guard",
    category: "infantry",
    points: 115,
    defaultWargear: [
      { id: "noxious-stink", name: "Noxious stink", image: "" },
    ],
    wargear: [],
    ledBy: [],
  },

  {
    id: "mutoid-vermin",
    name: "Mutoid Vermin",
    faction: "death-guard",
    category: "infantry",
    points: 85,
    defaultWargear: [
      { id: "diseased-claws-and-fangs", name: "Diseased claws and fangs", image: "" },
    ],
    wargear: [],
    ledBy: [],
  },

  {
    id: "poxwalkers",
    name: "Poxwalkers",
    faction: "death-guard",
    category: "infantry",
    points: 65,
    pointsByModelCount: { 10: 65, 20: 130 },
    modelCountOptions: [10, 20],
    abilities: [
      {
        name: "Curse of the Walking Pox",
        description: "Each time a POXWALKER model in this unit makes an attack that destroys an enemy model (excluding MONSTER and VEHICLE models), after this unit has resolved its attacks, you can return one destroyed POXWALKER model to this unit.\n\nWhile TYPHUS is leading this unit, enemy models destroyed as a result of TYPHUS' Eater Plague ability count as enemy models destroyed by an attack made by a POXWALKER model in this unit for the purposes of this ability.",
      },
    ],
    defaultWargear: [
      { id: "improvised-weapon", name: "Improvised weapon", image: "" },
    ],
    wargear: [],
    ledBy: ["malignant-plaguecaster", "noxious-blightbringer", "typhus"],
  },

  {
    id: "cerberus",
    name: "Cerberus",
    faction: "death-guard",
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
    id: "death-guard-defiler",
    name: "Death Guard Defiler",
    faction: "death-guard",
    category: "vehicle",
    points: 190,
    defaultWargear: [
      { id: "defiler-cannon", name: "Defiler cannon", image: "" },
      { id: "reaper-autocannon", name: "Reaper autocannon", image: "" },
      { id: "twin-heavy-flamer", name: "Twin heavy flamer", image: "" },
      { id: "defiler-claws", name: "Defiler claws", image: "" },
    ],
    wargear: [
      { id: "combi-weapon", name: "Combi-weapon", image: "" },
      { id: "havoc-launcher", name: "Havoc launcher", image: "" },
      { id: "plague-combi-bolter", name: "Plague combi-bolter", image: "" },
      { id: "twin-lascannon", name: "Twin lascannon", image: "" },
      { id: "twin-plague-heavy-bolter", name: "Twin plague heavy bolter", image: "" },
      { id: "defiler-scourge", name: "Defiler scourge", image: "" },
    ],
    ledBy: [],
  },

  {
    id: "dg-defiler",
    name: "Defiler",
    faction: "death-guard",
    category: "vehicle",
    points: 250,
    defaultWargear: [
      { id: "dg-defiler-shearing-claws", name: "Shearing claws", image: "", profiles: [
        { profileName: "strike", range: "Melee", attacks: "5", skill: "3+", strength: "16", ap: "-3", damage: "D6+1", keywords: ["LETHAL HITS"] },
        { profileName: "sweep", range: "Melee", attacks: "10", skill: "3+", strength: "6", ap: "-2", damage: "1", keywords: ["LETHAL HITS"] },
      ]},
    ],
    wargear: [
      { id: "dg-defiler-hades-bc", name: "Hades battle cannon", image: "", profiles: [{ range: '48"', attacks: "D6+3", skill: "3+", strength: "10", ap: "-1", damage: "3", keywords: ["BLAST", "LETHAL HITS"] }] },
      { id: "dg-defiler-ecto-destructor", name: "Ectoplasma destructor", image: "", profiles: [{ range: '36"', attacks: "D6", skill: "3+", strength: "12", ap: "-3", damage: "3", keywords: ["BLAST", "LETHAL HITS"] }] },
      { id: "dg-defiler-excruciator", name: "Excruciator cannon", image: "", profiles: [{ range: '36"', attacks: "6", skill: "3+", strength: "6", ap: "-1", damage: "2", keywords: ["LETHAL HITS"] }] },
      { id: "dg-defiler-magma-cutters", name: "Magma cutters", image: "", profiles: [{ range: '12"', attacks: "2", skill: "3+", strength: "9", ap: "-4", damage: "D6", keywords: ["LETHAL HITS", "MELTA 2"] }] },
      { id: "dg-defiler-baleflamer", name: "Heavy baleflamer", image: "", profiles: [{ range: '12"', attacks: "D6+3", skill: "N/A", strength: "7", ap: "-2", damage: "2", keywords: ["IGNORES COVER", "TORRENT"] }] },
      { id: "dg-defiler-lascannon-a", name: "Hades lascannon", image: "", profiles: [{ range: '48"', attacks: "2", skill: "3+", strength: "12", ap: "-3", damage: "D6+1", keywords: ["LETHAL HITS"] }] },
      { id: "dg-defiler-reaper-a", name: "Heavy reaper autocannon", image: "", profiles: [{ range: '48"', attacks: "4", skill: "3+", strength: "9", ap: "-1", damage: "3", keywords: ["DEVASTATING WOUNDS", "LETHAL HITS", "SUSTAINED HITS 1"] }] },
      { id: "dg-defiler-electroscourge-a", name: "Electroscourge", image: "", profiles: [{ range: "Melee", attacks: "5", skill: "3+", strength: "12", ap: "-2", damage: "2", keywords: ["EXTRA ATTACKS", "SUSTAINED HITS 2"] }] },
      { id: "dg-defiler-missile-launcher", name: "Heavy missile launcher", image: "", profiles: [
        { profileName: "krak", range: '48"', attacks: "2", skill: "3+", strength: "10", ap: "-2", damage: "D6+1", keywords: ["LETHAL HITS"] },
        { profileName: "frag", range: '48"', attacks: "2D6", skill: "3+", strength: "5", ap: "-1", damage: "1", keywords: ["BLAST", "LETHAL HITS"] },
      ]},
      { id: "dg-defiler-lascannon-b", name: "Hades lascannon", image: "", profiles: [{ range: '48"', attacks: "2", skill: "3+", strength: "12", ap: "-3", damage: "D6+1", keywords: ["LETHAL HITS"] }] },
      { id: "dg-defiler-reaper-b", name: "Heavy reaper autocannon", image: "", profiles: [{ range: '48"', attacks: "4", skill: "3+", strength: "9", ap: "-1", damage: "3", keywords: ["DEVASTATING WOUNDS", "LETHAL HITS", "SUSTAINED HITS 1"] }] },
      { id: "dg-defiler-electroscourge-b", name: "Electroscourge", image: "", profiles: [{ range: "Melee", attacks: "5", skill: "3+", strength: "12", ap: "-2", damage: "2", keywords: ["EXTRA ATTACKS", "SUSTAINED HITS 2"] }] },
    ],
    notes: [
      { id: "dg-defiler-note-hbc", text: "Hades battle cannon", checkbox: true, weaponId: "dg-defiler-hades-bc", exclusiveWith: "dg-defiler-note-ecto" },
      { id: "dg-defiler-note-ecto", text: "Ectoplasma destructor", checkbox: true, weaponId: "dg-defiler-ecto-destructor", exclusiveWith: "dg-defiler-note-hbc" },
      { id: "dg-defiler-note-excruciator", text: "Excruciator cannons", checkbox: true, weaponId: "dg-defiler-excruciator", exclusiveWith: "dg-defiler-note-magma" },
      { id: "dg-defiler-note-magma", text: "Magma cutters", checkbox: true, weaponId: "dg-defiler-magma-cutters", exclusiveWith: "dg-defiler-note-excruciator" },
      { id: "dg-defiler-note-baleflamer", text: "Heavy baleflamer", checkbox: true, weaponId: "dg-defiler-baleflamer", exclusiveWith: ["dg-defiler-note-lascannon-a", "dg-defiler-note-reaper-a", "dg-defiler-note-escourge-a"] },
      { id: "dg-defiler-note-lascannon-a", text: "Hades lascannon", checkbox: true, weaponId: "dg-defiler-lascannon-a", exclusiveWith: ["dg-defiler-note-baleflamer", "dg-defiler-note-reaper-a", "dg-defiler-note-escourge-a"] },
      { id: "dg-defiler-note-reaper-a", text: "Heavy reaper autocannon", checkbox: true, weaponId: "dg-defiler-reaper-a", exclusiveWith: ["dg-defiler-note-baleflamer", "dg-defiler-note-lascannon-a", "dg-defiler-note-escourge-a"] },
      { id: "dg-defiler-note-escourge-a", text: "Electroscourge", checkbox: true, weaponId: "dg-defiler-electroscourge-a", exclusiveWith: ["dg-defiler-note-baleflamer", "dg-defiler-note-lascannon-a", "dg-defiler-note-reaper-a", "dg-defiler-note-escourge-b"] },
      { id: "dg-defiler-note-missile", text: "Heavy missile launcher", checkbox: true, weaponId: "dg-defiler-missile-launcher", exclusiveWith: ["dg-defiler-note-lascannon-b", "dg-defiler-note-reaper-b", "dg-defiler-note-escourge-b"] },
      { id: "dg-defiler-note-lascannon-b", text: "Hades lascannon", checkbox: true, weaponId: "dg-defiler-lascannon-b", exclusiveWith: ["dg-defiler-note-missile", "dg-defiler-note-reaper-b", "dg-defiler-note-escourge-b"] },
      { id: "dg-defiler-note-reaper-b", text: "Heavy reaper autocannon", checkbox: true, weaponId: "dg-defiler-reaper-b", exclusiveWith: ["dg-defiler-note-missile", "dg-defiler-note-lascannon-b", "dg-defiler-note-escourge-b"] },
      { id: "dg-defiler-note-escourge-b", text: "Electroscourge", checkbox: true, weaponId: "dg-defiler-electroscourge-b", exclusiveWith: ["dg-defiler-note-missile", "dg-defiler-note-lascannon-b", "dg-defiler-note-reaper-b", "dg-defiler-note-escourge-a"] },
    ],
    abilities: [
      {
        name: "Scuttling Walker",
        description: "Each time this unit makes a Normal, Advance or Fall Back move, it can move through models (excluding TITANIC models) and terrain features. When doing so, it can move within Engagement Range of enemy models, but cannot end that move within Engagement Range of them, and any Desperate Escape test is automatically passed.",
      },
      {
        name: "Barrage of Filth",
        description: "In your Shooting phase, after this model has shot, select one enemy unit hit by one or more of those attacks. Until the end of the phase, that unit cannot have the Benefit of Cover.",
      },
      {
        name: "Damaged: 1-6 Wounds Remaining",
        description: "While this model has 1-6 wounds remaining, each time this model makes an attack, subtract 1 from the Hit roll.",
      },
    ],
    ledBy: [],
  },

  {
    id: "death-guard-helbrute",
    name: "Death Guard Helbrute",
    faction: "death-guard",
    category: "vehicle",
    points: 115,
    defaultWargear: [
      { id: "dgh-close-combat-weapon", name: "Close combat weapon", image: "", profiles: [{ range: "Melee", attacks: "5", skill: "3+", strength: "6", ap: "0", damage: "1" }] },
    ],
    wargear: [
      // Ranged arm – pick one
      { id: "dgh-multi-melta", name: "Multi-melta", image: "", wargearGroup: "dgh-ranged", profiles: [{ range: '18"', attacks: "2", skill: "3+", strength: "9", ap: "-4", damage: "D6", keywords: ["LETHAL HITS", "MELTA 2"] }] },
      { id: "dgh-plasma-cannon", name: "Plasma cannon", image: "", wargearGroup: "dgh-ranged", profiles: [{ range: '36"', attacks: "D3", skill: "3+", strength: "8", ap: "-3", damage: "3", keywords: ["BLAST", "HAZARDOUS", "LETHAL HITS"] }] },
      { id: "dgh-twin-autocannon", name: "Twin autocannon", image: "", wargearGroup: "dgh-ranged", profiles: [{ range: '48"', attacks: "2", skill: "3+", strength: "10", ap: "-1", damage: "3", keywords: ["LETHAL HITS", "TWIN-LINKED"] }] },
      { id: "dgh-twin-heavy-bolter", name: "Twin heavy bolter", image: "", wargearGroup: "dgh-ranged", profiles: [{ range: '36"', attacks: "3", skill: "3+", strength: "5", ap: "-1", damage: "2", keywords: ["LETHAL HITS", "SUSTAINED HITS 1", "TWIN-LINKED"] }] },
      { id: "dgh-twin-lascannon", name: "Twin lascannon", image: "", wargearGroup: "dgh-ranged", profiles: [{ range: '48"', attacks: "1", skill: "3+", strength: "12", ap: "-3", damage: "D6+1", keywords: ["TWIN-LINKED"] }] },
      { id: "dgh-fist-arm", name: "Helbrute fist", image: "", wargearGroup: "dgh-ranged", profiles: [{ range: "Melee", attacks: "5", skill: "3+", strength: "12", ap: "-2", damage: "3" }] },
      // Melee arm – pick one
      { id: "dgh-missile-launcher", name: "Missile launcher", image: "", wargearGroup: "dgh-melee", profiles: [{ profileName: "► Missile launcher – frag", range: '48"', attacks: "D6", skill: "3+", strength: "4", ap: "0", damage: "1", keywords: ["BLAST"] }, { profileName: "► Missile launcher – krak", range: '48"', attacks: "1", skill: "3+", strength: "9", ap: "-2", damage: "D6" }] },
      { id: "dgh-fist", name: "Helbrute fist", image: "", wargearGroup: "dgh-melee", profiles: [{ range: "Melee", attacks: "5", skill: "3+", strength: "12", ap: "-2", damage: "3" }] },
      { id: "dgh-hammer", name: "Helbrute hammer", image: "", wargearGroup: "dgh-melee", profiles: [{ range: "Melee", attacks: "4", skill: "3+", strength: "14", ap: "-3", damage: "D6+1" }] },
      { id: "dgh-power-scourge", name: "Power scourge", image: "", wargearGroup: "dgh-melee", profiles: [{ range: "Melee", attacks: "8", skill: "3+", strength: "7", ap: "-1", damage: "2" }] },
      // Torso weapon (only if Helbrute fist taken for ranged arm) – pick one
      { id: "dgh-combi-bolter", name: "Combi-bolter", image: "", wargearGroup: "dgh-torso", profiles: [{ range: '24"', attacks: "2", skill: "3+", strength: "4", ap: "0", damage: "1", keywords: ["LETHAL HITS", "RAPID FIRE 2"] }] },
      { id: "dgh-heavy-flamer", name: "Heavy flamer", image: "", wargearGroup: "dgh-torso", profiles: [{ range: '12"', attacks: "D6", skill: "N/A", strength: "5", ap: "-1", damage: "1", keywords: ["IGNORES COVER", "TORRENT"] }] },
    ],
    notes: [
      {
        id: "dgh-torso-note",
        text: "If this model is equipped with a Helbrute fist in place of its ranged arm, it can be equipped with one of the following:",
        checkbox: true,
        image: "",
        triggersWargear: ["dgh-combi-bolter", "dgh-heavy-flamer"],
        requiredWargear: ["dgh-fist-arm"],
      },
    ],
    abilities: [
      {
        name: "Diseased Malice",
        description: "Each time this model makes an attack that targets an Afflicted unit, add 1 to the Wound roll.",
      },
      {
        name: "Froth-spattered Frenzy",
        description: "If this model is equipped with two melee weapons in addition to its close combat weapon, add 2 to the Attacks characteristic of those two weapons.",
      },
    ],
    ledBy: [],
  },

  {
    id: "death-guard-predator-annihilator",
    name: "Death Guard Predator Annihilator",
    faction: "death-guard",
    category: "vehicle",
    points: 135,
    defaultWargear: [
      { id: "lascannon", name: "Lascannon", image: "" },
      { id: "predator-twin-lascannon", name: "Predator twin lascannon", image: "" },
      { id: "armoured-tracks", name: "Armoured tracks", image: "" },
    ],
    wargear: [
      { id: "combi-weapon", name: "Combi-weapon", image: "" },
      { id: "plague-combi-bolter", name: "Plague combi-bolter", image: "" },
      { id: "plague-heavy-bolter", name: "Plague heavy bolter", image: "" },
    ],
    ledBy: [],
  },

  {
    id: "death-guard-predator-destructor",
    name: "Death Guard Predator Destructor",
    faction: "death-guard",
    category: "vehicle",
    points: 140,
    defaultWargear: [
      { id: "predator-autocannon", name: "Predator autocannon", image: "" },
      { id: "armoured-tracks", name: "Armoured tracks", image: "" },
    ],
    wargear: [
      { id: "combi-weapon", name: "Combi-weapon", image: "" },
      { id: "lascannon", name: "Lascannon", image: "" },
      { id: "plague-combi-bolter", name: "Plague combi-bolter", image: "" },
      { id: "plague-heavy-bolter", name: "Plague heavy bolter", image: "" },
    ],
    ledBy: [],
  },

  {
    id: "deredeo-dreadnought",
    name: "Deredeo Dreadnought",
    faction: "death-guard",
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
    faction: "death-guard",
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
    faction: "death-guard",
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
    faction: "death-guard",
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
    id: "foetid-bloat-drone",
    name: "Foetid Bloat Drone",
    faction: "death-guard",
    category: "vehicle",
    points: 100,
    defaultWargear: [
      { id: "fbd-plague-probe", name: "Plague probe", image: "", profiles: [{ range: "Melee", attacks: "3", skill: "3+", strength: "6", ap: "-1", damage: "1", keywords: ["LETHAL HITS"] }] },
    ],
    wargear: [
      { id: "fbd-fleshmower", name: "Fleshmower", image: "", profiles: [{ range: "Melee", attacks: "10", skill: "3+", strength: "7", ap: "-1", damage: "2", keywords: ["LETHAL HITS"] }] },
      { id: "fbd-plaguespitter", name: "Plaguespitter", image: "", profiles: [{ range: '12"', attacks: "D6", skill: "N/A", strength: "6", ap: "-1", damage: "1", keywords: ["ANTI-INFANTRY 2+", "IGNORES COVER", "TORRENT"] }] },
    ],
    wargearGroups: [
      ["fbd-fleshmower", "fbd-plaguespitter"],
    ],
    abilities: [
      {
        name: "Hovering Death",
        description: "This model is eligible to shoot and declare a charge in a turn in which it Fell Back.",
      },
    ],
    ledBy: [],
  },

  {
    id: "greater-blight-drone",
    name: "Greater Blight Drone",
    faction: "death-guard",
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
    id: "hell-blade",
    name: "Hell Blade",
    faction: "death-guard",
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
    faction: "death-guard",
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
    id: "kratos",
    name: "Kratos",
    faction: "death-guard",
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
    id: "leviathan-dreadnought",
    name: "Leviathan Dreadnought",
    faction: "death-guard",
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
    id: "myphitic-blight-haulers",
    name: "Myphitic Blight Haulers",
    faction: "death-guard",
    category: "vehicle",
    modelCountOptions: [1, 2],
    pointsByModelCount: { 1: 100, 2: 200 },
    defaultWargear: [
      { id: "mbh-bile-spurt", name: "Bile spurt", image: "", profiles: [{ range: '12"', attacks: "3", skill: "3+", strength: "5", ap: "0", damage: "1", keywords: ["LETHAL HITS"] }] },
      { id: "mbh-missile-launcher", name: "Missile launcher", image: "", profiles: [{ profileName: "► Missile launcher – frag", range: '48"', attacks: "D6", skill: "3+", strength: "4", ap: "0", damage: "1", keywords: ["BLAST"] }, { profileName: "► Missile launcher – krak", range: '48"', attacks: "1", skill: "3+", strength: "9", ap: "-2", damage: "D6" }] },
      { id: "mbh-multi-melta", name: "Multi-melta", image: "", profiles: [{ range: '18"', attacks: "2", skill: "3+", strength: "9", ap: "-4", damage: "D6", keywords: ["LETHAL HITS", "MELTA 2"] }] },
      { id: "mbh-gnashing-maw", name: "Gnashing maw", image: "", profiles: [{ range: "Melee", attacks: "4", skill: "3+", strength: "6", ap: "-1", damage: "1", keywords: ["LETHAL HITS"] }] },
    ],
    wargear: [],
    abilities: [
      {
        name: "Tank Hunters",
        description: "In your Shooting phase, each time a model in this unit makes an attack that targets a MONSTER or VEHICLE unit, add 1 to the Hit roll and add 1 to the Wound roll.",
      },
    ],
    ledBy: [],
  },

  {
    id: "plagueburst-crawler",
    name: "Plagueburst Crawler",
    faction: "death-guard",
    category: "vehicle",
    points: 210,
    defaultWargear: [
      { id: "pbc-plagueburst-mortar", name: "Plagueburst mortar", image: "", profiles: [{ range: '48"', attacks: "D6+3", skill: "3+", strength: "8", ap: "-1", damage: "2", keywords: ["BLAST", "INDIRECT FIRE", "LETHAL HITS"] }] },
      { id: "pbc-armoured-tracks", name: "Armoured tracks", image: "", profiles: [{ range: "Melee", attacks: "3", skill: "4+", strength: "6", ap: "0", damage: "1" }] },
    ],
    wargear: [
      { id: "pbc-entropy-cannon", name: "Entropy cannon", image: "", wargearGroup: "pbc-main", profiles: [{ range: '36"', attacks: "1", skill: "3+", strength: "10", ap: "-3", damage: "D6+1", keywords: ["LETHAL HITS"] }] },
      { id: "pbc-plaguespitter", name: "Plaguespitter", image: "", wargearGroup: "pbc-main", profiles: [{ range: '12"', attacks: "D6", skill: "N/A", strength: "6", ap: "-1", damage: "1", keywords: ["ANTI-INFANTRY 2+", "IGNORES COVER", "TORRENT"] }] },
      { id: "pbc-heavy-slugger", name: "Heavy slugger", image: "", wargearGroup: "pbc-secondary", profiles: [{ range: '36"', attacks: "4", skill: "3+", strength: "5", ap: "-1", damage: "1", keywords: ["LETHAL HITS"] }] },
      { id: "pbc-rothail-volley-gun", name: "Rothail volley gun", image: "", wargearGroup: "pbc-secondary", profiles: [{ range: '36"', attacks: "3", skill: "3+", strength: "5", ap: "0", damage: "1", keywords: ["LETHAL HITS", "RAPID FIRE 3"] }] },
    ],
    wargearGroups: [
      ["pbc-entropy-cannon", "pbc-plaguespitter"],
      ["pbc-heavy-slugger", "pbc-rothail-volley-gun"],
    ],
    abilities: [
      {
        name: "Spore-laced Shock Waves",
        description: "In your Shooting phase, each time you select a target for this model's Plagueburst mortar, roll one D6 for the target unit and every other enemy unit within 3\" of the target unit, adding 1 to that roll if the unit being rolled for is Afflicted. On a 6+, the unit being rolled for is struck by spores; after resolving all of this model's attacks against the target unit, each unit struck by spores suffers D3 mortal wounds.",
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
    faction: "death-guard",
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
    faction: "death-guard",
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
    faction: "death-guard",
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
    faction: "death-guard",
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
    faction: "death-guard",
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
    faction: "death-guard",
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
    id: "whirlwind-scorpius",
    name: "Whirlwind Scorpius",
    faction: "death-guard",
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
    faction: "death-guard",
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
    id: "chaos-thunderhawk",
    name: "Chaos Thunderhawk",
    faction: "death-guard",
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
    id: "death-guard-land-raider",
    name: "Death Guard Land Raider",
    faction: "death-guard",
    category: "transport",
    points: 240,
    defaultWargear: [
      { id: "soulshatter-lascannon", name: "Soulshatter lascannon", image: "" },
      { id: "twin-plague-heavy-bolter", name: "Twin plague heavy bolter", image: "" },
      { id: "armoured-tracks", name: "Armoured tracks", image: "" },
    ],
    wargear: [
      { id: "combi-weapon", name: "Combi-weapon", image: "" },
      { id: "plague-combi-bolter", name: "Plague combi-bolter", image: "" },
    ],
    ledBy: [],
  },

  {
    id: "death-guard-rhino",
    name: "Death Guard Rhino",
    faction: "death-guard",
    category: "transport",
    points: 85,
    transportCapacity: 12,
    defaultWargear: [
      { id: "dg-rhino-combi-bolter", name: "Combi-bolter", image: "", profiles: [{ range: '24"', attacks: "2", skill: "3+", strength: "4", ap: "0", damage: "1", keywords: ["LETHAL HITS", "RAPID FIRE 2"] }] },
      { id: "dg-rhino-armoured-tracks", name: "Armoured tracks", image: "", profiles: [{ range: "Melee", attacks: "3", skill: "4+", strength: "6", ap: "0", damage: "1" }] },
    ],
    wargear: [
      { id: "dg-rhino-combi-weapon", name: "Combi-weapon", image: "", profiles: [{ range: '24"', attacks: "1", skill: "4+", strength: "4", ap: "0", damage: "1", keywords: ["ANTI-INFANTRY 4+", "DEVASTATING WOUNDS", "RAPID FIRE 1"] }] },
      { id: "dg-rhino-extra-combi-bolter", name: "Combi-bolter (additional)", image: "", profiles: [{ range: '24"', attacks: "2", skill: "3+", strength: "4", ap: "0", damage: "1", keywords: ["LETHAL HITS", "RAPID FIRE 2"] }] },
      { id: "dg-rhino-havoc-launcher", name: "Havoc launcher", image: "", profiles: [{ range: '48"', attacks: "D6", skill: "3+", strength: "5", ap: "0", damage: "1", keywords: ["BLAST"] }] },
    ],
    wargearGroups: [
      ["dg-rhino-combi-bolter", "dg-rhino-combi-weapon"],
      ["dg-rhino-extra-combi-bolter", "dg-rhino-havoc-launcher"],
    ],
    abilities: [
      {
        name: "Fire Support",
        description: "In your Shooting phase, after this model has shot, select one enemy unit hit by one or more of those attacks. Until the end of the phase, each time a friendly model that disembarked from this TRANSPORT this turn makes an attack that targets that enemy unit, you can re-roll the Wound roll.",
      },
    ],
    ledBy: [],
  },

  {
    id: "land-raider-achilles",
    name: "Land Raider Achilles",
    faction: "death-guard",
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
    faction: "death-guard",
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
    faction: "death-guard",
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
    faction: "death-guard",
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
    faction: "death-guard",
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
    faction: "death-guard",
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
    faction: "death-guard",
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
