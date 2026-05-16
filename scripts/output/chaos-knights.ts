import type { Unit } from "../../src/types/warhammer";

export const chaosKnightsUnits: Unit[] = [

  {
    id: "cultist-mob",
    name: "Cultist Mob",
    faction: "chaos-knights",
    category: "battleline",
    points: 50,
    defaultWargear: [
      { id: "autopistol", name: "Autopistol", image: "" },
      { id: "brutal-assault-weapon", name: "Brutal assault weapon", image: "" },
    ],
    wargear: [
      { id: "bolt-pistol", name: "Bolt pistol", image: "" },
    ],
    ledBy: [],
  },

  {
    id: "cultist-mob-with-firearms",
    name: "Cultist Mob With Firearms",
    faction: "chaos-knights",
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
    id: "accursed-cultists",
    name: "Accursed Cultists",
    faction: "chaos-knights",
    category: "infantry",
    points: 90,
    defaultWargear: [
      { id: "hideous-mutations", name: "Hideous mutations", image: "" },
    ],
    wargear: [
      { id: "blasphemous-appendages", name: "Blasphemous appendages", image: "" },
    ],
    ledBy: [],
  },

  {
    id: "dark-commune",
    name: "Dark Commune",
    faction: "chaos-knights",
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
    id: "fellgor-beastmen",
    name: "Fellgor Beastmen",
    faction: "chaos-knights",
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
    faction: "chaos-knights",
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
    id: "mutoid-vermin",
    name: "Mutoid Vermin",
    faction: "chaos-knights",
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
    faction: "chaos-knights",
    category: "infantry",
    points: 55,
    defaultWargear: [
      { id: "electro-goads", name: "Electro-goads", image: "" },
    ],
    wargear: [],
    ledBy: [],
  },

  {
    id: "renegade-heavy-weapons-squad",
    name: "Renegade Heavy Weapons Squad",
    faction: "chaos-knights",
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
    faction: "chaos-knights",
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
    faction: "chaos-knights",
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
    faction: "chaos-knights",
    category: "infantry",
    points: 95,
    defaultWargear: [
      { id: "ogryn-plague-claws", name: "Ogryn plague claws", image: "" },
    ],
    wargear: [],
    ledBy: [],
  },

  {
    id: "traitor-enforcer",
    name: "Traitor Enforcer",
    faction: "chaos-knights",
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
    faction: "chaos-knights",
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
    ledBy: [],
  },

  {
    id: "chaos-acastus-knight-asterius",
    name: "Chaos Acastus Knight Asterius",
    faction: "chaos-knights",
    category: "vehicle",
    points: 765,
    defaultWargear: [
      { id: "asterius-volkite-culverin", name: "Asterius volkite culverin", image: "" },
      { id: "karacnos-mortar-battery", name: "Karacnos mortar battery", image: "" },
      { id: "twin-conversion-beam-cannon", name: "Twin conversion beam cannon", image: "" },
      { id: "titanic-feet", name: "Titanic feet", image: "" },
    ],
    wargear: [],
    ledBy: [],
  },

  {
    id: "chaos-acastus-knight-porphyrion",
    name: "Chaos Acastus Knight Porphyrion",
    faction: "chaos-knights",
    category: "vehicle",
    points: 700,
    defaultWargear: [
      { id: "acastus-autocannon", name: "Acastus Autocannon", image: "" },
      { id: "acastus-ironstorm-missile-pod", name: "Acastus ironstorm missile pod", image: "" },
      { id: "lascannon", name: "Lascannon", image: "" },
      { id: "twin-magna-lascannon", name: "Twin magna lascannon", image: "" },
      { id: "titanic-feet", name: "Titanic feet", image: "" },
    ],
    wargear: [],
    ledBy: [],
  },

  {
    id: "war-dog-brigand",
    name: "War Dog Brigand",
    faction: "chaos-knights",
    category: "vehicle",
    points: 140,
    defaultWargear: [
      { id: "brigand-avenger-chaincannon", name: "Avenger chaincannon", image: "", profiles: [{ range: '24"', attacks: "12", skill: "3+", strength: "6", ap: "-1", damage: "1" }] },
      { id: "brigand-daemonbreath-spear", name: "Daemonbreath spear", image: "", profiles: [{ range: '18"', attacks: "2", skill: "3+", strength: "12", ap: "-4", damage: "D6", keywords: ["MELTA 4"] }] },
      { id: "brigand-armoured-feet", name: "Armoured feet", image: "", profiles: [{ range: "Melee", attacks: "4", skill: "3+", strength: "6", ap: "0", damage: "1" }] },
    ],
    wargear: [
      { id: "brigand-diabolus-heavy-stubber", name: "Diabolus heavy stubber", image: "", profiles: [{ range: '36"', attacks: "3", skill: "3+", strength: "5", ap: "0", damage: "1", keywords: ["RAPID FIRE 3"] }] },
      { id: "brigand-havoc-multi-launcher", name: "Havoc multi-launcher", image: "", profiles: [{ range: '48"', attacks: "D6", skill: "3+", strength: "5", ap: "0", damage: "1", keywords: ["BLAST", "INDIRECT FIRE"] }] },
    ],
    notes: [
      {
        id: "brigand-equip-stubber",
        text: "Diabolus heavy stubber",
        checkbox: true,
        exclusiveWith: "brigand-equip-havoc",
        weaponId: "brigand-diabolus-heavy-stubber",
      },
      {
        id: "brigand-equip-havoc",
        text: "Havoc multi-launcher",
        checkbox: true,
        exclusiveWith: "brigand-equip-stubber",
        weaponId: "brigand-havoc-multi-launcher",
      },
    ],
    abilities: [
      {
        name: "Brigand",
        description: "Each time this model makes a ranged attack that targets a unit that is within range of one or more objective markers, that attack has the [IGNORES COVER] ability.",
      },
      {
        name: "Damaged: 1-5 Wounds Remaining",
        description: "While this model has 1-5 wounds remaining, subtract 3 from this model's Objective Control characteristic and each time this model makes an attack, subtract 1 from the Hit roll.",
      },
    ],
    ledBy: [],
  },

  {
    id: "war-dog-executioner",
    name: "War Dog Executioner",
    faction: "chaos-knights",
    category: "vehicle",
    points: 130,
    defaultWargear: [
      { id: "executioner-war-dog-autocannon", name: "War Dog autocannon", image: "", profiles: [{ range: '48"', attacks: "4", skill: "3+", strength: "9", ap: "-1", damage: "3" }] },
      { id: "executioner-diabolus-heavy-stubber", name: "Diabolus heavy stubber", image: "", profiles: [{ range: '36"', attacks: "3", skill: "3+", strength: "5", ap: "0", damage: "1", keywords: ["RAPID FIRE 3"] }] },
      { id: "executioner-armoured-feet", name: "Armoured feet", image: "", profiles: [{ range: "Melee", attacks: "4", skill: "3+", strength: "6", ap: "0", damage: "1" }] },
    ],
    wargear: [
      { id: "executioner-daemonbreath-meltagun", name: "Daemonbreath meltagun", image: "", profiles: [{ range: '12"', attacks: "1", skill: "3+", strength: "9", ap: "-4", damage: "D6", keywords: ["MELTA 2"] }] },
    ],
    abilities: [
      {
        name: "Executioner",
        description: "Each time this model makes an attack that targets a unit Below Half-strength, add 1 to the Hit roll. Each time an enemy unit is destroyed as the result of this model's attacks, before removing the last model in that unit from the battlefield, each unit from your opponent's army that is within 3\" of it must take a Battle-shock test.",
      },
      {
        name: "Damaged: 1-5 Wounds Remaining",
        description: "While this model has 1-5 wounds remaining, subtract 3 from this model's Objective Control characteristic and each time this model makes an attack, subtract 1 from the Hit roll.",
      },
    ],
    ledBy: [],
  },

  {
    id: "war-dog-huntsman",
    name: "War Dog Huntsman",
    faction: "chaos-knights",
    category: "vehicle",
    points: 140,
    defaultWargear: [
      { id: "daemonbreath-spear", name: "Daemonbreath spear", image: "" },
      { id: "diabolus-heavy-stubber", name: "Diabolus heavy stubber", image: "" },
      { id: "reaper-chaintalon-strike", name: "Reaper chaintalon – strike", image: "" },
      { id: "reaper-chaintalon-sweep", name: "Reaper chaintalon – sweep", image: "" },
    ],
    wargear: [
      { id: "daemonbreath-meltagun", name: "Daemonbreath meltagun", image: "" },
    ],
    ledBy: [],
  },

  {
    id: "war-dog-karnivore",
    name: "War Dog Karnivore",
    faction: "chaos-knights",
    category: "vehicle",
    points: 140,
    defaultWargear: [
      { id: "karnivore-reaper-chaintalon-strike", name: "Reaper chaintalon – strike", image: "" },
      { id: "karnivore-reaper-chaintalon-sweep", name: "Reaper chaintalon – sweep", image: "" },
      { id: "karnivore-slaughterclaw", name: "Slaughterclaw", image: "" },
    ],
    wargear: [
      { id: "karnivore-diabolus-heavy-stubber", name: "Diabolus heavy stubber", image: "", profiles: [{ range: '36"', attacks: "3", skill: "3+", strength: "5", ap: "0", damage: "1", keywords: ["RAPID FIRE 3"] }] },
      { id: "karnivore-havoc-multi-launcher", name: "Havoc multi-launcher", image: "", profiles: [{ range: '48"', attacks: "D6", skill: "3+", strength: "5", ap: "0", damage: "1", keywords: ["BLAST", "INDIRECT FIRE"] }] },
    ],
    notes: [
      {
        id: "karnivore-equip-stubber",
        text: "Diabolus heavy stubber",
        checkbox: true,
        exclusiveWith: "karnivore-equip-havoc",
        weaponId: "karnivore-diabolus-heavy-stubber",
      },
      {
        id: "karnivore-equip-havoc",
        text: "Havoc multi-launcher",
        checkbox: true,
        exclusiveWith: "karnivore-equip-stubber",
        weaponId: "karnivore-havoc-multi-launcher",
      },
    ],
    ledBy: [],
  },

  {
    id: "war-dog-stalker",
    name: "War Dog Stalker",
    faction: "chaos-knights",
    category: "vehicle",
    points: 140,
    defaultWargear: [
      { id: "stalker-avenger-chaincannon", name: "Avenger chaincannon", image: "", profiles: [{ range: '24"', attacks: "12", skill: "3+", strength: "6", ap: "-1", damage: "1" }] },
      { id: "stalker-diabolus-heavy-stubber", name: "Diabolus heavy stubber", image: "", profiles: [{ range: '36"', attacks: "3", skill: "3+", strength: "5", ap: "0", damage: "1", keywords: ["RAPID FIRE 3"] }] },
      { id: "stalker-slaughterclaw", name: "Slaughterclaw", image: "", profiles: [{ range: "Melee", attacks: "4", skill: "3+", strength: "12", ap: "-3", damage: "D6+2" }] },
    ],
    wargear: [
      { id: "stalker-daemonbreath-spear", name: "Daemonbreath spear", image: "", profiles: [{ range: '18"', attacks: "2", skill: "3+", strength: "12", ap: "-4", damage: "D6", keywords: ["MELTA 4"] }] },
      { id: "stalker-havoc-multi-launcher", name: "Havoc multi-launcher", image: "", profiles: [{ range: '48"', attacks: "D6", skill: "3+", strength: "5", ap: "0", damage: "1", keywords: ["BLAST", "INDIRECT FIRE"] }] },
      { id: "stalker-reaper-chaintalon", name: "Reaper chaintalon", image: "", profiles: [
        { profileName: "strike", range: "Melee", attacks: "4", skill: "3+", strength: "10", ap: "-3", damage: "3" },
        { profileName: "sweep", range: "Melee", attacks: "8", skill: "3+", strength: "8", ap: "-2", damage: "1" },
      ] },
    ],
    notes: [
      {
        id: "stalker-swap-chaincannon",
        text: "Replace Avenger chaincannon with Daemonbreath spear",
        checkbox: true,
        weaponId: "stalker-daemonbreath-spear",
        replacesDefaultWargear: "stalker-avenger-chaincannon",
      },
      {
        id: "stalker-swap-stubber",
        text: "Replace Diabolus heavy stubber with Havoc multi-launcher",
        checkbox: true,
        weaponId: "stalker-havoc-multi-launcher",
        replacesDefaultWargear: "stalker-diabolus-heavy-stubber",
      },
      {
        id: "stalker-swap-slaughterclaw",
        text: "Replace Slaughterclaw with Reaper chaintalon",
        checkbox: true,
        weaponId: "stalker-reaper-chaintalon",
        replacesDefaultWargear: "stalker-slaughterclaw",
      },
    ],
    abilities: [
      {
        name: "Stalker",
        description: "Each time this model makes an attack that targets an enemy unit, if there are no other units from your opponent's army within 6\" of that target, add 1 to the Wound roll.",
      },
      {
        name: "Damaged: 1-5 Wounds Remaining",
        description: "While this model has 1-5 wounds remaining, subtract 3 from this model's Objective Control characteristic and each time this model makes an attack, subtract 1 from the Hit roll.",
      },
    ],
    ledBy: [],
  },

  {
    id: "war-dog-moirax",
    name: "War Dog Moirax",
    faction: "chaos-knights",
    category: "vehicle",
    points: 160,
    defaultWargear: [
      { id: "graviton-pulsar", name: "Graviton pulsar", image: "" },
      { id: "volkite-veuglaire", name: "Volkite veuglaire", image: "" },
      { id: "armoured-feet", name: "Armoured feet", image: "" },
    ],
    wargear: [
      { id: "conversion-beam-cannon", name: "Conversion beam cannon", image: "" },
      { id: "lightning-lock", name: "Lightning lock", image: "" },
      { id: "rad-cleanser", name: "Rad cleanser", image: "" },
      { id: "siege-claw", name: "Siege claw", image: "" },
    ],
    ledBy: [],
  },

];
