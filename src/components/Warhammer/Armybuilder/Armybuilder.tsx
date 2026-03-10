import React, { useState } from "react"
import type { Unit, ArmyUnit } from "../../../types/warhammer"

interface Props {
  units: Unit[]
}

export default function ArmyBuilder({ units }: Props) {
  const [army, setArmy] = useState<ArmyUnit[]>([])

  const addUnit = (unitId: string) => {
    setArmy([
      ...army,
      {
        unitId,
        selectedWargear: []
      }
    ])
  }

  return (
    <div>
      <h1>Warhammer Army Builder</h1>

      <h2>Available Units</h2>
      {units.map((unit) => (
        <button key={unit.id} onClick={() => addUnit(unit.id)}>
          Add {unit.name}
        </button>
      ))}

      <h2>Your Army</h2>
      {army.map((u, index) => (
        <div key={index}>
          {u.unitId}
        </div>
      ))}
    </div>
  )
}