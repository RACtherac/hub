import type { Character } from "../../../src/types/warhammer";

export const thousandSonsCharacters: Character[] = [

  {
    id: "ahriman",
    name: "Ahriman",
    faction: "thousand-sons",
    image: "",
    points: 140,
    canAttachTo: ["rubric-marines"],
    defaultWargear: [
      { id: "inferno-bolt-pistol", name: "Inferno bolt pistol", image: "", profiles: [{ range: '12"', attacks: "1", skill: "3+", strength: "4", ap: "-2", damage: "1", keywords: ["PISTOL", "PSYCHIC"] }] },
      { id: "psychic-stalk", name: "Psychic Stalk", image: "", profiles: [{ range: '18"', attacks: "D3", skill: "3+", strength: "5", ap: "-1", damage: "D3", keywords: ["PSYCHIC"] }] },
      { id: "black-staff-of-ahriman", name: "Black Staff of Ahriman", image: "", profiles: [{ range: "Melee", attacks: "5", skill: "2+", strength: "8", ap: "-2", damage: "D3", keywords: ["PSYCHIC"] }] },
    ],
    wargear: [],
  },

  {
    id: "ahriman-on-disc-of-tzeentch",
    name: "Ahriman On Disc Of Tzeentch",
    faction: "thousand-sons",
    image: "",
    points: 150,
    canAttachTo: [],
    defaultWargear: [
      { id: "inferno-bolt-pistol", name: "Inferno bolt pistol", image: "", profiles: [{ range: '12"', attacks: "1", skill: "3+", strength: "4", ap: "-2", damage: "1", keywords: ["PISTOL", "PSYCHIC"] }] },
      { id: "psychic-stalk", name: "Psychic Stalk", image: "", profiles: [{ range: '18"', attacks: "D3", skill: "3+", strength: "5", ap: "-1", damage: "D3", keywords: ["PSYCHIC"] }] },
      { id: "black-staff-of-ahriman", name: "Black Staff of Ahriman", image: "", profiles: [{ range: "Melee", attacks: "5", skill: "2+", strength: "8", ap: "-2", damage: "D3", keywords: ["PSYCHIC"] }] },
    ],
    wargear: [],
  },

  {
    id: "chaos-lord-on-disc-of-tzeentch",
    name: "Chaos Lord On Disc Of Tzeentch",
    faction: "thousand-sons",
    image: "",
    points: 100,
    canAttachTo: [],
    defaultWargear: [
      { id: "bolt-pistol", name: "Bolt pistol", image: "", profiles: [{ range: '12"', attacks: "1", skill: "3+", strength: "4", ap: "0", damage: "1", keywords: ["PISTOL"] }] },
      { id: "astartes-chainsword", name: "Astartes chainsword", image: "", profiles: [{ range: "Melee", attacks: "4", skill: "3+", strength: "4", ap: "-1", damage: "1" }] },
      { id: "close-combat-weapon", name: "Close combat weapon", image: "", profiles: [{ range: "Melee", attacks: "3", skill: "3+", strength: "4", ap: "0", damage: "1" }] },
    ],
    wargear: [
      { id: "combi-bolter", name: "Combi-bolter", image: "", profiles: [{ range: '24"', attacks: "2", skill: "3+", strength: "4", ap: "0", damage: "1", keywords: ["RAPID FIRE 2"] }] },
      { id: "combi-weapon", name: "Combi-weapon", image: "", profiles: [{ range: '24"', attacks: "2", skill: "3+", strength: "4", ap: "0", damage: "1", keywords: ["RAPID FIRE 1"] }] },
      { id: "plasma-pistol", name: "Plasma pistol", image: "", profiles: [{ profileName: "standard", range: '12"', attacks: "1", skill: "3+", strength: "7", ap: "-2", damage: "1", keywords: ["PISTOL"] }, { profileName: "supercharge", range: '12"', attacks: "1", skill: "3+", strength: "8", ap: "-3", damage: "2", keywords: ["PISTOL", "HAZARDOUS"] }] },
      { id: "accursed-weapon", name: "Accursed weapon", image: "", profiles: [{ range: "Melee", attacks: "5", skill: "3+", strength: "5", ap: "-2", damage: "1" }] },
      { id: "paired-accursed-weapons", name: "Paired accursed weapons", image: "", profiles: [{ range: "Melee", attacks: "6", skill: "3+", strength: "5", ap: "-2", damage: "1", keywords: ["TWIN-LINKED"] }] },
      { id: "power-fist", name: "Power fist", image: "", profiles: [{ range: "Melee", attacks: "3", skill: "3+", strength: "8", ap: "-2", damage: "2" }] },
    ],
  },

  {
    id: "exalted-sorcerer",
    name: "Exalted Sorcerer",
    faction: "thousand-sons",
    image: "",
    points: 110,
    canAttachTo: ["rubric-marines"],
    defaultWargear: [
      { id: "astral-blast", name: "Astral Blast", image: "", profiles: [{ range: '24"', attacks: "3", skill: "3+", strength: "6", ap: "-1", damage: "2", keywords: ["PSYCHIC"] }] },
      { id: "inferno-bolt-pistol", name: "Inferno bolt pistol", image: "", profiles: [{ range: '12"', attacks: "1", skill: "3+", strength: "4", ap: "-2", damage: "1", keywords: ["PISTOL", "PSYCHIC"] }] },
      { id: "force-weapon", name: "Force weapon", image: "", profiles: [{ range: "Melee", attacks: "4", skill: "3+", strength: "6", ap: "-1", damage: "D3", keywords: ["PSYCHIC"] }] },
    ],
    wargear: [
      { id: "plasma-pistol", name: "Plasma pistol", image: "", profiles: [{ profileName: "standard", range: '12"', attacks: "1", skill: "3+", strength: "7", ap: "-2", damage: "1", keywords: ["PISTOL"] }, { profileName: "supercharge", range: '12"', attacks: "1", skill: "3+", strength: "8", ap: "-3", damage: "2", keywords: ["PISTOL", "HAZARDOUS"] }] },
      { id: "warpflame-pistol", name: "Warpflame pistol", image: "", profiles: [{ range: '6"', attacks: "D6", skill: "N/A", strength: "4", ap: "-1", damage: "1", keywords: ["IGNORES COVER", "PISTOL", "PSYCHIC", "TORRENT"] }] },
    ],
  },

  {
    id: "exalted-sorcerer-on-disc-of-tzeentch",
    name: "Exalted Sorcerer On Disc Of Tzeentch",
    faction: "thousand-sons",
    image: "",
    points: 115,
    canAttachTo: ["rubric-marines"],
    defaultWargear: [
      { id: "arcane-fire", name: "Arcane Fire", image: "", profiles: [{ range: '18"', attacks: "3", skill: "3+", strength: "6", ap: "-1", damage: "2", keywords: ["PSYCHIC"] }] },
      { id: "inferno-bolt-pistol", name: "Inferno bolt pistol", image: "", profiles: [{ range: '12"', attacks: "1", skill: "3+", strength: "4", ap: "-2", damage: "1", keywords: ["PISTOL", "PSYCHIC"] }] },
      { id: "force-weapon", name: "Force weapon", image: "", profiles: [{ range: "Melee", attacks: "4", skill: "3+", strength: "6", ap: "-1", damage: "D3", keywords: ["PSYCHIC"] }] },
    ],
    wargear: [
      { id: "plasma-pistol", name: "Plasma pistol", image: "", profiles: [{ profileName: "standard", range: '12"', attacks: "1", skill: "3+", strength: "7", ap: "-2", damage: "1", keywords: ["PISTOL"] }, { profileName: "supercharge", range: '12"', attacks: "1", skill: "3+", strength: "8", ap: "-3", damage: "2", keywords: ["PISTOL", "HAZARDOUS"] }] },
      { id: "warpflame-pistol", name: "Warpflame pistol", image: "", profiles: [{ range: '6"', attacks: "D6", skill: "N/A", strength: "4", ap: "-1", damage: "1", keywords: ["IGNORES COVER", "PISTOL", "PSYCHIC", "TORRENT"] }] },
    ],
  },

  {
    id: "infernal-master",
    name: "Infernal Master",
    faction: "thousand-sons",
    image: "",
    points: 105,
    canAttachTo: ["rubric-marines"],
    defaultWargear: [
      { id: "inferno-bolt-pistol", name: "Inferno bolt pistol", image: "", profiles: [{ range: '12"', attacks: "1", skill: "3+", strength: "4", ap: "-2", damage: "1", keywords: ["PISTOL", "PSYCHIC"] }] },
      { id: "screamer-invocation-witchfire", name: "Screamer Invocation – witchfire", image: "", profiles: [{ range: '18"', attacks: "D6", skill: "3+", strength: "5", ap: "-1", damage: "1", keywords: ["PSYCHIC"] }] },
      { id: "screamer-invocation-focused-witchfire", name: "Screamer Invocation – focused witchfire", image: "", profiles: [{ range: '18"', attacks: "D6", skill: "3+", strength: "5", ap: "-2", damage: "2", keywords: ["PSYCHIC"] }] },
      { id: "force-weapon", name: "Force weapon", image: "", profiles: [{ range: "Melee", attacks: "4", skill: "3+", strength: "6", ap: "-1", damage: "D3", keywords: ["PSYCHIC"] }] },
    ],
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
    defaultWargear: [
      { id: "infernal-cannon", name: "Infernal cannon", image: "", profiles: [{ range: '24"', attacks: "D6", skill: "3+", strength: "8", ap: "-2", damage: "2", keywords: ["BLAST"] }] },
      { id: "hellforged-weapons-strike", name: "Hellforged weapons – strike", image: "", profiles: [{ range: "Melee", attacks: "4", skill: "3+", strength: "14", ap: "-3", damage: "D6+1" }] },
      { id: "hellforged-weapons-sweep", name: "Hellforged weapons – sweep", image: "", profiles: [{ range: "Melee", attacks: "8", skill: "3+", strength: "7", ap: "-2", damage: "2" }] },
    ],
    wargear: [],
  },

  {
    id: "thousand-sons-daemon-prince-with-wings",
    name: "Thousand Sons Daemon Prince With Wings",
    faction: "thousand-sons",
    image: "",
    points: 180,
    canAttachTo: [],
    defaultWargear: [
      { id: "infernal-cannon", name: "Infernal cannon", image: "", profiles: [{ range: '24"', attacks: "D6", skill: "3+", strength: "8", ap: "-2", damage: "2", keywords: ["BLAST"] }] },
      { id: "hellforged-weapons-strike", name: "Hellforged weapons – strike", image: "", profiles: [{ range: "Melee", attacks: "4", skill: "3+", strength: "14", ap: "-3", damage: "D6+1" }] },
      { id: "hellforged-weapons-sweep", name: "Hellforged weapons – sweep", image: "", profiles: [{ range: "Melee", attacks: "8", skill: "3+", strength: "7", ap: "-2", damage: "2" }] },
    ],
    wargear: [],
  },

  {
    id: "thousand-sons-sorcerer",
    name: "Thousand Sons Sorcerer",
    faction: "thousand-sons",
    image: "",
    points: 105,
    canAttachTo: ["rubric-marines"],
    defaultWargear: [
      { id: "fires-of-the-abyss", name: "Fires of the Abyss", image: "", profiles: [{ range: '18"', attacks: "D6+1", skill: "N/A", strength: "5", ap: "-1", damage: "1", keywords: ["IGNORES COVER", "PSYCHIC", "TORRENT"] }] },
      { id: "inferno-bolt-pistol", name: "Inferno bolt pistol", image: "", profiles: [{ range: '12"', attacks: "1", skill: "3+", strength: "4", ap: "-2", damage: "1", keywords: ["PISTOL", "PSYCHIC"] }] },
      { id: "force-weapon", name: "Force weapon", image: "", profiles: [{ range: "Melee", attacks: "4", skill: "3+", strength: "6", ap: "-1", damage: "D3", keywords: ["PSYCHIC"] }] },
    ],
    wargear: [
      { id: "plasma-pistol", name: "Plasma pistol", image: "", profiles: [{ profileName: "standard", range: '12"', attacks: "1", skill: "3+", strength: "7", ap: "-2", damage: "1", keywords: ["PISTOL"] }, { profileName: "supercharge", range: '12"', attacks: "1", skill: "3+", strength: "8", ap: "-3", damage: "2", keywords: ["PISTOL", "HAZARDOUS"] }] },
      { id: "warpflame-pistol", name: "Warpflame pistol", image: "", profiles: [{ range: '6"', attacks: "D6", skill: "N/A", strength: "4", ap: "-1", damage: "1", keywords: ["IGNORES COVER", "PISTOL", "PSYCHIC", "TORRENT"] }] },
    ],
  },

  {
    id: "thousand-sons-sorcerer-in-terminator-armour",
    name: "Thousand Sons Sorcerer In Terminator Armour",
    faction: "thousand-sons",
    image: "",
    points: 105,
    canAttachTo: [],
    defaultWargear: [
      { id: "coruscating-flames", name: "Coruscating Flames", image: "", profiles: [{ range: '18"', attacks: "D6+1", skill: "N/A", strength: "4", ap: "-1", damage: "1", keywords: ["IGNORES COVER", "PSYCHIC", "TORRENT"] }] },
      { id: "inferno-combi-bolter", name: "Inferno combi-bolter", image: "", profiles: [{ range: '24"', attacks: "2", skill: "3+", strength: "4", ap: "-2", damage: "1", keywords: ["PSYCHIC", "RAPID FIRE 2"] }] },
      { id: "force-weapon", name: "Force weapon", image: "", profiles: [{ range: "Melee", attacks: "4", skill: "3+", strength: "6", ap: "-1", damage: "D3", keywords: ["PSYCHIC"] }] },
    ],
    wargear: [
      { id: "inferno-combi-weapon", name: "Inferno combi-weapon", image: "", profiles: [{ range: '24"', attacks: "2", skill: "3+", strength: "4", ap: "-2", damage: "1", keywords: ["PSYCHIC", "RAPID FIRE 1"] }] },
      { id: "prosperine-khopesh", name: "Prosperine khopesh", image: "", profiles: [{ range: "Melee", attacks: "5", skill: "3+", strength: "6", ap: "-2", damage: "2", keywords: ["PSYCHIC"] }] },
    ],
  },

  {
    id: "tzaangor-shaman",
    name: "Tzaangor Shaman",
    faction: "thousand-sons",
    image: "",
    points: 60,
    canAttachTo: [],
    defaultWargear: [
      { id: "mutating-orbs", name: "Mutating orbs", image: "", profiles: [{ range: '18"', attacks: "D3", skill: "3+", strength: "5", ap: "-1", damage: "D3", keywords: ["PSYCHIC"] }] },
      { id: "shaman-s-stave", name: "Shaman's stave", image: "", profiles: [{ range: "Melee", attacks: "3", skill: "3+", strength: "5", ap: "-1", damage: "D3", keywords: ["PSYCHIC"] }] },
    ],
    wargear: [],
  },

];
