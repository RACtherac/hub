import type { Character } from "../../../src/types/warhammer";

export const drukhariCharacters: Character[] = [

  {
    id: "archon",
    name: "Archon",
    faction: "drukhari",
    image: "",
    points: 80,
    modelCountOptions: [1],
    pointsByModelCount: { 1: 80 },
    canAttachTo: ["hand-of-the-archon", "incubi", "kabalite-warriors"],
    defaultWargear: [
      { id: "archon-splinter-pistol", name: "Splinter pistol", image: "", profiles: [{ range: '12"', attacks: "1", skill: "2+", strength: "2", ap: "0", damage: "1", keywords: ["ANTI-INFANTRY 3+", "ASSAULT", "PISTOL"] }] },
      { id: "archon-huskblade", name: "Huskblade", image: "", profiles: [{ range: "Melee", attacks: "4", skill: "2+", strength: "3", ap: "-2", damage: "3", keywords: ["DEVASTATING WOUNDS"] }] },
    ],
    wargear: [
      { id: "archon-blast-pistol", name: "Blast pistol", image: "", wargearGroup: "archon-ranged", profiles: [{ range: '6"', attacks: "1", skill: "2+", strength: "8", ap: "-3", damage: "D3", keywords: ["PISTOL"] }] },
      { id: "archon-soul-trap", name: "Soul trap", image: "", wargearGroup: "archon-ranged", note: "Soul Trap: Add 1 to the Attacks and Strength characteristics of the bearer's melee weapons. The first time the bearer makes a melee attack that destroys an enemy model, after all the bearer's attacks have been resolved, until the end of the battle, add an additional 1 to the Attacks and Strength characteristics of the bearer's melee weapons." },
      { id: "archon-agoniser", name: "Agoniser", image: "", wargearGroup: "archon-melee", profiles: [{ range: "Melee", attacks: "6", skill: "2+", strength: "3", ap: "-2", damage: "1", keywords: ["ANTI-INFANTRY 3+"] }] },
      { id: "archon-master-crafted-power-weapon", name: "Master-crafted power weapon", image: "", wargearGroup: "archon-melee", profiles: [{ range: "Melee", attacks: "5", skill: "2+", strength: "4", ap: "-2", damage: "2" }] },
      { id: "archon-shadowfield", name: "Shadowfield", image: "", note: "Shadowfield: You cannot re-roll invulnerable saving throws made for the bearer. The first time an invulnerable saving throw made for the bearer is failed, until the end of the battle, the bearer has no invulnerable save." },
    ],
    wargearGroups: [
      ["archon-splinter-pistol", "archon-blast-pistol", "archon-soul-trap"],
      ["archon-huskblade", "archon-agoniser", "archon-master-crafted-power-weapon"],
    ],
    abilities: [
      {
        name: "Hatred Eternal (Pain)",
        description: "In your Shooting phase or the Fight phase, when you select this model's unit to shoot or fight, you can spend 1 Pain token to Empower that unit. While that unit is Empowered, each time a model in that unit makes an attack, you can re-roll the Hit roll.",
      },
      {
        name: "Overlord",
        description: "Once per battle, at the start of any phase, you can select one friendly DRUKHARI unit that is Battle-shocked and within 12\" of this model. That unit is no longer Battle-shocked.",
      },
      {
        name: "Devious Mastermind",
        description: "Once per battle round, one model from your army with this ability can use it when its unit is targeted with a Stratagem. If it does, reduce the CP cost of that use of that Stratagem by 1CP.",
      },
    ],
  },

  {
    id: "death-jester",
    name: "Death Jester",
    faction: "drukhari",
    image: "",
    points: 90,
    canAttachTo: [],
    defaultWargear: [
      { id: "shrieker-cannon", name: "Shrieker cannon", image: "", profiles: [{ range: '24"', attacks: "4", skill: "3+", strength: "7", ap: "-2", damage: "2", keywords: ["ASSAULT"] }] },
      { id: "jester-s-blade", name: "Jester's blade", image: "", profiles: [{ range: "Melee", attacks: "4", skill: "3+", strength: "4", ap: "-1", damage: "1" }] },
    ],
    wargear: [],
  },

  {
    id: "drazhar",
    name: "Drazhar",
    faction: "drukhari",
    image: "",
    points: 85,
    modelCountOptions: [1],
    pointsByModelCount: { 1: 85 },
    canAttachTo: ["incubi"],
    defaultWargear: [
      { id: "executioners-demiklaives-single-blade", name: "Executioner's demiklaives – single blade", image: "", profiles: [{ range: "Melee", attacks: "6", skill: "2+", strength: "6", ap: "-2", damage: "3", keywords: ["DEVASTATING WOUNDS"] }] },
      { id: "executioners-demiklaives-dual-blades", name: "Executioner's demiklaives – dual blades", image: "", profiles: [{ range: "Melee", attacks: "8", skill: "2+", strength: "5", ap: "-2", damage: "2", keywords: ["DEVASTATING WOUNDS"] }] },
    ],
    wargear: [],
    abilities: [
      {
        name: "Master of Blades (Pain)",
        description: "In the Fight phase, when you select this model's unit to fight, you can spend 1 Pain token to Empower that unit. While that unit is Empowered, each time a model in that unit makes a melee attack, add 1 to the Wound roll.",
      },
      {
        name: "Onslaught",
        description: "While this model is leading a unit, each time a model in that unit makes a Pile-in or Consolidation move, it can move up to 6\" instead of up to 3\".",
      },
      {
        name: "Silent Executioner",
        description: "Each time this model makes an attack that targets a unit that is below its Starting Strength, you can re-roll the Hit roll. If that target is Below Half-strength, you can re-roll the Wound roll as well.",
      },
    ],
  },

  {
    id: "khaarseth",
    name: "Khaarseth",
    faction: "drukhari",
    image: "",
    points: 95,
    modelCountOptions: [1],
    pointsByModelCount: { 1: 95 },
    canAttachTo: ["corsair-voidreavers", "corsair-voidscarred"],
    defaultWargear: [
      { id: "khaarseth-dread-of-the-deep-void", name: "Dread of the Deep Void", image: "", profiles: [{ range: '24"', attacks: "D6+2", skill: "3+", strength: "3", ap: "-2", damage: "1", keywords: ["ANTI-INFANTRY 2+", "BLAST", "HAZARDOUS", "IGNORES COVER", "PSYCHIC"] }] },
      { id: "khaarseth-waystave", name: "Waystave", image: "", profiles: [{ range: "Melee", attacks: "3", skill: "2+", strength: "3", ap: "0", damage: "3", keywords: ["ANTI-INFANTRY 2+", "PSYCHIC"] }] },
    ],
    wargear: [],
    abilities: [
      {
        name: "Aethersense (Psychic)",
        description: "Enemy units that are set up on the battlefield from Reserves cannot be set up within 12\" of this model.",
      },
      {
        name: "Fury of the Void (Psychic)",
        description: "In your Shooting phase, after this model's unit has shot, select one enemy unit hit by one or more attacks made with this model's Dread of the Deep Void. Until the end of the turn, that unit is riven. Each time an AELDARI model from your army makes an attack that targets a riven unit, add 1 to the Strength characteristic of that attack.",
      },
    ],
  },

  {
    id: "haemonculus",
    name: "Haemonculus",
    faction: "drukhari",
    image: "",
    points: 60,
    canAttachTo: ["wracks"],
    defaultWargear: [
      { id: "stinger-pistol", name: "Stinger pistol", image: "", profiles: [{ range: '12"', attacks: "1", skill: "2+", strength: "2", ap: "-1", damage: "D3", keywords: ["ANTI-INFANTRY 2+", "PISTOL", "PRECISION"] }] },
      { id: "haemonculus-tools-and-scissorhands", name: "Haemonculus tools and scissorhands", image: "", profiles: [{ range: "Melee", attacks: "5", skill: "2+", strength: "3", ap: "-1", damage: "D3", keywords: ["ANTI-INFANTRY 2+", "PRECISION"] }] },
    ],
    abilities: [
      {
        name: "Fleshcraft (Pain)",
        description: "In your Command phase, you can spend 1 Pain token to Empower this model's unit. Each time you do, you can return up to D3+1 destroyed Bodyguard models to that unit.",
      },
      {
        name: "Fear Incarnate (Aura)",
        description: "While an enemy unit is within 6\" of this model, worsen the Leadership characteristic of models in that unit by 1. In addition, in the Battle-shock step of your opponent's Command phase, if such an enemy unit is below its Starting Strength, it must take a Battle-shock test.",
      },
      {
        name: "Pain Adept",
        description: "In your Command phase, if one or more models from your army with this ability are on the battlefield, roll one D6: on a 4+, you gain 1 Pain token.",
      },
    ],
    wargear: [],
  },

  {
    id: "lelith-hesperax",
    name: "Lelith Hesperax",
    faction: "drukhari",
    image: "",
    points: 85,
    canAttachTo: ["wyches"],
    defaultWargear: [
      { id: "lelith-s-blades", name: "Lelith's blades", image: "", profiles: [{ range: "Melee", attacks: "8", skill: "2+", strength: "3", ap: "-2", damage: "1", keywords: ["ANTI-INFANTRY 2+", "PRECISION", "SUSTAINED HITS 2"] }] },
    ],
    abilities: [
      {
        name: "Brides of Death (Pain)",
        description: "In the Fight phase, when you select this model's unit to fight, you can spend 1 Pain token to Empower that unit. While that unit is Empowered, each time a model in that unit makes a melee attack, improve the Strength and Armour Penetration characteristics of that attack by 1.",
      },
      {
        name: "Blur of Blades",
        description: "While this model is leading a unit, models in that unit have the Fights First ability.",
      },
      {
        name: "Thrilling Spectacle",
        description: "Once per battle, at the start of the Fight phase, this model can use this ability. If it does, until the end of the phase, this model has a 3+ invulnerable save and change the Attacks characteristic of melee weapons equipped by this model to 12.",
      },
    ],
    wargear: [],
  },

  {
    id: "lady-malys",
    name: "Lady Malys",
    faction: "drukhari",
    image: "",
    points: 100,
    canAttachTo: ["hand-of-the-archon", "incubi", "kabalite-warriors"],
    defaultWargear: [
      { id: "lady-s-blade", name: "Lady's Blade", image: "", profiles: [{ range: "Melee", attacks: "6", skill: "2+", strength: "5", ap: "-3", damage: "3", keywords: ["DEVASTATING WOUNDS", "HAZARDOUS"] }] },
      { id: "razor-fan", name: "Razor fan", image: "", profiles: [{ range: "Melee", attacks: "6", skill: "2+", strength: "3", ap: "0", damage: "1", keywords: ["EXTRA ATTACKS"] }] },
    ],
    abilities: [
      {
        name: "Archon of the Poisoned Tongue (Pain)",
        description: "In your Shooting phase or the Fight phase, when you select this model's unit to shoot or fight, you can spend 1 Pain token to Empower that unit. If you do, select one of the following abilities: [SUSTAINED HITS 1]; [LETHAL HITS]. Until the end of the phase, while that unit is Empowered, weapons equipped by models in that unit have that selected ability.",
      },
      {
        name: "Precognisant",
        description: "If your army includes this model, after both players have deployed their armies, select up to three DRUKHARI units from your army and redeploy them. When doing so, you can set those units up in Strategic Reserves if you wish, regardless of how many units are already in Strategic Reserves.",
      },
      {
        name: "Mind Like a Steel Trap (Aura)",
        description: "Each time your opponent targets a unit from their army with a Stratagem, if that unit is within 12\" of this model, increase the cost of that use of that Stratagem by 1CP.",
      },
    ],
    wargear: [],
  },

  {
    id: "shadowseer",
    name: "Shadowseer",
    faction: "drukhari",
    image: "",
    points: 60,
    canAttachTo: [],
    defaultWargear: [
      { id: "shuriken-pistol", name: "Shuriken pistol", image: "", profiles: [{ range: '12"', attacks: "2", skill: "3+", strength: "4", ap: "-1", damage: "1", keywords: ["PISTOL"] }] },
      { id: "miststave", name: "Miststave", image: "", profiles: [{ range: "Melee", attacks: "4", skill: "3+", strength: "4", ap: "-1", damage: "D3", keywords: ["PSYCHIC"] }] },
    ],
    wargear: [
      { id: "neuro-disruptor", name: "Neuro disruptor", image: "", profiles: [{ range: '12"', attacks: "1", skill: "3+", strength: "6", ap: "-3", damage: "1", keywords: ["PISTOL"] }] },
    ],
  },

  {
    id: "solitaire",
    name: "Solitaire",
    faction: "drukhari",
    image: "",
    points: 115,
    canAttachTo: [],
    defaultWargear: [
      { id: "solitaire-weapons", name: "Solitaire weapons", image: "", profiles: [{ range: "Melee", attacks: "8", skill: "2+", strength: "5", ap: "-2", damage: "2" }] },
    ],
    wargear: [],
  },

  {
    id: "succubus",
    name: "Succubus",
    faction: "drukhari",
    image: "",
    points: 50,
    modelCountOptions: [1],
    pointsByModelCount: { 1: 50 },
    canAttachTo: ["wyches"],
    defaultWargear: [
      { id: "succubus-archite-glaive-and-agoniser", name: "Archite glaive and agoniser", image: "", profiles: [{ range: "Melee", attacks: "7", skill: "2+", strength: "3", ap: "-2", damage: "1", keywords: ["ANTI-INFANTRY 3+", "PRECISION"] }] },
    ],
    wargear: [
      { id: "succubus-blast-pistol", name: "Blast pistol", image: "", profiles: [{ range: '6"', attacks: "1", skill: "3+", strength: "8", ap: "-4", damage: "D3", keywords: ["MELTA 2", "PISTOL"] }] },
      { id: "succubus-splinter-pistol", name: "Splinter pistol", image: "", profiles: [{ range: '12"', attacks: "2", skill: "3+", strength: "2", ap: "0", damage: "1", keywords: ["PISTOL", "RAPID FIRE 1"] }] },
    ],
    wargearGroups: [
      ["succubus-blast-pistol", "succubus-splinter-pistol"],
    ],
    abilities: [
      {
        name: "Lithe Agility (Pain)",
        description: "In your Movement phase when you select this model's unit to Advance, or in your Charge phase before you make a Charge roll for this model's unit, you can spend 1 Pain token to Empower that unit. While that unit is Empowered, you can re-roll Advance and Charge rolls made for that unit.",
      },
      {
        name: "Storm of Blades",
        description: "While this model is leading a unit, melee weapons equipped by models in that unit have the [SUSTAINED HITS 1] ability.",
      },
      {
        name: "Bloody Spectacle",
        description: "Each time this model makes a melee attack that targets a CHARACTER unit, you can re-roll the Hit roll and you can re-roll the Wound roll. Each time this model's unit destroys a CHARACTER model, you gain 1CP.",
      },
    ],
  },

  {
    id: "troupe-master",
    name: "Troupe Master",
    faction: "drukhari",
    image: "",
    points: 75,
    canAttachTo: [],
    defaultWargear: [
      { id: "shuriken-pistol", name: "Shuriken pistol", image: "", profiles: [{ range: '12"', attacks: "2", skill: "3+", strength: "4", ap: "-1", damage: "1", keywords: ["PISTOL"] }] },
      { id: "troupe-master-s-blade", name: "Troupe Master's blade", image: "", profiles: [{ range: "Melee", attacks: "5", skill: "3+", strength: "4", ap: "-2", damage: "1" }] },
    ],
    wargear: [
      { id: "fusion-pistol", name: "Fusion pistol", image: "", profiles: [{ range: '6"', attacks: "1", skill: "3+", strength: "9", ap: "-4", damage: "D6", keywords: ["MELTA 3", "PISTOL"] }] },
      { id: "neuro-disruptor", name: "Neuro disruptor", image: "", profiles: [{ range: '12"', attacks: "1", skill: "3+", strength: "6", ap: "-3", damage: "1", keywords: ["PISTOL"] }] },
    ],
  },

  {
    id: "urien-rakarth",
    name: "Urien Rakarth",
    faction: "drukhari",
    image: "",
    points: 80,
    canAttachTo: [],
    defaultWargear: [
      { id: "casket-of-flensing", name: "Casket of Flensing", image: "", profiles: [{ range: '12"', attacks: "D6", skill: "N/A", strength: "3", ap: "0", damage: "1", keywords: ["IGNORES COVER", "TORRENT"] }] },
      { id: "haemonculus-tools-and-scissorhands", name: "Haemonculus tools and scissorhands", image: "", profiles: [{ range: "Melee", attacks: "4", skill: "3+", strength: "4", ap: "-1", damage: "1", keywords: ["SUSTAINED HITS 1"] }] },
    ],
    wargear: [],
  },

];
