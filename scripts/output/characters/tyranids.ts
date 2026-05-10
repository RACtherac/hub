import type { Character } from "../../../src/types/warhammer";

export const tyranidsCharacters: Character[] = [

  {
    id: "broodlord",
    name: "Broodlord",
    faction: "tyranids",
    image: "",
    points: 80,
    canAttachTo: ["genestealers"],
    abilities: [
      {
        name: "Vicious Insight",
        description: "While this model is leading a unit, weapons equipped by models in that unit have the [DEVASTATING WOUNDS] ability.",
      },
      {
        name: "Hypnotic Gaze (Psychic)",
        description: "At the start of the Fight phase, select one enemy unit within Engagement Range of this model. Until the end of the phase, each time a model in that unit makes an attack, subtract 1 from the Hit roll.",
      },
    ],
    defaultWargear: [
      { id: "broodlord-claws-and-talons", name: "Broodlord claws and talons", image: "", profiles: [{ range: "Melee", attacks: "5", skill: "2+", strength: "6", ap: "-2", damage: "2", keywords: ["DEVASTATING WOUNDS", "TWIN-LINKED"] }] },
    ],
    wargear: [],
  },

  {
    id: "deathleaper",
    name: "Deathleaper",
    faction: "tyranids",
    image: "",
    points: 80,
    canAttachTo: [],
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
        name: "Fear of the Unseen (Aura)",
        description: "While an enemy unit is within 6\" of this model, worsen the Leadership characteristic of models in that unit by 1. In addition, in the Battle-shock step of your opponent's Command phase, if such an enemy unit is below its Starting Strength, it must take a Battle-shock test.",
      },
    ],
  },

  {
    id: "hive-tyrant",
    name: "Hive Tyrant",
    faction: "tyranids",
    image: "",
    points: 225,
    canAttachTo: [],
    defaultWargear: [
      { id: "monstrous-bonesword-and-lash-whip", name: "Monstrous bonesword and lash whip", image: "", profiles: [{ range: "Melee", attacks: "5", skill: "3+", strength: "8", ap: "-2", damage: "3", keywords: ["ANTI-PSYKER 4+"] }] },
      { id: "monstrous-scything-talons", name: "Monstrous scything talons", image: "", profiles: [{ range: "Melee", attacks: "5", skill: "3+", strength: "7", ap: "-2", damage: "2" }] },
    ],
    wargear: [
      { id: "heavy-venom-cannon", name: "Heavy venom cannon", image: "", profiles: [{ range: '36"', attacks: "D6+3", skill: "3+", strength: "9", ap: "-2", damage: "3", keywords: ["BLAST", "HEAVY"] }] },
      { id: "stranglethorn-cannon", name: "Stranglethorn cannon", image: "", profiles: [{ range: '36"', attacks: "D6+3", skill: "4+", strength: "8", ap: "0", damage: "2", keywords: ["BLAST", "HEAVY"] }] },
    ],
  },

  {
    id: "malanthrope",
    name: "Malanthrope",
    faction: "tyranids",
    image: "",
    points: 75,
    canAttachTo: [],
    defaultWargear: [
      { id: "grasping-tail", name: "Grasping tail", image: "", profiles: [{ range: "Melee", attacks: "D3", skill: "4+", strength: "5", ap: "-1", damage: "1" }] },
    ],
    wargear: [],
  },

  {
    id: "neurotyrant",
    name: "Neurotyrant",
    faction: "tyranids",
    image: "",
    points: 105,
    canAttachTo: [],
    defaultWargear: [
      { id: "psychic-scream", name: "Psychic scream", image: "", profiles: [{ range: '12"', attacks: "D6", skill: "N/A", strength: "3", ap: "0", damage: "1", keywords: ["IGNORES COVER", "TORRENT"] }] },
      { id: "neurotyrant-claws-and-lashes", name: "Neurotyrant claws and lashes", image: "", profiles: [{ range: "Melee", attacks: "6", skill: "3+", strength: "5", ap: "-1", damage: "1" }] },
    ],
    wargear: [],
  },

  {
    id: "old-one-eye",
    name: "Old One Eye",
    faction: "tyranids",
    image: "/Warhammerimages/Tyranids/old-one-eye.png",
    points: 150,
    canAttachTo: ["carnifexes"],
    defaultWargear: [
      { id: "old-one-eye-s-claws-and-talons-strike", name: "Old One Eye's claws and talons – strike", image: "", profiles: [{ range: "Melee", attacks: "4", skill: "3+", strength: "10", ap: "-3", damage: "D6+1" }] },
      { id: "old-one-eye-s-claws-and-talons-sweep", name: "Old One Eye's claws and talons – sweep", image: "", profiles: [{ range: "Melee", attacks: "8", skill: "3+", strength: "6", ap: "-2", damage: "2" }] },
    ],
    wargear: [],
  },

  {
    id: "parasite-of-mortrex",
    name: "Parasite Of Mortrex",
    faction: "tyranids",
    image: "",
    points: 80,
    canAttachTo: [],
    abilities: [
      {
        name: "Parasitic Infection",
        description: "Each time an INFANTRY model is destroyed by an attack made with this model's barbed ovipositor, after this model has finished making its attacks, you can add one new Ripper Swarms unit to your army consisting of D3 models and set it up within 3\" of this model. If you do, that RIPPER SWARMS unit can be set up within Engagement Range of the destroyed model's unit (but not within Engagement Range of any other enemy units).",
      },
      {
        name: "It Itches!",
        description: "At the start of the Fight phase, select one enemy unit within Engagement Range of this model. That enemy unit must take a Battle-shock test.",
      },
    ],
    defaultWargear: [
      { id: "barbed-ovipositor", name: "Barbed ovipositor", image: "", profiles: [{ range: "Melee", attacks: "1", skill: "2+", strength: "3", ap: "-2", damage: "3", keywords: ["ANTI-INFANTRY 3+", "EXTRA ATTACKS"] }] },
      { id: "clawed-limbs", name: "Clawed limbs", image: "", profiles: [{ range: "Melee", attacks: "6", skill: "2+", strength: "5", ap: "-1", damage: "1" }] },
    ],
    wargear: [],
  },

  {
    id: "tervigon",
    name: "Tervigon",
    faction: "tyranids",
    image: "",
    points: 175,
    canAttachTo: [],
    defaultWargear: [
      { id: "stinger-salvoes", name: "Stinger salvoes", image: "", profiles: [{ range: '24"', attacks: "4", skill: "4+", strength: "5", ap: "-1", damage: "1" }] },
      { id: "massive-scything-talons-strike", name: "Massive scything talons – strike", image: "", profiles: [{ range: "Melee", attacks: "4", skill: "3+", strength: "10", ap: "-3", damage: "D6+1" }] },
      { id: "massive-scything-talons-sweep", name: "Massive scything talons – sweep", image: "", profiles: [{ range: "Melee", attacks: "8", skill: "3+", strength: "6", ap: "-2", damage: "2" }] },
    ],
    wargear: [
      { id: "massive-crushing-claws", name: "Massive crushing claws", image: "", profiles: [{ range: "Melee", attacks: "4", skill: "3+", strength: "12", ap: "-3", damage: "D6+2", keywords: ["DEVASTATING WOUNDS"] }] },
    ],
  },

  {
    id: "the-swarmlord",
    name: "The Swarmlord",
    faction: "tyranids",
    image: "",
    points: 240,
    canAttachTo: [],
    defaultWargear: [
      { id: "synaptic-pulse", name: "Synaptic pulse", image: "", profiles: [{ range: '18"', attacks: "D6", skill: "N/A", strength: "4", ap: "-1", damage: "1", keywords: ["IGNORES COVER", "TORRENT"] }] },
      { id: "bone-sabres", name: "Bone sabres", image: "", profiles: [{ range: "Melee", attacks: "6", skill: "2+", strength: "10", ap: "-3", damage: "3", keywords: ["DEVASTATING WOUNDS"] }] },
    ],
    wargear: [],
  },

  {
    id: "winged-hive-tyrant",
    name: "Winged Hive Tyrant",
    faction: "tyranids",
    image: "",
    points: 200,
    canAttachTo: [],
    defaultWargear: [
      { id: "monstrous-bonesword-and-lash-whip", name: "Monstrous bonesword and lash whip", image: "", profiles: [{ range: "Melee", attacks: "5", skill: "3+", strength: "8", ap: "-2", damage: "3", keywords: ["ANTI-PSYKER 4+"] }] },
      { id: "tyrant-talons", name: "Tyrant talons", image: "", profiles: [{ range: "Melee", attacks: "4", skill: "3+", strength: "6", ap: "-2", damage: "2" }] },
    ],
    wargear: [
      { id: "heavy-venom-cannon", name: "Heavy venom cannon", image: "", profiles: [{ range: '36"', attacks: "D6+3", skill: "3+", strength: "9", ap: "-2", damage: "3", keywords: ["BLAST", "HEAVY"] }] },
      { id: "stranglethorn-cannon", name: "Stranglethorn cannon", image: "", profiles: [{ range: '36"', attacks: "D6+3", skill: "4+", strength: "8", ap: "0", damage: "2", keywords: ["BLAST", "HEAVY"] }] },
      { id: "monstrous-scything-talons", name: "Monstrous scything talons", image: "", profiles: [{ range: "Melee", attacks: "5", skill: "3+", strength: "7", ap: "-2", damage: "2" }] },
    ],
  },

  {
    id: "tyranid-prime",
    name: "Tyranid Prime with Lash Whip",
    faction: "tyranids",
    image: "",
    points: 85,
    canAttachTo: ["hormagaunts"],
    defaultWargear: [
      { id: "rending-claws", name: "Rending claws", image: "", profiles: [{ range: "Melee", attacks: "4", skill: "3+", strength: "6", ap: "-2", damage: "2" }] },
      { id: "lash-whip", name: "Lash whip", image: "", profiles: [{ range: "Melee", attacks: "3", skill: "3+", strength: "4", ap: "-1", damage: "1" }] },
      { id: "scything-talons", name: "Scything talons", image: "", profiles: [{ range: "Melee", attacks: "4", skill: "3+", strength: "5", ap: "-1", damage: "1" }] },
    ],
    wargear: [],
  },

  {
    id: "winged-tyranid-prime",
    name: "Winged Tyranid Prime",
    faction: "tyranids",
    image: "",
    points: 85,
    canAttachTo: [],
    abilities: [
      {
        name: "Alpha Warrior",
        description: "While this model is leading a unit, weapons equipped by models in that unit have the [SUSTAINED HITS 1] ability.",
      },
      {
        name: "Death Blow",
        description: "If this model is destroyed by a melee attack, if it has not fought this phase, roll one D6: on a 4+, do not remove it from play. The destroyed model can fight after the attacking model's unit has finished making its attacks, and is then removed from play.",
      },
    ],
    defaultWargear: [
      { id: "prime-talons", name: "Prime talons", image: "", profiles: [{ range: "Melee", attacks: "5", skill: "3+", strength: "5", ap: "-2", damage: "2" }] },
    ],
    wargear: [],
  },

];
