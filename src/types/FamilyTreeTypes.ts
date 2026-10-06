// ===============================
// Family Tree Types
// ===============================

export type Gender = "male" | "female" | "other";

export type RelationshipType =
    | "parent"
    | "child"
    | "spouse"
    | "ex-spouse"
    | "sibling"
    | "cousin";

export interface FamilyMember {
    id: string;

    firstName: string;
    lastName: string;

    gender: Gender;

    birthDate?: string;
    deathDate?: string;

    occupation?: string;
    email?: string;
    phone?: string;

    notes?: string;

    image?: string;

    // Colour of the line from this person's parents down to them ("#rrggbb").
    lineColor?: string;

    parents: string[];
    children: string[];
    spouses: string[];
    exSpouses: string[];
    siblings: string[];
    // Cousins added by hand. Cousins through linked parents are derived, not stored.
    cousins: string[];

    created: string;
    updated: string;
}

export interface FamilyFolder {
    id: string;
    name: string;
    memberIds: string[];
}

export interface GridPosition {
    x: number;
    y: number;
}

export interface FamilyTreeData {
    members: FamilyMember[];
    folders?: FamilyFolder[];
    positions?: Record<string, GridPosition>;
}

export interface TreeNode {
    member: FamilyMember;

    level: number;

    x: number;
    y: number;

    width: number;
    height: number;
}

export interface TreeConnection {
    from: string;
    to: string;

    type: RelationshipType;
}

export interface PersonFormData {
    firstName: string;
    lastName: string;

    gender: Gender;

    birthDate?: string;
    deathDate?: string;

    occupation?: string;

    email?: string;
    phone?: string;

    notes?: string;
}

export interface SearchResult {
    id: string;
    fullName: string;
}

export interface FamilyStatistics {
    totalMembers: number;
    livingMembers: number;
    deceasedMembers: number;

    maleMembers: number;
    femaleMembers: number;
    otherMembers: number;

    generations: number;
}

export interface LayoutSettings {
    horizontalSpacing: number;
    verticalSpacing: number;

    nodeWidth: number;
    nodeHeight: number;
}