import type { Character } from "../../../src/types/warhammer";

export const deathGuardCharacters: Character[] = [

  {
    id: "biologus-putrifier",
    name: "Biologus Putrifier",
    faction: "death-guard",
    image: "",
    points: 50,
    canAttachTo: [],
    defaultWargear: [
      { id: "hyper-blight-grenades", name: "Hyper blight grenades", image: "", profiles: [{ range: '6"', attacks: "D6", skill: "3+", strength: "4", ap: "-1", damage: "1", keywords: ["BLAST", "GRENADES"] }] },
      { id: "injector-pistol", name: "Injector pistol", image: "", profiles: [{ range: '6"', attacks: "1", skill: "3+", strength: "2", ap: "0", damage: "1", keywords: ["PISTOL", "POISONED WEAPON 2+"] }] },
      { id: "plague-knives", name: "Plague knives", image: "", profiles: [{ range: "Melee", attacks: "3", skill: "3+", strength: "4", ap: "0", damage: "1", keywords: ["POISONED WEAPON 4+"] }] },
    ],
    wargear: [],
  },

  {
    id: "chaos-lord-on-palanquin-of-nurgle",
    name: "Chaos Lord On Palanquin Of Nurgle",
    faction: "death-guard",
    image: "",
    points: 90,
    canAttachTo: [],
    defaultWargear: [
      { id: "bolt-pistol", name: "Bolt pistol", image: "", profiles: [{ range: '12"', attacks: "1", skill: "3+", strength: "4", ap: "0", damage: "1", keywords: ["PISTOL"] }] },
      { id: "astartes-chainsword", name: "Astartes chainsword", image: "", profiles: [{ range: "Melee", attacks: "4", skill: "3+", strength: "4", ap: "-1", damage: "1" }] },
      { id: "close-combat-weapon", name: "Close combat weapon", image: "", profiles: [{ range: "Melee", attacks: "3", skill: "3+", strength: "4", ap: "0", damage: "1" }] },
      { id: "nurgling-s-claws-and-teeth", name: "Nurgling's claws and teeth", image: "", profiles: [{ range: "Melee", attacks: "5", skill: "5+", strength: "2", ap: "0", damage: "1" }] },
    ],
    wargear: [
      { id: "combi-bolter", name: "Combi-bolter", image: "", profiles: [{ range: '24"', attacks: "2", skill: "3+", strength: "4", ap: "0", damage: "1", keywords: ["RAPID FIRE 2"] }] },
      { id: "combi-weapon", name: "Combi-weapon", image: "", profiles: [{ range: '24"', attacks: "2", skill: "3+", strength: "4", ap: "0", damage: "1", keywords: ["RAPID FIRE 1"] }] },
      { id: "plasma-pistol", name: "Plasma pistol", image: "", profiles: [{ profileName: "standard", range: '12"', attacks: "1", skill: "3+", strength: "7", ap: "-2", damage: "1", keywords: ["PISTOL"] }, { profileName: "supercharge", range: '12"', attacks: "1", skill: "3+", strength: "8", ap: "-3", damage: "2", keywords: ["PISTOL", "HAZARDOUS"] }] },
      { id: "accursed-weapon", name: "Accursed weapon", image: "", profiles: [{ range: "Melee", attacks: "5", skill: "3+", strength: "5", ap: "-2", damage: "1" }] },
      { id: "paired-accursed-weapons", name: "Paired accursed weapons", image: "", profiles: [{ range: "Melee", attacks: "6", skill: "3+", strength: "5", ap: "-2", damage: "1", keywords: ["TWIN-LINKED"] }] },
      { id: "power-fist", name: "Power fist", image: "", profiles: [{ range: "Melee", attacks: "3", skill: "3+", strength: "8", ap: "-2", damage: "2" }] },
    ],
  },

  {
    id: "death-guard-chaos-lord",
    name: "Death Guard Chaos Lord",
    faction: "death-guard",
    image: "",
    points: 65,
    canAttachTo: [],
    defaultWargear: [
      { id: "plague-bolt-pistol", name: "Plague bolt pistol", image: "", profiles: [{ range: '12"', attacks: "1", skill: "3+", strength: "4", ap: "0", damage: "1", keywords: ["PISTOL", "LETHAL HITS"] }] },
      { id: "astartes-chainsword", name: "Astartes chainsword", image: "", profiles: [{ range: "Melee", attacks: "4", skill: "3+", strength: "4", ap: "-1", damage: "1" }] },
    ],
    wargear: [
      { id: "combi-weapon", name: "Combi-weapon", image: "", profiles: [{ range: '24"', attacks: "2", skill: "3+", strength: "4", ap: "0", damage: "1", keywords: ["RAPID FIRE 1"] }] },
      { id: "plague-combi-bolter", name: "Plague combi-bolter", image: "", profiles: [{ range: '24"', attacks: "2", skill: "3+", strength: "4", ap: "0", damage: "1", keywords: ["LETHAL HITS", "RAPID FIRE 2"] }] },
      { id: "plasma-pistol", name: "Plasma pistol", image: "", profiles: [{ profileName: "standard", range: '12"', attacks: "1", skill: "3+", strength: "7", ap: "-2", damage: "1", keywords: ["PISTOL"] }, { profileName: "supercharge", range: '12"', attacks: "1", skill: "3+", strength: "8", ap: "-3", damage: "2", keywords: ["PISTOL", "HAZARDOUS"] }] },
      { id: "plague-fist", name: "Plague fist", image: "", profiles: [{ range: "Melee", attacks: "3", skill: "3+", strength: "8", ap: "-2", damage: "2", keywords: ["LETHAL HITS"] }] },
      { id: "plague-encrusted-exalted-weapon", name: "Plague-encrusted exalted weapon", image: "", profiles: [{ range: "Melee", attacks: "5", skill: "3+", strength: "6", ap: "-2", damage: "1", keywords: ["LETHAL HITS"] }] },
    ],
  },

  {
    id: "death-guard-chaos-lord-in-terminator-armour",
    name: "Death Guard Chaos Lord In Terminator Armour",
    faction: "death-guard",
    image: "",
    points: 85,
    canAttachTo: [],
    defaultWargear: [
      { id: "plague-combi-bolter", name: "Plague combi-bolter", image: "", profiles: [{ range: '24"', attacks: "2", skill: "3+", strength: "4", ap: "0", damage: "1", keywords: ["LETHAL HITS", "RAPID FIRE 2"] }] },
      { id: "plague-encrusted-exalted-weapon", name: "Plague-encrusted exalted weapon", image: "", profiles: [{ range: "Melee", attacks: "5", skill: "3+", strength: "6", ap: "-2", damage: "1", keywords: ["LETHAL HITS"] }] },
    ],
    wargear: [
      { id: "combi-weapon", name: "Combi-weapon", image: "", profiles: [{ range: '24"', attacks: "2", skill: "3+", strength: "4", ap: "0", damage: "1", keywords: ["RAPID FIRE 1"] }] },
      { id: "chainfist", name: "Chainfist", image: "", profiles: [{ range: "Melee", attacks: "3", skill: "3+", strength: "8", ap: "-4", damage: "2" }] },
      { id: "plague-fist", name: "Plague fist", image: "", profiles: [{ range: "Melee", attacks: "3", skill: "3+", strength: "8", ap: "-2", damage: "2", keywords: ["LETHAL HITS"] }] },
    ],
  },

  {
    id: "death-guard-daemon-prince",
    name: "Death Guard Daemon Prince",
    faction: "death-guard",
    image: "",
    points: 160,
    canAttachTo: [],
    defaultWargear: [
      { id: "dpn-infernal-cannon", name: "Infernal cannon", image: "", profiles: [{ range: '24"', attacks: "3", skill: "2+", strength: "5", ap: "-1", damage: "2", keywords: ["LETHAL HITS"] }] },
      { id: "dpn-hellforged-strike", name: "Hellforged weapons – strike", image: "", profiles: [{ range: "Melee", attacks: "7", skill: "2+", strength: "8", ap: "-2", damage: "3", keywords: ["LETHAL HITS"] }] },
      { id: "dpn-hellforged-sweep", name: "Hellforged weapons – sweep", image: "", profiles: [{ range: "Melee", attacks: "14", skill: "2+", strength: "6", ap: "-1", damage: "1", keywords: ["LETHAL HITS"] }] },
    ],
    wargear: [],
    abilities: [
      {
        name: "Death Guard Defenders",
        description: "While this model is within 3\" of one or more friendly DEATH GUARD INFANTRY units, this model has the Lone Operative ability.",
      },
      {
        name: "Fevered Strategist",
        description: "Once per battle round, one model from your army with this ability can use it when a friendly DEATH GUARD unit within 12\" of that model is targeted with a Stratagem. If it does, reduce the CP cost of that usage of that Stratagem by 1CP.",
      },
      {
        name: "Miasma of Pestilence (Aura)",
        description: "While a friendly DEATH GUARD unit is within 6\" of this model, each time a ranged attack targets that unit, models in that unit have the Benefit of Cover against that attack.",
      },
    ],
  },

  {
    id: "death-guard-daemon-prince-with-wings",
    name: "Death Guard Daemon Prince With Wings",
    faction: "death-guard",
    image: "",
    points: 180,
    canAttachTo: [],
    defaultWargear: [
      { id: "dpnw-infernal-cannon", name: "Infernal cannon", image: "", profiles: [{ range: '24"', attacks: "3", skill: "2+", strength: "5", ap: "-1", damage: "2", keywords: ["LETHAL HITS"] }] },
      { id: "dpnw-hellforged-strike", name: "Hellforged weapons – strike", image: "", profiles: [{ range: "Melee", attacks: "7", skill: "2+", strength: "8", ap: "-2", damage: "3", keywords: ["LETHAL HITS"] }] },
      { id: "dpnw-hellforged-sweep", name: "Hellforged weapons – sweep", image: "", profiles: [{ range: "Melee", attacks: "14", skill: "2+", strength: "6", ap: "-1", damage: "1", keywords: ["LETHAL HITS"] }] },
    ],
    wargear: [],
    abilities: [
      {
        name: "Death Guard Defenders",
        description: "While this model is within 3\" of one or more friendly DEATH GUARD INFANTRY units, this model has the Lone Operative ability.",
      },
      {
        name: "Fevered Strategist",
        description: "Once per battle round, one model from your army with this ability can use it when a friendly DEATH GUARD unit within 12\" of that model is targeted with a Stratagem. If it does, reduce the CP cost of that usage of that Stratagem by 1CP.",
      },
      {
        name: "Miasma of Pestilence (Aura)",
        description: "While a friendly DEATH GUARD unit is within 6\" of this model, each time a ranged attack targets that unit, models in that unit have the Benefit of Cover against that attack.",
      },
      {
        name: "Horrifying Visage",
        description: "Each time this model ends a Charge move, select one enemy unit within Engagement Range of it. That unit must take a Battle-shock test, subtracting 1 from that test.",
      },
      {
        name: "Enfeebling Miasma (Aura)",
        description: "While an enemy unit (excluding MONSTERS and VEHICLES) is within 6\" of this model, each time that unit is selected to Fall Back, models in that enemy unit must take Desperate Escape tests. When doing so, if that enemy unit is Battle-shocked, subtract 1 from each of those Desperate Escape tests.",
      },
    ],
  },

  {
    id: "death-guard-icon-bearer",
    name: "Death Guard Icon Bearer",
    faction: "death-guard",
    image: "",
    points: 45,
    canAttachTo: [],
    defaultWargear: [
      { id: "plague-boltgun", name: "Plague boltgun", image: "", profiles: [{ range: '24"', attacks: "2", skill: "3+", strength: "4", ap: "0", damage: "1", keywords: ["LETHAL HITS", "RAPID FIRE 1"] }] },
      { id: "plague-knife", name: "Plague knife", image: "", profiles: [{ range: "Melee", attacks: "3", skill: "3+", strength: "4", ap: "0", damage: "1", keywords: ["LETHAL HITS"] }] },
    ],
    wargear: [],
  },

  {
    id: "death-guard-sorcerer-in-terminator-armour",
    name: "Death Guard Sorcerer In Terminator Armour",
    faction: "death-guard",
    image: "",
    points: 70,
    canAttachTo: [],
    defaultWargear: [
      { id: "curse-of-the-leper-witchfire", name: "Curse of the Leper – witchfire", image: "", profiles: [{ range: '18"', attacks: "D6", skill: "3+", strength: "4", ap: "-1", damage: "1", keywords: ["PSYCHIC"] }] },
      { id: "curse-of-the-leper-focused-witchfire", name: "Curse of the Leper – focused witchfire", image: "", profiles: [{ range: '18"', attacks: "D6", skill: "3+", strength: "4", ap: "-2", damage: "2", keywords: ["PSYCHIC"] }] },
      { id: "plague-combi-bolter", name: "Plague combi-bolter", image: "", profiles: [{ range: '24"', attacks: "2", skill: "3+", strength: "4", ap: "0", damage: "1", keywords: ["LETHAL HITS", "RAPID FIRE 2"] }] },
      { id: "force-weapon", name: "Force weapon", image: "", profiles: [{ range: "Melee", attacks: "4", skill: "3+", strength: "6", ap: "-1", damage: "D3", keywords: ["PSYCHIC"] }] },
    ],
    wargear: [
      { id: "combi-weapon", name: "Combi-weapon", image: "", profiles: [{ range: '24"', attacks: "2", skill: "3+", strength: "4", ap: "0", damage: "1", keywords: ["RAPID FIRE 1"] }] },
      { id: "chainfist", name: "Chainfist", image: "", profiles: [{ range: "Melee", attacks: "3", skill: "3+", strength: "8", ap: "-4", damage: "2" }] },
      { id: "plague-fist", name: "Plague fist", image: "", profiles: [{ range: "Melee", attacks: "3", skill: "3+", strength: "8", ap: "-2", damage: "2", keywords: ["LETHAL HITS"] }] },
      { id: "plague-encrusted-exalted-weapon", name: "Plague-encrusted exalted weapon", image: "", profiles: [{ range: "Melee", attacks: "5", skill: "3+", strength: "6", ap: "-2", damage: "1", keywords: ["LETHAL HITS"] }] },
    ],
  },

  {
    id: "foul-blightspawn",
    name: "Foul Blightspawn",
    faction: "death-guard",
    image: "",
    points: 75,
    canAttachTo: ["plague-marines"],
    defaultWargear: [
      { id: "plague-sprayer", name: "Plague sprayer", image: "", profiles: [{ range: '12"', attacks: "D6", skill: "N/A", strength: "7", ap: "-2", damage: "2", keywords: ["ANTI-INFANTRY 2+", "IGNORES COVER", "TORRENT"] }] },
      { id: "close-combat-weapon", name: "Close combat weapon", image: "", profiles: [{ range: "Melee", attacks: "4", skill: "3+", strength: "4", ap: "0", damage: "1" }] },
    ],
    wargear: [],
    abilities: [
      {
        name: "Blinding Spray",
        description: "In the Fight phase, you can select one model from your army with this ability to use this ability. If you do, until the end of the phase, that model's unit has the Fights First ability. Each model can only be selected for this ability once per battle.",
      },
      {
        name: "Putrefying Stink",
        description: "Enemy models cannot start or end an Advance move within 9\" of this model.",
      },
    ],
  },

  {
    id: "lord-of-contagion",
    name: "Lord Of Contagion",
    faction: "death-guard",
    image: "",
    points: 120,
    canAttachTo: [],
    defaultWargear: [
      { id: "manreaper-strike", name: "Manreaper – strike", image: "", profiles: [{ range: "Melee", attacks: "5", skill: "2+", strength: "9", ap: "-2", damage: "3", keywords: ["LETHAL HITS"] }] },
      { id: "manreaper-sweep", name: "Manreaper – sweep", image: "", profiles: [{ range: "Melee", attacks: "10", skill: "2+", strength: "6", ap: "-1", damage: "1", keywords: ["LETHAL HITS"] }] },
    ],
    wargear: [],
    abilities: [
      {
        name: "Vector of Disease",
        description: "While this model is leading a unit, melee weapons equipped by models in that unit have the [SUSTAINED HITS 1] and [LANCE] abilities.",
      },
      {
        name: "Unholy Resilience",
        description: "The first time a model with this ability is destroyed in a battle round, roll one D6 at the end of the phase. On a 2+, set that model back up on the battlefield, as close as possible to where it was destroyed and not within Engagement Range of any enemy units, with 3 wounds remaining. Each model can only be set up in this way once per battle.",
      },
    ],
  },

  {
    id: "lord-of-virulence",
    name: "Lord Of Virulence",
    faction: "death-guard",
    image: "",
    points: 100,
    canAttachTo: ["blightlord-terminators", "deathshroud-terminators"],
    defaultWargear: [
      { id: "twin-plague-spewer", name: "Twin plague spewer", image: "", profiles: [{ range: '12"', attacks: "D6", skill: "N/A", strength: "5", ap: "-1", damage: "1", keywords: ["ANTI-INFANTRY 2+", "IGNORES COVER", "TORRENT", "TWIN-LINKED"] }] },
      { id: "lord-virulence-power-fist", name: "Power fist", image: "", profiles: [{ range: "Melee", attacks: "5", skill: "2+", strength: "8", ap: "-2", damage: "2", keywords: ["LETHAL HITS"] }] },
    ],
    wargear: [],
    abilities: [
      {
        name: "Virulent Aura",
        description: "While this model is leading a unit, each time a model in that unit makes a ranged attack, you can re-roll the Wound roll.",
      },
      {
        name: "Blight Bombardment",
        description: "At the start of your Shooting phase, select one enemy unit within 30\" of and visible to this model. Until the end of the phase, each time a friendly DEATH GUARD model makes a ranged attack that targets that unit, re-roll a Hit roll of 1 (if that attack is made with a Blast weapon, you can re-roll the Hit roll instead).",
      },
    ],
  },

  {
    id: "malignant-plaguecaster",
    name: "Malignant Plaguecaster",
    faction: "death-guard",
    image: "",
    points: 60,
    canAttachTo: ["plague-marines", "poxwalkers"],
    allowsSecondCharacter: true,
    secondCharacterOptions: ["foul-blightspawn"],
    defaultWargear: [
      { id: "plaguecaster-bolt-pistol", name: "Bolt pistol", image: "", profiles: [{ range: '12"', attacks: "1", skill: "3+", strength: "4", ap: "0", damage: "1", keywords: ["LETHAL HITS", "PISTOL"] }] },
      { id: "plague-wind-witchfire", name: "Plague Wind – witchfire", image: "", profiles: [{ range: '12"', attacks: "D6", skill: "N/A", strength: "4", ap: "-1", damage: "D3", keywords: ["PSYCHIC", "TORRENT"] }] },
      { id: "plague-wind-focused-witchfire", name: "Plague Wind – focused witchfire", image: "", profiles: [{ range: '12"', attacks: "D6+3", skill: "N/A", strength: "6", ap: "-2", damage: "D3", keywords: ["HAZARDOUS", "PSYCHIC", "TORRENT"] }] },
      { id: "corrupted-staff", name: "Corrupted staff", image: "", profiles: [{ range: "Melee", attacks: "4", skill: "3+", strength: "6", ap: "-1", damage: "D3", keywords: ["LETHAL HITS", "PSYCHIC"] }] },
    ],
    wargear: [],
    abilities: [
      {
        name: "Gift of Contagion (Psychic)",
        description: "While this model is leading a unit, each time a model in that unit makes an attack that targets a unit that is Afflicted, that attack has the [SUSTAINED HITS 1] ability.",
      },
      {
        name: "Pestilent Fallout (Psychic)",
        description: "In your Shooting phase, after this model has shot, select one enemy INFANTRY unit hit by one or more of those attacks made with its Plague Wind. Until the end of your opponent's next turn, that unit is enfeebled. While a unit is enfeebled, subtract 2\" from the Move characteristic of models in that unit.",
      },
    ],
  },

  {
    id: "mortarion",
    name: "Mortarion",
    faction: "death-guard",
    image: "",
    points: 300,
    canAttachTo: [],
    defaultWargear: [
      { id: "lantern", name: "Lantern", image: "", profiles: [{ range: '24"', attacks: "1", skill: "2+", strength: "10", ap: "-3", damage: "3", keywords: ["PISTOL", "SUSTAINED HITS D3"] }] },
      { id: "rotwind", name: "Rotwind", image: "", profiles: [{ range: '24"', attacks: "D6+3", skill: "2+", strength: "7", ap: "-2", damage: "1", keywords: ["BLAST", "DEVASTATING WOUNDS", "LETHAL HITS", "PSYCHIC"] }] },
      { id: "silence", name: "Silence", image: "", profiles: [
        { profileName: "strike", range: "Melee", attacks: "5", skill: "2+", strength: "14", ap: "-3", damage: "D6+1", keywords: ["DEVASTATING WOUNDS", "LETHAL HITS"] },
        { profileName: "sweep", range: "Melee", attacks: "15", skill: "2+", strength: "8", ap: "-2", damage: "2", keywords: ["LETHAL HITS", "SUSTAINED HITS 1"] },
      ]},
    ],
    wargear: [],
    abilities: [
      {
        name: "Host of Plagues",
        description: "At the end of your Movement phase, roll one D6 for each enemy unit within 6\" of this model, adding 1 to the result if that enemy unit is Afflicted: on a 3+, that enemy unit suffers D3 mortal wounds.",
      },
      {
        name: "Lord of the Death Guard",
        description: "Once per turn, this model can use one of the Lord of the Death Guard abilities (see below).",
      },
      {
        name: "Diseased Influence (Lord of the Death Guard)",
        description: "Just after an enemy unit ends a Normal, Advance or Fall Back move within 9\" of a friendly DEATH GUARD unit that is within 6\" of this model, if that DEATH GUARD unit is not within Engagement Range of one or more enemy units, it can make a Normal move of up to 5\".",
      },
      {
        name: "Boon of Death (Lord of the Death Guard)",
        description: "In the Fight phase, when a friendly DEATH GUARD unit within 6\" of this model is selected as the target of an attack, this model can use this ability. If it does, until the end of the phase, each time a model in that DEATH GUARD unit is destroyed by a melee attack, if that model has not fought this phase, roll one D6. On a 2+, do not remove it from play; that destroyed model can fight after the attacking unit has finished making its attacks, and it is then removed from play.",
      },
      {
        name: "Inflamed Reprisal (Lord of the Death Guard)",
        description: "In your opponent's Shooting phase, when a friendly DEATH GUARD unit within 6\" of this model is selected as the target of an attack, this model can use this ability. If it does, after the attacking unit has finished making its attacks, that Death Guard unit can shoot as if it were your Shooting phase, but when resolving those attacks it can only target that enemy unit (and only if it is an eligible target).",
      },
      {
        name: "Supreme Commander",
        description: "If this model is in your army, it must be your WARLORD.",
      },
    ],
  },

  {
    id: "noxious-blightbringer",
    name: "Noxious Blightbringer",
    faction: "death-guard",
    image: "",
    points: 45,
    canAttachTo: ["poxwalkers"],
    defaultWargear: [
      { id: "plasma-pistol", name: "Plasma pistol", image: "", profiles: [{ profileName: "standard", range: '12"', attacks: "1", skill: "3+", strength: "7", ap: "-2", damage: "1", keywords: ["PISTOL"] }, { profileName: "supercharge", range: '12"', attacks: "1", skill: "3+", strength: "8", ap: "-3", damage: "2", keywords: ["PISTOL", "HAZARDOUS"] }] },
      { id: "cursed-plague-bell", name: "Cursed plague bell", image: "", profiles: [{ range: "Melee", attacks: "3", skill: "3+", strength: "5", ap: "-1", damage: "2", keywords: ["LETHAL HITS"] }] },
    ],
    wargear: [],
  },

  {
    id: "plague-surgeon",
    name: "Plague Surgeon",
    faction: "death-guard",
    image: "",
    points: 50,
    canAttachTo: [],
    defaultWargear: [
      { id: "plague-bolt-pistol", name: "Plague bolt pistol", image: "", profiles: [{ range: '12"', attacks: "1", skill: "3+", strength: "4", ap: "0", damage: "1", keywords: ["PISTOL", "LETHAL HITS"] }] },
      { id: "balesword", name: "Balesword", image: "", profiles: [{ range: "Melee", attacks: "3", skill: "3+", strength: "5", ap: "-1", damage: "D3", keywords: ["LETHAL HITS"] }] },
    ],
    wargear: [],
  },

  {
    id: "sorcerer-on-palanquin-of-nurgle",
    name: "Sorcerer On Palanquin Of Nurgle",
    faction: "death-guard",
    image: "",
    points: 80,
    canAttachTo: [],
    defaultWargear: [
      { id: "bolt-pistol", name: "Bolt pistol", image: "", profiles: [{ range: '12"', attacks: "1", skill: "3+", strength: "4", ap: "0", damage: "1", keywords: ["PISTOL"] }] },
      { id: "infernal-gaze-focused-witchfire", name: "Infernal Gaze – focused witchfire", image: "", profiles: [{ range: '18"', attacks: "D3", skill: "3+", strength: "5", ap: "-1", damage: "D3", keywords: ["PSYCHIC"] }] },
      { id: "infernal-gaze-witchfire", name: "Infernal Gaze – witchfire", image: "", profiles: [{ range: '18"', attacks: "3", skill: "3+", strength: "5", ap: "-1", damage: "1", keywords: ["PSYCHIC"] }] },
      { id: "force-weapon", name: "Force weapon", image: "", profiles: [{ range: "Melee", attacks: "4", skill: "3+", strength: "6", ap: "-1", damage: "D3", keywords: ["PSYCHIC"] }] },
      { id: "nurgling-s-claws-and-teeth", name: "Nurgling's claws and teeth", image: "", profiles: [{ range: "Melee", attacks: "5", skill: "5+", strength: "2", ap: "0", damage: "1" }] },
    ],
    wargear: [
      { id: "combi-bolter", name: "Combi-bolter", image: "", profiles: [{ range: '24"', attacks: "2", skill: "3+", strength: "4", ap: "0", damage: "1", keywords: ["RAPID FIRE 2"] }] },
      { id: "combi-weapon", name: "Combi-weapon", image: "", profiles: [{ range: '24"', attacks: "2", skill: "3+", strength: "4", ap: "0", damage: "1", keywords: ["RAPID FIRE 1"] }] },
      { id: "plasma-pistol", name: "Plasma pistol", image: "", profiles: [{ profileName: "standard", range: '12"', attacks: "1", skill: "3+", strength: "7", ap: "-2", damage: "1", keywords: ["PISTOL"] }, { profileName: "supercharge", range: '12"', attacks: "1", skill: "3+", strength: "8", ap: "-3", damage: "2", keywords: ["PISTOL", "HAZARDOUS"] }] },
      { id: "accursed-weapon", name: "Accursed weapon", image: "", profiles: [{ range: "Melee", attacks: "5", skill: "3+", strength: "5", ap: "-2", damage: "1" }] },
      { id: "astartes-chainsword", name: "Astartes chainsword", image: "", profiles: [{ range: "Melee", attacks: "4", skill: "3+", strength: "4", ap: "-1", damage: "1" }] },
      { id: "power-fist", name: "Power fist", image: "", profiles: [{ range: "Melee", attacks: "3", skill: "3+", strength: "8", ap: "-2", damage: "2" }] },
    ],
  },

  {
    id: "tallyman",
    name: "Tallyman",
    faction: "death-guard",
    image: "",
    points: 45,
    canAttachTo: [],
    defaultWargear: [
      { id: "infected-plasma-pistol-standard", name: "Infected plasma pistol – standard", image: "", profiles: [{ range: '12"', attacks: "1", skill: "3+", strength: "7", ap: "-2", damage: "1", keywords: ["LETHAL HITS", "PISTOL"] }] },
      { id: "infected-plasma-pistol-supercharge", name: "Infected plasma pistol – supercharge", image: "", profiles: [{ range: '12"', attacks: "1", skill: "3+", strength: "8", ap: "-3", damage: "2", keywords: ["HAZARDOUS", "LETHAL HITS", "PISTOL"] }] },
      { id: "close-combat-weapon", name: "Close combat weapon", image: "", profiles: [{ range: "Melee", attacks: "3", skill: "3+", strength: "4", ap: "0", damage: "1" }] },
    ],
    wargear: [],
  },

  {
    id: "typhus",
    name: "Typhus",
    faction: "death-guard",
    image: "",
    points: 80,
    canAttachTo: ["poxwalkers"],
    abilities: [
      {
        name: "The Destroyer Hive",
        description: "While this model is leading a unit, each time a melee attack targets that unit, subtract 1 from the Hit roll.",
      },
      {
        name: "Eater Plague (Psychic)",
        description: "In your Shooting phase, you can select one enemy unit within 18\" of and visible to this PSYKER (excluding units with the Lone Operative ability that are not part of an Attached unit and are not within 12\" of this PSYKER) and roll one D6: on a 1, this PSYKER's unit suffers D3 mortal wounds; on a 2-5, that enemy unit suffers D6 mortal wounds; on a 6, that enemy unit suffers D3+3 mortal wounds.",
      },
    ],
    defaultWargear: [
      { id: "master-crafted-manreaper-strike", name: "Master-crafted manreaper – strike", image: "", profiles: [{ range: "Melee", attacks: "4", skill: "2+", strength: "8", ap: "-2", damage: "3", keywords: ["LETHAL HITS"] }] },
      { id: "master-crafted-manreaper-sweep", name: "Master-crafted manreaper – sweep", image: "", profiles: [{ range: "Melee", attacks: "8", skill: "2+", strength: "5", ap: "-1", damage: "1", keywords: ["LETHAL HITS"] }] },
    ],
    wargear: [],
  },

];
