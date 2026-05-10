import type { Unit } from "../../src/types/warhammer";

export const leaguesOfVotannUnits: Unit[] = [

  {
    id: "hernkyn-pioneers",
    name: "Hernkyn Pioneers",
    faction: "leagues-of-votann",
    category: "mounted",
    points: 90,
    defaultWargear: [
      { id: "bolt-revolver", name: "Bolt revolver", image: "" },
      { id: "bolt-shotgun", name: "Bolt shotgun", image: "" },
      { id: "magna-coil-autocannon", name: "Magna-coil autocannon", image: "" },
      { id: "plasma-knife", name: "Plasma knife", image: "" },
    ],
    wargear: [
      { id: "hylas-rotary-cannon", name: "HYLas rotary cannon", image: "" },
      { id: "ion-beamer", name: "Ion beamer", image: "" },
    ],
    ledBy: [],
  },

  {
    id: "hearthkyn-warriors",
    name: "Hearthkyn Warriors",
    faction: "leagues-of-votann",
    category: "battleline",
    points: 100,
    defaultWargear: [
      { id: "autoch-pattern-bolt-pistol", name: "Autoch-pattern bolt pistol", image: "" },
      { id: "autoch-pattern-bolter", name: "Autoch-pattern bolter", image: "" },
      { id: "close-combat-weapon", name: "Close combat weapon", image: "" },
    ],
    wargear: [
      { id: "etacarn-plasma-beamer", name: "EtaCarn plasma beamer", image: "" },
      { id: "etacarn-plasma-pistol", name: "EtaCarn plasma pistol", image: "" },
      { id: "hylas-auto-rifle", name: "HYLas auto rifle", image: "" },
      { id: "hylas-rotary-cannon", name: "HYLas rotary cannon", image: "" },
      { id: "ion-pistol", name: "Ion pistol", image: "" },
      { id: "l7-missile-launcher-focused", name: "L7 missile launcher – focused", image: "" },
      { id: "l7-missile-launcher-blast", name: "L7 missile launcher – blast", image: "" },
      { id: "magna-rail-rifle", name: "Magna-rail rifle", image: "" },
      { id: "kin-melee-weapon", name: "Kin melee weapon", image: "" },
    ],
    ledBy: ["br-khyr-iron-master","grimnyr","k-hl","thar-the-destined"],
  },

  {
    id: "br-c3-b4khyr-iron-master",
    name: "Br%C3%B4khyr Iron Master",
    faction: "leagues-of-votann",
    category: "infantry",
    points: 65,
    defaultWargear: [],
    wargear: [
      { id: "autoch-pattern-bolt-pistol", name: "Autoch-pattern bolt pistol", image: "" },
      { id: "graviton-rifle", name: "Graviton rifle", image: "" },
      { id: "las-beam-cutter", name: "Las-beam cutter", image: "" },
      { id: "close-combat-weapon", name: "Close combat weapon", image: "" },
      { id: "graviton-hammer", name: "Graviton hammer", image: "" },
      { id: "manipulator-arms", name: "Manipulator arms", image: "" },
      { id: "plasma-torch", name: "Plasma torch", image: "" },
    ],
    ledBy: [],
  },

  {
    id: "br-c3-b4khyr-thunderkyn",
    name: "Br%C3%B4khyr Thunderkyn",
    faction: "leagues-of-votann",
    category: "infantry",
    points: 80,
    defaultWargear: [
      { id: "bolt-cannon", name: "Bolt cannon", image: "" },
      { id: "close-combat-weapon", name: "Close combat weapon", image: "" },
    ],
    wargear: [
      { id: "graviton-blast-cannon", name: "Graviton blast cannon", image: "" },
      { id: "sp-conversion-beamer", name: "SP conversion beamer", image: "" },
    ],
    ledBy: [],
  },

  {
    id: "cthonian-beserks",
    name: "Cthonian Beserks",
    faction: "leagues-of-votann",
    category: "infantry",
    points: 100,
    defaultWargear: [
      { id: "heavy-plasma-axe-strike", name: "Heavy plasma axe – strike", image: "" },
      { id: "heavy-plasma-axe-sweep", name: "Heavy plasma axe – sweep", image: "" },
    ],
    wargear: [
      { id: "mole-grenade-launcher", name: "Mole grenade launcher", image: "" },
      { id: "concussion-maul", name: "Concussion maul", image: "" },
      { id: "twin-concussion-gauntlet", name: "Twin concussion gauntlet", image: "" },
    ],
    ledBy: [],
  },

  {
    id: "einhyr-hearthguard",
    name: "Einhyr Hearthguard",
    faction: "leagues-of-votann",
    category: "infantry",
    points: 150,
    defaultWargear: [
      { id: "etacarn-plasma-gun", name: "EtaCarn plasma gun", image: "" },
      { id: "exo-armour-grenade-launcher", name: "Exo-armour grenade launcher", image: "" },
      { id: "concussion-gauntlet", name: "Concussion gauntlet", image: "" },
    ],
    wargear: [
      { id: "volkanite-disintegrator", name: "Volkanite disintegrator", image: "" },
      { id: "concussion-hammer", name: "Concussion hammer", image: "" },
      { id: "plasma-blade-gauntlet", name: "Plasma blade gauntlet", image: "" },
    ],
    ledBy: ["einhyr-champion","k-hl","thar-the-destined"],
  },

  {
    id: "grimnyr",
    name: "Grimnyr",
    faction: "leagues-of-votann",
    category: "infantry",
    points: 65,
    defaultWargear: [],
    wargear: [
      { id: "autoch-pattern-bolter", name: "Autoch-pattern bolter", image: "" },
      { id: "ancestral-wrath-witchfire", name: "Ancestral Wrath – witchfire", image: "" },
      { id: "ancestral-wrath-focused-witchfire", name: "Ancestral Wrath – focused witchfire", image: "" },
      { id: "ancestral-ward-stave", name: "Ancestral ward stave", image: "" },
      { id: "close-combat-weapon", name: "Close combat weapon", image: "" },
    ],
    ledBy: [],
  },

  {
    id: "hernkyn-yaegirs",
    name: "Hernkyn Yaegirs",
    faction: "leagues-of-votann",
    category: "infantry",
    points: 90,
    defaultWargear: [
      { id: "bolt-shotgun", name: "Bolt shotgun", image: "" },
      { id: "close-combat-weapon", name: "Close combat weapon", image: "" },
    ],
    wargear: [
      { id: "apm-launcher", name: "APM launcher", image: "" },
      { id: "bolt-revolver", name: "Bolt revolver", image: "" },
      { id: "magna-coil-rifle", name: "Magna-coil rifle", image: "" },
      { id: "plasma-knife", name: "Plasma knife", image: "" },
    ],
    ledBy: [],
  },

  {
    id: "hekaton-land-fortress",
    name: "Hekaton Land Fortress",
    faction: "leagues-of-votann",
    category: "transport",
    points: 225,
    defaultWargear: [
      { id: "cyclic-ion-cannon", name: "Cyclic ion cannon", image: "" },
      { id: "matr-autocannon", name: "MATR autocannon", image: "" },
      { id: "twin-bolt-cannon", name: "Twin bolt cannon", image: "" },
      { id: "armoured-wheels", name: "Armoured wheels", image: "" },
    ],
    wargear: [
      { id: "heavy-magna-rail-cannon", name: "Heavy magna-rail cannon", image: "" },
      { id: "sp-heavy-conversion-beamer", name: "SP heavy conversion beamer", image: "" },
    ],
    ledBy: [],
  },

  {
    id: "sagitaur",
    name: "Sagitaur",
    faction: "leagues-of-votann",
    category: "transport",
    points: 115,
    defaultWargear: [
      { id: "hylas-beam-cannon", name: "HYLas beam cannon", image: "" },
      { id: "twin-bolt-cannon", name: "Twin bolt cannon", image: "" },
      { id: "armoured-wheels", name: "Armoured wheels", image: "" },
    ],
    wargear: [
      { id: "matr-autocannon", name: "MATR autocannon", image: "" },
      { id: "sagitaur-missile-launcher", name: "Sagitaur missile launcher", image: "" },
    ],
    ledBy: [],
  },

];
