import type { Character } from "../../../types/warhammer";

export const leaguesOfVotannCharacters: Character[] = [

  {
    id: "c3-9bthar-the-destined",
    name: "%C3%9Bthar The Destined",
    faction: "leagues-of-votann",
    image: "",
    points: 80,
    canAttachTo: [],
    defaultWargear: [
      { id: "volkanite-disintegrator", name: "Volkanite disintegrator", image: "", profiles: [{ range: '18"', attacks: "3", skill: "3+", strength: "5", ap: "-1", damage: "2", keywords: ["DEVASTATING WOUNDS"] }] },
      { id: "blade-of-the-ancestors", name: "Blade of the Ancestors", image: "", profiles: [{ range: "Melee", attacks: "5", skill: "2+", strength: "7", ap: "-3", damage: "D3" }] },
    ],
    wargear: [],
  },

  {
    id: "einhyr-champion",
    name: "Einhyr Champion",
    faction: "leagues-of-votann",
    image: "",
    points: 60,
    canAttachTo: [],
    defaultWargear: [
      { id: "autoch-pattern-combi-bolter", name: "Autoch-pattern combi-bolter", image: "", profiles: [{ range: '24"', attacks: "2", skill: "3+", strength: "4", ap: "0", damage: "1", keywords: ["RAPID FIRE 2"] }] },
      { id: "mass-hammer", name: "Mass hammer", image: "", profiles: [{ range: "Melee", attacks: "4", skill: "3+", strength: "8", ap: "-2", damage: "2" }] },
    ],
    wargear: [
      { id: "darkstar-axe", name: "Darkstar axe", image: "", profiles: [{ range: "Melee", attacks: "4", skill: "3+", strength: "9", ap: "-3", damage: "D3+1" }] },
    ],
  },

  {
    id: "k-hl",
    name: "K Hl",
    faction: "leagues-of-votann",
    image: "",
    points: 70,
    canAttachTo: [],
    defaultWargear: [
      { id: "autoch-pattern-combi-bolter", name: "Autoch-pattern combi-bolter", image: "", profiles: [{ range: '24"', attacks: "2", skill: "3+", strength: "4", ap: "0", damage: "1", keywords: ["RAPID FIRE 2"] }] },
      { id: "forgewrought-plasma-axe", name: "Forgewrought plasma axe", image: "", profiles: [{ range: "Melee", attacks: "4", skill: "3+", strength: "7", ap: "-3", damage: "2", keywords: ["DEVASTATING WOUNDS"] }] },
    ],
    wargear: [
      { id: "volkanite-disintegrator", name: "Volkanite disintegrator", image: "", profiles: [{ range: '18"', attacks: "3", skill: "3+", strength: "5", ap: "-1", damage: "2", keywords: ["DEVASTATING WOUNDS"] }] },
      { id: "mass-gauntlet", name: "Mass gauntlet", image: "", profiles: [{ range: "Melee", attacks: "3", skill: "3+", strength: "9", ap: "-2", damage: "3" }] },
    ],
  },

];
