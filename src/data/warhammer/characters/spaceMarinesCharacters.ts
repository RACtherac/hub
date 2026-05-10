import type { Character } from "../../../types/warhammer";

export const spaceMarinesCharacters: Character[] = [

  {
    id: "captain",
    name: "Space Marine Captain",
    image: "/Warhammerimages/SpaceMarine/captain.png",
    points: 80,
    faction: "space-marines",
    canAttachTo: ["intercessors", "assault-intercessors", "sternguard-veterans"],
    wargear: [
      {
        id: "power-sword",
        name: "Power Sword",
        image: "/Warhammerimages/SpaceMarine/Power sword.png",
        points: 0,
      },
      {
        id: "chainsword-lt",
        name: "Chainsword",
        image: "/Warhammerimages/SpaceMarine/Space marine chainsword.png",
        points: 0,
      },
      {
        id: "plasma-pistol",
        name: "Plasma Pistol",
        image: "/Warhammerimages/SpaceMarine/Space marine plasma pistol.png",
        points: 0,
      },
    ],
  },

  {
    id: "lieutenant",
    name: "Space Marine Lieutenant",
    image: "/Warhammerimages/SpaceMarine/lieutenant.png",
    points: 65,
    faction: "space-marines",
    canAttachTo: ["intercessors", "assault-intercessors", "hellblasters"],
    wargear: [
      {
        id: "chainsword-lt",
        name: "Chainsword",
        image: "/Warhammerimages/SpaceMarine/Space marine chainsword.png",
        points: 0,
      },
      {
        id: "plasma-pistol-lt",
        name: "Plasma Pistol",
        image: "/Warhammerimages/SpaceMarine/Space marine plasma pistol.png",
        points: 5,
      },
    ],
  },

  {
    id: "apothecary",
    name: "Apothecary",
    image: "/Warhammerimages/SpaceMarine/apothecary.png",
    points: 55,
    faction: "space-marines",
    canAttachTo: ["intercessors", "assault-intercessors", "aggressors", "hellblasters"],
    wargear: [],
  },

  {
    id: "chaplain",
    name: "Chaplain",
    image: "",
    points: 75,
    faction: "space-marines",
    canAttachTo: ["assault-intercessors", "aggressors", "terminators"],
    wargear: [
      {
        id: "crozius-arcanum",
        name: "Crozius Arcanum",
        image: "",
        points: 0,
      },
    ],
  },

  {
    id: "librarian",
    name: "Librarian",
    image: "",
    points: 75,
    faction: "space-marines",
    canAttachTo: ["intercessors", "terminators", "hellblasters"],
    wargear: [
      {
        id: "force-weapon",
        name: "Force Weapon",
        image: "",
        points: 0,
      },
    ],
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
    id: "korsarro-khan",
    name: "Kor'sarro Khan",
    faction: "space-marines",
    image: "",
    points: 60,
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
