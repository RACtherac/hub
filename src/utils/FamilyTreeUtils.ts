import dagre from "dagre";

import type {
    FamilyFolder,
    FamilyMember,
    FamilyTreeData,
    FamilyStatistics,
    GridPosition,
} from "../types/FamilyTreeTypes";

// =====================================
// ID Generator
// =====================================

export function generateId(): string {
    return crypto.randomUUID();
}

// =====================================
// Create Empty Person
// =====================================

export function createPerson(): FamilyMember {
    const now = new Date().toISOString();

    return {
        id: generateId(),

        firstName: "",
        lastName: "",

        gender: "other",

        birthDate: "",
        deathDate: "",

        occupation: "",
        email: "",
        phone: "",

        notes: "",

        image: "",

        parents: [],
        children: [],
        spouses: [],
        exSpouses: [],
        siblings: [],
        cousins: [],

        created: now,
        updated: now,
    };
}

// =====================================
// Full Name
// =====================================

export function getFullName(person: FamilyMember): string {
    return `${person.firstName} ${person.lastName}`.trim();
}

// =====================================
// Find Person
// =====================================

export function findPerson(
    members: FamilyMember[],
    id: string
): FamilyMember | undefined {
    return members.find((m) => m.id === id);
}

// =====================================
// Add Person
// =====================================

export function addPerson(
    tree: FamilyTreeData,
    person: FamilyMember
): FamilyTreeData {
    return {
        ...tree,
        members: [...tree.members, person],
    };
}

// =====================================
// Update Person
// =====================================

export function updatePerson(
    tree: FamilyTreeData,
    updated: FamilyMember
): FamilyTreeData {
    return {
        ...tree,
        members: tree.members.map((member) =>
            member.id === updated.id
                ? {
                      ...updated,
                      updated: new Date().toISOString(),
                  }
                : member
        ),
    };
}

// =====================================
// Delete Person
// =====================================

const RELATION_KEYS = [
    "parents",
    "children",
    "spouses",
    "exSpouses",
    "siblings",
    "cousins",
] as const;

export function deletePerson(
    tree: FamilyTreeData,
    id: string
): FamilyTreeData {
    const members = tree.members
        .filter((m) => m.id !== id)
        .map((member) => {
            if (!RELATION_KEYS.some((key) => member[key].includes(id))) {
                return member;
            }

            const cleaned = { ...member };
            RELATION_KEYS.forEach((key) => {
                cleaned[key] = member[key].filter((relatedId) => relatedId !== id);
            });
            return cleaned;
        });

    const positions = tree.positions ? { ...tree.positions } : undefined;
    if (positions) delete positions[id];

    return {
        ...tree,
        members,
        folders: tree.folders?.map((folder) =>
            folder.memberIds.includes(id)
                ? { ...folder, memberIds: folder.memberIds.filter((memberId) => memberId !== id) }
                : folder
        ),
        positions,
    };
}

// =====================================
// Relationship Helpers
// =====================================

function unique(array: string[]) {
    return [...new Set(array)];
}

export function connectParentChild(
    tree: FamilyTreeData,
    parentId: string,
    childId: string
): FamilyTreeData {
    const members = tree.members.map((member) => {
        if (member.id === parentId) {
            return {
                ...member,
                children: unique([...member.children, childId]),
            };
        }

        if (member.id === childId) {
            return {
                ...member,
                parents: unique([...member.parents, parentId]),
            };
        }

        return member;
    });

    return {
        ...tree,
        members,
    };
}

export function connectSpouses(
    tree: FamilyTreeData,
    firstId: string,
    secondId: string
): FamilyTreeData {
    const members = tree.members.map((member) => {
        if (member.id === firstId) {
            return {
                ...member,
                spouses: unique([...member.spouses.filter((id) => id !== secondId), secondId]),
                exSpouses: member.exSpouses.filter((id) => id !== secondId),
            };
        }

        if (member.id === secondId) {
            return {
                ...member,
                spouses: unique([...member.spouses.filter((id) => id !== firstId), firstId]),
                exSpouses: member.exSpouses.filter((id) => id !== firstId),
            };
        }

        return member;
    });

    return {
        ...tree,
        members,
    };
}

export function connectExSpouses(
    tree: FamilyTreeData,
    firstId: string,
    secondId: string
): FamilyTreeData {
    const members = tree.members.map((member) => {
        if (member.id === firstId) {
            return {
                ...member,
                exSpouses: unique([...member.exSpouses.filter((id) => id !== secondId), secondId]),
                spouses: member.spouses.filter((id) => id !== secondId),
            };
        }

        if (member.id === secondId) {
            return {
                ...member,
                exSpouses: unique([...member.exSpouses.filter((id) => id !== firstId), firstId]),
                spouses: member.spouses.filter((id) => id !== firstId),
            };
        }

        return member;
    });

    return {
        ...tree,
        members,
    };
}

export function disconnectRelationship(
    tree: FamilyTreeData,
    sourceId: string,
    targetId: string,
    relationType: "parent" | "child" | "spouse" | "ex-spouse" | "sibling" | "cousin"
): FamilyTreeData {
    const members = tree.members.map((member) => {
        if (member.id === sourceId) {
            switch (relationType) {
                case "parent":
                    return {
                        ...member,
                        parents: member.parents.filter((id) => id !== targetId),
                    };
                case "child":
                    return {
                        ...member,
                        children: member.children.filter((id) => id !== targetId),
                    };
                case "spouse":
                    return {
                        ...member,
                        spouses: member.spouses.filter((id) => id !== targetId),
                    };
                case "ex-spouse":
                    return {
                        ...member,
                        exSpouses: member.exSpouses.filter((id) => id !== targetId),
                    };
                case "cousin":
                    return {
                        ...member,
                        cousins: member.cousins.filter((id) => id !== targetId),
                    };
                default:
                    return {
                        ...member,
                        siblings: member.siblings.filter((id) => id !== targetId),
                    };
            }
        }

        if (member.id === targetId) {
            switch (relationType) {
                case "parent":
                    return {
                        ...member,
                        children: member.children.filter((id) => id !== sourceId),
                    };
                case "child":
                    return {
                        ...member,
                        parents: member.parents.filter((id) => id !== sourceId),
                    };
                case "spouse":
                    return {
                        ...member,
                        spouses: member.spouses.filter((id) => id !== sourceId),
                    };
                case "ex-spouse":
                    return {
                        ...member,
                        exSpouses: member.exSpouses.filter((id) => id !== sourceId),
                    };
                case "cousin":
                    return {
                        ...member,
                        cousins: member.cousins.filter((id) => id !== sourceId),
                    };
                default:
                    return {
                        ...member,
                        siblings: member.siblings.filter((id) => id !== sourceId),
                    };
            }
        }

        return member;
    });

    return {
        ...tree,
        members,
    };
}

export function connectSiblings(
    tree: FamilyTreeData,
    firstId: string,
    secondId: string
): FamilyTreeData {
    const members = tree.members.map((member) => {
        if (member.id === firstId) {
            return {
                ...member,
                siblings: unique([...member.siblings, secondId]),
            };
        }

        if (member.id === secondId) {
            return {
                ...member,
                siblings: unique([...member.siblings, firstId]),
            };
        }

        return member;
    });

    return {
        ...tree,
        members,
    };
}

export function connectCousins(
    tree: FamilyTreeData,
    firstId: string,
    secondId: string
): FamilyTreeData {
    const members = tree.members.map((member) => {
        if (member.id === firstId) {
            return {
                ...member,
                cousins: unique([...member.cousins, secondId]),
            };
        }

        if (member.id === secondId) {
            return {
                ...member,
                cousins: unique([...member.cousins, firstId]),
            };
        }

        return member;
    });

    return {
        ...tree,
        members,
    };
}

// Cousins that follow from the tree: children of a parent's siblings.
export function getDerivedCousinIds(
    members: FamilyMember[],
    member: FamilyMember
): string[] {
    const byId = new Map(members.map((m) => [m.id, m]));
    const cousinIds = new Set<string>();

    member.parents.forEach((parentId) => {
        byId.get(parentId)?.siblings.forEach((auntUncleId) => {
            members.forEach((child) => {
                if (child.id !== member.id && child.parents.includes(auntUncleId)) {
                    cousinIds.add(child.id);
                }
            });
        });
    });

    return [...cousinIds];
}

// =====================================
// Search
// =====================================

export function searchPeople(
    members: FamilyMember[],
    text: string
): FamilyMember[] {
    const search = text.toLowerCase();

    return members.filter((person) =>
        getFullName(person).toLowerCase().includes(search)
    );
}

export function createFolder(
    name = "New Folder",
    memberIds: string[] = []
): FamilyFolder {
    return {
        id: generateId(),
        name,
        memberIds: [...new Set(memberIds)],
    };
}

export function saveFolder(
    tree: FamilyTreeData,
    folder: FamilyFolder
): FamilyTreeData {
    const folders = tree.folders ?? [];
    const nextFolders = folders.some(existing => existing.id === folder.id)
        ? folders.map(existing => existing.id === folder.id ? folder : existing)
        : [...folders, folder];

    return {
        ...tree,
        folders: nextFolders,
    };
}

export function removeFolder(
    tree: FamilyTreeData,
    folderId: string
): FamilyTreeData {
    return {
        ...tree,
        folders: (tree.folders ?? []).filter(folder => folder.id !== folderId),
    };
}

export function getFolderMembers(
    tree: FamilyTreeData,
    folderId: string
): FamilyMember[] {
    const folder = (tree.folders ?? []).find(item => item.id === folderId);
    if (!folder) return [];

    return tree.members.filter(member => folder.memberIds.includes(member.id));
}

export function getBranchMembers(
    members: FamilyMember[],
    rootId: string
): FamilyMember[] {
    const root = members.find((member) => member.id === rootId);
    if (!root) {
        return members;
    }

    const ids = new Set<string>([root.id]);
    const queue = [root.id];

    while (queue.length > 0) {
        const currentId = queue.shift()!;
        const current = members.find((member) => member.id === currentId);
        if (!current) continue;

        [
            ...current.parents,
            ...current.children,
            ...current.spouses,
            ...current.exSpouses,
            ...current.siblings,
            ...current.cousins,
        ].forEach((relatedId) => {
            if (!ids.has(relatedId)) {
                ids.add(relatedId);
                queue.push(relatedId);
            }
        });
    }

    return members.filter((member) => ids.has(member.id));
}

// =====================================
// Sort
// =====================================

export function sortPeople(
    members: FamilyMember[]
): FamilyMember[] {
    return [...members].sort((a, b) =>
        getFullName(a).localeCompare(getFullName(b))
    );
}

// =====================================
// Auto Layout
// =====================================

export const GRID_STEP_X = 240;
export const GRID_STEP_Y = 260;
const NODE_WIDTH = 180;
const NODE_HEIGHT = 200;

export function createAutoLayoutPositions(members: FamilyMember[]): Record<string, GridPosition> {
    const positions: Record<string, GridPosition> = {};

    if (!members || members.length === 0) return positions;

    const byId = new Map(members.map((m) => [m.id, m]));

    // Current spouses share one layout node so couples sit side by side
    // and their children are centred under them.
    const groupOf = new Map<string, string>();
    const groups = new Map<string, string[]>();

    members.forEach((m) => {
        if (groupOf.has(m.id)) return;

        const memberIds: string[] = [];
        const queue = [m.id];
        groupOf.set(m.id, m.id);

        while (queue.length > 0) {
            const id = queue.shift()!;
            memberIds.push(id);
            byId.get(id)?.spouses.forEach((spouseId) => {
                if (byId.has(spouseId) && !groupOf.has(spouseId)) {
                    groupOf.set(spouseId, m.id);
                    queue.push(spouseId);
                }
            });
        }

        groups.set(m.id, memberIds);
    });

    // Node sizes and spacing line up with the grid, so every rank is one
    // grid row and every person in a couple gets their own grid column.
    const g = new dagre.graphlib.Graph();
    g.setGraph({
        rankdir: "TB",
        nodesep: GRID_STEP_X - NODE_WIDTH,
        ranksep: GRID_STEP_Y - NODE_HEIGHT,
    });
    g.setDefaultEdgeLabel(() => ({}));

    groups.forEach((memberIds, groupId) => {
        g.setNode(groupId, {
            width: memberIds.length * GRID_STEP_X - (GRID_STEP_X - NODE_WIDTH),
            height: NODE_HEIGHT,
        });
    });

    members.forEach((m) => {
        m.parents.forEach((p) => {
            const from = groupOf.get(p);
            const to = groupOf.get(m.id)!;
            if (from && from !== to) g.setEdge(from, to);
        });
    });

    try {
        dagre.layout(g);

        groups.forEach((memberIds, groupId) => {
            const node = g.node(groupId);
            if (!node) return;
            const column = Math.round((node.x - node.width / 2) / GRID_STEP_X);
            const row = Math.round((node.y - NODE_HEIGHT / 2) / GRID_STEP_Y);
            memberIds.forEach((id, index) => {
                positions[id] = { x: column + index, y: row };
            });
        });
    } catch {
        // Fallback to simple grid layout
        members.forEach((m, i) => {
            positions[m.id] = { x: i, y: 0 };
        });
    }

    return positions;
}

// Keeps existing (possibly hand-placed) positions and only lays out people
// who don't have one yet, nudging them right until they hit a free cell.
export function fillMissingPositions(
    members: FamilyMember[],
    existing: Record<string, GridPosition>
): Record<string, GridPosition> {
    const positions: Record<string, GridPosition> = {};
    const missing: FamilyMember[] = [];

    members.forEach((m) => {
        if (existing[m.id]) positions[m.id] = existing[m.id];
        else missing.push(m);
    });

    if (missing.length === 0) return positions;

    const auto = createAutoLayoutPositions(members);
    const taken = new Set(Object.values(positions).map((p) => `${p.x},${p.y}`));

    missing.forEach((m) => {
        const position = { ...(auto[m.id] ?? { x: 0, y: 0 }) };
        while (taken.has(`${position.x},${position.y}`)) position.x += 1;
        taken.add(`${position.x},${position.y}`);
        positions[m.id] = position;
    });

    return positions;
}

// =====================================
// Statistics
// =====================================

export function getGenerationLevels(
    members: FamilyMember[]
): Record<string, number> {
    const byId = new Map(members.map((m) => [m.id, m]));
    const levels: Record<string, number> = {};

    const levelOf = (member: FamilyMember, visiting: Set<string>): number => {
        if (levels[member.id] !== undefined) return levels[member.id];
        if (visiting.has(member.id)) return 0;
        visiting.add(member.id);

        const parentLevels = member.parents
            .map((id) => byId.get(id))
            .filter((parent): parent is FamilyMember => !!parent)
            .map((parent) => levelOf(parent, visiting) + 1);

        visiting.delete(member.id);
        levels[member.id] = Math.max(0, ...parentLevels);
        return levels[member.id];
    };

    members.forEach((member) => levelOf(member, new Set()));

    return levels;
}

export function getStatistics(
    members: FamilyMember[]
): FamilyStatistics {
    const living = members.filter(
        (m) => !m.deathDate || m.deathDate === ""
    ).length;

    const deceased = members.length - living;

    const male = members.filter(
        (m) => m.gender === "male"
    ).length;

    const female = members.filter(
        (m) => m.gender === "female"
    ).length;

    const other = members.filter(
        (m) => m.gender === "other"
    ).length;

    const levels = Object.values(getGenerationLevels(members));
    const generations = levels.length === 0 ? 0 : Math.max(...levels) + 1;

    return {
        totalMembers: members.length,
        livingMembers: living,
        deceasedMembers: deceased,

        maleMembers: male,
        femaleMembers: female,
        otherMembers: other,

        generations,
    };
}

// =====================================
// Normalize (load / import)
// =====================================

const MIRRORED_RELATIONS: [typeof RELATION_KEYS[number], typeof RELATION_KEYS[number]][] = [
    ["parents", "children"],
    ["children", "parents"],
    ["spouses", "spouses"],
    ["exSpouses", "exSpouses"],
    ["siblings", "siblings"],
    ["cousins", "cousins"],
];

// Only plain hex colours are accepted, since the value ends up in the SVG.
export function isLineColor(value: unknown): value is string {
    return typeof value === "string" && /^#[0-9a-f]{6}$/i.test(value);
}

function isGridPosition(value: unknown): value is GridPosition {
    return !!value
        && typeof value === "object"
        && Number.isFinite((value as GridPosition).x)
        && Number.isFinite((value as GridPosition).y);
}

// Turns untrusted data (localStorage or an imported file) into a valid tree:
// fills in missing fields, drops links to people that don't exist, makes
// every relationship two-way, and moves cousins that older versions saved
// as siblings out of the sibling list.
export function normalizeTree(raw: unknown): FamilyTreeData {
    if (!raw || typeof raw !== "object" || !Array.isArray((raw as FamilyTreeData).members)) {
        throw new Error("Not a family tree file.");
    }

    const data = raw as Partial<FamilyTreeData>;

    const seen = new Set<string>();
    const members: FamilyMember[] = data.members!
        .filter((m): m is FamilyMember => !!m && typeof m === "object" && typeof m.id === "string" && m.id !== "")
        .filter((m) => !seen.has(m.id) && !!seen.add(m.id))
        .map((m) => ({ ...createPerson(), ...m }));

    const byId = new Map(members.map((m) => [m.id, m]));

    members.forEach((member) => {
        if (!isLineColor(member.lineColor)) delete member.lineColor;

        RELATION_KEYS.forEach((key) => {
            const ids = Array.isArray(member[key]) ? member[key] : [];
            member[key] = unique(ids.filter((id) => typeof id === "string" && id !== member.id && byId.has(id)));
        });
    });

    MIRRORED_RELATIONS.forEach(([key, mirror]) => {
        members.forEach((member) => {
            member[key].forEach((id) => {
                const other = byId.get(id)!;
                if (!other[mirror].includes(member.id)) other[mirror].push(member.id);
            });
        });
    });

    members.forEach((member) => {
        const derivedCousins = new Set(getDerivedCousinIds(members, member));
        member.siblings = member.siblings.filter((id) => {
            const sharesParent = byId.get(id)!.parents.some((p) => member.parents.includes(p));
            return sharesParent || !derivedCousins.has(id);
        });
    });

    const folders = Array.isArray(data.folders)
        ? data.folders
            .filter((folder) => !!folder && typeof folder.id === "string")
            .map((folder) => ({
                id: folder.id,
                name: typeof folder.name === "string" ? folder.name : "Folder",
                memberIds: unique((Array.isArray(folder.memberIds) ? folder.memberIds : []).filter((id) => byId.has(id))),
            }))
        : [];

    const positions: Record<string, GridPosition> = {};
    if (data.positions && typeof data.positions === "object") {
        Object.entries(data.positions).forEach(([id, position]) => {
            if (byId.has(id) && isGridPosition(position)) {
                positions[id] = { x: position.x, y: position.y };
            }
        });
    }

    return {
        members,
        folders,
        positions,
    };
}

// =====================================
// JSON
// =====================================

export function exportJSON(tree: FamilyTreeData): string {
    return JSON.stringify(tree, null, 4);
}

export function importJSON(json: string): FamilyTreeData {
    return normalizeTree(JSON.parse(json));
}

// =====================================
// Local Storage
// =====================================

const STORAGE_KEY = "family-tree-data";

export function saveTree(tree: FamilyTreeData) {
    if (typeof window === "undefined") return;

    try {
        localStorage.setItem(
            STORAGE_KEY,
            JSON.stringify(tree)
        );
    }
    catch {
        // Ignore storage errors so the tree remains usable in the browser.
    }
}

export function loadTree(): FamilyTreeData {
    if (typeof window === "undefined") {
        return {
            members: [],
        };
    }

    try {
        const saved = localStorage.getItem(STORAGE_KEY);

        if (!saved) {
            return {
                members: [],
            };
        }

        return normalizeTree(JSON.parse(saved));
    }
    catch {
        return {
            members: [],
        };
    }
}

// =====================================
// Sample Data
// =====================================

export function createSampleTree(): FamilyTreeData {
    const john = createPerson();
    john.firstName = "John";
    john.lastName = "Smith";
    john.gender = "male";

    const jane = createPerson();
    jane.firstName = "Jane";
    jane.lastName = "Smith";
    jane.gender = "female";

    const emily = createPerson();
    emily.firstName = "Emily";
    emily.lastName = "Smith";
    emily.gender = "female";

    let tree: FamilyTreeData = {
        members: [john, jane, emily],
    };

    tree = connectSpouses(tree, john.id, jane.id);

    tree = connectParentChild(
        tree,
        john.id,
        emily.id
    );

    tree = connectParentChild(
        tree,
        jane.id,
        emily.id
    );

    return tree;
}
