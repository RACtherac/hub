import type { Character, Unit, WargearOption, WeaponProfile } from "../../types/warhammer";

// =====================================
// Factions and weapons from the army builder data
// =====================================

export function factionLabel(faction: string): string {
    return faction
        .split("-")
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(" ");
}

export function listFactions(units: Unit[], characters: Character[]): string[] {
    return [...new Set([...units, ...characters].map((item) => item.faction))].sort();
}

export interface Datasheet {
    id: string;
    name: string;
    defaultModels: number;
    wargear: { option: WargearOption; isDefault: boolean }[];
}

export function listDatasheets(units: Unit[], characters: Character[], faction: string): Datasheet[] {
    const fromUnits = units
        .filter((unit) => unit.faction === faction)
        .map((unit) => ({
            id: `unit:${unit.id}`,
            name: unit.name,
            defaultModels: unit.modelCountOptions?.[0] ?? 1,
            wargear: [
                ...(unit.defaultWargear ?? []).map((option) => ({ option, isDefault: true })),
                ...unit.wargear.map((option) => ({ option, isDefault: false })),
            ],
        }));

    const fromCharacters = characters
        .filter((character) => character.faction === faction)
        .map((character) => ({
            id: `character:${character.id}`,
            name: character.name,
            defaultModels: 1,
            wargear: [
                ...(character.defaultWargear ?? []).map((option) => ({ option, isDefault: true })),
                ...(character.wargear ?? []).map((option) => ({ option, isDefault: false })),
            ],
        }));

    return [...fromUnits, ...fromCharacters]
        .filter((sheet) => sheet.wargear.some(({ option }) => option.profiles?.length))
        .sort((a, b) => a.name.localeCompare(b.name));
}

export interface WeaponChoice {
    key: string;
    label: string;
    profile: WeaponProfile;
    // Default wargear is usually carried by every model; options by one.
    models: number;
}

export function listWeapons(sheet: Datasheet): WeaponChoice[] {
    const seen = new Set<string>();

    return sheet.wargear.flatMap(({ option, isDefault }) =>
        (option.profiles ?? []).map((profile, index) => ({
            key: `${option.id}:${index}`,
            label: `${option.name}${profile.profileName ? ` – ${profile.profileName}` : ""} (${profile.range})`,
            profile,
            models: isDefault ? sheet.defaultModels : 1,
        }))
    ).filter((choice) => {
        if (seen.has(choice.key)) return false;
        seen.add(choice.key);
        return true;
    });
}

// =====================================
// Saved army lists (from the army builder)
// =====================================

const ARMY_SAVES_KEY = "army-builder-saves";

interface SavedArmy {
    id: string;
    faction: string;
    name: string;
    totalPoints: number;
    armyUnits: {
        unitId: string;
        modelCount: number;
        attachedCharacter?: string;
        attachedCharacter2?: string;
        attachedUnit?: string;
    }[];
    armyCharacters: { characterId: string }[];
}

export interface ArmyListOption {
    id: string;
    name: string;
    faction: string;
    totalPoints: number;
    units: { name: string; points: number }[];
}

function isSavedArmy(value: unknown): value is SavedArmy {
    const army = value as SavedArmy;
    return !!army
        && typeof army.id === "string"
        && typeof army.name === "string"
        && Array.isArray(army.armyUnits)
        && Array.isArray(army.armyCharacters);
}

export function loadArmyLists(units: Unit[], characters: Character[]): ArmyListOption[] {
    let saves: unknown[] = [];
    try {
        const parsed = JSON.parse(localStorage.getItem(ARMY_SAVES_KEY) ?? "[]");
        if (Array.isArray(parsed)) saves = parsed;
    }
    catch {
        return [];
    }

    const unitById = new Map(units.map((unit) => [unit.id, unit]));
    const characterById = new Map(characters.map((character) => [character.id, character]));

    const unitEntry = (id: string | undefined, modelCount?: number) => {
        const unit = id ? unitById.get(id) : undefined;
        if (!unit) return [];
        const points = (modelCount ? unit.pointsByModelCount?.[modelCount] : undefined) ?? unit.points ?? 0;
        return [{ name: modelCount && modelCount > 1 ? `${unit.name} (${modelCount})` : unit.name, points }];
    };

    const characterEntry = (id: string | undefined) => {
        const character = id ? characterById.get(id) : undefined;
        return character ? [{ name: character.name, points: character.points }] : [];
    };

    return saves.filter(isSavedArmy).map((army) => ({
        id: army.id,
        name: army.name,
        faction: army.faction,
        totalPoints: army.totalPoints ?? 0,
        units: [
            ...army.armyUnits.flatMap((entry) => [
                ...unitEntry(entry.unitId, entry.modelCount),
                ...characterEntry(entry.attachedCharacter),
                ...characterEntry(entry.attachedCharacter2),
                ...unitEntry(entry.attachedUnit),
            ]),
            ...army.armyCharacters.flatMap((entry) => characterEntry(entry.characterId)),
        ],
    }));
}
