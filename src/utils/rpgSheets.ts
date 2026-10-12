import { createDefaultDwReal, normalizeDwReal, type DwRealData } from "../components/DeathwatchReal/dwRealData";

export type StatKey = "STR" | "DEX" | "CON" | "INT" | "WIS" | "CHA";
export type SheetType = "dnd" | "custom";
export type TemplateId = "dnd-5e" | "cyberpunk-red" | "deathwatch" | "deathwatch-real" | "custom" | "shoot-them";
export type CustomFieldType = "text" | "number" | "textarea" | "list";
export type AbilityKey = "I can" | "Bang" | "Sounds" | "Mek" | "Fighting" | "Curios";
export type ZoneKey = "head" | "chest" | "leftArm" | "rightArm" | "leftLeg" | "rightLeg";
export type SkillKey =
  | "Acrobatics" | "Animal Handling" | "Arcana" | "Athletics" | "Deception" | "History"
  | "Insight" | "Intimidation" | "Investigation" | "Medicine" | "Nature" | "Perception"
  | "Performance" | "Persuasion" | "Religion" | "Sleight of Hand" | "Stealth" | "Survival";
export type SkillProficiency = "none" | "proficient" | "expertise";
export type CharacteristicKey = "WS" | "BS" | "S" | "T" | "Ag" | "Int" | "WP" | "Fel";
export type ArmourId = "tactical" | "terminator" | "gravis" | "phobos" | "jump-pack";
export type DwSkillKey =
  | "Acrobatics" | "Charm" | "Climb" | "Command" | "Corruption" | "Courage" | "Deceive" | "Demolition"
  | "Dodge" | "Evaluate" | "Inquiry" | "Interrogation" | "Intimidate" | "Literacy" | "Logic" | "Medicae"
  | "Shadowing" | "Sleight of Hand" | "Survival" | "Swim" | "Tech-Use" | "Tracking";
export type DwSkillLevel = "untrained" | "trained" | "plus10" | "plus20";

export type Attack = {
  id: string;
  name: string;
  bonus: string;
  damage: string;
  notes: string;
};

export type CustomField = {
  id: string;
  type: CustomFieldType;
  label: string;
  value: string;
};

export type Weapon = {
  id: string;
  name: string;
  damage: string;
  ammo: string;
  magazine: string;
  effect: string;
  sound: string;
  range: string;
};

export type ShootThemExtras = {
  stereotype: string;
  experience: string;
  morale: string;
  ammo: string;
  resources: string;
  stamina: string;
  stability: string;
  xp: string;
  permanentDamage: string;
  armor: string;
  bodyZones: Record<ZoneKey, string>;
  abilities: Record<AbilityKey, string>;
  mainStats: {
    physical: string;
    agility: string;
    psychic: string;
    creativity: string;
    commonKnowledge: string;
    weapon: string;
  };
  weapons: Weapon[];
};

export type CharacterSheet = {
  id: string;
  sheetType: SheetType;
  templateId: TemplateId;
  name: string;
  className: string;
  level: string;
  race: string;
  background: string;
  alignment: string;
  hp: string;
  health?: string;
  ac: string;
  speed: string;
  initiative: string;
  proficiency: string;
  stats: Record<StatKey, number>;
  skills: Partial<Record<SkillKey, SkillProficiency>>;
  characteristics?: Record<CharacteristicKey, number>;
  armour?: ArmourId;
  dwSkills?: Partial<Record<DwSkillKey, DwSkillLevel>>;
  traits: string[];
  attacks: Attack[];
  inventory: string[];
  notes: string;
  customFields: CustomField[];
  shootThem?: ShootThemExtras;
  dwReal?: DwRealData;
};

export const STORAGE_KEY = "rpg-character-sheets";
export const STAT_KEYS: StatKey[] = ["STR", "DEX", "CON", "INT", "WIS", "CHA"];
export const SKILLS: { key: SkillKey; stat: StatKey }[] = [
  { key: "Acrobatics", stat: "DEX" },
  { key: "Animal Handling", stat: "WIS" },
  { key: "Arcana", stat: "INT" },
  { key: "Athletics", stat: "STR" },
  { key: "Deception", stat: "CHA" },
  { key: "History", stat: "INT" },
  { key: "Insight", stat: "WIS" },
  { key: "Intimidation", stat: "CHA" },
  { key: "Investigation", stat: "INT" },
  { key: "Medicine", stat: "WIS" },
  { key: "Nature", stat: "INT" },
  { key: "Perception", stat: "WIS" },
  { key: "Performance", stat: "CHA" },
  { key: "Persuasion", stat: "CHA" },
  { key: "Religion", stat: "INT" },
  { key: "Sleight of Hand", stat: "DEX" },
  { key: "Stealth", stat: "DEX" },
  { key: "Survival", stat: "WIS" },
];
export const NEXT_PROFICIENCY: Record<SkillProficiency, SkillProficiency> = {
  none: "proficient",
  proficient: "expertise",
  expertise: "none",
};
export const PROFICIENCY_LABEL: Record<SkillProficiency, string> = {
  none: "Not proficient",
  proficient: "Proficient",
  expertise: "Expertise",
};
export const CHARACTERISTICS: { key: CharacteristicKey; label: string }[] = [
  { key: "WS", label: "Weapon Skill" },
  { key: "BS", label: "Ballistic Skill" },
  { key: "S", label: "Strength" },
  { key: "T", label: "Toughness" },
  { key: "Ag", label: "Agility" },
  { key: "Int", label: "Intelligence" },
  { key: "WP", label: "Willpower" },
  { key: "Fel", label: "Fellowship" },
];
export const DEFAULT_CHARACTERISTICS: Record<CharacteristicKey, number> = {
  WS: 42,
  BS: 40,
  S: 41,
  T: 43,
  Ag: 38,
  Int: 35,
  WP: 40,
  Fel: 32,
};
export const DW_SKILLS: { key: DwSkillKey; stat: CharacteristicKey }[] = [
  { key: "Acrobatics", stat: "Ag" },
  { key: "Charm", stat: "Fel" },
  { key: "Climb", stat: "S" },
  { key: "Command", stat: "Fel" },
  { key: "Corruption", stat: "WP" },
  { key: "Courage", stat: "T" },
  { key: "Deceive", stat: "Fel" },
  { key: "Demolition", stat: "Ag" },
  { key: "Dodge", stat: "Ag" },
  { key: "Evaluate", stat: "Int" },
  { key: "Inquiry", stat: "Fel" },
  { key: "Interrogation", stat: "WP" },
  { key: "Intimidate", stat: "S" },
  { key: "Literacy", stat: "Int" },
  { key: "Logic", stat: "Int" },
  { key: "Medicae", stat: "Int" },
  { key: "Shadowing", stat: "Ag" },
  { key: "Sleight of Hand", stat: "Ag" },
  { key: "Survival", stat: "Int" },
  { key: "Swim", stat: "S" },
  { key: "Tech-Use", stat: "Int" },
  { key: "Tracking", stat: "Int" },
];
export const NEXT_DW_SKILL_LEVEL: Record<DwSkillLevel, DwSkillLevel> = {
  untrained: "trained",
  trained: "plus10",
  plus10: "plus20",
  plus20: "untrained",
};
export const DW_SKILL_LABEL: Record<DwSkillLevel, string> = {
  untrained: "Untrained (half)",
  trained: "Trained",
  plus10: "Trained +10",
  plus20: "Trained +20",
};
export const DW_SKILL_DOT: Record<DwSkillLevel, string> = {
  untrained: "none",
  trained: "proficient",
  plus10: "expertise",
  plus20: "master",
};
export const DW_SPECIALISMS = ["Infiltrator", "Assault", "Gunner", "Sergeant"];
export const DW_MOODS = ["Gene mutation", "Corruption", "Rage", "Vigilant", "Suspicion", "Dead"];
export const ARMOURS: { id: ArmourId; label: string; as: number; m: number }[] = [
  { id: "tactical", label: "Tactical", as: 5, m: 25 },
  { id: "terminator", label: "Terminator", as: 7, m: 10 },
  { id: "gravis", label: "Gravis", as: 6, m: 15 },
  { id: "phobos", label: "Phobos / Reiver", as: 4, m: 35 },
  { id: "jump-pack", label: "Jump pack", as: 5, m: 30 },
];
export const SHEET_TYPES: { id: SheetType; label: string; description: string }[] = [
  { id: "dnd", label: "D&D Sheets", description: "Classic stats and combat sheet" },
  { id: "custom", label: "Custom Sheets", description: "Worldbuilding and story notes" },
];
export const TEMPLATE_LIBRARY: { id: TemplateId; label: string; description: string; sheetType: SheetType; tag: string; themeClass: string }[] = [
  { id: "dnd-5e", label: "D&D 5e", description: "Classic fantasy adventurer sheet", sheetType: "dnd", tag: "Fantasy", themeClass: "rpg-template-card--dnd" },
  { id: "cyberpunk-red", label: "Cyberpunk RED", description: "Street-level operative and gear tracker", sheetType: "custom", tag: "Sci-fi", themeClass: "rpg-template-card--cyberpunk" },
  { id: "deathwatch", label: "Deathwatch", description: "Adeptus Astartes field dossier", sheetType: "custom", tag: "Warhammer", themeClass: "rpg-template-card--deathwatch" },
  { id: "deathwatch-real", label: "Deathwatch Real", description: "The full FFG Deathwatch RPG Battle-Brother sheet", sheetType: "custom", tag: "Warhammer", themeClass: "rpg-template-card--deathwatch-real" },
  { id: "shoot-them", label: "Shoot Them", description: "Fast, gritty action sheet for hard choices and gunfire.", sheetType: "custom", tag: "Action", themeClass: "rpg-template-card--shoot" },
  { id: "custom", label: "Blank custom", description: "Build your own sheet from blocks", sheetType: "custom", tag: "Flexible", themeClass: "rpg-template-card--custom" },
];
export const CUSTOM_FIELD_OPTIONS: { type: CustomFieldType; label: string }[] = [
  { type: "text", label: "Text" },
  { type: "number", label: "Number" },
  { type: "textarea", label: "Long text" },
  { type: "list", label: "List" },
];
export const SHOOT_THEM_ABILITIES: AbilityKey[] = ["I can", "Bang", "Sounds", "Mek", "Fighting", "Curios"];
export const SHOOT_THEM_ZONES: ZoneKey[] = ["head", "chest", "leftArm", "rightArm", "leftLeg", "rightLeg"];
export const SHOOT_THEM_STAT_LABEL: Record<keyof ShootThemExtras["mainStats"], string> = {
  physical: "Physical",
  agility: "Agility",
  psychic: "Psychic",
  creativity: "Creativity",
  commonKnowledge: "Common knowledge",
  weapon: "Weapon",
};

const DEFAULT_STATS: Record<StatKey, number> = {
  STR: 14,
  DEX: 12,
  CON: 13,
  INT: 10,
  WIS: 15,
  CHA: 16,
};

const TEMPLATE_IDS = new Set<string>(TEMPLATE_LIBRARY.map((template) => template.id));
const CUSTOM_FIELD_TYPES = new Set<string>(CUSTOM_FIELD_OPTIONS.map((option) => option.type));

export function makeId() {
  return `${Date.now()}-${Math.random().toString(16).slice(2, 8)}`;
}

function field(type: CustomFieldType, label: string, value: string): CustomField {
  return { id: makeId(), type, label, value };
}

export function blankAttack(): Attack {
  return { id: makeId(), name: "New Attack", bonus: "+0", damage: "1d6", notes: "" };
}

export function blankCustomField(type: CustomFieldType): CustomField {
  return field(type, `${type.charAt(0).toUpperCase()}${type.slice(1)} block`, type === "list" ? "One\nTwo\nThree" : "");
}

export function blankShootThemWeapon(): Weapon {
  return { id: makeId(), name: "New Weapon", damage: "2", ammo: "6", magazine: "6", effect: "Simple", sound: "Loud", range: "Medium" };
}

export function createDefaultShootThem(): ShootThemExtras {
  return {
    stereotype: "Rookie",
    experience: "0",
    morale: "Steady",
    ammo: "12",
    resources: "Light",
    stamina: "10",
    stability: "10",
    xp: "0",
    permanentDamage: "0",
    armor: "0",
    bodyZones: { head: "0", chest: "0", leftArm: "0", rightArm: "0", leftLeg: "0", rightLeg: "0" },
    abilities: { "I can": "0", Bang: "0", Sounds: "0", Mek: "0", Fighting: "0", Curios: "0" },
    mainStats: { physical: "2", agility: "2", psychic: "0", creativity: "2", commonKnowledge: "1", weapon: "2" },
    weapons: [
      { id: makeId(), name: "Sidearm", damage: "2", ammo: "8", magazine: "8", effect: "Reliable", sound: "Loud", range: "Medium" },
    ],
  };
}

type TemplateDefaults = Pick<
  CharacterSheet,
  "name" | "className" | "level" | "race" | "background" | "alignment" | "hp" | "ac" | "speed" | "initiative" | "proficiency" | "traits" | "inventory" | "notes"
> & {
  attacks: () => Attack[];
  customFields: () => CustomField[];
  extras?: () => Partial<CharacterSheet>;
};

const GENERIC_CUSTOM_FIELDS = () => [
  field("text", "Title", "Main goal"),
  field("textarea", "Description", "Describe the character or scene here."),
  field("list", "Traits", "Quick\nDriven\nObservant"),
];

const TEMPLATE_DEFAULTS: Record<TemplateId, TemplateDefaults> = {
  "dnd-5e": {
    name: "New Hero", className: "Ranger", level: "3", race: "Human", background: "Explorer", alignment: "Neutral Good",
    hp: "23", ac: "15", speed: "30 ft.", initiative: "+2", proficiency: "+2",
    traits: ["Quick thinker", "Wary of ambushes", "Protects allies"],
    inventory: ["Longbow", "10 arrows", "Explorer's pack", "Potion of healing"],
    notes: "Tactical and observant. Keeps a calm head in danger.",
    attacks: () => [
      { id: makeId(), name: "Longbow", bonus: "+5", damage: "1d8 + 3", notes: "Ranged attack" },
      { id: makeId(), name: "Dagger", bonus: "+4", damage: "1d4 + 2", notes: "Versatile melee" },
    ],
    customFields: () => [],
    extras: () => ({ skills: { Nature: "proficient", Perception: "proficient", Survival: "proficient" } }),
  },
  "cyberpunk-red": {
    name: "New Operative", className: "Nomad", level: "1", race: "Street kid", background: "Fixer network", alignment: "Driven",
    hp: "14", ac: "11", speed: "Fast", initiative: "+3", proficiency: "+2",
    traits: ["Street-smart", "Hard to read", "Always has a plan"],
    inventory: ["Crowbar", "Smartlink", "Urban disguise", "Ammo pack"],
    notes: "A runner with grit, instinct, and too much history for comfort.",
    attacks: () => [{ id: makeId(), name: "Signature Weapon", bonus: "+0", damage: "Custom", notes: "Weapon profile" }],
    customFields: () => [
      field("text", "Handle", "Nexus"),
      field("text", "Role", "Solo / Netrunner / Fixer"),
      field("list", "Skills", "Streetwise\nHacking\nCombat\nNegotiation"),
      field("textarea", "Cyberware", "Neural connector, targeting optics, smartlink, skinweave plating."),
      field("textarea", "Notes", "Good at surviving bad nights and worse deals."),
    ],
  },
  deathwatch: {
    name: "New Deathwatch Marine", className: "Infiltrator", level: "3", race: "Adeptus Astartes", background: "Chapter doctrine", alignment: "Vigilant",
    hp: "100", ac: "16", speed: "10 ft.", initiative: "+2", proficiency: "+3",
    traits: ["Stoic", "Relentless", "Guardian of the Imperium"],
    inventory: ["Bolter", "Power armor seals", "Combat rations", "Sanctified relic"],
    notes: "A battle-brother sworn to purge the unclean and carry the Emperor's wrath.",
    attacks: () => [{ id: makeId(), name: "Signature Weapon", bonus: "+0", damage: "Custom", notes: "Weapon profile" }],
    customFields: () => [
      field("text", "Chapter", "Black Templar / Unknown"),
      field("list", "Oath", "Protect the innocent\nExterminate corruption\nNever falter"),
      field("textarea", "War gear", "Bolter, power sword, combat shield, purity seals."),
      field("textarea", "Mission log", "Track the next deployment and any enemies that must be purged."),
    ],
    extras: () => ({ characteristics: { ...DEFAULT_CHARACTERISTICS }, armour: "tactical", health: "20" }),
  },
  "deathwatch-real": {
    name: "New Battle-Brother", className: "", level: "", race: "Realm", background: "Backstory", alignment: "Driven",
    hp: "12", ac: "—", speed: "Flexible", initiative: "—", proficiency: "—",
    traits: ["Driven", "Observant", "Adaptable"],
    inventory: ["Notebook", "Tool kit", "Travel gear", "Important keepsake"],
    notes: "Mission briefings, objectives and kill-markers.",
    attacks: () => [{ id: makeId(), name: "Signature Move", bonus: "—", damage: "Scene-based", notes: "Custom action" }],
    customFields: () => [],
    extras: () => {
      const dwReal = createDefaultDwReal();
      return { dwReal, className: dwReal.speciality, level: dwReal.rank };
    },
  },
  "shoot-them": {
    name: "New shooter", className: "Stereotype", level: "1", race: "Scavenger", background: "Street survivor", alignment: "Hard-edged",
    hp: "10", ac: "0", speed: "Quick", initiative: "+1", proficiency: "+1",
    traits: ["Driven", "Observant", "Adaptable"],
    inventory: ["Backup mag", "Patch kit", "Mug of tea", "Pack of smokes"],
    notes: "The city is loud, the danger is real, and every bad decision adds up.",
    attacks: () => [{ id: makeId(), name: "Signature Move", bonus: "—", damage: "Scene-based", notes: "Custom action" }],
    customFields: () => [
      field("text", "Stereotype", "Rookie"),
      field("text", "Morale", "Steady"),
      field("list", "Abilities", "I can\nBang\nSounds\nMek\nFighting\nCurios"),
      field("textarea", "Notes", "Describe the current trouble or job."),
    ],
    extras: () => ({ shootThem: createDefaultShootThem() }),
  },
  custom: {
    name: "New Character", className: "Role", level: "1", race: "Realm", background: "Backstory", alignment: "Driven",
    hp: "12", ac: "—", speed: "Flexible", initiative: "—", proficiency: "—",
    traits: ["Driven", "Observant", "Adaptable"],
    inventory: ["Notebook", "Tool kit", "Travel gear", "Important keepsake"],
    notes: "A person with a sharp sense of purpose and a story worth telling.",
    attacks: () => [{ id: makeId(), name: "Signature Move", bonus: "—", damage: "Scene-based", notes: "Custom action" }],
    customFields: GENERIC_CUSTOM_FIELDS,
  },
};

export function templateFor(templateId: TemplateId) {
  return TEMPLATE_LIBRARY.find((template) => template.id === templateId) ?? TEMPLATE_LIBRARY[0];
}

export function createBlankSheet(templateId: TemplateId = "dnd-5e"): CharacterSheet {
  const { attacks, customFields, extras, ...defaults } = TEMPLATE_DEFAULTS[templateId];
  return {
    id: makeId(),
    sheetType: templateFor(templateId).sheetType,
    templateId,
    ...defaults,
    traits: [...defaults.traits],
    inventory: [...defaults.inventory],
    stats: { ...DEFAULT_STATS },
    skills: {},
    attacks: attacks(),
    customFields: customFields(),
    ...extras?.(),
  };
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function looksLikeSheet(value: unknown): value is Partial<CharacterSheet> {
  return isRecord(value) && (typeof value.templateId === "string" || typeof value.sheetType === "string");
}

/**
 * Fills in anything a stored or imported sheet is missing, so older saves and
 * hand-edited JSON files still render. Template-specific data is rebuilt from
 * the template defaults when absent.
 */
export function normalizeSheet(raw: Partial<CharacterSheet>): CharacterSheet {
  const templateId: TemplateId = raw.templateId && TEMPLATE_IDS.has(raw.templateId)
    ? raw.templateId
    : raw.sheetType === "dnd" ? "dnd-5e" : "custom";
  const base = createBlankSheet(templateId);
  const sheet: CharacterSheet = {
    ...base,
    ...raw,
    id: typeof raw.id === "string" && raw.id ? raw.id : base.id,
    templateId,
    sheetType: templateFor(templateId).sheetType,
    stats: { ...base.stats, ...(isRecord(raw.stats) ? raw.stats : {}) },
    skills: isRecord(raw.skills) ? raw.skills : base.skills,
    traits: Array.isArray(raw.traits) ? raw.traits.map(String) : base.traits,
    inventory: Array.isArray(raw.inventory) ? raw.inventory.map(String) : base.inventory,
    attacks: Array.isArray(raw.attacks) ? raw.attacks.map((attack) => ({ ...blankAttack(), ...attack })) : base.attacks,
    customFields: Array.isArray(raw.customFields)
      ? raw.customFields.map((item: Partial<CustomField>) => ({
          id: item.id ?? makeId(),
          type: item.type && CUSTOM_FIELD_TYPES.has(item.type) ? item.type : "text",
          label: item.label ?? "Field",
          value: item.value ?? "",
        }))
      : base.customFields,
  };

  if (templateId === "deathwatch") {
    sheet.characteristics = { ...DEFAULT_CHARACTERISTICS, ...raw.characteristics };
  }
  if (templateId === "shoot-them") {
    const defaults = createDefaultShootThem();
    const stored: Partial<ShootThemExtras> = raw.shootThem ?? {};
    sheet.shootThem = {
      ...defaults,
      ...stored,
      bodyZones: { ...defaults.bodyZones, ...stored.bodyZones },
      abilities: { ...defaults.abilities, ...stored.abilities },
      mainStats: { ...defaults.mainStats, ...stored.mainStats },
      weapons: Array.isArray(stored.weapons) ? stored.weapons : defaults.weapons,
    };
  }
  if (templateId === "deathwatch-real") {
    sheet.dwReal = normalizeDwReal(raw.dwReal);
  }
  return sheet;
}

export function loadStoredSheets(storage: Pick<Storage, "getItem"> = localStorage): CharacterSheet[] {
  try {
    const raw = storage.getItem(STORAGE_KEY);
    const parsed: unknown = raw ? JSON.parse(raw) : [];
    const sheets = Array.isArray(parsed) ? parsed.filter(looksLikeSheet).map(normalizeSheet) : [];
    return sheets.length ? sheets : [createBlankSheet()];
  } catch {
    return [createBlankSheet()];
  }
}

export const BACKUP_FORMAT = "oh-hub/rpg-sheets";
export const BACKUP_VERSION = 1;

export type SheetBackup = {
  format: typeof BACKUP_FORMAT;
  version: number;
  exportedAt: string;
  sheets: CharacterSheet[];
};

export function createBackup(sheets: CharacterSheet[], now = new Date()): SheetBackup {
  return { format: BACKUP_FORMAT, version: BACKUP_VERSION, exportedAt: now.toISOString(), sheets };
}

/**
 * Reads any JSON this page has ever exported: a full backup, a bare array of
 * sheets, or a single sheet (the original "Export JSON" format).
 */
export function parseImport(text: string): CharacterSheet[] {
  const parsed: unknown = JSON.parse(text);
  const candidates: unknown[] = isRecord(parsed) && parsed.format === BACKUP_FORMAT && Array.isArray(parsed.sheets)
    ? parsed.sheets
    : Array.isArray(parsed)
      ? parsed
      : [parsed];
  const sheets = candidates.filter(looksLikeSheet).map(normalizeSheet);
  if (sheets.length === 0) {
    throw new Error("No character sheets found in this file.");
  }
  return sheets;
}

/** Imported sheets replace saved sheets with the same id, and new ones go on top. */
export function mergeImported(current: CharacterSheet[], imported: CharacterSheet[]): CharacterSheet[] {
  const byId = new Map(imported.map((sheet) => [sheet.id, sheet]));
  const replaced = current.map((sheet) => byId.get(sheet.id) ?? sheet);
  const existingIds = new Set(current.map((sheet) => sheet.id));
  const added = [...byId.values()].filter((sheet) => !existingIds.has(sheet.id));
  return [...added, ...replaced];
}

export function fileSlug(name: string) {
  return name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "") || "sheet";
}

export function modifierFor(score: number) {
  return Math.floor((score - 10) / 2);
}

export function formatModifier(value: number) {
  return value >= 0 ? `+${value}` : `${value}`;
}

export function skillModifier(sheet: CharacterSheet, skill: { key: SkillKey; stat: StatKey }) {
  const proficiencyBonus = Number.parseInt(sheet.proficiency, 10) || 0;
  const level = sheet.skills?.[skill.key] ?? "none";
  const multiplier = level === "expertise" ? 2 : level === "proficient" ? 1 : 0;
  return modifierFor(sheet.stats[skill.stat]) + proficiencyBonus * multiplier;
}

export function dwSkillTarget(characteristic: number, level: DwSkillLevel) {
  if (level === "untrained") return Math.floor(characteristic / 2);
  return characteristic + (level === "plus20" ? 20 : level === "plus10" ? 10 : 0);
}
