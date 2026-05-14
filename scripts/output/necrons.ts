import type { Unit } from "../../src/types/warhammer";

export const necronsUnits: Unit[] = [

  {
    id: "lokhust-destroyers",
    name: "Lokhust Destroyers",
    faction: "necrons",
    category: "mounted",
    points: 35,
    defaultWargear: [
      { id: "gauss-cannon", name: "Gauss cannon", image: "" },
      { id: "close-combat-weapon", name: "Close combat weapon", image: "" },
    ],
    wargear: [],
    ledBy: [],
  },

  {
    id: "lokhust-heavy-destroyers",
    name: "Lokhust Heavy Destroyers",
    faction: "necrons",
    category: "mounted",
    points: 55,
    defaultWargear: [
      { id: "gauss-destructor", name: "Gauss destructor", image: "" },
      { id: "close-combat-weapon", name: "Close combat weapon", image: "" },
    ],
    wargear: [
      { id: "enmitic-exterminator", name: "Enmitic exterminator", image: "" },
    ],
    ledBy: [],
  },

  {
    id: "tomb-blades",
    name: "Tomb Blades",
    faction: "necrons",
    category: "mounted",
    points: 75,
    defaultWargear: [
      { id: "twin-gauss-blaster", name: "Twin gauss blaster", image: "" },
      { id: "close-combat-weapon", name: "Close combat weapon", image: "" },
    ],
    wargear: [
      { id: "particle-beamer", name: "Particle beamer", image: "" },
      { id: "twin-tesla-carbine", name: "Twin tesla carbine", image: "" },
    ],
    ledBy: [],
  },

  {
    id: "immortals",
    name: "Immortals",
    faction: "necrons",
    category: "battleline",
    points: 70,
    defaultWargear: [
      { id: "gauss-blaster", name: "Gauss blaster", image: "" },
      { id: "close-combat-weapon", name: "Close combat weapon", image: "" },
    ],
    wargear: [
      { id: "tesla-carbine", name: "Tesla carbine", image: "" },
    ],
    ledBy: ["chronomancer","imotekh-the-stormlord","orikan-the-diviner","overlord","overlord-with-translocation-shroud","plasmancer","psychomancer","royal-warden","technomancer","trazyn-the-infinite"],
  },

  {
    id: "necron-warriors",
    name: "Necron Warriors",
    faction: "necrons",
    category: "battleline",
    points: 90,
    pointsByModelCount: { 10: 90, 20: 200 },
    modelCountOptions: [10, 20],
    defaultWargear: [
      {
        id: "warrior-close-combat-weapon",
        name: "Close combat weapon",
        image: "",
        profiles: [{ range: "Melee", attacks: "1", skill: "4+", strength: "4", ap: "0", damage: "1" }],
      },
    ],
    wargear: [
      {
        id: "warrior-gauss-flayer",
        name: "Gauss flayer",
        image: "",
        countable: true,
        maxCountByModelCount: { 10: 10, 20: 20 },
        maxCountReducedByWargear: ["warrior-gauss-reaper"],
        profiles: [{ range: '24"', attacks: "1", skill: "4+", strength: "4", ap: "0", damage: "1", keywords: ["LETHAL HITS", "RAPID FIRE 1"] }],
      },
      {
        id: "warrior-gauss-reaper",
        name: "Gauss reaper",
        image: "",
        countable: true,
        maxCountByModelCount: { 10: 10, 20: 20 },
        maxCountReducedByWargear: ["warrior-gauss-flayer"],
        profiles: [{ range: '12"', attacks: "2", skill: "4+", strength: "4", ap: "-1", damage: "1", keywords: ["LETHAL HITS"] }],
      },
    ],
    abilities: [
      {
        name: "Their Number is Legion",
        description: "Each time this unit's Reanimation Protocols activate, you can re-roll the dice to see how many wounds are reanimated.",
      },
    ],
    ledBy: ["chronomancer","geomancer","imotekh-the-stormlord","orikan-the-diviner","overlord","overlord-with-translocation-shroud","plasmancer","psychomancer","royal-warden","technomancer","trazyn-the-infinite"],
  },

  {
    id: "canoptek-acanthrites",
    name: "Canoptek Acanthrites",
    faction: "necrons",
    category: "infantry",
    points: 85,
    defaultWargear: [
      { id: "cutting-beam", name: "Cutting beam", image: "" },
      { id: "voidblade", name: "Voidblade", image: "" },
    ],
    wargear: [],
    ledBy: [],
  },

  {
    id: "canoptek-scarab-swarms",
    name: "Canoptek Scarab Swarms",
    faction: "necrons",
    category: "infantry",
    points: 40,
    pointsByModelCount: { 3: 40, 6: 80 },
    modelCountOptions: [3, 6],
    defaultWargear: [
      {
        id: "feeder-mandibles",
        name: "Feeder mandibles",
        image: "",
        profiles: [{ range: "Melee", attacks: "6", skill: "5+", strength: "2", ap: "0", damage: "1", keywords: ["LETHAL HITS"] }],
      },
    ],
    wargear: [],
    abilities: [
      {
        name: "Self-destruction",
        description: "At the start of the Fight phase, if this unit is within Engagement Range of one or more enemy units, you can select one model in this unit to destroy. If you do, select one enemy unit within Engagement Range of that model and roll one D6, adding 1 to the result if that unit is a VEHICLE. On a 2-5, that unit suffers D3 mortal wounds; on a 6+, that unit suffers 3 mortal wounds.",
      },
      {
        name: "Chittering Swarm",
        description: "While an enemy unit is within Engagement Range of this unit, subtract 1 from the Objective Control characteristic of models in that enemy unit (to a minimum of 1). While this unit is within 6\" of one or more friendly CRYPTEK models, the Objective Control characteristic of models in this unit is 1.",
      },
    ],
    ledBy: [],
  },

  {
    id: "canoptek-wraiths",
    name: "Canoptek Wraiths",
    faction: "necrons",
    category: "infantry",
    modelCountOptions: [3, 6],
    pointsByModelCount: { 3: 110, 6: 220 },
    defaultWargear: [
      { id: "vicious-claws", name: "Vicious claws", image: "", profiles: [{ range: "Melee", attacks: "4", skill: "4+", strength: "6", ap: "-1", damage: "2" }] },
    ],
    abilities: [
      {
        name: "Wraith Form",
        description: "Each time this unit ends a Normal move, you can select one enemy unit it moved over during that move and roll one D6 for each model in this unit: for each 4+, that enemy unit suffers 1 mortal wound.",
      },
    ],
    wargear: [
      { id: "particle-caster", name: "Particle caster", image: "", profiles: [{ range: '12"', attacks: "3", skill: "4+", strength: "5", ap: "0", damage: "1", keywords: ["DEVASTATING WOUNDS", "PISTOL"] }] },
      { id: "transdimensional-beamer", name: "Transdimensional beamer", image: "", profiles: [{ range: '12"', attacks: "1", skill: "4+", strength: "4", ap: "-2", damage: "3" }] },
      { id: "whip-coils", name: "Whip coils", image: "", profiles: [{ range: "Melee", attacks: "8", skill: "4+", strength: "5", ap: "0", damage: "1" }] },
    ],
    ledBy: ["technomancer"],
  },

  {
    id: "cryptothralls",
    name: "Cryptothralls",
    faction: "necrons",
    category: "infantry",
    points: 60,
    defaultWargear: [
      { id: "scouring-eye", name: "Scouring eye", image: "" },
      { id: "scythed-limbs", name: "Scythed limbs", image: "" },
    ],
    wargear: [],
    ledBy: [],
  },

  {
    id: "deathmarks",
    name: "Deathmarks",
    faction: "necrons",
    category: "infantry",
    points: 65,
    defaultWargear: [
      { id: "synaptic-disintegrator", name: "Synaptic disintegrator", image: "" },
      { id: "close-combat-weapon", name: "Close combat weapon", image: "" },
    ],
    wargear: [],
    ledBy: [],
  },

  {
    id: "flayed-ones",
    name: "Flayed Ones",
    faction: "necrons",
    category: "infantry",
    points: 60,
    defaultWargear: [
      { id: "flayer-claws", name: "Flayer claws", image: "" },
    ],
    wargear: [],
    ledBy: [],
  },

  {
    id: "lychguard",
    name: "Lychguard",
    faction: "necrons",
    category: "infantry",
    points: 85,
    defaultWargear: [
      { id: "warscythe", name: "Warscythe", image: "" },
    ],
    wargear: [
      { id: "hyperphase-sword", name: "Hyperphase sword", image: "" },
    ],
    ledBy: ["imotekh-the-stormlord","overlord","overlord-with-translocation-shroud","trazyn-the-infinite"],
  },

  {
    id: "ophydian-destroyers",
    name: "Ophydian Destroyers",
    faction: "necrons",
    category: "infantry",
    modelCountOptions: [3, 6],
    pointsByModelCount: { 3: 80, 6: 160 },
    defaultWargear: [
      { id: "ophydian-hyperphase-weapons", name: "Ophydian hyperphase weapons", image: "", profiles: [{ range: "Melee", attacks: "5", skill: "3+", strength: "4", ap: "-2", damage: "2" }] },
    ],
    abilities: [
      {
        name: "Tunnelling Horrors",
        description: "At the end of your opponent's turn, if this unit is not within Engagement Range of one or more enemy units, you can remove this unit from the battlefield. In the Reinforcements step of your next Movement phase, set it up anywhere on the battlefield that is more than 9\" horizontally away from all enemy models.",
      },
    ],
    wargear: [
      { id: "plasmacyte", name: "Plasmacyte", image: "", countable: true, maxCountByModelCount: { 3: 1, 6: 2 }, note: "Once per battle for each Plasmacyte this unit has, when this unit is selected to fight, you can use this ability. If you do, until the end of the phase, melee weapons equipped by models in this unit have the [DEVASTATING WOUNDS] ability." },
    ],
    ledBy: [],
  },

  {
    id: "skorpekh-destroyers",
    name: "Skorpekh Destroyers",
    faction: "necrons",
    category: "infantry",
    points: 90,
    pointsByModelCount: { 3: 90, 6: 180 },
    modelCountOptions: [3, 6],
    defaultWargear: [
      {
        id: "skorpekh-hyperphase-weapons",
        name: "Skorpekh hyperphase weapons",
        image: "",
        profiles: [{ range: "Melee", attacks: "4", skill: "3+", strength: "7", ap: "-2", damage: "2" }],
      },
    ],
    wargear: [],
    notes: [
      {
        id: "plasmacyte",
        text: "Plasmacyte",
        checkbox: true,
      },
    ],
    abilities: [
      {
        name: "Whirling Onslaught",
        description: "Each time a model in this unit makes a melee attack, re-roll a Hit roll of 1. If this unit made a Charge move this turn, you can re-roll the Hit roll instead.",
      },
      {
        name: "Plasmacyte",
        description: "Once per battle for each Plasmacyte this unit has, when this unit is selected to fight, you can use this ability. If you do, until the end of the phase, melee weapons equipped by models in this unit have the [DEVASTATING WOUNDS] ability.",
        requiresNote: "plasmacyte",
      },
    ],
    ledBy: ["skorpekh-lord"],
  },

  {
    id: "the-silent-king",
    name: "The Silent King",
    faction: "necrons",
    category: "infantry",
    points: 420,
    defaultWargear: [
      { id: "sceptre-of-eternal-glory", name: "Sceptre of Eternal Glory", image: "" },
      { id: "staff-of-stars", name: "Staff of Stars", image: "" },
      { id: "weapons-of-the-final-triarch", name: "Weapons of the Final Triarch", image: "" },
    ],
    wargear: [
      { id: "annihilator-beam", name: "Annihilator beam", image: "" },
      { id: "armoured-bulk", name: "Armoured bulk", image: "" },
    ],
    ledBy: [],
  },

  {
    id: "triarch-praetorians",
    name: "Triarch Praetorians",
    faction: "necrons",
    category: "infantry",
    points: 100,
    defaultWargear: [
      { id: "rod-of-covenant", name: "Rod of covenant", image: "" },
    ],
    wargear: [
      { id: "particle-caster", name: "Particle caster", image: "" },
      { id: "voidblade", name: "Voidblade", image: "" },
    ],
    ledBy: [],
  },

  {
    id: "annihilation-barge",
    name: "Annihilation Barge",
    faction: "necrons",
    category: "vehicle",
    points: 105,
    defaultWargear: [
      { id: "gauss-cannon", name: "Gauss cannon", image: "" },
      { id: "twin-tesla-destructor", name: "Twin tesla destructor", image: "" },
      { id: "armoured-bulk", name: "Armoured bulk", image: "" },
    ],
    wargear: [
      { id: "tesla-cannon", name: "Tesla cannon", image: "" },
    ],
    ledBy: [],
  },

  {
    id: "canoptek-doomstalker",
    name: "Canoptek Doomstalker",
    faction: "necrons",
    category: "vehicle",
    points: 145,
    defaultWargear: [
      { id: "doomsday-blaster", name: "Doomsday blaster", image: "" },
      { id: "twin-gauss-flayer", name: "Twin gauss flayer", image: "" },
      { id: "doomstalker-limbs", name: "Doomstalker limbs", image: "" },
    ],
    wargear: [],
    ledBy: [],
  },

  {
    id: "canoptek-reanimator",
    name: "Canoptek Reanimator",
    faction: "necrons",
    category: "vehicle",
    points: 75,
    defaultWargear: [
      { id: "atomiser-beam", name: "Atomiser beam", image: "" },
      { id: "reanimator-s-claws", name: "Reanimator's claws", image: "" },
    ],
    wargear: [],
    ledBy: [],
  },

  {
    id: "canoptek-spyders",
    name: "Canoptek Spyders",
    faction: "necrons",
    category: "vehicle",
    modelCountOptions: [1, 2],
    pointsByModelCount: { 1: 75, 2: 150 },
    defaultWargear: [
      { id: "automaton-claws", name: "Automaton claws", image: "", profiles: [{ range: "Melee", attacks: "5", skill: "4+", strength: "8", ap: "-2", damage: "2" }] },
    ],
    abilities: [
      {
        name: "Canoptek Swarm",
        description: "In your Command phase, select one friendly CANOPTEK SCARAB SWARM unit within 6\" of this unit. One destroyed model is returned to that CANOPTEK SCARAB SWARM unit for each SPYDER model in this unit.",
      },
    ],
    wargear: [
      { id: "particle-beamer", name: "Particle beamer", image: "", countable: true, maxCountByModelCount: { 1: 2, 2: 4 }, profiles: [{ range: '18"', attacks: "D6", skill: "3+", strength: "6", ap: "0", damage: "1", keywords: ["BLAST", "DEVASTATING WOUNDS"] }] },
      { id: "fabricator-claw-array", name: "Fabricator claw array", image: "", countable: true, maxCountByModelCount: { 1: 1, 2: 2 }, note: "Fabricator Claw Array (Aura): While a friendly NECRONS VEHICLE unit is within 6\" of the bearer, that unit has the Feel No Pain 6+ ability." },
      { id: "gloom-prism", name: "Gloom prism", image: "", countable: true, maxCountByModelCount: { 1: 1, 2: 2 }, note: "Gloom Prism (Aura): While a friendly NECRONS unit is within 6\" of the bearer, models in that unit have the Feel No Pain 5+ ability against mortal wounds and Psychic Attacks." },
    ],
    ledBy: [],
  },

  {
    id: "convergence-of-dominion",
    name: "Convergence Of Dominion",
    faction: "necrons",
    category: "vehicle",
    points: 60,
    defaultWargear: [
      { id: "transdimensional-abductor", name: "Transdimensional abductor", image: "" },
    ],
    wargear: [],
    ledBy: [],
  },

  {
    id: "doom-scythe",
    name: "Doom Scythe",
    faction: "necrons",
    category: "vehicle",
    points: 230,
    defaultWargear: [
      { id: "heavy-death-ray", name: "Heavy death ray", image: "", profiles: [{ range: '36"', attacks: "3", skill: "3+", strength: "16", ap: "-4", damage: "D6+1", keywords: ["SUSTAINED HITS D3"] }] },
      { id: "twin-tesla-destructor", name: "Twin tesla destructor", image: "", profiles: [{ range: '36"', attacks: "6", skill: "3+", strength: "8", ap: "0", damage: "2", keywords: ["SUSTAINED HITS 2", "TWIN-LINKED"] }] },
      { id: "armoured-bulk", name: "Armoured bulk", image: "", profiles: [{ range: "Melee", attacks: "3", skill: "4+", strength: "6", ap: "0", damage: "1" }] },
    ],
    abilities: [
      {
        name: "Atavistic Instigation",
        description: "Each time this model targets an enemy unit with its heavy death ray, your opponent must declare if that unit will stand firm or duck for cover:\nIf it stands firm, when resolving ranged attacks against that unit this phase, a successful unmodified Hit roll of 5+ scores a Critical Hit.\nIf it ducks for cover, until the start of your next Shooting phase, each time a model in that unit makes an attack, subtract 1 from the Hit roll.",
      },
      {
        name: "Damaged: 1-4 Wounds Remaining",
        description: "While this model has 1-4 wounds remaining, each time this model makes an attack, subtract 1 from the Hit roll.",
      },
    ],
    wargear: [],
    ledBy: [],
  },

  {
    id: "doomsday-ark",
    name: "Doomsday Ark",
    faction: "necrons",
    category: "vehicle",
    points: 200,
    defaultWargear: [
      { id: "doomsday-cannon", name: "Doomsday cannon", image: "" },
      { id: "gauss-flayer-array", name: "Gauss flayer array", image: "" },
      { id: "armoured-bulk", name: "Armoured bulk", image: "" },
    ],
    wargear: [],
    ledBy: [],
  },

  {
    id: "gauss-pylon",
    name: "Gauss Pylon",
    faction: "necrons",
    category: "vehicle",
    points: 210,
    defaultWargear: [
      { id: "gauss-annihilator", name: "Gauss annihilator", image: "" },
      { id: "tesla-arc", name: "Tesla arc", image: "" },
    ],
    wargear: [],
    ledBy: [],
  },

  {
    id: "monolith",
    name: "Monolith",
    faction: "necrons",
    category: "vehicle",
    points: 400,
    defaultWargear: [
      { id: "gauss-flux-arc", name: "Gauss flux arc", image: "" },
      { id: "particle-whip", name: "Particle whip", image: "" },
      { id: "portal-of-exile", name: "Portal of exile", image: "" },
    ],
    wargear: [
      { id: "death-ray", name: "Death ray", image: "" },
    ],
    ledBy: [],
  },

  {
    id: "night-shroud",
    name: "Night Shroud",
    faction: "necrons",
    category: "vehicle",
    points: 140,
    defaultWargear: [
      { id: "twin-tesla-destructor", name: "Twin tesla destructor", image: "" },
      { id: "armoured-bulk", name: "Armoured bulk", image: "" },
    ],
    wargear: [],
    ledBy: [],
  },

  {
    id: "obelisk",
    name: "Obelisk",
    faction: "necrons",
    category: "vehicle",
    points: 300,
    defaultWargear: [
      { id: "tesla-sphere", name: "Tesla sphere", image: "" },
      { id: "armoured-bulk", name: "Armoured bulk", image: "" },
    ],
    wargear: [],
    ledBy: [],
  },

  {
    id: "sentry-pylon",
    name: "Sentry Pylon",
    faction: "necrons",
    category: "vehicle",
    points: 120,
    defaultWargear: [
      { id: "gauss-exterminator", name: "Gauss exterminator", image: "" },
    ],
    wargear: [
      { id: "focused-death-ray", name: "Focused death ray", image: "" },
      { id: "heat-cannon", name: "Heat cannon", image: "" },
    ],
    ledBy: [],
  },

  {
    id: "seraptek-heavy-construct",
    name: "Seraptek Heavy Construct",
    faction: "necrons",
    category: "vehicle",
    points: 540,
    defaultWargear: [
      { id: "singularity-generator", name: "Singularity generator", image: "" },
      { id: "titanic-forelimbs-strike", name: "Titanic forelimbs – strike", image: "" },
      { id: "titanic-forelimbs-sweep", name: "Titanic forelimbs – sweep", image: "" },
    ],
    wargear: [
      { id: "synaptic-obliterator", name: "Synaptic obliterator", image: "" },
      { id: "transdimensional-projector", name: "Transdimensional projector", image: "" },
    ],
    ledBy: [],
  },

  {
    id: "tesseract-ark",
    name: "Tesseract Ark",
    faction: "necrons",
    category: "vehicle",
    points: 130,
    defaultWargear: [
      { id: "tesla-cannon", name: "Tesla cannon", image: "" },
      { id: "tesseract-singularity-chamber-particle-hurricane", name: "Tesseract singularity chamber – particle hurricane", image: "" },
      { id: "tesseract-singularity-chamber-seismic-lash", name: "Tesseract singularity chamber – seismic lash", image: "" },
      { id: "armoured-bulk", name: "Armoured bulk", image: "" },
    ],
    wargear: [
      { id: "gauss-cannon", name: "Gauss cannon", image: "" },
      { id: "particle-beamer", name: "Particle beamer", image: "" },
    ],
    ledBy: [],
  },

  {
    id: "tesseract-vault",
    name: "Tesseract Vault",
    faction: "necrons",
    category: "vehicle",
    points: 425,
    defaultWargear: [
      { id: "tesla-spheres", name: "Tesla spheres", image: "" },
      { id: "armoured-bulk", name: "Armoured bulk", image: "" },
    ],
    wargear: [
      { id: "antimatter-meteor", name: "Antimatter Meteor", image: "" },
      { id: "cosmic-fire", name: "Cosmic Fire", image: "" },
      { id: "time-s-arrow", name: "Time's Arrow", image: "" },
    ],
    ledBy: [],
  },

  {
    id: "tomb-citadel-walls",
    name: "Tomb Citadel Walls",
    faction: "necrons",
    category: "vehicle",
    points: 920,
    defaultWargear: [],
    wargear: [
      { id: "gauss-exterminator", name: "Gauss exterminator", image: "" },
      { id: "twin-tesla-destructor", name: "Twin tesla destructor", image: "" },
    ],
    ledBy: [],
  },

  {
    id: "triarch-stalker",
    name: "Triarch Stalker",
    faction: "necrons",
    category: "vehicle",
    points: 110,
    defaultWargear: [
      { id: "heat-ray-dispersed", name: "Heat ray – dispersed", image: "" },
      { id: "heat-ray-focused", name: "Heat ray – focused", image: "" },
      { id: "stalker-s-forelimbs", name: "Stalker's forelimbs", image: "" },
    ],
    wargear: [
      { id: "particle-shredder", name: "Particle shredder", image: "" },
      { id: "heavy-gauss-cannon-array", name: "Heavy gauss cannon array", image: "" },
    ],
    ledBy: [],
  },

  {
    id: "canoptek-tomb-sentinel",
    name: "Canoptek Tomb Sentinel",
    faction: "necrons",
    category: "monster",
    points: 115,
    defaultWargear: [
      { id: "exile-cannon", name: "Exile cannon", image: "" },
      { id: "tomb-sentinel-claws", name: "Tomb Sentinel claws", image: "" },
    ],
    wargear: [],
    ledBy: [],
  },

  {
    id: "canoptek-tomb-stalker",
    name: "Canoptek Tomb Stalker",
    faction: "necrons",
    category: "monster",
    points: 130,
    defaultWargear: [
      { id: "gauss-slicers", name: "Gauss slicers", image: "" },
      { id: "tomb-stalker-claws", name: "Tomb Stalker claws", image: "" },
    ],
    wargear: [],
    ledBy: [],
  },

  {
    id: "ghost-ark",
    name: "Ghost Ark",
    faction: "necrons",
    category: "transport",
    points: 115,
    defaultWargear: [
      { id: "gauss-flayer-array", name: "Gauss flayer array", image: "" },
      { id: "armoured-bulk", name: "Armoured bulk", image: "" },
    ],
    wargear: [],
    ledBy: [],
  },

  {
    id: "night-scythe",
    name: "Night Scythe",
    faction: "necrons",
    category: "transport",
    points: 145,
    transportCapacity: 1,
    defaultWargear: [
      { id: "ns-twin-tesla-destructor", name: "Twin tesla destructor", image: "", profiles: [{ range: '36"', attacks: "6", skill: "3+", strength: "8", ap: "0", damage: "2", keywords: ["SUSTAINED HITS 2", "TWIN-LINKED"] }] },
      { id: "ns-armoured-bulk", name: "Armoured bulk", image: "", profiles: [{ range: "Melee", attacks: "3", skill: "4+", strength: "6", ap: "0", damage: "1" }] },
    ],
    abilities: [
      {
        name: "Translocation Beams",
        description: "At the end of the Fight phase, if there are no models currently embarked within this TRANSPORT, you can select one friendly NECRONS INFANTRY unit wholly within 6\" of this TRANSPORT. Unless that unit is within Engagement Range of one or more enemy units, it can embark within this TRANSPORT.",
      },
      {
        name: "Quantum Invader",
        description: "This model can be set up in the Reinforcements step of your first, second or third Movement phase, regardless of any mission rules.",
      },
      {
        name: "Damaged: 1-4 Wounds Remaining",
        description: "While this model has 1-4 wounds remaining, each time this model makes an attack, subtract 1 from the Hit roll.",
      },
    ],
    wargear: [],
    ledBy: [],
  },

];
