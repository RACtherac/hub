import type { Unit } from "../../src/types/warhammer";

export const chaosDaemonsUnits: Unit[] = [

  {
    id: "bloodcrushers",
    name: "Bloodcrushers",
    faction: "chaos-daemons",
    category: "mounted",
    points: 110,
    defaultWargear: [
      { id: "hellblade", name: "Hellblade", image: "" },
      { id: "juggernaut-s-bladed-horn", name: "Juggernaut's bladed horn", image: "" },
    ],
    wargear: [],
    ledBy: [],
  },

  {
    id: "burning-chariot",
    name: "Burning Chariot",
    faction: "chaos-daemons",
    category: "mounted",
    points: 115,
    defaultWargear: [
      { id: "fire-of-tzeentch-blue-fire", name: "Fire of Tzeentch – blue fire", image: "" },
      { id: "fire-of-tzeentch-pink-fire", name: "Fire of Tzeentch – pink fire", image: "" },
      { id: "flamer-mouths", name: "Flamer mouths", image: "" },
      { id: "screamer-bites", name: "Screamer bites", image: "" },
    ],
    wargear: [],
    ledBy: [],
  },

  {
    id: "exalted-seeker-chariot",
    name: "Exalted Seeker Chariot",
    faction: "chaos-daemons",
    category: "mounted",
    points: 115,
    defaultWargear: [
      { id: "lashes-of-torment", name: "Lashes of torment", image: "" },
      { id: "exalted-seeker-tongues", name: "Exalted Seeker tongues", image: "" },
      { id: "slashing-claws", name: "Slashing claws", image: "" },
    ],
    wargear: [],
    ledBy: [],
  },

  {
    id: "hellflayer",
    name: "Hellflayer",
    faction: "chaos-daemons",
    category: "mounted",
    points: 105,
    defaultWargear: [
      { id: "lashes-of-torment", name: "Lashes of torment", image: "" },
      { id: "bladed-axle", name: "Bladed axle", image: "" },
      { id: "seeker-tongues", name: "Seeker tongues", image: "" },
      { id: "slashing-claws", name: "Slashing claws", image: "" },
    ],
    wargear: [],
    ledBy: [],
  },

  {
    id: "plague-drones",
    name: "Plague Drones",
    faction: "chaos-daemons",
    category: "mounted",
    points: 110,
    modelCountOptions: [3, 6],
    pointsByModelCount: { 3: 110, 6: 220 },
    defaultWargear: [
      { id: "pd-deaths-heads", name: "Death's heads", image: "", profiles: [{ range: '12"', attacks: "D3", skill: "4+", strength: "4", ap: "0", damage: "1", keywords: ["BLAST", "LETHAL HITS"] }] },
      { id: "pd-foul-mouthparts", name: "Foul mouthparts", image: "", profiles: [{ range: "Melee", attacks: "2", skill: "4+", strength: "5", ap: "-1", damage: "2", keywords: ["EXTRA ATTACKS", "LETHAL HITS"] }] },
      { id: "pd-plaguesword", name: "Plaguesword", image: "", profiles: [{ range: "Melee", attacks: "2", skill: "3+", strength: "4", ap: "-1", damage: "1", keywords: ["LETHAL HITS"] }] },
    ],
    wargear: [
      { id: "pd-daemonic-icon", name: "Daemonic Icon", image: "", note: "Models in the bearer's unit have a Leadership characteristic of 6+." },
      { id: "pd-instrument-of-chaos", name: "Instrument of Chaos", image: "", note: "Add 1 to Charge rolls made for the bearer's unit." },
    ],
    ledBy: [],
    abilities: [
      {
        name: "Death's Heads",
        description: "In your Shooting phase, after this unit has shot, select one enemy unit hit by one or more of those attacks. Until the end of the turn, each time a friendly NURGLE LEGIONES DAEMONICA unit makes an attack that targets that unit, you can re-roll the Wound roll.",
      },
    ],
  },

  {
    id: "pox-riders",
    name: "Pox Riders",
    faction: "chaos-daemons",
    category: "mounted",
    points: 160,
    defaultWargear: [
      { id: "grasping-tongue", name: "Grasping tongue", image: "" },
      { id: "pox-rider-plaguesword", name: "Pox Rider plaguesword", image: "" },
      { id: "yawning-maw", name: "Yawning maw", image: "" },
    ],
    wargear: [],
    ledBy: [],
  },

  {
    id: "seeker-chariot",
    name: "Seeker Chariot",
    faction: "chaos-daemons",
    category: "mounted",
    points: 65,
    defaultWargear: [
      { id: "lashes-of-torment", name: "Lashes of torment", image: "" },
      { id: "seeker-tongues", name: "Seeker tongues", image: "" },
      { id: "slashing-claws", name: "Slashing claws", image: "" },
    ],
    wargear: [],
    ledBy: [],
  },

  {
    id: "seekers",
    name: "Seekers",
    faction: "chaos-daemons",
    category: "mounted",
    points: 80,
    defaultWargear: [
      { id: "lashing-tongue", name: "Lashing tongue", image: "" },
      { id: "slashing-claws", name: "Slashing claws", image: "" },
    ],
    wargear: [],
    ledBy: [],
  },

  {
    id: "skull-cannon",
    name: "Skull Cannon",
    faction: "chaos-daemons",
    category: "mounted",
    points: 95,
    defaultWargear: [
      { id: "skull-cannon", name: "Skull cannon", image: "" },
      { id: "attendants-hellblades", name: "Attendants' hellblades", image: "" },
      { id: "biting-maw", name: "Biting maw", image: "" },
    ],
    wargear: [],
    ledBy: [],
  },

  {
    id: "bloodletters",
    name: "Bloodletters",
    faction: "chaos-daemons",
    category: "battleline",
    points: 110,
    defaultWargear: [
      { id: "hellblade", name: "Hellblade", image: "" },
    ],
    wargear: [],
    ledBy: ["bloodmaster","skulltaker"],
  },

  {
    id: "cultist-mob",
    name: "Cultist Mob",
    faction: "chaos-daemons",
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
    faction: "chaos-daemons",
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
    id: "daemonettes",
    name: "Daemonettes",
    faction: "chaos-daemons",
    category: "battleline",
    points: 100,
    modelCountOptions: [10],
    pointsByModelCount: { 10: 100 },
    defaultWargear: [
      { id: "daemonettes-slashing-claws", name: "Slashing claws", image: "", profiles: [{ range: "Melee", attacks: "3", skill: "3+", strength: "4", ap: "-1", damage: "1", keywords: ["DEVASTATING WOUNDS"] }] },
    ],
    wargear: [
      { id: "daemonettes-daemonic-icon", name: "Daemonic Icon", image: "", note: "Models in the bearer's unit have a Leadership characteristic of 6+." },
      { id: "daemonettes-instrument-of-chaos", name: "Instrument of Chaos", image: "", note: "Add 1 to Charge rolls made for the bearer's unit." },
    ],
    ledBy: ["contorted-epitome","infernal-enrapturess","syll-esske","tranceweaver"],
    abilities: [
      {
        name: "Horrifying Beauty",
        description: "At the start of the Fight phase, each enemy unit within Engagement Range of one or more units from your army with this ability must take a Battle-shock test, subtracting 1 from the result if that enemy unit is Below Half-strength.",
      },
    ],
  },

  {
    id: "legionaries",
    name: "Legionaries",
    faction: "chaos-daemons",
    category: "battleline",
    points: 90,
    defaultWargear: [
      { id: "bolt-pistol", name: "Bolt pistol", image: "" },
      { id: "boltgun", name: "Boltgun", image: "" },
      { id: "close-combat-weapon", name: "Close combat weapon", image: "" },
    ],
    wargear: [
      { id: "flamer", name: "Flamer", image: "" },
      { id: "havoc-autocannon", name: "Havoc autocannon", image: "" },
      { id: "heavy-bolter", name: "Heavy bolter", image: "" },
      { id: "meltagun", name: "Meltagun", image: "" },
      { id: "lascannon", name: "Lascannon", image: "" },
      { id: "missile-launcher-frag", name: "Missile launcher – frag", image: "" },
      { id: "missile-launcher-krak", name: "Missile launcher – krak", image: "" },
      { id: "plasma-gun-standard", name: "Plasma gun – standard", image: "" },
      { id: "plasma-gun-supercharge", name: "Plasma gun – supercharge", image: "" },
      { id: "plasma-pistol", name: "Plasma pistol", image: "", profiles: [{ profileName: "standard", range: '12"', attacks: "1", skill: "3+", strength: "7", ap: "-2", damage: "1", keywords: ["PISTOL"] }, { profileName: "supercharge", range: '12"', attacks: "1", skill: "3+", strength: "8", ap: "-3", damage: "2", keywords: ["PISTOL", "HAZARDOUS"] }] },
      { id: "reaper-chaincannon", name: "Reaper chaincannon", image: "" },
      { id: "accursed-weapon", name: "Accursed weapon", image: "" },
      { id: "astartes-chainsword", name: "Astartes chainsword", image: "" },
      { id: "heavy-melee-weapon", name: "Heavy melee weapon", image: "" },
    ],
    ledBy: [],
  },

  {
    id: "nurglings",
    name: "Nurglings",
    faction: "chaos-daemons",
    category: "battleline",
    points: 40,
    modelCountOptions: [3, 6],
    pointsByModelCount: { 3: 40, 6: 70 },
    defaultWargear: [
      { id: "diseased-claws-and-teeth", name: "Diseased claws and teeth", image: "", profiles: [{ range: "Melee", attacks: "4", skill: "5+", strength: "2", ap: "0", damage: "1", keywords: ["LETHAL HITS"] }] },
    ],
    wargear: [],
    abilities: [
      {
        name: "Mischief Makers",
        description: "Each time an enemy unit (excluding TITANIC units) within Engagement Range of one or more units with this ability is selected to fight, until the end of the phase, each time a model in that enemy unit makes a melee attack, subtract 1 from the Hit roll.",
      },
    ],
    ledBy: [],
  },

  {
    id: "plaguebearers",
    name: "Plaguebearers",
    faction: "chaos-daemons",
    category: "battleline",
    modelCountOptions: [10],
    pointsByModelCount: { 10: 110 },
    defaultWargear: [
      { id: "plaguesword", name: "Plaguesword", image: "", profiles: [{ range: "Melee", attacks: "2", skill: "3+", strength: "4", ap: "-1", damage: "1", keywords: ["LETHAL HITS"] }] },
    ],
    wargear: [
      { id: "pb-daemonic-icon", name: "Daemonic Icon", image: "", note: "Models in the bearer's unit have a Leadership characteristic of 6+." },
      { id: "pb-instrument-of-chaos", name: "Instrument of Chaos", image: "", note: "Add 1 to Charge rolls made for the bearer's unit." },
    ],
    notes: [
      {
        id: "plaguebearers-daemonic-icon",
        text: "Daemonic Icon",
        checkbox: true,
        weaponId: "pb-daemonic-icon",
      },
      {
        id: "plaguebearers-instrument-of-chaos",
        text: "Instrument of Chaos",
        checkbox: true,
        weaponId: "pb-instrument-of-chaos",
      },
    ],
    abilities: [
      {
        name: "Infected Outbreak",
        description: "If you control an objective marker at the end of your Command phase and this unit is within range of that objective marker, that objective marker remains under your control, even if you have no models within range of it, until your opponent controls it at the start or end of any turn.",
      },
    ],
    ledBy: ["epidemius","poxbringer","sloppity-bilepiper","spoilpox-scrivener"],
  },

  {
    id: "accursed-cultists",
    name: "Accursed Cultists",
    faction: "chaos-daemons",
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
    id: "beasts-of-nurgle",
    name: "Beasts Of Nurgle",
    faction: "chaos-daemons",
    category: "infantry",
    points: 65,
    modelCountOptions: [1, 2],
    pointsByModelCount: { 1: 65, 2: 130 },
    defaultWargear: [
      { id: "bon-putrid-appendages", name: "Putrid appendages", image: "", profiles: [{ range: "Melee", attacks: "6", skill: "4+", strength: "6", ap: "-1", damage: "2", keywords: ["DEVASTATING WOUNDS"] }] },
    ],
    wargear: [],
    ledBy: ["horticulous-slimux"],
    abilities: [
      {
        name: "Grotesque Regeneration",
        description: "At the end of each phase, if a Beasts of Nurgle model in this unit has lost any wounds but is not destroyed, that model regains all of its lost wounds.",
      },
    ],
  },

  {
    id: "blue-horrors",
    name: "Blue Horrors",
    faction: "chaos-daemons",
    category: "infantry",
    points: 125,
    modelCountOptions: [10],
    pointsByModelCount: { 10: 125 },
    defaultWargear: [
      { id: "bh-coruscating-blue-flames", name: "Coruscating Blue Flames", image: "", profiles: [{ range: '18"', attacks: "2", skill: "4+", strength: "3", ap: "-1", damage: "1", keywords: ["PISTOL", "PSYCHIC"] }] },
      { id: "bh-coruscating-yellow-flames", name: "Coruscating Yellow Flames", image: "", profiles: [{ range: '18"', attacks: "2", skill: "5+", strength: "2", ap: "-1", damage: "1", keywords: ["PISTOL", "PSYCHIC"] }] },
      { id: "bh-blue-claws", name: "Blue claws", image: "", profiles: [{ range: "Melee", attacks: "1", skill: "5+", strength: "3", ap: "0", damage: "1" }] },
      { id: "bh-yellow-claws", name: "Yellow claws", image: "", profiles: [{ range: "Melee", attacks: "2", skill: "5+", strength: "2", ap: "0", damage: "1" }] },
    ],
    wargear: [],
    ledBy: ["changecaster","fluxmaster"],
    abilities: [
      {
        name: "Split",
        description: "Each time a BLUE HORROR model in this unit is destroyed, after the attacking unit has finished making its attacks, if this unit is not destroyed, roll one D6 for that model. On a 4+, add one BRIMSTONE HORROR model to this unit.",
      },
      {
        name: "Sullen Malevolence (Aura)",
        description: "While an enemy unit is within 6\" of this unit, if this unit contains one or more BLUE HORROR models, worsen the Leadership characteristic of models in that enemy unit by 1.",
      },
      {
        name: "Exploding Horrors",
        description: "Each time this unit is selected to fight, you can select one enemy unit within Engagement Range of it, then select one or more BRIMSTONE HORROR models in this unit. For each BRIMSTONE HORROR model you select, roll one D6: on a 4+, that model is destroyed and that enemy unit suffers 1 mortal wound.",
      },
    ],
  },

  {
    id: "chaos-terminator-squad",
    name: "Chaos Terminator Squad",
    faction: "chaos-daemons",
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
    ledBy: [],
  },

  {
    id: "chosen",
    name: "Chosen",
    faction: "chaos-daemons",
    category: "infantry",
    points: 125,
    defaultWargear: [
      { id: "bolt-pistol", name: "Bolt pistol", image: "" },
      { id: "boltgun", name: "Boltgun", image: "" },
      { id: "accursed-weapon", name: "Accursed weapon", image: "" },
      { id: "paired-accursed-weapons", name: "Paired accursed weapons", image: "" },
    ],
    wargear: [],
    ledBy: [],
  },

  {
    id: "dark-apostle",
    name: "Dark Apostle",
    faction: "chaos-daemons",
    category: "infantry",
    points: 75,
    defaultWargear: [
      { id: "bolt-pistol", name: "Bolt pistol", image: "" },
      { id: "accursed-crozius", name: "Accursed crozius", image: "" },
    ],
    wargear: [
      { id: "close-combat-weapon", name: "Close combat weapon", image: "" },
    ],
    ledBy: [],
  },

  {
    id: "dark-commune",
    name: "Dark Commune",
    faction: "chaos-daemons",
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
    id: "feculent-gnarlmaw",
    name: "Feculent Gnarlmaw",
    faction: "chaos-daemons",
    category: "infantry",
    points: 100,
    defaultWargear: [],
    wargear: [],
    ledBy: [],
  },

  {
    id: "fellgor-beastmen",
    name: "Fellgor Beastmen",
    faction: "chaos-daemons",
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
    id: "fiends",
    name: "Fiends",
    faction: "chaos-daemons",
    category: "infantry",
    points: 110,
    defaultWargear: [
      { id: "barbed-tail-and-dissecting-claws", name: "Barbed tail and dissecting claws", image: "" },
    ],
    wargear: [],
    ledBy: [],
  },

  {
    id: "flamers",
    name: "Flamers",
    faction: "chaos-daemons",
    category: "infantry",
    points: 65,
    defaultWargear: [
      { id: "flickering-flames", name: "Flickering Flames", image: "" },
      { id: "flamer-mouths", name: "Flamer mouths", image: "" },
    ],
    wargear: [],
    ledBy: [],
  },

  {
    id: "flesh-hounds",
    name: "Flesh Hounds",
    faction: "chaos-daemons",
    category: "infantry",
    points: 75,
    defaultWargear: [
      { id: "burning-roar", name: "Burning roar", image: "" },
      { id: "gore-drenched-fangs", name: "Gore-drenched fangs", image: "" },
    ],
    wargear: [],
    ledBy: [],
  },

  {
    id: "furies",
    name: "Furies",
    faction: "chaos-daemons",
    category: "infantry",
    points: 40,
    defaultWargear: [
      { id: "daemonic-claws", name: "Daemonic claws", image: "" },
    ],
    wargear: [],
    ledBy: [],
  },

  {
    id: "gellerpox-infected",
    name: "Gellerpox Infected",
    faction: "chaos-daemons",
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
    faction: "chaos-daemons",
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
    id: "mutoid-vermin",
    name: "Mutoid Vermin",
    faction: "chaos-daemons",
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
    faction: "chaos-daemons",
    category: "infantry",
    points: 55,
    defaultWargear: [
      { id: "electro-goads", name: "Electro-goads", image: "" },
    ],
    wargear: [],
    ledBy: [],
  },

  {
    id: "pink-horrors",
    name: "Pink Horrors",
    faction: "chaos-daemons",
    category: "infantry",
    points: 140,
    modelCountOptions: [10],
    pointsByModelCount: { 10: 140 },
    defaultWargear: [
      { id: "ph-coruscating-pink-flames", name: "Coruscating Pink Flames", image: "", profiles: [{ range: '18"', attacks: "2", skill: "3+", strength: "4", ap: "-1", damage: "1", keywords: ["PISTOL", "PSYCHIC"] }] },
      { id: "ph-coruscating-blue-flames", name: "Coruscating Blue Flames", image: "", profiles: [{ range: '18"', attacks: "2", skill: "4+", strength: "3", ap: "-1", damage: "1", keywords: ["PISTOL", "PSYCHIC"] }] },
      { id: "ph-coruscating-yellow-flames", name: "Coruscating Yellow Flames", image: "", profiles: [{ range: '18"', attacks: "2", skill: "5+", strength: "2", ap: "-1", damage: "1", keywords: ["PISTOL", "PSYCHIC"] }] },
      { id: "ph-pink-claws", name: "Pink claws", image: "", profiles: [{ range: "Melee", attacks: "1", skill: "4+", strength: "3", ap: "0", damage: "1" }] },
      { id: "ph-blue-claws", name: "Blue claws", image: "", profiles: [{ range: "Melee", attacks: "1", skill: "5+", strength: "3", ap: "0", damage: "1" }] },
      { id: "ph-yellow-claws", name: "Yellow claws", image: "", profiles: [{ range: "Melee", attacks: "2", skill: "5+", strength: "2", ap: "0", damage: "1" }] },
    ],
    wargear: [
      { id: "ph-daemonic-icon", name: "Daemonic Icon", image: "", note: "Models in the bearer's unit have a Leadership characteristic of 6+." },
      { id: "ph-instrument-of-chaos", name: "Instrument of Chaos", image: "", note: "Add 1 to Charge rolls made for the bearer's unit." },
    ],
    ledBy: ["changecaster","fluxmaster"],
    abilities: [
      {
        name: "Split",
        description: "Each time a PINK HORROR or BLUE HORROR model in this unit is destroyed, after the attacking unit has finished making its attacks, if this unit is not destroyed, roll one D6 for that model. On a 4+, if it was a PINK HORROR, add two BLUE HORROR models to this unit, and if it was a BLUE HORROR, add one BRIMSTONE HORROR model to this unit.",
      },
    ],
  },

  {
    id: "plague-toads",
    name: "Plague Toads",
    faction: "chaos-daemons",
    category: "infantry",
    points: 120,
    defaultWargear: [
      { id: "grasping-tongue", name: "Grasping tongue", image: "" },
      { id: "yawning-maw", name: "Yawning maw", image: "" },
    ],
    wargear: [],
    ledBy: [],
  },

  {
    id: "possessed",
    name: "Possessed",
    faction: "chaos-daemons",
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
    faction: "chaos-daemons",
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
    ledBy: [],
  },

  {
    id: "renegade-heavy-weapons-squad",
    name: "Renegade Heavy Weapons Squad",
    faction: "chaos-daemons",
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
    faction: "chaos-daemons",
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
    faction: "chaos-daemons",
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
    faction: "chaos-daemons",
    category: "infantry",
    points: 95,
    defaultWargear: [
      { id: "ogryn-plague-claws", name: "Ogryn plague claws", image: "" },
    ],
    wargear: [],
    ledBy: [],
  },

  {
    id: "screamers",
    name: "Screamers",
    faction: "chaos-daemons",
    category: "infantry",
    points: 80,
    modelCountOptions: [3, 6],
    pointsByModelCount: { 3: 80, 6: 160 },
    defaultWargear: [
      { id: "screamers-lamprey-bite", name: "Lamprey bite", image: "", profiles: [{ range: "Melee", attacks: "3", skill: "3+", strength: "6", ap: "-2", damage: "2", keywords: ["ANTI-MONSTER 4+", "ANTI-VEHICLE 4+"] }] },
    ],
    wargear: [],
    ledBy: [],
    abilities: [
      {
        name: "Slashing Dive",
        description: "In your Movement phase, after this unit ends a Normal move, you can select one enemy unit it moved over during that move and roll one D6 for each model in this unit: for each 4+, that enemy unit suffers 1 mortal wound.",
      },
    ],
  },

  {
    id: "skull-altar",
    name: "Skull Altar",
    faction: "chaos-daemons",
    category: "infantry",
    points: 105,
    defaultWargear: [],
    wargear: [],
    ledBy: [],
  },

  {
    id: "traitor-enforcer",
    name: "Traitor Enforcer",
    faction: "chaos-daemons",
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
    faction: "chaos-daemons",
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
    id: "warp-talons",
    name: "Warp Talons",
    faction: "chaos-daemons",
    category: "infantry",
    points: 125,
    defaultWargear: [
      { id: "warp-claws", name: "Warp claws", image: "" },
    ],
    wargear: [],
    ledBy: [],
  },

  {
    id: "soul-grinder",
    name: "Soul Grinder",
    faction: "chaos-daemons",
    category: "vehicle",
    points: 180,
    defaultWargear: [
      { id: "sg-harvester-cannon", name: "Harvester cannon", image: "", profiles: [{ range: '36"', attacks: "3", skill: "3+", strength: "10", ap: "-1", damage: "3" }] },
      { id: "sg-iron-claw", name: "Iron claw", image: "", profiles: [{ range: "Melee", attacks: "5", skill: "3+", strength: "16", ap: "-3", damage: "D6+2" }] },
    ],
    wargear: [
      { id: "sg-torrent-of-burning-blood", name: "Torrent of burning blood", image: "", profiles: [{ range: '12"', attacks: "2D6", skill: "N/A", strength: "5", ap: "-1", damage: "1", keywords: ["IGNORES COVER", "TORRENT"] }] },
      { id: "sg-warp-gaze", name: "Warp gaze", image: "", profiles: [{ range: '48"', attacks: "D3", skill: "3+", strength: "12", ap: "-2", damage: "D6+2", keywords: ["BLAST"] }] },
      { id: "sg-phlegm-bombardment", name: "Phlegm bombardment", image: "", profiles: [{ range: '36"', attacks: "D6+1", skill: "3+", strength: "7", ap: "-1", damage: "2", keywords: ["BLAST", "INDIRECT FIRE", "LETHAL HITS"] }] },
      { id: "sg-scream-of-despair", name: "Scream of despair", image: "", profiles: [{ range: '24"', attacks: "6", skill: "3+", strength: "9", ap: "-2", damage: "2", keywords: ["DEVASTATING WOUNDS", "SUSTAINED HITS 1"] }] },
      { id: "sg-warpsword", name: "Warpsword", image: "", profiles: [{ range: "Melee", attacks: "3", skill: "3+", strength: "8", ap: "-2", damage: "D6", keywords: ["EXTRA ATTACKS"] }] },
      { id: "sg-warpclaw", name: "Warpclaw", image: "", profiles: [{ range: "Melee", attacks: "6", skill: "3+", strength: "8", ap: "-1", damage: "2", keywords: ["EXTRA ATTACKS"] }] },
    ],
    wargearGroups: [
      ["sg-torrent-of-burning-blood", "sg-warp-gaze", "sg-phlegm-bombardment", "sg-scream-of-despair"],
      ["sg-warpsword", "sg-warpclaw"],
    ],
    defaultSelectedWargear: ["sg-torrent-of-burning-blood", "sg-warpsword"],
    ledBy: [],
    abilities: [
      {
        name: "Scuttling Walker",
        description: "Each time this model makes a Normal or Advance move, it can move over friendly MONSTER and VEHICLE models and terrain features that are 4\" or less in height as if they were not there.",
      },
      {
        name: "Damaged: 1-5 Wounds Remaining",
        description: "While this model has 1-5 wounds remaining, each time this model makes an attack, subtract 1 from the Hit roll.",
      },
      {
        name: "Daemonic Allegiance",
        description: "When you select this model, choose one keyword: KHORNE (additionally equipped with torrent of burning blood), TZEENTCH (warp gaze), NURGLE (phlegm bombardment), or SLAANESH (scream of despair).",
      },
    ],
  },

  {
    id: "giant-chaos-spawn",
    name: "Giant Chaos Spawn",
    faction: "chaos-daemons",
    category: "monster",
    points: 130,
    defaultWargear: [
      { id: "churning-fangs-and-claws", name: "Churning fangs and claws", image: "" },
    ],
    wargear: [],
    ledBy: [],
  },

  {
    id: "spined-chaos-beast",
    name: "Spined Chaos Beast",
    faction: "chaos-daemons",
    category: "monster",
    points: 145,
    defaultWargear: [
      { id: "jagged-claws-and-tusked-maw", name: "Jagged claws and tusked maw", image: "" },
    ],
    wargear: [],
    ledBy: [],
  },

];
