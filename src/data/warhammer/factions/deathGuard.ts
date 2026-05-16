import type { Unit } from "../../../types/warhammer";

export const deathGuardUnits: Unit[] = [

  // ── Battleline ──────────────────────────────────────────────────────────

  {
    id: "plague-marines",
    name: "Plague Marines",
    faction: "death-guard",
    category: "battleline",
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
    id: "biologus-putrifier",
    name: "Biologus Putrifier",
    faction: "death-guard",
    category: "infantry",
    points: 50,
    wargear: [],
  },

  {
    id: "blightlord-terminators",
    name: "Blightlord Terminators",
    faction: "death-guard",
    category: "infantry",
    points: 155,
    wargear: [],
    ledBy: ["death-guard-chaos-lord-in-terminator-armour", "death-guard-sorcerer-in-terminator-armour", "lord-of-contagion", "lord-of-virulence", "typhus"],
  },

  {
    id: "chaos-lord-on-palanquin-of-nurgle",
    name: "Chaos Lord On Palanquin Of Nurgle",
    faction: "death-guard",
    category: "infantry",
    points: 90,
    wargear: [],
  },

  {
    id: "death-guard-chaos-lord",
    name: "Death Guard Chaos Lord",
    faction: "death-guard",
    category: "infantry",
    points: 65,
    wargear: [],
  },

  {
    id: "death-guard-chaos-lord-in-terminator-armour",
    name: "Death Guard Chaos Lord In Terminator Armour",
    faction: "death-guard",
    category: "infantry",
    points: 85,
    wargear: [],
  },

  {
    id: "death-guard-chaos-spawn",
    name: "Death Guard Chaos Spawn",
    faction: "death-guard",
    category: "infantry",
    points: 70,
    wargear: [],
  },

  {
    id: "death-guard-cultists",
    name: "Death Guard Cultists",
    faction: "death-guard",
    category: "infantry",
    points: 50,
    wargear: [],
  },

  {
    id: "death-guard-icon-bearer",
    name: "Death Guard Icon Bearer",
    faction: "death-guard",
    category: "infantry",
    points: 45,
    wargear: [],
  },

  {
    id: "death-guard-possessed",
    name: "Death Guard Possessed",
    faction: "death-guard",
    category: "infantry",
    points: 155,
    wargear: [],
  },

  {
    id: "death-guard-sorcerer-in-terminator-armour",
    name: "Death Guard Sorcerer In Terminator Armour",
    faction: "death-guard",
    category: "infantry",
    points: 70,
    wargear: [],
  },

  {
    id: "deathshroud-terminators",
    name: "Deathshroud Terminators",
    faction: "death-guard",
    category: "infantry",
    points: 110,
    wargear: [],
    ledBy: ["death-guard-chaos-lord-in-terminator-armour", "death-guard-sorcerer-in-terminator-armour", "lord-of-contagion", "lord-of-virulence", "typhus"],
  },

  {
    id: "foul-blightspawn",
    name: "Foul Blightspawn",
    faction: "death-guard",
    category: "infantry",
    points: 60,
    wargear: [],
  },

  {
    id: "lord-of-contagion",
    name: "Lord Of Contagion",
    faction: "death-guard",
    category: "infantry",
    points: 80,
    wargear: [],
  },

  {
    id: "lord-of-virulence",
    name: "Lord Of Virulence",
    faction: "death-guard",
    category: "infantry",
    points: 80,
    wargear: [],
  },

  {
    id: "malignant-plaguecaster",
    name: "Malignant Plaguecaster",
    faction: "death-guard",
    category: "infantry",
    points: 65,
    wargear: [],
  },

  {
    id: "miasmic-malignifier",
    name: "Miasmic Malignifier",
    faction: "death-guard",
    category: "infantry",
    points: 115,
    wargear: [],
  },

  {
    id: "mutoid-vermin",
    name: "Mutoid Vermin",
    faction: "death-guard",
    category: "infantry",
    points: 85,
    wargear: [],
  },

  {
    id: "noxious-blightbringer",
    name: "Noxious Blightbringer",
    faction: "death-guard",
    category: "infantry",
    points: 45,
    wargear: [],
  },

  {
    id: "plague-surgeon",
    name: "Plague Surgeon",
    faction: "death-guard",
    category: "infantry",
    points: 50,
    wargear: [],
  },

  {
    id: "poxwalkers",
    name: "Poxwalkers",
    faction: "death-guard",
    category: "infantry",
    points: 50,
    wargear: [],
  },

  {
    id: "sorcerer-on-palanquin-of-nurgle",
    name: "Sorcerer On Palanquin Of Nurgle",
    faction: "death-guard",
    category: "infantry",
    points: 80,
    wargear: [],
  },

  {
    id: "tallyman",
    name: "Tallyman",
    faction: "death-guard",
    category: "infantry",
    points: 45,
    wargear: [],
  },

  {
    id: "typhus",
    name: "Typhus",
    faction: "death-guard",
    category: "infantry",
    points: 80,
    wargear: [],
  },

  {
    id: "cerberus",
    name: "Cerberus",
    faction: "death-guard",
    category: "vehicle",
    points: 285,
    wargear: [],
  },

  {
    id: "death-guard-defiler",
    name: "Death Guard Defiler",
    faction: "death-guard",
    category: "vehicle",
    points: 190,
    wargear: [],
  },

  {
    id: "death-guard-helbrute",
    name: "Death Guard Helbrute",
    faction: "death-guard",
    category: "vehicle",
    points: 130,
    wargear: [],
  },

  {
    id: "death-guard-predator-annihilator",
    name: "Death Guard Predator Annihilator",
    faction: "death-guard",
    category: "vehicle",
    points: 135,
    wargear: [],
  },

  {
    id: "death-guard-predator-destructor",
    name: "Death Guard Predator Destructor",
    faction: "death-guard",
    category: "vehicle",
    points: 140,
    wargear: [],
  },

  {
    id: "deredeo-dreadnought",
    name: "Deredeo Dreadnought",
    faction: "death-guard",
    category: "vehicle",
    points: 170,
    wargear: [],
  },

  {
    id: "falchion",
    name: "Falchion",
    faction: "death-guard",
    category: "vehicle",
    points: 515,
    wargear: [],
  },

  {
    id: "fellblade",
    name: "Fellblade",
    faction: "death-guard",
    category: "vehicle",
    points: 535,
    wargear: [],
  },

  {
    id: "fire-raptor-gunship",
    name: "Fire Raptor Gunship",
    faction: "death-guard",
    category: "vehicle",
    points: 290,
    wargear: [],
  },

  {
    id: "foetid-bloat-drone",
    name: "Foetid Bloat Drone",
    faction: "death-guard",
    category: "vehicle",
    points: 90,
    wargear: [],
  },

  {
    id: "greater-blight-drone",
    name: "Greater Blight Drone",
    faction: "death-guard",
    category: "vehicle",
    points: 150,
    wargear: [],
  },

  {
    id: "hell-blade",
    name: "Hell Blade",
    faction: "death-guard",
    category: "vehicle",
    points: 115,
    wargear: [],
  },

  {
    id: "hell-talon",
    name: "Hell Talon",
    faction: "death-guard",
    category: "vehicle",
    points: 140,
    wargear: [],
  },

  {
    id: "kratos",
    name: "Kratos",
    faction: "death-guard",
    category: "vehicle",
    points: 265,
    wargear: [],
  },

  {
    id: "leviathan-dreadnought",
    name: "Leviathan Dreadnought",
    faction: "death-guard",
    category: "vehicle",
    points: 215,
    wargear: [],
  },

  {
    id: "myphitic-blight-haulers",
    name: "Myphitic Blight Haulers",
    faction: "death-guard",
    category: "vehicle",
    points: 85,
    wargear: [],
  },

  {
    id: "plagueburst-crawler",
    name: "Plagueburst Crawler",
    faction: "death-guard",
    category: "vehicle",
    points: 180,
    wargear: [],
  },

  {
    id: "rapier-carrier",
    name: "Rapier Carrier",
    faction: "death-guard",
    category: "vehicle",
    points: 100,
    wargear: [],
  },

  {
    id: "relic-contemptor-dreadnought",
    name: "Relic Contemptor Dreadnought",
    faction: "death-guard",
    category: "vehicle",
    points: 180,
    wargear: [],
  },

  {
    id: "sicaran-battle-tank",
    name: "Sicaran Battle Tank",
    faction: "death-guard",
    category: "vehicle",
    points: 220,
    wargear: [],
  },

  {
    id: "sicaran-punisher",
    name: "Sicaran Punisher",
    faction: "death-guard",
    category: "vehicle",
    points: 220,
    wargear: [],
  },

  {
    id: "sicaran-venator",
    name: "Sicaran Venator",
    faction: "death-guard",
    category: "vehicle",
    points: 220,
    wargear: [],
  },

  {
    id: "typhon",
    name: "Typhon",
    faction: "death-guard",
    category: "vehicle",
    points: 385,
    wargear: [],
  },

  {
    id: "whirlwind-scorpius",
    name: "Whirlwind Scorpius",
    faction: "death-guard",
    category: "vehicle",
    points: 115,
    wargear: [],
  },

  {
    id: "xiphon-interceptor",
    name: "Xiphon Interceptor",
    faction: "death-guard",
    category: "vehicle",
    points: 115,
    wargear: [],
  },

  {
    id: "death-guard-daemon-prince",
    name: "Death Guard Daemon Prince",
    faction: "death-guard",
    category: "monster",
    points: 160,
    wargear: [],
  },

  {
    id: "death-guard-daemon-prince-with-wings",
    name: "Death Guard Daemon Prince With Wings",
    faction: "death-guard",
    category: "monster",
    points: 195,
    wargear: [],
  },

  {
    id: "mortarion",
    name: "Mortarion",
    faction: "death-guard",
    category: "monster",
    points: 300,
    wargear: [],
  },

  {
    id: "chaos-thunderhawk",
    name: "Chaos Thunderhawk",
    faction: "death-guard",
    category: "transport",
    points: 840,
    wargear: [],
  },

  {
    id: "death-guard-land-raider",
    name: "Death Guard Land Raider",
    faction: "death-guard",
    category: "transport",
    points: 240,
    wargear: [],
  },

  {
    id: "death-guard-rhino",
    name: "Death Guard Rhino",
    faction: "death-guard",
    category: "transport",
    points: 75,
    wargear: [],
  },

  {
    id: "land-raider-achilles",
    name: "Land Raider Achilles",
    faction: "death-guard",
    category: "transport",
    points: 285,
    wargear: [],
  },

  {
    id: "land-raider-proteus",
    name: "Land Raider Proteus",
    faction: "death-guard",
    category: "transport",
    points: 250,
    wargear: [],
  },

  {
    id: "mastodon",
    name: "Mastodon",
    faction: "death-guard",
    category: "transport",
    points: 610,
    wargear: [],
  },

  {
    id: "sokar-pattern-stormbird",
    name: "Sokar Pattern Stormbird",
    faction: "death-guard",
    category: "transport",
    points: 1100,
    wargear: [],
  },

  {
    id: "spartan",
    name: "Spartan",
    faction: "death-guard",
    category: "transport",
    points: 315,
    wargear: [],
  },

  {
    id: "storm-eagle-gunship",
    name: "Storm Eagle Gunship",
    faction: "death-guard",
    category: "transport",
    points: 255,
    wargear: [],
  },

  {
    id: "terrax-pattern-termite",
    name: "Terrax Pattern Termite",
    faction: "death-guard",
    category: "transport",
    points: 200,
    wargear: [],
  },

];
