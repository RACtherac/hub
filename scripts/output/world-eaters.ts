import type { Unit } from "../../src/types/warhammer";

export const worldEatersUnits: Unit[] = [

  {
    id: "jakhals",
    name: "Jakhals",
    faction: "world-eaters",
    category: "battleline",
    points: 65,
    defaultWargear: [
      { id: "autopistol", name: "Autopistol", image: "" },
      { id: "jakhal-chainblades", name: "Jakhal chainblades", image: "" },
    ],
    wargear: [
      { id: "dishonoured-chainblades", name: "Dishonoured chainblades", image: "" },
      { id: "mauler-chainblade", name: "Mauler chainblade", image: "" },
      { id: "skullsmasher", name: "Skullsmasher", image: "" },
    ],
    ledBy: [],
  },

  {
    id: "khorne-berzerkers",
    name: "Khorne Berzerkers",
    faction: "world-eaters",
    category: "battleline",
    points: 90,
    defaultWargear: [
      { id: "bolt-pistol", name: "Bolt pistol", image: "" },
      { id: "berzerker-chainblade", name: "Berzerker chainblade", image: "" },
    ],
    wargear: [],
    ledBy: ["kh-rn-the-betrayer","lord-invocatus","world-eaters-lord-on-juggernaut","world-eaters-master-of-executions"],
  },

  {
    id: "eightbound",
    name: "Eightbound",
    faction: "world-eaters",
    category: "infantry",
    points: 140,
    defaultWargear: [
      { id: "lacerators", name: "Lacerators", image: "" },
    ],
    wargear: [
      { id: "eightbound-eviscerators", name: "Eightbound eviscerators", image: "" },
      { id: "heavy-chainglaive", name: "Heavy chainglaive", image: "" },
    ],
    ledBy: ["lord-invocatus","world-eaters-lord-on-juggernaut"],
  },

  {
    id: "exalted-eightbound",
    name: "Exalted Eightbound",
    faction: "world-eaters",
    category: "infantry",
    points: 155,
    defaultWargear: [
      { id: "eightbound-chainfist", name: "Eightbound chainfist", image: "" },
      { id: "eightbound-eviscerator", name: "Eightbound eviscerator", image: "" },
      { id: "paired-eightbound-chainfists", name: "Paired Eightbound chainfists", image: "" },
    ],
    wargear: [
      { id: "heavy-chainglaive", name: "Heavy chainglaive", image: "" },
    ],
    ledBy: ["lord-invocatus","world-eaters-lord-on-juggernaut"],
  },

  {
    id: "world-eaters-chaos-spawn",
    name: "World Eaters Chaos Spawn",
    faction: "world-eaters",
    category: "infantry",
    points: 70,
    defaultWargear: [
      { id: "hideous-mutations", name: "Hideous mutations", image: "" },
    ],
    wargear: [],
    ledBy: [],
  },

  {
    id: "world-eaters-terminator-squad",
    name: "World Eaters Terminator Squad",
    faction: "world-eaters",
    category: "infantry",
    points: 180,
    defaultWargear: [
      { id: "combi-bolter", name: "Combi-bolter", image: "" },
      { id: "accursed-weapon", name: "Accursed weapon", image: "" },
      { id: "paired-accursed-weapons", name: "Paired accursed weapons", image: "" },
    ],
    wargear: [
      { id: "heavy-flamer", name: "Heavy flamer", image: "" },
      { id: "reaper-autocannon", name: "Reaper autocannon", image: "" },
    ],
    ledBy: [],
  },

  {
    id: "blood-slaughterer",
    name: "Blood Slaughterer",
    faction: "world-eaters",
    category: "vehicle",
    points: 160,
    defaultWargear: [
      { id: "impaler-harpoon", name: "Impaler harpoon", image: "" },
      { id: "slaughter-blade", name: "Slaughter blade", image: "" },
      { id: "twin-slaughter-blade", name: "Twin slaughter blade", image: "" },
    ],
    wargear: [],
    ledBy: [],
  },

  {
    id: "cerberus",
    name: "Cerberus",
    faction: "world-eaters",
    category: "vehicle",
    points: 285,
    defaultWargear: [
      { id: "cerberus-neutron-pulse-array", name: "Cerberus neutron pulse array", image: "" },
      { id: "armoured-tracks", name: "Armoured tracks", image: "" },
    ],
    wargear: [
      { id: "heavy-bolter", name: "Heavy bolter", image: "" },
      { id: "heavy-flamer", name: "Heavy flamer", image: "" },
      { id: "lascannon", name: "Lascannon", image: "" },
      { id: "multi-melta", name: "Multi-melta", image: "" },
      { id: "storm-bolter", name: "Storm bolter", image: "" },
    ],
    ledBy: [],
  },

  {
    id: "deredeo-dreadnought",
    name: "Deredeo Dreadnought",
    faction: "world-eaters",
    category: "vehicle",
    points: 170,
    defaultWargear: [
      { id: "anvilus-autocannon-battery", name: "Anvilus autocannon battery", image: "" },
      { id: "twin-heavy-bolter", name: "Twin heavy bolter", image: "" },
      { id: "armoured-feet", name: "Armoured feet", image: "" },
    ],
    wargear: [
      { id: "aiolos-missile-launcher", name: "Aiolos missile launcher", image: "" },
      { id: "arachnus-heavy-lascannon-battery", name: "Arachnus heavy lascannon battery", image: "" },
      { id: "boreas-air-defence-missiles", name: "Boreas air defence missiles", image: "" },
      { id: "volkite-falconet-battery", name: "Volkite falconet battery", image: "" },
    ],
    ledBy: [],
  },

  {
    id: "falchion",
    name: "Falchion",
    faction: "world-eaters",
    category: "vehicle",
    points: 515,
    defaultWargear: [
      { id: "heavy-bolter", name: "Heavy bolter", image: "" },
      { id: "quad-lascannon", name: "Quad lascannon", image: "" },
      { id: "twin-falchion-volcano-cannon", name: "Twin Falchion volcano cannon", image: "" },
      { id: "twin-heavy-bolter", name: "Twin heavy bolter", image: "" },
      { id: "armoured-tracks", name: "Armoured tracks", image: "" },
    ],
    wargear: [
      { id: "heavy-flamer", name: "Heavy flamer", image: "" },
      { id: "multi-melta", name: "Multi-melta", image: "" },
      { id: "storm-bolter", name: "Storm bolter", image: "" },
      { id: "twin-heavy-flamer", name: "Twin heavy flamer", image: "" },
    ],
    ledBy: [],
  },

  {
    id: "fellblade",
    name: "Fellblade",
    faction: "world-eaters",
    category: "vehicle",
    points: 535,
    defaultWargear: [
      { id: "demolisher-cannon", name: "Demolisher cannon", image: "" },
      { id: "fellblade-accelerator-cannon-ap-shells", name: "Fellblade accelerator cannon – AP shells", image: "" },
      { id: "fellblade-accelerator-cannon-he-shells", name: "Fellblade accelerator cannon – HE shells", image: "" },
      { id: "heavy-bolter", name: "Heavy bolter", image: "" },
      { id: "quad-lascannon", name: "Quad lascannon", image: "" },
      { id: "twin-heavy-bolter", name: "Twin heavy bolter", image: "" },
      { id: "armoured-tracks", name: "Armoured tracks", image: "" },
    ],
    wargear: [
      { id: "heavy-flamer", name: "Heavy flamer", image: "" },
      { id: "multi-melta", name: "Multi-melta", image: "" },
      { id: "storm-bolter", name: "Storm bolter", image: "" },
      { id: "twin-heavy-flamer", name: "Twin heavy flamer", image: "" },
    ],
    ledBy: [],
  },

  {
    id: "fire-raptor-gunship",
    name: "Fire Raptor Gunship",
    faction: "world-eaters",
    category: "vehicle",
    points: 290,
    defaultWargear: [
      { id: "twin-autocannon", name: "Twin autocannon", image: "" },
      { id: "twin-avenger-bolt-cannon", name: "Twin avenger bolt cannon", image: "" },
      { id: "twin-hellstrike-launcher", name: "Twin hellstrike launcher", image: "" },
      { id: "armoured-hull", name: "Armoured hull", image: "" },
    ],
    wargear: [
      { id: "quad-heavy-bolter", name: "Quad heavy bolter", image: "" },
      { id: "twin-lascannon", name: "Twin lascannon", image: "" },
    ],
    ledBy: [],
  },

  {
    id: "greater-brass-scorpion",
    name: "Greater Brass Scorpion",
    faction: "world-eaters",
    category: "vehicle",
    points: 560,
    defaultWargear: [
      { id: "demolisher-cannon", name: "Demolisher cannon", image: "" },
      { id: "hellmaw-flame-cannons", name: "Hellmaw flame cannons", image: "" },
      { id: "scorpion-cannon", name: "Scorpion cannon", image: "" },
      { id: "hellcrusher-claws-strike", name: "Hellcrusher claws – strike", image: "" },
      { id: "hellcrusher-claws-sweep", name: "Hellcrusher claws – sweep", image: "" },
    ],
    wargear: [],
    ledBy: [],
  },

  {
    id: "hell-blade",
    name: "Hell Blade",
    faction: "world-eaters",
    category: "vehicle",
    points: 115,
    defaultWargear: [
      { id: "twin-autocannon", name: "Twin autocannon", image: "" },
      { id: "armoured-hull", name: "Armoured hull", image: "" },
    ],
    wargear: [
      { id: "twin-lascannon", name: "Twin lascannon", image: "" },
    ],
    ledBy: [],
  },

  {
    id: "hell-talon",
    name: "Hell Talon",
    faction: "world-eaters",
    category: "vehicle",
    points: 140,
    defaultWargear: [
      { id: "autocannon", name: "Autocannon", image: "" },
      { id: "twin-lascannon", name: "Twin lascannon", image: "" },
      { id: "armoured-hull", name: "Armoured hull", image: "" },
    ],
    wargear: [
      { id: "havoc-launcher", name: "Havoc launcher", image: "" },
    ],
    ledBy: [],
  },

  {
    id: "khorne-lord-of-skulls",
    name: "Khorne Lord Of Skulls",
    faction: "world-eaters",
    category: "vehicle",
    points: 450,
    defaultWargear: [
      { id: "gorestorm-cannon", name: "Gorestorm cannon", image: "" },
      { id: "hades-gatling-cannon", name: "Hades gatling cannon", image: "" },
      { id: "great-cleaver-of-khorne-strike", name: "Great cleaver of Khorne – strike", image: "" },
      { id: "great-cleaver-of-khorne-sweep", name: "Great cleaver of Khorne – sweep", image: "" },
    ],
    wargear: [
      { id: "daemongore-cannon", name: "Daemongore cannon", image: "" },
      { id: "ichor-cannon", name: "Ichor cannon", image: "" },
    ],
    ledBy: [],
  },

  {
    id: "kratos",
    name: "Kratos",
    faction: "world-eaters",
    category: "vehicle",
    points: 265,
    defaultWargear: [
      { id: "autocannon", name: "Autocannon", image: "" },
      { id: "heavy-bolter", name: "Heavy bolter", image: "" },
      { id: "kratos-battle-cannon-ap", name: "Kratos battle cannon – AP", image: "" },
      { id: "kratos-battle-cannon-he", name: "Kratos battle cannon – HE", image: "" },
      { id: "armoured-tracks", name: "Armoured tracks", image: "" },
    ],
    wargear: [
      { id: "combi-weapon", name: "Combi-weapon", image: "" },
      { id: "havoc-launcher", name: "Havoc launcher", image: "" },
      { id: "heavy-flamer", name: "Heavy flamer", image: "" },
      { id: "lascannons", name: "Lascannons", image: "" },
      { id: "melta-blast-gun", name: "Melta blast-gun", image: "" },
      { id: "multi-melta", name: "Multi-melta", image: "" },
      { id: "twin-boltgun", name: "Twin boltgun", image: "" },
      { id: "volkite-caliver", name: "Volkite caliver", image: "" },
      { id: "volkite-cardanelle", name: "Volkite cardanelle", image: "" },
      { id: "volkite-culverin", name: "Volkite culverin", image: "" },
    ],
    ledBy: [],
  },

  {
    id: "kytan-ravager",
    name: "Kytan Ravager",
    faction: "world-eaters",
    category: "vehicle",
    points: 425,
    defaultWargear: [
      { id: "kytan-gatling-cannon", name: "Kytan gatling cannon", image: "" },
      { id: "kytan-cleaver-strike", name: "Kytan cleaver – strike", image: "" },
      { id: "kytan-cleaver-sweep", name: "Kytan cleaver – sweep", image: "" },
    ],
    wargear: [],
    ledBy: [],
  },

  {
    id: "leviathan-dreadnought",
    name: "Leviathan Dreadnought",
    faction: "world-eaters",
    category: "vehicle",
    points: 215,
    defaultWargear: [
      { id: "grav-flux-bombard", name: "Grav-flux bombard", image: "" },
      { id: "heavy-flamer", name: "Heavy flamer", image: "" },
      { id: "armoured-feet", name: "Armoured feet", image: "" },
    ],
    wargear: [
      { id: "cyclonic-melta-lance", name: "Cyclonic melta lance", image: "" },
      { id: "meltagun", name: "Meltagun", image: "" },
      { id: "storm-cannon", name: "Storm cannon", image: "" },
      { id: "leviathan-siege-claw", name: "Leviathan siege claw", image: "" },
      { id: "leviathan-siege-drill", name: "Leviathan siege drill", image: "" },
    ],
    ledBy: [],
  },

  {
    id: "rapier-carrier",
    name: "Rapier Carrier",
    faction: "world-eaters",
    category: "vehicle",
    points: 100,
    defaultWargear: [
      { id: "boltgun", name: "Boltgun", image: "" },
      { id: "quad-heavy-bolter", name: "Quad heavy bolter", image: "" },
      { id: "close-combat-weapon", name: "Close combat weapon", image: "" },
    ],
    wargear: [
      { id: "graviton-cannon", name: "Graviton cannon", image: "" },
      { id: "laser-destroyer", name: "Laser destroyer", image: "" },
      { id: "quad-launcher-shatter-shells", name: "Quad launcher – shatter shells", image: "" },
      { id: "quad-launcher-thunderfire-shells", name: "Quad launcher – thunderfire shells", image: "" },
    ],
    ledBy: [],
  },

  {
    id: "relic-contemptor-dreadnought",
    name: "Relic Contemptor Dreadnought",
    faction: "world-eaters",
    category: "vehicle",
    points: 180,
    defaultWargear: [
      { id: "armoured-feet", name: "Armoured feet", image: "" },
    ],
    wargear: [
      { id: "combi-bolter", name: "Combi-bolter", image: "" },
      { id: "conversion-beam-cannon", name: "Conversion beam cannon", image: "" },
      { id: "graviton-blaster", name: "Graviton blaster", image: "" },
      { id: "twin-autocannon", name: "Twin autocannon", image: "" },
      { id: "twin-heavy-bolter", name: "Twin heavy bolter", image: "" },
      { id: "twin-lascannon", name: "Twin lascannon", image: "" },
      { id: "heavy-flamer", name: "Heavy flamer", image: "" },
      { id: "kheres-pattern-assault-cannon", name: "Kheres-pattern assault cannon", image: "" },
      { id: "multi-melta", name: "Multi-melta", image: "" },
      { id: "plasma-blaster-standard", name: "Plasma blaster – standard", image: "" },
      { id: "plasma-blaster-supercharge", name: "Plasma blaster – supercharge", image: "" },
      { id: "twin-volkite-culverin", name: "Twin volkite culverin", image: "" },
      { id: "dreadnought-chainfist", name: "Dreadnought chainfist", image: "" },
      { id: "dreadnought-combat-weapon", name: "Dreadnought combat weapon", image: "" },
    ],
    ledBy: [],
  },

  {
    id: "sicaran-battle-tank",
    name: "Sicaran Battle Tank",
    faction: "world-eaters",
    category: "vehicle",
    points: 220,
    defaultWargear: [
      { id: "heavy-bolter", name: "Heavy bolter", image: "" },
      { id: "herakles-pattern-autocannon", name: "Herakles-pattern autocannon", image: "" },
      { id: "armoured-tracks", name: "Armoured tracks", image: "" },
    ],
    wargear: [
      { id: "lascannon", name: "Lascannon", image: "" },
    ],
    ledBy: [],
  },

  {
    id: "sicaran-punisher",
    name: "Sicaran Punisher",
    faction: "world-eaters",
    category: "vehicle",
    points: 220,
    defaultWargear: [
      { id: "heavy-bolter", name: "Heavy bolter", image: "" },
      { id: "punisher-rotary-cannon", name: "Punisher rotary cannon", image: "" },
      { id: "armoured-tracks", name: "Armoured tracks", image: "" },
    ],
    wargear: [
      { id: "lascannon", name: "Lascannon", image: "" },
    ],
    ledBy: [],
  },

  {
    id: "sicaran-venator",
    name: "Sicaran Venator",
    faction: "world-eaters",
    category: "vehicle",
    points: 220,
    defaultWargear: [
      { id: "heavy-bolter", name: "Heavy bolter", image: "" },
      { id: "venator-neutron-laser", name: "Venator neutron laser", image: "" },
      { id: "armoured-tracks", name: "Armoured tracks", image: "" },
    ],
    wargear: [
      { id: "lascannon", name: "Lascannon", image: "" },
    ],
    ledBy: [],
  },

  {
    id: "typhon",
    name: "Typhon",
    faction: "world-eaters",
    category: "vehicle",
    points: 385,
    defaultWargear: [
      { id: "dreadhammer-siege-cannon", name: "Dreadhammer siege cannon", image: "" },
      { id: "armoured-tracks", name: "Armoured tracks", image: "" },
    ],
    wargear: [
      { id: "heavy-bolter", name: "Heavy bolter", image: "" },
      { id: "heavy-flamer", name: "Heavy flamer", image: "" },
      { id: "lascannon", name: "Lascannon", image: "" },
      { id: "multi-melta", name: "Multi-melta", image: "" },
      { id: "storm-bolter", name: "Storm bolter", image: "" },
    ],
    ledBy: [],
  },

  {
    id: "whirlwind-scorpius",
    name: "Whirlwind Scorpius",
    faction: "world-eaters",
    category: "vehicle",
    points: 115,
    defaultWargear: [
      { id: "scorpius-multi-launcher", name: "Scorpius multi-launcher", image: "" },
      { id: "armoured-tracks", name: "Armoured tracks", image: "" },
    ],
    wargear: [
      { id: "hunter-killer-missile", name: "Hunter-killer missile", image: "" },
      { id: "storm-bolter", name: "Storm bolter", image: "" },
    ],
    ledBy: [],
  },

  {
    id: "world-eaters-defiler",
    name: "World Eaters Defiler",
    faction: "world-eaters",
    category: "vehicle",
    points: 190,
    defaultWargear: [
      { id: "defiler-cannon", name: "Defiler cannon", image: "" },
      { id: "reaper-autocannon", name: "Reaper autocannon", image: "" },
      { id: "twin-heavy-flamer", name: "Twin heavy flamer", image: "" },
      { id: "defiler-claws", name: "Defiler claws", image: "" },
    ],
    wargear: [
      { id: "combi-bolter", name: "Combi-bolter", image: "" },
      { id: "combi-weapon", name: "Combi-weapon", image: "" },
      { id: "havoc-launcher", name: "Havoc launcher", image: "" },
      { id: "twin-heavy-bolter", name: "Twin heavy bolter", image: "" },
      { id: "twin-lascannon", name: "Twin lascannon", image: "" },
      { id: "defiler-scourge", name: "Defiler scourge", image: "" },
    ],
    ledBy: [],
  },

  {
    id: "world-eaters-forgefiend",
    name: "World Eaters Forgefiend",
    faction: "world-eaters",
    category: "vehicle",
    points: 145,
    defaultWargear: [
      { id: "hades-autocannon", name: "Hades autocannon", image: "" },
      { id: "forgefiend-jaws", name: "Forgefiend jaws", image: "" },
    ],
    wargear: [
      { id: "ectoplasma-cannon", name: "Ectoplasma cannon", image: "" },
      { id: "forgefiend-claws", name: "Forgefiend claws", image: "" },
    ],
    ledBy: [],
  },

  {
    id: "world-eaters-helbrute",
    name: "World Eaters Helbrute",
    faction: "world-eaters",
    category: "vehicle",
    points: 130,
    defaultWargear: [
      { id: "missile-launcher-frag", name: "Missile launcher – frag", image: "" },
      { id: "missile-launcher-krak", name: "Missile launcher – krak", image: "" },
      { id: "multi-melta", name: "Multi-melta", image: "" },
      { id: "close-combat-weapon", name: "Close combat weapon", image: "" },
    ],
    wargear: [
      { id: "combi-bolter", name: "Combi-bolter", image: "" },
      { id: "heavy-flamer", name: "Heavy flamer", image: "" },
      { id: "helbrute-plasma-cannon", name: "Helbrute plasma cannon", image: "" },
      { id: "twin-autocannon", name: "Twin autocannon", image: "" },
      { id: "twin-heavy-bolter", name: "Twin heavy bolter", image: "" },
      { id: "twin-lascannon", name: "Twin lascannon", image: "" },
      { id: "helbrute-fist", name: "Helbrute fist", image: "" },
      { id: "helbrute-hammer", name: "Helbrute hammer", image: "" },
      { id: "power-scourge", name: "Power scourge", image: "" },
    ],
    ledBy: [],
  },

  {
    id: "world-eaters-heldrake",
    name: "World Eaters Heldrake",
    faction: "world-eaters",
    category: "vehicle",
    points: 210,
    defaultWargear: [
      { id: "hades-autocannon", name: "Hades autocannon", image: "" },
      { id: "heldrake-claws", name: "Heldrake claws", image: "" },
    ],
    wargear: [
      { id: "baleflamer", name: "Baleflamer", image: "" },
    ],
    ledBy: [],
  },

  {
    id: "world-eaters-maulerfiend",
    name: "World Eaters Maulerfiend",
    faction: "world-eaters",
    category: "vehicle",
    points: 140,
    defaultWargear: [
      { id: "lasher-tendrils", name: "Lasher tendrils", image: "" },
      { id: "maulerfiend-fists", name: "Maulerfiend fists", image: "" },
    ],
    wargear: [
      { id: "magma-cutter", name: "Magma cutter", image: "" },
    ],
    ledBy: [],
  },

  {
    id: "world-eaters-predator-annihilator",
    name: "World Eaters Predator Annihilator",
    faction: "world-eaters",
    category: "vehicle",
    points: 135,
    defaultWargear: [
      { id: "lascannon", name: "Lascannon", image: "" },
      { id: "predator-twin-lascannon", name: "Predator twin lascannon", image: "" },
      { id: "armoured-tracks", name: "Armoured tracks", image: "" },
    ],
    wargear: [
      { id: "combi-bolter", name: "Combi-bolter", image: "" },
      { id: "combi-weapon", name: "Combi-weapon", image: "" },
      { id: "heavy-bolter", name: "Heavy bolter", image: "" },
    ],
    ledBy: [],
  },

  {
    id: "world-eaters-predator-destructor",
    name: "World Eaters Predator Destructor",
    faction: "world-eaters",
    category: "vehicle",
    points: 140,
    defaultWargear: [
      { id: "predator-autocannon", name: "Predator autocannon", image: "" },
      { id: "armoured-tracks", name: "Armoured tracks", image: "" },
    ],
    wargear: [
      { id: "combi-bolter", name: "Combi-bolter", image: "" },
      { id: "combi-weapon", name: "Combi-weapon", image: "" },
      { id: "heavy-bolter", name: "Heavy bolter", image: "" },
      { id: "lascannon", name: "Lascannon", image: "" },
    ],
    ledBy: [],
  },

  {
    id: "xiphon-interceptor",
    name: "Xiphon Interceptor",
    faction: "world-eaters",
    category: "vehicle",
    points: 115,
    defaultWargear: [
      { id: "twin-lascannon", name: "Twin lascannon", image: "" },
      { id: "xiphon-missile-battery", name: "Xiphon missile battery", image: "" },
      { id: "armoured-hull", name: "Armoured hull", image: "" },
    ],
    wargear: [],
    ledBy: [],
  },

  {
    id: "chaos-thunderhawk",
    name: "Chaos Thunderhawk",
    faction: "world-eaters",
    category: "transport",
    points: 840,
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
    id: "land-raider-achilles",
    name: "Land Raider Achilles",
    faction: "world-eaters",
    category: "transport",
    points: 285,
    defaultWargear: [
      { id: "quad-launcher-shatter-shells", name: "Quad launcher – shatter shells", image: "" },
      { id: "quad-launcher-thunderfire-shells", name: "Quad launcher – thunderfire shells", image: "" },
      { id: "twin-volkite-culverin", name: "Twin volkite culverin", image: "" },
      { id: "armoured-tracks", name: "Armoured tracks", image: "" },
    ],
    wargear: [
      { id: "hunter-killer-missile", name: "Hunter-killer missile", image: "" },
      { id: "storm-bolter", name: "Storm bolter", image: "" },
      { id: "twin-multi-melta", name: "Twin multi-melta", image: "" },
    ],
    ledBy: [],
  },

  {
    id: "land-raider-proteus",
    name: "Land Raider Proteus",
    faction: "world-eaters",
    category: "transport",
    points: 250,
    defaultWargear: [
      { id: "twin-lascannon", name: "Twin lascannon", image: "" },
      { id: "armoured-tracks", name: "Armoured tracks", image: "" },
    ],
    wargear: [
      { id: "heavy-bolter", name: "Heavy bolter", image: "" },
      { id: "multi-melta", name: "Multi-melta", image: "" },
      { id: "twin-heavy-bolter", name: "Twin heavy bolter", image: "" },
      { id: "twin-heavy-flamer", name: "Twin heavy flamer", image: "" },
    ],
    ledBy: [],
  },

  {
    id: "mastodon",
    name: "Mastodon",
    faction: "world-eaters",
    category: "transport",
    points: 610,
    defaultWargear: [
      { id: "heavy-flamer", name: "Heavy flamer", image: "" },
      { id: "lascannon", name: "Lascannon", image: "" },
      { id: "siege-melta-array", name: "Siege melta array", image: "" },
      { id: "skyreaper-battery", name: "Skyreaper battery", image: "" },
      { id: "armoured-tracks", name: "Armoured tracks", image: "" },
    ],
    wargear: [
      { id: "heavy-bolter", name: "Heavy bolter", image: "" },
      { id: "volkite-culverin", name: "Volkite culverin", image: "" },
    ],
    ledBy: [],
  },

  {
    id: "sokar-pattern-stormbird",
    name: "Sokar Pattern Stormbird",
    faction: "world-eaters",
    category: "transport",
    points: 1100,
    defaultWargear: [
      { id: "hellstrike-missile-battery", name: "Hellstrike missile battery", image: "" },
      { id: "twin-heavy-bolter", name: "Twin heavy bolter", image: "" },
      { id: "twin-lascannon", name: "Twin lascannon", image: "" },
      { id: "armoured-hull", name: "Armoured hull", image: "" },
    ],
    wargear: [],
    ledBy: [],
  },

  {
    id: "spartan",
    name: "Spartan",
    faction: "world-eaters",
    category: "transport",
    points: 315,
    defaultWargear: [
      { id: "heavy-bolter", name: "Heavy bolter", image: "" },
      { id: "quad-lascannon", name: "Quad lascannon", image: "" },
      { id: "twin-heavy-bolter", name: "Twin heavy bolter", image: "" },
      { id: "armoured-tracks", name: "Armoured tracks", image: "" },
    ],
    wargear: [
      { id: "heavy-flamer", name: "Heavy flamer", image: "" },
      { id: "multi-melta", name: "Multi-melta", image: "" },
      { id: "storm-bolter", name: "Storm bolter", image: "" },
      { id: "twin-heavy-flamer", name: "Twin heavy flamer", image: "" },
    ],
    ledBy: [],
  },

  {
    id: "storm-eagle-gunship",
    name: "Storm Eagle Gunship",
    faction: "world-eaters",
    category: "transport",
    points: 255,
    defaultWargear: [
      { id: "twin-heavy-bolter", name: "Twin heavy bolter", image: "" },
      { id: "twin-hellstrike-launcher", name: "Twin hellstrike launcher", image: "" },
      { id: "vengeance-launcher", name: "Vengeance launcher", image: "" },
      { id: "armoured-hull", name: "Armoured hull", image: "" },
    ],
    wargear: [
      { id: "twin-multi-melta", name: "Twin multi-melta", image: "" },
      { id: "typhoon-missile-launcher-frag", name: "Typhoon missile launcher – frag", image: "" },
      { id: "typhoon-missile-launcher-krak", name: "Typhoon missile launcher – krak", image: "" },
    ],
    ledBy: [],
  },

  {
    id: "terrax-pattern-termite",
    name: "Terrax Pattern Termite",
    faction: "world-eaters",
    category: "transport",
    points: 200,
    defaultWargear: [
      { id: "combi-bolter", name: "Combi-bolter", image: "" },
      { id: "terrax-melta-cutter", name: "Terrax melta cutter", image: "" },
      { id: "termite-drill", name: "Termite drill", image: "" },
    ],
    wargear: [
      { id: "heavy-flamer", name: "Heavy flamer", image: "" },
      { id: "twin-volkite-charger", name: "Twin volkite charger", image: "" },
    ],
    ledBy: [],
  },

  {
    id: "world-eaters-land-raider",
    name: "World Eaters Land Raider",
    faction: "world-eaters",
    category: "transport",
    points: 240,
    defaultWargear: [
      { id: "soulshatter-lascannon", name: "Soulshatter lascannon", image: "" },
      { id: "twin-heavy-bolter", name: "Twin heavy bolter", image: "" },
      { id: "armoured-tracks", name: "Armoured tracks", image: "" },
    ],
    wargear: [
      { id: "combi-bolter", name: "Combi-bolter", image: "" },
      { id: "combi-weapon", name: "Combi-weapon", image: "" },
    ],
    ledBy: [],
  },

  {
    id: "world-eaters-rhino",
    name: "World Eaters Rhino",
    faction: "world-eaters",
    category: "transport",
    points: 75,
    defaultWargear: [
      { id: "combi-bolter", name: "Combi-bolter", image: "" },
      { id: "armoured-tracks", name: "Armoured tracks", image: "" },
    ],
    wargear: [
      { id: "combi-weapon", name: "Combi-weapon", image: "" },
    ],
    ledBy: [],
  },

];
