import React from "react"
import type { Unit } from "../../../types/warhammer"

interface Props {
  unit: Unit
  selectedWargear: string[]
}

export default function UnitImage({ unit, selectedWargear }: Props) {

  const wargearImage = unit.wargear.find((w) =>
    selectedWargear.includes(w.id) && w.image
  )

  const imageSrc = wargearImage?.image || unit.image

  return (
    <div>
      <img
        src={imageSrc}
        alt={unit.name}
        style={{ width: "200px", height: "auto" }}
      />
    </div>
  )
}