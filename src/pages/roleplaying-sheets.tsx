import { useEffect, useMemo, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../components/styles/roleplaying-sheets.css";

type StatKey = "STR" | "DEX" | "CON" | "INT" | "WIS" | "CHA";
type SheetType = "dnd" | "custom";
type TemplateId = "dnd-5e" | "cyberpunk-red" | "deathwatch" | "custom" | "shoot-them";
type CustomFieldType = "text" | "number" | "textarea" | "list";
type AbilityKey = "I can" | "Bang" | "Sounds" | "Mek" | "Fighting" | "Curios";
type ZoneKey = "head" | "chest" | "leftArm" | "rightArm" | "leftLeg" | "rightLeg";
type SkillKey =
  | "Acrobatics" | "Animal Handling" | "Arcana" | "Athletics" | "Deception" | "History"
  | "Insight" | "Intimidation" | "Investigation" | "Medicine" | "Nature" | "Perception"
  | "Performance" | "Persuasion" | "Religion" | "Sleight of Hand" | "Stealth" | "Survival";
type SkillProficiency = "none" | "proficient" | "expertise";
type CharacteristicKey = "WS" | "BS" | "S" | "T" | "Ag" | "Int" | "WP" | "Fel";
type ArmourId = "tactical" | "terminator" | "gravis" | "phobos" | "jump-pack";

type Attack = {
  id: string;
  name: string;
  bonus: string;
  damage: string;
  notes: string;
};

type CustomField = {
  id: string;
  type: CustomFieldType;
  label: string;
  value: string;
};

type Weapon = {
  id: string;
  name: string;
  damage: string;
  ammo: string;
  magazine: string;
  effect: string;
  sound: string;
  range: string;
};

type ShootThemExtras = {
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

type CharacterSheet = {
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
  ac: string;
  speed: string;
  initiative: string;
  proficiency: string;
  stats: Record<StatKey, number>;
  skills: Partial<Record<SkillKey, SkillProficiency>>;
  characteristics?: Record<CharacteristicKey, number>;
  armour?: ArmourId;
  traits: string[];
  attacks: Attack[];
  inventory: string[];
  notes: string;
  customFields: CustomField[];
  shootThem?: ShootThemExtras;
};

const STORAGE_KEY = "rpg-character-sheets";
const STAT_KEYS: StatKey[] = ["STR", "DEX", "CON", "INT", "WIS", "CHA"];
const SKILLS: { key: SkillKey; stat: StatKey }[] = [
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
const NEXT_PROFICIENCY: Record<SkillProficiency, SkillProficiency> = {
  none: "proficient",
  proficient: "expertise",
  expertise: "none",
};
const CHARACTERISTICS: { key: CharacteristicKey; label: string }[] = [
  { key: "WS", label: "Weapon Skill" },
  { key: "BS", label: "Ballistic Skill" },
  { key: "S", label: "Strength" },
  { key: "T", label: "Toughness" },
  { key: "Ag", label: "Agility" },
  { key: "Int", label: "Intelligence" },
  { key: "WP", label: "Willpower" },
  { key: "Fel", label: "Fellowship" },
];
const DEFAULT_CHARACTERISTICS: Record<CharacteristicKey, number> = {
  WS: 42,
  BS: 40,
  S: 41,
  T: 43,
  Ag: 38,
  Int: 35,
  WP: 40,
  Fel: 32,
};
const ARMOURS: { id: ArmourId; label: string; as: number; m: number }[] = [
  { id: "tactical", label: "Tactical", as: 5, m: 25 },
  { id: "terminator", label: "Terminator", as: 7, m: 10 },
  { id: "gravis", label: "Gravis", as: 6, m: 15 },
  { id: "phobos", label: "Phobos / Reiver", as: 4, m: 35 },
  { id: "jump-pack", label: "Jump pack", as: 5, m: 30 },
];
const SHEET_TYPES: { id: SheetType; label: string; description: string }[] = [
  { id: "dnd", label: "D&D Sheets", description: "Classic stats and combat sheet" },
  { id: "custom", label: "Custom Sheets", description: "Worldbuilding and story notes" },
];
const TEMPLATE_LIBRARY: { id: TemplateId; label: string; description: string; sheetType: SheetType; tag: string; themeClass: string }[] = [
  { id: "dnd-5e", label: "D&D 5e", description: "Classic fantasy adventurer sheet", sheetType: "dnd", tag: "Fantasy", themeClass: "rpg-template-card--dnd" },
  { id: "cyberpunk-red", label: "Cyberpunk RED", description: "Street-level operative and gear tracker", sheetType: "custom", tag: "Sci-fi", themeClass: "rpg-template-card--cyberpunk" },
  { id: "deathwatch", label: "Deathwatch", description: "Adeptus Astartes field dossier", sheetType: "custom", tag: "Warhammer", themeClass: "rpg-template-card--deathwatch" },
  { id: "shoot-them", label: "Shoot Them", description: "Fast, gritty action sheet for hard choices and gunfire.", sheetType: "custom", tag: "Action", themeClass: "rpg-template-card--shoot" },
  { id: "custom", label: "Blank custom", description: "Build your own sheet from blocks", sheetType: "custom", tag: "Flexible", themeClass: "rpg-template-card--custom" },
];
const CUSTOM_FIELD_OPTIONS: { type: CustomFieldType; label: string }[] = [
  { type: "text", label: "Text" },
  { type: "number", label: "Number" },
  { type: "textarea", label: "Long text" },
  { type: "list", label: "List" },
];

const defaultStats: Record<StatKey, number> = {
  STR: 14,
  DEX: 12,
  CON: 13,
  INT: 10,
  WIS: 15,
  CHA: 16,
};

function makeId() {
  return `${Date.now()}-${Math.random().toString(16).slice(2, 8)}`;
}

function buildDefaultCustomFields(): CustomField[] {
  return [
    { id: makeId(), type: "text", label: "Title", value: "Main goal" },
    { id: makeId(), type: "textarea", label: "Description", value: "Describe the character or scene here." },
    { id: makeId(), type: "list", label: "Traits", value: "Quick\nDriven\nObservant" },
  ];
}

const SHOOT_THEM_ABILITIES: AbilityKey[] = ["I can", "Bang", "Sounds", "Mek", "Fighting", "Curios"];
const SHOOT_THEM_ZONES: ZoneKey[] = ["head", "chest", "leftArm", "rightArm", "leftLeg", "rightLeg"];

function createDefaultShootThem(): ShootThemExtras {
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
    bodyZones: {
      head: "0",
      chest: "0",
      leftArm: "0",
      rightArm: "0",
      leftLeg: "0",
      rightLeg: "0",
    },
    abilities: {
      "I can": "I can handle the pressure when things go wrong.",
      Bang: "I can shoot fast and keep moving.",
      Sounds: "I can read a room by the noise around it.",
      Mek: "I can repair the little things before they fail.",
      Fighting: "I can hold my own in a close scramble.",
      Curios: "I can follow the strange clue no one else notices.",
    },
    mainStats: {
      physical: "2",
      agility: "2",
      psychic: "0",
      creativity: "2",
      commonKnowledge: "1",
      weapon: "2",
    },
    weapons: [
      {
        id: makeId(),
        name: "Sidearm",
        damage: "2",
        ammo: "8",
        magazine: "8",
        effect: "Reliable",
        sound: "Loud",
        range: "Medium",
      },
    ],
  };
}

function createBlankSheet(type: SheetType = "dnd", templateId: TemplateId = type === "dnd" ? "dnd-5e" : "custom"): CharacterSheet {
  const isDndTemplate = templateId === "dnd-5e";
  const isCyberpunk = templateId === "cyberpunk-red";
  const isDeathwatch = templateId === "deathwatch";

  const base: CharacterSheet = {
    id: makeId(),
    sheetType: type,
    templateId,
    name: isDndTemplate ? "New Hero" : isCyberpunk ? "New Operative" : isDeathwatch ? "New Deathwatch Marine" : templateId === "shoot-them" ? "New shooter" : "New Character",
    className: isDndTemplate ? "Ranger" : isCyberpunk ? "Nomad" : isDeathwatch ? "Deathwatch Marine" : templateId === "shoot-them" ? "Stereotype" : "Role",
    level: isDndTemplate ? "3" : isCyberpunk ? "1" : isDeathwatch ? "3" : templateId === "shoot-them" ? "1" : "1",
    race: isDndTemplate ? "Human" : isCyberpunk ? "Street kid" : isDeathwatch ? "Adeptus Astartes" : templateId === "shoot-them" ? "Scavenger" : "Realm",
    background: isDndTemplate ? "Explorer" : isCyberpunk ? "Fixer network" : isDeathwatch ? "Chapter doctrine" : templateId === "shoot-them" ? "Street survivor" : "Backstory",
    alignment: isDndTemplate ? "Neutral Good" : isCyberpunk ? "Driven" : isDeathwatch ? "Vigilant" : templateId === "shoot-them" ? "Hard-edged" : "Driven",
    hp: isDndTemplate ? "23" : isCyberpunk ? "14" : isDeathwatch ? "32" : templateId === "shoot-them" ? "10" : "12",
    ac: isDndTemplate ? "15" : isCyberpunk ? "11" : isDeathwatch ? "16" : templateId === "shoot-them" ? "0" : "—",
    speed: isDndTemplate ? "30 ft." : isCyberpunk ? "Fast" : isDeathwatch ? "10 ft." : templateId === "shoot-them" ? "Quick" : "Flexible",
    initiative: isDndTemplate ? "+2" : isCyberpunk ? "+3" : isDeathwatch ? "+2" : templateId === "shoot-them" ? "+1" : "—",
    proficiency: isDndTemplate ? "+2" : isCyberpunk ? "+2" : isDeathwatch ? "+3" : templateId === "shoot-them" ? "+1" : "—",
    stats: { ...defaultStats },
    skills: isDndTemplate ? { Nature: "proficient", Perception: "proficient", Survival: "proficient" } : {},
    characteristics: isDeathwatch ? { ...DEFAULT_CHARACTERISTICS } : undefined,
    armour: isDeathwatch ? "tactical" : undefined,
    traits: isDndTemplate
      ? ["Quick thinker", "Wary of ambushes", "Protects allies"]
      : isCyberpunk
        ? ["Street-smart", "Hard to read", "Always has a plan"]
        : isDeathwatch
          ? ["Stoic", "Relentless", "Guardian of the Imperium"]
          : ["Driven", "Observant", "Adaptable"],
    attacks: isDndTemplate
      ? [
          { id: makeId(), name: "Longbow", bonus: "+5", damage: "1d8 + 3", notes: "Ranged attack" },
          { id: makeId(), name: "Dagger", bonus: "+4", damage: "1d4 + 2", notes: "Versatile melee" },
        ]
      : isCyberpunk || isDeathwatch
        ? [
            { id: makeId(), name: "Signature Weapon", bonus: "+0", damage: "Custom", notes: "Weapon profile" },
          ]
        : [
            { id: makeId(), name: "Signature Move", bonus: "—", damage: "Scene-based", notes: "Custom action" },
          ],
    inventory: isDndTemplate
      ? ["Longbow", "10 arrows", "Explorer's pack", "Potion of healing"]
      : isCyberpunk
        ? ["Crowbar", "Smartlink", "Urban disguise", "Ammo pack"]
        : isDeathwatch
          ? ["Bolter", "Power armor seals", "Combat rations", "Sanctified relic"]
          : templateId === "shoot-them"
            ? ["Backup mag", "Patch kit", "Mug of tea", "Pack of smokes"]
            : ["Notebook", "Tool kit", "Travel gear", "Important keepsake"],
    notes: isDndTemplate
      ? "Tactical and observant. Keeps a calm head in danger."
      : isCyberpunk
        ? "A runner with grit, instinct, and too much history for comfort."
        : isDeathwatch
          ? "A battle-brother sworn to purge the unclean and carry the Emperor's wrath."
          : templateId === "shoot-them"
            ? "The city is loud, the danger is real, and every bad decision adds up."
            : "A person with a sharp sense of purpose and a story worth telling.",
    customFields: isDndTemplate ? [] : buildDefaultCustomFields(),
    shootThem: templateId === "shoot-them" ? createDefaultShootThem() : undefined,
  };

  if (templateId === "cyberpunk-red") {
    base.customFields = [
      { id: makeId(), type: "text", label: "Handle", value: "Nexus" },
      { id: makeId(), type: "text", label: "Role", value: "Solo / Netrunner / Fixer" },
      { id: makeId(), type: "list", label: "Skills", value: "Streetwise\nHacking\nCombat\nNegotiation" },
      { id: makeId(), type: "textarea", label: "Cyberware", value: "Neural connector, targeting optics, smartlink, skinweave plating." },
      { id: makeId(), type: "textarea", label: "Notes", value: "Good at surviving bad nights and worse deals." },
    ];
  }

  if (templateId === "deathwatch") {
    base.customFields = [
      { id: makeId(), type: "text", label: "Chapter", value: "Black Templar / Unknown" },
      { id: makeId(), type: "text", label: "Specialism", value: "Vanguard / Assault / Fire Support" },
      { id: makeId(), type: "list", label: "Oath", value: "Protect the innocent\nExterminate corruption\nNever falter" },
      { id: makeId(), type: "textarea", label: "War gear", value: "Bolter, power sword, combat shield, purity seals." },
      { id: makeId(), type: "textarea", label: "Mission log", value: "Track the next deployment and any enemies that must be purged." },
    ];
  }

  if (templateId === "shoot-them") {
    base.customFields = [
      { id: makeId(), type: "text", label: "Stereotype", value: "Rookie" },
      { id: makeId(), type: "text", label: "Morale", value: "Steady" },
      { id: makeId(), type: "list", label: "Abilities", value: "I can\nBang\nSounds\nMek\nFighting\nCurios" },
      { id: makeId(), type: "textarea", label: "Notes", value: "Describe the current trouble or job." },
    ];
    base.shootThem = createDefaultShootThem();
  }

  return base;
}

function parseStoredSheets(): CharacterSheet[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [createBlankSheet("dnd")];
    const parsed = JSON.parse(raw) as CharacterSheet[];
    return parsed.length
      ? parsed.map((sheet) => ({
          ...createBlankSheet(sheet.sheetType ?? "dnd"),
          ...sheet,
          sheetType: sheet.sheetType ?? "dnd",
          customFields: Array.isArray(sheet.customFields) && sheet.customFields.length > 0
            ? sheet.customFields.map((field: CustomField) => ({
                id: field.id ?? makeId(),
                type: field.type ?? "text",
                label: field.label ?? "Field",
                value: field.value ?? "",
              }))
            : createBlankSheet(sheet.sheetType ?? "dnd").customFields,
        }))
      : [createBlankSheet("dnd")];
  } catch {
    return [createBlankSheet("dnd")];
  }
}

function modifierFor(score: number) {
  return Math.floor((score - 10) / 2);
}

function formatModifier(value: number) {
  return value >= 0 ? `+${value}` : `${value}`;
}

function skillModifier(sheet: CharacterSheet, skill: { key: SkillKey; stat: StatKey }) {
  const proficiencyBonus = Number.parseInt(sheet.proficiency, 10) || 0;
  const level = sheet.skills?.[skill.key] ?? "none";
  const multiplier = level === "expertise" ? 2 : level === "proficient" ? 1 : 0;
  return modifierFor(sheet.stats[skill.stat]) + proficiencyBonus * multiplier;
}

export default function RoleplayingSheets() {
  const navigate = useNavigate();
  const [sheets, setSheets] = useState<CharacterSheet[]>(() => parseStoredSheets());
  const [sheetMode, setSheetMode] = useState<SheetType>("dnd");
  const [templateScreen, setTemplateScreen] = useState(true);
  const [selectedId, setSelectedId] = useState<string>(() => {
    const initial = parseStoredSheets();
    return initial[0]?.id ?? "";
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(sheets));
  }, [sheets]);

  const visibleSheets = useMemo(
    () => sheets.filter((sheet) => sheet.sheetType === sheetMode),
    [sheets, sheetMode],
  );

  useEffect(() => {
    if (visibleSheets.length === 0) {
      const newSheet = createBlankSheet(sheetMode);
      setSheets((current) => [...current, newSheet]);
      setSelectedId(newSheet.id);
      return;
    }

    if (!visibleSheets.some((sheet) => sheet.id === selectedId)) {
      setSelectedId(visibleSheets[0].id);
    }
  }, [visibleSheets, selectedId, sheetMode]);

  const selectedSheet = useMemo(
    () => visibleSheets.find((sheet) => sheet.id === selectedId) ?? visibleSheets[0] ?? null,
    [selectedId, visibleSheets],
  );

  const updateSelected = (updates: Partial<CharacterSheet>) => {
    if (!selectedSheet) return;
    setSheets((current) =>
      current.map((sheet) =>
        sheet.id === selectedSheet.id ? { ...sheet, ...updates } : sheet,
      ),
    );
  };

  const updateShootThemField = <K extends keyof ShootThemExtras>(field: K, value: ShootThemExtras[K]) => {
    if (!selectedSheet) return;
    setSheets((current) =>
      current.map((sheet) => {
        if (sheet.id !== selectedSheet.id) return sheet;
        const nextShootThem = sheet.shootThem ?? createDefaultShootThem();
        return {
          ...sheet,
          shootThem: {
            ...nextShootThem,
            [field]: value,
          },
        };
      }),
    );
  };

  const updateShootThemBodyZone = (zone: ZoneKey, value: string) => {
    if (!selectedSheet) return;
    setSheets((current) =>
      current.map((sheet) => {
        if (sheet.id !== selectedSheet.id) return sheet;
        const nextShootThem = sheet.shootThem ?? createDefaultShootThem();
        return {
          ...sheet,
          shootThem: {
            ...nextShootThem,
            bodyZones: { ...nextShootThem.bodyZones, [zone]: value },
          },
        };
      }),
    );
  };

  const updateShootThemAbility = (ability: AbilityKey, value: string) => {
    if (!selectedSheet) return;
    setSheets((current) =>
      current.map((sheet) => {
        if (sheet.id !== selectedSheet.id) return sheet;
        const nextShootThem = sheet.shootThem ?? createDefaultShootThem();
        return {
          ...sheet,
          shootThem: {
            ...nextShootThem,
            abilities: { ...nextShootThem.abilities, [ability]: value },
          },
        };
      }),
    );
  };

  const updateShootThemMainStat = (stat: keyof ShootThemExtras["mainStats"], value: string) => {
    if (!selectedSheet) return;
    setSheets((current) =>
      current.map((sheet) => {
        if (sheet.id !== selectedSheet.id) return sheet;
        const nextShootThem = sheet.shootThem ?? createDefaultShootThem();
        return {
          ...sheet,
          shootThem: {
            ...nextShootThem,
            mainStats: {
              ...nextShootThem.mainStats,
              [stat]: value,
            },
          },
        };
      }),
    );
  };

  const addShootThemWeapon = () => {
    if (!selectedSheet) return;
    const newWeapon: Weapon = {
      id: makeId(),
      name: "New Weapon",
      damage: "2",
      ammo: "6",
      magazine: "6",
      effect: "Simple",
      sound: "Loud",
      range: "Medium",
    };

    setSheets((current) =>
      current.map((sheet) => {
        if (sheet.id !== selectedSheet.id) return sheet;
        const nextShootThem = sheet.shootThem ?? createDefaultShootThem();
        return {
          ...sheet,
          shootThem: {
            ...nextShootThem,
            weapons: [...nextShootThem.weapons, newWeapon],
          },
        };
      }),
    );
  };

  const updateShootThemWeapon = (weaponId: string, field: keyof Weapon, value: string) => {
    if (!selectedSheet) return;
    setSheets((current) =>
      current.map((sheet) => {
        if (sheet.id !== selectedSheet.id) return sheet;
        const nextShootThem = sheet.shootThem ?? createDefaultShootThem();
        return {
          ...sheet,
          shootThem: {
            ...nextShootThem,
            weapons: nextShootThem.weapons.map((weapon) =>
              weapon.id === weaponId ? { ...weapon, [field]: value } : weapon,
            ),
          },
        };
      }),
    );
  };

  const removeShootThemWeapon = (weaponId: string) => {
    if (!selectedSheet) return;
    setSheets((current) =>
      current.map((sheet) => {
        if (sheet.id !== selectedSheet.id) return sheet;
        const nextShootThem = sheet.shootThem ?? createDefaultShootThem();
        return {
          ...sheet,
          shootThem: {
            ...nextShootThem,
            weapons: nextShootThem.weapons.filter((weapon) => weapon.id !== weaponId),
          },
        };
      }),
    );
  };

  const cycleSkill = (skill: SkillKey) => {
    if (!selectedSheet) return;
    setSheets((current) =>
      current.map((sheet) => {
        if (sheet.id !== selectedSheet.id) return sheet;
        const level = sheet.skills?.[skill] ?? "none";
        return { ...sheet, skills: { ...sheet.skills, [skill]: NEXT_PROFICIENCY[level] } };
      }),
    );
  };

  const updateCharacteristic = (key: CharacteristicKey, value: number) => {
    if (!selectedSheet) return;
    setSheets((current) =>
      current.map((sheet) =>
        sheet.id === selectedSheet.id
          ? { ...sheet, characteristics: { ...(sheet.characteristics ?? DEFAULT_CHARACTERISTICS), [key]: value } }
          : sheet,
      ),
    );
  };

  const updateStat = (stat: StatKey, value: number) => {
    if (!selectedSheet) return;
    setSheets((current) =>
      current.map((sheet) =>
        sheet.id === selectedSheet.id
          ? { ...sheet, stats: { ...sheet.stats, [stat]: value } }
          : sheet,
      ),
    );
  };

  const updateList = (key: "traits" | "inventory", value: string) => {
    const items = value
      .split("\n")
      .map((line) => line.trim())
      .filter(Boolean);
    updateSelected({ [key]: items } as Partial<CharacterSheet>);
  };

  const addAttack = () => {
    if (!selectedSheet) return;
    setSheets((current) =>
      current.map((sheet) =>
        sheet.id === selectedSheet.id
          ? {
              ...sheet,
              attacks: [
                ...sheet.attacks,
                { id: makeId(), name: "New Attack", bonus: "+0", damage: "1d6", notes: "" },
              ],
            }
          : sheet,
      ),
    );
  };

  const addCustomField = (type: CustomFieldType) => {
    if (!selectedSheet) return;
    const label = `${type.charAt(0).toUpperCase()}${type.slice(1)} block`;
    const newField: CustomField = {
      id: makeId(),
      type,
      label,
      value: type === "list" ? "One\nTwo\nThree" : "",
    };

    setSheets((current) =>
      current.map((sheet) =>
        sheet.id === selectedSheet.id
          ? { ...sheet, customFields: [...sheet.customFields, newField] }
          : sheet,
      ),
    );
  };

  const updateCustomField = (id: string, field: "label" | "value", value: string) => {
    if (!selectedSheet) return;
    setSheets((current) =>
      current.map((sheet) =>
        sheet.id === selectedSheet.id
          ? {
              ...sheet,
              customFields: sheet.customFields.map((item) =>
                item.id === id ? { ...item, [field]: value } : item,
              ),
            }
          : sheet,
      ),
    );
  };

  const removeCustomField = (id: string) => {
    if (!selectedSheet) return;
    setSheets((current) =>
      current.map((sheet) =>
        sheet.id === selectedSheet.id
          ? { ...sheet, customFields: sheet.customFields.filter((item) => item.id !== id) }
          : sheet,
      ),
    );
  };

  const updateAttack = (id: string, field: keyof Attack, value: string) => {
    if (!selectedSheet) return;
    setSheets((current) =>
      current.map((sheet) =>
        sheet.id === selectedSheet.id
          ? {
              ...sheet,
              attacks: sheet.attacks.map((attack) =>
                attack.id === id ? { ...attack, [field]: value } : attack,
              ),
            }
          : sheet,
      ),
    );
  };

  const removeAttack = (id: string) => {
    if (!selectedSheet) return;
    setSheets((current) =>
      current.map((sheet) =>
        sheet.id === selectedSheet.id
          ? { ...sheet, attacks: sheet.attacks.filter((attack) => attack.id !== id) }
          : sheet,
      ),
    );
  };

  const createNewSheet = (type: SheetType = sheetMode, templateId: TemplateId = type === "dnd" ? "dnd-5e" : "custom") => {
    const newSheet = createBlankSheet(type, templateId);
    setSheets((current) => [newSheet, ...current]);
    setSelectedId(newSheet.id);
    setSheetMode(type);
    setTemplateScreen(false);
  };

  const openSheet = (sheetId: string) => {
    const match = sheets.find((sheet) => sheet.id === sheetId);
    if (!match) return;
    setSelectedId(match.id);
    setSheetMode(match.sheetType);
    setTemplateScreen(false);
  };

  const deleteSheet = (sheetId: string) => {
    setSheets((current) => {
      const remaining = current.filter((sheet) => sheet.id !== sheetId);
      if (remaining.length === 0) {
        const fresh = createBlankSheet(sheetMode);
        setSelectedId(fresh.id);
        setTemplateScreen(false);
        return [fresh];
      }

      const nextSelected = remaining.find((sheet) => sheet.id === selectedId) ?? remaining[0];
      if (nextSelected) {
        setSelectedId(nextSelected.id);
      }
      return remaining;
    });
  };

  const handleTemplatePick = (templateId: TemplateId) => {
    const template = TEMPLATE_LIBRARY.find((item) => item.id === templateId) ?? TEMPLATE_LIBRARY[0];
    createNewSheet(template.sheetType, template.id);
  };

  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handleExportJson = () => {
    const payload = JSON.stringify(selectedSheet, null, 2);
    const blob = new Blob([payload], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const anchor = document.createElement("a");
    anchor.href = url;
    anchor.download = `${(selectedSheet.name || "sheet").toLowerCase().replace(/\s+/g, "-")}.json`;
    document.body.appendChild(anchor);
    anchor.click();
    anchor.remove();
    URL.revokeObjectURL(url);
  };

  const handleImportJson = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    try {
      const text = await file.text();
      const importedSheet = JSON.parse(text) as CharacterSheet;
      const normalizedSheet = {
        ...createBlankSheet(importedSheet.sheetType ?? "custom"),
        ...importedSheet,
        id: importedSheet.id ?? makeId(),
        sheetType: importedSheet.sheetType ?? "custom",
        customFields: Array.isArray(importedSheet.customFields) ? importedSheet.customFields : [],
      };

      setSheets((current) => {
        const existingIndex = current.findIndex((sheet) => sheet.id === normalizedSheet.id);
        if (existingIndex >= 0) {
          const updated = [...current];
          updated[existingIndex] = normalizedSheet;
          return updated;
        }
        return [normalizedSheet, ...current];
      });
      setSelectedId(normalizedSheet.id);
      setSheetMode(normalizedSheet.sheetType);
    } catch {
      alert("That file was not a valid RPG sheet JSON export.");
    } finally {
      event.target.value = "";
    }
  };

  const handleExportPdf = () => {
    window.print();
  };

  if (templateScreen) {
    return (
      <div className="rpg-page">
        <div className="rpg-topbar">
          <button className="rpg-topbar-back" onClick={() => navigate("/")}>
            ← OH<span>/</span>Hub
          </button>
          <span className="rpg-topbar-title">Roleplaying Sheets</span>
        </div>

        <header className="rpg-hero">
          <div>
            <p className="rpg-eyebrow">// campaign menu</p>
            <h1 className="rpg-title">Choose a sheet</h1>
          </div>
        </header>

        <main className="rpg-template-wrap">
          <section className="rpg-menu-section">
            <p className="rpg-panel-label">// saved sheets</p>
            <div className="rpg-menu-list">
              {sheets.map((sheet) => (
                <div key={sheet.id} className="rpg-menu-item">
                  <div className="rpg-menu-copy">
                    <strong>{sheet.name || "Unnamed Character"}</strong>
                    <span>
                      {sheet.className || "No role"} · {sheet.sheetType === "dnd" ? "D&D" : "Custom"}
                    </span>
                  </div>
                  <div className="rpg-menu-actions">
                    <button className="rpg-inline-btn" onClick={() => openSheet(sheet.id)}>
                      Open
                    </button>
                    <button className="rpg-remove-btn" onClick={() => deleteSheet(sheet.id)}>
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </section>

          <section className="rpg-template-section">
            <p className="rpg-panel-label">// new character</p>
            <div className="rpg-template-grid">
              {TEMPLATE_LIBRARY.map((template) => (
                <button
                  key={template.id}
                  className={`rpg-template-card ${template.themeClass}`}
                  onClick={() => handleTemplatePick(template.id)}
                >
                  <span className="rpg-template-tag">{template.tag}</span>
                  <h2>{template.label}</h2>
                  <p>{template.description}</p>
                </button>
              ))}
            </div>
          </section>
        </main>
      </div>
    );
  }

  if (!selectedSheet) {
    return null;
  }

  const isDndSheet = selectedSheet.sheetType === "dnd";
  const isShootThem = selectedSheet.templateId === "shoot-them";
  const shootThem = selectedSheet.shootThem ?? createDefaultShootThem();
  const isDeathwatch = selectedSheet.templateId === "deathwatch";
  const characteristics = selectedSheet.characteristics ?? DEFAULT_CHARACTERISTICS;
  const armour = ARMOURS.find((option) => option.id === selectedSheet.armour) ?? ARMOURS[0];

  const customFieldsPanel = (
    <div className="rpg-core-box">
      <p className="rpg-panel-label">// custom fields</p>
      <div className="rpg-custom-display">
        {selectedSheet.customFields.map((field) => (
          <div key={field.id} className="rpg-custom-item">
            <span className="rpg-custom-label">{field.label || "Field"}</span>
            {field.type === "list" ? (
              <ul>
                {field.value.split("\n").filter(Boolean).map((line, index) => (
                  <li key={`${field.id}-${index}`}>{line}</li>
                ))}
              </ul>
            ) : (
              <p>{field.value || "Empty field"}</p>
            )}
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <div className="rpg-page">
      <div className="rpg-topbar">
        <button className="rpg-topbar-back" onClick={() => navigate("/")}>
          ← OH<span>/</span>Hub
        </button>
        <span className="rpg-topbar-title">Roleplaying Sheets</span>
      </div>

      <header className="rpg-hero">
        <div>
          <p className="rpg-eyebrow">// campaign tracker</p>
          <h1 className="rpg-title">Character Sheets</h1>
        </div>
        <div className="rpg-header-actions">
          <div className="rpg-mode-switch" role="tablist" aria-label="Sheet types">
            {SHEET_TYPES.map((type) => (
              <button
                key={type.id}
                className={`rpg-mode-button ${sheetMode === type.id ? "rpg-mode-button--active" : ""}`}
                onClick={() => setSheetMode(type.id)}
              >
                {type.label}
              </button>
            ))}
          </div>
          <button className="rpg-export-btn" onClick={() => setTemplateScreen(true)}>Main menu</button>
          <button className="rpg-export-btn" onClick={handleExportJson}>Export JSON</button>
          <button className="rpg-export-btn" onClick={handleExportPdf}>Export PDF</button>
          <button className="rpg-export-btn" onClick={() => fileInputRef.current?.click()}>Import JSON</button>
          <input
            ref={fileInputRef}
            type="file"
            accept=".json,application/json"
            hidden
            onChange={handleImportJson}
          />
          <button className="rpg-new-btn" onClick={() => createNewSheet(sheetMode)}>+ New Sheet</button>
        </div>
      </header>

      <main className="rpg-layout">
        <aside className="rpg-sidebar">
          <p className="rpg-panel-label">// {sheetMode === "dnd" ? "party roster" : "custom roster"}</p>
          {visibleSheets.map((sheet) => (
            <div key={sheet.id} className="rpg-sheet-card-wrap">
              <button
                className={`rpg-sheet-card ${sheet.id === selectedSheet.id ? "rpg-sheet-card--active" : ""}`}
                onClick={() => setSelectedId(sheet.id)}
              >
                <span className="rpg-sheet-name">{sheet.name || "Unnamed Character"}</span>
                <span className="rpg-sheet-meta">{sheet.className} • {sheetMode === "dnd" ? `Lvl ${sheet.level}` : `Role: ${sheet.level}`}</span>
              </button>
              <button className="rpg-sheet-delete" onClick={() => deleteSheet(sheet.id)} aria-label={`Delete ${sheet.name || "sheet"}`}>
                Delete
              </button>
            </div>
          ))}
        </aside>

        <section className="rpg-sheet-panel">
          {!isShootThem && (
            <>
              <div className="rpg-meta-grid">
                <label className="rpg-field">
                  <span>{isDndSheet ? "Character name" : "Sheet name"}</span>
                  <input value={selectedSheet.name} onChange={(e) => updateSelected({ name: e.target.value })} />
                </label>
                <label className="rpg-field">
                  <span>{isDndSheet ? "Class" : "Role"}</span>
                  <input value={selectedSheet.className} onChange={(e) => updateSelected({ className: e.target.value })} />
                </label>
                <label className="rpg-field">
                  <span>{isDndSheet ? "Level" : "Tier"}</span>
                  <input value={selectedSheet.level} onChange={(e) => updateSelected({ level: e.target.value })} />
                </label>
                <label className="rpg-field">
                  <span>{isDndSheet ? "Race" : "World"}</span>
                  <input value={selectedSheet.race} onChange={(e) => updateSelected({ race: e.target.value })} />
                </label>
                <label className="rpg-field">
                  <span>{isDndSheet ? "Background" : "Motivation"}</span>
                  <input value={selectedSheet.background} onChange={(e) => updateSelected({ background: e.target.value })} />
                </label>
                <label className="rpg-field">
                  <span>{isDndSheet ? "Alignment" : "Mood"}</span>
                  <input value={selectedSheet.alignment} onChange={(e) => updateSelected({ alignment: e.target.value })} />
                </label>
              </div>

              <div className="rpg-core-grid">
                <div className="rpg-core-box">
                  <p className="rpg-panel-label">// {isDndSheet ? "vitals" : "status"}</p>
                  <div className="rpg-stat-grid rpg-vitals-grid">
                    <label className="rpg-score-box">
                      <span>{isDndSheet ? "HP" : "Energy"}</span>
                      <input value={selectedSheet.hp} onChange={(e) => updateSelected({ hp: e.target.value })} />
                    </label>
                    {isDeathwatch ? (
                      <>
                        <div className="rpg-score-box rpg-score-box--derived" title={`From ${armour.label} armour`}>
                          <span>Defense</span>
                          <strong>{armour.as}</strong>
                        </div>
                        <div className="rpg-score-box rpg-score-box--derived" title={`From ${armour.label} armour`}>
                          <span>Movement</span>
                          <strong>{armour.m}</strong>
                        </div>
                      </>
                    ) : (
                      <>
                        <label className="rpg-score-box">
                          <span>{isDndSheet ? "AC" : "Defense"}</span>
                          <input value={selectedSheet.ac} onChange={(e) => updateSelected({ ac: e.target.value })} />
                        </label>
                        <label className="rpg-score-box">
                          <span>{isDndSheet ? "Speed" : "Approach"}</span>
                          <input value={selectedSheet.speed} onChange={(e) => updateSelected({ speed: e.target.value })} />
                        </label>
                      </>
                    )}
                    {isDndSheet ? (
                      <div className="rpg-score-box rpg-score-box--derived" title="DEX modifier">
                        <span>Initiative</span>
                        <strong>{formatModifier(modifierFor(selectedSheet.stats.DEX))}</strong>
                      </div>
                    ) : (
                      <label className="rpg-score-box">
                        <span>Focus</span>
                        <input value={selectedSheet.initiative} onChange={(e) => updateSelected({ initiative: e.target.value })} />
                      </label>
                    )}
                    <label className="rpg-score-box">
                      <span>{isDndSheet ? "Proficiency" : "Skill"}</span>
                      <input value={selectedSheet.proficiency} onChange={(e) => updateSelected({ proficiency: e.target.value })} />
                    </label>
                    {isDndSheet && (
                      <div className="rpg-score-box rpg-score-box--derived" title="10 + Perception modifier">
                        <span>Passive Perc.</span>
                        <strong>{10 + skillModifier(selectedSheet, { key: "Perception", stat: "WIS" })}</strong>
                      </div>
                    )}
                  </div>
                </div>

                {isDndSheet && (
                  <div className="rpg-core-box">
                    <p className="rpg-panel-label">// ability scores</p>
                    <div className="rpg-stat-grid">
                      {STAT_KEYS.map((stat) => (
                        <div key={stat} className="rpg-score-box">
                          <span>{stat}</span>
                          <input
                            type="number"
                            value={selectedSheet.stats[stat]}
                            onChange={(e) => updateStat(stat, Number(e.target.value) || 0)}
                          />
                          <small>{modifierFor(selectedSheet.stats[stat]) >= 0 ? "+" : ""}{modifierFor(selectedSheet.stats[stat])}</small>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {isDeathwatch && (
                  <div className="rpg-core-box">
                    <p className="rpg-panel-label">// characteristics</p>
                    <div className="rpg-stat-grid rpg-characteristic-grid">
                      {CHARACTERISTICS.map(({ key, label }) => {
                        const value = characteristics[key];
                        return (
                          <div key={key} className="rpg-score-box" title={`${label} (${key})`}>
                            <span>{label}</span>
                            <input
                              type="number"
                              value={value}
                              onChange={(e) => updateCharacteristic(key, Number(e.target.value) || 0)}
                            />
                            <small>Bonus {Math.floor(value / 10)}</small>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}
              </div>

              {isDndSheet && (
                <div className="rpg-core-box">
                  <div className="rpg-section-header">
                    <p className="rpg-panel-label">// skills</p>
                    <small className="rpg-skill-hint">Click a dot: proficient → expertise → none</small>
                  </div>
                  <div className="rpg-skill-grid">
                    {SKILLS.map((skill) => {
                      const level = selectedSheet.skills?.[skill.key] ?? "none";
                      return (
                        <div key={skill.key} className="rpg-skill-row">
                          <button
                            type="button"
                            className={`rpg-skill-dot rpg-skill-dot--${level}`}
                            onClick={() => cycleSkill(skill.key)}
                            title={level === "none" ? "Not proficient" : level === "proficient" ? "Proficient" : "Expertise"}
                            aria-label={`${skill.key}: ${level}`}
                          />
                          <span className="rpg-skill-mod">{formatModifier(skillModifier(selectedSheet, skill))}</span>
                          <span className="rpg-skill-name">{skill.key}</span>
                          <small className="rpg-skill-stat">{skill.stat}</small>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}
            </>
          )}

          {isDeathwatch && (
            <div className="rpg-core-box">
              <p className="rpg-panel-label">// armour</p>
              <div className="rpg-armour-tags">
                {ARMOURS.map((option) => (
                  <button
                    key={option.id}
                    type="button"
                    className={`rpg-armour-tag ${armour.id === option.id ? "rpg-armour-tag--active" : ""}`}
                    onClick={() => updateSelected({ armour: option.id })}
                    aria-pressed={armour.id === option.id}
                  >
                    <span className="rpg-armour-name">{option.label}</span>
                    <span className="rpg-armour-stats">Defense {option.as} · Movement {option.m}</span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {isDeathwatch && customFieldsPanel}

          {!isDndSheet && !isShootThem && (
            <div className="rpg-core-box rpg-builder-box">
              <div className="rpg-section-header">
                <p className="rpg-panel-label">// sheet builder</p>
                <div className="rpg-builder-actions">
                  {CUSTOM_FIELD_OPTIONS.map((option) => (
                    <button key={option.type} className="rpg-inline-btn" onClick={() => addCustomField(option.type)}>
                      + {option.label}
                    </button>
                  ))}
                </div>
              </div>

              <div className="rpg-block-list">
                {selectedSheet.customFields.map((field) => (
                  <div key={field.id} className="rpg-block-row">
                    <input
                      value={field.label}
                      onChange={(e) => updateCustomField(field.id, "label", e.target.value)}
                      placeholder="Field label"
                    />
                    {field.type === "textarea" || field.type === "list" ? (
                      <textarea
                        value={field.value}
                        onChange={(e) => updateCustomField(field.id, "value", e.target.value)}
                        placeholder={field.type === "list" ? "line 1\nline 2" : "Long text..."}
                      />
                    ) : (
                      <input
                        type={field.type === "number" ? "number" : "text"}
                        value={field.value}
                        onChange={(e) => updateCustomField(field.id, "value", e.target.value)}
                        placeholder={field.type === "number" ? "0" : "Value"}
                      />
                    )}
                    <button className="rpg-remove-btn" onClick={() => removeCustomField(field.id)}>Remove</button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {isShootThem && selectedSheet.shootThem && (
            <div className="rpg-core-box rpg-shoot-sheet">
              <div className="rpg-section-header">
                <p className="rpg-panel-label">// Shoot Them</p>
              </div>

              <div className="rpg-shoot-grid">
                <label className="rpg-field">
                  <span>Name</span>
                  <input value={selectedSheet.name} onChange={(e) => updateSelected({ name: e.target.value })} />
                </label>
                <label className="rpg-field">
                  <span>Stereotype</span>
                  <input value={shootThem.stereotype} onChange={(e) => updateShootThemField("stereotype", e.target.value)} />
                </label>
                <label className="rpg-field">
                  <span>Experience + bonus</span>
                  <input value={shootThem.experience} onChange={(e) => updateShootThemField("experience", e.target.value)} />
                </label>
                <label className="rpg-field">
                  <span>Moral</span>
                  <input value={shootThem.morale} onChange={(e) => updateShootThemField("morale", e.target.value)} />
                </label>
                <label className="rpg-field">
                  <span>Stamina</span>
                  <input value={shootThem.stamina} onChange={(e) => updateShootThemField("stamina", e.target.value)} />
                </label>
                <label className="rpg-field">
                  <span>Stability</span>
                  <input value={shootThem.stability} onChange={(e) => updateShootThemField("stability", e.target.value)} />
                </label>
                <label className="rpg-field">
                  <span>XP</span>
                  <input value={shootThem.xp} onChange={(e) => updateShootThemField("xp", e.target.value)} />
                </label>
                <label className="rpg-field rpg-textarea-field">
                  <span>Resources</span>
                  <textarea value={shootThem.resources} onChange={(e) => updateShootThemField("resources", e.target.value)} />
                </label>
                <label className="rpg-field rpg-textarea-field">
                  <span>Permanent damage</span>
                  <textarea value={shootThem.permanentDamage} onChange={(e) => updateShootThemField("permanentDamage", e.target.value)} />
                </label>
                <label className="rpg-field">
                  <span>Armour</span>
                  <input value={shootThem.armor} onChange={(e) => updateShootThemField("armor", e.target.value)} />
                </label>
              </div>

              <div className="rpg-shoot-sections">
                <div>
                  <p className="rpg-panel-label">// Body zones</p>
                  <div className="rpg-zone-grid">
                    {SHOOT_THEM_ZONES.map((zone) => (
                      <label key={zone} className="rpg-field rpg-zone-field">
                        <span>{zone.replace(/([A-Z])/g, " $1").replace(/^./, (s) => s.toUpperCase())}</span>
                        <input
                          value={shootThem.bodyZones[zone]}
                          onChange={(e) => updateShootThemBodyZone(zone, e.target.value)}
                        />
                      </label>
                    ))}
                  </div>
                </div>

                <div>
                  <p className="rpg-panel-label">// Abilities</p>
                  <div className="rpg-ability-grid">
                    {SHOOT_THEM_ABILITIES.map((ability) => (
                      <label key={ability} className="rpg-field">
                        <span>{ability}</span>
                        <input
                          type="number"
                          min={-6}
                          max={6}
                          value={shootThem.abilities[ability]}
                          onChange={(e) => updateShootThemAbility(ability, e.target.value)}
                        />
                      </label>
                    ))}
                  </div>
                </div>

                <div>
                  <p className="rpg-panel-label">// Main stats</p>
                  <div className="rpg-shoot-stat-grid">
                    {Object.entries(shootThem.mainStats).map(([stat, value]) => (
                      <label key={stat} className="rpg-field">
                        <span>{stat === "commonKnowledge" ? "Common knowledge" : stat === "physical" ? "Physical" : stat === "agility" ? "Agility" : stat === "psychic" ? "Psychic" : stat === "creativity" ? "Creativity" : "Weapon"}</span>
                        <input
                          value={value}
                          onChange={(e) => updateShootThemMainStat(stat as keyof ShootThemExtras["mainStats"], e.target.value)}
                        />
                      </label>
                    ))}
                  </div>
                </div>

                <div>
                  <div className="rpg-section-header">
                    <p className="rpg-panel-label">// Weapons</p>
                    <button className="rpg-inline-btn" onClick={addShootThemWeapon}>+ Add</button>
                  </div>

                  <div className="rpg-weapon-list">
                    {shootThem.weapons.map((weapon) => (
                      <div key={weapon.id} className="rpg-weapon-row">
                        <input value={weapon.name} onChange={(e) => updateShootThemWeapon(weapon.id, "name", e.target.value)} placeholder="Weapon" />
                        <input className="rpg-number-input" type="number" value={weapon.damage} onChange={(e) => updateShootThemWeapon(weapon.id, "damage", e.target.value)} placeholder="Damage" />
                        <input className="rpg-number-input" type="number" value={weapon.ammo ?? ""} onChange={(e) => updateShootThemWeapon(weapon.id, "ammo" as keyof Weapon, e.target.value)} placeholder="Ammo" />
                        <input className="rpg-number-input" type="number" value={weapon.magazine} onChange={(e) => updateShootThemWeapon(weapon.id, "magazine", e.target.value)} placeholder="Mag" />
                        <input value={weapon.effect} onChange={(e) => updateShootThemWeapon(weapon.id, "effect", e.target.value)} placeholder="Effect" />
                        <input value={weapon.sound} onChange={(e) => updateShootThemWeapon(weapon.id, "sound", e.target.value)} placeholder="Sound" />
                        <input value={weapon.range} onChange={(e) => updateShootThemWeapon(weapon.id, "range", e.target.value)} placeholder="Range" />
                        <button className="rpg-remove-btn" onClick={() => removeShootThemWeapon(weapon.id)}>Remove</button>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {isDndSheet && (
            <div className="rpg-two-col">
              <div className="rpg-core-box">
                <p className="rpg-panel-label">// traits</p>
                <textarea
                  value={selectedSheet.traits.join("\n")}
                  onChange={(e) => updateList("traits", e.target.value)}
                />
              </div>

              <div className="rpg-core-box">
                <p className="rpg-panel-label">// inventory</p>
                <textarea
                  value={selectedSheet.inventory.join("\n")}
                  onChange={(e) => updateList("inventory", e.target.value)}
                />
              </div>
            </div>
          )}

          {isDndSheet && (
            <div className="rpg-core-box">
              <div className="rpg-section-header">
                <p className="rpg-panel-label">// attacks</p>
                <button className="rpg-inline-btn" onClick={addAttack}>+ Add</button>
              </div>

              <div className="rpg-attack-list">
                {selectedSheet.attacks.map((attack) => (
                  <div key={attack.id} className="rpg-attack-row">
                    <input
                      value={attack.name}
                      onChange={(e) => updateAttack(attack.id, "name", e.target.value)}
                      placeholder="Attack name"
                    />
                    <input
                      value={attack.bonus}
                      onChange={(e) => updateAttack(attack.id, "bonus", e.target.value)}
                      placeholder="+0"
                    />
                    <input
                      value={attack.damage}
                      onChange={(e) => updateAttack(attack.id, "damage", e.target.value)}
                      placeholder="1d8"
                    />
                    <input
                      value={attack.notes}
                      onChange={(e) => updateAttack(attack.id, "notes", e.target.value)}
                      placeholder="Notes"
                    />
                    <button className="rpg-remove-btn" onClick={() => removeAttack(attack.id)}>Remove</button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {!isDndSheet && !isDeathwatch && customFieldsPanel}

          <div className="rpg-core-box">
            <p className="rpg-panel-label">// adventure notes</p>
            <textarea
              className="rpg-notes"
              value={selectedSheet.notes}
              onChange={(e) => updateSelected({ notes: e.target.value })}
            />
          </div>
        </section>
      </main>
    </div>
  );
}
