import { makeId, toInt } from "../../utils/makeId";

/** Drakar och Demoner / Dragonbane (Free League, 2023): d20 roll-under, attributes 3–18. */

export type DbAttribute = "STR" | "CON" | "AGL" | "INT" | "WIL" | "CHA";
export type DbSkillGroup = "general" | "weapon" | "secondary";

export type DbSkillState = {
  trained: boolean;
  /** Set once the player types their own level; blank means "use the base chance". */
  level?: number;
  mark: boolean;
};

export type DbWeapon = {
  id: string;
  name: string;
  grip: string;
  range: string;
  damage: string;
  durability: string;
  features: string;
};

export type DbData = {
  player: string;
  kin: string;
  age: string;
  profession: string;
  weakness: string;
  appearance: string;
  attributes: Record<DbAttribute, number>;
  conditions: Record<DbAttribute, boolean>;
  skills: Record<string, DbSkillState>;
  hpCurrent: string;
  wpCurrent: string;
  deathSuccesses: number;
  deathFailures: number;
  armourName: string;
  armourRating: string;
  helmetName: string;
  helmetRating: string;
  weapons: DbWeapon[];
  abilities: string;
  inventory: string;
  memento: string;
  tinyItems: string;
  gold: string;
  silver: string;
  copper: string;
};

export const ATTRIBUTES: { key: DbAttribute; label: string; condition: string }[] = [
  { key: "STR", label: "Strength", condition: "Exhausted" },
  { key: "CON", label: "Constitution", condition: "Sickly" },
  { key: "AGL", label: "Agility", condition: "Dazed" },
  { key: "INT", label: "Intelligence", condition: "Angry" },
  { key: "WIL", label: "Willpower", condition: "Scared" },
  { key: "CHA", label: "Charisma", condition: "Disheartened" },
];

export const SKILLS: { name: string; attribute: DbAttribute; group: DbSkillGroup }[] = [
  { name: "Acrobatics", attribute: "AGL", group: "general" },
  { name: "Awareness", attribute: "INT", group: "general" },
  { name: "Bartering", attribute: "CHA", group: "general" },
  { name: "Beast Lore", attribute: "INT", group: "general" },
  { name: "Bluffing", attribute: "CHA", group: "general" },
  { name: "Bushcraft", attribute: "INT", group: "general" },
  { name: "Crafting", attribute: "STR", group: "general" },
  { name: "Evade", attribute: "AGL", group: "general" },
  { name: "Healing", attribute: "INT", group: "general" },
  { name: "Hunting & Fishing", attribute: "AGL", group: "general" },
  { name: "Languages", attribute: "INT", group: "general" },
  { name: "Myths & Legends", attribute: "INT", group: "general" },
  { name: "Performance", attribute: "CHA", group: "general" },
  { name: "Persuasion", attribute: "CHA", group: "general" },
  { name: "Riding", attribute: "AGL", group: "general" },
  { name: "Seamanship", attribute: "INT", group: "general" },
  { name: "Sleight of Hand", attribute: "AGL", group: "general" },
  { name: "Sneaking", attribute: "AGL", group: "general" },
  { name: "Spot Hidden", attribute: "INT", group: "general" },
  { name: "Swimming", attribute: "AGL", group: "general" },
  { name: "Axes", attribute: "STR", group: "weapon" },
  { name: "Bows", attribute: "AGL", group: "weapon" },
  { name: "Brawling", attribute: "STR", group: "weapon" },
  { name: "Crossbows", attribute: "AGL", group: "weapon" },
  { name: "Hammers", attribute: "STR", group: "weapon" },
  { name: "Knives", attribute: "AGL", group: "weapon" },
  { name: "Slings", attribute: "AGL", group: "weapon" },
  { name: "Spears", attribute: "STR", group: "weapon" },
  { name: "Staves", attribute: "AGL", group: "weapon" },
  { name: "Swords", attribute: "STR", group: "weapon" },
  { name: "Animism", attribute: "INT", group: "secondary" },
  { name: "Elementalism", attribute: "INT", group: "secondary" },
  { name: "Mentalism", attribute: "INT", group: "secondary" },
];

export const SKILL_GROUPS: { id: DbSkillGroup; label: string }[] = [
  { id: "general", label: "skills" },
  { id: "weapon", label: "weapon skills" },
  { id: "secondary", label: "secondary skills (magic)" },
];

export const KIN: { name: string; movement: number }[] = [
  { name: "Human", movement: 10 },
  { name: "Halfling", movement: 8 },
  { name: "Dwarf", movement: 8 },
  { name: "Elf", movement: 10 },
  { name: "Mallard", movement: 8 },
  { name: "Wolfkin", movement: 12 },
];
export const AGES = ["Young", "Adult", "Old"];

/** Skill level before training: 1–5 → 3, 6–8 → 4, 9–12 → 5, 13–15 → 6, 16–18 → 7. */
export function baseChance(attribute: number) {
  if (attribute <= 5) return 3;
  if (attribute <= 8) return 4;
  if (attribute <= 12) return 5;
  if (attribute <= 15) return 6;
  return 7;
}

/** Trained skills start at double the base chance. Secondary skills can only be used when trained. */
export function skillLevel(data: DbData, skill: (typeof SKILLS)[number]) {
  const state = data.skills[skill.name];
  if (state?.level !== undefined) return state.level;
  const base = baseChance(data.attributes[skill.attribute]);
  if (state?.trained) return base * 2;
  return skill.group === "secondary" ? 0 : base;
}

/** STR or AGL of 13–16 adds D4 damage, 17+ adds D6. */
export function damageBonus(attribute: number) {
  if (attribute >= 17) return "+D6";
  if (attribute >= 13) return "+D4";
  return "—";
}

/** Kin base movement adjusted by AGL: 1–6 −4, 7–9 −2, 10–12 ±0, 13–15 +2, 16–18 +4. */
export function movement(data: DbData) {
  const kin = KIN.find((item) => item.name === data.kin)?.movement ?? 10;
  const agl = data.attributes.AGL;
  const modifier = agl <= 6 ? -4 : agl <= 9 ? -2 : agl <= 12 ? 0 : agl <= 15 ? 2 : 4;
  return kin + modifier;
}

export function derivedStats(data: DbData) {
  return {
    maxHp: data.attributes.CON,
    maxWp: data.attributes.WIL,
    movement: movement(data),
    strDamage: damageBonus(data.attributes.STR),
    aglDamage: damageBonus(data.attributes.AGL),
    carryLimit: Math.ceil(data.attributes.STR / 2),
  };
}

export function blankWeapon(): DbWeapon {
  return { id: makeId(), name: "New weapon", grip: "1H", range: "", damage: "", durability: "", features: "" };
}

export function createDefaultDragonbane(): DbData {
  const trained = ["Awareness", "Bushcraft", "Evade", "Hunting & Fishing", "Sneaking", "Spot Hidden", "Bows", "Knives"];
  return {
    player: "",
    kin: "Human",
    age: "Adult",
    profession: "Hunter",
    weakness: "",
    appearance: "",
    attributes: { STR: 12, CON: 13, AGL: 15, INT: 11, WIL: 10, CHA: 9 },
    conditions: { STR: false, CON: false, AGL: false, INT: false, WIL: false, CHA: false },
    skills: Object.fromEntries(trained.map((name) => [name, { trained: true, mark: false }])),
    hpCurrent: "13",
    wpCurrent: "10",
    deathSuccesses: 0,
    deathFailures: 0,
    armourName: "Leather",
    armourRating: "1",
    helmetName: "",
    helmetRating: "",
    weapons: [
      { id: makeId(), name: "Short bow", grip: "2H", range: "30", damage: "D10", durability: "6", features: "" },
      { id: makeId(), name: "Knife", grip: "1H", range: "STR", damage: "D8", durability: "6", features: "Subtle, piercing" },
    ],
    abilities: "Adaptive (kin ability)\nCompanion (heroic ability)",
    inventory: "Torch\nRope, hemp\nField rations (3)\nArrows (12)",
    memento: "",
    tinyItems: "",
    gold: "0",
    silver: "5",
    copper: "0",
  };
}

export function normalizeDragonbane(data: Partial<DbData> | undefined): DbData {
  const defaults = createDefaultDragonbane();
  if (!data) return defaults;
  return {
    ...defaults,
    ...data,
    attributes: { ...defaults.attributes, ...data.attributes },
    conditions: { ...defaults.conditions, ...data.conditions },
    skills: data.skills ?? defaults.skills,
    deathSuccesses: toInt(data.deathSuccesses),
    deathFailures: toInt(data.deathFailures),
    weapons: Array.isArray(data.weapons) ? data.weapons : defaults.weapons,
  };
}
