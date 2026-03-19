export interface WargearOption {
  id: string;
  name: string;
  image?: string;
}

export interface Unit {
  id: string;
  name: string;
  image5: string;
  image10: string;
  wargear: WargearOption[];
}

export interface Character {
  id: string;
  name: string;
  image: string;
  canAttachTo: string[];
  wargear?: WargearOption[];
}

export interface ArmyUnit {
  unitId: string;
  modelCount: number;
  selectedWargear: string[];
  attachedCharacter?: string;
  characterWargear?: string[];
}