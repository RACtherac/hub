import { makeId, toInt } from "../../utils/makeId";

/** Wrath & Glory (Cubicle 7, Revised edition): d6 dice pools of attribute + skill. */

export type WgAttribute = "S" | "T" | "A" | "I" | "Wil" | "Int" | "Fel";

export type WgWeapon = {
  id: string;
  name: string;
  damage: string;
  ed: string;
  ap: string;
  range: string;
  salvo: string;
  traits: string;
};

export type WgData = {
  player: string;
  species: string;
  archetype: string;
  faction: string;
  keywords: string;
  background: string;
  tier: string;
  rank: string;
  xpTotal: string;
  xpSpent: string;
  attributes: Record<WgAttribute, number>;
  skills: Record<string, number>;
  speed: string;
  armourName: string;
  armourRating: string;
  woundsTaken: string;
  shockTaken: string;
  wrath: string;
  glory: string;
  faith: string;
  corruption: string;
  weapons: WgWeapon[];
  talents: string;
  abilities: string;
  psychicPowers: string;
  wargear: string;
  injuries: string;
  objectives: string;
};

export const ATTRIBUTES: { key: WgAttribute; label: string }[] = [
  { key: "S", label: "Strength" },
  { key: "T", label: "Toughness" },
  { key: "A", label: "Agility" },
  { key: "I", label: "Initiative" },
  { key: "Wil", label: "Willpower" },
  { key: "Int", label: "Intellect" },
  { key: "Fel", label: "Fellowship" },
];

export const SKILLS: { name: string; attribute: WgAttribute }[] = [
  { name: "Athletics", attribute: "S" },
  { name: "Awareness", attribute: "Int" },
  { name: "Ballistic Skill", attribute: "A" },
  { name: "Cunning", attribute: "Fel" },
  { name: "Deception", attribute: "Fel" },
  { name: "Insight", attribute: "Fel" },
  { name: "Intimidation", attribute: "Wil" },
  { name: "Investigation", attribute: "Int" },
  { name: "Leadership", attribute: "Wil" },
  { name: "Medicae", attribute: "Int" },
  { name: "Persuasion", attribute: "Fel" },
  { name: "Pilot", attribute: "A" },
  { name: "Psychic Mastery", attribute: "Wil" },
  { name: "Scholar", attribute: "Int" },
  { name: "Stealth", attribute: "A" },
  { name: "Survival", attribute: "Wil" },
  { name: "Tech", attribute: "Int" },
  { name: "Weapon Skill", attribute: "I" },
];

export const SPECIES = ["Human", "Adeptus Astartes", "Primaris Astartes", "Aeldari", "Ork", "Squat", "Ratling", "Ogryn"];
export const TIERS = ["1", "2", "3", "4", "5"];
export const SKILL_MAX = 8;
export const ATTRIBUTE_MAX = 12;

export function blankWeapon(): WgWeapon {
  return { id: makeId(), name: "New weapon", damage: "", ed: "", ap: "", range: "", salvo: "", traits: "" };
}

export function createDefaultWrathGlory(): WgData {
  return {
    player: "",
    species: "Human",
    archetype: "Imperial Guardsman",
    faction: "Astra Militarum",
    keywords: "Imperium, Astra Militarum, <Regiment>",
    background: "",
    tier: "1",
    rank: "1",
    xpTotal: "0",
    xpSpent: "0",
    attributes: { S: 2, T: 3, A: 3, I: 2, Wil: 2, Int: 2, Fel: 1 },
    skills: { "Ballistic Skill": 2, Athletics: 1, Awareness: 1, Survival: 1, "Weapon Skill": 1 },
    speed: "6",
    armourName: "Flak armour",
    armourRating: "3",
    woundsTaken: "0",
    shockTaken: "0",
    wrath: "2",
    glory: "0",
    faith: "0",
    corruption: "0",
    weapons: [
      { id: makeId(), name: "Lasgun", damage: "7", ed: "1", ap: "0", range: "12/24/36", salvo: "2", traits: "Rapid Fire (1), Reliable" },
      { id: makeId(), name: "Knife", damage: "2", ed: "1", ap: "0", range: "Melee", salvo: "—", traits: "Melee" },
    ],
    talents: "",
    abilities: "",
    psychicPowers: "",
    wargear: "Rucksack\nRations (3 days)\nSlate monitron",
    injuries: "",
    objectives: "",
  };
}

export function normalizeWrathGlory(data: Partial<WgData> | undefined): WgData {
  const defaults = createDefaultWrathGlory();
  if (!data) return defaults;
  return {
    ...defaults,
    ...data,
    attributes: { ...defaults.attributes, ...data.attributes },
    skills: data.skills ?? defaults.skills,
    weapons: Array.isArray(data.weapons) ? data.weapons : defaults.weapons,
  };
}

export function skillPool(data: WgData, skill: (typeof SKILLS)[number]) {
  return data.attributes[skill.attribute] + (data.skills[skill.name] ?? 0);
}

/** The derived traits on the Revised character sheet, worked out from attributes, Tier and armour. */
export function derivedTraits(data: WgData) {
  const { T, I, Wil, Fel } = data.attributes;
  const tier = toInt(data.tier, 1);
  const awareness = skillPool(data, { name: "Awareness", attribute: "Int" });
  return {
    defence: Math.max(0, I - 1),
    resilience: T + 1 + toInt(data.armourRating),
    maxWounds: tier * 2 + T,
    maxShock: Wil + tier,
    resolve: Math.max(0, Wil - 1),
    conviction: Wil,
    determination: T,
    passiveAwareness: Math.ceil(awareness / 2),
    influence: Math.max(0, Fel - 1),
    wealth: tier,
  };
}
