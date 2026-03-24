import type { Unit } from "../../../types/Warhammer";

export const spaceMarinesUnits: Unit[] = [

  {
    id: "intercessors",
    name: "Intercessor Squad",
    faction: "space-marines",
    category: "battleline",

    image5: "/warhammerimages/intercessor5.png",
    image10: "/warhammerimages/intercessor10.png",

    points: 95,

    wargear: [
      {
        id: "grenade",
        name: "Grenade",
        image: "/warhammerimages/intercessor-grenade.png",
        points: 5,
      },
    ],
  },

  {
    id: "assault-intercessors",
    name: "Assault Intercessor Squad",
    faction: "space-marines",
    category: "infantry",

    image5: "/warhammerimages/assault5.png",
    image10: "/warhammerimages/assault10.png",

    points: 90,
    wargear: [],
  },

  {
    id: "rhino",
    name: "Rhino",
    faction: "space-marines",
    category: "transport",

    image: "/warhammerimages/rhino.png",
    points: 75,
    wargear: [],
  },

];