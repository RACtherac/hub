import type { Unit } from "../../../types/warhammer";

export const chaosUnits: Unit[] = [

  {
    id: "chaos-space-marines",
    name: "Chaos Space Marines",
    faction: "chaos-space-marine",
    category: "battleline",

    image5: "/warhammerimages/chaos-marines5.png",
    image10: "/warhammerimages/chaos-marines10.png",

    points: 100,

    wargear: [
      {
        id: "plasma-gun",
        name: "Plasma Gun",
        image: "/warhammerimages/plasma-gun.png",
        points: 10,
      },
    ],
  },

  {
    id: "obliterator",
    name: "Obliterator",
    faction: "chaos-space-marine",
    category: "vehicle",

    image: "/warhammerimages/obliterator.png",
    points: 120,

    wargear: [
      {
        id: "chaos-guns",
        name: "Chaos Guns",
        image: "/warhammerimages/chaos-guns.png",
        points: 15,
      },
    ],
  },

  {
    id: "chaos-rhino",
    name: "Chaos Rhino",
    faction: "chaos-space-marine",
    category: "transport",

    image: "/warhammerimages/chaos-rhino.png",
    points: 80,
    wargear: [],
  },
];