import type { Unit } from "../../../types/warhammer";

export const aeldariUnits: Unit[] = [

  {
    id: "corsair-cloud-dancer-band",
    name: "Corsair Cloud Dancer Band",
    faction: "aeldari",
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
    id: "shining-spears",
    name: "Shining Spears",
    faction: "aeldari",
    category: "mounted",
    points: 120,
    defaultWargear: [
      { id: "laser-lance", name: "Laser lance", image: "" },
      { id: "twin-shuriken-catapult", name: "Twin shuriken catapult", image: "" },
    ],
    wargear: [
      { id: "star-lance", name: "Star lance", image: "" },
      { id: "paragon-sabre", name: "Paragon sabre", image: "" },
    ],
    ledBy: [],
  },

  {
    id: "shroud-runners",
    name: "Shroud Runners",
    faction: "aeldari",
    category: "mounted",
    points: 80,
    defaultWargear: [
      { id: "long-rifle", name: "Long rifle", image: "" },
      { id: "scatter-laser", name: "Scatter laser", image: "" },
      { id: "shuriken-pistol", name: "Shuriken pistol", image: "" },
      { id: "close-combat-weapon", name: "Close combat weapon", image: "" },
    ],
    wargear: [],
    ledBy: [],
  },

  {
    id: "skyweavers",
    name: "Skyweavers",
    faction: "aeldari",
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
    id: "warlock-skyrunners",
    name: "Warlock Skyrunners",
    faction: "aeldari",
    category: "mounted",
    points: 45,
    defaultWargear: [
      { id: "destructor", name: "Destructor", image: "" },
      { id: "shuriken-pistol", name: "Shuriken pistol", image: "" },
      { id: "twin-shuriken-catapult", name: "Twin shuriken catapult", image: "" },
      { id: "witchblade", name: "Witchblade", image: "" },
    ],
    wargear: [
      { id: "singing-spear", name: "Singing spear", image: "" },
    ],
    ledBy: [],
  },

  {
    id: "windriders",
    name: "Windriders",
    faction: "aeldari",
    category: "mounted",
    points: 80,
    defaultWargear: [
      { id: "twin-shuriken-catapult", name: "Twin shuriken catapult", image: "" },
      { id: "close-combat-weapon", name: "Close combat weapon", image: "" },
    ],
    wargear: [
      { id: "scatter-laser", name: "Scatter laser", image: "" },
      { id: "shuriken-cannon", name: "Shuriken cannon", image: "" },
    ],
    ledBy: ["farseer-skyrunner"],
  },

  {
    id: "ynnari-reavers",
    name: "Ynnari Reavers",
    faction: "aeldari",
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
    id: "corsair-voidreavers",
    name: "Corsair Voidreavers",
    faction: "aeldari",
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
    ledBy: ["the-visarch","yvraine"],
  },

  {
    id: "guardian-defenders",
    name: "Guardian Defenders",
    faction: "aeldari",
    category: "battleline",
    points: 100,
    defaultWargear: [
      { id: "shuriken-catapult", name: "Shuriken catapult", image: "" },
      { id: "close-combat-weapon", name: "Close combat weapon", image: "" },
    ],
    wargear: [
      { id: "bright-lance", name: "Bright lance", image: "" },
      { id: "missile-launcher-starshot", name: "Missile launcher – starshot", image: "" },
      { id: "missile-launcher-sunburst", name: "Missile launcher – sunburst", image: "" },
      { id: "scatter-laser", name: "Scatter laser", image: "" },
      { id: "starcannon", name: "Starcannon", image: "" },
    ],
    ledBy: ["autarch","eldrad-ulthran","farseer","the-visarch","warlock","yvraine"],
  },

  {
    id: "storm-guardians",
    name: "Storm Guardians",
    faction: "aeldari",
    category: "battleline",
    points: 100,
    defaultWargear: [
      { id: "shuriken-pistol", name: "Shuriken pistol", image: "" },
      { id: "close-combat-weapon", name: "Close combat weapon", image: "" },
    ],
    wargear: [
      { id: "flamer", name: "Flamer", image: "" },
      { id: "fusion-gun", name: "Fusion gun", image: "" },
      { id: "power-sword", name: "Power sword", image: "" },
    ],
    ledBy: ["autarch","eldrad-ulthran","farseer","the-visarch","warlock","yvraine"],
  },

  {
    id: "ynnari-kabalite-warriors",
    name: "Ynnari Kabalite Warriors",
    faction: "aeldari",
    category: "battleline",
    points: 110,
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
    ledBy: ["the-visarch","ynnari-archon","yvraine"],
  },

  {
    id: "ynnari-wyches",
    name: "Ynnari Wyches",
    faction: "aeldari",
    category: "battleline",
    points: 90,
    defaultWargear: [
      { id: "splinter-pistol", name: "Splinter pistol", image: "" },
      { id: "hekatarii-blade", name: "Hekatarii blade", image: "" },
    ],
    wargear: [
      { id: "blast-pistol", name: "Blast pistol", image: "" },
    ],
    ledBy: ["the-visarch","ynnari-succubus","yvraine"],
  },

  {
    id: "corsair-reaver-band",
    name: "Corsair Reaver Band",
    faction: "aeldari",
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
    faction: "aeldari",
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
    faction: "aeldari",
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
    ledBy: ["the-visarch","yvraine"],
  },

  {
    id: "d-cannon-platform",
    name: "D Cannon Platform",
    faction: "aeldari",
    category: "infantry",
    points: 125,
    defaultWargear: [
      { id: "d-cannon", name: "D-cannon", image: "" },
      { id: "shuriken-catapult", name: "Shuriken catapult", image: "" },
      { id: "close-combat-weapon", name: "Close combat weapon", image: "" },
    ],
    wargear: [],
    ledBy: [],
  },

  {
    id: "dark-reapers",
    name: "Dark Reapers",
    faction: "aeldari",
    category: "infantry",
    points: 90,
    defaultWargear: [
      { id: "reaper-launcher-starshot", name: "Reaper launcher – starshot", image: "" },
      { id: "reaper-launcher-starswarm", name: "Reaper launcher – starswarm", image: "" },
      { id: "close-combat-weapon", name: "Close combat weapon", image: "" },
    ],
    wargear: [
      { id: "missile-launcher-starshot", name: "Missile launcher – starshot", image: "" },
      { id: "missile-launcher-sunburst", name: "Missile launcher – sunburst", image: "" },
      { id: "shuriken-cannon", name: "Shuriken cannon", image: "" },
      { id: "tempest-launcher", name: "Tempest launcher", image: "" },
    ],
    ledBy: ["autarch","maugan-ra"],
  },

  {
    id: "dire-avengers",
    name: "Dire Avengers",
    faction: "aeldari",
    category: "infantry",
    points: 80,
    defaultWargear: [
      { id: "avenger-shuriken-catapult", name: "Avenger shuriken catapult", image: "" },
      { id: "close-combat-weapon", name: "Close combat weapon", image: "" },
    ],
    wargear: [
      { id: "diresword", name: "Diresword", image: "" },
      { id: "power-glaive", name: "Power glaive", image: "" },
    ],
    ledBy: ["asurmen","autarch"],
  },

  {
    id: "fire-dragons",
    name: "Fire Dragons",
    faction: "aeldari",
    category: "infantry",
    points: 110,
    defaultWargear: [
      { id: "dragon-fusion-gun", name: "Dragon fusion gun", image: "" },
      { id: "exarch-s-dragon-fusion-gun", name: "Exarch’s Dragon fusion gun", image: "" },
      { id: "close-combat-weapon", name: "Close combat weapon", image: "" },
    ],
    wargear: [
      { id: "dragon-fusion-pistol", name: "Dragon fusion pistol", image: "" },
      { id: "dragon-s-breath-flamer", name: "Dragon’s breath flamer", image: "" },
      { id: "firepike", name: "Firepike", image: "" },
      { id: "dragon-axe", name: "Dragon axe", image: "" },
    ],
    ledBy: ["autarch","fuegan"],
  },

  {
    id: "howling-banshees",
    name: "Howling Banshees",
    faction: "aeldari",
    category: "infantry",
    points: 90,
    defaultWargear: [
      { id: "shuriken-pistol", name: "Shuriken pistol", image: "" },
      { id: "banshee-blade", name: "Banshee blade", image: "" },
    ],
    wargear: [
      { id: "triskele", name: "Triskele", image: "" },
      { id: "executioner", name: "Executioner", image: "" },
    ],
    ledBy: ["autarch","jain-zar"],
  },

  {
    id: "rangers",
    name: "Rangers",
    faction: "aeldari",
    category: "infantry",
    points: 55,
    defaultWargear: [
      { id: "long-rifle", name: "Long rifle", image: "" },
      { id: "shuriken-pistol", name: "Shuriken pistol", image: "" },
      { id: "close-combat-weapon", name: "Close combat weapon", image: "" },
    ],
    wargear: [],
    ledBy: [],
  },

  {
    id: "shadow-spectres",
    name: "Shadow Spectres",
    faction: "aeldari",
    category: "infantry",
    points: 115,
    defaultWargear: [
      { id: "prism-rifle-dispersed", name: "Prism rifle – dispersed", image: "" },
      { id: "prism-rifle-focused", name: "Prism rifle – focused", image: "" },
      { id: "close-combat-weapon", name: "Close combat weapon", image: "" },
    ],
    wargear: [],
    ledBy: [],
  },

  {
    id: "shadow-weaver-platform",
    name: "Shadow Weaver Platform",
    faction: "aeldari",
    category: "infantry",
    points: 75,
    defaultWargear: [
      { id: "shadow-weaver", name: "Shadow weaver", image: "" },
      { id: "shuriken-catapult", name: "Shuriken catapult", image: "" },
      { id: "close-combat-weapon", name: "Close combat weapon", image: "" },
    ],
    wargear: [],
    ledBy: [],
  },

  {
    id: "striking-scorpions",
    name: "Striking Scorpions",
    faction: "aeldari",
    category: "infantry",
    points: 85,
    defaultWargear: [
      { id: "shuriken-pistol", name: "Shuriken pistol", image: "" },
      { id: "scorpion-chainsword", name: "Scorpion chainsword", image: "" },
      { id: "scorpion-s-claw", name: "Scorpion’s claw", image: "" },
    ],
    wargear: [
      { id: "chainsabres", name: "Chainsabres", image: "" },
      { id: "biting-blade", name: "Biting blade", image: "" },
    ],
    ledBy: ["autarch"],
  },

  {
    id: "swooping-hawks",
    name: "Swooping Hawks",
    faction: "aeldari",
    category: "infantry",
    points: 85,
    defaultWargear: [
      { id: "hawk-s-talon", name: "Hawk’s talon", image: "" },
      { id: "close-combat-weapon", name: "Close combat weapon", image: "" },
    ],
    wargear: [
      { id: "exarch-s-lasblaster", name: "Exarch’s lasblaster", image: "" },
      { id: "lasblaster", name: "Lasblaster", image: "" },
      { id: "scatter-laser", name: "Scatter laser", image: "" },
      { id: "sunpistol", name: "Sunpistol", image: "" },
      { id: "power-sword", name: "Power sword", image: "" },
    ],
    ledBy: ["autarch-wayleaper","baharroth"],
  },

  {
    id: "troupe",
    name: "Troupe",
    faction: "aeldari",
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
    ledBy: ["shadowseer","troupe-master"],
  },

  {
    id: "vibro-cannon-platform",
    name: "Vibro Cannon Platform",
    faction: "aeldari",
    category: "infantry",
    points: 60,
    defaultWargear: [
      { id: "shuriken-catapult", name: "Shuriken catapult", image: "" },
      { id: "vibro-cannon", name: "Vibro cannon", image: "" },
      { id: "close-combat-weapon", name: "Close combat weapon", image: "" },
    ],
    wargear: [],
    ledBy: [],
  },

  {
    id: "warlock-conclave",
    name: "Warlock Conclave",
    faction: "aeldari",
    category: "infantry",
    points: 55,
    defaultWargear: [
      { id: "destructor", name: "Destructor", image: "" },
      { id: "shuriken-pistol", name: "Shuriken pistol", image: "" },
      { id: "witchblade", name: "Witchblade", image: "" },
    ],
    wargear: [
      { id: "singing-spear", name: "Singing spear", image: "" },
    ],
    ledBy: ["eldrad-ulthran","farseer"],
  },

  {
    id: "warp-spiders",
    name: "Warp Spiders",
    faction: "aeldari",
    category: "infantry",
    points: 95,
    defaultWargear: [
      { id: "death-spinner", name: "Death spinner", image: "" },
      { id: "exarch-s-death-spinner", name: "Exarch’s death spinner", image: "" },
      { id: "close-combat-weapon", name: "Close combat weapon", image: "" },
    ],
    wargear: [
      { id: "death-weavers", name: "Death weavers", image: "" },
      { id: "spinneret-rifle", name: "Spinneret rifle", image: "" },
      { id: "powerblade-array", name: "Powerblade array", image: "" },
      { id: "powerblades", name: "Powerblades", image: "" },
    ],
    ledBy: ["autarch-wayleaper","lhykhis"],
  },

  {
    id: "webway-gate",
    name: "Webway Gate",
    faction: "aeldari",
    category: "infantry",
    points: 105,
    defaultWargear: [],
    wargear: [],
    ledBy: [],
  },

  {
    id: "wraithblades",
    name: "Wraithblades",
    faction: "aeldari",
    category: "infantry",
    points: 170,
    defaultWargear: [
      { id: "ghostswords", name: "Ghostswords", image: "" },
    ],
    wargear: [
      { id: "ghostaxe", name: "Ghostaxe", image: "" },
    ],
    ledBy: [],
  },

  {
    id: "wraithguard",
    name: "Wraithguard",
    faction: "aeldari",
    category: "infantry",
    points: 170,
    defaultWargear: [
      { id: "wraithcannon", name: "Wraithcannon", image: "" },
      { id: "close-combat-weapon", name: "Close combat weapon", image: "" },
    ],
    wargear: [
      { id: "d-scythe", name: "D-scythe", image: "" },
    ],
    ledBy: [],
  },

  {
    id: "ynnari-incubi",
    name: "Ynnari Incubi",
    faction: "aeldari",
    category: "infantry",
    points: 75,
    defaultWargear: [
      { id: "demiklaives-single-blade", name: "Demiklaives – single blade", image: "" },
      { id: "demiklaives-dual-blades", name: "Demiklaives – dual blades", image: "" },
      { id: "klaive", name: "Klaive", image: "" },
    ],
    wargear: [],
    ledBy: ["the-visarch","ynnari-archon","yvraine"],
  },

  {
    id: "cobra",
    name: "Cobra",
    faction: "aeldari",
    category: "vehicle",
    points: 415,
    defaultWargear: [
      { id: "d-impaler", name: "D-impaler", image: "" },
      { id: "shuriken-cannon", name: "Shuriken cannon", image: "" },
      { id: "wraithbone-hull", name: "Wraithbone hull", image: "" },
    ],
    wargear: [
      { id: "aeldari-missile-launcher-sunburst", name: "Aeldari missile launcher – sunburst", image: "" },
      { id: "aeldari-missile-launcher-starshot", name: "Aeldari missile launcher – starshot", image: "" },
      { id: "bright-lance", name: "Bright lance", image: "" },
      { id: "scatter-laser", name: "Scatter laser", image: "" },
      { id: "starcannon", name: "Starcannon", image: "" },
    ],
    ledBy: [],
  },

  {
    id: "crimson-hunter",
    name: "Crimson Hunter",
    faction: "aeldari",
    category: "vehicle",
    points: 160,
    defaultWargear: [
      { id: "pulse-laser", name: "Pulse laser", image: "" },
      { id: "starcannon", name: "Starcannon", image: "" },
      { id: "wraithbone-hull", name: "Wraithbone hull", image: "" },
    ],
    wargear: [
      { id: "bright-lance", name: "Bright lance", image: "" },
    ],
    ledBy: [],
  },

  {
    id: "fire-prism",
    name: "Fire Prism",
    faction: "aeldari",
    category: "vehicle",
    points: 160,
    defaultWargear: [
      { id: "prism-cannon-dispersed-pulse", name: "Prism cannon – dispersed pulse", image: "" },
      { id: "prism-cannon-focused-lances", name: "Prism cannon – focused lances", image: "" },
      { id: "twin-shuriken-catapult", name: "Twin shuriken catapult", image: "" },
      { id: "wraithbone-hull", name: "Wraithbone hull", image: "" },
    ],
    wargear: [
      { id: "shuriken-cannon", name: "Shuriken cannon", image: "" },
    ],
    ledBy: [],
  },

  {
    id: "firestorm",
    name: "Firestorm",
    faction: "aeldari",
    category: "vehicle",
    points: 115,
    defaultWargear: [
      { id: "firestorm-scatter-laser", name: "Firestorm scatter laser", image: "" },
      { id: "twin-shuriken-catapult", name: "Twin shuriken catapult", image: "" },
      { id: "wraithbone-hull", name: "Wraithbone hull", image: "" },
    ],
    wargear: [
      { id: "shuriken-cannon", name: "Shuriken cannon", image: "" },
    ],
    ledBy: [],
  },

  {
    id: "hemlock-wraithfighter",
    name: "Hemlock Wraithfighter",
    faction: "aeldari",
    category: "vehicle",
    points: 155,
    defaultWargear: [
      { id: "heavy-d-scythe", name: "Heavy D-scythe", image: "" },
      { id: "wraithbone-hull", name: "Wraithbone hull", image: "" },
    ],
    wargear: [],
    ledBy: [],
  },

  {
    id: "hornet",
    name: "Hornet",
    faction: "aeldari",
    category: "vehicle",
    points: 100,
    defaultWargear: [
      { id: "hornet-pulse-laser", name: "Hornet pulse laser", image: "" },
      { id: "wraithbone-hull", name: "Wraithbone hull", image: "" },
    ],
    wargear: [
      { id: "aeldari-missile-launcher-starshot", name: "Aeldari missile launcher – starshot", image: "" },
      { id: "aeldari-missile-launcher-sunburst", name: "Aeldari missile launcher – sunburst", image: "" },
      { id: "bright-lance", name: "Bright lance", image: "" },
      { id: "scatter-laser", name: "Scatter laser", image: "" },
      { id: "shuriken-cannon", name: "Shuriken cannon", image: "" },
      { id: "starcannon", name: "Starcannon", image: "" },
    ],
    ledBy: [],
  },

  {
    id: "lynx",
    name: "Lynx",
    faction: "aeldari",
    category: "vehicle",
    points: 180,
    defaultWargear: [
      { id: "lynx-pulsar", name: "Lynx pulsar", image: "" },
      { id: "shuriken-cannon", name: "Shuriken cannon", image: "" },
      { id: "wraithbone-hull", name: "Wraithbone hull", image: "" },
    ],
    wargear: [
      { id: "aeldari-missile-launcher-sunburst", name: "Aeldari missile launcher – sunburst", image: "" },
      { id: "aeldari-missile-launcher-starshot", name: "Aeldari missile launcher – starshot", image: "" },
      { id: "bright-lance", name: "Bright lance", image: "" },
      { id: "scatter-laser", name: "Scatter laser", image: "" },
      { id: "starcannon", name: "Starcannon", image: "" },
    ],
    ledBy: [],
  },

  {
    id: "night-spinner",
    name: "Night Spinner",
    faction: "aeldari",
    category: "vehicle",
    points: 190,
    defaultWargear: [
      { id: "doomweaver", name: "Doomweaver", image: "" },
      { id: "twin-shuriken-catapult", name: "Twin shuriken catapult", image: "" },
      { id: "wraithbone-hull", name: "Wraithbone hull", image: "" },
    ],
    wargear: [
      { id: "shuriken-cannon", name: "Shuriken cannon", image: "" },
    ],
    ledBy: [],
  },

  {
    id: "nightwing",
    name: "Nightwing",
    faction: "aeldari",
    category: "vehicle",
    points: 150,
    defaultWargear: [
      { id: "twin-bright-lance", name: "Twin bright lance", image: "" },
      { id: "twin-shuriken-cannon", name: "Twin shuriken cannon", image: "" },
      { id: "wraithbone-hull", name: "Wraithbone hull", image: "" },
    ],
    wargear: [],
    ledBy: [],
  },

  {
    id: "phoenix",
    name: "Phoenix",
    faction: "aeldari",
    category: "vehicle",
    points: 175,
    defaultWargear: [
      { id: "phoenix-missile-array", name: "Phoenix missile array", image: "" },
      { id: "phoenix-pulse-laser", name: "Phoenix pulse laser", image: "" },
      { id: "twin-shuriken-cannon", name: "Twin shuriken cannon", image: "" },
      { id: "wraithbone-hull", name: "Wraithbone hull", image: "" },
    ],
    wargear: [],
    ledBy: [],
  },

  {
    id: "scorpion",
    name: "Scorpion",
    faction: "aeldari",
    category: "vehicle",
    points: 410,
    defaultWargear: [
      { id: "shuriken-cannon", name: "Shuriken cannon", image: "" },
      { id: "twin-scorpion-pulsar", name: "Twin Scorpion pulsar", image: "" },
      { id: "wraithbone-hull", name: "Wraithbone hull", image: "" },
    ],
    wargear: [
      { id: "aeldari-missile-launcher-sunburst", name: "Aeldari missile launcher – sunburst", image: "" },
      { id: "aeldari-missile-launcher-starshot", name: "Aeldari missile launcher – starshot", image: "" },
      { id: "bright-lance", name: "Bright lance", image: "" },
      { id: "scatter-laser", name: "Scatter laser", image: "" },
      { id: "starcannon", name: "Starcannon", image: "" },
    ],
    ledBy: [],
  },

  {
    id: "vampire-hunter",
    name: "Vampire Hunter",
    faction: "aeldari",
    category: "vehicle",
    points: 460,
    defaultWargear: [
      { id: "scatter-laser", name: "Scatter laser", image: "" },
      { id: "twin-pulse-laser", name: "Twin pulse laser", image: "" },
      { id: "twin-vampire-pulsar", name: "Twin Vampire pulsar", image: "" },
      { id: "wraithbone-hull", name: "Wraithbone hull", image: "" },
    ],
    wargear: [],
    ledBy: [],
  },

  {
    id: "voidweaver",
    name: "Voidweaver",
    faction: "aeldari",
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
    id: "vypers",
    name: "Vypers",
    faction: "aeldari",
    category: "vehicle",
    points: 65,
    defaultWargear: [
      { id: "shuriken-cannon", name: "Shuriken cannon", image: "" },
      { id: "twin-shuriken-catapult", name: "Twin shuriken catapult", image: "" },
      { id: "wraithbone-hull", name: "Wraithbone hull", image: "" },
    ],
    wargear: [
      { id: "bright-lance", name: "Bright lance", image: "" },
      { id: "missile-launcher-starshot", name: "Missile launcher – starshot", image: "" },
      { id: "missile-launcher-sunburst", name: "Missile launcher – sunburst", image: "" },
      { id: "scatter-laser", name: "Scatter laser", image: "" },
      { id: "starcannon", name: "Starcannon", image: "" },
    ],
    ledBy: [],
  },

  {
    id: "war-walkers",
    name: "War Walkers",
    faction: "aeldari",
    category: "vehicle",
    points: 95,
    defaultWargear: [
      { id: "shuriken-cannon", name: "Shuriken cannon", image: "" },
      { id: "war-walker-feet", name: "War Walker feet", image: "" },
    ],
    wargear: [
      { id: "bright-lance", name: "Bright lance", image: "" },
      { id: "missile-launcher-starshot", name: "Missile launcher – starshot", image: "" },
      { id: "missile-launcher-sunburst", name: "Missile launcher – sunburst", image: "" },
      { id: "scatter-laser", name: "Scatter laser", image: "" },
      { id: "starcannon", name: "Starcannon", image: "" },
    ],
    ledBy: [],
  },

  {
    id: "warp-hunter",
    name: "Warp Hunter",
    faction: "aeldari",
    category: "vehicle",
    points: 145,
    defaultWargear: [
      { id: "d-flail-blast", name: "D-flail – blast", image: "" },
      { id: "d-flail-rift", name: "D-flail – rift", image: "" },
      { id: "twin-shuriken-catapult", name: "Twin shuriken catapult", image: "" },
      { id: "wraithbone-hull", name: "Wraithbone hull", image: "" },
    ],
    wargear: [
      { id: "shuriken-cannon", name: "Shuriken cannon", image: "" },
    ],
    ledBy: [],
  },

  {
    id: "wasp-assault-walker",
    name: "Wasp Assault Walker",
    faction: "aeldari",
    category: "vehicle",
    points: 95,
    defaultWargear: [
      { id: "scatter-laser", name: "Scatter laser", image: "" },
      { id: "shuriken-cannon", name: "Shuriken cannon", image: "" },
      { id: "wasp-feet", name: "Wasp feet", image: "" },
    ],
    wargear: [
      { id: "aeldari-missile-launcher-starshot", name: "Aeldari missile launcher – starshot", image: "" },
      { id: "aeldari-missile-launcher-sunburst", name: "Aeldari missile launcher – sunburst", image: "" },
      { id: "bright-lance", name: "Bright lance", image: "" },
      { id: "starcannon", name: "Starcannon", image: "" },
    ],
    ledBy: [],
  },

  {
    id: "phantom-titan",
    name: "Phantom Titan",
    faction: "aeldari",
    category: "monster",
    points: 2100,
    defaultWargear: [
      { id: "d-bombard", name: "D-bombard", image: "" },
      { id: "phantom-pulsar", name: "Phantom pulsar", image: "" },
      { id: "phantom-starcannon", name: "Phantom starcannon", image: "" },
      { id: "voidstorm-missile-launcher", name: "Voidstorm missile launcher", image: "" },
      { id: "phantom-feet", name: "Phantom feet", image: "" },
    ],
    wargear: [
      { id: "pulse-laser", name: "Pulse laser", image: "" },
    ],
    ledBy: [],
  },

  {
    id: "revenant-titan",
    name: "Revenant Titan",
    faction: "aeldari",
    category: "monster",
    points: 1100,
    defaultWargear: [
      { id: "cloudburst-missile-launcher", name: "Cloudburst missile launcher", image: "" },
      { id: "revenant-pulsar", name: "Revenant pulsar", image: "" },
      { id: "sonic-lance", name: "Sonic lance", image: "" },
      { id: "revenant-feet", name: "Revenant feet", image: "" },
    ],
    wargear: [],
    ledBy: [],
  },

  {
    id: "skathach-wraithknight",
    name: "Skathach Wraithknight",
    faction: "aeldari",
    category: "monster",
    points: 490,
    defaultWargear: [
      { id: "inferno-lance", name: "Inferno lance", image: "" },
      { id: "titanic-feet", name: "Titanic feet", image: "" },
    ],
    wargear: [
      { id: "deathshroud-cannon-dispersed", name: "Deathshroud cannon – dispersed", image: "" },
      { id: "deathshroud-cannon-focused", name: "Deathshroud cannon – focused", image: "" },
      { id: "scatter-laser", name: "Scatter laser", image: "" },
      { id: "shuriken-cannon", name: "Shuriken cannon", image: "" },
      { id: "starcannon", name: "Starcannon", image: "" },
    ],
    ledBy: [],
  },

  {
    id: "wraithknight",
    name: "Wraithknight",
    faction: "aeldari",
    category: "monster",
    points: 435,
    defaultWargear: [
      { id: "suncannon", name: "Suncannon", image: "" },
      { id: "titanic-feet", name: "Titanic feet", image: "" },
    ],
    wargear: [
      { id: "scatter-laser", name: "Scatter laser", image: "" },
      { id: "shuriken-cannon", name: "Shuriken cannon", image: "" },
      { id: "starcannon", name: "Starcannon", image: "" },
    ],
    ledBy: [],
  },

  {
    id: "wraithknight-with-ghostglaive",
    name: "Wraithknight With Ghostglaive",
    faction: "aeldari",
    category: "monster",
    points: 420,
    defaultWargear: [
      { id: "titanic-ghostglaive-strike", name: "Titanic ghostglaive – strike", image: "" },
      { id: "titanic-ghostglaive-sweep", name: "Titanic ghostglaive – sweep", image: "" },
    ],
    wargear: [
      { id: "scatter-laser", name: "Scatter laser", image: "" },
      { id: "shuriken-cannon", name: "Shuriken cannon", image: "" },
      { id: "starcannon", name: "Starcannon", image: "" },
    ],
    ledBy: [],
  },

  {
    id: "wraithlord",
    name: "Wraithlord",
    faction: "aeldari",
    category: "monster",
    points: 140,
    defaultWargear: [
      { id: "shuriken-catapult", name: "Shuriken catapult", image: "" },
      { id: "wraithbone-fists", name: "Wraithbone fists", image: "" },
    ],
    wargear: [
      { id: "bright-lance", name: "Bright lance", image: "" },
      { id: "missile-launcher-starshot", name: "Missile launcher – starshot", image: "" },
      { id: "missile-launcher-sunburst", name: "Missile launcher – sunburst", image: "" },
      { id: "scatter-laser", name: "Scatter laser", image: "" },
      { id: "shuriken-cannon", name: "Shuriken cannon", image: "" },
      { id: "starcannon", name: "Starcannon", image: "" },
    ],
    ledBy: [],
  },

  {
    id: "wraithseer",
    name: "Wraithseer",
    faction: "aeldari",
    category: "monster",
    points: 160,
    defaultWargear: [
      { id: "destructor", name: "Destructor", image: "" },
      { id: "ghostspear-sweep", name: "Ghostspear – sweep", image: "" },
      { id: "ghostspear-strike", name: "Ghostspear – strike", image: "" },
    ],
    wargear: [
      { id: "aeldari-missile-launcher-sunburst", name: "Aeldari missile launcher – sunburst", image: "" },
      { id: "aeldari-missile-launcher-starshot", name: "Aeldari missile launcher – starshot", image: "" },
      { id: "bright-lance", name: "Bright lance", image: "" },
      { id: "scatter-laser", name: "Scatter laser", image: "" },
      { id: "shuriken-cannon", name: "Shuriken cannon", image: "" },
      { id: "starcannon", name: "Starcannon", image: "" },
      { id: "wraithseer-d-cannon", name: "Wraithseer D-cannon", image: "" },
    ],
    ledBy: [],
  },

  {
    id: "falcon",
    name: "Falcon",
    faction: "aeldari",
    category: "transport",
    points: 130,
    defaultWargear: [
      { id: "pulse-laser", name: "Pulse laser", image: "" },
      { id: "scatter-laser", name: "Scatter laser", image: "" },
      { id: "twin-shuriken-catapult", name: "Twin shuriken catapult", image: "" },
      { id: "wraithbone-hull", name: "Wraithbone hull", image: "" },
    ],
    wargear: [
      { id: "bright-lance", name: "Bright lance", image: "" },
      { id: "missile-launcher-starshot", name: "Missile launcher – starshot", image: "" },
      { id: "missile-launcher-sunburst", name: "Missile launcher – sunburst", image: "" },
      { id: "shuriken-cannon", name: "Shuriken cannon", image: "" },
      { id: "starcannon", name: "Starcannon", image: "" },
    ],
    ledBy: [],
  },

  {
    id: "starweaver",
    name: "Starweaver",
    faction: "aeldari",
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
    id: "vampire-raider",
    name: "Vampire Raider",
    faction: "aeldari",
    category: "transport",
    points: 430,
    defaultWargear: [
      { id: "scatter-laser", name: "Scatter laser", image: "" },
      { id: "twin-pulse-laser", name: "Twin pulse laser", image: "" },
      { id: "wraithbone-hull", name: "Wraithbone hull", image: "" },
    ],
    wargear: [],
    ledBy: [],
  },

  {
    id: "wave-serpent",
    name: "Wave Serpent",
    faction: "aeldari",
    category: "transport",
    points: 125,
    defaultWargear: [
      { id: "shuriken-cannon", name: "Shuriken cannon", image: "" },
      { id: "twin-shuriken-cannon", name: "Twin shuriken cannon", image: "" },
      { id: "twin-shuriken-catapult", name: "Twin shuriken catapult", image: "" },
      { id: "wraithbone-hull", name: "Wraithbone hull", image: "" },
    ],
    wargear: [
      { id: "twin-missile-launcher-starshot", name: "Twin missile launcher – starshot", image: "" },
      { id: "twin-missile-launcher-sunburst", name: "Twin missile launcher – sunburst", image: "" },
      { id: "twin-bright-lance", name: "Twin bright lance", image: "" },
      { id: "twin-scatter-laser", name: "Twin scatter laser", image: "" },
      { id: "twin-starcannon", name: "Twin starcannon", image: "" },
    ],
    ledBy: [],
  },

  {
    id: "ynnari-raider",
    name: "Ynnari Raider",
    faction: "aeldari",
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
    id: "ynnari-venom",
    name: "Ynnari Venom",
    faction: "aeldari",
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
