import type { Unit } from "../../../types/warhammer";

export const adeptusCustodesUnits: Unit[] = [

  {
    id: "agamatus-custodians",
    name: "Agamatus Custodians",
    faction: "adeptus-custodes",
    category: "mounted",
    points: 225,
    defaultWargear: [
      { id: "lastrum-bolt-cannon", name: "Lastrum bolt cannon", image: "" },
      { id: "interceptor-lance", name: "Interceptor lance", image: "" },
    ],
    wargear: [
      { id: "adrathic-devastator", name: "Adrathic devastator", image: "" },
      { id: "twin-las-pulsar", name: "Twin las-pulsar", image: "" },
    ],
    ledBy: [],
  },

  {
    id: "vertus-praetors",
    name: "Vertus Praetors",
    faction: "adeptus-custodes",
    category: "mounted",
    points: 150,
    defaultWargear: [
      { id: "salvo-launcher", name: "Salvo launcher", image: "" },
      { id: "interceptor-lance", name: "Interceptor lance", image: "" },
    ],
    wargear: [
      { id: "vertus-hurricane-bolter", name: "Vertus hurricane bolter", image: "" },
    ],
    ledBy: [],
  },

  {
    id: "custodian-guard",
    name: "Custodian Guard",
    faction: "adeptus-custodes",
    category: "battleline",
    points: 170,
    defaultWargear: [
      { id: "guardian-spear", name: "Guardian spear", image: "" },
    ],
    wargear: [
      { id: "misericordia", name: "Misericordia", image: "" },
    ],
    ledBy: ["blade-champion","shield-captain","trajann-valoris","valerian","inquisitor","inquisitor-coteaz","inquisitor-draxus","inquisitor-greyfax"],
  },

  {
    id: "allarus-custodians",
    name: "Allarus Custodians",
    faction: "adeptus-custodes",
    category: "infantry",
    points: 130,
    defaultWargear: [
      { id: "balistus-grenade-launcher", name: "Balistus grenade launcher", image: "" },
      { id: "guardian-spear", name: "Guardian spear", image: "" },
    ],
    wargear: [
      { id: "misericordia", name: "Misericordia", image: "" },
    ],
    ledBy: [],
  },

  {
    id: "aquilon-custodians",
    name: "Aquilon Custodians",
    faction: "adeptus-custodes",
    category: "infantry",
    points: 195,
    defaultWargear: [
      { id: "lastrum-storm-bolter", name: "Lastrum storm bolter", image: "" },
      { id: "solerite-power-gauntlet", name: "Solerite power gauntlet", image: "" },
    ],
    wargear: [
      { id: "infernus-firepike", name: "Infernus firepike", image: "" },
      { id: "twin-adrathic-destructor", name: "Twin adrathic destructor", image: "" },
    ],
    ledBy: [],
  },

  {
    id: "custodian-guard-with-adrasite-and-pyrithite-spears",
    name: "Custodian Guard With Adrasite And Pyrithite Spears",
    faction: "adeptus-custodes",
    category: "infantry",
    points: 250,
    defaultWargear: [
      { id: "adrasite-spear", name: "Adrasite spear", image: "" },
    ],
    wargear: [
      { id: "pyrithite-spear", name: "Pyrithite spear", image: "" },
    ],
    ledBy: [],
  },

  {
    id: "custodian-wardens",
    name: "Custodian Wardens",
    faction: "adeptus-custodes",
    category: "infantry",
    points: 210,
    defaultWargear: [
      { id: "guardian-spear", name: "Guardian spear", image: "" },
    ],
    wargear: [],
    ledBy: ["blade-champion","shield-captain","trajann-valoris","valerian"],
  },

  {
    id: "prosecutors",
    name: "Prosecutors",
    faction: "adeptus-custodes",
    category: "infantry",
    points: 40,
    defaultWargear: [
      { id: "boltgun", name: "Boltgun", image: "" },
      { id: "close-combat-weapon", name: "Close combat weapon", image: "" },
    ],
    wargear: [],
    ledBy: ["aleya","knight-centura"],
  },

  {
    id: "sagittarum-custodians",
    name: "Sagittarum Custodians",
    faction: "adeptus-custodes",
    category: "infantry",
    points: 225,
    defaultWargear: [
      { id: "adrastus-bolt-caliver", name: "Adrastus bolt caliver", image: "" },
      { id: "misericordia", name: "Misericordia", image: "" },
    ],
    wargear: [],
    ledBy: [],
  },

  {
    id: "venatari-custodians",
    name: "Venatari Custodians",
    faction: "adeptus-custodes",
    category: "infantry",
    points: 165,
    defaultWargear: [
      { id: "venatari-lance", name: "Venatari lance", image: "" },
    ],
    wargear: [
      { id: "kinetic-destroyer", name: "Kinetic destroyer", image: "" },
      { id: "tarsis-buckler", name: "Tarsis buckler", image: "" },
    ],
    ledBy: [],
  },

  {
    id: "vigilators",
    name: "Vigilators",
    faction: "adeptus-custodes",
    category: "infantry",
    points: 50,
    defaultWargear: [
      { id: "executioner-greatblade", name: "Executioner greatblade", image: "" },
    ],
    wargear: [],
    ledBy: ["aleya","knight-centura"],
  },

  {
    id: "witchseekers",
    name: "Witchseekers",
    faction: "adeptus-custodes",
    category: "infantry",
    points: 50,
    defaultWargear: [
      { id: "witchseeker-flamer", name: "Witchseeker flamer", image: "" },
      { id: "close-combat-weapon", name: "Close combat weapon", image: "" },
    ],
    wargear: [],
    ledBy: ["aleya","knight-centura"],
  },

  {
    id: "ares-gunship",
    name: "Ares Gunship",
    faction: "adeptus-custodes",
    category: "vehicle",
    points: 580,
    defaultWargear: [
      { id: "arachnus-heavy-blaze-cannon", name: "Arachnus heavy blaze cannon", image: "" },
      { id: "arachnus-magna-blaze-cannon", name: "Arachnus magna-blaze cannon", image: "" },
      { id: "armoured-hull", name: "Armoured hull", image: "" },
    ],
    wargear: [],
    ledBy: [],
  },

  {
    id: "caladius-grav-tank",
    name: "Caladius Grav Tank",
    faction: "adeptus-custodes",
    category: "vehicle",
    points: 215,
    defaultWargear: [
      { id: "twin-iliastus-accelerator-cannon", name: "Twin iliastus accelerator cannon", image: "" },
      { id: "twin-lastrum-bolt-cannon", name: "Twin lastrum bolt cannon", image: "" },
      { id: "armoured-hull", name: "Armoured hull", image: "" },
    ],
    wargear: [
      { id: "twin-arachnus-heavy-blaze-cannon", name: "Twin arachnus heavy blaze cannon", image: "" },
    ],
    ledBy: [],
  },

  {
    id: "contemptor-achillus-dreadnought",
    name: "Contemptor Achillus Dreadnought",
    faction: "adeptus-custodes",
    category: "vehicle",
    points: 155,
    defaultWargear: [
      { id: "achillus-dreadspear", name: "Achillus dreadspear", image: "" },
      { id: "lastrum-storm-bolter", name: "Lastrum storm bolter", image: "" },
    ],
    wargear: [
      { id: "infernus-incinerator", name: "Infernus incinerator", image: "" },
      { id: "twin-adrathic-destructor", name: "Twin adrathic destructor", image: "" },
    ],
    ledBy: [],
  },

  {
    id: "contemptor-galatus-dreadnought",
    name: "Contemptor Galatus Dreadnought",
    faction: "adeptus-custodes",
    category: "vehicle",
    points: 165,
    defaultWargear: [
      { id: "galatus-warblade", name: "Galatus warblade", image: "" },
    ],
    wargear: [],
    ledBy: [],
  },

  {
    id: "pallas-grav-attack",
    name: "Pallas Grav Attack",
    faction: "adeptus-custodes",
    category: "vehicle",
    points: 105,
    defaultWargear: [
      { id: "twin-arachnus-blaze-cannon", name: "Twin arachnus blaze cannon", image: "" },
      { id: "armoured-hull", name: "Armoured hull", image: "" },
    ],
    wargear: [],
    ledBy: [],
  },

  {
    id: "telemon-heavy-dreadnought",
    name: "Telemon Heavy Dreadnought",
    faction: "adeptus-custodes",
    category: "vehicle",
    points: 225,
    defaultWargear: [
      { id: "iliastus-accelerator-culverin", name: "Iliastus accelerator culverin", image: "" },
      { id: "spiculus-bolt-launcher", name: "Spiculus bolt launcher", image: "" },
      { id: "armoured-feet", name: "Armoured feet", image: "" },
    ],
    wargear: [
      { id: "arachnus-storm-cannon", name: "Arachnus storm cannon", image: "" },
      { id: "twin-plasma-projector", name: "Twin plasma projector", image: "" },
      { id: "telemon-caestus", name: "Telemon caestus", image: "" },
    ],
    ledBy: [],
  },

  {
    id: "venerable-contemptor-dreadnought",
    name: "Venerable Contemptor Dreadnought",
    faction: "adeptus-custodes",
    category: "vehicle",
    points: 170,
    defaultWargear: [
      { id: "combi-bolter", name: "Combi-bolter", image: "" },
      { id: "multi-melta", name: "Multi-melta", image: "" },
      { id: "contemptor-combat-weapon", name: "Contemptor combat weapon", image: "" },
    ],
    wargear: [
      { id: "kheres-pattern-assault-cannon", name: "Kheres-pattern assault cannon", image: "" },
    ],
    ledBy: [],
  },

  {
    id: "anathema-psykana-rhino",
    name: "Anathema Psykana Rhino",
    faction: "adeptus-custodes",
    category: "transport",
    points: 75,
    defaultWargear: [
      { id: "storm-bolter", name: "Storm bolter", image: "" },
      { id: "armoured-tracks", name: "Armoured tracks", image: "" },
    ],
    wargear: [
      { id: "hunter-killer-missile", name: "Hunter-killer missile", image: "" },
    ],
    ledBy: [],
  },

  {
    id: "coronus-grav-carrier",
    name: "Coronus Grav Carrier",
    faction: "adeptus-custodes",
    category: "transport",
    points: 200,
    defaultWargear: [
      { id: "twin-arachnus-blaze-cannon", name: "Twin arachnus blaze cannon", image: "" },
      { id: "twin-lastrum-bolt-cannon", name: "Twin lastrum bolt cannon", image: "" },
      { id: "armoured-hull", name: "Armoured hull", image: "" },
    ],
    wargear: [],
    ledBy: [],
  },

  {
    id: "orion-assault-dropship",
    name: "Orion Assault Dropship",
    faction: "adeptus-custodes",
    category: "transport",
    points: 690,
    defaultWargear: [
      { id: "arachnus-heavy-blaze-cannon", name: "Arachnus heavy blaze cannon", image: "" },
      { id: "spiculus-heavy-bolt-launcher", name: "Spiculus heavy bolt launcher", image: "" },
      { id: "twin-lastrum-bolt-cannon", name: "Twin lastrum bolt cannon", image: "" },
      { id: "armoured-hull", name: "Armoured hull", image: "" },
    ],
    wargear: [],
    ledBy: [],
  },

  {
    id: "venerable-land-raider",
    name: "Venerable Land Raider",
    faction: "adeptus-custodes",
    category: "transport",
    points: 240,
    defaultWargear: [
      { id: "godhammer-lascannon", name: "Godhammer lascannon", image: "" },
      { id: "twin-heavy-bolter", name: "Twin heavy bolter", image: "" },
      { id: "armoured-tracks", name: "Armoured tracks", image: "" },
    ],
    wargear: [
      { id: "hunter-killer-missile", name: "Hunter-killer missile", image: "" },
      { id: "storm-bolter", name: "Storm bolter", image: "" },
    ],
    ledBy: [],
  },

];
