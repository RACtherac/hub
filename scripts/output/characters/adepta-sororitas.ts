import type { Character } from "../../../src/types/warhammer";

export const adeptaSororitasCharacters: Character[] = [

  {
    id: "aestred-thurga-and-agathae-dolan",
    name: "Aestred Thurga And Agathae Dolan",
    faction: "adepta-sororitas",
    image: "",
    points: 85,
    canAttachTo: [],
    defaultWargear: [
      { id: "bolt-pistol", name: "Bolt pistol", image: "", profiles: [{ range: '12"', attacks: "1", skill: "3+", strength: "4", ap: "0", damage: "1", keywords: ["PISTOL"] }] },
      { id: "blade-of-vigil", name: "Blade of Vigil", image: "", profiles: [{ range: "Melee", attacks: "5", skill: "2+", strength: "5", ap: "-2", damage: "2" }] },
    ],
    wargear: [
      { id: "scribe-s-staff", name: "Scribe's staff", image: "", profiles: [{ range: "Melee", attacks: "3", skill: "3+", strength: "4", ap: "0", damage: "1" }] },
    ],
  },

  {
    id: "canoness",
    name: "Canoness",
    faction: "adepta-sororitas",
    image: "",
    points: 50,
    canAttachTo: [],
    defaultWargear: [
      { id: "bolt-pistol", name: "Bolt pistol", image: "", profiles: [{ range: '12"', attacks: "1", skill: "3+", strength: "4", ap: "0", damage: "1", keywords: ["PISTOL"] }] },
      { id: "hallowed-chainsword", name: "Hallowed Chainsword", image: "", profiles: [{ range: "Melee", attacks: "5", skill: "3+", strength: "4", ap: "0", damage: "1" }] },
    ],
    wargear: [
      { id: "brazier-of-holy-fire", name: "Brazier of holy fire", image: "", profiles: [{ range: '9"', attacks: "2", skill: "N/A", strength: "5", ap: "0", damage: "1", keywords: ["IGNORES COVER", "TORRENT"] }] },
      { id: "condemnor-boltgun", name: "Condemnor boltgun", image: "", profiles: [{ range: '24"', attacks: "2", skill: "3+", strength: "4", ap: "0", damage: "1", keywords: ["ANTI-PSYKER 4+", "RAPID FIRE 1"] }] },
      { id: "inferno-pistol", name: "Inferno pistol", image: "", profiles: [{ range: '6"', attacks: "1", skill: "3+", strength: "8", ap: "-4", damage: "D3", keywords: ["MELTA 2", "PISTOL"] }] },
      { id: "plasma-pistol", name: "Plasma pistol", image: "", profiles: [{ profileName: "standard", range: '12"', attacks: "1", skill: "3+", strength: "7", ap: "-2", damage: "1", keywords: ["PISTOL"] }, { profileName: "supercharge", range: '12"', attacks: "1", skill: "3+", strength: "8", ap: "-3", damage: "2", keywords: ["PISTOL", "HAZARDOUS"] }] },
      { id: "blessed-blade", name: "Blessed blade", image: "", profiles: [{ range: "Melee", attacks: "4", skill: "3+", strength: "5", ap: "-2", damage: "1" }] },
      { id: "power-weapon", name: "Power weapon", image: "", profiles: [{ range: "Melee", attacks: "4", skill: "3+", strength: "5", ap: "-2", damage: "1" }] },
    ],
  },

  {
    id: "canoness-with-jump-pack",
    name: "Canoness With Jump Pack",
    faction: "adepta-sororitas",
    image: "",
    points: 75,
    canAttachTo: [],
    defaultWargear: [
      { id: "blessed-halberd", name: "Blessed halberd", image: "", profiles: [{ range: "Melee", attacks: "4", skill: "3+", strength: "6", ap: "-2", damage: "2" }] },
    ],
    wargear: [
      { id: "ministorum-hand-flamer", name: "Ministorum hand flamer", image: "", profiles: [{ range: '6"', attacks: "D6", skill: "N/A", strength: "3", ap: "0", damage: "1", keywords: ["IGNORES COVER", "PISTOL", "TORRENT"] }] },
      { id: "holy-eviscerator", name: "Holy Eviscerator", image: "", profiles: [{ range: "Melee", attacks: "3", skill: "3+", strength: "8", ap: "-2", damage: "2", keywords: ["SUSTAINED HITS 1"] }] },
      { id: "power-weapon", name: "Power weapon", image: "", profiles: [{ range: "Melee", attacks: "4", skill: "3+", strength: "5", ap: "-2", damage: "1" }] },
    ],
  },

  {
    id: "celestian-sacresant-aveline",
    name: "Celestian Sacresant Aveline",
    faction: "adepta-sororitas",
    image: "",
    points: 45,
    canAttachTo: [],
    defaultWargear: [
      { id: "ministorum-hand-flamer", name: "Ministorum hand flamer", image: "", profiles: [{ range: '6"', attacks: "D6", skill: "N/A", strength: "3", ap: "0", damage: "1", keywords: ["IGNORES COVER", "PISTOL", "TORRENT"] }] },
      { id: "the-thorn-of-the-white-rose", name: "The Thorn of the White Rose", image: "", profiles: [{ range: "Melee", attacks: "5", skill: "3+", strength: "5", ap: "-2", damage: "1" }] },
    ],
    wargear: [],
  },

  {
    id: "daemonifuge",
    name: "Daemonifuge",
    faction: "adepta-sororitas",
    image: "",
    points: 85,
    canAttachTo: [],
    defaultWargear: [
      { id: "bolt-pistol", name: "Bolt pistol", image: "", profiles: [{ range: '12"', attacks: "1", skill: "3+", strength: "4", ap: "0", damage: "1", keywords: ["PISTOL"] }] },
      { id: "sanctity", name: "Sanctity", image: "", profiles: [{ range: "Melee", attacks: "6", skill: "3+", strength: "5", ap: "-2", damage: "1" }] },
    ],
    wargear: [
      { id: "the-outcast-s-weapons", name: "The Outcast's Weapons", image: "", profiles: [{ range: "Melee", attacks: "5", skill: "3+", strength: "5", ap: "-1", damage: "2" }] },
    ],
  },

  {
    id: "dialogus",
    name: "Dialogus",
    faction: "adepta-sororitas",
    image: "",
    points: 40,
    canAttachTo: [],
    defaultWargear: [
      { id: "bolt-pistol", name: "Bolt pistol", image: "", profiles: [{ range: '12"', attacks: "1", skill: "3+", strength: "4", ap: "0", damage: "1", keywords: ["PISTOL"] }] },
      { id: "dialogus-staff", name: "Dialogus staff", image: "", profiles: [{ range: "Melee", attacks: "3", skill: "3+", strength: "4", ap: "0", damage: "1" }] },
    ],
    wargear: [],
  },

  {
    id: "dogmata",
    name: "Dogmata",
    faction: "adepta-sororitas",
    image: "",
    points: 45,
    canAttachTo: [],
    defaultWargear: [
      { id: "bolt-pistol", name: "Bolt pistol", image: "", profiles: [{ range: '12"', attacks: "1", skill: "3+", strength: "4", ap: "0", damage: "1", keywords: ["PISTOL"] }] },
      { id: "mace-of-the-righteous", name: "Mace of the righteous", image: "", profiles: [{ range: "Melee", attacks: "4", skill: "3+", strength: "6", ap: "-1", damage: "1" }] },
    ],
    wargear: [],
  },

  {
    id: "hospitaller",
    name: "Hospitaller",
    faction: "adepta-sororitas",
    image: "",
    points: 50,
    canAttachTo: [],
    defaultWargear: [
      { id: "bolt-pistol", name: "Bolt pistol", image: "", profiles: [{ range: '12"', attacks: "1", skill: "3+", strength: "4", ap: "0", damage: "1", keywords: ["PISTOL"] }] },
      { id: "chirurgeon-s-tools", name: "Chirurgeon's tools", image: "", profiles: [{ range: "Melee", attacks: "3", skill: "3+", strength: "3", ap: "0", damage: "1" }] },
    ],
    wargear: [],
  },

  {
    id: "imagifier",
    name: "Imagifier",
    faction: "adepta-sororitas",
    image: "",
    points: 65,
    canAttachTo: ["battle-sisters-squad", "celestian-insidiants", "celestian-sacresants", "dominion-squad", "retributor-squad"],
    defaultWargear: [
      { id: "bolt-pistol", name: "Bolt pistol", image: "", profiles: [{ range: '12"', attacks: "1", skill: "3+", strength: "4", ap: "0", damage: "1", keywords: ["PISTOL"] }] },
      { id: "boltgun", name: "Boltgun", image: "", profiles: [{ range: '24"', attacks: "1", skill: "3+", strength: "4", ap: "0", damage: "1", keywords: ["RAPID FIRE 1"] }] },
      { id: "close-combat-weapon", name: "Close combat weapon", image: "", profiles: [{ range: "Melee", attacks: "3", skill: "4+", strength: "3", ap: "0", damage: "1" }] },
    ],
    wargear: [],
    abilities: [
      {
        name: "Litany of Deeds",
        description: "Each time you gain a Miracle dice as the result of an ADEPTA SORORITAS unit or model from your army being destroyed, if that unit or model was destroyed within 12\" of this model, you can re-roll the result of that Miracle dice before adding it to your Miracle dice pool.",
      },
      {
        name: "Stanchion of Holy Martyrs",
        description: "While this model is leading a unit, models in that unit have a Save characteristic of 2+ and a 4+ invulnerable save.",
      },
    ],
  },

  {
    id: "junith-eruita",
    name: "Junith Eruita",
    faction: "adepta-sororitas",
    image: "",
    points: 90,
    canAttachTo: [],
    defaultWargear: [
      { id: "twin-ministorum-heavy-flamer", name: "Twin Ministorum heavy flamer", image: "", profiles: [{ range: '12"', attacks: "D6", skill: "N/A", strength: "5", ap: "-1", damage: "1", keywords: ["IGNORES COVER", "TORRENT", "TWIN-LINKED"] }] },
      { id: "mace-of-castigation", name: "Mace of Castigation", image: "", profiles: [{ range: "Melee", attacks: "5", skill: "3+", strength: "6", ap: "-1", damage: "2" }] },
    ],
    wargear: [],
  },

  {
    id: "ministorum-priest",
    name: "Ministorum Priest",
    faction: "adepta-sororitas",
    image: "",
    points: 50,
    canAttachTo: [],
    defaultWargear: [
      { id: "zealot-s-vindictor", name: "Zealot's vindictor", image: "", profiles: [{ range: "Melee", attacks: "4", skill: "4+", strength: "4", ap: "0", damage: "1" }] },
    ],
    wargear: [
      { id: "holy-pistol", name: "Holy pistol", image: "", profiles: [{ range: '12"', attacks: "1", skill: "3+", strength: "4", ap: "0", damage: "1", keywords: ["PISTOL"] }] },
      { id: "power-weapon", name: "Power Weapon", image: "", profiles: [{ range: "Melee", attacks: "4", skill: "3+", strength: "5", ap: "-2", damage: "1" }] },
    ],
  },

  {
    id: "morvenn-vahl",
    name: "Morvenn Vahl",
    faction: "adepta-sororitas",
    image: "",
    points: 185,
    canAttachTo: ["paragon-warsuits"],
    keywords: ["SUPREME COMMANDER"],
    defaultWargear: [
      { id: "fidelis", name: "Fidelis", image: "", profiles: [{ range: '36"', attacks: "3", skill: "2+", strength: "6", ap: "-1", damage: "2", keywords: ["SUSTAINED HITS 1"] }] },
      { id: "paragon-missile-launcher-prioris", name: "Paragon missile launcher – prioris", image: "", profiles: [{ range: '36"', attacks: "2", skill: "2+", strength: "9", ap: "-2", damage: "D6" }] },
      { id: "paragon-missile-launcher-sanctorum-blast", name: "Paragon missile launcher – sanctorum blast", image: "", profiles: [{ range: '36"', attacks: "2D6", skill: "2+", strength: "4", ap: "0", damage: "1" }] },
      { id: "lance-of-illumination-strike", name: "Lance of Illumination – strike", image: "", profiles: [{ range: "Melee", attacks: "5", skill: "2+", strength: "8", ap: "-2", damage: "3", keywords: ["DEVASTATING WOUNDS"] }] },
      { id: "lance-of-illumination-sweep", name: "Lance of Illumination – sweep", image: "", profiles: [{ range: "Melee", attacks: "10", skill: "2+", strength: "5", ap: "-1", damage: "1", keywords: ["DEVASTATING WOUNDS"] }] },
    ],
    wargear: [],
    abilities: [
      {
        name: "Abbess Sanctorum",
        description: "While this model is leading a unit, each time a model in that unit makes an attack, you can re-roll the Hit roll and you can re-roll the Wound roll.",
      },
      {
        name: "Righteous Repugnance",
        description: "Each time this model's unit is selected to shoot or fight, you can discard 1 Miracle dice. If you do, until the end of the phase, add 3 to the Attacks characteristic of Fidelis and the Lance of Illumination. Each time an enemy unit is destroyed by this model, you gain 1 Miracle dice.",
      },
    ],
  },

  {
    id: "palatine",
    name: "Palatine",
    faction: "adepta-sororitas",
    image: "",
    points: 50,
    canAttachTo: [],
    defaultWargear: [
      { id: "bolt-pistol", name: "Bolt pistol", image: "", profiles: [{ range: '12"', attacks: "1", skill: "3+", strength: "4", ap: "0", damage: "1", keywords: ["PISTOL"] }] },
      { id: "palatine-blade", name: "Palatine blade", image: "", profiles: [{ range: "Melee", attacks: "5", skill: "3+", strength: "5", ap: "-2", damage: "1" }] },
    ],
    wargear: [
      { id: "plasma-pistol", name: "Plasma pistol", image: "", profiles: [{ profileName: "standard", range: '12"', attacks: "1", skill: "3+", strength: "7", ap: "-2", damage: "1", keywords: ["PISTOL"] }, { profileName: "supercharge", range: '12"', attacks: "1", skill: "3+", strength: "8", ap: "-3", damage: "2", keywords: ["PISTOL", "HAZARDOUS"] }] },
    ],
  },

  {
    id: "triumph-of-saint-katherine",
    name: "Triumph Of Saint Katherine",
    faction: "adepta-sororitas",
    image: "",
    points: 250,
    canAttachTo: [],
    defaultWargear: [
      { id: "bolt-pistols", name: "Bolt pistols", image: "", profiles: [{ range: '12"', attacks: "1", skill: "3+", strength: "4", ap: "0", damage: "1", keywords: ["PISTOL"] }] },
      { id: "relic-weapons", name: "Relic weapons", image: "", profiles: [{ range: "Melee", attacks: "5", skill: "3+", strength: "5", ap: "-2", damage: "2" }] },
    ],
    wargear: [
      { id: "relics-of-the-matriarchs", name: "RELICS OF THE MATRIARCHS", image: "", profiles: [{ range: "Melee", attacks: "6", skill: "3+", strength: "5", ap: "-2", damage: "2" }] },
    ],
  },

  {
    id: "saint-celestine",
    name: "Saint Celestine",
    faction: "adepta-sororitas",
    image: "",
    points: 150,
    canAttachTo: ["seraphim-squad", "zephyrim-squad"],
    defaultWargear: [
      { id: "sc-bolt-pistol", name: "Bolt pistol", image: "", profiles: [{ range: '12"', attacks: "1", skill: "3+", strength: "4", ap: "0", damage: "1", keywords: ["PISTOL"] }] },
      { id: "sc-the-ardent-blade-ranged", name: "The Ardent Blade", image: "", profiles: [{ range: '12"', attacks: "D6", skill: "N/A", strength: "6", ap: "-2", damage: "1", keywords: ["IGNORES COVER", "TORRENT"] }] },
      { id: "sc-power-weapon", name: "Power weapon", image: "", profiles: [{ range: "Melee", attacks: "4", skill: "3+", strength: "4", ap: "-2", damage: "1" }] },
      { id: "sc-the-ardent-blade-melee", name: "The Ardent Blade", image: "", profiles: [{ range: "Melee", attacks: "5", skill: "2+", strength: "6", ap: "-3", damage: "2", keywords: ["DEVASTATING WOUNDS"] }] },
    ],
    wargear: [],
    abilities: [
      {
        name: "Healing Tears",
        description: "While this unit contains a Celestine model, in your Command phase, if this unit is below its Starting Strength, either one destroyed Geminae Superia model or up to D3 other Bodyguard models are returned to this unit.",
      },
      {
        name: "Lifewards",
        description: "While this unit contains one or more Geminae Superia models, Celestine has the Feel No Pain 4+ ability.",
      },
      {
        name: "Miraculous Intervention",
        description: "The first time this unit's Celestine model is destroyed, roll one D6 at the end of the phase. On a 2+, set that Celestine model back up on the battlefield, as close as possible to where it was destroyed and not within Engagement Range of any enemy units, with its full wounds remaining.",
      },
    ],
  },

];
