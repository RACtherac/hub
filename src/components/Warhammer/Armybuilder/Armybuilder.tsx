import React, { useState } from "react";
import type { Unit, Character, ArmyUnit } from "../../../types/warhammer";
import UnitCard from "../Unitcard/Unitcard";

interface Props {
  units: Unit[];
  characters: Character[];
}

export default function ArmyBuilder({ units, characters }: Props) {
  const [army, setArmy] = useState<ArmyUnit[]>([
    {
      unitId: units[0].id,
      selectedWargear: [],
    },
  ]);

  const updateWargear = (index: number, wargear: string[]) => {
    const updated = [...army];
    updated[index].selectedWargear = wargear;
    setArmy(updated);
  };

  const attachCharacter = (index: number, characterId?: string) => {
    const updated = [...army];
    updated[index].attachedCharacter = characterId;
    setArmy(updated);
  };

  return (
    <div>
      {army.map((armyUnit, index) => {
        const unit = units.find((u) => u.id === armyUnit.unitId);
        if (!unit) return null;

        return (
          <UnitCard
            key={index}
            unit={unit}
            characters={characters}
            selectedWargear={armyUnit.selectedWargear}
            attachedCharacter={armyUnit.attachedCharacter}
            onWargearChange={(w) => updateWargear(index, w)}
            onCharacterAttach={(c) => attachCharacter(index, c)}
          />
        );
      })}
    </div>
  );
}