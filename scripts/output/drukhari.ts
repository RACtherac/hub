import type { Unit } from "../../../types/warhammer";

export const drukhariUnits: Unit[] = [

  {
    id: "corsair-cloud-dancer-band",
    name: "Corsair Cloud Dancer Band",
    faction: "drukhari",
    category: "mounted",
    points: 105,
    defaultWargear: [
      { id: "brace-of-pistols", name: "Brace of pistols", image: "" },
      { id: "twin-shuriken-catapult", name: "Twin shuriken catapult", image: "" },
      { id: "close-combat-weapon", name: "Close combat weapon", image: "" },
    ],
    wargear: [
      { id: "dark-lance", name: "Dark lance", image: "" },
      { id: "dissonance-cannon", name: "Dissonance cannon", image: "" },
      { id: "dissonance-pistol", name: "Dissonance pistol", image: "" },
      { id: "scatter-laser", name: "Scatter laser", image: "" },
      { id: "shuriken-cannon", name: "Shuriken cannon", image: "" },
      { id: "splinter-cannon", name: "Splinter cannon", image: "" },
      { id: "void-sabre", name: "Void sabre", image: "" },
    ],
    ledBy: [],
  },

  {
    id: "hellions",
    name: "Hellions",
    faction: "drukhari",
    category: "mounted",
    points: 75,
    defaultWargear: [
      { id: "splinter-pods", name: "Splinter pods", image: "" },
      { id: "hellglaive", name: "Hellglaive", image: "" },
    ],
    wargear: [
      { id: "splinter-pistol", name: "Splinter pistol", image: "" },
      { id: "helliarch-weapon", name: "Helliarch weapon", image: "" },
    ],
    ledBy: [],
  },

  {
    id: "reavers",
    name: "Reavers",
    faction: "drukhari",
    category: "mounted",
    points: 65,
    defaultWargear: [
      { id: "splinter-pistol", name: "Splinter pistol", image: "" },
      { id: "splinter-rifle", name: "Splinter rifle", image: "" },
      { id: "bladevanes", name: "Bladevanes", image: "" },
    ],
    wargear: [
      { id: "blaster", name: "Blaster", image: "" },
      { id: "heat-lance", name: "Heat lance", image: "" },
    ],
    ledBy: [],
  },

  {
    id: "skyweavers",
    name: "Skyweavers",
    faction: "drukhari",
    category: "mounted",
    points: 95,
    defaultWargear: [
      { id: "shuriken-cannon", name: "Shuriken cannon", image: "" },
      { id: "star-bolas", name: "Star bolas", image: "" },
      { id: "close-combat-weapon", name: "Close combat weapon", image: "" },
    ],
    wargear: [
      { id: "skyweaver-haywire-cannon", name: "Skyweaver haywire cannon", image: "" },
      { id: "zephyrglaive", name: "Zephyrglaive", image: "" },
    ],
    ledBy: [],
  },

  {
    id: "corsair-voidreavers",
    name: "Corsair Voidreavers",
    faction: "drukhari",
    category: "battleline",
    points: 60,
    defaultWargear: [
      { id: "shuriken-pistol", name: "Shuriken pistol", image: "" },
      { id: "close-combat-weapon", name: "Close combat weapon", image: "" },
      { id: "power-sword", name: "Power sword", image: "" },
    ],
    wargear: [
      { id: "blaster", name: "Blaster", image: "" },
      { id: "neuro-disruptor", name: "Neuro disruptor", image: "" },
      { id: "shredder", name: "Shredder", image: "" },
      { id: "shuriken-cannon", name: "Shuriken cannon", image: "" },
      { id: "shuriken-rifle", name: "Shuriken rifle", image: "" },
      { id: "wraithcannon", name: "Wraithcannon", image: "" },
    ],
    ledBy: [],
  },

  {
    id: "kabalite-warriors",
    name: "Kabalite Warriors",
    faction: "drukhari",
    category: "battleline",
    points: 100,
    defaultWargear: [
      { id: "splinter-rifle", name: "Splinter rifle", image: "" },
      { id: "close-combat-weapon", name: "Close combat weapon", image: "" },
    ],
    wargear: [
      { id: "blast-pistol", name: "Blast pistol", image: "" },
      { id: "blaster", name: "Blaster", image: "" },
      { id: "dark-lance", name: "Dark lance", image: "" },
      { id: "shredder", name: "Shredder", image: "" },
      { id: "splinter-cannon", name: "Splinter cannon", image: "" },
      { id: "splinter-pistol", name: "Splinter pistol", image: "" },
    ],
    ledBy: [],
  },

  {
    id: "wracks",
    name: "Wracks",
    faction: "drukhari",
    category: "battleline",
    points: 55,
    defaultWargear: [
      { id: "wrack-blades", name: "Wrack blades", image: "" },
    ],
    wargear: [
      { id: "liquifier-gun", name: "Liquifier gun", image: "" },
      { id: "ossefactor", name: "Ossefactor", image: "" },
      { id: "hexrifle", name: "Hexrifle", image: "" },
      { id: "stinger-pistol", name: "Stinger pistol", image: "" },
    ],
    ledBy: ["haemonculus","urien-rakarth"],
  },

  {
    id: "wyches",
    name: "Wyches",
    faction: "drukhari",
    category: "battleline",
    points: 80,
    defaultWargear: [
      { id: "splinter-pistol", name: "Splinter pistol", image: "" },
      { id: "hekatarii-blade", name: "Hekatarii blade", image: "" },
    ],
    wargear: [
      { id: "blast-pistol", name: "Blast pistol", image: "" },
    ],
    ledBy: ["lelith-hesperax","succubus"],
  },

  {
    id: "beastmaster",
    name: "Beastmaster",
    faction: "drukhari",
    category: "infantry",
    points: 120,
    defaultWargear: [
      { id: "splinter-pods", name: "Splinter pods", image: "" },
      { id: "agoniser", name: "Agoniser", image: "" },
    ],
    wargear: [
      { id: "clawed-fiend-fists", name: "Clawed Fiend fists", image: "" },
      { id: "khymerae-talons", name: "Khymerae talons", image: "" },
      { id: "razorwing-feathers", name: "Razorwing feathers", image: "" },
    ],
    ledBy: [],
  },

  {
    id: "corsair-reaver-band",
    name: "Corsair Reaver Band",
    faction: "drukhari",
    category: "infantry",
    points: 125,
    defaultWargear: [
      { id: "brace-of-pistols", name: "Brace of pistols", image: "" },
      { id: "corsair-firearm", name: "Corsair firearm", image: "" },
      { id: "close-combat-weapon", name: "Close combat weapon", image: "" },
    ],
    wargear: [
      { id: "aeldari-missile-launcher-starshot", name: "Aeldari missile launcher – starshot", image: "" },
      { id: "aeldari-missile-launcher-sunburst", name: "Aeldari missile launcher – sunburst", image: "" },
      { id: "blaster", name: "Blaster", image: "" },
      { id: "dark-lance", name: "Dark lance", image: "" },
      { id: "dissonance-pistol", name: "Dissonance pistol", image: "" },
      { id: "flamer", name: "Flamer", image: "" },
      { id: "fusion-gun", name: "Fusion gun", image: "" },
      { id: "shredder", name: "Shredder", image: "" },
      { id: "shuriken-cannon", name: "Shuriken cannon", image: "" },
      { id: "splinter-cannon", name: "Splinter cannon", image: "" },
      { id: "void-sabre", name: "Void sabre", image: "" },
    ],
    ledBy: [],
  },

  {
    id: "corsair-skyreaver-band",
    name: "Corsair Skyreaver Band",
    faction: "drukhari",
    category: "infantry",
    points: 125,
    defaultWargear: [
      { id: "brace-of-pistols", name: "Brace of pistols", image: "" },
      { id: "corsair-firearm", name: "Corsair firearm", image: "" },
      { id: "close-combat-weapon", name: "Close combat weapon", image: "" },
    ],
    wargear: [
      { id: "aeldari-missile-launcher-starshot", name: "Aeldari missile launcher – starshot", image: "" },
      { id: "aeldari-missile-launcher-sunburst", name: "Aeldari missile launcher – sunburst", image: "" },
      { id: "blaster", name: "Blaster", image: "" },
      { id: "dark-lance", name: "Dark lance", image: "" },
      { id: "dissonance-pistol", name: "Dissonance pistol", image: "" },
      { id: "flamer", name: "Flamer", image: "" },
      { id: "fusion-gun", name: "Fusion gun", image: "" },
      { id: "shardcarbine", name: "Shardcarbine", image: "" },
      { id: "shuriken-cannon", name: "Shuriken cannon", image: "" },
      { id: "shuriken-catapult", name: "Shuriken catapult", image: "" },
      { id: "splinter-cannon", name: "Splinter cannon", image: "" },
      { id: "shredder", name: "Shredder", image: "" },
      { id: "spar-glaive", name: "Spar-glaive", image: "" },
      { id: "void-sabre", name: "Void sabre", image: "" },
    ],
    ledBy: [],
  },

  {
    id: "corsair-voidscarred",
    name: "Corsair Voidscarred",
    faction: "drukhari",
    category: "infantry",
    points: 80,
    defaultWargear: [
      { id: "shuriken-pistol", name: "Shuriken pistol", image: "" },
      { id: "close-combat-weapon", name: "Close combat weapon", image: "" },
      { id: "power-sword", name: "Power sword", image: "" },
    ],
    wargear: [
      { id: "neuro-disruptor", name: "Neuro disruptor", image: "" },
      { id: "shuriken-rifle", name: "Shuriken rifle", image: "" },
    ],
    ledBy: [],
  },

  {
    id: "court-of-the-archon",
    name: "Court Of The Archon",
    faction: "drukhari",
    category: "infantry",
    points: 95,
    defaultWargear: [
      { id: "shaimeshi-blade", name: "Shaimeshi blade", image: "" },
    ],
    wargear: [
      { id: "eyeburst", name: "Eyeburst", image: "" },
      { id: "shardcarbine", name: "Shardcarbine", image: "" },
      { id: "splinter-pistol", name: "Splinter pistol", image: "" },
      { id: "close-combat-weapon", name: "Close combat weapon", image: "" },
      { id: "sslyth-battle-blade", name: "Sslyth battle-blade", image: "" },
      { id: "ur-ghul-talons", name: "Ur-ghul talons", image: "" },
    ],
    ledBy: [],
  },

  {
    id: "grotesques",
    name: "Grotesques",
    faction: "drukhari",
    category: "infantry",
    points: 80,
    defaultWargear: [
      { id: "monstrous-weapons", name: "Monstrous weapons", image: "" },
    ],
    wargear: [
      { id: "liquifier-gun", name: "Liquifier gun", image: "" },
    ],
    ledBy: [],
  },

  {
    id: "incubi",
    name: "Incubi",
    faction: "drukhari",
    category: "infantry",
    points: 85,
    defaultWargear: [
      { id: "demiklaives-single-blade", name: "Demiklaives – single blade", image: "" },
      { id: "demiklaives-dual-blades", name: "Demiklaives – dual blades", image: "" },
      { id: "klaive", name: "Klaive", image: "" },
    ],
    wargear: [],
    ledBy: ["archon","drazhar"],
  },

  {
    id: "mandrakes",
    name: "Mandrakes",
    faction: "drukhari",
    category: "infantry",
    points: 70,
    defaultWargear: [
      { id: "baleblast", name: "Baleblast", image: "" },
      { id: "glimmersteel-blade", name: "Glimmersteel blade", image: "" },
    ],
    wargear: [],
    ledBy: [],
  },

  {
    id: "scourges",
    name: "Scourges",
    faction: "drukhari",
    category: "infantry",
    points: 130,
    defaultWargear: [
      { id: "shardcarbine", name: "Shardcarbine", image: "" },
      { id: "close-combat-weapon", name: "Close combat weapon", image: "" },
    ],
    wargear: [
      { id: "blast-pistol", name: "Blast pistol", image: "" },
      { id: "blaster", name: "Blaster", image: "" },
      { id: "dark-lance", name: "Dark lance", image: "" },
      { id: "drukhari-haywire-blaster", name: "Drukhari haywire blaster", image: "" },
      { id: "heat-lance", name: "Heat lance", image: "" },
      { id: "shredder", name: "Shredder", image: "" },
      { id: "splinter-cannon", name: "Splinter cannon", image: "" },
      { id: "splinter-pistol", name: "Splinter pistol", image: "" },
    ],
    ledBy: [],
  },

  {
    id: "troupe",
    name: "Troupe",
    faction: "drukhari",
    category: "infantry",
    points: 85,
    defaultWargear: [
      { id: "shuriken-pistol", name: "Shuriken pistol", image: "" },
      { id: "harlequin-s-blade", name: "Harlequin’s blade", image: "" },
    ],
    wargear: [
      { id: "fusion-pistol", name: "Fusion pistol", image: "" },
      { id: "neuro-disruptor", name: "Neuro disruptor", image: "" },
      { id: "harlequin-s-special-weapon", name: "Harlequin’s special weapon", image: "" },
      { id: "power-sword", name: "Power sword", image: "" },
    ],
    ledBy: [],
  },

  {
    id: "ravager",
    name: "Ravager",
    faction: "drukhari",
    category: "vehicle",
    points: 110,
    defaultWargear: [
      { id: "dark-lance", name: "Dark lance", image: "" },
      { id: "bladevanes", name: "Bladevanes", image: "" },
    ],
    wargear: [
      { id: "disintegrator-cannon", name: "Disintegrator cannon", image: "" },
    ],
    ledBy: [],
  },

  {
    id: "raven-strike-fighter",
    name: "Raven Strike Fighter",
    faction: "drukhari",
    category: "vehicle",
    points: 130,
    defaultWargear: [
      { id: "dark-lance", name: "Dark lance", image: "" },
      { id: "splinterstorm-cannon", name: "Splinterstorm cannon", image: "" },
      { id: "bladed-wings", name: "Bladed wings", image: "" },
    ],
    wargear: [],
    ledBy: [],
  },

  {
    id: "razorwing-jetfighter",
    name: "Razorwing Jetfighter",
    faction: "drukhari",
    category: "vehicle",
    points: 170,
    defaultWargear: [
      { id: "dark-lance", name: "Dark Lance", image: "" },
      { id: "razorwing-missiles-monoscythe-missiles", name: "Razorwing missiles – monoscythe missiles", image: "" },
      { id: "razorwing-missiles-nuerotoxin-missiles", name: "Razorwing missiles – nuerotoxin missiles", image: "" },
      { id: "razorwing-missiles-shatterfield-missiles", name: "Razorwing missiles – shatterfield missiles", image: "" },
      { id: "twin-splinter-rifle", name: "Twin splinter rifle", image: "" },
      { id: "bladed-wings", name: "Bladed wings", image: "" },
    ],
    wargear: [
      { id: "disintegrator", name: "Disintegrator", image: "" },
      { id: "splinter-cannon", name: "Splinter cannon", image: "" },
    ],
    ledBy: [],
  },

  {
    id: "reaper",
    name: "Reaper",
    faction: "drukhari",
    category: "vehicle",
    points: 95,
    defaultWargear: [
      { id: "storm-vortex-projector-beam", name: "Storm vortex projector – beam", image: "" },
      { id: "storm-vortex-projector-blast", name: "Storm vortex projector – blast", image: "" },
      { id: "bladevanes", name: "Bladevanes", image: "" },
      { id: "prow-blade", name: "Prow blade", image: "" },
    ],
    wargear: [],
    ledBy: [],
  },

  {
    id: "voidraven-bomber",
    name: "Voidraven Bomber",
    faction: "drukhari",
    category: "vehicle",
    points: 235,
    defaultWargear: [
      { id: "void-lance", name: "Void lance", image: "" },
      { id: "bladed-wings", name: "Bladed wings", image: "" },
    ],
    wargear: [
      { id: "dark-scythe", name: "Dark scythe", image: "" },
      { id: "voidraven-missiles-implosion-missiles", name: "Voidraven missiles – implosion missiles", image: "" },
      { id: "voidraven-missiles-shatterfield-missiles", name: "Voidraven missiles – shatterfield missiles", image: "" },
    ],
    ledBy: [],
  },

  {
    id: "voidweaver",
    name: "Voidweaver",
    faction: "drukhari",
    category: "vehicle",
    points: 125,
    defaultWargear: [
      { id: "shuriken-cannon", name: "Shuriken cannon", image: "" },
      { id: "voidweaver-haywire-cannon", name: "Voidweaver haywire cannon", image: "" },
      { id: "close-combat-weapon", name: "Close combat weapon", image: "" },
    ],
    wargear: [
      { id: "prismatic-cannon-dispersed-pulse", name: "Prismatic cannon – dispersed pulse", image: "" },
      { id: "prismatic-cannon-focused-lances", name: "Prismatic cannon – focused lances", image: "" },
    ],
    ledBy: [],
  },

  {
    id: "cronos",
    name: "Cronos",
    faction: "drukhari",
    category: "monster",
    points: 50,
    defaultWargear: [
      { id: "spirit-syphon", name: "Spirit syphon", image: "" },
      { id: "spirit-leech-tentacles", name: "Spirit-leech tentacles", image: "" },
    ],
    wargear: [
      { id: "spirit-vortex", name: "Spirit vortex", image: "" },
    ],
    ledBy: [],
  },

  {
    id: "talos",
    name: "Talos",
    faction: "drukhari",
    category: "monster",
    points: 80,
    defaultWargear: [
      { id: "twin-splinter-cannon", name: "Twin splinter cannon", image: "" },
      { id: "macro-scalpel", name: "Macro-scalpel", image: "" },
    ],
    wargear: [
      { id: "twin-drukhari-haywire-blaster", name: "Twin Drukhari haywire blaster", image: "" },
      { id: "twin-heat-lance", name: "Twin heat lance", image: "" },
      { id: "stinger-pod", name: "Stinger pod", image: "" },
      { id: "twin-liquifier-gun", name: "Twin liquifier gun", image: "" },
      { id: "chain-flails", name: "Chain-flails", image: "" },
      { id: "talos-gauntlet", name: "Talos gauntlet", image: "" },
      { id: "talos-ichor-injector", name: "Talos ichor injector", image: "" },
    ],
    ledBy: [],
  },

  {
    id: "raider",
    name: "Raider",
    faction: "drukhari",
    category: "transport",
    points: 80,
    defaultWargear: [
      { id: "dark-lance", name: "Dark lance", image: "" },
      { id: "bladevanes", name: "Bladevanes", image: "" },
    ],
    wargear: [
      { id: "disintegrator-cannon", name: "Disintegrator cannon", image: "" },
    ],
    ledBy: [],
  },

  {
    id: "starweaver",
    name: "Starweaver",
    faction: "drukhari",
    category: "transport",
    points: 80,
    defaultWargear: [
      { id: "shuriken-cannon", name: "Shuriken cannon", image: "" },
      { id: "close-combat-weapon", name: "Close combat weapon", image: "" },
    ],
    wargear: [],
    ledBy: [],
  },

  {
    id: "tantalus",
    name: "Tantalus",
    faction: "drukhari",
    category: "transport",
    points: 230,
    defaultWargear: [
      { id: "pulse-disintegrators", name: "Pulse disintegrators", image: "" },
      { id: "dire-scythe-blades", name: "Dire scythe blades", image: "" },
    ],
    wargear: [],
    ledBy: [],
  },

  {
    id: "venom",
    name: "Venom",
    faction: "drukhari",
    category: "transport",
    points: 70,
    defaultWargear: [
      { id: "splinter-cannon", name: "Splinter cannon", image: "" },
      { id: "twin-splinter-rifle", name: "Twin splinter rifle", image: "" },
      { id: "bladevanes", name: "Bladevanes", image: "" },
    ],
    wargear: [],
    ledBy: [],
  },

];
