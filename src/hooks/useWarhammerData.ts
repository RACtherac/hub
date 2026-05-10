import type { Unit, Character } from "../types/warhammer";
import { allUnits, allCharacters } from "../data/warhammer/index";

interface WarhammerData {
  units: Unit[];
  characters: Character[];
  loading: boolean;
  error: string | null;
}

export function useWarhammerData(): WarhammerData {
  return {
    units: allUnits as Unit[],
    characters: allCharacters as Character[],
    loading: false,
    error: null,
  };
}
