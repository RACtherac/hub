import { useState } from "react";
import UnitCard from "../Unitcard/Unitcard";
import type {
  Unit,
  Character,
  UnitCategory,
  Faction,
  SuperFaction,
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

  const [openSuperFaction, setOpenSuperFaction] =
    useState<SuperFaction | null>(null);

  const superfactions: Record<
    SuperFaction,
    Faction[]
  > = {
    imperium: [
      "space-marines",
      "astra-militarum",
      "adeptus-mechanicus",
    ],

    chaos: [
      "chaos-space-marine",
      "death-guard",
      "thousand-sons",
    ],

    xenos: [
      "tyranids",
      "necrons",
      "orks",
    ],
  };

  const baseCategories: UnitCategory[] = [
    "battleline",
    "infantry",
    "vehicle",
    "transport",
  ];

  const categories =
    selectedFaction === "tyranids"
      ? baseCategories.map((c) =>
          c === "vehicle" ? "monster" : c
        )
      : baseCategories;

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
        (u) => u.id !== id
      )
    );
  };

  const updateUnit = (
    id: number,
    updated: Partial<ArmyUnit>
  ) => {
    setArmyUnits(
      armyUnits.map((unit) =>
        unit.id === id
          ? { ...unit, ...updated }
          : unit
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
        unit.wargear.find(
          (g) => g.id === w
        );
      if (gear?.points)
        total += gear.points;
    });

    if (armyUnit.attachedCharacter) {
      const char =
        characters.find(
          (c) =>
            c.id ===
            armyUnit.attachedCharacter
        );

      if (char) {
        total += char.points;

        armyUnit.characterWargear.forEach(
          (w) => {
            const gear =
              char.wargear?.find(
                (g) => g.id === w
              );

            if (gear?.points)
              total += gear.points;
          }
        );
      }
    }

    return total;
  };

  const totalArmyPoints =
    armyUnits.reduce(
      (sum, unit) =>
        sum +
        calculateUnitPoints(unit),
      0
    );

  return (
    <div>
      {/* SUPERFACTION MENU */}

      <div
        style={{
          display: "flex",
          gap: "15px",
          marginBottom: "20px",
          borderBottom:
            "2px solid black",
          paddingBottom: "10px",
        }}
      >
        {(Object.keys(
          superfactions
        ) as SuperFaction[]).map(
          (sf) => (
            <div
              key={sf}
              style={{
                position: "relative",
              }}
            >
              <button
                onClick={() =>
                  setOpenSuperFaction(
                    openSuperFaction === sf
                      ? null
                      : sf
                  )
                }
                style={{
                  padding: "8px 16px",
                  border:
                    "2px solid black",
                  background: "white",
                  cursor: "pointer",
                  fontWeight: "bold",
                }}
              >
                {sf.toUpperCase()} ▼
              </button>

              {openSuperFaction ===
                sf && (
                <div
                  style={{
                    position:
                      "absolute",
                    top: "40px",
                    left: "0",
                    background:
                      "white",
                    border:
                      "2px solid black",
                    boxShadow:
                      "4px 4px 0px black",
                    padding: "10px",
                    minWidth:
                      "200px",
                    zIndex: 10,
                  }}
                >
                  {superfactions[
                    sf
                  ].map(
                    (faction) => (
                      <button
                        key={faction}
                        onClick={() => {
                          setSelectedFaction(
                            faction
                          );
                          setOpenSuperFaction(
                            null
                          );
                        }}
                        style={{
                          width:
                            "100%",
                          padding: "6px",
                          textAlign:
                            "left",
                          border: "none",
                          background:
                            "white",
                          cursor:
                            "pointer",
                        }}
                      >
                        {faction
                          .replace(
                            "-",
                            " "
                          )
                          .toUpperCase()}
                      </button>
                    )
                  )}
                </div>
              )}
            </div>
          )
        )}
      </div>

      {/* CURRENT FACTION */}

      <h2>
        Current Faction:{" "}
        {selectedFaction.replace(
          "-",
          " "
        )}
      </h2>

      {/* CATEGORY DASHBOARD */}

      <div
        style={{
          display: "flex",
          gap: "10px",
          marginBottom: "20px",
          marginTop: "15px",
          alignItems: "center",
        }}
      >
        {categories.map(
          (category) => (
            <div
              key={category}
              style={{
                position:
                  "relative",
              }}
            >
              <button
                disabled={
                  !addingUnit
                }
                onClick={() =>
                  setOpenCategory(
                    openCategory ===
                      category
                      ? null
                      : category
                  )
                }
                style={{
                  padding:
                    "8px 14px",
                  border:
                    "2px solid black",
                  background:
                    addingUnit
                      ? "white"
                      : "#ccc",
                  cursor:
                    addingUnit
                      ? "pointer"
                      : "not-allowed",
                }}
              >
                {category.toUpperCase()} ▼
              </button>

              {openCategory ===
                category && (
                <div
                  style={{
                    position:
                      "absolute",
                    top: "40px",
                    background:
                      "white",
                    border:
                      "2px solid black",
                    padding: "10px",
                    zIndex: 10,
                    minWidth:
                      "200px",
                  }}
                >
                  {getUnitsByCategory(
                    category
                  ).map(
                    (unit) => (
                      <button
                        key={
                          unit.id
                        }
                        onClick={() =>
                          addUnit(
                            unit.id
                          )
                        }
                        style={{
                          width:
                            "100%",
                          padding:
                            "6px",
                          textAlign:
                            "left",
                          border:
                            "none",
                          background:
                            "white",
                          cursor:
                            "pointer",
                        }}
                      >
                        {
                          unit.name
                        }
                      </button>
                    )
                  )}
                </div>
              )}
            </div>
          )
        )}

        <button
          onClick={() =>
            setAddingUnit(
              !addingUnit
            )
          }
          style={{
            padding:
              "8px 16px",
            border:
              "3px solid black",
            fontWeight:
              "bold",
            cursor: "pointer",
          }}
        >
          + ADD UNIT
        </button>

        <button
          onClick={() =>
            (window.location.href =
              "/")
          }
          style={{
            marginLeft:
              "auto",
            border:
              "2px solid black",
            padding:
              "8px 14px",
            background:
              "white",
            cursor:
              "pointer",
          }}
        >
          Back to Hub
        </button>
      </div>

      {/* POINTS */}

      <h3>
        Army Points:{" "}
        {totalArmyPoints}
      </h3>

      {/* UNITS */}

      {armyUnits.map(
        (armyUnit) => {
          const selectedUnit =
            units.find(
              (u) =>
                u.id ===
                armyUnit.unitId
            );

          if (!selectedUnit)
            return null;

          return (
            <div
              key={
                armyUnit.id
              }
              style={{
                border:
                  "2px solid black",
                padding:
                  "15px",
                marginBottom:
                  "20px",
                background:
                  "#fafafa",
              }}
            >
              <div
                style={{
                  display:
                    "flex",
                  justifyContent:
                    "space-between",
                }}
              >
                <strong>
                  {
                    selectedUnit.name
                  }{" "}
                  (
                  {calculateUnitPoints(
                    armyUnit
                  )}{" "}
                  pts)
                </strong>

                <button
                  onClick={() =>
                    removeUnit(
                      armyUnit.id
                    )
                  }
                >
                  ❌ Remove
                </button>
              </div>

              <UnitCard
                unit={
                  selectedUnit
                }
                characters={
                  characters
                }
                allUnits={
                  units
                }
                modelCount={
                  armyUnit.modelCount
                }
                selectedWargear={
                  armyUnit.wargear
                }
                attachedCharacter={
                  armyUnit.attachedCharacter
                }
                characterWargear={
                  armyUnit.characterWargear
                }
                transportedUnits={
                  armyUnit.transportedUnits
                }
                onModelCountChange={(
                  count
                ) =>
                  updateUnit(
                    armyUnit.id,
                    {
                      modelCount:
                        count,
                    }
                  )
                }
                onWargearChange={(
                  gear
                ) =>
                  updateUnit(
                    armyUnit.id,
                    {
                      wargear:
                        gear,
                    }
                  )
                }
                onCharacterChange={(
                  char
                ) =>
                  updateUnit(
                    armyUnit.id,
                    {
                      attachedCharacter:
                        char,
                      characterWargear:
                        [],
                    }
                  )
                }
                onCharacterWargearChange={(
                  gear
                ) =>
                  updateUnit(
                    armyUnit.id,
                    {
                      characterWargear:
                        gear,
                    }
                  )
                }
                onTransportChange={(
                  unitsInside
                ) =>
                  updateUnit(
                    armyUnit.id,
                    {
                      transportedUnits:
                        unitsInside,
                    }
                  )
                }
              />
            </div>
          );
        }
      )}
    </div>
  );
}