// The Lore tab: every NPC, player, monster, location, item, quest and note as a
// wiki page. Pages link to each other through the ids the DM Screen already
// stores (an item's holder, a quest's NPCs...) and through [[Name]] written in
// any text field. Nothing here is saved; it's all worked out from DmScreenData.

import { QUEST_STAGES, recapLabel, type DmScreenData, type NamedBoard, type BoardNode } from "./dmScreen";

export type LoreKind = "npc" | "player" | "monster" | "location" | "item" | "quest" | "note" | "recap";

export const LORE_KINDS: { value: LoreKind; label: string; icon: string }[] = [
    { value: "npc", label: "NPCs", icon: "🧑" },
    { value: "player", label: "Players", icon: "🛡" },
    { value: "location", label: "Locations", icon: "📍" },
    { value: "quest", label: "Quests", icon: "📜" },
    { value: "item", label: "Items", icon: "💎" },
    { value: "monster", label: "Monsters", icon: "🐉" },
    { value: "note", label: "Notes", icon: "📝" },
    { value: "recap", label: "Session recaps", icon: "🎬" },
];

/** A page's address, e.g. "npc:abc123". */
export type LoreRef = `${LoreKind}:${string}`;

export const loreRef = (kind: LoreKind, id: string): LoreRef => `${kind}:${id}`;

export function parseLoreRef(value: string | null | undefined): { kind: LoreKind; id: string } | null {
    if (!value) return null;
    const at = value.indexOf(":");
    const kind = value.slice(0, at) as LoreKind;
    const id = value.slice(at + 1);
    return at > 0 && id && LORE_KINDS.some((k) => k.value === kind) ? { kind, id } : null;
}

/** One field of a page's text, e.g. "Rumour" on a location. */
export interface LoreSection {
    label: string;
    text: string;
}

/** A short fact shown in the page's info box, e.g. "AC 15". */
export interface LoreFact {
    label: string;
    value: string;
}

export interface LorePage {
    ref: LoreRef;
    kind: LoreKind;
    id: string;
    title: string;
    image?: string;
    facts: LoreFact[];
    sections: LoreSection[];
}

/** Why one page points at another. */
export interface LoreLink {
    from: LoreRef;
    to: LoreRef;
    // e.g. "mentions", "holds", "takes part in"; read as "<from> <reason> <to>".
    reason: string;
}

/** A [[Name]] that matches no page. */
export interface MissingLink {
    name: string;
    from: LoreRef[];
}

export interface LoreIndex {
    pages: LorePage[];
    byRef: Map<LoreRef, LorePage>;
    /** Lower-cased page title → page; the first page with a title wins. */
    byName: Map<string, LorePage>;
    linksFrom: Map<LoreRef, LoreLink[]>;
    linksTo: Map<LoreRef, LoreLink[]>;
    missing: MissingLink[];
}

// ---- [[links]]

/** One run of a text: plain text, or a [[link]] with what it shows. */
export type LoreChunk = { type: "text"; text: string } | { type: "link"; name: string; label: string };

const LINK_PATTERN = /\[\[([^[\]|]+?)(?:\|([^[\]]+?))?\]\]/g;

/** Splits text on [[Name]] and [[Name|shown text]]. */
export function splitLinks(text: string): LoreChunk[] {
    const chunks: LoreChunk[] = [];
    let last = 0;
    for (const match of text.matchAll(LINK_PATTERN)) {
        const at = match.index ?? 0;
        if (at > last) chunks.push({ type: "text", text: text.slice(last, at) });
        const name = match[1].trim();
        chunks.push({ type: "link", name, label: (match[2] ?? match[1]).trim() });
        last = at + match[0].length;
    }
    if (last < text.length) chunks.push({ type: "text", text: text.slice(last) });
    return chunks;
}

/** The distinct names written as [[links]] in a text. */
export function linkNames(text: string): string[] {
    const names = splitLinks(text).flatMap((c) => (c.type === "link" && c.name ? [c.name] : []));
    return [...new Set(names)];
}

export const nameKey = (name: string) => name.trim().toLowerCase().replace(/\s+/g, " ");

// ---- Pages

const fact = (label: string, value: string | number | undefined): LoreFact[] =>
    value === undefined || String(value).trim() === "" ? [] : [{ label, value: String(value).trim() }];

const section = (label: string, text: string): LoreSection[] => (text.trim() ? [{ label, text }] : []);

export function buildPages(data: DmScreenData): LorePage[] {
    const npcName = (id: string) => data.npcs.find((n) => n.id === id)?.name ?? "";
    const page = (kind: LoreKind, id: string, title: string, rest: Omit<LorePage, "ref" | "kind" | "id" | "title">): LorePage => ({
        ref: loreRef(kind, id),
        kind,
        id,
        title: title.trim() || "Untitled",
        ...rest,
    });

    return [
        ...data.npcs.map((n) =>
            page("npc", n.id, n.name, {
                image: n.image,
                facts: [...fact("Race", n.race), ...fact("Alignment", n.alignment), ...fact("Found at", n.location), ...fact("AC", n.ac), ...fact("HP", n.maxHp || undefined)],
                sections: [...section("Notes", n.notes), ...section("Loot", n.loot)],
            }),
        ),
        ...data.players.map((p) =>
            page("player", p.id, p.name, {
                image: p.image,
                facts: [...fact("Played by", p.playerName), ...fact("Ancestry & class", p.ancestryClass), ...fact("Level", p.level), ...fact("AC", p.ac), ...fact("HP", p.maxHp || undefined)],
                sections: section("Notes", p.notes),
            }),
        ),
        ...data.locations.map((l) =>
            page("location", l.id, l.name, {
                facts: [...fact("Kind", l.kind), ...fact("Who's there", l.npc)],
                sections: [
                    ...section("Description", l.description),
                    ...section("Notable", l.feature),
                    ...section("Rumour", l.rumour),
                    ...section("Danger", l.danger),
                    ...section("Notes", l.notes),
                ],
            }),
        ),
        ...data.quests.map((q) =>
            page("quest", q.id, q.title, {
                facts: fact("Progress", `${QUEST_STAGES.filter((s) => q.stages[s.value].done).length} / ${QUEST_STAGES.length} stages`),
                sections: [
                    ...section("Summary", q.summary),
                    ...QUEST_STAGES.flatMap((s) => {
                        const stage = q.stages[s.value];
                        const lines = stage.dialogs
                            .filter((d) => d.text.trim())
                            .map((d) => `${d.trigger.trim() ? `(${d.trigger.trim()}) ` : ""}${npcName(d.npcId) ? `${npcName(d.npcId)}: ` : ""}"${d.text.trim()}"`);
                        return section(`${s.icon} ${s.label}${stage.done ? " ✓" : ""}`, [stage.description.trim(), ...lines].filter(Boolean).join("\n"));
                    }),
                    ...section("Reward", q.reward),
                ],
            }),
        ),
        ...data.items.map((i) =>
            page("item", i.id, i.name, {
                image: i.image,
                facts: [
                    ...fact("Type", i.type),
                    ...fact("Rarity", i.rarity.replace("-", " ")),
                    ...fact("Value", i.value),
                    ...Object.entries(i.stats).flatMap(([k, v]) => fact(k.charAt(0).toUpperCase() + k.slice(1), v)),
                ],
                sections: section("Description", i.description),
            }),
        ),
        ...data.monsters.map((m) =>
            page("monster", m.id, m.name, {
                image: m.image,
                facts: [...fact("Type", m.creatureType), ...fact("Challenge", m.challenge), ...fact("AC", m.ac), ...fact("HP", m.hp || undefined), ...fact("Speed", m.speed)],
                sections: [...section("Traits", m.traits), ...section("Loot", m.loot)],
            }),
        ),
        ...data.notes.map((n) => page("note", n.id, n.title, { facts: [], sections: section("Note", n.body) })),
        ...data.recaps.map((r) =>
            page("recap", r.id, recapLabel(r), {
                facts: [...fact("Played on", r.playedOn), ...fact("In game", r.inGameDate)],
                sections: section("What happened", r.body),
            }),
        ),
    ];
}

// ---- Index

export function buildLoreIndex(data: DmScreenData): LoreIndex {
    const pages = buildPages(data);
    const byRef = new Map(pages.map((p) => [p.ref, p]));
    const byName = new Map<string, LorePage>();
    for (const p of pages) if (!byName.has(nameKey(p.title))) byName.set(nameKey(p.title), p);

    const links: LoreLink[] = [];
    const seen = new Set<string>();
    const linked = new Set<string>();
    const add = (from: LoreRef, to: LoreRef | undefined, reason: string) => {
        if (!to || from === to || !byRef.has(to)) return;
        // A [[mention]] adds nothing when the pages are already linked some other way.
        if (reason === "mentions" && linked.has(`${from}>${to}`)) return;
        const key = `${from}>${to}>${reason}`;
        if (seen.has(key)) return;
        seen.add(key);
        linked.add(`${from}>${to}`);
        links.push({ from, to, reason });
    };
    // Free-text fields like an NPC's location: prefer a page of the expected kind.
    const byTitle = (name: string, kind?: LoreKind) => {
        if (!name.trim()) return undefined;
        const key = nameKey(name);
        return (pages.find((p) => p.kind === kind && nameKey(p.title) === key) ?? byName.get(key))?.ref;
    };

    // Links the data already holds.
    for (const item of data.items) {
        const holder = item.holder;
        if (holder.kind === "npc") add(loreRef("npc", holder.npcId), loreRef("item", item.id), "carries");
        if (holder.kind === "location") {
            const place = byTitle(holder.name, "location");
            if (place) add(place, loreRef("item", item.id), "holds");
        }
        if (holder.kind === "party") {
            const player = data.players.find((p) => holder.character.trim() && nameKey(p.name) === nameKey(holder.character));
            if (player) add(loreRef("player", player.id), loreRef("item", item.id), "carries");
        }
    }
    for (const npc of data.npcs) add(loreRef("npc", npc.id), byTitle(npc.location, "location"), "is found at");
    for (const location of data.locations) add(loreRef("location", location.id), byTitle(location.npc, "npc"), "is home to");
    for (const quest of data.quests) {
        for (const s of QUEST_STAGES) {
            const stage = quest.stages[s.value];
            for (const npcId of stage.npcIds) add(loreRef("quest", quest.id), loreRef("npc", npcId), "involves");
            for (const d of stage.dialogs) if (d.npcId) add(loreRef("quest", quest.id), loreRef("npc", d.npcId), "involves");
        }
        for (const itemId of quest.rewardItemIds) add(loreRef("quest", quest.id), loreRef("item", itemId), "rewards");
    }

    // Links written as [[Name]].
    const missing = new Map<string, MissingLink>();
    for (const p of pages) {
        for (const name of p.sections.flatMap((s) => linkNames(s.text))) {
            const target = byName.get(nameKey(name));
            if (target) add(p.ref, target.ref, "mentions");
            else {
                const entry = missing.get(nameKey(name)) ?? { name, from: [] };
                if (!entry.from.includes(p.ref)) entry.from.push(p.ref);
                missing.set(nameKey(name), entry);
            }
        }
    }

    const linksFrom = new Map<LoreRef, LoreLink[]>();
    const linksTo = new Map<LoreRef, LoreLink[]>();
    for (const link of links) {
        linksFrom.set(link.from, [...(linksFrom.get(link.from) ?? []), link]);
        linksTo.set(link.to, [...(linksTo.get(link.to) ?? []), link]);
    }

    return { pages, byRef, byName, linksFrom, linksTo, missing: [...missing.values()].sort((a, b) => a.name.localeCompare(b.name)) };
}

// ---- Story boards

const CARD_FIELD: Partial<Record<LoreKind, keyof BoardNode>> = {
    npc: "npcId",
    location: "locationId",
    item: "itemId",
    quest: "questId",
    note: "noteId",
};

/**
 * Story board cards about a page: cards linked to it, and any card whose text
 * mentions it as a [[link]].
 */
export function loreCards(data: DmScreenData, page: LorePage): { board: NamedBoard; node: BoardNode }[] {
    const field = CARD_FIELD[page.kind];
    // A session recap is "on the board" as the End story card it's linked to.
    const endNodeId = page.kind === "recap" ? data.recaps.find((r) => r.id === page.id)?.endNodeId : undefined;
    const key = nameKey(page.title);
    return data.boards.flatMap((board) =>
        board.nodes
            .filter((n) => (field && n[field] === page.id) || (page.kind === "recap" && n.id === endNodeId) || [n.title, n.text].some((t) => linkNames(t).some((name) => nameKey(name) === key)))
            .map((node) => ({ board, node })),
    );
}

/** Story recaps (from End story cards) that mention the page's title. */
export function loreSessions(data: DmScreenData, page: LorePage): { board: NamedBoard; node: BoardNode; endedOn: string }[] {
    const key = nameKey(page.title);
    if (!key) return [];
    return data.boards.flatMap((board) =>
        board.nodes.flatMap((node) => {
            const recap = node.recap;
            if (!recap) return [];
            const hit = recap.steps.some((s) => [s.title, s.text, ...s.details].some((t) => nameKey(t).includes(key)));
            return hit ? [{ board, node, endedOn: recap.endedOn }] : [];
        }),
    );
}

// ---- Search

/** Pages whose title or text contains every word of the query. */
export function searchLore(pages: readonly LorePage[], query: string): LorePage[] {
    const words = query.toLowerCase().split(/\s+/).filter(Boolean);
    if (words.length === 0) return [...pages];
    const scored = pages
        .map((p) => {
            const title = p.title.toLowerCase();
            const all = [title, ...p.facts.map((f) => f.value), ...p.sections.map((s) => s.text)].join("\n").toLowerCase();
            if (!words.every((w) => all.includes(w))) return null;
            return { p, score: words.every((w) => title.includes(w)) ? 0 : 1 };
        })
        .filter((x): x is { p: LorePage; score: number } => x !== null);
    return scored.sort((a, b) => a.score - b.score || a.p.title.localeCompare(b.p.title)).map((x) => x.p);
}
