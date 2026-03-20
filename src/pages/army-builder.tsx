import Builder from "../components/Warhammer/Armybuilder/Armybuilder";
import type { Unit, Character } from "../types/warhammer";


const units: Unit[] = [
  {
    id: "intercessors",
    name: "Intercessor Squad",

    image5: "../../public/Warhammerimages/intercessor5.png",
    image10: "../../public/Warhammerimages/intercessor10.png",

    wargear: [
      {
        id: "bolt-rifle",
        name: "Bolt Rifle",
        image: "../../public/Warhammerimages/intercessor-bolt.png",
      },
      {
        id: "auto-bolt",
        name: "Auto Bolt Rifle",
        image: "../../public/Warhammerimages/intercessor-auto.png",
      },
    ],
  },
];

const characters: Character[] = [
  {
    id: "captain",
    name: "Space Marine Captain",

    image: "/warhammerimages/captain.png",

    canAttachTo: ["intercessors"],

    wargear: [
      {
        id: "power-sword",
        name: "Power Sword",
        image: "../../public/Warhammerimages/power-sword.png",
      },
      {
        id: "plasma-pistol",
        name: "Plasma Pistol",
        image: "../../public/warhammerimages/plasma-pistol.png",
      },
    ],
  },
];

export default function ArmyBuilderPage() {
  return (
    <div style={{ padding: 40 }}>
      <h1>Warhammer Army Builder</h1>

      <Builder units={units} characters={characters} />
    </div>
  );
}