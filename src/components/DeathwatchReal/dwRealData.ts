export type DwRealCharKey = "WS" | "BS" | "S" | "T" | "Ag" | "Int" | "Per" | "WP" | "Fel";
export type DwRealSkillLevel = "untrained" | "trained" | "plus10" | "plus20";
export type DwRealLocation = "head" | "rightArm" | "leftArm" | "body" | "rightLeg" | "leftLeg";

export type DwRealWeapon = {
  id: string;
  name: string;
  weaponClass: string;
  range: string;
  rof: string;
  damage: string;
  pen: string;
  clip: string;
  reload: string;
  special: string;
};

export type DwRealData = {
  player: string;
  chapter: string;
  speciality: string;
  rank: string;
  demeanourChapter: string;
  demeanourPersonal: string;
  powerArmourHistory: string;
  description: string;
  characteristics: Record<DwRealCharKey, number>;
  unnatural: Record<DwRealCharKey, number>;
  woundsTotal: string;
  woundsCurrent: string;
  fatigue: string;
  criticalDamage: string;
  fateTotal: string;
  fateCurrent: string;
  renown: string;
  xpTotal: string;
  xpSpent: string;
  insanity: string;
  corruption: string;
  armourName: string;
  armour: Record<DwRealLocation, number>;
  skills: Record<string, DwRealSkillLevel>;
  weapons: DwRealWeapon[];
  talents: string;
  traits: string;
  chapterAbilities: string;
  specialityAbilities: string;
  soloModes: string;
  squadModes: string;
  psyRating: string;
  psychicPowers: string;
  gear: string;
};

export const CHARACTERISTICS: { key: DwRealCharKey; label: string }[] = [
  { key: "WS", label: "Weapon Skill" },
  { key: "BS", label: "Ballistic Skill" },
  { key: "S", label: "Strength" },
  { key: "T", label: "Toughness" },
  { key: "Ag", label: "Agility" },
  { key: "Int", label: "Intelligence" },
  { key: "Per", label: "Perception" },
  { key: "WP", label: "Willpower" },
  { key: "Fel", label: "Fellowship" },
];

export const SPECIALITIES = ["Apothecary", "Assault Marine", "Devastator Marine", "Librarian", "Tactical Marine", "Techmarine"];
export const CHAPTERS = ["Black Templars", "Blood Angels", "Dark Angels", "Space Wolves", "Storm Wardens", "Ultramarines"];

export const LOCATIONS: { key: DwRealLocation; label: string; roll: string }[] = [
  { key: "head", label: "Head", roll: "01–10" },
  { key: "rightArm", label: "Right arm", roll: "11–20" },
  { key: "leftArm", label: "Left arm", roll: "21–30" },
  { key: "body", label: "Body", roll: "31–70" },
  { key: "rightLeg", label: "Right leg", roll: "71–85" },
  { key: "leftLeg", label: "Left leg", roll: "86–00" },
];

export const SKILLS: { name: string; stat: DwRealCharKey; advanced: boolean }[] = [
  { name: "Acrobatics", stat: "Ag", advanced: true },
  { name: "Awareness", stat: "Per", advanced: false },
  { name: "Barter", stat: "Fel", advanced: false },
  { name: "Blather", stat: "Fel", advanced: true },
  { name: "Carouse", stat: "T", advanced: false },
  { name: "Charm", stat: "Fel", advanced: false },
  { name: "Chem-Use", stat: "Int", advanced: true },
  { name: "Ciphers", stat: "Int", advanced: true },
  { name: "Climb", stat: "S", advanced: false },
  { name: "Command", stat: "Fel", advanced: true },
  { name: "Common Lore", stat: "Int", advanced: true },
  { name: "Concealment", stat: "Ag", advanced: false },
  { name: "Contortionist", stat: "Ag", advanced: false },
  { name: "Deceive", stat: "Fel", advanced: false },
  { name: "Demolition", stat: "Int", advanced: true },
  { name: "Disguise", stat: "Fel", advanced: false },
  { name: "Dodge", stat: "Ag", advanced: false },
  { name: "Drive", stat: "Ag", advanced: true },
  { name: "Evaluate", stat: "Int", advanced: false },
  { name: "Forbidden Lore", stat: "Int", advanced: true },
  { name: "Gamble", stat: "Int", advanced: false },
  { name: "Inquiry", stat: "Fel", advanced: false },
  { name: "Interrogation", stat: "WP", advanced: true },
  { name: "Intimidate", stat: "S", advanced: false },
  { name: "Invocation", stat: "WP", advanced: true },
  { name: "Lip Reading", stat: "Per", advanced: true },
  { name: "Literacy", stat: "Int", advanced: true },
  { name: "Logic", stat: "Int", advanced: false },
  { name: "Medicae", stat: "Int", advanced: true },
  { name: "Navigation", stat: "Int", advanced: true },
  { name: "Performer", stat: "Fel", advanced: true },
  { name: "Pilot", stat: "Ag", advanced: true },
  { name: "Psyniscience", stat: "Per", advanced: true },
  { name: "Scholastic Lore", stat: "Int", advanced: true },
  { name: "Scrutiny", stat: "Per", advanced: false },
  { name: "Search", stat: "Per", advanced: false },
  { name: "Secret Tongue", stat: "Int", advanced: true },
  { name: "Security", stat: "Ag", advanced: true },
  { name: "Shadowing", stat: "Ag", advanced: true },
  { name: "Silent Move", stat: "Ag", advanced: false },
  { name: "Sleight of Hand", stat: "Ag", advanced: true },
  { name: "Speak Language", stat: "Int", advanced: true },
  { name: "Survival", stat: "Int", advanced: true },
  { name: "Swim", stat: "S", advanced: false },
  { name: "Tactics", stat: "Int", advanced: true },
  { name: "Tech-Use", stat: "Int", advanced: true },
  { name: "Tracking", stat: "Int", advanced: true },
  { name: "Trade", stat: "Int", advanced: true },
  { name: "Wrangling", stat: "Int", advanced: true },
];

const STARTING_SKILLS = [
  "Awareness", "Climb", "Common Lore", "Concealment", "Dodge", "Forbidden Lore", "Intimidate", "Literacy",
  "Navigation", "Scholastic Lore", "Silent Move", "Speak Language", "Survival", "Tactics", "Tracking",
];

export const NEXT_LEVEL: Record<DwRealSkillLevel, DwRealSkillLevel> = {
  untrained: "trained",
  trained: "plus10",
  plus10: "plus20",
  plus20: "untrained",
};
export const LEVEL_LABEL: Record<DwRealSkillLevel, string> = {
  untrained: "Untrained",
  trained: "Trained",
  plus10: "Trained +10",
  plus20: "Trained +20",
};
export const LEVEL_DOT: Record<DwRealSkillLevel, string> = {
  untrained: "none",
  trained: "proficient",
  plus10: "expertise",
  plus20: "master",
};

function makeId() {
  return `${Date.now()}-${Math.random().toString(16).slice(2, 8)}`;
}

export function blankWeapon(): DwRealWeapon {
  return { id: makeId(), name: "New weapon", weaponClass: "", range: "", rof: "", damage: "", pen: "", clip: "", reload: "", special: "" };
}

export function createDefaultDwReal(): DwRealData {
  return {
    player: "",
    chapter: "Ultramarines",
    speciality: "Tactical Marine",
    rank: "1",
    demeanourChapter: "",
    demeanourPersonal: "",
    powerArmourHistory: "",
    description: "",
    characteristics: { WS: 42, BS: 42, S: 40, T: 41, Ag: 38, Int: 36, Per: 38, WP: 40, Fel: 34 },
    unnatural: { WS: 1, BS: 1, S: 2, T: 2, Ag: 1, Int: 1, Per: 1, WP: 1, Fel: 1 },
    woundsTotal: "20",
    woundsCurrent: "20",
    fatigue: "0",
    criticalDamage: "",
    fateTotal: "3",
    fateCurrent: "3",
    renown: "0",
    xpTotal: "13000",
    xpSpent: "12000",
    insanity: "0",
    corruption: "0",
    armourName: "Astartes Mark VII Aquila Power Armour",
    armour: { head: 8, rightArm: 8, leftArm: 8, body: 10, rightLeg: 8, leftLeg: 8 },
    skills: Object.fromEntries(STARTING_SKILLS.map((name) => [name, "trained" as DwRealSkillLevel])),
    weapons: [
      { id: makeId(), name: "Astartes Bolter", weaponClass: "Basic", range: "100m", rof: "S/3/–", damage: "1d10+9 X", pen: "4", clip: "28", reload: "Full", special: "Tearing" },
      { id: makeId(), name: "Astartes Bolt Pistol", weaponClass: "Pistol", range: "30m", rof: "S/2/–", damage: "1d10+9 X", pen: "4", clip: "14", reload: "Full", special: "Tearing" },
      { id: makeId(), name: "Astartes Combat Knife", weaponClass: "Melee", range: "—", rof: "—", damage: "1d10+2 R", pen: "2", clip: "—", reload: "—", special: "" },
    ],
    talents: "",
    traits: "Unnatural Strength (x2)\nUnnatural Toughness (x2)",
    chapterAbilities: "",
    specialityAbilities: "",
    soloModes: "",
    squadModes: "",
    psyRating: "",
    psychicPowers: "",
    gear: "Frag grenades\nKrak grenades\nAuspex",
  };
}

export function normalizeDwReal(data: Partial<DwRealData> | undefined): DwRealData {
  const defaults = createDefaultDwReal();
  if (!data) return defaults;
  return {
    ...defaults,
    ...data,
    characteristics: { ...defaults.characteristics, ...data.characteristics },
    unnatural: { ...defaults.unnatural, ...data.unnatural },
    armour: { ...defaults.armour, ...data.armour },
    skills: data.skills ?? defaults.skills,
    weapons: data.weapons ?? defaults.weapons,
  };
}

export function bonusOf(data: DwRealData, key: DwRealCharKey) {
  return Math.floor(data.characteristics[key] / 10) * (data.unnatural[key] || 1);
}

export function skillTarget(data: DwRealData, skill: (typeof SKILLS)[number]) {
  const level = data.skills[skill.name] ?? "untrained";
  const value = data.characteristics[skill.stat];
  if (level === "untrained") return skill.advanced ? "—" : String(Math.floor(value / 2));
  return String(value + (level === "plus20" ? 20 : level === "plus10" ? 10 : 0));
}
