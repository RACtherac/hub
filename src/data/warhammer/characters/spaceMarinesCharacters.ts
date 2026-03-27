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
        image: "/Warhammerimages/SpaceMarine/power-sword.png",
        points: 10,
      },
      {
        id: "plasma-pistol",
        name: "Plasma Pistol",
        image: "/Warhammerimages/SpaceMarine/plasma-pistol.png",
        points: 5,
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
        image: "/Warhammerimages/SpaceMarine/chainsword.png",
        points: 0,
      },
      {
        id: "plasma-pistol-lt",
        name: "Plasma Pistol",
        image: "/Warhammerimages/SpaceMarine/plasma-pistol.png",
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

];
