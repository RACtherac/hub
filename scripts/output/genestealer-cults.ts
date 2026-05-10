import type { Unit } from "../../src/types/warhammer";

export const genestealerCultsUnits: Unit[] = [

  {
    id: "atalan-jackals",
    name: "Atalan Jackals",
    faction: "genestealer-cults",
    category: "mounted",
    points: 80,
    defaultWargear: [],
    wargear: [
      { id: "atalan-incinerator", name: "Atalan incinerator", image: "" },
      { id: "mining-laser", name: "Mining laser", image: "" },
    ],
    ledBy: [],
  },

  {
    id: "attilan-rough-riders",
    name: "Attilan Rough Riders",
    faction: "genestealer-cults",
    category: "mounted",
    points: 60,
    defaultWargear: [
      { id: "lasgun", name: "Lasgun", image: "" },
      { id: "laspistol", name: "Laspistol", image: "" },
      { id: "hunting-lance-frag-tip", name: "Hunting lance – frag tip", image: "" },
      { id: "hunting-lance-melta-tip", name: "Hunting lance – melta tip", image: "" },
      { id: "steed-s-hooves", name: "Steed's hooves", image: "" },
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
    faction: "genestealer-cults",
    category: "mounted",
    points: 70,
    defaultWargear: [
      { id: "death-rider-lascarbine", name: "Death Rider lascarbine", image: "" },
      { id: "frag-lance", name: "Frag lance", image: "" },
      { id: "power-sabre", name: "Power sabre", image: "" },
      { id: "steeds-savage-claws", name: "Steed's savage claws", image: "" },
    ],
    wargear: [],
    ledBy: [],
  },

  {
    id: "mukaali-riders",
    name: "Mukaali Riders",
    faction: "genestealer-cults",
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
    faction: "genestealer-cults",
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
    faction: "genestealer-cults",
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
    id: "acolyte-hybrids-with-autopistols",
    name: "Acolyte Hybrids With Autopistols",
    faction: "genestealer-cults",
    category: "battleline",
    points: 65,
    defaultWargear: [
      { id: "autopistol", name: "Autopistol", image: "" },
      { id: "cult-claws-and-knife", name: "Cult claws and knife", image: "" },
    ],
    wargear: [
      { id: "heavy-mining-tool", name: "Heavy mining tool", image: "" },
      { id: "leader-s-bio-weapons", name: "Leader's bio-weapons", image: "" },
    ],
    ledBy: ["acolyte-iconward","benefictus","biophagus","clamavus","locus","magus","nexos","primus"],
  },

  {
    id: "acolyte-hybrids-with-hand-flamers",
    name: "Acolyte Hybrids With Hand Flamers",
    faction: "genestealer-cults",
    category: "battleline",
    points: 70,
    defaultWargear: [
      { id: "hand-flamer", name: "Hand flamer", image: "" },
      { id: "cult-claws-and-knife", name: "Cult claws and knife", image: "" },
    ],
    wargear: [
      { id: "demolition-charges", name: "Demolition charges", image: "" },
      { id: "leader-s-bio-weapons", name: "Leader's bio-weapons", image: "" },
    ],
    ledBy: ["acolyte-iconward","benefictus","biophagus","clamavus","locus","magus","nexos","primus"],
  },

  {
    id: "cadian-shock-troops",
    name: "Cadian Shock Troops",
    faction: "genestealer-cults",
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
    ledBy: ["inquisitor","inquisitor-coteaz","inquisitor-draxus","inquisitor-greyfax"],
  },

  {
    id: "catachan-jungle-fighters",
    name: "Catachan Jungle Fighters",
    faction: "genestealer-cults",
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
    ledBy: ["inquisitor","inquisitor-coteaz","inquisitor-draxus","inquisitor-greyfax"],
  },

  {
    id: "death-korps-of-krieg",
    name: "Death Korps Of Krieg",
    faction: "genestealer-cults",
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
    ledBy: ["inquisitor","inquisitor-coteaz","inquisitor-draxus","inquisitor-greyfax"],
  },

  {
    id: "gargoyles",
    name: "Gargoyles",
    faction: "genestealer-cults",
    category: "battleline",
    points: 85,
    abilities: [
      {
        name: "Winged Swarm",
        description: "In your Shooting phase, after this unit has shot, if it is not within Engagement Range of any enemy units, it can make a Normal move of up to 6\". If it does, until the end of the turn, this unit is not eligible to declare a charge.",
      },
    ],
    defaultWargear: [
      { id: "fleshborer", name: "Fleshborer", image: "", profiles: [{ range: '18"', attacks: "1", skill: "4+", strength: "5", ap: "0", damage: "1", keywords: ["ASSAULT"] }] },
      { id: "blinding-venom", name: "Blinding venom", image: "", profiles: [{ range: "Melee", attacks: "1", skill: "4+", strength: "3", ap: "0", damage: "1" }] },
    ],
    wargear: [],
    ledBy: [],
  },

  {
    id: "neophyte-hybrids",
    name: "Neophyte Hybrids",
    faction: "genestealer-cults",
    category: "battleline",
    points: 65,
    defaultWargear: [
      { id: "autopistol", name: "Autopistol", image: "" },
      { id: "hybrid-firearm", name: "Hybrid firearm", image: "" },
      { id: "close-combat-weapon", name: "Close combat weapon", image: "" },
    ],
    wargear: [
      { id: "anointed-pistol", name: "Anointed pistol", image: "" },
      { id: "chainsword", name: "Chainsword", image: "" },
      { id: "power-weapon", name: "Power weapon", image: "" },
    ],
    ledBy: ["acolyte-iconward","benefictus","biophagus","clamavus","locus","magus","nexos","primus"],
  },

  {
    id: "aberrants",
    name: "Aberrants",
    faction: "genestealer-cults",
    category: "infantry",
    points: 135,
    defaultWargear: [
      { id: "aberrant-weapons", name: "Aberrant weapons", image: "" },
    ],
    wargear: [],
    ledBy: ["abominant","biophagus"],
  },

  {
    id: "aegis-defence-line",
    name: "Aegis Defence Line",
    faction: "genestealer-cults",
    category: "infantry",
    points: 145,
    defaultWargear: [],
    wargear: [],
    ledBy: [],
  },

  {
    id: "artillery-team",
    name: "Artillery Team",
    faction: "genestealer-cults",
    category: "infantry",
    points: 95,
    defaultWargear: [
      { id: "heavy-mortar", name: "Heavy mortar", image: "" },
      { id: "lasgun", name: "Lasgun", image: "" },
      { id: "crew-close-combat-weapons", name: "Crew close combat weapons", image: "" },
    ],
    wargear: [
      { id: "heavy-quad-launcher", name: "Heavy quad launcher", image: "" },
      { id: "multiple-rocket-launcher", name: "Multiple rocket launcher", image: "" },
      { id: "siege-cannon", name: "Siege cannon", image: "" },
    ],
    ledBy: [],
  },

  {
    id: "cadian-command-squad",
    name: "Cadian Command Squad",
    faction: "genestealer-cults",
    category: "infantry",
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
      { id: "meltagun", name: "Meltagun", image: "" },
      { id: "plasma-gun-standard", name: "Plasma gun – standard", image: "" },
      { id: "plasma-gun-supercharge", name: "Plasma gun – supercharge", image: "" },
      { id: "plasma-pistol", name: "Plasma pistol", image: "", profiles: [{ profileName: "standard", range: '12"', attacks: "1", skill: "3+", strength: "7", ap: "-2", damage: "1", keywords: ["PISTOL"] }, { profileName: "supercharge", range: '12"', attacks: "1", skill: "3+", strength: "8", ap: "-3", damage: "2", keywords: ["PISTOL", "HAZARDOUS"] }] },
      { id: "close-combat-weapon", name: "Close combat weapon", image: "" },
      { id: "power-fist", name: "Power fist", image: "" },
      { id: "power-weapon", name: "Power weapon", image: "" },
    ],
    ledBy: [],
  },

  {
    id: "cadian-heavy-weapons-squad",
    name: "Cadian Heavy Weapons Squad",
    faction: "genestealer-cults",
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
    id: "catachan-command-squad",
    name: "Catachan Command Squad",
    faction: "genestealer-cults",
    category: "infantry",
    points: 65,
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
    ledBy: [],
  },

  {
    id: "catachan-heavy-weapons-squad",
    name: "Catachan Heavy Weapons Squad",
    faction: "genestealer-cults",
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
    faction: "genestealer-cults",
    category: "infantry",
    points: 110,
    defaultWargear: [
      { id: "sergeant-s-pistol", name: "Sergeant's pistol", image: "" },
      { id: "close-combat-weapon", name: "Close combat weapon", image: "" },
      { id: "sergeant-s-close-combat-weapon", name: "Sergeant's close combat weapon", image: "" },
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
    faction: "genestealer-cults",
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
    faction: "genestealer-cults",
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
    faction: "genestealer-cults",
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
    id: "heavy-mortar-team",
    name: "Heavy Mortar Team",
    faction: "genestealer-cults",
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
    faction: "genestealer-cults",
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
    id: "hybrid-metamorphs",
    name: "Hybrid Metamorphs",
    faction: "genestealer-cults",
    category: "infantry",
    points: 80,
    defaultWargear: [
      { id: "autopistol", name: "Autopistol", image: "" },
      { id: "leader-s-bio-weapons", name: "Leader's bio-weapons", image: "" },
    ],
    wargear: [
      { id: "hand-flamer", name: "Hand flamer", image: "" },
      { id: "metamorph-mutations-strike", name: "Metamorph mutations – strike", image: "" },
      { id: "metamorph-mutations-sweep", name: "Metamorph mutations – sweep", image: "" },
    ],
    ledBy: ["acolyte-iconward","benefictus","biophagus","clamavus","locus","magus","nexos","primus"],
  },

  {
    id: "hydra-platform",
    name: "Hydra Platform",
    faction: "genestealer-cults",
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
    faction: "genestealer-cults",
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
    ledBy: [],
  },

  {
    id: "krieg-combat-engineers",
    name: "Krieg Combat Engineers",
    faction: "genestealer-cults",
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
    ledBy: [],
  },

  {
    id: "krieg-command-squad",
    name: "Krieg Command Squad",
    faction: "genestealer-cults",
    category: "infantry",
    points: 65,
    defaultWargear: [
      { id: "laspistol", name: "Laspistol", image: "" },
      { id: "power-weapon", name: "Power weapon", image: "" },
    ],
    wargear: [
      { id: "boltgun", name: "Boltgun", image: "" },
      { id: "flamer", name: "Flamer", image: "" },
      { id: "grenade-launcher-frag", name: "Grenade launcher – frag", image: "" },
      { id: "grenade-launcher-krak", name: "Grenade launcher – krak", image: "" },
      { id: "meltagun", name: "Meltagun", image: "" },
      { id: "plasma-gun-standard", name: "Plasma gun – standard", image: "" },
      { id: "plasma-gun-supercharge", name: "Plasma gun – supercharge", image: "" },
      { id: "chainsword", name: "Chainsword", image: "" },
      { id: "trench-club", name: "Trench club", image: "" },
    ],
    ledBy: [],
  },

  {
    id: "krieg-heavy-weapons-squad",
    name: "Krieg Heavy Weapons Squad",
    faction: "genestealer-cults",
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
    id: "lictor",
    name: "Lictor",
    faction: "genestealer-cults",
    category: "infantry",
    points: 60,
    defaultWargear: [
      { id: "lictor-claws-and-talons", name: "Lictor claws and talons", image: "" },
    ],
    wargear: [],
    ledBy: [],
  },

  {
    id: "manticore-platform",
    name: "Manticore Platform",
    faction: "genestealer-cults",
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
    faction: "genestealer-cults",
    category: "infantry",
    points: 35,
    defaultWargear: [
      { id: "servitor-s-servo-arm", name: "Servitor's servo-arm", image: "" },
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
    id: "neurolictor",
    name: "Neurolictor",
    faction: "genestealer-cults",
    category: "infantry",
    points: 80,
    defaultWargear: [
      { id: "piercing-claws-and-talons", name: "Piercing claws and talons", image: "" },
    ],
    wargear: [],
    ledBy: [],
  },

  {
    id: "purestrain-genestealers",
    name: "Purestrain Genestealers",
    faction: "genestealer-cults",
    category: "infantry",
    points: 75,
    defaultWargear: [
      { id: "cult-claws-and-talons", name: "Cult claws and talons", image: "" },
    ],
    wargear: [],
    ledBy: [],
  },

  {
    id: "quartermaster-cadre-squad",
    name: "Quartermaster Cadre Squad",
    faction: "genestealer-cults",
    category: "infantry",
    points: 45,
    defaultWargear: [
      { id: "quartermaster-s-pistol", name: "Quartermaster's pistol", image: "" },
      { id: "quartermaster-s-close-combat-weapon", name: "Quartermaster's close combat weapon", image: "" },
    ],
    wargear: [
      { id: "medical-scalpels", name: "Medical scalpels", image: "" },
    ],
    ledBy: [],
  },

  {
    id: "rapier-laser-destroyer-battery",
    name: "Rapier Laser Destroyer Battery",
    faction: "genestealer-cults",
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
    id: "raveners",
    name: "Raveners",
    faction: "genestealer-cults",
    category: "infantry",
    points: 75,
    defaultWargear: [
      { id: "thoracic-bio-weapon", name: "Thoracic bio-weapon", image: "" },
      { id: "ravener-claws-and-talons", name: "Ravener claws and talons", image: "" },
    ],
    wargear: [],
    ledBy: [],
  },

  {
    id: "regimental-attach-s",
    name: "Regimental Attach S",
    faction: "genestealer-cults",
    category: "infantry",
    points: 40,
    defaultWargear: [
      { id: "laspistol", name: "Laspistol", image: "" },
      { id: "close-combat-weapon", name: "Close combat weapon", image: "" },
    ],
    wargear: [
      { id: "astropath-s-stave", name: "Astropath's stave", image: "" },
    ],
    ledBy: [],
  },

  {
    id: "sabre-weapons-battery",
    name: "Sabre Weapons Battery",
    faction: "genestealer-cults",
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
    id: "von-ryan-s-leapers",
    name: "Von Ryan S Leapers",
    faction: "genestealer-cults",
    category: "infantry",
    points: 70,
    defaultWargear: [
      { id: "leaper-s-talons", name: "Leaper's talons", image: "" },
    ],
    wargear: [],
    ledBy: [],
  },

  {
    id: "achilles-ridgerunners",
    name: "Achilles Ridgerunners",
    faction: "genestealer-cults",
    category: "vehicle",
    points: 85,
    defaultWargear: [
      { id: "heavy-mining-laser", name: "Heavy mining laser", image: "" },
      { id: "twin-heavy-stubber", name: "Twin heavy stubber", image: "" },
      { id: "armoured-hull", name: "Armoured hull", image: "" },
    ],
    wargear: [
      { id: "achilles-missile-launcher", name: "Achilles missile launcher", image: "" },
      { id: "heavy-mortar", name: "Heavy mortar", image: "" },
    ],
    ledBy: [],
  },

  {
    id: "arkurian-stormhammer",
    name: "Arkurian Stormhammer",
    faction: "genestealer-cults",
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
    faction: "genestealer-cults",
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
    faction: "genestealer-cults",
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
    faction: "genestealer-cults",
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
    id: "baneblade",
    name: "Baneblade",
    faction: "genestealer-cults",
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
    faction: "genestealer-cults",
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
    faction: "genestealer-cults",
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
    faction: "genestealer-cults",
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
    faction: "genestealer-cults",
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
    faction: "genestealer-cults",
    category: "vehicle",
    points: 25,
    defaultWargear: [],
    wargear: [],
    ledBy: [],
  },

  {
    id: "deathstrike",
    name: "Deathstrike",
    faction: "genestealer-cults",
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
    faction: "genestealer-cults",
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
    faction: "genestealer-cults",
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
    faction: "genestealer-cults",
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
    faction: "genestealer-cults",
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
    faction: "genestealer-cults",
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
    faction: "genestealer-cults",
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
    faction: "genestealer-cults",
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
    faction: "genestealer-cults",
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
    faction: "genestealer-cults",
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
    faction: "genestealer-cults",
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
    faction: "genestealer-cults",
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
    faction: "genestealer-cults",
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
    faction: "genestealer-cults",
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
    faction: "genestealer-cults",
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
    faction: "genestealer-cults",
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
    faction: "genestealer-cults",
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
    faction: "genestealer-cults",
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
    faction: "genestealer-cults",
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
    faction: "genestealer-cults",
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
    faction: "genestealer-cults",
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
    faction: "genestealer-cults",
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
    faction: "genestealer-cults",
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
    faction: "genestealer-cults",
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
    id: "praetor",
    name: "Praetor",
    faction: "genestealer-cults",
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
    faction: "genestealer-cults",
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
    faction: "genestealer-cults",
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
    faction: "genestealer-cults",
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
    faction: "genestealer-cults",
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
    faction: "genestealer-cults",
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
    faction: "genestealer-cults",
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
    faction: "genestealer-cults",
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
    faction: "genestealer-cults",
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
    faction: "genestealer-cults",
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
    faction: "genestealer-cults",
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
    id: "tectonic-fragdrill",
    name: "Tectonic Fragdrill",
    faction: "genestealer-cults",
    category: "vehicle",
    points: 125,
    defaultWargear: [
      { id: "fragdrill", name: "Fragdrill", image: "" },
    ],
    wargear: [],
    ledBy: [],
  },

  {
    id: "trojan-support-vehicle",
    name: "Trojan Support Vehicle",
    faction: "genestealer-cults",
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
    faction: "genestealer-cults",
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
    id: "wyvern",
    name: "Wyvern",
    faction: "genestealer-cults",
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
    id: "mawloc",
    name: "Mawloc",
    faction: "genestealer-cults",
    category: "monster",
    points: 145,
    defaultWargear: [
      { id: "distensible-jaw", name: "Distensible jaw", image: "" },
      { id: "mawloc-scything-talons", name: "Mawloc scything talons", image: "" },
    ],
    wargear: [],
    ledBy: [],
  },

  {
    id: "trygon",
    name: "Trygon",
    faction: "genestealer-cults",
    category: "monster",
    points: 140,
    defaultWargear: [
      { id: "bio-electric-pulse", name: "Bio-electric pulse", image: "" },
      { id: "trygon-scything-talons", name: "Trygon scything talons", image: "" },
    ],
    wargear: [],
    ledBy: [],
  },

  {
    id: "banehammer",
    name: "Banehammer",
    faction: "genestealer-cults",
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
    faction: "genestealer-cults",
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
    faction: "genestealer-cults",
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
    faction: "genestealer-cults",
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
    faction: "genestealer-cults",
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
    id: "goliath-rockgrinder",
    name: "Goliath Rockgrinder",
    faction: "genestealer-cults",
    category: "transport",
    points: 120,
    defaultWargear: [
      { id: "demolition-charge-cache", name: "Demolition charge cache", image: "" },
      { id: "heavy-mining-laser", name: "Heavy mining laser", image: "" },
      { id: "heavy-stubber", name: "Heavy stubber", image: "" },
      { id: "drilldozer-blade", name: "Drilldozer blade", image: "" },
    ],
    wargear: [
      { id: "clearance-incinerator", name: "Clearance incinerator", image: "" },
      { id: "heavy-seismic-cannon", name: "Heavy seismic cannon", image: "" },
    ],
    ledBy: [],
  },

  {
    id: "goliath-truck",
    name: "Goliath Truck",
    faction: "genestealer-cults",
    category: "transport",
    points: 85,
    defaultWargear: [
      { id: "demolition-charge-cache", name: "Demolition charge cache", image: "" },
      { id: "heavy-stubber", name: "Heavy stubber", image: "" },
      { id: "twin-autocannon", name: "Twin autocannon", image: "" },
      { id: "armoured-hull", name: "Armoured hull", image: "" },
    ],
    wargear: [],
    ledBy: [],
  },

  {
    id: "gorgon-heavy-transport",
    name: "Gorgon Heavy Transport",
    faction: "genestealer-cults",
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
    faction: "genestealer-cults",
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
    faction: "genestealer-cults",
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
    faction: "genestealer-cults",
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
    faction: "genestealer-cults",
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
    faction: "genestealer-cults",
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
    id: "tyrannocyte",
    name: "Tyrannocyte",
    faction: "genestealer-cults",
    category: "transport",
    points: 105,
    defaultWargear: [
      { id: "tyrannocyte-bio-weapons", name: "Tyrannocyte bio-weapons", image: "" },
      { id: "flensing-whips", name: "Flensing whips", image: "" },
    ],
    wargear: [],
    ledBy: [],
  },

];
