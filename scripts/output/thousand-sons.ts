import type { Unit } from "../../../types/warhammer";

export const thousandSonsUnits: Unit[] = [

  {
    id: "tzaangor-enlightened",
    name: "Tzaangor Enlightened",
    faction: "thousand-sons",
    category: "mounted",
    points: 50,
    defaultWargear: [
      { id: "divining-spear", name: "Divining spear", image: "" },
    ],
    wargear: [
      { id: "autopistol", name: "Autopistol", image: "" },
      { id: "fatecaster-greatbow", name: "Fatecaster greatbow", image: "" },
      { id: "chainsword", name: "Chainsword", image: "" },
      { id: "close-combat-weapon", name: "Close combat weapon", image: "" },
    ],
    ledBy: [],
  },

  {
    id: "tzaangors",
    name: "Tzaangors",
    faction: "thousand-sons",
    category: "battleline",
    points: 65,
    pointsByModelCount: { 10: 85, 20: 170 },
    defaultWargear: [
      { id: "tzaangor-blades", name: "Tzaangor blades", image: "" },
    ],
    wargear: [
      { id: "autopistol", name: "Autopistol", image: "" },
      { id: "chainsword", name: "Chainsword", image: "" },
    ],
    ledBy: [],
  },

  {
    id: "rubric-marines",
    name: "Rubric Marines",
    faction: "thousand-sons",
    category: "battleline",
    points: 100,
    pointsByModelCount: { 5: 100, 10: 190 },
    defaultWargear: [
      { id: "inferno-bolt-pistol", name: "Inferno bolt pistol", image: "" },
      { id: "warpsmite", name: "Warpsmite", image: "" },
      { id: "force-weapon", name: "Force weapon", image: "" },
    ],
    wargear: [
      { id: "inferno-boltgun", name: "Inferno boltgun", image: "" },
      { id: "plasma-pistol", name: "Plasma pistol", image: "", profiles: [{ profileName: "standard", range: '12"', attacks: "1", skill: "3+", strength: "7", ap: "-2", damage: "1", keywords: ["PISTOL"] }, { profileName: "supercharge", range: '12"', attacks: "1", skill: "3+", strength: "8", ap: "-3", damage: "2", keywords: ["PISTOL", "HAZARDOUS"] }] },
      { id: "soulreaper-cannon", name: "Soulreaper cannon", image: "" },
      { id: "warpflame-pistol", name: "Warpflame pistol", image: "" },
    ],
    ledBy: ["ahriman","ahriman-on-disc-of-tzeentch","exalted-sorcerer","exalted-sorcerer-on-disc-of-tzeentch","infernal-master","thousand-sons-sorcerer"],
  },

  {
    id: "scarab-occult-terminators",
    name: "Scarab Occult Terminators",
    faction: "thousand-sons",
    category: "infantry",
    points: 180,
    defaultWargear: [
      { id: "inferno-combi-bolter", name: "Inferno combi-bolter", image: "" },
      { id: "warpsmite", name: "Warpsmite", image: "" },
      { id: "force-weapon", name: "Force weapon", image: "" },
    ],
    wargear: [
      { id: "heavy-warpflamer", name: "Heavy warpflamer", image: "" },
      { id: "soulreaper-cannon", name: "Soulreaper cannon", image: "" },
    ],
    ledBy: [],
  },

  {
    id: "thousand-sons-chaos-spawn",
    name: "Thousand Sons Chaos Spawn",
    faction: "thousand-sons",
    category: "infantry",
    points: 65,
    defaultWargear: [
      { id: "hideous-mutations", name: "Hideous mutations", image: "" },
    ],
    wargear: [],
    ledBy: [],
  },

  {
    id: "thousand-sons-cultists",
    name: "Thousand Sons Cultists",
    faction: "thousand-sons",
    category: "infantry",
    points: 55,
    defaultWargear: [
      { id: "cultist-firearm", name: "Cultist firearm", image: "" },
      { id: "brutal-assault-weapon", name: "Brutal assault weapon", image: "" },
    ],
    wargear: [
      { id: "flamer", name: "Flamer", image: "" },
      { id: "grenade-launcher-frag", name: "Grenade launcher – frag", image: "" },
      { id: "grenade-launcher-krak", name: "Grenade launcher – krak", image: "" },
      { id: "heavy-stubber", name: "Heavy stubber", image: "" },
    ],
    ledBy: [],
  },

  {
    id: "cerberus",
    name: "Cerberus",
    faction: "thousand-sons",
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
    faction: "thousand-sons",
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
    faction: "thousand-sons",
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
    faction: "thousand-sons",
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
    faction: "thousand-sons",
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
    id: "hell-blade",
    name: "Hell Blade",
    faction: "thousand-sons",
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
    faction: "thousand-sons",
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
    id: "kratos",
    name: "Kratos",
    faction: "thousand-sons",
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
    id: "leviathan-dreadnought",
    name: "Leviathan Dreadnought",
    faction: "thousand-sons",
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
    faction: "thousand-sons",
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
    faction: "thousand-sons",
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
    faction: "thousand-sons",
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
    faction: "thousand-sons",
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
    faction: "thousand-sons",
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
    id: "thousand-sons-defiler",
    name: "Thousand Sons Defiler",
    faction: "thousand-sons",
    category: "vehicle",
    points: 190,
    defaultWargear: [
      { id: "defiler-cannon", name: "Defiler cannon", image: "" },
      { id: "reaper-autocannon", name: "Reaper autocannon", image: "" },
      { id: "twin-heavy-flamer", name: "Twin heavy flamer", image: "" },
      { id: "defiler-claws", name: "Defiler claws", image: "" },
    ],
    wargear: [
      { id: "havoc-launcher", name: "Havoc launcher", image: "" },
      { id: "twin-inferno-heavy-bolter", name: "Twin inferno heavy bolter", image: "" },
      { id: "twin-lascannon", name: "Twin lascannon", image: "" },
      { id: "defiler-scourge", name: "Defiler scourge", image: "" },
    ],
    ledBy: [],
  },

  {
    id: "thousand-sons-forgefiend",
    name: "Thousand Sons Forgefiend",
    faction: "thousand-sons",
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
    id: "thousand-sons-helbrute",
    name: "Thousand Sons Helbrute",
    faction: "thousand-sons",
    category: "vehicle",
    points: 130,
    defaultWargear: [
      { id: "missile-launcher-frag", name: "Missile launcher – frag", image: "" },
      { id: "missile-launcher-krak", name: "Missile launcher – krak", image: "" },
      { id: "multi-melta", name: "Multi-melta", image: "" },
      { id: "close-combat-weapon", name: "Close combat weapon", image: "" },
    ],
    wargear: [
      { id: "heavy-flamer", name: "Heavy flamer", image: "" },
      { id: "helbrute-plasma-cannon", name: "Helbrute plasma cannon", image: "" },
      { id: "inferno-combi-bolter", name: "Inferno combi-bolter", image: "" },
      { id: "twin-autocannon", name: "Twin autocannon", image: "" },
      { id: "twin-inferno-heavy-bolter", name: "Twin inferno heavy bolter", image: "" },
      { id: "twin-lascannon", name: "Twin lascannon", image: "" },
      { id: "helbrute-fist", name: "Helbrute fist", image: "" },
      { id: "helbrute-hammer", name: "Helbrute hammer", image: "" },
      { id: "power-scourge", name: "Power scourge", image: "" },
    ],
    ledBy: [],
  },

  {
    id: "thousand-sons-heldrake",
    name: "Thousand Sons Heldrake",
    faction: "thousand-sons",
    category: "vehicle",
    points: 195,
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
    id: "thousand-sons-maulerfiend",
    name: "Thousand Sons Maulerfiend",
    faction: "thousand-sons",
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
    id: "thousand-sons-predator-annihilator",
    name: "Thousand Sons Predator Annihilator",
    faction: "thousand-sons",
    category: "vehicle",
    points: 135,
    defaultWargear: [
      { id: "lascannon", name: "Lascannon", image: "" },
      { id: "predator-twin-lascannon", name: "Predator twin lascannon", image: "" },
      { id: "armoured-tracks", name: "Armoured tracks", image: "" },
    ],
    wargear: [
      { id: "inferno-combi-bolter", name: "Inferno combi-bolter", image: "" },
      { id: "inferno-combi-weapon", name: "Inferno combi-weapon", image: "" },
      { id: "inferno-heavy-bolter", name: "Inferno heavy bolter", image: "" },
    ],
    ledBy: [],
  },

  {
    id: "thousand-sons-predator-destructor",
    name: "Thousand Sons Predator Destructor",
    faction: "thousand-sons",
    category: "vehicle",
    points: 140,
    defaultWargear: [
      { id: "predator-autocannon", name: "Predator autocannon", image: "" },
      { id: "armoured-tracks", name: "Armoured tracks", image: "" },
    ],
    wargear: [
      { id: "inferno-combi-bolter", name: "Inferno combi-bolter", image: "" },
      { id: "inferno-combi-weapon", name: "Inferno combi-weapon", image: "" },
      { id: "inferno-heavy-bolter", name: "Inferno heavy bolter", image: "" },
      { id: "lascannon", name: "Lascannon", image: "" },
    ],
    ledBy: [],
  },

  {
    id: "thousand-sons-vindicator",
    name: "Thousand Sons Vindicator",
    faction: "thousand-sons",
    category: "vehicle",
    points: 185,
    defaultWargear: [
      { id: "demolisher-cannon", name: "Demolisher cannon", image: "" },
      { id: "armoured-tracks", name: "Armoured tracks", image: "" },
    ],
    wargear: [
      { id: "inferno-combi-bolter", name: "Inferno combi-bolter", image: "" },
      { id: "inferno-combi-weapon", name: "Inferno combi-weapon", image: "" },
    ],
    ledBy: [],
  },

  {
    id: "typhon",
    name: "Typhon",
    faction: "thousand-sons",
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
    faction: "thousand-sons",
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
    id: "xiphon-interceptor",
    name: "Xiphon Interceptor",
    faction: "thousand-sons",
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
    id: "mutalith-vortex-beast",
    name: "Mutalith Vortex Beast",
    faction: "thousand-sons",
    category: "monster",
    points: 165,
    defaultWargear: [
      { id: "warp-vortex-blast", name: "Warp vortex – blast", image: "" },
      { id: "warp-vortex-beam", name: "Warp vortex – beam", image: "" },
      { id: "warp-vortex-torrent", name: "Warp vortex – torrent", image: "" },
      { id: "betentacled-maw", name: "Betentacled maw", image: "" },
      { id: "mutalith-claws", name: "Mutalith claws", image: "" },
    ],
    wargear: [],
    ledBy: [],
  },

  {
    id: "chaos-thunderhawk",
    name: "Chaos Thunderhawk",
    faction: "thousand-sons",
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
    faction: "thousand-sons",
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
    faction: "thousand-sons",
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
    faction: "thousand-sons",
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
    faction: "thousand-sons",
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
    faction: "thousand-sons",
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
    faction: "thousand-sons",
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
    faction: "thousand-sons",
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
    id: "thousand-sons-land-raider",
    name: "Thousand Sons Land Raider",
    faction: "thousand-sons",
    category: "transport",
    points: 240,
    defaultWargear: [
      { id: "soulshatter-lascannon", name: "Soulshatter lascannon", image: "" },
      { id: "twin-inferno-heavy-bolter", name: "Twin inferno heavy bolter", image: "" },
      { id: "armoured-tracks", name: "Armoured tracks", image: "" },
    ],
    wargear: [
      { id: "inferno-combi-bolter", name: "Inferno combi-bolter", image: "" },
      { id: "inferno-combi-weapon", name: "Inferno combi-weapon", image: "" },
    ],
    ledBy: [],
  },

  {
    id: "thousand-sons-rhino",
    name: "Thousand Sons Rhino",
    faction: "thousand-sons",
    category: "transport",
    points: 75,
    defaultWargear: [
      { id: "inferno-combi-bolter", name: "Inferno combi-bolter", image: "" },
      { id: "armoured-tracks", name: "Armoured tracks", image: "" },
    ],
    wargear: [
      { id: "inferno-combi-weapon", name: "Inferno combi-weapon", image: "" },
    ],
    ledBy: [],
  },

];
