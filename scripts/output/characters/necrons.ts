import type { Character } from "../../../src/types/warhammer";

export const necronsCharacters: Character[] = [

  {
    id: "anrakyr-the-traveller",
    name: "Anrakyr The Traveller",
    faction: "necrons",
    image: "",
    points: 95,
    canAttachTo: [],
    defaultWargear: [
      { id: "tachyon-arrow", name: "Tachyon arrow", image: "", profiles: [{ range: '120"', attacks: "1", skill: "2+", strength: "16", ap: "-5", damage: "D6+6" }] },
      { id: "warscythe", name: "Warscythe", image: "", profiles: [{ range: "Melee", attacks: "4", skill: "2+", strength: "8", ap: "-4", damage: "2" }] },
    ],
    wargear: [],
  },

  {
    id: "c-tan-shard-of-the-deceiver",
    name: "C Tan Shard Of The Deceiver",
    faction: "necrons",
    image: "",
    points: 265,
    canAttachTo: [],
    defaultWargear: [
      { id: "cosmic-insanity", name: "Cosmic insanity", image: "", profiles: [{ range: '12"', attacks: "D6", skill: "N/A", strength: "4", ap: "-1", damage: "D3", keywords: ["IGNORES COVER", "TORRENT"] }] },
      { id: "golden-fists", name: "Golden fists", image: "", profiles: [{ range: "Melee", attacks: "6", skill: "3+", strength: "10", ap: "-3", damage: "3" }] },
    ],
    wargear: [],
  },

  {
    id: "c-tan-shard-of-the-nightbringer",
    name: "C Tan Shard Of The Nightbringer",
    faction: "necrons",
    image: "",
    points: 305,
    canAttachTo: [],
    defaultWargear: [
      { id: "gaze-of-death", name: "Gaze of death", image: "", profiles: [{ range: '12"', attacks: "D6", skill: "N/A", strength: "6", ap: "-2", damage: "2", keywords: ["IGNORES COVER", "TORRENT"] }] },
      { id: "scythe-of-the-nightbringer-strike", name: "Scythe of the Nightbringer – strike", image: "", profiles: [{ range: "Melee", attacks: "5", skill: "2+", strength: "14", ap: "-4", damage: "D6+2", keywords: ["DEVASTATING WOUNDS"] }] },
      { id: "scythe-of-the-nightbringer-sweep", name: "Scythe of the Nightbringer – sweep", image: "", profiles: [{ range: "Melee", attacks: "10", skill: "2+", strength: "7", ap: "-2", damage: "2" }] },
    ],
    wargear: [],
  },

  {
    id: "c-tan-shard-of-the-void-dragon",
    name: "C Tan Shard Of The Void Dragon",
    faction: "necrons",
    image: "",
    points: 300,
    canAttachTo: [],
    defaultWargear: [
      { id: "spear-of-the-void-dragon", name: "Spear of the Void Dragon", image: "", profiles: [{ range: '18"', attacks: "6", skill: "3+", strength: "8", ap: "-2", damage: "2", keywords: ["ANTI-VEHICLE 4+"] }] },
      { id: "voltaic-storm", name: "Voltaic storm", image: "", profiles: [{ range: '18"', attacks: "D6+6", skill: "3+", strength: "6", ap: "-2", damage: "1", keywords: ["ANTI-VEHICLE 4+"] }] },
      { id: "spear-of-the-void-dragon-strike", name: "Spear of the Void Dragon – strike", image: "", profiles: [{ range: "Melee", attacks: "5", skill: "2+", strength: "14", ap: "-4", damage: "D6+2", keywords: ["ANTI-VEHICLE 4+"] }] },
      { id: "spear-of-the-void-dragon-sweep", name: "Spear of the Void Dragon – sweep", image: "", profiles: [{ range: "Melee", attacks: "10", skill: "2+", strength: "7", ap: "-2", damage: "2" }] },
      { id: "canoptek-tail-blades", name: "Canoptek tail blades", image: "", profiles: [{ range: "Melee", attacks: "3", skill: "3+", strength: "6", ap: "-1", damage: "2" }] },
    ],
    wargear: [],
  },

  {
    id: "catacomb-command-barge",
    name: "Catacomb Command Barge",
    faction: "necrons",
    image: "",
    points: 120,
    canAttachTo: [],
    defaultWargear: [
      { id: "gauss-cannon", name: "Gauss cannon", image: "", profiles: [{ range: '24"', attacks: "3", skill: "3+", strength: "6", ap: "-2", damage: "2" }] },
      { id: "staff-of-light", name: "Staff of light", image: "", profiles: [{ range: '18"', attacks: "3", skill: "3+", strength: "5", ap: "-2", damage: "1", keywords: ["ASSAULT"] }] },
    ],
    wargear: [
      { id: "tesla-cannon", name: "Tesla cannon", image: "", profiles: [{ range: '24"', attacks: "4", skill: "3+", strength: "7", ap: "0", damage: "1", keywords: ["SUSTAINED HITS 2"] }] },
      { id: "overlord-s-blade", name: "Overlord's blade", image: "", profiles: [{ range: "Melee", attacks: "5", skill: "2+", strength: "6", ap: "-3", damage: "2" }] },
    ],
  },

  {
    id: "chronomancer",
    name: "Chronomancer",
    faction: "necrons",
    image: "",
    points: 65,
    canAttachTo: [],
    defaultWargear: [
      { id: "aeonstave", name: "Aeonstave", image: "", profiles: [{ range: '18"', attacks: "1", skill: "3+", strength: "5", ap: "-2", damage: "D3", keywords: ["ASSAULT"] }] },
    ],
    wargear: [],
  },

  {
    id: "hexmark-destroyer",
    name: "Hexmark Destroyer",
    faction: "necrons",
    image: "",
    points: 75,
    canAttachTo: [],
    defaultWargear: [
      { id: "enmitic-disintegrator-pistols", name: "Enmitic disintegrator pistols", image: "", profiles: [{ range: '12"', attacks: "6", skill: "3+", strength: "5", ap: "-1", damage: "1", keywords: ["PISTOL"] }] },
      { id: "close-combat-weapon", name: "Close combat weapon", image: "", profiles: [{ range: "Melee", attacks: "3", skill: "3+", strength: "4", ap: "0", damage: "1" }] },
    ],
    wargear: [],
  },

  {
    id: "illuminor-szeras",
    name: "Illuminor Szeras",
    faction: "necrons",
    image: "",
    points: 175,
    canAttachTo: [],
    defaultWargear: [
      { id: "eldritch-lance", name: "Eldritch lance", image: "", profiles: [{ range: '36"', attacks: "2", skill: "3+", strength: "12", ap: "-4", damage: "D6" }] },
      { id: "impaling-legs", name: "Impaling legs", image: "", profiles: [{ range: "Melee", attacks: "4", skill: "3+", strength: "6", ap: "-1", damage: "2" }] },
    ],
    wargear: [],
  },

  {
    id: "imotekh-the-stormlord",
    name: "Imotekh The Stormlord",
    faction: "necrons",
    image: "",
    points: 100,
    canAttachTo: [],
    defaultWargear: [
      { id: "gauntlet-of-fire", name: "Gauntlet of Fire", image: "", profiles: [{ range: '12"', attacks: "D6", skill: "N/A", strength: "4", ap: "-1", damage: "1", keywords: ["IGNORES COVER", "TORRENT"] }] },
      { id: "staff-of-the-destroyer", name: "Staff of the Destroyer", image: "", profiles: [{ range: "Melee", attacks: "6", skill: "2+", strength: "8", ap: "-3", damage: "3" }] },
    ],
    wargear: [],
  },

  {
    id: "lokhust-lord",
    name: "Lokhust Lord",
    faction: "necrons",
    image: "",
    points: 80,
    canAttachTo: [],
    defaultWargear: [
      { id: "staff-of-light", name: "Staff of light", image: "", profiles: [{ range: '18"', attacks: "3", skill: "3+", strength: "5", ap: "-2", damage: "1", keywords: ["ASSAULT"] }] },
    ],
    wargear: [],
  },

  {
    id: "lord",
    name: "Lord",
    faction: "necrons",
    image: "",
    points: 65,
    canAttachTo: [],
    defaultWargear: [
      { id: "staff-of-light", name: "Staff of light", image: "", profiles: [{ range: '18"', attacks: "3", skill: "3+", strength: "5", ap: "-2", damage: "1", keywords: ["ASSAULT"] }] },
    ],
    wargear: [
      { id: "lord-s-blade", name: "Lord's blade", image: "", profiles: [{ range: "Melee", attacks: "4", skill: "2+", strength: "5", ap: "-3", damage: "2" }] },
    ],
  },

  {
    id: "nemesor-zahndrekh",
    name: "Nemesor Zahndrekh",
    faction: "necrons",
    image: "",
    points: 85,
    canAttachTo: [],
    defaultWargear: [
      { id: "staff-of-light", name: "Staff of light", image: "", profiles: [{ range: '18"', attacks: "3", skill: "3+", strength: "5", ap: "-2", damage: "1", keywords: ["ASSAULT"] }] },
    ],
    wargear: [],
  },

  {
    id: "orikan-the-diviner",
    name: "Orikan The Diviner",
    faction: "necrons",
    image: "",
    points: 80,
    canAttachTo: [],
    defaultWargear: [
      { id: "staff-of-tomorrow", name: "Staff of Tomorrow", image: "", profiles: [{ range: "Melee", attacks: "4", skill: "2+", strength: "6", ap: "-2", damage: "D3" }] },
    ],
    wargear: [],
  },

  {
    id: "overlord",
    name: "Overlord",
    faction: "necrons",
    image: "",
    points: 85,
    canAttachTo: [],
    defaultWargear: [
      { id: "tachyon-arrow", name: "Tachyon arrow", image: "", profiles: [{ range: '120"', attacks: "1", skill: "2+", strength: "16", ap: "-5", damage: "D6+6" }] },
      { id: "overlord-s-blade", name: "Overlord's blade", image: "", profiles: [{ range: "Melee", attacks: "5", skill: "2+", strength: "6", ap: "-3", damage: "2" }] },
    ],
    wargear: [
      { id: "staff-of-light", name: "Staff of light", image: "", profiles: [{ range: '18"', attacks: "3", skill: "3+", strength: "5", ap: "-2", damage: "1", keywords: ["ASSAULT"] }] },
      { id: "voidscythe", name: "Voidscythe", image: "", profiles: [{ range: "Melee", attacks: "3", skill: "2+", strength: "10", ap: "-4", damage: "D6" }] },
    ],
  },

  {
    id: "overlord-with-translocation-shroud",
    name: "Overlord With Translocation Shroud",
    faction: "necrons",
    image: "",
    points: 85,
    canAttachTo: [],
    defaultWargear: [
      { id: "overlords-blade", name: "Overlord's blade", image: "", profiles: [{ range: "Melee", attacks: "5", skill: "2+", strength: "6", ap: "-3", damage: "2" }] },
    ],
    wargear: [],
  },

  {
    id: "plasmancer",
    name: "Plasmancer",
    faction: "necrons",
    image: "",
    points: 60,
    canAttachTo: [],
    defaultWargear: [
      { id: "plasmic-lance", name: "Plasmic lance", image: "", profiles: [{ range: '18"', attacks: "D3", skill: "3+", strength: "6", ap: "-2", damage: "2", keywords: ["ASSAULT"] }] },
    ],
    wargear: [],
  },

  {
    id: "psychomancer",
    name: "Psychomancer",
    faction: "necrons",
    image: "",
    points: 55,
    canAttachTo: [],
    defaultWargear: [
      { id: "abyssal-lance", name: "Abyssal lance", image: "", profiles: [{ range: '18"', attacks: "1", skill: "3+", strength: "8", ap: "-3", damage: "D3", keywords: ["ASSAULT"] }] },
    ],
    wargear: [],
  },

  {
    id: "royal-warden",
    name: "Royal Warden",
    faction: "necrons",
    image: "",
    points: 50,
    canAttachTo: [],
    defaultWargear: [
      { id: "relic-gauss-blaster", name: "Relic gauss blaster", image: "", profiles: [{ range: '24"', attacks: "3", skill: "2+", strength: "5", ap: "-2", damage: "2", keywords: ["RAPID FIRE 1"] }] },
      { id: "close-combat-weapon", name: "Close combat weapon", image: "", profiles: [{ range: "Melee", attacks: "3", skill: "3+", strength: "4", ap: "0", damage: "1" }] },
    ],
    wargear: [],
  },

  {
    id: "skorpekh-lord",
    name: "Skorpekh Lord",
    faction: "necrons",
    image: "",
    points: 80,
    canAttachTo: [],
    defaultWargear: [
      { id: "enmitic-annihilator", name: "Enmitic annihilator", image: "", profiles: [{ range: '24"', attacks: "3", skill: "3+", strength: "8", ap: "-3", damage: "D3" }] },
      { id: "flensing-claw", name: "Flensing claw", image: "", profiles: [{ range: "Melee", attacks: "4", skill: "2+", strength: "8", ap: "-2", damage: "2" }] },
      { id: "hyperphase-harvester", name: "Hyperphase harvester", image: "", profiles: [{ range: "Melee", attacks: "3", skill: "2+", strength: "10", ap: "-4", damage: "3" }] },
    ],
    wargear: [],
  },

  {
    id: "technomancer",
    name: "Technomancer",
    faction: "necrons",
    image: "",
    points: 85,
    canAttachTo: [],
    defaultWargear: [
      { id: "staff-of-light", name: "Staff of light", image: "", profiles: [{ range: '18"', attacks: "3", skill: "3+", strength: "5", ap: "-2", damage: "1", keywords: ["ASSAULT"] }] },
    ],
    wargear: [],
  },

  {
    id: "transcendent-c-tan",
    name: "Transcendent C Tan",
    faction: "necrons",
    image: "",
    points: 295,
    canAttachTo: [],
    defaultWargear: [
      { id: "seismic-assault", name: "Seismic assault", image: "", profiles: [{ range: '18"', attacks: "D6+3", skill: "N/A", strength: "8", ap: "-2", damage: "2", keywords: ["IGNORES COVER", "TORRENT"] }] },
      { id: "crackling-tendrils", name: "Crackling tendrils", image: "", profiles: [{ range: "Melee", attacks: "6", skill: "3+", strength: "8", ap: "-3", damage: "3" }] },
    ],
    wargear: [],
  },

  {
    id: "trazyn-the-infinite",
    name: "Trazyn The Infinite",
    faction: "necrons",
    image: "",
    points: 75,
    canAttachTo: [],
    defaultWargear: [
      { id: "empathic-obliterator", name: "Empathic Obliterator", image: "", profiles: [{ range: "Melee", attacks: "4", skill: "2+", strength: "7", ap: "-3", damage: "2", keywords: ["ANTI-CHARACTER 4+"] }] },
    ],
    wargear: [],
  },

  {
    id: "vargard-obyron",
    name: "Vargard Obyron",
    faction: "necrons",
    image: "",
    points: 85,
    canAttachTo: [],
    defaultWargear: [
      { id: "warscythe", name: "Warscythe", image: "", profiles: [{ range: "Melee", attacks: "4", skill: "2+", strength: "8", ap: "-4", damage: "2" }] },
    ],
    wargear: [],
  },

];
