import type { Character } from "../../../types/warhammer";

export const chaosDaemonsCharacters: Character[] = [

  {
    id: "aetaos-rau-keres",
    name: "Aetaos Rau Keres",
    faction: "chaos-daemons",
    image: "",
    points: 315,
    canAttachTo: [],
    defaultWargear: [
      { id: "bolt-of-tzeentch-focused-witchfire", name: "Bolt of Tzeentch – focused witchfire", image: "", profiles: [{ range: '24"', attacks: "D6", skill: "3+", strength: "8", ap: "-2", damage: "D3", keywords: ["PSYCHIC"] }] },
      { id: "bolt-of-tzeentch-witchfire", name: "Bolt of Tzeentch – witchfire", image: "", profiles: [{ range: '24"', attacks: "D6", skill: "3+", strength: "7", ap: "-1", damage: "2", keywords: ["PSYCHIC"] }] },
      { id: "staff-of-cataclysm", name: "Staff of cataclysm", image: "", profiles: [{ range: "Melee", attacks: "8", skill: "2+", strength: "12", ap: "-3", damage: "D6", keywords: ["PSYCHIC"] }] },
      { id: "warpfire-talons", name: "Warpfire talons", image: "", profiles: [{ range: "Melee", attacks: "6", skill: "2+", strength: "8", ap: "-2", damage: "3", keywords: ["PSYCHIC"] }] },
    ],
    wargear: [],
  },

  {
    id: "an-ggrath-the-unbound",
    name: "An Ggrath The Unbound",
    faction: "chaos-daemons",
    image: "",
    points: 415,
    canAttachTo: [],
    defaultWargear: [
      { id: "bloodlash", name: "Bloodlash", image: "", profiles: [{ range: '12"', attacks: "4", skill: "3+", strength: "8", ap: "-2", damage: "2", keywords: ["DEVASTATING WOUNDS"] }] },
      { id: "axe-of-khorne-strike", name: "Axe of Khorne – strike", image: "", profiles: [{ range: "Melee", attacks: "6", skill: "2+", strength: "16", ap: "-4", damage: "D6+2", keywords: ["DEVASTATING WOUNDS"] }] },
      { id: "axe-of-khorne-sweep", name: "Axe of Khorne – sweep", image: "", profiles: [{ range: "Melee", attacks: "12", skill: "2+", strength: "8", ap: "-2", damage: "2" }] },
    ],
    wargear: [],
  },

  {
    id: "be-lakor",
    name: "Be Lakor",
    faction: "chaos-daemons",
    image: "",
    points: 375,
    canAttachTo: [],
    defaultWargear: [
      { id: "betraying-shades-witchfire", name: "Betraying Shades – witchfire", image: "", profiles: [{ range: '18"', attacks: "D6", skill: "3+", strength: "6", ap: "-1", damage: "2", keywords: ["PSYCHIC"] }] },
      { id: "betraying-shades-focused-witchfire", name: "Betraying Shades – focused witchfire", image: "", profiles: [{ range: '18"', attacks: "D6", skill: "3+", strength: "8", ap: "-2", damage: "3", keywords: ["PSYCHIC"] }] },
      { id: "the-blade-of-shadows-strike", name: "The Blade of Shadows – strike", image: "", profiles: [{ range: "Melee", attacks: "6", skill: "2+", strength: "14", ap: "-4", damage: "D6+1" }] },
      { id: "the-blade-of-shadows-sweep", name: "The Blade of Shadows – sweep", image: "", profiles: [{ range: "Melee", attacks: "10", skill: "2+", strength: "7", ap: "-2", damage: "2" }] },
    ],
    wargear: [],
  },

  {
    id: "bloodmaster",
    name: "Bloodmaster",
    faction: "chaos-daemons",
    image: "",
    points: 65,
    canAttachTo: [],
    defaultWargear: [
      { id: "blade-of-blood", name: "Blade of blood", image: "", profiles: [{ range: "Melee", attacks: "4", skill: "3+", strength: "6", ap: "-1", damage: "2", keywords: ["DEVASTATING WOUNDS"] }] },
    ],
    wargear: [],
  },

  {
    id: "bloodthirster",
    name: "Bloodthirster",
    faction: "chaos-daemons",
    image: "",
    points: 305,
    canAttachTo: [],
    defaultWargear: [
      { id: "hellfire-breath", name: "Hellfire breath", image: "", profiles: [{ range: '12"', attacks: "D6", skill: "N/A", strength: "6", ap: "-2", damage: "2", keywords: ["IGNORES COVER", "TORRENT"] }] },
      { id: "great-axe-of-khorne-strike", name: "Great axe of Khorne – strike", image: "", profiles: [{ range: "Melee", attacks: "6", skill: "2+", strength: "14", ap: "-3", damage: "D6+1", keywords: ["DEVASTATING WOUNDS"] }] },
      { id: "great-axe-of-khorne-sweep", name: "Great axe of Khorne – sweep", image: "", profiles: [{ range: "Melee", attacks: "10", skill: "2+", strength: "7", ap: "-2", damage: "2" }] },
    ],
    wargear: [
      { id: "bloodflail", name: "Bloodflail", image: "", profiles: [{ range: '6"', attacks: "D6+3", skill: "N/A", strength: "8", ap: "-2", damage: "2", keywords: ["IGNORES COVER", "TORRENT"] }] },
      { id: "lash-of-khorne", name: "Lash of Khorne", image: "", profiles: [{ range: '12"', attacks: "4", skill: "3+", strength: "8", ap: "-2", damage: "2", keywords: ["DEVASTATING WOUNDS"] }] },
    ],
  },

  {
    id: "changecaster",
    name: "Changecaster",
    faction: "chaos-daemons",
    image: "",
    points: 60,
    canAttachTo: [],
    defaultWargear: [
      { id: "arcane-fireball-witchfire", name: "Arcane Fireball – witchfire", image: "", profiles: [{ range: '18"', attacks: "D6", skill: "3+", strength: "5", ap: "-1", damage: "1", keywords: ["BLAST", "PSYCHIC"] }] },
      { id: "arcane-fireball-focused-witchfire", name: "Arcane Fireball – focused witchfire", image: "", profiles: [{ range: '18"', attacks: "D3", skill: "3+", strength: "5", ap: "-2", damage: "2", keywords: ["PSYCHIC"] }] },
      { id: "herald-combat-weapon", name: "Herald combat weapon", image: "", profiles: [{ range: "Melee", attacks: "3", skill: "3+", strength: "4", ap: "-1", damage: "1" }] },
    ],
    wargear: [],
  },

  {
    id: "chaos-lord",
    name: "Chaos Lord",
    faction: "chaos-daemons",
    image: "",
    points: 90,
    canAttachTo: [],
    defaultWargear: [
      { id: "plasma-pistol", name: "Plasma pistol", image: "", profiles: [{ profileName: "standard", range: '12"', attacks: "1", skill: "3+", strength: "7", ap: "-2", damage: "1", keywords: ["PISTOL"] }, { profileName: "supercharge", range: '12"', attacks: "1", skill: "3+", strength: "8", ap: "-3", damage: "2", keywords: ["PISTOL", "HAZARDOUS"] }] },
      { id: "daemon-hammer", name: "Daemon hammer", image: "", profiles: [{ range: "Melee", attacks: "3", skill: "3+", strength: "8", ap: "-2", damage: "3" }] },
    ],
    wargear: [
      { id: "accursed-weapon", name: "Accursed weapon", image: "", profiles: [{ range: "Melee", attacks: "5", skill: "3+", strength: "5", ap: "-2", damage: "1" }] },
    ],
  },

  {
    id: "chaos-lord-in-terminator-armour",
    name: "Chaos Lord In Terminator Armour",
    faction: "chaos-daemons",
    image: "",
    points: 95,
    canAttachTo: [],
    defaultWargear: [
      { id: "combi-bolter", name: "Combi-bolter", image: "", profiles: [{ range: '24"', attacks: "2", skill: "3+", strength: "4", ap: "0", damage: "1", keywords: ["RAPID FIRE 2"] }] },
      { id: "exalted-weapon", name: "Exalted weapon", image: "", profiles: [{ range: "Melee", attacks: "5", skill: "3+", strength: "6", ap: "-2", damage: "2" }] },
    ],
    wargear: [
      { id: "chainfist", name: "Chainfist", image: "", profiles: [{ range: "Melee", attacks: "3", skill: "3+", strength: "8", ap: "-4", damage: "2" }] },
      { id: "power-fist", name: "Power fist", image: "", profiles: [{ range: "Melee", attacks: "3", skill: "3+", strength: "8", ap: "-2", damage: "2" }] },
    ],
  },

  {
    id: "chaos-lord-on-disc-of-tzeentch",
    name: "Chaos Lord On Disc Of Tzeentch",
    faction: "chaos-daemons",
    image: "",
    points: 100,
    canAttachTo: [],
    defaultWargear: [
      { id: "bolt-pistol", name: "Bolt pistol", image: "", profiles: [{ range: '12"', attacks: "1", skill: "3+", strength: "4", ap: "0", damage: "1", keywords: ["PISTOL"] }] },
      { id: "astartes-chainsword", name: "Astartes chainsword", image: "", profiles: [{ range: "Melee", attacks: "4", skill: "3+", strength: "4", ap: "-1", damage: "1" }] },
      { id: "close-combat-weapon", name: "Close combat weapon", image: "", profiles: [{ range: "Melee", attacks: "3", skill: "3+", strength: "4", ap: "0", damage: "1" }] },
    ],
    wargear: [
      { id: "combi-bolter", name: "Combi-bolter", image: "", profiles: [{ range: '24"', attacks: "2", skill: "3+", strength: "4", ap: "0", damage: "1", keywords: ["RAPID FIRE 2"] }] },
      { id: "combi-weapon", name: "Combi-weapon", image: "", profiles: [{ range: '24"', attacks: "2", skill: "3+", strength: "4", ap: "0", damage: "1", keywords: ["RAPID FIRE 1"] }] },
      { id: "plasma-pistol", name: "Plasma pistol", image: "", profiles: [{ profileName: "standard", range: '12"', attacks: "1", skill: "3+", strength: "7", ap: "-2", damage: "1", keywords: ["PISTOL"] }, { profileName: "supercharge", range: '12"', attacks: "1", skill: "3+", strength: "8", ap: "-3", damage: "2", keywords: ["PISTOL", "HAZARDOUS"] }] },
      { id: "accursed-weapon", name: "Accursed weapon", image: "", profiles: [{ range: "Melee", attacks: "5", skill: "3+", strength: "5", ap: "-2", damage: "1" }] },
      { id: "paired-accursed-weapons", name: "Paired accursed weapons", image: "", profiles: [{ range: "Melee", attacks: "6", skill: "3+", strength: "5", ap: "-2", damage: "1", keywords: ["TWIN-LINKED"] }] },
      { id: "power-fist", name: "Power fist", image: "", profiles: [{ range: "Melee", attacks: "3", skill: "3+", strength: "8", ap: "-2", damage: "2" }] },
    ],
  },

  {
    id: "chaos-lord-on-juggernaut",
    name: "Chaos Lord On Juggernaut",
    faction: "chaos-daemons",
    image: "",
    points: 115,
    canAttachTo: [],
    defaultWargear: [
      { id: "bolt-pistol", name: "Bolt pistol", image: "", profiles: [{ range: '12"', attacks: "1", skill: "3+", strength: "4", ap: "0", damage: "1", keywords: ["PISTOL"] }] },
      { id: "astartes-chainsword", name: "Astartes chainsword", image: "", profiles: [{ range: "Melee", attacks: "4", skill: "3+", strength: "4", ap: "-1", damage: "1" }] },
      { id: "bladed-horn", name: "Bladed horn", image: "", profiles: [{ range: "Melee", attacks: "3", skill: "4+", strength: "6", ap: "-1", damage: "2" }] },
      { id: "close-combat-weapon", name: "Close combat weapon", image: "", profiles: [{ range: "Melee", attacks: "3", skill: "3+", strength: "4", ap: "0", damage: "1" }] },
    ],
    wargear: [
      { id: "combi-bolter", name: "Combi-bolter", image: "", profiles: [{ range: '24"', attacks: "2", skill: "3+", strength: "4", ap: "0", damage: "1", keywords: ["RAPID FIRE 2"] }] },
      { id: "combi-weapon", name: "Combi-weapon", image: "", profiles: [{ range: '24"', attacks: "2", skill: "3+", strength: "4", ap: "0", damage: "1", keywords: ["RAPID FIRE 1"] }] },
      { id: "plasma-pistol", name: "Plasma pistol", image: "", profiles: [{ profileName: "standard", range: '12"', attacks: "1", skill: "3+", strength: "7", ap: "-2", damage: "1", keywords: ["PISTOL"] }, { profileName: "supercharge", range: '12"', attacks: "1", skill: "3+", strength: "8", ap: "-3", damage: "2", keywords: ["PISTOL", "HAZARDOUS"] }] },
      { id: "accursed-weapon", name: "Accursed weapon", image: "", profiles: [{ range: "Melee", attacks: "5", skill: "3+", strength: "5", ap: "-2", damage: "1" }] },
      { id: "paired-accursed-weapons", name: "Paired accursed weapons", image: "", profiles: [{ range: "Melee", attacks: "6", skill: "3+", strength: "5", ap: "-2", damage: "1", keywords: ["TWIN-LINKED"] }] },
      { id: "power-fist", name: "Power fist", image: "", profiles: [{ range: "Melee", attacks: "3", skill: "3+", strength: "8", ap: "-2", damage: "2" }] },
    ],
  },

  {
    id: "chaos-lord-on-palanquin-of-nurgle",
    name: "Chaos Lord On Palanquin Of Nurgle",
    faction: "chaos-daemons",
    image: "",
    points: 90,
    canAttachTo: [],
    defaultWargear: [
      { id: "bolt-pistol", name: "Bolt pistol", image: "", profiles: [{ range: '12"', attacks: "1", skill: "3+", strength: "4", ap: "0", damage: "1", keywords: ["PISTOL"] }] },
      { id: "astartes-chainsword", name: "Astartes chainsword", image: "", profiles: [{ range: "Melee", attacks: "4", skill: "3+", strength: "4", ap: "-1", damage: "1" }] },
      { id: "close-combat-weapon", name: "Close combat weapon", image: "", profiles: [{ range: "Melee", attacks: "3", skill: "3+", strength: "4", ap: "0", damage: "1" }] },
      { id: "nurgling-s-claws-and-teeth", name: "Nurgling's claws and teeth", image: "", profiles: [{ range: "Melee", attacks: "5", skill: "5+", strength: "2", ap: "0", damage: "1" }] },
    ],
    wargear: [
      { id: "combi-bolter", name: "Combi-bolter", image: "", profiles: [{ range: '24"', attacks: "2", skill: "3+", strength: "4", ap: "0", damage: "1", keywords: ["RAPID FIRE 2"] }] },
      { id: "combi-weapon", name: "Combi-weapon", image: "", profiles: [{ range: '24"', attacks: "2", skill: "3+", strength: "4", ap: "0", damage: "1", keywords: ["RAPID FIRE 1"] }] },
      { id: "plasma-pistol", name: "Plasma pistol", image: "", profiles: [{ profileName: "standard", range: '12"', attacks: "1", skill: "3+", strength: "7", ap: "-2", damage: "1", keywords: ["PISTOL"] }, { profileName: "supercharge", range: '12"', attacks: "1", skill: "3+", strength: "8", ap: "-3", damage: "2", keywords: ["PISTOL", "HAZARDOUS"] }] },
      { id: "accursed-weapon", name: "Accursed weapon", image: "", profiles: [{ range: "Melee", attacks: "5", skill: "3+", strength: "5", ap: "-2", damage: "1" }] },
      { id: "paired-accursed-weapons", name: "Paired accursed weapons", image: "", profiles: [{ range: "Melee", attacks: "6", skill: "3+", strength: "5", ap: "-2", damage: "1", keywords: ["TWIN-LINKED"] }] },
      { id: "power-fist", name: "Power fist", image: "", profiles: [{ range: "Melee", attacks: "3", skill: "3+", strength: "8", ap: "-2", damage: "2" }] },
    ],
  },

  {
    id: "chaos-lord-on-steed-of-slaanesh",
    name: "Chaos Lord On Steed Of Slaanesh",
    faction: "chaos-daemons",
    image: "",
    points: 100,
    canAttachTo: [],
    defaultWargear: [
      { id: "bolt-pistol", name: "Bolt pistol", image: "", profiles: [{ range: '12"', attacks: "1", skill: "3+", strength: "4", ap: "0", damage: "1", keywords: ["PISTOL"] }] },
      { id: "astartes-chainsword", name: "Astartes chainsword", image: "", profiles: [{ range: "Melee", attacks: "4", skill: "3+", strength: "4", ap: "-1", damage: "1" }] },
      { id: "close-combat-weapon", name: "Close combat weapon", image: "", profiles: [{ range: "Melee", attacks: "3", skill: "3+", strength: "4", ap: "0", damage: "1" }] },
      { id: "lashing-tongue", name: "Lashing tongue", image: "", profiles: [{ range: "Melee", attacks: "2", skill: "4+", strength: "4", ap: "0", damage: "1" }] },
    ],
    wargear: [
      { id: "combi-bolter", name: "Combi-bolter", image: "", profiles: [{ range: '24"', attacks: "2", skill: "3+", strength: "4", ap: "0", damage: "1", keywords: ["RAPID FIRE 2"] }] },
      { id: "combi-weapon", name: "Combi-weapon", image: "", profiles: [{ range: '24"', attacks: "2", skill: "3+", strength: "4", ap: "0", damage: "1", keywords: ["RAPID FIRE 1"] }] },
      { id: "plasma-pistol", name: "Plasma pistol", image: "", profiles: [{ profileName: "standard", range: '12"', attacks: "1", skill: "3+", strength: "7", ap: "-2", damage: "1", keywords: ["PISTOL"] }, { profileName: "supercharge", range: '12"', attacks: "1", skill: "3+", strength: "8", ap: "-3", damage: "2", keywords: ["PISTOL", "HAZARDOUS"] }] },
      { id: "accursed-weapon", name: "Accursed weapon", image: "", profiles: [{ range: "Melee", attacks: "5", skill: "3+", strength: "5", ap: "-2", damage: "1" }] },
      { id: "paired-accursed-weapons", name: "Paired accursed weapons", image: "", profiles: [{ range: "Melee", attacks: "6", skill: "3+", strength: "5", ap: "-2", damage: "1", keywords: ["TWIN-LINKED"] }] },
      { id: "power-fist", name: "Power fist", image: "", profiles: [{ range: "Melee", attacks: "3", skill: "3+", strength: "8", ap: "-2", damage: "2" }] },
    ],
  },

  {
    id: "chaos-lord-with-jump-pack",
    name: "Chaos Lord With Jump Pack",
    faction: "chaos-daemons",
    image: "",
    points: 90,
    canAttachTo: [],
    defaultWargear: [
      { id: "bolt-pistol", name: "Bolt pistol", image: "", profiles: [{ range: '12"', attacks: "1", skill: "3+", strength: "4", ap: "0", damage: "1", keywords: ["PISTOL"] }] },
      { id: "accursed-weapon", name: "Accursed weapon", image: "", profiles: [{ range: "Melee", attacks: "5", skill: "3+", strength: "5", ap: "-2", damage: "1" }] },
    ],
    wargear: [
      { id: "plasma-pistol", name: "Plasma pistol", image: "", profiles: [{ profileName: "standard", range: '12"', attacks: "1", skill: "3+", strength: "7", ap: "-2", damage: "1", keywords: ["PISTOL"] }, { profileName: "supercharge", range: '12"', attacks: "1", skill: "3+", strength: "8", ap: "-3", damage: "2", keywords: ["PISTOL", "HAZARDOUS"] }] },
      { id: "power-fist", name: "Power fist", image: "", profiles: [{ range: "Melee", attacks: "3", skill: "3+", strength: "8", ap: "-2", damage: "2" }] },
      { id: "twin-lightning-claws", name: "Twin lightning claws", image: "", profiles: [{ range: "Melee", attacks: "6", skill: "3+", strength: "5", ap: "-2", damage: "1", keywords: ["TWIN-LINKED"] }] },
    ],
  },

  {
    id: "contorted-epitome",
    name: "Contorted Epitome",
    faction: "chaos-daemons",
    image: "",
    points: 100,
    canAttachTo: [],
    defaultWargear: [
      { id: "coiled-tentacles", name: "Coiled tentacles", image: "", profiles: [{ range: "Melee", attacks: "6", skill: "3+", strength: "5", ap: "0", damage: "1" }] },
      { id: "ravaging-claws", name: "Ravaging claws", image: "", profiles: [{ range: "Melee", attacks: "6", skill: "3+", strength: "5", ap: "-1", damage: "1" }] },
    ],
    wargear: [],
  },

  {
    id: "cultist-firebrand",
    name: "Cultist Firebrand",
    faction: "chaos-daemons",
    image: "",
    points: 45,
    canAttachTo: [],
    defaultWargear: [
      { id: "balefire-pike", name: "Balefire pike", image: "", profiles: [{ range: '18"', attacks: "2", skill: "4+", strength: "4", ap: "0", damage: "1" }] },
      { id: "close-combat-weapon", name: "Close combat weapon", image: "", profiles: [{ range: "Melee", attacks: "3", skill: "4+", strength: "3", ap: "0", damage: "1" }] },
    ],
    wargear: [],
  },

  {
    id: "daemon-prince-of-chaos",
    name: "Daemon Prince Of Chaos",
    faction: "chaos-daemons",
    image: "",
    points: 190,
    canAttachTo: [],
    defaultWargear: [
      { id: "infernal-cannon", name: "Infernal cannon", image: "", profiles: [{ range: '24"', attacks: "D6", skill: "3+", strength: "8", ap: "-2", damage: "2", keywords: ["BLAST"] }] },
      { id: "hellforged-weapons-strike", name: "Hellforged weapons – strike", image: "", profiles: [{ range: "Melee", attacks: "4", skill: "3+", strength: "14", ap: "-3", damage: "D6+1" }] },
      { id: "hellforged-weapons-sweep", name: "Hellforged weapons – sweep", image: "", profiles: [{ range: "Melee", attacks: "8", skill: "3+", strength: "7", ap: "-2", damage: "2" }] },
    ],
    wargear: [],
  },

  {
    id: "daemon-prince-of-chaos-with-wings",
    name: "Daemon Prince Of Chaos With Wings",
    faction: "chaos-daemons",
    image: "",
    points: 180,
    canAttachTo: [],
    defaultWargear: [
      { id: "infernal-cannon", name: "Infernal cannon", image: "", profiles: [{ range: '24"', attacks: "D6", skill: "3+", strength: "8", ap: "-2", damage: "2", keywords: ["BLAST"] }] },
      { id: "hellforged-weapons-strike", name: "Hellforged weapons – strike", image: "", profiles: [{ range: "Melee", attacks: "4", skill: "3+", strength: "14", ap: "-3", damage: "D6+1" }] },
      { id: "hellforged-weapons-sweep", name: "Hellforged weapons – sweep", image: "", profiles: [{ range: "Melee", attacks: "8", skill: "3+", strength: "7", ap: "-2", damage: "2" }] },
    ],
    wargear: [],
  },

  {
    id: "epidemius",
    name: "Epidemius",
    faction: "chaos-daemons",
    image: "",
    points: 80,
    canAttachTo: [],
    defaultWargear: [
      { id: "balesword-and-nurgling-attendants", name: "Balesword and Nurgling attendants", image: "", profiles: [{ range: "Melee", attacks: "4", skill: "3+", strength: "5", ap: "-1", damage: "D3" }] },
    ],
    wargear: [],
  },

  {
    id: "exalted-flamer",
    name: "Exalted Flamer",
    faction: "chaos-daemons",
    image: "",
    points: 65,
    canAttachTo: [],
    defaultWargear: [
      { id: "fire-of-tzeentch-blue-fire", name: "Fire of Tzeentch – blue fire", image: "", profiles: [{ range: '18"', attacks: "D6", skill: "N/A", strength: "5", ap: "-1", damage: "2", keywords: ["IGNORES COVER", "PSYCHIC", "TORRENT"] }] },
      { id: "fire-of-tzeentch-pink-fire", name: "Fire of Tzeentch – pink fire", image: "", profiles: [{ range: '18"', attacks: "D6+3", skill: "N/A", strength: "4", ap: "0", damage: "1", keywords: ["IGNORES COVER", "PSYCHIC", "TORRENT"] }] },
      { id: "flamer-mouths", name: "Flamer mouths", image: "", profiles: [{ range: "Melee", attacks: "3", skill: "4+", strength: "4", ap: "0", damage: "1" }] },
    ],
    wargear: [],
  },

  {
    id: "fateskimmer",
    name: "Fateskimmer",
    faction: "chaos-daemons",
    image: "",
    points: 95,
    canAttachTo: [],
    defaultWargear: [
      { id: "arcane-fireball-witchfire", name: "Arcane Fireball – witchfire", image: "", profiles: [{ range: '18"', attacks: "D6", skill: "3+", strength: "5", ap: "-1", damage: "1", keywords: ["BLAST", "PSYCHIC"] }] },
      { id: "arcane-fireball-focused-witchfire", name: "Arcane Fireball – focused witchfire", image: "", profiles: [{ range: '18"', attacks: "D3", skill: "3+", strength: "5", ap: "-2", damage: "2", keywords: ["PSYCHIC"] }] },
      { id: "herald-combat-weapon", name: "Herald combat weapon", image: "", profiles: [{ range: "Melee", attacks: "3", skill: "3+", strength: "4", ap: "-1", damage: "1" }] },
      { id: "screamer-bites", name: "Screamer bites", image: "", profiles: [{ range: "Melee", attacks: "3", skill: "4+", strength: "4", ap: "-1", damage: "1" }] },
    ],
    wargear: [],
  },

  {
    id: "fluxmaster",
    name: "Fluxmaster",
    faction: "chaos-daemons",
    image: "",
    points: 60,
    canAttachTo: [],
    defaultWargear: [
      { id: "arcane-fireball-witchfire", name: "Arcane Fireball – witchfire", image: "", profiles: [{ range: '18"', attacks: "D6", skill: "3+", strength: "5", ap: "-1", damage: "1", keywords: ["BLAST", "PSYCHIC"] }] },
      { id: "arcane-fireball-focused-witchfire", name: "Arcane Fireball – focused witchfire", image: "", profiles: [{ range: '18"', attacks: "D3", skill: "3+", strength: "5", ap: "-2", damage: "2", keywords: ["PSYCHIC"] }] },
      { id: "herald-combat-weapon", name: "Herald combat weapon", image: "", profiles: [{ range: "Melee", attacks: "3", skill: "3+", strength: "4", ap: "-1", damage: "1" }] },
    ],
    wargear: [],
  },

  {
    id: "great-unclean-one",
    name: "Great Unclean One",
    faction: "chaos-daemons",
    image: "",
    points: 250,
    canAttachTo: [],
    defaultWargear: [
      { id: "plague-flail", name: "Plague flail", image: "", profiles: [{ range: "Melee", attacks: "D6+3", skill: "3+", strength: "10", ap: "-2", damage: "3" }] },
      { id: "putrid-vomit", name: "Putrid vomit", image: "", profiles: [{ range: '9"', attacks: "D6", skill: "N/A", strength: "5", ap: "-1", damage: "1", keywords: ["IGNORES COVER", "TORRENT"] }] },
      { id: "bilesword-strike", name: "Bilesword – strike", image: "", profiles: [{ range: "Melee", attacks: "4", skill: "3+", strength: "12", ap: "-3", damage: "D6+1" }] },
      { id: "bilesword-sweep", name: "Bilesword – sweep", image: "", profiles: [{ range: "Melee", attacks: "8", skill: "3+", strength: "6", ap: "-1", damage: "2" }] },
    ],
    wargear: [
      { id: "bileblade", name: "Bileblade", image: "", profiles: [{ range: "Melee", attacks: "5", skill: "3+", strength: "6", ap: "-1", damage: "D3" }] },
      { id: "doomsday-bell", name: "Doomsday bell", image: "", profiles: [{ range: "Melee", attacks: "3", skill: "3+", strength: "8", ap: "-1", damage: "2" }] },
    ],
  },

  {
    id: "herald-of-slaanesh-on-steed-of-slaanesh",
    name: "Herald Of Slaanesh On Steed Of Slaanesh",
    faction: "chaos-daemons",
    image: "",
    points: 70,
    canAttachTo: [],
    defaultWargear: [
      { id: "lashing-tongue", name: "Lashing tongue", image: "", profiles: [{ range: "Melee", attacks: "2", skill: "4+", strength: "4", ap: "0", damage: "1" }] },
      { id: "ravaging-claws", name: "Ravaging claws", image: "", profiles: [{ range: "Melee", attacks: "6", skill: "3+", strength: "5", ap: "-1", damage: "1" }] },
    ],
    wargear: [],
  },

  {
    id: "horticulous-slimux",
    name: "Horticulous Slimux",
    faction: "chaos-daemons",
    image: "",
    points: 120,
    canAttachTo: [],
    defaultWargear: [
      { id: "acidic-maw", name: "Acidic maw", image: "", profiles: [{ range: "Melee", attacks: "3", skill: "4+", strength: "5", ap: "-1", damage: "2" }] },
      { id: "lopping-shears", name: "Lopping shears", image: "", profiles: [{ range: "Melee", attacks: "4", skill: "3+", strength: "7", ap: "-2", damage: "2" }] },
    ],
    wargear: [],
  },

  {
    id: "infernal-enrapturess",
    name: "Infernal Enrapturess",
    faction: "chaos-daemons",
    image: "",
    points: 60,
    canAttachTo: [],
    defaultWargear: [
      { id: "heartstring-lyre-cacophonous-melody", name: "Heartstring lyre – cacophonous melody", image: "", profiles: [{ range: '24"', attacks: "D6+1", skill: "N/A", strength: "4", ap: "0", damage: "1", keywords: ["IGNORES COVER", "TORRENT"] }] },
      { id: "heartstring-lyre-euphonic-blast", name: "Heartstring lyre – euphonic blast", image: "", profiles: [{ range: '24"', attacks: "2", skill: "3+", strength: "8", ap: "-3", damage: "3", keywords: ["HEAVY"] }] },
      { id: "ravaging-claws", name: "Ravaging claws", image: "", profiles: [{ range: "Melee", attacks: "6", skill: "3+", strength: "5", ap: "-1", damage: "1" }] },
    ],
    wargear: [],
  },

  {
    id: "kairos-fateweaver",
    name: "Kairos Fateweaver",
    faction: "chaos-daemons",
    image: "",
    points: 270,
    canAttachTo: [],
    defaultWargear: [
      { id: "infernal-gateway-witchfire", name: "Infernal Gateway – witchfire", image: "", profiles: [{ range: '18"', attacks: "D6+3", skill: "3+", strength: "8", ap: "-2", damage: "D3", keywords: ["BLAST", "PSYCHIC"] }] },
      { id: "infernal-gateway-focused-witchfire", name: "Infernal Gateway – focused witchfire", image: "", profiles: [{ range: '18"', attacks: "D6+3", skill: "3+", strength: "10", ap: "-3", damage: "D6", keywords: ["BLAST", "PSYCHIC"] }] },
      { id: "staff-of-tomorrow", name: "Staff of Tomorrow", image: "", profiles: [{ range: "Melee", attacks: "5", skill: "2+", strength: "8", ap: "-2", damage: "D3", keywords: ["PSYCHIC"] }] },
    ],
    wargear: [],
  },

  {
    id: "karanak",
    name: "Karanak",
    faction: "chaos-daemons",
    image: "",
    points: 65,
    canAttachTo: [],
    defaultWargear: [
      { id: "soul-rending-fangs", name: "Soul-rending fangs", image: "", profiles: [{ range: "Melee", attacks: "6", skill: "3+", strength: "5", ap: "-1", damage: "2", keywords: ["DEVASTATING WOUNDS"] }] },
    ],
    wargear: [],
  },

  {
    id: "keeper-of-secrets",
    name: "Keeper Of Secrets",
    faction: "chaos-daemons",
    image: "",
    points: 290,
    canAttachTo: [],
    defaultWargear: [
      { id: "phantasmagoria-witchfire", name: "Phantasmagoria – witchfire", image: "", profiles: [{ range: '18"', attacks: "3", skill: "3+", strength: "6", ap: "-1", damage: "D3", keywords: ["PSYCHIC"] }] },
      { id: "phantasmagoria-focused-witchfire", name: "Phantasmagoria – focused witchfire", image: "", profiles: [{ range: '18"', attacks: "3", skill: "3+", strength: "8", ap: "-2", damage: "D3", keywords: ["PSYCHIC"] }] },
      { id: "snapping-claws", name: "Snapping claws", image: "", profiles: [{ range: "Melee", attacks: "4", skill: "3+", strength: "8", ap: "-2", damage: "D3" }] },
      { id: "witstealer-sword", name: "Witstealer sword", image: "", profiles: [{ range: "Melee", attacks: "5", skill: "3+", strength: "8", ap: "-3", damage: "3" }] },
    ],
    wargear: [
      { id: "living-whip", name: "Living whip", image: "", profiles: [{ range: '6"', attacks: "3", skill: "3+", strength: "6", ap: "-1", damage: "2" }] },
      { id: "ritual-knife", name: "Ritual knife", image: "", profiles: [{ range: "Melee", attacks: "8", skill: "3+", strength: "5", ap: "-1", damage: "1" }] },
    ],
  },

  {
    id: "lord-of-change",
    name: "Lord Of Change",
    faction: "chaos-daemons",
    image: "",
    points: 260,
    canAttachTo: [],
    defaultWargear: [
      { id: "bolt-of-change-witchfire", name: "Bolt of Change – witchfire", image: "", profiles: [{ range: '24"', attacks: "D6", skill: "3+", strength: "8", ap: "-2", damage: "D3", keywords: ["PSYCHIC"] }] },
      { id: "bolt-of-change-focused-witchfire", name: "Bolt of Change – focused witchfire", image: "", profiles: [{ range: '24"', attacks: "D6", skill: "3+", strength: "10", ap: "-3", damage: "D6", keywords: ["PSYCHIC"] }] },
      { id: "staff-of-tzeentch", name: "Staff of Tzeentch", image: "", profiles: [{ range: "Melee", attacks: "5", skill: "3+", strength: "8", ap: "-2", damage: "D3", keywords: ["PSYCHIC"] }] },
    ],
    wargear: [
      { id: "rod-of-sorcery", name: "Rod of sorcery", image: "", profiles: [{ range: '18"', attacks: "D6", skill: "3+", strength: "8", ap: "-2", damage: "2", keywords: ["PSYCHIC"] }] },
      { id: "baleful-sword", name: "Baleful sword", image: "", profiles: [{ range: "Melee", attacks: "6", skill: "3+", strength: "10", ap: "-3", damage: "3" }] },
    ],
  },

  {
    id: "master-of-possession",
    name: "Master Of Possession",
    faction: "chaos-daemons",
    image: "",
    points: 70,
    canAttachTo: [],
    defaultWargear: [
      { id: "bolt-pistol", name: "Bolt pistol", image: "", profiles: [{ range: '12"', attacks: "1", skill: "3+", strength: "4", ap: "0", damage: "1", keywords: ["PISTOL"] }] },
      { id: "rite-of-possession-witchfire", name: "Rite of Possession – witchfire", image: "", profiles: [{ range: '18"', attacks: "D3", skill: "3+", strength: "5", ap: "-1", damage: "D3", keywords: ["PSYCHIC"] }] },
      { id: "rite-of-possession-focused-witchfire", name: "Rite of Possession – focused witchfire", image: "", profiles: [{ range: '18"', attacks: "D3", skill: "3+", strength: "6", ap: "-2", damage: "D3", keywords: ["PSYCHIC"] }] },
      { id: "staff-of-possession", name: "Staff of possession", image: "", profiles: [{ range: "Melee", attacks: "4", skill: "3+", strength: "6", ap: "-1", damage: "D3", keywords: ["PSYCHIC"] }] },
    ],
    wargear: [],
  },

  {
    id: "poxbringer",
    name: "Poxbringer",
    faction: "chaos-daemons",
    image: "",
    points: 55,
    canAttachTo: [],
    defaultWargear: [
      { id: "foul-balesword", name: "Foul balesword", image: "", profiles: [{ range: "Melee", attacks: "3", skill: "3+", strength: "5", ap: "-1", damage: "D3" }] },
    ],
    wargear: [],
  },

  {
    id: "rendmaster-on-blood-throne",
    name: "Rendmaster On Blood Throne",
    faction: "chaos-daemons",
    image: "",
    points: 165,
    canAttachTo: [],
    defaultWargear: [
      { id: "attendants-hellblades", name: "Attendants' hellblades", image: "", profiles: [{ range: "Melee", attacks: "6", skill: "4+", strength: "5", ap: "-1", damage: "1" }] },
      { id: "blade-of-blood", name: "Blade of blood", image: "", profiles: [{ range: "Melee", attacks: "4", skill: "3+", strength: "6", ap: "-1", damage: "2", keywords: ["DEVASTATING WOUNDS"] }] },
    ],
    wargear: [],
  },

  {
    id: "renegade-enforcer",
    name: "Renegade Enforcer",
    faction: "chaos-daemons",
    image: "",
    points: 65,
    canAttachTo: [],
    defaultWargear: [
      { id: "enforcer-pistol", name: "Enforcer pistol", image: "", profiles: [{ range: '12"', attacks: "1", skill: "3+", strength: "4", ap: "0", damage: "1", keywords: ["PISTOL"] }] },
      { id: "enforcer-melee-weapon", name: "Enforcer melee weapon", image: "", profiles: [{ range: "Melee", attacks: "3", skill: "3+", strength: "4", ap: "0", damage: "1" }] },
    ],
    wargear: [
      { id: "autogun", name: "Autogun", image: "", profiles: [{ range: '24"', attacks: "2", skill: "4+", strength: "3", ap: "0", damage: "1", keywords: ["RAPID FIRE 1"] }] },
      { id: "lasgun", name: "Lasgun", image: "", profiles: [{ range: '24"', attacks: "2", skill: "4+", strength: "3", ap: "0", damage: "1", keywords: ["RAPID FIRE 1"] }] },
      { id: "shotgun", name: "Shotgun", image: "", profiles: [{ range: '12"', attacks: "2", skill: "4+", strength: "4", ap: "0", damage: "1", keywords: ["ASSAULT"] }] },
      { id: "power-fist", name: "Power fist", image: "", profiles: [{ range: "Melee", attacks: "3", skill: "3+", strength: "8", ap: "-2", damage: "2" }] },
      { id: "power-weapon", name: "Power weapon", image: "", profiles: [{ range: "Melee", attacks: "4", skill: "3+", strength: "5", ap: "-2", damage: "1" }] },
    ],
  },

  {
    id: "rogue-psyker",
    name: "Rogue Psyker",
    faction: "chaos-daemons",
    image: "",
    points: 60,
    canAttachTo: [],
    defaultWargear: [
      { id: "laspistol", name: "Laspistol", image: "", profiles: [{ range: '12"', attacks: "1", skill: "4+", strength: "3", ap: "0", damage: "1", keywords: ["PISTOL"] }] },
      { id: "psychic-strike-focused-witchfire", name: "Psychic Strike – focused witchfire", image: "", profiles: [{ range: '18"', attacks: "D3", skill: "3+", strength: "6", ap: "-2", damage: "2", keywords: ["PSYCHIC"] }] },
      { id: "psychic-strike-witchfire", name: "Psychic Strike – witchfire", image: "", profiles: [{ range: '18"', attacks: "D6", skill: "3+", strength: "5", ap: "-1", damage: "1", keywords: ["BLAST", "PSYCHIC"] }] },
      { id: "chaos-stave", name: "Chaos stave", image: "", profiles: [{ range: "Melee", attacks: "3", skill: "3+", strength: "5", ap: "-1", damage: "D3" }] },
    ],
    wargear: [],
  },

  {
    id: "rotigus",
    name: "Rotigus",
    faction: "chaos-daemons",
    image: "",
    points: 250,
    canAttachTo: [],
    defaultWargear: [
      { id: "streams-of-brackish-filth", name: "Streams of brackish filth", image: "", profiles: [{ range: '12"', attacks: "D6+3", skill: "N/A", strength: "5", ap: "-1", damage: "1", keywords: ["IGNORES COVER", "TORRENT"] }] },
      { id: "gnarlrod-strike", name: "Gnarlrod – strike", image: "", profiles: [{ range: "Melee", attacks: "4", skill: "3+", strength: "12", ap: "-3", damage: "D6+1" }] },
      { id: "gnarlrod-sweep", name: "Gnarlrod – sweep", image: "", profiles: [{ range: "Melee", attacks: "8", skill: "3+", strength: "6", ap: "-1", damage: "2" }] },
    ],
    wargear: [],
  },

  {
    id: "scabeiathrax-the-bloated",
    name: "Scabeiathrax The Bloated",
    faction: "chaos-daemons",
    image: "",
    points: 275,
    canAttachTo: [],
    defaultWargear: [
      { id: "putrid-vomit", name: "Putrid vomit", image: "", profiles: [{ range: '9"', attacks: "D6", skill: "N/A", strength: "5", ap: "-1", damage: "1", keywords: ["IGNORES COVER", "TORRENT"] }] },
      { id: "blade-of-decay-strike", name: "Blade of decay – Strike", image: "", profiles: [{ range: "Melee", attacks: "4", skill: "3+", strength: "12", ap: "-3", damage: "D6+1" }] },
      { id: "blade-of-decay-sweep", name: "Blade of decay – Sweep", image: "", profiles: [{ range: "Melee", attacks: "8", skill: "3+", strength: "6", ap: "-1", damage: "2" }] },
    ],
    wargear: [],
  },

  {
    id: "shalaxi-helbane",
    name: "Shalaxi Helbane",
    faction: "chaos-daemons",
    image: "",
    points: 380,
    canAttachTo: [],
    defaultWargear: [
      { id: "lash-of-slaanesh", name: "Lash of Slaanesh", image: "", profiles: [{ range: '6"', attacks: "4", skill: "3+", strength: "6", ap: "-1", damage: "2" }] },
      { id: "pavane-of-slaanesh-witchfire", name: "Pavane of Slaanesh – witchfire", image: "", profiles: [{ range: '18"', attacks: "3", skill: "3+", strength: "5", ap: "-1", damage: "D3", keywords: ["PSYCHIC"] }] },
      { id: "pavane-of-slaanesh-focused-witchfire", name: "Pavane of Slaanesh – focused witchfire", image: "", profiles: [{ range: '18"', attacks: "3", skill: "3+", strength: "6", ap: "-2", damage: "D3", keywords: ["PSYCHIC"] }] },
      { id: "snapping-claws", name: "Snapping claws", image: "", profiles: [{ range: "Melee", attacks: "4", skill: "3+", strength: "8", ap: "-2", damage: "D3" }] },
      { id: "soulpiercer", name: "Soulpiercer", image: "", profiles: [{ range: "Melee", attacks: "6", skill: "2+", strength: "10", ap: "-4", damage: "D6" }] },
    ],
    wargear: [],
  },

  {
    id: "skarbrand",
    name: "Skarbrand",
    faction: "chaos-daemons",
    image: "",
    points: 305,
    canAttachTo: [],
    defaultWargear: [
      { id: "bellow-of-endless-fury", name: "Bellow of endless fury", image: "", profiles: [{ range: '8"', attacks: "2D6", skill: "N/A", strength: "6", ap: "-2", damage: "2", keywords: ["IGNORES COVER", "TORRENT"] }] },
      { id: "slaughter-and-carnage-strike", name: "Slaughter and Carnage – strike", image: "", profiles: [{ range: "Melee", attacks: "6", skill: "2+", strength: "14", ap: "-4", damage: "D6+2", keywords: ["DEVASTATING WOUNDS"] }] },
      { id: "slaughter-and-carnage-sweep", name: "Slaughter and Carnage – sweep", image: "", profiles: [{ range: "Melee", attacks: "12", skill: "2+", strength: "7", ap: "-2", damage: "2" }] },
    ],
    wargear: [],
  },

  {
    id: "skullmaster",
    name: "Skullmaster",
    faction: "chaos-daemons",
    image: "",
    points: 100,
    canAttachTo: [],
    defaultWargear: [
      { id: "blade-of-blood", name: "Blade of blood", image: "", profiles: [{ range: "Melee", attacks: "4", skill: "3+", strength: "6", ap: "-1", damage: "2", keywords: ["DEVASTATING WOUNDS"] }] },
      { id: "juggernaut-s-bladed-horn", name: "Juggernaut's bladed horn", image: "", profiles: [{ range: "Melee", attacks: "3", skill: "4+", strength: "6", ap: "-1", damage: "2" }] },
    ],
    wargear: [],
  },

  {
    id: "skulltaker",
    name: "Skulltaker",
    faction: "chaos-daemons",
    image: "",
    points: 85,
    canAttachTo: [],
    defaultWargear: [
      { id: "the-slayer-sword", name: "The Slayer Sword", image: "", profiles: [{ range: "Melee", attacks: "5", skill: "2+", strength: "7", ap: "-3", damage: "3", keywords: ["DEVASTATING WOUNDS"] }] },
    ],
    wargear: [],
  },

  {
    id: "sloppity-bilepiper",
    name: "Sloppity Bilepiper",
    faction: "chaos-daemons",
    image: "",
    points: 55,
    canAttachTo: [],
    defaultWargear: [
      { id: "marotter", name: "Marotter", image: "", profiles: [{ range: "Melee", attacks: "3", skill: "3+", strength: "4", ap: "-1", damage: "D3" }] },
    ],
    wargear: [],
  },

  {
    id: "sorcerer",
    name: "Sorcerer",
    faction: "chaos-daemons",
    image: "",
    points: 60,
    canAttachTo: [],
    defaultWargear: [
      { id: "bolt-pistol", name: "Bolt pistol", image: "", profiles: [{ range: '12"', attacks: "1", skill: "3+", strength: "4", ap: "0", damage: "1", keywords: ["PISTOL"] }] },
      { id: "infernal-gaze-witchfire", name: "Infernal Gaze – witchfire", image: "", profiles: [{ range: '18"', attacks: "3", skill: "3+", strength: "5", ap: "-1", damage: "1", keywords: ["PSYCHIC"] }] },
      { id: "infernal-gaze-focused-witchfire", name: "Infernal Gaze – focused witchfire", image: "", profiles: [{ range: '18"', attacks: "D3", skill: "3+", strength: "5", ap: "-1", damage: "D3", keywords: ["PSYCHIC"] }] },
      { id: "force-weapon", name: "Force weapon", image: "", profiles: [{ range: "Melee", attacks: "4", skill: "3+", strength: "6", ap: "-1", damage: "D3", keywords: ["PSYCHIC"] }] },
    ],
    wargear: [],
  },

  {
    id: "sorcerer-in-terminator-armour",
    name: "Sorcerer In Terminator Armour",
    faction: "chaos-daemons",
    image: "",
    points: 80,
    canAttachTo: [],
    defaultWargear: [
      { id: "combi-bolter", name: "Combi-bolter", image: "", profiles: [{ range: '24"', attacks: "2", skill: "3+", strength: "4", ap: "0", damage: "1", keywords: ["RAPID FIRE 2"] }] },
      { id: "infernal-gaze-witchfire", name: "Infernal Gaze – witchfire", image: "", profiles: [{ range: '18"', attacks: "3", skill: "3+", strength: "5", ap: "-1", damage: "1", keywords: ["PSYCHIC"] }] },
      { id: "infernal-gaze-focused-witchfire", name: "Infernal Gaze – focused witchfire", image: "", profiles: [{ range: '18"', attacks: "D3", skill: "3+", strength: "5", ap: "-1", damage: "D3", keywords: ["PSYCHIC"] }] },
      { id: "force-weapon", name: "Force weapon", image: "", profiles: [{ range: "Melee", attacks: "4", skill: "3+", strength: "6", ap: "-1", damage: "D3", keywords: ["PSYCHIC"] }] },
    ],
    wargear: [
      { id: "combi-weapon", name: "Combi-weapon", image: "", profiles: [{ range: '24"', attacks: "2", skill: "3+", strength: "4", ap: "0", damage: "1", keywords: ["RAPID FIRE 1"] }] },
    ],
  },

  {
    id: "sorcerer-on-disc-of-tzeentch",
    name: "Sorcerer On Disc Of Tzeentch",
    faction: "chaos-daemons",
    image: "",
    points: 80,
    canAttachTo: [],
    defaultWargear: [
      { id: "bolt-pistol", name: "Bolt pistol", image: "", profiles: [{ range: '12"', attacks: "1", skill: "3+", strength: "4", ap: "0", damage: "1", keywords: ["PISTOL"] }] },
      { id: "infernal-gaze-focused-witchfire", name: "Infernal Gaze – focused witchfire", image: "", profiles: [{ range: '18"', attacks: "D3", skill: "3+", strength: "5", ap: "-1", damage: "D3", keywords: ["PSYCHIC"] }] },
      { id: "infernal-gaze-witchfire", name: "Infernal Gaze – witchfire", image: "", profiles: [{ range: '18"', attacks: "3", skill: "3+", strength: "5", ap: "-1", damage: "1", keywords: ["PSYCHIC"] }] },
      { id: "force-weapon", name: "Force weapon", image: "", profiles: [{ range: "Melee", attacks: "4", skill: "3+", strength: "6", ap: "-1", damage: "D3", keywords: ["PSYCHIC"] }] },
    ],
    wargear: [
      { id: "combi-bolter", name: "Combi-bolter", image: "", profiles: [{ range: '24"', attacks: "2", skill: "3+", strength: "4", ap: "0", damage: "1", keywords: ["RAPID FIRE 2"] }] },
      { id: "combi-weapon", name: "Combi-weapon", image: "", profiles: [{ range: '24"', attacks: "2", skill: "3+", strength: "4", ap: "0", damage: "1", keywords: ["RAPID FIRE 1"] }] },
      { id: "plasma-pistol", name: "Plasma pistol", image: "", profiles: [{ profileName: "standard", range: '12"', attacks: "1", skill: "3+", strength: "7", ap: "-2", damage: "1", keywords: ["PISTOL"] }, { profileName: "supercharge", range: '12"', attacks: "1", skill: "3+", strength: "8", ap: "-3", damage: "2", keywords: ["PISTOL", "HAZARDOUS"] }] },
      { id: "accursed-weapon", name: "Accursed weapon", image: "", profiles: [{ range: "Melee", attacks: "5", skill: "3+", strength: "5", ap: "-2", damage: "1" }] },
      { id: "astartes-chainsword", name: "Astartes chainsword", image: "", profiles: [{ range: "Melee", attacks: "4", skill: "3+", strength: "4", ap: "-1", damage: "1" }] },
      { id: "power-fist", name: "Power fist", image: "", profiles: [{ range: "Melee", attacks: "3", skill: "3+", strength: "8", ap: "-2", damage: "2" }] },
    ],
  },

  {
    id: "sorcerer-on-palanquin-of-nurgle",
    name: "Sorcerer On Palanquin Of Nurgle",
    faction: "chaos-daemons",
    image: "",
    points: 80,
    canAttachTo: [],
    defaultWargear: [
      { id: "bolt-pistol", name: "Bolt pistol", image: "", profiles: [{ range: '12"', attacks: "1", skill: "3+", strength: "4", ap: "0", damage: "1", keywords: ["PISTOL"] }] },
      { id: "infernal-gaze-focused-witchfire", name: "Infernal Gaze – focused witchfire", image: "", profiles: [{ range: '18"', attacks: "D3", skill: "3+", strength: "5", ap: "-1", damage: "D3", keywords: ["PSYCHIC"] }] },
      { id: "infernal-gaze-witchfire", name: "Infernal Gaze – witchfire", image: "", profiles: [{ range: '18"', attacks: "3", skill: "3+", strength: "5", ap: "-1", damage: "1", keywords: ["PSYCHIC"] }] },
      { id: "force-weapon", name: "Force weapon", image: "", profiles: [{ range: "Melee", attacks: "4", skill: "3+", strength: "6", ap: "-1", damage: "D3", keywords: ["PSYCHIC"] }] },
      { id: "nurgling-s-claws-and-teeth", name: "Nurgling's claws and teeth", image: "", profiles: [{ range: "Melee", attacks: "5", skill: "5+", strength: "2", ap: "0", damage: "1" }] },
    ],
    wargear: [
      { id: "combi-bolter", name: "Combi-bolter", image: "", profiles: [{ range: '24"', attacks: "2", skill: "3+", strength: "4", ap: "0", damage: "1", keywords: ["RAPID FIRE 2"] }] },
      { id: "combi-weapon", name: "Combi-weapon", image: "", profiles: [{ range: '24"', attacks: "2", skill: "3+", strength: "4", ap: "0", damage: "1", keywords: ["RAPID FIRE 1"] }] },
      { id: "plasma-pistol", name: "Plasma pistol", image: "", profiles: [{ profileName: "standard", range: '12"', attacks: "1", skill: "3+", strength: "7", ap: "-2", damage: "1", keywords: ["PISTOL"] }, { profileName: "supercharge", range: '12"', attacks: "1", skill: "3+", strength: "8", ap: "-3", damage: "2", keywords: ["PISTOL", "HAZARDOUS"] }] },
      { id: "accursed-weapon", name: "Accursed weapon", image: "", profiles: [{ range: "Melee", attacks: "5", skill: "3+", strength: "5", ap: "-2", damage: "1" }] },
      { id: "astartes-chainsword", name: "Astartes chainsword", image: "", profiles: [{ range: "Melee", attacks: "4", skill: "3+", strength: "4", ap: "-1", damage: "1" }] },
      { id: "power-fist", name: "Power fist", image: "", profiles: [{ range: "Melee", attacks: "3", skill: "3+", strength: "8", ap: "-2", damage: "2" }] },
    ],
  },

  {
    id: "sorcerer-on-steed-of-slaanesh",
    name: "Sorcerer On Steed Of Slaanesh",
    faction: "chaos-daemons",
    image: "",
    points: 85,
    canAttachTo: [],
    defaultWargear: [
      { id: "bolt-pistol", name: "Bolt pistol", image: "", profiles: [{ range: '12"', attacks: "1", skill: "3+", strength: "4", ap: "0", damage: "1", keywords: ["PISTOL"] }] },
      { id: "infernal-gaze-focused-witchfire", name: "Infernal Gaze – focused witchfire", image: "", profiles: [{ range: '18"', attacks: "D3", skill: "3+", strength: "5", ap: "-1", damage: "D3", keywords: ["PSYCHIC"] }] },
      { id: "infernal-gaze-witchfire", name: "Infernal Gaze – witchfire", image: "", profiles: [{ range: '18"', attacks: "3", skill: "3+", strength: "5", ap: "-1", damage: "1", keywords: ["PSYCHIC"] }] },
      { id: "force-weapon", name: "Force weapon", image: "", profiles: [{ range: "Melee", attacks: "4", skill: "3+", strength: "6", ap: "-1", damage: "D3", keywords: ["PSYCHIC"] }] },
      { id: "lashing-tongue", name: "Lashing tongue", image: "", profiles: [{ range: "Melee", attacks: "2", skill: "4+", strength: "4", ap: "0", damage: "1" }] },
    ],
    wargear: [
      { id: "combi-bolter", name: "Combi-bolter", image: "", profiles: [{ range: '24"', attacks: "2", skill: "3+", strength: "4", ap: "0", damage: "1", keywords: ["RAPID FIRE 2"] }] },
      { id: "combi-weapon", name: "Combi-weapon", image: "", profiles: [{ range: '24"', attacks: "2", skill: "3+", strength: "4", ap: "0", damage: "1", keywords: ["RAPID FIRE 1"] }] },
      { id: "plasma-pistol", name: "Plasma pistol", image: "", profiles: [{ profileName: "standard", range: '12"', attacks: "1", skill: "3+", strength: "7", ap: "-2", damage: "1", keywords: ["PISTOL"] }, { profileName: "supercharge", range: '12"', attacks: "1", skill: "3+", strength: "8", ap: "-3", damage: "2", keywords: ["PISTOL", "HAZARDOUS"] }] },
      { id: "accursed-weapon", name: "Accursed weapon", image: "", profiles: [{ range: "Melee", attacks: "5", skill: "3+", strength: "5", ap: "-2", damage: "1" }] },
      { id: "astartes-chainsword", name: "Astartes chainsword", image: "", profiles: [{ range: "Melee", attacks: "4", skill: "3+", strength: "4", ap: "-1", damage: "1" }] },
      { id: "power-fist", name: "Power fist", image: "", profiles: [{ range: "Melee", attacks: "3", skill: "3+", strength: "8", ap: "-2", damage: "2" }] },
    ],
  },

  {
    id: "spoilpox-scrivener",
    name: "Spoilpox Scrivener",
    faction: "chaos-daemons",
    image: "",
    points: 60,
    canAttachTo: [],
    defaultWargear: [
      { id: "disgusting-sneezes", name: "Disgusting sneezes", image: "", profiles: [{ range: '9"', attacks: "D6", skill: "N/A", strength: "3", ap: "0", damage: "1", keywords: ["IGNORES COVER", "TORRENT"] }] },
      { id: "plaguesword-and-distended-maw", name: "Plaguesword and distended maw", image: "", profiles: [{ range: "Melee", attacks: "4", skill: "3+", strength: "5", ap: "-1", damage: "D3" }] },
    ],
    wargear: [],
  },

  {
    id: "syll-esske",
    name: "Syll Esske",
    faction: "chaos-daemons",
    image: "",
    points: 120,
    canAttachTo: [],
    defaultWargear: [
      { id: "cacophonic-choir-witchfire", name: "Cacophonic choir – witchfire", image: "", profiles: [{ range: '18"', attacks: "D6", skill: "3+", strength: "5", ap: "-1", damage: "D3", keywords: ["BLAST", "PSYCHIC"] }] },
      { id: "cacophonic-choir-focused-witchfire", name: "Cacophonic choir – focused witchfire", image: "", profiles: [{ range: '18"', attacks: "D6", skill: "3+", strength: "5", ap: "-2", damage: "D3", keywords: ["BLAST", "PSYCHIC"] }] },
      { id: "scourging-whip", name: "Scourging whip", image: "", profiles: [{ range: "Melee", attacks: "5", skill: "3+", strength: "5", ap: "-1", damage: "2" }] },
      { id: "axe-of-dominion", name: "Axe of Dominion", image: "", profiles: [{ range: "Melee", attacks: "4", skill: "3+", strength: "7", ap: "-2", damage: "2" }] },
    ],
    wargear: [],
  },

  {
    id: "the-blue-scribes",
    name: "The Blue Scribes",
    faction: "chaos-daemons",
    image: "",
    points: 75,
    canAttachTo: [],
    defaultWargear: [
      { id: "sharp-quills", name: "Sharp quills", image: "", profiles: [{ range: "Melee", attacks: "2", skill: "4+", strength: "3", ap: "0", damage: "1" }] },
    ],
    wargear: [],
  },

  {
    id: "the-changeling",
    name: "The Changeling",
    faction: "chaos-daemons",
    image: "",
    points: 90,
    canAttachTo: [],
    defaultWargear: [
      { id: "infernal-flames-witchfire", name: "Infernal Flames – witchfire", image: "", profiles: [{ range: '18"', attacks: "D6+3", skill: "N/A", strength: "4", ap: "0", damage: "1", keywords: ["IGNORES COVER", "PSYCHIC", "TORRENT"] }] },
      { id: "infernal-flames-focused-witchfire", name: "Infernal Flames – focused witchfire", image: "", profiles: [{ range: '18"', attacks: "D6", skill: "3+", strength: "5", ap: "-1", damage: "2", keywords: ["PSYCHIC"] }] },
      { id: "the-trickster-s-staff", name: "The Trickster's Staff", image: "", profiles: [{ range: "Melee", attacks: "4", skill: "3+", strength: "5", ap: "-1", damage: "D3", keywords: ["PSYCHIC"] }] },
    ],
    wargear: [],
  },

  {
    id: "the-masque-of-slaanesh",
    name: "The Masque Of Slaanesh",
    faction: "chaos-daemons",
    image: "",
    points: 95,
    canAttachTo: [],
    defaultWargear: [
      { id: "serrated-claws", name: "Serrated claws", image: "", profiles: [{ range: "Melee", attacks: "6", skill: "3+", strength: "5", ap: "-2", damage: "1" }] },
    ],
    wargear: [],
  },

  {
    id: "tormentbringer-on-exalted-seeker-chariot",
    name: "Tormentbringer On Exalted Seeker Chariot",
    faction: "chaos-daemons",
    image: "",
    points: 140,
    canAttachTo: [],
    defaultWargear: [
      { id: "lashes-of-torment", name: "Lashes of torment", image: "", profiles: [{ range: "Melee", attacks: "6", skill: "3+", strength: "5", ap: "-1", damage: "1" }] },
      { id: "exalted-seeker-tongues", name: "Exalted Seeker tongues", image: "", profiles: [{ range: "Melee", attacks: "4", skill: "4+", strength: "4", ap: "0", damage: "1" }] },
      { id: "ravaging-claws", name: "Ravaging claws", image: "", profiles: [{ range: "Melee", attacks: "6", skill: "3+", strength: "5", ap: "-1", damage: "1" }] },
    ],
    wargear: [],
  },

  {
    id: "tranceweaver",
    name: "Tranceweaver",
    faction: "chaos-daemons",
    image: "",
    points: 60,
    canAttachTo: [],
    defaultWargear: [
      { id: "ravaging-claws", name: "Ravaging claws", image: "", profiles: [{ range: "Melee", attacks: "6", skill: "3+", strength: "5", ap: "-1", damage: "1" }] },
    ],
    wargear: [],
  },

  {
    id: "zarakynel",
    name: "Zarakynel",
    faction: "chaos-daemons",
    image: "",
    points: 320,
    canAttachTo: [],
    defaultWargear: [
      { id: "phantasmagoria-focused-witchfire", name: "Phantasmagoria – focused witchfire", image: "", profiles: [{ range: '18"', attacks: "3", skill: "3+", strength: "8", ap: "-2", damage: "D3", keywords: ["PSYCHIC"] }] },
      { id: "phantasmagoria-witchfire", name: "Phantasmagoria – witchfire", image: "", profiles: [{ range: '18"', attacks: "3", skill: "3+", strength: "6", ap: "-1", damage: "D3", keywords: ["PSYCHIC"] }] },
      { id: "snapping-claws", name: "Snapping claws", image: "", profiles: [{ range: "Melee", attacks: "4", skill: "3+", strength: "8", ap: "-2", damage: "D3" }] },
      { id: "souleater-blade", name: "Souleater blade", image: "", profiles: [{ range: "Melee", attacks: "6", skill: "2+", strength: "12", ap: "-4", damage: "D6" }] },
    ],
    wargear: [],
  },

];
