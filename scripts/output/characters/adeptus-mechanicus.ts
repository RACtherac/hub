import type { Character } from "../../../src/types/warhammer";

export const adeptusMechanicusCharacters: Character[] = [

  {
    id: "belisarius-cawl",
    name: "Belisarius Cawl",
    faction: "adeptus-mechanicus",
    image: "",
    points: 210,
    canAttachTo: [],
    keywords: ["SUPREME COMMANDER"],
    defaultWargear: [
      { id: "solar-atomiser", name: "Solar atomiser", image: "", profiles: [{ range: '18"', attacks: "3", skill: "2+", strength: "14", ap: "-4", damage: "D6", keywords: ["MELTA 3"] }] },
      { id: "arc-scourge", name: "Arc scourge", image: "", profiles: [{ range: "Melee", attacks: "4", skill: "2+", strength: "5", ap: "-1", damage: "1", keywords: ["ANTI-VEHICLE 4+", "DEVASTATING WOUNDS", "EXTRA ATTACKS"] }] },
      { id: "cawls-omnissian-axe", name: "Cawl's Omnissian axe", image: "", profiles: [{ range: "Melee", attacks: "4", skill: "2+", strength: "8", ap: "-2", damage: "2" }] },
      { id: "mechadendrite-hive", name: "Mechadendrite hive", image: "", profiles: [{ range: "Melee", attacks: "2D6", skill: "3+", strength: "4", ap: "0", damage: "1", keywords: ["EXTRA ATTACKS"] }] },
    ],
    wargear: [],
    abilities: [
      {
        name: "Mechanicus Bodyguard",
        description: "While this model is within 3\" of one or more other friendly ADEPTUS MECHANICUS units, this model has the Lone Operative ability.",
      },
      {
        name: "Self-repair Mechanisms",
        description: "At the start of your Command phase, this model regains up to D3 lost wounds.",
      },
      {
        name: "Canticles of the Omnissiah",
        description: "At the start of your Command phase, select one of the following Canticles of the Omnissiah abilities. Until the start of your next Command phase, this model has that ability.",
      },
      {
        name: "Canticle – Invocation of Machine Vengeance",
        description: "At the start of your Command phase, select one unit from your opponent's army. Until the start of your next Command phase, that enemy unit is your Machine Vengeance target. Each time a model in a friendly ADEPTUS MECHANICUS unit makes an attack that targets your Machine Vengeance target, you can re-roll the Hit roll.",
      },
      {
        name: "Canticle – Mantra of Discipline",
        description: "This model has the BATTLELINE keyword and has the following ability — Binharic Courage (Aura): While a friendly ADEPTUS MECHANICUS unit is within 6\" of this model, add 1 to the Objective Control characteristic of models in that unit and each time you take a Battle-shock or Leadership test for that unit, add 1 to that test.",
      },
      {
        name: "Canticle – Shroudpsalm (Aura)",
        description: "While a friendly ADEPTUS MECHANICUS unit is within 6\" of this model, that unit has the Stealth ability.",
      },
    ],
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
    canAttachTo: ["hastarii-exterminators", "hastarii-fusiliers", "corpuscarii-electro-priests", "fulgurite-electro-priests", "kataphron-breachers", "kataphron-destroyers", "servitor-battleclade", "skitarii-rangers", "skitarii-vanguard"],
    defaultWargear: [
      { id: "tpd-omnissian-axe", name: "Omnissian axe", image: "", profiles: [{ range: "Melee", attacks: "4", skill: "3+", strength: "6", ap: "-2", damage: "2" }] },
    ],
    wargear: [
      { id: "tpd-macrostubber", name: "Macrostubber", image: "", profiles: [{ range: '12"', attacks: "5", skill: "3+", strength: "4", ap: "0", damage: "1", keywords: ["PISTOL"] }] },
      { id: "tpd-phosphor-serpenta", name: "Phosphor serpenta", image: "", profiles: [{ range: '18"', attacks: "1", skill: "3+", strength: "5", ap: "-1", damage: "2", keywords: ["IGNORES COVER", "PISTOL"] }] },
      { id: "tpd-volkite-blaster", name: "Volkite blaster", image: "", profiles: [{ range: '24"', attacks: "3", skill: "3+", strength: "5", ap: "0", damage: "2", keywords: ["DEVASTATING WOUNDS"] }] },
      { id: "tpd-eradication-ray", name: "Eradication ray", image: "", profiles: [
        { profileName: "dissipated", range: '24"', attacks: "D3", skill: "3+", strength: "6", ap: "-1", damage: "1" },
        { profileName: "focused", range: '12"', attacks: "D3", skill: "3+", strength: "6", ap: "-2", damage: "2" },
      ]},
    ],
    wargearGroups: [
      ["tpd-macrostubber", "tpd-phosphor-serpenta"],
      ["tpd-volkite-blaster", "tpd-eradication-ray"],
    ],
    defaultSelectedWargear: ["tpd-macrostubber", "tpd-volkite-blaster"],
    abilities: [
      {
        name: "Lord of the Machine Cult",
        description: "While this model is leading a unit, models in that unit have the Feel No Pain 5+ ability. If that unit has the ELECTRO-PRIESTS keyword, models in that unit have the Feel No Pain 4+ ability instead.",
      },
      {
        name: "Data-spike",
        description: "At the start of the Fight phase, you can select one enemy VEHICLE unit within Engagement Range of this model's unit and roll one D6: on a 4+, that enemy unit suffers D6 mortal wounds and, until the end of the phase, the Weapon Skill characteristic of melee weapons equipped by that enemy unit is worsened by 1.",
      },
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
    canAttachTo: ["hastarii-exterminators", "hastarii-fusiliers", "corpuscarii-electro-priests", "fulgurite-electro-priests", "kataphron-breachers", "kataphron-destroyers", "servitor-battleclade", "skitarii-rangers", "skitarii-vanguard"],
    defaultWargear: [
      { id: "tpm-omnissian-staff", name: "Omnissian staff", image: "", profiles: [{ range: "Melee", attacks: "4", skill: "3+", strength: "6", ap: "-1", damage: "2" }] },
    ],
    wargear: [
      { id: "tpm-magnarail-lance", name: "Magnarail lance", image: "", profiles: [{ range: '36"', attacks: "1", skill: "3+", strength: "7", ap: "-2", damage: "3", keywords: ["HEAVY"] }] },
      { id: "tpm-transonic-cannon", name: "Transonic cannon", image: "", profiles: [{ range: '12"', attacks: "D6", skill: "N/A", strength: "4", ap: "0", damage: "2", keywords: ["DEVASTATING WOUNDS", "TORRENT"] }] },
    ],
    wargearGroups: [
      ["tpm-magnarail-lance", "tpm-transonic-cannon"],
    ],
    defaultSelectedWargear: ["tpm-magnarail-lance"],
    abilities: [
      {
        name: "Galvanic Field",
        description: "While this model is leading a unit, weapons equipped by models in that unit have the [LETHAL HITS] ability.",
      },
      {
        name: "Defend the Divine Work",
        description: "Once per battle, at the start of any phase, this model can use this ability. If it does, until the end of the phase, all models in this model's unit have a 4+ invulnerable save.",
      },
    ],
  },

  {
    id: "technoarcheologist",
    name: "Technoarcheologist",
    faction: "adeptus-mechanicus",
    image: "",
    points: 45,
    canAttachTo: ["hastarii-exterminators", "hastarii-fusiliers", "corpuscarii-electro-priests", "fulgurite-electro-priests", "kataphron-breachers", "kataphron-destroyers", "servitor-battleclade", "skitarii-rangers", "skitarii-vanguard"],
    defaultWargear: [
      { id: "mechanicus-pistol", name: "Mechanicus pistol", image: "", profiles: [{ range: '12"', attacks: "1", skill: "3+", strength: "6", ap: "-1", damage: "1", keywords: ["DEVASTATING WOUNDS", "PISTOL"] }] },
      { id: "servo-arc-claw", name: "Servo-arc claw", image: "", profiles: [{ range: "Melee", attacks: "3", skill: "4+", strength: "8", ap: "-2", damage: "2", keywords: ["ANTI-VEHICLE 4+", "DEVASTATING WOUNDS"] }] },
    ],
    wargear: [],
    abilities: [
      {
        name: "Seekers of Divine Arcana",
        description: "While this model is leading a unit, add 1 to the Objective Control characteristic of models in that unit.",
      },
      {
        name: "Cogitative Instincts",
        description: "Enemy units that are set up on the battlefield as Reinforcements cannot be set up within 12\" horizontally of this model.",
      },
    ],
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

  {
    id: "thulia-ghuld",
    name: "Thulia Ghuld",
    faction: "adeptus-mechanicus",
    image: "",
    points: 210,
    canAttachTo: [],
    keywords: ["SUPREME COMMANDER"],
    defaultWargear: [
      { id: "jericho-titanic-impact", name: "Jericho-class conversion resonator – titanic impact", image: "", profiles: [{ range: '24"', attacks: "2", skill: "2+", strength: "12", ap: "-3", damage: "D6+2", keywords: ["DEVASTATING WOUNDS"] }] },
      { id: "jericho-shockwave", name: "Jericho-class conversion resonator – shockwave", image: "", profiles: [{ range: '24"', attacks: "D6+2", skill: "2+", strength: "6", ap: "-2", damage: "1", keywords: ["BLAST", "SUSTAINED HITS 1"] }] },
      { id: "rod-of-the-war-forge-strike", name: "Rod of the War Forge – strike", image: "", profiles: [{ range: "Melee", attacks: "6", skill: "2+", strength: "10", ap: "-2", damage: "3" }] },
      { id: "rod-of-the-war-forge-sweep", name: "Rod of the War Forge – sweep", image: "", profiles: [{ range: "Melee", attacks: "12", skill: "2+", strength: "6", ap: "-1", damage: "1" }] },
    ],
    wargear: [],
    abilities: [
      {
        name: "Mechanicus Bodyguard",
        description: "While this model is within 3\" of one or more other friendly ADEPTUS MECHANICUS units, this model has the Lone Operative ability.",
      },
      {
        name: "Cybernetic Augmentation",
        description: "This model can move through terrain features, but cannot end a move within a wall, a floor, etc. This model can be set up or end a move on any floor level of RUINS, but if that level is not the ground floor, it can only do so if its base does not overhang the floor at that level.",
      },
      {
        name: "Secutor of Olympus",
        description: "At the start of your Shooting phase, select one enemy VEHICLE unit within 12\" of this model and roll one D6: on a 2+, that enemy unit suffers D3+1 mortal wounds.",
      },
      {
        name: "Rod of the War Forge",
        description: "In your Command phase, select one of the following Icon of War abilities. Until the start of your next Command phase, this model has that ability.",
      },
      {
        name: "Icon of War – Fanatical Devotion",
        description: "You can select one friendly SKITARII or THULIA GHULD unit within 6\" of this model; until the start of your next Command phase, that unit is eligible to shoot and declare a charge in a turn in which it Advanced.",
      },
      {
        name: "Icon of War – Adaptive Tactics",
        description: "You can select one friendly SKITARII or THULIA GHULD unit within 6\" of this model; until the start of your next Command phase, that unit is eligible to shoot and declare a charge in a turn in which it Fell Back.",
      },
      {
        name: "Icon of War – The Fires of Mars",
        description: "You can select one friendly SKITARII or THULIA GHULD unit within 6\" of this model; until the start of your next Command phase, the Conqueror Imperative and Protector Imperative are both active for that unit.",
      },
    ],
  },

];
