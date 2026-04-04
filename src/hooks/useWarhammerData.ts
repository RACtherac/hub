import { useState, useEffect } from "react";
import { fetchUnits, fetchCharacters } from "../api/warhammerApi";
import type { Unit, Character } from "../types/warhammer";

interface WarhammerData {
  units: Unit[];
  characters: Character[];
  loading: boolean;
  error: string | null;
}

export function useWarhammerData(): WarhammerData {
  const [units, setUnits] = useState<Unit[]>([]);
  const [characters, setCharacters] = useState<Character[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    Promise.all([fetchUnits(), fetchCharacters()])
      .then(([u, c]) => {
        setUnits(u as Unit[]);
        setCharacters(c as Character[]);
      })
      .catch((e: Error) => setError(e.message))
      .finally(() => setLoading(false));
  }, []);

  return { units, characters, loading, error };
}
