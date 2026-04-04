import type { Character } from "../../../types/warhammer";

export const imperialAgentsCharacters: Character[] = [

  {
    id: "callidus-assassin",
    name: "Callidus Assassin",
    faction: "imperial-agents",
    image: "",
    points: 100,
    canAttachTo: [],
    defaultWargear: [
      { id: "neural-shredder", name: "Neural shredder", image: "", profiles: [{ range: '12"', attacks: "1", skill: "2+", strength: "5", ap: "0", damage: "D3", keywords: ["IGNORES COVER", "PISTOL", "PSYCHIC"] }] },
      { id: "phase-sword-and-poison-blades", name: "Phase sword and poison blades", image: "", profiles: [{ range: "Melee", attacks: "5", skill: "2+", strength: "4", ap: "-3", damage: "1", keywords: ["LETHAL HITS"] }] },
    ],
    wargear: [],
  },

  {
    id: "culexus-assassin",
    name: "Culexus Assassin",
    faction: "imperial-agents",
    image: "",
    points: 85,
    canAttachTo: [],
    defaultWargear: [
      { id: "animus-speculum", name: "Animus speculum", image: "", profiles: [{ range: '18"', attacks: "3", skill: "2+", strength: "5", ap: "-3", damage: "2", keywords: ["ANTI-PSYKER 4+", "DEVASTATING WOUNDS"] }] },
      { id: "life-draining-touch", name: "Life-draining touch", image: "", profiles: [{ range: "Melee", attacks: "4", skill: "2+", strength: "5", ap: "-3", damage: "2" }] },
    ],
    wargear: [],
  },

  {
    id: "eversor-assassin",
    name: "Eversor Assassin",
    faction: "imperial-agents",
    image: "",
    points: 110,
    canAttachTo: [],
    defaultWargear: [
      { id: "executioner-pistol", name: "Executioner pistol", image: "", profiles: [{ profileName: "bolt rounds", range: '12"', attacks: "3", skill: "2+", strength: "4", ap: "0", damage: "1", keywords: ["PISTOL"] }, { profileName: "bio-explosive", range: '12"', attacks: "1", skill: "2+", strength: "3", ap: "0", damage: "D3", keywords: ["BLAST", "PISTOL"] }] },
      { id: "power-sword-and-neuro-gauntlet", name: "Power sword and neuro gauntlet", image: "", profiles: [{ profileName: "power sword", range: "Melee", attacks: "5", skill: "2+", strength: "5", ap: "-2", damage: "1" }, { profileName: "neuro gauntlet", range: "Melee", attacks: "3", skill: "4+", strength: "5", ap: "0", damage: "1", keywords: ["ANTI-INFANTRY 2+"] }] },
    ],
    wargear: [],
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
    points: 75,
    canAttachTo: [],
    defaultWargear: [
      { id: "dirgesinger", name: "Dirgesinger", image: "", profiles: [{ range: '18"', attacks: "4", skill: "2+", strength: "4", ap: "-2", damage: "1", keywords: ["ANTI-PSYKER 4+"] }] },
      { id: "psychic-tempest", name: "Psychic Tempest", image: "", profiles: [{ range: '18"', attacks: "D6", skill: "3+", strength: "5", ap: "-1", damage: "D3", keywords: ["PSYCHIC"] }] },
      { id: "power-fist", name: "Power fist", image: "", profiles: [{ range: "Melee", attacks: "3", skill: "3+", strength: "8", ap: "-2", damage: "2" }] },
    ],
    wargear: [],
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
    canAttachTo: [],
    defaultWargear: [
      { id: "castigation", name: "Castigation", image: "", profiles: [{ range: '24"', attacks: "4", skill: "2+", strength: "4", ap: "-1", damage: "1", keywords: ["ANTI-PSYKER 4+"] }] },
      { id: "condemnor-stake", name: "Condemnor stake", image: "", profiles: [{ range: "Melee", attacks: "4", skill: "2+", strength: "4", ap: "-1", damage: "2", keywords: ["ANTI-PSYKER 4+"] }] },
    ],
    wargear: [
      { id: "master-crafted-power-sword", name: "Master-crafted power sword", image: "", profiles: [{ range: "Melee", attacks: "5", skill: "2+", strength: "5", ap: "-2", damage: "2" }] },
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
    canAttachTo: [],
    defaultWargear: [
      { id: "laspistol", name: "Laspistol", image: "", profiles: [{ range: '12"', attacks: "1", skill: "3+", strength: "3", ap: "0", damage: "1", keywords: ["PISTOL"] }] },
      { id: "force-orb-cane", name: "Force-orb cane", image: "", profiles: [{ range: "Melee", attacks: "3", skill: "3+", strength: "5", ap: "-1", damage: "D3", keywords: ["PSYCHIC"] }] },
    ],
    wargear: [],
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
    image: "",
    points: 110,
    canAttachTo: [],
    defaultWargear: [
      { id: "exitus-pistol", name: "Exitus pistol", image: "", profiles: [{ range: '12"', attacks: "1", skill: "2+", strength: "5", ap: "-3", damage: "D3", keywords: ["DEVASTATING WOUNDS", "PISTOL"] }] },
      { id: "exitus-rifle", name: "Exitus rifle", image: "", profiles: [{ range: '36"', attacks: "1", skill: "2+", strength: "5", ap: "-3", damage: "D3+3", keywords: ["DEVASTATING WOUNDS", "HEAVY", "PRECISION"] }] },
      { id: "vindicare-combat-knife", name: "Vindicare combat knife", image: "", profiles: [{ range: "Melee", attacks: "4", skill: "2+", strength: "4", ap: "-1", damage: "1" }] },
    ],
    wargear: [],
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

];
