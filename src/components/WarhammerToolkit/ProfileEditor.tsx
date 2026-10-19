import { useMemo } from "react";

import { useWarhammerData } from "../../hooks/useWarhammerData";
import {
    TARGET_KEYWORDS,
    TARGET_PRESETS,
    type Reroll,
    type Situation,
    type Target,
} from "../../utils/mathhammer";
import { factionLabel, listDatasheets, listFactions, listWeapons } from "./armyData";
import { newRow, type ProfileRow } from "./profileRows";

// Shared editors for the Mathhammer and Battle tabs.

const REROLL_OPTIONS: { value: Reroll; label: string }[] = [
    { value: "none", label: "No re-roll" },
    { value: "ones", label: "Re-roll 1s" },
    { value: "fails", label: "Re-roll fails" },
];

// =====================================
// Weapons
// =====================================

export function WeaponRowsEditor({
    rows,
    onChange,
    defaultModels = 10,
}: {
    rows: ProfileRow[];
    onChange: (rows: ProfileRow[]) => void;
    defaultModels?: number;
}) {
    const { units, characters } = useWarhammerData();
    const factions = useMemo(() => listFactions(units, characters), [units, characters]);

    const updateRow = (key: string, change: Partial<ProfileRow>) =>
        onChange(rows.map((row) => (row.key === key ? { ...row, ...change } : row)));

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
        <>
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
                                    onClick={() => onChange(rows.filter((r) => r.key !== row.key))}
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

            <button type="button" className="whk-button whk-button--ghost" onClick={() => onChange([...rows, newRow(defaultModels)])}>
                + Add weapon
            </button>
        </>
    );
}

// =====================================
// Situation
// =====================================

export function SituationEditor({ situation, onChange }: { situation: Situation; onChange: (situation: Situation) => void }) {
    return (
        <>
            <div className="whk-toggles">
                <label className="whk-check">
                    <input type="checkbox" checked={situation.halfRange} onChange={(e) => onChange({ ...situation, halfRange: e.target.checked })} />
                    Within half range <small>(Rapid Fire, Melta)</small>
                </label>
                <label className="whk-check">
                    <input type="checkbox" checked={situation.stationary} onChange={(e) => onChange({ ...situation, stationary: e.target.checked })} />
                    Remained stationary <small>(Heavy)</small>
                </label>
                <label className="whk-check">
                    <input type="checkbox" checked={situation.charged} onChange={(e) => onChange({ ...situation, charged: e.target.checked })} />
                    Charged this turn <small>(Lance)</small>
                </label>
            </div>

            <div className="whk-modifier-grid">
                <label className="whk-field">
                    <span>Hit modifier</span>
                    <select value={situation.hitModifier} onChange={(e) => onChange({ ...situation, hitModifier: Number(e.target.value) })}>
                        <option value={-1}>−1</option>
                        <option value={0}>0</option>
                        <option value={1}>+1</option>
                    </select>
                </label>
                <label className="whk-field">
                    <span>Wound modifier</span>
                    <select value={situation.woundModifier} onChange={(e) => onChange({ ...situation, woundModifier: Number(e.target.value) })}>
                        <option value={-1}>−1</option>
                        <option value={0}>0</option>
                        <option value={1}>+1</option>
                    </select>
                </label>
                <label className="whk-field">
                    <span>Hit re-roll</span>
                    <select value={situation.rerollHits} onChange={(e) => onChange({ ...situation, rerollHits: e.target.value as Reroll })}>
                        {REROLL_OPTIONS.map((o) => <option key={o.value} value={o.value}>{o.label}</option>)}
                    </select>
                </label>
                <label className="whk-field">
                    <span>Wound re-roll</span>
                    <select value={situation.rerollWounds} onChange={(e) => onChange({ ...situation, rerollWounds: e.target.value as Reroll })}>
                        {REROLL_OPTIONS.map((o) => <option key={o.value} value={o.value}>{o.label}</option>)}
                    </select>
                </label>
                <label className="whk-field">
                    <span>Critical hits on</span>
                    <select value={situation.critHitOn} onChange={(e) => onChange({ ...situation, critHitOn: Number(e.target.value) })}>
                        <option value={6}>6</option>
                        <option value={5}>5+</option>
                    </select>
                </label>
            </div>
        </>
    );
}

// =====================================
// Defensive stats
// =====================================

export function DefenceEditor({
    target,
    presetName,
    onChange,
}: {
    target: Target;
    presetName: string;
    // presetName is "" once the stats are edited by hand.
    onChange: (target: Target, presetName: string) => void;
}) {
    const update = (change: Partial<Target>) => onChange({ ...target, ...change }, "");

    return (
        <>
            <label className="whk-field whk-field--wide">
                <span>Preset</span>
                <select
                    value={presetName}
                    onChange={(e) => {
                        const preset = TARGET_PRESETS.find((p) => p.name === e.target.value);
                        if (preset) onChange(preset.target, preset.name);
                    }}
                >
                    <option value="">Custom</option>
                    {TARGET_PRESETS.map((p) => <option key={p.name} value={p.name}>{p.name}</option>)}
                </select>
            </label>

            <div className="whk-stat-grid">
                <label className="whk-field">
                    <span>T</span>
                    <input type="number" min={1} max={30} value={target.toughness} onChange={(e) => update({ toughness: Number(e.target.value) })} />
                </label>
                <label className="whk-field">
                    <span>Sv</span>
                    <select value={target.save} onChange={(e) => update({ save: Number(e.target.value) })}>
                        {[2, 3, 4, 5, 6].map((v) => <option key={v} value={v}>{v}+</option>)}
                        <option value={7}>None</option>
                    </select>
                </label>
                <label className="whk-field">
                    <span>Invuln</span>
                    <select value={target.invuln ?? ""} onChange={(e) => update({ invuln: e.target.value ? Number(e.target.value) : undefined })}>
                        <option value="">None</option>
                        {[2, 3, 4, 5, 6].map((v) => <option key={v} value={v}>{v}++</option>)}
                    </select>
                </label>
                <label className="whk-field">
                    <span>W</span>
                    <input type="number" min={1} max={100} value={target.wounds} onChange={(e) => update({ wounds: Number(e.target.value) })} />
                </label>
                <label className="whk-field">
                    <span>Models</span>
                    <input type="number" min={1} max={100} value={target.models} onChange={(e) => update({ models: Number(e.target.value) })} />
                </label>
                <label className="whk-field">
                    <span>Feel No Pain</span>
                    <select value={target.feelNoPain ?? ""} onChange={(e) => update({ feelNoPain: e.target.value ? Number(e.target.value) : undefined })}>
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
                            onClick={() => update({
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
                    <input type="checkbox" checked={target.cover} onChange={(e) => update({ cover: e.target.checked })} />
                    In cover
                </label>
                <label className="whk-check">
                    <input type="checkbox" checked={target.damageReduction} onChange={(e) => update({ damageReduction: e.target.checked })} />
                    −1 Damage
                </label>
            </div>
        </>
    );
}
