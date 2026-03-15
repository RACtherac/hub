import React from "react";
import Builder from "../components/Warhammer/Armybuilder/Armybuilder";
import type { Unit, Character } from "../types/warhammer";

const units: Unit[] = [
  {
    id: "intercessors",
    name: "Intercessor Squad",
    image: "/warhammerimages/intercessor.png",
    wargear: [
      {
        id: "bolt",
        name: "Bolt Rifle",
        image: "/warhammerimages/intercessor-bolt.png",
      },
      {
        id: "auto",
        name: "Auto Bolt Rifle",
        image: "/warhammerimages/intercessor-auto.png",
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
  },
];

export default function ArmyBuilder() {
  return (
    <div style={{ padding: 40 }}>
      <h1>Warhammer Army Builder</h1>

      <Builder units={units} characters={characters} />
    </div>
  );
}