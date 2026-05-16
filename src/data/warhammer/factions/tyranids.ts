import type { Unit } from "../../../types/warhammer";

export const tyranidsUnits: Unit[] = [

  // ── Battleline ──────────────────────────────────────────────────────────

  {
    id: "gargoyles",
    name: "Gargoyles",
    faction: "tyranids",
    category: "battleline",
    points: 85,
    wargear: [],
  },

  {
    id: "hormagaunts",
    name: "Hormagaunts",
    faction: "tyranids",
    category: "battleline",
    points: 65,
    wargear: [],
  },

  {
    id: "termagants",
    name: "Termagants",
    faction: "tyranids",
    category: "battleline",
    points: 60,
    wargear: [],
  },

  {
    id: "barbgaunts",
    name: "Barbgaunts",
    faction: "tyranids",
    category: "infantry",
    points: 55,
    wargear: [],
  },

  {
    id: "biovores",
    name: "Biovores",
    faction: "tyranids",
    category: "infantry",
    points: 50,
    wargear: [],
  },

  {
    id: "broodlord",
    name: "Broodlord",
    faction: "tyranids",
    category: "infantry",
    points: 80,
    wargear: [],
  },

  {
    id: "deathleaper",
    name: "Deathleaper",
    faction: "tyranids",
    category: "infantry",
    points: 80,
    defaultWargear: [
      {
        id: "lictor-claws-and-talons",
        name: "Lictor claws and talons",
        image: "",
        profiles: [{ range: "Melee", attacks: "6", skill: "2+", strength: "7", ap: "-2", damage: "2", keywords: ["PRECISION"] }],
      },
    ],
    wargear: [],
    abilities: [
      {
        name: "Feeder Tendrils",
        description: "Each time this model destroys an enemy CHARACTER model, you gain 1CP.",
      },
      {
        name: "Fear of the Unseen (Aura)",
        description: "While an enemy unit is within 6\" of this model, worsen the Leadership characteristic of models in that unit by 1. In addition, in the Battle-shock step of your opponent's Command phase, if such an enemy unit is below its Starting Strength, it must take a Battle-shock test.",
      },
    ],
  },

  {
    id: "genestealers",
    name: "Genestealers",
    faction: "tyranids",
    category: "infantry",
    points: 75,
    wargear: [],
  },

  {
    id: "hive-guard",
    name: "Hive Guard",
    faction: "tyranids",
    category: "infantry",
    points: 100,
    wargear: [],
  },

  {
    id: "lictor",
    name: "Lictor",
    faction: "tyranids",
    category: "infantry",
    points: 60,
    wargear: [],
  },

  {
    id: "malanthrope",
    name: "Malanthrope",
    faction: "tyranids",
    category: "infantry",
    points: 75,
    wargear: [],
  },

  {
    id: "mucolid-spores",
    name: "Mucolid Spores",
    faction: "tyranids",
    category: "infantry",
    modelCountOptions: [1, 2],
    pointsByModelCount: { 1: 30, 2: 60 },
    wargear: [],
    abilities: [
      {
        name: "Bio-minefield",
        description: "Enemy units cannot start or end an Advance move within 6\" of this unit.",
      },
      {
        name: "Floating Death",
        description: "Each time this unit or an enemy unit ends a move, for each model in this unit that is within 3\" of one or more enemy units, select one of those enemy units. That model in this unit is destroyed, then roll one D6: on a 2-5, that enemy unit suffers D3 mortal wounds; on a 6, that enemy unit suffers D6 mortal wounds.",
      },
    ],
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
    id: "parasite-of-mortrex",
    name: "Parasite Of Mortrex",
    faction: "tyranids",
    category: "infantry",
    points: 80,
    wargear: [],
  },

  {
    id: "pyrovores",
    name: "Pyrovores",
    faction: "tyranids",
    category: "infantry",
    points: 40,
    wargear: [],
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
    wargear: [],
  },

  {
    id: "spore-mines",
    name: "Spore Mines",
    faction: "tyranids",
    category: "infantry",
    modelCountOptions: [3, 6],
    pointsByModelCount: { 3: 55, 6: 110 },
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
    ledBy: ["tyranid-prime-with-lash-whip", "winged-tyranid-prime"],
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
    points: 80,
    wargear: [],
  },

  {
    id: "venomthropes",
    name: "Venomthropes",
    faction: "tyranids",
    category: "infantry",
    points: 70,
    wargear: [],
  },

  {
    id: "von-ryan-s-leapers",
    name: "Von Ryan S Leapers",
    faction: "tyranids",
    category: "infantry",
    points: 70,
    wargear: [],
  },

  {
    id: "winged-tyranid-prime",
    name: "Winged Tyranid Prime",
    faction: "tyranids",
    category: "infantry",
    points: 65,
    wargear: [],
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
    wargear: [],
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
    wargear: [],
  },

  {
    id: "exocrine",
    name: "Exocrine",
    faction: "tyranids",
    category: "monster",
    modelCountOptions: [1],
    pointsByModelCount: { 1: 140 },
    defaultWargear: [
      { id: "exocrine-bio-plasmic-cannon", name: "Bio-plasmic cannon", image: "", profiles: [{ range: '36"', attacks: "D6+3", skill: "3+", strength: "9", ap: "-3", damage: "3", keywords: ["BLAST", "HEAVY"] }] },
      { id: "exocrine-powerful-limbs", name: "Powerful limbs", image: "", profiles: [{ range: "Melee", attacks: "3", skill: "3+", strength: "7", ap: "0", damage: "2" }] },
    ],
    wargear: [],
    abilities: [
      {
        name: "Symbiotic Targeting",
        description: "In your Shooting phase, after this model has shot, select one enemy unit hit by one or more of those attacks. Until the end of the phase, each time a friendly TYRANIDS model makes an attack that targets that unit, re-roll a Hit roll of 1.",
      },
      {
        name: "DAMAGED: 1-5 WOUNDS REMAINING",
        description: "While this model has 1-5 wounds remaining, each time this model makes an attack, subtract 1 from the Hit roll.",
      },
    ],
  },

  {
    id: "harpy",
    name: "Harpy",
    faction: "tyranids",
    category: "monster",
    points: 215,
    wargear: [],
  },

  {
    id: "haruspex",
    name: "Haruspex",
    faction: "tyranids",
    category: "monster",
    points: 125,
    wargear: [],
  },

  {
    id: "hive-crone",
    name: "Hive Crone",
    faction: "tyranids",
    category: "monster",
    points: 200,
    wargear: [],
  },

  {
    id: "hive-tyrant",
    name: "Hive Tyrant",
    faction: "tyranids",
    category: "monster",
    points: 225,
    wargear: [],
  },

  {
    id: "maleceptor",
    name: "Maleceptor",
    faction: "tyranids",
    category: "monster",
    points: 170,
    wargear: [],
  },

  {
    id: "mawloc",
    name: "Mawloc",
    faction: "tyranids",
    category: "monster",
    points: 145,
    wargear: [],
  },

  {
    id: "neurotyrant",
    name: "Neurotyrant",
    faction: "tyranids",
    category: "monster",
    points: 105,
    wargear: [],
  },

  {
    id: "norn-assimilator",
    name: "Norn Assimilator",
    faction: "tyranids",
    category: "monster",
    points: 275,
    wargear: [],
  },

  {
    id: "norn-emissary",
    name: "Norn Emissary",
    faction: "tyranids",
    category: "monster",
    points: 260,
    wargear: [],
  },

  {
    id: "old-one-eye",
    name: "Old One Eye",
    faction: "tyranids",
    category: "monster",
    points: 150,
    wargear: [],
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
    points: 145,
    wargear: [],
  },

  {
    id: "scythed-hierodule",
    name: "Scythed Hierodule",
    faction: "tyranids",
    category: "monster",
    points: 330,
    wargear: [],
  },

  {
    id: "sporocyst",
    name: "Sporocyst",
    faction: "tyranids",
    category: "monster",
    points: 145,
    wargear: [],
  },

  {
    id: "tervigon",
    name: "Tervigon",
    faction: "tyranids",
    category: "monster",
    modelCountOptions: [1],
    pointsByModelCount: { 1: 160 },
    defaultWargear: [
      { id: "tervigon-stinger-salvoes", name: "Stinger salvoes", image: "", profiles: [{ range: '24"', attacks: "8", skill: "3+", strength: "5", ap: "0", damage: "1" }] },
    ],
    wargear: [
      { id: "tervigon-mst", name: "Massive scything talons", image: "", profiles: [
        { profileName: "strike", range: "Melee", attacks: "4", skill: "3+", strength: "9", ap: "-2", damage: "D6" },
        { profileName: "sweep", range: "Melee", attacks: "8", skill: "3+", strength: "7", ap: "-1", damage: "2" },
      ] },
      { id: "tervigon-mcc", name: "Massive crushing claws", image: "", profiles: [{ range: "Melee", attacks: "4", skill: "4+", strength: "12", ap: "-3", damage: "D6+1" }] },
    ],
    wargearGroups: [
      ["tervigon-mst", "tervigon-mcc"],
    ],
    abilities: [
      {
        name: "Spawn Termagants",
        description: "In your Command phase, you can select one friendly TERMAGANTS unit within 6\" of this model and return up to D3+3 destroyed models to that unit. A TERMAGANTS unit cannot be selected for this ability more than once per phase.",
      },
      {
        name: "Brood Progenitor (Aura, Psychic)",
        description: "While a friendly TERMAGANTS unit is within 6\" of this model, ranged weapons equipped by models in that unit have the [LETHAL HITS] ability.",
      },
      {
        name: "DAMAGED: 1-5 WOUNDS REMAINING",
        description: "While this model has 1-5 wounds remaining, each time this model makes an attack, subtract 1 from the Hit roll.",
      },
    ],
  },

  {
    id: "the-swarmlord",
    name: "The Swarmlord",
    faction: "tyranids",
    category: "monster",
    modelCountOptions: [1],
    pointsByModelCount: { 1: 220 },
    wargear: [],
    abilities: [
      {
        name: "Hive Commander",
        description: "At the start of your Command phase, if this model is on the battlefield, you gain 1CP.",
      },
      {
        name: "Malign Presence (Aura)",
        description: "If this model is your WARLORD, each time your opponent targets a unit from their army with a Stratagem, if that unit is within 12\" of this model, increase the cost of that use of that Stratagem by 1CP.",
      },
      {
        name: "Domination of the Hive Mind (Aura)",
        description: "While a friendly TYRANIDS unit is within 9\" of this model, that unit is within your army's Synapse Range.",
      },
    ],
  },

  {
    id: "toxicrene",
    name: "Toxicrene",
    faction: "tyranids",
    category: "monster",
    points: 150,
    wargear: [],
  },

  {
    id: "trygon",
    name: "Trygon",
    faction: "tyranids",
    category: "monster",
    points: 140,
    wargear: [],
  },

  {
    id: "tyrannofex",
    name: "Tyrannofex",
    faction: "tyranids",
    category: "monster",
    points: 200,
    wargear: [],
  },

  {
    id: "winged-hive-tyrant",
    name: "Winged Hive Tyrant",
    faction: "tyranids",
    category: "monster",
    modelCountOptions: [1],
    pointsByModelCount: { 1: 170 },
    defaultWargear: [
      { id: "wht-tyrant-talons", name: "Tyrant talons", image: "", profiles: [{ range: "Melee", attacks: "5", skill: "2+", strength: "7", ap: "-2", damage: "2" }] },
    ],
    wargear: [
      { id: "wht-bonesword-lashwhip", name: "Monstrous bonesword & lash whip", image: "", profiles: [{ range: "Melee", attacks: "6", skill: "2+", strength: "9", ap: "-2", damage: "3", keywords: ["TWIN-LINKED"] }] },
      { id: "wht-hvc", name: "Heavy venom cannon", image: "", profiles: [{ range: '36"', attacks: "D3", skill: "2+", strength: "9", ap: "-2", damage: "3", keywords: ["BLAST"] }] },
      { id: "wht-stranglethorn", name: "Stranglethorn cannon", image: "", profiles: [{ range: '36"', attacks: "D6+1", skill: "2+", strength: "7", ap: "-1", damage: "2", keywords: ["BLAST"] }] },
      { id: "wht-mst", name: "Monstrous scything talons", image: "", profiles: [{ range: "Melee", attacks: "4", skill: "2+", strength: "7", ap: "-2", damage: "2", keywords: ["EXTRA ATTACKS"] }] },
    ],
    wargearGroups: [
      ["wht-bonesword-lashwhip", "wht-hvc", "wht-stranglethorn", "wht-mst"],
    ],
    abilities: [
      {
        name: "Will of the Hive Mind",
        description: "Once per battle round, one model from your army with this ability can use it when a friendly TYRANIDS unit within 12\" of that model is targeted with a Stratagem. If it does, reduce the CP cost of that usage of that Stratagem by 1CP.",
      },
      {
        name: "Paroxysm (Psychic)",
        description: "At the start of the Fight phase, you can select one enemy unit within 12\" of and visible to this model and roll one D6: on a 1, this PSYKER suffers D3 mortal wounds; on a 2+, until the end of the phase, subtract 1 from the Attacks characteristic of weapons equipped by models in that unit.",
      },
    ],
  },

  {
    id: "harridan",
    name: "Harridan",
    faction: "tyranids",
    category: "transport",
    points: 610,
    wargear: [],
  },

  {
    id: "hierophant",
    name: "Hierophant",
    faction: "tyranids",
    category: "transport",
    points: 810,
    wargear: [],
  },

  {
    id: "tyrannocyte",
    name: "Tyrannocyte",
    faction: "tyranids",
    category: "transport",
    points: 105,
    wargear: [],
  },

];
