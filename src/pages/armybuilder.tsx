import  ArmyBuilder from "../components/Warhammer/Armybuilder/Armybuilder"
import type { Unit } from "../types/warhammer"

const units: Unit[] = [
  {
    id: "intercessors",
    name: "Intercessor Squad",
    image: "/images/intercessor.png",
    wargear: [
      { id: "bolt-rifle", name: "Bolt Rifle", image: "/images/bolt-rifle.png" },
      { id: "auto-bolt", name: "Auto Bolt Rifle", image: "/images/auto-bolt.png" }
    ]
  }
]

export default function ArmyBuilderPage() {
  return <ArmyBuilder units={units} />
}