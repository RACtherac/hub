import { useState } from "react";
import UnitCard from "../Unitcard/Unitcard";
import type {
  Unit,
  Character,
  UnitCategory,
  Faction,
} from "../../../types/Warhammer";

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

  transportedUnits: string[];
}

export default function ArmyBuilder({
  units,
  characters,
}: Props) {
  const [armyUnits, setArmyUnits] =
    useState<ArmyUnit[]>([]);

  const [addingUnit, setAddingUnit] =
    useState(false);

  const [openCategory, setOpenCategory] =
    useState<UnitCategory | null>(null);

  const [selectedFaction, setSelectedFaction] =
    useState<Faction>("space-marines");

  const getUnitsByCategory = (
    category: UnitCategory
  ) =>
    units.filter(
      (u) =>
        u.category === category &&
        u.faction === selectedFaction
    );

  const addUnit = (unitId: string) => {
    const newUnit: ArmyUnit = {
      id: Date.now(),
      unitId,
      modelCount: 5,
      wargear: [],
      attachedCharacter: undefined,
      characterWargear: [],
      transportedUnits: [],
    };

    setArmyUnits([...armyUnits, newUnit]);
    setAddingUnit(false);
    setOpenCategory(null);
  };

  const removeUnit = (id: number) => {
    setArmyUnits(
      armyUnits.filter(
        (unit) => unit.id !== id
      )
    );
  };

  const updateUnit = (
    id: number,
    updated: Partial<ArmyUnit>
  ) => {
    setArmyUnits(
      armyUnits.map((unit) =>
        unit.id === id ? { ...unit, ...updated } : unit
      )
    );
  };

  const calculateUnitPoints = (
    armyUnit: ArmyUnit
  ) => {
    const unit = units.find(
      (u) => u.id === armyUnit.unitId
    );
    if (!unit) return 0;

    let total = unit.points;

    armyUnit.wargear.forEach((w) => {
      const gear =
        unit.wargear.find((g) => g.id === w);
      if (gear?.points) total += gear.points;
    });

    if (armyUnit.attachedCharacter) {
      const char =
        characters.find(
          (c) => c.id === armyUnit.attachedCharacter
        );

      if (char) {
        total += char.points;

        armyUnit.characterWargear.forEach((w) => {
          const gear = char.wargear?.find(
            (g) => g.id === w
          );
          if (gear?.points) total += gear.points;
        });
      }
    }

    return total;
  };

  const totalArmyPoints =
    armyUnits.reduce(
      (sum, unit) => sum + calculateUnitPoints(unit),
      0
    );

  // Categories with dynamic Vehicle -> Monster for Tyranids
  const baseCategories: UnitCategory[] = [
    "battleline",
    "infantry",
    "vehicle",
    "transport",
  ];

  const categories =
    selectedFaction === "tyranids"
      ? baseCategories.map((cat) =>
          cat === "vehicle" ? "monster" : cat
        )
      : baseCategories;

  return (
    <div>
      {/* FACTION SELECTOR */}
      <div
        style={{
          display: "flex",
          gap: "10px",
          marginBottom: "15px",
        }}
      >
        <button
          onClick={() =>
            setSelectedFaction("space-marines")
          }
        >
          Space Marines
        </button>
        <button
          onClick={() =>
            setSelectedFaction("chaos")
          }
        >
          Chaos
        </button>
        <button
          onClick={() =>
            setSelectedFaction("tyranids")
          }
        >
          Tyranids
        </button>
      </div>

      {/* DASHBOARD */}
      <div
        style={{
          display: "flex",
          gap: "12px",
          marginBottom: "25px",
          alignItems: "center",
          borderBottom: "2px solid black",
          paddingBottom: "10px",
        }}
      >
        {categories.map((category) => (
          <div key={category} style={{ position: "relative" }}>
            <button
              disabled={!addingUnit}
              onClick={() =>
                setOpenCategory(
                  openCategory === category ? null : category
                )
              }
              style={{
                padding: "8px 14px",
                border: "2px solid black",
                background: addingUnit ? "white" : "#ccc",
                cursor: addingUnit ? "pointer" : "not-allowed",
              }}
            >
              {category.toUpperCase()} ▼
            </button>

            {/* Dropdown */}
            {openCategory === category && (
              <div
                style={{
                  position: "absolute",
                  top: "40px",
                  left: "0",
                  background: "white",
                  border: "2px solid black",
                  boxShadow: "4px 4px 0px black",
                  padding: "10px",
                  minWidth: "180px",
                  zIndex: 10,
                }}
              >
                {getUnitsByCategory(category).map((unit) => (
                  <button
                    key={unit.id}
                    onClick={() => addUnit(unit.id)}
                    style={{
                      width: "100%",
                      padding: "6px",
                      textAlign: "left",
                      border: "none",
                      background: "white",
                      cursor: "pointer",
                    }}
                  >
                    {unit.name}
                  </button>
                ))}
              </div>
            )}
          </div>
        ))}

        {/* ADD UNIT */}
        <button
          onClick={() => setAddingUnit(!addingUnit)}
          style={{
            background: addingUnit ? "#d4ffd4" : "white",
            border: "3px solid black",
            padding: "8px 16px",
            fontWeight: "bold",
            cursor: "pointer",
          }}
        >
          + ADD UNIT
        </button>

        {/* BACK BUTTON */}
        <button
          onClick={() => (window.location.href = "/")}
          style={{
            marginLeft: "auto",
            border: "2px solid black",
            padding: "8px 14px",
            background: "white",
            cursor: "pointer",
          }}
        >
          Back to Hub
        </button>
      </div>

      {/* POINTS */}
      <div
        style={{
          fontSize: "20px",
          fontWeight: "bold",
          marginBottom: "15px",
        }}
      >
        Army Points: {totalArmyPoints}
      </div>

      {/* UNITS */}
      {armyUnits.map((armyUnit) => {
        const selectedUnit = units.find((u) => u.id === armyUnit.unitId);
        if (!selectedUnit) return null;

        return (
          <div
            key={armyUnit.id}
            style={{
              border: "2px solid black",
              padding: "15px",
              marginBottom: "20px",
              background: "#fafafa",
            }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                marginBottom: "10px",
              }}
            >
              <strong>
                {selectedUnit.name} ({calculateUnitPoints(armyUnit)} pts)
              </strong>

              <button
                onClick={() => removeUnit(armyUnit.id)}
                style={{
                  border: "2px solid red",
                  background: "white",
                  cursor: "pointer",
                }}
              >
                ❌ Remove
              </button>
            </div>

            <UnitCard
              unit={selectedUnit}
              characters={characters}
              allUnits={units}
              modelCount={armyUnit.modelCount}
              selectedWargear={armyUnit.wargear}
              attachedCharacter={armyUnit.attachedCharacter}
              characterWargear={armyUnit.characterWargear}
              transportedUnits={armyUnit.transportedUnits}
              onModelCountChange={(count) =>
                updateUnit(armyUnit.id, { modelCount: count })
              }
              onWargearChange={(gear) =>
                updateUnit(armyUnit.id, { wargear: gear })
              }
              onCharacterChange={(char) =>
                updateUnit(armyUnit.id, {
                  attachedCharacter: char,
                  characterWargear: [],
                })
              }
              onCharacterWargearChange={(gear) =>
                updateUnit(armyUnit.id, { characterWargear: gear })
              }
              onTransportChange={(unitsInside) =>
                updateUnit(armyUnit.id, { transportedUnits: unitsInside })
              }
            />
          </div>
        );
      })}

      {armyUnits.length === 0 && (
        <p>
          No units added yet. Click <strong>+ Add Unit</strong>
        </p>
      )}
    </div>
  );
}