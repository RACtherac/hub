// Every project in the hub saves to localStorage. This bundles all of it into one
// file so the whole site can be backed up or moved to another browser.

/** Which project each localStorage key belongs to. Unknown keys still get exported under "Other". */
export const PROJECT_KEYS: Record<string, string> = {
    "army-builder-saves": "Warhammer Army Builder",
    "warhammer-game-tracker": "Warhammer Toolkit",
    "whk-dice-tester-v1": "Warhammer Toolkit",
    "miniature-paint-records": "Mini Paint Tracker",
    "paint-inventory": "Paint Inventory",
    "kanban-app-items": "Kanban Board",
    "pixel-art-data": "Pixel Art Editor",
    "project-tree-data": "Project Tree",
    "family-tree-data": "Family Tree",
    "family-tree-line-style": "Family Tree",
    "rpg-character-sheets": "Roleplaying Sheets",
    "dm-screen-v1": "DM Screen",
    "dm-screen-board-layout": "DM Screen",
    "town-builder-v1": "Town Builder",
    "tools-json-draft": "Dev Tools",
};

export const OTHER_PROJECT = "Other";
export const BACKUP_APP = "oh-hub";
export const BACKUP_VERSION = 1;

/** JSON values are kept readable; anything that isn't valid JSON is kept as text. */
export type BackupEntry = { project: string; json: unknown } | { project: string; text: string };

export interface SiteBackup {
    app: typeof BACKUP_APP;
    version: number;
    exportedAt: string;
    items: Record<string, BackupEntry>;
}

/** The bits of Storage this needs, so tests can pass a plain object. */
export interface KeyValueStore {
    readonly length: number;
    key(index: number): string | null;
    getItem(key: string): string | null;
    setItem(key: string, value: string): void;
}

export function projectFor(key: string): string {
    return PROJECT_KEYS[key] ?? OTHER_PROJECT;
}

function toEntry(key: string, raw: string): BackupEntry {
    const project = projectFor(key);
    try {
        const parsed: unknown = JSON.parse(raw);
        // Only keep the parsed form when it writes back to exactly the same string.
        if (JSON.stringify(parsed) === raw) return { project, json: parsed };
    } catch {
        // Not JSON — falls through to text.
    }
    return { project, text: raw };
}

function entryToRaw(entry: BackupEntry): string {
    return "text" in entry ? entry.text : JSON.stringify(entry.json);
}

/** Collects every non-empty key in storage. */
export function buildBackup(storage: KeyValueStore, now = new Date()): SiteBackup {
    const items: Record<string, BackupEntry> = {};
    const keys: string[] = [];
    for (let i = 0; i < storage.length; i++) {
        const key = storage.key(i);
        if (key !== null) keys.push(key);
    }
    for (const key of keys.sort()) {
        const raw = storage.getItem(key);
        if (raw === null || raw === "") continue;
        items[key] = toEntry(key, raw);
    }
    return { app: BACKUP_APP, version: BACKUP_VERSION, exportedAt: now.toISOString(), items };
}

/** Project name → number of saved keys, for showing what a backup holds. */
export function summarizeBackup(backup: SiteBackup): Record<string, number> {
    const summary: Record<string, number> = {};
    for (const entry of Object.values(backup.items)) {
        summary[entry.project] = (summary[entry.project] ?? 0) + 1;
    }
    return summary;
}

function isEntry(value: unknown): value is BackupEntry {
    if (typeof value !== "object" || value === null) return false;
    const entry = value as Record<string, unknown>;
    if (typeof entry.project !== "string") return false;
    return "json" in entry || typeof entry.text === "string";
}

/** Checks an uploaded file is a hub backup. Throws with a readable message when it isn't. */
export function parseBackup(text: string): SiteBackup {
    let data: unknown;
    try {
        data = JSON.parse(text);
    } catch {
        throw new Error("That file isn't valid JSON.");
    }
    const backup = data as Partial<SiteBackup> | null;
    if (!backup || backup.app !== BACKUP_APP || typeof backup.items !== "object" || backup.items === null) {
        throw new Error("That file isn't a hub backup.");
    }
    if (typeof backup.version !== "number" || backup.version > BACKUP_VERSION) {
        throw new Error("That backup was made by a newer version of the hub.");
    }
    for (const [key, entry] of Object.entries(backup.items)) {
        if (!isEntry(entry)) throw new Error(`The backup entry "${key}" is damaged.`);
    }
    return backup as SiteBackup;
}

/** Writes every key in the backup, replacing what's there. Keys not in the backup are left alone. */
export function restoreBackup(backup: SiteBackup, storage: KeyValueStore): number {
    let written = 0;
    for (const [key, entry] of Object.entries(backup.items)) {
        storage.setItem(key, entryToRaw(entry));
        written++;
    }
    return written;
}
