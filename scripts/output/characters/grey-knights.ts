import type { Character } from "../../../types/warhammer";

export const greyKnightsCharacters: Character[] = [

  {
    id: "brother-captain",
    name: "Brother Captain",
    faction: "grey-knights",
    image: "",
    points: 90,
    canAttachTo: [],
    defaultWargear: [
      { id: "storm-bolter", name: "Storm bolter", image: "", profiles: [{ range: '24"', attacks: "4", skill: "3+", strength: "4", ap: "0", damage: "1", keywords: ["RAPID FIRE 2"] }] },
      { id: "nemesis-force-weapon", name: "Nemesis force weapon", image: "", profiles: [{ range: "Melee", attacks: "4", skill: "2+", strength: "6", ap: "-1", damage: "D3", keywords: ["PSYCHIC"] }] },
    ],
    wargear: [
      { id: "incinerator", name: "Incinerator", image: "", profiles: [{ range: '12"', attacks: "D6", skill: "N/A", strength: "6", ap: "-1", damage: "1", keywords: ["IGNORES COVER", "TORRENT"] }] },
      { id: "psilencer", name: "Psilencer", image: "", profiles: [{ range: '24"', attacks: "6", skill: "3+", strength: "5", ap: "0", damage: "1", keywords: ["PSYCHIC"] }] },
      { id: "psycannon", name: "Psycannon", image: "", profiles: [{ range: '24"', attacks: "3", skill: "3+", strength: "8", ap: "-1", damage: "2", keywords: ["PSYCHIC", "RAPID FIRE 2"] }] },
    ],
  },

  {
    id: "brother-captain-stern",
    name: "Brother Captain Stern",
    faction: "grey-knights",
    image: "",
    points: 90,
    canAttachTo: [],
    defaultWargear: [
      { id: "storm-bolter", name: "Storm bolter", image: "", profiles: [{ range: '24"', attacks: "4", skill: "3+", strength: "4", ap: "0", damage: "1", keywords: ["RAPID FIRE 2"] }] },
      { id: "nemesis-force-sword", name: "Nemesis force sword", image: "", profiles: [{ range: "Melee", attacks: "4", skill: "2+", strength: "6", ap: "-1", damage: "D3", keywords: ["PSYCHIC"] }] },
    ],
    wargear: [],
  },

  {
    id: "brotherhood-champion",
    name: "Brotherhood Champion",
    faction: "grey-knights",
    image: "",
    points: 80,
    canAttachTo: [],
    defaultWargear: [
      { id: "storm-bolter", name: "Storm bolter", image: "", profiles: [{ range: '24"', attacks: "4", skill: "3+", strength: "4", ap: "0", damage: "1", keywords: ["RAPID FIRE 2"] }] },
      { id: "nemesis-force-weapon", name: "Nemesis force weapon", image: "", profiles: [{ range: "Melee", attacks: "4", skill: "2+", strength: "6", ap: "-1", damage: "D3", keywords: ["PSYCHIC"] }] },
    ],
    wargear: [],
  },

  {
    id: "brotherhood-chaplain",
    name: "Brotherhood Chaplain",
    faction: "grey-knights",
    image: "",
    points: 75,
    canAttachTo: [],
    defaultWargear: [
      { id: "storm-bolter", name: "Storm bolter", image: "", profiles: [{ range: '24"', attacks: "4", skill: "3+", strength: "4", ap: "0", damage: "1", keywords: ["RAPID FIRE 2"] }] },
      { id: "crozius-arcanum", name: "Crozius arcanum", image: "", profiles: [{ range: "Melee", attacks: "4", skill: "2+", strength: "6", ap: "-1", damage: "2" }] },
    ],
    wargear: [],
  },

  {
    id: "brotherhood-librarian",
    name: "Brotherhood Librarian",
    faction: "grey-knights",
    image: "",
    points: 120,
    canAttachTo: [],
    defaultWargear: [
      { id: "purge-soul-focused-witchfire", name: "Purge Soul – focused witchfire", image: "", profiles: [{ range: '18"', attacks: "D3", skill: "3+", strength: "5", ap: "-1", damage: "D3", keywords: ["PSYCHIC"] }] },
      { id: "purge-soul-witchfire", name: "Purge Soul – witchfire", image: "", profiles: [{ range: '18"', attacks: "D3", skill: "3+", strength: "5", ap: "-1", damage: "D3", keywords: ["PSYCHIC"] }] },
      { id: "nemesis-force-weapon", name: "Nemesis force weapon", image: "", profiles: [{ range: "Melee", attacks: "4", skill: "2+", strength: "6", ap: "-1", damage: "D3", keywords: ["PSYCHIC"] }] },
    ],
    wargear: [
      { id: "combi-weapon", name: "Combi-weapon", image: "", profiles: [{ range: '24"', attacks: "2", skill: "3+", strength: "4", ap: "0", damage: "1", keywords: ["RAPID FIRE 1"] }] },
      { id: "storm-bolter", name: "Storm bolter", image: "", profiles: [{ range: '24"', attacks: "4", skill: "3+", strength: "4", ap: "0", damage: "1", keywords: ["RAPID FIRE 2"] }] },
    ],
  },

  {
    id: "brotherhood-techmarine",
    name: "Brotherhood Techmarine",
    faction: "grey-knights",
    image: "",
    points: 70,
    canAttachTo: [],
    defaultWargear: [
      { id: "boltgun", name: "Boltgun", image: "", profiles: [{ range: '24"', attacks: "2", skill: "3+", strength: "4", ap: "0", damage: "1", keywords: ["RAPID FIRE 1"] }] },
      { id: "flamer", name: "Flamer", image: "", profiles: [{ range: '12"', attacks: "D6", skill: "N/A", strength: "4", ap: "0", damage: "1", keywords: ["IGNORES COVER", "TORRENT"] }] },
      { id: "omnissian-power-axe", name: "Omnissian power axe", image: "", profiles: [{ range: "Melee", attacks: "3", skill: "2+", strength: "8", ap: "-2", damage: "2" }] },
      { id: "plasma-cutter-standard", name: "Plasma cutter – standard", image: "", profiles: [{ range: '12"', attacks: "1", skill: "2+", strength: "7", ap: "-2", damage: "1", keywords: ["PISTOL"] }] },
      { id: "plasma-cutter-supercharge", name: "Plasma cutter – supercharge", image: "", profiles: [{ range: '12"', attacks: "1", skill: "2+", strength: "8", ap: "-3", damage: "2", keywords: ["PISTOL", "HAZARDOUS"] }] },
      { id: "servo-arms", name: "Servo-arms", image: "", profiles: [{ range: "Melee", attacks: "2", skill: "3+", strength: "8", ap: "-2", damage: "3" }] },
    ],
    wargear: [
      { id: "bolt-pistol", name: "Bolt pistol", image: "", profiles: [{ range: '12"', attacks: "1", skill: "3+", strength: "4", ap: "0", damage: "1", keywords: ["PISTOL"] }] },
    ],
  },

  {
    id: "castellan-crowe",
    name: "Castellan Crowe",
    faction: "grey-knights",
    image: "",
    points: 90,
    canAttachTo: [],
    defaultWargear: [
      { id: "purifying-flame", name: "Purifying Flame", image: "", profiles: [{ range: '12"', attacks: "D6", skill: "N/A", strength: "5", ap: "-1", damage: "1", keywords: ["IGNORES COVER", "PSYCHIC", "TORRENT"] }] },
      { id: "storm-bolter", name: "Storm bolter", image: "", profiles: [{ range: '24"', attacks: "4", skill: "3+", strength: "4", ap: "0", damage: "1", keywords: ["RAPID FIRE 2"] }] },
      { id: "black-blade-of-antwyr", name: "Black Blade of Antwyr", image: "", profiles: [{ range: "Melee", attacks: "6", skill: "2+", strength: "6", ap: "-2", damage: "2", keywords: ["PSYCHIC"] }] },
    ],
    wargear: [],
  },

  {
    id: "grand-master",
    name: "Grand Master",
    faction: "grey-knights",
    image: "",
    points: 95,
    canAttachTo: [],
    defaultWargear: [
      { id: "storm-bolter", name: "Storm bolter", image: "", profiles: [{ range: '24"', attacks: "4", skill: "3+", strength: "4", ap: "0", damage: "1", keywords: ["RAPID FIRE 2"] }] },
      { id: "nemesis-force-weapon", name: "Nemesis force weapon", image: "", profiles: [{ range: "Melee", attacks: "4", skill: "2+", strength: "6", ap: "-1", damage: "D3", keywords: ["PSYCHIC"] }] },
    ],
    wargear: [
      { id: "incinerator", name: "Incinerator", image: "", profiles: [{ range: '12"', attacks: "D6", skill: "N/A", strength: "6", ap: "-1", damage: "1", keywords: ["IGNORES COVER", "TORRENT"] }] },
      { id: "psilencer", name: "Psilencer", image: "", profiles: [{ range: '24"', attacks: "6", skill: "3+", strength: "5", ap: "0", damage: "1", keywords: ["PSYCHIC"] }] },
      { id: "psycannon", name: "Psycannon", image: "", profiles: [{ range: '24"', attacks: "3", skill: "3+", strength: "8", ap: "-1", damage: "2", keywords: ["PSYCHIC", "RAPID FIRE 2"] }] },
    ],
  },

  {
    id: "grand-master-in-nemesis-dreadknight",
    name: "Grand Master In Nemesis Dreadknight",
    faction: "grey-knights",
    image: "",
    points: 210,
    canAttachTo: [],
    defaultWargear: [
      { id: "dreadfists", name: "Dreadfists", image: "", profiles: [{ range: "Melee", attacks: "6", skill: "3+", strength: "14", ap: "-2", damage: "3" }] },
    ],
    wargear: [
      { id: "gatling-psilencer", name: "Gatling psilencer", image: "", profiles: [{ range: '24"', attacks: "12", skill: "3+", strength: "6", ap: "0", damage: "2", keywords: ["PSYCHIC"] }] },
      { id: "heavy-incinerator", name: "Heavy incinerator", image: "", profiles: [{ range: '12"', attacks: "D6+6", skill: "N/A", strength: "6", ap: "-1", damage: "1", keywords: ["IGNORES COVER", "TORRENT"] }] },
      { id: "heavy-psycannon", name: "Heavy psycannon", image: "", profiles: [{ range: '24"', attacks: "6", skill: "3+", strength: "10", ap: "-1", damage: "3", keywords: ["PSYCHIC"] }] },
      { id: "nemesis-daemon-greathammer", name: "Nemesis daemon greathammer", image: "", profiles: [{ range: "Melee", attacks: "4", skill: "3+", strength: "16", ap: "-3", damage: "D6+1", keywords: ["PSYCHIC"] }] },
      { id: "nemesis-greatsword-sweep", name: "Nemesis greatsword – sweep", image: "", profiles: [{ range: "Melee", attacks: "8", skill: "2+", strength: "8", ap: "-2", damage: "1", keywords: ["PSYCHIC"] }] },
      { id: "nemesis-greatsword-strike", name: "Nemesis greatsword – strike", image: "", profiles: [{ range: "Melee", attacks: "4", skill: "2+", strength: "12", ap: "-3", damage: "3", keywords: ["PSYCHIC"] }] },
    ],
  },

  {
    id: "grand-master-voldus",
    name: "Grand Master Voldus",
    faction: "grey-knights",
    image: "",
    points: 95,
    canAttachTo: [],
    defaultWargear: [
      { id: "storm-bolter", name: "Storm bolter", image: "", profiles: [{ range: '24"', attacks: "4", skill: "3+", strength: "4", ap: "0", damage: "1", keywords: ["RAPID FIRE 2"] }] },
      { id: "malleus-argyrum", name: "Malleus Argyrum", image: "", profiles: [{ range: "Melee", attacks: "4", skill: "2+", strength: "8", ap: "-2", damage: "2", keywords: ["DEVASTATING WOUNDS", "PSYCHIC"] }] },
    ],
    wargear: [],
  },

  {
    id: "kaldor-draigo",
    name: "Kaldor Draigo",
    faction: "grey-knights",
    image: "",
    points: 125,
    canAttachTo: [],
    defaultWargear: [
      { id: "scourging", name: "Scourging", image: "", profiles: [{ range: '18"', attacks: "4", skill: "2+", strength: "5", ap: "-1", damage: "1", keywords: ["PSYCHIC"] }] },
      { id: "storm-bolter", name: "Storm bolter", image: "", profiles: [{ range: '24"', attacks: "4", skill: "3+", strength: "4", ap: "0", damage: "1", keywords: ["RAPID FIRE 2"] }] },
      { id: "the-titansword", name: "The Titansword", image: "", profiles: [{ range: "Melee", attacks: "6", skill: "2+", strength: "8", ap: "-3", damage: "3", keywords: ["PSYCHIC"] }] },
    ],
    wargear: [],
  },

];
