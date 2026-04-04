import type { Character } from "../../../types/warhammer";

export const tAuEmpireCharacters: Character[] = [

  {
    id: "aun-shi",
    name: "Aun Shi",
    faction: "tau-empire",
    image: "",
    points: 50,
    canAttachTo: [],
    defaultWargear: [
      { id: "fidelity", name: "Fidelity", image: "", profiles: [{ range: "Melee", attacks: "5", skill: "2+", strength: "4", ap: "-1", damage: "1" }] },
    ],
    wargear: [],
  },

  {
    id: "cadre-fireblade",
    name: "Cadre Fireblade",
    faction: "tau-empire",
    image: "",
    points: 50,
    canAttachTo: [],
    defaultWargear: [
      { id: "fireblade-pulse-rifle", name: "Fireblade pulse rifle", image: "", profiles: [{ range: '30"', attacks: "3", skill: "3+", strength: "5", ap: "-1", damage: "1", keywords: ["RAPID FIRE 1"] }] },
      { id: "close-combat-weapon", name: "Close combat weapon", image: "", profiles: [{ range: "Melee", attacks: "2", skill: "5+", strength: "3", ap: "0", damage: "1" }] },
    ],
    wargear: [],
  },

  {
    id: "commander-farsight",
    name: "Commander Farsight",
    faction: "tau-empire",
    image: "",
    points: 95,
    canAttachTo: [],
    defaultWargear: [
      { id: "high-intensity-plasma-rifle", name: "High-intensity plasma rifle", image: "", profiles: [{ range: '30"', attacks: "2", skill: "2+", strength: "8", ap: "-3", damage: "2", keywords: ["RAPID FIRE 1"] }] },
      { id: "dawn-blade-strike", name: "Dawn Blade – strike", image: "", profiles: [{ range: "Melee", attacks: "5", skill: "2+", strength: "8", ap: "-4", damage: "D6" }] },
      { id: "dawn-blade-sweep", name: "Dawn Blade – sweep", image: "", profiles: [{ range: "Melee", attacks: "10", skill: "2+", strength: "5", ap: "-2", damage: "1" }] },
    ],
    wargear: [],
  },

  {
    id: "commander-in-coldstar-battlesuit",
    name: "Commander In Coldstar Battlesuit",
    faction: "tau-empire",
    image: "",
    points: 95,
    canAttachTo: [],
    defaultWargear: [
      { id: "burst-cannon", name: "Burst cannon", image: "", profiles: [{ range: '18"', attacks: "4", skill: "3+", strength: "5", ap: "0", damage: "1", keywords: ["ASSAULT"] }] },
      { id: "high-output-burst-cannon", name: "High-output burst cannon", image: "", profiles: [{ range: '18"', attacks: "12", skill: "3+", strength: "5", ap: "0", damage: "1", keywords: ["ASSAULT"] }] },
      { id: "battlesuit-fists", name: "Battlesuit fists", image: "", profiles: [{ range: "Melee", attacks: "3", skill: "4+", strength: "6", ap: "0", damage: "1" }] },
    ],
    wargear: [
      { id: "airbursting-fragmentation-projector", name: "Airbursting fragmentation projector", image: "", profiles: [{ range: '18"', attacks: "D6+3", skill: "3+", strength: "4", ap: "0", damage: "1", keywords: ["BLAST", "INDIRECT FIRE"] }] },
      { id: "cyclic-ion-blaster-standard", name: "Cyclic ion blaster – standard", image: "", profiles: [{ range: '18"', attacks: "3", skill: "3+", strength: "7", ap: "-1", damage: "1", keywords: ["ASSAULT"] }] },
      { id: "cyclic-ion-blaster-overcharge", name: "Cyclic ion blaster – overcharge", image: "", profiles: [{ range: '18"', attacks: "3", skill: "3+", strength: "8", ap: "-2", damage: "2", keywords: ["ASSAULT", "HAZARDOUS"] }] },
      { id: "fusion-blaster", name: "Fusion blaster", image: "", profiles: [{ range: '12"', attacks: "1", skill: "3+", strength: "9", ap: "-4", damage: "D6", keywords: ["ASSAULT", "MELTA 3"] }] },
      { id: "missile-pod", name: "Missile pod", image: "", profiles: [{ range: '36"', attacks: "2", skill: "3+", strength: "7", ap: "-1", damage: "D3+1", keywords: ["ASSAULT"] }] },
      { id: "plasma-rifle", name: "Plasma rifle", image: "", profiles: [{ range: '30"', attacks: "2", skill: "3+", strength: "7", ap: "-2", damage: "1", keywords: ["RAPID FIRE 1"] }] },
      { id: "t-au-flamer", name: "T'au flamer", image: "", profiles: [{ range: '12"', attacks: "D6", skill: "N/A", strength: "4", ap: "0", damage: "1", keywords: ["IGNORES COVER", "TORRENT"] }] },
    ],
  },

  {
    id: "commander-in-crisis-battlesuit",
    name: "Commander In Crisis Battlesuit",
    faction: "tau-empire",
    image: "",
    points: 80,
    canAttachTo: [],
    defaultWargear: [
      { id: "burst-cannon", name: "Burst cannon", image: "", profiles: [{ range: '18"', attacks: "4", skill: "3+", strength: "5", ap: "0", damage: "1", keywords: ["ASSAULT"] }] },
      { id: "battlesuit-fists", name: "Battlesuit fists", image: "", profiles: [{ range: "Melee", attacks: "3", skill: "4+", strength: "6", ap: "0", damage: "1" }] },
    ],
    wargear: [
      { id: "airbursting-fragmentation-projector", name: "Airbursting fragmentation projector", image: "", profiles: [{ range: '18"', attacks: "D6+3", skill: "3+", strength: "4", ap: "0", damage: "1", keywords: ["BLAST", "INDIRECT FIRE"] }] },
      { id: "cyclic-ion-blaster-standard", name: "Cyclic ion blaster – standard", image: "", profiles: [{ range: '18"', attacks: "3", skill: "3+", strength: "7", ap: "-1", damage: "1", keywords: ["ASSAULT"] }] },
      { id: "cyclic-ion-blaster-overcharge", name: "Cyclic ion blaster – overcharge", image: "", profiles: [{ range: '18"', attacks: "3", skill: "3+", strength: "8", ap: "-2", damage: "2", keywords: ["ASSAULT", "HAZARDOUS"] }] },
      { id: "fusion-blaster", name: "Fusion blaster", image: "", profiles: [{ range: '12"', attacks: "1", skill: "3+", strength: "9", ap: "-4", damage: "D6", keywords: ["ASSAULT", "MELTA 3"] }] },
      { id: "missile-pod", name: "Missile pod", image: "", profiles: [{ range: '36"', attacks: "2", skill: "3+", strength: "7", ap: "-1", damage: "D3+1", keywords: ["ASSAULT"] }] },
      { id: "plasma-rifle", name: "Plasma rifle", image: "", profiles: [{ range: '30"', attacks: "2", skill: "3+", strength: "7", ap: "-2", damage: "1", keywords: ["RAPID FIRE 1"] }] },
      { id: "t-au-flamer", name: "T'au flamer", image: "", profiles: [{ range: '12"', attacks: "D6", skill: "N/A", strength: "4", ap: "0", damage: "1", keywords: ["IGNORES COVER", "TORRENT"] }] },
    ],
  },

  {
    id: "commander-in-enforcer-battlesuit",
    name: "Commander In Enforcer Battlesuit",
    faction: "tau-empire",
    image: "",
    points: 80,
    canAttachTo: [],
    defaultWargear: [
      { id: "burst-cannon", name: "Burst cannon", image: "", profiles: [{ range: '18"', attacks: "4", skill: "3+", strength: "5", ap: "0", damage: "1", keywords: ["ASSAULT"] }] },
      { id: "battlesuit-fists", name: "Battlesuit fists", image: "", profiles: [{ range: "Melee", attacks: "3", skill: "4+", strength: "6", ap: "0", damage: "1" }] },
    ],
    wargear: [
      { id: "airbursting-fragmentation-projector", name: "Airbursting fragmentation projector", image: "", profiles: [{ range: '18"', attacks: "D6+3", skill: "3+", strength: "4", ap: "0", damage: "1", keywords: ["BLAST", "INDIRECT FIRE"] }] },
      { id: "cyclic-ion-blaster-standard", name: "Cyclic ion blaster – standard", image: "", profiles: [{ range: '18"', attacks: "3", skill: "3+", strength: "7", ap: "-1", damage: "1", keywords: ["ASSAULT"] }] },
      { id: "cyclic-ion-blaster-overcharge", name: "Cyclic ion blaster – overcharge", image: "", profiles: [{ range: '18"', attacks: "3", skill: "3+", strength: "8", ap: "-2", damage: "2", keywords: ["ASSAULT", "HAZARDOUS"] }] },
      { id: "fusion-blaster", name: "Fusion blaster", image: "", profiles: [{ range: '12"', attacks: "1", skill: "3+", strength: "9", ap: "-4", damage: "D6", keywords: ["ASSAULT", "MELTA 3"] }] },
      { id: "missile-pod", name: "Missile pod", image: "", profiles: [{ range: '36"', attacks: "2", skill: "3+", strength: "7", ap: "-1", damage: "D3+1", keywords: ["ASSAULT"] }] },
      { id: "plasma-rifle", name: "Plasma rifle", image: "", profiles: [{ range: '30"', attacks: "2", skill: "3+", strength: "7", ap: "-2", damage: "1", keywords: ["RAPID FIRE 1"] }] },
      { id: "t-au-flamer", name: "T'au flamer", image: "", profiles: [{ range: '12"', attacks: "D6", skill: "N/A", strength: "4", ap: "0", damage: "1", keywords: ["IGNORES COVER", "TORRENT"] }] },
    ],
  },

  {
    id: "commander-shadowsun",
    name: "Commander Shadowsun",
    faction: "tau-empire",
    image: "",
    points: 100,
    canAttachTo: [],
    defaultWargear: [
      { id: "flechette-launcher", name: "Flechette launcher", image: "", profiles: [{ range: '18"', attacks: "8", skill: "3+", strength: "3", ap: "0", damage: "1", keywords: ["ASSAULT"] }] },
      { id: "high-energy-fusion-blaster", name: "High-energy fusion blaster", image: "", profiles: [{ range: '12"', attacks: "2", skill: "2+", strength: "9", ap: "-4", damage: "D6", keywords: ["ASSAULT", "MELTA 3"] }] },
      { id: "light-missile-pod", name: "Light missile pod", image: "", profiles: [{ range: '36"', attacks: "2", skill: "2+", strength: "7", ap: "-1", damage: "D3+1", keywords: ["ASSAULT"] }] },
      { id: "pulse-pistol", name: "Pulse pistol", image: "", profiles: [{ range: '12"', attacks: "2", skill: "3+", strength: "5", ap: "0", damage: "1", keywords: ["PISTOL"] }] },
      { id: "battlesuit-fists", name: "Battlesuit fists", image: "", profiles: [{ range: "Melee", attacks: "3", skill: "4+", strength: "6", ap: "0", damage: "1" }] },
    ],
    wargear: [],
  },

  {
    id: "darkstrider",
    name: "Darkstrider",
    faction: "tau-empire",
    image: "",
    points: 60,
    canAttachTo: [],
    defaultWargear: [
      { id: "shade", name: "Shade", image: "", profiles: [{ range: '30"', attacks: "3", skill: "2+", strength: "5", ap: "-1", damage: "1", keywords: ["RAPID FIRE 1"] }] },
      { id: "close-combat-weapon", name: "Close combat weapon", image: "", profiles: [{ range: "Melee", attacks: "2", skill: "5+", strength: "3", ap: "0", damage: "1" }] },
    ],
    wargear: [],
  },

  {
    id: "ethereal",
    name: "Ethereal",
    faction: "tau-empire",
    image: "",
    points: 50,
    canAttachTo: [],
    defaultWargear: [
      { id: "honour-stave", name: "Honour stave", image: "", profiles: [{ range: "Melee", attacks: "3", skill: "4+", strength: "4", ap: "-1", damage: "1" }] },
    ],
    wargear: [],
  },

  {
    id: "kroot-flesh-shaper",
    name: "Kroot Flesh Shaper",
    faction: "tau-empire",
    image: "",
    points: 45,
    canAttachTo: [],
    defaultWargear: [
      { id: "kroot-scattergun", name: "Kroot scattergun", image: "", profiles: [{ range: '12"', attacks: "2", skill: "4+", strength: "4", ap: "0", damage: "1", keywords: ["ASSAULT"] }] },
      { id: "twin-ritualistic-blades", name: "Twin ritualistic blades", image: "", profiles: [{ range: "Melee", attacks: "4", skill: "3+", strength: "4", ap: "-1", damage: "1" }] },
    ],
    wargear: [],
  },

  {
    id: "kroot-lone-spear",
    name: "Kroot Lone Spear",
    faction: "tau-empire",
    image: "",
    points: 80,
    canAttachTo: [],
    defaultWargear: [
      { id: "kroot-long-gun", name: "Kroot long gun", image: "", profiles: [{ range: '36"', attacks: "2", skill: "3+", strength: "5", ap: "-1", damage: "2", keywords: ["HEAVY"] }] },
      { id: "close-combat-weapon", name: "Close combat weapon", image: "", profiles: [{ range: "Melee", attacks: "2", skill: "5+", strength: "3", ap: "0", damage: "1" }] },
      { id: "kalamandra-s-bite", name: "Kalamandra's bite", image: "", profiles: [{ range: "Melee", attacks: "3", skill: "3+", strength: "6", ap: "-2", damage: "2" }] },
    ],
    wargear: [
      { id: "blast-javelin", name: "Blast javelin", image: "", profiles: [{ range: '18"', attacks: "1", skill: "3+", strength: "6", ap: "-1", damage: "2", keywords: ["PISTOL"] }] },
      { id: "hunting-javelin", name: "Hunting javelin", image: "", profiles: [{ range: '12"', attacks: "1", skill: "3+", strength: "4", ap: "0", damage: "1", keywords: ["PISTOL"] }] },
    ],
  },

  {
    id: "kroot-trail-shaper",
    name: "Kroot Trail Shaper",
    faction: "tau-empire",
    image: "",
    points: 55,
    canAttachTo: [],
    defaultWargear: [
      { id: "kroot-rifle", name: "Kroot rifle", image: "", profiles: [{ range: '24"', attacks: "2", skill: "4+", strength: "4", ap: "0", damage: "1", keywords: ["RAPID FIRE 1"] }] },
      { id: "shaper-s-blade", name: "Shaper's blade", image: "", profiles: [{ range: "Melee", attacks: "3", skill: "3+", strength: "4", ap: "-1", damage: "1" }] },
    ],
    wargear: [],
  },

  {
    id: "kroot-war-shaper",
    name: "Kroot War Shaper",
    faction: "tau-empire",
    image: "",
    points: 50,
    canAttachTo: [],
    defaultWargear: [
      { id: "dart-bow-and-tri-blade", name: "Dart-bow and tri-blade", image: "", profiles: [{ range: '18"', attacks: "2", skill: "3+", strength: "4", ap: "0", damage: "1" }] },
      { id: "kroot-pistol", name: "Kroot pistol", image: "", profiles: [{ range: '12"', attacks: "1", skill: "4+", strength: "4", ap: "0", damage: "1", keywords: ["PISTOL"] }] },
      { id: "shaper-s-blade", name: "Shaper's blade", image: "", profiles: [{ range: "Melee", attacks: "3", skill: "3+", strength: "4", ap: "-1", damage: "1" }] },
    ],
    wargear: [
      { id: "bladestave-and-prey-hook", name: "Bladestave and prey-hook", image: "", profiles: [{ range: "Melee", attacks: "4", skill: "3+", strength: "5", ap: "-2", damage: "1" }] },
    ],
  },

  {
    id: "longstrike",
    name: "Longstrike",
    faction: "tau-empire",
    image: "",
    points: 140,
    canAttachTo: [],
    defaultWargear: [
      { id: "railgun", name: "Railgun", image: "", profiles: [{ range: '72"', attacks: "1", skill: "2+", strength: "20", ap: "-8", damage: "D6+6", keywords: ["HEAVY"] }] },
      { id: "twin-pulse-carbine", name: "Twin pulse carbine", image: "", profiles: [{ range: '20"', attacks: "4", skill: "3+", strength: "5", ap: "0", damage: "1", keywords: ["ASSAULT", "TWIN-LINKED"] }] },
      { id: "armoured-hull", name: "Armoured hull", image: "", profiles: [{ range: "Melee", attacks: "3", skill: "4+", strength: "6", ap: "0", damage: "1" }] },
    ],
    wargear: [
      { id: "accelerator-burst-cannon", name: "Accelerator burst cannon", image: "", profiles: [{ range: '18"', attacks: "8", skill: "3+", strength: "5", ap: "0", damage: "1", keywords: ["ASSAULT"] }] },
      { id: "twin-smart-missile-system", name: "Twin smart missile system", image: "", profiles: [{ range: '30"', attacks: "4", skill: "3+", strength: "5", ap: "0", damage: "1", keywords: ["HEAVY", "INDIRECT FIRE", "TWIN-LINKED"] }] },
    ],
  },

  {
    id: "shas-o-r-alai",
    name: "Shas O R Alai",
    faction: "tau-empire",
    image: "",
    points: 80,
    canAttachTo: [],
    defaultWargear: [
      { id: "experimental-pulse-submunitions-rifle-emp", name: "Experimental pulse submunitions rifle – EMP", image: "", profiles: [{ range: '30"', attacks: "2", skill: "2+", strength: "6", ap: "-2", damage: "D3+1", keywords: ["ANTI-VEHICLE 4+", "RAPID FIRE 1"] }] },
      { id: "experimental-pulse-submunitions-rifle-ionic", name: "Experimental pulse submunitions rifle – ionic", image: "", profiles: [{ range: '30"', attacks: "2", skill: "2+", strength: "8", ap: "-3", damage: "2", keywords: ["RAPID FIRE 1"] }] },
      { id: "battlesuit-fists", name: "Battlesuit fists", image: "", profiles: [{ range: "Melee", attacks: "3", skill: "4+", strength: "6", ap: "0", damage: "1" }] },
    ],
    wargear: [],
  },

];
