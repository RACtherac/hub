import type { Unit } from "../../../types/Warhammer";

export const tyranidsUnits: Unit[] = [

  {
    id: "termagants",
    name: "Termagants",
    faction: "tyranids",
    category: "battleline",

    image5: "/warhammerimages/termagants5.png",
    image10: "/warhammerimages/termagants10.png",

    points: 60,

    wargear: [
      {
        id: "fleshborer",
        name: "Fleshborer",
        image: "/warhammerimages/fleshborer.png",
        points: 0,
      },
      {
        id: "devourer",
        name: "Devourer",
        image: "/warhammerimages/devourer.png",
        points: 5,
      },
    ],
  },

  {
    id: "hormagaunts",
    name: "Hormagaunts",
    faction: "tyranids",
    category: "infantry",

    image5: "/warhammerimages/hormagaunts5.png",
    image10: "/warhammerimages/hormagaunts10.png",

    points: 65,

    wargear: [
      {
        id: "scything-talons",
        name: "Scything Talons",
        image: "/warhammerimages/scything-talons.png",
        points: 0,
      },
    ],
  },

  {
    id: "carnifex",
    name: "Carnifex",
    faction: "tyranids",
    category: "monster",

    image: "/warhammerimages/carnifex.png",

    points: 140,

    wargear: [
      {
        id: "heavy-venom",
        name: "Heavy Venom Cannon",
        image: "/warhammerimages/heavy-venom.png",
        points: 15,
      },
      {
        id: "crushing-claws",
        name: "Crushing Claws",
        image: "/warhammerimages/crushing-claws.png",
        points: 10,
      },
    ],
  },

  {
    id: "tyrannocyte",
    name: "Tyrannocyte",
    faction: "tyranids",
    category: "transport",

    image: "/warhammerimages/tyrannocyte.png",

    points: 105,

    wargear: [],
  },
];