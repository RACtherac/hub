import { useState } from "react";
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
      modelCount: 5,
      selectedWargear: [],
      attachedCharacter: undefined,
      characterWargear: [],
    },
  ]);

  const updateUnit = (index: number, updated: Partial<ArmyUnit>) => {
    const newArmy = [...army];
    newArmy[index] = { ...newArmy[index], ...updated };
    setArmy(newArmy);
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
            modelCount={armyUnit.modelCount}
            selectedWargear={armyUnit.selectedWargear}
            attachedCharacter={armyUnit.attachedCharacter}
            characterWargear={armyUnit.characterWargear}

            onModelCountChange={(count) =>
              updateUnit(index, { modelCount: count })
            }

            onWargearChange={(w) =>
              updateUnit(index, { selectedWargear: w })
            }

            onCharacterAttach={(c) =>
              updateUnit(index, { attachedCharacter: c })
            }

            onCharacterWargearChange={(w) =>
              updateUnit(index, { characterWargear: w })
            }
          />
        );
      })}
    </div>
  );
}