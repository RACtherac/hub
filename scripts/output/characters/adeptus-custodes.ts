import type { Character } from "../../../src/types/warhammer";

export const adeptusCustodesCharacters: Character[] = [

  {
    id: "aleya",
    name: "Aleya",
    faction: "adeptus-custodes",
    image: "",
    points: 65,
    canAttachTo: [],
    defaultWargear: [
      { id: "somnus", name: "Somnus", image: "", profiles: [{ profileName: "ranged", range: '24"', attacks: "3", skill: "2+", strength: "4", ap: "-1", damage: "1" }, { profileName: "melee", range: "Melee", attacks: "5", skill: "2+", strength: "5", ap: "-2", damage: "2" }] },
    ],
    wargear: [],
  },

  {
    id: "blade-champion",
    name: "Blade Champion",
    faction: "adeptus-custodes",
    image: "",
    points: 120,
    canAttachTo: ["custodian-guard", "custodian-wardens"],
    defaultWargear: [
      { id: "vaultswords-behemor", name: "Vaultswords – Behemor", image: "", profiles: [{ range: "Melee", attacks: "6", skill: "2+", strength: "7", ap: "-2", damage: "2", keywords: ["PRECISION"] }] },
      { id: "vaultswords-hurricanus", name: "Vaultswords – Hurricanus", image: "", profiles: [{ range: "Melee", attacks: "9", skill: "2+", strength: "5", ap: "-1", damage: "1", keywords: ["SUSTAINED HITS 1"] }] },
      { id: "vaultswords-victus", name: "Vaultswords – Victus", image: "", profiles: [{ range: "Melee", attacks: "5", skill: "2+", strength: "6", ap: "-3", damage: "3", keywords: ["DEVASTATING WOUNDS"] }] },
    ],
    wargear: [],
    abilities: [
      {
        name: "Swift Onslaught",
        description: "While this model is leading a unit, you can re-roll Charge rolls made for that unit.",
      },
      {
        name: "Martial Inspiration",
        description: "Once per battle, in your Charge phase, this model's unit is eligible to declare a charge in a turn which it Advanced.",
      },
    ],
  },

  {
    id: "knight-centura",
    name: "Knight Centura",
    faction: "adeptus-custodes",
    image: "",
    points: 55,
    canAttachTo: [],
    defaultWargear: [
      { id: "executioner-greatblade", name: "Executioner greatblade", image: "", profiles: [{ range: "Melee", attacks: "4", skill: "2+", strength: "7", ap: "-2", damage: "2" }] },
    ],
    wargear: [
      { id: "master-crafted-boltgun", name: "Master-crafted boltgun", image: "", profiles: [{ range: '24"', attacks: "2", skill: "2+", strength: "4", ap: "0", damage: "2", keywords: ["RAPID FIRE 1"] }] },
      { id: "witchseeker-flamer", name: "Witchseeker flamer", image: "", profiles: [{ range: '12"', attacks: "D6", skill: "N/A", strength: "4", ap: "0", damage: "1", keywords: ["IGNORES COVER", "TORRENT", "ANTI-PSYKER 4+"] }] },
      { id: "close-combat-weapon", name: "Close combat weapon", image: "", profiles: [{ range: "Melee", attacks: "3", skill: "3+", strength: "4", ap: "0", damage: "1" }] },
    ],
  },

  {
    id: "shield-captain",
    name: "Shield Captain",
    faction: "adeptus-custodes",
    image: "",
    points: 130,
    canAttachTo: [],
    defaultWargear: [
      { id: "guardian-spear", name: "Guardian spear", image: "", profiles: [{ profileName: "ranged", range: '24"', attacks: "2", skill: "2+", strength: "4", ap: "-1", damage: "1", keywords: ["RAPID FIRE 1"] }, { profileName: "melee", range: "Melee", attacks: "5", skill: "2+", strength: "7", ap: "-2", damage: "2" }] },
    ],
    wargear: [
      { id: "castellan-axe", name: "Castellan axe", image: "", profiles: [{ profileName: "ranged", range: '24"', attacks: "3", skill: "2+", strength: "4", ap: "0", damage: "1", keywords: ["RAPID FIRE 1"] }, { profileName: "melee", range: "Melee", attacks: "5", skill: "2+", strength: "8", ap: "-2", damage: "2" }] },
      { id: "pyrithite-spear", name: "Pyrithite spear", image: "", profiles: [{ profileName: "ranged", range: '12"', attacks: "1", skill: "2+", strength: "8", ap: "-4", damage: "D3", keywords: ["MELTA 2", "PISTOL"] }, { profileName: "melee", range: "Melee", attacks: "4", skill: "2+", strength: "8", ap: "-3", damage: "3" }] },
      { id: "sentinel-blade", name: "Sentinel blade", image: "", profiles: [{ profileName: "ranged", range: '12"', attacks: "2", skill: "2+", strength: "4", ap: "0", damage: "1", keywords: ["PISTOL"] }, { profileName: "melee", range: "Melee", attacks: "5", skill: "2+", strength: "6", ap: "-2", damage: "2" }] },
    ],
  },

  {
    id: "shield-captain-in-allarus-terminator-armour",
    name: "Shield Captain In Allarus Terminator Armour",
    faction: "adeptus-custodes",
    image: "",
    points: 130,
    canAttachTo: [],
    defaultWargear: [
      { id: "balistus-grenade-launcher", name: "Balistus grenade launcher", image: "", profiles: [{ range: '18"', attacks: "2", skill: "2+", strength: "5", ap: "-2", damage: "2", keywords: ["PISTOL"] }] },
      { id: "guardian-spear", name: "Guardian spear", image: "", profiles: [{ profileName: "ranged", range: '24"', attacks: "2", skill: "2+", strength: "4", ap: "-1", damage: "1", keywords: ["RAPID FIRE 1"] }, { profileName: "melee", range: "Melee", attacks: "5", skill: "2+", strength: "7", ap: "-2", damage: "2" }] },
    ],
    wargear: [
      { id: "castellan-axe", name: "Castellan axe", image: "", profiles: [{ profileName: "ranged", range: '24"', attacks: "3", skill: "2+", strength: "4", ap: "0", damage: "1", keywords: ["RAPID FIRE 1"] }, { profileName: "melee", range: "Melee", attacks: "5", skill: "2+", strength: "8", ap: "-2", damage: "2" }] },
    ],
  },

  {
    id: "shield-captain-on-dawneagle-jetbike",
    name: "Shield Captain On Dawneagle Jetbike",
    faction: "adeptus-custodes",
    image: "",
    points: 150,
    canAttachTo: [],
    defaultWargear: [
      { id: "salvo-launcher", name: "Salvo launcher", image: "", profiles: [{ profileName: "flakkburst", range: '24"', attacks: "2", skill: "2+", strength: "6", ap: "-1", damage: "2" }, { profileName: "melta", range: '12"', attacks: "1", skill: "2+", strength: "10", ap: "-4", damage: "D6+2", keywords: ["MELTA 2"] }] },
      { id: "interceptor-lance", name: "Interceptor lance", image: "", profiles: [{ range: "Melee", attacks: "5", skill: "2+", strength: "7", ap: "-3", damage: "2" }] },
    ],
    wargear: [
      { id: "vertus-hurricane-bolter", name: "Vertus hurricane bolter", image: "", profiles: [{ range: '24"', attacks: "8", skill: "2+", strength: "4", ap: "0", damage: "1", keywords: ["RAPID FIRE 4"] }] },
    ],
  },

  {
    id: "trajann-valoris",
    name: "Trajann Valoris",
    faction: "adeptus-custodes",
    image: "",
    points: 140,
    canAttachTo: [],
    defaultWargear: [
      { id: "watcher-s-axe", name: "Watcher's Axe", image: "", profiles: [{ profileName: "ranged", range: '24"', attacks: "3", skill: "2+", strength: "4", ap: "0", damage: "1", keywords: ["RAPID FIRE 1"] }, { profileName: "melee", range: "Melee", attacks: "6", skill: "2+", strength: "9", ap: "-3", damage: "3" }] },
    ],
    wargear: [
      { id: "eagles-scream", name: "Eagle's Scream", image: "", profiles: [{ range: '18"', attacks: "6", skill: "2+", strength: "5", ap: "-1", damage: "1" }] },
    ],
  },

  {
    id: "valerian",
    name: "Valerian",
    faction: "adeptus-custodes",
    image: "",
    points: 110,
    canAttachTo: [],
    defaultWargear: [
      { id: "gnosis", name: "Gnosis", image: "", profiles: [{ profileName: "ranged", range: '24"', attacks: "2", skill: "2+", strength: "4", ap: "-1", damage: "1", keywords: ["RAPID FIRE 1"] }, { profileName: "melee", range: "Melee", attacks: "6", skill: "2+", strength: "8", ap: "-2", damage: "3" }] },
    ],
    wargear: [],
  },

];
