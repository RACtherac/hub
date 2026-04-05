import type { Unit } from "../../../types/warhammer";

export const astraMilitarumUnits: Unit[] = [

  {
    id: "attilan-rough-riders",
    name: "Attilan Rough Riders",
    faction: "astra-militarum",
    category: "mounted",
    points: 60,
    defaultWargear: [
      { id: "lasgun", name: "Lasgun", image: "" },
      { id: "laspistol", name: "Laspistol", image: "" },
      { id: "hunting-lance-frag-tip", name: "Hunting lance – frag tip", image: "" },
      { id: "hunting-lance-melta-tip", name: "Hunting lance – melta tip", image: "" },
      { id: "steed-s-hooves", name: "Steed’s hooves", image: "" },
    ],
    wargear: [
      { id: "goad-lance", name: "Goad lance", image: "" },
      { id: "power-sabre", name: "Power sabre", image: "" },
    ],
    ledBy: [],
  },

  {
    id: "death-riders",
    name: "Death Riders",
    faction: "astra-militarum",
    category: "mounted",
    points: 60,
    modelCountOptions: [5, 10],
    pointsByModelCount: { 5: 60, 10: 120 },
    abilities: [
      {
        name: "Screening Line",
        description: "Once per turn, when an enemy unit ends a Normal, Advance or Fall Back move within 9\" of this unit, if this unit is not within Engagement Range of one or more enemy units, it can make a Normal move of up to 6\".",
      },
    ],
    defaultWargear: [
      { id: "death-rider-lascarbine", name: "Death Rider lascarbine", image: "", profiles: [{ range: '18"', attacks: "2", skill: "4+", strength: "3", ap: "0", damage: "1", keywords: ["ASSAULT"] }] },
      { id: "frag-lance", name: "Frag lance", image: "", profiles: [{ range: "Melee", attacks: "D6", skill: "3+", strength: "4", ap: "0", damage: "1", keywords: ["LANCE"] }] },
      { id: "power-sabre", name: "Power sabre", image: "", profiles: [{ range: "Melee", attacks: "3", skill: "3+", strength: "4", ap: "-2", damage: "1" }] },
      { id: "steeds-savage-claws", name: "Steed's savage claws", image: "", profiles: [{ range: "Melee", attacks: "2", skill: "4+", strength: "4", ap: "-1", damage: "1", keywords: ["EXTRA ATTACKS"] }] },
    ],
    wargear: [],
    ledBy: ["lord-marshal-dreir","lord-solar-leontus"],
  },

  {
    id: "mukaali-riders",
    name: "Mukaali Riders",
    faction: "astra-militarum",
    category: "mounted",
    points: 110,
    defaultWargear: [
      { id: "laspistol", name: "Laspistol", image: "" },
      { id: "hunting-lance", name: "Hunting lance", image: "" },
      { id: "stomping-feet", name: "Stomping feet", image: "" },
    ],
    wargear: [
      { id: "flamer", name: "Flamer", image: "" },
      { id: "grenade-launcher-frag", name: "Grenade launcher – frag", image: "" },
      { id: "grenade-launcher-krak", name: "Grenade launcher – krak", image: "" },
      { id: "meltagun", name: "Meltagun", image: "" },
      { id: "plasma-gun-standard", name: "Plasma gun – standard", image: "" },
      { id: "plasma-gun-supercharge", name: "Plasma gun – supercharge", image: "" },
      { id: "chainsword", name: "Chainsword", image: "" },
      { id: "power-weapon", name: "Power weapon", image: "" },
    ],
    ledBy: [],
  },

  {
    id: "tauros-assault-vehicle",
    name: "Tauros Assault Vehicle",
    faction: "astra-militarum",
    category: "mounted",
    points: 50,
    defaultWargear: [
      { id: "heavy-flamer", name: "Heavy flamer", image: "" },
      { id: "armoured-frame", name: "Armoured frame", image: "" },
    ],
    wargear: [
      { id: "hunter-killer-missile", name: "Hunter-killer missile", image: "" },
      { id: "tauros-grenade-launcher-frag", name: "Tauros grenade launcher – frag", image: "" },
      { id: "tauros-grenade-launcher-krak", name: "Tauros grenade launcher – krak", image: "" },
    ],
    ledBy: [],
  },

  {
    id: "tauros-venator",
    name: "Tauros Venator",
    faction: "astra-militarum",
    category: "mounted",
    points: 55,
    defaultWargear: [
      { id: "twin-multi-laser", name: "Twin multi-laser", image: "" },
      { id: "armoured-frame", name: "Armoured frame", image: "" },
    ],
    wargear: [
      { id: "hunter-killer-missile", name: "Hunter-killer missile", image: "" },
      { id: "twin-lascannon", name: "Twin lascannon", image: "" },
    ],
    ledBy: [],
  },

  {
    id: "cadian-shock-troops",
    name: "Cadian Shock Troops",
    faction: "astra-militarum",
    category: "battleline",
    points: 65,
    defaultWargear: [
      { id: "laspistol", name: "Laspistol", image: "" },
      { id: "chainsword", name: "Chainsword", image: "" },
    ],
    wargear: [
      { id: "flamer", name: "Flamer", image: "" },
      { id: "grenade-launcher-frag", name: "Grenade launcher – frag", image: "" },
      { id: "grenade-launcher-krak", name: "Grenade launcher – krak", image: "" },
      { id: "meltagun", name: "Meltagun", image: "" },
      { id: "plasma-gun-standard", name: "Plasma gun – standard", image: "" },
      { id: "plasma-gun-supercharge", name: "Plasma gun – supercharge", image: "" },
    ],
    ledBy: ["cadian-castellan","cadian-command-squad","commissar","lord-solar-leontus","ministorum-priest","primaris-psyker","tech-priest-enginseer","ursula-creed","inquisitor","inquisitor-coteaz","inquisitor-draxus","inquisitor-greyfax"],
  },

  {
    id: "catachan-jungle-fighters",
    name: "Catachan Jungle Fighters",
    faction: "astra-militarum",
    category: "battleline",
    points: 65,
    defaultWargear: [
      { id: "laspistol", name: "Laspistol", image: "" },
      { id: "close-combat-weapon", name: "Close combat weapon", image: "" },
    ],
    wargear: [
      { id: "flamer", name: "Flamer", image: "" },
      { id: "lasgun", name: "Lasgun", image: "" },
    ],
    ledBy: ["catachan-command-squad","commissar","lord-solar-leontus","ministorum-priest","primaris-psyker","tech-priest-enginseer","inquisitor","inquisitor-coteaz","inquisitor-draxus","inquisitor-greyfax"],
  },

  {
    id: "death-korps-of-krieg",
    name: "Death Korps Of Krieg",
    faction: "astra-militarum",
    category: "battleline",
    points: 65,
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
      { id: "long-las", name: "Long-las", image: "" },
      { id: "meltagun", name: "Meltagun", image: "" },
      { id: "plasma-gun-standard", name: "Plasma gun – standard", image: "" },
      { id: "plasma-gun-supercharge", name: "Plasma gun – supercharge", image: "" },
      { id: "plasma-pistol", name: "Plasma pistol", image: "", profiles: [{ profileName: "standard", range: '12"', attacks: "1", skill: "3+", strength: "7", ap: "-2", damage: "1", keywords: ["PISTOL"] }, { profileName: "supercharge", range: '12"', attacks: "1", skill: "3+", strength: "8", ap: "-3", damage: "2", keywords: ["PISTOL", "HAZARDOUS"] }] },
    ],
    ledBy: ["commissar","krieg-command-squad","lord-solar-leontus","ministorum-priest","primaris-psyker","tech-priest-enginseer","inquisitor","inquisitor-coteaz","inquisitor-draxus","inquisitor-greyfax"],
  },

  {
    id: "aegis-defence-line",
    name: "Aegis Defence Line",
    faction: "astra-militarum",
    category: "infantry",
    points: 145,
    defaultWargear: [],
    wargear: [],
    ledBy: [],
  },

  {
    id: "artillery-team",
    name: "Artillery Team",
    faction: "astra-militarum",
    category: "infantry",
    points: 95,
    modelCountOptions: [1],
    abilities: [
      {
        name: "Remorseless Barrage",
        description: "In your Shooting phase, after this model has shot, if one or more of those attacks made with an Indirect Fire weapon scored a hit against an enemy unit, that unit must take a Battle-shock test (if an INFANTRY unit is hit by one or more attacks made by a multiple rocket launcher, they must subtract 1 from their Battle-shock test when doing so).",
      },
    ],
    defaultWargear: [
      { id: "lasgun", name: "Lasgun", image: "", profiles: [{ range: '24"', attacks: "1", skill: "4+", strength: "3", ap: "0", damage: "1", keywords: ["RAPID FIRE 1"] }] },
      { id: "crew-close-combat-weapons", name: "Crew close combat weapons", image: "" },
    ],
    wargear: [
      { id: "heavy-mortar", name: "Heavy mortar", image: "", profiles: [{ range: '48"', attacks: "D6+3", skill: "5+", strength: "8", ap: "-1", damage: "2", keywords: ["BLAST", "HEAVY", "INDIRECT FIRE"] }] },
      { id: "siege-cannon", name: "Siege cannon", image: "", profiles: [{ range: '48"', attacks: "D6", skill: "5+", strength: "12", ap: "-2", damage: "3", keywords: ["BLAST", "HEAVY", "INDIRECT FIRE"] }] },
      { id: "heavy-quad-launcher", name: "Heavy quad launcher", image: "", profiles: [{ range: '48"', attacks: "2D6", skill: "5+", strength: "5", ap: "0", damage: "1", keywords: ["BLAST", "HEAVY", "INDIRECT FIRE", "TWIN-LINKED"] }] },
      { id: "multiple-rocket-launcher", name: "Multiple rocket launcher", image: "", profiles: [{ range: '48"', attacks: "D6+3", skill: "5+", strength: "2", ap: "-1", damage: "1", keywords: ["ANTI-INFANTRY 3+", "BLAST", "HEAVY", "INDIRECT FIRE"] }] },
    ],
    wargearGroups: [["heavy-mortar", "siege-cannon", "heavy-quad-launcher", "multiple-rocket-launcher"]],
    ledBy: [],
  },

  {
    id: "bullgryn-squad",
    name: "Bullgryn Squad",
    faction: "astra-militarum",
    category: "infantry",
    points: 110,
    defaultWargear: [
      { id: "grenadier-gauntlet", name: "Grenadier gauntlet", image: "" },
      { id: "close-combat-weapon", name: "Close combat weapon", image: "" },
    ],
    wargear: [
      { id: "bullgryn-maul", name: "Bullgryn maul", image: "" },
    ],
    ledBy: [],
  },

  {
    id: "cadian-heavy-weapons-squad",
    name: "Cadian Heavy Weapons Squad",
    faction: "astra-militarum",
    category: "infantry",
    points: 65,
    defaultWargear: [
      { id: "heavy-bolter", name: "Heavy bolter", image: "" },
      { id: "laspistol", name: "Laspistol", image: "" },
      { id: "weapons-team-close-combat-weapons", name: "Weapons team close combat weapons", image: "" },
    ],
    wargear: [
      { id: "autocannon", name: "Autocannon", image: "" },
      { id: "lascannon", name: "Lascannon", image: "" },
      { id: "missile-launcher-frag", name: "Missile launcher – frag", image: "" },
      { id: "missile-launcher-krak", name: "Missile launcher – krak", image: "" },
      { id: "mortar", name: "Mortar", image: "" },
    ],
    ledBy: [],
  },

  {
    id: "catachan-heavy-weapons-squad",
    name: "Catachan Heavy Weapons Squad",
    faction: "astra-militarum",
    category: "infantry",
    points: 65,
    defaultWargear: [
      { id: "heavy-bolter", name: "Heavy bolter", image: "" },
      { id: "lasgun", name: "Lasgun", image: "" },
      { id: "weapons-team-close-combat-weapons", name: "Weapons team close combat weapons", image: "" },
    ],
    wargear: [
      { id: "autocannon", name: "Autocannon", image: "" },
      { id: "lascannon", name: "Lascannon", image: "" },
      { id: "missile-launcher-frag", name: "Missile launcher – frag", image: "" },
      { id: "missile-launcher-krak", name: "Missile launcher – krak", image: "" },
      { id: "mortar", name: "Mortar", image: "" },
    ],
    ledBy: [],
  },

  {
    id: "death-korps-grenadier-squad",
    name: "Death Korps Grenadier Squad",
    faction: "astra-militarum",
    category: "infantry",
    points: 110,
    defaultWargear: [
      { id: "sergeant-s-pistol", name: "Sergeant’s pistol", image: "" },
      { id: "close-combat-weapon", name: "Close combat weapon", image: "" },
      { id: "sergeant-s-close-combat-weapon", name: "Sergeant’s close combat weapon", image: "" },
    ],
    wargear: [
      { id: "flamer", name: "Flamer", image: "" },
      { id: "grenade-launcher-frag", name: "Grenade launcher – frag", image: "" },
      { id: "grenade-launcher-krak", name: "Grenade launcher – krak", image: "" },
      { id: "heavy-flamer", name: "Heavy flamer", image: "" },
      { id: "heavy-stubber", name: "Heavy stubber", image: "" },
      { id: "meltagun", name: "Meltagun", image: "" },
      { id: "plasma-gun-standard", name: "Plasma gun – standard", image: "" },
      { id: "plasma-gun-supercharge", name: "Plasma gun – supercharge", image: "" },
      { id: "sniper-rifle", name: "Sniper rifle", image: "" },
    ],
    ledBy: [],
  },

  {
    id: "earthshaker-platform",
    name: "Earthshaker Platform",
    faction: "astra-militarum",
    category: "infantry",
    points: 110,
    defaultWargear: [
      { id: "earthshaker-cannon", name: "Earthshaker cannon", image: "" },
      { id: "close-combat-weapons", name: "Close combat weapons", image: "" },
    ],
    wargear: [],
    ledBy: [],
  },

  {
    id: "elysian-sniper-squad",
    name: "Elysian Sniper Squad",
    faction: "astra-militarum",
    category: "infantry",
    points: 65,
    defaultWargear: [
      { id: "lasgun", name: "Lasgun", image: "" },
      { id: "sniper-rifle", name: "Sniper rifle", image: "" },
      { id: "close-combat-weapon", name: "Close combat weapon", image: "" },
    ],
    wargear: [],
    ledBy: [],
  },

  {
    id: "field-ordnance-battery",
    name: "Field Ordnance Battery",
    faction: "astra-militarum",
    category: "infantry",
    points: 110,
    defaultWargear: [
      { id: "lasgun", name: "Lasgun", image: "" },
      { id: "laspistol", name: "Laspistol", image: "" },
      { id: "malleus-rocket-launcher", name: "Malleus rocket launcher", image: "" },
      { id: "battery-close-combat-weapons", name: "Battery close combat weapons", image: "" },
    ],
    wargear: [
      { id: "bombast-field-gun", name: "Bombast field gun", image: "" },
      { id: "heavy-lascannon", name: "Heavy lascannon", image: "" },
    ],
    ledBy: [],
  },

  {
    id: "gaunt-s-ghosts",
    name: "Gaunt S Ghosts",
    faction: "astra-militarum",
    category: "infantry",
    points: 110,
    defaultWargear: [
      { id: "bolt-pistol", name: "Bolt pistol", image: "" },
      { id: "gaunt-s-chainsword", name: "Gaunt’s chainsword", image: "" },
    ],
    wargear: [
      { id: "bragg-s-autocannon", name: "Bragg’s autocannon", image: "" },
      { id: "corbec-s-hot-shot-lascarbine", name: "Corbec’s hot-shot lascarbine", image: "" },
      { id: "larkin-s-long-las", name: "Larkin’s long-las", image: "" },
      { id: "lascarbine", name: "Lascarbine", image: "" },
      { id: "rawne-s-lascarbine", name: "Rawne’s lascarbine", image: "" },
      { id: "straight-silver-knife", name: "Straight silver knife", image: "" },
      { id: "mkoll-s-straight-silver-knife", name: "Mkoll’s straight silver knife", image: "" },
    ],
    ledBy: [],
  },

  {
    id: "heavy-mortar-team",
    name: "Heavy Mortar Team",
    faction: "astra-militarum",
    category: "infantry",
    points: 50,
    defaultWargear: [
      { id: "heavy-mortar", name: "Heavy mortar", image: "" },
      { id: "close-combat-weapons", name: "Close combat weapons", image: "" },
    ],
    wargear: [],
    ledBy: [],
  },

  {
    id: "heavy-quad-launcher-team",
    name: "Heavy Quad Launcher Team",
    faction: "astra-militarum",
    category: "infantry",
    points: 50,
    defaultWargear: [
      { id: "heavy-quad-launcher", name: "Heavy quad launcher", image: "" },
      { id: "close-combat-weapons", name: "Close combat weapons", image: "" },
    ],
    wargear: [],
    ledBy: [],
  },

  {
    id: "hydra-platform",
    name: "Hydra Platform",
    faction: "astra-militarum",
    category: "infantry",
    points: 95,
    defaultWargear: [
      { id: "hydra-quad-autocannon", name: "Hydra quad autocannon", image: "" },
      { id: "close-combat-weapons", name: "Close combat weapons", image: "" },
    ],
    wargear: [],
    ledBy: [],
  },

  {
    id: "kasrkin",
    name: "Kasrkin",
    faction: "astra-militarum",
    category: "infantry",
    points: 110,
    defaultWargear: [
      { id: "hot-shot-laspistol", name: "Hot-shot laspistol", image: "" },
      { id: "chainsword", name: "Chainsword", image: "" },
    ],
    wargear: [
      { id: "bolt-pistol", name: "Bolt pistol", image: "" },
      { id: "flamer", name: "Flamer", image: "" },
      { id: "grenade-launcher-frag", name: "Grenade launcher – frag", image: "" },
      { id: "grenade-launcher-krak", name: "Grenade launcher – krak", image: "" },
      { id: "hot-shot-lasgun", name: "Hot-shot lasgun", image: "" },
      { id: "hot-shot-marksman-rifle", name: "Hot-shot marksman rifle", image: "" },
      { id: "hot-shot-volley-gun", name: "Hot-shot volley gun", image: "" },
      { id: "meltagun", name: "Meltagun", image: "" },
      { id: "plasma-gun-standard", name: "Plasma gun – standard", image: "" },
      { id: "plasma-gun-supercharge", name: "Plasma gun – supercharge", image: "" },
      { id: "plasma-pistol", name: "Plasma pistol", image: "", profiles: [{ profileName: "standard", range: '12"', attacks: "1", skill: "3+", strength: "7", ap: "-2", damage: "1", keywords: ["PISTOL"] }, { profileName: "supercharge", range: '12"', attacks: "1", skill: "3+", strength: "8", ap: "-3", damage: "2", keywords: ["PISTOL", "HAZARDOUS"] }] },
    ],
    ledBy: ["cadian-castellan","commissar","lord-solar-leontus","ministorum-priest","primaris-psyker","tech-priest-enginseer","ursula-creed"],
  },

  {
    id: "krieg-combat-engineers",
    name: "Krieg Combat Engineers",
    faction: "astra-militarum",
    category: "infantry",
    points: 70,
    defaultWargear: [
      { id: "autopistol", name: "Autopistol", image: "" },
      { id: "trench-club", name: "Trench club", image: "" },
    ],
    wargear: [
      { id: "flamer", name: "Flamer", image: "" },
      { id: "close-combat-weapon", name: "Close combat weapon", image: "" },
    ],
    ledBy: ["commissar","krieg-command-squad","lord-solar-leontus","ministorum-priest","primaris-psyker","tech-priest-enginseer"],
  },

  {
    id: "krieg-heavy-weapons-squad",
    name: "Krieg Heavy Weapons Squad",
    faction: "astra-militarum",
    category: "infantry",
    points: 75,
    defaultWargear: [
      { id: "lascannon", name: "Lascannon", image: "" },
      { id: "laspistol", name: "Laspistol", image: "" },
      { id: "close-combat-weapon", name: "Close combat weapon", image: "" },
    ],
    wargear: [
      { id: "krieg-heavy-flamer", name: "Krieg heavy flamer", image: "" },
      { id: "twin-krieg-heavy-stubber", name: "Twin Krieg heavy stubber", image: "" },
    ],
    ledBy: [],
  },

  {
    id: "manticore-platform",
    name: "Manticore Platform",
    faction: "astra-militarum",
    category: "infantry",
    points: 95,
    defaultWargear: [
      { id: "storm-eagle-rockets", name: "Storm eagle rockets", image: "" },
      { id: "close-combat-weapons", name: "Close combat weapons", image: "" },
    ],
    wargear: [],
    ledBy: [],
  },

  {
    id: "munitorum-servitors",
    name: "Munitorum Servitors",
    faction: "astra-militarum",
    category: "infantry",
    points: 35,
    defaultWargear: [
      { id: "servitor-s-servo-arm", name: "Servitor’s servo-arm", image: "" },
    ],
    wargear: [
      { id: "heavy-bolter", name: "Heavy bolter", image: "" },
      { id: "multi-melta", name: "Multi-melta", image: "" },
      { id: "plasma-cannon-standard", name: "Plasma cannon – standard", image: "" },
      { id: "plasma-cannon-supercharge", name: "Plasma cannon – supercharge", image: "" },
    ],
    ledBy: [],
  },

  {
    id: "ogryn-squad",
    name: "Ogryn Squad",
    faction: "astra-militarum",
    category: "infantry",
    points: 60,
    defaultWargear: [
      { id: "ripper-gun", name: "Ripper gun", image: "" },
    ],
    wargear: [],
    ledBy: [],
  },

  {
    id: "quartermaster-cadre-squad",
    name: "Quartermaster Cadre Squad",
    faction: "astra-militarum",
    category: "infantry",
    points: 45,
    defaultWargear: [
      { id: "quartermaster-s-pistol", name: "Quartermaster’s pistol", image: "" },
      { id: "quartermaster-s-close-combat-weapon", name: "Quartermaster’s close combat weapon", image: "" },
    ],
    wargear: [
      { id: "medical-scalpels", name: "Medical scalpels", image: "" },
    ],
    ledBy: [],
  },

  {
    id: "rapier-laser-destroyer-battery",
    name: "Rapier Laser Destroyer Battery",
    faction: "astra-militarum",
    category: "infantry",
    points: 70,
    defaultWargear: [
      { id: "laser-destroyer", name: "Laser destroyer", image: "" },
      { id: "close-combat-weapon", name: "Close combat weapon", image: "" },
    ],
    wargear: [],
    ledBy: [],
  },

  {
    id: "ratlings",
    name: "Ratlings",
    faction: "astra-militarum",
    category: "infantry",
    points: 60,
    defaultWargear: [
      { id: "sniper-rifle", name: "Sniper rifle", image: "" },
      { id: "close-combat-weapon", name: "Close combat weapon", image: "" },
    ],
    wargear: [
      { id: "tankstopper-rifle", name: "Tankstopper rifle", image: "" },
    ],
    ledBy: [],
  },

  {
    id: "regimental-attach-s",
    name: "Regimental Attach S",
    faction: "astra-militarum",
    category: "infantry",
    points: 40,
    defaultWargear: [
      { id: "laspistol", name: "Laspistol", image: "" },
      { id: "close-combat-weapon", name: "Close combat weapon", image: "" },
    ],
    wargear: [
      { id: "astropath-s-stave", name: "Astropath’s stave", image: "" },
    ],
    ledBy: [],
  },

  {
    id: "sabre-weapons-battery",
    name: "Sabre Weapons Battery",
    faction: "astra-militarum",
    category: "infantry",
    points: 45,
    defaultWargear: [
      { id: "twin-heavy-bolter", name: "Twin heavy bolter", image: "" },
      { id: "close-combat-weapon", name: "Close combat weapon", image: "" },
    ],
    wargear: [
      { id: "twin-autocannon", name: "Twin autocannon", image: "" },
      { id: "twin-heavy-stubber", name: "Twin heavy stubber", image: "" },
      { id: "twin-lascannon", name: "Twin lascannon", image: "" },
    ],
    ledBy: [],
  },

  {
    id: "tempestus-aquilons",
    name: "Tempestus Aquilons",
    faction: "astra-militarum",
    category: "infantry",
    points: 110,
    defaultWargear: [
      { id: "hot-shot-lascarbine", name: "Hot-shot lascarbine", image: "" },
      { id: "sentry-flamer", name: "Sentry flamer", image: "" },
      { id: "close-combat-weapon", name: "Close combat weapon", image: "" },
    ],
    wargear: [
      { id: "bolt-pistol", name: "Bolt pistol", image: "" },
      { id: "hot-shot-laspistol", name: "Hot-shot laspistol", image: "" },
      { id: "sentry-grenade-launcher-frag", name: "Sentry grenade launcher – frag", image: "" },
      { id: "sentry-grenade-launcher-krak", name: "Sentry grenade launcher – krak", image: "" },
      { id: "sentry-hot-shot-volley-gun", name: "Sentry hot-shot volley gun", image: "" },
      { id: "melta-carbine", name: "Melta carbine", image: "" },
      { id: "plasma-carbine-standard", name: "Plasma carbine – standard", image: "" },
      { id: "plasma-carbine-supercharge", name: "Plasma carbine – supercharge", image: "" },
      { id: "chainsword", name: "Chainsword", image: "" },
      { id: "power-weapon", name: "Power weapon", image: "" },
    ],
    ledBy: [],
  },

  {
    id: "tempestus-scions",
    name: "Tempestus Scions",
    faction: "astra-militarum",
    category: "infantry",
    points: 70,
    defaultWargear: [
      { id: "hot-shot-laspistol", name: "Hot-shot laspistol", image: "" },
      { id: "chainsword", name: "Chainsword", image: "" },
    ],
    wargear: [
      { id: "bolt-pistol", name: "Bolt pistol", image: "" },
      { id: "flamer", name: "Flamer", image: "" },
      { id: "grenade-launcher-frag", name: "Grenade launcher – frag", image: "" },
      { id: "grenade-launcher-krak", name: "Grenade launcher – krak", image: "" },
      { id: "hot-shot-lasgun", name: "Hot-shot lasgun", image: "" },
      { id: "hot-shot-volley-gun", name: "Hot-shot volley gun", image: "" },
      { id: "meltagun", name: "Meltagun", image: "" },
      { id: "plasma-gun-standard", name: "Plasma gun – standard", image: "" },
      { id: "plasma-gun-supercharge", name: "Plasma gun – supercharge", image: "" },
      { id: "plasma-pistol", name: "Plasma pistol", image: "", profiles: [{ profileName: "standard", range: '12"', attacks: "1", skill: "3+", strength: "7", ap: "-2", damage: "1", keywords: ["PISTOL"] }, { profileName: "supercharge", range: '12"', attacks: "1", skill: "3+", strength: "8", ap: "-3", damage: "2", keywords: ["PISTOL", "HAZARDOUS"] }] },
      { id: "power-fist", name: "Power fist", image: "" },
      { id: "power-weapon", name: "Power weapon", image: "" },
    ],
    ledBy: ["commissar","militarum-tempestus-command-squad","ministorum-priest","primaris-psyker"],
  },

  {
    id: "arkurian-stormhammer",
    name: "Arkurian Stormhammer",
    faction: "astra-militarum",
    category: "vehicle",
    points: 480,
    defaultWargear: [
      { id: "lascannon", name: "Lascannon", image: "" },
      { id: "multi-laser", name: "Multi-laser", image: "" },
      { id: "stormhammer-cannon", name: "Stormhammer cannon", image: "" },
      { id: "twin-battle-cannon", name: "Twin battle cannon", image: "" },
      { id: "armoured-tracks", name: "Armoured tracks", image: "" },
    ],
    wargear: [
      { id: "heavy-bolter", name: "Heavy bolter", image: "" },
      { id: "heavy-flamer", name: "Heavy flamer", image: "" },
      { id: "heavy-stubber", name: "Heavy stubber", image: "" },
      { id: "storm-bolter", name: "Storm bolter", image: "" },
    ],
    ledBy: [],
  },

  {
    id: "armageddon-pattern-medusa",
    name: "Armageddon Pattern Medusa",
    faction: "astra-militarum",
    category: "vehicle",
    points: 105,
    defaultWargear: [
      { id: "heavy-bolter", name: "Heavy bolter", image: "" },
      { id: "medusa-siege-cannon", name: "Medusa siege cannon", image: "" },
      { id: "armoured-tracks", name: "Armoured tracks", image: "" },
    ],
    wargear: [
      { id: "heavy-stubber", name: "Heavy stubber", image: "" },
      { id: "storm-bolter", name: "Storm bolter", image: "" },
    ],
    ledBy: [],
  },

  {
    id: "armoured-sentinels",
    name: "Armoured Sentinels",
    faction: "astra-militarum",
    category: "vehicle",
    points: 65,
    defaultWargear: [
      { id: "multi-laser", name: "Multi-laser", image: "" },
      { id: "close-combat-weapon", name: "Close combat weapon", image: "" },
    ],
    wargear: [
      { id: "autocannon", name: "Autocannon", image: "" },
      { id: "heavy-flamer", name: "Heavy flamer", image: "" },
      { id: "lascannon", name: "Lascannon", image: "" },
      { id: "missile-launcher-frag", name: "Missile launcher – frag", image: "" },
      { id: "missile-launcher-krak", name: "Missile launcher – krak", image: "" },
      { id: "plasma-cannon-standard", name: "Plasma cannon – standard", image: "" },
      { id: "plasma-cannon-supercharge", name: "Plasma cannon – supercharge", image: "" },
    ],
    ledBy: [],
  },

  {
    id: "atlas-recovery-vehicle",
    name: "Atlas Recovery Vehicle",
    faction: "astra-militarum",
    category: "vehicle",
    points: 80,
    defaultWargear: [
      { id: "heavy-bolter", name: "Heavy bolter", image: "" },
      { id: "armoured-tracks", name: "Armoured tracks", image: "" },
    ],
    wargear: [
      { id: "heavy-stubber", name: "Heavy stubber", image: "" },
      { id: "storm-bolter", name: "Storm bolter", image: "" },
    ],
    ledBy: [],
  },

  {
    id: "avenger-strike-fighter",
    name: "Avenger Strike Fighter",
    faction: "astra-militarum",
    category: "vehicle",
    points: 130,
    defaultWargear: [
      { id: "avenger-bolt-cannon", name: "Avenger bolt cannon", image: "" },
      { id: "heavy-stubber", name: "Heavy stubber", image: "" },
      { id: "lascannon", name: "Lascannon", image: "" },
      { id: "armoured-hull", name: "Armoured hull", image: "" },
    ],
    wargear: [],
    ledBy: [],
  },

  {
    id: "baneblade",
    name: "Baneblade",
    faction: "astra-militarum",
    category: "vehicle",
    points: 480,
    defaultWargear: [
      { id: "baneblade-cannon", name: "Baneblade cannon", image: "" },
      { id: "coaxial-autocannon", name: "Coaxial autocannon", image: "" },
      { id: "demolisher-cannon", name: "Demolisher cannon", image: "" },
      { id: "heavy-stubber", name: "Heavy stubber", image: "" },
      { id: "lascannon", name: "Lascannon", image: "" },
      { id: "twin-heavy-bolter", name: "Twin heavy bolter", image: "" },
      { id: "twin-heavy-flamer", name: "Twin heavy flamer", image: "" },
      { id: "armoured-tracks", name: "Armoured tracks", image: "" },
    ],
    wargear: [],
    ledBy: [],
  },

  {
    id: "banesword",
    name: "Banesword",
    faction: "astra-militarum",
    category: "vehicle",
    points: 480,
    defaultWargear: [
      { id: "lascannon", name: "Lascannon", image: "" },
      { id: "quake-cannon", name: "Quake cannon", image: "" },
      { id: "twin-heavy-bolter", name: "Twin heavy bolter", image: "" },
      { id: "twin-heavy-flamer", name: "Twin heavy flamer", image: "" },
      { id: "armoured-tracks", name: "Armoured tracks", image: "" },
    ],
    wargear: [],
    ledBy: [],
  },

  {
    id: "basilisk",
    name: "Basilisk",
    faction: "astra-militarum",
    category: "vehicle",
    points: 140,
    defaultWargear: [
      { id: "earthshaker-cannon", name: "Earthshaker cannon", image: "" },
      { id: "heavy-bolter", name: "Heavy bolter", image: "" },
      { id: "armoured-tracks", name: "Armoured tracks", image: "" },
    ],
    wargear: [
      { id: "heavy-flamer", name: "Heavy flamer", image: "" },
      { id: "hunter-killer-missile", name: "Hunter-killer missile", image: "" },
    ],
    ledBy: [],
  },

  {
    id: "carnodon",
    name: "Carnodon",
    faction: "astra-militarum",
    category: "vehicle",
    points: 160,
    defaultWargear: [
      { id: "autocannon", name: "Autocannon", image: "" },
      { id: "carnodon-twin-autocannon", name: "Carnodon twin autocannon", image: "" },
      { id: "armoured-tracks", name: "Armoured tracks", image: "" },
    ],
    wargear: [
      { id: "carnodon-twin-lascannon", name: "Carnodon twin lascannon", image: "" },
      { id: "carnodon-twin-multi-laser", name: "Carnodon twin multi-laser", image: "" },
      { id: "heavy-bolter", name: "Heavy bolter", image: "" },
      { id: "heavy-flamer", name: "Heavy flamer", image: "" },
      { id: "lascannon", name: "Lascannon", image: "" },
      { id: "militarum-multi-laser", name: "Militarum Multi-laser", image: "" },
      { id: "volkite-caliver", name: "Volkite caliver", image: "" },
      { id: "volkite-culverin", name: "Volkite culverin", image: "" },
    ],
    ledBy: [],
  },

  {
    id: "colossus",
    name: "Colossus",
    faction: "astra-militarum",
    category: "vehicle",
    points: 160,
    defaultWargear: [
      { id: "colossus-siege-mortar", name: "Colossus siege mortar", image: "" },
      { id: "armoured-tracks", name: "Armoured tracks", image: "" },
    ],
    wargear: [
      { id: "heavy-stubber", name: "Heavy stubber", image: "" },
      { id: "storm-bolter", name: "Storm bolter", image: "" },
    ],
    ledBy: [],
  },

  {
    id: "cyclops-demolition-vehicle",
    name: "Cyclops Demolition Vehicle",
    faction: "astra-militarum",
    category: "vehicle",
    points: 25,
    defaultWargear: [],
    wargear: [],
    ledBy: [],
  },

  {
    id: "deathstrike",
    name: "Deathstrike",
    faction: "astra-militarum",
    category: "vehicle",
    points: 145,
    defaultWargear: [
      { id: "deathstrike-missile", name: "Deathstrike missile", image: "" },
      { id: "heavy-bolter", name: "Heavy bolter", image: "" },
      { id: "armoured-tracks", name: "Armoured tracks", image: "" },
    ],
    wargear: [
      { id: "heavy-flamer", name: "Heavy flamer", image: "" },
      { id: "hunter-killer-missile", name: "Hunter-killer missile", image: "" },
    ],
    ledBy: [],
  },

  {
    id: "dominus-armoured-siege-bombard",
    name: "Dominus Armoured Siege Bombard",
    faction: "astra-militarum",
    category: "vehicle",
    points: 325,
    defaultWargear: [
      { id: "dominus-triple-bombard", name: "Dominus triple bombard", image: "" },
      { id: "heavy-bolter", name: "Heavy bolter", image: "" },
      { id: "armoured-tracks", name: "Armoured tracks", image: "" },
    ],
    wargear: [
      { id: "autocannon", name: "Autocannon", image: "" },
      { id: "heavy-flamer", name: "Heavy flamer", image: "" },
      { id: "heavy-stubber", name: "Heavy stubber", image: "" },
      { id: "lascannon", name: "Lascannon", image: "" },
      { id: "storm-bolter", name: "Storm bolter", image: "" },
    ],
    ledBy: [],
  },

  {
    id: "elysian-drop-sentinel",
    name: "Elysian Drop Sentinel",
    faction: "astra-militarum",
    category: "vehicle",
    points: 85,
    defaultWargear: [
      { id: "heavy-bolter", name: "Heavy bolter", image: "" },
      { id: "close-combat-weapon", name: "Close combat weapon", image: "" },
    ],
    wargear: [
      { id: "heavy-flamer", name: "Heavy flamer", image: "" },
      { id: "multi-melta", name: "Multi-melta", image: "" },
    ],
    ledBy: [],
  },

  {
    id: "griffon-mortar-carrier",
    name: "Griffon Mortar Carrier",
    faction: "astra-militarum",
    category: "vehicle",
    points: 115,
    defaultWargear: [
      { id: "griffon-heavy-mortar", name: "Griffon heavy mortar", image: "" },
      { id: "heavy-bolter", name: "Heavy bolter", image: "" },
      { id: "armoured-tracks", name: "Armoured tracks", image: "" },
    ],
    wargear: [
      { id: "heavy-stubber", name: "Heavy stubber", image: "" },
      { id: "storm-bolter", name: "Storm bolter", image: "" },
    ],
    ledBy: [],
  },

  {
    id: "hades-breaching-drill",
    name: "Hades Breaching Drill",
    faction: "astra-militarum",
    category: "vehicle",
    points: 110,
    defaultWargear: [
      { id: "melta-cutter-drill", name: "Melta-cutter drill", image: "" },
    ],
    wargear: [],
    ledBy: [],
  },

  {
    id: "hellhammer",
    name: "Hellhammer",
    faction: "astra-militarum",
    category: "vehicle",
    points: 450,
    defaultWargear: [
      { id: "coaxial-autocannon", name: "Coaxial autocannon", image: "" },
      { id: "demolisher-cannon", name: "Demolisher cannon", image: "" },
      { id: "heavy-stubber", name: "Heavy stubber", image: "" },
      { id: "hellhammer-cannon", name: "Hellhammer cannon", image: "" },
      { id: "lascannon", name: "Lascannon", image: "" },
      { id: "twin-heavy-bolter", name: "Twin heavy bolter", image: "" },
      { id: "twin-heavy-flamer", name: "Twin heavy flamer", image: "" },
      { id: "armoured-tracks", name: "Armoured tracks", image: "" },
    ],
    wargear: [],
    ledBy: [],
  },

  {
    id: "hellhound",
    name: "Hellhound",
    faction: "astra-militarum",
    category: "vehicle",
    points: 125,
    defaultWargear: [
      { id: "heavy-flamer", name: "Heavy flamer", image: "" },
      { id: "inferno-cannon", name: "Inferno cannon", image: "" },
      { id: "armoured-tracks", name: "Armoured tracks", image: "" },
    ],
    wargear: [
      { id: "chem-cannon", name: "Chem cannon", image: "" },
      { id: "heavy-bolter", name: "Heavy bolter", image: "" },
      { id: "melta-cannon", name: "Melta cannon", image: "" },
      { id: "multi-melta", name: "Multi-melta", image: "" },
    ],
    ledBy: [],
  },

  {
    id: "hydra",
    name: "Hydra",
    faction: "astra-militarum",
    category: "vehicle",
    points: 95,
    defaultWargear: [
      { id: "heavy-bolter", name: "Heavy bolter", image: "" },
      { id: "hydra-autocannon", name: "Hydra autocannon", image: "" },
      { id: "armoured-tracks", name: "Armoured tracks", image: "" },
    ],
    wargear: [
      { id: "heavy-flamer", name: "Heavy flamer", image: "" },
      { id: "hunter-killer-missile", name: "Hunter-killer missile", image: "" },
    ],
    ledBy: [],
  },

  {
    id: "leman-russ-battle-tank",
    name: "Leman Russ Battle Tank",
    faction: "astra-militarum",
    category: "vehicle",
    points: 175,
    defaultWargear: [
      { id: "lascannon", name: "Lascannon", image: "" },
      { id: "leman-russ-battle-cannon", name: "Leman Russ battle cannon", image: "" },
      { id: "armoured-tracks", name: "Armoured tracks", image: "" },
    ],
    wargear: [
      { id: "heavy-bolter", name: "Heavy bolter", image: "" },
      { id: "heavy-flamer", name: "Heavy flamer", image: "" },
      { id: "heavy-stubber", name: "Heavy stubber", image: "" },
      { id: "multi-melta", name: "Multi-melta", image: "" },
      { id: "storm-bolter", name: "Storm bolter", image: "" },
    ],
    ledBy: [],
  },

  {
    id: "leman-russ-demolisher",
    name: "Leman Russ Demolisher",
    faction: "astra-militarum",
    category: "vehicle",
    points: 190,
    defaultWargear: [
      { id: "demolisher-battle-cannon", name: "Demolisher battle cannon", image: "" },
      { id: "lascannon", name: "Lascannon", image: "" },
      { id: "armoured-tracks", name: "Armoured tracks", image: "" },
    ],
    wargear: [
      { id: "heavy-bolter", name: "Heavy bolter", image: "" },
      { id: "heavy-flamer", name: "Heavy flamer", image: "" },
      { id: "heavy-stubber", name: "Heavy stubber", image: "" },
      { id: "multi-melta", name: "Multi-melta", image: "" },
      { id: "storm-bolter", name: "Storm bolter", image: "" },
    ],
    ledBy: [],
  },

  {
    id: "leman-russ-eradicator",
    name: "Leman Russ Eradicator",
    faction: "astra-militarum",
    category: "vehicle",
    points: 170,
    defaultWargear: [
      { id: "eradicator-nova-cannon", name: "Eradicator nova cannon", image: "" },
      { id: "lascannon", name: "Lascannon", image: "" },
      { id: "armoured-tracks", name: "Armoured tracks", image: "" },
    ],
    wargear: [
      { id: "heavy-bolter", name: "Heavy bolter", image: "" },
      { id: "heavy-flamer", name: "Heavy flamer", image: "" },
      { id: "heavy-stubber", name: "Heavy stubber", image: "" },
      { id: "multi-melta", name: "Multi-melta", image: "" },
      { id: "storm-bolter", name: "Storm bolter", image: "" },
    ],
    ledBy: [],
  },

  {
    id: "leman-russ-executioner",
    name: "Leman Russ Executioner",
    faction: "astra-militarum",
    category: "vehicle",
    points: 170,
    defaultWargear: [
      { id: "executioner-plasma-cannon-standard", name: "Executioner plasma cannon – standard", image: "" },
      { id: "executioner-plasma-cannon-supercharge", name: "Executioner plasma cannon – supercharge", image: "" },
      { id: "lascannon", name: "Lascannon", image: "" },
      { id: "armoured-tracks", name: "Armoured tracks", image: "" },
    ],
    wargear: [
      { id: "heavy-bolter", name: "Heavy bolter", image: "" },
      { id: "heavy-flamer", name: "Heavy flamer", image: "" },
      { id: "heavy-stubber", name: "Heavy stubber", image: "" },
      { id: "multi-melta", name: "Multi-melta", image: "" },
      { id: "storm-bolter", name: "Storm bolter", image: "" },
    ],
    ledBy: [],
  },

  {
    id: "leman-russ-exterminator",
    name: "Leman Russ Exterminator",
    faction: "astra-militarum",
    category: "vehicle",
    points: 180,
    defaultWargear: [
      { id: "exterminator-autocannon", name: "Exterminator autocannon", image: "" },
      { id: "lascannon", name: "Lascannon", image: "" },
      { id: "armoured-tracks", name: "Armoured tracks", image: "" },
    ],
    wargear: [
      { id: "heavy-bolter", name: "Heavy bolter", image: "" },
      { id: "heavy-flamer", name: "Heavy flamer", image: "" },
      { id: "heavy-stubber", name: "Heavy stubber", image: "" },
      { id: "multi-melta", name: "Multi-melta", image: "" },
      { id: "storm-bolter", name: "Storm bolter", image: "" },
    ],
    ledBy: [],
  },

  {
    id: "leman-russ-punisher",
    name: "Leman Russ Punisher",
    faction: "astra-militarum",
    category: "vehicle",
    points: 150,
    defaultWargear: [
      { id: "lascannon", name: "Lascannon", image: "" },
      { id: "punisher-gatling-cannon", name: "Punisher gatling cannon", image: "" },
      { id: "armoured-tracks", name: "Armoured tracks", image: "" },
    ],
    wargear: [
      { id: "heavy-bolter", name: "Heavy bolter", image: "" },
      { id: "heavy-flamer", name: "Heavy flamer", image: "" },
      { id: "heavy-stubber", name: "Heavy stubber", image: "" },
      { id: "multi-melta", name: "Multi-melta", image: "" },
      { id: "storm-bolter", name: "Storm bolter", image: "" },
    ],
    ledBy: [],
  },

  {
    id: "leman-russ-vanquisher",
    name: "Leman Russ Vanquisher",
    faction: "astra-militarum",
    category: "vehicle",
    points: 145,
    defaultWargear: [
      { id: "lascannon", name: "Lascannon", image: "" },
      { id: "vanquisher-battle-cannon", name: "Vanquisher battle cannon", image: "" },
      { id: "armoured-tracks", name: "Armoured tracks", image: "" },
    ],
    wargear: [
      { id: "heavy-bolter", name: "Heavy bolter", image: "" },
      { id: "heavy-flamer", name: "Heavy flamer", image: "" },
      { id: "heavy-stubber", name: "Heavy stubber", image: "" },
      { id: "multi-melta", name: "Multi-melta", image: "" },
      { id: "storm-bolter", name: "Storm bolter", image: "" },
    ],
    ledBy: [],
  },

  {
    id: "macharius",
    name: "Macharius",
    faction: "astra-militarum",
    category: "vehicle",
    points: 310,
    defaultWargear: [
      { id: "heavy-stubber", name: "Heavy stubber", image: "" },
      { id: "macharius-twin-battle-cannon", name: "Macharius twin battle cannon", image: "" },
      { id: "twin-heavy-stubber", name: "Twin heavy stubber", image: "" },
      { id: "armoured-tracks", name: "Armoured tracks", image: "" },
    ],
    wargear: [
      { id: "heavy-bolter", name: "Heavy bolter", image: "" },
      { id: "heavy-flamer", name: "Heavy flamer", image: "" },
      { id: "storm-bolter", name: "Storm bolter", image: "" },
    ],
    ledBy: [],
  },

  {
    id: "macharius-omega",
    name: "Macharius Omega",
    faction: "astra-militarum",
    category: "vehicle",
    points: 310,
    defaultWargear: [
      { id: "omega-pattern-plasma-blastgun-standard", name: "Omega-pattern plasma blastgun – standard", image: "" },
      { id: "omega-pattern-plasma-blastgun-supercharge", name: "Omega-pattern plasma blastgun – supercharge", image: "" },
      { id: "armoured-tracks", name: "Armoured tracks", image: "" },
    ],
    wargear: [
      { id: "autocannon", name: "Autocannon", image: "" },
      { id: "heavy-bolter", name: "Heavy bolter", image: "" },
      { id: "heavy-flamer", name: "Heavy flamer", image: "" },
      { id: "heavy-stubber", name: "Heavy stubber", image: "" },
      { id: "storm-bolter", name: "Storm bolter", image: "" },
    ],
    ledBy: [],
  },

  {
    id: "macharius-vanquisher",
    name: "Macharius Vanquisher",
    faction: "astra-militarum",
    category: "vehicle",
    points: 285,
    defaultWargear: [
      { id: "heavy-stubber", name: "Heavy stubber", image: "" },
      { id: "macharius-twin-vanquisher-cannon", name: "Macharius twin vanquisher cannon", image: "" },
      { id: "twin-heavy-stubber", name: "Twin heavy stubber", image: "" },
      { id: "armoured-tracks", name: "Armoured tracks", image: "" },
    ],
    wargear: [
      { id: "heavy-bolter", name: "Heavy bolter", image: "" },
      { id: "heavy-flamer", name: "Heavy flamer", image: "" },
      { id: "storm-bolter", name: "Storm bolter", image: "" },
    ],
    ledBy: [],
  },

  {
    id: "macharius-vulcan",
    name: "Macharius Vulcan",
    faction: "astra-militarum",
    category: "vehicle",
    points: 310,
    defaultWargear: [
      { id: "heavy-stubber", name: "Heavy stubber", image: "" },
      { id: "macharius-vulcan-mega-bolter", name: "Macharius vulcan mega-bolter", image: "" },
      { id: "twin-heavy-stubber", name: "Twin heavy stubber", image: "" },
      { id: "armoured-tracks", name: "Armoured tracks", image: "" },
    ],
    wargear: [
      { id: "heavy-bolter", name: "Heavy bolter", image: "" },
      { id: "heavy-flamer", name: "Heavy flamer", image: "" },
      { id: "storm-bolter", name: "Storm bolter", image: "" },
    ],
    ledBy: [],
  },

  {
    id: "malcador",
    name: "Malcador",
    faction: "astra-militarum",
    category: "vehicle",
    points: 250,
    defaultWargear: [
      { id: "autocannon", name: "Autocannon", image: "" },
      { id: "heavy-bolter", name: "Heavy bolter", image: "" },
      { id: "malcador-battle-cannon", name: "Malcador battle cannon", image: "" },
      { id: "armoured-tracks", name: "Armoured tracks", image: "" },
    ],
    wargear: [
      { id: "heavy-stubber", name: "Heavy stubber", image: "" },
      { id: "lascannon", name: "Lascannon", image: "" },
      { id: "storm-bolter", name: "Storm bolter", image: "" },
    ],
    ledBy: [],
  },

  {
    id: "malcador-annihilator",
    name: "Malcador Annihilator",
    faction: "astra-militarum",
    category: "vehicle",
    points: 270,
    defaultWargear: [
      { id: "demolisher-cannon", name: "Demolisher cannon", image: "" },
      { id: "heavy-bolter", name: "Heavy bolter", image: "" },
      { id: "lascannon", name: "Lascannon", image: "" },
      { id: "malcador-twin-lascannon", name: "Malcador twin lascannon", image: "" },
      { id: "armoured-tracks", name: "Armoured tracks", image: "" },
    ],
    wargear: [
      { id: "autocannon", name: "Autocannon", image: "" },
      { id: "heavy-stubber", name: "Heavy stubber", image: "" },
      { id: "storm-bolter", name: "Storm bolter", image: "" },
    ],
    ledBy: [],
  },

  {
    id: "malcador-defender",
    name: "Malcador Defender",
    faction: "astra-militarum",
    category: "vehicle",
    points: 310,
    defaultWargear: [
      { id: "demolisher-cannon", name: "Demolisher cannon", image: "" },
      { id: "heavy-bolter", name: "Heavy bolter", image: "" },
      { id: "armoured-tracks", name: "Armoured tracks", image: "" },
    ],
    wargear: [
      { id: "autocannon", name: "Autocannon", image: "" },
      { id: "heavy-stubber", name: "Heavy stubber", image: "" },
      { id: "lascannon", name: "Lascannon", image: "" },
      { id: "storm-bolter", name: "Storm bolter", image: "" },
    ],
    ledBy: [],
  },

  {
    id: "malcador-infernus",
    name: "Malcador Infernus",
    faction: "astra-militarum",
    category: "vehicle",
    points: 235,
    defaultWargear: [
      { id: "heavy-stubber", name: "Heavy stubber", image: "" },
      { id: "inferno-gun", name: "Inferno gun", image: "" },
      { id: "armoured-tracks", name: "Armoured tracks", image: "" },
    ],
    wargear: [
      { id: "autocannon", name: "Autocannon", image: "" },
      { id: "heavy-bolter", name: "Heavy bolter", image: "" },
      { id: "heavy-flamer", name: "Heavy flamer", image: "" },
      { id: "lascannon", name: "Lascannon", image: "" },
      { id: "storm-bolter", name: "Storm bolter", image: "" },
    ],
    ledBy: [],
  },

  {
    id: "manticore",
    name: "Manticore",
    faction: "astra-militarum",
    category: "vehicle",
    points: 165,
    defaultWargear: [
      { id: "heavy-bolter", name: "Heavy bolter", image: "" },
      { id: "storm-eagle-rockets", name: "Storm eagle rockets", image: "" },
      { id: "armoured-tracks", name: "Armoured tracks", image: "" },
    ],
    wargear: [
      { id: "heavy-flamer", name: "Heavy flamer", image: "" },
      { id: "hunter-killer-missile", name: "Hunter-killer missile", image: "" },
    ],
    ledBy: [],
  },

  {
    id: "marauder-bomber",
    name: "Marauder Bomber",
    faction: "astra-militarum",
    category: "vehicle",
    points: 345,
    defaultWargear: [
      { id: "heavy-bolter", name: "Heavy bolter", image: "" },
      { id: "lascannon", name: "Lascannon", image: "" },
      { id: "armoured-hull", name: "Armoured hull", image: "" },
    ],
    wargear: [],
    ledBy: [],
  },

  {
    id: "marauder-destroyer",
    name: "Marauder Destroyer",
    faction: "astra-militarum",
    category: "vehicle",
    points: 375,
    defaultWargear: [
      { id: "assault-cannon", name: "Assault cannon", image: "" },
      { id: "heavy-bolter", name: "Heavy bolter", image: "" },
      { id: "marauder-nose-autocannons", name: "Marauder nose autocannons", image: "" },
      { id: "armoured-hull", name: "Armoured hull", image: "" },
    ],
    wargear: [
      { id: "hellstrike-missile-rack", name: "Hellstrike missile rack", image: "" },
    ],
    ledBy: [],
  },

  {
    id: "praetor",
    name: "Praetor",
    faction: "astra-militarum",
    category: "vehicle",
    points: 275,
    defaultWargear: [
      { id: "heavy-bolter", name: "Heavy bolter", image: "" },
      { id: "praetor-launcher-firestorm", name: "Praetor launcher – firestorm", image: "" },
      { id: "praetor-launcher-foehammer", name: "Praetor launcher – foehammer", image: "" },
      { id: "armoured-tracks", name: "Armoured tracks", image: "" },
    ],
    wargear: [
      { id: "heavy-stubber", name: "Heavy stubber", image: "" },
      { id: "storm-bolter", name: "Storm bolter", image: "" },
    ],
    ledBy: [],
  },

  {
    id: "rogal-dorn-battle-tank",
    name: "Rogal Dorn Battle Tank",
    faction: "astra-militarum",
    category: "vehicle",
    points: 240,
    defaultWargear: [
      { id: "castigator-gatling-cannon", name: "Castigator gatling cannon", image: "" },
      { id: "heavy-stubber", name: "Heavy stubber", image: "" },
      { id: "twin-battle-cannon", name: "Twin battle cannon", image: "" },
      { id: "armoured-tracks", name: "Armoured tracks", image: "" },
    ],
    wargear: [
      { id: "heavy-bolter", name: "Heavy bolter", image: "" },
      { id: "meltagun", name: "Meltagun", image: "" },
      { id: "multi-melta", name: "Multi-melta", image: "" },
    ],
    ledBy: [],
  },

  {
    id: "salamander-command-vehicle",
    name: "Salamander Command Vehicle",
    faction: "astra-militarum",
    category: "vehicle",
    points: 80,
    defaultWargear: [
      { id: "heavy-bolter", name: "Heavy bolter", image: "" },
      { id: "heavy-flamer", name: "Heavy flamer", image: "" },
      { id: "armoured-tracks", name: "Armoured tracks", image: "" },
    ],
    wargear: [
      { id: "heavy-stubber", name: "Heavy stubber", image: "" },
      { id: "storm-bolter", name: "Storm bolter", image: "" },
    ],
    ledBy: [],
  },

  {
    id: "salamander-scout-vehicle",
    name: "Salamander Scout Vehicle",
    faction: "astra-militarum",
    category: "vehicle",
    points: 95,
    defaultWargear: [
      { id: "autocannon", name: "Autocannon", image: "" },
      { id: "heavy-bolter", name: "Heavy bolter", image: "" },
      { id: "armoured-tracks", name: "Armoured tracks", image: "" },
    ],
    wargear: [
      { id: "heavy-stubber", name: "Heavy stubber", image: "" },
      { id: "storm-bolter", name: "Storm bolter", image: "" },
    ],
    ledBy: [],
  },

  {
    id: "scout-sentinels",
    name: "Scout Sentinels",
    faction: "astra-militarum",
    category: "vehicle",
    points: 55,
    defaultWargear: [
      { id: "multi-laser", name: "Multi-laser", image: "" },
      { id: "close-combat-weapon", name: "Close combat weapon", image: "" },
    ],
    wargear: [
      { id: "autocannon", name: "Autocannon", image: "" },
      { id: "heavy-flamer", name: "Heavy flamer", image: "" },
      { id: "lascannon", name: "Lascannon", image: "" },
      { id: "missile-launcher-frag", name: "Missile launcher – frag", image: "" },
      { id: "missile-launcher-krak", name: "Missile launcher – krak", image: "" },
      { id: "plasma-cannon-standard", name: "Plasma cannon – standard", image: "" },
      { id: "plasma-cannon-supercharge", name: "Plasma cannon – supercharge", image: "" },
    ],
    ledBy: [],
  },

  {
    id: "sentinel-powerlifter",
    name: "Sentinel Powerlifter",
    faction: "astra-militarum",
    category: "vehicle",
    points: 55,
    defaultWargear: [
      { id: "powerlifter", name: "Powerlifter", image: "" },
    ],
    wargear: [],
    ledBy: [],
  },

  {
    id: "shadowsword",
    name: "Shadowsword",
    faction: "astra-militarum",
    category: "vehicle",
    points: 440,
    defaultWargear: [
      { id: "lascannon", name: "Lascannon", image: "" },
      { id: "twin-heavy-bolter", name: "Twin heavy bolter", image: "" },
      { id: "twin-heavy-flamer", name: "Twin heavy flamer", image: "" },
      { id: "volcano-cannon", name: "Volcano cannon", image: "" },
      { id: "armoured-tracks", name: "Armoured tracks", image: "" },
    ],
    wargear: [],
    ledBy: [],
  },

  {
    id: "stormblade",
    name: "Stormblade",
    faction: "astra-militarum",
    category: "vehicle",
    points: 415,
    defaultWargear: [
      { id: "lascannon", name: "Lascannon", image: "" },
      { id: "twin-heavy-bolter", name: "Twin heavy bolter", image: "" },
      { id: "armoured-tracks", name: "Armoured tracks", image: "" },
    ],
    wargear: [
      { id: "heavy-stubber", name: "Heavy stubber", image: "" },
      { id: "storm-bolter", name: "Storm bolter", image: "" },
      { id: "twin-heavy-flamer", name: "Twin heavy flamer", image: "" },
    ],
    ledBy: [],
  },

  {
    id: "stormsword",
    name: "Stormsword",
    faction: "astra-militarum",
    category: "vehicle",
    points: 495,
    defaultWargear: [
      { id: "lascannon", name: "Lascannon", image: "" },
      { id: "stormsword-siege-cannon", name: "Stormsword siege cannon", image: "" },
      { id: "twin-heavy-bolter", name: "Twin heavy bolter", image: "" },
      { id: "twin-heavy-flamer", name: "Twin heavy flamer", image: "" },
      { id: "armoured-tracks", name: "Armoured tracks", image: "" },
    ],
    wargear: [],
    ledBy: [],
  },

  {
    id: "stygies-destroyer-tank-hunter",
    name: "Stygies Destroyer Tank Hunter",
    faction: "astra-militarum",
    category: "vehicle",
    points: 180,
    defaultWargear: [
      { id: "stygies-laser-destroyer", name: "Stygies laser destroyer", image: "" },
      { id: "armoured-tracks", name: "Armoured tracks", image: "" },
    ],
    wargear: [
      { id: "heavy-stubber", name: "Heavy stubber", image: "" },
      { id: "storm-bolter", name: "Storm bolter", image: "" },
    ],
    ledBy: [],
  },

  {
    id: "tarantula-battery",
    name: "Tarantula Battery",
    faction: "astra-militarum",
    category: "vehicle",
    points: 40,
    defaultWargear: [
      { id: "twin-heavy-bolter", name: "Twin heavy bolter", image: "" },
      { id: "close-combat-weapon", name: "Close combat weapon", image: "" },
    ],
    wargear: [
      { id: "twin-lascannon", name: "Twin lascannon", image: "" },
    ],
    ledBy: [],
  },

  {
    id: "trojan-support-vehicle",
    name: "Trojan Support Vehicle",
    faction: "astra-militarum",
    category: "vehicle",
    points: 80,
    defaultWargear: [
      { id: "heavy-bolter", name: "Heavy bolter", image: "" },
      { id: "armoured-tracks", name: "Armoured tracks", image: "" },
    ],
    wargear: [
      { id: "heavy-flamer", name: "Heavy flamer", image: "" },
      { id: "hunter-killer-missile", name: "Hunter-killer missile", image: "" },
    ],
    ledBy: [],
  },

  {
    id: "valdor",
    name: "Valdor",
    faction: "astra-militarum",
    category: "vehicle",
    points: 285,
    defaultWargear: [
      { id: "autocannon", name: "Autocannon", image: "" },
      { id: "valdor-neutron-laser", name: "Valdor neutron laser", image: "" },
      { id: "armoured-tracks", name: "Armoured tracks", image: "" },
    ],
    wargear: [
      { id: "heavy-bolter", name: "Heavy bolter", image: "" },
      { id: "heavy-flamer", name: "Heavy flamer", image: "" },
      { id: "heavy-stubber", name: "Heavy stubber", image: "" },
      { id: "lascannon", name: "Lascannon", image: "" },
      { id: "storm-bolter", name: "Storm bolter", image: "" },
    ],
    ledBy: [],
  },

  {
    id: "voss-pattern-lightning",
    name: "Voss Pattern Lightning",
    faction: "astra-militarum",
    category: "vehicle",
    points: 130,
    defaultWargear: [
      { id: "lascannon", name: "Lascannon", image: "" },
      { id: "armoured-hull", name: "Armoured hull", image: "" },
    ],
    wargear: [
      { id: "lightning-hellstrike-rack", name: "Lightning hellstrike rack", image: "" },
    ],
    ledBy: [],
  },

  {
    id: "vulture-gunship",
    name: "Vulture Gunship",
    faction: "astra-militarum",
    category: "vehicle",
    points: 225,
    defaultWargear: [
      { id: "heavy-bolter", name: "Heavy bolter", image: "" },
      { id: "multiple-rocket-pod", name: "Multiple rocket pod", image: "" },
      { id: "vulture-hellstrike-rack", name: "Vulture hellstrike rack", image: "" },
      { id: "armoured-hull", name: "Armoured hull", image: "" },
    ],
    wargear: [
      { id: "vulture-gatling-cannon", name: "Vulture gatling cannon", image: "" },
    ],
    ledBy: [],
  },

  {
    id: "wyvern",
    name: "Wyvern",
    faction: "astra-militarum",
    category: "vehicle",
    points: 110,
    defaultWargear: [
      { id: "heavy-bolter", name: "Heavy bolter", image: "" },
      { id: "wyvern-quad-stormshard-mortar", name: "Wyvern quad stormshard mortar", image: "" },
      { id: "armoured-tracks", name: "Armoured tracks", image: "" },
    ],
    wargear: [
      { id: "heavy-flamer", name: "Heavy flamer", image: "" },
      { id: "hunter-killer-missile", name: "Hunter-killer missile", image: "" },
    ],
    ledBy: [],
  },

  {
    id: "aquila-lander",
    name: "Aquila Lander",
    faction: "astra-militarum",
    category: "transport",
    points: 120,
    defaultWargear: [
      { id: "heavy-bolter", name: "Heavy bolter", image: "" },
      { id: "armoured-hull", name: "Armoured hull", image: "" },
    ],
    wargear: [
      { id: "autocannon", name: "Autocannon", image: "" },
      { id: "multi-laser", name: "Multi-laser", image: "" },
    ],
    ledBy: [],
  },

  {
    id: "arvus-lighter",
    name: "Arvus Lighter",
    faction: "astra-militarum",
    category: "transport",
    points: 95,
    defaultWargear: [
      { id: "armoured-hull", name: "Armoured hull", image: "" },
    ],
    wargear: [],
    ledBy: [],
  },

  {
    id: "banehammer",
    name: "Banehammer",
    faction: "astra-militarum",
    category: "transport",
    points: 450,
    defaultWargear: [
      { id: "lascannon", name: "Lascannon", image: "" },
      { id: "tremor-cannon", name: "Tremor cannon", image: "" },
      { id: "twin-heavy-bolter", name: "Twin heavy bolter", image: "" },
      { id: "twin-heavy-flamer", name: "Twin heavy flamer", image: "" },
      { id: "armoured-tracks", name: "Armoured tracks", image: "" },
    ],
    wargear: [],
    ledBy: [],
  },

  {
    id: "centaur-light-carrier",
    name: "Centaur Light Carrier",
    faction: "astra-militarum",
    category: "transport",
    points: 40,
    defaultWargear: [
      { id: "heavy-stubber", name: "Heavy stubber", image: "" },
      { id: "armoured-tracks", name: "Armoured tracks", image: "" },
    ],
    wargear: [
      { id: "hunter-killer-missile", name: "Hunter-killer missile", image: "" },
    ],
    ledBy: [],
  },

  {
    id: "chimera",
    name: "Chimera",
    faction: "astra-militarum",
    category: "transport",
    points: 85,
    defaultWargear: [
      { id: "heavy-bolter", name: "Heavy bolter", image: "" },
      { id: "lasgun-array", name: "Lasgun array", image: "" },
      { id: "multi-laser", name: "Multi-laser", image: "" },
      { id: "armoured-tracks", name: "Armoured tracks", image: "" },
    ],
    wargear: [
      { id: "heavy-flamer", name: "Heavy flamer", image: "" },
      { id: "heavy-stubber", name: "Heavy stubber", image: "" },
      { id: "storm-bolter", name: "Storm bolter", image: "" },
    ],
    ledBy: [],
  },

  {
    id: "crassus",
    name: "Crassus",
    faction: "astra-militarum",
    category: "transport",
    points: 180,
    defaultWargear: [
      { id: "heavy-bolter", name: "Heavy bolter", image: "" },
      { id: "armoured-tracks", name: "Armoured tracks", image: "" },
    ],
    wargear: [
      { id: "heavy-stubber", name: "Heavy stubber", image: "" },
      { id: "storm-bolter", name: "Storm bolter", image: "" },
    ],
    ledBy: [],
  },

  {
    id: "doomhammer",
    name: "Doomhammer",
    faction: "astra-militarum",
    category: "transport",
    points: 445,
    defaultWargear: [
      { id: "lascannon", name: "Lascannon", image: "" },
      { id: "magma-cannon", name: "Magma cannon", image: "" },
      { id: "twin-heavy-bolter", name: "Twin heavy bolter", image: "" },
      { id: "twin-heavy-flamer", name: "Twin heavy flamer", image: "" },
      { id: "armoured-tracks", name: "Armoured tracks", image: "" },
    ],
    wargear: [],
    ledBy: [],
  },

  {
    id: "gorgon-heavy-transport",
    name: "Gorgon Heavy Transport",
    faction: "astra-militarum",
    category: "transport",
    points: 275,
    defaultWargear: [
      { id: "gorgon-mortar", name: "Gorgon mortar", image: "" },
      { id: "heavy-stubber", name: "Heavy stubber", image: "" },
      { id: "twin-heavy-stubber", name: "Twin heavy stubber", image: "" },
      { id: "landing-ramp", name: "Landing ramp", image: "" },
    ],
    wargear: [
      { id: "heavy-bolter", name: "Heavy bolter", image: "" },
      { id: "heavy-flamer", name: "Heavy flamer", image: "" },
    ],
    ledBy: [],
  },

  {
    id: "minotaur",
    name: "Minotaur",
    faction: "astra-militarum",
    category: "transport",
    points: 225,
    defaultWargear: [
      { id: "minotaur-twin-earthshaker-cannon", name: "Minotaur twin earthshaker cannon", image: "" },
      { id: "armoured-tracks", name: "Armoured tracks", image: "" },
    ],
    wargear: [],
    ledBy: [],
  },

  {
    id: "storm-chimera",
    name: "Storm Chimera",
    faction: "astra-militarum",
    category: "transport",
    points: 90,
    defaultWargear: [
      { id: "autocannon", name: "Autocannon", image: "" },
      { id: "heavy-bolter", name: "Heavy bolter", image: "" },
      { id: "armoured-tracks", name: "Armoured tracks", image: "" },
    ],
    wargear: [
      { id: "heavy-stubber", name: "Heavy stubber", image: "" },
      { id: "storm-bolter", name: "Storm bolter", image: "" },
    ],
    ledBy: [],
  },

  {
    id: "stormlord",
    name: "Stormlord",
    faction: "astra-militarum",
    category: "transport",
    points: 460,
    defaultWargear: [
      { id: "heavy-stubber", name: "Heavy stubber", image: "" },
      { id: "lascannon", name: "Lascannon", image: "" },
      { id: "twin-heavy-bolter", name: "Twin heavy bolter", image: "" },
      { id: "twin-heavy-flamer", name: "Twin heavy flamer", image: "" },
      { id: "vulcan-mega-bolter", name: "Vulcan mega-bolter", image: "" },
      { id: "armoured-tracks", name: "Armoured tracks", image: "" },
    ],
    wargear: [],
    ledBy: [],
  },

  {
    id: "taurox",
    name: "Taurox",
    faction: "astra-militarum",
    category: "transport",
    points: 65,
    defaultWargear: [
      { id: "twin-autocannon", name: "Twin autocannon", image: "" },
      { id: "armoured-tracks", name: "Armoured tracks", image: "" },
    ],
    wargear: [
      { id: "storm-bolter", name: "Storm bolter", image: "" },
    ],
    ledBy: [],
  },

  {
    id: "taurox-prime",
    name: "Taurox Prime",
    faction: "astra-militarum",
    category: "transport",
    points: 90,
    defaultWargear: [
      { id: "taurox-battle-cannon", name: "Taurox battle cannon", image: "" },
      { id: "twin-taurox-hot-shot-volley-gun", name: "Twin Taurox hot-shot volley gun", image: "" },
      { id: "armoured-tracks", name: "Armoured tracks", image: "" },
    ],
    wargear: [
      { id: "taurox-gatling-cannon", name: "Taurox gatling cannon", image: "" },
      { id: "taurox-missile-launcher-frag", name: "Taurox missile launcher – frag", image: "" },
      { id: "taurox-missile-launcher-krak", name: "Taurox missile launcher – krak", image: "" },
    ],
    ledBy: [],
  },

  {
    id: "valkyrie",
    name: "Valkyrie",
    faction: "astra-militarum",
    category: "transport",
    points: 190,
    defaultWargear: [
      { id: "hellstrike-missiles", name: "Hellstrike missiles", image: "" },
      { id: "multi-laser", name: "Multi-laser", image: "" },
      { id: "armoured-hull", name: "Armoured hull", image: "" },
    ],
    wargear: [
      { id: "heavy-bolter", name: "Heavy bolter", image: "" },
      { id: "lascannon", name: "Lascannon", image: "" },
      { id: "multiple-rocket-pod", name: "Multiple rocket pod", image: "" },
    ],
    ledBy: [],
  },

  {
    id: "valkyrie-sky-talon",
    name: "Valkyrie Sky Talon",
    faction: "astra-militarum",
    category: "transport",
    points: 185,
    defaultWargear: [
      { id: "heavy-bolter", name: "Heavy bolter", image: "" },
      { id: "hellstrike-missile", name: "Hellstrike missile", image: "" },
      { id: "armoured-hull", name: "Armoured hull", image: "" },
    ],
    wargear: [
      { id: "multiple-rocket-pod", name: "Multiple rocket pod", image: "" },
    ],
    ledBy: [],
  },

  {
    id: "vendetta-gunship",
    name: "Vendetta Gunship",
    faction: "astra-militarum",
    category: "transport",
    points: 255,
    defaultWargear: [
      { id: "vendetta-twin-lascannon", name: "Vendetta twin lascannon", image: "" },
      { id: "armoured-hull", name: "Armoured hull", image: "" },
    ],
    wargear: [
      { id: "vendetta-hellstrike-rack", name: "Vendetta hellstrike rack", image: "" },
    ],
    ledBy: [],
  },

];
