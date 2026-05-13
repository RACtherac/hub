import type { Character } from "../../../src/types/warhammer";

export const emperorsChildrenCharacters: Character[] = [

  {
    id: "fulgrim",
    name: "Fulgrim",
    faction: "emperors-children",
    image: "",
    points: 340,
    canAttachTo: [],
    defaultWargear: [
      { id: "fulgrim-malefic-lash", name: "Malefic lash", image: "", profiles: [{ range: '12"', attacks: "6", skill: "2+", strength: "8", ap: "-2", damage: "2", keywords: ["SUSTAINED HITS 1"] }] },
      { id: "fulgrim-daemonic-blades-strike", name: "Daemonic blades – strike", image: "", profiles: [{ range: "Melee", attacks: "6", skill: "2+", strength: "14", ap: "-3", damage: "D6+1", keywords: ["SUSTAINED HITS 1"] }] },
      { id: "fulgrim-daemonic-blades-sweep", name: "Daemonic blades – sweep", image: "", profiles: [{ range: "Melee", attacks: "12", skill: "2+", strength: "8", ap: "-2", damage: "2", keywords: ["SUSTAINED HITS 1"] }] },
      { id: "fulgrim-serpentine-tail", name: "Serpentine tail", image: "", profiles: [{ range: "Melee", attacks: "6", skill: "2+", strength: "6", ap: "-1", damage: "1", keywords: ["EXTRA ATTACKS"] }] },
    ],
    wargear: [],
    abilities: [
      {
        name: "Supreme Commander",
        description: "If this model is in your army, it must be your WARLORD.",
      },
      {
        name: "Daemonic Poisons",
        description: "In your Shooting phase and the Fight phase, after this model has finished making its attacks, select one enemy unit hit by one or more of those attacks. Until the end of the battle, that enemy unit is poisoned. At the start of each player's Command phase, roll one D6 for each poisoned enemy unit on the battlefield: on a 4+, that enemy unit suffers D3 mortal wounds.",
      },
      {
        name: "Serpentine",
        description: "Each time this model makes a Normal, Advance or Fall Back move, it can move over sections of terrain features that are 4\" or less in height.",
      },
      {
        name: "Daemon Primarch of Slaanesh",
        description: "At the start of your opponent's Command phase, select one of the abilities in the Daemon Primarch of Slaanesh section. Until the start of your opponent's next Command phase, this model has that ability.",
      },
      {
        name: "Beguiling Form",
        description: "Each time a model makes an attack that targets this model, subtract 1 from the Hit roll.",
      },
      {
        name: "Daemonic Speed",
        description: "This model has the Fights First ability.",
      },
      {
        name: "Enthralling Hypnosis (Aura)",
        description: "While an enemy unit is within 6\" of this model, each time that unit is selected to Fall Back, it must take a Leadership test. If that test is failed, that unit must Remain Stationary this phase instead.",
      },
      {
        name: "Damaged: 1-6 Wounds Remaining",
        description: "While this model has 1-6 wounds remaining, each time this model makes an attack, subtract 1 from the Hit roll.",
      },
    ],
  },

  {
    id: "emperors-children-daemon-prince",
    name: "Emperor's Children Daemon Prince",
    faction: "emperors-children",
    image: "",
    points: 180,
    canAttachTo: [],
    defaultWargear: [
      { id: "ec-dp-infernal-cannon", name: "Infernal cannon", image: "", profiles: [{ range: '24"', attacks: "D6", skill: "3+", strength: "8", ap: "-2", damage: "2", keywords: ["BLAST"] }] },
      { id: "ec-dp-hellforged-weapons-strike", name: "Hellforged weapons – strike", image: "", profiles: [{ range: "Melee", attacks: "4", skill: "3+", strength: "14", ap: "-3", damage: "D6+1" }] },
      { id: "ec-dp-hellforged-weapons-sweep", name: "Hellforged weapons – sweep", image: "", profiles: [{ range: "Melee", attacks: "8", skill: "3+", strength: "7", ap: "-2", damage: "2" }] },
    ],
    wargear: [],
    abilities: [
      {
        name: "Lord of Excess",
        description: "While this model is within 3\" of one or more friendly SLAANESH INFANTRY units, this model has the Lone Operative ability.",
      },
      {
        name: "Excessive Vigour (Aura)",
        description: "While a friendly SLAANESH unit is within 6\" of this model, if that unit made a Charge move this turn, improve the Armour Penetration characteristic of melee weapons equipped by models in that unit by 1.",
      },
      {
        name: "Ecstatic Death",
        description: "If this model is destroyed by a melee attack, if it has not fought this phase, roll one D6: on a 2+, do not remove it from play. This model can fight after the attacking unit has finished making its attacks, and is then removed from play.",
      },
    ],
  },

  {
    id: "emperors-children-daemon-prince-with-wings",
    name: "Emperor's Children Daemon Prince With Wings",
    faction: "emperors-children",
    image: "",
    points: 215,
    canAttachTo: [],
    defaultWargear: [
      { id: "ec-dpw-infernal-cannon", name: "Infernal cannon", image: "", profiles: [{ range: '24"', attacks: "D6", skill: "3+", strength: "8", ap: "-2", damage: "2", keywords: ["BLAST"] }] },
      { id: "ec-dpw-hellforged-weapons-strike", name: "Hellforged weapons – strike", image: "", profiles: [{ range: "Melee", attacks: "4", skill: "3+", strength: "14", ap: "-3", damage: "D6+1" }] },
      { id: "ec-dpw-hellforged-weapons-sweep", name: "Hellforged weapons – sweep", image: "", profiles: [{ range: "Melee", attacks: "8", skill: "3+", strength: "7", ap: "-2", damage: "2" }] },
    ],
    wargear: [],
    abilities: [
      {
        name: "Daemonic Destruction",
        description: "Each time this model ends a Charge move, select one enemy unit within Engagement Range of it and roll one D6 for each of this model's remaining wounds: for each 4+, that enemy unit suffers 1 mortal wound (to a maximum of 6 mortal wounds).",
      },
      {
        name: "Stimulated by Pain",
        description: "Each time an attack is allocated to this model, subtract 1 from the Damage characteristic of that attack.",
      },
    ],
  },

];
