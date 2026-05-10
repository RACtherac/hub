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
    defaultWargear: [
      { id: "gauss-flayer", name: "Gauss flayer", image: "" },
      { id: "close-combat-weapon", name: "Close combat weapon", image: "" },
    ],
    wargear: [
      { id: "gauss-reaper", name: "Gauss reaper", image: "" },
    ],
    ledBy: ["chronomancer","imotekh-the-stormlord","orikan-the-diviner","overlord","overlord-with-translocation-shroud","plasmancer","psychomancer","royal-warden","technomancer","trazyn-the-infinite"],
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
    defaultWargear: [
      { id: "feeder-mandibles", name: "Feeder mandibles", image: "" },
    ],
    wargear: [],
    ledBy: [],
  },

  {
    id: "canoptek-wraiths",
    name: "Canoptek Wraiths",
    faction: "necrons",
    category: "infantry",
    points: 115,
    defaultWargear: [
      { id: "vicious-claws", name: "Vicious claws", image: "" },
    ],
    wargear: [
      { id: "particle-caster", name: "Particle caster", image: "" },
      { id: "transdimensional-beamer", name: "Transdimensional beamer", image: "" },
    ],
    ledBy: [],
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
    points: 80,
    defaultWargear: [
      { id: "ophydian-hyperphase-weapons", name: "Ophydian hyperphase weapons", image: "" },
    ],
    wargear: [],
    ledBy: [],
  },

  {
    id: "skorpekh-destroyers",
    name: "Skorpekh Destroyers",
    faction: "necrons",
    category: "infantry",
    points: 90,
    defaultWargear: [
      { id: "skorpekh-hyperphase-weapons", name: "Skorpekh hyperphase weapons", image: "" },
    ],
    wargear: [],
    ledBy: [],
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
    points: 75,
    defaultWargear: [
      { id: "automaton-claws", name: "Automaton claws", image: "" },
    ],
    wargear: [
      { id: "particle-beamer", name: "Particle beamer", image: "" },
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
      { id: "heavy-death-ray", name: "Heavy death ray", image: "" },
      { id: "twin-tesla-destructor", name: "Twin tesla destructor", image: "" },
      { id: "armoured-bulk", name: "Armoured bulk", image: "" },
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
    defaultWargear: [
      { id: "twin-tesla-destructor", name: "Twin tesla destructor", image: "" },
      { id: "armoured-bulk", name: "Armoured bulk", image: "" },
    ],
    wargear: [],
    ledBy: [],
  },

];
