import type { Character } from "../../../src/types/warhammer";

export const adeptusMechanicusCharacters: Character[] = [

  {
    id: "belisarius-cawl",
    name: "Belisarius Cawl",
    faction: "adeptus-mechanicus",
    image: "",
    points: 135,
    canAttachTo: [],
    defaultWargear: [
      { id: "solar-atomiser", name: "Solar atomiser", image: "", profiles: [{ range: '18"', attacks: "3", skill: "2+", strength: "8", ap: "-3", damage: "2", keywords: ["ANTI-VEHICLE 4+"] }] },
      { id: "arc-scourge", name: "Arc scourge", image: "", profiles: [{ range: "Melee", attacks: "6", skill: "2+", strength: "6", ap: "-1", damage: "1", keywords: ["ANTI-VEHICLE 2+"] }] },
      { id: "cawl-s-omnissian-axe", name: "Cawl's Omnissian axe", image: "", profiles: [{ range: "Melee", attacks: "4", skill: "2+", strength: "10", ap: "-2", damage: "3" }] },
      { id: "mechadendrite-hive", name: "Mechadendrite hive", image: "", profiles: [{ range: "Melee", attacks: "6", skill: "2+", strength: "4", ap: "0", damage: "1" }] },
    ],
    wargear: [],
  },

  {
    id: "cybernetica-datasmith",
    name: "Cybernetica Datasmith",
    faction: "adeptus-mechanicus",
    image: "",
    points: 35,
    canAttachTo: [],
    defaultWargear: [
      { id: "mechanicus-pistol", name: "Mechanicus pistol", image: "", profiles: [{ range: '12"', attacks: "1", skill: "3+", strength: "4", ap: "0", damage: "1", keywords: ["PISTOL"] }] },
      { id: "power-fist", name: "Power fist", image: "", profiles: [{ range: "Melee", attacks: "3", skill: "3+", strength: "8", ap: "-2", damage: "2" }] },
    ],
    wargear: [],
  },

  {
    id: "skitarii-marshal",
    name: "Skitarii Marshal",
    faction: "adeptus-mechanicus",
    image: "",
    points: 35,
    canAttachTo: [],
    defaultWargear: [
      { id: "mechanicus-pistol", name: "Mechanicus pistol", image: "", profiles: [{ range: '12"', attacks: "1", skill: "3+", strength: "4", ap: "0", damage: "1", keywords: ["PISTOL"] }] },
      { id: "control-stave", name: "Control stave", image: "", profiles: [{ range: "Melee", attacks: "3", skill: "2+", strength: "6", ap: "-1", damage: "2" }] },
    ],
    wargear: [],
  },

  {
    id: "sydonian-skatros",
    name: "Sydonian Skatros",
    faction: "adeptus-mechanicus",
    image: "",
    points: 50,
    canAttachTo: [],
    defaultWargear: [
      { id: "mechanicus-pistol", name: "Mechanicus pistol", image: "", profiles: [{ range: '12"', attacks: "1", skill: "3+", strength: "4", ap: "0", damage: "1", keywords: ["PISTOL"] }] },
      { id: "radium-jezzail", name: "Radium jezzail", image: "", profiles: [{ range: '30"', attacks: "1", skill: "2+", strength: "5", ap: "-2", damage: "D3", keywords: ["HEAVY", "ANTI-INFANTRY 4+", "PRECISION"] }] },
      { id: "sydonian-feet", name: "Sydonian feet", image: "", profiles: [{ range: "Melee", attacks: "2", skill: "3+", strength: "5", ap: "0", damage: "1" }] },
    ],
    wargear: [
      { id: "skatros-transuranic-arquebus", name: "Skatros transuranic arquebus", image: "", profiles: [{ range: '60"', attacks: "1", skill: "2+", strength: "7", ap: "-2", damage: "D3+1", keywords: ["HEAVY", "PRECISION"] }] },
    ],
  },

  {
    id: "tech-priest-dominus",
    name: "Tech Priest Dominus",
    faction: "adeptus-mechanicus",
    image: "",
    points: 65,
    canAttachTo: [],
    defaultWargear: [
      { id: "macrostubber", name: "Macrostubber", image: "", profiles: [{ range: '15"', attacks: "5", skill: "2+", strength: "4", ap: "0", damage: "1", keywords: ["PISTOL"] }] },
      { id: "volkite-blaster", name: "Volkite blaster", image: "", profiles: [{ range: '18"', attacks: "3", skill: "2+", strength: "6", ap: "0", damage: "2" }] },
      { id: "omnissian-axe", name: "Omnissian axe", image: "", profiles: [{ range: "Melee", attacks: "3", skill: "2+", strength: "8", ap: "-2", damage: "2" }] },
    ],
    wargear: [
      { id: "eradication-ray-dissipated", name: "Eradication ray – dissipated", image: "", profiles: [{ range: '18"', attacks: "D6", skill: "2+", strength: "8", ap: "-2", damage: "1", keywords: ["BLAST"] }] },
      { id: "eradication-ray-focused", name: "Eradication ray – focused", image: "", profiles: [{ range: '18"', attacks: "3", skill: "2+", strength: "10", ap: "-4", damage: "D6" }] },
      { id: "phosphor-serpenta", name: "Phosphor serpenta", image: "", profiles: [{ range: '18"', attacks: "2", skill: "2+", strength: "5", ap: "-1", damage: "1", keywords: ["IGNORES COVER", "PISTOL"] }] },
    ],
  },

  {
    id: "tech-priest-enginseer",
    name: "Tech Priest Enginseer",
    faction: "adeptus-mechanicus",
    image: "",
    points: 55,
    canAttachTo: [],
    defaultWargear: [
      { id: "mechanicus-pistol", name: "Mechanicus pistol", image: "", profiles: [{ range: '12"', attacks: "1", skill: "3+", strength: "4", ap: "0", damage: "1", keywords: ["PISTOL"] }] },
      { id: "omnissian-axe", name: "Omnissian axe", image: "", profiles: [{ range: "Melee", attacks: "3", skill: "2+", strength: "8", ap: "-2", damage: "2" }] },
      { id: "servo-arm", name: "Servo-arm", image: "", profiles: [{ range: "Melee", attacks: "2", skill: "3+", strength: "8", ap: "-2", damage: "3" }] },
    ],
    wargear: [],
  },

  {
    id: "tech-priest-manipulus",
    name: "Tech Priest Manipulus",
    faction: "adeptus-mechanicus",
    image: "",
    points: 60,
    canAttachTo: [],
    defaultWargear: [
      { id: "magnarail-lance", name: "Magnarail lance", image: "", profiles: [{ range: '36"', attacks: "1", skill: "2+", strength: "10", ap: "-4", damage: "D6+2" }] },
      { id: "omnissian-staff", name: "Omnissian staff", image: "", profiles: [{ range: "Melee", attacks: "3", skill: "2+", strength: "6", ap: "-1", damage: "2" }] },
    ],
    wargear: [
      { id: "transonic-cannon", name: "Transonic cannon", image: "", profiles: [{ range: '18"', attacks: "D6+1", skill: "2+", strength: "6", ap: "-1", damage: "1" }] },
    ],
  },

  {
    id: "technoarcheologist",
    name: "Technoarcheologist",
    faction: "adeptus-mechanicus",
    image: "",
    points: 45,
    canAttachTo: [],
    defaultWargear: [
      { id: "mechanicus-pistol", name: "Mechanicus pistol", image: "", profiles: [{ range: '12"', attacks: "1", skill: "3+", strength: "4", ap: "0", damage: "1", keywords: ["PISTOL"] }] },
      { id: "servo-arc-claw", name: "Servo-arc claw", image: "", profiles: [{ range: "Melee", attacks: "3", skill: "2+", strength: "8", ap: "-2", damage: "2", keywords: ["ANTI-VEHICLE 2+"] }] },
    ],
    wargear: [],
  },

  {
    id: "x-101",
    name: "X 101",
    faction: "adeptus-mechanicus",
    image: "",
    points: 40,
    canAttachTo: [],
    defaultWargear: [
      { id: "grav-gun", name: "Grav-gun", image: "", profiles: [{ range: '24"', attacks: "3", skill: "3+", strength: "5", ap: "-3", damage: "1", keywords: ["ANTI-VEHICLE 2+"] }] },
      { id: "hydraulic-claw", name: "Hydraulic claw", image: "", profiles: [{ range: "Melee", attacks: "3", skill: "2+", strength: "8", ap: "-2", damage: "2" }] },
    ],
    wargear: [],
  },

];
