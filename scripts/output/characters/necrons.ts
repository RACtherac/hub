import type { Character } from "../../../src/types/warhammer";

export const necronsCharacters: Character[] = [

  {
    id: "illuminor-szeras",
    name: "Illuminor Szeras",
    faction: "necrons",
    image: "",
    points: 165,
    canAttachTo: [],
    defaultWargear: [
      {
        id: "eldritch-lance-ranged",
        name: "Eldritch lance",
        image: "",
        profiles: [{ profileName: "Ranged", range: '36"', attacks: "3", skill: "3+", strength: "9", ap: "-3", damage: "3" }],
      },
      {
        id: "eldritch-lance-melee",
        name: "Eldritch lance",
        image: "",
        profiles: [{ profileName: "Melee", range: "Melee", attacks: "4", skill: "3+", strength: "9", ap: "-3", damage: "3" }],
      },
      {
        id: "impaling-legs",
        name: "Impaling legs",
        image: "",
        profiles: [{ range: "Melee", attacks: "4", skill: "3+", strength: "6", ap: "-1", damage: "1", keywords: ["EXTRA ATTACKS"] }],
      },
    ],
    wargear: [],
    abilities: [
      {
        name: "Illuminor",
        description: "While this model is within 3\" of one or more other friendly NECRONS units, this model has the Lone Operative ability.",
      },
      {
        name: "Mechanical Augmentation (Aura)",
        description: "While a friendly NECRONS BATTLELINE unit is within 3\" of this model, each time a model in that unit makes an attack, improve the Armour Penetration characteristic of that attack by 1, and each time an attack targets that unit, worsen the Armour Penetration characteristic of that attack by 1.",
      },
      {
        name: "Atomic Energy Manipulator",
        description: "At the end of the Fight phase, if this model destroyed one or more models this phase, until the end of the battle, add 3\" to the range of its Mechanical Augmentation ability to a max of 12\".",
      },
    ],
  },

  {
    id: "anrakyr-the-traveller",
    name: "Anrakyr The Traveller",
    faction: "necrons",
    image: "",
    points: 95,
    canAttachTo: [],
    defaultWargear: [
      { id: "tachyon-arrow", name: "Tachyon arrow", image: "", profiles: [{ range: '120"', attacks: "1", skill: "2+", strength: "16", ap: "-5", damage: "D6+6" }] },
      { id: "warscythe", name: "Warscythe", image: "", profiles: [{ range: "Melee", attacks: "4", skill: "2+", strength: "8", ap: "-4", damage: "2" }] },
    ],
    wargear: [],
  },

  {
    id: "c-tan-shard-of-the-deceiver",
    name: "C Tan Shard Of The Deceiver",
    faction: "necrons",
    image: "",
    points: 265,
    canAttachTo: [],
    defaultWargear: [
      { id: "cosmic-insanity", name: "Cosmic insanity", image: "", profiles: [{ range: '12"', attacks: "D6", skill: "N/A", strength: "4", ap: "-1", damage: "D3", keywords: ["IGNORES COVER", "TORRENT"] }] },
      { id: "golden-fists", name: "Golden fists", image: "", profiles: [{ range: "Melee", attacks: "6", skill: "3+", strength: "10", ap: "-3", damage: "3" }] },
    ],
    wargear: [],
  },

  {
    id: "c-tan-shard-of-the-nightbringer",
    name: "C Tan Shard Of The Nightbringer",
    faction: "necrons",
    image: "",
    points: 340,
    canAttachTo: [],
    keywords: ["ENSLAVED STAR GOD"],
    defaultWargear: [
      { id: "gaze-of-death", name: "Gaze of death", image: "", profiles: [{ range: '18"', attacks: "D3", skill: "2+", strength: "12", ap: "-3", damage: "D6+3" }] },
      { id: "scythe-of-the-nightbringer-strike", name: "Scythe of the Nightbringer – strike", image: "", profiles: [{ range: "Melee", attacks: "6", skill: "2+", strength: "14", ap: "-4", damage: "D6+2", keywords: ["DEVASTATING WOUNDS"] }] },
      { id: "scythe-of-the-nightbringer-sweep", name: "Scythe of the Nightbringer – sweep", image: "", profiles: [{ range: "Melee", attacks: "14", skill: "2+", strength: "8", ap: "-2", damage: "2" }] },
    ],
    wargear: [],
    abilities: [
      {
        name: "Enslaved Star God",
        description: "This model cannot be your WARLORD.",
      },
      {
        name: "Drain Life",
        description: "At the end of the Fight phase, roll one D6 for each enemy unit within 6\" of this model: on a 4+, that enemy unit suffers D3 mortal wounds.",
      },
      {
        name: "Necrodermis",
        description: "Each time an attack is allocated to this model, subtract 1 from the Damage characteristic of that attack.",
      },
    ],
  },

  {
    id: "c-tan-shard-of-the-void-dragon",
    name: "C Tan Shard Of The Void Dragon",
    faction: "necrons",
    image: "",
    points: 330,
    canAttachTo: [],
    keywords: ["ENSLAVED STAR GOD"],
    defaultWargear: [
      { id: "vd-spear-ranged", name: "Spear of the Void Dragon", image: "", profiles: [{ range: '12"', attacks: "D3", skill: "2+", strength: "8", ap: "-3", damage: "D6+2", keywords: ["ANTI-VEHICLE 2+"] }] },
      { id: "voltaic-storm", name: "Voltaic storm", image: "", profiles: [{ range: '18"', attacks: "D6+3", skill: "2+", strength: "7", ap: "-1", damage: "2", keywords: ["BLAST", "SUSTAINED HITS 2"] }] },
      { id: "vd-spear-strike", name: "Spear of the Void Dragon – strike", image: "", profiles: [{ range: "Melee", attacks: "5", skill: "2+", strength: "12", ap: "-4", damage: "D6+2", keywords: ["ANTI-VEHICLE 2+"] }] },
      { id: "vd-spear-sweep", name: "Spear of the Void Dragon – sweep", image: "", profiles: [{ range: "Melee", attacks: "10", skill: "2+", strength: "8", ap: "-1", damage: "2" }] },
      { id: "canoptek-tail-blades", name: "Canoptek tail blades", image: "", profiles: [{ range: "Melee", attacks: "6", skill: "2+", strength: "6", ap: "-1", damage: "1", keywords: ["EXTRA ATTACKS"] }] },
    ],
    wargear: [],
    abilities: [
      {
        name: "Enslaved Star God",
        description: "This model cannot be your WARLORD.",
      },
      {
        name: "Matter Absorption",
        description: "At the start of your Shooting phase, select one enemy VEHICLE unit within 12\" of this model and roll one D6: on a 2+, that enemy unit suffers D3 mortal wounds and this model regains up to that many lost wounds.",
      },
      {
        name: "Necrodermis",
        description: "Each time an attack is allocated to this model, subtract 1 from the Damage characteristic of that attack.",
      },
    ],
  },

  {
    id: "catacomb-command-barge",
    name: "Catacomb Command Barge",
    faction: "necrons",
    image: "",
    points: 120,
    canAttachTo: [],
    defaultWargear: [
      { id: "gauss-cannon", name: "Gauss cannon", image: "", profiles: [{ range: '24"', attacks: "3", skill: "3+", strength: "6", ap: "-2", damage: "2" }] },
      { id: "staff-of-light", name: "Staff of light", image: "", profiles: [{ range: '18"', attacks: "3", skill: "3+", strength: "5", ap: "-2", damage: "1", keywords: ["ASSAULT"] }] },
    ],
    wargear: [
      { id: "tesla-cannon", name: "Tesla cannon", image: "", profiles: [{ range: '24"', attacks: "4", skill: "3+", strength: "7", ap: "0", damage: "1", keywords: ["SUSTAINED HITS 2"] }] },
      { id: "overlord-s-blade", name: "Overlord's blade", image: "", profiles: [{ range: "Melee", attacks: "5", skill: "2+", strength: "6", ap: "-3", damage: "2" }] },
    ],
  },

  {
    id: "chronomancer",
    name: "Chronomancer",
    faction: "necrons",
    image: "",
    points: 65,
    canAttachTo: [],
    defaultWargear: [
      { id: "aeonstave", name: "Aeonstave", image: "", profiles: [{ range: '18"', attacks: "1", skill: "3+", strength: "5", ap: "-2", damage: "D3", keywords: ["ASSAULT"] }] },
    ],
    wargear: [],
  },

  {
    id: "hexmark-destroyer",
    name: "Hexmark Destroyer",
    faction: "necrons",
    image: "",
    points: 75,
    canAttachTo: [],
    defaultWargear: [
      { id: "enmitic-disintegrator-pistols", name: "Enmitic disintegrator pistols", image: "", profiles: [{ range: '12"', attacks: "6", skill: "3+", strength: "5", ap: "-1", damage: "1", keywords: ["PISTOL"] }] },
      { id: "close-combat-weapon", name: "Close combat weapon", image: "", profiles: [{ range: "Melee", attacks: "3", skill: "3+", strength: "4", ap: "0", damage: "1" }] },
    ],
    wargear: [],
  },

  {
    id: "illuminor-szeras",
    name: "Illuminor Szeras",
    faction: "necrons",
    image: "",
    points: 175,
    canAttachTo: [],
    defaultWargear: [
      { id: "eldritch-lance", name: "Eldritch lance", image: "", profiles: [{ range: '36"', attacks: "2", skill: "3+", strength: "12", ap: "-4", damage: "D6" }] },
      { id: "impaling-legs", name: "Impaling legs", image: "", profiles: [{ range: "Melee", attacks: "4", skill: "3+", strength: "6", ap: "-1", damage: "2" }] },
    ],
    wargear: [],
  },

  {
    id: "imotekh-the-stormlord",
    name: "Imotekh The Stormlord",
    faction: "necrons",
    image: "",
    points: 100,
    canAttachTo: [],
    defaultWargear: [
      { id: "gauntlet-of-fire", name: "Gauntlet of Fire", image: "", profiles: [{ range: '12"', attacks: "D6", skill: "N/A", strength: "4", ap: "-1", damage: "1", keywords: ["IGNORES COVER", "TORRENT"] }] },
      { id: "staff-of-the-destroyer", name: "Staff of the Destroyer", image: "", profiles: [{ range: "Melee", attacks: "6", skill: "2+", strength: "8", ap: "-3", damage: "3" }] },
    ],
    wargear: [],
  },

  {
    id: "lokhust-lord",
    name: "Lokhust Lord",
    faction: "necrons",
    image: "",
    points: 80,
    canAttachTo: [],
    defaultWargear: [
      { id: "staff-of-light", name: "Staff of light", image: "", profiles: [{ range: '18"', attacks: "3", skill: "3+", strength: "5", ap: "-2", damage: "1", keywords: ["ASSAULT"] }] },
    ],
    wargear: [],
  },

  {
    id: "lord",
    name: "Lord",
    faction: "necrons",
    image: "",
    points: 65,
    canAttachTo: [],
    defaultWargear: [
      { id: "staff-of-light", name: "Staff of light", image: "", profiles: [{ range: '18"', attacks: "3", skill: "3+", strength: "5", ap: "-2", damage: "1", keywords: ["ASSAULT"] }] },
    ],
    wargear: [
      { id: "lord-s-blade", name: "Lord's blade", image: "", profiles: [{ range: "Melee", attacks: "4", skill: "2+", strength: "5", ap: "-3", damage: "2" }] },
    ],
  },

  {
    id: "nemesor-zahndrekh",
    name: "Nemesor Zahndrekh",
    faction: "necrons",
    image: "",
    points: 85,
    canAttachTo: [],
    defaultWargear: [
      { id: "staff-of-light", name: "Staff of light", image: "", profiles: [{ range: '18"', attacks: "3", skill: "3+", strength: "5", ap: "-2", damage: "1", keywords: ["ASSAULT"] }] },
    ],
    wargear: [],
  },

  {
    id: "orikan-the-diviner",
    name: "Orikan The Diviner",
    faction: "necrons",
    image: "",
    points: 80,
    canAttachTo: [],
    defaultWargear: [
      { id: "staff-of-tomorrow", name: "Staff of Tomorrow", image: "", profiles: [{ range: "Melee", attacks: "4", skill: "2+", strength: "6", ap: "-2", damage: "D3" }] },
    ],
    wargear: [],
  },

  {
    id: "overlord",
    name: "Overlord",
    faction: "necrons",
    image: "",
    points: 85,
    canAttachTo: [],
    defaultWargear: [
      { id: "tachyon-arrow", name: "Tachyon arrow", image: "", profiles: [{ range: '120"', attacks: "1", skill: "2+", strength: "16", ap: "-5", damage: "D6+6" }] },
      { id: "overlord-s-blade", name: "Overlord's blade", image: "", profiles: [{ range: "Melee", attacks: "5", skill: "2+", strength: "6", ap: "-3", damage: "2" }] },
    ],
    wargear: [
      { id: "staff-of-light", name: "Staff of light", image: "", profiles: [{ range: '18"', attacks: "3", skill: "3+", strength: "5", ap: "-2", damage: "1", keywords: ["ASSAULT"] }] },
      { id: "voidscythe", name: "Voidscythe", image: "", profiles: [{ range: "Melee", attacks: "3", skill: "2+", strength: "10", ap: "-4", damage: "D6" }] },
    ],
  },

  {
    id: "overlord-with-translocation-shroud",
    name: "Overlord With Translocation Shroud",
    faction: "necrons",
    image: "",
    points: 85,
    canAttachTo: ["immortals", "lychguard", "necron-warriors"],
    defaultWargear: [
      { id: "ots-overlords-blade", name: "Overlord's blade", image: "", profiles: [{ range: "Melee", attacks: "4", skill: "2+", strength: "8", ap: "-3", damage: "2", keywords: ["DEVASTATING WOUNDS"] }] },
    ],
    wargear: [
      { id: "resurrection-orb", name: "Resurrection Orb", image: "", note: "Once per battle, while the bearer is leading a unit, at the end of any phase, it can resurrect that unit if it is on the battlefield. When you do, that unit's Reanimation Protocols are activated, reanimating D6 wounds rather than D3 when doing so. You cannot resurrect more than one unit per turn." },
    ],
    abilities: [
      {
        name: "My Will Be Done",
        description: "Once per battle round, one unit from your army with this ability can use it when its unit is targeted with a Stratagem. If it does, reduce the CP cost of that use of that Stratagem by 1CP.",
      },
      {
        name: "Translocation Shroud",
        description: "Each time this model's unit Advances, do not make an Advance roll for it. Instead, until the end of the phase, add 6\" to the Move characteristic of models in that unit. In addition, each time a model in that unit makes a Normal, Advance or Fall Back move, until that move is finished, it can move horizontally through models and terrain features (it cannot finish a move on top of another model or its base).",
      },
    ],
  },

  {
    id: "plasmancer",
    name: "Plasmancer",
    faction: "necrons",
    image: "",
    points: 60,
    canAttachTo: [],
    defaultWargear: [
      { id: "plasmic-lance", name: "Plasmic lance", image: "", profiles: [{ range: '18"', attacks: "D3", skill: "3+", strength: "6", ap: "-2", damage: "2", keywords: ["ASSAULT"] }] },
    ],
    wargear: [],
  },

  {
    id: "psychomancer",
    name: "Psychomancer",
    faction: "necrons",
    image: "",
    points: 55,
    canAttachTo: ["immortals", "necron-warriors"],
    defaultWargear: [
      { id: "abyssal-lance-ranged", name: "Abyssal lance", image: "", profiles: [{ profileName: "Ranged", range: '18"', attacks: "1", skill: "4+", strength: "6", ap: "-3", damage: "3" }] },
      { id: "abyssal-lance-melee", name: "Abyssal lance", image: "", profiles: [{ profileName: "Melee", range: "Melee", attacks: "1", skill: "4+", strength: "6", ap: "-3", damage: "3" }] },
    ],
    wargear: [],
    abilities: [
      {
        name: "Nightmare Shroud (Aura)",
        description: "In the Battle-Shock step of your opponent's Command phase, if an enemy unit that is below its Starting Strength is within 6\" of this model, that enemy unit must take a Battle-Shock test, subtracting 1 from the test when it does so.",
      },
      {
        name: "Harbinger of Despair",
        description: "Once per turn, at the start of your Command, Movement, Shooting, Charge or Fight phase, you can select one enemy unit within 18\" of this model. That unit must take a Battle-Shock test, subtracting 1 from the test when it does so.",
      },
    ],
  },

  {
    id: "royal-warden",
    name: "Royal Warden",
    faction: "necrons",
    image: "",
    points: 50,
    canAttachTo: [],
    defaultWargear: [
      { id: "relic-gauss-blaster", name: "Relic gauss blaster", image: "", profiles: [{ range: '24"', attacks: "3", skill: "2+", strength: "5", ap: "-2", damage: "2", keywords: ["RAPID FIRE 1"] }] },
      { id: "close-combat-weapon", name: "Close combat weapon", image: "", profiles: [{ range: "Melee", attacks: "3", skill: "3+", strength: "4", ap: "0", damage: "1" }] },
    ],
    wargear: [],
  },

  {
    id: "skorpekh-lord",
    name: "Skorpekh Lord",
    faction: "necrons",
    image: "",
    points: 90,
    canAttachTo: ["skorpekh-destroyers"],
    defaultWargear: [
      { id: "sl-enmitic-annihilator", name: "Enmitic annihilator", image: "", profiles: [{ range: '18"', attacks: "2", skill: "2+", strength: "6", ap: "-1", damage: "1", keywords: ["RAPID FIRE 2"] }] },
      { id: "sl-flensing-claw", name: "Flensing claw", image: "", profiles: [{ range: "Melee", attacks: "8", skill: "2+", strength: "6", ap: "-1", damage: "1" }] },
      { id: "sl-hyperphase-harvester", name: "Hyperphase harvester", image: "", profiles: [{ range: "Melee", attacks: "4", skill: "2+", strength: "10", ap: "-3", damage: "3" }] },
    ],
    wargear: [],
    abilities: [
      {
        name: "United In Destruction",
        description: "While this model is leading a unit, melee weapons equipped by models in that unit have the [LETHAL HITS] ability.",
      },
      {
        name: "Crimson Harvest",
        description: "Each time this model ends a Charge move, select one enemy unit within Engagement Range of this model and roll one D6: on a 2-5, that unit suffers D3 mortal wounds; on a 6, that unit suffers D3+3 mortal wounds.",
      },
    ],
  },

  {
    id: "technomancer",
    name: "Technomancer",
    faction: "necrons",
    image: "",
    points: 85,
    canAttachTo: [],
    defaultWargear: [
      { id: "staff-of-light", name: "Staff of light", image: "", profiles: [{ range: '18"', attacks: "3", skill: "3+", strength: "5", ap: "-2", damage: "1", keywords: ["ASSAULT"] }] },
    ],
    wargear: [],
  },

  {
    id: "transcendent-c-tan",
    name: "Transcendent C Tan",
    faction: "necrons",
    image: "",
    points: 295,
    canAttachTo: [],
    defaultWargear: [
      { id: "seismic-assault", name: "Seismic assault", image: "", profiles: [{ range: '18"', attacks: "D6+3", skill: "N/A", strength: "8", ap: "-2", damage: "2", keywords: ["IGNORES COVER", "TORRENT"] }] },
      { id: "crackling-tendrils", name: "Crackling tendrils", image: "", profiles: [{ range: "Melee", attacks: "6", skill: "3+", strength: "8", ap: "-3", damage: "3" }] },
    ],
    wargear: [],
  },

  {
    id: "trazyn-the-infinite",
    name: "Trazyn The Infinite",
    faction: "necrons",
    image: "",
    points: 75,
    canAttachTo: [],
    defaultWargear: [
      { id: "empathic-obliterator", name: "Empathic Obliterator", image: "", profiles: [{ range: "Melee", attacks: "4", skill: "2+", strength: "7", ap: "-3", damage: "2", keywords: ["ANTI-CHARACTER 4+"] }] },
    ],
    wargear: [],
  },

  {
    id: "vargard-obyron",
    name: "Vargard Obyron",
    faction: "necrons",
    image: "",
    points: 85,
    canAttachTo: [],
    defaultWargear: [
      { id: "warscythe", name: "Warscythe", image: "", profiles: [{ range: "Melee", attacks: "4", skill: "2+", strength: "8", ap: "-4", damage: "2" }] },
    ],
    wargear: [],
  },

  {
    id: "the-silent-king",
    name: "The Silent King",
    faction: "necrons",
    image: "",
    points: 400,
    canAttachTo: [],
    keywords: ["SUPREME COMMANDER"],
    defaultWargear: [
      { id: "annihilator-beam", name: "Annihilator beam", image: "", profiles: [{ range: '24"', attacks: "1", skill: "2+", strength: "14", ap: "-4", damage: "6" }] },
      { id: "sceptre-of-eternal-glory", name: "Sceptre of Eternal Glory", image: "", profiles: [{ range: '24"', attacks: "2", skill: "2+", strength: "10", ap: "-3", damage: "3", keywords: ["DEVASTATING WOUNDS"] }] },
      { id: "staff-of-stars", name: "Staff of Stars", image: "", profiles: [{ range: '24"', attacks: "12", skill: "2+", strength: "6", ap: "-1", damage: "1", keywords: ["INDIRECT FIRE"] }] },
      { id: "armoured-bulk", name: "Armoured bulk", image: "", profiles: [{ range: "Melee", attacks: "1", skill: "4+", strength: "4", ap: "0", damage: "1" }] },
      { id: "weapons-of-the-final-triarch", name: "Weapons of the Final Triarch", image: "", profiles: [{ range: "Melee", attacks: "12", skill: "2+", strength: "8", ap: "-3", damage: "2", keywords: ["LETHAL HITS"] }] },
    ],
    wargear: [],
    abilities: [
      {
        name: "Supreme Commander",
        description: "If this unit is in your army, it must be your Warlord.",
      },
      {
        name: "Voice of the Triarch",
        description: "At the start of the battle round, select one Triarch ability. Until the start of the next battle round, this unit has that ability.",
      },
      {
        name: "Triarch Ability – Phaeron of the Stars (Aura)",
        description: "While a friendly NECRONS unit (excluding MONSTER units) is within 6\" of this unit's Szarekh model, each time a model in that unit makes an attack, re-roll a Hit roll of 1 and re-roll a Wound roll of 1.",
      },
      {
        name: "Triarch Ability – Phaeron of the Blades (Aura)",
        description: "While a friendly NECRONS unit (excluding MONSTER units) is within 6\" of this unit's Szarekh model, you can re-roll Charge rolls made for that unit and each time a model in that unit makes a melee attack, add 1 to the Strength characteristic of that attack.",
      },
      {
        name: "Triarch Ability – Relentless March (Aura)",
        description: "While a friendly NECRONS unit (excluding MONSTER units) is within 6\" of this unit's Szarekh model, add 2\" to the Move characteristic of models in that unit.",
      },
      {
        name: "The Silent King",
        description: "While a friendly NECRONS unit is within 6\" of this unit's Szarekh model, improve that unit's Leadership characteristic by 1.",
      },
      {
        name: "Damaged: 1-6 Wounds Remaining",
        description: "While this unit's Szarekh model has 1-6 wounds remaining, halve the Attacks characteristic of that model's weapons, and each time this unit makes an attack, subtract 1 from the Hit roll.",
      },
      {
        name: "Triarchal Menhirs",
        description: "If this unit's Szarekh model is destroyed, all of this unit's remaining Triarchal Menhir models are also destroyed.",
      },
    ],
  },

];
