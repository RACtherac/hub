import type { Unit } from "../../../types/Warhammer";

export const spaceMarinesUnits: Unit[] = [

  {
    id: "intercessors",
    name: "Intercessor Squad",
    faction: "space-marines",
    category: "battleline",

    image5: "../../public/warhammerimages/SpaceMarine/intercessor5.png",
    image10: "../../public/warhammerimages/SpaceMarine/intercessor10.png",

    points: 95,

    wargear: [
      {
        id: "grenade",
        name: "Grenade",
        image: "../../public/warhammerimages/SpaceMarine/intercessor-grenade.png",
        points: 0,
      },
    ],
  },

  {
    id: "assault-intercessors",
    name: "Assault Intercessor Squad",
    faction: "space-marines",
    category: "battleline",

    image5: "/warhammerimages/assault-interceessor5.png",
    image10: "../../public/warhammerimages/SpaceMarine/assault-intercessor10.png",

    points: 90,
    wargear: [
        {
             id: "power fist",
        name: "Power fist",
        image: "../../public/warhammerimages/SpaceMarine/assault-intercessor-powerfist.png",
        points: 0,
        }
    ],
  },

  {
    id: "rhino",
    name: "Rhino",
    faction: "space-marines",
    category: "transport",

    image: "../../public/warhammerimages/SpaceMArine/rhino.png",
    points: 75,
    wargear: [],
  },

];