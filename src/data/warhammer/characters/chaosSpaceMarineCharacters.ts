import type { Character } from "../../../types/warhammer";

export const chaosCharacters: Character[] = [
  {
    id: "chaos-lord",
    name: "Chaos Lord",
    image: "/warhammerimages/chaos-lord.png",
    points: 90,
    faction: "chaos-space-marine",
    canAttachTo: ["chaos-space-marines"],
    wargear: [
      {
        id: "power-fist",
        name: "Power Fist",
        image: "/warhammerimages/power-fist.png",
        points: 10,
      },
      {
        id: "bolt-pistol",
        name: "Bolt Pistol",
        image: "/warhammerimages/bolt-pistol.png",
        points: 5,
      },
    ],
  },
];