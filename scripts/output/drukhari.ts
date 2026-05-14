import type { Unit } from "../../src/types/warhammer";

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
    points: 115,
    modelCountOptions: [10],
    pointsByModelCount: { 10: 115 },
    defaultWargear: [
      { id: "kw-splinter-rifle", name: "Splinter rifle", image: "", profiles: [{ range: '24"', attacks: "2", skill: "3+", strength: "2", ap: "0", damage: "1", keywords: ["ANTI-INFANTRY 3+", "ASSAULT"] }] },
      { id: "kw-close-combat-weapon", name: "Close combat weapon", image: "", profiles: [{ range: "Melee", attacks: "2", skill: "3+", strength: "3", ap: "0", damage: "1" }] },
    ],
    wargear: [
      { id: "kw-blast-pistol", name: "Blast pistol", image: "", sergeantOnly: true, profiles: [{ range: '6"', attacks: "1", skill: "3+", strength: "8", ap: "-3", damage: "D3", keywords: ["PISTOL"] }] },
      { id: "kw-splinter-pistol", name: "Splinter pistol", image: "", sergeantOnly: true, profiles: [{ range: '12"', attacks: "1", skill: "3+", strength: "2", ap: "0", damage: "1", keywords: ["ANTI-INFANTRY 3+", "ASSAULT", "PISTOL"] }] },
      { id: "kw-power-weapon", name: "Power weapon", image: "", sergeantOnly: true, profiles: [{ range: "Melee", attacks: "3", skill: "3+", strength: "3", ap: "-2", damage: "1", keywords: ["ANTI-INFANTRY 3+"] }] },
      { id: "kw-blaster", name: "Blaster", image: "", countable: true, maxCountByModelCount: { 10: 10 }, profiles: [{ range: '18"', attacks: "1", skill: "3+", strength: "8", ap: "-4", damage: "D6+1", keywords: ["ASSAULT"] }] },
      { id: "kw-dark-lance", name: "Dark lance", image: "", countable: true, maxCountByModelCount: { 10: 10 }, profiles: [{ range: '36"', attacks: "1", skill: "4+", strength: "12", ap: "-3", damage: "D6+2", keywords: ["HEAVY"] }] },
      { id: "kw-shredder", name: "Shredder", image: "", countable: true, maxCountByModelCount: { 10: 10 }, profiles: [{ range: '18"', attacks: "D6", skill: "N/A", strength: "6", ap: "0", damage: "1", keywords: ["ASSAULT", "TORRENT"] }] },
      { id: "kw-splinter-cannon", name: "Splinter cannon", image: "", countable: true, maxCountByModelCount: { 10: 10 }, profiles: [{ range: '36"', attacks: "3", skill: "4+", strength: "3", ap: "-1", damage: "2", keywords: ["ANTI-INFANTRY 3+", "HEAVY", "SUSTAINED HITS 1"] }] },
      { id: "kw-kabalite-icon", name: "Kabalite Icon", image: "", note: "Kabalite Icon: While the bearer's unit is not Battle-shocked, add 1 to the bearer's Objective Control characteristic." },
      { id: "kw-phantasm-grenade-launcher", name: "Phantasm grenade launcher", image: "", note: "Phantasm Grenade Launcher: The bearer's unit has the SMOKE and GRENADES keywords." },
    ],
    wargearGroups: [
      ["kw-splinter-rifle", "kw-blast-pistol", "kw-splinter-pistol"],
      ["kw-close-combat-weapon", "kw-power-weapon"],
      ["kw-kabalite-icon", "kw-phantasm-grenade-launcher"],
    ],
    abilities: [
      {
        name: "Sadistic Raiders (Pain)",
        description: "In your Shooting phase or the Fight phase, when you select this unit to shoot or fight, you can spend 1 Pain token to Empower this unit. While Empowered, each time a model in this unit makes an attack, re-roll a Wound roll of 1. If the target is within range of an objective marker, you can re-roll the Wound roll instead.",
      },
      {
        name: "Cruel Enforcers",
        description: "At the end of your Command phase, if this unit is within range of an objective marker you control, that objective marker remains under your control until your opponent's Level of Control over that objective marker is greater than yours at the end of a phase.",
      },
    ],
    ledBy: ["archon"],
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
    id: "hand-of-the-archon",
    name: "Hand Of The Archon",
    faction: "drukhari",
    category: "infantry",
    points: 125,
    modelCountOptions: [10],
    pointsByModelCount: { 10: 125 },
    defaultWargear: [
      { id: "hota-splinter-rifle", name: "Splinter rifle", image: "", profiles: [{ range: '24"', attacks: "2", skill: "3+", strength: "2", ap: "0", damage: "1", keywords: ["ANTI-INFANTRY 3+", "ASSAULT"] }] },
      { id: "hota-close-combat-weapon", name: "Close combat weapon", image: "", profiles: [{ range: "Melee", attacks: "2", skill: "3+", strength: "3", ap: "0", damage: "1" }] },
    ],
    wargear: [
      { id: "hota-blast-pistol", name: "Blast pistol", image: "", sergeantOnly: true, profiles: [{ range: '6"', attacks: "1", skill: "3+", strength: "8", ap: "-3", damage: "D3", keywords: ["PISTOL"] }] },
      { id: "hota-splinter-pistol-sgt", name: "Splinter pistol", image: "", sergeantOnly: true, profiles: [{ range: '12"', attacks: "1", skill: "3+", strength: "2", ap: "0", damage: "1", keywords: ["ANTI-INFANTRY 3+", "ASSAULT", "PISTOL"] }] },
      { id: "hota-power-weapon", name: "Power weapon", image: "", sergeantOnly: true, profiles: [{ range: "Melee", attacks: "4", skill: "3+", strength: "3", ap: "-2", damage: "1", keywords: ["ANTI-INFANTRY 3+"] }] },
      { id: "hota-kabalite-icon", name: "Kabalite Icon", image: "", sergeantOnly: true, note: "Kabalite Icon: While the bearer's unit is not Battle-shocked, add 1 to the bearer's Objective Control characteristic." },
      { id: "hota-phantasm-grenade-launcher", name: "Phantasm grenade launcher", image: "", sergeantOnly: true, note: "Phantasm Grenade Launcher: The bearer's unit has the SMOKE keyword." },
      { id: "hota-blaster", name: "Blaster", image: "", countable: true, maxCountByModelCount: { 10: 1 }, profiles: [{ range: '18"', attacks: "1", skill: "3+", strength: "8", ap: "-4", damage: "D6+1", keywords: ["ASSAULT"] }] },
      { id: "hota-shredder", name: "Shredder", image: "", countable: true, maxCountByModelCount: { 10: 1 }, profiles: [{ range: '18"', attacks: "D6", skill: "N/A", strength: "6", ap: "0", damage: "1", keywords: ["ASSAULT", "TORRENT"] }] },
      { id: "hota-dark-lance", name: "Dark lance", image: "", countable: true, maxCountByModelCount: { 10: 1 }, profiles: [{ range: '36"', attacks: "1", skill: "4+", strength: "12", ap: "-3", damage: "D6+2", keywords: ["HEAVY"] }] },
      { id: "hota-splinter-cannon", name: "Splinter cannon", image: "", countable: true, maxCountByModelCount: { 10: 1 }, profiles: [{ range: '36"', attacks: "3", skill: "4+", strength: "3", ap: "-1", damage: "2", keywords: ["ANTI-INFANTRY 3+", "HEAVY", "SUSTAINED HITS 1"] }] },
      { id: "hota-stinger-pistol", name: "Stinger pistol", image: "", countable: true, maxCountByModelCount: { 10: 1 }, profiles: [{ range: '12"', attacks: "1", skill: "3+", strength: "2", ap: "0", damage: "1", keywords: ["ANTI-INFANTRY 2+", "PISTOL"] }] },
      { id: "hota-shardcarbine", name: "Shardcarbine", image: "", countable: true, maxCountByModelCount: { 10: 1 }, profiles: [{ range: '18"', attacks: "3", skill: "3+", strength: "2", ap: "0", damage: "1", keywords: ["ANTI-INFANTRY 3+", "ASSAULT"] }] },
      { id: "hota-pain-sculptors", name: "Pain sculptors", image: "", countable: true, maxCountByModelCount: { 10: 1 }, profiles: [{ range: "Melee", attacks: "3", skill: "3+", strength: "4", ap: "-1", damage: "1", keywords: ["ANTI-INFANTRY 4+", "TWIN-LINKED"] }] },
      { id: "hota-splinter-pistol-and-razorflail", name: "Splinter pistol & Razorflail", image: "", countable: true, maxCountByModelCount: { 10: 1 }, profiles: [
        { profileName: "Splinter pistol", range: '12"', attacks: "1", skill: "3+", strength: "2", ap: "0", damage: "1", keywords: ["ANTI-INFANTRY 3+", "ASSAULT", "PISTOL"] },
        { profileName: "Razorflail", range: "Melee", attacks: "4", skill: "3+", strength: "4", ap: "-2", damage: "1" },
      ]},
      { id: "hota-stimm-needler", name: "Stimm-needler", image: "", countable: true, maxCountByModelCount: { 10: 1 }, note: "Stimm-needler: Once per turn, the first time a saving throw is failed for a model in the bearer's unit, change the Damage characteristic of that attack to 0. This model's splinter rifle cannot be replaced." },
    ],
    wargearGroups: [
      ["hota-blast-pistol", "hota-splinter-pistol-sgt"],
      ["hota-kabalite-icon", "hota-phantasm-grenade-launcher"],
      ["hota-blaster", "hota-shredder"],
      ["hota-dark-lance", "hota-splinter-cannon"],
    ],
    abilities: [
      {
        name: "Assassins' Poisons (Pain)",
        description: "In your Shooting phase or the Fight phase, when you select this unit to shoot or fight, you can spend 1 Pain token to Empower this unit. While Empowered, weapons equipped by models in this unit (excluding blast pistols, blasters and dark lances) have the [LETHAL HITS] and [PRECISION] abilities.",
      },
      {
        name: "Archon's Will",
        description: "At the start of the first battle round, select one objective marker on the battlefield. Until the end of the battle, while this unit is within range of that objective marker, unless this unit is Battle-shocked, models in this unit have a 5+ invulnerable save and an Objective Control characteristic of 3.",
      },
    ],
    ledBy: ["archon"],
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
    points: 90,
    modelCountOptions: [5, 10],
    pointsByModelCount: { 5: 90, 10: 180 },
    defaultWargear: [
      { id: "incubi-klaive", name: "Klaive", image: "", profiles: [{ range: "Melee", attacks: "3", skill: "3+", strength: "5", ap: "-2", damage: "2" }] },
    ],
    wargear: [
      { id: "incubi-demiklaives", name: "Demiklaives", image: "", countable: true, maxCountByModelCount: { 5: 5, 10: 10 }, profiles: [
        { profileName: "single blade", range: "Melee", attacks: "4", skill: "3+", strength: "5", ap: "-2", damage: "2" },
        { profileName: "dual blades", range: "Melee", attacks: "6", skill: "3+", strength: "4", ap: "-2", damage: "1", keywords: ["TWIN-LINKED"] },
      ]},
    ],
    notes: [
      {
        id: "incubi-shrine",
        text: "Incubi Shrine",
        checkbox: true,
      },
    ],
    abilities: [
      {
        name: "Incubi Shrine Token",
        description: "Once per battle for each Incubi Shrine token this unit has, you can change the result of one Hit roll or one Wound roll made for a Klaivex or Incubi model in this unit to an unmodified 6.\n\nDesigner's Note: Place an Incubi Shrine token next to the unit for each Incubi Shrine token it has, removing one each time this ability is used.",
      },
      {
        name: "Decapitating Strikes (Pain)",
        description: "In the Fight phase, when you select this unit to fight, you can spend 1 Pain token to Empower this unit. While Empowered, each time a model in this unit makes a melee attack that targets an INFANTRY unit, that attack has the [DEVASTATING WOUNDS] ability.",
      },
      {
        name: "Tormentors",
        description: "At the start of the Fight phase, each enemy unit within Engagement Range of one or more units with this ability must take a Battle-shock test. Each time a model in this unit makes a melee attack that targets a Battle-shocked unit, add 1 to the Hit roll.",
      },
    ],
    ledBy: ["archon","drazhar"],
  },

  {
    id: "mandrakes",
    name: "Mandrakes",
    faction: "drukhari",
    category: "infantry",
    points: 75,
    modelCountOptions: [5, 10],
    pointsByModelCount: { 5: 75, 10: 150 },
    defaultWargear: [
      { id: "mandrakes-baleblast", name: "Baleblast", image: "", profiles: [{ range: '18"', attacks: "2", skill: "3+", strength: "5", ap: "-1", damage: "1", keywords: ["ASSAULT", "DEVASTATING WOUNDS", "IGNORES COVER"] }] },
      { id: "mandrakes-glimmersteel-blade", name: "Glimmersteel blade", image: "", profiles: [{ range: "Melee", attacks: "3", skill: "3+", strength: "5", ap: "-1", damage: "1", keywords: ["DEVASTATING WOUNDS"] }] },
    ],
    wargear: [],
    abilities: [
      {
        name: "Fade Away (Pain)",
        description: "At the end of your opponent's Fight phase, if this unit is not within Engagement Range of one or more enemy units, you can spend 1 Pain token to Empower this unit. Each time you do, remove this unit from the battlefield and place it into Strategic Reserves.",
      },
      {
        name: "Shade Weavers",
        description: "This unit cannot be targeted by ranged attacks unless the attacking model is within 18\".",
      },
    ],
    ledBy: [],
  },

  {
    id: "scourges",
    name: "Scourges",
    faction: "drukhari",
    category: "infantry",
    points: 130,
    modelCountOptions: [5],
    pointsByModelCount: { 5: 130 },
    defaultWargear: [
      { id: "scourge-shardcarbine", name: "Shardcarbine", image: "", profiles: [{ range: '18"', attacks: "3", skill: "3+", strength: "2", ap: "0", damage: "1", keywords: ["ANTI-INFANTRY 3+", "ASSAULT"] }] },
      { id: "scourge-close-combat-weapon", name: "Close combat weapon", image: "", profiles: [{ range: "Melee", attacks: "2", skill: "3+", strength: "3", ap: "0", damage: "1" }] },
    ],
    wargear: [
      { id: "scourge-blast-pistol", name: "Blast pistol", image: "", sergeantOnly: true, profiles: [{ range: '6"', attacks: "1", skill: "3+", strength: "8", ap: "-3", damage: "D3", keywords: ["PISTOL"] }] },
      { id: "scourge-splinter-pistol", name: "Splinter pistol", image: "", sergeantOnly: true, profiles: [{ range: '12"', attacks: "1", skill: "3+", strength: "2", ap: "0", damage: "1", keywords: ["ANTI-INFANTRY 3+", "ASSAULT", "PISTOL"] }] },
      { id: "scourge-power-weapon", name: "Power weapon", image: "", sergeantOnly: true, profiles: [{ range: "Melee", attacks: "3", skill: "3+", strength: "3", ap: "-2", damage: "1", keywords: ["ANTI-INFANTRY 3+"] }] },
      { id: "scourge-blaster", name: "Blaster", image: "", countable: true, maxCountByModelCount: { 5: 5 }, profiles: [{ range: '18"', attacks: "1", skill: "3+", strength: "8", ap: "-4", damage: "D6+1", keywords: ["ASSAULT"] }] },
      { id: "scourge-dark-lance", name: "Dark lance", image: "", countable: true, maxCountByModelCount: { 5: 5 }, profiles: [{ range: '36"', attacks: "1", skill: "4+", strength: "12", ap: "-3", damage: "D6+2", keywords: ["HEAVY"] }] },
      { id: "scourge-haywire-blaster", name: "Haywire blaster", image: "", countable: true, maxCountByModelCount: { 5: 5 }, profiles: [{ range: '24"', attacks: "2", skill: "4+", strength: "3", ap: "-1", damage: "3", keywords: ["ANTI-VEHICLE 4+", "DEVASTATING WOUNDS", "HEAVY"] }] },
      { id: "scourge-heat-lance", name: "Heat lance", image: "", countable: true, maxCountByModelCount: { 5: 5 }, profiles: [{ range: '18"', attacks: "1", skill: "4+", strength: "14", ap: "-4", damage: "D6", keywords: ["ASSAULT", "HEAVY", "MELTA 3"] }] },
      { id: "scourge-shredder", name: "Shredder", image: "", countable: true, maxCountByModelCount: { 5: 5 }, profiles: [{ range: '18"', attacks: "D6", skill: "N/A", strength: "6", ap: "0", damage: "1", keywords: ["ASSAULT", "TORRENT"] }] },
      { id: "scourge-splinter-cannon", name: "Splinter cannon", image: "", profiles: [{ range: '36"', attacks: "3", skill: "4+", strength: "3", ap: "-1", damage: "2", keywords: ["ANTI-INFANTRY 3+", "HEAVY", "SUSTAINED HITS 1"] }] },
    ],
    wargearGroups: [
      ["scourge-blast-pistol", "scourge-splinter-pistol"],
    ],
    abilities: [
      {
        name: "Winged Strike (Pain)",
        description: "In your Shooting phase, when you select this unit to shoot, you can spend 1 Pain token to Empower this unit. While Empowered, each time a model in this unit makes a ranged attack, you can re-roll the Hit roll.",
      },
      {
        name: "Airborne Evasion",
        description: "In your Shooting phase, after this unit has shot, if it is not within Engagement Range of one or more enemy units, it can make a Normal move of up to 6\". If it does, until the end of the turn, this unit is not eligible to declare a charge.",
      },
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
      { id: "harlequin-s-blade", name: "Harlequin's blade", image: "" },
    ],
    wargear: [
      { id: "fusion-pistol", name: "Fusion pistol", image: "" },
      { id: "neuro-disruptor", name: "Neuro disruptor", image: "" },
      { id: "harlequin-s-special-weapon", name: "Harlequin's special weapon", image: "" },
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
    modelCountOptions: [1],
    pointsByModelCount: { 1: 110 },
    defaultWargear: [
      { id: "ravager-bladevanes", name: "Bladevanes", image: "", profiles: [{ range: "Melee", attacks: "3", skill: "4+", strength: "6", ap: "-1", damage: "1" }] },
    ],
    wargear: [
      { id: "ravager-dark-lance", name: "Dark lance", image: "", profiles: [{ range: '36"', attacks: "1", skill: "3+", strength: "12", ap: "-3", damage: "D6+2" }] },
      { id: "ravager-disintegrator-cannon", name: "Disintegrator cannon", image: "", profiles: [{ range: '36"', attacks: "3", skill: "3+", strength: "6", ap: "-3", damage: "2" }] },
    ],
    wargearGroups: [
      ["ravager-dark-lance", "ravager-disintegrator-cannon"],
    ],
    defaultSelectedWargear: ["ravager-dark-lance"],
    abilities: [
      {
        name: "Agonising Suppression (Pain)",
        description: "In your Shooting phase, when you select this model to shoot, you can spend 1 Pain token to Empower this model. While Empowered, after this model has shot, select one enemy unit hit by one or more of those attacks. Until the start of your next turn, that enemy unit is suppressed. While a unit is suppressed, each time a model in that unit makes an attack, subtract 1 from the Hit roll.",
      },
      {
        name: "Eradicate the Foe",
        description: "Each time this model makes an attack that targets an enemy unit that is at its Starting Strength, you can re-roll the Hit roll.",
      },
      {
        name: "Damaged: 1-4 Wounds Remaining",
        description: "While this model has 1-4 wounds remaining, each time it makes an attack, subtract 1 from the Hit roll.",
      },
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
      { id: "razorwing-missiles", name: "Razorwing missiles", image: "", profiles: [
        { profileName: "► Razorwing missiles – monoscythe missiles", range: '48"', attacks: "D6", skill: "3+", strength: "6", ap: "-1", damage: "2", keywords: ["BLAST"] },
        { profileName: "► Razorwing missiles – neurotoxin missiles", range: '48"', attacks: "D6+3", skill: "3+", strength: "2", ap: "0", damage: "1", keywords: ["ANTI-INFANTRY 2+", "BLAST"] },
        { profileName: "► Razorwing missiles – shatterfield missiles", range: '48"', attacks: "D6", skill: "3+", strength: "7", ap: "-2", damage: "1", keywords: ["BLAST"] },
      ]},
      { id: "razorwing-bladed-wings", name: "Bladed wings", image: "", profiles: [{ range: "Melee", attacks: "3", skill: "4+", strength: "6", ap: "-1", damage: "1" }] },
    ],
    wargear: [
      { id: "razorwing-dark-lance", name: "Dark Lance", image: "", profiles: [{ range: '36"', attacks: "1", skill: "3+", strength: "12", ap: "-3", damage: "D6+2" }] },
      { id: "razorwing-disintegrator-cannon", name: "Disintegrator cannon", image: "", profiles: [{ range: '36"', attacks: "3", skill: "3+", strength: "6", ap: "-3", damage: "2" }] },
      { id: "razorwing-twin-splinter-rifle", name: "Twin splinter rifle", image: "", profiles: [{ range: '24"', attacks: "2", skill: "3+", strength: "2", ap: "0", damage: "1", keywords: ["ANTI-INFANTRY 3+", "ASSAULT", "RAPID FIRE 2", "TWIN-LINKED"] }] },
      { id: "razorwing-splinter-cannon", name: "Splinter cannon", image: "", profiles: [{ range: '36"', attacks: "3", skill: "3+", strength: "3", ap: "-1", damage: "2", keywords: ["ANTI-INFANTRY 3+", "SUSTAINED HITS 1"] }] },
    ],
    wargearGroups: [
      ["razorwing-dark-lance", "razorwing-disintegrator-cannon"],
      ["razorwing-twin-splinter-rifle", "razorwing-splinter-cannon"],
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
    modelCountOptions: [1, 2],
    pointsByModelCount: { 1: 55, 2: 110 },
    defaultWargear: [
      { id: "cronos-spirit-syphon", name: "Spirit syphon", image: "", profiles: [{ range: '12"', attacks: "D6", skill: "N/A", strength: "5", ap: "-1", damage: "1", keywords: ["IGNORES COVER", "TORRENT"] }] },
      { id: "cronos-spirit-leech-tentacles", name: "Spirit-leech tentacles", image: "", profiles: [{ range: "Melee", attacks: "6", skill: "3+", strength: "5", ap: "-1", damage: "1", keywords: ["ANTI-INFANTRY 2+"] }] },
    ],
    wargear: [
      { id: "cronos-spirit-vortex", name: "Spirit vortex", image: "", countable: true, maxCountByModelCount: { 1: 1, 2: 2 }, profiles: [{ range: '18"', attacks: "D6", skill: "3+", strength: "5", ap: "-1", damage: "1", keywords: ["BLAST", "IGNORES COVER"] }] },
    ],
    ledBy: [],
  },

  {
    id: "talos",
    name: "Talos",
    faction: "drukhari",
    category: "monster",
    modelCountOptions: [1, 2],
    pointsByModelCount: { 1: 80, 2: 160 },
    wargear: [
      // Group 1 – ranged (pick 1 of 4)
      { id: "talos-twin-splinter-cannon", name: "Twin splinter cannon", image: "", profiles: [{ range: '36"', attacks: "3", skill: "3+", strength: "3", ap: "-1", damage: "2", keywords: ["ANTI-INFANTRY 3+", "SUSTAINED HITS 1", "TWIN-LINKED"] }] },
      { id: "talos-stinger-pod", name: "Stinger pod", image: "", profiles: [{ range: '24"', attacks: "2D6", skill: "3+", strength: "5", ap: "0", damage: "1" }] },
      { id: "talos-twin-haywire-blaster", name: "Twin haywire blaster", image: "", profiles: [{ range: '24"', attacks: "2", skill: "3+", strength: "3", ap: "-1", damage: "3", keywords: ["ANTI-VEHICLE 4+", "DEVASTATING WOUNDS", "TWIN-LINKED"] }] },
      { id: "talos-twin-heat-lance", name: "Twin heat lance", image: "", profiles: [{ range: '18"', attacks: "1", skill: "3+", strength: "14", ap: "-4", damage: "D6", keywords: ["ASSAULT", "MELTA 3", "TWIN-LINKED"] }] },
      // Group 2 – arm 1 (pick 1 of 3)
      { id: "talos-macro-scalpel-1", name: "Macro-scalpel", image: "", profiles: [{ range: "Melee", attacks: "5", skill: "3+", strength: "7", ap: "-2", damage: "2" }] },
      { id: "talos-ichor-injector", name: "Talos ichor injector", image: "", profiles: [{ range: "Melee", attacks: "1", skill: "2+", strength: "8", ap: "-2", damage: "D6", keywords: ["EXTRA ATTACKS"] }] },
      { id: "talos-twin-liquifier-gun", name: "Twin liquifier gun", image: "", profiles: [{ range: '12"', attacks: "D6", skill: "N/A", strength: "4", ap: "-1", damage: "1", keywords: ["ANTI-INFANTRY 3+", "TORRENT", "TWIN-LINKED"] }] },
      // Group 3 – arm 2 (pick 1 of 3)
      { id: "talos-macro-scalpel-2", name: "Macro-scalpel", image: "", profiles: [{ range: "Melee", attacks: "5", skill: "3+", strength: "7", ap: "-2", damage: "2" }] },
      { id: "talos-chain-flails", name: "Chain-flails", image: "", profiles: [{ range: "Melee", attacks: "8", skill: "3+", strength: "6", ap: "-1", damage: "1" }] },
      { id: "talos-gauntlet", name: "Talos gauntlet", image: "", profiles: [{ range: "Melee", attacks: "5", skill: "4+", strength: "9", ap: "-2", damage: "3" }] },
    ],
    wargearGroups: [
      ["talos-twin-splinter-cannon", "talos-stinger-pod", "talos-twin-haywire-blaster", "talos-twin-heat-lance"],
      ["talos-macro-scalpel-1", "talos-ichor-injector", "talos-twin-liquifier-gun"],
      ["talos-macro-scalpel-2", "talos-chain-flails", "talos-gauntlet"],
    ],
    ledBy: [],
  },

  {
    id: "raider",
    name: "Raider",
    faction: "drukhari",
    category: "transport",
    points: 85,
    modelCountOptions: [1],
    pointsByModelCount: { 1: 85 },
    transportCapacity: 11,
    defaultWargear: [
      { id: "raider-bladevanes-and-chainsnares", name: "Bladevanes and chainsnares", image: "", profiles: [{ range: "Melee", attacks: "D3+3", skill: "4+", strength: "6", ap: "-1", damage: "1" }] },
    ],
    wargear: [
      { id: "raider-dark-lance", name: "Dark lance", image: "", profiles: [{ range: '36"', attacks: "1", skill: "3+", strength: "12", ap: "-3", damage: "D6+2" }] },
      { id: "raider-disintegrator-cannon", name: "Disintegrator cannon", image: "", profiles: [{ range: '36"', attacks: "3", skill: "3+", strength: "6", ap: "-3", damage: "2" }] },
    ],
    wargearGroups: [
      ["raider-dark-lance", "raider-disintegrator-cannon"],
    ],
    defaultSelectedWargear: ["raider-dark-lance"],
    abilities: [
      {
        name: "Splinter Racks (Pain)",
        description: "In your Shooting phase, when you select this model to shoot, you can spend 1 Pain token to Empower this model. While Empowered, if one or more units are embarked within this model, each time this model makes an attack with a ranged weapon that has the [ANTI] ability, you can re-roll the Hit roll.",
      },
      {
        name: "Vanguard of the Dark City",
        description: "At the start of your Command phase, select one of the abilities in the Vanguard of the Dark City section for this model. Until the start of your next Command phase, this model has that ability.",
      },
      {
        name: "Masters of the Shadowed Sky",
        description: "At the end of your Command phase, if this model is within range of an objective marker you control, and if one or more KABALITE WARRIORS units are embarked within it, that objective marker remains under your control until your opponent's Level of Control over that objective marker is greater than yours at the end of a phase.",
      },
      {
        name: "Speed of the Kill",
        description: "Each time a WYCHES unit disembarks from this model (excluding Emergency Disembarkations), models in that WYCHES unit must be set up wholly within 6\" of this model.",
      },
      {
        name: "Visions of Butchery",
        description: "While one or more WRACKS units are embarked within this model, for each WRACKS model embarked within this model, add 1 to the Attacks characteristic of this model's bladevanes and chainsnares.",
      },
      {
        name: "Aethersails",
        description: "While one or more DRUKHARI units are embarked within this model, you can re-roll Advance and Charge rolls made for this model.",
      },
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
