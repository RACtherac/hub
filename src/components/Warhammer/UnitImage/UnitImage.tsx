import type { Unit } from "../../../types/warhammer";

interface Props {
  unit: Unit;
  selectedWargear: string[];
}

export default function UnitImage({ unit, selectedWargear }: Props) {
  const wargearImage = unit.wargear.find(
    (w) => selectedWargear.includes(w.id) && w.image
  );

  const imageSrc = wargearImage?.image || unit.image;

  return <img src={imageSrc} width={200} />;
}