import type { Character } from "../../../src/types/warhammer";

export const chaosDaemonsCharacters: Character[] = [

  {
    id: "aetaos-rau-keres",
    name: "Aetaos Rau Keres",
    faction: "chaos-daemons",
    image: "",
    points: 315,
    canAttachTo: [],
    defaultWargear: [
      { id: "bolt-of-tzeentch-focused-witchfire", name: "Bolt of Tzeentch – focused witchfire", image: "", profiles: [{ range: '24"', attacks: "D6", skill: "3+", strength: "8", ap: "-2", damage: "D3", keywords: ["PSYCHIC"] }] },
      { id: "bolt-of-tzeentch-witchfire", name: "Bolt of Tzeentch – witchfire", image: "", profiles: [{ range: '24"', attacks: "D6", skill: "3+", strength: "7", ap: "-1", damage: "2", keywords: ["PSYCHIC"] }] },
      { id: "staff-of-cataclysm", name: "Staff of cataclysm", image: "", profiles: [{ range: "Melee", attacks: "8", skill: "2+", strength: "12", ap: "-3", damage: "D6", keywords: ["PSYCHIC"] }] },
      { id: "warpfire-talons", name: "Warpfire talons", image: "", profiles: [{ range: "Melee", attacks: "6", skill: "2+", strength: "8", ap: "-2", damage: "3", keywords: ["PSYCHIC"] }] },
    ],
    wargear: [],
  },

  {
    id: "an-ggrath-the-unbound",
    name: "An Ggrath The Unbound",
    faction: "chaos-daemons",
    image: "",
    points: 415,
    canAttachTo: [],
    defaultWargear: [
      { id: "bloodlash", name: "Bloodlash", image: "", profiles: [{ range: '12"', attacks: "4", skill: "3+", strength: "8", ap: "-2", damage: "2", keywords: ["DEVASTATING WOUNDS"] }] },
      { id: "axe-of-khorne-strike", name: "Axe of Khorne – strike", image: "", profiles: [{ range: "Melee", attacks: "6", skill: "2+", strength: "16", ap: "-4", damage: "D6+2", keywords: ["DEVASTATING WOUNDS"] }] },
      { id: "axe-of-khorne-sweep", name: "Axe of Khorne – sweep", image: "", profiles: [{ range: "Melee", attacks: "12", skill: "2+", strength: "8", ap: "-2", damage: "2" }] },
    ],
    wargear: [],
  },

  {
    id: "be-lakor",
    name: "Be'lakor",
    faction: "chaos-daemons",
    image: "",
    points: 375,
    canAttachTo: [],
    defaultWargear: [
      { id: "betraying-shades-witchfire", name: "Betraying Shades – witchfire", image: "", profiles: [{ range: '18"', attacks: "9", skill: "2+", strength: "5", ap: "-2", damage: "1", keywords: ["DEVASTATING WOUNDS", "IGNORES COVER", "PSYCHIC"] }] },
      { id: "betraying-shades-focused-witchfire", name: "Betraying Shades – focused witchfire", image: "", profiles: [{ range: '18"', attacks: "12", skill: "2+", strength: "6", ap: "-3", damage: "1", keywords: ["DEVASTATING WOUNDS", "HAZARDOUS", "IGNORES COVER", "PSYCHIC"] }] },
      { id: "the-blade-of-shadows-strike", name: "The Blade of Shadows – strike", image: "", profiles: [{ range: "Melee", attacks: "7", skill: "2+", strength: "14", ap: "-4", damage: "D6+1", keywords: ["DEVASTATING WOUNDS"] }] },
      { id: "the-blade-of-shadows-sweep", name: "The Blade of Shadows – sweep", image: "", profiles: [{ range: "Melee", attacks: "14", skill: "2+", strength: "8", ap: "-3", damage: "1", keywords: ["SUSTAINED HITS 1"] }] },
    ],
    wargear: [],
    abilities: [
      {
        name: "The Dark Master (Aura)",
        description: "The area of the battlefield within 6\" of this model is within your army's Shadow of Chaos.",
      },
      {
        name: "Shadow Form",
        description: "At the start of the battle round, select one Shadow Form ability (see below). Until the end of the battle round, this model has that ability.",
      },
      {
        name: "Wreathed in Shadows (Aura, Psychic)",
        description: "While a friendly LEGIONES DAEMONICA unit or SHADOW LEGION unit is within 6\" of this model, that unit can only be targeted by a ranged attack if the attacking model is within 18\".",
      },
      {
        name: "Pall of Despair (Aura, Psychic)",
        description: "In the Battle-shock step of your opponent's Command phase, if an enemy unit that is below its Starting Strength is within 9\" of this model, that unit must take a Battle-shock test. For the purposes of this ability, if a unit has a Starting Strength of 1, it is considered to be below its Starting Strength while it has lost one or more wounds. In addition, for each enemy unit that fails a Battle-shock test within 9\" of this model, this model regains up to D3 lost wounds.",
      },
      {
        name: "Shadow Lord (Aura, Psychic)",
        description: "While a friendly LEGIONES DAEMONICA or SHADOW LEGION unit is within 6\" of this model, each time a model in that unit makes an attack, re-roll a Hit roll of 1.",
      },
      {
        name: "Damaged: 1-6 Wounds Remaining",
        description: "While this model has 1-6 wounds remaining, each time this model makes an attack, subtract 1 from the Hit roll.",
      },
      {
        name: "Supreme Commander",
        description: "If this model is in your army, it must be your Warlord.",
      },
    ],
  },

  {
    id: "bloodmaster",
    name: "Bloodmaster",
    faction: "chaos-daemons",
    image: "",
    points: 65,
    canAttachTo: [],
    defaultWargear: [
      { id: "blade-of-blood", name: "Blade of blood", image: "", profiles: [{ range: "Melee", attacks: "4", skill: "3+", strength: "6", ap: "-1", damage: "2", keywords: ["DEVASTATING WOUNDS"] }] },
    ],
    wargear: [],
  },

  {
    id: "bloodthirster",
    name: "Bloodthirster",
    faction: "chaos-daemons",
    image: "",
    points: 305,
    canAttachTo: [],
    defaultWargear: [
      { id: "bt-hellfire-breath", name: "Hellfire breath", image: "", profiles: [{ range: '12"', attacks: "D6", skill: "N/A", strength: "5", ap: "-1", damage: "1", keywords: ["IGNORES COVER", "TORRENT"] }] },
    ],
    wargear: [
      { id: "bt-great-axe-of-khorne", name: "Great axe of Khorne", image: "", profiles: [
        { profileName: "strike", range: "Melee", attacks: "7", skill: "2+", strength: "16", ap: "-4", damage: "D6+2" },
        { profileName: "sweep", range: "Melee", attacks: "14", skill: "2+", strength: "10", ap: "-2", damage: "2" },
      ]},
      { id: "bt-axe-of-khorne", name: "Axe of Khorne", image: "", profiles: [
        { profileName: "strike", range: "Melee", attacks: "8", skill: "2+", strength: "14", ap: "-4", damage: "D3+1" },
        { profileName: "sweep", range: "Melee", attacks: "16", skill: "2+", strength: "8", ap: "-2", damage: "1" },
      ]},
      { id: "bt-bloodflail", name: "Bloodflail", image: "", profiles: [{ range: '12"', attacks: "1", skill: "2+", strength: "16", ap: "-3", damage: "D6+1" }] },
      { id: "bt-lash-of-khorne", name: "Lash of Khorne", image: "", profiles: [{ range: '12"', attacks: "6", skill: "2+", strength: "8", ap: "-1", damage: "2" }] },
    ],
    wargearGroups: [
      ["bt-great-axe-of-khorne", "bt-axe-of-khorne"],
      ["bt-bloodflail", "bt-lash-of-khorne"],
    ],
    defaultSelectedWargear: ["bt-great-axe-of-khorne", "bt-bloodflail"],
    abilities: [
      {
        name: "Daemon Lord of Khorne (Aura)",
        description: "While a friendly KHORNE LEGIONES DAEMONICA unit is within 6\" of this model, each time a model in that unit makes a melee attack, add 1 to the Hit roll.",
      },
      {
        name: "Relentless Carnage",
        description: "At the end of the Fight phase, you can select one enemy unit within Engagement Range of this model and roll eight D6: for each 4+, that enemy unit suffers 1 mortal wound.",
      },
      {
        name: "Greater Daemon of Khorne (Aura)",
        description: "While a friendly KHORNE LEGIONES DAEMONICA unit is within 6\" of this model, that unit is within your army's Shadow of Chaos.",
      },
      {
        name: "Damaged: 1-6 Wounds Remaining",
        description: "While this model has 1-6 wounds remaining, each time this model makes an attack, subtract 1 from the Hit roll.",
      },
    ],
  },

  {
    id: "changecaster",
    name: "Changecaster",
    faction: "chaos-daemons",
    image: "",
    points: 60,
    canAttachTo: [],
    defaultWargear: [
      { id: "arcane-fireball-witchfire", name: "Arcane Fireball – witchfire", image: "", profiles: [{ range: '18"', attacks: "D6", skill: "3+", strength: "5", ap: "-1", damage: "1", keywords: ["BLAST", "PSYCHIC"] }] },
      { id: "arcane-fireball-focused-witchfire", name: "Arcane Fireball – focused witchfire", image: "", profiles: [{ range: '18"', attacks: "D3", skill: "3+", strength: "5", ap: "-2", damage: "2", keywords: ["PSYCHIC"] }] },
      { id: "herald-combat-weapon", name: "Herald combat weapon", image: "", profiles: [{ range: "Melee", attacks: "3", skill: "3+", strength: "4", ap: "-1", damage: "1" }] },
    ],
    wargear: [],
  },

  {
    id: "chaos-lord",
    name: "Chaos Lord",
    faction: "chaos-daemons",
    image: "",
    points: 90,
    canAttachTo: [],
    defaultWargear: [
      { id: "plasma-pistol", name: "Plasma pistol", image: "", profiles: [{ profileName: "standard", range: '12"', attacks: "1", skill: "3+", strength: "7", ap: "-2", damage: "1", keywords: ["PISTOL"] }, { profileName: "supercharge", range: '12"', attacks: "1", skill: "3+", strength: "8", ap: "-3", damage: "2", keywords: ["PISTOL", "HAZARDOUS"] }] },
      { id: "daemon-hammer", name: "Daemon hammer", image: "", profiles: [{ range: "Melee", attacks: "3", skill: "3+", strength: "8", ap: "-2", damage: "3" }] },
    ],
    wargear: [
      { id: "accursed-weapon", name: "Accursed weapon", image: "", profiles: [{ range: "Melee", attacks: "5", skill: "3+", strength: "5", ap: "-2", damage: "1" }] },
    ],
  },

  {
    id: "chaos-lord-in-terminator-armour",
    name: "Chaos Lord In Terminator Armour",
    faction: "chaos-daemons",
    image: "",
    points: 95,
    canAttachTo: [],
    defaultWargear: [
      { id: "combi-bolter", name: "Combi-bolter", image: "", profiles: [{ range: '24"', attacks: "2", skill: "3+", strength: "4", ap: "0", damage: "1", keywords: ["RAPID FIRE 2"] }] },
      { id: "exalted-weapon", name: "Exalted weapon", image: "", profiles: [{ range: "Melee", attacks: "5", skill: "3+", strength: "6", ap: "-2", damage: "2" }] },
    ],
    wargear: [
      { id: "chainfist", name: "Chainfist", image: "", profiles: [{ range: "Melee", attacks: "3", skill: "3+", strength: "8", ap: "-4", damage: "2" }] },
      { id: "power-fist", name: "Power fist", image: "", profiles: [{ range: "Melee", attacks: "3", skill: "3+", strength: "8", ap: "-2", damage: "2" }] },
    ],
  },

  {
    id: "chaos-lord-on-disc-of-tzeentch",
    name: "Chaos Lord On Disc Of Tzeentch",
    faction: "chaos-daemons",
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
    id: "chaos-lord-on-juggernaut",
    name: "Chaos Lord On Juggernaut",
    faction: "chaos-daemons",
    image: "",
    points: 115,
    canAttachTo: [],
    defaultWargear: [
      { id: "bolt-pistol", name: "Bolt pistol", image: "", profiles: [{ range: '12"', attacks: "1", skill: "3+", strength: "4", ap: "0", damage: "1", keywords: ["PISTOL"] }] },
      { id: "astartes-chainsword", name: "Astartes chainsword", image: "", profiles: [{ range: "Melee", attacks: "4", skill: "3+", strength: "4", ap: "-1", damage: "1" }] },
      { id: "bladed-horn", name: "Bladed horn", image: "", profiles: [{ range: "Melee", attacks: "3", skill: "4+", strength: "6", ap: "-1", damage: "2" }] },
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
    id: "chaos-lord-on-palanquin-of-nurgle",
    name: "Chaos Lord On Palanquin Of Nurgle",
    faction: "chaos-daemons",
    image: "",
    points: 90,
    canAttachTo: [],
    defaultWargear: [
      { id: "bolt-pistol", name: "Bolt pistol", image: "", profiles: [{ range: '12"', attacks: "1", skill: "3+", strength: "4", ap: "0", damage: "1", keywords: ["PISTOL"] }] },
      { id: "astartes-chainsword", name: "Astartes chainsword", image: "", profiles: [{ range: "Melee", attacks: "4", skill: "3+", strength: "4", ap: "-1", damage: "1" }] },
      { id: "close-combat-weapon", name: "Close combat weapon", image: "", profiles: [{ range: "Melee", attacks: "3", skill: "3+", strength: "4", ap: "0", damage: "1" }] },
      { id: "nurgling-s-claws-and-teeth", name: "Nurgling's claws and teeth", image: "", profiles: [{ range: "Melee", attacks: "5", skill: "5+", strength: "2", ap: "0", damage: "1" }] },
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
    id: "chaos-lord-on-steed-of-slaanesh",
    name: "Chaos Lord On Steed Of Slaanesh",
    faction: "chaos-daemons",
    image: "",
    points: 100,
    canAttachTo: [],
    defaultWargear: [
      { id: "bolt-pistol", name: "Bolt pistol", image: "", profiles: [{ range: '12"', attacks: "1", skill: "3+", strength: "4", ap: "0", damage: "1", keywords: ["PISTOL"] }] },
      { id: "astartes-chainsword", name: "Astartes chainsword", image: "", profiles: [{ range: "Melee", attacks: "4", skill: "3+", strength: "4", ap: "-1", damage: "1" }] },
      { id: "close-combat-weapon", name: "Close combat weapon", image: "", profiles: [{ range: "Melee", attacks: "3", skill: "3+", strength: "4", ap: "0", damage: "1" }] },
      { id: "lashing-tongue", name: "Lashing tongue", image: "", profiles: [{ range: "Melee", attacks: "2", skill: "4+", strength: "4", ap: "0", damage: "1" }] },
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
    id: "chaos-lord-with-jump-pack",
    name: "Chaos Lord With Jump Pack",
    faction: "chaos-daemons",
    image: "",
    points: 90,
    canAttachTo: [],
    defaultWargear: [
      { id: "bolt-pistol", name: "Bolt pistol", image: "", profiles: [{ range: '12"', attacks: "1", skill: "3+", strength: "4", ap: "0", damage: "1", keywords: ["PISTOL"] }] },
      { id: "accursed-weapon", name: "Accursed weapon", image: "", profiles: [{ range: "Melee", attacks: "5", skill: "3+", strength: "5", ap: "-2", damage: "1" }] },
    ],
    wargear: [
      { id: "plasma-pistol", name: "Plasma pistol", image: "", profiles: [{ profileName: "standard", range: '12"', attacks: "1", skill: "3+", strength: "7", ap: "-2", damage: "1", keywords: ["PISTOL"] }, { profileName: "supercharge", range: '12"', attacks: "1", skill: "3+", strength: "8", ap: "-3", damage: "2", keywords: ["PISTOL", "HAZARDOUS"] }] },
      { id: "power-fist", name: "Power fist", image: "", profiles: [{ range: "Melee", attacks: "3", skill: "3+", strength: "8", ap: "-2", damage: "2" }] },
      { id: "twin-lightning-claws", name: "Twin lightning claws", image: "", profiles: [{ range: "Melee", attacks: "6", skill: "3+", strength: "5", ap: "-2", damage: "1", keywords: ["TWIN-LINKED"] }] },
    ],
  },

  {
    id: "contorted-epitome",
    name: "Contorted Epitome",
    faction: "chaos-daemons",
    image: "",
    points: 100,
    canAttachTo: [],
    defaultWargear: [
      { id: "coiled-tentacles", name: "Coiled tentacles", image: "", profiles: [{ range: "Melee", attacks: "6", skill: "3+", strength: "5", ap: "0", damage: "1" }] },
      { id: "ravaging-claws", name: "Ravaging claws", image: "", profiles: [{ range: "Melee", attacks: "6", skill: "3+", strength: "5", ap: "-1", damage: "1" }] },
    ],
    wargear: [],
  },

  {
    id: "cultist-firebrand",
    name: "Cultist Firebrand",
    faction: "chaos-daemons",
    image: "",
    points: 45,
    canAttachTo: [],
    defaultWargear: [
      { id: "balefire-pike", name: "Balefire pike", image: "", profiles: [{ range: '18"', attacks: "2", skill: "4+", strength: "4", ap: "0", damage: "1" }] },
      { id: "close-combat-weapon", name: "Close combat weapon", image: "", profiles: [{ range: "Melee", attacks: "3", skill: "4+", strength: "3", ap: "0", damage: "1" }] },
    ],
    wargear: [],
  },

  {
    id: "daemon-prince-of-chaos",
    name: "Daemon Prince Of Chaos",
    faction: "chaos-daemons",
    image: "",
    points: 190,
    canAttachTo: [],
    defaultWargear: [
      { id: "infernal-cannon", name: "Infernal cannon", image: "", profiles: [{ range: '24"', attacks: "D6", skill: "3+", strength: "8", ap: "-2", damage: "2", keywords: ["BLAST"] }] },
      { id: "hellforged-weapons-strike", name: "Hellforged weapons – strike", image: "", profiles: [{ range: "Melee", attacks: "4", skill: "3+", strength: "14", ap: "-3", damage: "D6+1" }] },
      { id: "hellforged-weapons-sweep", name: "Hellforged weapons – sweep", image: "", profiles: [{ range: "Melee", attacks: "8", skill: "3+", strength: "7", ap: "-2", damage: "2" }] },
    ],
    wargear: [],
  },

  {
    id: "daemon-prince-of-chaos-with-wings",
    name: "Daemon Prince Of Chaos With Wings",
    faction: "chaos-daemons",
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
    id: "epidemius",
    name: "Epidemius",
    faction: "chaos-daemons",
    image: "",
    points: 80,
    canAttachTo: [],
    defaultWargear: [
      { id: "balesword-and-nurgling-attendants", name: "Balesword and Nurgling attendants", image: "", profiles: [{ range: "Melee", attacks: "4", skill: "3+", strength: "5", ap: "-1", damage: "D3" }] },
    ],
    wargear: [],
  },

  {
    id: "exalted-flamer",
    name: "Exalted Flamer",
    faction: "chaos-daemons",
    image: "",
    points: 65,
    canAttachTo: [],
    defaultWargear: [
      { id: "fire-of-tzeentch-blue-fire", name: "Fire of Tzeentch – blue fire", image: "", profiles: [{ range: '18"', attacks: "D6", skill: "N/A", strength: "5", ap: "-1", damage: "2", keywords: ["IGNORES COVER", "PSYCHIC", "TORRENT"] }] },
      { id: "fire-of-tzeentch-pink-fire", name: "Fire of Tzeentch – pink fire", image: "", profiles: [{ range: '18"', attacks: "D6+3", skill: "N/A", strength: "4", ap: "0", damage: "1", keywords: ["IGNORES COVER", "PSYCHIC", "TORRENT"] }] },
      { id: "flamer-mouths", name: "Flamer mouths", image: "", profiles: [{ range: "Melee", attacks: "3", skill: "4+", strength: "4", ap: "0", damage: "1" }] },
    ],
    wargear: [],
  },

  {
    id: "fateskimmer",
    name: "Fateskimmer",
    faction: "chaos-daemons",
    image: "",
    points: 95,
    canAttachTo: [],
    defaultWargear: [
      { id: "arcane-fireball-witchfire", name: "Arcane Fireball – witchfire", image: "", profiles: [{ range: '18"', attacks: "D6", skill: "3+", strength: "5", ap: "-1", damage: "1", keywords: ["BLAST", "PSYCHIC"] }] },
      { id: "arcane-fireball-focused-witchfire", name: "Arcane Fireball – focused witchfire", image: "", profiles: [{ range: '18"', attacks: "D3", skill: "3+", strength: "5", ap: "-2", damage: "2", keywords: ["PSYCHIC"] }] },
      { id: "herald-combat-weapon", name: "Herald combat weapon", image: "", profiles: [{ range: "Melee", attacks: "3", skill: "3+", strength: "4", ap: "-1", damage: "1" }] },
      { id: "screamer-bites", name: "Screamer bites", image: "", profiles: [{ range: "Melee", attacks: "3", skill: "4+", strength: "4", ap: "-1", damage: "1" }] },
    ],
    wargear: [],
  },

  {
    id: "fluxmaster",
    name: "Fluxmaster",
    faction: "chaos-daemons",
    image: "",
    points: 60,
    canAttachTo: [],
    defaultWargear: [
      { id: "arcane-fireball-witchfire", name: "Arcane Fireball – witchfire", image: "", profiles: [{ range: '18"', attacks: "D6", skill: "3+", strength: "5", ap: "-1", damage: "1", keywords: ["BLAST", "PSYCHIC"] }] },
      { id: "arcane-fireball-focused-witchfire", name: "Arcane Fireball – focused witchfire", image: "", profiles: [{ range: '18"', attacks: "D3", skill: "3+", strength: "5", ap: "-2", damage: "2", keywords: ["PSYCHIC"] }] },
      { id: "herald-combat-weapon", name: "Herald combat weapon", image: "", profiles: [{ range: "Melee", attacks: "3", skill: "3+", strength: "4", ap: "-1", damage: "1" }] },
    ],
    wargear: [],
  },

  {
    id: "great-unclean-one",
    name: "Great Unclean One",
    faction: "chaos-daemons",
    image: "",
    points: 250,
    modelCountOptions: [1],
    pointsByModelCount: { 1: 250 },
    canAttachTo: [],
    defaultWargear: [
      { id: "guo-putrid-vomit", name: "Putrid vomit", image: "", profiles: [{ range: '12"', attacks: "D6+3", skill: "N/A", strength: "5", ap: "-2", damage: "1", keywords: ["IGNORES COVER", "TORRENT"] }] },
    ],
    wargear: [
      { id: "guo-plague-flail", name: "Plague flail", image: "", wargearGroup: "guo-ranged-slot", profiles: [{ range: '6"', attacks: "D6+1", skill: "3+", strength: "7", ap: "-2", damage: "2" }] },
      { id: "guo-bileblade", name: "Bileblade", image: "", wargearGroup: "guo-ranged-slot", profiles: [{ range: "Melee", attacks: "3", skill: "2+", strength: "6", ap: "-2", damage: "2", keywords: ["EXTRA ATTACKS", "LETHAL HITS"] }] },
      { id: "guo-bilesword", name: "Bilesword", image: "", wargearGroup: "guo-melee-slot", profiles: [
        { profileName: "strike", range: "Melee", attacks: "6", skill: "2+", strength: "10", ap: "-2", damage: "D6+1", keywords: ["LETHAL HITS"] },
        { profileName: "sweep", range: "Melee", attacks: "12", skill: "2+", strength: "7", ap: "-1", damage: "1", keywords: ["LETHAL HITS"] },
      ]},
      { id: "guo-doomsday-bell", name: "Doomsday bell", image: "", wargearGroup: "guo-melee-slot", note: "Reverberating Summons: Each time a model is destroyed by this weapon, you can select one friendly PLAGUEBEARERS unit within 12\" of the bearer and return 1 destroyed Plaguebearer model to that unit.", profiles: [{ range: "Melee", attacks: "6", skill: "2+", strength: "7", ap: "-1", damage: "2", keywords: ["LETHAL HITS"] }] },
    ],
    abilities: [
      {
        name: "Greater Daemon of Nurgle (Aura)",
        description: "While a friendly NURGLE LEGIONES DAEMONICA unit is within 6\" of this model, that unit is within your army's Shadow of Chaos.",
      },
      {
        name: "Daemon Lord of Nurgle (Aura)",
        description: "While a friendly NURGLE LEGIONES DAEMONICA unit is within 6\" of this model, add 1 to the Toughness characteristic of models in that unit.",
      },
      {
        name: "Nurgle's Rot (Psychic)",
        description: "At the end of your Movement phase, you can select one enemy unit within 12\" of this model. Until the start of your next Movement phase, subtract 1 from the Toughness characteristic of models in that unit.",
      },
      {
        name: "Damaged: 1-7 Wounds Remaining",
        description: "While this model has 1-7 wounds remaining, each time this model makes an attack, subtract 1 from the Hit roll.",
      },
    ],
  },

  {
    id: "herald-of-slaanesh-on-steed-of-slaanesh",
    name: "Herald Of Slaanesh On Steed Of Slaanesh",
    faction: "chaos-daemons",
    image: "",
    points: 70,
    canAttachTo: [],
    defaultWargear: [
      { id: "lashing-tongue", name: "Lashing tongue", image: "", profiles: [{ range: "Melee", attacks: "2", skill: "4+", strength: "4", ap: "0", damage: "1" }] },
      { id: "ravaging-claws", name: "Ravaging claws", image: "", profiles: [{ range: "Melee", attacks: "6", skill: "3+", strength: "5", ap: "-1", damage: "1" }] },
    ],
    wargear: [],
  },

  {
    id: "horticulous-slimux",
    name: "Horticulous Slimux",
    faction: "chaos-daemons",
    image: "",
    points: 120,
    canAttachTo: ["beasts-of-nurgle"],
    defaultWargear: [
      { id: "hs-acidic-maw", name: "Acidic maw", image: "", profiles: [{ range: "Melee", attacks: "2", skill: "4+", strength: "7", ap: "-4", damage: "3", keywords: ["DEVASTATING WOUNDS", "EXTRA ATTACKS"] }] },
      { id: "hs-lopping-shears", name: "Lopping shears", image: "", profiles: [{ range: "Melee", attacks: "4", skill: "3+", strength: "6", ap: "-2", damage: "3", keywords: ["LETHAL HITS"] }] },
    ],
    wargear: [],
    abilities: [
      {
        name: "Beast Handler",
        description: "While this model is leading a unit, you can re-roll Charge rolls made for that unit. In addition, once per battle, you can target that unit with the Heroic Intervention Stratagem for 0CP, and can do so even if you have already used that Stratagem on a different unit this phase.",
      },
      {
        name: "Seed the Garden of Nurgle",
        description: "At the end of your Movement phase, if this model is within one Area Terrain feature, until the end of the battle, that AREA TERRAIN feature is considered to be within your army's Shadow of Chaos.",
      },
    ],
  },

  {
    id: "infernal-enrapturess",
    name: "Infernal Enrapturess",
    faction: "chaos-daemons",
    image: "",
    points: 60,
    canAttachTo: ["daemonettes"],
    defaultWargear: [
      { id: "heartstring-lyre-cacophonous-melody", name: "Heartstring lyre – cacophonous melody", image: "", profiles: [{ range: '18"', attacks: "6", skill: "3+", strength: "6", ap: "0", damage: "1", keywords: ["ASSAULT"] }] },
      { id: "heartstring-lyre-euphonic-blast", name: "Heartstring lyre – euphonic blast", image: "", profiles: [{ range: '24"', attacks: "1", skill: "3+", strength: "12", ap: "-3", damage: "D6+1", keywords: ["ASSAULT"] }] },
      { id: "ie-ravaging-claws", name: "Ravaging claws", image: "", profiles: [{ range: "Melee", attacks: "5", skill: "2+", strength: "4", ap: "-1", damage: "1", keywords: ["DEVASTATING WOUNDS"] }] },
    ],
    wargear: [],
    abilities: [
      {
        name: "Harmonic Alignment",
        description: "While this model is leading a unit, in your Command phase, you can return D3 destroyed Bodyguard models to that unit.",
      },
      {
        name: "Discordant Disruption (Aura)",
        description: "While an enemy PSYKER unit is within 12\" of this model, Psychic weapons equipped by models in that unit have the [HAZARDOUS] ability.",
      },
    ],
  },

  {
    id: "kairos-fateweaver",
    name: "Kairos Fateweaver",
    faction: "chaos-daemons",
    image: "",
    points: 295,
    modelCountOptions: [1],
    pointsByModelCount: { 1: 295 },
    canAttachTo: [],
    defaultWargear: [
      { id: "infernal-gateway-witchfire", name: "Infernal Gateway – witchfire", image: "", profiles: [{ range: '24"', attacks: "D6+3", skill: "2+", strength: "9", ap: "-2", damage: "D3", keywords: ["BLAST", "INDIRECT FIRE", "PSYCHIC"] }] },
      { id: "infernal-gateway-focused-witchfire", name: "Infernal Gateway – focused witchfire", image: "", profiles: [{ range: '24"', attacks: "D3+6", skill: "2+", strength: "9", ap: "-2", damage: "3", keywords: ["BLAST", "HAZARDOUS", "INDIRECT FIRE", "PSYCHIC"] }] },
      { id: "staff-of-tomorrow", name: "Staff of Tomorrow", image: "", profiles: [{ range: "Melee", attacks: "5", skill: "3+", strength: "8", ap: "-2", damage: "2D3", keywords: ["PSYCHIC"] }] },
    ],
    wargear: [],
    abilities: [
      {
        name: "Greater Daemon of Tzeentch (Aura)",
        description: "While a friendly TZEENTCH LEGIONES DAEMONICA unit is within 6\" of this model, that unit is within your army's Shadow of Chaos.",
      },
      {
        name: "One Head Looks Forward",
        description: "At the end of your Command phase, if this model is on the battlefield, take a Leadership test for this model; if that test is passed, you gain 1CP.",
      },
      {
        name: "One Head Looks Back (Aura)",
        description: "Each time your opponent targets a unit from their army with a Stratagem, if that unit is within 12\" of this model, increase the cost of that use of that Stratagem by 1CP (this is not cumulative with any other rules that would increase the CP cost of that Stratagem).",
      },
      {
        name: "Damaged: 1-7 Wounds Remaining",
        description: "While this model has 1-7 wounds remaining, each time this model makes an attack, subtract 1 from the Hit roll.",
      },
    ],
  },

  {
    id: "karanak",
    name: "Karanak",
    faction: "chaos-daemons",
    image: "",
    points: 75,
    canAttachTo: ["flesh-hounds"],
    defaultWargear: [
      { id: "karanak-scalding-roar", name: "Scalding roar", image: "", profiles: [{ range: '12"', attacks: "D6+3", skill: "N/A", strength: "5", ap: "-1", damage: "1", keywords: ["IGNORES COVER", "TORRENT"] }] },
      { id: "karanak-soul-rending-fangs", name: "Soul-rending fangs", image: "", profiles: [{ range: "Melee", attacks: "6", skill: "2+", strength: "6", ap: "-2", damage: "2", keywords: ["ANTI-CHARACTER 3+", "PRECISION"] }] },
    ],
    wargear: [
      { id: "karanak-brass-collar", name: "Brass Collar of Bloody Vengeance", image: "", note: "The bearer has the Feel No Pain 3+ ability against Psychic Attacks and mortal wounds." },
    ],
    abilities: [
      {
        name: "Pack Leader",
        description: "While this model is leading a unit, you can re-roll Advance and Charge rolls made for that unit.",
      },
      {
        name: "Prey of the Blood God",
        description: "At the start of the first battle round, select one enemy unit to be this model's prey. Each time a model in this model's unit makes a melee attack that targets its prey, you can re-roll the Wound roll. Each time this model's prey is destroyed, select one new enemy unit to be this model's prey.",
      },
    ],
  },

  {
    id: "keeper-of-secrets",
    name: "Keeper Of Secrets",
    faction: "chaos-daemons",
    image: "",
    points: 240,
    modelCountOptions: [1],
    pointsByModelCount: { 1: 240 },
    canAttachTo: [],
    defaultWargear: [
      { id: "kos-phantasmagoria-witchfire", name: "Phantasmagoria – witchfire", image: "", profiles: [{ range: '18"', attacks: "6", skill: "2+", strength: "6", ap: "-2", damage: "1", keywords: ["DEVASTATING WOUNDS", "PSYCHIC"] }] },
      { id: "kos-phantasmagoria-focused-witchfire", name: "Phantasmagoria – focused witchfire", image: "", profiles: [{ range: '18"', attacks: "9", skill: "2+", strength: "6", ap: "-2", damage: "1", keywords: ["DEVASTATING WOUNDS", "HAZARDOUS", "PSYCHIC"] }] },
      { id: "kos-snapping-claws", name: "Snapping claws", image: "", profiles: [{ range: "Melee", attacks: "4", skill: "2+", strength: "6", ap: "-2", damage: "3", keywords: ["DEVASTATING WOUNDS", "EXTRA ATTACKS"] }] },
      { id: "kos-witstealer-sword", name: "Witstealer sword", image: "", profiles: [{ range: "Melee", attacks: "6", skill: "2+", strength: "8", ap: "-2", damage: "3" }] },
    ],
    wargear: [
      { id: "kos-living-whip", name: "Living whip", image: "", wargearGroup: "kos-optional-slot", profiles: [{ range: '12"', attacks: "6", skill: "2+", strength: "6", ap: "-1", damage: "2", keywords: ["ASSAULT"] }] },
      { id: "kos-ritual-knife", name: "Ritual knife", image: "", wargearGroup: "kos-optional-slot", profiles: [{ range: "Melee", attacks: "3", skill: "2+", strength: "6", ap: "-2", damage: "2", keywords: ["EXTRA ATTACKS"] }] },
      { id: "kos-shining-aegis", name: "Shining aegis", image: "", wargearGroup: "kos-optional-slot", note: "Shining Aegis: The bearer has a Save characteristic of 3+." },
    ],
    abilities: [
      {
        name: "Greater Daemon of Slaanesh (Aura)",
        description: "While a friendly SLAANESH LEGIONES DAEMONICA unit is within 6\" of this model, that unit is within your army's Shadow of Chaos.",
      },
      {
        name: "Daemon Lord of Slaanesh (Aura)",
        description: "While a friendly SLAANESH LEGIONES DAEMONICA unit is within 6\" of this model, improve the Armour Penetration of melee weapons in that unit by 1.",
      },
      {
        name: "Mesmerising Form",
        description: "Each time an attack targets this model, subtract 1 from the Hit roll.",
      },
      {
        name: "Damaged: 1-6 Wounds Remaining",
        description: "While this model has 1-6 wounds remaining, each time this model makes an attack, subtract 1 from the Hit roll.",
      },
    ],
  },

  {
    id: "lord-of-change",
    name: "Lord Of Change",
    faction: "chaos-daemons",
    image: "",
    points: 285,
    modelCountOptions: [1],
    pointsByModelCount: { 1: 285 },
    canAttachTo: [],
    defaultWargear: [
      { id: "loc-bolt-of-change-witchfire", name: "Bolt of Change – witchfire", image: "", profiles: [{ range: '18"', attacks: "9", skill: "2+", strength: "9", ap: "-1", damage: "1", keywords: ["PSYCHIC"] }] },
      { id: "loc-bolt-of-change-focused-witchfire", name: "Bolt of Change – focused witchfire", image: "", profiles: [{ range: '18"', attacks: "9", skill: "2+", strength: "9", ap: "-2", damage: "3", keywords: ["HAZARDOUS", "PSYCHIC"] }] },
      { id: "loc-staff-of-tzeentch", name: "Staff of Tzeentch", image: "", profiles: [{ range: "Melee", attacks: "5", skill: "3+", strength: "6", ap: "-1", damage: "3", keywords: ["PSYCHIC"] }] },
    ],
    wargear: [
      { id: "loc-rod-of-sorcery", name: "Rod of sorcery", image: "", wargearGroup: "loc-weapon-slot", profiles: [{ range: '18"', attacks: "6", skill: "2+", strength: "8", ap: "-1", damage: "2", keywords: ["PSYCHIC"] }] },
      { id: "loc-baleful-sword", name: "Baleful sword", image: "", wargearGroup: "loc-weapon-slot", profiles: [{ range: "Melee", attacks: "3", skill: "3+", strength: "7", ap: "-2", damage: "3", keywords: ["EXTRA ATTACKS"] }] },
    ],
    abilities: [
      {
        name: "Greater Daemon of Tzeentch (Aura)",
        description: "While a friendly TZEENTCH LEGIONES DAEMONICA unit is within 6\" of this model, that unit is within your army's Shadow of Chaos.",
      },
      {
        name: "Daemon Lord of Tzeentch (Aura)",
        description: "While a friendly TZEENTCH LEGIONES DAEMONICA unit is within 6\" of this model, each time a model in that unit makes a ranged attack, add 1 to the Strength characteristic of that attack.",
      },
      {
        name: "Master of Magicks (Psychic)",
        description: "In your Shooting phase, select one of the following abilities: [IGNORES COVER]; [LETHAL HITS]; [SUSTAINED HITS D3]. Until the end of the phase, this model's Bolt of Change has that ability.",
      },
      {
        name: "Damaged: 1-7 Wounds Remaining",
        description: "While this model has 1-7 wounds remaining, each time this model makes an attack, subtract 1 from the Hit roll.",
      },
    ],
  },

  {
    id: "master-of-possession",
    name: "Master Of Possession",
    faction: "chaos-daemons",
    image: "",
    points: 70,
    canAttachTo: [],
    defaultWargear: [
      { id: "bolt-pistol", name: "Bolt pistol", image: "", profiles: [{ range: '12"', attacks: "1", skill: "3+", strength: "4", ap: "0", damage: "1", keywords: ["PISTOL"] }] },
      { id: "rite-of-possession-witchfire", name: "Rite of Possession – witchfire", image: "", profiles: [{ range: '18"', attacks: "D3", skill: "3+", strength: "5", ap: "-1", damage: "D3", keywords: ["PSYCHIC"] }] },
      { id: "rite-of-possession-focused-witchfire", name: "Rite of Possession – focused witchfire", image: "", profiles: [{ range: '18"', attacks: "D3", skill: "3+", strength: "6", ap: "-2", damage: "D3", keywords: ["PSYCHIC"] }] },
      { id: "staff-of-possession", name: "Staff of possession", image: "", profiles: [{ range: "Melee", attacks: "4", skill: "3+", strength: "6", ap: "-1", damage: "D3", keywords: ["PSYCHIC"] }] },
    ],
    wargear: [],
  },

  {
    id: "poxbringer",
    name: "Poxbringer",
    faction: "chaos-daemons",
    image: "",
    points: 55,
    canAttachTo: [],
    defaultWargear: [
      { id: "foul-balesword", name: "Foul balesword", image: "", profiles: [{ range: "Melee", attacks: "3", skill: "3+", strength: "5", ap: "-1", damage: "D3" }] },
    ],
    wargear: [],
  },

  {
    id: "rendmaster-on-blood-throne",
    name: "Rendmaster On Blood Throne",
    faction: "chaos-daemons",
    image: "",
    points: 165,
    canAttachTo: [],
    defaultWargear: [
      { id: "attendants-hellblades", name: "Attendants' hellblades", image: "", profiles: [{ range: "Melee", attacks: "6", skill: "4+", strength: "5", ap: "-1", damage: "1" }] },
      { id: "blade-of-blood", name: "Blade of blood", image: "", profiles: [{ range: "Melee", attacks: "4", skill: "3+", strength: "6", ap: "-1", damage: "2", keywords: ["DEVASTATING WOUNDS"] }] },
    ],
    wargear: [],
  },

  {
    id: "renegade-enforcer",
    name: "Renegade Enforcer",
    faction: "chaos-daemons",
    image: "",
    points: 65,
    canAttachTo: [],
    defaultWargear: [
      { id: "enforcer-pistol", name: "Enforcer pistol", image: "", profiles: [{ range: '12"', attacks: "1", skill: "3+", strength: "4", ap: "0", damage: "1", keywords: ["PISTOL"] }] },
      { id: "enforcer-melee-weapon", name: "Enforcer melee weapon", image: "", profiles: [{ range: "Melee", attacks: "3", skill: "3+", strength: "4", ap: "0", damage: "1" }] },
    ],
    wargear: [
      { id: "autogun", name: "Autogun", image: "", profiles: [{ range: '24"', attacks: "2", skill: "4+", strength: "3", ap: "0", damage: "1", keywords: ["RAPID FIRE 1"] }] },
      { id: "lasgun", name: "Lasgun", image: "", profiles: [{ range: '24"', attacks: "2", skill: "4+", strength: "3", ap: "0", damage: "1", keywords: ["RAPID FIRE 1"] }] },
      { id: "shotgun", name: "Shotgun", image: "", profiles: [{ range: '12"', attacks: "2", skill: "4+", strength: "4", ap: "0", damage: "1", keywords: ["ASSAULT"] }] },
      { id: "power-fist", name: "Power fist", image: "", profiles: [{ range: "Melee", attacks: "3", skill: "3+", strength: "8", ap: "-2", damage: "2" }] },
      { id: "power-weapon", name: "Power weapon", image: "", profiles: [{ range: "Melee", attacks: "4", skill: "3+", strength: "5", ap: "-2", damage: "1" }] },
    ],
  },

  {
    id: "rogue-psyker",
    name: "Rogue Psyker",
    faction: "chaos-daemons",
    image: "",
    points: 60,
    canAttachTo: [],
    defaultWargear: [
      { id: "laspistol", name: "Laspistol", image: "", profiles: [{ range: '12"', attacks: "1", skill: "4+", strength: "3", ap: "0", damage: "1", keywords: ["PISTOL"] }] },
      { id: "psychic-strike-focused-witchfire", name: "Psychic Strike – focused witchfire", image: "", profiles: [{ range: '18"', attacks: "D3", skill: "3+", strength: "6", ap: "-2", damage: "2", keywords: ["PSYCHIC"] }] },
      { id: "psychic-strike-witchfire", name: "Psychic Strike – witchfire", image: "", profiles: [{ range: '18"', attacks: "D6", skill: "3+", strength: "5", ap: "-1", damage: "1", keywords: ["BLAST", "PSYCHIC"] }] },
      { id: "chaos-stave", name: "Chaos stave", image: "", profiles: [{ range: "Melee", attacks: "3", skill: "3+", strength: "5", ap: "-1", damage: "D3" }] },
    ],
    wargear: [],
  },

  {
    id: "rotigus",
    name: "Rotigus",
    faction: "chaos-daemons",
    image: "",
    points: 265,
    modelCountOptions: [1],
    pointsByModelCount: { 1: 265 },
    canAttachTo: [],
    defaultWargear: [
      { id: "streams-of-brackish-filth", name: "Streams of brackish filth", image: "", profiles: [{ range: '12"', attacks: "2D6", skill: "N/A", strength: "8", ap: "-2", damage: "1", keywords: ["DEVASTATING WOUNDS", "IGNORES COVER", "TORRENT"] }] },
      { id: "gnarlrod-strike", name: "Gnarlrod – strike", image: "", profiles: [{ range: "Melee", attacks: "7", skill: "2+", strength: "10", ap: "-3", damage: "3", keywords: ["LETHAL HITS", "PSYCHIC"] }] },
      { id: "gnarlrod-sweep", name: "Gnarlrod – sweep", image: "", profiles: [{ range: "Melee", attacks: "14", skill: "2+", strength: "8", ap: "-1", damage: "1", keywords: ["LETHAL HITS", "PSYCHIC"] }] },
    ],
    wargear: [],
    abilities: [
      {
        name: "Virulent Blessing (Psychic)",
        description: "At the start of the Fight phase, you can select one enemy unit within 24\" and visible to this model. Until the end of the phase, each time an attack made by a PLAGUE LEGIONS model is allocated to a model in that unit, add 1 to the Damage characteristic of that attack.",
      },
      {
        name: "Deluge of Nurgle (Aura)",
        description: "While an enemy unit is within 6\" of this model, subtract 2 from the Move characteristic and subtract 1 from the Objective Control characteristic of models in that unit.",
      },
      {
        name: "Damaged: 1-7 Wounds Remaining",
        description: "While this model has 1-7 wounds remaining, each time this model makes an attack, subtract 1 from the Hit roll.",
      },
    ],
  },

  {
    id: "scabeiathrax-the-bloated",
    name: "Scabeiathrax The Bloated",
    faction: "chaos-daemons",
    image: "",
    points: 275,
    canAttachTo: [],
    defaultWargear: [
      { id: "putrid-vomit", name: "Putrid vomit", image: "", profiles: [{ range: '9"', attacks: "D6", skill: "N/A", strength: "5", ap: "-1", damage: "1", keywords: ["IGNORES COVER", "TORRENT"] }] },
      { id: "blade-of-decay-strike", name: "Blade of decay – Strike", image: "", profiles: [{ range: "Melee", attacks: "4", skill: "3+", strength: "12", ap: "-3", damage: "D6+1" }] },
      { id: "blade-of-decay-sweep", name: "Blade of decay – Sweep", image: "", profiles: [{ range: "Melee", attacks: "8", skill: "3+", strength: "6", ap: "-1", damage: "2" }] },
    ],
    wargear: [],
  },

  {
    id: "shalaxi-helbane",
    name: "Shalaxi Helbane",
    faction: "chaos-daemons",
    image: "",
    points: 340,
    modelCountOptions: [1],
    pointsByModelCount: { 1: 340 },
    canAttachTo: [],
    defaultWargear: [
      { id: "lash-of-slaanesh", name: "Lash of Slaanesh", image: "", profiles: [{ range: '12"', attacks: "6", skill: "2+", strength: "6", ap: "-1", damage: "2", keywords: ["ASSAULT"] }] },
      { id: "pavane-of-slaanesh-witchfire", name: "Pavane of Slaanesh – witchfire", image: "", profiles: [{ range: '18"', attacks: "D6", skill: "2+", strength: "9", ap: "-1", damage: "D3", keywords: ["DEVASTATING WOUNDS", "PSYCHIC"] }] },
      { id: "pavane-of-slaanesh-focused-witchfire", name: "Pavane of Slaanesh – focused witchfire", image: "", profiles: [{ range: '18"', attacks: "D6", skill: "2+", strength: "9", ap: "-2", damage: "D3", keywords: ["DEVASTATING WOUNDS", "HAZARDOUS", "PSYCHIC", "SUSTAINED HITS 3"] }] },
      { id: "snapping-claws", name: "Snapping claws", image: "", profiles: [{ range: "Melee", attacks: "4", skill: "2+", strength: "6", ap: "-2", damage: "3", keywords: ["DEVASTATING WOUNDS", "EXTRA ATTACKS"] }] },
      { id: "soulpiercer", name: "Soulpiercer", image: "", profiles: [{ range: "Melee", attacks: "6", skill: "2+", strength: "12", ap: "-3", damage: "D6+2", keywords: ["PRECISION"] }] },
    ],
    wargear: [],
    abilities: [
      {
        name: "Greater Daemon of Slaanesh (Aura)",
        description: "While a friendly SLAANESH LEGIONES DAEMONICA unit is within 6\" of this model, that unit is within your army's Shadow of Chaos.",
      },
      {
        name: "No Prey Can Evade",
        description: "You can re-roll Advance and Charge rolls made for this model.",
      },
      {
        name: "Monarch of the Hunt",
        description: "At the start of the first battle round, select one enemy unit to be this model's quarry. Each time this model makes a melee attack that targets its quarry, you can re-roll the Hit roll and you can re-roll the Wound roll. Each time this model's quarry is destroyed, select one new enemy unit to be this model's quarry.",
      },
      {
        name: "Damaged: 1-7 Wounds Remaining",
        description: "While this model has 1-7 wounds remaining, each time this model makes an attack, subtract 1 from the Hit roll.",
      },
    ],
  },

  {
    id: "skarbrand",
    name: "Skarbrand",
    faction: "chaos-daemons",
    image: "",
    points: 305,
    canAttachTo: [],
    defaultWargear: [
      { id: "bellow-of-endless-fury", name: "Bellow of endless fury", image: "", profiles: [{ range: '8"', attacks: "2D6", skill: "N/A", strength: "6", ap: "-2", damage: "2", keywords: ["IGNORES COVER", "TORRENT"] }] },
      { id: "slaughter-and-carnage-strike", name: "Slaughter and Carnage – strike", image: "", profiles: [{ range: "Melee", attacks: "6", skill: "2+", strength: "14", ap: "-4", damage: "D6+2", keywords: ["DEVASTATING WOUNDS"] }] },
      { id: "slaughter-and-carnage-sweep", name: "Slaughter and Carnage – sweep", image: "", profiles: [{ range: "Melee", attacks: "12", skill: "2+", strength: "7", ap: "-2", damage: "2" }] },
    ],
    wargear: [],
  },

  {
    id: "skullmaster",
    name: "Skullmaster",
    faction: "chaos-daemons",
    image: "",
    points: 100,
    canAttachTo: [],
    defaultWargear: [
      { id: "blade-of-blood", name: "Blade of blood", image: "", profiles: [{ range: "Melee", attacks: "4", skill: "3+", strength: "6", ap: "-1", damage: "2", keywords: ["DEVASTATING WOUNDS"] }] },
      { id: "juggernaut-s-bladed-horn", name: "Juggernaut's bladed horn", image: "", profiles: [{ range: "Melee", attacks: "3", skill: "4+", strength: "6", ap: "-1", damage: "2" }] },
    ],
    wargear: [],
  },

  {
    id: "skulltaker",
    name: "Skulltaker",
    faction: "chaos-daemons",
    image: "",
    points: 85,
    canAttachTo: ["bloodletters"],
    defaultWargear: [
      { id: "the-slayer-sword", name: "The Slayer Sword", image: "", profiles: [{ range: "Melee", attacks: "6", skill: "2+", strength: "6", ap: "-2", damage: "3", keywords: ["DEVASTATING WOUNDS", "PRECISION"] }] },
    ],
    wargear: [],
    abilities: [
      {
        name: "Lord of Decapitations",
        description: "While this model is leading a unit, melee weapons equipped by models in that unit have the [DEVASTATING WOUNDS] ability.",
      },
      {
        name: "Skulls for Khorne",
        description: "Each time this model makes an attack that targets a Character unit, you can re-roll the Hit roll and you can re-roll the Wound roll. Each time this model destroys an enemy Character unit, you gain 1CP.",
      },
    ],
  },

  {
    id: "sloppity-bilepiper",
    name: "Sloppity Bilepiper",
    faction: "chaos-daemons",
    image: "",
    points: 55,
    canAttachTo: [],
    defaultWargear: [
      { id: "marotter", name: "Marotter", image: "", profiles: [{ range: "Melee", attacks: "4", skill: "3+", strength: "5", ap: "0", damage: "1", keywords: ["LETHAL HITS"] }] },
    ],
    wargear: [],
    abilities: [
      {
        name: "Jolly Gutpipes",
        description: "While this model is leading a unit, add 1 to the Move characteristic of models in that unit and you can re-roll Advance rolls made for that unit.",
      },
      {
        name: "Disease of Mirth (Aura)",
        description: "At the start of the Fight phase, every enemy unit (excluding MONSTERS and VEHICLES) within 6\" of this model must take a Battle-shock test.",
      },
    ],
  },

  {
    id: "sorcerer",
    name: "Sorcerer",
    faction: "chaos-daemons",
    image: "",
    points: 60,
    canAttachTo: [],
    defaultWargear: [
      { id: "bolt-pistol", name: "Bolt pistol", image: "", profiles: [{ range: '12"', attacks: "1", skill: "3+", strength: "4", ap: "0", damage: "1", keywords: ["PISTOL"] }] },
      { id: "infernal-gaze-witchfire", name: "Infernal Gaze – witchfire", image: "", profiles: [{ range: '18"', attacks: "3", skill: "3+", strength: "5", ap: "-1", damage: "1", keywords: ["PSYCHIC"] }] },
      { id: "infernal-gaze-focused-witchfire", name: "Infernal Gaze – focused witchfire", image: "", profiles: [{ range: '18"', attacks: "D3", skill: "3+", strength: "5", ap: "-1", damage: "D3", keywords: ["PSYCHIC"] }] },
      { id: "force-weapon", name: "Force weapon", image: "", profiles: [{ range: "Melee", attacks: "4", skill: "3+", strength: "6", ap: "-1", damage: "D3", keywords: ["PSYCHIC"] }] },
    ],
    wargear: [],
  },

  {
    id: "sorcerer-in-terminator-armour",
    name: "Sorcerer In Terminator Armour",
    faction: "chaos-daemons",
    image: "",
    points: 80,
    canAttachTo: [],
    defaultWargear: [
      { id: "combi-bolter", name: "Combi-bolter", image: "", profiles: [{ range: '24"', attacks: "2", skill: "3+", strength: "4", ap: "0", damage: "1", keywords: ["RAPID FIRE 2"] }] },
      { id: "infernal-gaze-witchfire", name: "Infernal Gaze – witchfire", image: "", profiles: [{ range: '18"', attacks: "3", skill: "3+", strength: "5", ap: "-1", damage: "1", keywords: ["PSYCHIC"] }] },
      { id: "infernal-gaze-focused-witchfire", name: "Infernal Gaze – focused witchfire", image: "", profiles: [{ range: '18"', attacks: "D3", skill: "3+", strength: "5", ap: "-1", damage: "D3", keywords: ["PSYCHIC"] }] },
      { id: "force-weapon", name: "Force weapon", image: "", profiles: [{ range: "Melee", attacks: "4", skill: "3+", strength: "6", ap: "-1", damage: "D3", keywords: ["PSYCHIC"] }] },
    ],
    wargear: [
      { id: "combi-weapon", name: "Combi-weapon", image: "", profiles: [{ range: '24"', attacks: "2", skill: "3+", strength: "4", ap: "0", damage: "1", keywords: ["RAPID FIRE 1"] }] },
    ],
  },

  {
    id: "sorcerer-on-disc-of-tzeentch",
    name: "Sorcerer On Disc Of Tzeentch",
    faction: "chaos-daemons",
    image: "",
    points: 80,
    canAttachTo: [],
    defaultWargear: [
      { id: "bolt-pistol", name: "Bolt pistol", image: "", profiles: [{ range: '12"', attacks: "1", skill: "3+", strength: "4", ap: "0", damage: "1", keywords: ["PISTOL"] }] },
      { id: "infernal-gaze-focused-witchfire", name: "Infernal Gaze – focused witchfire", image: "", profiles: [{ range: '18"', attacks: "D3", skill: "3+", strength: "5", ap: "-1", damage: "D3", keywords: ["PSYCHIC"] }] },
      { id: "infernal-gaze-witchfire", name: "Infernal Gaze – witchfire", image: "", profiles: [{ range: '18"', attacks: "3", skill: "3+", strength: "5", ap: "-1", damage: "1", keywords: ["PSYCHIC"] }] },
      { id: "force-weapon", name: "Force weapon", image: "", profiles: [{ range: "Melee", attacks: "4", skill: "3+", strength: "6", ap: "-1", damage: "D3", keywords: ["PSYCHIC"] }] },
    ],
    wargear: [
      { id: "combi-bolter", name: "Combi-bolter", image: "", profiles: [{ range: '24"', attacks: "2", skill: "3+", strength: "4", ap: "0", damage: "1", keywords: ["RAPID FIRE 2"] }] },
      { id: "combi-weapon", name: "Combi-weapon", image: "", profiles: [{ range: '24"', attacks: "2", skill: "3+", strength: "4", ap: "0", damage: "1", keywords: ["RAPID FIRE 1"] }] },
      { id: "plasma-pistol", name: "Plasma pistol", image: "", profiles: [{ profileName: "standard", range: '12"', attacks: "1", skill: "3+", strength: "7", ap: "-2", damage: "1", keywords: ["PISTOL"] }, { profileName: "supercharge", range: '12"', attacks: "1", skill: "3+", strength: "8", ap: "-3", damage: "2", keywords: ["PISTOL", "HAZARDOUS"] }] },
      { id: "accursed-weapon", name: "Accursed weapon", image: "", profiles: [{ range: "Melee", attacks: "5", skill: "3+", strength: "5", ap: "-2", damage: "1" }] },
      { id: "astartes-chainsword", name: "Astartes chainsword", image: "", profiles: [{ range: "Melee", attacks: "4", skill: "3+", strength: "4", ap: "-1", damage: "1" }] },
      { id: "power-fist", name: "Power fist", image: "", profiles: [{ range: "Melee", attacks: "3", skill: "3+", strength: "8", ap: "-2", damage: "2" }] },
    ],
  },

  {
    id: "sorcerer-on-palanquin-of-nurgle",
    name: "Sorcerer On Palanquin Of Nurgle",
    faction: "chaos-daemons",
    image: "",
    points: 80,
    canAttachTo: [],
    defaultWargear: [
      { id: "bolt-pistol", name: "Bolt pistol", image: "", profiles: [{ range: '12"', attacks: "1", skill: "3+", strength: "4", ap: "0", damage: "1", keywords: ["PISTOL"] }] },
      { id: "infernal-gaze-focused-witchfire", name: "Infernal Gaze – focused witchfire", image: "", profiles: [{ range: '18"', attacks: "D3", skill: "3+", strength: "5", ap: "-1", damage: "D3", keywords: ["PSYCHIC"] }] },
      { id: "infernal-gaze-witchfire", name: "Infernal Gaze – witchfire", image: "", profiles: [{ range: '18"', attacks: "3", skill: "3+", strength: "5", ap: "-1", damage: "1", keywords: ["PSYCHIC"] }] },
      { id: "force-weapon", name: "Force weapon", image: "", profiles: [{ range: "Melee", attacks: "4", skill: "3+", strength: "6", ap: "-1", damage: "D3", keywords: ["PSYCHIC"] }] },
      { id: "nurgling-s-claws-and-teeth", name: "Nurgling's claws and teeth", image: "", profiles: [{ range: "Melee", attacks: "5", skill: "5+", strength: "2", ap: "0", damage: "1" }] },
    ],
    wargear: [
      { id: "combi-bolter", name: "Combi-bolter", image: "", profiles: [{ range: '24"', attacks: "2", skill: "3+", strength: "4", ap: "0", damage: "1", keywords: ["RAPID FIRE 2"] }] },
      { id: "combi-weapon", name: "Combi-weapon", image: "", profiles: [{ range: '24"', attacks: "2", skill: "3+", strength: "4", ap: "0", damage: "1", keywords: ["RAPID FIRE 1"] }] },
      { id: "plasma-pistol", name: "Plasma pistol", image: "", profiles: [{ profileName: "standard", range: '12"', attacks: "1", skill: "3+", strength: "7", ap: "-2", damage: "1", keywords: ["PISTOL"] }, { profileName: "supercharge", range: '12"', attacks: "1", skill: "3+", strength: "8", ap: "-3", damage: "2", keywords: ["PISTOL", "HAZARDOUS"] }] },
      { id: "accursed-weapon", name: "Accursed weapon", image: "", profiles: [{ range: "Melee", attacks: "5", skill: "3+", strength: "5", ap: "-2", damage: "1" }] },
      { id: "astartes-chainsword", name: "Astartes chainsword", image: "", profiles: [{ range: "Melee", attacks: "4", skill: "3+", strength: "4", ap: "-1", damage: "1" }] },
      { id: "power-fist", name: "Power fist", image: "", profiles: [{ range: "Melee", attacks: "3", skill: "3+", strength: "8", ap: "-2", damage: "2" }] },
    ],
  },

  {
    id: "sorcerer-on-steed-of-slaanesh",
    name: "Sorcerer On Steed Of Slaanesh",
    faction: "chaos-daemons",
    image: "",
    points: 85,
    canAttachTo: [],
    defaultWargear: [
      { id: "bolt-pistol", name: "Bolt pistol", image: "", profiles: [{ range: '12"', attacks: "1", skill: "3+", strength: "4", ap: "0", damage: "1", keywords: ["PISTOL"] }] },
      { id: "infernal-gaze-focused-witchfire", name: "Infernal Gaze – focused witchfire", image: "", profiles: [{ range: '18"', attacks: "D3", skill: "3+", strength: "5", ap: "-1", damage: "D3", keywords: ["PSYCHIC"] }] },
      { id: "infernal-gaze-witchfire", name: "Infernal Gaze – witchfire", image: "", profiles: [{ range: '18"', attacks: "3", skill: "3+", strength: "5", ap: "-1", damage: "1", keywords: ["PSYCHIC"] }] },
      { id: "force-weapon", name: "Force weapon", image: "", profiles: [{ range: "Melee", attacks: "4", skill: "3+", strength: "6", ap: "-1", damage: "D3", keywords: ["PSYCHIC"] }] },
      { id: "lashing-tongue", name: "Lashing tongue", image: "", profiles: [{ range: "Melee", attacks: "2", skill: "4+", strength: "4", ap: "0", damage: "1" }] },
    ],
    wargear: [
      { id: "combi-bolter", name: "Combi-bolter", image: "", profiles: [{ range: '24"', attacks: "2", skill: "3+", strength: "4", ap: "0", damage: "1", keywords: ["RAPID FIRE 2"] }] },
      { id: "combi-weapon", name: "Combi-weapon", image: "", profiles: [{ range: '24"', attacks: "2", skill: "3+", strength: "4", ap: "0", damage: "1", keywords: ["RAPID FIRE 1"] }] },
      { id: "plasma-pistol", name: "Plasma pistol", image: "", profiles: [{ profileName: "standard", range: '12"', attacks: "1", skill: "3+", strength: "7", ap: "-2", damage: "1", keywords: ["PISTOL"] }, { profileName: "supercharge", range: '12"', attacks: "1", skill: "3+", strength: "8", ap: "-3", damage: "2", keywords: ["PISTOL", "HAZARDOUS"] }] },
      { id: "accursed-weapon", name: "Accursed weapon", image: "", profiles: [{ range: "Melee", attacks: "5", skill: "3+", strength: "5", ap: "-2", damage: "1" }] },
      { id: "astartes-chainsword", name: "Astartes chainsword", image: "", profiles: [{ range: "Melee", attacks: "4", skill: "3+", strength: "4", ap: "-1", damage: "1" }] },
      { id: "power-fist", name: "Power fist", image: "", profiles: [{ range: "Melee", attacks: "3", skill: "3+", strength: "8", ap: "-2", damage: "2" }] },
    ],
  },

  {
    id: "spoilpox-scrivener",
    name: "Spoilpox Scrivener",
    faction: "chaos-daemons",
    image: "",
    points: 60,
    canAttachTo: [],
    defaultWargear: [
      { id: "disgusting-sneezes", name: "Disgusting sneezes", image: "", profiles: [{ range: '9"', attacks: "D6", skill: "N/A", strength: "3", ap: "0", damage: "1", keywords: ["IGNORES COVER", "TORRENT"] }] },
      { id: "plaguesword-and-distended-maw", name: "Plaguesword and distended maw", image: "", profiles: [{ range: "Melee", attacks: "4", skill: "3+", strength: "5", ap: "-1", damage: "D3" }] },
    ],
    wargear: [],
  },

  {
    id: "syll-esske",
    name: "Syll Esske",
    faction: "chaos-daemons",
    image: "",
    points: 120,
    canAttachTo: [],
    defaultWargear: [
      { id: "cacophonic-choir-witchfire", name: "Cacophonic choir – witchfire", image: "", profiles: [{ range: '18"', attacks: "D6", skill: "3+", strength: "5", ap: "-1", damage: "D3", keywords: ["BLAST", "PSYCHIC"] }] },
      { id: "cacophonic-choir-focused-witchfire", name: "Cacophonic choir – focused witchfire", image: "", profiles: [{ range: '18"', attacks: "D6", skill: "3+", strength: "5", ap: "-2", damage: "D3", keywords: ["BLAST", "PSYCHIC"] }] },
      { id: "scourging-whip", name: "Scourging whip", image: "", profiles: [{ range: "Melee", attacks: "5", skill: "3+", strength: "5", ap: "-1", damage: "2" }] },
      { id: "axe-of-dominion", name: "Axe of Dominion", image: "", profiles: [{ range: "Melee", attacks: "4", skill: "3+", strength: "7", ap: "-2", damage: "2" }] },
    ],
    wargear: [],
  },

  {
    id: "the-blue-scribes",
    name: "The Blue Scribes",
    faction: "chaos-daemons",
    image: "",
    points: 75,
    canAttachTo: [],
    defaultWargear: [
      { id: "sharp-quills", name: "Sharp quills", image: "", profiles: [{ range: "Melee", attacks: "2", skill: "4+", strength: "3", ap: "0", damage: "1" }] },
    ],
    wargear: [],
  },

  {
    id: "the-changeling",
    name: "The Changeling",
    faction: "chaos-daemons",
    image: "",
    points: 90,
    canAttachTo: ["blue-horrors", "pink-horrors"],
    defaultWargear: [
      { id: "changeling-infernal-flames-witchfire", name: "Infernal Flames – witchfire", image: "", profiles: [{ range: '12"', attacks: "D6", skill: "N/A", strength: "6", ap: "-1", damage: "1", keywords: ["IGNORES COVER", "PSYCHIC", "TORRENT"] }] },
      { id: "changeling-infernal-flames-focused", name: "Infernal Flames – focused witchfire", image: "", profiles: [{ range: '12"', attacks: "D6+3", skill: "N/A", strength: "6", ap: "-1", damage: "D3", keywords: ["HAZARDOUS", "IGNORES COVER", "PSYCHIC", "TORRENT"] }] },
      { id: "changeling-tricksters-staff", name: "The Trickster's Staff", image: "", profiles: [{ range: "Melee", attacks: "3", skill: "4+", strength: "4", ap: "-1", damage: "D3", keywords: ["PSYCHIC"] }] },
    ],
    wargear: [],
    abilities: [
      {
        name: "Formless Horror",
        description: "Each time an enemy unit wishes to select this model as the target of an attack, that unit must first take a Battle-shock test. If that test is failed, in addition to being Battle-shocked, that enemy unit cannot target this model this phase.",
      },
      {
        name: "Mischief and Confusion",
        description: "At the start of your opponent's Shooting phase, select one enemy unit within 12\" of and visible to this model and roll one D6: on a 2-5, until the end of the phase, each time a model in that enemy unit makes an attack, subtract 1 from the Hit roll; on a 6, that enemy unit is not eligible to shoot this phase.",
      },
    ],
  },

  {
    id: "the-masque-of-slaanesh",
    name: "The Masque Of Slaanesh",
    faction: "chaos-daemons",
    image: "",
    points: 95,
    canAttachTo: [],
    defaultWargear: [
      { id: "serrated-claws", name: "Serrated claws", image: "", profiles: [{ range: "Melee", attacks: "6", skill: "3+", strength: "5", ap: "-2", damage: "1" }] },
    ],
    wargear: [],
  },

  {
    id: "tormentbringer-on-exalted-seeker-chariot",
    name: "Tormentbringer On Exalted Seeker Chariot",
    faction: "chaos-daemons",
    image: "",
    points: 140,
    canAttachTo: [],
    defaultWargear: [
      { id: "lashes-of-torment", name: "Lashes of torment", image: "", profiles: [{ range: "Melee", attacks: "6", skill: "3+", strength: "5", ap: "-1", damage: "1" }] },
      { id: "exalted-seeker-tongues", name: "Exalted Seeker tongues", image: "", profiles: [{ range: "Melee", attacks: "4", skill: "4+", strength: "4", ap: "0", damage: "1" }] },
      { id: "ravaging-claws", name: "Ravaging claws", image: "", profiles: [{ range: "Melee", attacks: "6", skill: "3+", strength: "5", ap: "-1", damage: "1" }] },
    ],
    wargear: [],
  },

  {
    id: "tranceweaver",
    name: "Tranceweaver",
    faction: "chaos-daemons",
    image: "",
    points: 60,
    canAttachTo: [],
    defaultWargear: [
      { id: "ravaging-claws", name: "Ravaging claws", image: "", profiles: [{ range: "Melee", attacks: "6", skill: "3+", strength: "5", ap: "-1", damage: "1" }] },
    ],
    wargear: [],
  },

  {
    id: "zarakynel",
    name: "Zarakynel",
    faction: "chaos-daemons",
    image: "",
    points: 320,
    canAttachTo: [],
    defaultWargear: [
      { id: "phantasmagoria-focused-witchfire", name: "Phantasmagoria – focused witchfire", image: "", profiles: [{ range: '18"', attacks: "3", skill: "3+", strength: "8", ap: "-2", damage: "D3", keywords: ["PSYCHIC"] }] },
      { id: "phantasmagoria-witchfire", name: "Phantasmagoria – witchfire", image: "", profiles: [{ range: '18"', attacks: "3", skill: "3+", strength: "6", ap: "-1", damage: "D3", keywords: ["PSYCHIC"] }] },
      { id: "snapping-claws", name: "Snapping claws", image: "", profiles: [{ range: "Melee", attacks: "4", skill: "3+", strength: "8", ap: "-2", damage: "D3" }] },
      { id: "souleater-blade", name: "Souleater blade", image: "", profiles: [{ range: "Melee", attacks: "6", skill: "2+", strength: "12", ap: "-4", damage: "D6" }] },
    ],
    wargear: [],
  },

];
