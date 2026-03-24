import ArmyBuilder from "../components/Warhammer/Armybuilder/Armybuilder";

import {
  allUnits,
  allCharacters,
} from "../data/warhammer";

export default function ArmyBuilderPage() {
  return (
    <div style={{ padding: "20px" }}>
      <h1>Warhammer Army Builder</h1>

      <ArmyBuilder
        units={allUnits}
        characters={allCharacters}
      />
    </div>
  );
}