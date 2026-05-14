import type { Character } from "../../../src/types/warhammer";

export const spaceMarinesCharacters: Character[] = [

  {
    id: "ancient",
    name: "Ancient",
    faction: "space-marines",
    image: "",
    points: 50,
    canAttachTo: [],
    allowsSecondCharacter: true,
    secondCharacterOptions: ["ancient", "ancient-in-terminator-armour", "bladeguard-ancient", "apothecary", "apothecary-biologis", "lieutenant", "lieutenant-in-phobos-armour", "lieutenant-in-reiver-armour", "lieutenant-with-combi-weapon"],
    defaultWargear: [
      { id: "bolt-pistol", name: "Bolt Pistol", image: "", profiles: [{ range: '12"', attacks: "1", skill: "3+", strength: "4", ap: "0", damage: "1", keywords: ["PISTOL"] }] },
      { id: "close-combat-weapon", name: "Close combat weapon", image: "", profiles: [{ range: "Melee", attacks: "5", skill: "2+", strength: "4", ap: "0", damage: "1" }] },
    ],
    wargear: [
      { id: "bolt-rifle", name: "Bolt rifle", image: "", profiles: [{ range: '24"', attacks: "2", skill: "3+", strength: "4", ap: "-1", damage: "1", keywords: ["ASSAULT", "HEAVY"] }] },
      { id: "power-weapon", name: "Power weapon", image: "/Warhammerimages/SpaceMarine/Power sword.png", profiles: [{ range: "Melee", attacks: "5", skill: "2+", strength: "5", ap: "-2", damage: "1" }] },
    ],
    wargearGroups: [
      ["bolt-rifle", "power-weapon"],
    ],
    abilities: [
      {
        name: "Astartes Banner",
        description: "While this model is leading a unit, add 1 to the Objective Control characteristic of models in that unit.",
      },
      {
        name: "Unbreakable Duty",
        description: "While this model is within range of an objective marker and/or within 6\" of the centre of the battlefield, this model has the Feel No Pain 4+ ability.",
      },
    ],
  },

  {
    id: "ancient-in-terminator-armour",
    name: "Ancient In Terminator Armour",
    faction: "space-marines",
    image: "",
    points: 75,
    canAttachTo: [],
    defaultWargear: [
      { id: "storm-bolter", name: "Storm bolter", image: "", profiles: [{ range: '24"', attacks: "4", skill: "3+", strength: "4", ap: "0", damage: "1", keywords: ["RAPID FIRE 2"] }] },
      { id: "power-fist", name: "Power fist", image: "", profiles: [{ range: "Melee", attacks: "3", skill: "3+", strength: "8", ap: "-2", damage: "2" }] },
    ],
    wargear: [
      { id: "chainfist", name: "Chainfist", image: "", profiles: [{ range: "Melee", attacks: "3", skill: "3+", strength: "8", ap: "-2", damage: "2", keywords: ["ANTI-VEHICLE 4+"] }] },
      { id: "close-combat-weapon", name: "Close combat weapon", image: "", profiles: [{ range: "Melee", attacks: "3", skill: "3+", strength: "4", ap: "0", damage: "1" }] },
      { id: "power-weapon", name: "Power weapon", image: "/Warhammerimages/SpaceMarine/Power sword.png", profiles: [{ range: "Melee", attacks: "4", skill: "3+", strength: "5", ap: "-2", damage: "1" }] },
      { id: "thunder-hammer", name: "Thunder hammer", image: "", profiles: [{ range: "Melee", attacks: "3", skill: "4+", strength: "8", ap: "-2", damage: "2", keywords: ["DEVASTATING WOUNDS"] }] },
      { id: "twin-lightning-claws", name: "Twin lightning claws", image: "", profiles: [{ range: "Melee", attacks: "6", skill: "3+", strength: "5", ap: "-2", damage: "1", keywords: ["TWIN-LINKED"] }] },
    ],
  },

  {
    id: "apothecary",
    name: "Apothecary",
    faction: "space-marines",
    image: "/Warhammerimages/SpaceMarine/apothecary.png",
    points: 50,
    canAttachTo: [],
    allowsSecondCharacter: true,
    secondCharacterOptions: ["ancient", "ancient-in-terminator-armour", "bladeguard-ancient", "apothecary", "apothecary-biologis", "lieutenant", "lieutenant-in-phobos-armour", "lieutenant-in-reiver-armour", "lieutenant-with-combi-weapon"],
    defaultWargear: [
      { id: "absolvor-bolt-pistol", name: "Absolvor bolt pistol", image: "", profiles: [{ range: '18"', attacks: "1", skill: "3+", strength: "5", ap: "-1", damage: "2", keywords: ["PISTOL"] }] },
      { id: "reductor-pistol", name: "Reductor pistol", image: "", profiles: [{ range: '3"', attacks: "1", skill: "3+", strength: "4", ap: "-4", damage: "2", keywords: ["PISTOL"] }] },
      { id: "close-combat-weapon", name: "Close combat weapon", image: "", profiles: [{ range: "Melee", attacks: "4", skill: "3+", strength: "4", ap: "0", damage: "1" }] },
    ],
    wargear: [],
    abilities: [
      {
        name: "Narthecium",
        description: "While this model is leading a unit, in your Command phase, you can return 1 destroyed model (excluding CHARACTER models) to that unit.",
      },
      {
        name: "Gene-seed Recovery",
        description: "When this model's Bodyguard unit is destroyed, roll one D6: on a 2+, you gain 1CP.",
      },
    ],
  },

  {
    id: "apothecary-biologis",
    name: "Apothecary Biologis",
    faction: "space-marines",
    image: "",
    points: 70,
    canAttachTo: [],
    defaultWargear: [
      { id: "absolvor-bolt-pistol", name: "Absolvor bolt pistol", image: "", profiles: [{ range: '18"', attacks: "1", skill: "3+", strength: "5", ap: "-1", damage: "2", keywords: ["PISTOL"] }] },
      { id: "close-combat-weapon", name: "Close combat weapon", image: "", profiles: [{ range: "Melee", attacks: "3", skill: "3+", strength: "4", ap: "0", damage: "1" }] },
    ],
    wargear: [],
  },

  {
    id: "bladeguard-ancient",
    name: "Bladeguard Ancient",
    faction: "space-marines",
    image: "/Warhammerimages/SpaceMarine/BladeGuard Ancient.png",
    imageCredit: "Oscar",
    points: 45,
    canAttachTo: [],
    allowsSecondCharacter: true,
    secondCharacterOptions: ["ancient", "ancient-in-terminator-armour", "bladeguard-ancient", "apothecary", "apothecary-biologis", "lieutenant", "lieutenant-in-phobos-armour", "lieutenant-in-reiver-armour", "lieutenant-with-combi-weapon"],
    defaultWargear: [
      { id: "heavy-bolt-pistol", name: "Heavy bolt pistol", image: "", profiles: [{ range: '18"', attacks: "1", skill: "3+", strength: "4", ap: "-1", damage: "1", keywords: ["PISTOL"] }] },
      { id: "close-combat-weapon", name: "Close combat weapon", image: "", profiles: [{ range: "Melee", attacks: "5", skill: "2+", strength: "4", ap: "0", damage: "1" }] },
    ],
    wargear: [],
    abilities: [
      {
        name: "Astartes Banner",
        description: "While this model is leading a unit, add 1 to the Objective Control characteristic of models in that unit.",
      },
      {
        name: "Deeds of Heroism",
        description: "Once per battle, when this model is selected to fight, it can use this ability. If it does, until the end of the phase, add 1 to the Attacks characteristic of melee weapons equipped by models in this model's unit.",
      },
    ],
  },

  {
    id: "captain",
    name: "Captain",
    faction: "space-marines",
    image: "/Warhammerimages/SpaceMarine/captain.png",
    points: 80,
    canAttachTo: [],
    allowsSecondCharacter: true,
    secondCharacterOptions: ["ancient", "ancient-in-terminator-armour", "bladeguard-ancient", "apothecary", "apothecary-biologis", "lieutenant", "lieutenant-in-phobos-armour", "lieutenant-in-reiver-armour", "lieutenant-with-combi-weapon"],
    defaultWargear: [
      { id: "bolt-pistol", name: "Bolt pistol", image: "", profiles: [{ range: '12"', attacks: "1", skill: "3+", strength: "4", ap: "0", damage: "1", keywords: ["PISTOL"] }] },
      { id: "heavy-bolt-pistol", name: "Heavy bolt pistol", image: "", profiles: [{ range: '18"', attacks: "1", skill: "3+", strength: "5", ap: "-1", damage: "1", keywords: ["PISTOL"] }] },
      { id: "close-combat-weapon", name: "Close combat weapon", image: "", profiles: [{ range: "Melee", attacks: "3", skill: "3+", strength: "4", ap: "0", damage: "1" }] },
    ],
    abilities: [
      {
        name: "Rites of Battle",
        description: "Once per battle round, one unit from your army with this ability can use it when its unit is targeted with a Stratagem. If it does, reduce the CP cost of that use of that Stratagem by 1CP.",
      },
      {
        name: "Finest Hour",
        description: "Once per battle, at the start of the Fight phase, this model can use this ability. If it does, until the end of the phase, add 3 to the Attacks characteristic of melee weapons equipped by this model and those weapons have the [DEVASTATING WOUNDS] ability.",
      },
    ],
    wargear: [
      { id: "master-crafted-boltgun", name: "Master-crafted boltgun", image: "", profiles: [{ range: '24"', attacks: "2", skill: "2+", strength: "4", ap: "0", damage: "2", keywords: ["RAPID FIRE 1"] }] },
      { id: "neo-volkite-pistol", name: "Neo-volkite pistol", image: "", profiles: [{ range: '12"', attacks: "2", skill: "2+", strength: "5", ap: "0", damage: "2", keywords: ["PISTOL"] }] },
      { id: "plasma-pistol", name: "Plasma pistol", image: "/Warhammerimages/SpaceMarine/Space marine plasma pistol.png", profiles: [{ profileName: "standard", range: '12"', attacks: "1", skill: "3+", strength: "7", ap: "-2", damage: "1", keywords: ["PISTOL"] }, { profileName: "supercharge", range: '12"', attacks: "1", skill: "3+", strength: "8", ap: "-3", damage: "2", keywords: ["PISTOL", "HAZARDOUS"] }] },
      { id: "master-crafted-power-weapon", name: "Master-crafted power weapon", image: "", profiles: [{ range: "Melee", attacks: "5", skill: "2+", strength: "5", ap: "-2", damage: "2" }] },
      { id: "power-fist", name: "Power fist", image: "", profiles: [{ range: "Melee", attacks: "3", skill: "3+", strength: "8", ap: "-2", damage: "2" }] },
      { id: "relic-shield", name: "Relic Shield", image: "", note: "The bearer has a Wounds characteristic of 6." },
    ],
  },

  {
    id: "captain-in-gravis-armour",
    name: "Captain In Gravis Armour",
    faction: "space-marines",
    image: "",
    points: 80,
    canAttachTo: [],
    defaultWargear: [
      { id: "master-crafted-heavy-bolt-rifle", name: "Master-crafted heavy bolt rifle", image: "", profiles: [{ range: '24"', attacks: "2", skill: "2+", strength: "5", ap: "-1", damage: "2", keywords: ["HEAVY"] }] },
      { id: "master-crafted-power-weapon", name: "Master-crafted power weapon", image: "", profiles: [{ range: "Melee", attacks: "5", skill: "2+", strength: "5", ap: "-2", damage: "2" }] },
    ],
    wargear: [
      { id: "boltstorm-gauntlet", name: "Boltstorm gauntlet", image: "", profiles: [{ range: '12"', attacks: "3", skill: "3+", strength: "4", ap: "0", damage: "1", keywords: ["PISTOL"] }] },
      { id: "power-fist", name: "Power fist", image: "", profiles: [{ range: "Melee", attacks: "3", skill: "3+", strength: "8", ap: "-2", damage: "2" }] },
      { id: "relic-blade", name: "Relic blade", image: "", profiles: [{ range: "Melee", attacks: "3", skill: "3+", strength: "8", ap: "-3", damage: "2" }] },
      { id: "relic-chainsword", name: "Relic chainsword", image: "", profiles: [{ range: "Melee", attacks: "5", skill: "3+", strength: "4", ap: "0", damage: "1" }] },
      { id: "relic-fist", name: "Relic fist", image: "", profiles: [{ range: "Melee", attacks: "4", skill: "3+", strength: "10", ap: "-2", damage: "3" }] },
    ],
  },

  {
    id: "captain-in-phobos-armour",
    name: "Captain In Phobos Armour",
    faction: "space-marines",
    image: "",
    points: 70,
    canAttachTo: ["eliminator-squad", "incursor-squad", "infiltrator-squad", "reiver-squad", "scout-squad"],
    defaultWargear: [
      { id: "bolt-pistol", name: "Bolt pistol", image: "", profiles: [{ range: '12"', attacks: "1", skill: "2+", strength: "4", ap: "0", damage: "1", keywords: ["PISTOL"] }] },
      { id: "instigator-bolt-carbine", name: "Instigator bolt carbine", image: "", profiles: [{ range: '24"', attacks: "1", skill: "2+", strength: "4", ap: "-2", damage: "2", keywords: ["PRECISION"] }] },
      { id: "combat-knife", name: "Combat knife", image: "", profiles: [{ range: "Melee", attacks: "6", skill: "2+", strength: "4", ap: "-1", damage: "1" }] },
    ],
    wargear: [],
    abilities: [
      {
        name: "Rites of Battle",
        description: "Once per battle round, one unit from your army with this ability can use it when its unit is targeted with a Stratagem. If it does, reduce the CP cost of that use of that Stratagem by 1CP.",
      },
      {
        name: "Master of Deceit",
        description: "After both players have deployed their armies, if your army includes one or more models with this ability, you can select up to three friendly ADEPTUS ASTARTES INFANTRY units and redeploy all of those units. When doing so, any of those units can be placed into Strategic Reserves, regardless of how many units are already in Strategic Reserves.",
      },
    ],
  },

  {
    id: "captain-in-terminator-armour",
    name: "Captain In Terminator Armour",
    faction: "space-marines",
    image: "",
    points: 95,
    canAttachTo: [],
    defaultWargear: [
      { id: "storm-bolter", name: "Storm bolter", image: "", profiles: [{ range: '24"', attacks: "4", skill: "3+", strength: "4", ap: "0", damage: "1", keywords: ["RAPID FIRE 2"] }] },
      { id: "relic-weapon", name: "Relic weapon", image: "", profiles: [{ range: "Melee", attacks: "4", skill: "2+", strength: "8", ap: "-3", damage: "2" }] },
    ],
    wargear: [
      { id: "combi-weapon", name: "Combi-weapon", image: "", profiles: [{ range: '24"', attacks: "2", skill: "3+", strength: "4", ap: "0", damage: "1", keywords: ["RAPID FIRE 1"] }] },
      { id: "relic-fist", name: "Relic fist", image: "", profiles: [{ range: "Melee", attacks: "4", skill: "3+", strength: "10", ap: "-2", damage: "3" }] },
    ],
  },

  {
    id: "captain-with-jump-pack",
    name: "Captain With Jump Pack",
    faction: "space-marines",
    image: "/Warhammerimages/SpaceMarine/Captain with jumppack.png",
    imageCredit: "Oscar",
    points: 75,
    canAttachTo: ["assault-intercessors-with-jump-packs"],
    abilities: [
      {
        name: "Angel's Wrath",
        description: "While this model is leading a unit, each time that unit ends a Charge move, until the end of the turn, add 1 to the Strength characteristic of melee weapons equipped by models in that unit.",
      },
      {
        name: "Rites of Battle",
        description: "Once per battle round, one unit from your army with this ability can use it when its unit is targeted with a Stratagem. If it does, reduce the CP cost of that use of that Stratagem by 1CP.",
      },
    ],
    defaultWargear: [],
    wargear: [
      {
        id: "heavy-bolt-pistol",
        name: "Heavy bolt pistol",
        image: "",
        profiles: [{ range: '18"', attacks: "1", skill: "2+", strength: "4", ap: "-1", damage: "1", keywords: ["PISTOL"] }],
      },
      {
        id: "hand-flamer",
        name: "Hand flamer",
        image: "",
        profiles: [{ range: '12"', attacks: "D6", skill: "N/A", strength: "3", ap: "0", damage: "1", keywords: ["IGNORES COVER", "PISTOL", "TORRENT"] }],
      },
      {
        id: "plasma-pistol",
        name: "Plasma pistol",
        image: "",
        profiles: [
          { profileName: "Standard", range: '12"', attacks: "1", skill: "2+", strength: "7", ap: "-2", damage: "1", keywords: ["PISTOL"] },
          { profileName: "Supercharge", range: '12"', attacks: "1", skill: "2+", strength: "8", ap: "-3", damage: "2", keywords: ["HAZARDOUS", "PISTOL"] },
        ],
      },
      {
        id: "astartes-chainsword",
        name: "Astartes chainsword",
        image: "",
        profiles: [{ range: "Melee", attacks: "7", skill: "2+", strength: "4", ap: "-1", damage: "1" }],
      },
      {
        id: "power-fist",
        name: "Power fist",
        image: "",
        profiles: [{ range: "Melee", attacks: "5", skill: "2+", strength: "8", ap: "-2", damage: "2" }],
      },
      {
        id: "relic-weapon",
        name: "Relic weapon",
        image: "",
        profiles: [{ range: "Melee", attacks: "6", skill: "2+", strength: "5", ap: "-2", damage: "2" }],
      },
      {
        id: "thunder-hammer",
        name: "Thunder hammer",
        image: "",
        profiles: [{ range: "Melee", attacks: "5", skill: "3+", strength: "8", ap: "-2", damage: "2", keywords: ["DEVASTATING WOUNDS"] }],
      },
      {
        id: "relic-shield",
        name: "Relic shield",
        image: "",
        note: "The bearer has a Wounds characteristic of 6.",
      },
    ],
    wargearGroups: [
      ["heavy-bolt-pistol", "hand-flamer", "plasma-pistol"],
      ["astartes-chainsword", "power-fist", "relic-weapon", "thunder-hammer"],
    ],
  },

  {
    id: "chaplain",
    name: "Chaplain",
    faction: "space-marines",
    image: "",
    points: 60,
    canAttachTo: [],
    abilities: [
      {
        name: "Litany of Hate",
        description: "While this model is leading a unit, each time a model in that unit makes a melee attack, add 1 to the Wound roll.",
      },
      {
        name: "Spiritual Leader",
        description: "Once per battle, at the start of any phase, you can select one friendly ADEPTUS ASTARTES unit that is Battle-shocked and within 12\" of this model. That unit is no longer Battle-shocked.",
      },
    ],
    defaultWargear: [
      { id: "absolvor-bolt-pistol", name: "Absolvor bolt pistol", image: "", profiles: [{ range: '18"', attacks: "1", skill: "3+", strength: "5", ap: "-1", damage: "2", keywords: ["PISTOL"] }] },
      { id: "crozius-arcanum", name: "Crozius arcanum", image: "", profiles: [{ range: "Melee", attacks: "4", skill: "2+", strength: "6", ap: "-1", damage: "2" }] },
    ],
    wargear: [],
  },

  {
    id: "chaplain-in-terminator-armour",
    name: "Chaplain In Terminator Armour",
    faction: "space-marines",
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
    id: "chaplain-on-bike",
    name: "Chaplain On Bike",
    faction: "space-marines",
    image: "",
    points: 75,
    canAttachTo: [],
    abilities: [
      {
        name: "Litany of Hate",
        description: "While this model is leading a unit, each time a model in that unit makes a melee attack, add 1 to the Wound roll.",
      },
      {
        name: "Catechism of Fire",
        description: "Each time this model's unit is selected to shoot, you can select one enemy unit within 12\" of and visible to this model. Until the end of the phase, ranged weapons equipped by models in this model's unit have the [DEVASTATING WOUNDS] ability when targeting that enemy unit.",
      },
    ],
    defaultWargear: [
      { id: "absolvor-bolt-pistol", name: "Absolvor bolt pistol", image: "", profiles: [{ range: '18"', attacks: "1", skill: "3+", strength: "5", ap: "-1", damage: "2", keywords: ["PISTOL"] }] },
      { id: "twin-bolt-rifle", name: "Twin bolt rifle", image: "", profiles: [{ range: '24"', attacks: "2", skill: "3+", strength: "4", ap: "-1", damage: "1", keywords: ["TWIN-LINKED"] }] },
      { id: "crozius-arcanum", name: "Crozius arcanum", image: "", profiles: [{ range: "Melee", attacks: "4", skill: "2+", strength: "6", ap: "-1", damage: "2" }] },
    ],
    wargear: [],
  },

  {
    id: "chaplain-with-jump-pack",
    name: "Chaplain With Jump Pack",
    faction: "space-marines",
    image: "",
    points: 75,
    canAttachTo: ["assault-intercessors-with-jump-packs"],
    defaultWargear: [
      { id: "bolt-pistol", name: "Bolt pistol", image: "", profiles: [{ range: '12"', attacks: "1", skill: "3+", strength: "4", ap: "0", damage: "1", keywords: ["PISTOL"] }] },
      { id: "crozius-arcanum", name: "Crozius arcanum", image: "", profiles: [{ range: "Melee", attacks: "4", skill: "2+", strength: "6", ap: "-1", damage: "2" }] },
    ],
    wargear: [
      { id: "boltgun", name: "Boltgun", image: "", profiles: [{ range: '24"', attacks: "2", skill: "3+", strength: "4", ap: "0", damage: "1", keywords: ["RAPID FIRE 1"] }] },
      { id: "combi-weapon", name: "Combi-weapon", image: "", profiles: [{ range: '24"', attacks: "2", skill: "3+", strength: "4", ap: "0", damage: "1", keywords: ["RAPID FIRE 1"] }] },
      { id: "grav-pistol", name: "Grav-pistol", image: "", profiles: [{ range: '12"', attacks: "1", skill: "3+", strength: "5", ap: "-3", damage: "1", keywords: ["PISTOL", "ANTI-VEHICLE 2+"] }] },
      { id: "hand-flamer", name: "Hand flamer", image: "", profiles: [{ range: '6"', attacks: "D6", skill: "N/A", strength: "3", ap: "0", damage: "1", keywords: ["IGNORES COVER", "PISTOL", "TORRENT"] }] },
      { id: "inferno-pistol", name: "Inferno pistol", image: "", profiles: [{ range: '6"', attacks: "1", skill: "3+", strength: "8", ap: "-4", damage: "D3", keywords: ["MELTA 2", "PISTOL"] }] },
      { id: "plasma-pistol", name: "Plasma pistol", image: "", profiles: [{ profileName: "standard", range: '12"', attacks: "1", skill: "3+", strength: "7", ap: "-2", damage: "1", keywords: ["PISTOL"] }, { profileName: "supercharge", range: '12"', attacks: "1", skill: "3+", strength: "8", ap: "-3", damage: "2", keywords: ["PISTOL", "HAZARDOUS"] }] },
      { id: "storm-bolter", name: "Storm bolter", image: "", profiles: [{ range: '24"', attacks: "4", skill: "3+", strength: "4", ap: "0", damage: "1", keywords: ["RAPID FIRE 2"] }] },
      { id: "power-fist", name: "Power fist", image: "", profiles: [{ range: "Melee", attacks: "3", skill: "3+", strength: "8", ap: "-2", damage: "2" }] },
    ],
  },

  {
    id: "judiciar",
    name: "Judiciar",
    faction: "space-marines",
    image: "",
    points: 70,
    canAttachTo: [],
    abilities: [
      {
        name: "Tempormortis",
        description: "While this model is leading a unit, that unit has the Fights First ability.",
      },
      {
        name: "Silent Fury",
        description: "Each time this model destroys an enemy CHARACTER model, until the end of the battle, add 1 to the Attacks characteristic of its executioner relic blade.",
      },
    ],
    defaultWargear: [
      { id: "absolvor-bolt-pistol", name: "Absolvor bolt pistol", image: "", profiles: [{ range: '18"', attacks: "1", skill: "3+", strength: "5", ap: "-1", damage: "2", keywords: ["PISTOL"] }] },
      { id: "executioner-relic-blade", name: "Executioner relic blade", image: "", profiles: [{ range: "Melee", attacks: "4", skill: "2+", strength: "8", ap: "-3", damage: "3", keywords: ["DEVASTATING WOUNDS", "PRECISION"] }] },
    ],
    wargear: [],
  },

  {
    id: "librarian",
    name: "Librarian",
    faction: "space-marines",
    image: "",
    points: 65,
    canAttachTo: [],
    abilities: [
      {
        name: "Psychic Hood",
        description: "While this model is leading a unit, models in that unit have the Feel No Pain 4+ ability against Psychic Attacks.",
      },
      {
        name: "Mental Fortress (Psychic)",
        description: "While this model is leading a unit, models in that unit have a 4+ invulnerable save.",
      },
    ],
    defaultWargear: [
      { id: "bolt-pistol", name: "Bolt pistol", image: "", profiles: [{ range: '12"', attacks: "1", skill: "3+", strength: "4", ap: "0", damage: "1", keywords: ["PISTOL"] }] },
      {
        id: "smite", name: "Smite", image: "", profiles: [
          { profileName: "Witchfire", range: '24"', attacks: "D6", skill: "3+", strength: "5", ap: "-1", damage: "D3", keywords: ["PSYCHIC"] },
          { profileName: "Focused witchfire", range: '24"', attacks: "D6", skill: "3+", strength: "6", ap: "-2", damage: "D3", keywords: ["DEVASTATING WOUNDS", "HAZARDOUS", "PSYCHIC"] },
        ],
      },
      { id: "force-weapon", name: "Force weapon", image: "", profiles: [{ range: "Melee", attacks: "4", skill: "3+", strength: "6", ap: "-1", damage: "D3", keywords: ["PSYCHIC"] }] },
    ],
    wargear: [],
  },

  {
    id: "librarian-in-phobos-armour",
    name: "Librarian In Phobos Armour",
    faction: "space-marines",
    image: "",
    points: 70,
    canAttachTo: ["eliminator-squad", "incursor-squad", "infiltrator-squad", "reiver-squad"],
    defaultWargear: [
      { id: "bolt-pistol", name: "Bolt pistol", image: "", profiles: [{ range: '12"', attacks: "1", skill: "3+", strength: "4", ap: "0", damage: "1", keywords: ["PISTOL"] }] },
      {
        id: "smite", name: "Smite", image: "", profiles: [
          { profileName: "Witchfire", range: '24"', attacks: "D6", skill: "3+", strength: "5", ap: "-1", damage: "D3", keywords: ["PSYCHIC"] },
          { profileName: "Focused witchfire", range: '24"', attacks: "D6", skill: "3+", strength: "6", ap: "-2", damage: "D3", keywords: ["DEVASTATING WOUNDS", "HAZARDOUS", "PSYCHIC"] },
        ],
      },
      { id: "force-weapon", name: "Force weapon", image: "", profiles: [{ range: "Melee", attacks: "4", skill: "3+", strength: "6", ap: "-1", damage: "D3", keywords: ["PSYCHIC"] }] },
    ],
    wargear: [],
    abilities: [
      {
        name: "Psychic Hood",
        description: "While this model is leading a unit, models in that unit have the Feel No Pain 4+ ability against Psychic Attacks.",
      },
      {
        name: "Shrouding",
        description: "(Psychic): While this model is leading a unit, models in that unit have the Stealth ability and that unit cannot be targeted by ranged attacks unless the attacking model is within 12\".",
      },
    ],
  },

  {
    id: "librarian-in-terminator-armour",
    name: "Librarian In Terminator Armour",
    faction: "space-marines",
    image: "",
    points: 75,
    canAttachTo: [],
    defaultWargear: [
      { id: "smite-witchfire", name: "Smite – witchfire", image: "", profiles: [{ range: '18"', attacks: "D3", skill: "3+", strength: "5", ap: "-1", damage: "D3", keywords: ["PSYCHIC"] }] },
      { id: "smite-focused-witchfire", name: "Smite – focused witchfire", image: "", profiles: [{ range: '18"', attacks: "D3+3", skill: "3+", strength: "5", ap: "-1", damage: "D3", keywords: ["PSYCHIC"] }] },
      { id: "force-weapon", name: "Force weapon", image: "", profiles: [{ range: "Melee", attacks: "3", skill: "3+", strength: "6", ap: "-1", damage: "D3", keywords: ["PSYCHIC"] }] },
    ],
    wargear: [
      { id: "combi-weapon", name: "Combi-weapon", image: "", profiles: [{ range: '24"', attacks: "2", skill: "3+", strength: "4", ap: "0", damage: "1", keywords: ["RAPID FIRE 1"] }] },
      { id: "storm-bolter", name: "Storm bolter", image: "", profiles: [{ range: '24"', attacks: "4", skill: "3+", strength: "4", ap: "0", damage: "1", keywords: ["RAPID FIRE 2"] }] },
    ],
  },

  {
    id: "lieutenant",
    name: "Lieutenant",
    faction: "space-marines",
    image: "/Warhammerimages/SpaceMarine/lieutenant.png",
    points: 65,
    canAttachTo: [],
    allowsSecondCharacter: true,
    secondCharacterOptions: ["ancient", "ancient-in-terminator-armour", "bladeguard-ancient", "apothecary", "apothecary-biologis", "lieutenant", "lieutenant-in-phobos-armour", "lieutenant-in-reiver-armour", "lieutenant-with-combi-weapon"],
    defaultWargear: [
      { id: "bolt-pistol", name: "Bolt pistol", image: "", profiles: [{ range: '12"', attacks: "1", skill: "3+", strength: "4", ap: "0", damage: "1", keywords: ["PISTOL"] }] },
      { id: "heavy-bolt-pistol", name: "Heavy bolt pistol", image: "", profiles: [{ range: '18"', attacks: "1", skill: "3+", strength: "5", ap: "-1", damage: "1", keywords: ["PISTOL"] }] },
      { id: "master-crafted-bolter", name: "Master-crafted bolter", image: "", profiles: [{ range: '24"', attacks: "2", skill: "2+", strength: "4", ap: "0", damage: "2", keywords: ["RAPID FIRE 1"] }] },
      { id: "close-combat-weapon", name: "Close combat weapon", image: "", profiles: [{ range: "Melee", attacks: "3", skill: "3+", strength: "4", ap: "0", damage: "1" }] },
    ],
    wargear: [
      { id: "neo-volkite-pistol", name: "Neo-volkite pistol", image: "", profiles: [{ range: '12"', attacks: "2", skill: "2+", strength: "5", ap: "0", damage: "2", keywords: ["PISTOL"] }] },
      { id: "plasma-pistol", name: "Plasma pistol", image: "", profiles: [{ profileName: "standard", range: '12"', attacks: "1", skill: "3+", strength: "7", ap: "-2", damage: "1", keywords: ["PISTOL"] }, { profileName: "supercharge", range: '12"', attacks: "1", skill: "3+", strength: "8", ap: "-3", damage: "2", keywords: ["PISTOL", "HAZARDOUS"] }] },
      { id: "master-crafted-power-weapon", name: "Master-crafted power weapon", image: "", profiles: [{ range: "Melee", attacks: "5", skill: "2+", strength: "5", ap: "-2", damage: "2" }] },
      { id: "power-fist", name: "Power fist", image: "", profiles: [{ range: "Melee", attacks: "3", skill: "3+", strength: "8", ap: "-2", damage: "2" }] },
    ],
  },

  {
    id: "lieutenant-in-phobos-armour",
    name: "Lieutenant In Phobos Armour",
    faction: "space-marines",
    image: "",
    points: 55,
    canAttachTo: [],
    defaultWargear: [
      { id: "bolt-pistol", name: "Bolt pistol", image: "", profiles: [{ range: '12"', attacks: "1", skill: "3+", strength: "4", ap: "0", damage: "1", keywords: ["PISTOL"] }] },
      { id: "master-crafted-scoped-bolt-carbine", name: "Master-crafted scoped bolt carbine", image: "", profiles: [{ range: '24"', attacks: "2", skill: "2+", strength: "4", ap: "0", damage: "2" }] },
      { id: "paired-combat-blades", name: "Paired combat blades", image: "", profiles: [{ range: "Melee", attacks: "5", skill: "3+", strength: "3", ap: "0", damage: "1" }] },
    ],
    wargear: [],
  },

  {
    id: "lieutenant-in-reiver-armour",
    name: "Lieutenant In Reiver Armour",
    faction: "space-marines",
    image: "",
    points: 55,
    canAttachTo: ["reiver-squad"],
    defaultWargear: [
      { id: "master-crafted-special-issue-bolt-pistol", name: "Master-crafted special issue bolt pistol", image: "", profiles: [{ range: '12"', attacks: "1", skill: "2+", strength: "4", ap: "-1", damage: "2", keywords: ["PISTOL", "PRECISION"] }] },
      { id: "combat-knife", name: "Combat knife", image: "", profiles: [{ range: "Melee", attacks: "6", skill: "2+", strength: "4", ap: "-1", damage: "1", keywords: ["PRECISION"] }] },
    ],
    wargear: [],
    abilities: [
      {
        name: "Tactical Precision",
        description: "While this model is leading a unit, weapons equipped by models in that unit have the [LETHAL HITS] ability.",
      },
      {
        name: "Deadly Terror",
        description: "While this model is leading a unit, increase the range of that unit's Terror Troops ability by 3\".",
      },
    ],
  },

  {
    id: "lieutenant-with-combi-weapon",
    name: "Lieutenant With Combi Weapon",
    faction: "space-marines",
    image: "",
    points: 70,
    canAttachTo: [],
    defaultWargear: [
      { id: "combi-weapon", name: "Combi-weapon", image: "", profiles: [{ range: '24"', attacks: "2", skill: "3+", strength: "4", ap: "0", damage: "1", keywords: ["RAPID FIRE 1"] }] },
      { id: "paired-combat-blades", name: "Paired combat blades", image: "", profiles: [{ range: "Melee", attacks: "5", skill: "3+", strength: "3", ap: "0", damage: "1" }] },
    ],
    wargear: [],
  },

  {
    id: "techmarine",
    name: "Techmarine",
    faction: "space-marines",
    image: "",
    points: 55,
    canAttachTo: [],
    defaultWargear: [
      { id: "forge-bolter", name: "Forge bolter", image: "", profiles: [{ range: '24"', attacks: "3", skill: "2+", strength: "5", ap: "-1", damage: "2" }] },
      { id: "grav-pistol", name: "Grav-pistol", image: "", profiles: [{ range: '12"', attacks: "1", skill: "3+", strength: "5", ap: "-3", damage: "1", keywords: ["PISTOL", "ANTI-VEHICLE 2+"] }] },
      { id: "omnissian-power-axe", name: "Omnissian power axe", image: "", profiles: [{ range: "Melee", attacks: "3", skill: "2+", strength: "8", ap: "-2", damage: "2" }] },
      { id: "servo-arm", name: "Servo-arm", image: "", profiles: [{ range: "Melee", attacks: "2", skill: "3+", strength: "8", ap: "-2", damage: "3" }] },
    ],
    wargear: [],
  },

  {
    id: "suboden-khan",
    name: "Suboden Khan",
    faction: "space-marines",
    image: "",
    points: 115,
    canAttachTo: ["outrider-squad"],
    defaultWargear: [
      { id: "suboden-heavy-bolt-pistol", name: "Heavy bolt pistol", image: "", profiles: [{ range: '18"', attacks: "1", skill: "2+", strength: "4", ap: "-1", damage: "1", keywords: ["PISTOL"] }] },
      { id: "onslaught-gatling-cannon", name: "Onslaught gatling cannon", image: "", profiles: [{ range: '24"', attacks: "8", skill: "2+", strength: "5", ap: "0", damage: "1", keywords: ["DEVASTATING WOUNDS"] }] },
      { id: "stormtooth-lance", name: "Stormtooth lance", image: "", profiles: [{ range: "Melee", attacks: "6", skill: "2+", strength: "6", ap: "-2", damage: "2", keywords: ["ANTI-MONSTER 4+", "ANTI-VEHICLE 4+"] }] },
      { id: "suboden-power-sword", name: "Power sword", image: "", profiles: [{ range: "Melee", attacks: "8", skill: "2+", strength: "5", ap: "-2", damage: "1" }] },
    ],
    wargear: [],
    abilities: [
      {
        name: "Spear of Chogoris",
        description: "This model's unit is eligible to shoot and declare a charge in a turn in which it Advanced or Fell Back. If that unit is already eligible to shoot and declare a charge in a turn in which it Advanced, add 1 to Advance and Charge rolls made for that unit instead.",
      },
      {
        name: "Skilled Riders",
        description: "Each time a model in this model's unit makes a Normal, Advance, Fall Back or Charge move, it can move horizontally through terrain features.",
      },
    ],
  },

  {
    id: "roboute-guilliman",
    name: "Roboute Guilliman",
    faction: "space-marines",
    image: "",
    points: 340,
    canAttachTo: [],
    defaultWargear: [
      {
        id: "hand-of-dominion-ranged",
        name: "Hand of Dominion",
        image: "",
        profiles: [{ profileName: "Ranged", range: '30"', attacks: "2", skill: "2+", strength: "6", ap: "-2", damage: "2", keywords: ["RAPID FIRE 2"] }],
      },
      {
        id: "emperors-sword",
        name: "Emperor's Sword",
        image: "",
        profiles: [{ range: "Melee", attacks: "14", skill: "2+", strength: "8", ap: "-3", damage: "2", keywords: ["DEVASTATING WOUNDS"] }],
      },
      {
        id: "hand-of-dominion-melee",
        name: "Hand of Dominion",
        image: "",
        profiles: [{ profileName: "Melee", range: "Melee", attacks: "7", skill: "2+", strength: "14", ap: "-4", damage: "4", keywords: ["LETHAL HITS"] }],
      },
    ],
    wargear: [],
    abilities: [
      {
        name: "Supreme Commander",
        description: "If this model is in your army, it must be your Warlord.",
      },
      {
        name: "Ultramarines Bodyguard",
        description: "While this model is within 3\" of one or more friendly ADEPTUS ASTARTES INFANTRY units, this model has the Lone Operative ability.",
      },
      {
        name: "Armour of Fate",
        description: "The first time this model is destroyed, roll one D6 at the end of the phase: on a 3+, set this model back up on the battlefield as close as possible to where it was destroyed and not within Engagement Range of any enemy models, with 6 wounds remaining.",
      },
      {
        name: "Author of the Codex",
        description: "At the start of your Command phase, select two Author of the Codex abilities. Until the start of your next Command phase, this model has those abilities.",
      },
      {
        name: "Author of the Codex – Primarch of the XIII (Aura)",
        description: "While a friendly ADEPTUS ASTARTES unit is within 6\" of this model, add 1 to the Objective Control characteristic of models in that unit and you can re-roll Battle-shock and Leadership tests taken for that unit.",
      },
      {
        name: "Author of the Codex – Master of Battle",
        description: "At the start of your Command phase, after you have selected your Oath of Moment target, select a second enemy unit. Until the start of your next Command phase, if your Oath of Moment target is destroyed, that second enemy unit becomes your Oath of Moment target until you select a new one.",
      },
      {
        name: "Author of the Codex – Supreme Strategist",
        description: "Once per battle round, one unit from your army with this ability can use it when a friendly ADEPTUS ASTARTES unit within 12\" of that model is targeted with a Stratagem. If it does, reduce the CP cost of that usage of that Stratagem by 1CP.",
      },
    ],
  },

  {
    id: "lion-el-jonson",
    name: "Lion El'Jonson",
    faction: "space-marines",
    image: "",
    points: 315,
    canAttachTo: [],
    defaultWargear: [
      {
        id: "arma-luminis",
        name: "Arma Luminis",
        image: "",
        profiles: [
          { profileName: "Bolt pistol", range: '12"', attacks: "4", skill: "2+", strength: "4", ap: "-1", damage: "2", keywords: ["PISTOL"] },
          { profileName: "Plasma pistol", range: '12"', attacks: "2", skill: "2+", strength: "8", ap: "-3", damage: "2", keywords: ["PISTOL"] },
        ],
      },
      {
        id: "fealty",
        name: "Fealty",
        image: "",
        profiles: [
          { profileName: "Strike", range: "Melee", attacks: "8", skill: "2+", strength: "12", ap: "-4", damage: "4", keywords: ["LETHAL HITS"] },
          { profileName: "Sweep", range: "Melee", attacks: "16", skill: "2+", strength: "6", ap: "-3", damage: "2", keywords: ["SUSTAINED HITS 1"] },
        ],
      },
    ],
    wargear: [],
    abilities: [
      {
        name: "Supreme Commander",
        description: "If this model is in your army, it must be your Warlord.",
      },
      {
        name: "The Emperor's Shield",
        description: "Each time an attack is allocated to this model, if the Strength characteristic of that attack is greater than the Toughness characteristic of this model, subtract 1 from the Wound roll.",
      },
      {
        name: "Dark Angels Bodyguard",
        description: "While this model is within 3\" of one or more friendly ADEPTUS ASTARTES INFANTRY units, this model has the Lone Operative ability.",
      },
      {
        name: "Primarch of the First Legion",
        description: "At the start of your Command phase, select two Primarch of the First Legion abilities. Until the start of your next Command phase, this model has those abilities.",
      },
      {
        name: "Primarch of the First Legion – Mist-wreathed Shadow Realms",
        description: "In your Command phase, if this unit is not within Engagement Range of one or more enemy units, you can remove it from the battlefield and place it into Strategic Reserves.",
      },
      {
        name: "Primarch of the First Legion – Martial Exemplar (Aura)",
        description: "While a friendly ADEPTUS ASTARTES unit is within 6\" of this model, each time a model in that unit makes a melee attack, re-roll a Hit roll of 1 and re-roll a Wound roll of 1.",
      },
      {
        name: "Primarch of the First Legion – No Hiding From the Watchers (Aura)",
        description: "While a friendly ADEPTUS ASTARTES unit is within 6\" of this model, models in that unit have the Feel No Pain 4+ ability against mortal wounds.",
      },
    ],
  },

  {
    id: "korsarro-khan",
    name: "Kor'sarro Khan",
    faction: "space-marines",
    image: "",
    imageCredit: "Oscar",
    points: 60,
    allowsSecondCharacter: true,
    secondCharacterOptions: ["bladeguard-ancient", "lieutenant"],
    canAttachTo: ["assault-intercessor-squad", "bladeguard-veteran-squad", "company-heroes", "intercessor-squad", "sternguard-veteran-squad", "tactical-squad"],
    defaultWargear: [
      { id: "korsarro-bolt-pistol", name: "Bolt pistol", image: "", profiles: [{ range: '12"', attacks: "1", skill: "2+", strength: "4", ap: "0", damage: "1", keywords: ["PISTOL"] }] },
      { id: "moonfang", name: "Moonfang", image: "", profiles: [{ range: "Melee", attacks: "6", skill: "2+", strength: "5", ap: "-2", damage: "2", keywords: ["DEVASTATING WOUNDS", "PRECISION"] }] },
    ],
    wargear: [],
    abilities: [
      {
        name: "Inspiring Commander",
        description: "If you include this model in your army, until the end of the battle, non-CHARACTER models in OUTRIDER SQUAD units from your army have an Objective Control characteristic of 3 while they are not Battle-shocked.",
      },
      {
        name: "For the Khan!",
        description: "While this model is leading a unit, ranged weapons equipped by models in that unit have the [ASSAULT] ability and melee weapons equipped by models in that unit have the [LANCE] ability.",
      },
      {
        name: "Trophy Taker",
        description: "Each time this model destroys an enemy CHARACTER model, you gain 1CP.",
      },
    ],
  },

];
