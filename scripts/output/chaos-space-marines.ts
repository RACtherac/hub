import type { Unit } from "../../src/types/warhammer";

export const chaosSpaceMarinesUnits: Unit[] = [

  {
    id: "chaos-bikers",
    name: "Chaos Bikers",
    faction: "chaos-space-marine",
    category: "mounted",
    points: 70,
    defaultWargear: [
      { id: "bolt-pistol", name: "Bolt pistol", image: "" },
      { id: "combi-bolter", name: "Combi-bolter", image: "" },
      { id: "close-combat-weapon", name: "Close combat weapon", image: "" },
    ],
    wargear: [
      { id: "flamer", name: "Flamer", image: "" },
      { id: "meltagun", name: "Meltagun", image: "" },
      { id: "plasma-gun-standard", name: "Plasma gun – standard", image: "" },
      { id: "plasma-gun-supercharge", name: "Plasma gun – supercharge", image: "" },
      { id: "plasma-pistol", name: "Plasma pistol", image: "", profiles: [{ profileName: "standard", range: '12"', attacks: "1", skill: "3+", strength: "7", ap: "-2", damage: "1", keywords: ["PISTOL"] }, { profileName: "supercharge", range: '12"', attacks: "1", skill: "3+", strength: "8", ap: "-3", damage: "2", keywords: ["PISTOL", "HAZARDOUS"] }] },
      { id: "accursed-weapon", name: "Accursed weapon", image: "" },
      { id: "astartes-chainsword", name: "Astartes chainsword", image: "" },
      { id: "power-fist", name: "Power fist", image: "" },
    ],
    ledBy: [],
  },

  {
    id: "cultist-mob",
    name: "Cultist Mob",
    faction: "chaos-space-marine",
    category: "battleline",
    points: 50,
    modelCountOptions: [10, 20],
    pointsByModelCount: { 10: 50, 20: 100 },
    defaultWargear: [
      { id: "autopistol", name: "Autopistol", image: "", profiles: [{ range: '12"', attacks: "1", skill: "4+", strength: "3", ap: "0", damage: "1", keywords: ["PISTOL"] }] },
      { id: "brutal-assault-weapon", name: "Brutal assault weapon", image: "", profiles: [{ range: "Melee", attacks: "2", skill: "4+", strength: "3", ap: "0", damage: "1" }] },
    ],
    wargear: [
      { id: "champ-bolt-pistol", name: "Bolt pistol", image: "", sergeantOnly: true, profiles: [{ range: '12"', attacks: "1", skill: "4+", strength: "4", ap: "0", damage: "1", keywords: ["PISTOL"] }] },
    ],
    abilities: [
      {
        name: "Dark Pacts",
        description: "FACTION ABILITY: Before selecting targets for an attack, a model in this unit can make a Dark Pact. If it does, until the end of the phase, improve the Strength, AP and Damage characteristics of that model's melee weapons by 1. Then take a Leadership test for this unit. If that test is failed, that model suffers 1 mortal wound.",
      },
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
    points: 90,
    defaultWargear: [
      { id: "hideous-mutations", name: "Hideous mutations", image: "" },
    ],
    wargear: [
      { id: "blasphemous-appendages", name: "Blasphemous appendages", image: "" },
    ],
    ledBy: ["cultist-firebrand","dark-apostle","dark-commune","fabius-bile"],
  },

  {
    id: "chaos-spawn",
    name: "Chaos Spawn",
    faction: "chaos-space-marine",
    category: "infantry",
    points: 70,
    defaultWargear: [
      { id: "hideous-mutations", name: "Hideous mutations", image: "" },
    ],
    wargear: [],
    ledBy: [],
  },

  {
    id: "chaos-terminator-squad",
    name: "Chaos Terminator Squad",
    faction: "chaos-space-marine",
    category: "infantry",
    points: 180,
    defaultWargear: [
      { id: "combi-bolter", name: "Combi-bolter", image: "" },
      { id: "accursed-weapon", name: "Accursed weapon", image: "" },
      { id: "paired-accursed-weapons", name: "Paired accursed weapons", image: "" },
    ],
    wargear: [
      { id: "heavy-flamer", name: "Heavy flamer", image: "" },
      { id: "reaper-autocannon", name: "Reaper autocannon", image: "" },
    ],
    ledBy: ["abaddon-the-despoiler","chaos-lord-in-terminator-armour","sorcerer-in-terminator-armour"],
  },

  {
    id: "chosen",
    name: "Chosen",
    faction: "chaos-space-marine",
    category: "infantry",
    points: 125,
    defaultWargear: [
      { id: "bolt-pistol", name: "Bolt pistol", image: "" },
      { id: "boltgun", name: "Boltgun", image: "" },
      { id: "accursed-weapon", name: "Accursed weapon", image: "" },
      { id: "paired-accursed-weapons", name: "Paired accursed weapons", image: "" },
    ],
    wargear: [],
    ledBy: ["abaddon-the-despoiler","chaos-lord","dark-apostle","fabius-bile","huron-blackheart","master-of-executions","master-of-possession","sorcerer","warpsmith"],
  },


  {
    id: "dark-commune",
    name: "Dark Commune",
    faction: "chaos-space-marine",
    category: "infantry",
    points: 80,
    defaultWargear: [
      { id: "autopistol", name: "Autopistol", image: "" },
      { id: "commune-stave", name: "Commune stave", image: "" },
    ],
    wargear: [
      { id: "warp-curse-witchfire", name: "Warp Curse – witchfire", image: "" },
      { id: "warp-curse-focused-witchfire", name: "Warp Curse – focused witchfire", image: "" },
      { id: "close-combat-weapon", name: "Close combat weapon", image: "" },
      { id: "commune-blade", name: "Commune blade", image: "" },
    ],
    ledBy: [],
  },

  {
    id: "fabius-bile",
    name: "Fabius Bile",
    faction: "chaos-space-marine",
    category: "infantry",
    points: 85,
    defaultWargear: [
      { id: "xyclos-needler", name: "Xyclos Needler", image: "" },
      { id: "chirurgeon", name: "Chirurgeon", image: "" },
      { id: "rod-of-torment", name: "Rod of Torment", image: "" },
    ],
    wargear: [
      { id: "surgeon-acolyte-s-tools", name: "Surgeon Acolyte’s tools", image: "" },
    ],
    ledBy: [],
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
    points: 125,
    defaultWargear: [
      { id: "flamer", name: "Flamer", image: "" },
      { id: "astartes-chainsword", name: "Astartes chainsword", image: "" },
    ],
    wargear: [
      { id: "boltgun", name: "Boltgun", image: "" },
      { id: "havoc-autocannon", name: "Havoc autocannon", image: "" },
      { id: "havoc-heavy-bolter", name: "Havoc heavy bolter", image: "" },
      { id: "havoc-lascannon", name: "Havoc lascannon", image: "" },
      { id: "havoc-missile-launcher-frag", name: "Havoc missile launcher – frag", image: "" },
      { id: "havoc-missile-launcher-krak", name: "Havoc missile launcher – krak", image: "" },
      { id: "havoc-reaper-chaincannon", name: "Havoc reaper chaincannon", image: "" },
      { id: "meltagun", name: "Meltagun", image: "" },
      { id: "plasma-gun-standard", name: "Plasma gun – standard", image: "" },
      { id: "plasma-gun-supercharge", name: "Plasma gun – supercharge", image: "" },
      { id: "plasma-pistol", name: "Plasma pistol", image: "", profiles: [{ profileName: "standard", range: '12"', attacks: "1", skill: "3+", strength: "7", ap: "-2", damage: "1", keywords: ["PISTOL"] }, { profileName: "supercharge", range: '12"', attacks: "1", skill: "3+", strength: "8", ap: "-3", damage: "2", keywords: ["PISTOL", "HAZARDOUS"] }] },
      { id: "accursed-weapon", name: "Accursed weapon", image: "" },
      { id: "power-fist", name: "Power fist", image: "" },
    ],
    ledBy: [],
  },

  {
    id: "mutilators",
    name: "Mutilators",
    faction: "chaos-space-marine",
    category: "infantry",
    points: 185,
    defaultWargear: [
      { id: "fleshmetal-weapons-strike", name: "Fleshmetal weapons – strike", image: "" },
      { id: "fleshmetal-weapons-sweep", name: "Fleshmetal weapons – sweep", image: "" },
    ],
    wargear: [],
    ledBy: [],
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
    points: 160,
    defaultWargear: [
      { id: "fleshmetal-guns-focused-malice", name: "Fleshmetal guns – focused malice", image: "" },
      { id: "fleshmetal-guns-ruinous-salvo", name: "Fleshmetal guns – ruinous salvo", image: "" },
      { id: "fleshmetal-guns-warp-hail", name: "Fleshmetal guns – warp hail", image: "" },
      { id: "crushing-fists", name: "Crushing fists", image: "" },
    ],
    wargear: [],
    ledBy: [],
  },

  {
    id: "possessed",
    name: "Possessed",
    faction: "chaos-space-marine",
    category: "infantry",
    points: 120,
    defaultWargear: [
      { id: "hideous-mutations", name: "Hideous mutations", image: "" },
    ],
    wargear: [],
    ledBy: [],
  },

  {
    id: "raptors",
    name: "Raptors",
    faction: "chaos-space-marine",
    category: "infantry",
    points: 90,
    defaultWargear: [
      { id: "bolt-pistol", name: "Bolt pistol", image: "" },
      { id: "astartes-chainsword", name: "Astartes chainsword", image: "" },
    ],
    wargear: [
      { id: "flamer", name: "Flamer", image: "" },
      { id: "meltagun", name: "Meltagun", image: "" },
      { id: "accursed-weapon", name: "Accursed weapon", image: "" },
      { id: "close-combat-weapon", name: "Close combat weapon", image: "" },
      { id: "power-fist", name: "Power fist", image: "" },
    ],
    ledBy: ["chaos-lord-with-jump-pack","haarken-worldclaimer"],
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
      { id: "lascannon", name: "Lascannon", image: "" },
      { id: "predator-twin-lascannon", name: "Predator twin lascannon", image: "" },
      { id: "armoured-tracks", name: "Armoured tracks", image: "" },
    ],
    wargear: [
      { id: "combi-bolter", name: "Combi-bolter", image: "" },
      { id: "combi-weapon", name: "Combi-weapon", image: "" },
      { id: "heavy-bolter", name: "Heavy bolter", image: "" },
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
      { id: "predator-autocannon", name: "Predator autocannon", image: "" },
      { id: "armoured-tracks", name: "Armoured tracks", image: "" },
    ],
    wargear: [
      { id: "combi-bolter", name: "Combi-bolter", image: "" },
      { id: "combi-weapon", name: "Combi-weapon", image: "" },
      { id: "heavy-bolter", name: "Heavy bolter", image: "" },
      { id: "lascannon", name: "Lascannon", image: "" },
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
    points: 170,
    defaultWargear: [],
    defaultSelectedWargear: ["hades-autocannon", "forgefiend-jaws"],
    wargear: [
      { id: "hades-autocannon", name: "Hades autocannon", image: "", profiles: [{ range: '36"', attacks: "6", skill: "3+", strength: "8", ap: "-1", damage: "2" }] },
      { id: "ectoplasma-cannon", name: "Ectoplasma cannon", image: "", profiles: [{ profileName: "blast", range: '36"', attacks: "D3", skill: "3+", strength: "10", ap: "-3", damage: "3", keywords: ["BLAST"] }] },
      { id: "forgefiend-jaws", name: "Forgefiend jaws", image: "", profiles: [{ range: "Melee", attacks: "5", skill: "3+", strength: "7", ap: "0", damage: "2" }] },
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
      { id: "missile-launcher-frag", name: "Missile launcher – frag", image: "" },
      { id: "missile-launcher-krak", name: "Missile launcher – krak", image: "" },
      { id: "multi-melta", name: "Multi-melta", image: "" },
      { id: "close-combat-weapon", name: "Close combat weapon", image: "" },
    ],
    wargear: [
      { id: "combi-bolter", name: "Combi-bolter", image: "" },
      { id: "heavy-flamer", name: "Heavy flamer", image: "" },
      { id: "helbrute-plasma-cannon", name: "Helbrute plasma cannon", image: "" },
      { id: "twin-autocannon", name: "Twin autocannon", image: "" },
      { id: "twin-heavy-bolter", name: "Twin heavy bolter", image: "" },
      { id: "twin-lascannon", name: "Twin lascannon", image: "" },
      { id: "helbrute-fist", name: "Helbrute fist", image: "" },
      { id: "helbrute-hammer", name: "Helbrute hammer", image: "" },
      { id: "power-scourge", name: "Power scourge", image: "" },
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
      { id: "hades-autocannon", name: "Hades autocannon", image: "" },
      { id: "heldrake-claws", name: "Heldrake claws", image: "" },
    ],
    wargear: [
      { id: "baleflamer", name: "Baleflamer", image: "" },
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
      { id: "lasher-tendrils", name: "Lasher tendrils", image: "" },
      { id: "maulerfiend-fists", name: "Maulerfiend fists", image: "" },
    ],
    wargear: [
      { id: "magma-cutters", name: "Magma cutters", image: "" },
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
    points: 120,
    defaultWargear: [
      { id: "excruciator-cannon", name: "Excruciator cannon", image: "" },
      { id: "soulflayer-tendrils-and-claws", name: "Soulflayer tendrils and claws", image: "" },
    ],
    wargear: [],
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
    defaultWargear: [
      { id: "combi-bolter", name: "Combi-bolter", image: "" },
      { id: "armoured-tracks", name: "Armoured tracks", image: "" },
    ],
    wargear: [
      { id: "combi-weapon", name: "Combi-weapon", image: "" },
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
