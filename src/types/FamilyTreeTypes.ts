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

    parents: string[];
    children: string[];
    spouses: string[];
    exSpouses: string[];
    siblings: string[];

    created: string;
    updated: string;
}

export interface FamilyTreeData {
    members: FamilyMember[];
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