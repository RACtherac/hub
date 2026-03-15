export interface WargearOption {
  id: string
  name: string
  image?: string
}

export interface Unit {
  id: string
  name: string
  image: string
  wargear: WargearOption[]
}

export interface Character {
  id: string
  name: string
  image: string
  canAttachTo: string[]
}

export interface ArmyUnit {
  unitId: string
  selectedWargear: string[]
  attachedCharacter?: string
}