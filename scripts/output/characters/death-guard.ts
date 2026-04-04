import type { Character } from "../../../types/warhammer";

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
      { id: "plague-spewer", name: "Plague spewer", image: "", profiles: [{ range: '12"', attacks: "D6", skill: "N/A", strength: "5", ap: "-1", damage: "1", keywords: ["IGNORES COVER", "LETHAL HITS", "TORRENT"] }] },
      { id: "hellforged-weapons-strike", name: "Hellforged weapons – strike", image: "", profiles: [{ range: "Melee", attacks: "4", skill: "3+", strength: "14", ap: "-3", damage: "D6+1" }] },
      { id: "hellforged-weapons-sweep", name: "Hellforged weapons – sweep", image: "", profiles: [{ range: "Melee", attacks: "8", skill: "3+", strength: "7", ap: "-2", damage: "2" }] },
    ],
    wargear: [],
  },

  {
    id: "death-guard-daemon-prince-with-wings",
    name: "Death Guard Daemon Prince With Wings",
    faction: "death-guard",
    image: "",
    points: 195,
    canAttachTo: [],
    defaultWargear: [
      { id: "plague-spewer", name: "Plague spewer", image: "", profiles: [{ range: '12"', attacks: "D6", skill: "N/A", strength: "5", ap: "-1", damage: "1", keywords: ["IGNORES COVER", "LETHAL HITS", "TORRENT"] }] },
      { id: "hellforged-weapons-strike", name: "Hellforged weapons – strike", image: "", profiles: [{ range: "Melee", attacks: "4", skill: "3+", strength: "14", ap: "-3", damage: "D6+1" }] },
      { id: "hellforged-weapons-sweep", name: "Hellforged weapons – sweep", image: "", profiles: [{ range: "Melee", attacks: "8", skill: "3+", strength: "7", ap: "-2", damage: "2" }] },
    ],
    wargear: [],
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
    points: 60,
    canAttachTo: [],
    defaultWargear: [
      { id: "plague-sprayer", name: "Plague sprayer", image: "", profiles: [{ range: '9"', attacks: "D6", skill: "N/A", strength: "6", ap: "-1", damage: "D3", keywords: ["IGNORES COVER", "LETHAL HITS", "TORRENT"] }] },
      { id: "close-combat-weapon", name: "Close combat weapon", image: "", profiles: [{ range: "Melee", attacks: "3", skill: "3+", strength: "4", ap: "0", damage: "1" }] },
    ],
    wargear: [],
  },

  {
    id: "lord-of-contagion",
    name: "Lord Of Contagion",
    faction: "death-guard",
    image: "",
    points: 80,
    canAttachTo: [],
    defaultWargear: [
      { id: "plagueblade-strike", name: "Plagueblade – strike", image: "", profiles: [{ range: "Melee", attacks: "4", skill: "3+", strength: "8", ap: "-2", damage: "3", keywords: ["LETHAL HITS"] }] },
      { id: "plagueblade-sweep", name: "Plagueblade – sweep", image: "", profiles: [{ range: "Melee", attacks: "8", skill: "3+", strength: "5", ap: "-1", damage: "1", keywords: ["LETHAL HITS"] }] },
    ],
    wargear: [],
  },

  {
    id: "lord-of-virulence",
    name: "Lord Of Virulence",
    faction: "death-guard",
    image: "",
    points: 80,
    canAttachTo: [],
    defaultWargear: [
      { id: "twin-plague-spewer", name: "Twin plague spewer", image: "", profiles: [{ range: '12"', attacks: "D6", skill: "N/A", strength: "5", ap: "-1", damage: "1", keywords: ["IGNORES COVER", "LETHAL HITS", "TORRENT", "TWIN-LINKED"] }] },
      { id: "heavy-plague-fist", name: "Heavy plague fist", image: "", profiles: [{ range: "Melee", attacks: "4", skill: "3+", strength: "10", ap: "-2", damage: "3", keywords: ["LETHAL HITS"] }] },
    ],
    wargear: [],
  },

  {
    id: "malignant-plaguecaster",
    name: "Malignant Plaguecaster",
    faction: "death-guard",
    image: "",
    points: 65,
    canAttachTo: ["poxwalkers"],
    defaultWargear: [
      { id: "plague-bolt-pistol", name: "Plague bolt pistol", image: "", profiles: [{ range: '12"', attacks: "1", skill: "3+", strength: "4", ap: "0", damage: "1", keywords: ["PISTOL", "LETHAL HITS"] }] },
      { id: "plague-wind-witchfire", name: "Plague Wind – witchfire", image: "", profiles: [{ range: '18"', attacks: "D6", skill: "3+", strength: "5", ap: "-1", damage: "1", keywords: ["BLAST", "PSYCHIC"] }] },
      { id: "plague-wind-focused-witchfire", name: "Plague Wind – focused witchfire", image: "", profiles: [{ range: '18"', attacks: "D6", skill: "3+", strength: "5", ap: "-2", damage: "2", keywords: ["BLAST", "PSYCHIC"] }] },
      { id: "corrupted-staff", name: "Corrupted staff", image: "", profiles: [{ range: "Melee", attacks: "3", skill: "3+", strength: "5", ap: "-1", damage: "D3", keywords: ["LETHAL HITS"] }] },
    ],
    wargear: [],
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
