import { useState, type Dispatch, type SetStateAction } from "react";

import { starterMonsters } from "../../utils/dmMonsters";
import { toInt } from "../../utils/makeId";
import {
    combatantsFromMonster,
    createMonster,
    monsterMatches,
    removeMonster,
    rollFormula,
    type DmScreenData,
    type Monster,
} from "../../utils/dmScreen";
import AttackList from "./AttackList";
import ConfirmButton from "./ConfirmButton";
import ImageField from "./ImageField";

interface MonsterManagerProps {
    data: DmScreenData;
    setData: Dispatch<SetStateAction<DmScreenData>>;
    onRunEncounter: (encounterId: string) => void;
}

export default function MonsterManager({ data, setData, onRunEncounter }: MonsterManagerProps) {
    const [query, setQuery] = useState("");
    const monster = data.monsters.find((m) => m.id === data.activeMonsterId) ?? data.monsters[0];
    const shown = data.monsters.filter((m) => monsterMatches(m, query));

    const addMonster = () => {
        const created = createMonster({ name: `Monster ${data.monsters.length + 1}` });
        setData((current) => ({ ...current, monsters: [...current.monsters, created], activeMonsterId: created.id }));
        // So the new monster shows in the list.
        setQuery("");
    };

    const addStarters = () => {
        const starters = starterMonsters();
        setData((current) => ({ ...current, monsters: [...current.monsters, ...starters], activeMonsterId: starters[0].id }));
    };

    return (
        <div className="dms-tracker dms-npcs">
            {/* ---------------- Monster list ---------------- */}
            <aside className="dms-panel dms-encounter-list" aria-label="Monsters">
                <h2 className="dms-panel-title">Monsters</h2>
                {data.monsters.length > 0 && (
                    <label className="dms-field dms-list-search">
                        <span>Search</span>
                        <input type="search" value={query} placeholder="Name, type, challenge, traits…" onChange={(e) => setQuery(e.target.value)} />
                    </label>
                )}
                {data.monsters.length > 0 && shown.length === 0 && <p className="dms-empty">No monsters match "{query.trim()}".</p>}
                {shown.length > 0 && (
                    <ul>
                        {shown.map((m) => (
                            <li key={m.id}>
                                <button
                                    type="button"
                                    className={m.id === monster?.id ? "dms-encounter-item active" : "dms-encounter-item"}
                                    aria-current={m.id === monster?.id}
                                    onClick={() => setData((current) => ({ ...current, activeMonsterId: m.id }))}
                                >
                                    <span>{m.name || "Unnamed"}</span>
                                    <small>
                                        {[m.challenge && `CR ${m.challenge}`, m.ac && `AC ${m.ac}`, `HP ${m.hp}`].filter(Boolean).join(" · ")}
                                    </small>
                                </button>
                            </li>
                        ))}
                    </ul>
                )}
                <div className="dms-inspector-buttons">
                    <button type="button" className="dms-button dms-button--ghost" onClick={addMonster}>
                        + New monster
                    </button>
                    {data.monsters.length === 0 && (
                        <button type="button" className="dms-button dms-button--ghost" onClick={addStarters}>
                            + Add starter monsters
                        </button>
                    )}
                </div>
            </aside>

            {/* ---------------- Selected monster ---------------- */}
            <section className="dms-panel dms-encounter">
                {monster ? (
                    <MonsterSheet key={monster.id} monster={monster} data={data} setData={setData} onRunEncounter={onRunEncounter} />
                ) : (
                    <p className="dms-empty">
                        No monsters yet. Save a stat block once and add as many copies as you like to any encounter.
                        Start with a few common ones, or save a combatant from the tracker with "Save to library".
                    </p>
                )}
            </section>
        </div>
    );
}

interface MonsterSheetProps extends MonsterManagerProps {
    monster: Monster;
}

function MonsterSheet({ monster, data, setData, onRunEncounter }: MonsterSheetProps) {
    const encounter = data.encounters.find((e) => e.id === data.activeEncounterId) ?? data.encounters[0];
    const [encounterId, setEncounterId] = useState(encounter.id);
    const [count, setCount] = useState("1");
    const [rollHp, setRollHp] = useState(true);
    const [added, setAdded] = useState("");
    const target = data.encounters.find((e) => e.id === encounterId) ?? encounter;
    const diceValid = rollFormula(monster.hpDice) !== null;

    const set = (fields: Partial<Monster>) =>
        setData((current) => ({ ...current, monsters: current.monsters.map((m) => (m.id === monster.id ? { ...m, ...fields } : m)) }));

    const addToEncounter = () => {
        const amount = Math.min(20, Math.max(1, toInt(count, 1)));
        setData((current) => ({
            ...current,
            encounters: current.encounters.map((e) => {
                if (e.id !== target.id) return e;
                const copies = combatantsFromMonster(monster, amount, e.combatants.map((c) => c.name), rollHp && diceValid);
                return { ...e, combatants: [...e.combatants, ...copies] };
            }),
        }));
        setAdded(`Added ${amount} × ${monster.name || "monster"} to ${target.name || "the encounter"}.`);
    };

    return (
        <>
            <div className="dms-encounter-header">
                <label className="dms-field dms-encounter-name">
                    <span>Name</span>
                    <input value={monster.name} onChange={(e) => set({ name: e.target.value })} />
                </label>
                <ConfirmButton label="Delete monster" onConfirm={() => setData((current) => removeMonster(current, monster.id))} />
            </div>

            <div className="dms-npc-sheet">
                <div className="dms-npc-fields">
                    <div className="dms-npc-row dms-npc-stats">
                        <label className="dms-field">
                            <span>Size / type</span>
                            <input value={monster.creatureType} placeholder="e.g. Small humanoid" onChange={(e) => set({ creatureType: e.target.value })} />
                        </label>
                        <label className="dms-field">
                            <span>Alignment</span>
                            <input value={monster.alignment} onChange={(e) => set({ alignment: e.target.value })} />
                        </label>
                        <label className="dms-field">
                            <span>Challenge</span>
                            <input value={monster.challenge} placeholder="e.g. 1/4" onChange={(e) => set({ challenge: e.target.value })} />
                        </label>
                    </div>
                    <div className="dms-npc-row dms-player-stats">
                        <label className="dms-field">
                            <span>AC / Def</span>
                            <input value={monster.ac} onChange={(e) => set({ ac: e.target.value })} />
                        </label>
                        <label className="dms-field">
                            <span>HP (average)</span>
                            <input inputMode="numeric" value={monster.hp} onChange={(e) => set({ hp: Math.max(0, toInt(e.target.value)) })} />
                        </label>
                        <label className="dms-field">
                            <span>Hit dice</span>
                            <input value={monster.hpDice} placeholder="e.g. 2d6 + 2" onChange={(e) => set({ hpDice: e.target.value })} />
                        </label>
                        <label className="dms-field">
                            <span>Init mod</span>
                            <input inputMode="numeric" value={monster.initiativeMod} onChange={(e) => set({ initiativeMod: toInt(e.target.value) })} />
                        </label>
                    </div>
                    {monster.hpDice.trim() && !diceValid && (
                        <p className="dms-error-text">Hit dice should look like "2d6 + 2"; until then copies use the average HP.</p>
                    )}
                    <label className="dms-field">
                        <span>Speed</span>
                        <input value={monster.speed} placeholder="e.g. 30 ft, fly 60 ft" onChange={(e) => set({ speed: e.target.value })} />
                    </label>
                    <div className="dms-inspector-section">
                        <span className="dms-subtitle">Attacks &amp; spells</span>
                        <AttackList attacks={monster.attacks} onChange={(attacks) => set({ attacks })} />
                    </div>
                    <label className="dms-field dms-notes">
                        <span>Traits &amp; tactics</span>
                        <textarea
                            rows={5}
                            value={monster.traits}
                            placeholder="Special abilities, resistances, how it fights… (goes into each copy's notes)"
                            onChange={(e) => set({ traits: e.target.value })}
                        />
                    </label>
                    <label className="dms-field">
                        <span>Loot</span>
                        <textarea rows={2} value={monster.loot} placeholder="What each one drops" onChange={(e) => set({ loot: e.target.value })} />
                    </label>
                </div>

                <div className="dms-npc-side">
                    <ImageField image={monster.image} alt={monster.name} onChange={(image) => set({ image })} />

                    <div className="dms-inspector-section">
                        <span className="dms-subtitle">Add to an encounter</span>
                        <label className="dms-field">
                            <span>Encounter</span>
                            <select value={target.id} onChange={(e) => setEncounterId(e.target.value)}>
                                {data.encounters.map((e) => <option key={e.id} value={e.id}>{e.name || "Untitled"}</option>)}
                            </select>
                        </label>
                        <label className="dms-field dms-small">
                            <span>How many</span>
                            <input inputMode="numeric" value={count} onChange={(e) => setCount(e.target.value)} />
                        </label>
                        <label className="dms-check-field">
                            <input type="checkbox" checked={rollHp && diceValid} disabled={!diceValid} onChange={(e) => setRollHp(e.target.checked)} />
                            <span>{diceValid ? `Roll HP for each (${monster.hpDice})` : "Roll HP (add hit dice first)"}</span>
                        </label>
                        <div className="dms-inspector-buttons">
                            <button type="button" className="dms-button" onClick={addToEncounter}>+ Add to encounter</button>
                        </div>
                        {added && (
                            <p className="dms-inspector-help" role="status">
                                {added}{" "}
                                <button type="button" className="dms-link-button" onClick={() => onRunEncounter(target.id)}>Open tracker →</button>
                            </p>
                        )}
                        <p className="dms-inspector-help">Each copy is its own combatant: changing the library later doesn't change fights already set up.</p>
                    </div>
                </div>
            </div>
        </>
    );
}
