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
}

export interface Encounter {
    id: string;
    name: string;
    round: number;
    // The combatant whose turn it is, or null before the first turn.
    turnId: string | null;
    combatants: Combatant[];
}

export type NodeKind = "scene" | "encounter" | "npc" | "item" | "location" | "clue" | "note" | "image";

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
    // Image cards: a downscaled data URL, small enough for localStorage.
    image?: string;
    // The players took this branch; its sibling branches are greyed out.
    taken?: boolean;
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

// One of several story boards, e.g. one per adventure or session.
export interface NamedBoard extends Board {
    id: string;
    name: string;
}

export interface DmScreenData {
    version: 1;
    encounters: Encounter[];
    activeEncounterId: string;
    boards: NamedBoard[];
    activeBoardId: string;
    npcs: Npc[];
    // The NPC open in the NPCs tab, or "" when there are none.
    activeNpcId: string;
    items: Item[];
    // The item open in the Items tab, or "" when there are none.
    activeItemId: string;
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
    { value: "clue", label: "Clue" },
    { value: "note", label: "Note" },
    { value: "image", label: "Image" },
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
    return { id: makeId(), kind, title: `New ${label.toLowerCase()}`, text: "", x, y };
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

// The NPC as a combatant for the tracker: stats, attacks and loot copied over.
// Items they carry from the Items tab are added to the loot, so it's all in one place.
export function combatantFromNpc(data: DmScreenData, npc: Npc): Combatant {
    const carried = itemsHeldBy(data, npc.id).map((i) => i.name.trim()).filter(Boolean);
    const loot = [npc.loot.trim(), carried.length ? `Carrying: ${carried.join(", ")}` : ""].filter(Boolean).join("\n");
    return createCombatant({
        name: npc.name,
        kind: "npc",
        maxHp: npc.maxHp,
        hp: npc.hp,
        ac: npc.ac,
        creatureType: npc.race,
        alignment: npc.alignment,
        notes: npc.notes,
        // Own copies, so editing the combatant mid-fight leaves the NPC sheet alone.
        attacks: npc.attacks.map((a) => ({ ...a, id: makeId() })),
        loot,
    });
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
        items: [],
        activeItemId: "",
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
    const boards = data.boards.filter((b) => b.id !== id);
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
export function cardTitle(data: DmScreenData, node: BoardNode): string {
    return linkedNpc(data, node)?.name ?? linkedItem(data, node)?.name ?? node.title;
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
    const names = data.boards.flatMap((b) => b.nodes.filter((n) => n.kind === "location").map((n) => n.title.trim()));
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
    };
}

function normalizeEncounter(value: unknown): Encounter | null {
    if (!isObject(value)) return null;
    const combatants = Array.isArray(value.combatants)
        ? value.combatants.map(normalizeCombatant).filter((c): c is Combatant => c !== null)
        : [];
    const turnId = str(value.turnId);
    return {
        id: str(value.id) || makeId(),
        name: str(value.name, "Encounter"),
        round: Math.max(1, Math.trunc(num(value.round, 1))),
        turnId: combatants.some((c) => c.id === turnId) ? turnId : null,
        combatants,
    };
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
    const image = str(value.image);
    if (image.startsWith("data:image/")) node.image = image;
    if (value.taken === true) node.taken = true;
    return node;
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

    const encounterIds = new Set(encounters.map((e) => e.id));
    const npcIds = new Set(npcs.map((n) => n.id));

    const items = Array.isArray(value.items)
        ? value.items.map((i) => normalizeItem(i, npcIds)).filter((i): i is Item => i !== null)
        : [];
    const activeItemId = str(value.activeItemId);
    const itemIds = new Set(items.map((i) => i.id));

    boards.forEach((board) => board.nodes.forEach((node) => {
        if (node.encounterId && !encounterIds.has(node.encounterId)) delete node.encounterId;
        if (node.npcId && !npcIds.has(node.npcId)) delete node.npcId;
        if (node.itemId && !itemIds.has(node.itemId)) delete node.itemId;
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
        items,
        activeItemId: itemIds.has(activeItemId) ? activeItemId : (items[0]?.id ?? ""),
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
