import type { Faction, UnitCategory, WeaponProfile, UnitAbility } from "../types/warhammer";

export interface ApiWargearOption {
  id: string;
  name: string;
  image?: string;
  points?: number;
  profiles?: WeaponProfile[];
}

export interface ApiUnit {
  id: string;
  name: string;
  faction: Faction;
  category: UnitCategory;
  image?: string;
  image3?: string;
  image5?: string;
  image6?: string;
  image10?: string;
  points: number;
  abilities?: UnitAbility[];
  defaultWargear: ApiWargearOption[];
  wargear: ApiWargearOption[];
  ledBy: string[];
  transportCapacity?: number;
}

export interface ApiCharacter {
  id: string;
  name: string;
  faction: Faction;
  image?: string;
  points: number;
  canAttachTo: string[];
  abilities?: UnitAbility[];
  defaultWargear?: ApiWargearOption[];
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
