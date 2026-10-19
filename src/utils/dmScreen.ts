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
    conditions: string[];
    notes: string;
}

export interface Encounter {
    id: string;
    name: string;
    round: number;
    // The combatant whose turn it is, or null before the first turn.
    turnId: string | null;
    combatants: Combatant[];
}

export type NodeKind = "scene" | "encounter" | "npc" | "location" | "clue" | "note" | "image";

export interface BoardNode {
    id: string;
    kind: NodeKind;
    title: string;
    text: string;
    x: number;
    y: number;
    encounterId?: string;
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

export interface DmScreenData {
    version: 1;
    encounters: Encounter[];
    activeEncounterId: string;
    board: Board;
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
    { value: "location", label: "Location" },
    { value: "clue", label: "Clue" },
    { value: "note", label: "Note" },
    { value: "image", label: "Image" },
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
        conditions: [],
        notes: "",
        ...fields,
        maxHp,
        hp: clamp(Math.trunc(fields.hp ?? maxHp), 0, maxHp),
    };
}

export function createEncounter(name = "New encounter"): Encounter {
    return { id: makeId(), name, round: 1, turnId: null, combatants: [] };
}

export function createNode(kind: NodeKind, x: number, y: number): BoardNode {
    const label = NODE_KINDS.find((k) => k.value === kind)?.label ?? "Note";
    return { id: makeId(), kind, title: `New ${label.toLowerCase()}`, text: "", x, y };
}

export function createDefaultData(): DmScreenData {
    const encounter = createEncounter("First encounter");
    const map = createMap("First map");
    return {
        version: 1,
        encounters: [encounter],
        activeEncounterId: encounter.id,
        board: { nodes: [], links: [], view: { x: 0, y: 0, zoom: 1 } },
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
        conditions: Array.isArray(value.conditions) ? value.conditions.filter((c): c is string => typeof c === "string") : [],
        notes: str(value.notes),
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

// Turns anything (parsed JSON, old saves, junk) into valid data, or null if
// it doesn't look like a DM screen at all.
export function normalizeData(value: unknown): DmScreenData | null {
    if (!isObject(value)) return null;
    if (!Array.isArray(value.encounters) && !isObject(value.board)) return null;

    const encounters = Array.isArray(value.encounters)
        ? value.encounters.map(normalizeEncounter).filter((e): e is Encounter => e !== null)
        : [];
    if (encounters.length === 0) encounters.push(createEncounter("First encounter"));

    const activeId = str(value.activeEncounterId);
    const board = normalizeBoard(value.board);
    const encounterIds = new Set(encounters.map((e) => e.id));
    board.nodes.forEach((node) => {
        if (node.encounterId && !encounterIds.has(node.encounterId)) delete node.encounterId;
    });

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
        board,
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
