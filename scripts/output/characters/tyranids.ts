import type { Character } from "../../../types/warhammer";

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
      { id: "lictor-claws-and-talons", name: "Lictor claws and talons", image: "", profiles: [{ range: "Melee", attacks: "6", skill: "3+", strength: "6", ap: "-2", damage: "2", keywords: ["SUSTAINED HITS 2"] }] },
    ],
    wargear: [],
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
    canAttachTo: [],
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
    defaultWargear: [
      { id: "barbed-ovipositor", name: "Barbed ovipositor", image: "", profiles: [{ range: "Melee", attacks: "5", skill: "3+", strength: "5", ap: "-1", damage: "1", keywords: ["DEVASTATING WOUNDS"] }] },
      { id: "clawed-limbs", name: "Clawed limbs", image: "", profiles: [{ range: "Melee", attacks: "3", skill: "4+", strength: "4", ap: "0", damage: "1" }] },
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
    defaultWargear: [
      { id: "prime-talons", name: "Prime talons", image: "", profiles: [{ range: "Melee", attacks: "5", skill: "3+", strength: "5", ap: "-2", damage: "2" }] },
    ],
    wargear: [],
  },

];
