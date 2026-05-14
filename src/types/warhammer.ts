export type SuperFaction =
  | "imperium"
  | "chaos"
  | "xenos";

export type Faction =
  | "space-marines"
  | "astra-militarum"
  | "adeptus-mechanicus"
  | "adeptus-custodes"
  | "adepta-sororitas"
  | "grey-knights"
  | "imperial-agents"
  | "imperial-knights"
  | "chaos-space-marine"
  | "death-guard"
  | "thousand-sons"
  | "world-eaters"
  | "chaos-daemons"
  | "chaos-knights"
  | "emperors-children"
  | "tyranids"
  | "necrons"
  | "orks"
  | "tau-empire"
  | "aeldari"
  | "drukhari"
  | "genestealer-cults"
  | "leagues-of-votann";

export type UnitCategory =
  | "battleline"
  | "infantry"
  | "vehicle"
  | "transport"
  | "monster"
  | "mounted";

export interface UnitNote {
  id: string;
  text: string;
  textByModelCount?: Record<number, string>;
  checkbox?: boolean;
  image?: string;
  weaponId?: string;
  weaponIds?: string[];
  showForModelCounts?: number[];
  triggersWargear?: string[];
  maxCountByModelCount?: Record<number, number>;
  replacesDefaultWargear?: string;
  exclusiveWith?: string | string[];
  noteGroup?: string;
  requiredWargear?: string[];
}

export interface WeaponProfile {
  profileName?: string;
  range: string;
  attacks: string;
  skill: string;
  strength: string;
  ap: string;
  damage: string;
  keywords?: string[];
}

export interface UnitAbility {
  name: string;
  description: string;
  requiresNote?: string;
}

export interface WargearOption {
  id: string;
  name: string;
  image: string;
  points?: number;
  profiles?: WeaponProfile[];
  note?: string;
  linkedWargear?: string[];
  sergeantOnly?: boolean;
  consumesNoteWargear?: { noteId: string; wargearId: string };
  countable?: boolean;
  maxCountByModelCount?: Record<number, number>;
  maxCountReducedByNotes?: string[];
  maxCountReducedByWargear?: string[];
  linkedCounterId?: string;
  wargearGroup?: string;
  showForModelCounts?: number[];
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
  imageCredit?: string;

  points?: number;
  pointsByModelCount?: Record<number, number>;

  modelCountOptions?: number[];
  attachableUnits?: string[];
  wargearLabel?: string;
  wargearGroups?: string[][];
  sergeantOptionGroups?: { label: string; ids: string[] }[];
  notes?: UnitNote[];
  noteGroupLimits?: Record<string, number>;
  noteGroupLimitsByModelCount?: Record<string, Record<number, number>>;
  abilities?: UnitAbility[];

  defaultWargear?: WargearOption[];
  wargear: WargearOption[];
  defaultSelectedWargear?: string[];
  ledBy?: string[];

  transportCapacity?: number;
  transportSlots?: number;
  monsterTransportCapacity?: number;
  dreadnoughtTransportCapacity?: number;
}

export interface Character {
  id: string;
  name: string;

  faction: Faction;

  image: string;
  imageCredit?: string;

  points: number;
  pointsByModelCount?: Record<number, number>;
  modelCountOptions?: number[];

  canAttachTo: string[];

  allowsSecondCharacter?: boolean;
  secondCharacterOptions?: string[];

  abilities?: UnitAbility[];

  wargearGroups?: string[][];
  wargearSections?: { label: string; ids: string[] }[];
  defaultWargear?: WargearOption[];
  wargear?: WargearOption[];
  defaultSelectedWargear?: string[];
  keywords?: string[];
}