import type { Character } from "../../../types/warhammer";

export const drukhariCharacters: Character[] = [

  {
    id: "archon",
    name: "Archon",
    faction: "drukhari",
    image: "",
    points: 85,
    canAttachTo: [],
    defaultWargear: [
      { id: "splinter-pistol", name: "Splinter pistol", image: "", profiles: [{ range: '12"', attacks: "2", skill: "3+", strength: "2", ap: "0", damage: "1", keywords: ["PISTOL", "RAPID FIRE 1"] }] },
      { id: "huskblade", name: "Huskblade", image: "", profiles: [{ range: "Melee", attacks: "5", skill: "3+", strength: "4", ap: "-2", damage: "2" }] },
    ],
    wargear: [
      { id: "blast-pistol", name: "Blast pistol", image: "", profiles: [{ range: '6"', attacks: "1", skill: "3+", strength: "8", ap: "-4", damage: "D3", keywords: ["MELTA 2", "PISTOL"] }] },
    ],
  },

  {
    id: "death-jester",
    name: "Death Jester",
    faction: "drukhari",
    image: "",
    points: 90,
    canAttachTo: [],
    defaultWargear: [
      { id: "shrieker-cannon", name: "Shrieker cannon", image: "", profiles: [{ range: '24"', attacks: "4", skill: "3+", strength: "7", ap: "-2", damage: "2", keywords: ["ASSAULT"] }] },
      { id: "jester-s-blade", name: "Jester's blade", image: "", profiles: [{ range: "Melee", attacks: "4", skill: "3+", strength: "4", ap: "-1", damage: "1" }] },
    ],
    wargear: [],
  },

  {
    id: "drazhar",
    name: "Drazhar",
    faction: "drukhari",
    image: "",
    points: 85,
    canAttachTo: [],
    defaultWargear: [
      { id: "the-executioner-s-demiklaives-single-blade", name: "The Executioner's demiklaives – single blade", image: "", profiles: [{ range: "Melee", attacks: "6", skill: "2+", strength: "5", ap: "-3", damage: "2" }] },
      { id: "the-executioner-s-demiklaives-dual-blades", name: "The Executioner's demiklaives – dual blades", image: "", profiles: [{ range: "Melee", attacks: "10", skill: "2+", strength: "4", ap: "-2", damage: "1" }] },
    ],
    wargear: [],
  },

  {
    id: "haemonculus",
    name: "Haemonculus",
    faction: "drukhari",
    image: "",
    points: 60,
    canAttachTo: [],
    defaultWargear: [
      { id: "stinger-pistol", name: "Stinger pistol", image: "", profiles: [{ range: '12"', attacks: "1", skill: "3+", strength: "2", ap: "0", damage: "1", keywords: ["PISTOL", "POISONED WEAPON 2+"] }] },
      { id: "haemonculus-tools-and-scissorhands", name: "Haemonculus tools and scissorhands", image: "", profiles: [{ range: "Melee", attacks: "4", skill: "3+", strength: "4", ap: "-1", damage: "1", keywords: ["SUSTAINED HITS 1"] }] },
    ],
    wargear: [],
  },

  {
    id: "lelith-hesperax",
    name: "Lelith Hesperax",
    faction: "drukhari",
    image: "",
    points: 95,
    canAttachTo: [],
    defaultWargear: [
      { id: "lelith-s-blades", name: "Lelith's blades", image: "", profiles: [{ range: "Melee", attacks: "8", skill: "2+", strength: "4", ap: "-2", damage: "1" }] },
    ],
    wargear: [],
  },

  {
    id: "shadowseer",
    name: "Shadowseer",
    faction: "drukhari",
    image: "",
    points: 60,
    canAttachTo: [],
    defaultWargear: [
      { id: "shuriken-pistol", name: "Shuriken pistol", image: "", profiles: [{ range: '12"', attacks: "2", skill: "3+", strength: "4", ap: "-1", damage: "1", keywords: ["PISTOL"] }] },
      { id: "miststave", name: "Miststave", image: "", profiles: [{ range: "Melee", attacks: "4", skill: "3+", strength: "4", ap: "-1", damage: "D3", keywords: ["PSYCHIC"] }] },
    ],
    wargear: [
      { id: "neuro-disruptor", name: "Neuro disruptor", image: "", profiles: [{ range: '12"', attacks: "1", skill: "3+", strength: "6", ap: "-3", damage: "1", keywords: ["PISTOL"] }] },
    ],
  },

  {
    id: "solitaire",
    name: "Solitaire",
    faction: "drukhari",
    image: "",
    points: 115,
    canAttachTo: [],
    defaultWargear: [
      { id: "solitaire-weapons", name: "Solitaire weapons", image: "", profiles: [{ range: "Melee", attacks: "8", skill: "2+", strength: "5", ap: "-2", damage: "2" }] },
    ],
    wargear: [],
  },

  {
    id: "succubus",
    name: "Succubus",
    faction: "drukhari",
    image: "",
    points: 45,
    canAttachTo: [],
    defaultWargear: [
      { id: "succubus-weapons", name: "Succubus weapons", image: "", profiles: [{ range: "Melee", attacks: "5", skill: "2+", strength: "4", ap: "-2", damage: "1" }] },
    ],
    wargear: [
      { id: "blast-pistol", name: "Blast pistol", image: "", profiles: [{ range: '6"', attacks: "1", skill: "3+", strength: "8", ap: "-4", damage: "D3", keywords: ["MELTA 2", "PISTOL"] }] },
      { id: "splinter-pistol", name: "Splinter pistol", image: "", profiles: [{ range: '12"', attacks: "2", skill: "3+", strength: "2", ap: "0", damage: "1", keywords: ["PISTOL", "RAPID FIRE 1"] }] },
    ],
  },

  {
    id: "troupe-master",
    name: "Troupe Master",
    faction: "drukhari",
    image: "",
    points: 75,
    canAttachTo: [],
    defaultWargear: [
      { id: "shuriken-pistol", name: "Shuriken pistol", image: "", profiles: [{ range: '12"', attacks: "2", skill: "3+", strength: "4", ap: "-1", damage: "1", keywords: ["PISTOL"] }] },
      { id: "troupe-master-s-blade", name: "Troupe Master's blade", image: "", profiles: [{ range: "Melee", attacks: "5", skill: "3+", strength: "4", ap: "-2", damage: "1" }] },
    ],
    wargear: [
      { id: "fusion-pistol", name: "Fusion pistol", image: "", profiles: [{ range: '6"', attacks: "1", skill: "3+", strength: "9", ap: "-4", damage: "D6", keywords: ["MELTA 3", "PISTOL"] }] },
      { id: "neuro-disruptor", name: "Neuro disruptor", image: "", profiles: [{ range: '12"', attacks: "1", skill: "3+", strength: "6", ap: "-3", damage: "1", keywords: ["PISTOL"] }] },
    ],
  },

  {
    id: "urien-rakarth",
    name: "Urien Rakarth",
    faction: "drukhari",
    image: "",
    points: 80,
    canAttachTo: [],
    defaultWargear: [
      { id: "casket-of-flensing", name: "Casket of Flensing", image: "", profiles: [{ range: '12"', attacks: "D6", skill: "N/A", strength: "3", ap: "0", damage: "1", keywords: ["IGNORES COVER", "TORRENT"] }] },
      { id: "haemonculus-tools-and-scissorhands", name: "Haemonculus tools and scissorhands", image: "", profiles: [{ range: "Melee", attacks: "4", skill: "3+", strength: "4", ap: "-1", damage: "1", keywords: ["SUSTAINED HITS 1"] }] },
    ],
    wargear: [],
  },

];
