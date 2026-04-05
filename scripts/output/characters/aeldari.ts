import type { Character } from "../../../types/warhammer";

export const aeldariCharacters: Character[] = [

  {
    id: "amallyn-shadowguide",
    name: "Amallyn Shadowguide",
    faction: "aeldari",
    image: "",
    points: 75,
    canAttachTo: [],
    defaultWargear: [
      { id: "ranger-long-rifle", name: "Ranger long rifle", image: "", profiles: [{ range: '36"', attacks: "1", skill: "3+", strength: "4", ap: "-1", damage: "D3", keywords: ["HEAVY", "PRECISION"] }] },
      { id: "power-blade", name: "Power blade", image: "", profiles: [{ range: "Melee", attacks: "3", skill: "3+", strength: "4", ap: "-2", damage: "1" }] },
    ],
    wargear: [],
  },

  {
    id: "asurmen",
    name: "Asurmen",
    faction: "aeldari",
    image: "",
    points: 135,
    canAttachTo: [],
    defaultWargear: [
      { id: "bloody-twins", name: "Bloody Twins", image: "", profiles: [{ range: '18"', attacks: "4", skill: "2+", strength: "5", ap: "-1", damage: "2" }] },
      { id: "sword-of-asur", name: "Sword of Asur", image: "", profiles: [{ range: "Melee", attacks: "5", skill: "2+", strength: "6", ap: "-3", damage: "2", keywords: ["DEVASTATING WOUNDS"] }] },
    ],
    wargear: [],
  },

  {
    id: "autarch",
    name: "Autarch",
    faction: "aeldari",
    image: "",
    points: 75,
    canAttachTo: [],
    defaultWargear: [
      { id: "shuriken-pistol", name: "Shuriken pistol", image: "", profiles: [{ range: '12"', attacks: "2", skill: "3+", strength: "4", ap: "-1", damage: "1", keywords: ["PISTOL"] }] },
      { id: "star-glaive", name: "Star glaive", image: "", profiles: [{ range: "Melee", attacks: "4", skill: "2+", strength: "6", ap: "-2", damage: "D3" }] },
    ],
    wargear: [
      { id: "death-spinner", name: "Death spinner", image: "", profiles: [{ range: '12"', attacks: "2", skill: "3+", strength: "6", ap: "-2", damage: "2", keywords: ["ASSAULT"] }] },
      { id: "dragon-fusion-gun", name: "Dragon fusion gun", image: "", profiles: [{ range: '12"', attacks: "1", skill: "3+", strength: "9", ap: "-4", damage: "D6", keywords: ["ASSAULT", "MELTA 3"] }] },
      { id: "dragon-fusion-pistol", name: "Dragon fusion pistol", image: "", profiles: [{ range: '6"', attacks: "1", skill: "3+", strength: "9", ap: "-4", damage: "D6", keywords: ["MELTA 3", "PISTOL"] }] },
      { id: "reaper-launcher-starshot", name: "Reaper launcher – starshot", image: "", profiles: [{ range: '48"', attacks: "1", skill: "3+", strength: "8", ap: "-3", damage: "D6", keywords: ["HEAVY"] }] },
      { id: "reaper-launcher-starswarm", name: "Reaper launcher – starswarm", image: "", profiles: [{ range: '48"', attacks: "4", skill: "3+", strength: "5", ap: "-1", damage: "1", keywords: ["HEAVY"] }] },
      { id: "banshee-blade", name: "Banshee blade", image: "", profiles: [{ range: "Melee", attacks: "4", skill: "2+", strength: "5", ap: "-2", damage: "1" }] },
      { id: "scorpion-chainsword", name: "Scorpion chainsword", image: "", profiles: [{ range: "Melee", attacks: "5", skill: "3+", strength: "5", ap: "-1", damage: "1" }] },
    ],
  },

  {
    id: "autarch-skyrunner",
    name: "Autarch Skyrunner",
    faction: "aeldari",
    image: "",
    points: 90,
    canAttachTo: [],
    defaultWargear: [
      { id: "laser-lance", name: "Laser lance", image: "", profiles: [{ range: '9"', attacks: "1", skill: "3+", strength: "9", ap: "-3", damage: "D6" }] },
      { id: "twin-shuriken-catapult", name: "Twin shuriken catapult", image: "", profiles: [{ range: '18"', attacks: "4", skill: "3+", strength: "4", ap: "-1", damage: "1", keywords: ["ASSAULT", "TWIN-LINKED"] }] },
      { id: "close-combat-weapon", name: "Close combat weapon", image: "", profiles: [{ range: "Melee", attacks: "3", skill: "3+", strength: "3", ap: "0", damage: "1" }] },
    ],
    wargear: [
      { id: "dragon-fusion-gun", name: "Dragon fusion gun", image: "", profiles: [{ range: '12"', attacks: "1", skill: "3+", strength: "9", ap: "-4", damage: "D6", keywords: ["ASSAULT", "MELTA 3"] }] },
      { id: "banshee-blade", name: "Banshee blade", image: "", profiles: [{ range: "Melee", attacks: "4", skill: "2+", strength: "5", ap: "-2", damage: "1" }] },
    ],
  },

  {
    id: "autarch-wayleaper",
    name: "Autarch Wayleaper",
    faction: "aeldari",
    image: "",
    points: 80,
    canAttachTo: [],
    defaultWargear: [
      { id: "shuriken-pistol", name: "Shuriken pistol", image: "", profiles: [{ range: '12"', attacks: "2", skill: "3+", strength: "4", ap: "-1", damage: "1", keywords: ["PISTOL"] }] },
      { id: "star-glaive", name: "Star glaive", image: "", profiles: [{ range: "Melee", attacks: "4", skill: "2+", strength: "6", ap: "-2", damage: "D3" }] },
    ],
    wargear: [
      { id: "death-spinner", name: "Death spinner", image: "", profiles: [{ range: '12"', attacks: "2", skill: "3+", strength: "6", ap: "-2", damage: "2", keywords: ["ASSAULT"] }] },
      { id: "dragon-fusion-gun", name: "Dragon fusion gun", image: "", profiles: [{ range: '12"', attacks: "1", skill: "3+", strength: "9", ap: "-4", damage: "D6", keywords: ["ASSAULT", "MELTA 3"] }] },
      { id: "dragon-fusion-pistol", name: "Dragon fusion pistol", image: "", profiles: [{ range: '6"', attacks: "1", skill: "3+", strength: "9", ap: "-4", damage: "D6", keywords: ["MELTA 3", "PISTOL"] }] },
      { id: "reaper-launcher-starshot", name: "Reaper launcher – starshot", image: "", profiles: [{ range: '48"', attacks: "1", skill: "3+", strength: "8", ap: "-3", damage: "D6", keywords: ["HEAVY"] }] },
      { id: "reaper-launcher-starswarm", name: "Reaper launcher – starswarm", image: "", profiles: [{ range: '48"', attacks: "4", skill: "3+", strength: "5", ap: "-1", damage: "1", keywords: ["HEAVY"] }] },
      { id: "banshee-blade", name: "Banshee blade", image: "", profiles: [{ range: "Melee", attacks: "4", skill: "2+", strength: "5", ap: "-2", damage: "1" }] },
      { id: "scorpion-chainsword", name: "Scorpion chainsword", image: "", profiles: [{ range: "Melee", attacks: "5", skill: "3+", strength: "5", ap: "-1", damage: "1" }] },
    ],
  },

  {
    id: "avatar-of-khaine",
    name: "Avatar Of Khaine",
    faction: "aeldari",
    image: "",
    points: 300,
    canAttachTo: [],
    defaultWargear: [
      { id: "the-wailing-doom", name: "The Wailing Doom", image: "", profiles: [{ range: '18"', attacks: "3", skill: "2+", strength: "12", ap: "-4", damage: "D6" }] },
      { id: "the-wailing-doom-strike", name: "The Wailing Doom – strike", image: "", profiles: [{ range: "Melee", attacks: "6", skill: "2+", strength: "14", ap: "-4", damage: "D6+2" }] },
      { id: "the-wailing-doom-sweep", name: "The Wailing Doom – sweep", image: "", profiles: [{ range: "Melee", attacks: "12", skill: "2+", strength: "7", ap: "-2", damage: "2" }] },
    ],
    wargear: [],
  },

  {
    id: "baharroth",
    name: "Baharroth",
    faction: "aeldari",
    image: "",
    points: 115,
    canAttachTo: [],
    defaultWargear: [
      { id: "fury-of-the-tempest", name: "Fury of the Tempest", image: "", profiles: [{ range: '18"', attacks: "6", skill: "2+", strength: "4", ap: "-1", damage: "1", keywords: ["ASSAULT"] }] },
      { id: "shining-blade", name: "Shining Blade", image: "", profiles: [{ range: "Melee", attacks: "6", skill: "2+", strength: "5", ap: "-3", damage: "2" }] },
    ],
    wargear: [],
  },

  {
    id: "bonesinger",
    name: "Bonesinger",
    faction: "aeldari",
    image: "",
    points: 45,
    canAttachTo: [],
    defaultWargear: [
      { id: "psytronome-shaper", name: "Psytronome shaper", image: "", profiles: [{ range: "Melee", attacks: "3", skill: "3+", strength: "3", ap: "-1", damage: "1" }] },
    ],
    wargear: [],
  },

  {
    id: "death-jester",
    name: "Death Jester",
    faction: "aeldari",
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
    id: "eldrad-ulthran",
    name: "Eldrad Ulthran",
    faction: "aeldari",
    image: "",
    points: 110,
    canAttachTo: [],
    defaultWargear: [
      { id: "mind-war", name: "Mind War", image: "", profiles: [{ range: '18"', attacks: "1", skill: "2+", strength: "9", ap: "-3", damage: "D6", keywords: ["ANTI-CHARACTER 4+", "PSYCHIC"] }] },
      { id: "shuriken-pistol", name: "Shuriken pistol", image: "", profiles: [{ range: '12"', attacks: "2", skill: "3+", strength: "4", ap: "-1", damage: "1", keywords: ["PISTOL"] }] },
      { id: "staff-of-ulthamar-and-witchblade", name: "Staff of Ulthamar and witchblade", image: "", profiles: [{ range: "Melee", attacks: "5", skill: "2+", strength: "6", ap: "-2", damage: "D3", keywords: ["PSYCHIC"] }] },
    ],
    wargear: [],
  },

  {
    id: "farseer",
    name: "Farseer",
    faction: "aeldari",
    image: "",
    points: 70,
    canAttachTo: [],
    defaultWargear: [
      { id: "eldritch-storm", name: "Eldritch Storm", image: "", profiles: [{ range: '18"', attacks: "D6+3", skill: "3+", strength: "6", ap: "-2", damage: "D3", keywords: ["BLAST", "PSYCHIC"] }] },
      { id: "shuriken-pistol", name: "Shuriken pistol", image: "", profiles: [{ range: '12"', attacks: "2", skill: "3+", strength: "4", ap: "-1", damage: "1", keywords: ["PISTOL"] }] },
      { id: "witchblade", name: "Witchblade", image: "", profiles: [{ range: "Melee", attacks: "4", skill: "3+", strength: "6", ap: "-1", damage: "D3", keywords: ["PSYCHIC"] }] },
    ],
    wargear: [
      { id: "singing-spear", name: "Singing spear", image: "", profiles: [{ range: '12"', attacks: "1", skill: "3+", strength: "9", ap: "-4", damage: "D6", keywords: ["PSYCHIC", "PISTOL"] }] },
    ],
  },

  {
    id: "farseer-skyrunner",
    name: "Farseer Skyrunner",
    faction: "aeldari",
    image: "",
    points: 80,
    canAttachTo: [],
    defaultWargear: [
      { id: "eldritch-storm", name: "Eldritch Storm", image: "", profiles: [{ range: '18"', attacks: "D6+3", skill: "3+", strength: "6", ap: "-2", damage: "D3", keywords: ["BLAST", "PSYCHIC"] }] },
      { id: "shuriken-pistol", name: "Shuriken pistol", image: "", profiles: [{ range: '12"', attacks: "2", skill: "3+", strength: "4", ap: "-1", damage: "1", keywords: ["PISTOL"] }] },
      { id: "twin-shuriken-catapult", name: "Twin shuriken catapult", image: "", profiles: [{ range: '18"', attacks: "4", skill: "3+", strength: "4", ap: "-1", damage: "1", keywords: ["ASSAULT", "TWIN-LINKED"] }] },
      { id: "witchblade", name: "Witchblade", image: "", profiles: [{ range: "Melee", attacks: "4", skill: "3+", strength: "6", ap: "-1", damage: "D3", keywords: ["PSYCHIC"] }] },
    ],
    wargear: [
      { id: "singing-spear", name: "Singing spear", image: "", profiles: [{ range: '12"', attacks: "1", skill: "3+", strength: "9", ap: "-4", damage: "D6", keywords: ["PSYCHIC", "PISTOL"] }] },
    ],
  },

  {
    id: "fuegan",
    name: "Fuegan",
    faction: "aeldari",
    image: "",
    points: 120,
    canAttachTo: [],
    defaultWargear: [
      { id: "searsong-beam", name: "Searsong – beam", image: "", profiles: [{ range: '12"', attacks: "D6+3", skill: "N/A", strength: "6", ap: "-1", damage: "1", keywords: ["IGNORES COVER", "TORRENT"] }] },
      { id: "searsong-lance", name: "Searsong – lance", image: "", profiles: [{ range: '12"', attacks: "1", skill: "3+", strength: "12", ap: "-4", damage: "D6", keywords: ["MELTA 4"] }] },
      { id: "fire-axe", name: "Fire Axe", image: "", profiles: [{ range: "Melee", attacks: "5", skill: "2+", strength: "8", ap: "-3", damage: "2" }] },
    ],
    wargear: [],
  },

  {
    id: "illic-nightspear",
    name: "Illic Nightspear",
    faction: "aeldari",
    image: "",
    points: 70,
    canAttachTo: [],
    defaultWargear: [
      { id: "shuriken-pistol", name: "Shuriken pistol", image: "", profiles: [{ range: '12"', attacks: "2", skill: "3+", strength: "4", ap: "-1", damage: "1", keywords: ["PISTOL"] }] },
      { id: "voidbringer", name: "Voidbringer", image: "", profiles: [{ range: '36"', attacks: "1", skill: "2+", strength: "6", ap: "-2", damage: "D3+1", keywords: ["HEAVY", "PRECISION"] }] },
      { id: "aeldari-power-sword", name: "Aeldari power sword", image: "", profiles: [{ range: "Melee", attacks: "4", skill: "2+", strength: "4", ap: "-2", damage: "1" }] },
    ],
    wargear: [],
  },

  {
    id: "irillyth",
    name: "Irillyth",
    faction: "aeldari",
    image: "",
    points: 105,
    canAttachTo: [],
    defaultWargear: [
      { id: "spear-of-starlight", name: "Spear of Starlight", image: "", profiles: [{ range: '18"', attacks: "3", skill: "2+", strength: "5", ap: "-2", damage: "D3", keywords: ["ASSAULT"] }] },
    ],
    wargear: [],
  },

  {
    id: "jain-zar",
    name: "Jain Zar",
    faction: "aeldari",
    image: "",
    points: 105,
    canAttachTo: [],
    defaultWargear: [
      { id: "silent-death", name: "Silent Death", image: "", profiles: [{ range: '12"', attacks: "3", skill: "2+", strength: "4", ap: "-1", damage: "1", keywords: ["PISTOL"] }] },
      { id: "blade-of-destruction", name: "Blade of Destruction", image: "", profiles: [{ range: "Melee", attacks: "5", skill: "2+", strength: "5", ap: "-3", damage: "2" }] },
    ],
    wargear: [],
  },

  {
    id: "karandras",
    name: "Karandras",
    faction: "aeldari",
    image: "",
    points: 90,
    canAttachTo: [],
    defaultWargear: [
      { id: "arhra-s-bane", name: "Arhra's Bane", image: "", profiles: [{ range: "Melee", attacks: "6", skill: "2+", strength: "5", ap: "-3", damage: "2", keywords: ["DEVASTATING WOUNDS"] }] },
      { id: "isirmathil", name: "Isirmathil", image: "", profiles: [{ range: "Melee", attacks: "4", skill: "2+", strength: "5", ap: "-2", damage: "1" }] },
    ],
    wargear: [],
  },

  {
    id: "lhykhis",
    name: "Lhykhis",
    faction: "aeldari",
    image: "",
    points: 120,
    canAttachTo: [],
    defaultWargear: [
      { id: "brood-twain", name: "Brood Twain", image: "", profiles: [{ range: "Melee", attacks: "4", skill: "2+", strength: "4", ap: "-1", damage: "1" }] },
      { id: "spider-s-fangs", name: "Spider's Fangs", image: "", profiles: [{ range: "Melee", attacks: "3", skill: "2+", strength: "4", ap: "-2", damage: "D3" }] },
      { id: "weaverender", name: "Weaverender", image: "", profiles: [{ range: "Melee", attacks: "5", skill: "2+", strength: "6", ap: "-3", damage: "2" }] },
    ],
    wargear: [],
  },

  {
    id: "maugan-ra",
    name: "Maugan Ra",
    faction: "aeldari",
    image: "",
    points: 100,
    canAttachTo: [],
    defaultWargear: [
      { id: "maugetar", name: "Maugetar", image: "", profiles: [{ range: '36"', attacks: "4", skill: "2+", strength: "7", ap: "-3", damage: "2", keywords: ["ASSAULT", "PRECISION"] }] },
    ],
    wargear: [],
  },

  {
    id: "prince-yriel",
    name: "Prince Yriel",
    faction: "aeldari",
    image: "",
    points: 100,
    canAttachTo: [],
    defaultWargear: [
      { id: "the-eye-of-wrath", name: "The Eye of Wrath", image: "", profiles: [{ range: '12"', attacks: "D6", skill: "N/A", strength: "4", ap: "-1", damage: "1", keywords: ["IGNORES COVER", "PISTOL", "TORRENT"] }] },
      { id: "the-spear-of-twilight", name: "The Spear of Twilight", image: "", profiles: [{ range: "Melee", attacks: "5", skill: "2+", strength: "7", ap: "-3", damage: "D3", keywords: ["DEVASTATING WOUNDS"] }] },
    ],
    wargear: [],
  },

  {
    id: "shadowseer",
    name: "Shadowseer",
    faction: "aeldari",
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
    faction: "aeldari",
    image: "",
    points: 115,
    canAttachTo: [],
    defaultWargear: [
      { id: "solitaire-weapons", name: "Solitaire weapons", image: "", profiles: [{ range: "Melee", attacks: "8", skill: "2+", strength: "5", ap: "-2", damage: "2" }] },
    ],
    wargear: [],
  },

  {
    id: "spiritseer",
    name: "Spiritseer",
    faction: "aeldari",
    image: "",
    points: 65,
    canAttachTo: [],
    defaultWargear: [
      { id: "shuriken-pistol", name: "Shuriken pistol", image: "", profiles: [{ range: '12"', attacks: "2", skill: "3+", strength: "4", ap: "-1", damage: "1", keywords: ["PISTOL"] }] },
      { id: "witch-staff", name: "Witch staff", image: "", profiles: [{ range: "Melee", attacks: "3", skill: "3+", strength: "5", ap: "-1", damage: "D3", keywords: ["PSYCHIC"] }] },
    ],
    wargear: [],
  },

  {
    id: "the-visarch",
    name: "The Visarch",
    faction: "aeldari",
    image: "",
    points: 90,
    canAttachTo: [],
    defaultWargear: [
      { id: "asu-var-quicksilver-stance", name: "Asu-var – quicksilver stance", image: "", profiles: [{ range: "Melee", attacks: "8", skill: "2+", strength: "4", ap: "-2", damage: "1" }] },
      { id: "asu-var-duellist-stance", name: "Asu-var – duellist stance", image: "", profiles: [{ range: "Melee", attacks: "5", skill: "2+", strength: "5", ap: "-3", damage: "2" }] },
      { id: "asu-var-mythic-stance", name: "Asu-var – mythic stance", image: "", profiles: [{ range: "Melee", attacks: "3", skill: "2+", strength: "6", ap: "-4", damage: "3" }] },
    ],
    wargear: [],
  },

  {
    id: "the-yncarne",
    name: "The Yncarne",
    faction: "aeldari",
    image: "",
    points: 250,
    canAttachTo: [],
    defaultWargear: [
      { id: "swirling-soul-energy", name: "Swirling soul energy", image: "", profiles: [{ range: '9"', attacks: "D6+3", skill: "N/A", strength: "6", ap: "-1", damage: "1", keywords: ["IGNORES COVER", "TORRENT"] }] },
      { id: "vilith-zhar-strike", name: "Vilith-zhar – strike", image: "", profiles: [{ range: "Melee", attacks: "5", skill: "2+", strength: "12", ap: "-4", damage: "D6+2" }] },
      { id: "vilith-zhar-sweep", name: "Vilith-zhar – sweep", image: "", profiles: [{ range: "Melee", attacks: "10", skill: "2+", strength: "6", ap: "-2", damage: "2" }] },
    ],
    wargear: [],
  },

  {
    id: "troupe-master",
    name: "Troupe Master",
    faction: "aeldari",
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
    id: "warlock",
    name: "Warlock",
    faction: "aeldari",
    image: "",
    points: 45,
    canAttachTo: [],
    defaultWargear: [
      { id: "destructor", name: "Destructor", image: "", profiles: [{ range: '12"', attacks: "D6+1", skill: "N/A", strength: "5", ap: "-1", damage: "1", keywords: ["IGNORES COVER", "PSYCHIC", "TORRENT"] }] },
      { id: "shuriken-pistol", name: "Shuriken pistol", image: "", profiles: [{ range: '12"', attacks: "2", skill: "3+", strength: "4", ap: "-1", damage: "1", keywords: ["PISTOL"] }] },
      { id: "witchblade", name: "Witchblade", image: "", profiles: [{ range: "Melee", attacks: "4", skill: "3+", strength: "6", ap: "-1", damage: "D3", keywords: ["PSYCHIC"] }] },
    ],
    wargear: [
      { id: "singing-spear", name: "Singing spear", image: "", profiles: [{ range: '12"', attacks: "1", skill: "3+", strength: "9", ap: "-4", damage: "D6", keywords: ["PSYCHIC", "PISTOL"] }] },
    ],
  },

  {
    id: "ynnari-archon",
    name: "Ynnari Archon",
    faction: "aeldari",
    image: "",
    points: 75,
    canAttachTo: [],
    defaultWargear: [
      { id: "splinter-pistol", name: "Splinter pistol", image: "", profiles: [{ range: '12"', attacks: "2", skill: "3+", strength: "2", ap: "0", damage: "1", keywords: ["PISTOL", "RAPID FIRE 1"] }] },
      { id: "huskblade", name: "Huskblade", image: "", profiles: [{ range: "Melee", attacks: "5", skill: "3+", strength: "4", ap: "-2", damage: "2" }] },
    ],
    wargear: [
      { id: "blast-pistol", name: "Blast pistol", image: "", profiles: [{ range: '6"', attacks: "1", skill: "3+", strength: "8", ap: "-4", damage: "D3", keywords: ["MELTA 2", "PISTOL"] }] },
    ],
  },

  {
    id: "ynnari-succubus",
    name: "Ynnari Succubus",
    faction: "aeldari",
    image: "",
    points: 45,
    canAttachTo: [],
    defaultWargear: [
      { id: "succubus-weapons", name: "Succubus weapons", image: "", profiles: [{ range: "Melee", attacks: "5", skill: "2+", strength: "4", ap: "-2", damage: "1" }] },
    ],
    wargear: [
      { id: "blast-pistol", name: "Blast pistol", image: "", profiles: [{ range: '6"', attacks: "1", skill: "3+", strength: "8", ap: "-4", damage: "D3", keywords: ["MELTA 2", "PISTOL"] }] },
      { id: "splinter-pistol", name: "Splinter pistol", image: "", profiles: [{ range: '12"', attacks: "2", skill: "3+", strength: "2", ap: "0", damage: "1", keywords: ["PISTOL", "RAPID FIRE 1"] }] },
    ],
  },

  {
    id: "yvraine",
    name: "Yvraine",
    faction: "aeldari",
    image: "",
    points: 100,
    canAttachTo: [],
    defaultWargear: [
      { id: "storm-of-whispers", name: "Storm of Whispers", image: "", profiles: [{ range: '18"', attacks: "D6+3", skill: "3+", strength: "4", ap: "-1", damage: "1", keywords: ["PSYCHIC"] }] },
      { id: "kha-vir", name: "Kha-vir", image: "", profiles: [{ range: "Melee", attacks: "5", skill: "2+", strength: "5", ap: "-3", damage: "2", keywords: ["PSYCHIC"] }] },
    ],
    wargear: [],
  },

];
