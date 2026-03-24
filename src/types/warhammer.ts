export interface WargearOption {
  points: number;
  id: string;
  name: string;
  image?: string;
}

export type UnitCategory = "battleline" | "infantry" | "vehicle" | "transport" | "monster";

export interface Unit {
  faction: string;
  id: string;
  name: string;
  category: UnitCategory;

  image3?: string;
  image6?: string;
  image5?: string;
  image10?: string;
  image?: string;

  points: number;

  wargear: WargearOption[];
}

export interface Character {
  id: string;
  name: string;
  image: string;
  canAttachTo: string[];
  wargear?: WargearOption[];

  points: number;
}

export interface ArmyUnit {
  unitId: string;
  modelCount: number;
  selectedWargear: string[];
  attachedCharacter?: string;
  characterWargear?: string[];
}

export type Faction =
  | "space-marines"
  | "chaos"
  | "tyranids";