import type { Character } from "../../../types/warhammer";

export const astraMilitarumCharacters: Character[] = [

  {
    id: "cadian-command-squad",
    name: "Cadian Command Squad",
    faction: "astra-militarum",
    image: "",
    points: 65,
    canAttachTo: ["cadian-shock-troops"],
    defaultWargear: [
      { id: "laspistol", name: "Laspistol", image: "" },
      { id: "chainsword", name: "Chainsword", image: "" },
    ],
    wargear: [
      { id: "bolt-pistol", name: "Bolt pistol", image: "" },
      { id: "flamer", name: "Flamer", image: "" },
      { id: "grenade-launcher-frag", name: "Grenade launcher – frag", image: "" },
      { id: "grenade-launcher-krak", name: "Grenade launcher – krak", image: "" },
      { id: "lasgun", name: "Lasgun", image: "" },
      { id: "meltagun", name: "Meltagun", image: "" },
      { id: "plasma-gun-standard", name: "Plasma gun – standard", image: "" },
      { id: "plasma-gun-supercharge", name: "Plasma gun – supercharge", image: "" },
      { id: "plasma-pistol", name: "Plasma pistol", image: "", profiles: [{ profileName: "standard", range: '12"', attacks: "1", skill: "3+", strength: "7", ap: "-2", damage: "1", keywords: ["PISTOL"] }, { profileName: "supercharge", range: '12"', attacks: "1", skill: "3+", strength: "8", ap: "-3", damage: "2", keywords: ["PISTOL", "HAZARDOUS"] }] },
      { id: "close-combat-weapon", name: "Close combat weapon", image: "" },
      { id: "power-fist", name: "Power fist", image: "" },
      { id: "power-weapon", name: "Power weapon", image: "" },
    ],
  },

  {
    id: "catachan-command-squad",
    name: "Catachan Command Squad",
    faction: "astra-militarum",
    image: "",
    points: 65,
    canAttachTo: ["catachan-jungle-fighters"],
    defaultWargear: [
      { id: "laspistol", name: "Laspistol", image: "" },
      { id: "close-combat-weapon", name: "Close combat weapon", image: "" },
    ],
    wargear: [
      { id: "bolt-pistol", name: "Bolt pistol", image: "" },
      { id: "boltgun", name: "Boltgun", image: "" },
      { id: "flamer", name: "Flamer", image: "" },
      { id: "grenade-launcher-frag", name: "Grenade launcher – frag", image: "" },
      { id: "grenade-launcher-krak", name: "Grenade launcher – krak", image: "" },
      { id: "heavy-flamer", name: "Heavy flamer", image: "" },
      { id: "lasgun", name: "Lasgun", image: "" },
      { id: "meltagun", name: "Meltagun", image: "" },
      { id: "plasma-gun-standard", name: "Plasma gun – standard", image: "" },
      { id: "plasma-gun-supercharge", name: "Plasma gun – supercharge", image: "" },
      { id: "plasma-pistol", name: "Plasma pistol", image: "", profiles: [{ profileName: "standard", range: '12"', attacks: "1", skill: "3+", strength: "7", ap: "-2", damage: "1", keywords: ["PISTOL"] }, { profileName: "supercharge", range: '12"', attacks: "1", skill: "3+", strength: "8", ap: "-3", damage: "2", keywords: ["PISTOL", "HAZARDOUS"] }] },
      { id: "sniper-rifle", name: "Sniper rifle", image: "" },
      { id: "chainsword", name: "Chainsword", image: "" },
      { id: "power-fist", name: "Power fist", image: "" },
      { id: "power-weapon", name: "Power weapon", image: "" },
    ],
  },

  {
    id: "krieg-command-squad",
    name: "Krieg Command Squad",
    faction: "astra-militarum",
    image: "",
    points: 65,
    canAttachTo: ["death-korps-of-krieg", "krieg-combat-engineers"],
    abilities: [
      {
        name: "Grim Determination",
        description: "While this unit contains an OFFICER, you can target this unit with Stratagems even while it is Battle-shocked and Orders issued to this unit do not cease to affect this unit if it becomes Battle-shocked.",
      },
    ],
    defaultWargear: [
      // Lord Commissar
      { id: "laspistol", name: "Laspistol", image: "", profiles: [{ range: '12"', attacks: "1", skill: "4+", strength: "3", ap: "0", damage: "1", keywords: ["PISTOL"] }] },
      { id: "power-weapon", name: "Power weapon", image: "", sergeantOnly: true, profiles: [{ range: "Melee", attacks: "3", skill: "4+", strength: "4", ap: "-2", damage: "1" }] },
      // Veterans
      { id: "chainsword", name: "Chainsword", image: "", profiles: [{ range: "Melee", attacks: "4", skill: "4+", strength: "3", ap: "0", damage: "1" }] },
      { id: "close-combat-weapon", name: "Close combat weapon", image: "", profiles: [{ range: "Melee", attacks: "2", skill: "4+", strength: "3", ap: "0", damage: "1" }] },
      { id: "lasgun", name: "Lasgun", image: "", profiles: [{ range: '24"', attacks: "1", skill: "4+", strength: "3", ap: "0", damage: "1", keywords: ["RAPID FIRE 1"] }] },
      { id: "boltgun", name: "Boltgun", image: "", profiles: [{ range: '24"', attacks: "1", skill: "4+", strength: "4", ap: "0", damage: "1", keywords: ["RAPID FIRE 1"] }] },
      // Wargear abilities
      { id: "alchemyk-counteragents", name: "Alchemyk counteragents", image: "", note: "The bearer's unit has the Feel No Pain 6+ ability against mortal wounds." },
      { id: "master-vox", name: "Master vox", image: "", note: "Each time the OFFICER in the bearer's unit issues an Order, it can issue it to an eligible unit up to 24\" away." },
      { id: "regimental-standard", name: "Regimental standard", image: "", note: "Add 1 to the Objective Control characteristic of models in the bearer's unit." },
      { id: "servo-scribes", name: "Servo-scribes", image: "", note: "Once per battle, when issuing an Order, the Lord Commissar can issue one additional Order." },
    ],
    wargear: [
      // Lord Commissar options (sergeantOnly)
      { id: "power-fist", name: "Power fist", image: "", sergeantOnly: true, profiles: [{ range: "Melee", attacks: "3", skill: "4+", strength: "6", ap: "-2", damage: "2" }] },
      { id: "plasma-pistol-lord", name: "Plasma pistol", image: "", sergeantOnly: true, profiles: [{ profileName: "standard", range: '12"', attacks: "1", skill: "4+", strength: "7", ap: "-2", damage: "1", keywords: ["PISTOL"] }, { profileName: "supercharge", range: '12"', attacks: "1", skill: "4+", strength: "8", ap: "-3", damage: "2", keywords: ["HAZARDOUS", "PISTOL"] }] },
      // Boltgun replacements – 1 Veteran Guardsman (mutually exclusive)
      { id: "flamer", name: "Flamer", image: "", profiles: [{ range: '12"', attacks: "D6", skill: "N/A", strength: "4", ap: "0", damage: "1", keywords: ["IGNORES COVER", "TORRENT"] }] },
      { id: "grenade-launcher-frag", name: "Grenade launcher – frag", image: "", profiles: [{ range: '24"', attacks: "D3", skill: "4+", strength: "4", ap: "0", damage: "1", keywords: ["BLAST"] }] },
      { id: "grenade-launcher-krak", name: "Grenade launcher – krak", image: "", profiles: [{ range: '24"', attacks: "1", skill: "4+", strength: "9", ap: "-2", damage: "D3" }] },
      { id: "meltagun", name: "Meltagun", image: "", profiles: [{ range: '12"', attacks: "1", skill: "4+", strength: "9", ap: "-4", damage: "D6", keywords: ["MELTA 2"] }] },
      { id: "plasma-gun-standard", name: "Plasma gun – standard", image: "", profiles: [{ range: '24"', attacks: "1", skill: "4+", strength: "7", ap: "-2", damage: "1", keywords: ["RAPID FIRE 1"] }] },
      { id: "plasma-gun-supercharge", name: "Plasma gun – supercharge", image: "", profiles: [{ range: '24"', attacks: "1", skill: "4+", strength: "8", ap: "-3", damage: "2", keywords: ["HAZARDOUS", "RAPID FIRE 1"] }] },
      // Chainsword replacements – 1 Veteran Guardsman (mutually exclusive)
      { id: "trench-club", name: "Trench club", image: "", profiles: [{ range: "Melee", attacks: "3", skill: "4+", strength: "4", ap: "0", damage: "1" }] },
      { id: "power-weapon-vet", name: "Power weapon", image: "", profiles: [{ range: "Melee", attacks: "3", skill: "4+", strength: "4", ap: "-2", damage: "1" }] },
      // Laspistol replacements – 1 Veteran Guardsman not carrying alchemyk counteragents (mutually exclusive)
      { id: "bolt-pistol", name: "Bolt pistol", image: "", note: "Can only be taken by a Veteran Guardsman not equipped with alchemyk counteragents.", profiles: [{ range: '12"', attacks: "1", skill: "4+", strength: "4", ap: "0", damage: "1", keywords: ["PISTOL"] }] },
      { id: "plasma-pistol", name: "Plasma pistol", image: "", note: "Can only be taken by a Veteran Guardsman not equipped with alchemyk counteragents.", profiles: [{ profileName: "standard", range: '12"', attacks: "1", skill: "4+", strength: "7", ap: "-2", damage: "1", keywords: ["PISTOL"] }, { profileName: "supercharge", range: '12"', attacks: "1", skill: "4+", strength: "8", ap: "-3", damage: "2", keywords: ["HAZARDOUS", "PISTOL"] }] },
    ],
    wargearGroups: [
      ["flamer", "grenade-launcher-frag", "grenade-launcher-krak", "meltagun", "plasma-gun-standard", "plasma-gun-supercharge"],
      ["trench-club", "power-weapon-vet"],
      ["bolt-pistol", "plasma-pistol"],
    ],
  },

  {
    id: "militarum-tempestus-command-squad",
    name: "Militarum Tempestus Command Squad",
    faction: "astra-militarum",
    image: "",
    points: 85,
    canAttachTo: ["tempestus-scions"],
    defaultWargear: [
      { id: "bolt-pistol", name: "Bolt pistol", image: "" },
      { id: "tempestus-dagger", name: "Tempestus dagger", image: "" },
    ],
    wargear: [
      { id: "flamer", name: "Flamer", image: "" },
      { id: "grenade-launcher-frag", name: "Grenade launcher – frag", image: "" },
      { id: "grenade-launcher-krak", name: "Grenade launcher – krak", image: "" },
      { id: "hot-shot-lasgun", name: "Hot-shot lasgun", image: "" },
      { id: "hot-shot-laspistol", name: "Hot-shot laspistol", image: "" },
      { id: "hot-shot-volley-gun", name: "Hot-shot volley gun", image: "" },
      { id: "meltagun", name: "Meltagun", image: "" },
      { id: "plasma-gun-standard", name: "Plasma gun – standard", image: "" },
      { id: "plasma-gun-supercharge", name: "Plasma gun – supercharge", image: "" },
      { id: "plasma-pistol", name: "Plasma pistol", image: "", profiles: [{ profileName: "standard", range: '12"', attacks: "1", skill: "3+", strength: "7", ap: "-2", damage: "1", keywords: ["PISTOL"] }, { profileName: "supercharge", range: '12"', attacks: "1", skill: "3+", strength: "8", ap: "-3", damage: "2", keywords: ["PISTOL", "HAZARDOUS"] }] },
    ],
  },

  {
    id: "cadian-castellan",
    name: "Cadian Castellan",
    faction: "astra-militarum",
    image: "",
    points: 55,
    canAttachTo: [],
    defaultWargear: [
      { id: "laspistol", name: "Laspistol", image: "", profiles: [{ range: '12"', attacks: "1", skill: "3+", strength: "3", ap: "0", damage: "1", keywords: ["PISTOL"] }] },
      { id: "chainsword", name: "Chainsword", image: "", profiles: [{ range: "Melee", attacks: "4", skill: "3+", strength: "4", ap: "0", damage: "1" }] },
    ],
    wargear: [
      { id: "boltgun", name: "Boltgun", image: "", profiles: [{ range: '24"', attacks: "2", skill: "3+", strength: "4", ap: "0", damage: "1", keywords: ["RAPID FIRE 1"] }] },
      { id: "bolt-pistol", name: "Bolt pistol", image: "", profiles: [{ range: '12"', attacks: "1", skill: "3+", strength: "4", ap: "0", damage: "1", keywords: ["PISTOL"] }] },
      { id: "plasma-pistol", name: "Plasma pistol", image: "", profiles: [{ profileName: "standard", range: '12"', attacks: "1", skill: "3+", strength: "7", ap: "-2", damage: "1", keywords: ["PISTOL"] }, { profileName: "supercharge", range: '12"', attacks: "1", skill: "3+", strength: "8", ap: "-3", damage: "2", keywords: ["PISTOL", "HAZARDOUS"] }] },
      { id: "power-fist", name: "Power fist", image: "", profiles: [{ range: "Melee", attacks: "3", skill: "3+", strength: "8", ap: "-2", damage: "2" }] },
      { id: "power-weapon", name: "Power weapon", image: "", profiles: [{ range: "Melee", attacks: "4", skill: "3+", strength: "5", ap: "-2", damage: "1" }] },
    ],
  },

  {
    id: "commissar",
    name: "Commissar",
    faction: "astra-militarum",
    image: "",
    points: 30,
    canAttachTo: [],
    defaultWargear: [
      { id: "bolt-pistol", name: "Bolt pistol", image: "", profiles: [{ range: '12"', attacks: "1", skill: "3+", strength: "4", ap: "0", damage: "1", keywords: ["PISTOL"] }] },
      { id: "chainsword", name: "Chainsword", image: "", profiles: [{ range: "Melee", attacks: "4", skill: "3+", strength: "4", ap: "0", damage: "1" }] },
    ],
    wargear: [
      { id: "plasma-pistol", name: "Plasma pistol", image: "", profiles: [{ profileName: "standard", range: '12"', attacks: "1", skill: "3+", strength: "7", ap: "-2", damage: "1", keywords: ["PISTOL"] }, { profileName: "supercharge", range: '12"', attacks: "1", skill: "3+", strength: "8", ap: "-3", damage: "2", keywords: ["PISTOL", "HAZARDOUS"] }] },
      { id: "power-weapon", name: "Power weapon", image: "", profiles: [{ range: "Melee", attacks: "4", skill: "3+", strength: "5", ap: "-2", damage: "1" }] },
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
    defaultWargear: [
      { id: "lascannon", name: "Lascannon", image: "", profiles: [{ range: '48"', attacks: "1", skill: "4+", strength: "12", ap: "-3", damage: "D6+1", keywords: ["HEAVY"] }] },
      { id: "leman-russ-battle-cannon", name: "Leman Russ battle cannon", image: "", profiles: [{ range: '48"', attacks: "D6+1", skill: "4+", strength: "10", ap: "-1", damage: "3", keywords: ["BLAST"] }] },
      { id: "armoured-tracks", name: "Armoured tracks", image: "", profiles: [{ range: "Melee", attacks: "3", skill: "4+", strength: "8", ap: "0", damage: "1" }] },
    ],
    wargear: [
      { id: "demolisher-battle-cannon", name: "Demolisher battle cannon", image: "", profiles: [{ range: '24"', attacks: "D3+3", skill: "4+", strength: "14", ap: "-3", damage: "D3+3", keywords: ["BLAST"] }] },
      { id: "eradicator-nova-cannon", name: "Eradicator nova cannon", image: "", profiles: [{ range: '36"', attacks: "D6+1", skill: "4+", strength: "8", ap: "-1", damage: "2", keywords: ["BLAST", "IGNORES COVER"] }] },
      { id: "executioner-plasma-cannon-standard", name: "Executioner plasma cannon – standard", image: "", profiles: [{ range: '36"', attacks: "D6+1", skill: "4+", strength: "7", ap: "-2", damage: "1", keywords: ["BLAST"] }] },
      { id: "executioner-plasma-cannon-supercharge", name: "Executioner plasma cannon – supercharge", image: "", profiles: [{ range: '36"', attacks: "D6+1", skill: "4+", strength: "8", ap: "-3", damage: "2", keywords: ["BLAST", "HAZARDOUS"] }] },
      { id: "exterminator-autocannon", name: "Exterminator autocannon", image: "", profiles: [{ range: '48"', attacks: "4", skill: "4+", strength: "9", ap: "-1", damage: "3", keywords: ["TWIN-LINKED"] }] },
      { id: "punisher-gatling-cannon", name: "Punisher gatling cannon", image: "", profiles: [{ range: '24"', attacks: "20", skill: "4+", strength: "5", ap: "0", damage: "1" }] },
      { id: "heavy-bolter", name: "Heavy bolter", image: "", profiles: [{ range: '36"', attacks: "3", skill: "4+", strength: "5", ap: "-1", damage: "2", keywords: ["HEAVY", "SUSTAINED HITS 1"] }] },
      { id: "heavy-flamer", name: "Heavy flamer", image: "", profiles: [{ range: '12"', attacks: "D6", skill: "N/A", strength: "5", ap: "-1", damage: "1", keywords: ["IGNORES COVER", "TORRENT"] }] },
      { id: "heavy-stubber", name: "Heavy stubber", image: "", profiles: [{ range: '36"', attacks: "3", skill: "4+", strength: "4", ap: "0", damage: "1", keywords: ["RAPID FIRE 3"] }] },
      { id: "multi-melta", name: "Multi-melta", image: "", profiles: [{ range: '18"', attacks: "2", skill: "4+", strength: "9", ap: "-4", damage: "D6", keywords: ["HEAVY", "MELTA 2"] }] },
      { id: "storm-bolter", name: "Storm bolter", image: "", profiles: [{ range: '24"', attacks: "4", skill: "3+", strength: "4", ap: "0", damage: "1", keywords: ["RAPID FIRE 2"] }] },
      { id: "vanquisher-battle-cannon", name: "Vanquisher battle cannon", image: "", profiles: [{ range: '72"', attacks: "1", skill: "4+", strength: "17", ap: "-3", damage: "D6+6", keywords: ["HEAVY"] }] },
    ],
  },

  {
    id: "lord-marshal-dreir",
    name: "Lord Marshal Dreir",
    faction: "astra-militarum",
    image: "",
    points: 100,
    canAttachTo: ["death-riders"],
    abilities: [
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
    points: 150,
    canAttachTo: [],
    defaultWargear: [
      { id: "sol-s-righteous-gaze", name: "Sol's Righteous Gaze", image: "", profiles: [{ range: '18"', attacks: "3", skill: "2+", strength: "5", ap: "-2", damage: "2" }] },
      { id: "conquest", name: "Conquest", image: "", profiles: [{ range: "Melee", attacks: "5", skill: "2+", strength: "5", ap: "-2", damage: "2" }] },
      { id: "konstantin-s-hooves", name: "Konstantin's hooves", image: "", profiles: [{ range: "Melee", attacks: "4", skill: "4+", strength: "6", ap: "0", damage: "1" }] },
    ],
    wargear: [],
  },

  {
    id: "ministorum-priest",
    name: "Ministorum Priest",
    faction: "astra-militarum",
    image: "",
    points: 35,
    canAttachTo: [],
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
    canAttachTo: [],
    defaultWargear: [
      { id: "ripper-gun", name: "Ripper gun", image: "", profiles: [{ range: '12"', attacks: "3", skill: "4+", strength: "5", ap: "0", damage: "1" }] },
      { id: "huge-knife", name: "Huge knife", image: "", profiles: [{ range: "Melee", attacks: "4", skill: "3+", strength: "5", ap: "-1", damage: "1" }] },
    ],
    wargear: [],
  },

  {
    id: "ogryn-bodyguard",
    name: "Ogryn Bodyguard",
    faction: "astra-militarum",
    image: "",
    points: 40,
    canAttachTo: [],
    defaultWargear: [
      { id: "ripper-gun", name: "Ripper gun", image: "", profiles: [{ range: '12"', attacks: "3", skill: "4+", strength: "5", ap: "0", damage: "1" }] },
      { id: "close-combat-weapon", name: "Close combat weapon", image: "", profiles: [{ range: "Melee", attacks: "3", skill: "3+", strength: "4", ap: "0", damage: "1" }] },
      { id: "huge-knife", name: "Huge knife", image: "", profiles: [{ range: "Melee", attacks: "4", skill: "3+", strength: "5", ap: "-1", damage: "1" }] },
    ],
    wargear: [
      { id: "grenadier-gauntlet", name: "Grenadier gauntlet", image: "", profiles: [{ range: '12"', attacks: "D3", skill: "4+", strength: "4", ap: "0", damage: "1", keywords: ["BLAST"] }] },
      { id: "bullgryn-maul", name: "Bullgryn maul", image: "", profiles: [{ range: "Melee", attacks: "3", skill: "4+", strength: "8", ap: "-1", damage: "2" }] },
    ],
  },

  {
    id: "primaris-psyker",
    name: "Primaris Psyker",
    faction: "astra-militarum",
    image: "",
    points: 60,
    canAttachTo: [],
    defaultWargear: [
      { id: "laspistol", name: "Laspistol", image: "", profiles: [{ range: '12"', attacks: "1", skill: "3+", strength: "3", ap: "0", damage: "1", keywords: ["PISTOL"] }] },
      { id: "psychic-maelstrom-witchfire", name: "Psychic Maelstrom – witchfire", image: "", profiles: [{ range: '18"', attacks: "3", skill: "3+", strength: "9", ap: "-2", damage: "3", keywords: ["PSYCHIC"] }] },
      { id: "psychic-maelstrom-focused-witchfire", name: "Psychic Maelstrom – focused witchfire", image: "", profiles: [{ range: '18"', attacks: "3", skill: "3+", strength: "9", ap: "-2", damage: "3", keywords: ["PSYCHIC"] }] },
      { id: "force-weapon", name: "Force weapon", image: "", profiles: [{ range: "Melee", attacks: "3", skill: "3+", strength: "6", ap: "-1", damage: "D3", keywords: ["PSYCHIC"] }] },
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
    points: 265,
    canAttachTo: [],
    defaultWargear: [
      { id: "castigator-gatling-cannon", name: "Castigator gatling cannon", image: "", profiles: [{ range: '24"', attacks: "14", skill: "4+", strength: "5", ap: "0", damage: "1" }] },
      { id: "heavy-stubber", name: "Heavy stubber", image: "", profiles: [{ range: '36"', attacks: "3", skill: "4+", strength: "4", ap: "0", damage: "1", keywords: ["RAPID FIRE 3"] }] },
      { id: "twin-battle-cannon", name: "Twin battle cannon", image: "", profiles: [{ range: '48"', attacks: "D6+1", skill: "4+", strength: "10", ap: "-1", damage: "3", keywords: ["BLAST", "TWIN-LINKED"] }] },
      { id: "armoured-tracks", name: "Armoured tracks", image: "", profiles: [{ range: "Melee", attacks: "3", skill: "4+", strength: "8", ap: "0", damage: "1" }] },
    ],
    wargear: [
      { id: "heavy-bolter", name: "Heavy bolter", image: "", profiles: [{ range: '36"', attacks: "3", skill: "4+", strength: "5", ap: "-1", damage: "2", keywords: ["HEAVY", "SUSTAINED HITS 1"] }] },
      { id: "meltagun", name: "Meltagun", image: "", profiles: [{ range: '12"', attacks: "1", skill: "3+", strength: "9", ap: "-4", damage: "D6", keywords: ["MELTA 2"] }] },
      { id: "multi-melta", name: "Multi-melta", image: "", profiles: [{ range: '18"', attacks: "2", skill: "4+", strength: "9", ap: "-4", damage: "D6", keywords: ["HEAVY", "MELTA 2"] }] },
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
      { id: "ripper-pistol", name: "Ripper pistol", image: "", profiles: [{ range: '12"', attacks: "1", skill: "2+", strength: "4", ap: "-1", damage: "2", keywords: ["PISTOL"] }] },
      { id: "envenomed-blade", name: "Envenomed blade", image: "", profiles: [{ range: "Melee", attacks: "5", skill: "2+", strength: "4", ap: "-2", damage: "1", keywords: ["LETHAL HITS"] }] },
    ],
    wargear: [],
  },

  {
    id: "tech-priest-enginseer",
    name: "Tech Priest Enginseer",
    faction: "astra-militarum",
    image: "",
    points: 45,
    canAttachTo: [],
    defaultWargear: [
      { id: "mechanicus-pistol", name: "Mechanicus pistol", image: "", profiles: [{ range: '12"', attacks: "1", skill: "3+", strength: "4", ap: "0", damage: "1", keywords: ["PISTOL"] }] },
      { id: "enginseer-axe", name: "Enginseer axe", image: "", profiles: [{ range: "Melee", attacks: "3", skill: "3+", strength: "6", ap: "-2", damage: "1" }] },
      { id: "servo-arm", name: "Servo-arm", image: "", profiles: [{ range: "Melee", attacks: "2", skill: "3+", strength: "8", ap: "-2", damage: "3" }] },
    ],
    wargear: [],
  },

  {
    id: "ursula-creed",
    name: "Ursula Creed",
    faction: "astra-militarum",
    image: "",
    points: 65,
    canAttachTo: [],
    defaultWargear: [
      { id: "duty-and-vengeance", name: "Duty and Vengeance", image: "", profiles: [{ range: '12"', attacks: "3", skill: "2+", strength: "4", ap: "-1", damage: "2", keywords: ["PISTOL"] }] },
      { id: "power-weapon", name: "Power weapon", image: "", profiles: [{ range: "Melee", attacks: "4", skill: "3+", strength: "5", ap: "-2", damage: "1" }] },
    ],
    wargear: [],
  },

];
