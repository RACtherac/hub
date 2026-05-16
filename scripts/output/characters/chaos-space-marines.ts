import type { Character } from "../../../src/types/warhammer";

export const chaosSpaceMarinesCharacters: Character[] = [

  {
    id: "abaddon-the-despoiler",
    name: "Abaddon The Despoiler",
    faction: "chaos-space-marine",
    image: "",
    points: 270,
    canAttachTo: [ "chaos-terminator-squad", "chosen" ],
    defaultWargear: [
      { id: "talon-of-horus", name: "Talon of Horus", image: "", profiles: [{ profileName: "shooting", range: '24"', attacks: "4", skill: "2+", strength: "5", ap: "-2", damage: "2", keywords: ["SUSTAINED HITS 1"] }, { profileName: "melee", range: "Melee", attacks: "8", skill: "2+", strength: "14", ap: "-4", damage: "3", keywords: ["DEVASTATING WOUNDS"] }] },
      { id: "drach-nyen", name: "Drach'nyen", image: "", profiles: [{ range: "Melee", attacks: "6", skill: "2+", strength: "10", ap: "-4", damage: "D6", keywords: ["DEVASTATING WOUNDS"] }] },
    ],
    abilities: [
      {
        name: "Dark Destiny",
        description: "Each time this model's unit makes a Dark Pact and does not fail the resulting Leadership test, if the result of that test was 7+, you gain 1CP.",
      },
      {
        name: "The Warmaster",
        description: " In your Command phase, select one Warmaster ability (see left). Until the start of your next Command phase, this model has that ability."
      },
       {
        name: "Paragon of Hatred (Aura)",
        description: " While a friendly HERETIC ASTARTES unit is within 6 (excluding DAMNED units) of this model, each time a model in that unit makes an attack, you can re-roll the Hit roll."
      },
       {
        name: "Mark of Chaos Ascendant (Aura)",
        description: " While a friendly HERETIC ASTARTES INFANTRY or HERETIC ASTARTES MOUNTED unit (excluding DAMNED units) is within 6 of this model, models in that unit have a 4+ invulnerable save."
      },
       {
        name: "Lord of the Traitor Legions (Aura)",
        description: " While a friendly HERETIC ASTARTES unit (excluding DAMNED units) is within 6 of this model, you can re-roll Leadership and Battle-shock tests taken for that unit."
      },
      {
        name: "SUPREME COMMANDER",
        description: "If this model is in your army, it must be your Warlord."
      },
    ],

    wargear: [],
  },

  {
    id: "chaos-lord",
    name: "Chaos Lord",
    faction: "chaos-space-marine",
    image: "",
    points: 90,
    canAttachTo: ["chosen", "legionaries", "nemesis-claw", "red-corsairs-raiders"],
    abilities: [
      {
        name: "Lord of Chaos",
        description: "Once per battle round, one unit from your army with this ability can use it when its unit is targeted with a Stratagem. If it does, reduce the CP cost of that use of that Stratagem by 1CP.",
      },
      {
        name: "Chance for Glory",
        description: "Once per battle, at the start of the Fight phase, this model can use this ability. If it does, until the end of the phase, improve the Strength, Attacks, Armour Penetration and Damage characteristics of melee weapons equipped by this model by 1.",
      },
    ],
    wargear: [
      { id: "chaos-lord-plasma-pistol", name: "Plasma pistol", image: "", profiles: [
        { profileName: "standard", range: '12"', attacks: "1", skill: "2+", strength: "7", ap: "-2", damage: "1", keywords: ["PISTOL"] },
        { profileName: "supercharge", range: '12"', attacks: "1", skill: "2+", strength: "8", ap: "-3", damage: "2", keywords: ["HAZARDOUS", "PISTOL"] },
      ]},
      { id: "chaos-lord-accursed-weapon", name: "Accursed weapon", image: "", profiles: [{ range: "Melee", attacks: "6", skill: "2+", strength: "5", ap: "-2", damage: "1" }] },
      { id: "chaos-lord-astartes-chainsword", name: "Astartes chainsword", image: "", profiles: [{ range: "Melee", attacks: "7", skill: "2+", strength: "4", ap: "-1", damage: "1" }] },
      { id: "chaos-lord-daemon-hammer", name: "Daemon hammer", image: "", profiles: [{ range: "Melee", attacks: "5", skill: "3+", strength: "8", ap: "-2", damage: "2", keywords: ["DEVASTATING WOUNDS"] }] },
      { id: "chaos-lord-power-fist", name: "Power fist", image: "", profiles: [{ range: "Melee", attacks: "5", skill: "2+", strength: "8", ap: "-2", damage: "2" }] },
    ],
    wargearGroups: [
      ["chaos-lord-daemon-hammer", "chaos-lord-accursed-weapon", "chaos-lord-astartes-chainsword"],
      ["chaos-lord-plasma-pistol", "chaos-lord-power-fist"],
    ],
  },

  {
    id: "chaos-lord-in-terminator-armour",
    name: "Chaos Lord In Terminator Armour",
    faction: "chaos-space-marine",
    image: "",
    points: 95,
    canAttachTo: [],
    defaultWargear: [
      { id: "combi-bolter", name: "Combi-bolter", image: "", profiles: [{ range: '24"', attacks: "4", skill: "3+", strength: "4", ap: "0", damage: "1", keywords: ["RAPID FIRE 2"] }] },
      { id: "exalted-weapon", name: "Exalted weapon", image: "", profiles: [{ range: "Melee", attacks: "5", skill: "2+", strength: "6", ap: "-2", damage: "2" }] },
    ],
    wargear: [
      { id: "chainfist", name: "Chainfist", image: "", profiles: [{ range: "Melee", attacks: "3", skill: "3+", strength: "8", ap: "-2", damage: "2", keywords: ["ANTI-VEHICLE 4+"] }] },
      { id: "power-fist", name: "Power fist", image: "", profiles: [{ range: "Melee", attacks: "3", skill: "3+", strength: "8", ap: "-2", damage: "2" }] },
    ],
  },

  {
    id: "chaos-lord-on-bike",
    name: "Chaos Lord On Bike",
    faction: "chaos-space-marine",
    image: "",
    points: 95,
    canAttachTo: [],
    defaultWargear: [
      { id: "bolt-pistol", name: "Bolt pistol", image: "", profiles: [{ range: '12"', attacks: "1", skill: "3+", strength: "4", ap: "0", damage: "1", keywords: ["PISTOL"] }] },
      { id: "combi-bolter", name: "Combi-bolter", image: "", profiles: [{ range: '24"', attacks: "4", skill: "3+", strength: "4", ap: "0", damage: "1", keywords: ["RAPID FIRE 2"] }] },
      { id: "astartes-chainsword", name: "Astartes chainsword", image: "", profiles: [{ range: "Melee", attacks: "5", skill: "3+", strength: "4", ap: "0", damage: "1" }] },
      { id: "close-combat-weapon", name: "Close combat weapon", image: "", profiles: [{ range: "Melee", attacks: "3", skill: "3+", strength: "4", ap: "0", damage: "1" }] },
    ],
    wargear: [
      { id: "combi-weapon", name: "Combi-weapon", image: "", profiles: [{ range: '24"', attacks: "2", skill: "3+", strength: "4", ap: "0", damage: "1", keywords: ["RAPID FIRE 1"] }] },
      { id: "plasma-pistol", name: "Plasma pistol", image: "", profiles: [{ profileName: "standard", range: '12"', attacks: "1", skill: "3+", strength: "7", ap: "-2", damage: "1", keywords: ["PISTOL"] }, { profileName: "supercharge", range: '12"', attacks: "1", skill: "3+", strength: "8", ap: "-3", damage: "2", keywords: ["PISTOL", "HAZARDOUS"] }] },
      { id: "accursed-weapon", name: "Accursed weapon", image: "", profiles: [{ range: "Melee", attacks: "5", skill: "3+", strength: "4", ap: "-2", damage: "1" }] },
      { id: "paired-accursed-weapons", name: "Paired accursed weapons", image: "", profiles: [{ range: "Melee", attacks: "7", skill: "3+", strength: "4", ap: "-2", damage: "1" }] },
      { id: "power-fist", name: "Power fist", image: "", profiles: [{ range: "Melee", attacks: "3", skill: "3+", strength: "8", ap: "-2", damage: "2" }] },
    ],
  },

  {
    id: "chaos-lord-on-disc-of-tzeentch",
    name: "Chaos Lord On Disc Of Tzeentch",
    faction: "chaos-space-marine",
    image: "",
    points: 100,
    canAttachTo: [],
    defaultWargear: [
      { id: "bolt-pistol", name: "Bolt pistol", image: "", profiles: [{ range: '12"', attacks: "1", skill: "3+", strength: "4", ap: "0", damage: "1", keywords: ["PISTOL"] }] },
      { id: "astartes-chainsword", name: "Astartes chainsword", image: "", profiles: [{ range: "Melee", attacks: "5", skill: "3+", strength: "4", ap: "0", damage: "1" }] },
      { id: "close-combat-weapon", name: "Close combat weapon", image: "", profiles: [{ range: "Melee", attacks: "3", skill: "3+", strength: "4", ap: "0", damage: "1" }] },
    ],
    wargear: [
      { id: "combi-bolter", name: "Combi-bolter", image: "", profiles: [{ range: '24"', attacks: "4", skill: "3+", strength: "4", ap: "0", damage: "1", keywords: ["RAPID FIRE 2"] }] },
      { id: "combi-weapon", name: "Combi-weapon", image: "", profiles: [{ range: '24"', attacks: "2", skill: "3+", strength: "4", ap: "0", damage: "1", keywords: ["RAPID FIRE 1"] }] },
      { id: "plasma-pistol", name: "Plasma pistol", image: "", profiles: [{ profileName: "standard", range: '12"', attacks: "1", skill: "3+", strength: "7", ap: "-2", damage: "1", keywords: ["PISTOL"] }, { profileName: "supercharge", range: '12"', attacks: "1", skill: "3+", strength: "8", ap: "-3", damage: "2", keywords: ["PISTOL", "HAZARDOUS"] }] },
      { id: "accursed-weapon", name: "Accursed weapon", image: "", profiles: [{ range: "Melee", attacks: "5", skill: "3+", strength: "4", ap: "-2", damage: "1" }] },
      { id: "paired-accursed-weapons", name: "Paired accursed weapons", image: "", profiles: [{ range: "Melee", attacks: "7", skill: "3+", strength: "4", ap: "-2", damage: "1" }] },
      { id: "power-fist", name: "Power fist", image: "", profiles: [{ range: "Melee", attacks: "3", skill: "3+", strength: "8", ap: "-2", damage: "2" }] },
    ],
  },

  {
    id: "chaos-lord-on-juggernaut",
    name: "Chaos Lord On Juggernaut",
    faction: "chaos-space-marine",
    image: "",
    points: 115,
    canAttachTo: [],
    defaultWargear: [
      { id: "bolt-pistol", name: "Bolt pistol", image: "", profiles: [{ range: '12"', attacks: "1", skill: "3+", strength: "4", ap: "0", damage: "1", keywords: ["PISTOL"] }] },
      { id: "astartes-chainsword", name: "Astartes chainsword", image: "", profiles: [{ range: "Melee", attacks: "5", skill: "3+", strength: "4", ap: "0", damage: "1" }] },
      { id: "bladed-horn", name: "Bladed horn", image: "", profiles: [{ range: "Melee", attacks: "4", skill: "4+", strength: "7", ap: "-1", damage: "2" }] },
      { id: "close-combat-weapon", name: "Close combat weapon", image: "", profiles: [{ range: "Melee", attacks: "3", skill: "3+", strength: "4", ap: "0", damage: "1" }] },
    ],
    wargear: [
      { id: "combi-bolter", name: "Combi-bolter", image: "", profiles: [{ range: '24"', attacks: "4", skill: "3+", strength: "4", ap: "0", damage: "1", keywords: ["RAPID FIRE 2"] }] },
      { id: "combi-weapon", name: "Combi-weapon", image: "", profiles: [{ range: '24"', attacks: "2", skill: "3+", strength: "4", ap: "0", damage: "1", keywords: ["RAPID FIRE 1"] }] },
      { id: "plasma-pistol", name: "Plasma pistol", image: "", profiles: [{ profileName: "standard", range: '12"', attacks: "1", skill: "3+", strength: "7", ap: "-2", damage: "1", keywords: ["PISTOL"] }, { profileName: "supercharge", range: '12"', attacks: "1", skill: "3+", strength: "8", ap: "-3", damage: "2", keywords: ["PISTOL", "HAZARDOUS"] }] },
      { id: "accursed-weapon", name: "Accursed weapon", image: "", profiles: [{ range: "Melee", attacks: "5", skill: "3+", strength: "4", ap: "-2", damage: "1" }] },
      { id: "paired-accursed-weapons", name: "Paired accursed weapons", image: "", profiles: [{ range: "Melee", attacks: "7", skill: "3+", strength: "4", ap: "-2", damage: "1" }] },
      { id: "power-fist", name: "Power fist", image: "", profiles: [{ range: "Melee", attacks: "3", skill: "3+", strength: "8", ap: "-2", damage: "2" }] },
    ],
  },

  {
    id: "chaos-lord-on-palanquin-of-nurgle",
    name: "Chaos Lord On Palanquin Of Nurgle",
    faction: "chaos-space-marine",
    image: "",
    points: 90,
    canAttachTo: [],
    defaultWargear: [
      { id: "bolt-pistol", name: "Bolt pistol", image: "", profiles: [{ range: '12"', attacks: "1", skill: "3+", strength: "4", ap: "0", damage: "1", keywords: ["PISTOL"] }] },
      { id: "astartes-chainsword", name: "Astartes chainsword", image: "", profiles: [{ range: "Melee", attacks: "5", skill: "3+", strength: "4", ap: "0", damage: "1" }] },
      { id: "close-combat-weapon", name: "Close combat weapon", image: "", profiles: [{ range: "Melee", attacks: "3", skill: "3+", strength: "4", ap: "0", damage: "1" }] },
      { id: "nurgling-s-claws-and-teeth", name: "Nurgling's claws and teeth", image: "", profiles: [{ range: "Melee", attacks: "5", skill: "5+", strength: "2", ap: "0", damage: "1" }] },
    ],
    wargear: [
      { id: "combi-bolter", name: "Combi-bolter", image: "", profiles: [{ range: '24"', attacks: "4", skill: "3+", strength: "4", ap: "0", damage: "1", keywords: ["RAPID FIRE 2"] }] },
      { id: "combi-weapon", name: "Combi-weapon", image: "", profiles: [{ range: '24"', attacks: "2", skill: "3+", strength: "4", ap: "0", damage: "1", keywords: ["RAPID FIRE 1"] }] },
      { id: "plasma-pistol", name: "Plasma pistol", image: "", profiles: [{ profileName: "standard", range: '12"', attacks: "1", skill: "3+", strength: "7", ap: "-2", damage: "1", keywords: ["PISTOL"] }, { profileName: "supercharge", range: '12"', attacks: "1", skill: "3+", strength: "8", ap: "-3", damage: "2", keywords: ["PISTOL", "HAZARDOUS"] }] },
      { id: "accursed-weapon", name: "Accursed weapon", image: "", profiles: [{ range: "Melee", attacks: "5", skill: "3+", strength: "4", ap: "-2", damage: "1" }] },
      { id: "paired-accursed-weapons", name: "Paired accursed weapons", image: "", profiles: [{ range: "Melee", attacks: "7", skill: "3+", strength: "4", ap: "-2", damage: "1" }] },
      { id: "power-fist", name: "Power fist", image: "", profiles: [{ range: "Melee", attacks: "3", skill: "3+", strength: "8", ap: "-2", damage: "2" }] },
    ],
  },

  {
    id: "chaos-lord-on-steed-of-slaanesh",
    name: "Chaos Lord On Steed Of Slaanesh",
    faction: "chaos-space-marine",
    image: "",
    points: 100,
    canAttachTo: [],
    defaultWargear: [
      { id: "bolt-pistol", name: "Bolt pistol", image: "", profiles: [{ range: '12"', attacks: "1", skill: "3+", strength: "4", ap: "0", damage: "1", keywords: ["PISTOL"] }] },
      { id: "astartes-chainsword", name: "Astartes chainsword", image: "", profiles: [{ range: "Melee", attacks: "5", skill: "3+", strength: "4", ap: "0", damage: "1" }] },
      { id: "close-combat-weapon", name: "Close combat weapon", image: "", profiles: [{ range: "Melee", attacks: "3", skill: "3+", strength: "4", ap: "0", damage: "1" }] },
      { id: "lashing-tongue", name: "Lashing tongue", image: "", profiles: [{ range: "Melee", attacks: "3", skill: "3+", strength: "4", ap: "0", damage: "1" }] },
    ],
    wargear: [
      { id: "combi-bolter", name: "Combi-bolter", image: "", profiles: [{ range: '24"', attacks: "4", skill: "3+", strength: "4", ap: "0", damage: "1", keywords: ["RAPID FIRE 2"] }] },
      { id: "combi-weapon", name: "Combi-weapon", image: "", profiles: [{ range: '24"', attacks: "2", skill: "3+", strength: "4", ap: "0", damage: "1", keywords: ["RAPID FIRE 1"] }] },
      { id: "plasma-pistol", name: "Plasma pistol", image: "", profiles: [{ profileName: "standard", range: '12"', attacks: "1", skill: "3+", strength: "7", ap: "-2", damage: "1", keywords: ["PISTOL"] }, { profileName: "supercharge", range: '12"', attacks: "1", skill: "3+", strength: "8", ap: "-3", damage: "2", keywords: ["PISTOL", "HAZARDOUS"] }] },
      { id: "accursed-weapon", name: "Accursed weapon", image: "", profiles: [{ range: "Melee", attacks: "5", skill: "3+", strength: "4", ap: "-2", damage: "1" }] },
      { id: "paired-accursed-weapons", name: "Paired accursed weapons", image: "", profiles: [{ range: "Melee", attacks: "7", skill: "3+", strength: "4", ap: "-2", damage: "1" }] },
      { id: "power-fist", name: "Power fist", image: "", profiles: [{ range: "Melee", attacks: "3", skill: "3+", strength: "8", ap: "-2", damage: "2" }] },
    ],
  },

  {
    id: "chaos-lord-with-jump-pack",
    name: "Chaos Lord With Jump Pack",
    faction: "chaos-space-marine",
    image: "",
    points: 90,
    canAttachTo: [],
    defaultWargear: [
      { id: "bolt-pistol", name: "Bolt pistol", image: "", profiles: [{ range: '12"', attacks: "1", skill: "3+", strength: "4", ap: "0", damage: "1", keywords: ["PISTOL"] }] },
      { id: "accursed-weapon", name: "Accursed weapon", image: "", profiles: [{ range: "Melee", attacks: "5", skill: "3+", strength: "4", ap: "-2", damage: "1" }] },
    ],
    wargear: [
      { id: "plasma-pistol", name: "Plasma pistol", image: "", profiles: [{ profileName: "standard", range: '12"', attacks: "1", skill: "3+", strength: "7", ap: "-2", damage: "1", keywords: ["PISTOL"] }, { profileName: "supercharge", range: '12"', attacks: "1", skill: "3+", strength: "8", ap: "-3", damage: "2", keywords: ["PISTOL", "HAZARDOUS"] }] },
      { id: "power-fist", name: "Power fist", image: "", profiles: [{ range: "Melee", attacks: "3", skill: "3+", strength: "8", ap: "-2", damage: "2" }] },
      { id: "twin-lightning-claws", name: "Twin lightning claws", image: "", profiles: [{ range: "Melee", attacks: "6", skill: "3+", strength: "5", ap: "-2", damage: "1", keywords: ["TWIN-LINKED"] }] },
    ],
  },

  {
    id: "cultist-firebrand",
    name: "Cultist Firebrand",
    faction: "chaos-space-marine",
    image: "",
    points: 45,
    canAttachTo: [],
    defaultWargear: [
      { id: "balefire-pike", name: "Balefire pike", image: "", profiles: [{ range: '12"', attacks: "D6", skill: "N/A", strength: "4", ap: "-1", damage: "1", keywords: ["IGNORES COVER", "TORRENT"] }] },
      { id: "close-combat-weapon", name: "Close combat weapon", image: "", profiles: [{ range: "Melee", attacks: "3", skill: "3+", strength: "4", ap: "0", damage: "1" }] },
    ],
    wargear: [],
  },

  {
    id: "cypher",
    name: "Cypher",
    faction: "chaos-space-marine",
    image: "",
    points: 90,
    canAttachTo: [],
    defaultWargear: [
      { id: "cypher-s-bolt-pistol", name: "Cypher's bolt pistol", image: "", profiles: [{ range: '12"', attacks: "4", skill: "2+", strength: "4", ap: "0", damage: "1", keywords: ["PISTOL"] }] },
      { id: "cypher-s-plasma-pistol", name: "Cypher's plasma pistol", image: "", profiles: [{ profileName: "standard", range: '12"', attacks: "2", skill: "2+", strength: "7", ap: "-2", damage: "1", keywords: ["PISTOL"] }, { profileName: "supercharge", range: '12"', attacks: "2", skill: "2+", strength: "8", ap: "-3", damage: "2", keywords: ["PISTOL", "HAZARDOUS"] }] },
    ],
    wargear: [],
  },

  {
    id: "exalted-champion",
    name: "Exalted Champion",
    faction: "chaos-space-marine",
    image: "",
    points: 70,
    canAttachTo: [],
    defaultWargear: [
      { id: "bolt-pistol", name: "Bolt pistol", image: "", profiles: [{ range: '12"', attacks: "1", skill: "3+", strength: "4", ap: "0", damage: "1", keywords: ["PISTOL"] }] },
      { id: "combi-weapon", name: "Combi-weapon", image: "", profiles: [{ range: '24"', attacks: "2", skill: "3+", strength: "4", ap: "0", damage: "1", keywords: ["RAPID FIRE 1"] }] },
      { id: "exalted-weapon", name: "Exalted weapon", image: "", profiles: [{ range: "Melee", attacks: "5", skill: "2+", strength: "6", ap: "-2", damage: "2" }] },
    ],
    wargear: [],
  },

  {
    id: "haarken-worldclaimer",
    name: "Haarken Worldclaimer",
    faction: "chaos-space-marine",
    image: "",
    points: 90,
    canAttachTo: ["raptor-squad"],
    defaultWargear: [
      { id: "helspear", name: "Helspear", image: "", profiles: [{ profileName: "shooting", range: '12"', attacks: "1", skill: "2+", strength: "8", ap: "-3", damage: "3",keywords: ["ASSAULT", "SUSTAINED HITS D3"] }, { profileName: "melee", range: "Melee", attacks: "1", skill: "2+", strength: "8", ap: "-3", damage: "3",keywords: ["EXTRA ATTACKS","LANCE","SUSTAINED HITS D3"] }] },
      { id: "herald-s-talon", name: "Herald's Talon", image: "", profiles: [{ range: "Melee", attacks: "6", skill: "2+", strength: "5", ap: "-2", damage: "2", keywords: ["PRECISION"] }] },
    ],
    abilities: [
      {
        name: "Head Taker",
        description: "While this model is leading a unit, each time this model's unit ends a Charge move, select one enemy unit within Engagement Range of this model's unit and roll one D6 for each model in this models unit that is within Engagement Range of that enemy unit: for each 4+, that enemy unit suffers 1 mortal wound."
      },
      {
        name: "Herald of the Apocalypse (Aura) ",
        description: "While an enemy unit is within 6 of this model, in the Battle-shock step of your opponents Command phase, if that enemy unit is below its Starting Strength, it must take a Battle-shock test. This ability cannot cause a unit to take two Battle-shock tests in the same phase."
      }
    ],
    wargear: [],
  },

  {
    id: "heretic-astartes-daemon-prince",
    name: "Heretic Astartes Daemon Prince",
    faction: "chaos-space-marine",
    image: "",
    points: 165,
    canAttachTo: [],
    abilities: [
      {
        name: "Dark Blessing (Aura)",
        description: "While a friendly HERETIC ASTARTES INFANTRY unit is within 6\" of this model, each time a ranged attack is allocated to a model in that unit, that model has the Benefit of Cover against that attack.",
      },
      {
        name: "Ascended Daemon",
        description: "Each time this model shoots or fights, while resolving those attacks, you can re-roll one Hit roll and you can re-roll one Wound roll.",
      },
      {
        name: "Lord of Chaos",
        description: "While this model is within 3\" of one or more friendly HERETIC ASTARTES INFANTRY units, this model has the Lone Operative ability.",
      },
      {
        name: "Daemonic Allegiance",
        description: "When you select this model to include in your army, you must select one of the keywords below. Until the end of the battle, this model has that keyword and the characteristic modifier stated for that keyword below.\n\nKhorne: Add 2 to the Strength characteristic of this model's hellforged weapons.\nTzeentch: Add 3 to the Attacks characteristic of its infernal cannon.\nNurgle: Add 1 to its Toughness characteristic.\nSlaanesh: Add 2\" to its Move characteristic.",
      },
    ],
    defaultWargear: [
      { id: "dp-infernal-cannon", name: "Infernal cannon", image: "", profiles: [{ range: '24"', attacks: "3", skill: "2+", strength: "5", ap: "-1", damage: "2" }] },
      { id: "dp-hellforged-weapons", name: "► Hellforged weapons", image: "", profiles: [{ profileName: "strike", range: "Melee", attacks: "6", skill: "2+", strength: "8", ap: "-2", damage: "3" }, { profileName: "sweep", range: "Melee", attacks: "14", skill: "2+", strength: "6", ap: "0", damage: "1" }] },
    ],
    wargear: [],
  },

  {
    id: "heretic-astartes-daemon-prince-with-wings",
    name: "Heretic Astartes Daemon Prince With Wings",
    faction: "chaos-space-marine",
    image: "",
    points: 180,
    canAttachTo: [],
    abilities: [
      {
        name: "Daemonic Destruction",
        description: "Each time this model ends a Charge move, select one enemy unit within Engagement Range of it and roll one D6 for each of this model's remaining wounds: for each 4+, that enemy unit suffers 1 mortal wound (to a maximum of 6 mortal wounds).",
      },
      {
        name: "Flying Horror",
        description: "Each time this model ends a Normal or Advance move, select one enemy unit it moved over during that move. That unit must take a Battle-shock test.",
      },
      {
        name: "Daemonic Allegiance",
        description: "When you select this model to include in your army, you must select one of the keywords below. Until the end of the battle, this model has that keyword and the characteristic modifier stated for that keyword below.\n\nKhorne: Add 2 to the Strength characteristic of this model's hellforged weapons.\nTzeentch: Add 3 to the Attacks characteristic of its infernal cannon.\nNurgle: Add 1 to its Toughness characteristic.\nSlaanesh: Add 2\" to its Move characteristic.",
      },
    ],
    defaultWargear: [
      { id: "dpw-infernal-cannon", name: "Infernal cannon", image: "", profiles: [{ range: '24"', attacks: "3", skill: "2+", strength: "5", ap: "-1", damage: "2" }] },
      { id: "dpw-hellforged-weapons", name: "► Hellforged weapons", image: "", profiles: [{ profileName: "strike", range: "Melee", attacks: "6", skill: "2+", strength: "8", ap: "-2", damage: "3" }, { profileName: "sweep", range: "Melee", attacks: "14", skill: "2+", strength: "6", ap: "0", damage: "1" }] },
    ],
    wargear: [],
  },

  {
    id: "huron-blackheart",
    name: "Huron Blackheart",
    faction: "chaos-space-marine",
    image: "",
    points: 80,
    canAttachTo: [],
    defaultWargear: [
      { id: "tyrant-s-claw", name: "Tyrant's Claw", image: "", profiles: [{ profileName: "shooting", range: '12"', attacks: "D6", skill: "N/A", strength: "4", ap: "-1", damage: "1", keywords: ["IGNORES COVER", "TORRENT"] }, { profileName: "melee", range: "Melee", attacks: "4", skill: "2+", strength: "8", ap: "-3", damage: "3" }] },
      { id: "exalted-weapon", name: "Exalted weapon", image: "", profiles: [{ range: "Melee", attacks: "5", skill: "2+", strength: "6", ap: "-2", damage: "2" }] },
    ],
    wargear: [],
  },

  {
    id: "lord-discordant-on-helstalker",
    name: "Lord Discordant On Helstalker",
    faction: "chaos-space-marine",
    image: "",
    points: 160,
    canAttachTo: [],
    abilities: [
      {
        name: "Corrupt Machine Spirits",
        description: "At the start of your Shooting phase, select one visible enemy VEHICLE unit within 12\" of this model and roll one D6: on a 2-3, that enemy unit suffers D3 mortal wounds; on a 4-5, that enemy unit suffers 3 mortal wounds; on a 6, that enemy unit suffers D3+3 mortal wounds.",
      },
      {
        name: "Spirit Thief",
        description: "At the start of your Shooting phase, select one visible enemy VEHICLE unit. Until the end of the phase, each time a friendly HERETIC ASTARTES model makes an attack that targets that unit, re-roll a Wound roll of 1.",
      },
    ],
    defaultWargear: [
      { id: "ld-bolt-pistol", name: "Bolt pistol", image: "", profiles: [{ range: '12"', attacks: "1", skill: "2+", strength: "4", ap: "0", damage: "1", keywords: ["PISTOL"] }] },
      { id: "ld-bladed-limbs", name: "Bladed limbs", image: "", profiles: [{ range: "Melee", attacks: "4", skill: "3+", strength: "6", ap: "-1", damage: "2", keywords: ["EXTRA ATTACKS"] }] },
      { id: "ld-impaler-chainglaive", name: "Impaler chainglaive", image: "", profiles: [{ range: "Melee", attacks: "5", skill: "2+", strength: "8", ap: "-3", damage: "3", keywords: ["LANCE"] }] },
    ],
    wargear: [
      { id: "ld-helstalker-autocannon", name: "Helstalker autocannon", image: "", wargearGroup: "ld-ranged-slot", profiles: [{ range: '48"', attacks: "3", skill: "2+", strength: "9", ap: "-1", damage: "3" }] },
      { id: "ld-baleflamer", name: "Baleflamer", image: "", wargearGroup: "ld-ranged-slot", profiles: [{ range: '12"', attacks: "D6+3", skill: "N/A", strength: "6", ap: "-1", damage: "2", keywords: ["IGNORES COVER", "TORRENT"] }] },
      { id: "ld-techno-virus-injector", name: "Techno-virus injector", image: "", wargearGroup: "ld-melee-slot", profiles: [{ range: "Melee", attacks: "1", skill: "3+", strength: "3", ap: "-3", damage: "2", keywords: ["ANTI-VEHICLE 2+", "EXTRA ATTACKS"] }] },
      { id: "ld-magma-cutter", name: "Magma cutter", image: "", wargearGroup: "ld-melee-slot", profiles: [{ range: '6"', attacks: "2", skill: "3+", strength: "9", ap: "-4", damage: "D6", keywords: ["MELTA 2"] }] },
    ],
  },

  {
    id: "lucius-the-eternal",
    name: "Lucius The Eternal",
    faction: "chaos-space-marine",
    image: "",
    points: 95,
    canAttachTo: [],
    defaultWargear: [
      { id: "doom-siren", name: "Doom siren", image: "", profiles: [{ range: '12"', attacks: "D6", skill: "N/A", strength: "6", ap: "-2", damage: "1", keywords: ["IGNORES COVER", "TORRENT"] }] },
      { id: "duellist-s-sword-and-lash-of-torment", name: "Duellist's sword and Lash of Torment", image: "", profiles: [{ profileName: "sword", range: "Melee", attacks: "5", skill: "2+", strength: "5", ap: "-3", damage: "2" }, { profileName: "lash", range: "Melee", attacks: "5", skill: "2+", strength: "4", ap: "-1", damage: "1", keywords: ["SUSTAINED HITS 1"] }] },
    ],
    wargear: [],
  },

  {
    id: "master-of-executions",
    name: "Master Of Executions",
    faction: "chaos-space-marine",
    image: "",
    points: 80,
    canAttachTo: [],
    defaultWargear: [
      { id: "bolt-pistol", name: "Bolt pistol", image: "", profiles: [{ range: '12"', attacks: "1", skill: "3+", strength: "4", ap: "0", damage: "1", keywords: ["PISTOL"] }] },
      { id: "axe-of-dismemberment", name: "Axe of dismemberment", image: "", profiles: [{ range: "Melee", attacks: "4", skill: "2+", strength: "8", ap: "-3", damage: "2", keywords: ["DEVASTATING WOUNDS"] }] },
    ],
    wargear: [],
  },

  {
    id: "master-of-possession",
    name: "Master Of Possession",
    faction: "chaos-space-marine",
    image: "/Warhammerimages/ChaosSpaceMarine/Master of Possession.png",
    points: 60,
    canAttachTo: ["chosen", "legionaries", "nemesis-claw", "possessed", "red-corsairs-raiders"],
    abilities: [
      {
        name: "Daemonkin (Psychic)",
        description: "While this model is leading a unit, add 1 to Advance and Charge rolls made for that unit.",
      },
      {
        name: "Sacrificial Dagger",
        description: "Once per phase, when this model is selected to shoot or fight, it can use this ability. If it does, this model's unit suffers 1 mortal wound and, until the end of the phase, each time this model makes a Psychic Attack, add 1 to the Hit roll and add 1 to the Wound roll.",
      },
    ],
    defaultWargear: [
      { id: "mop-bolt-pistol", name: "Bolt pistol", image: "", profiles: [{ range: '12"', attacks: "1", skill: "3+", strength: "4", ap: "0", damage: "1", keywords: ["PISTOL"] }] },
      { id: "mop-rite-of-possession", name: "► Rite of Possession", image: "", profiles: [{ profileName: "witchfire", range: '18"', attacks: "2", skill: "3+", strength: "4", ap: "-3", damage: "2", keywords: ["ANTI-PSYKER 2+", "PISTOL", "PRECISION", "PSYCHIC"] }, { profileName: "focused witchfire", range: '18"', attacks: "2", skill: "3+", strength: "6", ap: "-3", damage: "3", keywords: ["ANTI-PSYKER 2+", "HAZARDOUS", "PISTOL", "PRECISION", "PSYCHIC"] }] },
      { id: "mop-staff-of-possession", name: "Staff of possession", image: "", profiles: [{ range: "Melee", attacks: "4", skill: "3+", strength: "6", ap: "-1", damage: "D3", keywords: ["ANTI-PSYKER 2+", "PSYCHIC"] }] },
    ],
    wargear: [],
  },

  {
    id: "renegade-enforcer",
    name: "Renegade Enforcer",
    faction: "chaos-space-marine",
    image: "",
    points: 65,
    canAttachTo: [],
    defaultWargear: [
      { id: "enforcer-pistol", name: "Enforcer pistol", image: "", profiles: [{ range: '12"', attacks: "1", skill: "3+", strength: "4", ap: "0", damage: "1", keywords: ["PISTOL"] }] },
      { id: "enforcer-melee-weapon", name: "Enforcer melee weapon", image: "", profiles: [{ range: "Melee", attacks: "4", skill: "3+", strength: "4", ap: "0", damage: "1" }] },
    ],
    wargear: [
      { id: "autogun", name: "Autogun", image: "", profiles: [{ range: '24"', attacks: "2", skill: "4+", strength: "3", ap: "0", damage: "1", keywords: ["RAPID FIRE 1"] }] },
      { id: "lasgun", name: "Lasgun", image: "", profiles: [{ range: '24"', attacks: "2", skill: "3+", strength: "3", ap: "0", damage: "1", keywords: ["RAPID FIRE 1"] }] },
      { id: "shotgun", name: "Shotgun", image: "", profiles: [{ range: '12"', attacks: "2", skill: "3+", strength: "4", ap: "0", damage: "1" }] },
      { id: "power-fist", name: "Power fist", image: "", profiles: [{ range: "Melee", attacks: "3", skill: "3+", strength: "8", ap: "-2", damage: "2" }] },
      { id: "power-weapon", name: "Power weapon", image: "", profiles: [{ range: "Melee", attacks: "4", skill: "3+", strength: "5", ap: "-2", damage: "1" }] },
    ],
  },

  {
    id: "rogue-psyker",
    name: "Rogue Psyker",
    faction: "chaos-space-marine",
    image: "",
    points: 60,
    canAttachTo: [],
    defaultWargear: [
      { id: "laspistol", name: "Laspistol", image: "", profiles: [{ range: '12"', attacks: "1", skill: "3+", strength: "3", ap: "0", damage: "1", keywords: ["PISTOL"] }] },
      { id: "psychic-strike-focused-witchfire", name: "Psychic Strike – focused witchfire", image: "", profiles: [{ range: '18"', attacks: "D6", skill: "3+", strength: "5", ap: "-1", damage: "D3", keywords: ["PSYCHIC"] }] },
      { id: "psychic-strike-witchfire", name: "Psychic Strike – witchfire", image: "", profiles: [{ range: '18"', attacks: "D3", skill: "3+", strength: "5", ap: "-1", damage: "D3", keywords: ["PSYCHIC"] }] },
      { id: "chaos-stave", name: "Chaos stave", image: "", profiles: [{ range: "Melee", attacks: "3", skill: "3+", strength: "5", ap: "-1", damage: "2" }] },
    ],
    wargear: [],
  },

  {
    id: "sorcerer",
    name: "Sorcerer",
    faction: "chaos-space-marine",
    image: "",
    points: 60,
    canAttachTo: [],
    defaultWargear: [
      { id: "bolt-pistol", name: "Bolt pistol", image: "", profiles: [{ range: '12"', attacks: "1", skill: "3+", strength: "4", ap: "0", damage: "1", keywords: ["PISTOL"] }] },
      { id: "infernal-gaze-witchfire", name: "Infernal Gaze – witchfire", image: "", profiles: [{ range: '18"', attacks: "3", skill: "3+", strength: "5", ap: "-1", damage: "D3", keywords: ["PSYCHIC"] }] },
      { id: "infernal-gaze-focused-witchfire", name: "Infernal Gaze – focused witchfire", image: "", profiles: [{ range: '18"', attacks: "D6", skill: "3+", strength: "5", ap: "-1", damage: "D3", keywords: ["PSYCHIC"] }] },
      { id: "force-weapon", name: "Force weapon", image: "", profiles: [{ range: "Melee", attacks: "3", skill: "3+", strength: "6", ap: "-1", damage: "D3", keywords: ["PSYCHIC"] }] },
    ],
    wargear: [],
  },

  {
    id: "sorcerer-in-terminator-armour",
    name: "Sorcerer In Terminator Armour",
    faction: "chaos-space-marine",
    image: "",
    points: 80,
    canAttachTo: [],
    defaultWargear: [
      { id: "combi-bolter", name: "Combi-bolter", image: "", profiles: [{ range: '24"', attacks: "4", skill: "3+", strength: "4", ap: "0", damage: "1", keywords: ["RAPID FIRE 2"] }] },
      { id: "infernal-gaze-witchfire", name: "Infernal Gaze – witchfire", image: "", profiles: [{ range: '18"', attacks: "3", skill: "3+", strength: "5", ap: "-1", damage: "D3", keywords: ["PSYCHIC"] }] },
      { id: "infernal-gaze-focused-witchfire", name: "Infernal Gaze – focused witchfire", image: "", profiles: [{ range: '18"', attacks: "D6", skill: "3+", strength: "5", ap: "-1", damage: "D3", keywords: ["PSYCHIC"] }] },
      { id: "force-weapon", name: "Force weapon", image: "", profiles: [{ range: "Melee", attacks: "3", skill: "3+", strength: "6", ap: "-1", damage: "D3", keywords: ["PSYCHIC"] }] },
    ],
    wargear: [
      { id: "combi-weapon", name: "Combi-weapon", image: "", profiles: [{ range: '24"', attacks: "2", skill: "3+", strength: "4", ap: "0", damage: "1", keywords: ["RAPID FIRE 1"] }] },
    ],
  },

  {
    id: "sorcerer-on-bike",
    name: "Sorcerer On Bike",
    faction: "chaos-space-marine",
    image: "",
    points: 75,
    canAttachTo: [],
    defaultWargear: [
      { id: "bolt-pistol", name: "Bolt pistol", image: "", profiles: [{ range: '12"', attacks: "1", skill: "3+", strength: "4", ap: "0", damage: "1", keywords: ["PISTOL"] }] },
      { id: "combi-bolter", name: "Combi-bolter", image: "", profiles: [{ range: '24"', attacks: "4", skill: "3+", strength: "4", ap: "0", damage: "1", keywords: ["RAPID FIRE 2"] }] },
      { id: "infernal-gaze-focused-witchfire", name: "Infernal Gaze – focused witchfire", image: "", profiles: [{ range: '18"', attacks: "D6", skill: "3+", strength: "5", ap: "-1", damage: "D3", keywords: ["PSYCHIC"] }] },
      { id: "infernal-gaze-witchfire", name: "Infernal Gaze – witchfire", image: "", profiles: [{ range: '18"', attacks: "3", skill: "3+", strength: "5", ap: "-1", damage: "D3", keywords: ["PSYCHIC"] }] },
      { id: "force-weapon", name: "Force weapon", image: "", profiles: [{ range: "Melee", attacks: "3", skill: "3+", strength: "6", ap: "-1", damage: "D3", keywords: ["PSYCHIC"] }] },
    ],
    wargear: [
      { id: "combi-weapon", name: "Combi-weapon", image: "", profiles: [{ range: '24"', attacks: "2", skill: "3+", strength: "4", ap: "0", damage: "1", keywords: ["RAPID FIRE 1"] }] },
      { id: "plasma-pistol", name: "Plasma pistol", image: "", profiles: [{ profileName: "standard", range: '12"', attacks: "1", skill: "3+", strength: "7", ap: "-2", damage: "1", keywords: ["PISTOL"] }, { profileName: "supercharge", range: '12"', attacks: "1", skill: "3+", strength: "8", ap: "-3", damage: "2", keywords: ["PISTOL", "HAZARDOUS"] }] },
      { id: "accursed-weapon", name: "Accursed weapon", image: "", profiles: [{ range: "Melee", attacks: "5", skill: "3+", strength: "4", ap: "-2", damage: "1" }] },
      { id: "astartes-chainsword", name: "Astartes chainsword", image: "", profiles: [{ range: "Melee", attacks: "5", skill: "3+", strength: "4", ap: "0", damage: "1" }] },
      { id: "power-fist", name: "Power fist", image: "", profiles: [{ range: "Melee", attacks: "3", skill: "3+", strength: "8", ap: "-2", damage: "2" }] },
    ],
  },

  {
    id: "sorcerer-on-disc-of-tzeentch",
    name: "Sorcerer On Disc Of Tzeentch",
    faction: "chaos-space-marine",
    image: "",
    points: 80,
    canAttachTo: [],
    defaultWargear: [
      { id: "bolt-pistol", name: "Bolt pistol", image: "", profiles: [{ range: '12"', attacks: "1", skill: "3+", strength: "4", ap: "0", damage: "1", keywords: ["PISTOL"] }] },
      { id: "infernal-gaze-focused-witchfire", name: "Infernal Gaze – focused witchfire", image: "", profiles: [{ range: '18"', attacks: "D6", skill: "3+", strength: "5", ap: "-1", damage: "D3", keywords: ["PSYCHIC"] }] },
      { id: "infernal-gaze-witchfire", name: "Infernal Gaze – witchfire", image: "", profiles: [{ range: '18"', attacks: "3", skill: "3+", strength: "5", ap: "-1", damage: "D3", keywords: ["PSYCHIC"] }] },
      { id: "force-weapon", name: "Force weapon", image: "", profiles: [{ range: "Melee", attacks: "3", skill: "3+", strength: "6", ap: "-1", damage: "D3", keywords: ["PSYCHIC"] }] },
    ],
    wargear: [
      { id: "combi-bolter", name: "Combi-bolter", image: "", profiles: [{ range: '24"', attacks: "4", skill: "3+", strength: "4", ap: "0", damage: "1", keywords: ["RAPID FIRE 2"] }] },
      { id: "combi-weapon", name: "Combi-weapon", image: "", profiles: [{ range: '24"', attacks: "2", skill: "3+", strength: "4", ap: "0", damage: "1", keywords: ["RAPID FIRE 1"] }] },
      { id: "plasma-pistol", name: "Plasma pistol", image: "", profiles: [{ profileName: "standard", range: '12"', attacks: "1", skill: "3+", strength: "7", ap: "-2", damage: "1", keywords: ["PISTOL"] }, { profileName: "supercharge", range: '12"', attacks: "1", skill: "3+", strength: "8", ap: "-3", damage: "2", keywords: ["PISTOL", "HAZARDOUS"] }] },
      { id: "accursed-weapon", name: "Accursed weapon", image: "", profiles: [{ range: "Melee", attacks: "5", skill: "3+", strength: "4", ap: "-2", damage: "1" }] },
      { id: "astartes-chainsword", name: "Astartes chainsword", image: "", profiles: [{ range: "Melee", attacks: "5", skill: "3+", strength: "4", ap: "0", damage: "1" }] },
      { id: "power-fist", name: "Power fist", image: "", profiles: [{ range: "Melee", attacks: "3", skill: "3+", strength: "8", ap: "-2", damage: "2" }] },
    ],
  },

  {
    id: "sorcerer-on-palanquin-of-nurgle",
    name: "Sorcerer On Palanquin Of Nurgle",
    faction: "chaos-space-marine",
    image: "",
    points: 80,
    canAttachTo: [],
    defaultWargear: [
      { id: "bolt-pistol", name: "Bolt pistol", image: "", profiles: [{ range: '12"', attacks: "1", skill: "3+", strength: "4", ap: "0", damage: "1", keywords: ["PISTOL"] }] },
      { id: "infernal-gaze-focused-witchfire", name: "Infernal Gaze – focused witchfire", image: "", profiles: [{ range: '18"', attacks: "D6", skill: "3+", strength: "5", ap: "-1", damage: "D3", keywords: ["PSYCHIC"] }] },
      { id: "infernal-gaze-witchfire", name: "Infernal Gaze – witchfire", image: "", profiles: [{ range: '18"', attacks: "3", skill: "3+", strength: "5", ap: "-1", damage: "D3", keywords: ["PSYCHIC"] }] },
      { id: "force-weapon", name: "Force weapon", image: "", profiles: [{ range: "Melee", attacks: "3", skill: "3+", strength: "6", ap: "-1", damage: "D3", keywords: ["PSYCHIC"] }] },
      { id: "nurgling-s-claws-and-teeth", name: "Nurgling's claws and teeth", image: "", profiles: [{ range: "Melee", attacks: "5", skill: "5+", strength: "2", ap: "0", damage: "1" }] },
    ],
    wargear: [
      { id: "combi-bolter", name: "Combi-bolter", image: "", profiles: [{ range: '24"', attacks: "4", skill: "3+", strength: "4", ap: "0", damage: "1", keywords: ["RAPID FIRE 2"] }] },
      { id: "combi-weapon", name: "Combi-weapon", image: "", profiles: [{ range: '24"', attacks: "2", skill: "3+", strength: "4", ap: "0", damage: "1", keywords: ["RAPID FIRE 1"] }] },
      { id: "plasma-pistol", name: "Plasma pistol", image: "", profiles: [{ profileName: "standard", range: '12"', attacks: "1", skill: "3+", strength: "7", ap: "-2", damage: "1", keywords: ["PISTOL"] }, { profileName: "supercharge", range: '12"', attacks: "1", skill: "3+", strength: "8", ap: "-3", damage: "2", keywords: ["PISTOL", "HAZARDOUS"] }] },
      { id: "accursed-weapon", name: "Accursed weapon", image: "", profiles: [{ range: "Melee", attacks: "5", skill: "3+", strength: "4", ap: "-2", damage: "1" }] },
      { id: "astartes-chainsword", name: "Astartes chainsword", image: "", profiles: [{ range: "Melee", attacks: "5", skill: "3+", strength: "4", ap: "0", damage: "1" }] },
      { id: "power-fist", name: "Power fist", image: "", profiles: [{ range: "Melee", attacks: "3", skill: "3+", strength: "8", ap: "-2", damage: "2" }] },
    ],
  },

  {
    id: "sorcerer-on-steed-of-slaanesh",
    name: "Sorcerer On Steed Of Slaanesh",
    faction: "chaos-space-marine",
    image: "",
    points: 85,
    canAttachTo: [],
    defaultWargear: [
      { id: "bolt-pistol", name: "Bolt pistol", image: "", profiles: [{ range: '12"', attacks: "1", skill: "3+", strength: "4", ap: "0", damage: "1", keywords: ["PISTOL"] }] },
      { id: "infernal-gaze-focused-witchfire", name: "Infernal Gaze – focused witchfire", image: "", profiles: [{ range: '18"', attacks: "D6", skill: "3+", strength: "5", ap: "-1", damage: "D3", keywords: ["PSYCHIC"] }] },
      { id: "infernal-gaze-witchfire", name: "Infernal Gaze – witchfire", image: "", profiles: [{ range: '18"', attacks: "3", skill: "3+", strength: "5", ap: "-1", damage: "D3", keywords: ["PSYCHIC"] }] },
      { id: "force-weapon", name: "Force weapon", image: "", profiles: [{ range: "Melee", attacks: "3", skill: "3+", strength: "6", ap: "-1", damage: "D3", keywords: ["PSYCHIC"] }] },
      { id: "lashing-tongue", name: "Lashing tongue", image: "", profiles: [{ range: "Melee", attacks: "3", skill: "3+", strength: "4", ap: "0", damage: "1" }] },
    ],
    wargear: [
      { id: "combi-bolter", name: "Combi-bolter", image: "", profiles: [{ range: '24"', attacks: "4", skill: "3+", strength: "4", ap: "0", damage: "1", keywords: ["RAPID FIRE 2"] }] },
      { id: "combi-weapon", name: "Combi-weapon", image: "", profiles: [{ range: '24"', attacks: "2", skill: "3+", strength: "4", ap: "0", damage: "1", keywords: ["RAPID FIRE 1"] }] },
      { id: "plasma-pistol", name: "Plasma pistol", image: "", profiles: [{ profileName: "standard", range: '12"', attacks: "1", skill: "3+", strength: "7", ap: "-2", damage: "1", keywords: ["PISTOL"] }, { profileName: "supercharge", range: '12"', attacks: "1", skill: "3+", strength: "8", ap: "-3", damage: "2", keywords: ["PISTOL", "HAZARDOUS"] }] },
      { id: "accursed-weapon", name: "Accursed weapon", image: "", profiles: [{ range: "Melee", attacks: "5", skill: "3+", strength: "4", ap: "-2", damage: "1" }] },
      { id: "astartes-chainsword", name: "Astartes chainsword", image: "", profiles: [{ range: "Melee", attacks: "5", skill: "3+", strength: "4", ap: "0", damage: "1" }] },
      { id: "power-fist", name: "Power fist", image: "", profiles: [{ range: "Melee", attacks: "3", skill: "3+", strength: "8", ap: "-2", damage: "2" }] },
    ],
  },

  {
    id: "vashtorr-the-arkifane",
    name: "Vashtorr The Arkifane",
    faction: "chaos-space-marine",
    image: "",
    points: 175,
    canAttachTo: [],
    abilities: [
      {
        name: "Unholy Mechanisms (Aura)",
        description: "While a friendly DAEMON VEHICLE unit is within 6\" of this model, add 2 to the Strength characteristic of weapons equipped by models in that unit.",
      },
      {
        name: "Reorder Reality",
        description: "Each time an enemy unit within 18\" of this model targets this model, subtract 1 from the Hit roll and, until the end of the phase, that enemy unit's ranged weapons have the [HAZARDOUS] ability.",
      },
      {
        name: "Indentured Daemon Engines",
        description: "While this model is within 3\" of one or more friendly DAEMON VEHICLE units, this model has the Lone Operative ability.",
      },
      {
        name: "Damaged: 1-4 Wounds Remaining",
        description: "While this model has 1-4 wounds remaining, each time this model makes an attack, subtract 1 from the Hit roll.",
      },
    ],
    defaultWargear: [
      { id: "vashtorr-s-claw", name: "Vashtorr's claw", image: "", profiles: [{ range: '12"', attacks: "D6", skill: "N/A", strength: "5", ap: "-2", damage: "1", keywords: ["ANTI-VEHICLE 4+", "TORRENT"] }] },
      { id: "vashtorr-s-hammer", name: "► Vashtorr's hammer", image: "", profiles: [{ profileName: "strike", range: "Melee", attacks: "6", skill: "2+", strength: "14", ap: "-3", damage: "3", keywords: ["ANTI-VEHICLE 4+", "DEVASTATING WOUNDS"] }, { profileName: "sweep", range: "Melee", attacks: "12", skill: "2+", strength: "8", ap: "-1", damage: "2", keywords: ["ANTI-VEHICLE 4+", "DEVASTATING WOUNDS"] }] },
    ],
    wargear: [],
  },

  {
    id: "dark-apostle",
    name: "Dark Apostle",
    faction: "chaos-space-marine",
    image: "",
    points: 65,
    canAttachTo: ["chaos-bikers", "cultist-mob", "legionaries", "chosen", "havocs", "raptors"],
    abilities: [
      {
        name: "Dark Zealotry",
        description: "While this unit is leading a unit and contains a DARK APOSTLE model, each time a model in that unit makes a melee attack, add 1 to the Wound roll.",
      },
      {
        name: "Demagogue",
        description: "Once per battle, at the start of any phase, you can select one friendly HERETIC ASTARTES unit that is Battle-shocked and within 12\" of this unit's DARK APOSTLE model. That unit is no longer Battle-shocked.",
      },
      {
        name: "Malign Sacrifice",
        description: "At the start of the Fight phase, if this unit contains one or more Dark Disciple models, you can select one of those models and one enemy unit within Engagement Range of this unit, then roll one D6: on a 2-5, that enemy unit suffers 1 mortal wound; on a 6, that enemy unit suffers D3 mortal wounds. That Dark Disciple model is then destroyed.",
      },
    ],
    defaultWargear: [
      { id: "bolt-pistol", name: "Bolt pistol", image: "", profiles: [{ range: '12"', attacks: "1", skill: "3+", strength: "4", ap: "0", damage: "1", keywords: ["PISTOL"] }] },
      { id: "accursed-crozius", name: "Accursed crozius", image: "", profiles: [{ range: "Melee", attacks: "5", skill: "2+", strength: "6", ap: "-1", damage: "2" }] },
      { id: "close-combat-weapon", name: "Close combat weapon", image: "", profiles: [{ range: "Melee", attacks: "1", skill: "4+", strength: "3", ap: "0", damage: "1" }] },
    ],
    wargear: [],
  },

  {
    id: "warpsmith",
    name: "Warpsmith",
    faction: "chaos-space-marine",
    image: "",
    points: 70,
    canAttachTo: ["chosen", "havocs", "legionaries", "nemesis-claw", "red-corsairs-raiders"],
    abilities: [
      {
        name: "Warpsmith",
        description: "While this model is within 3\" of one or more friendly HERETIC ASTARTES VEHICLE units, this model has the Lone Operative ability.",
      },
      {
        name: "Master of Mechanisms",
        description: "In your Command phase, select one friendly HERETIC ASTARTES VEHICLE model within 3\" of this model. That VEHICLE model regains up to D3 lost wounds and, until the start of your next Command phase, each time that VEHICLE makes an attack, add 1 to the Hit roll. Each model can only be selected for this ability once per Command phase.",
      },
      {
        name: "Enrage Machine Spirits",
        description: "At the end of your Movement phase, select one enemy VEHICLE unit within 12\" of this model. That unit must take a Battle-shock test.",
      },
    ],
    defaultWargear: [
      { id: "ws-flamer-tendril", name: "Flamer tendril", image: "", profiles: [{ range: '12"', attacks: "D6", skill: "N/A", strength: "3", ap: "0", damage: "1", keywords: ["IGNORES COVER", "PISTOL", "TORRENT"] }] },
      { id: "ws-melta-tendril", name: "Melta tendril", image: "", profiles: [{ range: '6"', attacks: "1", skill: "2+", strength: "8", ap: "-4", damage: "D3", keywords: ["MELTA 2", "PISTOL"] }] },
      { id: "ws-plasma-pistol", name: "► Plasma pistol", image: "", profiles: [{ profileName: "standard", range: '12"', attacks: "1", skill: "2+", strength: "7", ap: "-2", damage: "1", keywords: ["PISTOL"] }, { profileName: "supercharge", range: '12"', attacks: "1", skill: "2+", strength: "8", ap: "-3", damage: "2", keywords: ["HAZARDOUS", "PISTOL"] }] },
      { id: "ws-forge-weapon", name: "Forge weapon", image: "", profiles: [{ range: "Melee", attacks: "4", skill: "3+", strength: "6", ap: "-2", damage: "2", keywords: ["ANTI-VEHICLE 4+"] }] },
    ],
    wargear: [],
  },

  {
    id: "fabius-bile",
    name: "Fabius Bile",
    faction: "chaos-space-marine",
    image: "",
    points: 100,
    canAttachTo: ["accursed-cultists", "chosen", "cultist-mob", "legionaries", "red-corsairs-raiders"],
    abilities: [
      {
        name: "Enhanced Warriors",
        description: "If this unit is attached to a unit at the start of the battle, until the end of the battle, add 1 to the Strength characteristic of melee weapons equipped by Bodyguard models in that unit and add 1 to the Toughness characteristic of Bodyguard models in that unit.",
      },
      {
        name: "Surgeon Acolyte",
        description: "Once per turn, when an attack is allocated to a model in this unit, if this unit contains FABIUS BILE, you can change the Damage characteristic of that attack to 0.",
      },
      {
        name: "Chirurgeon",
        description: "The first time this unit's FABIUS BILE model is destroyed, at the end of the phase roll one D6: on a 2+, set it back up on the battlefield, as close as possible to where it was destroyed and not within Engagement Range of any enemy models, with its full wounds remaining. If that model was attached to a unit when it was destroyed, it must be set up attached to that unit.",
      },
    ],
    defaultWargear: [
      { id: "fb-xyclos-needler", name: "Xyclos Needler", image: "", profiles: [{ range: '18"', attacks: "3", skill: "2+", strength: "2", ap: "-1", damage: "2", keywords: ["ANTI-INFANTRY 2+", "PISTOL"] }] },
      { id: "fb-chirurgeon", name: "Chirurgeon", image: "", profiles: [{ range: "Melee", attacks: "2", skill: "2+", strength: "4", ap: "0", damage: "1", keywords: ["EXTRA ATTACKS"] }] },
      { id: "fb-rod-of-torment", name: "Rod of Torment", image: "", profiles: [{ range: "Melee", attacks: "6", skill: "2+", strength: "5", ap: "-1", damage: "3" }] },
      { id: "fb-surgeon-acolyte-tools", name: "Surgeon Acolyte's tools", image: "", profiles: [{ range: "Melee", attacks: "1", skill: "5+", strength: "3", ap: "0", damage: "1" }] },
    ],
    wargear: [],
  },

  {
    id: "dark-commune",
    name: "Dark Commune",
    faction: "chaos-space-marine",
    image: "",
    points: 90,
    canAttachTo: ["accursed-cultists", "cultist-mob"],
    abilities: [
      {
        name: "Faithful Flock",
        description: "While this unit is leading a unit and contains a CULT DEMAGOGUE model, models in that unit have a 5+ invulnerable save.",
      },
      {
        name: "Dark Ritual",
        description: "Once per battle, in your Command phase, if this unit contains a CULT DEMAGOGUE model, it can use this ability. If it does, until the end of the turn, this unit can declare a charge in a turn in which it Advanced and each time a model in this unit makes an attack, add 1 to the Hit roll and add 1 to the Wound roll.",
      },
      {
        name: "Chaos Icon",
        description: "Each time the bearer's unit takes a Leadership test for the Dark Pacts ability, you can re-roll that test.",
      },
    ],
    defaultWargear: [
      { id: "dc-autopistol", name: "Autopistol", image: "", profiles: [{ range: '12"', attacks: "1", skill: "4+", strength: "3", ap: "0", damage: "1", keywords: ["PISTOL"] }] },
      { id: "dc-warp-curse-witchfire", name: "► Warp Curse – witchfire", image: "", profiles: [{ range: '18"', attacks: "3", skill: "3+", strength: "4", ap: "-1", damage: "2", keywords: ["PSYCHIC"] }] },
      { id: "dc-warp-curse-focused", name: "► Warp Curse – focused witchfire", image: "", profiles: [{ range: '18"', attacks: "3", skill: "3+", strength: "5", ap: "-1", damage: "2", keywords: ["HAZARDOUS", "PSYCHIC", "SUSTAINED HITS 2"] }] },
      { id: "dc-close-combat-weapon", name: "Close combat weapon", image: "", profiles: [{ range: "Melee", attacks: "1", skill: "4+", strength: "3", ap: "0", damage: "1" }] },
      { id: "dc-commune-blade", name: "Commune blade", image: "", profiles: [{ range: "Melee", attacks: "2", skill: "4+", strength: "4", ap: "-2", damage: "1" }] },
      { id: "dc-commune-stave", name: "Commune stave", image: "", profiles: [{ range: "Melee", attacks: "2", skill: "4+", strength: "3", ap: "0", damage: "D3", keywords: ["DEVASTATING WOUNDS"] }] },
    ],
    wargear: [],
  },

];
