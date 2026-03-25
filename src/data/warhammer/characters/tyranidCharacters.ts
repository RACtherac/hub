import type { Character } from "../../../types/warhammer";

export const tyranidsCharacters: Character[] = [

  {
    id: "hive-tyrant",
    name: "Hive Tyrant",
    image: "/warhammerimages/hive-tyrant.png",
    points: 195,
    faction:"tyranids",
    canAttachTo: [
      "tyrant guard",
      
    ],

    wargear: [
      {
        id: "bonesword/lashwhip",
        name: "Bonesword & lash whip",
        image: "/warhammerimages/bonesword.png",
        points: 0,
      },
    ],
  },

  {
    id: "broodlord",
    name: "Broodlord",
    image: "/warhammerimages/broodlord.png",
    points: 95,
    faction:"tyranids",
    canAttachTo: [
      "genestealers",
    ],

    wargear: [],
  },

  {
    id: "neurotyrant",
    name: "Neurotyrant",
    image: "/warhammerimages/neurotyrant.png",
    points: 105,
    faction:"tyranids",
    canAttachTo: [
      "'neurogaunts'","'tyrantguard'","'zoanthropes'"
    ],
    wargear: [],
  },
  {
    id: "oldoneeye",
    name: "Old one eye",
    image: "../../public/warhammerimages/Tyranids/old-one-eye.png",
    points: 95,
        faction:"tyranids",
    canAttachTo: [
      "carnifex",
    ],
    wargear: [],
  },
];