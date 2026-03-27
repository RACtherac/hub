import type { Character } from "../../../types/warhammer";

export const tyranidsCharacters: Character[] = [

  {
    id: "hive-tyrant",
    name: "Hive Tyrant",
    image: "",
    points: 195,
    faction: "tyranids",
    canAttachTo: ["tyrant-guard"],
    wargear: [
      { id: "bonesword-lashwhip",  name: "Bonesword & Lash Whip",  image: "", points: 0  },
      { id: "tyrant-heavy-venom",  name: "Heavy Venom Cannon",      image: "", points: 10 },
    ],
  },

  {
    id: "broodlord",
    name: "Broodlord",
    image: "",
    points: 95,
    faction: "tyranids",
    canAttachTo: ["genestealers"],
    wargear: [
      { id: "broodlord-claws", name: "Monstrous Rending Claws", image: "", points: 0 },
    ],
  },

  {
    id: "neurotyrant",
    name: "Neurotyrant",
    image: "",
    points: 105,
    faction: "tyranids",
    canAttachTo: ["neurogaunts", "tyrant-guard", "zoanthropes"],
    wargear: [],
  },

  {
    id: "old-one-eye",
    name: "Old One Eye",
    image: "/Warhammerimages/Tyranids/old-one-eye.png",
    points: 95,
    faction: "tyranids",
    canAttachTo: ["carnifex"],
    wargear: [
      { id: "one-eye-claws", name: "Crushing Claws", image: "", points: 0 },
    ],
  },

  {
    id: "norn-emissary",
    name: "Norn Emissary",
    image: "",
    points: 210,
    faction: "tyranids",
    canAttachTo: ["tyranid-warriors", "hive-guard"],
    wargear: [],
  },

];
