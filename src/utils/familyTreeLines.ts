import type { FamilyMember } from "../types/FamilyTreeTypes";

import { getDerivedCousinIds } from "./FamilyTreeUtils";

// =====================================
// Connection Lines
// =====================================
//
// Lines are drawn the way paper family trees are:
// - spouses are joined by a horizontal "marriage" line,
// - children hang from a horizontal bus below their parents
//   (dropping from the middle of the marriage line when the parents sit
//   side by side),
// - siblings who don't share a parent in the tree, and hand-added cousins,
//   get a bracket above their cards.
// Cousins through linked parents are already visible through the buses, so
// they get no line of their own.
//
// A child with a lineColor gets its own line in that colour, from the parents
// all the way down, on its own lane next to the bus so it can be followed
// even when it runs behind other cards.

export interface CardBox {
    left: number;
    top: number;
    width: number;
    height: number;
}

export type ConnectionType = "parent" | "spouse" | "ex-spouse" | "sibling" | "cousin";

export interface ConnectionPath {
    id: string;
    d: string;
    type: ConnectionType;
    // Set for a child's own coloured line; otherwise the type's CSS colour is used.
    color?: string;
}

// Height of the marriage line, measured from the top of the cards
// (the middle of the photo area).
const MARRIAGE_LINE_OFFSET = 60;
const SIBLING_BRACKET_RISE = 14;
const COUSIN_BRACKET_RISE = 26;
const BUS_STAGGER = 8;
const COLOR_LANE_SPACING = 6;

const centerX = (box: CardBox) => box.left + box.width / 2;
const bottom = (box: CardBox) => box.top + box.height;

const round = (value: number) => Math.round(value * 10) / 10;

function path(points: [number, number][]): string {
    return points
        .map(([x, y], index) => `${index === 0 ? "M" : "L"} ${round(x)} ${round(y)}`)
        .join(" ");
}

function sameRow(a: CardBox, b: CardBox) {
    return Math.abs(a.top - b.top) < 1;
}

// Horizontal line between two cards on the same row; an elbow otherwise.
function marriagePath(a: CardBox, b: CardBox): string {
    const [left, right] = a.left <= b.left ? [a, b] : [b, a];

    if (sameRow(left, right)) {
        const y = left.top + MARRIAGE_LINE_OFFSET;
        return path([[left.left + left.width, y], [right.left, y]]);
    }

    const fromY = left.top + MARRIAGE_LINE_OFFSET;
    const toY = right.top + MARRIAGE_LINE_OFFSET;
    const midX = (left.left + left.width + right.left) / 2;
    return path([[left.left + left.width, fromY], [midX, fromY], [midX, toY], [right.left, toY]]);
}

// Bracket above two cards: up from each card's top, joined by a horizontal line.
function bracketPath(a: CardBox, b: CardBox, rise: number): string {
    const y = Math.min(a.top, b.top) - rise;
    return path([[centerX(a), a.top], [centerX(a), y], [centerX(b), y], [centerX(b), b.top]]);
}

// Parents whose cards sit next to each other on the same row with nothing in
// between, so the children's line can drop from the middle of their marriage line.
function adjacentCouple(parents: CardBox[], allBoxes: CardBox[]): boolean {
    if (parents.length !== 2 || !sameRow(parents[0], parents[1])) return false;

    const [left, right] = parents[0].left <= parents[1].left ? parents : [parents[1], parents[0]];
    const gapStart = left.left + left.width;
    const gapEnd = right.left;

    return !allBoxes.some(box =>
        box !== left && box !== right && sameRow(box, left) && box.left < gapEnd && box.left + box.width > gapStart
    );
}

export function buildConnectionPaths(
    members: FamilyMember[],
    boxes: Record<string, CardBox>
): ConnectionPath[] {
    const lines: ConnectionPath[] = [];
    const visible = members.filter(member => boxes[member.id]);
    const allBoxes = Object.values(boxes);

    // ---- Marriages -------------------------------------------------------
    visible.forEach(member => {
        member.spouses.forEach(spouseId => {
            if (member.id >= spouseId || !boxes[spouseId]) return;
            lines.push({
                id: `${member.id}-spouse-${spouseId}`,
                d: marriagePath(boxes[member.id], boxes[spouseId]),
                type: "spouse",
            });
        });

        member.exSpouses.forEach(spouseId => {
            if (member.id >= spouseId || !boxes[spouseId]) return;
            lines.push({
                id: `${member.id}-ex-spouse-${spouseId}`,
                d: marriagePath(boxes[member.id], boxes[spouseId]),
                type: "ex-spouse",
            });
        });
    });

    // ---- Parents to children --------------------------------------------
    // Children with the same set of visible parents share one bus.
    const families = new Map<string, { parentIds: string[]; childIds: string[] }>();

    visible.forEach(child => {
        const parentIds = child.parents.filter(id => boxes[id]).sort();
        if (parentIds.length === 0) return;

        const key = parentIds.join("|");
        if (!families.has(key)) families.set(key, { parentIds, childIds: [] });
        families.get(key)!.childIds.push(child.id);
    });

    // Buses between the same two rows are staggered so they don't overlap.
    const busesPerRowGap = new Map<string, number>();

    families.forEach(({ parentIds, childIds }, key) => {
        const parents = parentIds.map(id => boxes[id]);
        const children = childIds.map(id => boxes[id]);

        const parentsBottom = Math.max(...parents.map(bottom));
        const childrenTop = Math.min(...children.map(box => box.top));

        const gapKey = `${Math.round(parentsBottom)}:${Math.round(childrenTop)}`;
        const busIndex = busesPerRowGap.get(gapKey) ?? 0;
        busesPerRowGap.set(gapKey, busIndex + 1);

        const busY = childrenTop > parentsBottom
            ? (parentsBottom + childrenTop) / 2 + [0, 1, -1][busIndex % 3] * BUS_STAGGER
            : parentsBottom + 20;

        // Where the bus is fed from: the middle of the marriage line, or a
        // drop from the bottom of each parent's card.
        const drops: { x: number; points: [number, number][] }[] = [];

        const [firstParent] = parentIds.map(id => members.find(m => m.id === id)!);
        const parentsAreCouple = parentIds.length === 2 && (
            firstParent.spouses.includes(parentIds[1]) || firstParent.exSpouses.includes(parentIds[1])
        );

        if (parentsAreCouple && adjacentCouple(parents, allBoxes)) {
            const [left, right] = parents[0].left <= parents[1].left ? parents : [parents[1], parents[0]];
            const x = (left.left + left.width + right.left) / 2;
            drops.push({ x, points: [[x, left.top + MARRIAGE_LINE_OFFSET], [x, busY]] });
        }
        else {
            parents.forEach(parent => {
                const x = centerX(parent);
                drops.push({ x, points: [[x, bottom(parent)], [x, busY]] });
            });
        }

        const colorOf = (childId: string) => members.find(m => m.id === childId)?.lineColor;
        const plainChildIds = childIds.filter(id => !colorOf(id));
        const coloredChildIds = childIds.filter(id => colorOf(id));

        // Shared bus for children without their own colour.
        if (plainChildIds.length > 0) {
            drops.forEach((drop, index) => {
                lines.push({ id: `${key}-drop-${index}`, d: path(drop.points), type: "parent" });
            });

            const xs = [...drops.map(drop => drop.x), ...plainChildIds.map(id => centerX(boxes[id]))];
            const busStart = Math.min(...xs);
            const busEnd = Math.max(...xs);
            if (busEnd - busStart > 0.5) {
                lines.push({ id: `${key}-bus`, d: path([[busStart, busY], [busEnd, busY]]), type: "parent" });
            }

            plainChildIds.forEach(childId => {
                const child = boxes[childId];
                lines.push({
                    id: `${key}-child-${childId}`,
                    d: path([[centerX(child), busY], [centerX(child), child.top]]),
                    type: "parent",
                });
            });
        }

        // Each coloured child gets a full line of its own, on a lane just
        // above or below the bus (+6, -6, +12, -12, ...).
        coloredChildIds.forEach((childId, index) => {
            const child = boxes[childId];
            const laneY = busY + (index % 2 === 0 ? 1 : -1) * COLOR_LANE_SPACING * (Math.floor(index / 2) + 1);

            drops.forEach((drop, dropIndex) => {
                lines.push({
                    id: `${key}-child-${childId}-drop-${dropIndex}`,
                    d: path([
                        drop.points[0],
                        [drop.x, laneY],
                        [centerX(child), laneY],
                        [centerX(child), child.top],
                    ]),
                    type: "parent",
                    color: colorOf(childId),
                });
            });
        });
    });

    // ---- Siblings and cousins -------------------------------------------
    visible.forEach(member => {
        member.siblings.forEach(siblingId => {
            const sibling = members.find(m => m.id === siblingId);
            if (member.id >= siblingId || !sibling || !boxes[siblingId]) return;

            // Already shown by the shared parents' bus.
            const sharesVisibleParent = member.parents.some(id => boxes[id] && sibling.parents.includes(id));
            if (sharesVisibleParent) return;

            lines.push({
                id: `${member.id}-sib-${siblingId}`,
                d: bracketPath(boxes[member.id], boxes[siblingId], SIBLING_BRACKET_RISE),
                type: "sibling",
            });
        });

        const derivedCousins = member.cousins.length > 0 ? getDerivedCousinIds(members, member) : [];
        member.cousins.forEach(cousinId => {
            if (member.id >= cousinId || !boxes[cousinId] || derivedCousins.includes(cousinId)) return;

            lines.push({
                id: `${member.id}-cousin-${cousinId}`,
                d: bracketPath(boxes[member.id], boxes[cousinId], COUSIN_BRACKET_RISE),
                type: "cousin",
            });
        });
    });

    // Coloured lines last so they're drawn on top of the shared ones.
    return [...lines.filter(line => !line.color), ...lines.filter(line => line.color)];
}
