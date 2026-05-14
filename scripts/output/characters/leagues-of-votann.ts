import type { Character } from "../../../src/types/warhammer";

export const leaguesOfVotannCharacters: Character[] = [

  {
    id: "buri-aegnirsson",
    name: "Buri Aegnirsson",
    faction: "leagues-of-votann",
    image: "",
    points: 95,
    canAttachTo: [],
    defaultWargear: [
      { id: "autoch-pattern-bolt-pistol", name: "Autoch-pattern bolt pistol", image: "", profiles: [{ range: '12"', attacks: "1", skill: "2+", strength: "4", ap: "0", damage: "1", keywords: ["PISTOL"] }] },
      { id: "bane", name: "Bane", image: "", profiles: [
        { profileName: "strike", range: "Melee", attacks: "5", skill: "2+", strength: "12", ap: "-3", damage: "3", keywords: ["PRECISION"] },
        { profileName: "sweep", range: "Melee", attacks: "10", skill: "2+", strength: "6", ap: "-2", damage: "1" },
      ]},
    ],
    abilities: [
      {
        name: "Grudge-fuelled Fortitude",
        description: "The first time this model is destroyed, at the end of the phase, roll one D6: on a 2+, set this model back up on the battlefield as close as possible to where it was destroyed and not within Engagement Range of one or more enemy units, with its full wounds remaining.",
      },
      {
        name: "Unhinged Vengeance",
        description: "In your opponent's Shooting phase, each time an enemy unit has shot, if this model lost one or more wounds as a result of those attacks, this model can make a Vengeance move. To do so, roll one D6 and add 2 to the result: it moves a number of inches up to this result, but it must end that move as close as possible to the closest enemy unit (excluding AIRCRAFT). When doing so, it can be moved within Engagement Range of that enemy unit. This model cannot make a Vengeance move while it is Battle-shocked or within Engagement Range of one or more enemy units, and can only make one Vengeance move per phase.",
      },
    ],
    wargear: [],
  },

  {
    id: "c3-9bthar-the-destined",
    name: "%C3%9Bthar The Destined",
    faction: "leagues-of-votann",
    image: "",
    points: 95,
    canAttachTo: ["einhyr-hearthguard", "hearthkyn-warriors"],
    defaultWargear: [
      { id: "volkanite-disintegrator", name: "Volkanite disintegrator", image: "", profiles: [{ range: '24"', attacks: "3", skill: "2+", strength: "5", ap: "0", damage: "1", keywords: ["DEVASTATING WOUNDS"] }] },
      { id: "blade-of-the-ancestors", name: "Blade of the Ancestors", image: "", profiles: [{ range: "Melee", attacks: "5", skill: "2+", strength: "6", ap: "-3", damage: "2", keywords: ["DEVASTATING WOUNDS"] }] },
    ],
    abilities: [
      {
        name: "Ancestral Fortune",
        description: "Once per turn, you can spend 1YP to change one Hit roll, one Wound roll or one saving throw made for this model to an unmodified 6.",
      },
      {
        name: "Grim Efficiency",
        description: "Once per battle round, when a friendly LEAGUES OF VOTANN unit within 12\" of this model is targeted with a Stratagem, this model can use this ability. If it does, reduce the CP cost of that use of that Stratagem by 1CP.",
      },
      {
        name: "Rampart Crest",
        description: "While the bearer is leading a unit, models in that unit have a 5+ invulnerable save.",
      },
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
    id: "grimnyr",
    name: "Grimnyr",
    faction: "leagues-of-votann",
    image: "",
    points: 65,
    modelCountOptions: [3],
    pointsByModelCount: { 3: 65 },
    canAttachTo: ["hearthkyn-warriors"],
    defaultWargear: [
      { id: "ancestral-wrath", name: "Ancestral Wrath", image: "", profiles: [
        { profileName: "witchfire", range: '24"', attacks: "3", skill: "3+", strength: "6", ap: "-2", damage: "D3", keywords: ["PSYCHIC"] },
        { profileName: "focused witchfire", range: '24"', attacks: "6", skill: "3+", strength: "6", ap: "-2", damage: "D3", keywords: ["HAZARDOUS", "PSYCHIC"] },
      ]},
      { id: "autoch-pattern-bolter", name: "Autoch-pattern bolter", image: "", profiles: [{ range: '24"', attacks: "2", skill: "4+", strength: "4", ap: "0", damage: "1" }] },
      { id: "ancestral-ward-stave", name: "Ancestral ward stave", image: "", profiles: [{ range: "Melee", attacks: "2", skill: "3+", strength: "7", ap: "-1", damage: "D3", keywords: ["PSYCHIC"] }] },
      { id: "close-combat-weapon", name: "Close combat weapon", image: "", profiles: [{ range: "Melee", attacks: "1", skill: "4+", strength: "3", ap: "0", damage: "1" }] },
    ],
    abilities: [
      {
        name: "Fortify (Psychic)",
        description: "While this unit is leading a unit, models in that unit have the Feel No Pain 5+ ability.",
      },
      {
        name: "Grimnyr's Regard",
        description: "Once per battle, at the start of any phase, you can select one friendly LEAGUES OF VOTANN unit that is Battle-shocked and within 12\" of this unit's GRIMNYR model. That unit is no longer Battle-shocked.",
      },
    ],
    wargear: [],
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
