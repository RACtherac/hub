import { useMemo, useState } from "react";

import { useWarhammerData } from "../../hooks/useWarhammerData";
import {
    DEFAULT_SITUATION,
    MathhammerInputError,
    TARGET_KEYWORDS,
    TARGET_PRESETS,
    calculate,
    type AttackProfile,
    type MathhammerResult,
    type Reroll,
    type Situation,
    type Target,
} from "../../utils/mathhammer";
import { factionLabel, listDatasheets, listFactions, listWeapons } from "./armyData";
import KillChart from "./KillChart";

interface ProfileRow extends Omit<AttackProfile, "keywords"> {
    key: string;
    keywords: string;
    faction: string;
    sheetId: string;
    weaponKey: string;
}

let nextRowKey = 1;

function newRow(): ProfileRow {
    return {
        key: `row-${nextRowKey++}`,
        name: "Boltgun",
        models: 10,
        attacks: "2",
        skill: "3+",
        strength: "4",
        ap: "0",
        damage: "1",
        keywords: "",
        faction: "",
        sheetId: "",
        weaponKey: "",
    };
}

const percent = (value: number) =>
    value > 0 && value < 0.001 ? "<0.1%" : `${(value * 100).toFixed(value < 0.01 ? 1 : 0)}%`;
const decimal = (value: number) => value.toFixed(value >= 100 ? 0 : 2);

const REROLL_OPTIONS: { value: Reroll; label: string }[] = [
    { value: "none", label: "No re-roll" },
    { value: "ones", label: "Re-roll 1s" },
    { value: "fails", label: "Re-roll fails" },
];

export default function Mathhammer() {
    const { units, characters } = useWarhammerData();
    const factions = useMemo(() => listFactions(units, characters), [units, characters]);

    const [rows, setRows] = useState<ProfileRow[]>(() => [newRow()]);
    const [target, setTarget] = useState<Target>(TARGET_PRESETS[3].target);
    const [presetName, setPresetName] = useState(TARGET_PRESETS[3].name);
    const [situation, setSituation] = useState<Situation>(DEFAULT_SITUATION);

    const outcome = useMemo((): { result: MathhammerResult } | { error: string } => {
        try {
            const profiles = rows.map((row) => ({
                ...row,
                keywords: row.keywords.split(",").map((k) => k.trim()).filter(Boolean),
            }));
            return { result: calculate(profiles, target, situation) };
        }
        catch (error) {
            if (error instanceof MathhammerInputError) return { error: error.message };
            throw error;
        }
    }, [rows, target, situation]);

    const updateRow = (key: string, change: Partial<ProfileRow>) =>
        setRows((current) => current.map((row) => (row.key === key ? { ...row, ...change } : row)));

    const updateTarget = (change: Partial<Target>) => {
        setTarget((current) => ({ ...current, ...change }));
        setPresetName("");
    };

    const pickWeapon = (row: ProfileRow, sheetId: string, weaponKey: string) => {
        const sheet = listDatasheets(units, characters, row.faction).find((s) => s.id === sheetId);
        const weapon = sheet && listWeapons(sheet).find((w) => w.key === weaponKey);
        if (!sheet || !weapon) {
            updateRow(row.key, { sheetId, weaponKey: "" });
            return;
        }

        const { profile } = weapon;
        updateRow(row.key, {
            sheetId,
            weaponKey,
            name: `${sheet.name}: ${weapon.label.replace(/ \([^)]*\)$/, "")}`,
            models: weapon.models,
            attacks: profile.attacks,
            skill: profile.skill,
            strength: profile.strength,
            ap: profile.ap,
            damage: profile.damage,
            keywords: (profile.keywords ?? []).join(", "),
        });
    };

    return (
        <div className="whk-mathhammer">
            <div className="whk-columns">
                {/* ---------------- Attacker ---------------- */}
                <section className="whk-panel">
                    <h2 className="whk-panel-title">Attacker</h2>

                    {rows.map((row, index) => {
                        const sheets = row.faction ? listDatasheets(units, characters, row.faction) : [];
                        const sheet = sheets.find((s) => s.id === row.sheetId);
                        const weapons = sheet ? listWeapons(sheet) : [];

                        return (
                            <div key={row.key} className="whk-profile">
                                <div className="whk-profile-header">
                                    <span className="whk-profile-index">Weapon {index + 1}</span>
                                    {rows.length > 1 && (
                                        <button
                                            type="button"
                                            className="whk-link-button"
                                            onClick={() => setRows((current) => current.filter((r) => r.key !== row.key))}
                                        >
                                            Remove
                                        </button>
                                    )}
                                </div>

                                <div className="whk-picker">
                                    <select
                                        value={row.faction}
                                        onChange={(e) => updateRow(row.key, { faction: e.target.value, sheetId: "", weaponKey: "" })}
                                        aria-label="Faction"
                                    >
                                        <option value="">Faction…</option>
                                        {factions.map((faction) => (
                                            <option key={faction} value={faction}>{factionLabel(faction)}</option>
                                        ))}
                                    </select>
                                    <select
                                        value={row.sheetId}
                                        onChange={(e) => pickWeapon(row, e.target.value, "")}
                                        disabled={!row.faction}
                                        aria-label="Unit"
                                    >
                                        <option value="">Unit…</option>
                                        {sheets.map((s) => (
                                            <option key={s.id} value={s.id}>{s.name}</option>
                                        ))}
                                    </select>
                                    <select
                                        value={row.weaponKey}
                                        onChange={(e) => pickWeapon(row, row.sheetId, e.target.value)}
                                        disabled={!sheet}
                                        aria-label="Weapon"
                                    >
                                        <option value="">Weapon…</option>
                                        {weapons.map((w) => (
                                            <option key={w.key} value={w.key}>{w.label}</option>
                                        ))}
                                    </select>
                                </div>

                                <label className="whk-field whk-field--wide">
                                    <span>Name</span>
                                    <input value={row.name} onChange={(e) => updateRow(row.key, { name: e.target.value })} />
                                </label>

                                <div className="whk-stat-grid">
                                    <label className="whk-field">
                                        <span>Models</span>
                                        <input
                                            type="number"
                                            min={0}
                                            max={100}
                                            value={row.models}
                                            onChange={(e) => updateRow(row.key, { models: Math.max(0, Math.min(100, Number(e.target.value) || 0)) })}
                                        />
                                    </label>
                                    <label className="whk-field" title="Attacks per model, e.g. 2, D6 or 2D6+1">
                                        <span>A</span>
                                        <input value={row.attacks} onChange={(e) => updateRow(row.key, { attacks: e.target.value })} />
                                    </label>
                                    <label className="whk-field" title="BS / WS, e.g. 3+ (N/A for Torrent)">
                                        <span>BS/WS</span>
                                        <input value={row.skill} onChange={(e) => updateRow(row.key, { skill: e.target.value })} />
                                    </label>
                                    <label className="whk-field">
                                        <span>S</span>
                                        <input value={row.strength} onChange={(e) => updateRow(row.key, { strength: e.target.value })} />
                                    </label>
                                    <label className="whk-field">
                                        <span>AP</span>
                                        <input value={row.ap} onChange={(e) => updateRow(row.key, { ap: e.target.value })} />
                                    </label>
                                    <label className="whk-field" title="Damage, e.g. 1, D3 or D6+1">
                                        <span>D</span>
                                        <input value={row.damage} onChange={(e) => updateRow(row.key, { damage: e.target.value })} />
                                    </label>
                                </div>

                                <label className="whk-field whk-field--wide">
                                    <span>Keywords (comma separated)</span>
                                    <input
                                        value={row.keywords}
                                        placeholder="e.g. LETHAL HITS, SUSTAINED HITS 1, ANTI-VEHICLE 4+"
                                        onChange={(e) => updateRow(row.key, { keywords: e.target.value })}
                                    />
                                </label>
                            </div>
                        );
                    })}

                    <button type="button" className="whk-button whk-button--ghost" onClick={() => setRows((current) => [...current, newRow()])}>
                        + Add weapon
                    </button>

                    <h3 className="whk-subtitle">Situation</h3>
                    <div className="whk-toggles">
                        <label className="whk-check">
                            <input type="checkbox" checked={situation.halfRange} onChange={(e) => setSituation({ ...situation, halfRange: e.target.checked })} />
                            Within half range <small>(Rapid Fire, Melta)</small>
                        </label>
                        <label className="whk-check">
                            <input type="checkbox" checked={situation.stationary} onChange={(e) => setSituation({ ...situation, stationary: e.target.checked })} />
                            Remained stationary <small>(Heavy)</small>
                        </label>
                        <label className="whk-check">
                            <input type="checkbox" checked={situation.charged} onChange={(e) => setSituation({ ...situation, charged: e.target.checked })} />
                            Charged this turn <small>(Lance)</small>
                        </label>
                    </div>

                    <div className="whk-modifier-grid">
                        <label className="whk-field">
                            <span>Hit modifier</span>
                            <select value={situation.hitModifier} onChange={(e) => setSituation({ ...situation, hitModifier: Number(e.target.value) })}>
                                <option value={-1}>−1</option>
                                <option value={0}>0</option>
                                <option value={1}>+1</option>
                            </select>
                        </label>
                        <label className="whk-field">
                            <span>Wound modifier</span>
                            <select value={situation.woundModifier} onChange={(e) => setSituation({ ...situation, woundModifier: Number(e.target.value) })}>
                                <option value={-1}>−1</option>
                                <option value={0}>0</option>
                                <option value={1}>+1</option>
                            </select>
                        </label>
                        <label className="whk-field">
                            <span>Hit re-roll</span>
                            <select value={situation.rerollHits} onChange={(e) => setSituation({ ...situation, rerollHits: e.target.value as Reroll })}>
                                {REROLL_OPTIONS.map((o) => <option key={o.value} value={o.value}>{o.label}</option>)}
                            </select>
                        </label>
                        <label className="whk-field">
                            <span>Wound re-roll</span>
                            <select value={situation.rerollWounds} onChange={(e) => setSituation({ ...situation, rerollWounds: e.target.value as Reroll })}>
                                {REROLL_OPTIONS.map((o) => <option key={o.value} value={o.value}>{o.label}</option>)}
                            </select>
                        </label>
                        <label className="whk-field">
                            <span>Critical hits on</span>
                            <select value={situation.critHitOn} onChange={(e) => setSituation({ ...situation, critHitOn: Number(e.target.value) })}>
                                <option value={6}>6</option>
                                <option value={5}>5+</option>
                            </select>
                        </label>
                    </div>
                </section>

                {/* ---------------- Target ---------------- */}
                <section className="whk-panel">
                    <h2 className="whk-panel-title">Target</h2>

                    <label className="whk-field whk-field--wide">
                        <span>Preset</span>
                        <select
                            value={presetName}
                            onChange={(e) => {
                                const preset = TARGET_PRESETS.find((p) => p.name === e.target.value);
                                if (!preset) return;
                                setTarget(preset.target);
                                setPresetName(preset.name);
                            }}
                        >
                            <option value="">Custom</option>
                            {TARGET_PRESETS.map((p) => <option key={p.name} value={p.name}>{p.name}</option>)}
                        </select>
                    </label>

                    <div className="whk-stat-grid">
                        <label className="whk-field">
                            <span>T</span>
                            <input type="number" min={1} max={30} value={target.toughness} onChange={(e) => updateTarget({ toughness: Number(e.target.value) })} />
                        </label>
                        <label className="whk-field">
                            <span>Sv</span>
                            <select value={target.save} onChange={(e) => updateTarget({ save: Number(e.target.value) })}>
                                {[2, 3, 4, 5, 6].map((v) => <option key={v} value={v}>{v}+</option>)}
                                <option value={7}>None</option>
                            </select>
                        </label>
                        <label className="whk-field">
                            <span>Invuln</span>
                            <select value={target.invuln ?? ""} onChange={(e) => updateTarget({ invuln: e.target.value ? Number(e.target.value) : undefined })}>
                                <option value="">None</option>
                                {[2, 3, 4, 5, 6].map((v) => <option key={v} value={v}>{v}++</option>)}
                            </select>
                        </label>
                        <label className="whk-field">
                            <span>W</span>
                            <input type="number" min={1} max={100} value={target.wounds} onChange={(e) => updateTarget({ wounds: Number(e.target.value) })} />
                        </label>
                        <label className="whk-field">
                            <span>Models</span>
                            <input type="number" min={1} max={100} value={target.models} onChange={(e) => updateTarget({ models: Number(e.target.value) })} />
                        </label>
                        <label className="whk-field">
                            <span>Feel No Pain</span>
                            <select value={target.feelNoPain ?? ""} onChange={(e) => updateTarget({ feelNoPain: e.target.value ? Number(e.target.value) : undefined })}>
                                <option value="">None</option>
                                {[4, 5, 6].map((v) => <option key={v} value={v}>{v}+++</option>)}
                            </select>
                        </label>
                    </div>

                    <h3 className="whk-subtitle">Keywords <small>(for Anti-X)</small></h3>
                    <div className="whk-chip-row">
                        {TARGET_KEYWORDS.map((keyword) => {
                            const active = target.keywords.includes(keyword);
                            return (
                                <button
                                    key={keyword}
                                    type="button"
                                    className={active ? "whk-chip active" : "whk-chip"}
                                    aria-pressed={active}
                                    onClick={() => updateTarget({
                                        keywords: active ? target.keywords.filter((k) => k !== keyword) : [...target.keywords, keyword],
                                    })}
                                >
                                    {keyword}
                                </button>
                            );
                        })}
                    </div>

                    <div className="whk-toggles">
                        <label className="whk-check">
                            <input type="checkbox" checked={target.cover} onChange={(e) => updateTarget({ cover: e.target.checked })} />
                            In cover
                        </label>
                        <label className="whk-check">
                            <input type="checkbox" checked={target.damageReduction} onChange={(e) => updateTarget({ damageReduction: e.target.checked })} />
                            −1 Damage
                        </label>
                    </div>
                </section>
            </div>

            {/* ---------------- Results ---------------- */}
            <section className="whk-panel whk-results" aria-live="polite">
                <h2 className="whk-panel-title">Results</h2>

                {"error" in outcome ? (
                    <p className="whk-error">{outcome.error}</p>
                ) : (
                    <Results result={outcome.result} models={Math.floor(target.models)} />
                )}
            </section>
        </div>
    );
}

function Results({ result, models }: { result: MathhammerResult; models: number }) {
    return (
        <>
            <div className="whk-tiles">
                <div className="whk-tile">
                    <span className="whk-tile-label">Expected models killed</span>
                    <span className="whk-tile-value">{decimal(result.expectedKills)} <small>/ {models}</small></span>
                </div>
                <div className="whk-tile">
                    <span className="whk-tile-label">Expected damage</span>
                    <span className="whk-tile-value">{decimal(result.expectedDamage)}</span>
                </div>
                <div className="whk-tile">
                    <span className="whk-tile-label">Chance to wipe the unit</span>
                    <span className="whk-tile-value">{percent(result.wipeChance)}</span>
                </div>
            </div>

            <KillChart killAtLeast={result.killAtLeast} killDistribution={result.killDistribution} />

            <div className="whk-table-wrap">
                <table className="whk-table">
                    <caption>Average results per weapon</caption>
                    <thead>
                        <tr>
                            <th scope="col">Weapon</th>
                            <th scope="col">Attacks</th>
                            <th scope="col">Hits</th>
                            <th scope="col">Wounds</th>
                            <th scope="col">Unsaved</th>
                            <th scope="col">Damage</th>
                        </tr>
                    </thead>
                    <tbody>
                        {result.profiles.map((profile, index) => (
                            <tr key={index}>
                                <th scope="row">{profile.name}</th>
                                <td>{decimal(profile.expectedAttacks)}</td>
                                <td>{decimal(profile.expectedHits)} <small>{percent(profile.hitChance)}</small></td>
                                <td>{decimal(profile.expectedWounds)} <small>{percent(profile.woundChance)}</small></td>
                                <td>{decimal(profile.expectedUnsaved)} <small>{percent(profile.failSaveChance)} fail</small></td>
                                <td>{decimal(profile.expectedDamage)}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </>
    );
}
