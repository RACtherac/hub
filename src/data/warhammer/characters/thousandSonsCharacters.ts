import type { Character } from "../../../types/warhammer";

export const thousandSonsCharacters: Character[] = [

  {
    id: "ahriman",
    name: "Ahriman",
    faction: "thousand-sons",
    image: "",
    points: 140,
    canAttachTo: [],
    wargear: [],
  },

  {
    id: "ahriman-on-disc-of-tzeentch",
    name: "Ahriman On Disc Of Tzeentch",
    faction: "thousand-sons",
    image: "",
    points: 150,
    canAttachTo: [],
    wargear: [],
  },

  {
    id: "chaos-lord-on-disc-of-tzeentch",
    name: "Chaos Lord On Disc Of Tzeentch",
    faction: "thousand-sons",
    image: "",
    points: 100,
    canAttachTo: [],
    wargear: [],
  },

  {
    id: "exalted-sorcerer",
    name: "Exalted Sorcerer",
    faction: "thousand-sons",
    image: "",
    points: 110,
    canAttachTo: [],
    wargear: [],
  },

  {
    id: "exalted-sorcerer-on-disc-of-tzeentch",
    name: "Exalted Sorcerer On Disc Of Tzeentch",
    faction: "thousand-sons",
    image: "",
    points: 115,
    canAttachTo: [],
    wargear: [],
  },

  {
    id: "infernal-master",
    name: "Infernal Master",
    faction: "thousand-sons",
    image: "",
    points: 105,
    canAttachTo: [],
    wargear: [],
  },

  {
    id: "magnus-the-red",
    name: "Magnus The Red",
    faction: "thousand-sons",
    image: "",
    points: 435,
    canAttachTo: [],
    defaultWargear: [
      { id: "gaze-of-magnus", name: "Gaze of Magnus", image: "", profiles: [{ range: '24"', attacks: "3D3", skill: "2+", strength: "11", ap: "-2", damage: "3", keywords: ["DEVASTATING WOUNDS", "PSYCHIC"] }] },
      { id: "tzeentch-s-firestorm", name: "Tzeentch's Firestorm", image: "", profiles: [{ range: '24"', attacks: "D6+3", skill: "2+", strength: "6", ap: "-1", damage: "2", keywords: ["BLAST", "IGNORES COVER", "PSYCHIC"] }] },
      { id: "blade-of-magnus-strike", name: "Blade of Magnus – strike", image: "", profiles: [{ range: "Melee", attacks: "7", skill: "2+", strength: "16", ap: "-3", damage: "3", keywords: ["DEVASTATING WOUNDS", "PSYCHIC"] }] },
      { id: "blade-of-magnus-sweep", name: "Blade of Magnus – sweep", image: "", profiles: [{ range: "Melee", attacks: "14", skill: "2+", strength: "8", ap: "-1", damage: "2", keywords: ["PSYCHIC"] }] },
    ],
    wargear: [],
    abilities: [
      {
        name: "Unearthly Power",
        description: "At the start of the battle round, select one Crimson King ability. Until the start of the next battle round, this model has that ability.",
      },
      {
        name: "Crimson King — Impossible Form (Psychic)",
        description: "Each time an attack is made against this PSYKER (excluding Psychic Attacks), subtract 1 from the Damage characteristic of that attack.",
      },
      {
        name: "Crimson King — Treason of Tzeentch (Psychic)",
        description: "At the start of your opponent's Shooting phase, select one enemy unit within 24\" of this PSYKER. Until the end of the phase, ranged weapons equipped by models in that unit have the [HAZARDOUS] ability.",
      },
      {
        name: "Crimson King — Time Flux (Aura, Psychic)",
        description: "While a friendly THOUSAND SONS unit is within 6\" of this PSYKER, add 2\" to the Move characteristic of models in that unit.",
      },
      {
        name: "Lord of the Planet of the Sorcerers (Psychic)",
        description: "This model can attempt up to two Rituals per turn instead of one, and each time this model attempts a Ritual, add 2 to the Psychic test result.",
      },
    ],
  },

  {
    id: "thousand-sons-daemon-prince",
    name: "Thousand Sons Daemon Prince",
    faction: "thousand-sons",
    image: "",
    points: 170,
    canAttachTo: [],
    wargear: [],
  },

  {
    id: "thousand-sons-daemon-prince-with-wings",
    name: "Thousand Sons Daemon Prince With Wings",
    faction: "thousand-sons",
    image: "",
    points: 180,
    canAttachTo: [],
    wargear: [],
  },

  {
    id: "thousand-sons-sorcerer",
    name: "Thousand Sons Sorcerer",
    faction: "thousand-sons",
    image: "",
    points: 105,
    canAttachTo: [],
    wargear: [],
  },

  {
    id: "thousand-sons-sorcerer-in-terminator-armour",
    name: "Thousand Sons Sorcerer In Terminator Armour",
    faction: "thousand-sons",
    image: "",
    points: 105,
    canAttachTo: [],
    wargear: [],
  },

  {
    id: "tzaangor-shaman",
    name: "Tzaangor Shaman",
    faction: "thousand-sons",
    image: "",
    points: 60,
    canAttachTo: [],
    wargear: [],
  },

];
