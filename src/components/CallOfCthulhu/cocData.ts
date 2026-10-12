import { makeId, toInt } from "../../utils/makeId";

/** Call of Cthulhu 7th edition (Chaosium): percentile skills with regular / hard (½) / extreme (⅕) success. */

export type CocCharacteristic = "STR" | "CON" | "SIZ" | "DEX" | "APP" | "INT" | "POW" | "EDU";
export type CocStatus = "temporaryInsanity" | "indefiniteInsanity" | "majorWound" | "unconscious" | "dying";

export type CocWeapon = {
  id: string;
  name: string;
  skill: string;
  damage: string;
  range: string;
  attacks: string;
  ammo: string;
  malfunction: string;
};

export type CocCustomSkill = { id: string; name: string; value: string };

export type CocData = {
  player: string;
  occupation: string;
  age: string;
  pronouns: string;
  residence: string;
  birthplace: string;
  characteristics: Record<CocCharacteristic, number>;
  luck: string;
  hpCurrent: string;
  mpCurrent: string;
  sanityCurrent: string;
  status: Record<CocStatus, boolean>;
  /** Only skills the player has changed are stored; the rest use their base chance. */
  skills: Record<string, number>;
  improvements: Record<string, boolean>;
  customSkills: CocCustomSkill[];
  weapons: CocWeapon[];
  spendingLevel: string;
  cash: string;
  assets: string;
  description: string;
  ideology: string;
  significantPeople: string;
  meaningfulLocations: string;
  treasuredPossessions: string;
  traits: string;
  injuries: string;
  phobias: string;
  tomes: string;
  encounters: string;
  gear: string;
};

export const CHARACTERISTICS: { key: CocCharacteristic; label: string }[] = [
  { key: "STR", label: "Strength" },
  { key: "CON", label: "Constitution" },
  { key: "SIZ", label: "Size" },
  { key: "DEX", label: "Dexterity" },
  { key: "APP", label: "Appearance" },
  { key: "INT", label: "Intelligence" },
  { key: "POW", label: "Power" },
  { key: "EDU", label: "Education" },
];

export const STATUSES: { key: CocStatus; label: string }[] = [
  { key: "temporaryInsanity", label: "Temporary insanity" },
  { key: "indefiniteInsanity", label: "Indefinite insanity" },
  { key: "majorWound", label: "Major wound" },
  { key: "unconscious", label: "Unconscious" },
  { key: "dying", label: "Dying" },
];

/** Base chances from the investigator sheet. Dodge and Language (Own) come from characteristics. */
export const SKILLS: { name: string; base: number | "DEX/2" | "EDU" }[] = [
  { name: "Accounting", base: 5 },
  { name: "Anthropology", base: 1 },
  { name: "Appraise", base: 5 },
  { name: "Archaeology", base: 1 },
  { name: "Art/Craft", base: 5 },
  { name: "Charm", base: 15 },
  { name: "Climb", base: 20 },
  { name: "Credit Rating", base: 0 },
  { name: "Cthulhu Mythos", base: 0 },
  { name: "Disguise", base: 5 },
  { name: "Dodge", base: "DEX/2" },
  { name: "Drive Auto", base: 20 },
  { name: "Elec. Repair", base: 10 },
  { name: "Fast Talk", base: 5 },
  { name: "Fighting (Brawl)", base: 25 },
  { name: "Firearms (Handgun)", base: 20 },
  { name: "Firearms (Rifle/Shotgun)", base: 25 },
  { name: "First Aid", base: 30 },
  { name: "History", base: 5 },
  { name: "Intimidate", base: 15 },
  { name: "Jump", base: 20 },
  { name: "Language (Other)", base: 1 },
  { name: "Language (Own)", base: "EDU" },
  { name: "Law", base: 5 },
  { name: "Library Use", base: 20 },
  { name: "Listen", base: 20 },
  { name: "Locksmith", base: 1 },
  { name: "Mech. Repair", base: 10 },
  { name: "Medicine", base: 1 },
  { name: "Natural World", base: 10 },
  { name: "Navigate", base: 10 },
  { name: "Occult", base: 5 },
  { name: "Op. Hv. Machine", base: 1 },
  { name: "Persuade", base: 10 },
  { name: "Pilot", base: 1 },
  { name: "Psychoanalysis", base: 1 },
  { name: "Psychology", base: 10 },
  { name: "Ride", base: 5 },
  { name: "Science", base: 1 },
  { name: "Sleight of Hand", base: 10 },
  { name: "Spot Hidden", base: 25 },
  { name: "Stealth", base: 20 },
  { name: "Survival", base: 10 },
  { name: "Swim", base: 20 },
  { name: "Throw", base: 20 },
  { name: "Track", base: 10 },
];

export function baseValue(data: CocData, skill: (typeof SKILLS)[number]) {
  if (skill.base === "DEX/2") return Math.floor(data.characteristics.DEX / 2);
  if (skill.base === "EDU") return data.characteristics.EDU;
  return skill.base;
}

export function skillValue(data: CocData, skill: (typeof SKILLS)[number]) {
  return data.skills[skill.name] ?? baseValue(data, skill);
}

/** Regular / hard / extreme success targets for a percentile value. */
export function thresholds(value: number) {
  return { full: value, half: Math.floor(value / 2), fifth: Math.floor(value / 5) };
}

/**
 * Damage bonus and Build from STR + SIZ. Above 284, each further 80 points
 * adds another 1D6 and +1 Build.
 */
export function damageBonusAndBuild(str: number, siz: number) {
  const total = str + siz;
  if (total <= 64) return { damageBonus: "−2", build: -2 };
  if (total <= 84) return { damageBonus: "−1", build: -1 };
  if (total <= 124) return { damageBonus: "None", build: 0 };
  if (total <= 164) return { damageBonus: "+1D4", build: 1 };
  if (total <= 204) return { damageBonus: "+1D6", build: 2 };
  const extra = Math.floor((total - 205) / 80);
  return { damageBonus: `+${extra + 2}D6`, build: extra + 3 };
}

/**
 * Move rate: 7 if DEX and STR are both below SIZ, 9 if both are above it, 8 otherwise.
 * Investigators lose 1 per decade from their 40s (−5 at 80+).
 */
export function moveRate(data: CocData) {
  const { STR, DEX, SIZ } = data.characteristics;
  const base = STR < SIZ && DEX < SIZ ? 7 : STR > SIZ && DEX > SIZ ? 9 : 8;
  const age = toInt(data.age);
  const agePenalty = age >= 40 ? Math.min(5, Math.floor(age / 10) - 3) : 0;
  return Math.max(1, base - agePenalty);
}

export function derivedStats(data: CocData) {
  const { CON, SIZ, POW, STR } = data.characteristics;
  const mythos = data.skills["Cthulhu Mythos"] ?? 0;
  return {
    maxHp: Math.floor((CON + SIZ) / 10),
    maxMp: Math.floor(POW / 5),
    startingSanity: POW,
    maxSanity: 99 - mythos,
    move: moveRate(data),
    ...damageBonusAndBuild(STR, SIZ),
  };
}

export function blankWeapon(): CocWeapon {
  return { id: makeId(), name: "New weapon", skill: "", damage: "", range: "", attacks: "1", ammo: "", malfunction: "" };
}

export function blankCustomSkill(): CocCustomSkill {
  return { id: makeId(), name: "Science (…)", value: "1" };
}

export function createDefaultCoc(): CocData {
  return {
    player: "",
    occupation: "Antiquarian",
    age: "34",
    pronouns: "",
    residence: "Arkham, Massachusetts",
    birthplace: "",
    characteristics: { STR: 45, CON: 55, SIZ: 60, DEX: 50, APP: 55, INT: 75, POW: 60, EDU: 80 },
    luck: "50",
    hpCurrent: "11",
    mpCurrent: "12",
    sanityCurrent: "60",
    status: { temporaryInsanity: false, indefiniteInsanity: false, majorWound: false, unconscious: false, dying: false },
    skills: { Appraise: 50, History: 60, "Library Use": 60, "Spot Hidden": 45, "Language (Other)": 40, Occult: 25, "Credit Rating": 40 },
    improvements: {},
    customSkills: [],
    weapons: [
      { id: makeId(), name: "Unarmed", skill: "Fighting (Brawl)", damage: "1D3 + DB", range: "—", attacks: "1", ammo: "—", malfunction: "—" },
      { id: makeId(), name: ".32 revolver", skill: "Firearms (Handgun)", damage: "1D8", range: "15 yd", attacks: "1 (3)", ammo: "6", malfunction: "100" },
    ],
    spendingLevel: "",
    cash: "",
    assets: "",
    description: "",
    ideology: "",
    significantPeople: "",
    meaningfulLocations: "",
    treasuredPossessions: "",
    traits: "",
    injuries: "",
    phobias: "",
    tomes: "",
    encounters: "",
    gear: "Notebook and pencil\nMagnifying glass\nFlashlight",
  };
}

export function normalizeCoc(data: Partial<CocData> | undefined): CocData {
  const defaults = createDefaultCoc();
  if (!data) return defaults;
  return {
    ...defaults,
    ...data,
    characteristics: { ...defaults.characteristics, ...data.characteristics },
    status: { ...defaults.status, ...data.status },
    skills: data.skills ?? defaults.skills,
    improvements: data.improvements ?? {},
    customSkills: Array.isArray(data.customSkills) ? data.customSkills : [],
    weapons: Array.isArray(data.weapons) ? data.weapons : defaults.weapons,
  };
}
