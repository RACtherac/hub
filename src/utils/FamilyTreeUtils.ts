import type {
    FamilyMember,
    FamilyTreeData,
    FamilyStatistics,
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

export function deletePerson(
    tree: FamilyTreeData,
    id: string
): FamilyTreeData {
    return {
        ...tree,
        members: tree.members.filter((m) => m.id !== id),
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
    let members = tree.members.map((member) => {
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

    // Auto-detect and connect cousins when parent-child relationship is created
    const parent = members.find(m => m.id === parentId);
    const child = members.find(m => m.id === childId);

    if (parent && child) {
        // Get parent's siblings
        const parentSiblings = members.filter(m => parent.siblings.includes(m.id));

        // For each sibling, find their children and connect as cousins
        parentSiblings.forEach(sibling => {
            const siblingChildren = members.filter(m => m.parents.includes(sibling.id));
            siblingChildren.forEach(siblingChild => {
                members = members.map((member) => {
                    if (member.id === child.id) {
                        return {
                            ...member,
                            siblings: unique([...member.siblings, siblingChild.id]),
                        };
                    }
                    if (member.id === siblingChild.id) {
                        return {
                            ...member,
                            siblings: unique([...member.siblings, child.id]),
                        };
                    }
                    return member;
                });
            });
        });
    }

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
    let members = tree.members.map((member) => {
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

    // Auto-detect and connect cousins when siblings are connected
    const first = tree.members.find(m => m.id === firstId);
    const second = tree.members.find(m => m.id === secondId);

    if (first && second) {
        // Get all children
        const firstChildren = members.filter(m => m.parents.includes(firstId));
        const secondChildren = members.filter(m => m.parents.includes(secondId));

        // Connect all pairs of children as cousins
        firstChildren.forEach(firstChild => {
            secondChildren.forEach(secondChild => {
                members = members.map((member) => {
                    if (member.id === firstChild.id) {
                        return {
                            ...member,
                            siblings: unique([...member.siblings, secondChild.id]),
                        };
                    }
                    if (member.id === secondChild.id) {
                        return {
                            ...member,
                            siblings: unique([...member.siblings, firstChild.id]),
                        };
                    }
                    return member;
                });
            });
        });
    }

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

export function createAutoLayoutPositions(members: FamilyMember[]): Record<string, { x: number; y: number }> {
    const positions: Record<string, { x: number; y: number }> = {};
    const memberMap = new Map(members.map(member => [member.id, member]));

    const computeLevel = (member: FamilyMember, visited = new Set<string>()): number => {
        if (visited.has(member.id)) return 0;
        visited.add(member.id);

        if (member.parents.length === 0) return 0;

        const parentLevels = member.parents
            .map(parentId => memberMap.get(parentId))
            .filter((parent): parent is FamilyMember => Boolean(parent))
            .map(parent => computeLevel(parent, visited));

        return parentLevels.length > 0 ? Math.max(...parentLevels) + 1 : 0;
    };

    const levelMap = new Map<number, FamilyMember[]>();
    members.forEach(member => {
        const level = computeLevel(member);
        const list = levelMap.get(level) ?? [];
        list.push(member);
        levelMap.set(level, list);
    });

    Array.from(levelMap.entries())
        .sort(([levelA], [levelB]) => levelA - levelB)
        .forEach(([level, levelMembers]) => {
            const sorted = [...levelMembers].sort((a, b) => getFullName(a).localeCompare(getFullName(b)));
            sorted.forEach((member, index) => {
                positions[member.id] = { x: index, y: level };
            });
        });

    return positions;
}

// =====================================
// Statistics
// =====================================

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

    let generations = 0;

    members.forEach((member) => {
        generations = Math.max(generations, member.parents.length);
    });

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
// JSON
// =====================================

export function exportJSON(tree: FamilyTreeData): string {
    return JSON.stringify(tree, null, 4);
}

export function importJSON(json: string): FamilyTreeData {
    return JSON.parse(json);
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

        const parsed = JSON.parse(saved);

        if (!parsed || typeof parsed !== "object" || !Array.isArray(parsed.members)) {
            return {
                members: [],
            };
        }

        return parsed as FamilyTreeData;
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