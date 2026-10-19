import { useState, type Dispatch, type FormEvent, type SetStateAction } from "react";

import { toInt } from "../../utils/makeId";
import {
    COMBATANT_KINDS,
    STANDARD_CONDITIONS,
    applyDamage,
    applyHeal,
    createCombatant,
    createEncounter,
    duplicateCombatant,
    duplicateName,
    encounterOutcome,
    isDown,
    OUTCOME_LABELS,
    nextTurn,
    previousTurn,
    removeCombatant,
    rollInitiative,
    sortCombatants,
    toggleCondition,
    unlinkEncounter,
    type Combatant,
    type CombatantKind,
    type DmScreenData,
    type Encounter,
} from "../../utils/dmScreen";
import AttackList from "./AttackList";
import ConfirmButton from "./ConfirmButton";

interface EncounterTrackerProps {
    data: DmScreenData;
    setData: Dispatch<SetStateAction<DmScreenData>>;
}

const EMPTY_FORM = {
    name: "",
    creatureType: "",
    alignment: "",
    kind: "monster" as CombatantKind,
    initiativeMod: "0",
    maxHp: "10",
    ac: "",
    count: "1",
};

export default function EncounterTracker({ data, setData }: EncounterTrackerProps) {
    const encounter = data.encounters.find((e) => e.id === data.activeEncounterId) ?? data.encounters[0];
    const [form, setForm] = useState(EMPTY_FORM);

    const updateEncounter = (change: (current: Encounter) => Encounter) =>
        setData((current) => ({
            ...current,
            encounters: current.encounters.map((e) => (e.id === encounter.id ? change(e) : e)),
        }));

    const updateCombatant = (id: string, change: (current: Combatant) => Combatant) =>
        updateEncounter((current) => ({
            ...current,
            combatants: current.combatants.map((c) => (c.id === id ? change(c) : c)),
        }));

    const addEncounter = () => {
        const created = createEncounter(`Encounter ${data.encounters.length + 1}`);
        setData((current) => ({ ...current, encounters: [...current.encounters, created], activeEncounterId: created.id }));
    };

    const deleteEncounter = () =>
        setData((current) => {
            const remaining = current.encounters.filter((e) => e.id !== encounter.id);
            const encounters = remaining.length ? remaining : [createEncounter("First encounter")];
            return unlinkEncounter({ ...current, encounters, activeEncounterId: encounters[0].id }, encounter.id);
        });

    const addCombatants = (event: FormEvent) => {
        event.preventDefault();
        const name = form.name.trim() || "Combatant";
        const count = Math.min(20, Math.max(1, toInt(form.count, 1)));

        updateEncounter((current) => {
            const names = current.combatants.map((c) => c.name);
            const added: Combatant[] = [];
            for (let i = 0; i < count; i++) {
                const taken = [...names, ...added.map((c) => c.name)];
                const unique = taken.includes(name) ? duplicateName(name, taken) : name;
                added.push(createCombatant({
                    name: unique,
                    kind: form.kind,
                    initiativeMod: toInt(form.initiativeMod),
                    maxHp: Math.max(0, toInt(form.maxHp, 10)),
                    ac: form.ac.trim(),
                    creatureType: form.creatureType.trim(),
                    alignment: form.alignment.trim(),
                }));
            }
            return { ...current, combatants: [...current.combatants, ...added] };
        });
        setForm({ ...EMPTY_FORM, kind: form.kind, creatureType: form.creatureType, alignment: form.alignment });
    };

    const order = sortCombatants(encounter.combatants);
    const active = order.find((c) => c.id === encounter.turnId);
    const outcome = encounterOutcome(encounter);

    return (
        <div className="dms-tracker">
            {/* ---------------- Encounter list ---------------- */}
            <aside className="dms-panel dms-encounter-list" aria-label="Encounters">
                <h2 className="dms-panel-title">Encounters</h2>
                <ul>
                    {data.encounters.map((e) => {
                        const result = encounterOutcome(e);
                        return (
                            <li key={e.id}>
                                <button
                                    type="button"
                                    className={e.id === encounter.id ? "dms-encounter-item active" : "dms-encounter-item"}
                                    aria-current={e.id === encounter.id}
                                    onClick={() => setData((current) => ({ ...current, activeEncounterId: e.id }))}
                                >
                                    <span>{e.name || "Untitled"}</span>
                                    <small>
                                        {e.combatants.length} · R{e.round}
                                        {result && <> · <span className={`dms-outcome-text dms-outcome--${result}`}>{OUTCOME_LABELS[result]}</span></>}
                                    </small>
                                </button>
                            </li>
                        );
                    })}
                </ul>
                <button type="button" className="dms-button dms-button--ghost" onClick={addEncounter}>
                    + New encounter
                </button>
            </aside>

            {/* ---------------- Active encounter ---------------- */}
            <section className="dms-panel dms-encounter">
                <div className="dms-encounter-header">
                    <label className="dms-field dms-encounter-name">
                        <span>Encounter name</span>
                        <input value={encounter.name} onChange={(e) => updateEncounter((c) => ({ ...c, name: e.target.value }))} />
                    </label>
                    <ConfirmButton label="Delete encounter" onConfirm={deleteEncounter} />
                </div>

                <div className="dms-turn-bar">
                    <div className="dms-round">
                        <span className="dms-round-label">Round</span>
                        <span className="dms-round-value">{encounter.round}</span>
                    </div>
                    <div className="dms-turn-now">
                        <span className="dms-round-label">Turn</span>
                        <span className="dms-turn-name">{active ? active.name : "Not started"}</span>
                    </div>
                    <div className="dms-turn-buttons">
                        <button type="button" className="dms-button dms-button--ghost" onClick={() => updateEncounter(previousTurn)} disabled={!order.length}>
                            ← Previous
                        </button>
                        <button type="button" className="dms-button" onClick={() => updateEncounter(nextTurn)} disabled={!order.length}>
                            {active ? "Next turn →" : "Start →"}
                        </button>
                    </div>
                </div>

                {outcome && (
                    <p className={`dms-outcome dms-outcome--${outcome}`} role="status">
                        <strong>Combat over: {OUTCOME_LABELS[outcome]}.</strong>{" "}
                        {outcome === "pcs" ? "Every monster is down." : "Every PC is down."} Heal someone to keep fighting.
                    </p>
                )}

                <div className="dms-toolbar">
                    <button type="button" className="dms-button dms-button--ghost" onClick={() => updateEncounter((c) => rollInitiative(c, "non-pc"))}>
                        Roll initiative (NPCs &amp; monsters)
                    </button>
                    <button type="button" className="dms-button dms-button--ghost" onClick={() => updateEncounter((c) => rollInitiative(c, "all"))}>
                        Roll for everyone
                    </button>
                    <button
                        type="button"
                        className="dms-link-button"
                        onClick={() => updateEncounter((c) => ({ ...c, round: 1, turnId: null }))}
                    >
                        Reset rounds
                    </button>
                </div>

                <form className="dms-add-form" onSubmit={addCombatants}>
                    <label className="dms-field dms-add-name">
                        <span>Name</span>
                        <input value={form.name} placeholder="e.g. Goblin" onChange={(e) => setForm({ ...form, name: e.target.value })} />
                    </label>
                    <label className="dms-field dms-add-wide dms-add-type">
                        <span>Size / type</span>
                        <input
                            value={form.creatureType}
                            placeholder="e.g. Small humanoid"
                            onChange={(e) => setForm({ ...form, creatureType: e.target.value })}
                        />
                    </label>
                    <label className="dms-field dms-add-wide">
                        <span>Alignment</span>
                        <input value={form.alignment} placeholder="e.g. Neutral evil" onChange={(e) => setForm({ ...form, alignment: e.target.value })} />
                    </label>
                    <label className="dms-field">
                        <span>Type</span>
                        <select value={form.kind} onChange={(e) => setForm({ ...form, kind: e.target.value as CombatantKind })}>
                            {COMBATANT_KINDS.map((k) => <option key={k.value} value={k.value}>{k.label}</option>)}
                        </select>
                    </label>
                    <label className="dms-field">
                        <span>Init mod</span>
                        <input inputMode="numeric" value={form.initiativeMod} onChange={(e) => setForm({ ...form, initiativeMod: e.target.value })} />
                    </label>
                    <label className="dms-field">
                        <span>Max HP</span>
                        <input inputMode="numeric" value={form.maxHp} onChange={(e) => setForm({ ...form, maxHp: e.target.value })} />
                    </label>
                    <label className="dms-field">
                        <span>AC / Def</span>
                        <input value={form.ac} onChange={(e) => setForm({ ...form, ac: e.target.value })} />
                    </label>
                    <label className="dms-field">
                        <span>How many</span>
                        <input inputMode="numeric" value={form.count} onChange={(e) => setForm({ ...form, count: e.target.value })} />
                    </label>
                    <button type="submit" className="dms-button">+ Add</button>
                </form>

                {order.length === 0 ? (
                    <p className="dms-empty">No combatants yet. Add the party and their foes above.</p>
                ) : (
                    <ol className="dms-combatants">
                        {order.map((c) => (
                            <CombatantRow
                                key={c.id}
                                combatant={c}
                                isTurn={c.id === encounter.turnId}
                                update={(change) => updateCombatant(c.id, change)}
                                onDuplicate={() => updateEncounter((e) => duplicateCombatant(e, c.id))}
                                onRemove={() => updateEncounter((e) => removeCombatant(e, c.id))}
                            />
                        ))}
                    </ol>
                )}
            </section>
        </div>
    );
}

interface CombatantRowProps {
    combatant: Combatant;
    isTurn: boolean;
    update: (change: (current: Combatant) => Combatant) => void;
    onDuplicate: () => void;
    onRemove: () => void;
}

function CombatantRow({ combatant: c, isTurn, update, onDuplicate, onRemove }: CombatantRowProps) {
    const [amount, setAmount] = useState("");
    const [custom, setCustom] = useState("");
    // Notes show when there are some, or once "+ Notes" is clicked.
    const [notesOpen, setNotesOpen] = useState(false);
    const showNotes = notesOpen || c.notes !== "";
    // Same for attacks and loot, so rows without them stay compact.
    const [attacksOpen, setAttacksOpen] = useState(false);
    const showAttacks = attacksOpen || c.attacks.length > 0;
    const [lootOpen, setLootOpen] = useState(false);
    const showLoot = lootOpen || c.loot !== "";
    const down = isDown(c);
    const set = (fields: Partial<Combatant>) => update((current) => ({ ...current, ...fields }));
    const available = STANDARD_CONDITIONS.filter((name) => !c.conditions.some((x) => x.toLowerCase() === name.toLowerCase()));

    const applyAmount = (kind: "damage" | "heal") => {
        const value = toInt(amount, 0);
        if (value <= 0) return;
        update((current) => (kind === "damage" ? applyDamage(current, value) : applyHeal(current, value)));
        setAmount("");
    };

    const className = ["dms-combatant", `dms-kind-${c.kind}`, isTurn ? "turn" : "", down ? "down" : ""].filter(Boolean).join(" ");
    const hpPercent = c.maxHp > 0 ? Math.round((c.hp / c.maxHp) * 100) : 0;

    return (
        <li className={className} aria-current={isTurn ? "step" : undefined}>
            <div className="dms-combatant-main">
                <label className="dms-field dms-init">
                    <span>Init</span>
                    <input inputMode="numeric" value={c.initiative} onChange={(e) => set({ initiative: toInt(e.target.value) })} />
                </label>
                <label className="dms-field dms-combatant-name">
                    <span>
                        {isTurn && <strong className="dms-badge dms-badge--turn">Turn</strong>}
                        {down && <strong className="dms-badge dms-badge--down">Down</strong>}
                        Name
                    </span>
                    <input value={c.name} onChange={(e) => set({ name: e.target.value })} />
                </label>
                <label className="dms-field">
                    <span>Type</span>
                    <select value={c.kind} onChange={(e) => set({ kind: e.target.value as CombatantKind })}>
                        {COMBATANT_KINDS.map((k) => <option key={k.value} value={k.value}>{k.label}</option>)}
                    </select>
                </label>
                <label className="dms-field dms-small">
                    <span>Mod</span>
                    <input inputMode="numeric" value={c.initiativeMod} onChange={(e) => set({ initiativeMod: toInt(e.target.value) })} />
                </label>
                <label className="dms-field dms-small">
                    <span>AC / Def</span>
                    <input value={c.ac} onChange={(e) => set({ ac: e.target.value })} />
                </label>
                <div className="dms-row-actions">
                    <button type="button" className="dms-link-button" onClick={onDuplicate}>Duplicate</button>
                    <ConfirmButton label="Remove" confirmLabel="Sure?" onConfirm={onRemove} />
                </div>
            </div>

            <div className="dms-combatant-details">
                <label className="dms-field">
                    <span>Size / type</span>
                    <input value={c.creatureType} placeholder="e.g. Medium undead" onChange={(e) => set({ creatureType: e.target.value })} />
                </label>
                <label className="dms-field">
                    <span>Alignment</span>
                    <input value={c.alignment} placeholder="e.g. Chaotic evil" onChange={(e) => set({ alignment: e.target.value })} />
                </label>
            </div>

            <div className="dms-combatant-hp">
                <div className="dms-hp-fields">
                    <label className="dms-field dms-small">
                        <span>HP</span>
                        <input
                            inputMode="numeric"
                            value={c.hp}
                            onChange={(e) => set({ hp: Math.min(c.maxHp, Math.max(0, toInt(e.target.value))) })}
                        />
                    </label>
                    <span className="dms-hp-slash">/</span>
                    <label className="dms-field dms-small">
                        <span>Max</span>
                        <input
                            inputMode="numeric"
                            value={c.maxHp}
                            onChange={(e) => {
                                const maxHp = Math.max(0, toInt(e.target.value));
                                set({ maxHp, hp: Math.min(c.hp, maxHp) });
                            }}
                        />
                    </label>
                    <label className="dms-field dms-small">
                        <span>Temp</span>
                        <input inputMode="numeric" value={c.tempHp} onChange={(e) => set({ tempHp: Math.max(0, toInt(e.target.value)) })} />
                    </label>
                </div>
                <div className="dms-hp-bar" aria-hidden="true">
                    <span style={{ width: `${hpPercent}%` }} />
                </div>
                <div className="dms-hp-change">
                    <input
                        aria-label={`Damage or healing for ${c.name}`}
                        inputMode="numeric"
                        placeholder="0"
                        value={amount}
                        onChange={(e) => setAmount(e.target.value)}
                        onKeyDown={(e) => {
                            if (e.key === "Enter") {
                                e.preventDefault();
                                applyAmount("damage");
                            }
                        }}
                    />
                    <button type="button" className="dms-button dms-button--danger" onClick={() => applyAmount("damage")}>Damage</button>
                    <button type="button" className="dms-button dms-button--heal" onClick={() => applyAmount("heal")}>Heal</button>
                </div>
            </div>

            <div className="dms-conditions">
                {c.conditions.map((condition) => (
                    <button
                        key={condition}
                        type="button"
                        className="dms-chip active"
                        title="Remove condition"
                        onClick={() => update((current) => toggleCondition(current, condition))}
                    >
                        {condition} ×
                    </button>
                ))}
                <select
                    aria-label={`Add condition to ${c.name}`}
                    value=""
                    onChange={(e) => update((current) => toggleCondition(current, e.target.value))}
                >
                    <option value="">+ Condition…</option>
                    {available.map((name) => <option key={name} value={name}>{name}</option>)}
                </select>
                <form
                    className="dms-custom-condition"
                    onSubmit={(e) => {
                        e.preventDefault();
                        if (!custom.trim()) return;
                        update((current) => toggleCondition(current, custom));
                        setCustom("");
                    }}
                >
                    <input aria-label="Custom condition" placeholder="Custom…" value={custom} onChange={(e) => setCustom(e.target.value)} />
                </form>
                {!showAttacks && (
                    <button type="button" className="dms-link-button" onClick={() => setAttacksOpen(true)}>+ Attacks</button>
                )}
                {!showLoot && (
                    <button type="button" className="dms-link-button" onClick={() => setLootOpen(true)}>+ Loot</button>
                )}
                {!showNotes && (
                    <button type="button" className="dms-link-button" onClick={() => setNotesOpen(true)}>+ Notes</button>
                )}
            </div>

            {showAttacks && (
                <div className="dms-field dms-combatant-attacks">
                    <span>Attacks &amp; spells</span>
                    <AttackList attacks={c.attacks} onChange={(attacks) => set({ attacks })} />
                </div>
            )}

            {showLoot && (
                <div className="dms-field dms-notes">
                    <div className="dms-notes-header">
                        <label htmlFor={`loot-${c.id}`}>Loot</label>
                        <ConfirmButton
                            label="Remove loot"
                            confirmLabel="Sure?"
                            onConfirm={() => {
                                set({ loot: "" });
                                setLootOpen(false);
                            }}
                        />
                    </div>
                    <textarea
                        id={`loot-${c.id}`}
                        rows={2}
                        value={c.loot}
                        placeholder="What they drop: 12 gp, a rusty key…"
                        autoFocus={lootOpen && c.loot === ""}
                        onChange={(e) => set({ loot: e.target.value })}
                    />
                </div>
            )}

            {showNotes && (
                <div className="dms-field dms-notes">
                    <div className="dms-notes-header">
                        <label htmlFor={`notes-${c.id}`}>Notes</label>
                        <ConfirmButton
                            label="Remove notes"
                            confirmLabel="Sure?"
                            onConfirm={() => {
                                set({ notes: "" });
                                setNotesOpen(false);
                            }}
                        />
                    </div>
                    <textarea
                        id={`notes-${c.id}`}
                        rows={4}
                        value={c.notes}
                        placeholder="Tactics, abilities…"
                        autoFocus={notesOpen && c.notes === ""}
                        onChange={(e) => set({ notes: e.target.value })}
                    />
                </div>
            )}
        </li>
    );
}
