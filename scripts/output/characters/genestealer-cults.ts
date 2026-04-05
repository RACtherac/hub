import type { Character } from "../../../types/warhammer";

export const genestealerCultsCharacters: Character[] = [

  {
    id: "abominant",
    name: "Abominant",
    faction: "genestealer-cults",
    image: "",
    points: 95,
    canAttachTo: [],
    defaultWargear: [
      { id: "power-sledgehammer", name: "Power sledgehammer", image: "", profiles: [{ range: "Melee", attacks: "4", skill: "3+", strength: "9", ap: "-2", damage: "D6" }] },
    ],
    wargear: [],
  },

  {
    id: "acolyte-iconward",
    name: "Acolyte Iconward",
    faction: "genestealer-cults",
    image: "",
    points: 50,
    canAttachTo: [],
    defaultWargear: [
      { id: "autopistol", name: "Autopistol", image: "", profiles: [{ range: '12"', attacks: "1", skill: "4+", strength: "3", ap: "0", damage: "1", keywords: ["PISTOL"] }] },
      { id: "cult-claws", name: "Cult claws", image: "", profiles: [{ range: "Melee", attacks: "3", skill: "4+", strength: "4", ap: "-1", damage: "1" }] },
    ],
    wargear: [],
  },

  {
    id: "benefictus",
    name: "Benefictus",
    faction: "genestealer-cults",
    image: "",
    points: 70,
    canAttachTo: [],
    defaultWargear: [
      { id: "psionic-cascade-witchfire", name: "Psionic Cascade - witchfire", image: "", profiles: [{ range: '18"', attacks: "D6", skill: "3+", strength: "5", ap: "-1", damage: "1", keywords: ["BLAST", "PSYCHIC"] }] },
      { id: "psionic-cascade-focused-witchfire", name: "Psionic Cascade - focused witchfire", image: "", profiles: [{ range: '18"', attacks: "D3", skill: "3+", strength: "6", ap: "-2", damage: "2", keywords: ["PSYCHIC"] }] },
      { id: "close-combat-weapon", name: "Close combat weapon", image: "", profiles: [{ range: "Melee", attacks: "3", skill: "3+", strength: "4", ap: "0", damage: "1" }] },
    ],
    wargear: [],
  },

  {
    id: "biophagus",
    name: "Biophagus",
    faction: "genestealer-cults",
    image: "",
    points: 50,
    canAttachTo: [],
    defaultWargear: [
      { id: "autopistol", name: "Autopistol", image: "", profiles: [{ range: '12"', attacks: "1", skill: "4+", strength: "3", ap: "0", damage: "1", keywords: ["PISTOL"] }] },
      { id: "chemical-vials", name: "Chemical vials", image: "", profiles: [{ range: '6"', attacks: "D3", skill: "4+", strength: "2", ap: "0", damage: "1", keywords: ["PISTOL"] }] },
      { id: "injector-goad", name: "Injector goad", image: "", profiles: [{ range: "Melee", attacks: "3", skill: "3+", strength: "4", ap: "-1", damage: "1", keywords: ["POISONED WEAPON 2+"] }] },
    ],
    wargear: [],
  },

  {
    id: "cadian-castellan",
    name: "Cadian Castellan",
    faction: "genestealer-cults",
    image: "",
    points: 55,
    canAttachTo: [],
    defaultWargear: [
      { id: "laspistol", name: "Laspistol", image: "", profiles: [{ range: '12"', attacks: "1", skill: "4+", strength: "3", ap: "0", damage: "1", keywords: ["PISTOL"] }] },
      { id: "chainsword", name: "Chainsword", image: "", profiles: [{ range: "Melee", attacks: "4", skill: "4+", strength: "3", ap: "0", damage: "1" }] },
    ],
    wargear: [
      { id: "boltgun", name: "Boltgun", image: "", profiles: [{ range: '24"', attacks: "2", skill: "3+", strength: "4", ap: "0", damage: "1", keywords: ["RAPID FIRE 1"] }] },
      { id: "bolt-pistol", name: "Bolt pistol", image: "", profiles: [{ range: '12"', attacks: "1", skill: "3+", strength: "4", ap: "0", damage: "1", keywords: ["PISTOL"] }] },
      { id: "plasma-pistol", name: "Plasma pistol", image: "", profiles: [{ profileName: "standard", range: '12"', attacks: "1", skill: "3+", strength: "7", ap: "-2", damage: "1", keywords: ["PISTOL"] }, { profileName: "supercharge", range: '12"', attacks: "1", skill: "3+", strength: "8", ap: "-3", damage: "2", keywords: ["PISTOL", "HAZARDOUS"] }] },
      { id: "power-fist", name: "Power fist", image: "", profiles: [{ range: "Melee", attacks: "3", skill: "3+", strength: "8", ap: "-2", damage: "2" }] },
      { id: "power-weapon", name: "Power weapon", image: "", profiles: [{ range: "Melee", attacks: "4", skill: "3+", strength: "5", ap: "-2", damage: "1" }] },
    ],
  },

  {
    id: "clamavus",
    name: "Clamavus",
    faction: "genestealer-cults",
    image: "",
    points: 50,
    canAttachTo: [],
    defaultWargear: [
      { id: "autopistol", name: "Autopistol", image: "", profiles: [{ range: '12"', attacks: "1", skill: "4+", strength: "3", ap: "0", damage: "1", keywords: ["PISTOL"] }] },
      { id: "close-combat-weapon", name: "Close combat weapon", image: "", profiles: [{ range: "Melee", attacks: "3", skill: "4+", strength: "3", ap: "0", damage: "1" }] },
    ],
    wargear: [],
  },

  {
    id: "death-rider-commissar",
    name: "Death Rider Commissar",
    faction: "genestealer-cults",
    image: "",
    points: 35,
    canAttachTo: [],
    defaultWargear: [
      { id: "commissar-s-pistol", name: "Commissar's pistol", image: "", profiles: [{ range: '12"', attacks: "1", skill: "3+", strength: "4", ap: "0", damage: "1", keywords: ["PISTOL"] }] },
      { id: "commissar-s-close-combat-weapon", name: "Commissar's close combat weapon", image: "", profiles: [{ range: "Melee", attacks: "3", skill: "3+", strength: "4", ap: "0", damage: "1" }] },
      { id: "savage-claws", name: "Savage claws", image: "", profiles: [{ range: "Melee", attacks: "2", skill: "4+", strength: "4", ap: "-1", damage: "1" }] },
    ],
    wargear: [],
  },

  {
    id: "deathleaper",
    name: "Deathleaper",
    faction: "genestealer-cults",
    image: "",
    points: 80,
    canAttachTo: [],
    defaultWargear: [
      { id: "lictor-claws-and-talons", name: "Lictor claws and talons", image: "", profiles: [{ range: "Melee", attacks: "6", skill: "3+", strength: "6", ap: "-2", damage: "2", keywords: ["SUSTAINED HITS 2"] }] },
    ],
    wargear: [],
  },

  {
    id: "jackal-alphus",
    name: "Jackal Alphus",
    faction: "genestealer-cults",
    image: "",
    points: 55,
    canAttachTo: [],
    defaultWargear: [
      { id: "autopistol", name: "Autopistol", image: "", profiles: [{ range: '12"', attacks: "1", skill: "4+", strength: "3", ap: "0", damage: "1", keywords: ["PISTOL"] }] },
      { id: "cult-sniper-rifle", name: "Cult sniper rifle", image: "", profiles: [{ range: '36"', attacks: "1", skill: "2+", strength: "4", ap: "-2", damage: "D3+1", keywords: ["HEAVY", "PRECISION"] }] },
      { id: "close-combat-weapon", name: "Close combat weapon", image: "", profiles: [{ range: "Melee", attacks: "3", skill: "4+", strength: "3", ap: "0", damage: "1" }] },
    ],
    wargear: [],
  },

  {
    id: "kelermorph",
    name: "Kelermorph",
    faction: "genestealer-cults",
    image: "",
    points: 60,
    canAttachTo: [],
    defaultWargear: [
      { id: "liberator-autostubs", name: "Liberator autostubs", image: "", profiles: [{ range: '12"', attacks: "6", skill: "2+", strength: "4", ap: "0", damage: "1", keywords: ["PISTOL"] }] },
      { id: "close-combat-weapon", name: "Close combat weapon", image: "", profiles: [{ range: "Melee", attacks: "3", skill: "3+", strength: "4", ap: "0", damage: "1" }] },
    ],
    wargear: [],
  },

  {
    id: "leman-russ-commander",
    name: "Leman Russ Commander",
    faction: "genestealer-cults",
    image: "",
    points: 235,
    canAttachTo: [],
    defaultWargear: [
      { id: "lascannon", name: "Lascannon", image: "", profiles: [{ range: '48"', attacks: "1", skill: "3+", strength: "12", ap: "-3", damage: "D6+1", keywords: ["HEAVY"] }] },
      { id: "leman-russ-battle-cannon", name: "Leman Russ battle cannon", image: "", profiles: [{ range: '72"', attacks: "D6+3", skill: "3+", strength: "10", ap: "-1", damage: "D6+2", keywords: ["BLAST", "HEAVY"] }] },
      { id: "armoured-tracks", name: "Armoured tracks", image: "", profiles: [{ range: "Melee", attacks: "3", skill: "4+", strength: "6", ap: "0", damage: "1" }] },
    ],
    wargear: [
      { id: "demolisher-battle-cannon", name: "Demolisher battle cannon", image: "", profiles: [{ range: '24"', attacks: "D3+3", skill: "3+", strength: "14", ap: "-3", damage: "D6", keywords: ["BLAST", "HEAVY"] }] },
      { id: "eradicator-nova-cannon", name: "Eradicator nova cannon", image: "", profiles: [{ range: '36"', attacks: "D6+3", skill: "3+", strength: "6", ap: "0", damage: "2", keywords: ["BLAST", "HEAVY", "IGNORES COVER"] }] },
      { id: "executioner-plasma-cannon-standard", name: "Executioner plasma cannon – standard", image: "", profiles: [{ range: '36"', attacks: "D6+3", skill: "3+", strength: "8", ap: "-3", damage: "2", keywords: ["BLAST", "HEAVY"] }] },
      { id: "executioner-plasma-cannon-supercharge", name: "Executioner plasma cannon – supercharge", image: "", profiles: [{ range: '36"', attacks: "D6+3", skill: "3+", strength: "9", ap: "-4", damage: "3", keywords: ["BLAST", "HAZARDOUS", "HEAVY"] }] },
      { id: "exterminator-autocannon", name: "Exterminator autocannon", image: "", profiles: [{ range: '48"', attacks: "4", skill: "3+", strength: "9", ap: "-1", damage: "3", keywords: ["HEAVY"] }] },
      { id: "punisher-gatling-cannon", name: "Punisher gatling cannon", image: "", profiles: [{ range: '24"', attacks: "20", skill: "3+", strength: "5", ap: "0", damage: "1", keywords: ["HEAVY"] }] },
      { id: "heavy-bolter", name: "Heavy bolter", image: "", profiles: [{ range: '36"', attacks: "3", skill: "3+", strength: "5", ap: "-1", damage: "2", keywords: ["HEAVY", "SUSTAINED HITS 1"] }] },
      { id: "heavy-flamer", name: "Heavy flamer", image: "", profiles: [{ range: '12"', attacks: "D6", skill: "N/A", strength: "5", ap: "-1", damage: "1", keywords: ["IGNORES COVER", "TORRENT"] }] },
      { id: "heavy-stubber", name: "Heavy stubber", image: "", profiles: [{ range: '36"', attacks: "3", skill: "4+", strength: "4", ap: "0", damage: "1", keywords: ["HEAVY"] }] },
      { id: "multi-melta", name: "Multi-melta", image: "", profiles: [{ range: '18"', attacks: "2", skill: "3+", strength: "9", ap: "-4", damage: "D6", keywords: ["HEAVY", "MELTA 2"] }] },
      { id: "storm-bolter", name: "Storm bolter", image: "", profiles: [{ range: '24"', attacks: "2", skill: "3+", strength: "4", ap: "0", damage: "1", keywords: ["RAPID FIRE 2"] }] },
      { id: "vanquisher-battle-cannon", name: "Vanquisher battle cannon", image: "", profiles: [{ range: '72"', attacks: "1", skill: "3+", strength: "17", ap: "-4", damage: "D6+6", keywords: ["HEAVY"] }] },
    ],
  },

  {
    id: "locus",
    name: "Locus",
    faction: "genestealer-cults",
    image: "",
    points: 45,
    canAttachTo: [],
    defaultWargear: [
      { id: "locus-blades", name: "Locus blades", image: "", profiles: [{ range: "Melee", attacks: "5", skill: "3+", strength: "5", ap: "-2", damage: "1" }] },
    ],
    wargear: [],
  },

  {
    id: "magus",
    name: "Magus",
    faction: "genestealer-cults",
    image: "",
    points: 50,
    canAttachTo: [],
    defaultWargear: [
      { id: "autopistol", name: "Autopistol", image: "", profiles: [{ range: '12"', attacks: "1", skill: "4+", strength: "3", ap: "0", damage: "1", keywords: ["PISTOL"] }] },
      { id: "magus-stave", name: "Magus stave", image: "", profiles: [{ range: "Melee", attacks: "3", skill: "3+", strength: "5", ap: "-1", damage: "D3", keywords: ["PSYCHIC"] }] },
    ],
    wargear: [],
  },

  {
    id: "nexos",
    name: "Nexos",
    faction: "genestealer-cults",
    image: "",
    points: 60,
    canAttachTo: [],
    defaultWargear: [
      { id: "autopistol", name: "Autopistol", image: "", profiles: [{ range: '12"', attacks: "1", skill: "4+", strength: "3", ap: "0", damage: "1", keywords: ["PISTOL"] }] },
      { id: "close-combat-weapon", name: "Close combat weapon", image: "", profiles: [{ range: "Melee", attacks: "3", skill: "4+", strength: "3", ap: "0", damage: "1" }] },
    ],
    wargear: [],
  },

  {
    id: "parasite-of-mortrex",
    name: "Parasite Of Mortrex",
    faction: "genestealer-cults",
    image: "",
    points: 80,
    canAttachTo: [],
    defaultWargear: [
      { id: "barbed-ovipositor", name: "Barbed ovipositor", image: "", profiles: [{ range: "Melee", attacks: "5", skill: "3+", strength: "5", ap: "-1", damage: "1", keywords: ["DEVASTATING WOUNDS"] }] },
      { id: "clawed-limbs", name: "Clawed limbs", image: "", profiles: [{ range: "Melee", attacks: "3", skill: "4+", strength: "4", ap: "0", damage: "1" }] },
    ],
    wargear: [],
  },

  {
    id: "patriarch",
    name: "Patriarch",
    faction: "genestealer-cults",
    image: "",
    points: 75,
    canAttachTo: [],
    defaultWargear: [
      { id: "patriarch-s-claws", name: "Patriarch's claws", image: "", profiles: [{ range: "Melee", attacks: "6", skill: "2+", strength: "7", ap: "-2", damage: "2", keywords: ["SUSTAINED HITS 1"] }] },
    ],
    wargear: [],
  },

  {
    id: "primaris-psyker",
    name: "Primaris Psyker",
    faction: "genestealer-cults",
    image: "",
    points: 60,
    canAttachTo: [],
    defaultWargear: [
      { id: "laspistol", name: "Laspistol", image: "", profiles: [{ range: '12"', attacks: "1", skill: "4+", strength: "3", ap: "0", damage: "1", keywords: ["PISTOL"] }] },
      { id: "psychic-maelstrom-witchfire", name: "Psychic Maelstrom – witchfire", image: "", profiles: [{ range: '18"', attacks: "D6+3", skill: "3+", strength: "6", ap: "-1", damage: "1", keywords: ["BLAST", "PSYCHIC"] }] },
      { id: "psychic-maelstrom-focused-witchfire", name: "Psychic Maelstrom – focused witchfire", image: "", profiles: [{ range: '18"', attacks: "D3+3", skill: "3+", strength: "8", ap: "-2", damage: "D3", keywords: ["PSYCHIC"] }] },
      { id: "force-weapon", name: "Force weapon", image: "", profiles: [{ range: "Melee", attacks: "4", skill: "3+", strength: "6", ap: "-1", damage: "D3", keywords: ["PSYCHIC"] }] },
    ],
    wargear: [],
  },

  {
    id: "primus",
    name: "Primus",
    faction: "genestealer-cults",
    image: "",
    points: 80,
    canAttachTo: [],
    defaultWargear: [
      { id: "scoped-needle-pistol", name: "Scoped needle pistol", image: "", profiles: [{ range: '18"', attacks: "1", skill: "2+", strength: "2", ap: "-1", damage: "1", keywords: ["PISTOL", "PRECISION"] }] },
      { id: "cult-bonesword", name: "Cult bonesword", image: "", profiles: [{ range: "Melee", attacks: "4", skill: "3+", strength: "6", ap: "-2", damage: "2" }] },
      { id: "toxin-injector-claw", name: "Toxin injector claw", image: "", profiles: [{ range: "Melee", attacks: "3", skill: "3+", strength: "3", ap: "-1", damage: "1", keywords: ["POISONED WEAPON 2+"] }] },
    ],
    wargear: [],
  },

  {
    id: "reductus-saboteur",
    name: "Reductus Saboteur",
    faction: "genestealer-cults",
    image: "",
    points: 65,
    canAttachTo: [],
    defaultWargear: [
      { id: "autopistol", name: "Autopistol", image: "", profiles: [{ range: '12"', attacks: "1", skill: "4+", strength: "3", ap: "0", damage: "1", keywords: ["PISTOL"] }] },
      { id: "demolition-charges", name: "Demolition charges", image: "", profiles: [{ range: '6"', attacks: "D6", skill: "3+", strength: "8", ap: "-2", damage: "D3", keywords: ["BLAST", "GRENADES"] }] },
      { id: "remote-explosives", name: "Remote explosives", image: "", profiles: [{ range: '12"', attacks: "1", skill: "3+", strength: "6", ap: "-1", damage: "D3" }] },
      { id: "close-combat-weapon", name: "Close combat weapon", image: "", profiles: [{ range: "Melee", attacks: "3", skill: "4+", strength: "3", ap: "0", damage: "1" }] },
    ],
    wargear: [],
  },

  {
    id: "rogal-dorn-commander",
    name: "Rogal Dorn Commander",
    faction: "genestealer-cults",
    image: "",
    points: 265,
    canAttachTo: [],
    defaultWargear: [
      { id: "castigator-gatling-cannon", name: "Castigator gatling cannon", image: "", profiles: [{ range: '24"', attacks: "12", skill: "3+", strength: "5", ap: "0", damage: "1", keywords: ["HEAVY"] }] },
      { id: "heavy-stubber", name: "Heavy stubber", image: "", profiles: [{ range: '36"', attacks: "3", skill: "4+", strength: "4", ap: "0", damage: "1", keywords: ["HEAVY"] }] },
      { id: "twin-battle-cannon", name: "Twin battle cannon", image: "", profiles: [{ range: '72"', attacks: "D6+3", skill: "3+", strength: "10", ap: "-1", damage: "D6+2", keywords: ["BLAST", "HEAVY", "TWIN-LINKED"] }] },
      { id: "armoured-tracks", name: "Armoured tracks", image: "", profiles: [{ range: "Melee", attacks: "3", skill: "4+", strength: "6", ap: "0", damage: "1" }] },
    ],
    wargear: [
      { id: "heavy-bolter", name: "Heavy bolter", image: "", profiles: [{ range: '36"', attacks: "3", skill: "3+", strength: "5", ap: "-1", damage: "2", keywords: ["HEAVY", "SUSTAINED HITS 1"] }] },
      { id: "meltagun", name: "Meltagun", image: "", profiles: [{ range: '12"', attacks: "1", skill: "3+", strength: "9", ap: "-4", damage: "D6", keywords: ["MELTA 2"] }] },
      { id: "multi-melta", name: "Multi-melta", image: "", profiles: [{ range: '18"', attacks: "2", skill: "3+", strength: "9", ap: "-4", damage: "D6", keywords: ["HEAVY", "MELTA 2"] }] },
    ],
  },

  {
    id: "sanctus",
    name: "Sanctus",
    faction: "genestealer-cults",
    image: "",
    points: 50,
    canAttachTo: [],
    defaultWargear: [
      { id: "sanctus-bio-dagger", name: "Sanctus bio-dagger", image: "", profiles: [{ range: "Melee", attacks: "4", skill: "3+", strength: "4", ap: "-2", damage: "D3", keywords: ["ANTI-PSYKER 4+"] }] },
    ],
    wargear: [
      { id: "cult-sniper-rifle", name: "Cult sniper rifle", image: "", profiles: [{ range: '36"', attacks: "1", skill: "2+", strength: "4", ap: "-2", damage: "D3+1", keywords: ["HEAVY", "PRECISION"] }] },
      { id: "close-combat-weapon", name: "Close combat weapon", image: "", profiles: [{ range: "Melee", attacks: "3", skill: "3+", strength: "4", ap: "0", damage: "1" }] },
    ],
  },

  {
    id: "winged-hive-tyrant",
    name: "Winged Hive Tyrant",
    faction: "genestealer-cults",
    image: "",
    points: 200,
    canAttachTo: [],
    defaultWargear: [
      { id: "monstrous-bonesword-and-lash-whip", name: "Monstrous bonesword and lash whip", image: "", profiles: [{ range: "Melee", attacks: "5", skill: "3+", strength: "8", ap: "-2", damage: "3", keywords: ["ANTI-PSYKER 4+"] }] },
      { id: "tyrant-talons", name: "Tyrant talons", image: "", profiles: [{ range: "Melee", attacks: "4", skill: "3+", strength: "6", ap: "-2", damage: "2" }] },
    ],
    wargear: [
      { id: "heavy-venom-cannon", name: "Heavy venom cannon", image: "", profiles: [{ range: '36"', attacks: "D6+3", skill: "3+", strength: "9", ap: "-2", damage: "3", keywords: ["BLAST", "HEAVY"] }] },
      { id: "stranglethorn-cannon", name: "Stranglethorn cannon", image: "", profiles: [{ range: '36"', attacks: "D6+3", skill: "4+", strength: "8", ap: "0", damage: "2", keywords: ["BLAST", "HEAVY"] }] },
      { id: "monstrous-scything-talons", name: "Monstrous scything talons", image: "", profiles: [{ range: "Melee", attacks: "5", skill: "3+", strength: "7", ap: "-2", damage: "2" }] },
    ],
  },

];
