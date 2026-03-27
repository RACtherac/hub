import type { Faction, UnitCategory } from "../types/warhammer";

// ── API response types (no image fields — images live in imageMap.ts) ──────

export interface ApiWargearOption {
  id: string;
  name: string;
  points?: number;
}

export interface ApiUnit {
  id: string;
  name: string;
  faction: Faction;
  category: UnitCategory;
  points: number;
  wargear: ApiWargearOption[];
  transportCapacity?: number;
}

export interface ApiCharacter {
  id: string;
  name: string;
  faction: Faction;
  points: number;
  canAttachTo: string[];
  wargear?: ApiWargearOption[];
}

// ── Config ────────────────────────────────────────────────────────────────

const BASE_URL = import.meta.env.VITE_WARHAMMER_API_URL ?? "";

// ── Fetch helpers ─────────────────────────────────────────────────────────

export async function fetchUnits(): Promise<ApiUnit[]> {
  const res = await fetch(`${BASE_URL}/units`);
  if (!res.ok) throw new Error(`Failed to fetch units: ${res.status}`);
  return res.json();
}

export async function fetchCharacters(): Promise<ApiCharacter[]> {
  const res = await fetch(`${BASE_URL}/characters`);
  if (!res.ok) throw new Error(`Failed to fetch characters: ${res.status}`);
  return res.json();
}
