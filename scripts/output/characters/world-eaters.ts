import type { Character } from "../../../types/warhammer";

export const worldEatersCharacters: Character[] = [

  {
    id: "angron",
    name: "Angron",
    faction: "world-eaters",
    image: "",
    points: 435,
    canAttachTo: [],
    defaultWargear: [
      { id: "samni-arius-and-spinegrinder-strike", name: "Samni'arius and Spinegrinder – strike", image: "", profiles: [{ range: "Melee", attacks: "8", skill: "2+", strength: "16", ap: "-4", damage: "D6+2", keywords: ["DEVASTATING WOUNDS"] }] },
      { id: "samni-arius-and-spinegrinder-sweep", name: "Samni'arius and Spinegrinder – sweep", image: "", profiles: [{ range: "Melee", attacks: "16", skill: "2+", strength: "8", ap: "-2", damage: "2" }] },
    ],
    wargear: [],
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
    points: 185,
    canAttachTo: [],
    defaultWargear: [
      { id: "infernal-cannon", name: "Infernal cannon", image: "", profiles: [{ range: '24"', attacks: "D6", skill: "3+", strength: "8", ap: "-2", damage: "2", keywords: ["BLAST"] }] },
      { id: "hellforged-weapons-strike", name: "Hellforged weapons – strike", image: "", profiles: [{ range: "Melee", attacks: "4", skill: "3+", strength: "14", ap: "-3", damage: "D6+1" }] },
      { id: "hellforged-weapons-sweep", name: "Hellforged weapons – sweep", image: "", profiles: [{ range: "Melee", attacks: "8", skill: "3+", strength: "7", ap: "-2", damage: "2" }] },
    ],
    wargear: [],
  },

  {
    id: "world-eaters-daemon-prince-with-wings",
    name: "World Eaters Daemon Prince With Wings",
    faction: "world-eaters",
    image: "",
    points: 155,
    canAttachTo: [],
    defaultWargear: [
      { id: "infernal-cannon", name: "Infernal cannon", image: "", profiles: [{ range: '24"', attacks: "D6", skill: "3+", strength: "8", ap: "-2", damage: "2", keywords: ["BLAST"] }] },
      { id: "hellforged-weapons-strike", name: "Hellforged weapons – strike", image: "", profiles: [{ range: "Melee", attacks: "4", skill: "3+", strength: "14", ap: "-3", damage: "D6+1" }] },
      { id: "hellforged-weapons-sweep", name: "Hellforged weapons – sweep", image: "", profiles: [{ range: "Melee", attacks: "8", skill: "3+", strength: "7", ap: "-2", damage: "2" }] },
    ],
    wargear: [],
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
