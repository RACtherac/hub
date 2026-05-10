import type { Unit } from "../../src/types/warhammer";

export const adeptusMechanicusUnits: Unit[] = [

  {
    id: "serberys-raiders",
    name: "Serberys Raiders",
    faction: "adeptus-mechanicus",
    category: "mounted",
    points: 60,
    defaultWargear: [
      { id: "mechanicus-pistol", name: "Mechanicus pistol", image: "" },
      { id: "galvanic-carbine", name: "Galvanic carbine", image: "" },
      { id: "cavalry-sabre-and-clawed-limbs", name: "Cavalry sabre and clawed limbs", image: "" },
    ],
    wargear: [],
    ledBy: [],
  },

  {
    id: "serberys-sulphurhounds",
    name: "Serberys Sulphurhounds",
    faction: "adeptus-mechanicus",
    category: "mounted",
    points: 55,
    defaultWargear: [
      { id: "mechanicus-pistol", name: "Mechanicus pistol", image: "" },
      { id: "sulphur-breath", name: "Sulphur breath", image: "" },
      { id: "cavalry-arc-maul", name: "Cavalry arc maul", image: "" },
      { id: "clawed-limbs", name: "Clawed limbs", image: "" },
    ],
    wargear: [
      { id: "phosphor-blast-carbine", name: "Phosphor blast carbine", image: "" },
      { id: "phosphor-pistol", name: "Phosphor pistol", image: "" },
    ],
    ledBy: [],
  },

  {
    id: "skitarii-rangers",
    name: "Skitarii Rangers",
    faction: "adeptus-mechanicus",
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
    ledBy: ["skitarii-marshal","tech-priest-dominus","tech-priest-enginseer","tech-priest-manipulus","technoarcheologist","inquisitor","inquisitor-coteaz","inquisitor-draxus","inquisitor-greyfax"],
  },

  {
    id: "skitarii-vanguard",
    name: "Skitarii Vanguard",
    faction: "adeptus-mechanicus",
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
    ledBy: ["skitarii-marshal","tech-priest-dominus","tech-priest-enginseer","tech-priest-manipulus","technoarcheologist","inquisitor","inquisitor-coteaz","inquisitor-draxus","inquisitor-greyfax"],
  },

  {
    id: "corpuscarii-electro-priests",
    name: "Corpuscarii Electro Priests",
    faction: "adeptus-mechanicus",
    category: "infantry",
    points: 65,
    defaultWargear: [
      { id: "electrostatic-gauntlets", name: "Electrostatic gauntlets", image: "" },
    ],
    wargear: [],
    ledBy: ["tech-priest-dominus","tech-priest-enginseer","tech-priest-manipulus","technoarcheologist"],
  },

  {
    id: "fulgurite-electro-priests",
    name: "Fulgurite Electro Priests",
    faction: "adeptus-mechanicus",
    category: "infantry",
    points: 70,
    defaultWargear: [
      { id: "electroleech-stave", name: "Electroleech stave", image: "" },
    ],
    wargear: [],
    ledBy: ["tech-priest-dominus","tech-priest-enginseer","tech-priest-manipulus","technoarcheologist"],
  },

  {
    id: "kataphron-breachers",
    name: "Kataphron Breachers",
    faction: "adeptus-mechanicus",
    category: "infantry",
    points: 160,
    defaultWargear: [
      { id: "heavy-arc-rifle", name: "Heavy arc rifle", image: "" },
      { id: "arc-claw", name: "Arc claw", image: "" },
    ],
    wargear: [
      { id: "torsion-cannon", name: "Torsion cannon", image: "" },
      { id: "hydraulic-claw", name: "Hydraulic claw", image: "" },
    ],
    ledBy: ["tech-priest-dominus","tech-priest-enginseer","tech-priest-manipulus","technoarcheologist"],
  },

  {
    id: "kataphron-destroyers",
    name: "Kataphron Destroyers",
    faction: "adeptus-mechanicus",
    category: "infantry",
    points: 105,
    defaultWargear: [
      { id: "heavy-grav-cannon", name: "Heavy grav-cannon", image: "" },
      { id: "phosphor-blaster", name: "Phosphor blaster", image: "" },
      { id: "close-combat-weapon", name: "Close combat weapon", image: "" },
    ],
    wargear: [
      { id: "cognis-flamer", name: "Cognis flamer", image: "" },
      { id: "kataphron-plasma-culverin-standard", name: "Kataphron plasma culverin – standard", image: "" },
      { id: "kataphron-plasma-culverin-supercharge", name: "Kataphron plasma culverin – supercharge", image: "" },
    ],
    ledBy: ["tech-priest-dominus","tech-priest-enginseer","tech-priest-manipulus","technoarcheologist"],
  },

  {
    id: "pteraxii-skystalkers",
    name: "Pteraxii Skystalkers",
    faction: "adeptus-mechanicus",
    category: "infantry",
    points: 70,
    defaultWargear: [
      { id: "flechette-blaster", name: "Flechette blaster", image: "" },
      { id: "taser-goad", name: "Taser goad", image: "" },
    ],
    wargear: [
      { id: "flechette-carbine", name: "Flechette carbine", image: "" },
      { id: "close-combat-weapon", name: "Close combat weapon", image: "" },
    ],
    ledBy: [],
  },

  {
    id: "pteraxii-sterylizors",
    name: "Pteraxii Sterylizors",
    faction: "adeptus-mechanicus",
    category: "infantry",
    points: 80,
    defaultWargear: [
      { id: "flechette-blaster", name: "Flechette blaster", image: "" },
      { id: "pteraxii-talons", name: "Pteraxii talons", image: "" },
      { id: "taser-goad", name: "Taser goad", image: "" },
    ],
    wargear: [
      { id: "phosphor-torch", name: "Phosphor torch", image: "" },
    ],
    ledBy: [],
  },

  {
    id: "secutarii-hoplites",
    name: "Secutarii Hoplites",
    faction: "adeptus-mechanicus",
    category: "infantry",
    points: 65,
    defaultWargear: [
      { id: "arc-lance", name: "Arc lance", image: "" },
    ],
    wargear: [],
    ledBy: [],
  },

  {
    id: "secutarii-peltasts",
    name: "Secutarii Peltasts",
    faction: "adeptus-mechanicus",
    category: "infantry",
    points: 50,
    defaultWargear: [
      { id: "galvanic-caster-flechette", name: "Galvanic caster – flechette", image: "" },
      { id: "galvanic-caster-hammershot", name: "Galvanic caster – hammershot", image: "" },
      { id: "alpha-close-combat-weapon", name: "Alpha close combat weapon", image: "" },
      { id: "close-combat-weapon", name: "Close combat weapon", image: "" },
    ],
    wargear: [],
    ledBy: [],
  },

  {
    id: "servitors",
    name: "Servitors",
    faction: "adeptus-mechanicus",
    category: "infantry",
    points: 50,
    defaultWargear: [
      { id: "servitor-s-servo-arm", name: "Servitor’s servo-arm", image: "" },
    ],
    wargear: [
      { id: "heavy-bolter", name: "Heavy bolter", image: "" },
      { id: "multi-melta", name: "Multi-melta", image: "" },
      { id: "servitor-s-tools", name: "Servitor’s tools", image: "" },
    ],
    ledBy: [],
  },

  {
    id: "sicarian-infiltrators",
    name: "Sicarian Infiltrators",
    faction: "adeptus-mechanicus",
    category: "infantry",
    points: 70,
    defaultWargear: [
      { id: "stubcarbine", name: "Stubcarbine", image: "" },
      { id: "power-weapon", name: "Power weapon", image: "" },
    ],
    wargear: [
      { id: "flechette-blaster", name: "Flechette blaster", image: "" },
      { id: "taser-goad", name: "Taser goad", image: "" },
    ],
    ledBy: [],
  },

  {
    id: "sicarian-ruststalkers",
    name: "Sicarian Ruststalkers",
    faction: "adeptus-mechanicus",
    category: "infantry",
    points: 75,
    defaultWargear: [
      { id: "transonic-razor-and-chordclaw", name: "Transonic razor and chordclaw", image: "" },
    ],
    wargear: [
      { id: "transonic-blades", name: "Transonic blades", image: "" },
      { id: "transonic-blades-and-chordclaw", name: "Transonic blades and chordclaw", image: "" },
    ],
    ledBy: [],
  },

  {
    id: "archaeopter-fusilave",
    name: "Archaeopter Fusilave",
    faction: "adeptus-mechanicus",
    category: "vehicle",
    points: 160,
    defaultWargear: [
      { id: "cognis-heavy-stubber-array", name: "Cognis heavy stubber array", image: "" },
      { id: "armoured-hull", name: "Armoured hull", image: "" },
    ],
    wargear: [],
    ledBy: [],
  },

  {
    id: "archaeopter-stratoraptor",
    name: "Archaeopter Stratoraptor",
    faction: "adeptus-mechanicus",
    category: "vehicle",
    points: 185,
    defaultWargear: [
      { id: "cognis-heavy-stubber", name: "Cognis heavy stubber", image: "" },
      { id: "heavy-phosphor-blaster", name: "Heavy phosphor blaster", image: "" },
      { id: "twin-cognis-lascannon", name: "Twin cognis lascannon", image: "" },
      { id: "armoured-hull", name: "Armoured hull", image: "" },
    ],
    wargear: [],
    ledBy: [],
  },

  {
    id: "ironstrider-ballistarii",
    name: "Ironstrider Ballistarii",
    faction: "adeptus-mechanicus",
    category: "vehicle",
    points: 75,
    defaultWargear: [
      { id: "twin-cognis-autocannon", name: "Twin cognis autocannon", image: "" },
      { id: "ironstrider-feet", name: "Ironstrider feet", image: "" },
    ],
    wargear: [
      { id: "twin-cognis-lascannon", name: "Twin cognis lascannon", image: "" },
    ],
    ledBy: [],
  },

  {
    id: "kastelan-robots",
    name: "Kastelan Robots",
    faction: "adeptus-mechanicus",
    category: "vehicle",
    points: 180,
    defaultWargear: [
      { id: "incendine-combustor", name: "Incendine combustor", image: "" },
      { id: "kastelan-fist", name: "Kastelan fist", image: "" },
      { id: "twin-kastelan-fist", name: "Twin Kastelan fist", image: "" },
    ],
    wargear: [
      { id: "kastelan-phosphor-blaster", name: "Kastelan phosphor blaster", image: "" },
      { id: "twin-kastelan-phosphor-blaster", name: "Twin Kastelan phosphor blaster", image: "" },
      { id: "close-combat-weapon", name: "Close combat weapon", image: "" },
    ],
    ledBy: [],
  },

  {
    id: "onager-dunecrawler",
    name: "Onager Dunecrawler",
    faction: "adeptus-mechanicus",
    category: "vehicle",
    points: 155,
    defaultWargear: [
      { id: "eradication-beamer-dissipated", name: "Eradication beamer – dissipated", image: "" },
      { id: "eradication-beamer-focused", name: "Eradication beamer – focused", image: "" },
      { id: "dunecrawler-legs", name: "Dunecrawler legs", image: "" },
    ],
    wargear: [
      { id: "cognis-heavy-stubber", name: "Cognis heavy stubber", image: "" },
      { id: "daedalus-missile-launcher", name: "Daedalus missile launcher", image: "" },
      { id: "neutron-laser", name: "Neutron laser", image: "" },
      { id: "icarus-array", name: "Icarus array", image: "" },
      { id: "twin-onager-heavy-phosphor-blaster", name: "Twin Onager heavy phosphor blaster", image: "" },
    ],
    ledBy: [],
  },

  {
    id: "skorpius-disintegrator",
    name: "Skorpius Disintegrator",
    faction: "adeptus-mechanicus",
    category: "vehicle",
    points: 175,
    defaultWargear: [
      { id: "belleros-energy-cannon", name: "Belleros energy cannon", image: "" },
      { id: "cognis-heavy-stubber", name: "Cognis heavy stubber", image: "" },
      { id: "disruptor-missile-launcher", name: "Disruptor missile launcher", image: "" },
      { id: "armoured-hull", name: "Armoured hull", image: "" },
    ],
    wargear: [
      { id: "ferrumite-cannon", name: "Ferrumite cannon", image: "" },
    ],
    ledBy: [],
  },

  {
    id: "sydonian-dragoons-with-radium-jezzails",
    name: "Sydonian Dragoons With Radium Jezzails",
    faction: "adeptus-mechanicus",
    category: "vehicle",
    points: 55,
    defaultWargear: [
      { id: "phosphor-serpenta", name: "Phosphor serpenta", image: "" },
      { id: "radium-jezzail", name: "Radium jezzail", image: "" },
      { id: "ironstrider-feet", name: "Ironstrider feet", image: "" },
    ],
    wargear: [],
    ledBy: [],
  },

  {
    id: "sydonian-dragoons-with-taser-lances",
    name: "Sydonian Dragoons With Taser Lances",
    faction: "adeptus-mechanicus",
    category: "vehicle",
    points: 70,
    defaultWargear: [
      { id: "phosphor-serpenta", name: "Phosphor serpenta", image: "" },
      { id: "taser-lance", name: "Taser lance", image: "" },
    ],
    wargear: [],
    ledBy: [],
  },

  {
    id: "archaeopter-transvector",
    name: "Archaeopter Transvector",
    faction: "adeptus-mechanicus",
    category: "transport",
    points: 150,
    defaultWargear: [
      { id: "cognis-heavy-stubber-array", name: "Cognis heavy stubber array", image: "" },
      { id: "armoured-hull", name: "Armoured hull", image: "" },
    ],
    wargear: [],
    ledBy: [],
  },

  {
    id: "skorpius-dunerider",
    name: "Skorpius Dunerider",
    faction: "adeptus-mechanicus",
    category: "transport",
    points: 85,
    defaultWargear: [
      { id: "cognis-heavy-stubber-array", name: "Cognis heavy stubber array", image: "" },
      { id: "armoured-hull", name: "Armoured hull", image: "" },
    ],
    wargear: [],
    ledBy: [],
  },

  {
    id: "terrax-pattern-termite",
    name: "Terrax Pattern Termite",
    faction: "adeptus-mechanicus",
    category: "transport",
    points: 200,
    defaultWargear: [
      { id: "combi-bolter", name: "Combi-bolter", image: "" },
      { id: "terrax-melta-cutter", name: "Terrax melta cutter", image: "" },
      { id: "termite-drill", name: "Termite drill", image: "" },
    ],
    wargear: [
      { id: "heavy-flamer", name: "Heavy flamer", image: "" },
      { id: "twin-volkite-charger", name: "Twin volkite charger", image: "" },
    ],
    ledBy: [],
  },

];
