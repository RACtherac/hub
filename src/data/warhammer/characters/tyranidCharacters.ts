import type { Character } from "../../../types/Warhammer";

export const tyranidsCharacters: Character[] = [

  {
    id: "hive-tyrant",
    name: "Hive Tyrant",

    image: "/warhammerimages/hive-tyrant.png",

    points: 210,

    canAttachTo: [
      "termagants",
      "hormagaunts",
    ],

    wargear: [
      {
        id: "bonesword",
        name: "Bonesword",
        image: "/warhammerimages/bonesword.png",
        points: 10,
      },
      {
        id: "lash-whip",
        name: "Lash Whip",
        image: "/warhammerimages/lash-whip.png",
        points: 5,
      },
    ],
  },

  {
    id: "broodlord",
    name: "Broodlord",

    image: "/warhammerimages/broodlord.png",

    points: 95,

    canAttachTo: [
      "hormagaunts",
    ],

    wargear: [],
  },

  {
    id: "neurotyrant",
    name: "Neurotyrant",

    image: "/warhammerimages/neurotyrant.png",

    points: 120,

    canAttachTo: [
      "termagants",
    ],

    wargear: [
      {
        id: "neuro-lash",
        name: "Neuro Lash",
        image: "/warhammerimages/neuro-lash.png",
        points: 5,
      },
    ],
  },
];