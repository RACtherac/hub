import type { AttackProfile } from "../../utils/mathhammer";

// Weapon rows as edited in the Mathhammer and Battle tabs.

export interface ProfileRow extends Omit<AttackProfile, "keywords"> {
    key: string;
    keywords: string;
    faction: string;
    sheetId: string;
    weaponKey: string;
}

let nextRowKey = 1;

export function newRow(models = 10): ProfileRow {
    return {
        key: `row-${nextRowKey++}`,
        name: "Boltgun",
        models,
        attacks: "2",
        skill: "3+",
        strength: "4",
        ap: "0",
        damage: "1",
        keywords: "",
        faction: "",
        sheetId: "",
        weaponKey: "",
    };
}

export function rowsToProfiles(rows: ProfileRow[]): AttackProfile[] {
    return rows.map((row) => ({
        ...row,
        keywords: row.keywords.split(",").map((k) => k.trim()).filter(Boolean),
    }));
}
