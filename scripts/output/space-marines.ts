import type { Unit } from "../../src/types/warhammer";

export const spaceMarinesUnits: Unit[] = [

  {
    id: "invader-atv",
    name: "Invader ATV",
    faction: "space-marines",
    category: "mounted",
    modelCountOptions: [1],
    wargearGroups: [["onslaught-gatling-cannon", "multi-melta"]],
    points: 60,
    imageCredit: "Oscar Hugosson",
    abilities: [
      {
        name: "Outrider Escort",
        description: "Once per turn, in your opponent's Shooting phase, when another friendly ADEPTUS ASTARTES MOUNTED unit within 6\" of this model is selected as the target of an attack, one model from your army with this ability can use it. If it does, after that enemy unit has finished making its attacks, that model can shoot as if it were your Shooting phase, but when resolving those attacks it can only target that enemy unit (and only if it is an eligible target).",
      },
    ],
    defaultWargear: [
      { id: "bolt-pistol", name: "Bolt pistol", image: "", profiles: [{ range: '12"', attacks: "1", skill: "3+", strength: "4", ap: "0", damage: "1", keywords: ["PISTOL"] }] },
      { id: "twin-bolt-rifle", name: "Twin bolt rifle", image: "", profiles: [{ range: '24"', attacks: "2", skill: "3+", strength: "4", ap: "-1", damage: "1", keywords: ["TWIN-LINKED"] }] },
      { id: "close-combat-weapon", name: "Close combat weapon", image: "", profiles: [{ range: "Melee", attacks: "5", skill: "3+", strength: "4", ap: "0", damage: "1" }] },
    ],
    wargear: [
      { id: "onslaught-gatling-cannon", name: "Onslaught gatling cannon", image: "", profiles: [{ range: '24"', attacks: "8", skill: "3+", strength: "5", ap: "0", damage: "1", keywords: ["DEVASTATING WOUNDS"] }] },
      { id: "multi-melta", name: "Multi-melta", image: "", profiles: [{ range: '18"', attacks: "2", skill: "3+", strength: "9", ap: "-4", damage: "D6", keywords: ["MELTA 2"] }] },
    ],
    ledBy: [],
  },

  {
    id: "outrider-squad",
    name: "Outrider Squad",
    faction: "space-marines",
    category: "mounted",
    modelCountOptions: [3, 6],
    points: 80,
    pointsByModelCount: { 3: 80, 6: 160 },
    attachableUnits: ["invader-atv"],
    imageCredit: "Oscar Hugosson",
    abilities: [
      {
        name: "Thunderous Impact",
        description: "Each time a model in this unit makes a melee attack, if this unit made a Charge move this turn, improve the Strength and Damage characteristics of that attack by 1.",
      },
    ],
    defaultWargear: [
      { id: "heavy-bolt-pistol", name: "Heavy bolt pistol", image: "", profiles: [{ range: '18"', attacks: "1", skill: "3+", strength: "4", ap: "-1", damage: "1", keywords: ["PISTOL"] }] },
      { id: "twin-bolt-rifle", name: "Twin bolt rifle", image: "", profiles: [{ range: '24"', attacks: "2", skill: "3+", strength: "4", ap: "-1", damage: "1", keywords: ["TWIN-LINKED"] }] },
      { id: "astartes-chainsword", name: "Astartes chainsword", image: "/Warhammerimages/SpaceMarine/Space marine chainsword.png", profiles: [{ range: "Melee", attacks: "4", skill: "3+", strength: "4", ap: "-1", damage: "1" }] },
    ],
    wargear: [],
    ledBy: ["chaplain-on-bike","suboden-khan"],
  },

  {
    id: "assault-intercessor-squad",
    name: "Assault Intercessor Squad",
    faction: "space-marines",
    category: "battleline",
    image5: "/Warhammerimages/SpaceMarine/Assault intersessor5.png",
    image10: "/Warhammerimages/SpaceMarine/Assault-intersessor10.png",
    imageCredit: "Oscar Hugosson",
    points: 75,
    pointsByModelCount: { 5: 75, 10: 150 },
    abilities: [
      {
        name: "Shock Assault",
        description: "Each time a model in this unit targets an enemy unit with a melee attack, re-roll a Wound roll of 1. If that enemy unit is within range of an objective marker, you can re-roll the Wound roll instead.",
      },
    ],
    defaultWargear: [
      {
        id: "heavy-bolt-pistol", name: "Heavy bolt pistol", image: "",
        profiles: [{ range: '18"', attacks: "1", skill: "3+", strength: "4", ap: "-1", damage: "1", keywords: ["PISTOL"] }],
      },
      {
        id: "astartes-chainsword", name: "Astartes chainsword", image: "/Warhammerimages/SpaceMarine/Space marine chainsword.png",
        profiles: [{ range: "Melee", attacks: "4", skill: "3+", strength: "4", ap: "-1", damage: "1" }],
      },
    ],
    wargearGroups: [
      ["hand-flamer", "plasma-pistol"],
      ["power-fist", "power-weapon", "thunder-hammer"],
    ],
    wargear: [
      {
        id: "hand-flamer", name: "Hand flamer", image: "", sergeantOnly: true,
        profiles: [{ range: '12"', attacks: "D6", skill: "N/A", strength: "3", ap: "0", damage: "1", keywords: ["IGNORES COVER", "PISTOL", "TORRENT"] }],
      },
      {
        id: "plasma-pistol", name: "Plasma pistol", image: "/Warhammerimages/SpaceMarine/Space marine plasma pistol.png", sergeantOnly: true,
        profiles: [
          { profileName: "Standard", range: '12"', attacks: "1", skill: "3+", strength: "7", ap: "-2", damage: "1", keywords: ["PISTOL"] },
          { profileName: "Supercharge", range: '12"', attacks: "1", skill: "3+", strength: "8", ap: "-3", damage: "2", keywords: ["HAZARDOUS", "PISTOL"] },
        ],
      },
      {
        id: "power-fist", name: "Power fist", image: "", sergeantOnly: true,
        profiles: [{ range: "Melee", attacks: "3", skill: "3+", strength: "8", ap: "-2", damage: "2" }],
      },
      {
        id: "power-weapon", name: "Power weapon", image: "/Warhammerimages/SpaceMarine/Power sword.png", sergeantOnly: true,
        profiles: [{ range: "Melee", attacks: "4", skill: "3+", strength: "5", ap: "-2", damage: "1" }],
      },
      {
        id: "thunder-hammer", name: "Thunder hammer", image: "", sergeantOnly: true,
        profiles: [{ range: "Melee", attacks: "3", skill: "4+", strength: "8", ap: "-2", damage: "2", keywords: ["DEVASTATING WOUNDS"] }],
      },
    ],
    ledBy: ["ancient","apothecary","captain","chaplain","judiciar","korsarro-khan","librarian","lieutenant","techmarine","inquisitor","inquisitor-coteaz","inquisitor-draxus","inquisitor-greyfax"],
  },

  {
    id: "heavy-intercessor-squad",
    name: "Heavy Intercessor Squad",
    faction: "space-marines",
    category: "battleline",
    modelCountOptions: [5, 10],
    points: 100,
    pointsByModelCount: { 5: 100, 10: 200 },
    notes: [
      {
        id: "heavy-bolter-swap",
        text: "For every 5 models in this unit, 1 Heavy Intercessor's heavy bolt rifle can be replaced with 1 heavy bolter.",
        textByModelCount: { 10: "For every 10 models in this unit, 2 Heavy Intercessor's heavy bolt rifles can be replaced with 2 heavy bolters." },
        checkbox: true,
        triggersWargear: ["heavy-bolter-hi"],
      },
    ],
    abilities: [
      {
        name: "Unyielding in the Face of the Foe",
        description: "While this unit is within range of an objective marker you control, each time an attack with a Damage characteristic of 1 is allocated to a model in this unit, add 1 to any armour saving throw made against that attack.",
      },
    ],
    defaultWargear: [
      { id: "bolt-pistol", name: "Bolt pistol", image: "", profiles: [{ range: '12"', attacks: "1", skill: "3+", strength: "4", ap: "0", damage: "1", keywords: ["PISTOL"] }] },
      { id: "heavy-bolt-rifle", name: "Heavy bolt rifle", image: "", profiles: [{ range: '30"', attacks: "2", skill: "3+", strength: "5", ap: "-1", damage: "2", keywords: ["ASSAULT", "HEAVY"] }] },
      { id: "close-combat-weapon", name: "Close combat weapon", image: "", profiles: [{ range: "Melee", attacks: "3", skill: "3+", strength: "4", ap: "0", damage: "1" }] },
    ],
    wargear: [
      { id: "heavy-bolter-hi", name: "Heavy bolter", image: "", profiles: [{ range: '36"', attacks: "3", skill: "3+", strength: "5", ap: "-1", damage: "2", keywords: ["ASSAULT", "HEAVY", "SUSTAINED HITS 1"] }] },
    ],
    ledBy: ["apothecary-biologis","captain-in-gravis-armour","inquisitor","inquisitor-coteaz","inquisitor-draxus","inquisitor-greyfax"],
  },

  {
    id: "intercessor-squad",
    name: "Intercessor Squad",
    faction: "space-marines",
    category: "battleline",
    image5: "/Warhammerimages/SpaceMarine/intercessor5.png",
    image10: "/Warhammerimages/SpaceMarine/intercessor10.png",
    points: 80,
    pointsByModelCount: { 5: 80, 10: 160 },
    notes: [
      {
        id: "grenade-launcher-swap",
        text: "One out of five models' bolt rifle can be swapped for an Astartes grenade launcher",
        textByModelCount: { 10: "2 out of 10 models' bolt rifle can be swapped for an Astartes grenade launcher" },
        checkbox: true,
        image: "/Warhammerimages/SpaceMarine/Intercessor-granade.png",
        triggersWargear: ["astartes-grenade-launcher"],
      },
    ],
    abilities: [
      {
        name: "Objective Secured",
        description: "If you control an objective marker at the end of your Command phase and this unit is within range of that objective marker, that objective marker remains under your control, even if you have no models within range of it, until your opponent controls it at the start or end of any turn.",
      },
      {
        name: "Target Elimination",
        description: "Each time this unit is selected to shoot, it can use this ability. If it does, until the end of the phase, add 2 to the Attacks characteristic of bolt rifles equipped by models in this unit and you can only select one enemy unit as the target of all of this unit's attacks.",
      },
    ],
    defaultWargear: [
      {
        id: "bolt-pistol", name: "Bolt pistol", image: "",
        profiles: [{ range: '12"', attacks: "1", skill: "3+", strength: "4", ap: "0", damage: "1", keywords: ["PISTOL"] }],
      },
      {
        id: "bolt-rifle", name: "Bolt rifle", image: "",
        profiles: [{ range: '24"', attacks: "2", skill: "3+", strength: "4", ap: "-1", damage: "1", keywords: ["RAPID FIRE 1"] }],
      },
      {
        id: "close-combat-weapon", name: "Close combat weapon", image: "",
        profiles: [{ range: "Melee", attacks: "3", skill: "3+", strength: "4", ap: "0", damage: "1" }],
      },
    ],
    wargearGroups: [
      ["hand-flamer", "plasma-pistol", "bolt-rifle-wargear", "grenade-bolt-rifle"],
      ["astartes-chainsword", "power-fist", "power-weapon", "thunder-hammer"],
    ],
    wargear: [
      {
        id: "astartes-grenade-launcher", name: "Astartes grenade launcher", image: "",
        countable: true,
        maxCountByModelCount: { 5: 1, 10: 2 },
        profiles: [
          { profileName: "Frag", range: '30"', attacks: "D3", skill: "3+", strength: "4", ap: "0", damage: "1", keywords: ["BLAST"] },
          { profileName: "Krak", range: '30"', attacks: "1", skill: "3+", strength: "9", ap: "-2", damage: "D3" },
        ],
      },
      {
        id: "bolt-rifle-wargear", name: "Bolt rifle", image: "", sergeantOnly: true,
        profiles: [{ range: '24"', attacks: "2", skill: "3+", strength: "4", ap: "-1", damage: "1", keywords: ["RAPID FIRE 1"] }],
      },
      {
        id: "grenade-bolt-rifle", name: "Grenade bolt rifle", image: "", sergeantOnly: true,
        consumesNoteWargear: { noteId: "grenade-launcher-swap", wargearId: "astartes-grenade-launcher" },
        profiles: [
          { profileName: "Frag", range: '30"', attacks: "D3", skill: "3+", strength: "4", ap: "0", damage: "1", keywords: ["BLAST"] },
          { profileName: "Krak", range: '30"', attacks: "1", skill: "3+", strength: "9", ap: "-2", damage: "D3" },
        ],
      },
      {
        id: "hand-flamer", name: "Hand flamer", image: "", sergeantOnly: true,
        profiles: [{ range: '12"', attacks: "D6", skill: "N/A", strength: "3", ap: "0", damage: "1", keywords: ["IGNORES COVER", "PISTOL", "TORRENT"] }],
      },
      {
        id: "plasma-pistol", name: "Plasma pistol", image: "/Warhammerimages/SpaceMarine/Space marine plasma pistol.png", sergeantOnly: true,
        profiles: [
          { profileName: "Standard", range: '12"', attacks: "1", skill: "3+", strength: "7", ap: "-2", damage: "1", keywords: ["PISTOL"] },
          { profileName: "Supercharge", range: '12"', attacks: "1", skill: "3+", strength: "8", ap: "-3", damage: "2", keywords: ["HAZARDOUS", "PISTOL"] },
        ],
      },
      {
        id: "astartes-chainsword", name: "Astartes chainsword", image: "/Warhammerimages/SpaceMarine/Space marine chainsword.png", sergeantOnly: true,
        profiles: [{ range: "Melee", attacks: "4", skill: "3+", strength: "4", ap: "-1", damage: "1" }],
      },
      {
        id: "power-fist", name: "Power fist", image: "", sergeantOnly: true,
        profiles: [{ range: "Melee", attacks: "3", skill: "3+", strength: "8", ap: "-2", damage: "2" }],
      },
      {
        id: "power-weapon", name: "Power weapon", image: "/Warhammerimages/SpaceMarine/Power sword.png", sergeantOnly: true,
        profiles: [{ range: "Melee", attacks: "4", skill: "3+", strength: "4", ap: "-2", damage: "1" }],
      },
      {
        id: "thunder-hammer", name: "Thunder hammer", image: "", sergeantOnly: true,
        profiles: [{ range: "Melee", attacks: "3", skill: "4+", strength: "8", ap: "-2", damage: "2", keywords: ["DEVASTATING WOUNDS"] }],
      },
    ],
    ledBy: ["ancient","apothecary","captain","chaplain","judiciar","korsarro-khan","librarian","lieutenant","techmarine","inquisitor","inquisitor-coteaz","inquisitor-draxus","inquisitor-greyfax"],
  },

  {
    id: "tactical-squad",
    name: "Tactical Squad",
    faction: "space-marines",
    category: "battleline",
    points: 140,
    defaultWargear: [
      { id: "bolt-pistol", name: "Bolt pistol", image: "" },
      { id: "boltgun", name: "Boltgun", image: "" },
      { id: "close-combat-weapon", name: "Close combat weapon", image: "" },
    ],
    wargear: [],
    ledBy: ["ancient","apothecary","captain","chaplain","judiciar","korsarro-khan","librarian","lieutenant","techmarine","inquisitor","inquisitor-coteaz","inquisitor-draxus","inquisitor-greyfax"],
  },

  {
    id: "aggressor-squad",
    name: "Aggressor Squad",
    faction: "space-marines",
    modelCountOptions: [3, 6],
    category: "infantry",
    points: 95,
    pointsByModelCount: { 3: 95, 6: 190 },
    abilities: [
      {
        name: "Close-quarters Firepower",
        description: "Each time a model in this unit makes a ranged attack that targets the closest eligible target, improve the Armour Penetration characteristic of that attack by 1.",
      },
    ],
    defaultWargear: [
      {
        id: "twin-power-fists", name: "Twin power fists", image: "",
        profiles: [{ range: "Melee", attacks: "3", skill: "3+", strength: "8", ap: "-2", damage: "2", keywords: ["TWIN-LINKED"] }],
      },
    ],
    wargearGroups: [
      ["flamestorm-gauntlets", "auto-boltstorm-gauntlets"],
    ],
    wargear: [
      {
        id: "flamestorm-gauntlets", name: "Flamestorm gauntlets", image: "",
        profiles: [{ range: '12"', attacks: "D6+1", skill: "N/A", strength: "4", ap: "0", damage: "1", keywords: ["IGNORES COVER", "TORRENT", "TWIN-LINKED"] }],
      },
      {
        id: "auto-boltstorm-gauntlets", name: "Auto boltstorm gauntlets", image: "",
        linkedWargear: ["fragstorm-grenade-launcher"],
        profiles: [{ range: '18"', attacks: "3", skill: "3+", strength: "4", ap: "0", damage: "1", keywords: ["TWIN-LINKED"] }],
      },
      {
        id: "fragstorm-grenade-launcher", name: "Fragstorm grenade launcher", image: "/Warhammerimages/SpaceMarine/Intercessor-granade.png",
        profiles: [{ range: '18"', attacks: "D6", skill: "3+", strength: "4", ap: "0", damage: "1", keywords: ["BLAST"] }],
      },
    ],
    ledBy: ["apothecary-biologis","captain-in-gravis-armour"],
  },

  {
    id: "assault-intercessors-with-jump-packs",
    name: "Assault Intercessors With Jump Packs",
    faction: "space-marines",
    category: "infantry",
    image5: "/Warhammerimages/SpaceMarine/assault-intercessor-with-jump-pack-squad-5.png",
    image10: "/Warhammerimages/SpaceMarine/assault-intercessor-with-jump-pack-squad-10.png.png",
    imageCredit: "Oscar",
    points: 90,
    transportSlots: 2,
    pointsByModelCount: { 5: 90, 10: 170 },
    abilities: [
      {
        name: "Hammer of Wrath",
        description: "Each time this unit ends a Charge move, select one enemy unit within Engagement Range of it, then roll one D6 for each model in this unit that is within Engagement Range of that enemy unit: for each 4+, that enemy unit suffers 1 mortal wound.",
      },
    ],
    notes: [
      {
        id: "plasma-pistol-swap",
        text: "One out of five models' heavy bolt pistol can be swapped for a plasma pistol",
        textByModelCount: { 10: "2 out of 10 models' heavy bolt pistol can be swapped for a plasma pistol" },
        checkbox: true,
        image: "/Warhammerimages/SpaceMarine/Space marine plasma pistol.png",
      },
    ],
    defaultWargear: [
      {
        id: "heavy-bolt-pistol", name: "Heavy bolt pistol", image: "",
        profiles: [{ range: '18"', attacks: "1", skill: "3+", strength: "4", ap: "-1", damage: "1", keywords: ["PISTOL"] }],
      },
      {
        id: "astartes-chainsword", name: "Astartes chainsword", image: "/Warhammerimages/SpaceMarine/Space marine chainsword.png",
        profiles: [{ range: "Melee", attacks: "4", skill: "3+", strength: "4", ap: "-1", damage: "1" }],
      },
    ],
    wargearGroups: [
      ["hand-flamer", "plasma-pistol"],
      ["power-weapon", "power-fist"],
    ],
    wargear: [
      {
        id: "hand-flamer", name: "Hand flamer", image: "", sergeantOnly: true,
        profiles: [{ range: '12"', attacks: "D6", skill: "N/A", strength: "3", ap: "0", damage: "1", keywords: ["IGNORES COVER", "PISTOL", "TORRENT"] }],
      },
      {
        id: "plasma-pistol", name: "Plasma pistol", image: "/Warhammerimages/SpaceMarine/Space marine plasma pistol.png", sergeantOnly: true,
        profiles: [
          { profileName: "Standard", range: '12"', attacks: "1", skill: "3+", strength: "7", ap: "-2", damage: "1", keywords: ["PISTOL"] },
          { profileName: "Supercharge", range: '12"', attacks: "1", skill: "3+", strength: "8", ap: "-3", damage: "2", keywords: ["HAZARDOUS", "PISTOL"] },
        ],
      },
      {
        id: "power-weapon", name: "Power weapon", image: "/Warhammerimages/SpaceMarine/Power sword.png", sergeantOnly: true,
        profiles: [{ range: "Melee", attacks: "4", skill: "3+", strength: "5", ap: "-2", damage: "1" }],
      },
      {
        id: "power-fist", name: "Power fist", image: "", sergeantOnly: true,
        profiles: [{ range: "Melee", attacks: "3", skill: "3+", strength: "8", ap: "-2", damage: "2" }],
      },
    ],
    ledBy: ["captain-with-jump-pack","chaplain-with-jump-pack"],
  },

  {
    id: "bladeguard-veteran-squad",
    name: "Bladeguard Veteran Squad",
    faction: "space-marines",
    modelCountOptions: [3, 6],
    image3: "/Warhammerimages/SpaceMarine/Bladeguard-3.png",
    imageCredit: "Oscar",
    category: "infantry",
    points: 80,
    pointsByModelCount: { 3: 80, 6: 170 },
    abilities: [
      {
        name: "Bladeguard",
        description: "At the start of the Fight phase, you can select one of the following abilities to apply to models in this unit until the end of the phase:\nSwords of the Chapter: Each time a model in this unit makes a melee attack, re-roll a Hit roll of 1.\nShields of the Chapter: Each time an invulnerable saving throw is made for a model in this unit, re-roll a saving throw of 1.",
      },
    ],
    defaultWargear: [
      { id: "heavy-bolt-pistol", name: "Heavy bolt pistol", image: "", profiles: [{ range: '18"', attacks: "1", skill: "3+", strength: "4", ap: "-1", damage: "1", keywords: ["PISTOL"] }] },
      { id: "master-crafted-power-weapon", name: "Master-crafted power weapon", image: "", profiles: [{ range: "Melee", attacks: "4", skill: "3+", strength: "5", ap: "-2", damage: "2" }] },
    ],
    wargear: [
      { id: "heavy-bolt-pistol", name: "Heavy bolt pistol", image: "", profiles: [{ range: '18"', attacks: "1", skill: "3+", strength: "4", ap: "-1", damage: "1", keywords: ["PISTOL"] }] },
      { id: "neo-volkite-pistol", name: "Neo-volkite pistol", image: "", profiles: [{ range: '12"', attacks: "1", skill: "3+", strength: "5", ap: "0", damage: "2", keywords: ["DEVASTATING WOUNDS", "PISTOL"] }] },
      { id: "plasma-pistol", name: "Plasma pistol", image: "/Warhammerimages/SpaceMarine/Space marine plasma pistol.png", profiles: [
        { profileName: "Standard", range: '12"', attacks: "1", skill: "3+", strength: "7", ap: "-2", damage: "1", keywords: ["PISTOL"] },
        { profileName: "Supercharge", range: '12"', attacks: "1", skill: "3+", strength: "8", ap: "-3", damage: "2", keywords: ["HAZARDOUS", "PISTOL"] },
      ]},
    ],
    wargearGroups: [["heavy-bolt-pistol", "neo-volkite-pistol", "plasma-pistol"]],
    ledBy: ["bladeguard-ancient","captain","chaplain","judiciar","korsarro-khan","lieutenant"],
  },

  {
    id: "centurion-assault-squad",
    name: "Centurion Assault Squad",
    faction: "space-marines",
    category: "infantry",
    points: 150,
    defaultWargear: [
      { id: "centurion-bolters", name: "Centurion bolters", image: "" },
      { id: "twin-flamer", name: "Twin flamer", image: "" },
      { id: "siege-drills", name: "Siege drills", image: "" },
    ],
    wargear: [
      { id: "twin-meltagun", name: "Twin meltagun", image: "" },
    ],
    ledBy: [],
  },

  {
    id: "centurion-devastator-squad",
    name: "Centurion Devastator Squad",
    faction: "space-marines",
    category: "infantry",
    points: 165,
    defaultWargear: [
      { id: "centurion-bolters", name: "Centurion bolters", image: "" },
      { id: "grav-cannon", name: "Grav-cannon", image: "" },
      { id: "centurion-fists", name: "Centurion fists", image: "" },
    ],
    wargear: [
      { id: "twin-heavy-bolter", name: "Twin heavy bolter", image: "" },
      { id: "twin-lascannon", name: "Twin lascannon", image: "" },
    ],
    ledBy: [],
  },

  {
    id: "company-heroes",
    name: "Company Heroes",
    faction: "space-marines",
    category: "infantry",
    image: "/Warhammerimages/SpaceMarine/Company Heros.png",
    points: 105,
    modelCountOptions: [4],
    notes: [
      { id: "disclaimer", text: "⚠ You must attach one CAPTAIN or CHAPTER MASTER model to this unit. If this is not possible, this unit does not take part in the battle and counts as having been destroyed." },
      { id: "ancient-loadout", text: "The Ancient is equipped with: bolt pistol; bolt rifle; close combat weapon." },
      { id: "champion-loadout", text: "The Company Champion is equipped with: bolt pistol; master-crafted power weapon." },
      { id: "veteran-1-loadout", text: "One Company Veteran is equipped with: bolt pistol; master-crafted heavy bolter; close combat weapon." },
      { id: "veteran-2-loadout", text: "One Company Veteran is equipped with: bolt pistol; master-crafted bolt rifle; close combat weapon." },
    ],
    defaultWargear: [
      { id: "bolt-pistol", name: "Bolt pistol", image: "", profiles: [{ range: '12"', attacks: "1", skill: "3+", strength: "4", ap: "0", damage: "1", keywords: ["PISTOL"] }] },
      { id: "bolt-rifle", name: "Bolt rifle", image: "", profiles: [{ range: '24"', attacks: "2", skill: "3+", strength: "4", ap: "-1", damage: "1" }] },
      { id: "master-crafted-bolt-rifle", name: "Master-crafted bolt rifle", image: "", profiles: [{ range: '24"', attacks: "2", skill: "2+", strength: "4", ap: "-1", damage: "2", keywords: ["DEVASTATING WOUNDS", "RAPID FIRE 1"] }] },
      { id: "master-crafted-heavy-bolter", name: "Master-crafted heavy bolter", image: "", profiles: [{ range: '36"', attacks: "3", skill: "3+", strength: "5", ap: "-1", damage: "3", keywords: ["HEAVY", "SUSTAINED HITS 2"] }] },
      { id: "master-crafted-power-weapon", name: "Master-crafted power weapon", image: "", profiles: [{ range: "Melee", attacks: "6", skill: "2+", strength: "5", ap: "-2", damage: "2", keywords: ["PRECISION"] }] },
      { id: "close-combat-weapon", name: "Close combat weapon", image: "", profiles: [{ range: "Melee", attacks: "5", skill: "3+", strength: "4", ap: "0", damage: "1" }] },
    ],
    abilities: [
      { name: "Astartes Banner", description: "While this unit contains an Ancient, add 1 to the Objective Control characteristic of models in this unit." },
      { name: "Command Squad", description: "While a CHARACTER model is leading this unit, each time an attack targets this unit, subtract 1 from the Wound roll." },
    ],
    wargear: [],
    ledBy: ["captain","lieutenant"],
  },

  {
    id: "desolation-squad",
    name: "Desolation Squad",
    faction: "space-marines",
    category: "infantry",
    points: 200,
    defaultWargear: [
      { id: "bolt-pistol", name: "Bolt pistol", image: "" },
      { id: "castellan-launcher", name: "Castellan launcher", image: "" },
      { id: "superfrag-rocket-launcher", name: "Superfrag rocket launcher", image: "" },
      { id: "close-combat-weapon", name: "Close combat weapon", image: "" },
    ],
    wargear: [
      { id: "superkrak-rocket-launcher", name: "Superkrak rocket launcher", image: "" },
      { id: "vengor-launcher", name: "Vengor launcher", image: "" },
    ],
    ledBy: ["ancient","apothecary","korsarro-khan","librarian","techmarine"],
  },

  {
    id: "devastator-squad",
    name: "Devastator Squad",
    faction: "space-marines",
    category: "infantry",
    points: 120,
    defaultWargear: [
      { id: "bolt-pistol", name: "Bolt pistol", image: "" },
      { id: "boltgun", name: "Boltgun", image: "" },
      { id: "close-combat-weapon", name: "Close combat weapon", image: "" },
    ],
    wargear: [
      { id: "combi-weapon", name: "Combi-weapon", image: "" },
      { id: "grav-cannon", name: "Grav-cannon", image: "" },
      { id: "grav-pistol", name: "Grav-pistol", image: "" },
      { id: "heavy-bolter", name: "Heavy bolter", image: "" },
      { id: "lascannon", name: "Lascannon", image: "" },
      { id: "missile-launcher-frag", name: "Missile launcher – frag", image: "" },
      { id: "missile-launcher-krak", name: "Missile launcher – krak", image: "" },
      { id: "multi-melta", name: "Multi-melta", image: "" },
      { id: "plasma-cannon-standard", name: "Plasma cannon – standard", image: "" },
      { id: "plasma-cannon-supercharge", name: "Plasma cannon – supercharge", image: "" },
      { id: "plasma-pistol", name: "Plasma pistol", image: "/Warhammerimages/SpaceMarine/Space marine plasma pistol.png" },

      { id: "storm-bolter", name: "Storm bolter", image: "" },
      { id: "astartes-chainsword", name: "Astartes chainsword", image: "/Warhammerimages/SpaceMarine/Space marine chainsword.png" },
      { id: "power-fist", name: "Power fist", image: "" },
      { id: "power-weapon", name: "Power weapon", image: "/Warhammerimages/SpaceMarine/Power sword.png" },
      { id: "thunder-hammer", name: "Thunder hammer", image: "" },
    ],
    ledBy: ["ancient","apothecary","librarian","techmarine"],
  },

  {
    id: "eliminator-squad",
    name: "Eliminator Squad",
    faction: "space-marines",
    category: "infantry",
    modelCountOptions: [3],
    points: 85,
    abilities: [
      {
        name: "Reposition Under Covering Fire",
        description: "In your Shooting phase, after this unit has shot, if it contains an Eliminator Sergeant equipped with an instigator bolt carbine, this unit can make a Normal move. If it does so, until the end of the turn, this unit is not eligible to declare a charge.",
      },
      {
        name: "Mark the Target",
        description: "Each time this unit Remains Stationary, until the start of your next Movement phase, ranged weapons equipped by models in this unit have the [DEVASTATING WOUNDS] ability.",
      },
    ],
    defaultWargear: [
      { id: "bolt-pistol", name: "Bolt pistol", image: "", profiles: [{ range: '12"', attacks: "1", skill: "3+", strength: "4", ap: "0", damage: "1", keywords: ["PISTOL"] }] },
      { id: "close-combat-weapon", name: "Close combat weapon", image: "", profiles: [{ range: "Melee", attacks: "3", skill: "3+", strength: "4", ap: "0", damage: "1" }] },
    ],
    wargear: [
      { id: "instigator-bolt-carbine", name: "Instigator bolt carbine", image: "", sergeantOnly: true, profiles: [{ range: '24"', attacks: "1", skill: "3+", strength: "4", ap: "-2", damage: "2", keywords: ["PRECISION"] }] },
      { id: "las-fusil-sgt", name: "Las fusil", image: "", sergeantOnly: true, profiles: [{ range: '36"', attacks: "1", skill: "3+", strength: "9", ap: "-3", damage: "D6", keywords: ["HEAVY"] }] },
      { id: "bolt-sniper-rifle", name: "Bolt sniper rifle", image: "", profiles: [{ range: '36"', attacks: "1", skill: "3+", strength: "5", ap: "-2", damage: "3", keywords: ["HEAVY", "PRECISION"] }] },
      { id: "las-fusil", name: "Las fusil", image: "", profiles: [{ range: '36"', attacks: "1", skill: "3+", strength: "9", ap: "-3", damage: "D6", keywords: ["HEAVY"] }] },
    ],
    wargearGroups: [
      ["instigator-bolt-carbine", "las-fusil-sgt"],
      ["bolt-sniper-rifle", "las-fusil"],
    ],
    ledBy: ["captain-in-phobos-armour","librarian-in-phobos-armour"],
  },

  {
    id: "eradicator-squad",
    name: "Eradicator Squad",
    faction: "space-marines",
    category: "infantry",
    modelCountOptions: [3, 6],
    pointsByModelCount: { 3: 90, 6: 180 },
    defaultWargear: [
      { id: "bolt-pistol", name: "Bolt pistol", image: "", profiles: [{ range: '12"', attacks: "1", skill: "3+", strength: "4", ap: "0", damage: "1", keywords: ["PISTOL"] }] },
      { id: "melta-rifle", name: "Melta rifle", image: "", profiles: [{ range: '18"', attacks: "1", skill: "3+", strength: "9", ap: "-4", damage: "D6", keywords: ["HEAVY", "MELTA 2"] }] },
      { id: "close-combat-weapon", name: "Close combat weapon", image: "", profiles: [{ range: "Melee", attacks: "3", skill: "3+", strength: "4", ap: "0", damage: "1" }] },
    ],
    wargear: [
      { id: "multi-melta", name: "Multi-melta", image: "", profiles: [{ range: '18"', attacks: "2", skill: "4+", strength: "9", ap: "-4", damage: "D6", keywords: ["HEAVY", "MELTA 2"] }], replacesDefaultWargear: ["melta-rifle"], countable: true, maxCountByModelCount: { 3: 1, 6: 2 } },
    ],
    abilities: [
      {
        name: "Total Obliteration",
        description: "Each time a ranged attack made by a model in this unit targets a MONSTER or VEHICLE model, you can re-roll the Hit roll, you can re-roll the Wound roll and you can re-roll the Damage roll.",
      },
    ],
    ledBy: ["apothecary-biologis", "captain-in-gravis-armour"],
  },

  {
    id: "hellblaster-squad",
    name: "Hellblaster Squad",
    faction: "space-marines",
    category: "infantry",
    points: 110,
    modelCountOptions: [5, 10],
    pointsByModelCount: { 5: 110, 10: 220 },
    abilities: [
      {
        name: "For the Chapter!",
        description: "Each time a model in this unit is destroyed, roll one D6: on a 3+, do not remove it from play. The destroyed model can shoot after the attacking model's unit has finished making its attacks, and is then removed from play. When resolving these attacks, any Hazardous tests taken for that attack are automatically passed.\n\nDesigner's Note: This ability is triggered even when a model in this unit is destroyed as the result of failing a Hazardous test, meaning such a model may be able to shoot twice in the same phase.",
      },
    ],
    defaultWargear: [
      { id: "bolt-pistol", name: "Bolt pistol", image: "", profiles: [{ range: '12"', attacks: "1", skill: "3+", strength: "4", ap: "0", damage: "1", keywords: ["PISTOL"] }] },
      { id: "plasma-incinerator", name: "Plasma incinerator", image: "", profiles: [{ profileName: "standard", range: '24"', attacks: "2", skill: "3+", strength: "7", ap: "-2", damage: "1", keywords: ["ASSAULT", "HEAVY"] }, { profileName: "supercharge", range: '24"', attacks: "2", skill: "3+", strength: "8", ap: "-3", damage: "2", keywords: ["ASSAULT", "HAZARDOUS", "HEAVY"] }] },
      { id: "close-combat-weapon", name: "Close combat weapon", image: "", profiles: [{ range: "Melee", attacks: "3", skill: "3+", strength: "4", ap: "0", damage: "1" }] },
    ],
    wargear: [
      { id: "plasma-pistol", name: "Plasma pistol", image: "/Warhammerimages/SpaceMarine/Space marine plasma pistol.png", profiles: [{ profileName: "standard", range: '12"', attacks: "1", skill: "3+", strength: "7", ap: "-2", damage: "1", keywords: ["PISTOL"] }, { profileName: "supercharge", range: '12"', attacks: "1", skill: "3+", strength: "8", ap: "-3", damage: "2", keywords: ["HAZARDOUS", "PISTOL"] }] },
    ],
    ledBy: ["ancient","apothecary","captain","chaplain","librarian","lieutenant"],
  },

  {
    id: "inceptor-squad",
    name: "Inceptor Squad",
    faction: "space-marines",
    modelCountOptions: [3, 6],
    category: "infantry",
    points: 120,
    pointsByModelCount: { 3: 120, 6: 240 },
    abilities: [
      {
        name: "Meteoric Descent",
        description: "In your Movement phase, when this unit is set up on the battlefield using the Deep Strike ability, it can perform a meteoric descent. If it does, this unit can be set up anywhere on the battlefield that is more than 6\" horizontally away from all enemy units, but until the end of the turn, it is not eligible to declare a charge.",
      },
    ],
    defaultWargear: [
      {
        id: "close-combat-weapon", name: "Close combat weapon", image: "",
        profiles: [{ range: "Melee", attacks: "3", skill: "3+", strength: "4", ap: "0", damage: "1" }],
      },
    ],
    wargearGroups: [
      ["assault-bolters", "plasma-exterminators"],
    ],
    wargear: [
      {
        id: "assault-bolters", name: "Assault bolters", image: "",
        profiles: [{ range: '18"', attacks: "3", skill: "3+", strength: "5", ap: "-1", damage: "2", keywords: ["ASSAULT", "PISTOL", "SUSTAINED HITS 2", "TWIN-LINKED"] }],
      },
      {
        id: "plasma-exterminators", name: "Plasma exterminators", image: "",
        profiles: [
          { profileName: "Standard", range: '18"', attacks: "2", skill: "3+", strength: "7", ap: "-2", damage: "2", keywords: ["ASSAULT", "PISTOL", "TWIN-LINKED"] },
          { profileName: "Supercharge", range: '18"', attacks: "2", skill: "3+", strength: "8", ap: "-3", damage: "3", keywords: ["ASSAULT", "HAZARDOUS", "PISTOL", "TWIN-LINKED"] },
        ],
      },
    ],
    ledBy: [],
  },

  {
    id: "incursor-squad",
    name: "Incursor Squad",
    faction: "space-marines",
    category: "infantry",
    points: 80,
    pointsByModelCount: { 5: 80, 10: 160 },
    modelCountOptions: [5, 10],
    abilities: [
      {
        name: "Multi-spectrum Array",
        description: "In your Shooting phase, after this unit has shot, select one enemy unit that was hit by one or more attacks made by this unit this phase. Until the end of the phase, each time a friendly ADEPTUS ASTARTES unit makes an attack that targets that enemy unit, add 1 to the Hit roll.",
      },
    ],
    defaultWargear: [
      {
        id: "bolt-pistol", name: "Bolt pistol", image: "",
        profiles: [{ range: '12"', attacks: "1", skill: "3+", strength: "4", ap: "0", damage: "1", keywords: ["PISTOL"] }],
      },
      {
        id: "occulus-bolt-carbine", name: "Occulus bolt carbine", image: "",
        profiles: [{ range: '24"', attacks: "2", skill: "3+", strength: "4", ap: "0", damage: "1", keywords: ["ASSAULT", "IGNORES COVER"] }],
      },
      {
        id: "paired-combat-blades", name: "Paired combat blades", image: "",
        profiles: [{ range: "Melee", attacks: "3", skill: "3+", strength: "4", ap: "-1", damage: "1", keywords: ["SUSTAINED HITS 1"] }],
      },
    ],
    wargear: [
      { id: "haywire-mine", name: "Haywire mine", image: "", note: "Haywire Mine: Once per battle, at the start of any phase, you can select one enemy unit within 3\" of the bearer and roll one D6: on a 2+, that enemy unit suffers D3 mortal wounds, or 2D3 mortal wounds instead if it is a VEHICLE unit." },
    ],
    ledBy: ["captain-in-phobos-armour","librarian-in-phobos-armour","lieutenant-in-phobos-armour"],
  },

  {
    id: "infernus-squad",
    name: "Infernus Squad",
    faction: "space-marines",
    category: "infantry",
    modelCountOptions: [5, 10],
    points: 90,
    pointsByModelCount: { 5: 90, 10: 180 },
    abilities: [
      {
        name: "Incendiary Terror",
        description: "In your Shooting phase, after this unit has shot, you can select one enemy INFANTRY unit hit by one or more of those attacks made with a pyreblaster. That enemy unit must take a Battle-shock test, subtracting 1 from that test.",
      },
    ],
    defaultWargear: [
      {
        id: "bolt-pistol", name: "Bolt pistol", image: "",
        profiles: [{ range: '12"', attacks: "1", skill: "3+", strength: "4", ap: "0", damage: "1", keywords: ["PISTOL"] }],
      },
      {
        id: "pyreblaster", name: "Pyreblaster", image: "",
        profiles: [{ range: '12"', attacks: "D6", skill: "N/A", strength: "5", ap: "-1", damage: "1", keywords: ["IGNORES COVER", "TORRENT"] }],
      },
      {
        id: "close-combat-weapon", name: "Close combat weapon", image: "",
        profiles: [{ range: "Melee", attacks: "3", skill: "3+", strength: "4", ap: "0", damage: "1" }],
      },
    ],
    wargear: [],
    ledBy: ["ancient","apothecary","captain","chaplain","judiciar","librarian","lieutenant"],
  },

  {
    id: "infiltrator-squad",
    name: "Infiltrator Squad",
    faction: "space-marines",
    category: "infantry",
    image5: "/Warhammerimages/SpaceMarine/infiltrator-5.png",
    image10: "/Warhammerimages/SpaceMarine/infiltrator-10.png",
    points: 100,
    pointsByModelCount: { 5: 100, 10: 200 },
    modelCountOptions: [5, 10],
    abilities: [
      {
        name: "Omni-scramblers",
        description: "Enemy units that are set up on the battlefield from Reserves cannot be set up within 12\" of this unit.",
      },
    ],
    notes: [
      { id: "infiltrator-wargear-warning", text: "⚠ Helix gauntlet and Infiltrator comms array cannot be taken on the same model." },
    ],
    defaultWargear: [
      { id: "bolt-pistol", name: "Bolt pistol", image: "", profiles: [{ range: '12"', attacks: "1", skill: "3+", strength: "4", ap: "0", damage: "1", keywords: ["PISTOL"] }] },
      { id: "marksman-bolt-carbine", name: "Marksman bolt carbine", image: "", profiles: [{ range: '24"', attacks: "2", skill: "3+", strength: "4", ap: "0", damage: "1", keywords: ["HEAVY"] }] },
      { id: "close-combat-weapon", name: "Close combat weapon", image: "", profiles: [{ range: "Melee", attacks: "3", skill: "3+", strength: "4", ap: "0", damage: "1" }] },
    ],
    wargear: [
      { id: "helix-gauntlet", name: "Helix gauntlet", image: "/Warhammerimages/SpaceMarine/Helix gauntlet.png", note: "Helix Gauntlet: Models in the bearer's unit have the Feel No Pain 6+ ability." },
      { id: "infiltrator-comms-array", name: "Infiltrator comms array", image: "", note: "Infiltrator Comms Array: Each time you target the bearer's unit with a Stratagem, roll one D6: on a 5+, you gain 1CP." },
    ],
    ledBy: ["captain-in-phobos-armour","librarian-in-phobos-armour","lieutenant-in-phobos-armour"],
  },

  {
    id: "reiver-squad",
    name: "Reiver Squad",
    faction: "space-marines",
    category: "infantry",
    points: 80,
    pointsByModelCount: { 5: 80, 10: 160 },
    modelCountOptions: [5, 10],
    abilities: [
      {
        name: "Fearsome Assault",
        description: "At the start of the Fight phase, each enemy unit within Engagement Range of one or more units with this ability must take a Battle-shock test, subtracting 1 from that test.",
      },
      {
        name: "Terror Troops (Aura)",
        description: "While an enemy unit (excluding MONSTERS and VEHICLES) is within 3\" of one or more units with this ability, subtract 1 from the Objective Control characteristic of models in that enemy unit.",
      },
    ],
    defaultWargear: [
      { id: "bolt-carbine", name: "Bolt carbine", image: "", profiles: [{ range: '24"', attacks: "2", skill: "3+", strength: "4", ap: "0", damage: "1", keywords: ["PRECISION"] }] },
      { id: "special-issue-bolt-pistol", name: "Special issue bolt pistol", image: "", profiles: [{ range: '12"', attacks: "1", skill: "3+", strength: "4", ap: "-1", damage: "1", keywords: ["PISTOL", "PRECISION"] }] },
      { id: "close-combat-weapon", name: "Close combat weapon", image: "", profiles: [{ range: "Melee", attacks: "3", skill: "3+", strength: "4", ap: "0", damage: "1" }] },
      { id: "combat-knife", name: "Combat knife", image: "", profiles: [{ range: "Melee", attacks: "4", skill: "3+", strength: "4", ap: "-1", damage: "1", keywords: ["PRECISION"] }] },
    ],
    wargear: [
      { id: "reiver-grav-chute", name: "Reiver grav-chute", image: "", note: "Reiver Grav-chute: The bearer has the Deep Strike ability." },
      { id: "grapnel-launcher", name: "Grapnel launcher", image: "", note: "Grapnel Launcher: Each time the bearer's unit makes a Normal, Advance, Fall Back or Charge move, ignore any vertical distance when determining the total distance the bearer can be moved during that move." },
    ],
    ledBy: ["captain-in-phobos-armour","librarian-in-phobos-armour","lieutenant-in-phobos-armour","lieutenant-in-reiver-armour"],
  },

  {
    id: "scout-squad",
    name: "Scout Squad",
    faction: "space-marines",
    category: "infantry",
    points: 70,
    modelCountOptions: [5, 10],
    pointsByModelCount: { 5: 70, 10: 140 },
    notes: [
      {
        id: "scout-heavy-note",
        text: "1 in 5 models can have a heavy bolter or missile launcher:",
        textByModelCount: { 5: "1 in 5 models can have a heavy bolter or missile launcher:", 10: "2 in 10 models — 1st model can have a heavy bolter or missile launcher:" },
        checkbox: true,
        weaponIds: ["scout-heavy-bolter", "scout-missile-launcher"],
      },
      {
        id: "scout-heavy-note-2",
        text: "2 in 10 models — 2nd model can have a heavy bolter or missile launcher:",
        checkbox: true,
        weaponIds: ["scout-heavy-bolter", "scout-missile-launcher"],
        showForModelCounts: [10],
      },
    ],
    defaultWargear: [
      { id: "bolt-pistol", name: "Bolt pistol", image: "", profiles: [{ range: '12"', attacks: "1", skill: "3+", strength: "4", ap: "0", damage: "1", keywords: ["PISTOL"] }] },
      { id: "close-combat-weapon", name: "Close combat weapon", image: "", profiles: [{ range: "Melee", attacks: "2", skill: "3+", strength: "4", ap: "0", damage: "1" }] },
    ],
    wargear: [
      { id: "boltgun", name: "Boltgun", image: "", countable: true, maxCountByModelCount: { 5: 5, 10: 10 }, maxCountReducedByWargear: ["astartes-shotgun", "combat-knife"], profiles: [{ range: '24"', attacks: "2", skill: "3+", strength: "4", ap: "0", damage: "1" }] },
      { id: "astartes-shotgun", name: "Astartes shotgun", image: "", countable: true, maxCountByModelCount: { 5: 5, 10: 10 }, maxCountReducedByWargear: ["boltgun", "combat-knife"], profiles: [{ range: '18"', attacks: "2", skill: "3+", strength: "4", ap: "0", damage: "1", keywords: ["ASSAULT"] }] },
      { id: "combat-knife", name: "Combat knife", image: "", countable: true, maxCountByModelCount: { 5: 5, 10: 10 }, maxCountReducedByWargear: ["boltgun", "astartes-shotgun"], profiles: [{ range: "Melee", attacks: "3", skill: "3+", strength: "4", ap: "-1", damage: "1" }] },
      { id: "sgt-scout-boltgun", name: "Boltgun", image: "", sergeantOnly: true, profiles: [{ range: '24"', attacks: "2", skill: "3+", strength: "4", ap: "0", damage: "1" }] },
      { id: "sgt-scout-chainsword", name: "Astartes chainsword", image: "/Warhammerimages/SpaceMarine/Space marine chainsword.png", sergeantOnly: true, profiles: [{ range: "Melee", attacks: "4", skill: "3+", strength: "4", ap: "-1", damage: "1" }] },
      { id: "scout-sniper-rifle", name: "Scout sniper rifle", image: "", countable: true, maxCountByModelCount: { 5: 1, 10: 2 }, profiles: [{ range: '36"', attacks: "1", skill: "3+", strength: "4", ap: "-2", damage: "2", keywords: ["HEAVY", "PRECISION"] }] },
      { id: "scout-heavy-bolter", name: "Heavy bolter", image: "", profiles: [{ range: '36"', attacks: "3", skill: "4+", strength: "5", ap: "-1", damage: "2", keywords: ["HEAVY", "SUSTAINED HITS 1"] }] },
      { id: "scout-missile-launcher", name: "Missile launcher", image: "", profiles: [
        { profileName: "Frag", range: '48"', attacks: "D6", skill: "4+", strength: "4", ap: "0", damage: "1", keywords: ["BLAST", "HEAVY"] },
        { profileName: "Krak", range: '48"', attacks: "1", skill: "4+", strength: "9", ap: "-2", damage: "D6", keywords: ["HEAVY"] },
      ]},
    ],
    wargearGroups: [["sgt-scout-boltgun", "sgt-scout-chainsword"]],
    abilities: [
      {
        name: "Guerrilla Tactics",
        description: "At the end of your opponent's turn, if this unit is more than 6\" away from all enemy models, you can remove this unit from the battlefield and place it into Strategic Reserves.",
      },
    ],
    ledBy: ["captain-in-phobos-armour"],
  },

  {
    id: "sternguard-veteran-squad",
    name: "Sternguard Veteran Squad",
    faction: "space-marines",
    category: "infantry",
    points: 100,
    modelCountOptions: [5, 10],
    notes: [
      {
        id: "heavy-weapon-swap",
        text: "1 in 5 models can have their Sternguard bolt rifle replaced by:",
        textByModelCount: { 5: "1 in 5 models can have their Sternguard bolt rifle replaced by:", 10: "2 in 10 models — 1st model can have their Sternguard bolt rifle replaced by:" },
        checkbox: true,
        weaponIds: ["pyrecannon", "sternguard-heavy-bolter"],
      },
      {
        id: "heavy-weapon-swap-2",
        text: "2 in 10 models — 2nd model can have their Sternguard bolt rifle replaced by:",
        checkbox: true,
        weaponIds: ["pyrecannon", "sternguard-heavy-bolter"],
        showForModelCounts: [10],
      },
    ],
    defaultWargear: [
      { id: "sternguard-bolt-pistol", name: "Sternguard bolt pistol", image: "" },
      { id: "sternguard-bolt-rifle", name: "Sternguard bolt rifle", image: "" },
      { id: "close-combat-weapon", name: "Close combat weapon", image: "" },
    ],
    wargear: [
      { id: "pyrecannon", name: "Pyrecannon", image: "" },
      { id: "sternguard-heavy-bolter", name: "Sternguard heavy bolter", image: "" },
      { id: "combi-weapon-count", name: "Combi-weapon", image: "", countable: true, maxCountByModelCount: { 5: 4, 10: 9 }, maxCountReducedByNotes: ["heavy-weapon-swap", "heavy-weapon-swap-2"] },
      { id: "sternguard-bolt-rifle-count", name: "Sternguard bolt rifle", image: "", countable: true, maxCountByModelCount: { 5: 4, 10: 9 }, maxCountReducedByNotes: ["heavy-weapon-swap", "heavy-weapon-swap-2"], linkedCounterId: "combi-weapon-count" },
      { id: "sgt-chainsword", name: "Astartes chainsword", image: "/Warhammerimages/SpaceMarine/Space marine chainsword.png", sergeantOnly: true },
      { id: "sgt-combi-weapon", name: "Combi-weapon", image: "", sergeantOnly: true },
      { id: "sgt-power-weapon", name: "Power weapon", image: "/Warhammerimages/SpaceMarine/Power sword.png", sergeantOnly: true },
      { id: "sgt-power-fist", name: "Power fist", image: "", sergeantOnly: true },
      { id: "sgt-chainsword-and-bolt-rifle", name: "Astartes chainsword + Sternguard bolt rifle", image: "", sergeantOnly: true },
      { id: "sgt-power-weapon-and-bolt-rifle", name: "Power weapon + Sternguard bolt rifle", image: "", sergeantOnly: true },
      { id: "sgt-power-fist-and-bolt-rifle", name: "Power fist + Sternguard bolt rifle", image: "", sergeantOnly: true },
    ],
    wargearGroups: [["sgt-chainsword", "sgt-combi-weapon", "sgt-power-weapon", "sgt-power-fist", "sgt-chainsword-and-bolt-rifle", "sgt-power-weapon-and-bolt-rifle", "sgt-power-fist-and-bolt-rifle"]],
    ledBy: ["ancient","apothecary","captain","chaplain","judiciar","korsarro-khan","librarian","lieutenant"],
  },

  {
    id: "suppressor-squad",
    name: "Suppressor Squad",
    faction: "space-marines",
    category: "infantry",
    modelCountOptions: [3],
    points: 75,
    abilities: [
      {
        name: "Suppression Fire",
        description: "In your Shooting phase, after this unit has shot, select one enemy unit hit by one or more of those attacks made with an accelerator autocannon. Until the start of your next turn, while this unit is on the battlefield, that enemy unit is suppressed. While a unit is suppressed, each time a model in that unit makes an attack, subtract 1 from the Hit roll.",
      },
    ],
    defaultWargear: [
      {
        id: "accelerator-autocannon", name: "Accelerator autocannon", image: "",
        profiles: [{ range: '48"', attacks: "3", skill: "4+", strength: "8", ap: "-1", damage: "2", keywords: ["HEAVY"] }],
      },
      {
        id: "bolt-pistol", name: "Bolt pistol", image: "",
        profiles: [{ range: '12"', attacks: "1", skill: "3+", strength: "4", ap: "0", damage: "1", keywords: ["PISTOL"] }],
      },
      {
        id: "close-combat-weapon", name: "Close combat weapon", image: "",
        profiles: [{ range: "Melee", attacks: "3", skill: "3+", strength: "4", ap: "0", damage: "1" }],
      },
    ],
    wargear: [],
    ledBy: [],
  },

  {
    id: "terminator-assault-squad",
    name: "Terminator Assault Squad",
    faction: "space-marines",
    category: "infantry",
    points: 180,
    transportSlots: 2,
    defaultWargear: [
      { id: "thunder-hammer", name: "Thunder hammer", image: "" },
    ],
    wargear: [
      { id: "twin-lightning-claws", name: "Twin lightning claws", image: "" },
    ],
    ledBy: ["ancient-in-terminator-armour","captain-in-terminator-armour","chaplain-in-terminator-armour","librarian-in-terminator-armour"],
  },

  {
    id: "terminator-squad",
    name: "Terminator Squad",
    faction: "space-marines",
    category: "infantry",
    points: 170,
    transportSlots: 2,
    pointsByModelCount: { 5: 170, 10: 340 },
    modelCountOptions: [5, 10],
    abilities: [
      {
        name: "Teleport Homer",
        description: "At the start of the battle, you can set up one Teleport Homer token for this unit anywhere on the battlefield that is not in your opponent's deployment zone. If you do, once per battle, you can target this unit with the Rapid Ingress Stratagem for 0CP, but when resolving that Stratagem, you must set this unit up within 3\" of that token and not within 9\" of any enemy models. That token is then removed.",
      },
      {
        name: "Fury of the First",
        description: "Each time a model in this unit makes an attack that targets your Oath of Moment target, add 1 to the Hit roll.",
      },
    ],
    notes: [
      {
        id: "heavy-weapon-replacement-1",
        text: "1 in 5 models can have their storm bolter replaced by:",
        textByModelCount: { 5: "1 in 5 models can have their storm bolter replaced by:", 10: "2 in 10 models — 1st model can have their storm bolter replaced by:" },
        checkbox: true,
        weaponIds: ["assault-cannon", "heavy-flamer", "cyclone-missile-launcher-and-storm-bolter"],
      },
      {
        id: "heavy-weapon-replacement-2",
        text: "2 in 10 models — 2nd model can have their storm bolter replaced by:",
        checkbox: true,
        weaponIds: ["assault-cannon", "heavy-flamer", "cyclone-missile-launcher-and-storm-bolter"],
        showForModelCounts: [10],
      },
    ],
    defaultWargear: [
      { id: "storm-bolter", name: "Storm bolter", image: "", profiles: [{ range: '24"', attacks: "2", skill: "3+", strength: "4", ap: "0", damage: "1", keywords: ["RAPID FIRE 2"] }] },
      { id: "power-fist", name: "Power fist", image: "", profiles: [{ range: "Melee", attacks: "3", skill: "3+", strength: "8", ap: "-2", damage: "2" }] },
    ],
    wargear: [
      { id: "assault-cannon", name: "Assault cannon", image: "", profiles: [{ range: '24"', attacks: "6", skill: "3+", strength: "6", ap: "0", damage: "1", keywords: ["DEVASTATING WOUNDS"] }] },
      { id: "heavy-flamer", name: "Heavy flamer", image: "", profiles: [{ range: '12"', attacks: "D6", skill: "N/A", strength: "5", ap: "-1", damage: "1", keywords: ["IGNORES COVER", "TORRENT"] }] },
      { id: "cyclone-missile-launcher-and-storm-bolter", name: "Cyclone missile launcher", image: "", profiles: [
        { profileName: "frag", range: '36"', attacks: "2D6", skill: "3+", strength: "4", ap: "0", damage: "1", keywords: ["BLAST"] },
        { profileName: "krak", range: '36"', attacks: "2", skill: "3+", strength: "9", ap: "-2", damage: "D6" },
      ]},
      { id: "chainfist", name: "Chainfist", image: "", countable: true, maxCountByModelCount: { 5: 4, 10: 9 }, note: "Any number of models can each have their power fist replaced with 1 chainfist.", profiles: [{ range: "Melee", attacks: "3", skill: "4+", strength: "8", ap: "-2", damage: "2", keywords: ["ANTI-VEHICLE 3+"] }] },
      { id: "power-fist-count", name: "Power fist", image: "", countable: true, maxCountByModelCount: { 5: 4, 10: 9 }, linkedCounterId: "chainfist" },
      { id: "sgt-power-fist", name: "Power fist", image: "", sergeantOnly: true, profiles: [{ range: "Melee", attacks: "3", skill: "3+", strength: "8", ap: "-2", damage: "2" }] },
      { id: "sgt-chainfist", name: "Chainfist", image: "", sergeantOnly: true, profiles: [{ range: "Melee", attacks: "3", skill: "4+", strength: "8", ap: "-2", damage: "2", keywords: ["ANTI-VEHICLE 3+"] }] },
      { id: "sgt-power-weapon", name: "Power weapon", image: "", sergeantOnly: true, profiles: [{ range: "Melee", attacks: "4", skill: "3+", strength: "5", ap: "-2", damage: "1" }] },
    ],
    wargearGroups: [["sgt-power-fist", "sgt-chainfist", "sgt-power-weapon"]],
    ledBy: ["ancient-in-terminator-armour","captain-in-terminator-armour","chaplain-in-terminator-armour","librarian-in-terminator-armour"],
  },

  {
    id: "vanguard-veteran-squad-with-jump-packs",
    name: "Vanguard Veteran Squad With Jump Packs",
    faction: "space-marines",
    category: "infantry",
    points: 110,
    defaultWargear: [
      { id: "bolt-pistol", name: "Bolt pistol", image: "" },
      { id: "vanguard-veteran-weapon", name: "Vanguard Veteran weapon", image: "" },
    ],
    wargear: [
      { id: "grav-pistol", name: "Grav-pistol", image: "" },
      { id: "hand-flamer", name: "Hand flamer", image: "" },
      { id: "inferno-pistol", name: "Inferno pistol", image: "" },
      { id: "plasma-pistol", name: "Plasma pistol", image: "/Warhammerimages/SpaceMarine/Space marine plasma pistol.png" },

    ],
    ledBy: ["captain-with-jump-pack","chaplain-with-jump-pack"],
  },

  {
    id: "astraeus",
    name: "Astraeus",
    faction: "space-marines",
    category: "vehicle",
    points: 525,
    defaultWargear: [
      { id: "astraeus-las-ripper", name: "Astraeus las-ripper", image: "" },
      { id: "ironhail-heavy-stubber", name: "Ironhail heavy stubber", image: "" },
      { id: "storm-bolter", name: "Storm bolter", image: "" },
      { id: "twin-heavy-bolter", name: "Twin heavy bolter", image: "" },
      { id: "twin-macro-accelerator-cannon", name: "Twin macro-accelerator cannon", image: "" },
      { id: "armoured-hull", name: "Armoured hull", image: "" },
    ],
    wargear: [
      { id: "plasma-eradicator-standard", name: "Plasma eradicator – standard", image: "" },
      { id: "plasma-eradicator-supercharge", name: "Plasma eradicator – supercharge", image: "" },
      { id: "twin-lascannon", name: "Twin lascannon", image: "" },
    ],
    ledBy: [],
  },

  {
    id: "ballistus-dreadnought",
    name: "Ballistus Dreadnought",
    faction: "space-marines",
    category: "vehicle",
    image: "/Warhammerimages/SpaceMarine/Balistus dreadnought.png",
    points: 150,
    defaultWargear: [
      { id: "ballistus-missile-launcher", name: "Ballistus missile launcher", image: "", profiles: [{ profileName: "frag", range: '48"', attacks: "2D6", skill: "3+", strength: "5", ap: "0", damage: "1", keywords: ["BLAST"] }, { profileName: "krak", range: '48"', attacks: "2", skill: "3+", strength: "10", ap: "-2", damage: "D6" }] },
      { id: "ballistus-lascannon", name: "Ballistus lascannon", image: "", profiles: [{ range: '48"', attacks: "2", skill: "3+", strength: "12", ap: "-3", damage: "D6+1" }] },
      { id: "twin-storm-bolter", name: "Twin storm bolter", image: "", profiles: [{ range: '24"', attacks: "2", skill: "3+", strength: "4", ap: "0", damage: "1", keywords: ["RAPID FIRE 2", "TWIN-LINKED"] }] },
      { id: "armoured-feet", name: "Armoured feet", image: "", profiles: [{ range: "Melee", attacks: "5", skill: "3+", strength: "7", ap: "0", damage: "1" }] },
    ],
    wargear: [],
    abilities: [
      {
        name: "Ballistus Strike",
        description: "Each time this model makes a ranged attack that targets a unit that is not Below Half-strength, you can re-roll the Hit roll.",
      },
    ],
    ledBy: [],
  },

  {
    id: "brutalis-dreadnought-ul",
    name: "Brutalis Dreadnought UL",
    faction: "space-marines",
    category: "vehicle",
    points: 160,
    abilities: [
      {
        name: "Brutalis Charge",
        description: "Each time this model ends a Charge move, select one enemy unit within Engagement Range of it and roll one D6: on a 2-3, that enemy unit suffers D3 mortal wounds; on a 4-5, that enemy unit suffers 3 mortal wounds; on a 6, that enemy unit suffers D3+3 mortal wounds.",
      },
    ],
    defaultWargear: [
      { id: "twin-icarus-ironhail-heavy-stubber", name: "Twin Icarus ironhail heavy stubber", image: "", profiles: [
        { range: '36"', attacks: "6", skill: "3+", strength: "4", ap: "0", damage: "1", keywords: ["ANTI-FLY 2+", "HEAVY"] },
      ]},
    ],
    wargear: [
      { id: "brutalis-bolt-rifles", name: "Brutalis bolt rifles", image: "", profiles: [
        { range: '24"', attacks: "4", skill: "3+", strength: "5", ap: "-1", damage: "2", keywords: ["RAPID FIRE 2"] },
      ]},
      { id: "twin-heavy-bolter", name: "Twin heavy bolter", image: "", profiles: [
        { range: '36"', attacks: "6", skill: "3+", strength: "5", ap: "-1", damage: "2", keywords: ["HEAVY", "SUSTAINED HITS 1"] },
      ]},
      { id: "twin-multi-melta", name: "Twin multi-melta", image: "", profiles: [
        { range: '18"', attacks: "2", skill: "3+", strength: "9", ap: "-4", damage: "D6+2", keywords: ["MELTA 2", "TWIN-LINKED"] },
      ]},
      { id: "brutalis-fists", name: "Brutalis fists", image: "", linkedWargear: ["brutalis-bolt-rifles"], profiles: [
        { range: "Melee", attacks: "4", skill: "3+", strength: "14", ap: "-3", damage: "D6+1", keywords: ["TWIN-LINKED"] },
      ]},
      { id: "brutalis-talons", name: "Brutalis talons", image: "", profiles: [
        { profileName: "strike", range: "Melee", attacks: "6", skill: "3+", strength: "8", ap: "-2", damage: "2" },
        { profileName: "sweep", range: "Melee", attacks: "12", skill: "3+", strength: "6", ap: "-1", damage: "1" },
      ]},
    ],
    wargearGroups: [
      ["brutalis-fists", "brutalis-talons"],
      ["twin-heavy-bolter", "twin-multi-melta"],
    ],
    ledBy: [],
  },

  {
    id: "dreadnought",
    name: "Dreadnought",
    faction: "space-marines",
    category: "vehicle",
    points: 135,
    abilities: [
      {
        name: "Wisdom of the Ancients",
        description: "Aura: While a friendly ADEPTUS ASTARTES INFANTRY unit is within 6\" of this model, each time a model in that unit makes an attack, re-roll a Hit roll of 1.",
      },
    ],
    wargearGroups: [
      ["assault-cannon", "heavy-plasma-cannon", "multi-melta", "twin-lascannon"],
      ["dreadnought-combat-weapon", "missile-launcher", "heavy-flamer"],
    ],
    wargear: [
      { id: "assault-cannon", name: "Assault cannon", image: "", profiles: [
        { range: '24"', attacks: "6", skill: "3+", strength: "6", ap: "0", damage: "1", keywords: ["DEVASTATING WOUNDS"] },
      ]},
      { id: "heavy-plasma-cannon", name: "Heavy plasma cannon", image: "", profiles: [
        { profileName: "Standard", range: '36"', attacks: "D3", skill: "3+", strength: "7", ap: "-2", damage: "2", keywords: ["BLAST"] },
        { profileName: "Supercharge", range: '36"', attacks: "D3", skill: "3+", strength: "8", ap: "-3", damage: "3", keywords: ["BLAST", "HAZARDOUS"] },
      ]},
      { id: "multi-melta", name: "Multi-melta", image: "", profiles: [
        { range: '18"', attacks: "2", skill: "3+", strength: "9", ap: "-4", damage: "D6", keywords: ["MELTA 2"] },
      ]},
      { id: "twin-lascannon", name: "Twin lascannon", image: "", profiles: [
        { range: '48"', attacks: "1", skill: "3+", strength: "12", ap: "-3", damage: "D6+1", keywords: ["TWIN-LINKED"] },
      ]},
      { id: "dreadnought-combat-weapon", name: "Dreadnought combat weapon", image: "", linkedWargear: ["storm-bolter"], profiles: [
        { range: "Melee", attacks: "5", skill: "3+", strength: "12", ap: "-2", damage: "3" },
      ]},
      { id: "missile-launcher", name: "Missile launcher", image: "", linkedWargear: ["close-combat-weapon"], profiles: [
        { profileName: "Frag", range: '48"', attacks: "D6", skill: "3+", strength: "4", ap: "0", damage: "1", keywords: ["BLAST"] },
        { profileName: "Krak", range: '48"', attacks: "1", skill: "3+", strength: "9", ap: "-2", damage: "D6" },
      ]},
      { id: "heavy-flamer", name: "Heavy flamer", image: "", linkedWargear: ["dreadnought-combat-weapon"], profiles: [
        { range: '12"', attacks: "D6", skill: "N/A", strength: "5", ap: "-1", damage: "1", keywords: ["IGNORES COVER", "TORRENT"] },
      ]},
      { id: "storm-bolter", name: "Storm bolter", image: "", profiles: [
        { range: '24"', attacks: "2", skill: "3+", strength: "4", ap: "0", damage: "1", keywords: ["RAPID FIRE 2"] },
      ]},
      { id: "close-combat-weapon", name: "Close combat weapon", image: "", profiles: [
        { range: "Melee", attacks: "5", skill: "3+", strength: "6", ap: "0", damage: "1" },
      ]},
    ],
    ledBy: [],
  },

  {
    id: "firestrike-servo-turrets",
    name: "Firestrike Servo Turrets",
    faction: "space-marines",
    category: "vehicle",
    points: 75,
    defaultWargear: [
      { id: "twin-firestrike-las-talon", name: "Twin Firestrike las-talon", image: "" },
      { id: "close-combat-weapon", name: "Close combat weapon", image: "" },
    ],
    wargear: [
      { id: "twin-firestrike-autocannon", name: "Twin Firestrike autocannon", image: "" },
    ],
    ledBy: [],
  },

  {
    id: "gladiator-lancer",
    name: "Gladiator Lancer",
    faction: "space-marines",
    category: "vehicle",
    points: 160,
    defaultWargear: [
      { id: "lancer-laser-destroyer", name: "Lancer laser destroyer", image: "" },
      { id: "storm-bolter", name: "Storm bolter", image: "" },
      { id: "armoured-hull", name: "Armoured hull", image: "" },
    ],
    wargear: [
      { id: "fragstorm-grenade-launcher", name: "Fragstorm grenade launcher", image: "/Warhammerimages/SpaceMarine/Intercessor-granade.png" },
      { id: "icarus-rocket-pod", name: "Icarus rocket pod", image: "" },
      { id: "ironhail-heavy-stubber", name: "Ironhail heavy stubber", image: "" },
    ],
    ledBy: [],
  },

  {
    id: "gladiator-reaper",
    name: "Gladiator Reaper",
    faction: "space-marines",
    category: "vehicle",
    points: 160,
    defaultWargear: [
      { id: "tempest-bolter", name: "Tempest bolter", image: "" },
      { id: "twin-heavy-onslaught-gatling-cannon", name: "Twin heavy onslaught gatling cannon", image: "" },
      { id: "armoured-hull", name: "Armoured hull", image: "" },
    ],
    wargear: [
      { id: "icarus-rocket-pod", name: "Icarus rocket pod", image: "" },
      { id: "ironhail-heavy-stubber", name: "Ironhail heavy stubber", image: "" },
    ],
    ledBy: [],
  },

  {
    id: "gladiator-valiant",
    name: "Gladiator Valiant",
    faction: "space-marines",
    category: "vehicle",
    points: 160,
    defaultWargear: [
      { id: "multi-melta", name: "Multi-melta", image: "" },
      { id: "twin-las-talon", name: "Twin las-talon", image: "" },
      { id: "armoured-hull", name: "Armoured hull", image: "" },
    ],
    wargear: [
      { id: "icarus-rocket-pod", name: "Icarus rocket pod", image: "" },
      { id: "ironhail-heavy-stubber", name: "Ironhail heavy stubber", image: "" },
    ],
    ledBy: [],
  },

  {
    id: "hammerfall-bunker",
    name: "Hammerfall Bunker",
    faction: "space-marines",
    category: "vehicle",
    points: 175,
    defaultWargear: [
      { id: "hammerfall-heavy-bolter-array", name: "Hammerfall heavy bolter array", image: "" },
      { id: "hammerfall-missile-launcher-superfrag", name: "Hammerfall missile launcher – superfrag", image: "" },
      { id: "hammerfall-missile-launcher-superkrak", name: "Hammerfall missile launcher – superkrak", image: "" },
    ],
    wargear: [
      { id: "hammerfall-heavy-flamer-array", name: "Hammerfall heavy flamer array", image: "" },
    ],
    ledBy: [],
  },

  {
    id: "invictor-tactical-warsuit",
    name: "Invictor Tactical Warsuit",
    faction: "space-marines",
    category: "vehicle",
    points: 125,
    defaultWargear: [
      { id: "fragstorm-grenade-launcher", name: "Fragstorm grenade launcher", image: "/Warhammerimages/SpaceMarine/Intercessor-granade.png" },
      { id: "heavy-bolter", name: "Heavy bolter", image: "" },
      { id: "incendium-cannon", name: "Incendium cannon", image: "" },
      { id: "twin-ironhail-heavy-stubber", name: "Twin ironhail heavy stubber", image: "" },
      { id: "invictor-fist", name: "Invictor fist", image: "" },
    ],
    wargear: [
      { id: "twin-ironhail-autocannon", name: "Twin ironhail autocannon", image: "" },
    ],
    ledBy: [],
  },

  {
    id: "predator-annihilator",
    name: "Predator Annihilator",
    faction: "space-marines",
    category: "vehicle",
    points: 135,
    defaultWargear: [
      { id: "predator-twin-lascannon", name: "Predator twin lascannon", image: "" },
      { id: "lascannon", name: "Lascannon", image: "" },
      { id: "armoured-tracks", name: "Armoured tracks", image: "" },
    ],
    wargear: [
      { id: "heavy-bolter", name: "Heavy bolter", image: "" },
    ],
    ledBy: [],
  },

  {
    id: "predator-destructor",
    name: "Predator Destructor",
    faction: "space-marines",
    category: "vehicle",
    points: 140,
    defaultWargear: [
      { id: "predator-autocannon", name: "Predator autocannon", image: "" },
      { id: "armoured-tracks", name: "Armoured tracks", image: "" },
    ],
    wargear: [
      { id: "heavy-bolter", name: "Heavy bolter", image: "" },
      { id: "lascannon", name: "Lascannon", image: "" },
    ],
    ledBy: [],
  },

  {
    id: "redemptor-dreadnought",
    name: "Redemptor Dreadnought",
    faction: "space-marines",
    category: "vehicle",
    points: 205,
    defaultWargear: [
      { id: "redemptor-fist", name: "Redemptor fist", image: "", profiles: [{ range: "Melee", attacks: "5", skill: "3+", strength: "12", ap: "-2", damage: "3" }] },
    ],
    defaultSelectedWargear: ["heavy-onslaught-gatling-cannon", "heavy-flamer", "twin-fragstorm-grenade-launcher"],
    wargear: [
      { id: "heavy-onslaught-gatling-cannon", name: "Heavy onslaught gatling cannon", image: "", profiles: [{ range: '24"', attacks: "12", skill: "3+", strength: "6", ap: "0", damage: "1", keywords: ["DEVASTATING WOUNDS"] }] },
      { id: "macro-plasma-incinerator", name: "Macro plasma incinerator", image: "", profiles: [{ profileName: "standard", range: '36"', attacks: "D6+1", skill: "3+", strength: "8", ap: "-3", damage: "2", keywords: ["BLAST"] }, { profileName: "supercharge", range: '36"', attacks: "D6+1", skill: "3+", strength: "9", ap: "-4", damage: "3", keywords: ["BLAST", "HAZARDOUS"] }] },
      { id: "heavy-flamer", name: "Heavy flamer", image: "", profiles: [{ range: '12"', attacks: "D6", skill: "N/A", strength: "5", ap: "-1", damage: "1", keywords: ["IGNORES COVER", "TORRENT"] }] },
      { id: "onslaught-gatling-cannon", name: "Onslaught gatling cannon", image: "", profiles: [{ range: '24"', attacks: "8", skill: "3+", strength: "5", ap: "0", damage: "1", keywords: ["DEVASTATING WOUNDS"] }] },
      { id: "twin-fragstorm-grenade-launcher", name: "Twin fragstorm grenade launcher", image: "", profiles: [{ range: '18"', attacks: "D6", skill: "3+", strength: "4", ap: "0", damage: "1", keywords: ["BLAST", "TWIN-LINKED"] }] },
      { id: "twin-storm-bolter", name: "Twin storm bolter", image: "", profiles: [{ range: '24"', attacks: "2", skill: "3+", strength: "4", ap: "0", damage: "1", keywords: ["RAPID FIRE 2", "TWIN-LINKED"] }] },
      { id: "icarus-rocket-pod", name: "Icarus rocket pod", image: "", profiles: [{ range: '24"', attacks: "D3", skill: "3+", strength: "8", ap: "-1", damage: "2", keywords: ["ANTI-FLY 2+"] }] },
    ],
    wargearGroups: [
      ["heavy-onslaught-gatling-cannon", "macro-plasma-incinerator"],
      ["heavy-flamer", "onslaught-gatling-cannon"],
      ["twin-fragstorm-grenade-launcher", "twin-storm-bolter"],
    ],
    abilities: [
      {
        name: "Duty Eternal",
        description: "Each time an attack is allocated to this model, subtract 1 from the Damage characteristic of that attack.",
      },
    ],
    ledBy: [],
  },

  {
    id: "storm-speeder-hailstrike",
    name: "Storm Speeder Hailstrike",
    faction: "space-marines",
    category: "vehicle",
    points: 115,
    defaultWargear: [
      { id: "fragstorm-grenade-launcher", name: "Fragstorm grenade launcher", image: "/Warhammerimages/SpaceMarine/Intercessor-granade.png" },
      { id: "onslaught-gatling-cannon", name: "Onslaught gatling cannon", image: "" },
      { id: "twin-ironhail-heavy-stubber", name: "Twin ironhail heavy stubber", image: "" },
      { id: "close-combat-weapon", name: "Close combat weapon", image: "" },
    ],
    wargear: [],
    ledBy: [],
  },

  {
    id: "storm-speeder-hammerstrike",
    name: "Storm Speeder Hammerstrike",
    faction: "space-marines",
    category: "vehicle",
    points: 125,
    defaultWargear: [
      { id: "hammerstrike-missile-launcher", name: "Hammerstrike missile launcher", image: "" },
      { id: "krakstorm-grenade-launcher", name: "Krakstorm grenade launcher", image: "" },
      { id: "melta-destroyer", name: "Melta destroyer", image: "" },
      { id: "close-combat-weapon", name: "Close combat weapon", image: "" },
    ],
    wargear: [],
    ledBy: [],
  },

  {
    id: "storm-speeder-thunderstrike",
    name: "Storm Speeder Thunderstrike",
    faction: "space-marines",
    category: "vehicle",
    points: 150,
    defaultWargear: [
      { id: "stormfury-missiles", name: "Stormfury missiles", image: "" },
      { id: "thunderstrike-las-talon", name: "Thunderstrike las-talon", image: "" },
      { id: "twin-icarus-rocket-pod", name: "Twin Icarus rocket pod", image: "" },
      { id: "close-combat-weapon", name: "Close combat weapon", image: "" },
    ],
    wargear: [],
    ledBy: [],
  },

  {
    id: "stormhawk-interceptor",
    name: "Stormhawk Interceptor",
    faction: "space-marines",
    category: "vehicle",
    points: 155,
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
    id: "stormtalon-gunship",
    name: "Stormtalon Gunship",
    faction: "space-marines",
    category: "vehicle",
    points: 165,
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
    id: "vindicator",
    name: "Vindicator",
    faction: "space-marines",
    category: "vehicle",
    points: 185,
    defaultWargear: [
      { id: "demolisher-cannon", name: "Demolisher cannon", image: "" },
      { id: "armoured-tracks", name: "Armoured tracks", image: "" },
    ],
    wargear: [
      { id: "hunter-killer-missile", name: "Hunter-killer missile", image: "" },
      { id: "storm-bolter", name: "Storm bolter", image: "" },
    ],
    ledBy: [],
  },

  {
    id: "whirlwind",
    name: "Whirlwind",
    faction: "space-marines",
    category: "vehicle",
    points: 190,
    defaultWargear: [
      { id: "whirlwind-vengeance-launcher", name: "Whirlwind vengeance launcher", image: "" },
      { id: "armoured-tracks", name: "Armoured tracks", image: "" },
    ],
    wargear: [
      { id: "hunter-killer-missile", name: "Hunter-killer missile", image: "" },
      { id: "storm-bolter", name: "Storm bolter", image: "" },
    ],
    ledBy: [],
  },

  {
    id: "drop-pod",
    name: "Drop Pod",
    faction: "space-marines",
    category: "transport",
    points: 70,
    transportCapacity: 12,
    defaultWargear: [
      { id: "storm-bolter", name: "Storm bolter", image: "" },
    ],
    wargear: [
      { id: "deathwind-launcher", name: "Deathwind launcher", image: "" },
    ],
    abilities: [
      {
        name: "Drop Pod Assault",
        description: "This model must start the battle in Reserves and can be set up in the Reinforcements step of your first, second or third Movement phase, regardless of any mission rules. Any units embarked within this model must immediately disembark after it has been set up on the battlefield, and they must be set up more than 9\" away from all enemy models.",
      },
      {
        name: "Combat Disembarkation",
        description: "Each time a unit disembarks from this model after it has been set up on the battlefield, that unit is still eligible to declare a charge this turn.",
      },
      {
        name: "Deployment Complete",
        description: "Once this unit is set up on the battlefield and all units within it have disembarked, until the end of the battle, units cannot embark within this TRANSPORT model.",
      },
      {
        name: "Transport",
        description: "This model has a transport capacity of 12 ADEPTUS ASTARTES INFANTRY models. It cannot transport CENTURION, GRAVIS, JUMP PACK, WULFEN or TERMINATOR models.",
      },
    ],
    ledBy: [],
  },

  {
    id: "impulsor",
    name: "Impulsor",
    faction: "space-marines",
    category: "transport",
    points: 80,
    transportCapacity: 7,
    defaultWargear: [
      { id: "impulsor-ironhail-heavy-stubber", name: "Ironhail heavy stubber", image: "", profiles: [{ range: '36"', attacks: "3", skill: "3+", strength: "4", ap: "0", damage: "1", keywords: ["RAPID FIRE 3"] }] },
      { id: "impulsor-armoured-hull", name: "Armoured hull", image: "", profiles: [{ range: "Melee", attacks: "3", skill: "4+", strength: "6", ap: "0", damage: "1" }] },
    ],
    wargear: [
      { id: "impulsor-storm-bolter", name: "Storm bolter", image: "", profiles: [{ range: '24"', attacks: "2", skill: "3+", strength: "4", ap: "0", damage: "1", keywords: ["RAPID FIRE 2"] }] },
      { id: "fragstorm-grenade-launcher", name: "Fragstorm grenade launcher", image: "", profiles: [{ range: '18"', attacks: "D6", skill: "3+", strength: "4", ap: "0", damage: "1", keywords: ["BLAST"] }] },
      { id: "bellicatus-missile-array", name: "Bellicatus missile array", image: "", profiles: [
        { profileName: "Frag", range: '48"', attacks: "D6", skill: "3+", strength: "4", ap: "0", damage: "1", keywords: ["BLAST"] },
        { profileName: "Icarus", range: '48"', attacks: "D3", skill: "3+", strength: "8", ap: "-1", damage: "2", keywords: ["ANTI-FLY 2+"] },
        { profileName: "Krak", range: '48"', attacks: "1", skill: "3+", strength: "8", ap: "-2", damage: "D6" },
      ] },
      { id: "ironhail-skytalon-array", name: "Ironhail skytalon array", image: "", profiles: [{ range: '36"', attacks: "8", skill: "3+", strength: "4", ap: "0", damage: "1", keywords: ["ANTI-FLY 4+", "SUSTAINED HITS 1"] }] },
      { id: "orbital-comms-array", name: "Orbital comms array", image: "", note: "Orbital Comms Array (Aura): While a friendly ADEPTUS ASTARTES unit is within 6\" of the bearer, each time you target that unit with a Stratagem, roll one D6: on a 5+, you gain 1CP." },
      { id: "shield-dome", name: "Shield dome", image: "", note: "Shield Dome: The bearer has a 5+ invulnerable save." },
    ],
    notes: [
      { id: "impulsor-storm-bolter-note", text: "Storm bolter", checkbox: true, weaponId: "impulsor-storm-bolter", exclusiveWith: "fragstorm-grenade-launcher-note" },
      { id: "fragstorm-grenade-launcher-note", text: "Fragstorm grenade launcher", checkbox: true, weaponId: "fragstorm-grenade-launcher", exclusiveWith: "impulsor-storm-bolter-note" },
      { id: "bellicatus-missile-array-note", text: "Bellicatus missile array", checkbox: true, weaponId: "bellicatus-missile-array", noteGroup: "turret-option" },
      { id: "ironhail-skytalon-array-note", text: "Ironhail skytalon array", checkbox: true, weaponId: "ironhail-skytalon-array", noteGroup: "turret-option" },
      { id: "orbital-comms-array-note", text: "Orbital comms array", checkbox: true, weaponId: "orbital-comms-array", noteGroup: "turret-option" },
      { id: "shield-dome-note", text: "Shield dome", checkbox: true, weaponId: "shield-dome", noteGroup: "turret-option" },
    ],
    noteGroupLimits: { "turret-option": 1 },
    abilities: [
      {
        name: "Assault Vehicle",
        description: "Units can disembark from this TRANSPORT after it has Advanced. Units that do so count as having made a Normal move, and cannot declare a charge that turn.",
      },
    ],
    ledBy: [],
  },

  {
    id: "land-raider",
    name: "Land Raider",
    faction: "space-marines",
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
    id: "land-raider-crusader",
    name: "Land Raider Crusader",
    faction: "space-marines",
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
    id: "land-raider-redeemer",
    name: "Land Raider Redeemer",
    faction: "space-marines",
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
    id: "razorback",
    name: "Razorback",
    faction: "space-marines",
    category: "transport",
    points: 95,
    defaultWargear: [
      { id: "twin-heavy-bolter", name: "Twin heavy bolter", image: "" },
      { id: "armoured-tracks", name: "Armoured tracks", image: "" },
    ],
    wargear: [
      { id: "hunter-killer-missile", name: "Hunter-killer missile", image: "" },
      { id: "storm-bolter", name: "Storm bolter", image: "" },
      { id: "twin-lascannon", name: "Twin lascannon", image: "" },
    ],
    ledBy: [],
  },

  {
    id: "repulsor",
    name: "Repulsor",
    faction: "space-marines",
    category: "transport",
    points: 180,
    defaultWargear: [
      { id: "heavy-onslaught-gatling-cannon", name: "Heavy onslaught gatling cannon", image: "" },
      { id: "hunter-slayer-missile", name: "Hunter-slayer missile", image: "" },
      { id: "repulsor-defensive-array", name: "Repulsor defensive array", image: "" },
      { id: "twin-heavy-bolter", name: "Twin heavy bolter", image: "" },
      { id: "armoured-hull", name: "Armoured hull", image: "" },
    ],
    wargear: [
      { id: "las-talon", name: "Las-talon", image: "" },
      { id: "twin-lascannon", name: "Twin lascannon", image: "" },
    ],
    ledBy: [],
  },

  {
    id: "repulsor-executioner",
    name: "Repulsor Executioner",
    faction: "space-marines",
    category: "vehicle",
    points: 230,
    transportCapacity: 7,
    defaultWargear: [
      { id: "heavy-onslaught-gatling-cannon", name: "Heavy onslaught gatling cannon", image: "", profiles: [{ range: '24"', attacks: "12", skill: "3+", strength: "6", ap: "0", damage: "1", keywords: ["DEVASTATING WOUNDS"] }] },
      { id: "repulsor-executioner-defensive-array", name: "Repulsor Executioner defensive array", image: "", profiles: [{ range: '24"', attacks: "10", skill: "3+", strength: "4", ap: "0", damage: "1" }] },
      { id: "twin-heavy-bolter", name: "Twin heavy bolter", image: "", profiles: [{ range: '36"', attacks: "3", skill: "3+", strength: "5", ap: "-1", damage: "2", keywords: ["SUSTAINED HITS 1", "TWIN-LINKED"] }] },
      { id: "twin-icarus-ironhail-heavy-stubber", name: "Twin Icarus ironhail heavy stubber", image: "", profiles: [{ range: '36"', attacks: "3", skill: "3+", strength: "4", ap: "0", damage: "1", keywords: ["ANTI-FLY 4+", "RAPID FIRE 3", "TWIN-LINKED"] }] },
      { id: "armoured-hull", name: "Armoured hull", image: "", profiles: [{ range: "Melee", attacks: "6", skill: "4+", strength: "8", ap: "0", damage: "1" }] },
    ],
    wargear: [
      { id: "heavy-laser-destroyer", name: "Heavy laser destroyer", image: "", profiles: [{ range: '72"', attacks: "2", skill: "3+", strength: "16", ap: "-4", damage: "D6+4", keywords: ["HEAVY"] }] },
      { id: "macro-plasma-incinerator", name: "Macro plasma incinerator", image: "", profiles: [
        { profileName: "Standard", range: '36"', attacks: "D6+1", skill: "3+", strength: "8", ap: "-3", damage: "2", keywords: ["BLAST"] },
        { profileName: "Supercharge", range: '36"', attacks: "D6+1", skill: "3+", strength: "9", ap: "-4", damage: "3", keywords: ["BLAST", "HAZARDOUS"] },
      ] },
      { id: "ironhail-heavy-stubber", name: "Ironhail heavy stubber", image: "", profiles: [{ range: '36"', attacks: "3", skill: "3+", strength: "4", ap: "0", damage: "1", keywords: ["RAPID FIRE 3"] }] },
      { id: "icarus-rocket-pod", name: "Icarus rocket pod", image: "", profiles: [{ range: '24"', attacks: "D3", skill: "3+", strength: "8", ap: "-1", damage: "2", keywords: ["ANTI-FLY 2+"] }] },
    ],
    notes: [
      { id: "heavy-laser-destroyer-note", text: "Heavy laser destroyer", checkbox: true, weaponId: "heavy-laser-destroyer", exclusiveWith: "macro-plasma-incinerator-note", image: "/Warhammerimages/SpaceMarine/heavy-laser-destroyer.png" },
      { id: "macro-plasma-incinerator-note", text: "Macro plasma incinerator", checkbox: true, weaponId: "macro-plasma-incinerator", exclusiveWith: "heavy-laser-destroyer-note", image: "/Warhammerimages/SpaceMarine/macro-plasma-incinerator.png" },
      { id: "ironhail-heavy-stubber-note", text: "Ironhail heavy stubber", checkbox: true, weaponId: "ironhail-heavy-stubber", image: "/Warhammerimages/SpaceMarine/ironhail-heavy-stubber.png" },
      { id: "icarus-rocket-pod-note", text: "Icarus rocket pod", checkbox: true, weaponId: "icarus-rocket-pod", image: "/Warhammerimages/SpaceMarine/icarus-rocket-pod.png" },
    ],
    abilities: [
      { name: "Executioner", description: "Each time this model makes an attack that targets a unit that is Below Half-strength, add 1 to the Hit roll." },
      { name: "DAMAGED: 1-5 WOUNDS REMAINING", description: "While this model has 1-5 wounds remaining, each time this model makes an attack, subtract 1 from the Hit roll." },
    ],
    ledBy: [],
  },

  {
    id: "rhino",
    name: "Rhino",
    faction: "space-marines",
    category: "transport",
    image: "/Warhammerimages/SpaceMarine/Rhino.png",
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
    id: "stormraven-gunship",
    name: "Stormraven Gunship",
    faction: "space-marines",
    category: "transport",
    points: 280,
    abilities: [
      {
        name: "Armoured Resilience",
        description: "Each time an attack is allocated to this model, subtract 1 from the Damage characteristic of that attack.",
      },
      {
        name: "Damaged: 1-5 Wounds Remaining",
        description: "While this model has 1-5 wounds remaining, each time this model makes an attack, subtract 1 from the Hit roll.",
      },
    ],
    defaultWargear: [
      { id: "srg-stormstrike-missile-launcher", name: "Stormstrike missile launcher", image: "", profiles: [{ range: '48"', attacks: "1", skill: "3+", strength: "10", ap: "-2", damage: "3" }] },
      { id: "srg-armoured-hull", name: "Armoured hull", image: "", profiles: [{ range: "Melee", attacks: "6", skill: "4+", strength: "8", ap: "0", damage: "1" }] },
    ],
    wargear: [
      { id: "srg-twin-assault-cannon", name: "Twin assault cannon", image: "", profiles: [{ range: '24"', attacks: "6", skill: "3+", strength: "6", ap: "0", damage: "1", keywords: ["DEVASTATING WOUNDS", "TWIN-LINKED"] }] },
      {
        id: "srg-twin-heavy-plasma-cannon",
        name: "Twin heavy plasma cannon",
        image: "",
        profiles: [
          { profileName: "Standard", range: '36"', attacks: "D3", skill: "3+", strength: "7", ap: "-2", damage: "2", keywords: ["BLAST", "TWIN-LINKED"] },
          { profileName: "Supercharge", range: '36"', attacks: "D3", skill: "3+", strength: "8", ap: "-3", damage: "3", keywords: ["BLAST", "HAZARDOUS", "TWIN-LINKED"] },
        ],
      },
      { id: "srg-twin-lascannon", name: "Twin lascannon", image: "", profiles: [{ range: '48"', attacks: "1", skill: "3+", strength: "12", ap: "-3", damage: "D6+1", keywords: ["TWIN-LINKED"] }] },
      {
        id: "srg-typhoon-missile-launcher",
        name: "Typhoon missile launcher",
        image: "",
        profiles: [
          { profileName: "Frag", range: '48"', attacks: "2D6", skill: "3+", strength: "4", ap: "0", damage: "1", keywords: ["BLAST"] },
          { profileName: "Krak", range: '48"', attacks: "2", skill: "3+", strength: "9", ap: "-2", damage: "D6" },
        ],
      },
      { id: "srg-twin-heavy-bolter", name: "Twin heavy bolter", image: "", profiles: [{ range: '36"', attacks: "3", skill: "3+", strength: "5", ap: "-1", damage: "2", keywords: ["SUSTAINED HITS 1", "TWIN-LINKED"] }] },
      { id: "srg-twin-multi-melta", name: "Twin multi-melta", image: "", profiles: [{ range: '18"', attacks: "2", skill: "3+", strength: "9", ap: "-4", damage: "D6", keywords: ["MELTA 2", "TWIN-LINKED"] }] },
      { id: "srg-hurricane-bolter", name: "Hurricane bolter", image: "", profiles: [{ range: '24"', attacks: "6", skill: "3+", strength: "4", ap: "0", damage: "1", keywords: ["RAPID FIRE 6", "TWIN-LINKED"] }] },
    ],
    notes: [
      {
        id: "srg-twin-assault-cannon-note",
        text: "Twin assault cannon",
        checkbox: true,
        weaponId: "srg-twin-assault-cannon",
        noteGroup: "srg-turret",
        image: "",
      },
      {
        id: "srg-twin-heavy-plasma-cannon-note",
        text: "Twin heavy plasma cannon",
        checkbox: true,
        weaponId: "srg-twin-heavy-plasma-cannon",
        noteGroup: "srg-turret",
        image: "",
      },
      {
        id: "srg-twin-lascannon-note",
        text: "Twin lascannon",
        checkbox: true,
        weaponId: "srg-twin-lascannon",
        noteGroup: "srg-turret",
        image: "",
      },
      {
        id: "srg-typhoon-note",
        text: "Typhoon missile launcher",
        checkbox: true,
        weaponId: "srg-typhoon-missile-launcher",
        noteGroup: "srg-wing",
        image: "",
      },
      {
        id: "srg-twin-heavy-bolter-note",
        text: "Twin heavy bolter",
        checkbox: true,
        weaponId: "srg-twin-heavy-bolter",
        noteGroup: "srg-wing",
        image: "",
      },
      {
        id: "srg-twin-multi-melta-note",
        text: "Twin multi-melta",
        checkbox: true,
        weaponId: "srg-twin-multi-melta",
        noteGroup: "srg-wing",
        image: "",
      },
      {
        id: "srg-hurricane-bolter-note",
        text: "Hurricane bolter",
        checkbox: true,
        weaponId: "srg-hurricane-bolter",
        image: "",
      },
    ],
    noteGroupLimits: { "srg-turret": 1, "srg-wing": 1 },
    transportCapacity: 12,
    dreadnoughtTransportCapacity: 1,
    ledBy: [],
  },

  {
    id: "thunderhawk-gunship",
    name: "Thunderhawk Gunship",
    faction: "space-marines",
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

];
