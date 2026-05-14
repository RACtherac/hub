import type { Character } from "../../../src/types/warhammer";

export const imperialAgentsCharacters: Character[] = [

  {
    id: "callidus-assassin",
    name: "Callidus Assassin",
    faction: "imperial-agents",
    image: "",
    points: 100,
    canAttachTo: [],
    defaultWargear: [
      { id: "neural-shredder", name: "Neural shredder", image: "", profiles: [{ range: '12"', attacks: "D6", skill: "N/A", strength: "5", ap: "-2", damage: "1", keywords: ["ANTI-INFANTRY 2+", "PRECISION", "TORRENT"] }] },
      { id: "phase-sword-and-poison-blades", name: "Phase sword and poison blades", image: "", profiles: [{ range: "Melee", attacks: "5", skill: "2+", strength: "5", ap: "-4", damage: "2", keywords: ["LETHAL HITS", "PRECISION"] }] },
    ],
    wargear: [],
    abilities: [
      {
        name: "Acrobatic Escape",
        description: "At the end of the Fight phase, if this model is within Engagement Range of one or more enemy units, it can make a Fall Back move of up to D6\". In addition, at the end of your opponent's turn, if this model is not within 3\" of one or more enemy units, you can remove it from the battlefield and then, in the Reinforcements step of your next Movement phase, set it up anywhere on the battlefield that is more than 9\" horizontally away from all enemy models. If the battle ends and this model is not on the battlefield, it is destroyed.",
      },
      {
        name: "Lord of Deceit (Aura)",
        description: "Each time your opponent targets a unit from their army with a Stratagem, if that unit is within 12\" of this model, increase the cost of that use of that Stratagem by 1CP.",
      },
    ],
  },

  {
    id: "culexus-assassin",
    name: "Culexus Assassin",
    faction: "imperial-agents",
    image: "",
    points: 85,
    canAttachTo: [],
    defaultWargear: [
      { id: "animus-speculum", name: "Animus speculum", image: "", profiles: [{ range: '24"', attacks: "3", skill: "2+", strength: "5", ap: "-2", damage: "D3", keywords: ["ANTI-PSYKER 2+", "ASSAULT", "PRECISION", "PSYCHIC ASSASSIN"] }] },
      { id: "life-draining-touch", name: "Life-draining touch", image: "", profiles: [{ range: "Melee", attacks: "4", skill: "2+", strength: "4", ap: "-2", damage: "2", keywords: ["ANTI-PSYKER 2+", "DEVASTATING WOUNDS", "PRECISION"] }] },
    ],
    wargear: [],
    abilities: [
      {
        name: "Psychic Assassin",
        description: "Each time you select a PSYKER unit as the target for this weapon, until those attacks are resolved, change the Attacks characteristic of this weapon to 6.",
      },
      {
        name: "Etheric Emergence",
        description: "In your Movement phase, when this model is set up on the battlefield using the Deep Strike ability, it can perform an etheric emergence. If it does, this model can be set up anywhere on the battlefield that is more than 6\" horizontally away from all enemy units, but until the end of the turn, it is not eligible to declare a charge.",
      },
      {
        name: "Abomination",
        description: "This model has the Feel No Pain 2+ ability against Psychic Attacks.",
      },
      {
        name: "Soulless Horror",
        description: "Once per battle, at the start of any Command phase, this model can use this ability. If it does, each enemy unit within 9\" of this model must take a Battle-shock test, subtracting 1 from that test (or subtracting 2 if that unit is a PSYKER).",
      },
    ],
  },

  {
    id: "eversor-assassin",
    name: "Eversor Assassin",
    faction: "imperial-agents",
    image: "/Warhammerimages/Imperial Agents/eversor assasin.png",
    points: 110,
    canAttachTo: [],
    defaultWargear: [
      { id: "executioner-pistol", name: "Executioner pistol", image: "", profiles: [{ range: '12"', attacks: "4", skill: "2+", strength: "4", ap: "0", damage: "1", keywords: ["ANTI-INFANTRY 3+", "PISTOL", "PRECISION", "SUSTAINED HITS 3"] }] },
      { id: "power-sword-and-neuro-gauntlet", name: "Power sword and neuro gauntlet", image: "", profiles: [{ range: "Melee", attacks: "6", skill: "2+", strength: "5", ap: "-2", damage: "2", keywords: ["ANTI-INFANTRY 3+", "PRECISION", "SUSTAINED HITS 3"] }] },
    ],
    wargear: [],
    abilities: [
      {
        name: "Frenzon",
        description: "This model is eligible to shoot and declare a charge in a turn in which it Advanced.",
      },
      {
        name: "Overkill",
        description: "Once per battle, in your Movement phase, this model can use this ability before it makes a Normal move. If it does, until the end of the turn, add 6\" to this model's Move characteristic and add 3 to the Attacks characteristic of this model's melee weapons.",
      },
    ],
  },

  {
    id: "inquisitor",
    name: "Inquisitor",
    faction: "imperial-agents",
    image: "",
    points: 55,
    canAttachTo: [],
    defaultWargear: [
      { id: "bolt-pistol", name: "Bolt pistol", image: "", profiles: [{ range: '12"', attacks: "1", skill: "3+", strength: "4", ap: "0", damage: "1", keywords: ["PISTOL"] }] },
      { id: "inquisitorial-melee-weapon", name: "Inquisitorial melee weapon", image: "", profiles: [{ range: "Melee", attacks: "4", skill: "3+", strength: "5", ap: "-2", damage: "1" }] },
    ],
    wargear: [
      { id: "combi-weapon", name: "Combi-weapon", image: "", profiles: [{ range: '24"', attacks: "2", skill: "3+", strength: "4", ap: "0", damage: "1", keywords: ["RAPID FIRE 1"] }] },
      { id: "psychic-shock-wave", name: "Psychic Shock Wave", image: "", profiles: [{ range: '18"', attacks: "D3", skill: "3+", strength: "5", ap: "-1", damage: "D3", keywords: ["PSYCHIC"] }] },
      { id: "force-weapon", name: "Force weapon", image: "", profiles: [{ range: "Melee", attacks: "3", skill: "3+", strength: "6", ap: "-1", damage: "D3", keywords: ["PSYCHIC"] }] },
    ],
  },

  {
    id: "inquisitor-coteaz",
    name: "Inquisitor Coteaz",
    faction: "imperial-agents",
    image: "",
    points: 75,
    canAttachTo: [],
    defaultWargear: [
      { id: "bolt-pistol", name: "Bolt pistol", image: "", profiles: [{ range: '12"', attacks: "1", skill: "3+", strength: "4", ap: "0", damage: "1", keywords: ["PISTOL"] }] },
      { id: "psychic-blast", name: "Psychic Blast", image: "", profiles: [{ range: '18"', attacks: "D3", skill: "3+", strength: "5", ap: "-1", damage: "D3", keywords: ["PSYCHIC"] }] },
      { id: "nemesis-daemon-hammer", name: "Nemesis daemon hammer", image: "", profiles: [{ range: "Melee", attacks: "3", skill: "4+", strength: "8", ap: "-2", damage: "2", keywords: ["DEVASTATING WOUNDS", "PSYCHIC"] }] },
    ],
    wargear: [],
  },

  {
    id: "inquisitor-draxus",
    name: "Inquisitor Draxus",
    faction: "imperial-agents",
    image: "",
    points: 110,
    canAttachTo: ["exaction-squad", "imperial-navy-breachers", "inquisitorial-agents", "subductor-squad", "vigilant-squad"],
    defaultWargear: [
      { id: "dirgesinger", name: "Dirgesinger", image: "", profiles: [{ range: '18"', attacks: "4", skill: "3+", strength: "4", ap: "0", damage: "2", keywords: ["ANTI-INFANTRY 4+", "ASSAULT", "DEVASTATING WOUNDS"] }] },
      { id: "psychic-tempest", name: "Psychic Tempest", image: "", profiles: [{ range: '18"', attacks: "6", skill: "3+", strength: "6", ap: "0", damage: "2", keywords: ["PSYCHIC", "SUSTAINED HITS 2"] }] },
      { id: "draxus-power-fist", name: "Power fist", image: "", profiles: [{ range: "Melee", attacks: "3", skill: "3+", strength: "6", ap: "-2", damage: "2" }] },
    ],
    wargear: [],
    abilities: [
      {
        name: "Authority of the Inquisition",
        description: "While this model is leading a unit, it can embark within any TRANSPORT that its Bodyguard unit can embark within.",
      },
      {
        name: "Xenos Hunter",
        description: "While this model is leading a unit, each time a model in that unit makes an attack that targets an enemy unit that does not have the IMPERIUM or CHAOS keywords, add 1 to the Hit roll.",
      },
      {
        name: "Psychic Veil (Psychic)",
        description: "In your Command phase, this PSYKER can use this ability. If it does, roll one D6: on a 1, this PSYKER's unit suffers D3 mortal wounds; on a 2+, until the start of your next Command phase, this PSYKER's unit can only be selected as the target of a ranged attack if the attacking model is within 18\".",
      },
    ],
  },

  {
    id: "inquisitor-eisenhorn",
    name: "Inquisitor Eisenhorn",
    faction: "imperial-agents",
    image: "",
    points: 65,
    canAttachTo: [],
    defaultWargear: [
      { id: "artificer-bolt-pistol", name: "Artificer bolt pistol", image: "", profiles: [{ range: '12"', attacks: "1", skill: "2+", strength: "4", ap: "-1", damage: "2", keywords: ["PISTOL"] }] },
      { id: "mind-assault", name: "Mind Assault", image: "", profiles: [{ range: '18"', attacks: "D3", skill: "3+", strength: "5", ap: "-1", damage: "D3", keywords: ["PSYCHIC"] }] },
      { id: "runestaff-and-barbarisater", name: "Runestaff and Barbarisater", image: "", profiles: [{ range: "Melee", attacks: "5", skill: "2+", strength: "5", ap: "-2", damage: "2", keywords: ["PSYCHIC"] }] },
    ],
    wargear: [],
  },

  {
    id: "inquisitor-greyfax",
    name: "Inquisitor Greyfax",
    faction: "imperial-agents",
    image: "",
    points: 65,
    canAttachTo: ["exaction-squad", "imperial-navy-breachers", "inquisitorial-agents", "sanctifiers", "sisters-of-battle-squad", "subductor-squad", "vigilant-squad"],
    defaultWargear: [
      { id: "castigation", name: "Castigation", image: "", profiles: [{ range: '18"', attacks: "1", skill: "3+", strength: "8", ap: "-2", damage: "3", keywords: ["ANTI-CHARACTER 4+", "DEVASTATING WOUNDS", "PRECISION", "PSYCHIC"] }] },
      { id: "condemnor-stake", name: "Condemnor stake", image: "", profiles: [{ range: '24"', attacks: "1", skill: "3+", strength: "4", ap: "0", damage: "1", keywords: ["ANTI-PSYKER 2+", "DEVASTATING WOUNDS", "PRECISION", "RAPID FIRE 1"] }] },
      { id: "greyfax-master-crafted-power-sword", name: "Master-crafted power sword", image: "", profiles: [{ range: "Melee", attacks: "4", skill: "3+", strength: "4", ap: "-2", damage: "2" }] },
    ],
    wargear: [],
    abilities: [
      {
        name: "Authority of the Inquisition",
        description: "While this model is leading a unit, it can embark within any TRANSPORT that its Bodyguard unit can embark within.",
      },
      {
        name: "Psyoculum",
        description: "While this model is leading a unit, ranged weapons equipped by models in that unit have the [ANTI-PSYKER 4+] ability.",
      },
      {
        name: "No Mercy",
        description: "While this model is leading a unit, each time a model in that unit makes an attack that targets a unit that is Below Half-strength, add 1 to the Hit roll.",
      },
    ],
  },

  {
    id: "inquisitor-in-terminator-armour",
    name: "Inquisitor In Terminator Armour",
    faction: "imperial-agents",
    image: "",
    points: 70,
    canAttachTo: [],
    defaultWargear: [
      { id: "storm-bolter", name: "Storm bolter", image: "", profiles: [{ range: '24"', attacks: "4", skill: "3+", strength: "4", ap: "0", damage: "1", keywords: ["RAPID FIRE 2"] }] },
      { id: "inquisitorial-melee-weapon", name: "Inquisitorial melee weapon", image: "", profiles: [{ range: "Melee", attacks: "4", skill: "3+", strength: "5", ap: "-2", damage: "1" }] },
    ],
    wargear: [
      { id: "combi-weapon", name: "Combi-weapon", image: "", profiles: [{ range: '24"', attacks: "2", skill: "3+", strength: "4", ap: "0", damage: "1", keywords: ["RAPID FIRE 1"] }] },
      { id: "psycannon", name: "Psycannon", image: "", profiles: [{ range: '24"', attacks: "3", skill: "3+", strength: "8", ap: "-1", damage: "2", keywords: ["PSYCHIC", "RAPID FIRE 2"] }] },
      { id: "psychic-shock-wave", name: "Psychic shock wave", image: "", profiles: [{ range: '18"', attacks: "D3", skill: "3+", strength: "5", ap: "-1", damage: "D3", keywords: ["PSYCHIC"] }] },
      { id: "force-weapon", name: "Force weapon", image: "", profiles: [{ range: "Melee", attacks: "3", skill: "3+", strength: "6", ap: "-1", damage: "D3", keywords: ["PSYCHIC"] }] },
    ],
  },

  {
    id: "inquisitor-karamazov",
    name: "Inquisitor Karamazov",
    faction: "imperial-agents",
    image: "",
    points: 140,
    canAttachTo: [],
    defaultWargear: [
      { id: "master-crafted-multi-melta", name: "Master-crafted multi-melta", image: "", profiles: [{ range: '18"', attacks: "2", skill: "2+", strength: "9", ap: "-4", damage: "D6", keywords: ["HEAVY", "MELTA 2"] }] },
      { id: "master-crafted-power-sword", name: "Master-crafted power sword", image: "", profiles: [{ range: "Melee", attacks: "5", skill: "2+", strength: "5", ap: "-2", damage: "2" }] },
    ],
    wargear: [],
  },

  {
    id: "janus-draik",
    name: "Janus Draik",
    faction: "imperial-agents",
    image: "",
    points: 40,
    canAttachTo: [],
    defaultWargear: [
      { id: "heirloom-pistol", name: "Heirloom pistol", image: "", profiles: [{ range: '12"', attacks: "2", skill: "2+", strength: "4", ap: "-2", damage: "2", keywords: ["PISTOL"] }] },
      { id: "monomolecular-rapier", name: "Monomolecular rapier", image: "", profiles: [{ range: "Melee", attacks: "4", skill: "2+", strength: "4", ap: "-3", damage: "1" }] },
    ],
    wargear: [],
  },

  {
    id: "jokaero-weaponsmith",
    name: "Jokaero Weaponsmith",
    faction: "imperial-agents",
    image: "",
    points: 30,
    canAttachTo: [],
    defaultWargear: [],
    wargear: [
      { id: "jokaero-weapons-scattered", name: "Jokaero weapons – scattered", image: "", profiles: [{ range: '24"', attacks: "D6", skill: "3+", strength: "4", ap: "0", damage: "1", keywords: ["BLAST"] }] },
      { id: "jokaero-weapons-focused", name: "Jokaero weapons – focused", image: "", profiles: [{ range: '24"', attacks: "2", skill: "3+", strength: "10", ap: "-4", damage: "D6" }] },
      { id: "close-combat-weapon", name: "Close combat weapon", image: "", profiles: [{ range: "Melee", attacks: "3", skill: "3+", strength: "4", ap: "0", damage: "1" }] },
    ],
  },

  {
    id: "ministorum-priest",
    name: "Ministorum Priest",
    faction: "imperial-agents",
    image: "",
    points: 40,
    canAttachTo: [],
    defaultWargear: [
      { id: "zealot-s-vindictor", name: "Zealot's vindictor", image: "", profiles: [{ range: "Melee", attacks: "4", skill: "4+", strength: "4", ap: "0", damage: "1" }] },
      { id: "zealots-vindictor", name: "Zealot's vindictor", image: "", profiles: [{ range: "Melee", attacks: "4", skill: "4+", strength: "4", ap: "0", damage: "1" }] },
    ],
    wargear: [
      { id: "holy-pistol", name: "Holy pistol", image: "", profiles: [{ range: '12"', attacks: "1", skill: "3+", strength: "4", ap: "0", damage: "1", keywords: ["PISTOL"] }] },
      { id: "power-weapon", name: "Power weapon", image: "", profiles: [{ range: "Melee", attacks: "4", skill: "3+", strength: "5", ap: "-2", damage: "1" }] },
    ],
  },

  {
    id: "navigator",
    name: "Navigator",
    faction: "imperial-agents",
    image: "",
    points: 60,
    canAttachTo: ["imperial-navy-breachers", "voidsmen-at-arms"],
    defaultWargear: [
      { id: "nav-laspistol", name: "Laspistol", image: "", profiles: [{ range: '12"', attacks: "1", skill: "4+", strength: "3", ap: "0", damage: "1", keywords: ["PISTOL"] }] },
      { id: "nav-force-orb-cane", name: "Force-orb cane", image: "", profiles: [{ range: "Melee", attacks: "3", skill: "4+", strength: "6", ap: "-1", damage: "D3", keywords: ["PSYCHIC"] }] },
    ],
    wargear: [],
    abilities: [
      {
        name: "Gaze into the Empyrean (Psychic)",
        description: "Enemy units that are set up on the battlefield as Reinforcements cannot be set up within 12\" of this model.",
      },
      {
        name: "Third Eye (Psychic)",
        description: "At the start of your Shooting phase, select one enemy unit within 12\" of and visible to this model. That unit must take a Battle-shock test, subtracting 2 from the result if it is an INFANTRY unit. If the test is failed, that enemy unit suffers 3 mortal wounds.",
      },
    ],
  },

  {
    id: "neyam-shai-murad",
    name: "Neyam Shai Murad",
    faction: "imperial-agents",
    image: "",
    points: 40,
    canAttachTo: [],
    defaultWargear: [
      { id: "negotiator-pistol", name: "Negotiator pistol", image: "", profiles: [{ range: '12"', attacks: "2", skill: "2+", strength: "4", ap: "-1", damage: "1", keywords: ["PISTOL"] }] },
      { id: "close-combat-weapon", name: "Close combat weapon", image: "", profiles: [{ range: "Melee", attacks: "3", skill: "3+", strength: "4", ap: "0", damage: "1" }] },
    ],
    wargear: [],
  },

  {
    id: "ur-025",
    name: "UR 025",
    faction: "imperial-agents",
    image: "",
    points: 55,
    canAttachTo: [],
    defaultWargear: [
      { id: "mk-1-assault-weapon", name: "Mk 1 assault weapon", image: "", profiles: [{ range: '24"', attacks: "3", skill: "3+", strength: "5", ap: "-1", damage: "2" }] },
      { id: "power-claw", name: "Power claw", image: "", profiles: [{ range: "Melee", attacks: "4", skill: "3+", strength: "8", ap: "-2", damage: "2" }] },
    ],
    wargear: [],
  },

  {
    id: "vindicare-assassin",
    name: "Vindicare Assassin",
    faction: "imperial-agents",
    image: "/Warhammerimages/Imperial Agents/image.png",
    points: 110,
    canAttachTo: [],
    defaultWargear: [
      { id: "exitus-pistol", name: "Exitus pistol", image: "", profiles: [{ range: '12"', attacks: "3", skill: "2+", strength: "6", ap: "-2", damage: "3", keywords: ["DEVASTATING WOUNDS", "IGNORES COVER", "PISTOL", "PRECISION"] }] },
      { id: "exitus-rifle", name: "Exitus rifle", image: "", profiles: [{ range: '48"', attacks: "1", skill: "2+", strength: "8", ap: "-3", damage: "D3+3", keywords: ["DEVASTATING WOUNDS", "HEAVY", "IGNORES COVER", "PRECISION"] }] },
      { id: "vindicare-combat-knife", name: "Vindicare combat knife", image: "", profiles: [{ range: "Melee", attacks: "4", skill: "2+", strength: "4", ap: "-1", damage: "1" }] },
    ],
    wargear: [],
    abilities: [
      {
        name: "Deadshot",
        description: "Each time this model makes a ranged attack, when selecting targets for that attack, you can ignore the Lone Operative ability.",
      },
      {
        name: "Shieldbreaker",
        description: "Once per battle, when selecting targets for this model's exitus rifle, it can fire a shieldbreaker round. If it does, until the end of the phase, each time this model makes an attack with that weapon, add 1 to the Wound roll and any successful Wound roll scores a Critical Wound.",
      },
    ],
  },

  {
    id: "watch-captain-artemis",
    name: "Watch Captain Artemis",
    faction: "imperial-agents",
    image: "",
    points: 65,
    canAttachTo: [],
    defaultWargear: [
      { id: "hellfire-extremis", name: "Hellfire Extremis", image: "", profiles: [{ range: '24"', attacks: "2", skill: "2+", strength: "4", ap: "-1", damage: "2", keywords: ["ANTI-INFANTRY 2+"] }] },
      { id: "master-crafted-power-weapon", name: "Master-crafted power weapon", image: "", profiles: [{ range: "Melee", attacks: "5", skill: "2+", strength: "5", ap: "-2", damage: "2" }] },
    ],
    wargear: [],
  },

  {
    id: "watch-master",
    name: "Watch Master",
    faction: "imperial-agents",
    image: "",
    points: 105,
    canAttachTo: [],
    defaultWargear: [
      { id: "vigil-spear", name: "Vigil spear", image: "", profiles: [{ profileName: "ranged", range: '24"', attacks: "2", skill: "2+", strength: "4", ap: "-1", damage: "1", keywords: ["RAPID FIRE 1"] }, { profileName: "melee", range: "Melee", attacks: "5", skill: "2+", strength: "7", ap: "-2", damage: "2" }] },
    ],
    wargear: [],
  },

  {
    id: "inquisitor-kroyle",
    name: "Inquisitor Kroyle",
    faction: "imperial-agents",
    image: "",
    points: 100,
    canAttachTo: [],
    defaultWargear: [
      { id: "jindarii-tox-cycler", name: "Jindarii tox-cycler", image: "", profiles: [{ range: '36"', attacks: "1", skill: "2+", strength: "6", ap: "-2", damage: "2", keywords: ["ANTI-MONSTER 2+", "HEAVY", "PRECISION"] }] },
      { id: "kroyle-stubcarbine", name: "Stubcarbine", image: "", profiles: [{ range: '12"', attacks: "2", skill: "2+", strength: "5", ap: "-2", damage: "2", keywords: ["PISTOL"] }] },
      { id: "kroyle-butcher-blade", name: "Butcher blade", image: "", profiles: [{ range: "Melee", attacks: "5", skill: "3+", strength: "4", ap: "-2", damage: "1" }] },
      { id: "kroyle-garralisk-claws", name: "Garralisk's claws and teeth", image: "", profiles: [{ range: "Melee", attacks: "4", skill: "4+", strength: "5", ap: "-1", damage: "1", keywords: ["EXTRA ATTACKS"] }] },
    ],
    wargear: [],
    abilities: [
      {
        name: "On My Signal, Fire!",
        description: "After this unit has shot, you can select one enemy unit hit by those attacks. Until the end of the phase, each time an AGENTS OF THE IMPERIUM or IMPERIUM INFANTRY BATTLELINE model from your army makes an attack that targets that enemy unit, you can re-roll the Hit roll.",
      },
      {
        name: "Tox-cycler",
        description: "In your Shooting phase, after this unit has shot, if this model scored a hit with its Jindarii tox-cycler, until the end of the battle, add 2 to the Strength and Damage characteristics of that weapon (to a maximum Damage characteristic of 6).",
      },
    ],
  },

];
