import ArmyBuilder from "../components/Warhammer/Armybuilder/Armybuilder";
import type { Unit, Character } from "../types/warhammer";

const units: Unit[] = [
  {
    id: "intercessors",
    name: "Intercessor Squad",
    image5: "../../public/warhammerimages/intercessor5.png",
    image10: "../../public/warhammerimages/intercessor10.png",
    wargear: [
      {
        id: "bolt-rifle",
        name: "Bolt Rifle",
        image: "/warhammerimages/intercessor-bolt.png",
      },
      {
        id: "grenade",
        name: "Grenade",
        image: "/warhammerimages/intercessor-auto.png",
      },
    ],
  },
  {
    id: "assault-intercessors",
    name: "Assault Intercessor Squad",
    image5: "../../public/warhammerimages/assault-intercessor5.png",
    image10: "../../public/warhammerimages/assault-intercessor10.png",
    wargear: [
      {
        id: "powerfist",
        name: "Astartes power fist",
        image: "../../public/warhammerimages/assault-intercessor-powerfist.png",
      },
      {
        id: "heavy-bolt-pistol",
        name: "Heavy Bolt Pistol",
        image: "/warhammerimages/heavy-bolt-pistol.png",
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
        image: "../../public/warhammerimages/power-sword.png",
      },
      {
        id: "plasma-pistol",
        name: "Plasma Pistol",
        image: "../../public/warhammerimages/plasma-pistol.png",
      },
    ],
  },
  {
    id: "lieutenant",
    name: "Space Marine Lieutenant",
    image: "/warhammerimages/lieutenant.png",
    canAttachTo: ["intercessors"],
    wargear: [
      {
        id: "master-crafted-bolt",
        name: "Master Crafted Bolt Rifle",
        image: "/warhammerimages/master-bolt.png",
      },
      {
        id: "combat-knife",
        name: "Combat Knife",
        image: "/warhammerimages/combat-knife.png",
      },
    ],
  },
  {
    id: "apothecary",
    name: "Space Marine Apothecary",
    image: "../../public/warhammerimages/apothecary.png",
    canAttachTo: ["intercessors"],
    wargear: [],
  },
];

export default function ArmyBuilderPage() {
  return (
    <div style={{ padding: "20px" }}>
      <h1>Warhammer Army Builder</h1>

      <ArmyBuilder
        units={units}
        characters={characters}
      />
    </div>
  );
}