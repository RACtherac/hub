import { useState } from "react";
import type { Unit, Character } from "../../../types/warhammer";
import UnitCard from "../Unitcard/Unitcard";

interface Props {
  units: Unit[];
  characters: Character[];
}

interface ArmyUnit {
  id: number;
  unitId: string;
  modelCount: number;
  wargear: string[];
  attachedCharacter?: string;
  characterWargear: string[];
}

export default function ArmyBuilder({ units, characters }: Props) {

  const [armyUnits, setArmyUnits] = useState<ArmyUnit[]>([
    {
      id: 1,
      unitId: units[0].id,
      modelCount: 5,
      wargear: [],
      attachedCharacter: undefined,
      characterWargear: [],
    },
  ]);

  const addUnit = () => {
    const newUnit: ArmyUnit = {
      id: Date.now(),
      unitId: units[0].id,
      modelCount: 5,
      wargear: [],
      attachedCharacter: undefined,
      characterWargear: [],
    };

    setArmyUnits([...armyUnits, newUnit]);
  };

  const updateUnit = (id: number, updated: Partial<ArmyUnit>) => {
    setArmyUnits(
      armyUnits.map((unit) =>
        unit.id === id ? { ...unit, ...updated } : unit
      )
    );
  };

  return (
    <div>

      <h2>Army Builder</h2>

      {armyUnits.map((armyUnit) => {

        const selectedUnit = units.find(
          (u) => u.id === armyUnit.unitId
        );

        if (!selectedUnit) return null;

        return (
          <div key={armyUnit.id} style={{ marginBottom: "30px" }}>

            {/* 🔽 UNIT DROPDOWN */}
            <select
              value={armyUnit.unitId}
              onChange={(e) =>
                updateUnit(armyUnit.id, {
                  unitId: e.target.value,
                  wargear: [],
                  attachedCharacter: undefined,
                  characterWargear: [],
                })
              }
            >
              {units.map((unit) => (
                <option key={unit.id} value={unit.id}>
                  {unit.name}
                </option>
              ))}
            </select>

            <UnitCard
              unit={selectedUnit}
              characters={characters}
              modelCount={armyUnit.modelCount}
              selectedWargear={armyUnit.wargear}
              attachedCharacter={armyUnit.attachedCharacter}
              characterWargear={armyUnit.characterWargear}
              onModelCountChange={(count) =>
                updateUnit(armyUnit.id, { modelCount: count })
              }
              onWargearChange={(gear) =>
                updateUnit(armyUnit.id, { wargear: gear })
              }
              onCharacterChange={(char: any) =>
                updateUnit(armyUnit.id, {
                  attachedCharacter: char,
                  characterWargear: [],
                })
              }
              onCharacterWargearChange={(gear) =>
                updateUnit(armyUnit.id, { characterWargear: gear })
              }
            />

          </div>
        );
      })}

      {/* ➕ ADD UNIT BUTTON */}
      <button
        onClick={addUnit}
        style={{
          padding: "10px 20px",
          border: "1px solid black",
          borderRadius: "5px",
          cursor: "pointer",
        }}
      >
        Add Unit
      </button>

    </div>
  );
}