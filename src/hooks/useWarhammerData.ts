import { allUnits, allCharacters } from "../data/warhammer/index";
import type { Unit, Character } from "../types/warhammer";

interface WarhammerData {
  units: Unit[];
  characters: Character[];
  loading: boolean;
  error: string | null;
}

export function useWarhammerData(): WarhammerData {
  return {
    units: allUnits,
    characters: allCharacters,
    loading: false,
    error: null,
  };
}
