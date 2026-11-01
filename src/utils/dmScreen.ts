import { KM_PER_MILE, TRAVEL_MODES, advanceTime, createCalendar, formatDate, formatDuration, normalizeCalendar, travelMinutes, type Calendar, type CalendarEvent } from "./dmCalendar";
import { createMap, normalizeMap, type BattleMap } from "./dmMap";
import { makeId } from "./makeId";

// =====================================
// DM Screen: encounter tracker + story board
// =====================================
//
// Pure data helpers. The page keeps one DmScreenData object in state and in
// localStorage; everything that changes it goes through functions here so it
// can be tested without React.

export const STORAGE_KEY = "dm-screen-v1";

export type CombatantKind = "pc" | "npc" | "monster";

export type AttackKind = "weapon" | "magic";

// A weapon attack or a spell. Free text, so it works for any system.
export interface Attack {
    id: string;
    kind: AttackKind;
    name: string;
    // "+5", or "DC 14 Dex" for a save.
    hit: string;
    // "1d8 + 3 slashing", or an effect for spells.
    damage: string;
    range: string;
}

export interface Combatant {
    id: string;
    name: string;
    kind: CombatantKind;
    initiative: number;
    initiativeMod: number;
    hp: number;
    maxHp: number;
    tempHp: number;
    ac: string;
    // Free text, e.g. "Medium humanoid (goblinoid)" or "Large undead".
    creatureType: string;
    alignment: string;
    conditions: string[];
    notes: string;
    attacks: Attack[];
    // What they drop, as free text.
    loot: string;
    // Named counters with + and -, e.g. spell slots or inspiration.
    trackers: Tracker[];
    // Only used for PCs, while they're at 0 HP.
    deathSaves: DeathSaves;
    // Added from this NPC's sheet: attacks and loot stay the same on both
    // (see shareWithNpc). Everything else, like HP, is the combatant's own.
    npcId?: string;
    // Added from this player's sheet: HP, AC and trackers stay the same on
    // both (see shareWithPlayer), so damage carries over between encounters.
    playerId?: string;
}

// A named counter with + and -: spell slots, inspiration, arrows, hit dice...
export interface Tracker {
    id: string;
    name: string;
    value: number;
    // Upper limit, or null for none. Value never goes below 0.
    max: number | null;
    // Which rest refills it to its max. A long rest also refills short-rest ones.
    resets: TrackerReset;
    notes: string;
}

export type TrackerReset = "none" | "short" | "long";

export const TRACKER_RESETS: { value: TrackerReset; label: string }[] = [
    { value: "none", label: "Never" },
    { value: "short", label: "Short rest" },
    { value: "long", label: "Long rest" },
];

// Three successes and they're stable; three failures and they die.
export interface DeathSaves {
    successes: number;
    failures: number;
}

export const NO_DEATH_SAVES: DeathSaves = { successes: 0, failures: 0 };

export interface Encounter {
    id: string;
    name: string;
    round: number;
    // The combatant whose turn it is, or null before the first turn.
    turnId: string | null;
    combatants: Combatant[];
    // Set once the party's win or loss is recorded (recordResult) and the players have left.
    result?: RecordedOutcome;
}

export type ResultOutcome = "won" | "lost";

export interface RecordedOutcome {
    outcome: ResultOutcome;
    // When it was recorded, in ms.
    at: number;
    round: number;
    // Names of the players who fought it, as they were then.
    by: string[];
}

// An encounter a player won or lost, kept on their sheet.
export interface EncounterResult {
    encounterId: string;
    // The encounter's name then, for when it's renamed or deleted later.
    name: string;
    outcome: ResultOutcome;
    round: number;
    at: number;
}

export type NodeKind = "scene" | "encounter" | "npc" | "item" | "location" | "time" | "travel" | "clue" | "note" | "image" | "end" | "resume";

// One card the story went through, as it was when the story ended.
export interface RecapStep {
    kind: NodeKind;
    title: string;
    text: string;
    // The label on the connection the story came in by, if any.
    via: string;
    // Ticked as the branch the players took; `passedOver` are the other branches.
    taken: boolean;
    passedOver: string[];
    // e.g. "⚔ Goblin ambush: Players won", "⏩ Skipped 3 h".
    details: string[];
}

// What happened on a board, saved by its End story card.
export interface StoryRecap {
    boardName: string;
    // When the story was ended, in ms, and the in-game date then.
    endedAt: number;
    endedOn: string;
    steps: RecapStep[];
}

export interface BoardNode {
    id: string;
    kind: NodeKind;
    title: string;
    text: string;
    x: number;
    y: number;
    encounterId?: string;
    // NPC cards: the named NPC from the NPCs tab.
    npcId?: string;
    // Item cards: the item from the Items tab.
    itemId?: string;
    // Note cards: the note from the Notes tab.
    noteId?: string;
    // Location cards: the location from the Locations tab.
    locationId?: string;
    // Time cards: an event on the calendar.
    eventId?: string;
    // Travel cards: the journey, which sets skipMinutes.
    travelDistance?: number;
    travelUnit?: TravelUnit;
    travelMode?: string;
    // Time and travel cards: how far the skip button moves the calendar, in minutes.
    skipMinutes?: number;
    // The skip has been used; undoing it moves the calendar back.
    skipped?: boolean;
    // Image cards: a downscaled data URL, small enough for localStorage.
    image?: string;
    // The players took this branch; its sibling branches are greyed out.
    taken?: boolean;
    // End story cards: what happened, saved when the story was ended.
    recap?: StoryRecap;
    // Resume story cards: the board whose story this one carries on.
    resumeBoardId?: string;
}

export interface BoardLink {
    id: string;
    from: string;
    to: string;
    label: string;
}

export interface BoardView {
    x: number;
    y: number;
    zoom: number;
}

export interface Board {
    nodes: BoardNode[];
    links: BoardLink[];
    view: BoardView;
}

// A named NPC worth keeping a sheet for (the NPCs tab).
export interface Npc {
    id: string;
    name: string;
    race: string;
    alignment: string;
    ac: string;
    hp: number;
    maxHp: number;
    location: string;
    notes: string;
    attacks: Attack[];
    // What they drop, as free text. Items from the Items tab they carry are listed separately.
    loot: string;
    // A downscaled data URL, like image cards.
    image?: string;
}

// A player character (the Players tab). Free text where systems differ.
export interface Player {
    id: string;
    name: string;
    // Who plays them.
    playerName: string;
    // e.g. "Half-elf ranger".
    ancestryClass: string;
    level: string;
    ac: string;
    hp: number;
    maxHp: number;
    tempHp: number;
    initiativeMod: number;
    // Free text so they fit any system.
    passive: string;
    speed: string;
    trackers: Tracker[];
    deathSaves: DeathSaves;
    // Encounters they've won or lost, oldest first.
    results: EncounterResult[];
    notes: string;
    // A downscaled data URL, like image cards.
    image?: string;
}

// A reusable stat block (the Monsters tab). Each copy added to an encounter
// is its own combatant; changing the library doesn't touch fights already set up.
export interface Monster {
    id: string;
    name: string;
    // Free text, e.g. "Small humanoid (goblinoid)".
    creatureType: string;
    alignment: string;
    // "1/4", "CR 3", "Level 5"... whatever the system uses.
    challenge: string;
    ac: string;
    // Average HP, used unless HP is rolled.
    hp: number;
    // Hit dice to roll HP for each copy, e.g. "2d6 + 2". Optional.
    hpDice: string;
    initiativeMod: number;
    speed: string;
    attacks: Attack[];
    // Special abilities, resistances, tactics.
    traits: string;
    loot: string;
    // A downscaled data URL, like image cards.
    image?: string;
}

// A place worth a sheet (the Locations tab). Every field can be typed or generated.
export interface Location {
    id: string;
    name: string;
    // "Village", "Tavern", "Ruins"... free text, with suggestions.
    kind: string;
    description: string;
    // A landmark or something notable there.
    feature: string;
    // Someone the party can meet there.
    npc: string;
    rumour: string;
    danger: string;
    notes: string;
}

export type ItemType = "weapon" | "armour" | "potion" | "quest" | "treasure" | "other";

export type ItemRarity = "" | "common" | "uncommon" | "rare" | "very-rare" | "legendary" | "artifact";

// Who has an item right now. Items change hands, so this is one field to
// update rather than a card to rebuild.
export type ItemHolder =
    | { kind: "none" }
    | { kind: "npc"; npcId: string }
    | { kind: "location"; name: string }
    // `character` is optional: which party member carries it.
    | { kind: "party"; character: string };

export type ItemHolderKind = ItemHolder["kind"];

// Loot worth tracking (the Items tab).
export interface Item {
    id: string;
    name: string;
    type: ItemType;
    rarity: ItemRarity;
    // Free text, e.g. "500 gp".
    value: string;
    description: string;
    // Type-specific stats, keyed by ITEM_STAT_FIELDS (damage for weapons, AC
    // for armour, ...). Values for other types are kept, so switching type
    // back and forth doesn't lose them.
    stats: Record<string, string>;
    holder: ItemHolder;
    // A downscaled data URL, like image cards.
    image?: string;
}

// Free-form notes worth keeping (the Notes tab): lore, rumours, session recaps.
export interface Note {
    id: string;
    title: string;
    body: string;
    // Pinned notes stay at the top of the list.
    pinned: boolean;
    // When the note was last edited, in ms, for sorting and "edited 2 days ago".
    updatedAt: number;
}

// One of several story boards, e.g. one per adventure or session.
export interface NamedBoard extends Board {
    id: string;
    name: string;
}

// Table rules the DM can change (the Settings tab).
export interface DmSettings {
    // How long each rest takes; the calendar moves on by this much.
    shortRestMinutes: number;
    longRestMinutes: number;
}

export const DEFAULT_SETTINGS: DmSettings = { shortRestMinutes: 60, longRestMinutes: 8 * 60 };

export interface DmScreenData {
    version: 1;
    encounters: Encounter[];
    activeEncounterId: string;
    boards: NamedBoard[];
    activeBoardId: string;
    npcs: Npc[];
    // The NPC open in the NPCs tab, or "" when there are none.
    activeNpcId: string;
    players: Player[];
    // The player open in the Players tab, or "" when there are none.
    activePlayerId: string;
    locations: Location[];
    // The location open in the Locations tab, or "" when there are none.
    activeLocationId: string;
    monsters: Monster[];
    // The monster open in the Monsters tab, or "" when there are none.
    activeMonsterId: string;
    calendar: Calendar;
    settings: DmSettings;
    items: Item[];
    // The item open in the Items tab, or "" when there are none.
    activeItemId: string;
    notes: Note[];
    // The note open in the Notes tab, or "" when there are none.
    activeNoteId: string;
    maps: BattleMap[];
    activeMapId: string;
}

export const COMBATANT_KINDS: { value: CombatantKind; label: string }[] = [
    { value: "pc", label: "PC" },
    { value: "npc", label: "NPC" },
    { value: "monster", label: "Monster" },
];

export const STANDARD_CONDITIONS = [
    "Blinded",
    "Charmed",
    "Frightened",
    "Grappled",
    "Incapacitated",
    "Invisible",
    "Paralyzed",
    "Poisoned",
    "Prone",
    "Restrained",
    "Stunned",
    "Unconscious",
    "Concentrating",
] as const;

export const NODE_KINDS: { value: NodeKind; label: string }[] = [
    { value: "scene", label: "Scene" },
    { value: "encounter", label: "Encounter" },
    { value: "npc", label: "NPC" },
    { value: "item", label: "Item" },
    { value: "location", label: "Location" },
    { value: "time", label: "Time" },
    { value: "travel", label: "Travel" },
    { value: "clue", label: "Clue" },
    { value: "note", label: "Note" },
    { value: "image", label: "Image" },
    { value: "end", label: "End story" },
    { value: "resume", label: "Resume story" },
];

export const ITEM_TYPES: { value: ItemType; label: string }[] = [
    { value: "weapon", label: "Weapon" },
    { value: "armour", label: "Armour" },
    { value: "potion", label: "Potion" },
    { value: "quest", label: "Quest item" },
    { value: "treasure", label: "Treasure" },
    { value: "other", label: "Other" },
];

export const ITEM_RARITIES: { value: ItemRarity; label: string }[] = [
    { value: "", label: "No rarity" },
    { value: "common", label: "Common" },
    { value: "uncommon", label: "Uncommon" },
    { value: "rare", label: "Rare" },
    { value: "very-rare", label: "Very rare" },
    { value: "legendary", label: "Legendary" },
    { value: "artifact", label: "Artifact" },
];

export interface ItemStatField {
    key: string;
    label: string;
    placeholder?: string;
    // A dropdown instead of free text.
    options?: { value: string; label: string }[];
}

// The extra fields each item type has. Free text, so it works for any system.
export const ITEM_STAT_FIELDS: Record<ItemType, ItemStatField[]> = {
    weapon: [
        { key: "attack", label: "Melee / ranged", options: [{ value: "melee", label: "Melee" }, { value: "ranged", label: "Ranged" }] },
        { key: "range", label: "Range / reach", placeholder: "5 ft, or 80/320 ft" },
        { key: "hit", label: "To hit / DC", placeholder: "+5, or DC 14 Dex" },
        { key: "damage", label: "Damage", placeholder: "1d8 + 3" },
        { key: "damageType", label: "Damage type", placeholder: "Slashing" },
        { key: "properties", label: "Properties", placeholder: "Finesse, versatile (1d10)" },
    ],
    armour: [
        {
            key: "armourType",
            label: "Armour type",
            options: [
                { value: "light", label: "Light" },
                { value: "medium", label: "Medium" },
                { value: "heavy", label: "Heavy" },
                { value: "shield", label: "Shield" },
            ],
        },
        { key: "ac", label: "AC", placeholder: "14 + Dex (max 2), or +2" },
        { key: "strength", label: "Strength needed", placeholder: "Str 13" },
        { key: "stealth", label: "Stealth", options: [{ value: "disadvantage", label: "Disadvantage" }] },
    ],
    potion: [
        { key: "effect", label: "Effect", placeholder: "Regain 2d4 + 2 HP" },
        { key: "duration", label: "Duration", placeholder: "Instant, or 1 hour" },
    ],
    quest: [
        { key: "quest", label: "Part of quest", placeholder: "The Sunken Abbey" },
        { key: "wantedBy", label: "Wanted by", placeholder: "Abbot Merrin" },
    ],
    treasure: [
        { key: "quantity", label: "Quantity", placeholder: "3" },
    ],
    other: [],
};

const statOption = (type: ItemType, key: string, value: string) =>
    ITEM_STAT_FIELDS[type].find((f) => f.key === key)?.options?.find((o) => o.value === value)?.label ?? value;

// One line of the stats that matter at the table, for the card face:
// "Melee · +5 · 1d8 + 3 slashing · 5 ft", "Heavy · AC 18 · Stealth disadv.".
export function itemStatLine(item: Item): string {
    const s = (key: string) => (item.stats[key] ?? "").trim();
    const parts: string[] = [];
    switch (item.type) {
        case "weapon":
            parts.push(statOption("weapon", "attack", s("attack")), s("hit"), [s("damage"), s("damageType").toLowerCase()].filter(Boolean).join(" "), s("range"));
            break;
        case "armour":
            parts.push(statOption("armour", "armourType", s("armourType")), s("ac") && `AC ${s("ac")}`, s("stealth") && "Stealth disadv.");
            break;
        case "potion":
            parts.push(s("effect"), s("duration"));
            break;
        case "quest":
            parts.push(s("quest"));
            break;
        case "treasure":
            parts.push(s("quantity") && `×${s("quantity")}`);
            break;
    }
    return parts.filter(Boolean).join(" · ");
}

export const itemTypeLabel =(type: ItemType) => ITEM_TYPES.find((t) => t.value === type)?.label ?? "Item";

export const rarityLabel = (rarity: ItemRarity) => (rarity ? ITEM_RARITIES.find((r) => r.value === rarity)?.label ?? "" : "");

export const ITEM_HOLDERS: { value: ItemHolderKind; label: string }[] = [
    { value: "none", label: "Not found yet" },
    { value: "npc", label: "An NPC" },
    { value: "location", label: "A location" },
    { value: "party", label: "The party" },
];

export const ZOOM_MIN = 0.3;
export const ZOOM_MAX = 2.5;

// =====================================
// Creating things
// =====================================

export function createCombatant(fields: Partial<Combatant> = {}): Combatant {
    const maxHp = Math.max(0, Math.trunc(fields.maxHp ?? 10));
    return {
        id: makeId(),
        name: "New combatant",
        kind: "monster",
        initiative: 0,
        initiativeMod: 0,
        tempHp: 0,
        ac: "",
        creatureType: "",
        alignment: "",
        conditions: [],
        notes: "",
        attacks: [],
        loot: "",
        trackers: [],
        deathSaves: NO_DEATH_SAVES,
        ...fields,
        maxHp,
        hp: clamp(Math.trunc(fields.hp ?? maxHp), 0, maxHp),
    };
}

export function createAttack(kind: AttackKind = "weapon", fields: Partial<Attack> = {}): Attack {
    return { id: makeId(), kind, name: "", hit: "", damage: "", range: "", ...fields };
}

export function createEncounter(name = "New encounter"): Encounter {
    return { id: makeId(), name, round: 1, turnId: null, combatants: [] };
}

export function createNode(kind: NodeKind, x: number, y: number): BoardNode {
    const label = NODE_KINDS.find((k) => k.value === kind)?.label ?? "Note";
    const title = kind === "end" ? "The end" : kind === "resume" ? "Previously…" : `New ${label.toLowerCase()}`;
    return { id: makeId(), kind, title, text: "", x, y };
}

export function createNpc(fields: Partial<Npc> = {}): Npc {
    const maxHp = Math.max(0, Math.trunc(fields.maxHp ?? 10));
    return {
        id: makeId(),
        name: "New NPC",
        race: "",
        alignment: "",
        ac: "",
        location: "",
        notes: "",
        attacks: [],
        loot: "",
        ...fields,
        maxHp,
        hp: clamp(Math.trunc(fields.hp ?? maxHp), 0, maxHp),
    };
}

// The NPC as a combatant for the tracker, linked back to the sheet. Stats are
// copied once, so HP can drop mid-fight without touching the sheet; attacks
// and loot stay shared with it from then on (shareWithNpc).
export function combatantFromNpc(npc: Npc): Combatant {
    return createCombatant({
        name: npc.name,
        kind: "npc",
        maxHp: npc.maxHp,
        hp: npc.hp,
        ac: npc.ac,
        creatureType: npc.race,
        alignment: npc.alignment,
        notes: npc.notes,
        attacks: npc.attacks,
        loot: npc.loot,
        npcId: npc.id,
    });
}

export type SharedNpcFields = Partial<Pick<Npc, "attacks" | "loot">>;

// Changes attacks and/or loot on an NPC and on every combatant added from it,
// in any encounter, so an edit in either place shows in both. Each combatant
// keeps its own copy too, so it still has them if the NPC is deleted.
export function shareWithNpc(data: DmScreenData, npcId: string, fields: SharedNpcFields): DmScreenData {
    return {
        ...data,
        npcs: data.npcs.map((n) => (n.id === npcId ? { ...n, ...fields } : n)),
        encounters: data.encounters.map((e) => (e.combatants.some((c) => c.npcId === npcId)
            ? { ...e, combatants: e.combatants.map((c) => (c.npcId === npcId ? { ...c, ...fields } : c)) }
            : e)),
    };
}

export function createPlayer(fields: Partial<Player> = {}): Player {
    const maxHp = Math.max(0, Math.trunc(fields.maxHp ?? 10));
    return {
        id: makeId(),
        name: "New player",
        playerName: "",
        ancestryClass: "",
        level: "",
        ac: "",
        tempHp: 0,
        initiativeMod: 0,
        passive: "",
        speed: "",
        trackers: [],
        deathSaves: NO_DEATH_SAVES,
        results: [],
        notes: "",
        ...fields,
        maxHp,
        hp: clamp(Math.trunc(fields.hp ?? maxHp), 0, maxHp),
    };
}

export function createTracker(fields: Partial<Tracker> = {}): Tracker {
    return { id: makeId(), name: "", value: 0, max: null, resets: "none", notes: "", ...fields };
}

// Moves a tracker by delta, kept between 0 and its max.
export function stepTracker(tracker: Tracker, delta: number): Tracker {
    const value = Math.max(0, tracker.value + delta);
    return { ...tracker, value: tracker.max === null ? value : Math.min(tracker.max, value) };
}

// The player as a combatant for the tracker, linked back to the sheet.
export function combatantFromPlayer(player: Player): Combatant {
    return createCombatant({
        name: player.name,
        kind: "pc",
        initiativeMod: player.initiativeMod,
        maxHp: player.maxHp,
        hp: player.hp,
        tempHp: player.tempHp,
        ac: player.ac,
        creatureType: player.ancestryClass,
        trackers: player.trackers,
        deathSaves: player.deathSaves,
        playerId: player.id,
    });
}

export type SharedPlayerFields = Partial<Pick<Player, "hp" | "maxHp" | "tempHp" | "ac" | "trackers" | "deathSaves">>;

export const sharedPlayerFields = ({ hp, maxHp, tempHp, ac, trackers, deathSaves }: Combatant | Player): SharedPlayerFields =>
    ({ hp, maxHp, tempHp, ac, trackers, deathSaves });

// Death saves only matter at 0 HP; once someone is back up they start over.
export function clearDeathSavesIfUp<T extends { hp: number; deathSaves: DeathSaves }>(target: T): T {
    const { successes, failures } = target.deathSaves;
    return target.hp > 0 && (successes || failures) ? { ...target, deathSaves: NO_DEATH_SAVES } : target;
}

export type DeathSaveState = "rolling" | "stable" | "dead";

export function deathSaveState({ successes, failures }: DeathSaves): DeathSaveState {
    if (failures >= 3) return "dead";
    if (successes >= 3) return "stable";
    return "rolling";
}

// One death save, D&D style: 10 or more succeeds, a 1 counts as two failures,
// and a 20 brings them back with 1 HP.
export function rollDeathSave<T extends { hp: number; deathSaves: DeathSaves }>(target: T, roll: number): T {
    if (deathSaveState(target.deathSaves) !== "rolling") return target;
    if (roll >= 20) return { ...target, hp: 1, deathSaves: NO_DEATH_SAVES };
    const { successes, failures } = target.deathSaves;
    if (roll >= 10) return { ...target, deathSaves: { successes: successes + 1, failures } };
    return { ...target, deathSaves: { successes, failures: Math.min(3, failures + (roll <= 1 ? 2 : 1)) } };
}

export type RestKind = "short" | "long";

// What a rest gives back: trackers that reset on it go to their max, and a
// long rest also restores HP, drops temp HP and clears death saves.
export function restFields(player: Player, kind: RestKind): SharedPlayerFields {
    const trackers = player.trackers.map((t) =>
        t.max !== null && (t.resets === kind || (kind === "long" && t.resets === "short")) ? { ...t, value: t.max } : t
    );
    return kind === "long"
        ? { trackers, hp: player.maxHp, tempHp: 0, deathSaves: NO_DEATH_SAVES }
        : { trackers };
}

export type TravelUnit = "mi" | "km";

// A travel card's journey, and how long it takes on the calendar.
export function cardTravel(node: BoardNode) {
    const mode = TRAVEL_MODES.find((m) => m.id === node.travelMode) ?? TRAVEL_MODES[0];
    const unit: TravelUnit = node.travelUnit ?? "mi";
    const distance = node.travelDistance ?? 0;
    const minutes = travelMinutes(unit === "km" ? distance / KM_PER_MILE : distance, mode);
    return { mode, unit, distance, minutes };
}

// Changes a travel card's journey and its skip length with it.
export function travelFields(node: BoardNode, fields: Pick<BoardNode, "travelDistance" | "travelUnit" | "travelMode">): Partial<BoardNode> {
    const minutes = cardTravel({ ...node, ...fields }).minutes;
    return { ...fields, skipMinutes: minutes > 0 ? Math.min(365 * 24 * 60, minutes) : undefined };
}

// A time card's skip button: moves the calendar on by the card's skip, or
// back again with undo. Each card skips once until undone, so a double click
// can't skip twice.
export function timeSkip(data: DmScreenData, nodeId: string, undo = false): DmScreenData {
    const node = activeBoard(data).nodes.find((n) => n.id === nodeId);
    if (!node?.skipMinutes || !!node.skipped !== undo) return data;
    const moved = { ...data, calendar: advanceTime(data.calendar, undo ? -node.skipMinutes : node.skipMinutes) };
    return updateActiveBoard(moved, (b) => ({
        ...b,
        nodes: b.nodes.map((n) => (n.id === nodeId ? { ...n, skipped: undo ? undefined : true } : n)),
    }));
}

export const restMinutes = (settings: DmSettings, kind: RestKind) =>
    kind === "long" ? settings.longRestMinutes : settings.shortRestMinutes;

// The whole party rests at once, in the Players tab and every encounter, and
// the calendar moves on by the rest's length from the Settings tab.
export function restParty(data: DmScreenData, kind: RestKind): DmScreenData {
    const rested = data.players.reduce((current, player) => shareWithPlayer(current, player.id, restFields(player, kind)), data);
    return { ...rested, calendar: advanceTime(rested.calendar, restMinutes(data.settings, kind)) };
}

function normalizeSettings(value: unknown): DmSettings {
    const source = isObject(value) ? value : {};
    // Up to a week, so a typo can't fling the calendar years ahead.
    const minutes = (raw: unknown, fallback: number) => Math.min(7 * 24 * 60, Math.max(0, Math.trunc(num(raw, fallback))));
    return {
        shortRestMinutes: minutes(source.shortRestMinutes, DEFAULT_SETTINGS.shortRestMinutes),
        longRestMinutes: minutes(source.longRestMinutes, DEFAULT_SETTINGS.longRestMinutes),
    };
}

// Changes HP, AC, trackers and/or death saves on a player and on every
// combatant added from them, in any encounter, so a hit in one fight is still
// there in the next.
export function shareWithPlayer(data: DmScreenData, playerId: string, fields: SharedPlayerFields): DmScreenData {
    const player = data.players.find((p) => p.id === playerId);
    if (player) fields = { ...fields, deathSaves: clearDeathSavesIfUp({ ...player, ...fields }).deathSaves };
    return {
        ...data,
        players: data.players.map((p) => (p.id === playerId ? { ...p, ...fields } : p)),
        encounters: data.encounters.map((e) => (e.combatants.some((c) => c.playerId === playerId)
            ? { ...e, combatants: e.combatants.map((c) => (c.playerId === playerId ? { ...c, ...fields } : c)) }
            : e)),
    };
}

// Adds every player who isn't in the encounter yet.
export function addPartyToEncounter(encounter: Encounter, players: Player[]): Encounter {
    const present = new Set(encounter.combatants.map((c) => c.playerId));
    const added = players.filter((p) => !present.has(p.id)).map(combatantFromPlayer);
    return added.length ? { ...encounter, combatants: [...encounter.combatants, ...added] } : encounter;
}

// The fight is over: every combatant linked to a player leaves the encounter
// and the win or loss goes on their sheets. The encounter remembers it, so it
// still shows its result with the players gone.
export function recordResult(data: DmScreenData, encounterId: string, outcome: ResultOutcome, now = Date.now()): DmScreenData {
    const encounter = data.encounters.find((e) => e.id === encounterId);
    if (!encounter) return data;
    const fighters = encounter.combatants.filter((c) => c.playerId && data.players.some((p) => p.id === c.playerId));
    if (fighters.length === 0) return data;

    const fighterIds = new Set(fighters.map((c) => c.playerId));
    const result: EncounterResult = { encounterId, name: encounter.name || "Untitled", outcome, round: encounter.round, at: now };
    const combatants = encounter.combatants.filter((c) => !fighters.includes(c));
    return {
        ...data,
        players: data.players.map((p) => (fighterIds.has(p.id) ? { ...p, results: [...p.results, result] } : p)),
        encounters: data.encounters.map((e) => (e.id === encounterId
            ? {
                ...e,
                combatants,
                turnId: combatants.some((c) => c.id === e.turnId) ? e.turnId : null,
                result: { outcome, at: now, round: e.round, by: fighters.map((c) => c.name) },
            }
            : e)),
    };
}

export interface PlayerRecord {
    wins: number;
    losses: number;
    // Wins as a whole percentage of all results, or null with none yet.
    winRate: number | null;
    // Average rounds per recorded fight, to one decimal, or null with none yet.
    averageRounds: number | null;
}

export function playerRecord(player: Player): PlayerRecord {
    const total = player.results.length;
    const wins = player.results.filter((r) => r.outcome === "won").length;
    const rounds = player.results.reduce((sum, r) => sum + r.round, 0);
    return {
        wins,
        losses: total - wins,
        winRate: total ? Math.round((wins / total) * 100) : null,
        averageRounds: total ? Math.round((rounds / total) * 10) / 10 : null,
    };
}

export function removePlayer(data: DmScreenData, id: string): DmScreenData {
    const players = data.players.filter((p) => p.id !== id);
    return {
        ...data,
        players,
        activePlayerId: data.activePlayerId === id ? (players[0]?.id ?? "") : data.activePlayerId,
        // Combatants stay in their fights, but stop sharing with the sheet.
        encounters: data.encounters.map((e) => ({
            ...e,
            combatants: e.combatants.map((c) => (c.playerId === id ? { ...c, playerId: undefined } : c)),
        })),
    };
}

// Combatants linked to an NPC, for "in 2 encounters" on the sheet.
export function npcCombatants(data: DmScreenData, npcId: string): { encounter: Encounter; combatant: Combatant }[] {
    return data.encounters.flatMap((encounter) =>
        encounter.combatants.filter((c) => c.npcId === npcId).map((combatant) => ({ encounter, combatant }))
    );
}

export function createMonster(fields: Partial<Monster> = {}): Monster {
    return {
        id: makeId(),
        name: "New monster",
        creatureType: "",
        alignment: "",
        challenge: "",
        ac: "",
        hp: 10,
        hpDice: "",
        initiativeMod: 0,
        speed: "",
        attacks: [],
        traits: "",
        loot: "",
        ...fields,
    };
}

// Rolls a dice formula like "2d6 + 2", "3d8-1" or "d20". Null if it isn't one.
export function rollFormula(formula: string, random: () => number = Math.random): number | null {
    const text = formula.replace(/\s+/g, "").toLowerCase();
    if (!/^[+-]?(\d*d\d+|\d+)([+-](\d*d\d+|\d+))*$/.test(text)) return null;
    let total = 0;
    for (const [, sign, term] of text.matchAll(/([+-]?)(\d*d\d+|\d+)/g)) {
        let value = 0;
        if (term.includes("d")) {
            const [count, sides] = term.split("d").map((n) => Number(n || 1));
            if (count > 100 || sides < 1) return null;
            for (let i = 0; i < count; i++) value += Math.floor(random() * sides) + 1;
        } else {
            value = Number(term);
        }
        total += sign === "-" ? -value : value;
    }
    return total;
}

// Copies of a monster for an encounter, named so they don't clash ("Goblin",
// "Goblin 2"...). With rollHp and valid hit dice, each copy rolls its own HP.
export function combatantsFromMonster(monster: Monster, count: number, takenNames: string[], rollHp = false, random: () => number = Math.random): Combatant[] {
    const added: Combatant[] = [];
    const name = monster.name.trim() || "Monster";
    for (let i = 0; i < Math.min(20, Math.max(1, count)); i++) {
        const taken = [...takenNames, ...added.map((c) => c.name)];
        const rolled = rollHp ? rollFormula(monster.hpDice, random) : null;
        added.push(createCombatant({
            name: taken.includes(name) ? duplicateName(name, taken) : name,
            kind: "monster",
            initiativeMod: monster.initiativeMod,
            maxHp: Math.max(1, rolled ?? monster.hp),
            ac: monster.ac,
            creatureType: monster.creatureType,
            alignment: monster.alignment,
            notes: monster.traits,
            attacks: monster.attacks.map((a) => ({ ...a, id: makeId() })),
            loot: monster.loot,
        }));
    }
    return added;
}

// A combatant typed into the tracker, saved as a library monster.
export function monsterFromCombatant(c: Combatant): Monster {
    return createMonster({
        name: c.name.replace(/\s+\d+$/, "").trim() || c.name,
        creatureType: c.creatureType,
        alignment: c.alignment,
        ac: c.ac,
        hp: c.maxHp,
        initiativeMod: c.initiativeMod,
        attacks: c.attacks.map((a) => ({ ...a, id: makeId() })),
        traits: c.notes,
        loot: c.loot,
    });
}

export function removeMonster(data: DmScreenData, id: string): DmScreenData {
    const monsters = data.monsters.filter((m) => m.id !== id);
    return { ...data, monsters, activeMonsterId: data.activeMonsterId === id ? (monsters[0]?.id ?? "") : data.activeMonsterId };
}

export function monsterMatches(monster: Monster, query: string): boolean {
    return matchesQuery(query, [monster.name, monster.creatureType, monster.challenge, monster.traits]);
}

export function createLocation(fields: Partial<Location> = {}): Location {
    return { id: makeId(), name: "New location", kind: "", description: "", feature: "", npc: "", rumour: "", danger: "", notes: "", ...fields };
}

export function removeLocation(data: DmScreenData, id: string): DmScreenData {
    const location = data.locations.find((l) => l.id === id);
    const locations = data.locations.filter((l) => l.id !== id);
    return {
        ...data,
        locations,
        activeLocationId: data.activeLocationId === id ? (locations[0]?.id ?? "") : data.activeLocationId,
        // Cards that showed it stay on the board, unlinked, keeping its name.
        boards: data.boards.map((b) => ({
            ...b,
            nodes: b.nodes.map((n) => (n.locationId === id ? { ...n, locationId: undefined, title: location?.name ?? n.title } : n)),
        })),
    };
}

export function locationMatches(location: Location, query: string): boolean {
    return matchesQuery(query, [location.name, location.kind, location.description, location.notes]);
}

export function createItem(fields: Partial<Item> = {}): Item {
    return {
        id: makeId(),
        name: "New item",
        type: "other",
        rarity: "",
        value: "",
        description: "",
        stats: {},
        holder: { kind: "none" },
        ...fields,
    };
}

export function createNote(fields: Partial<Note> = {}, now = Date.now()): Note {
    return { id: makeId(), title: "New note", body: "", pinned: false, updatedAt: now, ...fields };
}

export function createBoard(name = "New story board"): NamedBoard {
    return { id: makeId(), name, nodes: [], links: [], view: { x: 0, y: 0, zoom: 1 } };
}

export function createDefaultData(): DmScreenData {
    const encounter = createEncounter("First encounter");
    const board = createBoard("Story board");
    const map = createMap("First map");
    return {
        version: 1,
        encounters: [encounter],
        activeEncounterId: encounter.id,
        boards: [board],
        activeBoardId: board.id,
        npcs: [],
        activeNpcId: "",
        players: [],
        activePlayerId: "",
        locations: [],
        activeLocationId: "",
        monsters: [],
        activeMonsterId: "",
        calendar: createCalendar(),
        settings: DEFAULT_SETTINGS,
        items: [],
        activeItemId: "",
        notes: [],
        activeNoteId: "",
        maps: [map],
        activeMapId: map.id,
    };
}

// =====================================
// Encounter tracker
// =====================================

function clamp(value: number, min: number, max: number) {
    return Math.min(max, Math.max(min, value));
}

// Highest initiative first; ties go to the higher modifier, then by name.
export function sortCombatants(combatants: Combatant[]): Combatant[] {
    return [...combatants].sort((a, b) =>
        b.initiative - a.initiative
        || b.initiativeMod - a.initiativeMod
        || a.name.localeCompare(b.name)
    );
}

// Damage is taken from temporary HP first. HP never goes below 0.
export function applyDamage(combatant: Combatant, amount: number): Combatant {
    const damage = Math.max(0, Math.trunc(amount));
    const fromTemp = Math.min(combatant.tempHp, damage);
    return {
        ...combatant,
        tempHp: combatant.tempHp - fromTemp,
        hp: clamp(combatant.hp - (damage - fromTemp), 0, combatant.maxHp),
    };
}

export function applyHeal(combatant: Combatant, amount: number): Combatant {
    const heal = Math.max(0, Math.trunc(amount));
    return { ...combatant, hp: clamp(combatant.hp + heal, 0, combatant.maxHp) };
}

export function isDown(combatant: Combatant) {
    return combatant.maxHp > 0 && combatant.hp <= 0;
}

export type EncounterOutcome = "pcs" | "monsters";

export const OUTCOME_LABELS: Record<EncounterOutcome, string> = {
    pcs: "PCs won",
    monsters: "Monsters won",
};

// The fight is over once one side is all down. PCs fight monsters; NPCs can be
// on either side, so they don't decide it. Null while both sides are standing.
export function encounterOutcome(encounter: Encounter): EncounterOutcome | null {
    if (encounter.result) return encounter.result.outcome === "won" ? "pcs" : "monsters";
    const pcs = encounter.combatants.filter((c) => c.kind === "pc");
    const monsters = encounter.combatants.filter((c) => c.kind === "monster");
    if (pcs.length === 0 || monsters.length === 0) return null;
    if (monsters.every(isDown)) return "pcs";
    if (pcs.every(isDown)) return "monsters";
    return null;
}

// Moves the turn to the next combatant in initiative order. Wrapping past the
// last combatant starts a new round.
export function nextTurn(encounter: Encounter): Encounter {
    const order = sortCombatants(encounter.combatants);
    if (order.length === 0) return { ...encounter, turnId: null };

    const index = order.findIndex((c) => c.id === encounter.turnId);
    if (index === -1) return { ...encounter, turnId: order[0].id, round: Math.max(1, encounter.round) };

    const wraps = index === order.length - 1;
    return {
        ...encounter,
        turnId: order[wraps ? 0 : index + 1].id,
        round: encounter.round + (wraps ? 1 : 0),
    };
}

export function previousTurn(encounter: Encounter): Encounter {
    const order = sortCombatants(encounter.combatants);
    if (order.length === 0) return { ...encounter, turnId: null };

    const index = order.findIndex((c) => c.id === encounter.turnId);
    if (index === -1) return { ...encounter, turnId: order[order.length - 1].id };
    if (index === 0) {
        // Stepping back from the top of round 1 just clears the turn.
        if (encounter.round <= 1) return { ...encounter, turnId: null, round: 1 };
        return { ...encounter, turnId: order[order.length - 1].id, round: encounter.round - 1 };
    }
    return { ...encounter, turnId: order[index - 1].id };
}

export function rollD20(random: () => number = Math.random) {
    return Math.floor(random() * 20) + 1;
}

// Rolls d20 + modifier for everyone, or only for non-player combatants.
export function rollInitiative(
    encounter: Encounter,
    scope: "all" | "non-pc",
    random: () => number = Math.random
): Encounter {
    return {
        ...encounter,
        combatants: encounter.combatants.map((c) =>
            scope === "non-pc" && c.kind === "pc"
                ? c
                : { ...c, initiative: rollD20(random) + c.initiativeMod }
        ),
    };
}

// "Goblin" -> "Goblin 2", "Goblin 2" -> next free number for that base name.
export function duplicateName(name: string, existing: string[]): string {
    const base = name.replace(/\s+\d+$/, "").trim() || name;
    const pattern = new RegExp(`^${base.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}(?:\\s+(\\d+))?$`);
    const highest = existing.reduce((max, other) => {
        const match = other.trim().match(pattern);
        if (!match) return max;
        return Math.max(max, match[1] ? Number(match[1]) : 1);
    }, 0);
    return `${base} ${Math.max(2, highest + 1)}`;
}

export function duplicateCombatant(encounter: Encounter, id: string): Encounter {
    const source = encounter.combatants.find((c) => c.id === id);
    if (!source) return encounter;
    const copy: Combatant = {
        ...source,
        id: makeId(),
        name: duplicateName(source.name, encounter.combatants.map((c) => c.name)),
        hp: source.maxHp,
        tempHp: 0,
        conditions: [],
        // A copy of a player character is someone else; it stops sharing with the sheet.
        playerId: undefined,
    };
    const index = encounter.combatants.findIndex((c) => c.id === id);
    const combatants = [...encounter.combatants];
    combatants.splice(index + 1, 0, copy);
    return { ...encounter, combatants };
}

export function removeCombatant(encounter: Encounter, id: string): Encounter {
    if (encounter.turnId !== id) {
        return { ...encounter, combatants: encounter.combatants.filter((c) => c.id !== id) };
    }
    // Hand the turn to whoever is next before removing the active combatant.
    const order = sortCombatants(encounter.combatants);
    const index = order.findIndex((c) => c.id === id);
    const next = order.length > 1 ? order[(index + 1) % order.length].id : null;
    return { ...encounter, turnId: next, combatants: encounter.combatants.filter((c) => c.id !== id) };
}

export function toggleCondition(combatant: Combatant, condition: string): Combatant {
    const name = condition.trim();
    if (!name) return combatant;
    const has = combatant.conditions.some((c) => c.toLowerCase() === name.toLowerCase());
    return {
        ...combatant,
        conditions: has
            ? combatant.conditions.filter((c) => c.toLowerCase() !== name.toLowerCase())
            : [...combatant.conditions, name],
    };
}

// =====================================
// Story board
// =====================================

// Adds a connection unless it would link a node to itself or repeat an
// existing connection in the same direction.
export function addLink(board: Board, from: string, to: string): Board {
    if (from === to) return board;
    const ids = new Set(board.nodes.map((n) => n.id));
    if (!ids.has(from) || !ids.has(to)) return board;
    if (board.links.some((l) => l.from === from && l.to === to)) return board;
    return { ...board, links: [...board.links, { id: makeId(), from, to, label: "" }] };
}

export function removeNode(board: Board, id: string): Board {
    return {
        ...board,
        nodes: board.nodes.filter((n) => n.id !== id),
        links: board.links.filter((l) => l.from !== id && l.to !== id),
    };
}

export function removeLink(board: Board, id: string): Board {
    return { ...board, links: board.links.filter((l) => l.id !== id) };
}

// ---- Branch choices ---------------------------------------------------------
//
// A card with two or more outgoing connections is a choice. Ticking one of its
// branches ("the players did this") greys out the other branches from that
// card, and everything that can only be reached through them.

export interface BranchState {
    // Cards that are one of several branches from the same card, and so can be ticked.
    choices: Set<string>;
    // Cards and connections the story no longer reaches.
    greyNodes: Set<string>;
    greyLinks: Set<string>;
}

export function branchState(board: Board): BranchState {
    const taken = new Set(board.nodes.filter((n) => n.taken).map((n) => n.id));
    const outgoing = new Map<string, BoardLink[]>();
    board.links.forEach((link) => {
        outgoing.set(link.from, [...(outgoing.get(link.from) ?? []), link]);
    });

    const choices = new Set<string>();
    const rejected = new Set<string>();
    outgoing.forEach((links) => {
        if (links.length < 2) return;
        links.forEach((link) => choices.add(link.to));
        if (!links.some((link) => taken.has(link.to))) return;
        links.forEach((link) => {
            if (!taken.has(link.to)) rejected.add(link.id);
        });
    });

    // Everything downstream of a branch that wasn't taken...
    const greyNodes = new Set<string>();
    const queue = board.links.filter((l) => rejected.has(l.id)).map((l) => l.to);
    while (queue.length > 0) {
        const id = queue.pop()!;
        if (greyNodes.has(id) || taken.has(id)) continue;
        greyNodes.add(id);
        (outgoing.get(id) ?? []).forEach((link) => queue.push(link.to));
    }

    // ...except cards still reached by a path that is still open (branches
    // that join up again). Repeat until nothing changes, for chains.
    let changed = true;
    while (changed) {
        changed = false;
        board.links.forEach((link) => {
            if (greyNodes.has(link.to) && !rejected.has(link.id) && !greyNodes.has(link.from)) {
                greyNodes.delete(link.to);
                changed = true;
            }
        });
    }

    const greyLinks = new Set(
        board.links.filter((l) => rejected.has(l.id) || greyNodes.has(l.from)).map((l) => l.id)
    );
    return { choices, greyNodes, greyLinks };
}

export function toggleTaken(board: Board, id: string): Board {
    return {
        ...board,
        nodes: board.nodes.map((n) => {
            if (n.id !== id) return n;
            const { taken, ...rest } = n;
            return taken ? rest : { ...rest, taken: true };
        }),
    };
}

export function clearTaken(board: Board): Board {
    return {
        ...board,
        nodes: board.nodes.map((n) => (n.taken ? toggleTaken({ ...board, nodes: [n] }, n.id).nodes[0] : n)),
    };
}

// ---- Ending and resuming a story --------------------------------------------
//
// An End story card saves what happened on its board: every card leading to
// it that the story still reaches (not greyed out), in story order. A Resume
// story card on another board shows that recap.

export function storyRecap(data: DmScreenData, board: NamedBoard, endId: string): StoryRecap {
    const { greyNodes } = branchState(board);
    const nodeById = new Map(board.nodes.map((n) => [n.id, n]));

    // Everything with a path to the end card...
    const reached = new Set<string>();
    const queue = [endId];
    while (queue.length > 0) {
        const id = queue.pop()!;
        board.links.forEach((link) => {
            if (link.to !== id || reached.has(link.from) || link.from === endId) return;
            reached.add(link.from);
            queue.push(link.from);
        });
    }
    // ...or, for an end card that isn't connected yet, the whole board.
    const pool = reached.size > 0
        ? board.nodes.filter((n) => reached.has(n.id))
        : board.nodes.filter((n) => n.id !== endId && n.kind !== "end");
    const inStory = new Set(pool.filter((n) => !greyNodes.has(n.id)).map((n) => n.id));
    const links = board.links.filter((l) => inStory.has(l.from) && inStory.has(l.to));

    // Story order: a card comes after the cards leading to it. Cards that
    // are ready at the same time go left to right, as they're laid out.
    const waiting = new Map([...inStory].map((id) => [id, links.filter((l) => l.to === id).length]));
    const order: BoardNode[] = [];
    while (waiting.size > 0) {
        let ready = [...waiting].filter(([, count]) => count === 0).map(([id]) => nodeById.get(id)!);
        // A loop: carry on from its leftmost card.
        if (ready.length === 0) ready = [...waiting.keys()].map((id) => nodeById.get(id)!);
        const next = ready.reduce((a, b) => (b.x < a.x || (b.x === a.x && b.y < a.y) ? b : a));
        order.push(next);
        waiting.delete(next.id);
        links.forEach((l) => {
            if (l.from === next.id && waiting.has(l.to)) waiting.set(l.to, waiting.get(l.to)! - 1);
        });
    }

    const title = (node: BoardNode) => cardTitle(data, node) || "Untitled";
    const steps = order.map((node): RecapStep => {
        const incoming = links.filter((l) => l.to === node.id);
        const passedOver = node.taken
            ? board.links
                .filter((l) => incoming.some((i) => i.from === l.from) && l.to !== node.id && !nodeById.get(l.to)?.taken)
                .map((l) => title(nodeById.get(l.to)!))
            : [];
        const details: string[] = [];
        const encounter = data.encounters.find((e) => e.id === node.encounterId);
        if (encounter) {
            const outcome = encounterOutcome(encounter);
            details.push(`⚔ ${encounter.name || "Untitled"}${outcome ? `: ${OUTCOME_LABELS[outcome]}` : ""}`);
        }
        if (node.skipped && node.skipMinutes) details.push(`⏩ Skipped ${formatDuration(node.skipMinutes)}`);
        if (node.kind === "resume") {
            const from = data.boards.find((b) => b.id === node.resumeBoardId);
            if (from) details.push(`↪ Carried on from ${from.name || "Untitled"}`);
        }
        return {
            kind: node.kind,
            title: title(node),
            text: linkedNote(data, node)?.body ?? node.text,
            via: incoming.find((l) => l.label.trim())?.label.trim() ?? "",
            taken: !!node.taken,
            passedOver,
            details,
        };
    });

    return {
        boardName: board.name || "Untitled",
        endedAt: Date.now(),
        endedOn: formatDate(data.calendar, data.calendar.today),
        steps,
    };
}

// Saves the recap on an End story card on the open board.
export function endStory(data: DmScreenData, nodeId: string): DmScreenData {
    const recap = storyRecap(data, activeBoard(data), nodeId);
    return updateActiveBoard(data, (b) => ({
        ...b,
        nodes: b.nodes.map((n) => (n.id === nodeId ? { ...n, recap } : n)),
    }));
}

// The most recently ended story on a board, for Resume story cards.
export function latestRecap(data: DmScreenData, boardId: string | undefined): StoryRecap | null {
    const board = data.boards.find((b) => b.id === boardId);
    const recaps = (board?.nodes ?? []).flatMap((n) => (n.kind === "end" && n.recap ? [n.recap] : []));
    return recaps.reduce<StoryRecap | null>((latest, r) => (!latest || r.endedAt > latest.endedAt ? r : latest), null);
}

// ---- Several story boards

export function activeBoard(data: DmScreenData): NamedBoard {
    return data.boards.find((b) => b.id === data.activeBoardId) ?? data.boards[0];
}

export function updateActiveBoard(data: DmScreenData, change: (current: Board) => Board): DmScreenData {
    const id = activeBoard(data).id;
    return { ...data, boards: data.boards.map((b) => (b.id === id ? { ...b, ...change(b) } : b)) };
}

// Removes a board; the last one is replaced by an empty board so there's always one.
export function removeBoard(data: DmScreenData, id: string): DmScreenData {
    // Resume story cards that carried on from it stop pointing at it.
    const boards = data.boards
        .filter((b) => b.id !== id)
        .map((b) => (b.nodes.some((n) => n.resumeBoardId === id)
            ? { ...b, nodes: b.nodes.map((n) => (n.resumeBoardId === id ? { ...n, resumeBoardId: undefined } : n)) }
            : b));
    if (boards.length === 0) boards.push(createBoard("Story board"));
    const activeBoardId = boards.some((b) => b.id === data.activeBoardId) ? data.activeBoardId : boards[0].id;
    return { ...data, boards, activeBoardId };
}

// ---- NPCs

export function removeNpc(data: DmScreenData, id: string): DmScreenData {
    const npcs = data.npcs.filter((n) => n.id !== id);
    return {
        ...data,
        npcs,
        activeNpcId: data.activeNpcId === id ? (npcs[0]?.id ?? "") : data.activeNpcId,
        // Cards that showed this NPC stay on the board, unlinked.
        boards: data.boards.map((b) => ({
            ...b,
            nodes: b.nodes.map((n) => (n.npcId === id ? { ...n, npcId: undefined } : n)),
        })),
        // What they carried is left without a holder, rather than lost.
        items: data.items.map((item) =>
            item.holder.kind === "npc" && item.holder.npcId === id ? { ...item, holder: { kind: "none" } } : item
        ),
        // Combatants keep their attacks and loot, but stop sharing them.
        encounters: data.encounters.map((e) => ({
            ...e,
            combatants: e.combatants.map((c) => (c.npcId === id ? { ...c, npcId: undefined } : c)),
        })),
    };
}

// The NPC a card is linked to, if it still exists.
export function linkedNpc(data: DmScreenData, node: BoardNode): Npc | undefined {
    return node.npcId ? data.npcs.find((n) => n.id === node.npcId) : undefined;
}

// The item a card is linked to, if it still exists.
export function linkedItem(data: DmScreenData, node: BoardNode): Item | undefined {
    return node.itemId ? data.items.find((i) => i.id === node.itemId) : undefined;
}

// A card linked to an NPC or item is titled with its name; otherwise its own title.
// The note a card is linked to, if it still exists.
export function linkedNote(data: DmScreenData, node: BoardNode): Note | undefined {
    return node.noteId ? data.notes.find((n) => n.id === node.noteId) : undefined;
}

export function linkedLocation(data: DmScreenData, node: BoardNode): Location | undefined {
    return node.locationId ? data.locations.find((l) => l.id === node.locationId) : undefined;
}

export function linkedEvent(data: DmScreenData, node: BoardNode): CalendarEvent | undefined {
    return node.eventId ? data.calendar.events.find((e) => e.id === node.eventId) : undefined;
}

// Cards on any board linked to this location, for "On the story board" on its sheet.
export function locationCards(data: DmScreenData, locationId: string): { board: NamedBoard; node: BoardNode }[] {
    return data.boards.flatMap((board) => board.nodes.filter((n) => n.locationId === locationId).map((node) => ({ board, node })));
}

export function eventCards(data: DmScreenData, eventId: string): { board: NamedBoard; node: BoardNode }[] {
    return data.boards.flatMap((board) => board.nodes.filter((n) => n.eventId === eventId).map((node) => ({ board, node })));
}

// Deleting a calendar event leaves its cards on the board, unlinked, with its title.
export function removeEvent(data: DmScreenData, id: string): DmScreenData {
    const event = data.calendar.events.find((e) => e.id === id);
    return {
        ...data,
        calendar: {
            ...data.calendar,
            events: data.calendar.events.filter((e) => e.id !== id),
            passed: data.calendar.passed.filter((x) => x !== id),
        },
        boards: data.boards.map((b) => ({
            ...b,
            nodes: b.nodes.map((n) => (n.eventId === id ? { ...n, eventId: undefined, title: event?.title ?? n.title } : n)),
        })),
    };
}

export function cardTitle(data: DmScreenData, node: BoardNode): string {
    return linkedNpc(data, node)?.name ?? linkedItem(data, node)?.name ?? linkedNote(data, node)?.title
        ?? linkedLocation(data, node)?.name ?? linkedEvent(data, node)?.title ?? node.title;
}

// ---- Notes

// Pinned first, then the most recently edited.
export function sortedNotes(notes: Note[]): Note[] {
    return [...notes].sort((a, b) => Number(b.pinned) - Number(a.pinned) || b.updatedAt - a.updatedAt);
}

export function updateNote(data: DmScreenData, id: string, fields: Partial<Omit<Note, "id" | "updatedAt">>, now = Date.now()): DmScreenData {
    return { ...data, notes: data.notes.map((n) => (n.id === id ? { ...n, ...fields, updatedAt: now } : n)) };
}

// Cards linked to the note stay on the board, unlinked, and keep its text so
// nothing written there disappears with it.
export function removeNote(data: DmScreenData, id: string): DmScreenData {
    const note = data.notes.find((n) => n.id === id);
    const notes = data.notes.filter((n) => n.id !== id);
    return {
        ...data,
        notes,
        activeNoteId: data.activeNoteId === id ? (sortedNotes(notes)[0]?.id ?? "") : data.activeNoteId,
        boards: data.boards.map((b) => ({
            ...b,
            nodes: b.nodes.map((n) => (n.noteId === id
                ? { ...n, noteId: undefined, title: note?.title ?? n.title, text: note?.body ?? n.text }
                : n)),
        })),
    };
}

export function noteCards(data: DmScreenData, noteId: string): { board: NamedBoard; node: BoardNode }[] {
    return data.boards.flatMap((board) => board.nodes.filter((n) => n.noteId === noteId).map((node) => ({ board, node })));
}

// ---- Search

// True when every word of the query appears somewhere in the texts, ignoring case.
function matchesQuery(query: string, texts: string[]): boolean {
    const words = query.toLowerCase().split(/\s+/).filter(Boolean);
    const haystack = texts.join("\n").toLowerCase();
    return words.every((word) => haystack.includes(word));
}

export function npcMatches(npc: Npc, query: string): boolean {
    return matchesQuery(query, [npc.name, npc.race, npc.alignment, npc.location, npc.notes]);
}

export function playerMatches(player: Player, query: string): boolean {
    return matchesQuery(query, [player.name, player.playerName, player.ancestryClass, player.notes]);
}

export function noteMatches(note: Note, query: string): boolean {
    return matchesQuery(query, [note.title, note.body]);
}

// Searches the name, type, rarity, who has it, description and stats,
// so "rare", "with the party", "slashing" or "Vex" all work.
export function itemMatches(data: DmScreenData, item: Item, query: string): boolean {
    return matchesQuery(query, [
        item.name,
        itemTypeLabel(item.type),
        rarityLabel(item.rarity),
        item.value,
        holderLabel(data, item.holder),
        item.description,
        ...ITEM_STAT_FIELDS[item.type].map((f) => statOption(item.type, f.key, item.stats[f.key] ?? "")),
    ]);
}

// ---- Items

export function removeItem(data: DmScreenData, id: string): DmScreenData {
    const items = data.items.filter((i) => i.id !== id);
    return {
        ...data,
        items,
        activeItemId: data.activeItemId === id ? (items[0]?.id ?? "") : data.activeItemId,
        boards: data.boards.map((b) => ({
            ...b,
            nodes: b.nodes.map((n) => (n.itemId === id ? { ...n, itemId: undefined } : n)),
        })),
    };
}

export function itemCards(data: DmScreenData, itemId: string): { board: NamedBoard; node: BoardNode }[] {
    return data.boards.flatMap((board) => board.nodes.filter((n) => n.itemId === itemId).map((node) => ({ board, node })));
}

export function itemsHeldBy(data: DmScreenData, npcId: string): Item[] {
    return data.items.filter((i) => i.holder.kind === "npc" && i.holder.npcId === npcId);
}

// Switching holder kind keeps nothing from the old holder.
export function holderOfKind(kind: ItemHolderKind, data: DmScreenData): ItemHolder {
    if (kind === "npc") return { kind, npcId: data.npcs[0]?.id ?? "" };
    if (kind === "location") return { kind, name: "" };
    if (kind === "party") return { kind, character: "" };
    return { kind: "none" };
}

// "With the party (Mira)", "Held by Vex", "At the Tavern", "Not found yet".
export function holderLabel(data: DmScreenData, holder: ItemHolder): string {
    switch (holder.kind) {
        case "npc": {
            const npc = data.npcs.find((n) => n.id === holder.npcId);
            return npc ? `Held by ${npc.name || "an unnamed NPC"}` : "Held by an NPC";
        }
        case "location":
            return holder.name.trim() ? `At ${holder.name.trim()}` : "At a location";
        case "party":
            return holder.character.trim() ? `With the party (${holder.character.trim()})` : "With the party";
        default:
            return "Not found yet";
    }
}

// Every story board card linked to an NPC, with the board it's on.
export function npcCards(data: DmScreenData, npcId: string): { board: NamedBoard; node: BoardNode }[] {
    return data.boards.flatMap((board) => board.nodes.filter((n) => n.npcId === npcId).map((node) => ({ board, node })));
}

// Titles of Location cards on every board, as suggestions for an NPC's location.
export function locationNames(data: DmScreenData): string[] {
    const names = [
        ...data.boards.flatMap((b) => b.nodes.filter((n) => n.kind === "location").map((n) => n.title.trim())),
        ...data.locations.map((l) => l.name.trim()),
    ];
    return [...new Set(names.filter(Boolean))].sort((a, b) => a.localeCompare(b));
}

// Cards on every board that pointed at a deleted encounter stop pointing at it.
export function unlinkEncounter(data: DmScreenData, encounterId: string): DmScreenData {
    return {
        ...data,
        boards: data.boards.map((b) => ({
            ...b,
            nodes: b.nodes.map((n) => (n.encounterId === encounterId ? { ...n, encounterId: undefined } : n)),
        })),
    };
}

// Zooms around a point on screen (relative to the board), keeping the world
// position under that point fixed.
export function zoomAt(view: BoardView, factor: number, screenX: number, screenY: number): BoardView {
    const zoom = clamp(view.zoom * factor, ZOOM_MIN, ZOOM_MAX);
    const worldX = (screenX - view.x) / view.zoom;
    const worldY = (screenY - view.y) / view.zoom;
    return { zoom, x: screenX - worldX * zoom, y: screenY - worldY * zoom };
}

// =====================================
// Loading and validation
// =====================================

const isObject = (value: unknown): value is Record<string, unknown> =>
    typeof value === "object" && value !== null && !Array.isArray(value);

const str = (value: unknown, fallback = "") => (typeof value === "string" ? value : fallback);
const num = (value: unknown, fallback = 0) =>
    typeof value === "number" && Number.isFinite(value) ? value : fallback;

function normalizeAttacks(value: unknown): Attack[] {
    if (!Array.isArray(value)) return [];
    return value.filter(isObject).map((a) => ({
        id: str(a.id) || makeId(),
        kind: a.kind === "magic" ? "magic" : "weapon",
        name: str(a.name),
        hit: str(a.hit),
        damage: str(a.damage),
        range: str(a.range),
    }));
}

function normalizeCombatant(value: unknown): Combatant | null {
    if (!isObject(value)) return null;
    const kind = COMBATANT_KINDS.some((k) => k.value === value.kind) ? (value.kind as CombatantKind) : "monster";
    const maxHp = Math.max(0, Math.trunc(num(value.maxHp)));
    return {
        id: str(value.id) || makeId(),
        name: str(value.name, "Unnamed"),
        kind,
        initiative: Math.trunc(num(value.initiative)),
        initiativeMod: Math.trunc(num(value.initiativeMod)),
        maxHp,
        hp: clamp(Math.trunc(num(value.hp, maxHp)), 0, maxHp),
        tempHp: Math.max(0, Math.trunc(num(value.tempHp))),
        ac: str(value.ac),
        creatureType: str(value.creatureType),
        alignment: str(value.alignment),
        conditions: Array.isArray(value.conditions) ? value.conditions.filter((c): c is string => typeof c === "string") : [],
        notes: str(value.notes),
        attacks: normalizeAttacks(value.attacks),
        loot: str(value.loot),
        trackers: normalizeTrackers(value.trackers),
        deathSaves: normalizeDeathSaves(value.deathSaves),
        // Checked against the NPCs and players once they're loaded, in normalizeData.
        ...(str(value.npcId) ? { npcId: str(value.npcId) } : {}),
        ...(str(value.playerId) ? { playerId: str(value.playerId) } : {}),
    };
}

function normalizeDeathSaves(value: unknown): DeathSaves {
    if (!isObject(value)) return NO_DEATH_SAVES;
    return {
        successes: clamp(Math.trunc(num(value.successes)), 0, 3),
        failures: clamp(Math.trunc(num(value.failures)), 0, 3),
    };
}

function normalizeTrackers(value: unknown): Tracker[] {
    if (!Array.isArray(value)) return [];
    return value.filter(isObject).map((t) => {
        const max = typeof t.max === "number" && Number.isFinite(t.max) ? Math.max(0, Math.trunc(t.max)) : null;
        const resets = TRACKER_RESETS.some((r) => r.value === t.resets) ? (t.resets as TrackerReset) : "none";
        const tracker = { id: str(t.id) || makeId(), name: str(t.name), value: 0, max, resets, notes: str(t.notes) };
        return stepTracker(tracker, Math.trunc(num(t.value)));
    });
}

// Saves from before losses were tracked have `victories`, which are all wins.
function normalizeResults(value: Record<string, unknown>): EncounterResult[] {
    const list = Array.isArray(value.results) ? value.results : Array.isArray(value.victories) ? value.victories : [];
    return list.filter(isObject).map((r) => ({
        encounterId: str(r.encounterId),
        name: str(r.name, "Untitled"),
        outcome: r.outcome === "lost" ? "lost" : "won",
        round: Math.max(1, Math.trunc(num(r.round, 1))),
        at: num(r.at),
    }));
}

function normalizePlayer(value: unknown): Player | null {
    if (!isObject(value)) return null;
    const maxHp = Math.max(0, Math.trunc(num(value.maxHp)));
    const player: Player = {
        id: str(value.id) || makeId(),
        name: str(value.name, "Unnamed"),
        playerName: str(value.playerName),
        ancestryClass: str(value.ancestryClass),
        level: str(value.level),
        ac: str(value.ac),
        maxHp,
        hp: clamp(Math.trunc(num(value.hp, maxHp)), 0, maxHp),
        tempHp: Math.max(0, Math.trunc(num(value.tempHp))),
        initiativeMod: Math.trunc(num(value.initiativeMod)),
        passive: str(value.passive),
        speed: str(value.speed),
        trackers: normalizeTrackers(value.trackers),
        deathSaves: normalizeDeathSaves(value.deathSaves),
        results: normalizeResults(value),
        notes: str(value.notes),
    };
    const image = str(value.image);
    if (image.startsWith("data:image/")) player.image = image;
    return player;
}

function normalizeEncounter(value: unknown): Encounter | null {
    if (!isObject(value)) return null;
    const combatants = Array.isArray(value.combatants)
        ? value.combatants.map(normalizeCombatant).filter((c): c is Combatant => c !== null)
        : [];
    const turnId = str(value.turnId);
    const encounter: Encounter = {
        id: str(value.id) || makeId(),
        name: str(value.name, "Encounter"),
        round: Math.max(1, Math.trunc(num(value.round, 1))),
        turnId: combatants.some((c) => c.id === turnId) ? turnId : null,
        combatants,
    };
    // Saves from before losses were tracked have `won` instead.
    const result = isObject(value.result) ? value.result : isObject(value.won) ? { ...value.won, outcome: "won" } : null;
    if (result) {
        encounter.result = {
            outcome: result.outcome === "lost" ? "lost" : "won",
            at: num(result.at),
            round: Math.max(1, Math.trunc(num(result.round, 1))),
            by: Array.isArray(result.by) ? result.by.filter((n): n is string => typeof n === "string") : [],
        };
    }
    return encounter;
}

function normalizeNode(value: unknown): BoardNode | null {
    if (!isObject(value)) return null;
    const kind = NODE_KINDS.some((k) => k.value === value.kind) ? (value.kind as NodeKind) : "note";
    const node: BoardNode = {
        id: str(value.id) || makeId(),
        kind,
        title: str(value.title, "Untitled"),
        text: str(value.text),
        x: num(value.x),
        y: num(value.y),
    };
    const encounterId = str(value.encounterId);
    if (encounterId) node.encounterId = encounterId;
    const npcId = str(value.npcId);
    if (npcId) node.npcId = npcId;
    const itemId = str(value.itemId);
    if (itemId) node.itemId = itemId;
    const noteId = str(value.noteId);
    if (noteId) node.noteId = noteId;
    const locationId = str(value.locationId);
    if (locationId) node.locationId = locationId;
    const eventId = str(value.eventId);
    if (eventId) node.eventId = eventId;
    const travelDistance = num(value.travelDistance);
    if (travelDistance > 0) node.travelDistance = travelDistance;
    if (value.travelUnit === "km" || value.travelUnit === "mi") node.travelUnit = value.travelUnit;
    const travelMode = str(value.travelMode);
    if (TRAVEL_MODES.some((m) => m.id === travelMode)) node.travelMode = travelMode;
    const skipMinutes = Math.trunc(num(value.skipMinutes));
    if (skipMinutes > 0) node.skipMinutes = skipMinutes;
    if (value.skipped === true && skipMinutes > 0) node.skipped = true;
    const image = str(value.image);
    if (image.startsWith("data:image/")) node.image = image;
    if (value.taken === true) node.taken = true;
    const recap = normalizeRecap(value.recap);
    if (recap && kind === "end") node.recap = recap;
    const resumeBoardId = str(value.resumeBoardId);
    if (resumeBoardId && kind === "resume") node.resumeBoardId = resumeBoardId;
    return node;
}

function normalizeRecap(value: unknown): StoryRecap | null {
    if (!isObject(value) || !Array.isArray(value.steps)) return null;
    return {
        boardName: str(value.boardName, "Untitled"),
        endedAt: num(value.endedAt),
        endedOn: str(value.endedOn),
        steps: value.steps.filter(isObject).map((step) => ({
            kind: NODE_KINDS.some((k) => k.value === step.kind) ? (step.kind as NodeKind) : "note",
            title: str(step.title, "Untitled"),
            text: str(step.text),
            via: str(step.via),
            taken: step.taken === true,
            passedOver: Array.isArray(step.passedOver) ? step.passedOver.map((p) => str(p)).filter(Boolean) : [],
            details: Array.isArray(step.details) ? step.details.map((d) => str(d)).filter(Boolean) : [],
        })),
    };
}

function normalizeBoard(value: unknown): Board {
    const source = isObject(value) ? value : {};
    const nodes = Array.isArray(source.nodes)
        ? source.nodes.map(normalizeNode).filter((n): n is BoardNode => n !== null)
        : [];
    const view = isObject(source.view) ? source.view : {};

    let board: Board = {
        nodes,
        links: [],
        view: { x: num(view.x), y: num(view.y), zoom: clamp(num(view.zoom, 1), ZOOM_MIN, ZOOM_MAX) },
    };

    // Re-add links through addLink so dangling and duplicate links are dropped.
    if (Array.isArray(source.links)) {
        source.links.forEach((link) => {
            if (!isObject(link)) return;
            const before = board.links.length;
            board = addLink(board, str(link.from), str(link.to));
            if (board.links.length > before) {
                const added = board.links[board.links.length - 1];
                added.id = str(link.id) || added.id;
                added.label = str(link.label);
            }
        });
    }
    return board;
}

function normalizeNpc(value: unknown): Npc | null {
    if (!isObject(value)) return null;
    const maxHp = Math.max(0, Math.trunc(num(value.maxHp)));
    const npc: Npc = {
        id: str(value.id) || makeId(),
        name: str(value.name, "Unnamed"),
        race: str(value.race),
        alignment: str(value.alignment),
        ac: str(value.ac),
        maxHp,
        hp: clamp(Math.trunc(num(value.hp, maxHp)), 0, maxHp),
        location: str(value.location),
        notes: str(value.notes),
        attacks: normalizeAttacks(value.attacks),
        loot: str(value.loot),
    };
    const image = str(value.image);
    if (image.startsWith("data:image/")) npc.image = image;
    return npc;
}

function normalizeMonster(value: unknown): Monster | null {
    if (!isObject(value)) return null;
    const monster: Monster = {
        id: str(value.id) || makeId(),
        name: str(value.name, "Unnamed"),
        creatureType: str(value.creatureType),
        alignment: str(value.alignment),
        challenge: str(value.challenge),
        ac: str(value.ac),
        hp: Math.max(0, Math.trunc(num(value.hp, 10))),
        hpDice: str(value.hpDice),
        initiativeMod: Math.trunc(num(value.initiativeMod)),
        speed: str(value.speed),
        attacks: normalizeAttacks(value.attacks),
        traits: str(value.traits),
        loot: str(value.loot),
    };
    const image = str(value.image);
    if (image.startsWith("data:image/")) monster.image = image;
    return monster;
}

function normalizeLocation(value: unknown): Location | null {
    if (!isObject(value)) return null;
    return {
        id: str(value.id) || makeId(),
        name: str(value.name, "Unnamed"),
        kind: str(value.kind),
        description: str(value.description),
        feature: str(value.feature),
        npc: str(value.npc),
        rumour: str(value.rumour),
        danger: str(value.danger),
        notes: str(value.notes),
    };
}

function normalizeHolder(value: unknown, npcIds: Set<string>): ItemHolder {
    if (!isObject(value)) return { kind: "none" };
    if (value.kind === "npc" && npcIds.has(str(value.npcId))) return { kind: "npc", npcId: str(value.npcId) };
    if (value.kind === "location") return { kind: "location", name: str(value.name) };
    if (value.kind === "party") return { kind: "party", character: str(value.character) };
    return { kind: "none" };
}

function normalizeItem(value: unknown, npcIds: Set<string>): Item | null {
    if (!isObject(value)) return null;
    const item: Item = {
        id: str(value.id) || makeId(),
        name: str(value.name, "Unnamed"),
        type: ITEM_TYPES.some((t) => t.value === value.type) ? (value.type as ItemType) : "other",
        rarity: ITEM_RARITIES.some((r) => r.value === value.rarity) ? (value.rarity as ItemRarity) : "",
        value: str(value.value),
        description: str(value.description),
        // Only string stats; older saves have none.
        stats: isObject(value.stats)
            ? Object.fromEntries(Object.entries(value.stats).filter((entry): entry is [string, string] => typeof entry[1] === "string"))
            : {},
        holder: normalizeHolder(value.holder, npcIds),
    };
    const image = str(value.image);
    if (image.startsWith("data:image/")) item.image = image;
    return item;
}

function normalizeNote(value: unknown): Note | null {
    if (!isObject(value)) return null;
    return {
        id: str(value.id) || makeId(),
        title: str(value.title, "Untitled"),
        body: str(value.body),
        pinned: value.pinned === true,
        updatedAt: num(value.updatedAt),
    };
}

function normalizeNamedBoard(value: unknown, fallbackName: string): NamedBoard {
    const source = isObject(value) ? value : {};
    return { id: str(source.id) || makeId(), name: str(source.name, fallbackName), ...normalizeBoard(source) };
}

// Turns anything (parsed JSON, old saves, junk) into valid data, or null if
// it doesn't look like a DM screen at all.
export function normalizeData(value: unknown): DmScreenData | null {
    if (!isObject(value)) return null;
    if (!Array.isArray(value.encounters) && !isObject(value.board) && !Array.isArray(value.boards)) return null;

    const encounters = Array.isArray(value.encounters)
        ? value.encounters.map(normalizeEncounter).filter((e): e is Encounter => e !== null)
        : [];
    if (encounters.length === 0) encounters.push(createEncounter("First encounter"));

    const activeId = str(value.activeEncounterId);
    // Saves from before multiple boards have a single `board`; it becomes the first one.
    const boards = Array.isArray(value.boards)
        ? value.boards.filter(isObject).map((b, i) => normalizeNamedBoard(b, `Story board ${i + 1}`))
        : isObject(value.board) ? [normalizeNamedBoard(value.board, "Story board")] : [];
    if (boards.length === 0) boards.push(createBoard("Story board"));
    const activeBoardId = str(value.activeBoardId);

    const npcs = Array.isArray(value.npcs)
        ? value.npcs.map(normalizeNpc).filter((n): n is Npc => n !== null)
        : [];
    const activeNpcId = str(value.activeNpcId);

    // Saves from before the Players tab have none.
    const players = Array.isArray(value.players)
        ? value.players.map(normalizePlayer).filter((p): p is Player => p !== null)
        : [];
    const activePlayerId = str(value.activePlayerId);

    // Saves from before the Monsters tab have none.
    const monsters = Array.isArray(value.monsters)
        ? value.monsters.map(normalizeMonster).filter((m): m is Monster => m !== null)
        : [];
    const activeMonsterId = str(value.activeMonsterId);

    // Saves from before the Locations tab have none.
    const locations = Array.isArray(value.locations)
        ? value.locations.map(normalizeLocation).filter((l): l is Location => l !== null)
        : [];
    const activeLocationId = str(value.activeLocationId);

    const encounterIds = new Set(encounters.map((e) => e.id));
    const npcIds = new Set(npcs.map((n) => n.id));
    const playerIds = new Set(players.map((p) => p.id));
    encounters.forEach((e) => e.combatants.forEach((c) => {
        if (c.npcId && !npcIds.has(c.npcId)) delete c.npcId;
        if (c.playerId && !playerIds.has(c.playerId)) delete c.playerId;
    }));

    const items = Array.isArray(value.items)
        ? value.items.map((i) => normalizeItem(i, npcIds)).filter((i): i is Item => i !== null)
        : [];
    const activeItemId = str(value.activeItemId);
    const itemIds = new Set(items.map((i) => i.id));

    const notes = Array.isArray(value.notes)
        ? value.notes.map(normalizeNote).filter((n): n is Note => n !== null)
        : [];
    const activeNoteId = str(value.activeNoteId);
    const noteIds = new Set(notes.map((n) => n.id));
    const locationIds = new Set(locations.map((l) => l.id));
    const calendar = normalizeCalendar(value.calendar);
    const eventIds = new Set(calendar.events.map((e) => e.id));

    boards.forEach((board) => board.nodes.forEach((node) => {
        if (node.encounterId && !encounterIds.has(node.encounterId)) delete node.encounterId;
        if (node.npcId && !npcIds.has(node.npcId)) delete node.npcId;
        if (node.itemId && !itemIds.has(node.itemId)) delete node.itemId;
        if (node.noteId && !noteIds.has(node.noteId)) delete node.noteId;
        if (node.locationId && !locationIds.has(node.locationId)) delete node.locationId;
        if (node.eventId && !eventIds.has(node.eventId)) delete node.eventId;
    }));

    // Saves from before the map maker have no maps; give them an empty one.
    const maps = Array.isArray(value.maps)
        ? value.maps.map(normalizeMap).filter((m): m is BattleMap => m !== null)
        : [];
    if (maps.length === 0) maps.push(createMap("First map"));
    const activeMapId = str(value.activeMapId);

    return {
        version: 1,
        encounters,
        activeEncounterId: encounterIds.has(activeId) ? activeId : encounters[0].id,
        boards,
        activeBoardId: boards.some((b) => b.id === activeBoardId) ? activeBoardId : boards[0].id,
        npcs,
        activeNpcId: npcIds.has(activeNpcId) ? activeNpcId : (npcs[0]?.id ?? ""),
        players,
        activePlayerId: playerIds.has(activePlayerId) ? activePlayerId : (players[0]?.id ?? ""),
        monsters,
        activeMonsterId: monsters.some((m) => m.id === activeMonsterId) ? activeMonsterId : (monsters[0]?.id ?? ""),
        locations,
        activeLocationId: locations.some((l) => l.id === activeLocationId) ? activeLocationId : (locations[0]?.id ?? ""),
        calendar,
        settings: normalizeSettings(value.settings),
        items,
        activeItemId: itemIds.has(activeItemId) ? activeItemId : (items[0]?.id ?? ""),
        notes,
        activeNoteId: noteIds.has(activeNoteId) ? activeNoteId : (sortedNotes(notes)[0]?.id ?? ""),
        maps,
        activeMapId: maps.some((m) => m.id === activeMapId) ? activeMapId : maps[0].id,
    };
}

export function parseData(text: string | null): DmScreenData | null {
    if (!text) return null;
    try {
        return normalizeData(JSON.parse(text));
    }
    catch {
        return null;
    }
}
