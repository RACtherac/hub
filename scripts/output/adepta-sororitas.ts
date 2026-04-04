import type { Unit } from "../../../types/warhammer";

export const adeptaSororitasUnits: Unit[] = [

  {
    id: "battle-sisters-squad",
    name: "Battle Sisters Squad",
    faction: "adepta-sororitas",
    category: "battleline",
    points: 105,
    defaultWargear: [
      { id: "bolt-pistol", name: "Bolt pistol", image: "" },
      { id: "boltgun", name: "Boltgun", image: "" },
      { id: "condemnor-boltgun", name: "Condemnor boltgun", image: "" },
      { id: "close-combat-weapon", name: "Close combat weapon", image: "" },
    ],
    wargear: [
      { id: "artificer-crafted-storm-bolter", name: "Artificer-crafted storm bolter", image: "" },
      { id: "combi-weapon", name: "Combi-weapon", image: "" },
      { id: "heavy-bolter", name: "Heavy bolter", image: "" },
      { id: "inferno-pistol", name: "Inferno pistol", image: "" },
      { id: "meltagun", name: "Meltagun", image: "" },
      { id: "ministorum-flamer", name: "Ministorum flamer", image: "" },
      { id: "ministorum-hand-flamer", name: "Ministorum hand flamer", image: "" },
      { id: "ministorum-heavy-flamer", name: "Ministorum heavy flamer", image: "" },
      { id: "multi-melta", name: "Multi-melta", image: "" },
      { id: "plasma-pistol", name: "Plasma pistol", image: "", profiles: [{ profileName: "standard", range: '12"', attacks: "1", skill: "3+", strength: "7", ap: "-2", damage: "1", keywords: ["PISTOL"] }, { profileName: "supercharge", range: '12"', attacks: "1", skill: "3+", strength: "8", ap: "-3", damage: "2", keywords: ["PISTOL", "HAZARDOUS"] }] },
      { id: "chainsword", name: "Chainsword", image: "" },
      { id: "power-weapon", name: "Power weapon", image: "" },
    ],
    ledBy: ["aestred-thurga-and-agathae-dolan","canoness","dialogus","dogmata","hospitaller","imagifier","junith-eruita","ministorum-priest","palatine","triumph-of-saint-katherine","inquisitor","inquisitor-coteaz","inquisitor-draxus","inquisitor-greyfax"],
  },

  {
    id: "arco-flagellants",
    name: "Arco Flagellants",
    faction: "adepta-sororitas",
    category: "infantry",
    points: 45,
    defaultWargear: [
      { id: "arco-flails", name: "Arco-flails", image: "" },
    ],
    wargear: [],
    ledBy: [],
  },

  {
    id: "battle-sanctum",
    name: "Battle Sanctum",
    faction: "adepta-sororitas",
    category: "infantry",
    points: 170,
    defaultWargear: [],
    wargear: [],
    ledBy: [],
  },

  {
    id: "celestian-sacresants",
    name: "Celestian Sacresants",
    faction: "adepta-sororitas",
    category: "infantry",
    points: 70,
    defaultWargear: [
      { id: "bolt-pistol", name: "Bolt pistol", image: "" },
      { id: "hallowed-mace", name: "Hallowed mace", image: "" },
    ],
    wargear: [
      { id: "inferno-pistol", name: "Inferno pistol", image: "" },
      { id: "ministorum-hand-flamer", name: "Ministorum hand flamer", image: "" },
      { id: "plasma-pistol", name: "Plasma pistol", image: "", profiles: [{ profileName: "standard", range: '12"', attacks: "1", skill: "3+", strength: "7", ap: "-2", damage: "1", keywords: ["PISTOL"] }, { profileName: "supercharge", range: '12"', attacks: "1", skill: "3+", strength: "8", ap: "-3", damage: "2", keywords: ["PISTOL", "HAZARDOUS"] }] },
    ],
    ledBy: ["aestred-thurga-and-agathae-dolan","canoness","dialogus","dogmata","hospitaller","imagifier","junith-eruita","palatine"],
  },

  {
    id: "crusaders",
    name: "Crusaders",
    faction: "adepta-sororitas",
    category: "infantry",
    points: 40,
    defaultWargear: [
      { id: "power-weapon", name: "Power weapon", image: "" },
    ],
    wargear: [],
    ledBy: ["aestred-thurga-and-agathae-dolan","canoness","dialogus","dogmata","hospitaller","imagifier","junith-eruita","ministorum-priest","palatine","triumph-of-saint-katherine"],
  },

  {
    id: "death-cult-assassins",
    name: "Death Cult Assassins",
    faction: "adepta-sororitas",
    category: "infantry",
    points: 55,
    defaultWargear: [
      { id: "death-cult-power-blades", name: "Death Cult power blades", image: "" },
    ],
    wargear: [],
    ledBy: [],
  },

  {
    id: "dominion-squad",
    name: "Dominion Squad",
    faction: "adepta-sororitas",
    category: "infantry",
    points: 115,
    defaultWargear: [
      { id: "bolt-pistol", name: "Bolt pistol", image: "" },
      { id: "boltgun", name: "Boltgun", image: "" },
      { id: "condemnor-boltgun", name: "Condemnor boltgun", image: "" },
      { id: "close-combat-weapon", name: "Close combat weapon", image: "" },
    ],
    wargear: [
      { id: "artificer-crafted-storm-bolter", name: "Artificer-crafted storm bolter", image: "" },
      { id: "combi-weapon", name: "Combi-weapon", image: "" },
      { id: "inferno-pistol", name: "Inferno pistol", image: "" },
      { id: "meltagun", name: "Meltagun", image: "" },
      { id: "ministorum-flamer", name: "Ministorum flamer", image: "" },
      { id: "ministorum-hand-flamer", name: "Ministorum hand flamer", image: "" },
      { id: "plasma-pistol", name: "Plasma pistol", image: "", profiles: [{ profileName: "standard", range: '12"', attacks: "1", skill: "3+", strength: "7", ap: "-2", damage: "1", keywords: ["PISTOL"] }, { profileName: "supercharge", range: '12"', attacks: "1", skill: "3+", strength: "8", ap: "-3", damage: "2", keywords: ["PISTOL", "HAZARDOUS"] }] },
      { id: "chainsword", name: "Chainsword", image: "" },
      { id: "power-weapon", name: "Power weapon", image: "" },
    ],
    ledBy: ["aestred-thurga-and-agathae-dolan","canoness","dialogus","dogmata","hospitaller","imagifier","junith-eruita","ministorum-priest","palatine"],
  },

  {
    id: "repentia-squad",
    name: "Repentia Squad",
    faction: "adepta-sororitas",
    category: "infantry",
    points: 85,
    defaultWargear: [
      { id: "bolt-pistol", name: "Bolt pistol", image: "" },
      { id: "neural-whips", name: "Neural whips", image: "" },
    ],
    wargear: [
      { id: "penitent-eviscerator", name: "Penitent eviscerator", image: "" },
    ],
    ledBy: [],
  },

  {
    id: "retributor-squad",
    name: "Retributor Squad",
    faction: "adepta-sororitas",
    category: "infantry",
    points: 125,
    defaultWargear: [
      { id: "bolt-pistol", name: "Bolt pistol", image: "" },
      { id: "boltgun", name: "Boltgun", image: "" },
      { id: "condemnor-boltgun", name: "Condemnor boltgun", image: "" },
      { id: "close-combat-weapon", name: "Close combat weapon", image: "" },
    ],
    wargear: [
      { id: "combi-weapon", name: "Combi-weapon", image: "" },
      { id: "inferno-pistol", name: "Inferno pistol", image: "" },
      { id: "ministorum-hand-flamer", name: "Ministorum hand flamer", image: "" },
      { id: "ministorum-heavy-flamer", name: "Ministorum heavy flamer", image: "" },
      { id: "multi-melta", name: "Multi-melta", image: "" },
      { id: "plasma-pistol", name: "Plasma pistol", image: "", profiles: [{ profileName: "standard", range: '12"', attacks: "1", skill: "3+", strength: "7", ap: "-2", damage: "1", keywords: ["PISTOL"] }, { profileName: "supercharge", range: '12"', attacks: "1", skill: "3+", strength: "8", ap: "-3", damage: "2", keywords: ["PISTOL", "HAZARDOUS"] }] },
      { id: "chainsword", name: "Chainsword", image: "" },
      { id: "power-weapon", name: "Power weapon", image: "" },
    ],
    ledBy: ["aestred-thurga-and-agathae-dolan","canoness","dialogus","dogmata","hospitaller","imagifier","junith-eruita","palatine"],
  },

  {
    id: "saint-celestine",
    name: "Saint Celestine",
    faction: "adepta-sororitas",
    category: "infantry",
    points: 160,
    defaultWargear: [
      { id: "the-ardent-blade", name: "The Ardent Blade", image: "" },
    ],
    wargear: [
      { id: "bolt-pistol", name: "Bolt pistol", image: "" },
      { id: "power-weapon", name: "Power weapon", image: "" },
    ],
    ledBy: [],
  },

  {
    id: "seraphim-squad",
    name: "Seraphim Squad",
    faction: "adepta-sororitas",
    category: "infantry",
    points: 85,
    defaultWargear: [
      { id: "bolt-pistol", name: "Bolt pistol", image: "" },
      { id: "close-combat-weapon", name: "Close combat weapon", image: "" },
    ],
    wargear: [
      { id: "inferno-pistol", name: "Inferno pistol", image: "" },
      { id: "ministorum-hand-flamer", name: "Ministorum hand flamer", image: "" },
      { id: "chainsword", name: "Chainsword", image: "" },
      { id: "power-weapon", name: "Power weapon", image: "" },
    ],
    ledBy: ["canoness-with-jump-pack","saint-celestine"],
  },

  {
    id: "sisters-novitiate-squad",
    name: "Sisters Novitiate Squad",
    faction: "adepta-sororitas",
    category: "infantry",
    points: 100,
    defaultWargear: [
      { id: "bolt-pistol", name: "Bolt pistol", image: "" },
      { id: "boltgun", name: "Boltgun", image: "" },
      { id: "close-combat-weapon", name: "Close combat weapon", image: "" },
    ],
    wargear: [
      { id: "autogun", name: "Autogun", image: "" },
      { id: "power-weapon", name: "Power weapon", image: "" },
    ],
    ledBy: ["aestred-thurga-and-agathae-dolan","canoness","dialogus","hospitaller","junith-eruita","ministorum-priest","palatine"],
  },

  {
    id: "zephyrim-squad",
    name: "Zephyrim Squad",
    faction: "adepta-sororitas",
    category: "infantry",
    points: 80,
    defaultWargear: [
      { id: "bolt-pistol", name: "Bolt pistol", image: "" },
      { id: "power-weapon", name: "Power weapon", image: "" },
    ],
    wargear: [
      { id: "plasma-pistol", name: "Plasma pistol", image: "", profiles: [{ profileName: "standard", range: '12"', attacks: "1", skill: "3+", strength: "7", ap: "-2", damage: "1", keywords: ["PISTOL"] }, { profileName: "supercharge", range: '12"', attacks: "1", skill: "3+", strength: "8", ap: "-3", damage: "2", keywords: ["PISTOL", "HAZARDOUS"] }] },
    ],
    ledBy: ["canoness-with-jump-pack","saint-celestine"],
  },

  {
    id: "castigator",
    name: "Castigator",
    faction: "adepta-sororitas",
    category: "vehicle",
    points: 170,
    defaultWargear: [
      { id: "castigator-autocannons", name: "Castigator autocannons", image: "" },
      { id: "heavy-bolter", name: "Heavy bolter", image: "" },
      { id: "armoured-tracks", name: "Armoured tracks", image: "" },
    ],
    wargear: [
      { id: "castigator-battle-cannon", name: "Castigator battle cannon", image: "" },
      { id: "hunter-killer-missile", name: "Hunter-killer missile", image: "" },
      { id: "storm-bolter", name: "Storm bolter", image: "" },
    ],
    ledBy: [],
  },

  {
    id: "exorcist",
    name: "Exorcist",
    faction: "adepta-sororitas",
    category: "vehicle",
    points: 210,
    defaultWargear: [
      { id: "exorcist-missile-launcher", name: "Exorcist missile launcher", image: "" },
      { id: "heavy-bolter", name: "Heavy bolter", image: "" },
      { id: "armoured-tracks", name: "Armoured tracks", image: "" },
    ],
    wargear: [
      { id: "exorcist-conflagration-rockets", name: "Exorcist conflagration rockets", image: "" },
      { id: "hunter-killer-missile", name: "Hunter-killer missile", image: "" },
    ],
    ledBy: [],
  },

  {
    id: "mortifiers",
    name: "Mortifiers",
    faction: "adepta-sororitas",
    category: "vehicle",
    points: 70,
    defaultWargear: [
      { id: "heavy-bolter", name: "Heavy bolter", image: "" },
      { id: "penitent-buzz-blade", name: "Penitent buzz-blade", image: "" },
      { id: "twin-penitent-buzz-blades", name: "Twin penitent buzz-blades", image: "" },
    ],
    wargear: [
      { id: "mortifier-flamer", name: "Mortifier flamer", image: "" },
      { id: "penitent-flail", name: "Penitent flail", image: "" },
      { id: "twin-penitent-flails", name: "Twin penitent flails", image: "" },
    ],
    ledBy: [],
  },

  {
    id: "paragon-warsuits",
    name: "Paragon Warsuits",
    faction: "adepta-sororitas",
    category: "vehicle",
    points: 220,
    defaultWargear: [
      { id: "bolt-pistol", name: "Bolt pistol", image: "" },
      { id: "heavy-bolter", name: "Heavy bolter", image: "" },
      { id: "paragon-storm-bolters", name: "Paragon storm bolters", image: "" },
      { id: "paragon-war-blade", name: "Paragon war blade", image: "" },
    ],
    wargear: [
      { id: "ministorum-heavy-flamer", name: "Ministorum heavy flamer", image: "" },
      { id: "multi-melta", name: "Multi-melta", image: "" },
    ],
    ledBy: [],
  },

  {
    id: "penitent-engines",
    name: "Penitent Engines",
    faction: "adepta-sororitas",
    category: "vehicle",
    points: 75,
    defaultWargear: [
      { id: "penitent-flamers", name: "Penitent flamers", image: "" },
      { id: "penitent-buzz-blade", name: "Penitent buzz-blade", image: "" },
      { id: "twin-penitent-buzz-blades", name: "Twin penitent buzz-blades", image: "" },
    ],
    wargear: [
      { id: "penitent-flail", name: "Penitent flail", image: "" },
      { id: "twin-penitent-flails", name: "Twin penitent flails", image: "" },
    ],
    ledBy: [],
  },

  {
    id: "immolator",
    name: "Immolator",
    faction: "adepta-sororitas",
    category: "transport",
    points: 125,
    defaultWargear: [
      { id: "heavy-bolter", name: "Heavy bolter", image: "" },
      { id: "immolation-flamers", name: "Immolation flamers", image: "" },
      { id: "twin-heavy-bolter", name: "Twin heavy bolter", image: "" },
      { id: "armoured-tracks", name: "Armoured tracks", image: "" },
    ],
    wargear: [
      { id: "twin-multi-melta", name: "Twin multi-melta", image: "" },
    ],
    ledBy: [],
  },

  {
    id: "repressor",
    name: "Repressor",
    faction: "adepta-sororitas",
    category: "transport",
    points: 130,
    defaultWargear: [
      { id: "heavy-flamer", name: "Heavy flamer", image: "" },
      { id: "repressor-twin-heavy-flamer", name: "Repressor twin heavy flamer", image: "" },
      { id: "storm-bolter", name: "Storm bolter", image: "" },
      { id: "dozer-ram", name: "Dozer ram", image: "" },
    ],
    wargear: [],
    ledBy: [],
  },

  {
    id: "sororitas-rhino",
    name: "Sororitas Rhino",
    faction: "adepta-sororitas",
    category: "transport",
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

];
