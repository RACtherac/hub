import type { Character } from "../../../types/warhammer";

export const spaceMarinesCharacters: Character[] = [

  {
    id: "captain",
    name: "Space Marine Captain",
    image: "/warhammerimages/captain.png",
    points: 80,
    faction:"space-marines",
    canAttachTo: [
      "intercessors",
      "assault-intercessors",
    ],

    wargear: [
      {
        id: "power-sword",
        name: "Power Sword",
        image: "/warhammerimages/power-sword.png",
        points: 10,
      },
    ],
  },

  {
    id: "lieutenant",
    name: "Space Marine Lieutenant",
    image: "/warhammerimages/lieutenant.png",
    points: 65,
        faction:"space-marines",
    canAttachTo: [
      "intercessors",
      "assault-intercessors",
    ],

    wargear: [],
  },

];