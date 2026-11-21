import { Fragment, useEffect, useMemo, useRef, useState, type Dispatch, type SetStateAction } from "react";
import { useSearchParams } from "react-router-dom";

import {
    LORE_KINDS,
    buildLoreIndex,
    loreCards,
    loreRef,
    loreSessions,
    nameKey,
    parseLoreRef,
    searchLore,
    splitLinks,
    type LoreIndex,
    type LoreKind,
    type LoreLink,
    type LorePage,
    type LoreRef,
} from "../../utils/dmLore";
import { createItem, createLocation, createNote, createNpc, type DmScreenData } from "../../utils/dmScreen";

interface LoreWikiProps {
    data: DmScreenData;
    setData: Dispatch<SetStateAction<DmScreenData>>;
    /** Opens the page's own tab for editing. */
    onEdit: (kind: LoreKind, id: string) => void;
    onShowCard: (boardId: string, nodeId: string) => void;
}

const kindInfo = (kind: LoreKind) => LORE_KINDS.find((k) => k.value === kind)!;

// What a red [[link]] can become.
const CREATE_AS: { kind: LoreKind; label: string }[] = [
    { kind: "note", label: "Note" },
    { kind: "npc", label: "NPC" },
    { kind: "location", label: "Location" },
    { kind: "item", label: "Item" },
];

export default function LoreWiki({ data, setData, onEdit, onShowCard }: LoreWikiProps) {
    const [searchParams, setSearchParams] = useSearchParams();
    const [query, setQuery] = useState("");
    const [helpOpen, setHelpOpen] = useState(false);
    const index = useMemo(() => buildLoreIndex(data), [data]);

    // The open page lives in the URL (?tab=lore&page=npc:id), so the browser's
    // back button walks back through the pages you followed.
    const target = parseLoreRef(searchParams.get("page"));
    const page = target ? index.byRef.get(loreRef(target.kind, target.id)) : undefined;
    const goTo = (ref: LoreRef | null) => {
        const next = new URLSearchParams(searchParams);
        if (ref) next.set("page", ref);
        else next.delete("page");
        setSearchParams(next);
    };

    const createPage = (name: string, kind: LoreKind) => {
        let id: string;
        if (kind === "npc") {
            const npc = createNpc({ name });
            id = npc.id;
            setData((current) => ({ ...current, npcs: [...current.npcs, npc] }));
        } else if (kind === "location") {
            const location = createLocation({ name });
            id = location.id;
            setData((current) => ({ ...current, locations: [...current.locations, location] }));
        } else if (kind === "item") {
            const item = createItem({ name });
            id = item.id;
            setData((current) => ({ ...current, items: [...current.items, item] }));
        } else {
            const note = createNote({ title: name });
            id = note.id;
            setData((current) => ({ ...current, notes: [...current.notes, note] }));
        }
        goTo(loreRef(kind, id));
    };

    const results = query.trim() ? searchLore(index.pages, query) : null;

    return (
        <div className="dms-tracker dms-lore">
            {/* ---------------- Page list ---------------- */}
            <aside className="dms-panel dms-encounter-list dms-lore-nav" aria-label="Lore pages">
                <h2 className="dms-panel-title dms-lore-nav-title">
                    <button type="button" className="dms-lore-home" onClick={() => goTo(null)}>
                        Lore
                    </button>
                    <button
                        type="button"
                        className="dms-icon-button dms-lore-help-button"
                        aria-label="How the lore works"
                        title="How the lore works"
                        onClick={() => setHelpOpen(true)}
                    >
                        ⓘ
                    </button>
                </h2>
                <label className="dms-field dms-list-search">
                    <span>Search</span>
                    <input type="search" value={query} placeholder="Name or text…" onChange={(e) => setQuery(e.target.value)} />
                </label>

                {results ? (
                    results.length === 0 ? (
                        <p className="dms-empty">Nothing matches "{query.trim()}".</p>
                    ) : (
                        <ul>
                            {results.map((p) => (
                                <PageListItem key={p.ref} page={p} active={p.ref === page?.ref} onOpen={goTo} />
                            ))}
                        </ul>
                    )
                ) : (
                    LORE_KINDS.map(({ value, label, icon }) => {
                        const pages = index.pages.filter((p) => p.kind === value).sort((a, b) => a.title.localeCompare(b.title, undefined, { numeric: true }));
                        if (pages.length === 0) return null;
                        return (
                            <details key={value} className="dms-lore-group" open={pages.some((p) => p.ref === page?.ref) || pages.length <= 8}>
                                <summary>
                                    <span aria-hidden="true">{icon}</span> {label} <small>{pages.length}</small>
                                </summary>
                                <ul>
                                    {pages.map((p) => (
                                        <PageListItem key={p.ref} page={p} active={p.ref === page?.ref} onOpen={goTo} hideIcon />
                                    ))}
                                </ul>
                            </details>
                        );
                    })
                )}
            </aside>

            {/* ---------------- Page ---------------- */}
            <section className="dms-panel dms-encounter dms-lore-page">
                {page ? (
                    <LorePageView key={page.ref} page={page} index={index} data={data} onOpen={goTo} onEdit={onEdit} onShowCard={onShowCard} onCreate={createPage} />
                ) : target ? (
                    <>
                        <p className="dms-empty">That page was deleted.</p>
                        <button type="button" className="dms-button dms-button--ghost" onClick={() => goTo(null)}>
                            ← All lore
                        </button>
                    </>
                ) : (
                    <LoreHome index={index} onOpen={goTo} onCreate={createPage} onHelp={() => setHelpOpen(true)} />
                )}
            </section>

            {helpOpen && <LoreHelp onClose={() => setHelpOpen(false)} />}
        </div>
    );
}

function PageListItem({ page, active, onOpen, hideIcon }: { page: LorePage; active: boolean; onOpen: (ref: LoreRef) => void; hideIcon?: boolean }) {
    return (
        <li>
            <button type="button" className={active ? "dms-encounter-item active" : "dms-encounter-item"} aria-current={active} onClick={() => onOpen(page.ref)}>
                <span>
                    {!hideIcon && <span aria-hidden="true">{kindInfo(page.kind).icon} </span>}
                    {page.title}
                </span>
            </button>
        </li>
    );
}

// ---------------- Text with [[links]] ----------------

interface LinkedTextProps {
    text: string;
    index: LoreIndex;
    onOpen: (ref: LoreRef) => void;
    onMissing: (name: string) => void;
}

function LinkedText({ text, index, onOpen, onMissing }: LinkedTextProps) {
    return (
        <p className="dms-lore-text">
            {splitLinks(text).map((chunk, i) => {
                if (chunk.type === "text") return <Fragment key={i}>{chunk.text}</Fragment>;
                const target = index.byName.get(nameKey(chunk.name));
                return target ? (
                    <button key={i} type="button" className="dms-lore-link" title={`${kindInfo(target.kind).label.replace(/s$/, "")}: ${target.title}`} onClick={() => onOpen(target.ref)}>
                        {chunk.label}
                    </button>
                ) : (
                    <button key={i} type="button" className="dms-lore-link missing" title={`No page called "${chunk.name}" yet. Click to create it.`} onClick={() => onMissing(chunk.name)}>
                        {chunk.label}
                    </button>
                );
            })}
        </p>
    );
}

// ---------------- One page ----------------

interface LorePageViewProps {
    page: LorePage;
    index: LoreIndex;
    data: DmScreenData;
    onOpen: (ref: LoreRef | null) => void;
    onEdit: (kind: LoreKind, id: string) => void;
    onShowCard: (boardId: string, nodeId: string) => void;
    onCreate: (name: string, kind: LoreKind) => void;
}

function LorePageView({ page, index, data, onOpen, onEdit, onShowCard, onCreate }: LorePageViewProps) {
    const [creating, setCreating] = useState<string | null>(null);
    const info = kindInfo(page.kind);
    const outgoing = index.linksFrom.get(page.ref) ?? [];
    const incoming = index.linksTo.get(page.ref) ?? [];
    const cards = loreCards(data, page);
    const sessions = loreSessions(data, page);

    return (
        <article className={`dms-lore-article dms-lore-kind-${page.kind}`}>
            <header className="dms-lore-header">
                <div>
                    <p className="dms-lore-kind">
                        <span aria-hidden="true">{info.icon}</span> {info.label.replace(/s$/, "")}
                    </p>
                    <h2 className="dms-lore-title">{page.title}</h2>
                </div>
                <button type="button" className="dms-button dms-button--ghost" onClick={() => onEdit(page.kind, page.id)}>
                    ✎ Edit in {info.label}
                </button>
            </header>

            {creating !== null && <CreatePrompt name={creating} onCreate={onCreate} onCancel={() => setCreating(null)} />}

            <div className="dms-lore-body">
                <div className="dms-lore-main">
                    {page.sections.length === 0 ? (
                        <p className="dms-empty">
                            Nothing written yet. Use <em>Edit in {info.label}</em> to add a description; type <code>[[Name]]</code> to link to another page.
                        </p>
                    ) : (
                        page.sections.map((s) => (
                            <section key={s.label} className="dms-lore-section">
                                <h3 className="dms-subtitle">{s.label}</h3>
                                <LinkedText text={s.text} index={index} onOpen={onOpen} onMissing={setCreating} />
                            </section>
                        ))
                    )}

                    <section className="dms-lore-section">
                        <h3 className="dms-subtitle">Mentioned in</h3>
                        {incoming.length === 0 ? (
                            <p className="dms-inspector-help">Nothing links here yet. Write <code>[[{page.title}]]</code> in another page's text to link it.</p>
                        ) : (
                            <LinkList links={incoming} side="from" index={index} onOpen={onOpen} />
                        )}
                    </section>
                </div>

                <aside className="dms-lore-side">
                    {(page.image || page.facts.length > 0) && (
                        <div className="dms-lore-infobox">
                            {page.image && <img src={page.image} alt="" />}
                            {page.facts.length > 0 && (
                                <dl>
                                    {page.facts.map((f) => (
                                        <div key={f.label}>
                                            <dt>{f.label}</dt>
                                            <dd>{f.value}</dd>
                                        </div>
                                    ))}
                                </dl>
                            )}
                        </div>
                    )}

                    {outgoing.length > 0 && (
                        <div className="dms-inspector-section">
                            <span className="dms-subtitle">Links to</span>
                            <LinkList links={outgoing} side="to" index={index} onOpen={onOpen} />
                        </div>
                    )}

                    <div className="dms-inspector-section">
                        <span className="dms-subtitle">On the story board</span>
                        {cards.length === 0 ? (
                            <p className="dms-inspector-help">Not on any board.</p>
                        ) : (
                            <ul className="dms-connection-list">
                                {cards.map(({ board, node }) => (
                                    <li key={node.id}>
                                        <button type="button" className="dms-link-button" onClick={() => onShowCard(board.id, node.id)}>
                                            {board.name || "Untitled board"}: {node.title || "Untitled card"} →
                                        </button>
                                    </li>
                                ))}
                            </ul>
                        )}
                    </div>

                    {sessions.length > 0 && (
                        <div className="dms-inspector-section">
                            <span className="dms-subtitle">In story recaps</span>
                            <ul className="dms-connection-list">
                                {sessions.map(({ board, node, endedOn }) => (
                                    <li key={node.id}>
                                        <button type="button" className="dms-link-button" onClick={() => onShowCard(board.id, node.id)}>
                                            {board.name || "Untitled board"}
                                            {endedOn && ` (${endedOn})`} →
                                        </button>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )}
                </aside>
            </div>
        </article>
    );
}

// Grouped by reason: "carries: Runed Hammer, Ring".
function LinkList({ links, side, index, onOpen }: { links: LoreLink[]; side: "from" | "to"; index: LoreIndex; onOpen: (ref: LoreRef) => void }) {
    const groups = new Map<string, LorePage[]>();
    for (const link of links) {
        const other = index.byRef.get(link[side]);
        if (!other) continue;
        const label = side === "to" ? link.reason : reverseReason(link.reason);
        groups.set(label, [...(groups.get(label) ?? []), other]);
    }
    return (
        <ul className="dms-lore-links">
            {[...groups].map(([reason, pages]) => (
                <li key={reason}>
                    <small>{reason}</small>
                    <span>
                        {pages.map((p, i) => (
                            <Fragment key={p.ref}>
                                {i > 0 && ", "}
                                <button type="button" className="dms-lore-link" onClick={() => onOpen(p.ref)}>
                                    <span aria-hidden="true">{kindInfo(p.kind).icon} </span>
                                    {p.title}
                                </button>
                            </Fragment>
                        ))}
                    </span>
                </li>
            ))}
        </ul>
    );
}

// "Mira carries the hammer" read from the hammer's page.
function reverseReason(reason: string): string {
    switch (reason) {
        case "carries":
            return "carried by";
        case "holds":
            return "kept at";
        case "is found at":
            return "found here";
        case "is home to":
            return "lives at";
        case "involves":
            return "takes part in";
        case "rewards":
            return "reward for";
        default:
            return "mentioned by";
    }
}

function CreatePrompt({ name, onCreate, onCancel }: { name: string; onCreate: (name: string, kind: LoreKind) => void; onCancel: () => void }) {
    return (
        <div className="dms-lore-create" role="group" aria-label={`Create page ${name}`}>
            <span>
                No page called <strong>{name}</strong> yet. Create it as:
            </span>
            {CREATE_AS.map(({ kind, label }) => (
                <button key={kind} type="button" className="dms-chip" onClick={() => onCreate(name, kind)}>
                    {kindInfo(kind).icon} {label}
                </button>
            ))}
            <button type="button" className="dms-icon-button" aria-label="Cancel" title="Cancel" onClick={onCancel}>
                ×
            </button>
        </div>
    );
}

// ---------------- Start page ----------------

interface LoreHomeProps {
    index: LoreIndex;
    onOpen: (ref: LoreRef) => void;
    onCreate: (name: string, kind: LoreKind) => void;
    onHelp: () => void;
}

function LoreHome({ index, onOpen, onCreate, onHelp }: LoreHomeProps) {
    const [creating, setCreating] = useState<string | null>(null);
    if (index.pages.length === 0) {
        return (
            <>
                <p className="dms-empty">
                    No lore yet. Every NPC, player, location, quest, item, monster and note you add in the other tabs shows up here as a page.
                </p>
                <button type="button" className="dms-button dms-button--ghost" onClick={onHelp}>
                    ⓘ How the lore works
                </button>
            </>
        );
    }

    // The most linked-to pages: the people and places the campaign keeps coming back to.
    const popular = [...index.pages]
        .map((p) => ({ p, count: index.linksTo.get(p.ref)?.length ?? 0 }))
        .filter((x) => x.count > 0)
        .sort((a, b) => b.count - a.count || a.p.title.localeCompare(b.p.title))
        .slice(0, 8);

    return (
        <div className="dms-lore-article">
            <header className="dms-lore-header">
                <div>
                    <p className="dms-lore-kind">Campaign wiki</p>
                    <h2 className="dms-lore-title">Lore</h2>
                </div>
                <button type="button" className="dms-button dms-button--ghost" onClick={onHelp}>
                    ⓘ How it works
                </button>
            </header>
            <p className="dms-inspector-help">
                Every NPC, player, location, quest, item, monster and note is a page here. Pages link each other through who carries what, who's where and
                who's in which quest. Type <code>[[Name]]</code> (or <code>[[Name|shown text]]</code>) in any text field to link to a page by name.
            </p>

            <div className="dms-lore-stats">
                {LORE_KINDS.map(({ value, label, icon }) => (
                    <div key={value} className="dms-lore-stat">
                        <span aria-hidden="true">{icon}</span>
                        <strong>{index.pages.filter((p) => p.kind === value).length}</strong>
                        <small>{label}</small>
                    </div>
                ))}
            </div>

            {popular.length > 0 && (
                <section className="dms-lore-section">
                    <h3 className="dms-subtitle">Most linked</h3>
                    <ul className="dms-lore-links">
                        {popular.map(({ p, count }) => (
                            <li key={p.ref}>
                                <button type="button" className="dms-lore-link" onClick={() => onOpen(p.ref)}>
                                    <span aria-hidden="true">{kindInfo(p.kind).icon} </span>
                                    {p.title}
                                </button>
                                <small>
                                    {count} link{count === 1 ? "" : "s"}
                                </small>
                            </li>
                        ))}
                    </ul>
                </section>
            )}

            {index.missing.length > 0 && (
                <section className="dms-lore-section">
                    <h3 className="dms-subtitle">Wanted pages</h3>
                    <p className="dms-inspector-help">Names written as [[links]] that don't have a page yet.</p>
                    {creating !== null && <CreatePrompt name={creating} onCreate={onCreate} onCancel={() => setCreating(null)} />}
                    <ul className="dms-lore-links">
                        {index.missing.map((m) => (
                            <li key={m.name}>
                                <button type="button" className="dms-lore-link missing" onClick={() => setCreating(m.name)}>
                                    {m.name}
                                </button>
                                <small>
                                    from{" "}
                                    {m.from.map((ref, i) => (
                                        <Fragment key={ref}>
                                            {i > 0 && ", "}
                                            <button type="button" className="dms-link-button" onClick={() => onOpen(ref)}>
                                                {index.byRef.get(ref)?.title}
                                            </button>
                                        </Fragment>
                                    ))}
                                </small>
                            </li>
                        ))}
                    </ul>
                </section>
            )}
        </div>
    );
}
// ---------------- How it works ----------------

const AUTO_LINKS: { from: string; reason: string; to: string; how: string }[] = [
    { from: "🧑 NPC / 🛡 Player", reason: "carries", to: "💎 Item", how: "the item's “Who has it” is that NPC, or the party with that player as “Carried by”" },
    { from: "📍 Location", reason: "holds", to: "💎 Item", how: "the item's holder is a location with that name" },
    { from: "🧑 NPC", reason: "is found at", to: "📍 Location", how: "the NPC's Location field matches a location's name" },
    { from: "📍 Location", reason: "is home to", to: "🧑 NPC", how: "the location's “Who's there” matches an NPC's name" },
    { from: "📜 Quest", reason: "involves", to: "🧑 NPC", how: "the NPC is in one of the quest's stages or speaks one of its dialog lines" },
    { from: "📜 Quest", reason: "rewards", to: "💎 Item", how: "the item is one of the quest's reward items" },
];

// Explains the Lore tab in a modal: what a page is and where its links come from.
function LoreHelp({ onClose }: { onClose: () => void }) {
    const dialog = useRef<HTMLDialogElement>(null);

    useEffect(() => {
        dialog.current?.showModal();
    }, []);

    return (
        <dialog
            ref={dialog}
            className="dms-dialog dms-lore-help"
            aria-labelledby="dms-lore-help-title"
            onClose={onClose}
            // A click on the backdrop lands on the dialog itself.
            onClick={(e) => e.target === e.currentTarget && dialog.current?.close()}
        >
            <div className="dms-dialog-body">
                <div className="dms-dialog-header">
                    <h2 id="dms-lore-help-title" className="dms-panel-title">
                        How the lore works
                    </h2>
                    <button type="button" className="dms-icon-button" aria-label="Close" onClick={() => dialog.current?.close()}>
                        ×
                    </button>
                </div>

                <section className="dms-lore-help-section">
                    <h3 className="dms-subtitle">Every entry is a page</h3>
                    <p>
                        The Lore tab is a wiki of your campaign that writes itself. Every NPC, player, location, quest, item, monster, note and session
                        recap from the other tabs is a page here, with its facts in an info box and its text fields as sections. There's nothing extra to
                        fill in or save: the wiki is rebuilt from your data whenever it changes, so it's always up to date and is backed up with the rest
                        of the DM screen.
                    </p>
                    <p>
                        Pages are read-only. Use <em>✎ Edit in …</em> on a page to jump to its own tab and change it there.
                    </p>
                </section>

                <section className="dms-lore-help-section">
                    <h3 className="dms-subtitle">Links you get for free</h3>
                    <p>Things you've already filled in on the other tabs link pages together automatically:</p>
                    <ul className="dms-lore-help-links">
                        {AUTO_LINKS.map((l) => (
                            <li key={l.from + l.reason}>
                                <span>
                                    {l.from} <strong>{l.reason}</strong> {l.to}
                                </span>
                                <small>when {l.how}</small>
                            </li>
                        ))}
                    </ul>
                </section>

                <section className="dms-lore-help-section">
                    <h3 className="dms-subtitle">Linking by name</h3>
                    <p>
                        In any text field (notes, descriptions, rumours, quest stages, recaps…) write <code>[[Name]]</code> to link to the page with that
                        name, or <code>[[Name|shown text]]</code> to show different words. Names ignore upper and lower case and extra spaces.
                    </p>
                    <p>
                        A link to a name that has no page yet is shown in <span className="dms-lore-link missing">red</span>. Click it to create the page
                        as a note, NPC, location or item. The start page lists all of them under <em>Wanted pages</em>.
                    </p>
                </section>

                <section className="dms-lore-help-section">
                    <h3 className="dms-subtitle">Reading a page</h3>
                    <ul>
                        <li>
                            <strong>Mentioned in</strong>: pages that link here, grouped by why (carried by, lives at, takes part in…).
                        </li>
                        <li>
                            <strong>Links to</strong>: pages this one points at.
                        </li>
                        <li>
                            <strong>On the story board</strong>: cards linked to this page or whose text mentions it. Click one to open it on its board.
                        </li>
                        <li>
                            <strong>In story recaps</strong>: story boards whose recap went through this page.
                        </li>
                    </ul>
                    <p>
                        The start page counts your pages of each kind and shows the <em>most linked</em> ones: the people and places the campaign keeps
                        coming back to. Search finds pages by name or by any of their text, and the browser's back button walks back through the pages
                        you've followed.
                    </p>
                </section>
            </div>
        </dialog>
    );
}
