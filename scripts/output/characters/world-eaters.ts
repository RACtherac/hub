import type { Character } from "../../../src/types/warhammer";

export const worldEatersCharacters: Character[] = [

  {
    id: "angron",
    name: "Angron",
    faction: "world-eaters",
    image: "",
    points: 340,
    canAttachTo: [],
    keywords: ["SUPREME COMMANDER"],
    defaultWargear: [
      { id: "samni-arius-and-spinegrinder-strike", name: "Samni'arius and Spinegrinder – strike", image: "", profiles: [{ range: "Melee", attacks: "8", skill: "2+", strength: "14", ap: "-3", damage: "D6+2", keywords: ["DEVASTATING WOUNDS"] }] },
      { id: "samni-arius-and-spinegrinder-sweep", name: "Samni'arius and Spinegrinder – sweep", image: "", profiles: [{ range: "Melee", attacks: "16", skill: "2+", strength: "7", ap: "-2", damage: "2", keywords: ["DEVASTATING WOUNDS"] }] },
    ],
    wargear: [],
    abilities: [
      {
        name: "Reborn in Blood",
        description: "At the start of the battle round, when you make a Blessings of Khorne roll, if this model is destroyed, you can use a triple 6 from that roll to use this ability instead of activating any Blessings of Khorne at the start of that battle round. If you do, this model is no longer destroyed and in the Reinforcements step of your next Movement phase, it is set up anywhere on the battlefield using its Deep Strike ability, with 8 wounds remaining.",
      },
      {
        name: "Wrathful Presence",
        description: "At the start of the battle round, select one of the following Wrathful Presence abilities. Until the start of the next battle round, this model has that ability.",
      },
      {
        name: "Wrathful Presence – The Blood God's Favour",
        description: "Each time you make a Blessings of Khorne roll, if this model is on the battlefield, you can re-roll up to six of the D6 rolled.",
      },
      {
        name: "Wrathful Presence – Overwhelming Wrath (Aura)",
        description: "Each time an enemy unit within 6\" of this model is selected to Fall Back, that unit must take a Leadership test. If that test is failed, that unit must Remain Stationary this phase instead.",
      },
      {
        name: "Wrathful Presence – Driven by Ultimate Rage (Aura)",
        description: "While a friendly WORLD EATERS unit is within 6\" of this model, you can ignore any or all modifiers to that unit's Move characteristic and to Advance and Charge rolls made for it, and each time a model in that unit makes a melee attack, you can ignore any or all modifiers to that attack's Weapon Skill characteristic and/or any or all modifiers to the Hit roll.",
      },
      {
        name: "Damaged: 1-6 Wounds Remaining",
        description: "While this model has 1-6 wounds remaining, each time this model makes an attack, subtract 1 from the Hit roll.",
      },
    ],
  },

  {
    id: "kh-rn-the-betrayer",
    name: "Kh Rn The Betrayer",
    faction: "world-eaters",
    image: "",
    points: 100,
    canAttachTo: [],
    defaultWargear: [
      { id: "kh-rn-s-plasma-pistol", name: "Khârn's plasma pistol", image: "", profiles: [{ range: '12"', attacks: "1", skill: "2+", strength: "8", ap: "-3", damage: "2", keywords: ["HAZARDOUS", "PISTOL"] }] },
      { id: "gorechild", name: "Gorechild", image: "", profiles: [{ range: "Melee", attacks: "6", skill: "2+", strength: "8", ap: "-3", damage: "3", keywords: ["DEVASTATING WOUNDS"] }] },
    ],
    wargear: [],
  },

  {
    id: "lord-invocatus",
    name: "Lord Invocatus",
    faction: "world-eaters",
    image: "",
    points: 140,
    canAttachTo: [],
    defaultWargear: [
      { id: "bolt-pistol", name: "Bolt pistol", image: "", profiles: [{ range: '12"', attacks: "1", skill: "3+", strength: "4", ap: "0", damage: "1", keywords: ["PISTOL"] }] },
      { id: "coward-s-bane", name: "Coward's Bane", image: "", profiles: [{ range: "Melee", attacks: "5", skill: "2+", strength: "8", ap: "-2", damage: "2", keywords: ["DEVASTATING WOUNDS"] }] },
      { id: "juggernaut-s-bladed-horn", name: "Juggernaut's bladed horn", image: "", profiles: [{ range: "Melee", attacks: "3", skill: "4+", strength: "6", ap: "-1", damage: "2" }] },
    ],
    wargear: [],
  },

  {
    id: "world-eaters-daemon-prince",
    name: "World Eaters Daemon Prince",
    faction: "world-eaters",
    image: "",
    points: 200,
    canAttachTo: [],
    defaultWargear: [
      { id: "we-dp-infernal-cannon", name: "Infernal cannon", image: "", profiles: [{ range: '24"', attacks: "D6", skill: "3+", strength: "8", ap: "-2", damage: "2", keywords: ["BLAST"] }] },
      { id: "we-dp-hellforged-weapons-strike", name: "Hellforged weapons – strike", image: "", profiles: [{ range: "Melee", attacks: "4", skill: "3+", strength: "14", ap: "-3", damage: "D6+1" }] },
      { id: "we-dp-hellforged-weapons-sweep", name: "Hellforged weapons – sweep", image: "", profiles: [{ range: "Melee", attacks: "8", skill: "3+", strength: "7", ap: "-2", damage: "2" }] },
    ],
    wargear: [],
    abilities: [
      {
        name: "Lord of Murder",
        description: "While this model is within 3\" of one or more friendly WORLD EATERS INFANTRY units, this model has the Lone Operative ability.",
      },
      {
        name: "Devastating Assault",
        description: "Each time this model makes a Charge move, until the end of the turn, its melee weapons have the [DEVASTATING WOUNDS] ability.",
      },
      {
        name: "Direct the Slaughter",
        description: "Once per battle round, one model from your army with this ability can use it when a friendly WORLD EATERS unit within 12\" of that model is targeted with a Stratagem. If it does, reduce the CP cost of that usage of that Stratagem by 1CP.",
      },
    ],
  },

  {
    id: "world-eaters-daemon-prince-with-wings",
    name: "World Eaters Daemon Prince With Wings",
    faction: "world-eaters",
    image: "",
    points: 180,
    canAttachTo: [],
    defaultWargear: [
      { id: "we-dpw-infernal-cannon", name: "Infernal cannon", image: "", profiles: [{ range: '24"', attacks: "D6", skill: "3+", strength: "8", ap: "-2", damage: "2", keywords: ["BLAST"] }] },
      { id: "we-dpw-hellforged-weapons-strike", name: "Hellforged weapons – strike", image: "", profiles: [{ range: "Melee", attacks: "4", skill: "3+", strength: "14", ap: "-3", damage: "D6+1" }] },
      { id: "we-dpw-hellforged-weapons-sweep", name: "Hellforged weapons – sweep", image: "", profiles: [{ range: "Melee", attacks: "8", skill: "3+", strength: "7", ap: "-2", damage: "2" }] },
    ],
    wargear: [],
    abilities: [
      {
        name: "Bloodied Terror",
        description: "At the start of the Fight phase, each enemy unit within Engagement Range of this model must take a Battle-shock test, subtracting 1 from that test if that enemy unit is Below Half-strength.",
      },
      {
        name: "Swooping Predator",
        description: "Each time this model ends a Normal or Advance move, you can select one enemy unit that it moved over during that move and roll six D6: for each 4+, that enemy unit suffers 1 mortal wound.",
      },
    ],
  },

  {
    id: "world-eaters-lord-on-juggernaut",
    name: "World Eaters Lord On Juggernaut",
    faction: "world-eaters",
    image: "",
    points: 80,
    canAttachTo: [],
    defaultWargear: [
      { id: "plasma-pistol", name: "Plasma pistol", image: "", profiles: [{ profileName: "standard", range: '12"', attacks: "1", skill: "3+", strength: "7", ap: "-2", damage: "1", keywords: ["PISTOL"] }, { profileName: "supercharge", range: '12"', attacks: "1", skill: "3+", strength: "8", ap: "-3", damage: "2", keywords: ["PISTOL", "HAZARDOUS"] }] },
      { id: "exalted-chainblade", name: "Exalted chainblade", image: "", profiles: [{ range: "Melee", attacks: "5", skill: "3+", strength: "6", ap: "-2", damage: "2", keywords: ["DEVASTATING WOUNDS"] }] },
      { id: "juggernaut-s-bladed-horn", name: "Juggernaut's bladed horn", image: "", profiles: [{ range: "Melee", attacks: "3", skill: "4+", strength: "6", ap: "-1", damage: "2" }] },
    ],
    wargear: [],
  },

  {
    id: "world-eaters-master-of-executions",
    name: "World Eaters Master Of Executions",
    faction: "world-eaters",
    image: "",
    points: 110,
    canAttachTo: [],
    defaultWargear: [
      { id: "bolt-pistol", name: "Bolt pistol", image: "", profiles: [{ range: '12"', attacks: "1", skill: "3+", strength: "4", ap: "0", damage: "1", keywords: ["PISTOL"] }] },
      { id: "axe-of-dismemberment", name: "Axe of dismemberment", image: "", profiles: [{ range: "Melee", attacks: "5", skill: "3+", strength: "8", ap: "-3", damage: "D3+1", keywords: ["DEVASTATING WOUNDS"] }] },
    ],
    wargear: [],
  },

];
