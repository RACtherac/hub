export type SuperFaction =
  | "imperium"
  | "chaos"
  | "xenos";

export type Faction =
  | "space-marines"
  | "astra-militarum"
  | "adeptus-mechanicus"
  | "chaos-space-marine"
  | "death-guard"
  | "thousand-sons"
  | "tyranids"
  | "necrons"
  | "orks";

export type UnitCategory =
  | "battleline"
  | "infantry"
  | "vehicle"
  | "transport"
  | "monster";

export interface WargearOption {
  id: string;
  name: string;
  image: string;
  points?: number;
}

export interface Unit {
  id: string;
  name: string;

  faction: Faction;
  category: UnitCategory;

  image3?: string;
  image5?: string;
  image6?: string;
  image10?: string;
  image?: string;

  points: number;

  wargear: WargearOption[];

  transportCapacity?: number;
}

export interface Character {
  id: string;
  name: string;

  faction: Faction;

  image: string;

  points: number;

  canAttachTo: string[];

  wargear?: WargearOption[];
}