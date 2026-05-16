import type { Unit } from "../../src/types/warhammer";

export const greyKnightsUnits: Unit[] = [

  {
    id: "brotherhood-terminator-squad",
    name: "Brotherhood Terminator Squad",
    faction: "grey-knights",
    category: "battleline",
    points: 200,
    defaultWargear: [
      { id: "storm-bolter", name: "Storm bolter", image: "" },
      { id: "nemesis-force-weapon", name: "Nemesis force weapon", image: "" },
    ],
    wargear: [
      { id: "incinerator", name: "Incinerator", image: "" },
      { id: "psilencer", name: "Psilencer", image: "" },
      { id: "psycannon", name: "Psycannon", image: "" },
    ],
    ledBy: ["brother-captain","brother-captain-stern","brotherhood-chaplain","brotherhood-librarian","grand-master","grand-master-voldus","kaldor-draigo","inquisitor","inquisitor-coteaz","inquisitor-draxus","inquisitor-greyfax"],
  },

  {
    id: "strike-squad",
    name: "Strike Squad",
    faction: "grey-knights",
    category: "battleline",
    points: 120,
    defaultWargear: [
      { id: "storm-bolter", name: "Storm bolter", image: "" },
      { id: "nemesis-force-weapon", name: "Nemesis force weapon", image: "" },
    ],
    wargear: [
      { id: "incinerator", name: "Incinerator", image: "" },
      { id: "psilencer", name: "Psilencer", image: "" },
      { id: "psycannon", name: "Psycannon", image: "" },
      { id: "close-combat-weapon", name: "Close combat weapon", image: "" },
    ],
    ledBy: ["brotherhood-champion","brotherhood-techmarine","inquisitor","inquisitor-coteaz","inquisitor-draxus","inquisitor-greyfax"],
  },

  {
    id: "interceptor-squad",
    name: "Interceptor Squad",
    faction: "grey-knights",
    category: "infantry",
    points: 125,
    defaultWargear: [
      { id: "storm-bolter", name: "Storm bolter", image: "" },
      { id: "nemesis-force-weapon", name: "Nemesis force weapon", image: "" },
    ],
    wargear: [
      { id: "incinerator", name: "Incinerator", image: "" },
      { id: "psilencer", name: "Psilencer", image: "" },
      { id: "psycannon", name: "Psycannon", image: "" },
      { id: "close-combat-weapon", name: "Close combat weapon", image: "" },
    ],
    ledBy: [],
  },

  {
    id: "paladin-squad",
    name: "Paladin Squad",
    faction: "grey-knights",
    category: "infantry",
    points: 215,
    defaultWargear: [
      { id: "storm-bolter", name: "Storm bolter", image: "" },
      { id: "nemesis-force-weapon", name: "Nemesis force weapon", image: "" },
    ],
    wargear: [
      { id: "incinerator", name: "Incinerator", image: "" },
      { id: "psilencer", name: "Psilencer", image: "" },
      { id: "psycannon", name: "Psycannon", image: "" },
    ],
    ledBy: ["brother-captain","brother-captain-stern","brotherhood-chaplain","brotherhood-librarian","grand-master","grand-master-voldus","kaldor-draigo"],
  },

  {
    id: "purgation-squad",
    name: "Purgation Squad",
    faction: "grey-knights",
    category: "infantry",
    points: 120,
    defaultWargear: [
      { id: "storm-bolter", name: "Storm bolter", image: "" },
      { id: "nemesis-force-weapon", name: "Nemesis force weapon", image: "" },
    ],
    wargear: [
      { id: "incinerator", name: "Incinerator", image: "" },
      { id: "psilencer", name: "Psilencer", image: "" },
      { id: "psycannon", name: "Psycannon", image: "" },
      { id: "close-combat-weapon", name: "Close combat weapon", image: "" },
    ],
    ledBy: [],
  },

  {
    id: "purifier-squad",
    name: "Purifier Squad",
    faction: "grey-knights",
    category: "infantry",
    points: 125,
    defaultWargear: [
      { id: "purifying-flame", name: "Purifying Flame", image: "" },
      { id: "storm-bolter", name: "Storm bolter", image: "" },
      { id: "nemesis-force-weapon", name: "Nemesis force weapon", image: "" },
    ],
    wargear: [
      { id: "incinerator", name: "Incinerator", image: "" },
      { id: "psilencer", name: "Psilencer", image: "" },
      { id: "psycannon", name: "Psycannon", image: "" },
      { id: "close-combat-weapon", name: "Close combat weapon", image: "" },
    ],
    ledBy: [],
  },

  {
    id: "servitors",
    name: "Servitors",
    faction: "grey-knights",
    category: "infantry",
    points: 50,
    defaultWargear: [
      { id: "servitor-s-servo-arm", name: "Servitor's servo-arm", image: "" },
    ],
    wargear: [
      { id: "heavy-bolter", name: "Heavy bolter", image: "" },
      { id: "multi-melta", name: "Multi-melta", image: "" },
      { id: "servitor-s-tools", name: "Servitor's tools", image: "" },
    ],
    ledBy: [],
  },

  {
    id: "grey-knights-dreadnought",
    name: "Grey Knights Dreadnought",
    faction: "grey-knights",
    category: "vehicle",
    points: 160,
    defaultWargear: [
      { id: "assault-cannon", name: "Assault cannon", image: "" },
      { id: "storm-bolter", name: "Storm bolter", image: "" },
      { id: "dreadnought-combat-weapon", name: "Dreadnought combat weapon", image: "" },
    ],
    wargear: [
      { id: "heavy-flamer", name: "Heavy flamer", image: "" },
      { id: "heavy-plasma-cannon-standard", name: "Heavy plasma cannon – standard", image: "" },
      { id: "heavy-plasma-cannon-supercharge", name: "Heavy plasma cannon – supercharge", image: "" },
      { id: "heavy-psycannon", name: "Heavy psycannon", image: "" },
      { id: "incinerator", name: "Incinerator", image: "" },
      { id: "multi-melta", name: "Multi-melta", image: "" },
      { id: "twin-lascannon", name: "Twin lascannon", image: "" },
      { id: "armoured-feet", name: "Armoured feet", image: "" },
      { id: "nemesis-doomglaive", name: "Nemesis doomglaive", image: "" },
    ],
    ledBy: [],
  },

  {
    id: "grey-knights-stormhawk-interceptor",
    name: "Grey Knights Stormhawk Interceptor",
    faction: "grey-knights",
    category: "vehicle",
    points: 160,
    defaultWargear: [
      { id: "las-talon", name: "Las-talon", image: "" },
      { id: "skyhammer-missile-launcher", name: "Skyhammer missile launcher", image: "" },
      { id: "twin-assault-cannon", name: "Twin assault cannon", image: "" },
      { id: "armoured-hull", name: "Armoured hull", image: "" },
    ],
    wargear: [
      { id: "twin-heavy-bolter", name: "Twin heavy bolter", image: "" },
      { id: "typhoon-missile-launcher-frag", name: "Typhoon missile launcher – frag", image: "" },
      { id: "typhoon-missile-launcher-krak", name: "Typhoon missile launcher – krak", image: "" },
    ],
    ledBy: [],
  },

  {
    id: "grey-knights-stormtalon-gunship",
    name: "Grey Knights Stormtalon Gunship",
    faction: "grey-knights",
    category: "vehicle",
    points: 170,
    defaultWargear: [
      { id: "skyhammer-missile-launcher", name: "Skyhammer missile launcher", image: "" },
      { id: "twin-assault-cannon", name: "Twin assault cannon", image: "" },
      { id: "armoured-hull", name: "Armoured hull", image: "" },
    ],
    wargear: [
      { id: "twin-heavy-bolter", name: "Twin heavy bolter", image: "" },
      { id: "twin-lascannon", name: "Twin lascannon", image: "" },
      { id: "typhoon-missile-launcher-frag", name: "Typhoon missile launcher – frag", image: "" },
      { id: "typhoon-missile-launcher-krak", name: "Typhoon missile launcher – krak", image: "" },
    ],
    ledBy: [],
  },

  {
    id: "grey-knights-venerable-dreadnought",
    name: "Grey Knights Venerable Dreadnought",
    faction: "grey-knights",
    category: "vehicle",
    points: 155,
    defaultWargear: [
      { id: "assault-cannon", name: "Assault cannon", image: "" },
      { id: "storm-bolter", name: "Storm bolter", image: "" },
      { id: "dreadnought-combat-weapon", name: "Dreadnought combat weapon", image: "" },
    ],
    wargear: [
      { id: "heavy-flamer", name: "Heavy flamer", image: "" },
      { id: "heavy-plasma-cannon-standard", name: "Heavy plasma cannon – standard", image: "" },
      { id: "heavy-plasma-cannon-supercharge", name: "Heavy plasma cannon – supercharge", image: "" },
      { id: "multi-melta", name: "Multi-melta", image: "" },
      { id: "twin-lascannon", name: "Twin lascannon", image: "" },
      { id: "armoured-feet", name: "Armoured feet", image: "" },
    ],
    ledBy: [],
  },

  {
    id: "nemesis-dreadknight",
    name: "Nemesis Dreadknight",
    faction: "grey-knights",
    category: "vehicle",
    points: 210,
    defaultWargear: [
      { id: "dreadfists", name: "Dreadfists", image: "" },
    ],
    wargear: [
      { id: "gatling-psilencer", name: "Gatling psilencer", image: "" },
      { id: "heavy-incinerator", name: "Heavy incinerator", image: "" },
      { id: "heavy-psycannon", name: "Heavy psycannon", image: "" },
      { id: "nemesis-daemon-greathammer", name: "Nemesis daemon greathammer", image: "" },
      { id: "nemesis-greatsword-sweep", name: "Nemesis greatsword – sweep", image: "" },
      { id: "nemesis-greatsword-strike", name: "Nemesis greatsword – strike", image: "" },
    ],
    ledBy: [],
  },

  {
    id: "grey-knights-land-raider",
    name: "Grey Knights Land Raider",
    faction: "grey-knights",
    category: "transport",
    points: 240,
    defaultWargear: [
      { id: "godhammer-lascannon", name: "Godhammer lascannon", image: "" },
      { id: "twin-heavy-bolter", name: "Twin heavy bolter", image: "" },
      { id: "armoured-tracks", name: "Armoured tracks", image: "" },
    ],
    wargear: [
      { id: "hunter-killer-missile", name: "Hunter-killer missile", image: "" },
      { id: "multi-melta", name: "Multi-melta", image: "" },
      { id: "storm-bolter", name: "Storm bolter", image: "" },
    ],
    ledBy: [],
  },

  {
    id: "grey-knights-land-raider-crusader",
    name: "Grey Knights Land Raider Crusader",
    faction: "grey-knights",
    category: "transport",
    points: 220,
    defaultWargear: [
      { id: "hurricane-bolter", name: "Hurricane bolter", image: "" },
      { id: "twin-assault-cannon", name: "Twin assault cannon", image: "" },
      { id: "armoured-tracks", name: "Armoured tracks", image: "" },
    ],
    wargear: [
      { id: "hunter-killer-missile", name: "Hunter-killer missile", image: "" },
      { id: "multi-melta", name: "Multi-melta", image: "" },
      { id: "storm-bolter", name: "Storm bolter", image: "" },
    ],
    ledBy: [],
  },

  {
    id: "grey-knights-land-raider-redeemer",
    name: "Grey Knights Land Raider Redeemer",
    faction: "grey-knights",
    category: "transport",
    points: 285,
    defaultWargear: [
      { id: "flamestorm-cannon", name: "Flamestorm cannon", image: "" },
      { id: "twin-assault-cannon", name: "Twin assault cannon", image: "" },
      { id: "armoured-tracks", name: "Armoured tracks", image: "" },
    ],
    wargear: [
      { id: "hunter-killer-missile", name: "Hunter-killer missile", image: "" },
      { id: "multi-melta", name: "Multi-melta", image: "" },
      { id: "storm-bolter", name: "Storm bolter", image: "" },
    ],
    ledBy: [],
  },

  {
    id: "grey-knights-razorback",
    name: "Grey Knights Razorback",
    faction: "grey-knights",
    category: "transport",
    points: 85,
    defaultWargear: [
      { id: "twin-heavy-bolter", name: "Twin heavy bolter", image: "" },
      { id: "armoured-tracks", name: "Armoured tracks", image: "" },
    ],
    wargear: [
      { id: "twin-assault-cannon", name: "Twin assault cannon", image: "" },
      { id: "twin-lascannon", name: "Twin lascannon", image: "" },
    ],
    ledBy: [],
  },

  {
    id: "grey-knights-relic-razorback",
    name: "Grey Knights Relic Razorback",
    faction: "grey-knights",
    category: "transport",
    points: 95,
    defaultWargear: [
      { id: "twin-heavy-bolter", name: "Twin heavy bolter", image: "" },
      { id: "armoured-tracks", name: "Armoured tracks", image: "" },
    ],
    wargear: [
      { id: "multi-melta", name: "Multi-melta", image: "" },
      { id: "twin-assault-cannon", name: "Twin assault cannon", image: "" },
      { id: "twin-lascannon", name: "Twin lascannon", image: "" },
      { id: "twin-psycannon", name: "Twin psycannon", image: "" },
    ],
    ledBy: [],
  },

  {
    id: "grey-knights-rhino",
    name: "Grey Knights Rhino",
    faction: "grey-knights",
    category: "transport",
    points: 75,
    defaultWargear: [
      { id: "storm-bolter", name: "Storm bolter", image: "" },
      { id: "armoured-tracks", name: "Armoured tracks", image: "" },
    ],
    wargear: [
      { id: "hunter-killer-missile", name: "Hunter-killer missile", image: "" },
    ],
    ledBy: [],
  },

  {
    id: "grey-knights-stormraven-gunship",
    name: "Grey Knights Stormraven Gunship",
    faction: "grey-knights",
    category: "transport",
    points: 280,
    defaultWargear: [
      { id: "stormstrike-missile-launcher", name: "Stormstrike missile launcher", image: "" },
      { id: "twin-assault-cannon", name: "Twin assault cannon", image: "" },
      { id: "typhoon-missile-launcher-frag", name: "Typhoon missile launcher – frag", image: "" },
      { id: "typhoon-missile-launcher-krak", name: "Typhoon missile launcher – krak", image: "" },
      { id: "armoured-hull", name: "Armoured hull", image: "" },
    ],
    wargear: [
      { id: "twin-heavy-bolter", name: "Twin heavy bolter", image: "" },
      { id: "twin-heavy-plasma-cannon-standard", name: "Twin heavy plasma cannon – standard", image: "" },
      { id: "twin-heavy-plasma-cannon-supercharge", name: "Twin heavy plasma cannon – supercharge", image: "" },
      { id: "twin-lascannon", name: "Twin lascannon", image: "" },
      { id: "twin-multi-melta", name: "Twin multi-melta", image: "" },
    ],
    ledBy: [],
  },

  {
    id: "grey-knights-thunderhawk-gunship",
    name: "Grey Knights Thunderhawk Gunship",
    faction: "grey-knights",
    category: "transport",
    points: 805,
    defaultWargear: [
      { id: "lascannon", name: "Lascannon", image: "" },
      { id: "thunderhawk-heavy-cannon", name: "Thunderhawk heavy cannon", image: "" },
      { id: "twin-heavy-bolter", name: "Twin heavy bolter", image: "" },
      { id: "armoured-hull", name: "Armoured hull", image: "" },
    ],
    wargear: [
      { id: "hellstrike-missile-battery", name: "Hellstrike missile battery", image: "" },
      { id: "turbo-laser-destructor", name: "Turbo-laser destructor", image: "" },
    ],
    ledBy: [],
  },

  {
    id: "land-raider-banisher",
    name: "Land Raider Banisher",
    faction: "grey-knights",
    category: "transport",
    points: 255,
    defaultWargear: [
      { id: "heavy-incinerator", name: "Heavy incinerator", image: "" },
      { id: "twin-psycannon", name: "Twin psycannon", image: "" },
      { id: "armoured-tracks", name: "Armoured tracks", image: "" },
    ],
    wargear: [
      { id: "hunter-killer-missile", name: "Hunter-killer missile", image: "" },
      { id: "multi-melta", name: "Multi-melta", image: "" },
      { id: "storm-bolter", name: "Storm bolter", image: "" },
    ],
    ledBy: [],
  },

];
