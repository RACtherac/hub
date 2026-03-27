import type { Character } from "../../../types/warhammer";

export const chaosCharacters: Character[] = [

  {
    id: "chaos-lord",
    name: "Chaos Lord",
    image: "/warhammerimages/chaos-lord.png",
    points: 90,
    faction: "chaos-space-marine",
    canAttachTo: ["chaos-space-marines", "chosen", "chaos-terminators"],
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
        points: 0,
      },
    ],
  },

  {
    id: "sorcerer",
    name: "Sorcerer",
    image: "/warhammerimages/Chaos/sorcerer.png",
    points: 85,
    faction: "chaos-space-marine",
    canAttachTo: ["chaos-space-marines", "chosen", "havocs"],
    wargear: [
      {
        id: "force-staff",
        name: "Force Staff",
        image: "/warhammerimages/Chaos/force-staff.png",
        points: 0,
      },
      {
        id: "chaos-plasma-pistol",
        name: "Plasma Pistol",
        image: "/warhammerimages/plasma-gun.png",
        points: 5,
      },
    ],
  },

  {
    id: "dark-apostle",
    name: "Dark Apostle",
    image: "/warhammerimages/Chaos/dark-apostle.png",
    points: 80,
    faction: "chaos-space-marine",
    canAttachTo: ["chaos-space-marines", "cultists", "chosen"],
    wargear: [
      {
        id: "cursed-crozius",
        name: "Cursed Crozius",
        image: "/warhammerimages/Chaos/cursed-crozius.png",
        points: 0,
      },
    ],
  },

];
