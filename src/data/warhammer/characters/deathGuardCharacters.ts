import type { Character } from "../../../types/warhammer";

export const deathGuardCharacters: Character[] = [

  {
    id: "biologus-putrifier",
    name: "Biologus Putrifier",
    faction: "death-guard",
    image: "",
    points: 50,
    canAttachTo: [],
    wargear: [],
  },

  {
    id: "chaos-lord-on-palanquin-of-nurgle",
    name: "Chaos Lord On Palanquin Of Nurgle",
    faction: "death-guard",
    image: "",
    points: 90,
    canAttachTo: [],
    wargear: [],
  },

  {
    id: "death-guard-chaos-lord",
    name: "Death Guard Chaos Lord",
    faction: "death-guard",
    image: "",
    points: 65,
    canAttachTo: [],
    wargear: [],
  },

  {
    id: "death-guard-chaos-lord-in-terminator-armour",
    name: "Death Guard Chaos Lord In Terminator Armour",
    faction: "death-guard",
    image: "",
    points: 85,
    canAttachTo: [],
    wargear: [],
  },

  {
    id: "death-guard-daemon-prince",
    name: "Death Guard Daemon Prince",
    faction: "death-guard",
    image: "",
    points: 160,
    canAttachTo: [],
    wargear: [],
  },

  {
    id: "death-guard-daemon-prince-with-wings",
    name: "Death Guard Daemon Prince With Wings",
    faction: "death-guard",
    image: "",
    points: 195,
    canAttachTo: [],
    wargear: [],
  },

  {
    id: "death-guard-icon-bearer",
    name: "Death Guard Icon Bearer",
    faction: "death-guard",
    image: "",
    points: 45,
    canAttachTo: [],
    wargear: [],
  },

  {
    id: "death-guard-sorcerer-in-terminator-armour",
    name: "Death Guard Sorcerer In Terminator Armour",
    faction: "death-guard",
    image: "",
    points: 70,
    canAttachTo: [],
    wargear: [],
  },

  {
    id: "foul-blightspawn",
    name: "Foul Blightspawn",
    faction: "death-guard",
    image: "",
    points: 60,
    canAttachTo: [],
    wargear: [],
  },

  {
    id: "lord-of-contagion",
    name: "Lord Of Contagion",
    faction: "death-guard",
    image: "",
    points: 120,
    canAttachTo: [],
    defaultWargear: [
      { id: "manreaper-strike", name: "Manreaper – strike", image: "", profiles: [{ range: "Melee", attacks: "5", skill: "2+", strength: "9", ap: "-2", damage: "3", keywords: ["LETHAL HITS"] }] },
      { id: "manreaper-sweep", name: "Manreaper – sweep", image: "", profiles: [{ range: "Melee", attacks: "10", skill: "2+", strength: "6", ap: "-1", damage: "1", keywords: ["LETHAL HITS"] }] },
    ],
    wargear: [],
    abilities: [
      {
        name: "Vector of Disease",
        description: "While this model is leading a unit, melee weapons equipped by models in that unit have the [SUSTAINED HITS 1] and [LANCE] abilities.",
      },
      {
        name: "Unholy Resilience",
        description: "The first time a model with this ability is destroyed in a battle round, roll one D6 at the end of the phase. On a 2+, set that model back up on the battlefield, as close as possible to where it was destroyed and not within Engagement Range of any enemy units, with 3 wounds remaining. Each model can only be set up in this way once per battle.",
      },
    ],
  },

  {
    id: "lord-of-virulence",
    name: "Lord Of Virulence",
    faction: "death-guard",
    image: "",
    points: 100,
    canAttachTo: ["blightlord-terminators", "deathshroud-terminators"],
    defaultWargear: [
      { id: "twin-plague-spewer", name: "Twin plague spewer", image: "", profiles: [{ range: '12"', attacks: "D6", skill: "N/A", strength: "5", ap: "-1", damage: "1", keywords: ["ANTI-INFANTRY 2+", "IGNORES COVER", "TORRENT", "TWIN-LINKED"] }] },
      { id: "lord-virulence-power-fist", name: "Power fist", image: "", profiles: [{ range: "Melee", attacks: "5", skill: "2+", strength: "8", ap: "-2", damage: "2", keywords: ["LETHAL HITS"] }] },
    ],
    wargear: [],
    abilities: [
      {
        name: "Virulent Aura",
        description: "While this model is leading a unit, each time a model in that unit makes a ranged attack, you can re-roll the Wound roll.",
      },
      {
        name: "Blight Bombardment",
        description: "At the start of your Shooting phase, select one enemy unit within 30\" of and visible to this model. Until the end of the phase, each time a friendly DEATH GUARD model makes a ranged attack that targets that unit, re-roll a Hit roll of 1 (if that attack is made with a Blast weapon, you can re-roll the Hit roll instead).",
      },
    ],
  },

  {
    id: "malignant-plaguecaster",
    name: "Malignant Plaguecaster",
    faction: "death-guard",
    image: "",
    points: 60,
    canAttachTo: ["plague-marines", "poxwalkers"],
    defaultWargear: [
      { id: "plaguecaster-bolt-pistol", name: "Bolt pistol", image: "", profiles: [{ range: '12"', attacks: "1", skill: "3+", strength: "4", ap: "0", damage: "1", keywords: ["LETHAL HITS", "PISTOL"] }] },
      { id: "plague-wind-witchfire", name: "Plague Wind – witchfire", image: "", profiles: [{ range: '12"', attacks: "D6", skill: "N/A", strength: "4", ap: "-1", damage: "D3", keywords: ["PSYCHIC", "TORRENT"] }] },
      { id: "plague-wind-focused-witchfire", name: "Plague Wind – focused witchfire", image: "", profiles: [{ range: '12"', attacks: "D6+3", skill: "N/A", strength: "6", ap: "-2", damage: "D3", keywords: ["HAZARDOUS", "PSYCHIC", "TORRENT"] }] },
      { id: "corrupted-staff", name: "Corrupted staff", image: "", profiles: [{ range: "Melee", attacks: "4", skill: "3+", strength: "6", ap: "-1", damage: "D3", keywords: ["LETHAL HITS", "PSYCHIC"] }] },
    ],
    wargear: [],
    abilities: [
      {
        name: "Gift of Contagion (Psychic)",
        description: "While this model is leading a unit, each time a model in that unit makes an attack that targets a unit that is Afflicted, that attack has the [SUSTAINED HITS 1] ability.",
      },
      {
        name: "Pestilent Fallout (Psychic)",
        description: "In your Shooting phase, after this model has shot, select one enemy INFANTRY unit hit by one or more of those attacks made with its Plague Wind. Until the end of your opponent's next turn, that unit is enfeebled. While a unit is enfeebled, subtract 2\" from the Move characteristic of models in that unit.",
      },
    ],
  },

  {
    id: "mortarion",
    name: "Mortarion",
    faction: "death-guard",
    image: "",
    points: 300,
    canAttachTo: [],
    wargear: [],
  },

  {
    id: "noxious-blightbringer",
    name: "Noxious Blightbringer",
    faction: "death-guard",
    image: "",
    points: 45,
    canAttachTo: [],
    wargear: [],
  },

  {
    id: "plague-surgeon",
    name: "Plague Surgeon",
    faction: "death-guard",
    image: "",
    points: 50,
    canAttachTo: [],
    wargear: [],
  },

  {
    id: "sorcerer-on-palanquin-of-nurgle",
    name: "Sorcerer On Palanquin Of Nurgle",
    faction: "death-guard",
    image: "",
    points: 80,
    canAttachTo: [],
    wargear: [],
  },

  {
    id: "tallyman",
    name: "Tallyman",
    faction: "death-guard",
    image: "",
    points: 45,
    canAttachTo: [],
    wargear: [],
  },

  {
    id: "typhus",
    name: "Typhus",
    faction: "death-guard",
    image: "",
    points: 80,
    canAttachTo: [],
    wargear: [],
  },

];
