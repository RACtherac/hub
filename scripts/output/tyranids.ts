import type { Unit } from "../../src/types/warhammer";

export const tyranidsUnits: Unit[] = [

  {
    id: "gargoyles",
    name: "Gargoyles",
    faction: "tyranids",
    category: "battleline",
    modelCountOptions: [10, 20],
    points: 85,
    pointsByModelCount: { 10: 85, 20: 170 },
    abilities: [
      {
        name: "Winged Swarm",
        description: "In your Shooting phase, after this unit has shot, if it is not within Engagement Range of any enemy units, it can make a Normal move of up to 6\". If it does, until the end of the turn, this unit is not eligible to declare a charge.",
      },
    ],
    defaultWargear: [
      { id: "fleshborer", name: "Fleshborer", image: "", profiles: [{ range: '18"', attacks: "1", skill: "4+", strength: "5", ap: "0", damage: "1", keywords: ["ASSAULT"] }] },
      { id: "blinding-venom", name: "Blinding venom", image: "", profiles: [{ range: "Melee", attacks: "1", skill: "4+", strength: "3", ap: "0", damage: "1" }] },
    ],
    wargear: [],
    ledBy: ["winged-tyranid-prime"],
  },

  {
    id: "hormagaunts",
    name: "Hormagaunts",
    faction: "tyranids",
    category: "battleline",
    modelCountOptions: [10, 20],
    points: 65,
    pointsByModelCount: { 10: 65, 20: 130 },
    abilities: [
      {
        name: "Bounding Leap",
        description: "This unit is eligible to declare a charge in a turn in which it Advanced.",
      },
    ],
    defaultWargear: [
      { id: "hormagaunt-talons", name: "Hormagaunt talons", image: "", profiles: [{ range: "Melee", attacks: "3", skill: "4+", strength: "3", ap: "-1", damage: "1" }] },
    ],
    wargear: [],
    ledBy: ["tyranid-prime"],
  },

  {
    id: "termagants",
    name: "Termagants",
    faction: "tyranids",
    category: "battleline",
    points: 60,
    modelCountOptions: [10, 20],
    pointsByModelCount: { 10: 60, 20: 120 },
    defaultWargear: [
      { id: "fleshborer", name: "Fleshborer", image: "", profiles: [{ range: '18"', attacks: "1", skill: "4+", strength: "5", ap: "0", damage: "1", keywords: ["ASSAULT"] }] },
      { id: "chitinous-claws-and-teeth", name: "Chitinous claws and teeth", image: "", profiles: [{ range: "Melee", attacks: "1", skill: "4+", strength: "3", ap: "0", damage: "1" }] },
    ],
    wargear: [
      { id: "termagant-devourer", name: "Termagant devourer", image: "", countable: true, maxCountByModelCount: { 10: 10, 20: 20 }, profiles: [{ range: '18"', attacks: "2", skill: "4+", strength: "4", ap: "0", damage: "1" }] },
      { id: "termagant-spinefists", name: "Termagant spinefists", image: "", countable: true, maxCountByModelCount: { 10: 10, 20: 20 }, profiles: [{ range: '12"', attacks: "2", skill: "4+", strength: "3", ap: "0", damage: "1", keywords: ["ASSAULT", "PISTOL", "TWIN-LINKED"] }] },
      { id: "shardlauncher", name: "Shardlauncher", image: "", profiles: [{ range: '18"', attacks: "D3", skill: "4+", strength: "5", ap: "0", damage: "1", keywords: ["BLAST", "HEAVY"] }] },
      { id: "spike-rifle", name: "Spike rifle", image: "", profiles: [{ range: '24"', attacks: "1", skill: "4+", strength: "4", ap: "-1", damage: "1", keywords: ["HEAVY"] }] },
      { id: "strangleweb", name: "Strangleweb", image: "", profiles: [{ range: '18"', attacks: "D6", skill: "N/A", strength: "2", ap: "0", damage: "1", keywords: ["ASSAULT", "DEVASTATING WOUNDS", "TORRENT"] }] },
    ],
    notes: [
      {
        id: "devourer-swap",
        text: "All models can replace their fleshborer with Termagant devourers:",
        checkbox: true,
        image: "",
        triggersWargear: ["termagant-devourer"],
      },
      {
        id: "spinefists-swap",
        text: "All models can replace their fleshborer with Termagant spinefists:",
        checkbox: true,
        image: "",
        triggersWargear: ["termagant-spinefists"],
      },
      {
        id: "special-weapon-1",
        text: "1 model's ranged weapon can be replaced with one of the following:",
        checkbox: true,
        image: "",
        weaponIds: ["shardlauncher", "spike-rifle", "strangleweb"],
      },
      {
        id: "special-weapon-2",
        text: "2nd model's ranged weapon can be replaced with one of the following:",
        checkbox: true,
        image: "",
        weaponIds: ["shardlauncher", "spike-rifle", "strangleweb"],
        showForModelCounts: [20],
      },
    ],
    abilities: [
      {
        name: "Skulking Horrors",
        description: "Once per turn, when an enemy unit ends a Normal, Advance or Fall Back move within 9\" of this unit, if this unit is not within Engagement Range of one or more enemy units, it can make a Normal move of up to D6\".",
      },
    ],
    ledBy: [],
  },

  {
    id: "barbgaunts",
    name: "Barbgaunts",
    faction: "tyranids",
    category: "infantry",
    modelCountOptions: [5, 10],
    points: 55,
    pointsByModelCount: { 5: 55, 10: 110 },
    defaultWargear: [
      { id: "barblauncher", name: "Barblauncher", image: "", profiles: [{ range: '24"', attacks: "D6", skill: "4+", strength: "5", ap: "0", damage: "1", keywords: ["BLAST", "HEAVY"] }] },
      { id: "barbgaunt-chitinous-claws-and-teeth", name: "Chitinous claws and teeth", image: "", profiles: [{ range: "Melee", attacks: "1", skill: "4+", strength: "4", ap: "0", damage: "1" }] },
    ],
    wargear: [],
    abilities: [
      {
        name: "Disruption Bombardment",
        description: "In your Shooting phase, after this unit has shot, select one enemy INFANTRY unit hit by one or more of those attacks. Until the end of your opponent's next turn, that enemy unit is disrupted. While a unit is disrupted, subtract 2 from its Move characteristic and subtract 2 from Advance and Charge rolls made for it.",
      },
    ],
    ledBy: [],
  },

  {
    id: "biovores",
    name: "Biovores",
    faction: "tyranids",
    category: "infantry",
    modelCountOptions: [1, 2, 3],
    points: 50,
    pointsByModelCount: { 1: 50, 2: 100, 3: 150 },
    abilities: [
      {
        name: "Seed Spore Mines",
        description: "Once per turn, in your Shooting phase, when selected to shoot, one unit with this ability can use it instead of making any attacks with its ranged weapons. If it does, you can add one new SPORE MINES unit to your army and set it up anywhere on the battlefield that is wholly within 48\" of this unit and more than 9\" horizontally away from all enemy units. That SPORE MINES unit contains 1 model for each model in this unit.",
      },
    ],
    defaultWargear: [
      { id: "spore-mine-launcher", name: "Spore Mine launcher", image: "", profiles: [{ range: '48"', attacks: "D3", skill: "4+", strength: "6", ap: "-1", damage: "2", keywords: ["BLAST", "DEVASTATING WOUNDS", "HEAVY", "INDIRECT FIRE"] }] },
      { id: "chitin-barbed-limbs", name: "Chitin-barbed limbs", image: "", profiles: [{ range: "Melee", attacks: "2", skill: "4+", strength: "5", ap: "0", damage: "1" }] },
    ],
    wargear: [],
    ledBy: [],
  },

  {
    id: "genestealers",
    name: "Genestealers",
    faction: "tyranids",
    category: "infantry",
    points: 75,
    pointsByModelCount: { 5: 75, 10: 140 },
    modelCountOptions: [5, 10],
    abilities: [
      {
        name: "Vanguard Predator",
        description: "Each time a model in this unit makes an attack, re-roll a Hit roll of 1. If the target is within range of one or more objective markers, re-roll a Wound roll of 1 as well.",
      },
    ],
    defaultWargear: [
      { id: "genestealer-claws-and-talons", name: "Genestealer claws and talons", image: "", profiles: [{ range: "Melee", attacks: "4", skill: "2+", strength: "4", ap: "-2", damage: "1" }] },
    ],
    wargear: [],
    ledBy: ["broodlord"],
  },

  {
    id: "hive-guard",
    name: "Hive Guard",
    faction: "tyranids",
    category: "infantry",
    modelCountOptions: [3, 6],
    points: 90,
    pointsByModelCount: { 3: 90, 6: 190 },
    defaultWargear: [
      { id: "hive-guard-chitinous-claws-and-teeth", name: "Chitinous claws and teeth", image: "", profiles: [{ range: "Melee", attacks: "3", skill: "4+", strength: "5", ap: "0", damage: "1" }] },
    ],
    wargear: [
      { id: "hive-guard-impaler-cannon", name: "Impaler cannon", image: "", countable: true, maxCountByModelCount: { 3: 3, 6: 6 }, linkedCounterId: "hive-guard-shockcannon", profiles: [{ range: '36"', attacks: "4", skill: "4+", strength: "5", ap: "-1", damage: "1", keywords: ["HEAVY", "INDIRECT FIRE"] }] },
      { id: "hive-guard-shockcannon", name: "Shockcannon", image: "", countable: true, maxCountByModelCount: { 3: 3, 6: 6 }, profiles: [{ range: '24"', attacks: "2", skill: "3+", strength: "7", ap: "-1", damage: "3", keywords: ["ANTI-VEHICLE 2+"] }] },
    ],
    abilities: [
      {
        name: "Defensive Stance",
        description: "Each time you target this unit with the Fire Overwatch Stratagem, while resolving that Stratagem, hits are scored on unmodified Hit rolls of 5+, or unmodified Hit rolls of 4+ instead if this unit is within range of an objective marker.",
      },
    ],
    ledBy: [],
  },

  {
    id: "lictor",
    name: "Lictor",
    faction: "tyranids",
    category: "infantry",
    modelCountOptions: [1],
    points: 60,
    defaultWargear: [
      { id: "lictor-claws-and-talons", name: "Lictor claws and talons", image: "", profiles: [{ range: "Melee", attacks: "6", skill: "2+", strength: "7", ap: "-2", damage: "2", keywords: ["PRECISION"] }] },
    ],
    wargear: [],
    abilities: [
      {
        name: "Feeder Tendrils",
        description: "Each time this model destroys an enemy CHARACTER model, you gain 1CP.",
      },
      {
        name: "Pheromone Trail",
        description: "Once per battle round, you can target one model with this ability with the Rapid Ingress Stratagem for 0CP.",
      },
    ],
    ledBy: [],
  },

  {
    id: "mucolid-spores",
    name: "Mucolid Spores",
    faction: "tyranids",
    category: "infantry",
    points: 30,
    defaultWargear: [],
    wargear: [],
    ledBy: [],
  },

  {
    id: "neurogaunts",
    name: "Neurogaunts",
    faction: "tyranids",
    category: "infantry",
    modelCountOptions: [11, 22],
    pointsByModelCount: { 11: 45, 22: 90 },
    defaultWargear: [
      { id: "neurogaunts-chitinous-claws-and-teeth", name: "Chitinous claws and teeth", image: "", profiles: [{ range: "Melee", attacks: "1", skill: "4+", strength: "3", ap: "0", damage: "1" }] },
    ],
    wargear: [],
    abilities: [
      {
        name: "Neurocytes",
        description: "While this unit is within Synapse Range of a friendly TYRANIDS unit (excluding NEUROGAUNT units), it has the SYNAPSE keyword.",
      },
    ],
    ledBy: [],
  },

  {
    id: "neurolictor",
    name: "Neurolictor",
    faction: "tyranids",
    category: "infantry",
    modelCountOptions: [1],
    pointsByModelCount: { 1: 70 },
    defaultWargear: [
      { id: "neurolictor-piercing-claws-and-talons", name: "Piercing claws and talons", image: "", profiles: [{ range: "Melee", attacks: "6", skill: "2+", strength: "6", ap: "-2", damage: "1", keywords: ["PRECISION"] }] },
    ],
    wargear: [],
    abilities: [
      {
        name: "Feeder Tendrils",
        description: "Each time this model destroys an enemy CHARACTER model, you gain 1CP.",
      },
      {
        name: "Neural Disruption",
        description: "In your Command phase, select one enemy unit within 12\" of this model. That unit must take a Battle-shock test.",
      },
      {
        name: "Psychological Saboteur (Aura)",
        description: "While an enemy unit is within 12\" of this model, if that unit is Battle-shocked: Each time a model in that unit makes an attack, subtract 1 from the Hit roll. Each time a friendly TYRANIDS model makes an attack that targets that unit, add 1 to the Wound roll.",
      },
    ],
    ledBy: [],
  },

  {
    id: "pyrovores",
    name: "Pyrovores",
    faction: "tyranids",
    category: "infantry",
    modelCountOptions: [1, 2, 3],
    points: 40,
    pointsByModelCount: { 1: 40, 2: 70, 3: 105 },
    abilities: [
      {
        name: "Burning Spray",
        description: "In your Shooting phase, after this unit has shot, select one enemy unit hit by one or more of those attacks. Until the end of the phase, that enemy unit cannot have the Benefit of Cover.",
      },
    ],
    defaultWargear: [
      { id: "flamespurt", name: "Flamespurt", image: "", profiles: [{ range: '12"', attacks: "D6+1", skill: "N/A", strength: "6", ap: "-1", damage: "1", keywords: ["IGNORES COVER", "TORRENT", "TWIN-LINKED"] }] },
      { id: "chitin-barbed-limbs", name: "Chitin-barbed limbs", image: "", profiles: [{ range: "Melee", attacks: "2", skill: "4+", strength: "5", ap: "0", damage: "1" }] },
    ],
    wargear: [],
    ledBy: [],
  },

  {
    id: "raveners",
    name: "Raveners",
    faction: "tyranids",
    category: "infantry",
    modelCountOptions: [5],
    pointsByModelCount: { 5: 125 },
    defaultWargear: [
      { id: "ravener-claws-and-talons", name: "Ravener claws and talons", image: "", profiles: [{ range: "Melee", attacks: "3", skill: "3+", strength: "5", ap: "-2", damage: "2", keywords: ["TWIN-LINKED"] }] },
    ],
    wargear: [],
    abilities: [
      {
        name: "Death From Below",
        description: "At the end of your opponent's turn, if this unit is not within Engagement Range of one or more enemy units, you can remove it from the battlefield and place it into Strategic Reserves.",
      },
    ],
    ledBy: [],
  },

  {
    id: "ripper-swarms",
    name: "Ripper Swarms",
    faction: "tyranids",
    category: "infantry",
    modelCountOptions: [1, 2, 3],
    pointsByModelCount: { 1: 25, 2: 40, 3: 50 },
    defaultWargear: [
      { id: "ripper-spinemaws", name: "Spinemaws", image: "", profiles: [{ range: '6"', attacks: "4", skill: "5+", strength: "3", ap: "0", damage: "1", keywords: ["PISTOL"] }] },
      { id: "ripper-chitinous-claws-and-teeth", name: "Chitinous claws and teeth", image: "", profiles: [{ range: "Melee", attacks: "6", skill: "5+", strength: "2", ap: "0", damage: "1", keywords: ["SUSTAINED HITS 1"] }] },
    ],
    wargear: [],
    abilities: [
      {
        name: "Chitinous Horrors (Aura)",
        description: "While an enemy unit is within Engagement Range of this unit, halve the Objective Control characteristic of models in that enemy unit.",
      },
    ],
    ledBy: [],
  },

  {
    id: "sky-slasher-swarms",
    name: "Sky Slasher Swarms",
    faction: "tyranids",
    category: "infantry",
    points: 60,
    defaultWargear: [
      { id: "claws-and-teeth", name: "Claws and teeth", image: "" },
    ],
    wargear: [
      { id: "spinemaws", name: "Spinemaws", image: "" },
    ],
    ledBy: [],
  },

  {
    id: "spore-mines",
    name: "Spore Mines",
    faction: "tyranids",
    category: "infantry",
    modelCountOptions: [3, 6],
    pointsByModelCount: { 3: 55, 6: 110 },
    defaultWargear: [],
    wargear: [],
    abilities: [
      {
        name: "Bio-minefield",
        description: "Enemy units cannot start or end an Advance move within 6\" of this unit.",
      },
      {
        name: "Floating Death",
        description: "Each time this unit or an enemy unit ends a move, for each model in this unit that is within 3\" of one or more enemy units, select one of those enemy units. That model in this unit is destroyed, then roll one D6: on a 2-5, that enemy unit suffers 1 mortal wound; on a 6, that enemy unit suffers D3 mortal wounds.",
      },
    ],
    ledBy: [],
  },

  {
    id: "tyranid-warriors-with-melee-bio-weapons",
    name: "Tyranid Warriors With Melee Bio Weapons",
    faction: "tyranids",
    category: "infantry",
    modelCountOptions: [3, 6],
    pointsByModelCount: { 3: 75, 6: 150 },
    defaultWargear: [
      { id: "tyranid-warrior-claws-and-talons", name: "Tyranid Warrior claws and talons", image: "", profiles: [{ range: "Melee", attacks: "6", skill: "3+", strength: "5", ap: "-2", damage: "1", keywords: ["TWIN-LINKED"] }] },
    ],
    wargear: [],
    abilities: [
      {
        name: "Adaptive Instincts",
        description: "At the start of the Fight phase, select one of the following:\n• Aggression Imperative: Until the end of the phase, each time a model in this unit makes an attack, re-roll a Hit roll of 1.\n• Bioregeneration: Until the end of the phase, each time a saving throw is made for a model in this unit, re-roll a saving throw of 1.",
      },
    ],
    ledBy: [],
  },

  {
    id: "tyranid-warriors-with-ranged-bio-weapons",
    name: "Tyranid Warriors With Ranged Bio Weapons",
    faction: "tyranids",
    category: "infantry",
    modelCountOptions: [3, 6],
    pointsByModelCount: { 3: 65, 6: 130 },
    defaultWargear: [
      { id: "tw-ranged-devourer", name: "Devourer", image: "", profiles: [{ range: '18"', attacks: "5", skill: "4+", strength: "4", ap: "0", damage: "1" }] },
      { id: "tw-ranged-warrior-claws-and-talons", name: "Tyranid Warrior claws and talons", image: "", profiles: [{ range: "Melee", attacks: "5", skill: "3+", strength: "5", ap: "-1", damage: "1" }] },
    ],
    wargear: [
      { id: "tw-ranged-deathspitter", name: "Deathspitter", image: "", countable: true, maxCountByModelCount: { 3: 3, 6: 6 }, profiles: [{ range: '24"', attacks: "3", skill: "4+", strength: "5", ap: "-1", damage: "1" }] },
      { id: "tw-ranged-spinefists", name: "Spinefists", image: "", countable: true, maxCountByModelCount: { 3: 3, 6: 6 }, profiles: [{ range: '12"', attacks: "2", skill: "4+", strength: "4", ap: "0", damage: "1", keywords: ["ASSAULT", "PISTOL", "TWIN-LINKED"] }] },
      { id: "tw-ranged-barbed-strangler", name: "Barbed strangler", image: "", countable: true, maxCountByModelCount: { 3: 1, 6: 2 }, profiles: [{ range: '36"', attacks: "D6+1", skill: "4+", strength: "6", ap: "-1", damage: "1", keywords: ["BLAST"] }] },
      { id: "tw-ranged-venom-cannon", name: "Venom cannon", image: "", countable: true, maxCountByModelCount: { 3: 1, 6: 2 }, profiles: [{ range: '36"', attacks: "D3", skill: "4+", strength: "9", ap: "-2", damage: "2", keywords: ["BLAST"] }] },
    ],
    abilities: [
      {
        name: "Adaptable Predators",
        description: "This unit is eligible to shoot and declare a charge in a turn in which it Fell Back.",
      },
    ],
    ledBy: [],
  },

  {
    id: "tyrant-guard",
    name: "Tyrant Guard",
    faction: "tyranids",
    category: "infantry",
    modelCountOptions: [3, 6],
    points: 80,
    pointsByModelCount: { 3: 80, 6: 160 },
    abilities: [
      {
        name: "Guardian Organism",
        description: "While a CHARACTER model is leading this unit, that CHARACTER has the Feel No Pain 5+ ability.",
      },
    ],
    defaultWargear: [],
    wargear: [
      { id: "scything-talons-and-rending-claws", name: "Scything talons and rending claws", image: "", profiles: [{ range: "Melee", attacks: "5", skill: "3+", strength: "5", ap: "-1", damage: "1" }] },
      { id: "bone-cleaver-lash-whip-and-rending-claws", name: "Bone cleaver, lash whip and rending claws", image: "", profiles: [{ range: "Melee", attacks: "3", skill: "3+", strength: "5", ap: "-1", damage: "2" }] },
      { id: "crushing-claws-and-rending-claws", name: "Crushing claws and rending claws", image: "", profiles: [{ range: "Melee", attacks: "2", skill: "4+", strength: "8", ap: "-2", damage: "2", keywords: ["TWIN-LINKED"] }] },
    ],
    ledBy: ["hive-tyrant","neurotyrant","the-swarmlord"],
  },

  {
    id: "venomthropes",
    name: "Venomthropes",
    faction: "tyranids",
    category: "infantry",
    points: 70,
    defaultWargear: [
      { id: "toxic-lashes", name: "Toxic lashes", image: "" },
    ],
    wargear: [],
    ledBy: [],
  },

  {
    id: "von-ryan-s-leapers",
    name: "Von Ryan's Leapers",
    faction: "tyranids",
    category: "infantry",
    modelCountOptions: [3, 6],
    points: 70,
    pointsByModelCount: { 3: 70, 6: 140 },
    abilities: [
      {
        name: "Pouncing Leap",
        description: "You can target this unit with the Heroic Intervention Stratagem for 0CP, and can do so even if you have already used that Stratagem on a different unit this phase.",
      },
    ],
    defaultWargear: [
      { id: "leaper-s-talons", name: "Leaper's talons", image: "", profiles: [{ range: "Melee", attacks: "6", skill: "3+", strength: "5", ap: "-1", damage: "1" }] },
    ],
    wargear: [],
    ledBy: [],
  },

  {
    id: "zoanthropes",
    name: "Zoanthropes",
    faction: "tyranids",
    category: "infantry",
    modelCountOptions: [3, 6],
    pointsByModelCount: { 3: 100, 6: 200 },
    defaultWargear: [
      { id: "zoanthrope-chitinous-claws-and-teeth", name: "Chitinous claws and teeth", image: "", profiles: [{ range: "Melee", attacks: "1", skill: "4+", strength: "3", ap: "0", damage: "1" }] },
    ],
    wargear: [],
    abilities: [
      {
        name: "Spirit Leech (Aura, Psychic)",
        description: "While an enemy unit is within 6\" of this unit, if this unit contains a Neurothrope, each time that enemy unit fails a Battle-shock test, it suffers D3 mortal wounds and one model in this unit regains up to D3 lost wounds.",
      },
      {
        name: "Warp Field (Aura, Psychic)",
        description: "While a friendly TYRANIDS unit is within 6\" of this unit, models in that unit have a 6+ invulnerable save.",
      },
    ],
    ledBy: [],
  },

  {
    id: "barbed-hierodule",
    name: "Barbed Hierodule",
    faction: "tyranids",
    category: "monster",
    points: 340,
    defaultWargear: [
      { id: "bio-cannon", name: "Bio-cannon", image: "" },
      { id: "hierodule-scything-talons", name: "Hierodule scything talons", image: "" },
    ],
    wargear: [],
    ledBy: [],
  },

  {
    id: "carnifexes",
    name: "Carnifexes",
    faction: "tyranids",
    category: "monster",
    image: "/Warhammerimages/Tyranids/carnifex.png",
    modelCountOptions: [1, 2],
    pointsByModelCount: { 1: 90, 2: 180 },
    defaultWargear: [
      { id: "carnifex-extra-scything-talons", name: "Carnifex extra scything talons", image: "", profiles: [{ range: "Melee", attacks: "2", skill: "4+", strength: "9", ap: "-2", damage: "3", keywords: ["EXTRA ATTACKS"] }] },
      { id: "carnifex-scything-talons", name: "Carnifex scything talons", image: "", profiles: [{ range: "Melee", attacks: "6", skill: "4+", strength: "9", ap: "-2", damage: "3" }] },
      { id: "carnifex-chitinous-claws-and-teeth", name: "Chitinous claws and teeth", image: "", profiles: [{ range: "Melee", attacks: "4", skill: "4+", strength: "6", ap: "0", damage: "1" }] },
    ],
    wargear: [
      { id: "carnifex-deathspitters", name: "Deathspitters with slimer maggots", image: "", countable: true, maxCountByModelCount: { 1: 1, 2: 2 }, wargearGroup: "carnifex-extra-slot", profiles: [{ range: '24"', attacks: "6", skill: "4+", strength: "7", ap: "-2", damage: "1" }] },
      { id: "carnifex-devourers", name: "Devourers with brainleech worms", image: "", countable: true, maxCountByModelCount: { 1: 1, 2: 2 }, wargearGroup: "carnifex-extra-slot", profiles: [{ range: '18"', attacks: "12", skill: "4+", strength: "6", ap: "0", damage: "1" }] },
      { id: "carnifex-heavy-venom-cannon", name: "Heavy venom cannon", image: "", countable: true, maxCountByModelCount: { 1: 1, 2: 2 }, wargearGroup: "carnifex-extra-slot", profiles: [{ range: '36"', attacks: "D3", skill: "4+", strength: "9", ap: "-2", damage: "3", keywords: ["BLAST"] }] },
      { id: "carnifex-stranglethorn-cannon", name: "Stranglethorn cannon", image: "", countable: true, maxCountByModelCount: { 1: 1, 2: 2 }, wargearGroup: "carnifex-extra-slot", profiles: [{ range: '36"', attacks: "D6+1", skill: "4+", strength: "7", ap: "-1", damage: "2", keywords: ["BLAST"] }] },
      { id: "carnifex-crushing-claws", name: "Carnifex crushing claws", image: "", countable: true, maxCountByModelCount: { 1: 1, 2: 2 }, wargearGroup: "carnifex-extra-slot", profiles: [{ range: "Melee", attacks: "4", skill: "4+", strength: "12", ap: "-3", damage: "D6+1" }] },
      { id: "carnifex-deathspitters-scything", name: "Deathspitters with slimer maggots", image: "", countable: true, maxCountByModelCount: { 1: 1, 2: 2 }, wargearGroup: "carnifex-scything-slot", profiles: [{ range: '24"', attacks: "6", skill: "4+", strength: "7", ap: "-2", damage: "1" }] },
      { id: "carnifex-devourers-scything", name: "Devourers with brainleech worms", image: "", countable: true, maxCountByModelCount: { 1: 1, 2: 2 }, wargearGroup: "carnifex-scything-slot", profiles: [{ range: '18"', attacks: "12", skill: "4+", strength: "6", ap: "0", damage: "1" }] },
      { id: "carnifex-crushing-claws-scything", name: "Carnifex crushing claws", image: "", countable: true, maxCountByModelCount: { 1: 1, 2: 2 }, wargearGroup: "carnifex-scything-slot", profiles: [{ range: "Melee", attacks: "4", skill: "4+", strength: "12", ap: "-3", damage: "D6+1" }] },
      { id: "carnifex-bio-plasma", name: "Bio-plasma", image: "", countable: true, maxCountByModelCount: { 1: 1, 2: 2 }, profiles: [{ range: '12"', attacks: "D3", skill: "4+", strength: "7", ap: "-2", damage: "1", keywords: ["ASSAULT", "BLAST"] }] },
      { id: "carnifex-spine-banks", name: "Spine banks", image: "", countable: true, maxCountByModelCount: { 1: 1, 2: 2 }, profiles: [{ range: '6"', attacks: "5", skill: "4+", strength: "5", ap: "0", damage: "1", keywords: ["ASSAULT"] }] },
    ],
    abilities: [
      {
        name: "Blistering Assault",
        description: "Each time an enemy unit is selected to shoot, after that unit has shot, if any models from this unit lost one or more wounds as a result of those attacks, this unit can make a Blistering Assault move. If it does, roll one D6, adding 2 to the result: each model in this unit can be moved a distance in inches up to the result, but this unit must finish that move as close as possible to the closest enemy unit. When doing so, those models can be moved within Engagement Range of that enemy unit. Each unit can only make one Blistering Assault move per phase.",
      },
    ],
    ledBy: ["old-one-eye"],
  },

  {
    id: "dimachaeron",
    name: "Dimachaeron",
    faction: "tyranids",
    category: "monster",
    points: 200,
    defaultWargear: [
      { id: "massive-scything-sickle-talons", name: "Massive scything sickle-talons", image: "" },
    ],
    wargear: [],
    ledBy: [],
  },

  {
    id: "exocrine",
    name: "Exocrine",
    faction: "tyranids",
    category: "monster",
    points: 140,
    defaultWargear: [
      { id: "bio-plasmic-cannon", name: "Bio-plasmic cannon", image: "" },
      { id: "powerful-limbs", name: "Powerful limbs", image: "" },
    ],
    wargear: [],
    ledBy: [],
  },

  {
    id: "harpy",
    name: "Harpy",
    faction: "tyranids",
    category: "monster",
    points: 215,
    defaultWargear: [
      { id: "stinger-salvoes", name: "Stinger salvoes", image: "" },
      { id: "twin-stranglethorn-cannon", name: "Twin stranglethorn cannon", image: "" },
      { id: "scything-wings", name: "Scything wings", image: "" },
    ],
    wargear: [
      { id: "twin-heavy-venom-cannon", name: "Twin heavy venom cannon", image: "" },
    ],
    ledBy: [],
  },

  {
    id: "haruspex",
    name: "Haruspex",
    faction: "tyranids",
    category: "monster",
    points: 125,
    defaultWargear: [
      { id: "grasping-tongue", name: "Grasping tongue", image: "" },
      { id: "ravenous-maw", name: "Ravenous maw", image: "" },
      { id: "shovelling-claws", name: "Shovelling claws", image: "" },
    ],
    wargear: [],
    ledBy: [],
  },

  {
    id: "hive-crone",
    name: "Hive Crone",
    faction: "tyranids",
    category: "monster",
    points: 200,
    defaultWargear: [
      { id: "drool-cannon", name: "Drool cannon", image: "" },
      { id: "stinger-salvoes", name: "Stinger salvoes", image: "" },
      { id: "tentaclids", name: "Tentaclids", image: "" },
      { id: "scything-wings", name: "Scything wings", image: "" },
      { id: "thorax-spur", name: "Thorax spur", image: "" },
    ],
    wargear: [],
    ledBy: [],
  },

  {
    id: "maleceptor",
    name: "Maleceptor",
    faction: "tyranids",
    category: "monster",
    points: 170,
    defaultWargear: [
      { id: "psychic-overload", name: "Psychic overload", image: "" },
      { id: "massive-scything-talons-strike", name: "Massive scything talons – strike", image: "" },
      { id: "massive-scything-talons-sweep", name: "Massive scything talons – sweep", image: "" },
    ],
    wargear: [],
    ledBy: [],
  },

  {
    id: "mawloc",
    name: "Mawloc",
    faction: "tyranids",
    category: "monster",
    points: 145,
    defaultWargear: [
      { id: "distensible-jaw", name: "Distensible jaw", image: "" },
      { id: "mawloc-scything-talons", name: "Mawloc scything talons", image: "" },
    ],
    wargear: [],
    ledBy: [],
  },

  {
    id: "norn-assimilator",
    name: "Norn Assimilator",
    faction: "tyranids",
    category: "monster",
    points: 275,
    defaultWargear: [
      { id: "toxinjector-harpoon", name: "Toxinjector Harpoon", image: "" },
      { id: "monstrous-scything-talons", name: "Monstrous scything talons", image: "" },
    ],
    wargear: [],
    ledBy: [],
  },

  {
    id: "norn-emissary",
    name: "Norn Emissary",
    faction: "tyranids",
    category: "monster",
    points: 260,
    defaultWargear: [
      { id: "psychic-tendril-neuroparasite", name: "Psychic Tendril – neuroparasite", image: "" },
      { id: "psychic-tendril-neuroblast", name: "Psychic Tendril – neuroblast", image: "" },
      { id: "psychic-tendril-neurolance", name: "Psychic Tendril – neurolance", image: "" },
      { id: "monstrous-scything-talons", name: "Monstrous scything talons", image: "" },
      { id: "monstrous-rending-claws", name: "Monstrous rending claws", image: "" },
    ],
    wargear: [],
    ledBy: [],
  },

  {
    id: "psychophage",
    name: "Psychophage",
    faction: "tyranids",
    category: "monster",
    modelCountOptions: [1],
    pointsByModelCount: { 1: 110 },
    defaultWargear: [
      { id: "psychoclastic-torrent", name: "Psychoclastic torrent", image: "", profiles: [{ range: '12"', attacks: "D6", skill: "N/A", strength: "6", ap: "-1", damage: "1", keywords: ["IGNORES COVER", "TORRENT"] }] },
      { id: "talons-and-betentacled-maw", name: "Talons and betentacled maw", image: "", profiles: [{ range: "Melee", attacks: "6", skill: "3+", strength: "6", ap: "-2", damage: "2", keywords: ["ANTI-PSYKER 4+", "DEVASTATING WOUNDS"] }] },
    ],
    wargear: [],
    abilities: [
      {
        name: "Bio-stimulus",
        description: "In your Shooting phase, after this model has shot, select one enemy unit hit by one or more of those attacks. Until the end of the turn, each time a friendly TYRANIDS unit makes a melee attack that targets that enemy unit, improve the Armour Penetration characteristic of that attack by 1. The same enemy unit can only be affected by this ability once per turn.",
      },
      {
        name: "Feeding Frenzy",
        description: "Each time this model makes a melee attack that targets a unit that is below its Starting Strength, add 1 to the Hit roll. If that target is also Below Half-strength, add 1 to the Wound roll as well.",
      },
    ],
    ledBy: [],
  },

  {
    id: "screamer-killer",
    name: "Screamer Killer",
    faction: "tyranids",
    category: "monster",
    points: 125,
    defaultWargear: [
      { id: "bio-plasmic-scream", name: "Bio-plasmic scream", image: "", profiles: [{ range: '18"', attacks: "D6+3", skill: "4+", strength: "8", ap: "-2", damage: "1", keywords: ["ASSAULT", "BLAST"] }] },
      { id: "screamer-killer-talons", name: "Screamer-killer talons", image: "", profiles: [{ range: "Melee", attacks: "10", skill: "3+", strength: "10", ap: "-2", damage: "3" }] },
    ],
    wargear: [],
    abilities: [
      {
        name: "Death Scream",
        description: "In your Shooting phase, after this model has shot, select one unit hit by one or more of those attacks. That unit must take a Battle-shock test, subtracting 1 from that test.",
      },
    ],
    ledBy: [],
  },

  {
    id: "scythed-hierodule",
    name: "Scythed Hierodule",
    faction: "tyranids",
    category: "monster",
    points: 330,
    defaultWargear: [
      { id: "bio-acid-spray", name: "Bio-acid spray", image: "" },
      { id: "hierodule-scything-talons", name: "Hierodule scything talons", image: "" },
    ],
    wargear: [],
    ledBy: [],
  },

  {
    id: "sporocyst",
    name: "Sporocyst",
    faction: "tyranids",
    category: "monster",
    points: 145,
    defaultWargear: [
      { id: "sporocyst-bio-weapons", name: "Sporocyst bio-weapons", image: "" },
      { id: "flensing-whips", name: "Flensing whips", image: "" },
    ],
    wargear: [],
    ledBy: [],
  },

  {
    id: "toxicrene",
    name: "Toxicrene",
    faction: "tyranids",
    category: "monster",
    points: 150,
    defaultWargear: [
      { id: "massive-toxic-lashes", name: "Massive toxic lashes", image: "" },
    ],
    wargear: [],
    ledBy: [],
  },

  {
    id: "trygon",
    name: "Trygon",
    faction: "tyranids",
    category: "monster",
    points: 140,
    defaultWargear: [
      { id: "bio-electric-pulse", name: "Bio-electric pulse", image: "" },
      { id: "trygon-scything-talons", name: "Trygon scything talons", image: "" },
    ],
    wargear: [],
    ledBy: [],
  },

  {
    id: "tyrannofex",
    name: "Tyrannofex",
    faction: "tyranids",
    category: "monster",
    points: 200,
    abilities: [
      {
        name: "Resilient Organism",
        description: "Once per battle, when an attack is allocated to this model, you can change the Damage characteristic of that attack to 0.",
      },
    ],
    defaultWargear: [
      { id: "stinger-salvoes", name: "Stinger salvoes", image: "", profiles: [{ range: '24"', attacks: "8", skill: "3+", strength: "5", ap: "0", damage: "1" }] },
      { id: "powerful-limbs", name: "Powerful limbs", image: "", profiles: [{ range: "Melee", attacks: "4", skill: "3+", strength: "8", ap: "0", damage: "2" }] },
    ],
    wargearGroups: [["fleshborer-hive", "acid-spray", "rupture-cannon"]],
    wargear: [
      { id: "fleshborer-hive", name: "Fleshborer hive", image: "", profiles: [{ range: '24"', attacks: "20", skill: "3+", strength: "5", ap: "0", damage: "1", keywords: ["HEAVY", "SUSTAINED HITS 1", "TWIN-LINKED"] }] },
      { id: "acid-spray", name: "Acid spray", image: "", profiles: [{ range: '18"', attacks: "D6+6", skill: "N/A", strength: "6", ap: "-2", damage: "2", keywords: ["TORRENT"] }] },
      { id: "rupture-cannon", name: "Rupture cannon", image: "", profiles: [{ range: '48"', attacks: "2", skill: "3+", strength: "18", ap: "-4", damage: "D6+6", keywords: ["HEAVY"] }] },
    ],
    ledBy: [],
  },

  {
    id: "harridan",
    name: "Harridan",
    faction: "tyranids",
    category: "transport",
    points: 610,
    defaultWargear: [
      { id: "dire-bio-cannon", name: "Dire bio-cannon", image: "" },
      { id: "gargantuan-scything-talons", name: "Gargantuan scything talons", image: "" },
    ],
    wargear: [],
    ledBy: [],
  },

  {
    id: "hierophant",
    name: "Hierophant",
    faction: "tyranids",
    category: "transport",
    points: 810,
    defaultWargear: [
      { id: "bio-plasma-torrent", name: "Bio-plasma torrent", image: "" },
      { id: "dire-bio-cannon", name: "Dire bio-cannon", image: "" },
      { id: "lashwhip-pods", name: "Lashwhip pods", image: "" },
      { id: "titanic-scything-talons", name: "Titanic scything talons", image: "" },
    ],
    wargear: [],
    ledBy: [],
  },

  {
    id: "tyrannocyte",
    name: "Tyrannocyte",
    faction: "tyranids",
    category: "transport",
    points: 105,
    defaultWargear: [
      { id: "tyrannocyte-bio-weapons", name: "Tyrannocyte bio-weapons", image: "" },
      { id: "flensing-whips", name: "Flensing whips", image: "" },
    ],
    wargear: [],
    ledBy: [],
  },

];
