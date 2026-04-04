import type { Unit } from "../../../types/warhammer";

export const imperialKnightsUnits: Unit[] = [

  {
    id: "skitarii-rangers",
    name: "Skitarii Rangers",
    faction: "imperial-knights",
    category: "battleline",
    points: 85,
    defaultWargear: [
      { id: "galvanic-rifle", name: "Galvanic rifle", image: "" },
      { id: "close-combat-weapon", name: "Close combat weapon", image: "" },
    ],
    wargear: [
      { id: "arc-rifle", name: "Arc rifle", image: "" },
      { id: "transuranic-arquebus", name: "Transuranic arquebus", image: "" },
    ],
    ledBy: ["inquisitor","inquisitor-coteaz","inquisitor-draxus","inquisitor-greyfax"],
  },

  {
    id: "skitarii-vanguard",
    name: "Skitarii Vanguard",
    faction: "imperial-knights",
    category: "battleline",
    points: 95,
    defaultWargear: [
      { id: "radium-carbine", name: "Radium carbine", image: "" },
      { id: "close-combat-weapon", name: "Close combat weapon", image: "" },
    ],
    wargear: [
      { id: "arc-rifle", name: "Arc rifle", image: "" },
      { id: "transuranic-arquebus", name: "Transuranic arquebus", image: "" },
    ],
    ledBy: ["inquisitor","inquisitor-coteaz","inquisitor-draxus","inquisitor-greyfax"],
  },

  {
    id: "acastus-knight-asterius",
    name: "Acastus Knight Asterius",
    faction: "imperial-knights",
    category: "vehicle",
    points: 765,
    defaultWargear: [
      { id: "asterius-volkite-culverin", name: "Asterius volkite culverin", image: "" },
      { id: "karacnos-mortar-battery", name: "Karacnos mortar battery", image: "" },
      { id: "twin-conversion-beam-cannon", name: "Twin conversion beam cannon", image: "" },
      { id: "titanic-feet", name: "Titanic feet", image: "" },
    ],
    wargear: [],
    ledBy: [],
  },

  {
    id: "acastus-knight-porphyrion",
    name: "Acastus Knight Porphyrion",
    faction: "imperial-knights",
    category: "vehicle",
    points: 710,
    defaultWargear: [
      { id: "acastus-autocannon", name: "Acastus autocannon", image: "" },
      { id: "acastus-ironstorm-missile-pod", name: "Acastus ironstorm missile pod", image: "" },
      { id: "lascannon", name: "Lascannon", image: "" },
      { id: "twin-magna-lascannon", name: "Twin magna lascannon", image: "" },
      { id: "titanic-feet", name: "Titanic feet", image: "" },
    ],
    wargear: [],
    ledBy: [],
  },

  {
    id: "armiger-helverin",
    name: "Armiger Helverin",
    faction: "imperial-knights",
    category: "vehicle",
    points: 130,
    defaultWargear: [
      { id: "armiger-autocannon", name: "Armiger autocannon", image: "" },
      { id: "questoris-heavy-stubber", name: "Questoris heavy stubber", image: "" },
      { id: "armoured-feet", name: "Armoured feet", image: "" },
    ],
    wargear: [
      { id: "meltagun", name: "Meltagun", image: "" },
    ],
    ledBy: [],
  },

  {
    id: "armiger-moirax",
    name: "Armiger Moirax",
    faction: "imperial-knights",
    category: "vehicle",
    points: 160,
    defaultWargear: [
      { id: "graviton-pulsar", name: "Graviton pulsar", image: "" },
      { id: "volkite-veuglaire", name: "Volkite veuglaire", image: "" },
      { id: "armoured-feet", name: "Armoured feet", image: "" },
    ],
    wargear: [
      { id: "conversion-beam-cannon", name: "Conversion beam cannon", image: "" },
      { id: "lightning-lock", name: "Lightning lock", image: "" },
      { id: "rad-cleanser", name: "Rad cleanser", image: "" },
      { id: "siege-claw", name: "Siege claw", image: "" },
    ],
    ledBy: [],
  },

  {
    id: "armiger-warglaive",
    name: "Armiger Warglaive",
    faction: "imperial-knights",
    category: "vehicle",
    points: 140,
    defaultWargear: [
      { id: "questoris-heavy-stubber", name: "Questoris heavy stubber", image: "" },
      { id: "thermal-spear", name: "Thermal spear", image: "" },
      { id: "reaper-chain-cleaver-strike", name: "Reaper chain-cleaver – strike", image: "" },
      { id: "reaper-chain-cleaver-sweep", name: "Reaper chain-cleaver – sweep", image: "" },
    ],
    wargear: [
      { id: "meltagun", name: "Meltagun", image: "" },
    ],
    ledBy: [],
  },

];
