import type { Character } from "../../../src/types/warhammer";

export const astraMilitarumCharacters: Character[] = [

  {
    id: "cadian-command-squad",
    name: "Cadian Command Squad",
    faction: "astra-militarum",
    image: "",
    points: 65,
    canAttachTo: ["cadian-shock-troops"],
    allowsSecondCharacter: true,
    secondCharacterOptions: ["ogryn-bodyguard", "nork-deddog"],
    abilities: [
      {
        name: "Orders",
        description: "This unit's OFFICER can issue 1 Order to a REGIMENT unit.",
      },
      {
        name: "Cadia Stands!",
        description: "While this unit contains an OFFICER, each time a ranged attack targets this unit, if this unit is within range of an objective marker you control, models in this unit have the Benefit of Cover against that attack.",
      },
      {
        name: "Master Vox",
        description: "Each time the OFFICER in the bearer's unit issues an Order, it can issue it to an eligible unit up to 24\" away.",
      },
      {
        name: "Medi-pack",
        description: "At the start of your Command phase, if the bearer's unit is below its Starting Strength, you can return up to D3 destroyed PLATOON models (excluding CHARACTERS) to this unit.",
      },
    ],
    defaultWargear: [
      { id: "ccs-laspistol", name: "Laspistol", image: "", profiles: [{ range: '12"', attacks: "1", skill: "4+", strength: "3", ap: "0", damage: "1", keywords: ["PISTOL"] }] },
      { id: "ccs-chainsword", name: "Chainsword", image: "", profiles: [{ range: "Melee", attacks: "4", skill: "4+", strength: "3", ap: "0", damage: "1" }] },
      { id: "ccs-lasgun", name: "Lasgun", image: "", profiles: [{ range: '24"', attacks: "1", skill: "4+", strength: "3", ap: "0", damage: "1", keywords: ["RAPID FIRE 1"] }] },
      { id: "ccs-close-combat-weapon", name: "Close combat weapon", image: "", profiles: [{ range: "Melee", attacks: "2", skill: "4+", strength: "3", ap: "0", damage: "1" }] },
    ],
    wargear: [
      // Veteran — Regimental Standard or Special Weapon (mutually exclusive)
      { id: "ccs-regimental-standard", name: "Regimental standard", image: "", note: "Add 1 to the Objective Control characteristic of models in the bearer's unit." },
      { id: "ccs-flamer-special", name: "Flamer", image: "", profiles: [{ range: '12"', attacks: "D6", skill: "N/A", strength: "4", ap: "0", damage: "1", keywords: ["IGNORES COVER", "TORRENT"] }] },
      { id: "ccs-grenade-launcher-special", name: "Grenade launcher", image: "", profiles: [
        { profileName: "Frag", range: '24"', attacks: "D3", skill: "4+", strength: "4", ap: "0", damage: "1", keywords: ["BLAST"] },
        { profileName: "Krak", range: '24"', attacks: "1", skill: "4+", strength: "9", ap: "-2", damage: "D3" },
      ]},
      { id: "ccs-meltagun-special", name: "Meltagun", image: "", profiles: [{ range: '12"', attacks: "1", skill: "4+", strength: "9", ap: "-4", damage: "D6", keywords: ["MELTA 2"] }] },
      { id: "ccs-plasma-gun-special", name: "Plasma gun", image: "", profiles: [
        { profileName: "Standard", range: '24"', attacks: "1", skill: "4+", strength: "7", ap: "-2", damage: "1", keywords: ["RAPID FIRE 1"] },
        { profileName: "Supercharge", range: '24"', attacks: "1", skill: "4+", strength: "8", ap: "-3", damage: "2", keywords: ["HAZARDOUS", "RAPID FIRE 1"] },
      ]},
      // Veteran — Pistol (replaces laspistol)
      { id: "ccs-bolt-pistol-vet", name: "Bolt pistol", image: "", profiles: [{ range: '12"', attacks: "1", skill: "4+", strength: "4", ap: "0", damage: "1", keywords: ["PISTOL"] }] },
      { id: "ccs-plasma-pistol-vet", name: "Plasma pistol", image: "", profiles: [
        { profileName: "Standard", range: '12"', attacks: "1", skill: "4+", strength: "7", ap: "-2", damage: "1", keywords: ["PISTOL"] },
        { profileName: "Supercharge", range: '12"', attacks: "1", skill: "4+", strength: "8", ap: "-3", damage: "2", keywords: ["HAZARDOUS", "PISTOL"] },
      ]},
      // Commander — Pistol (replaces laspistol)
      { id: "ccs-bolt-pistol-cmd", name: "Bolt pistol", image: "", profiles: [{ range: '12"', attacks: "1", skill: "4+", strength: "4", ap: "0", damage: "1", keywords: ["PISTOL"] }] },
      { id: "ccs-plasma-pistol-cmd", name: "Plasma pistol", image: "", profiles: [
        { profileName: "Standard", range: '12"', attacks: "1", skill: "4+", strength: "7", ap: "-2", damage: "1", keywords: ["PISTOL"] },
        { profileName: "Supercharge", range: '12"', attacks: "1", skill: "4+", strength: "8", ap: "-3", damage: "2", keywords: ["HAZARDOUS", "PISTOL"] },
      ]},
      // Veteran — Melee (replaces chainsword; special weapons auto-add CCW)
      { id: "ccs-ccw-extra", name: "Close combat weapon", image: "", profiles: [{ range: "Melee", attacks: "2", skill: "4+", strength: "3", ap: "0", damage: "1" }] },
      { id: "ccs-flamer-melee", name: "Flamer", image: "", linkedWargear: ["ccs-ccw-extra"], profiles: [{ range: '12"', attacks: "D6", skill: "N/A", strength: "4", ap: "0", damage: "1", keywords: ["IGNORES COVER", "TORRENT"] }] },
      { id: "ccs-grenade-launcher-melee", name: "Grenade launcher", image: "", linkedWargear: ["ccs-ccw-extra"], profiles: [
        { profileName: "Frag", range: '24"', attacks: "D3", skill: "4+", strength: "4", ap: "0", damage: "1", keywords: ["BLAST"] },
        { profileName: "Krak", range: '24"', attacks: "1", skill: "4+", strength: "9", ap: "-2", damage: "D3" },
      ]},
      { id: "ccs-meltagun-melee", name: "Meltagun", image: "", linkedWargear: ["ccs-ccw-extra"], profiles: [{ range: '12"', attacks: "1", skill: "4+", strength: "9", ap: "-4", damage: "D6", keywords: ["MELTA 2"] }] },
      { id: "ccs-plasma-gun-melee", name: "Plasma gun", image: "", linkedWargear: ["ccs-ccw-extra"], profiles: [
        { profileName: "Standard", range: '24"', attacks: "1", skill: "4+", strength: "7", ap: "-2", damage: "1", keywords: ["RAPID FIRE 1"] },
        { profileName: "Supercharge", range: '24"', attacks: "1", skill: "4+", strength: "8", ap: "-3", damage: "2", keywords: ["HAZARDOUS", "RAPID FIRE 1"] },
      ]},
      { id: "ccs-power-fist-vet", name: "Power fist", image: "", profiles: [{ range: "Melee", attacks: "3", skill: "4+", strength: "6", ap: "-2", damage: "2" }] },
      { id: "ccs-power-weapon-vet", name: "Power weapon", image: "", profiles: [{ range: "Melee", attacks: "3", skill: "4+", strength: "4", ap: "-2", damage: "1" }] },
      // Commander — Melee (replaces chainsword)
      { id: "ccs-power-fist-cmd", name: "Power fist", image: "", profiles: [{ range: "Melee", attacks: "3", skill: "4+", strength: "6", ap: "-2", damage: "2" }] },
      { id: "ccs-power-weapon-cmd", name: "Power weapon", image: "", profiles: [{ range: "Melee", attacks: "3", skill: "4+", strength: "4", ap: "-2", damage: "1" }] },
    ],
    wargearGroups: [
      ["ccs-regimental-standard", "ccs-flamer-special", "ccs-grenade-launcher-special", "ccs-meltagun-special", "ccs-plasma-gun-special"],
      ["ccs-bolt-pistol-vet", "ccs-plasma-pistol-vet"],
      ["ccs-bolt-pistol-cmd", "ccs-plasma-pistol-cmd"],
      ["ccs-flamer-melee", "ccs-grenade-launcher-melee", "ccs-meltagun-melee", "ccs-plasma-gun-melee", "ccs-power-fist-vet", "ccs-power-weapon-vet"],
      ["ccs-power-fist-cmd", "ccs-power-weapon-cmd"],
    ],
    wargearSections: [
      { label: "Veteran — Regimental Standard / Special Weapon", ids: ["ccs-regimental-standard", "ccs-flamer-special", "ccs-grenade-launcher-special", "ccs-meltagun-special", "ccs-plasma-gun-special"] },
      { label: "Veteran — Pistol", ids: ["ccs-bolt-pistol-vet", "ccs-plasma-pistol-vet"] },
      { label: "Commander — Pistol", ids: ["ccs-bolt-pistol-cmd", "ccs-plasma-pistol-cmd"] },
      { label: "Veteran — Melee", ids: ["ccs-flamer-melee", "ccs-grenade-launcher-melee", "ccs-meltagun-melee", "ccs-plasma-gun-melee", "ccs-power-fist-vet", "ccs-power-weapon-vet"] },
      { label: "Commander — Melee", ids: ["ccs-power-fist-cmd", "ccs-power-weapon-cmd"] },
    ],
  },

  {
    id: "catachan-command-squad",
    name: "Catachan Command Squad",
    faction: "astra-militarum",
    image: "",
    points: 65,
    canAttachTo: ["catachan-jungle-fighters"],
    allowsSecondCharacter: true,
    secondCharacterOptions: ["ogryn-bodyguard", "nork-deddog"],
    abilities: [
      {
        name: "Leader",
        description: "This model can be attached to the following units: Catachan Jungle Fighters.",
      },
      {
        name: "Orders",
        description: "This unit's OFFICER can issue 1 Order to a REGIMENT unit.",
      },
      {
        name: "Gung-ho Command",
        description: "While this unit contains an OFFICER, ranged weapons equipped by models in this unit have the [ASSAULT] ability.",
      },
    ],
    defaultWargear: [
      { id: "ccc-laspistol", name: "Laspistol", image: "", profiles: [{ range: '12"', attacks: "1", skill: "4+", strength: "3", ap: "0", damage: "1", keywords: ["PISTOL"] }] },
      { id: "ccc-close-combat-weapon", name: "Close combat weapon", image: "", profiles: [{ range: "Melee", attacks: "2", skill: "4+", strength: "3", ap: "0", damage: "1" }] },
      { id: "ccc-lasgun", name: "Lasgun", image: "", profiles: [{ range: '24"', attacks: "1", skill: "4+", strength: "3", ap: "0", damage: "1", keywords: ["RAPID FIRE 1"] }] },
    ],
    wargear: [
      { id: "ccc-flamer", name: "Flamer", image: "", profiles: [{ range: '12"', attacks: "D6", skill: "N/A", strength: "4", ap: "0", damage: "1", keywords: ["IGNORES COVER", "TORRENT"] }] },
      { id: "ccc-grenade-launcher", name: "Grenade launcher", image: "", profiles: [
        { profileName: "Frag", range: '24"', attacks: "D3", skill: "4+", strength: "4", ap: "0", damage: "1", keywords: ["BLAST"] },
        { profileName: "Krak", range: '24"', attacks: "1", skill: "4+", strength: "9", ap: "-2", damage: "D3" },
      ]},
      { id: "ccc-heavy-flamer", name: "Heavy flamer", image: "", profiles: [{ range: '12"', attacks: "D6", skill: "N/A", strength: "5", ap: "-1", damage: "1", keywords: ["IGNORES COVER", "TORRENT"] }] },
      { id: "ccc-meltagun", name: "Meltagun", image: "", profiles: [{ range: '12"', attacks: "1", skill: "4+", strength: "9", ap: "-4", damage: "D6", keywords: ["MELTA 2"] }] },
      { id: "ccc-plasma-gun", name: "Plasma gun", image: "", profiles: [
        { profileName: "Standard", range: '24"', attacks: "1", skill: "4+", strength: "7", ap: "-2", damage: "1", keywords: ["RAPID FIRE 1"] },
        { profileName: "Supercharge", range: '24"', attacks: "1", skill: "4+", strength: "8", ap: "-3", damage: "2", keywords: ["HAZARDOUS", "RAPID FIRE 1"] },
      ]},
      { id: "ccc-sniper-rifle", name: "Sniper rifle", image: "", profiles: [{ range: '36"', attacks: "1", skill: "4+", strength: "4", ap: "-2", damage: "2", keywords: ["HEAVY", "PRECISION"] }] },
      { id: "ccc-medi-pack", name: "Medi-pack", image: "", note: "At the start of your Command phase, if the bearer's unit is below its Starting Strength, you can return up to D3 destroyed PLATOON models (excluding CHARACTERS) to this unit." },
      { id: "ccc-master-vox", name: "Master vox", image: "", note: "Each time the OFFICER in the bearer's unit issues an Order, it can issue it to an eligible unit up to 24\" away." },
      { id: "ccc-regimental-standard", name: "Regimental standard", image: "", note: "Add 1 to the Objective Control characteristic of models in the bearer's unit." },
      { id: "ccc-cmd-laspistol", name: "Laspistol", image: "", profiles: [{ range: '12"', attacks: "1", skill: "4+", strength: "3", ap: "0", damage: "1", keywords: ["PISTOL"] }] },
      { id: "ccc-bolt-pistol", name: "Bolt pistol", image: "", profiles: [{ range: '12"', attacks: "1", skill: "4+", strength: "4", ap: "0", damage: "1", keywords: ["PISTOL"] }] },
      { id: "ccc-plasma-pistol", name: "Plasma pistol", image: "", profiles: [
        { profileName: "Standard", range: '12"', attacks: "1", skill: "4+", strength: "7", ap: "-2", damage: "1", keywords: ["PISTOL"] },
        { profileName: "Supercharge", range: '12"', attacks: "1", skill: "4+", strength: "8", ap: "-3", damage: "2", keywords: ["HAZARDOUS", "PISTOL"] },
      ]},
      { id: "ccc-boltgun", name: "Boltgun", image: "", profiles: [{ range: '24"', attacks: "1", skill: "4+", strength: "4", ap: "0", damage: "1", keywords: ["RAPID FIRE 1"] }] },
      { id: "ccc-chainsword", name: "Chainsword", image: "", profiles: [{ range: "Melee", attacks: "4", skill: "4+", strength: "3", ap: "0", damage: "1" }] },
      { id: "ccc-power-fist", name: "Power fist", image: "", profiles: [{ range: "Melee", attacks: "3", skill: "4+", strength: "6", ap: "-2", damage: "2" }] },
      { id: "ccc-power-weapon", name: "Power weapon", image: "", profiles: [{ range: "Melee", attacks: "3", skill: "4+", strength: "4", ap: "-2", damage: "1" }] },
    ],
    wargearGroups: [
      ["ccc-flamer", "ccc-grenade-launcher", "ccc-heavy-flamer", "ccc-meltagun", "ccc-plasma-gun", "ccc-sniper-rifle"],
      ["ccc-cmd-laspistol", "ccc-bolt-pistol", "ccc-plasma-pistol"],
      ["ccc-boltgun", "ccc-chainsword", "ccc-power-fist", "ccc-power-weapon"],
    ],
    wargearSections: [
      { label: "Veteran — Special Weapon / Accessory", ids: ["ccc-flamer", "ccc-grenade-launcher", "ccc-heavy-flamer", "ccc-meltagun", "ccc-plasma-gun", "ccc-sniper-rifle", "ccc-medi-pack", "ccc-master-vox", "ccc-regimental-standard"] },
      { label: "Commander — Pistol", ids: ["ccc-cmd-laspistol", "ccc-bolt-pistol", "ccc-plasma-pistol"] },
      { label: "Commander — Extra Weapon", ids: ["ccc-boltgun", "ccc-chainsword", "ccc-power-fist", "ccc-power-weapon"] },
    ],
  },

  {
    id: "krieg-command-squad",
    name: "Krieg Command Squad",
    faction: "astra-militarum",
    image: "/Warhammerimages/Astra militarium/Krieg command squad.png",
    points: 65,
    canAttachTo: ["death-korps-of-krieg", "krieg-combat-engineers"],
    allowsSecondCharacter: true,
    secondCharacterOptions: ["ogryn-bodyguard", "nork-deddog"],
    abilities: [
      {
        name: "Grim Determination",
        description: "While this unit contains an OFFICER, you can target this unit with Stratagems even while it is Battle-shocked and Orders issued to this unit do not cease to affect this unit if it becomes Battle-shocked.",
      },
      {
        name: "Master Vox",
        description: "Each time the OFFICER in the bearer's unit issues an Order, it can issue it to an eligible unit up to 24\" away.",
      },
      {
        name: "Alchemyk Counteragents",
        description: "The bearer's unit has the Feel No Pain 6+ ability against mortal wounds.",
      },
      {
        name: "Regimental Standard",
        description: "Add 1 to the Objective Control characteristic of models in the bearer's unit.",
      },
      {
        name: "Servo-scribes",
        description: "Once per battle, when issuing an Order, the Lord Commissar can issue one additional Order.\n\nDesigner's Note: Place a Servo-scribes token next to the unit, removing it when this ability has been used.",
      },
    ],
    defaultWargear: [
      { id: "laspistol", name: "Laspistol", image: "", profiles: [{ range: '12"', attacks: "1", skill: "4+", strength: "3", ap: "0", damage: "1", keywords: ["PISTOL"] }] },
      { id: "chainsword", name: "Chainsword", image: "", profiles: [{ range: "Melee", attacks: "4", skill: "4+", strength: "3", ap: "0", damage: "1" }] },
      { id: "close-combat-weapon", name: "Close combat weapon", image: "", profiles: [{ range: "Melee", attacks: "2", skill: "4+", strength: "3", ap: "0", damage: "1" }] },
      { id: "lasgun", name: "Lasgun", image: "", profiles: [{ range: '24"', attacks: "1", skill: "4+", strength: "3", ap: "0", damage: "1", keywords: ["RAPID FIRE 1"] }] },
      { id: "boltgun", name: "Boltgun", image: "", profiles: [{ range: '24"', attacks: "1", skill: "4+", strength: "4", ap: "0", damage: "1", keywords: ["RAPID FIRE 1"] }] },
    ],
    wargear: [
      { id: "flamer", name: "Flamer", image: "", profiles: [{ range: '12"', attacks: "D6", skill: "N/A", strength: "4", ap: "0", damage: "1", keywords: ["IGNORES COVER", "TORRENT"] }] },
      {
        id: "grenade-launcher",
        name: "Grenade launcher",
        image: "",
        profiles: [
          { profileName: "Frag", range: '24"', attacks: "D3", skill: "4+", strength: "4", ap: "0", damage: "1", keywords: ["BLAST"] },
          { profileName: "Krak", range: '24"', attacks: "1", skill: "4+", strength: "9", ap: "-2", damage: "D3" },
        ],
      },
      { id: "meltagun", name: "Meltagun", image: "", profiles: [{ range: '12"', attacks: "1", skill: "4+", strength: "9", ap: "-4", damage: "D6", keywords: ["MELTA 2"] }] },
      {
        id: "plasma-gun",
        name: "Plasma gun",
        image: "/Warhammerimages/Astra militarium/KCS plasma.png",
        profiles: [
          { profileName: "Standard", range: '24"', attacks: "1", skill: "4+", strength: "7", ap: "-2", damage: "1", keywords: ["RAPID FIRE 1"] },
          { profileName: "Supercharge", range: '24"', attacks: "1", skill: "4+", strength: "8", ap: "-3", damage: "2", keywords: ["HAZARDOUS", "RAPID FIRE 1"] },
        ],
      },
      { id: "power-weapon-lord", name: "Power weapon", image: "/Warhammerimages/Astra militarium/Kreig power sword.png", profiles: [{ range: "Melee", attacks: "3", skill: "4+", strength: "4", ap: "-2", damage: "1" }] },
      { id: "power-fist", name: "Power fist", image: "", profiles: [{ range: "Melee", attacks: "3", skill: "4+", strength: "6", ap: "-2", damage: "2" }] },
      {
        id: "plasma-pistol-lord",
        name: "Plasma pistol",
        image: "/Warhammerimages/Astra militarium/Kreig plasma pistol.png",
        profiles: [
          { profileName: "Standard", range: '12"', attacks: "1", skill: "4+", strength: "7", ap: "-2", damage: "1", keywords: ["PISTOL"] },
          { profileName: "Supercharge", range: '12"', attacks: "1", skill: "4+", strength: "8", ap: "-3", damage: "2", keywords: ["HAZARDOUS", "PISTOL"] },
        ],
      },
      { id: "trench-club", name: "Trench club", image: "", profiles: [{ range: "Melee", attacks: "3", skill: "4+", strength: "4", ap: "0", damage: "1" }] },
      { id: "power-weapon-vet", name: "Power weapon", image: "/Warhammerimages/Astra militarium/Kreig power sword.png", profiles: [{ range: "Melee", attacks: "3", skill: "4+", strength: "4", ap: "-2", damage: "1" }] },
      { id: "bolt-pistol", name: "Bolt pistol", image: "/Warhammerimages/Astra militarium/Kreig bolt pistol.png", profiles: [{ range: '12"', attacks: "1", skill: "4+", strength: "4", ap: "0", damage: "1", keywords: ["PISTOL"] }] },
      {
        id: "plasma-pistol",
        name: "Plasma pistol",
        image: "/Warhammerimages/Astra militarium/Kreig plasma pistol.png",
        profiles: [
          { profileName: "Standard", range: '12"', attacks: "1", skill: "4+", strength: "7", ap: "-2", damage: "1", keywords: ["PISTOL"] },
          { profileName: "Supercharge", range: '12"', attacks: "1", skill: "4+", strength: "8", ap: "-3", damage: "2", keywords: ["HAZARDOUS", "PISTOL"] },
        ],
      },
    ],
    wargearGroups: [
      ["flamer", "grenade-launcher", "meltagun", "plasma-gun"],
      ["power-weapon-lord", "power-fist"],
      ["trench-club", "power-weapon-vet"],
      ["bolt-pistol", "plasma-pistol"],
    ],
    wargearSections: [
      { label: "Veteran Guardsman — Special Weapon", ids: ["flamer", "grenade-launcher", "meltagun", "plasma-gun"] },
      { label: "Lord Commissar", ids: ["power-weapon-lord", "power-fist", "plasma-pistol-lord"] },
      { label: "Veteran Guardsman — Equipment", ids: ["trench-club", "power-weapon-vet", "bolt-pistol", "plasma-pistol"] },
    ],
  },

  {
    id: "militarum-tempestus-command-squad",
    name: "Militarum Tempestus Command Squad",
    faction: "astra-militarum",
    image: "",
    points: 85,
    canAttachTo: ["tempestus-scions"],
    allowsSecondCharacter: true,
    secondCharacterOptions: ["ogryn-bodyguard", "nork-deddog"],
    defaultWargear: [
      { id: "mtcs-bolt-pistol-default", name: "Bolt pistol", image: "", profiles: [{ range: '12"', attacks: "1", skill: "3+", strength: "4", ap: "0", damage: "1", keywords: ["PISTOL"] }] },
      { id: "mtcs-tempestus-dagger", name: "Tempestus dagger", image: "", profiles: [{ range: "Melee", attacks: "4", skill: "3+", strength: "3", ap: "0", damage: "1" }] },
      { id: "mtcs-hot-shot-lasgun-default", name: "Hot-shot lasgun", image: "", profiles: [{ range: '24"', attacks: "1", skill: "3+", strength: "3", ap: "-1", damage: "1", keywords: ["RAPID FIRE 1"] }] },
    ],
    wargear: [
      { id: "mtcs-flamer", name: "Flamer", image: "", profiles: [{ range: '12"', attacks: "D6", skill: "N/A", strength: "4", ap: "0", damage: "1", keywords: ["IGNORES COVER", "TORRENT"] }] },
      { id: "mtcs-grenade-launcher", name: "Grenade launcher", image: "", profiles: [
        { profileName: "Frag", range: '24"', attacks: "D3", skill: "3+", strength: "4", ap: "0", damage: "1", keywords: ["BLAST"] },
        { profileName: "Krak", range: '24"', attacks: "1", skill: "3+", strength: "9", ap: "-2", damage: "D3" },
      ]},
      { id: "mtcs-hot-shot-volley-gun", name: "Hot-shot volley gun", image: "", profiles: [{ range: '30"', attacks: "2", skill: "3+", strength: "4", ap: "-1", damage: "1", keywords: ["RAPID FIRE 2"] }] },
      { id: "mtcs-meltagun", name: "Meltagun", image: "", profiles: [{ range: '12"', attacks: "1", skill: "3+", strength: "9", ap: "-4", damage: "D6", keywords: ["MELTA 2"] }] },
      { id: "mtcs-plasma-gun", name: "Plasma gun", image: "", profiles: [
        { profileName: "Standard", range: '24"', attacks: "1", skill: "3+", strength: "7", ap: "-2", damage: "1", keywords: ["RAPID FIRE 1"] },
        { profileName: "Supercharge", range: '24"', attacks: "1", skill: "3+", strength: "8", ap: "-3", damage: "2", keywords: ["HAZARDOUS", "RAPID FIRE 1"] },
      ]},
      { id: "mtcs-hot-shot-laspistol", name: "Hot-shot laspistol", image: "", profiles: [{ range: '12"', attacks: "1", skill: "3+", strength: "3", ap: "-1", damage: "1", keywords: ["PISTOL"] }] },
      { id: "mtcs-master-vox", name: "Master vox", image: "", note: "Each time the OFFICER in the bearer's unit issues an Order, it can issue it to an eligible unit up to 24\" away." },
      { id: "mtcs-medi-pack", name: "Medi-pack", image: "", note: "At the start of your Command phase, if the bearer's unit is below its Starting Strength, you can return up to D3 destroyed Tempestus Scions models to this unit." },
      { id: "mtcs-regimental-standard", name: "Regimental standard", image: "", note: "Add 1 to the Objective Control characteristic of models in the bearer's unit." },
      { id: "mtcs-bolt-pistol", name: "Bolt pistol", image: "", profiles: [{ range: '12"', attacks: "1", skill: "3+", strength: "4", ap: "0", damage: "1", keywords: ["PISTOL"] }] },
      { id: "mtcs-plasma-pistol", name: "Plasma pistol", image: "", profiles: [
        { profileName: "Standard", range: '12"', attacks: "1", skill: "3+", strength: "7", ap: "-2", damage: "1", keywords: ["PISTOL"] },
        { profileName: "Supercharge", range: '12"', attacks: "1", skill: "3+", strength: "8", ap: "-3", damage: "2", keywords: ["HAZARDOUS", "PISTOL"] },
      ]},
      { id: "mtcs-command-rod", name: "Command rod", image: "", note: "While the bearer is leading a unit, that unit can be affected by up to two different Orders at the same time." },
    ],
    abilities: [
      {
        name: "Orders",
        description: "This unit's OFFICER can issue 1 Order to a REGIMENT unit.",
      },
      {
        name: "Tempestor Prime",
        description: "While this unit contains a Tempestor Prime, ranged weapons equipped by models in this unit have the [SUSTAINED HITS 1] ability.",
      },
    ],
    wargearGroups: [
      ["mtcs-flamer", "mtcs-grenade-launcher", "mtcs-hot-shot-volley-gun", "mtcs-meltagun", "mtcs-plasma-gun"],
      ["mtcs-bolt-pistol", "mtcs-plasma-pistol", "mtcs-command-rod"],
    ],
    wargearSections: [
      { label: "Scion — Special Weapon", ids: ["mtcs-flamer", "mtcs-grenade-launcher", "mtcs-hot-shot-volley-gun", "mtcs-meltagun", "mtcs-plasma-gun"] },
      { label: "Scion — Accessory", ids: ["mtcs-hot-shot-laspistol", "mtcs-master-vox", "mtcs-medi-pack", "mtcs-regimental-standard"] },
      { label: "Tempestor Prime — Pistol", ids: ["mtcs-bolt-pistol", "mtcs-plasma-pistol", "mtcs-command-rod"] },
    ],
  },

  {
    id: "cadian-castellan",
    name: "Cadian Castellan",
    faction: "astra-militarum",
    image: "",
    points: 55,
    canAttachTo: ["cadian-shock-troops", "kasrkin"],
    wargear: [
      // Primary weapon group (pick 1) — boltgun brings CCW automatically
      { id: "cas-boltgun", name: "Boltgun", image: "", linkedWargear: ["cas-close-combat-weapon"], profiles: [{ range: '24"', attacks: "1", skill: "3+", strength: "4", ap: "0", damage: "1", keywords: ["RAPID FIRE 1"] }] },
      { id: "cas-close-combat-weapon", name: "Close combat weapon", image: "", profiles: [{ range: "Melee", attacks: "3", skill: "3+", strength: "3", ap: "0", damage: "1" }] },
      { id: "cas-chainsword", name: "Chainsword", image: "", profiles: [{ range: "Melee", attacks: "5", skill: "3+", strength: "3", ap: "0", damage: "1" }] },
      { id: "cas-power-fist", name: "Power fist", image: "", profiles: [{ range: "Melee", attacks: "3", skill: "3+", strength: "6", ap: "-2", damage: "2" }] },
      { id: "cas-power-weapon", name: "Power weapon", image: "", profiles: [{ range: "Melee", attacks: "4", skill: "3+", strength: "4", ap: "-2", damage: "1" }] },
      // Pistol group (pick 1)
      { id: "cas-laspistol", name: "Laspistol", image: "", profiles: [{ range: '12"', attacks: "1", skill: "3+", strength: "3", ap: "0", damage: "1", keywords: ["PISTOL"] }] },
      { id: "cas-bolt-pistol", name: "Bolt pistol", image: "", profiles: [{ range: '12"', attacks: "1", skill: "3+", strength: "4", ap: "0", damage: "1", keywords: ["PISTOL"] }] },
      { id: "cas-plasma-pistol", name: "Plasma pistol", image: "", profiles: [
        { profileName: "standard", range: '12"', attacks: "1", skill: "3+", strength: "7", ap: "-2", damage: "1", keywords: ["PISTOL"] },
        { profileName: "supercharge", range: '12"', attacks: "1", skill: "3+", strength: "8", ap: "-3", damage: "2", keywords: ["HAZARDOUS", "PISTOL"] },
      ]},
    ],
    wargearGroups: [
      ["cas-boltgun", "cas-chainsword", "cas-power-fist", "cas-power-weapon"],
      ["cas-laspistol", "cas-bolt-pistol", "cas-plasma-pistol"],
    ],
    wargearSections: [
      { label: "Primary Weapon", ids: ["cas-boltgun", "cas-chainsword", "cas-power-fist", "cas-power-weapon"] },
      { label: "Pistol", ids: ["cas-laspistol", "cas-bolt-pistol", "cas-plasma-pistol"] },
    ],
    abilities: [
      {
        name: "Orders",
        description: "This OFFICER can issue 2 Orders to REGIMENT units.",
      },
      {
        name: "Senior Officer",
        description: "While this model is leading a unit, ranged weapons equipped by models in that unit have the [SUSTAINED HITS 1] ability.",
      },
      {
        name: "Get Back in the Fight",
        description: "While this model is leading a unit, that unit is eligible to shoot in a turn in which it Fell Back.",
      },
    ],
  },

  {
    id: "commissar",
    name: "Commissar",
    faction: "astra-militarum",
    image: "",
    points: 30,
    canAttachTo: ["cadian-shock-troops", "catachan-jungle-fighters", "kasrkin", "krieg-combat-engineers", "tempestus-scions", "death-korps-of-krieg"],
    wargear: [
      { id: "commissar-bolt-pistol", name: "Bolt pistol", image: "", profiles: [{ range: '12"', attacks: "1", skill: "3+", strength: "4", ap: "0", damage: "1", keywords: ["PISTOL"] }] },
      { id: "commissar-plasma-pistol", name: "Plasma pistol", image: "", profiles: [
        { profileName: "standard", range: '12"', attacks: "1", skill: "3+", strength: "7", ap: "-2", damage: "1", keywords: ["PISTOL"] },
        { profileName: "supercharge", range: '12"', attacks: "1", skill: "3+", strength: "8", ap: "-3", damage: "2", keywords: ["HAZARDOUS", "PISTOL"] },
      ]},
      { id: "commissar-chainsword", name: "Chainsword", image: "", profiles: [{ range: "Melee", attacks: "4", skill: "3+", strength: "3", ap: "0", damage: "1" }] },
      { id: "commissar-power-weapon", name: "Power weapon", image: "", profiles: [{ range: "Melee", attacks: "3", skill: "3+", strength: "4", ap: "-2", damage: "1" }] },
    ],
    wargearGroups: [
      ["commissar-bolt-pistol", "commissar-plasma-pistol"],
      ["commissar-chainsword", "commissar-power-weapon"],
    ],
    wargearSections: [
      { label: "Ranged Weapon", ids: ["commissar-bolt-pistol", "commissar-plasma-pistol"] },
      { label: "Melee Weapon", ids: ["commissar-chainsword", "commissar-power-weapon"] },
    ],
    abilities: [
      {
        name: "Orders",
        description: "This OFFICER can issue 1 Order to a REGIMENT unit. This OFFICER can only issue the Duty and Honour! and Fix Bayonets! Orders.",
      },
      {
        name: "Summary Execution",
        description: "Once per battle round, at the start of any phase, you can select one friendly ASTRA MILITARUM INFANTRY unit that is Battle-shocked and within 12\" of this model. If you do, one model in that unit is destroyed, and that unit is then no longer Battle-shocked.",
      },
      {
        name: "Political Overwatch",
        description: "While another OFFICER model is in the same unit as this model, you can re-roll Battle-shock tests taken for that unit.",
      },
    ],
  },

  {
    id: "death-rider-commissar",
    name: "Death Rider Commissar",
    faction: "astra-militarum",
    image: "",
    points: 35,
    canAttachTo: [],
    defaultWargear: [
      { id: "commissar-s-pistol", name: "Commissar's pistol", image: "", profiles: [{ range: '12"', attacks: "1", skill: "3+", strength: "4", ap: "0", damage: "1", keywords: ["PISTOL"] }] },
      { id: "commissar-s-close-combat-weapon", name: "Commissar's close combat weapon", image: "", profiles: [{ range: "Melee", attacks: "4", skill: "3+", strength: "4", ap: "0", damage: "1" }] },
      { id: "savage-claws", name: "Savage claws", image: "", profiles: [{ range: "Melee", attacks: "3", skill: "4+", strength: "5", ap: "0", damage: "1" }] },
    ],
    wargear: [],
  },

  {
    id: "iron-hand-straken",
    name: "Iron Hand Straken",
    faction: "astra-militarum",
    image: "",
    points: 55,
    canAttachTo: [],
    defaultWargear: [
      { id: "auto-shotgun", name: "Auto shotgun", image: "", profiles: [{ range: '12"', attacks: "3", skill: "3+", strength: "4", ap: "0", damage: "1" }] },
      { id: "plasma-pistol", name: "Plasma pistol", image: "", profiles: [{ profileName: "standard", range: '12"', attacks: "1", skill: "3+", strength: "7", ap: "-2", damage: "1", keywords: ["PISTOL"] }, { profileName: "supercharge", range: '12"', attacks: "1", skill: "3+", strength: "8", ap: "-3", damage: "2", keywords: ["PISTOL", "HAZARDOUS"] }] },
      { id: "bionic-arm-with-devil-s-claw", name: "Bionic arm with devil's claw", image: "", profiles: [{ range: "Melee", attacks: "4", skill: "2+", strength: "6", ap: "-1", damage: "2" }] },
    ],
    wargear: [],
  },

  {
    id: "leman-russ-commander",
    name: "Leman Russ Commander",
    faction: "astra-militarum",
    image: "",
    points: 235,
    canAttachTo: [],
    abilities: [
      {
        name: "Orders",
        description: "This OFFICER can issue up to 2 Orders to SQUADRON units.",
      },
      {
        name: "Vox-net",
        description: "Each time this model issues an Order, it can issue it to an eligible unit up to 12\" away.",
      },
      {
        name: "Death Befitting An Officer",
        description: "When this model is destroyed, roll one D6: on a 2+, do not remove it from play – it can, after the attacking model's unit has finished making its attacks, shoot as if it were your Shooting phase and as if it had its full wounds remaining. This model is then removed from play.",
      },
      {
        name: "Damaged: 1-4 Wounds Remaining",
        description: "While this model has 1-4 wounds remaining, each time this model makes an attack, subtract 1 from the Hit roll.",
      },
    ],
    defaultWargear: [
      { id: "lrc-leman-russ-battle-cannon", name: "Leman Russ battle cannon", image: "", profiles: [{ range: '48"', attacks: "D6+3", skill: "4+", strength: "10", ap: "-1", damage: "3", keywords: ["BLAST"] }] },
      { id: "lrc-armoured-tracks", name: "Armoured tracks", image: "", profiles: [{ range: "Melee", attacks: "6", skill: "4+", strength: "7", ap: "0", damage: "1" }] },
    ],
    wargear: [
      { id: "lrc-demolisher-battle-cannon", name: "Demolisher battle cannon", image: "", profiles: [{ range: '24"', attacks: "D6+1", skill: "4+", strength: "14", ap: "-3", damage: "D6", keywords: ["BLAST"] }] },
      { id: "lrc-eradicator-nova-cannon", name: "Eradicator nova cannon", image: "", profiles: [{ range: '36"', attacks: "D3+6", skill: "4+", strength: "7", ap: "-1", damage: "2", keywords: ["BLAST", "IGNORES COVER"] }] },
      { id: "lrc-executioner-plasma-cannon", name: "Executioner plasma cannon", image: "", profiles: [
        { profileName: "Standard", range: '36"', attacks: "D6+3", skill: "4+", strength: "7", ap: "-2", damage: "2", keywords: ["BLAST"] },
        { profileName: "Supercharge", range: '36"', attacks: "D6+3", skill: "4+", strength: "8", ap: "-3", damage: "3", keywords: ["BLAST", "HAZARDOUS"] },
      ]},
      { id: "lrc-exterminator-autocannon", name: "Exterminator autocannon", image: "", profiles: [{ range: '48"', attacks: "4", skill: "4+", strength: "9", ap: "-1", damage: "3", keywords: ["RAPID FIRE 4", "TWIN-LINKED"] }] },
      { id: "lrc-punisher-gatling-cannon", name: "Punisher gatling cannon", image: "", profiles: [{ range: '24"', attacks: "20", skill: "4+", strength: "6", ap: "0", damage: "1" }] },
      { id: "lrc-vanquisher-battle-cannon", name: "Vanquisher battle cannon", image: "", profiles: [{ range: '72"', attacks: "1", skill: "4+", strength: "18", ap: "-4", damage: "D6+6", keywords: ["HEAVY"] }] },
      { id: "lrc-lascannon", name: "Lascannon", image: "", profiles: [{ range: '48"', attacks: "1", skill: "4+", strength: "12", ap: "-3", damage: "D6+1" }] },
      { id: "lrc-heavy-bolter-hull", name: "Heavy bolter", image: "", profiles: [{ range: '36"', attacks: "3", skill: "4+", strength: "5", ap: "-1", damage: "2", keywords: ["SUSTAINED HITS 1"] }] },
      { id: "lrc-heavy-flamer-hull", name: "Heavy flamer", image: "", profiles: [{ range: '12"', attacks: "D6", skill: "N/A", strength: "5", ap: "-1", damage: "1", keywords: ["IGNORES COVER", "TORRENT"] }] },
      { id: "lrc-heavy-bolter-sponson", name: "Heavy bolter", image: "", profiles: [{ range: '36"', attacks: "3", skill: "4+", strength: "5", ap: "-1", damage: "2", keywords: ["SUSTAINED HITS 1"] }] },
      { id: "lrc-heavy-flamer-sponson", name: "Heavy flamer", image: "", profiles: [{ range: '12"', attacks: "D6", skill: "N/A", strength: "5", ap: "-1", damage: "1", keywords: ["IGNORES COVER", "TORRENT"] }] },
      { id: "lrc-multi-melta-sponson", name: "Multi-melta", image: "", profiles: [{ range: '18"', attacks: "2", skill: "4+", strength: "9", ap: "-4", damage: "D6", keywords: ["MELTA 2"] }] },
      { id: "lrc-plasma-cannon-sponson", name: "Plasma cannon", image: "", profiles: [
        { profileName: "Standard", range: '36"', attacks: "D3", skill: "4+", strength: "7", ap: "-2", damage: "1", keywords: ["BLAST"] },
        { profileName: "Supercharge", range: '36"', attacks: "D3", skill: "4+", strength: "8", ap: "-3", damage: "2", keywords: ["BLAST", "HAZARDOUS"] },
      ]},
      { id: "lrc-heavy-stubber", name: "Heavy stubber", image: "", profiles: [{ range: '36"', attacks: "3", skill: "4+", strength: "4", ap: "0", damage: "1", keywords: ["RAPID FIRE 3"] }] },
      { id: "lrc-storm-bolter", name: "Storm bolter", image: "", profiles: [{ range: '24"', attacks: "2", skill: "4+", strength: "4", ap: "0", damage: "1", keywords: ["RAPID FIRE 2"] }] },
      { id: "lrc-hunter-killer-missile", name: "Hunter-killer missile", image: "", profiles: [{ range: '48"', attacks: "1", skill: "4+", strength: "14", ap: "-3", damage: "D6", keywords: ["ONE SHOT"] }] },
    ],
    wargearGroups: [
      ["lrc-demolisher-battle-cannon", "lrc-eradicator-nova-cannon", "lrc-executioner-plasma-cannon", "lrc-exterminator-autocannon", "lrc-punisher-gatling-cannon", "lrc-vanquisher-battle-cannon"],
      ["lrc-lascannon", "lrc-heavy-bolter-hull", "lrc-heavy-flamer-hull"],
      ["lrc-heavy-bolter-sponson", "lrc-heavy-flamer-sponson", "lrc-multi-melta-sponson", "lrc-plasma-cannon-sponson"],
      ["lrc-heavy-stubber", "lrc-storm-bolter"],
    ],
    wargearSections: [
      { label: "Turret (replaces Leman Russ battle cannon)", ids: ["lrc-demolisher-battle-cannon", "lrc-eradicator-nova-cannon", "lrc-executioner-plasma-cannon", "lrc-exterminator-autocannon", "lrc-punisher-gatling-cannon", "lrc-vanquisher-battle-cannon"] },
      { label: "Hull Weapon", ids: ["lrc-lascannon", "lrc-heavy-bolter-hull", "lrc-heavy-flamer-hull"] },
      { label: "Sponson Weapons", ids: ["lrc-heavy-bolter-sponson", "lrc-heavy-flamer-sponson", "lrc-multi-melta-sponson", "lrc-plasma-cannon-sponson"] },
      { label: "Secondary Gun", ids: ["lrc-heavy-stubber", "lrc-storm-bolter"] },
      { label: "Optional", ids: ["lrc-hunter-killer-missile"] },
    ],
  },

  {
    id: "lord-marshal-dreir",
    name: "Lord Marshal Dreir",
    faction: "astra-militarum",
    image: "/Warhammerimages/Astra militarium/Lord marshall drier.png",
    points: 100,
    canAttachTo: ["death-riders"],
    abilities: [
      {
        name: "Orders",
        description: "This OFFICER can issue up to 3 Orders to REGIMENT units.",
      },
      {
        name: "Tough to Kill",
        description: "The first time this model is destroyed, roll one D6 at the end of the phase. On a 2+, set this model back up on the battlefield as close as possible to where it was destroyed and not within Engagement Range of any enemy units, with D3 wounds remaining.",
      },
      {
        name: "Leading the Charge",
        description: "Each time this model's unit makes a Charge move, until the end of the turn, melee weapons equipped by models in that unit have the [DEVASTATING WOUNDS] ability.",
      },
    ],
    defaultWargear: [
      { id: "laspistol", name: "Laspistol", image: "", profiles: [{ range: '12"', attacks: "1", skill: "3+", strength: "3", ap: "0", damage: "1", keywords: ["PISTOL"] }] },
      { id: "sabre-of-sacrifice", name: "Sabre of Sacrifice", image: "", profiles: [{ range: "Melee", attacks: "6", skill: "2+", strength: "6", ap: "-2", damage: "1", keywords: ["ANTI-INFANTRY 4+"] }] },
      { id: "savage-claws", name: "Savage claws", image: "", profiles: [{ range: "Melee", attacks: "2", skill: "4+", strength: "4", ap: "-1", damage: "1", keywords: ["EXTRA ATTACKS"] }] },
    ],
    wargear: [],
  },

  {
    id: "lord-solar-leontus",
    name: "Lord Solar Leontus",
    faction: "astra-militarum",
    image: "",
    points: 130,
    canAttachTo: ["attilan-rough-riders", "cadian-shock-troops", "catachan-jungle-fighters", "death-riders", "kasrkin", "krieg-combat-engineers", "death-korps-of-krieg"],
    defaultWargear: [
      { id: "sols-righteous-gaze", name: "Sol's Righteous Gaze", image: "", profiles: [{ range: '12"', attacks: "2", skill: "2+", strength: "8", ap: "-2", damage: "2", keywords: ["PISTOL"] }] },
      { id: "conquest", name: "Conquest", image: "", profiles: [{ range: "Melee", attacks: "6", skill: "2+", strength: "6", ap: "-2", damage: "2" }] },
      { id: "konstantins-hooves", name: "Konstantin's hooves", image: "", profiles: [{ range: "Melee", attacks: "2", skill: "4+", strength: "4", ap: "0", damage: "1", keywords: ["EXTRA ATTACKS"] }] },
    ],
    wargear: [],
    abilities: [
      {
        name: "The Lord Solar",
        description: "At the start of your Command phase, if this model is on the battlefield, you gain 1CP.",
      },
      {
        name: "The Collegiate Astrolex",
        description: "After both players have deployed their armies, select up to three ASTRA MILITARUM units from your army and redeploy them. When doing so, you can set those units up in Strategic Reserves if you wish, regardless of how many units are already in Strategic Reserves.",
      },
      {
        name: "Supreme Commander",
        description: "If this model is in your army, it must be your WARLORD.",
      },
      {
        name: "Orders",
        description: "This OFFICER can issue up to 3 Orders to: REGIMENT units, SQUADRON units, TITANIC units.",
      },
    ],
  },

  {
    id: "ministorum-priest",
    name: "Ministorum Priest",
    faction: "astra-militarum",
    image: "",
    points: 35,
    canAttachTo: ["kasrkin"],
    defaultWargear: [
      { id: "zealot-s-vindictor", name: "Zealot's vindictor", image: "", profiles: [{ range: "Melee", attacks: "4", skill: "4+", strength: "4", ap: "0", damage: "1" }] },
    ],
    wargear: [
      { id: "holy-pistol", name: "Holy pistol", image: "", profiles: [{ range: '12"', attacks: "1", skill: "3+", strength: "4", ap: "0", damage: "1", keywords: ["PISTOL"] }] },
      { id: "power-weapon", name: "Power weapon", image: "", profiles: [{ range: "Melee", attacks: "4", skill: "3+", strength: "5", ap: "-2", damage: "1" }] },
    ],
  },

  {
    id: "nork-deddog",
    name: "Nork Deddog",
    faction: "astra-militarum",
    image: "",
    points: 60,
    canAttachTo: ["cadian-shock-troops", "catachan-jungle-fighters", "death-korps-of-krieg", "krieg-combat-engineers", "tempestus-scions"],
    abilities: [
      {
        name: "Ogryn Bodyguard",
        description: "While one or more OFFICER models are in the same unit as this model, those OFFICER models have the Feel No Pain 4+ ability.",
      },
      {
        name: "Thunderous Head-butt",
        description: "Each time this model's unit is selected to fight, you can select one enemy unit within Engagement Range of this model and roll one D6: on a 2-5, that enemy unit suffers D3 mortal wounds; on a 6, that enemy unit suffers D3+3 mortal wounds.",
      },
    ],
    defaultWargear: [
      { id: "nork-ripper-gun", name: "Ripper gun", image: "", profiles: [{ range: '18"', attacks: "3", skill: "3+", strength: "5", ap: "-1", damage: "2", keywords: ["RAPID FIRE 3"] }] },
      { id: "nork-huge-knife", name: "Huge knife", image: "", profiles: [{ range: "Melee", attacks: "6", skill: "2+", strength: "8", ap: "-1", damage: "2", keywords: ["DEVASTATING WOUNDS"] }] },
    ],
    wargear: [],
  },

  {
    id: "ogryn-bodyguard",
    name: "Ogryn Bodyguard",
    faction: "astra-militarum",
    image: "",
    points: 40,
    canAttachTo: ["cadian-shock-troops", "catachan-jungle-fighters", "death-korps-of-krieg", "krieg-combat-engineers", "tempestus-scions"],
    abilities: [
      {
        name: "Bodyguard",
        description: "While one or more OFFICER models are in the same unit as this model, those OFFICER models have the Feel No Pain 4+ ability.",
      },
    ],
    defaultWargear: [
      { id: "ob-close-combat-weapon", name: "Close combat weapon", image: "", profiles: [{ range: "Melee", attacks: "4", skill: "3+", strength: "6", ap: "0", damage: "1" }] },
    ],
    wargear: [
      // Group 1 — Primary weapon (pick 1)
      { id: "ob-ripper-gun", name: "Ripper gun", image: "", profiles: [
        { profileName: "Ranged", range: '18"', attacks: "3", skill: "4+", strength: "5", ap: "-1", damage: "2", keywords: ["RAPID FIRE 3"] },
        { profileName: "Melee", range: "Melee", attacks: "5", skill: "3+", strength: "6", ap: "-1", damage: "1" },
      ]},
      { id: "ob-grenadier-gauntlet", name: "Grenadier gauntlet", image: "", profiles: [{ range: '18"', attacks: "D6", skill: "4+", strength: "4", ap: "0", damage: "1", keywords: ["BLAST"] }] },
      { id: "ob-bullgryn-maul", name: "Bullgryn maul", image: "", profiles: [{ range: "Melee", attacks: "5", skill: "3+", strength: "7", ap: "-1", damage: "2" }] },
      // Group 2 — Secondary equipment (pick 1)
      { id: "ob-huge-knife", name: "Huge knife", image: "", profiles: [{ range: "Melee", attacks: "6", skill: "3+", strength: "8", ap: "-1", damage: "2" }] },
      { id: "ob-brute-shield", name: "Brute shield", image: "", note: "The bearer has a 4+ invulnerable save." },
      { id: "ob-slabshield", name: "Slabshield", image: "", note: "The bearer has a Wounds characteristic of 7." },
    ],
    wargearGroups: [
      ["ob-ripper-gun", "ob-grenadier-gauntlet", "ob-bullgryn-maul"],
      ["ob-huge-knife", "ob-brute-shield", "ob-slabshield"],
    ],
    wargearSections: [
      { label: "Primary Weapon", ids: ["ob-ripper-gun", "ob-grenadier-gauntlet", "ob-bullgryn-maul"] },
      { label: "Secondary Equipment", ids: ["ob-huge-knife", "ob-brute-shield", "ob-slabshield"] },
    ],
  },

  {
    id: "primaris-psyker",
    name: "Primaris Psyker",
    faction: "astra-militarum",
    image: "",
    points: 60,
    canAttachTo: ["cadian-shock-troops", "catachan-jungle-fighters", "kasrkin", "krieg-combat-engineers", "tempestus-scions", "death-korps-of-krieg"],
    abilities: [
      {
        name: "Malign Wardings (Psychic)",
        description: "While this model is leading a unit, models in that unit have the Feel No Pain 4+ ability against Psychic Attacks.",
      },
      {
        name: "Psychic Barrier (Psychic)",
        description: "At the start of your opponent's Shooting phase, you can roll one D6: on a 1, this PSYKER's unit suffers D3 mortal wounds; on a 2+, until the end of the phase, models in this PSYKER's unit have a 4+ invulnerable save.",
      },
    ],
    defaultWargear: [
      { id: "pp-laspistol", name: "Laspistol", image: "", profiles: [{ range: '12"', attacks: "1", skill: "3+", strength: "3", ap: "0", damage: "1", keywords: ["PISTOL"] }] },
      {
        id: "pp-psychic-maelstrom",
        name: "Psychic Maelstrom",
        image: "",
        profiles: [
          { profileName: "Witchfire", range: '18"', attacks: "D6", skill: "3+", strength: "5", ap: "-2", damage: "1", keywords: ["BLAST", "DEVASTATING WOUNDS", "PSYCHIC"] },
          { profileName: "Focused witchfire", range: '18"', attacks: "D6+1", skill: "3+", strength: "6", ap: "-2", damage: "2", keywords: ["BLAST", "DEVASTATING WOUNDS", "HAZARDOUS", "PSYCHIC"] },
        ],
      },
      { id: "pp-force-weapon", name: "Force weapon", image: "", profiles: [{ range: "Melee", attacks: "3", skill: "4+", strength: "6", ap: "-1", damage: "D3", keywords: ["PSYCHIC"] }] },
    ],
    wargear: [],
  },

  {
    id: "provisionally-prepared",
    name: "Provisionally Prepared",
    faction: "astra-militarum",
    image: "",
    points: 40,
    canAttachTo: [],
    defaultWargear: [
      { id: "sniper-rifle", name: "Sniper rifle", image: "", profiles: [{ range: '36"', attacks: "1", skill: "3+", strength: "4", ap: "-2", damage: "D3", keywords: ["HEAVY", "PRECISION"] }] },
      { id: "close-combat-weapons", name: "Close combat weapons", image: "", profiles: [{ range: "Melee", attacks: "3", skill: "3+", strength: "4", ap: "0", damage: "1" }] },
    ],
    wargear: [],
  },

  {
    id: "rein-and-raus",
    name: "Rein And Raus",
    faction: "astra-militarum",
    image: "",
    points: 50,
    canAttachTo: [],
    defaultWargear: [
      { id: "sniper-rifle", name: "Sniper rifle", image: "", profiles: [{ range: '36"', attacks: "1", skill: "3+", strength: "4", ap: "-2", damage: "D3", keywords: ["HEAVY", "PRECISION"] }] },
      { id: "stub-pistol", name: "Stub pistol", image: "", profiles: [{ range: '12"', attacks: "1", skill: "4+", strength: "3", ap: "0", damage: "1", keywords: ["PISTOL"] }] },
      { id: "close-combat-weapon", name: "Close combat weapon", image: "", profiles: [{ range: "Melee", attacks: "3", skill: "3+", strength: "4", ap: "0", damage: "1" }] },
    ],
    wargear: [
      { id: "demolition-charge", name: "Demolition charge", image: "", profiles: [{ range: '6"', attacks: "1", skill: "3+", strength: "8", ap: "-2", damage: "D6", keywords: ["BLAST", "ONE SHOT"] }] },
    ],
  },

  {
    id: "rogal-dorn-commander",
    name: "Rogal Dorn Commander",
    faction: "astra-militarum",
    image: "",
    points: 290,
    canAttachTo: [],
    abilities: [
      {
        name: "Orders",
        description: "This OFFICER can issue up to 2 Orders to SQUADRON units.",
      },
      {
        name: "Vox-net",
        description: "Each time this model issues an Order, it can issue it to an eligible unit up to 12\" away.",
      },
      {
        name: "Called Shots",
        description: "Each time this model is selected to shoot, you can re-roll one Hit roll, you can re-roll one Wound roll and you can re-roll one Damage roll when resolving its attacks.",
      },
      {
        name: "Damaged: 1-6 Wounds Remaining",
        description: "While this model has 1-6 wounds remaining, each time this model makes an attack, subtract 1 from the Hit roll.",
      },
    ],
    defaultWargear: [
      { id: "rdc-armoured-tracks", name: "Armoured tracks", image: "", profiles: [{ range: "Melee", attacks: "6", skill: "4+", strength: "7", ap: "0", damage: "1", keywords: [] }] },
    ],
    wargear: [
      { id: "rdc-castigator-gatling-cannon", name: "Castigator gatling cannon", image: "", profiles: [{ range: '24"', attacks: "12", skill: "4+", strength: "5", ap: "0", damage: "1", keywords: [] }] },
      { id: "rdc-pulveriser-cannon", name: "Pulveriser cannon", image: "", profiles: [{ profileName: "Blast", range: '24"', attacks: "D6", skill: "4+", strength: "9", ap: "-3", damage: "3", keywords: ["BLAST"] }] },
      { id: "rdc-twin-battle-cannon", name: "Twin battle cannon", image: "", profiles: [{ range: '48"', attacks: "D6+3", skill: "4+", strength: "10", ap: "-1", damage: "3", keywords: ["BLAST", "TWIN-LINKED"] }] },
      {
        id: "rdc-oppressor-cannon",
        name: "Oppressor cannon & Coaxial autocannon",
        image: "",
        profiles: [
          { profileName: "Oppressor cannon", range: '72"', attacks: "D6+3", skill: "4+", strength: "12", ap: "-2", damage: "3", keywords: ["BLAST"] },
          { profileName: "Coaxial autocannon", range: '48"', attacks: "2", skill: "4+", strength: "9", ap: "-1", damage: "3", keywords: [] },
        ],
      },
      { id: "rdc-meltagun", name: "Meltagun", image: "", profiles: [{ range: '12"', attacks: "1", skill: "4+", strength: "9", ap: "-4", damage: "D6", keywords: ["MELTA 2"] }] },
      { id: "rdc-heavy-bolter", name: "Heavy bolter", image: "", profiles: [{ range: '36"', attacks: "3", skill: "4+", strength: "5", ap: "-1", damage: "2", keywords: ["SUSTAINED HITS 1"] }] },
      { id: "rdc-heavy-stubber", name: "Heavy stubber", image: "", profiles: [{ range: '36"', attacks: "3", skill: "4+", strength: "4", ap: "0", damage: "1", keywords: ["RAPID FIRE 3"] }] },
      { id: "rdc-multi-melta", name: "Multi-melta", image: "", profiles: [{ range: '18"', attacks: "2", skill: "4+", strength: "9", ap: "-4", damage: "D6", keywords: ["MELTA 2"] }] },
    ],
    wargearGroups: [
      ["rdc-castigator-gatling-cannon", "rdc-pulveriser-cannon"],
      ["rdc-twin-battle-cannon", "rdc-oppressor-cannon"],
    ],
    wargearSections: [
      { label: "Hull Weapon (pick 1)", ids: ["rdc-castigator-gatling-cannon", "rdc-pulveriser-cannon"] },
      { label: "Turret Weapon (pick 1)", ids: ["rdc-twin-battle-cannon", "rdc-oppressor-cannon"] },
      { label: "Sponson Weapons", ids: ["rdc-meltagun", "rdc-heavy-bolter", "rdc-heavy-stubber", "rdc-multi-melta"] },
    ],
  },

  {
    id: "sergeant-harker",
    name: "Sergeant Harker",
    faction: "astra-militarum",
    image: "",
    points: 40,
    canAttachTo: [],
    defaultWargear: [
      { id: "payback", name: "Payback", image: "", profiles: [{ range: '36"', attacks: "3", skill: "3+", strength: "5", ap: "-1", damage: "2", keywords: ["HEAVY", "SUSTAINED HITS 1"] }] },
      { id: "close-combat-weapon", name: "Close combat weapon", image: "", profiles: [{ range: "Melee", attacks: "3", skill: "3+", strength: "4", ap: "0", damage: "1" }] },
    ],
    wargear: [],
  },

  {
    id: "sly-marbo",
    name: "Sly Marbo",
    faction: "astra-militarum",
    image: "",
    points: 55,
    canAttachTo: [],
    defaultWargear: [
      { id: "ripper-pistol", name: "Ripper pistol", image: "", profiles: [{ range: '12"', attacks: "3", skill: "2+", strength: "5", ap: "-1", damage: "2", keywords: ["ANTI-INFANTRY 2+", "PISTOL", "PRECISION"] }] },
      { id: "envenomed-blade", name: "Envenomed blade", image: "", profiles: [{ range: "Melee", attacks: "5", skill: "2+", strength: "5", ap: "-1", damage: "2", keywords: ["ANTI-INFANTRY 2+", "PRECISION"] }] },
    ],
    wargear: [],
    abilities: [
      {
        name: "One-man Army",
        description: "Once per turn, in your opponent's Shooting phase, when an enemy unit makes a ranged attack that targets a friendly REGIMENT unit within 3\" of this model, after that enemy unit has shot, this model can shoot as if it were your Shooting phase, but it must target only that enemy unit when doing so, and can only do so if that enemy unit is an eligible target.",
      },
      {
        name: "Like Fighting a Shadow",
        description: "In your Shooting phase, after this model has shot, if it is not within Engagement Range of one or more enemy units, it can make a Normal move. If it does, until the end of the turn, this model is not eligible to declare a charge.",
      },
    ],
  },

  {
    id: "tech-priest-enginseer",
    name: "Tech Priest Enginseer",
    faction: "astra-militarum",
    image: "",
    points: 45,
    canAttachTo: ["cadian-shock-troops", "catachan-jungle-fighters", "kasrkin", "krieg-combat-engineers", "death-korps-of-krieg"],
    defaultWargear: [
      { id: "mechanicus-pistol", name: "Mechanicus pistol", image: "", profiles: [{ range: '12"', attacks: "1", skill: "3+", strength: "6", ap: "0", damage: "1", keywords: ["DEVASTATING WOUNDS", "PISTOL"] }] },
      { id: "enginseer-axe", name: "Enginseer axe", image: "", profiles: [{ range: "Melee", attacks: "3", skill: "4+", strength: "6", ap: "-2", damage: "2" }] },
      { id: "servo-arm", name: "Servo-arm", image: "", profiles: [{ range: "Melee", attacks: "1", skill: "4+", strength: "6", ap: "-2", damage: "2", keywords: ["EXTRA ATTACKS"] }] },
    ],
    wargear: [],
    abilities: [
      {
        name: "Enginseer",
        description: "While this model is within 3\" of one or more friendly ASTRA MILITARUM VEHICLE units, this model has the Lone Operative ability.",
      },
      {
        name: "Omnissiah's Blessing",
        description: "In your Command phase, select one friendly ASTRA MILITARUM VEHICLE model within 3\" of this model. That VEHICLE model regains up to D3 lost wounds and, until the start of your next Command phase, that VEHICLE model has a 4+ invulnerable save. Each model can only be selected for this ability once per turn.",
      },
      {
        name: "Vengeance for the Omnissiah",
        description: "If a friendly ASTRA MILITARUM VEHICLE model is destroyed within 12\" of this model, until the end of the battle, this model's Enginseer axe has an Attacks characteristic of 6.",
      },
    ],
  },

  {
    id: "ursula-creed",
    name: "Ursula Creed",
    faction: "astra-militarum",
    image: "",
    points: 65,
    canAttachTo: ["cadian-shock-troops", "kasrkin"],
    defaultWargear: [
      { id: "duty-and-vengeance", name: "Duty and Vengeance", image: "", profiles: [{ range: '12"', attacks: "4", skill: "3+", strength: "5", ap: "-2", damage: "1", keywords: ["PISTOL"] }] },
      { id: "power-weapon", name: "Power weapon", image: "", profiles: [{ range: "Melee", attacks: "4", skill: "3+", strength: "4", ap: "-2", damage: "1" }] },
    ],
    wargear: [],
    abilities: [
      {
        name: "Orders",
        description: "This OFFICER can issue up to 3 Orders to REGIMENT units.",
      },
      {
        name: "Lord Castellan",
        description: "While this model is leading a unit, that unit can be affected by up to two different Orders at the same time.",
      },
      {
        name: "Tactical Genius",
        description: "Once per battle round, one friendly REGIMENT unit within 12\" of this model can be targeted with a Stratagem. If it does, reduce the CP cost of that use of that Stratagem by 1CP.",
      },
    ],
  },

  {
    id: "commissar-yarrick",
    name: "Commissar Yarrick",
    faction: "astra-militarum",
    image: "",
    points: 150,
    canAttachTo: ["cadian-shock-troops", "catachan-jungle-fighters", "kasrkin", "krieg-combat-engineers", "tempestus-scions", "death-korps-of-krieg"],
    defaultWargear: [
      { id: "yarrick-bale-eye", name: "Bale Eye", image: "", profiles: [{ range: '12"', attacks: "2", skill: "2+", strength: "6", ap: "-2", damage: "D3+1", keywords: ["PRECISION"] }] },
      { id: "yarrick-laspistol", name: "Laspistol", image: "", profiles: [{ range: '12"', attacks: "1", skill: "2+", strength: "3", ap: "0", damage: "1", keywords: ["PISTOL"] }] },
      { id: "yarrick-storm-bolter", name: "Storm bolter", image: "", profiles: [{ range: '24"', attacks: "2", skill: "2+", strength: "4", ap: "0", damage: "1", keywords: ["RAPID FIRE 2"] }] },
      { id: "yarrick-power-klaw", name: "Power klaw", image: "", profiles: [{ range: "Melee", attacks: "4", skill: "2+", strength: "8", ap: "-2", damage: "2" }] },
      { id: "yarrick-power-sword", name: "Power sword", image: "", profiles: [{ range: "Melee", attacks: "6", skill: "2+", strength: "4", ap: "-2", damage: "1" }] },
    ],
    wargear: [],
    abilities: [
      {
        name: "Orders",
        description: "This OFFICER can issue up to 2 Orders to REGIMENT, SQUADRON or TITANIC units.",
      },
      {
        name: "Will of Iron",
        description: "The first time this model is destroyed, remove it from play, then, at the end of the phase, roll one D6: on a 2+, set this model back up on the battlefield as close as possible to where it was destroyed and not within Engagement Range of one or more enemy units, with 3 wounds remaining.",
      },
      {
        name: "Hero of Hades Hive",
        description: "In your Command phase, you can select one of the abilities in the Hero of Hades Hive section (see below). Until the start of your next Command phase, this model has that ability.",
      },
      {
        name: "Counterstrategist",
        description: "At the end of your opponent's Movement phase, you can select one enemy unit that was set up or ended a move within 9\" of this model, and one friendly REGIMENT unit within 6\" of and visible to this model that has not made a Normal move or been targeted with the Fire Overwatch Stratagem this phase. That REGIMENT unit can then either: Make a Normal move of up to D6\". Shoot at that enemy unit, but only if it is an eligible target (until the end of the phase, each time a model in that unit makes a ranged attack, an unmodified Hit roll of 6 is required to score a hit). Make a Surge move — roll one D6: models move up to that many inches toward the closest enemy unit and can end within Engagement Range of it.",
      },
      {
        name: "Decisive Command",
        description: "The next Order issued by this model can be issued to one eligible friendly unit within 12\" of this model; if this is the first Order issued by a unit from your army this Command phase, that Order affects not only that eligible unit, but every other eligible friendly unit within 6\" of that eligible unit.",
      },
      {
        name: "Inspiring Hero (Aura)",
        description: "While a friendly ASTRA MILITARUM unit is within 6\" of this model, you can re-roll Battle-shock and Leadership tests taken for that unit.",
      },
    ],
  },

  {
    id: "commissar-graves-on-foot",
    name: "Commissar Graves On Foot",
    faction: "astra-militarum",
    image: "",
    points: 65,
    canAttachTo: ["cadian-shock-troops", "catachan-jungle-fighters", "kasrkin", "krieg-combat-engineers", "tempestus-scions", "death-korps-of-krieg"],
    defaultWargear: [
      { id: "graves-foot-bolt-pistol", name: "Bolt pistol", image: "", profiles: [{ range: '12"', attacks: "1", skill: "2+", strength: "4", ap: "0", damage: "1", keywords: ["PISTOL"] }] },
      { id: "graves-foot-power-sword-and-manus-mortis", name: "Power sword and Manus Mortis", image: "", profiles: [{ range: "Melee", attacks: "5", skill: "2+", strength: "6", ap: "-2", damage: "2" }] },
    ],
    wargear: [],
    abilities: [
      {
        name: "Using Commissar Graves",
        description: "Your army can only include one COMMISSAR GRAVES or COMMISSAR GRAVES ON FOOT unit.",
      },
      {
        name: "Orders",
        description: "This OFFICER can issue 1 Order to REGIMENT units. This OFFICER can only issue the Move! Move! Move!, Duty and Honour! and Fix Bayonets! Orders.",
      },
      {
        name: "Icon of Discipline",
        description: "This model's unit is eligible to shoot and declare a Charge in a turn in which it Fell Back.",
      },
      {
        name: "Brutal Disciplinarian",
        description: "Once per turn, at the start of any phase, you can select one friendly ASTRA MILITARUM INFANTRY (excluding units that only contain one model) unit that is Battle-shocked and within 12\" of this model. If you do, one model in that unit is destroyed, and that unit is no longer Battle-shocked.",
      },
    ],
  },

  {
    id: "commissar-graves",
    name: "Commissar Graves",
    faction: "astra-militarum",
    image: "",
    points: 110,
    canAttachTo: [],
    defaultWargear: [
      { id: "graves-chiron-gatling-cannon", name: "Chiron gatling cannon", image: "", profiles: [{ range: '24"', attacks: "12", skill: "3+", strength: "5", ap: "0", damage: "1" }] },
      { id: "graves-prefectus-heavy-stubber", name: "Prefectus heavy stubber", image: "", profiles: [{ range: '36"', attacks: "3", skill: "3+", strength: "5", ap: "0", damage: "1", keywords: ["RAPID FIRE 3"] }] },
      { id: "graves-armoured-hull", name: "Armoured hull", image: "", profiles: [{ range: "Melee", attacks: "3", skill: "4+", strength: "6", ap: "0", damage: "1", keywords: ["EXTRA ATTACKS"] }] },
      { id: "graves-enforcer-crew", name: "Enforcer crew", image: "", profiles: [{ range: "Melee", attacks: "10", skill: "4+", strength: "3", ap: "0", damage: "1", keywords: ["EXTRA ATTACKS"] }] },
      { id: "graves-power-sword-and-manus-mortis-lance", name: "Power sword and Manus Mortis lance", image: "", profiles: [{ range: "Melee", attacks: "5", skill: "2+", strength: "6", ap: "-2", damage: "2" }] },
    ],
    wargear: [],
    abilities: [
      {
        name: "Using Commissar Graves",
        description: "Your army can only include one COMMISSAR GRAVES or COMMISSAR GRAVES ON FOOT unit.",
      },
      {
        name: "Orders",
        description: "This OFFICER can issue 1 Order to REGIMENT or SQUADRON units. This OFFICER can only issue the Move! Move! Move!, Duty and Honour! and Fix Bayonets! Orders.",
      },
      {
        name: "Mechanised Spearhead",
        description: "In your Movement phase, each time a friendly ASTRA MILITARUM REGIMENT unit disembarks from a TRANSPORT that is within 6\" of this model, after that unit has been set up, this model can issue 1 Order to that Regiment unit, regardless of how many Orders this model has already issued this turn.",
      },
      {
        name: "Brutal Disciplinarian",
        description: "Once per turn, at the start of any phase, you can select one friendly ASTRA MILITARUM INFANTRY unit (excluding units that only contain one model) that is Battle-shocked and within 24\" of and visible to this model. If you do, one model in that unit is destroyed, and that unit is no longer Battle-shocked.",
      },
      {
        name: "Aquiline Prow",
        description: "Each time this unit ends a Charge move, you can select one enemy unit within Engagement Range of it, then roll one D6: on a 2-3, that enemy unit suffers D3 mortal wounds; on a 4-5, that enemy unit suffers 3 mortal wounds; on a 6, that enemy unit suffers D3+3 mortal wounds.",
      },
    ],
  },


  {
    id: "gaunt-s-ghosts",
    name: "Gaunt's Ghosts",
    faction: "astra-militarum",
    image: "",
    points: 100,
    canAttachTo: [],
    abilities: [
      {
        name: "Orders",
        description: "This unit's OFFICER can issue up to 2 Orders to REGIMENT or GAUNT'S GHOSTS units.",
      },
      {
        name: "Tanith Camo-cloaks",
        description: "Models in this unit have the Benefit of Cover.",
      },
      {
        name: "Covert Stealth Team",
        description: "At the end of your opponent's turn, if this unit is not within Engagement Range of one or more enemy units, you can remove this unit from the battlefield. In the Reinforcements step of your next Movement phase, set it up anywhere on the battlefield that is more than 9\" horizontally away from all enemy models.",
      },
    ],
    defaultWargear: [
      { id: "ghosts-bolt-pistol", name: "Bolt pistol", image: "", profiles: [{ range: '12"', attacks: "1", skill: "2+", strength: "4", ap: "0", damage: "1", keywords: ["PISTOL"] }] },
      { id: "ghosts-gaunt-chainsword", name: "Gaunt's chainsword", image: "", profiles: [{ range: "Melee", attacks: "5", skill: "2+", strength: "3", ap: "-1", damage: "1" }] },
      { id: "ghosts-corbec-lascarbine", name: "Corbec's hot-shot lascarbine", image: "", profiles: [{ range: '24"', attacks: "3", skill: "3+", strength: "3", ap: "-1", damage: "1", keywords: ["ASSAULT"] }] },
      { id: "ghosts-rawne-lascarbine", name: "Rawne's lascarbine", image: "", profiles: [{ range: '24"', attacks: "3", skill: "3+", strength: "3", ap: "0", damage: "1", keywords: ["ASSAULT", "SUSTAINED HITS 1"] }] },
      { id: "ghosts-larkin-long-las", name: "Larkin's long-las", image: "", profiles: [{ range: '36"', attacks: "1", skill: "2+", strength: "5", ap: "-2", damage: "4", keywords: ["HEAVY", "PRECISION"] }] },
      { id: "ghosts-bragg-autocannon", name: "Bragg's autocannon", image: "", profiles: [{ range: '48"', attacks: "4", skill: "5+", strength: "9", ap: "-1", damage: "3", keywords: ["HEAVY"] }] },
      { id: "ghosts-lascarbine", name: "Lascarbine", image: "", profiles: [{ range: '24"', attacks: "3", skill: "3+", strength: "3", ap: "0", damage: "1", keywords: ["ASSAULT"] }] },
      { id: "ghosts-mkoll-knife", name: "Mkoll's straight silver knife", image: "", profiles: [{ range: "Melee", attacks: "5", skill: "2+", strength: "3", ap: "-1", damage: "1", keywords: ["DEVASTATING WOUNDS", "PRECISION"] }] },
      { id: "ghosts-straight-silver-knife", name: "Straight silver knife", image: "", profiles: [{ range: "Melee", attacks: "3", skill: "3+", strength: "3", ap: "0", damage: "1" }] },
    ],
    wargear: [],
  },

];
