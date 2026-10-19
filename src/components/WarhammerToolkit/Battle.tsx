import { useEffect, useMemo, useState } from "react";

import {
    MAX_DUEL_STATES,
    fightToTheDeath,
    singleExchange,
    type BattleSide,
    type DuelResult,
    type ExchangeResult,
    type Fighter,
} from "../../utils/battle";
import { DEFAULT_SITUATION, MathhammerInputError, TARGET_PRESETS, expectedValue, type Situation, type Target } from "../../utils/mathhammer";
import DuelChart from "./DuelChart";
import { decimal, percent } from "./format";
import KillChart from "./KillChart";
import { Results } from "./Mathhammer";
import { DefenceEditor, SituationEditor, WeaponRowsEditor } from "./ProfileEditor";
import { newRow, rowsToProfiles, type ProfileRow } from "./profileRows";

type Mode = "exchange" | "death";

interface SideDraft {
    name: string;
    rows: ProfileRow[];
    defence: Target;
    presetName: string;
    situation: Situation;
}

type Outcome =
    | { mode: "exchange"; result: ExchangeResult }
    | { mode: "death"; result: DuelResult }
    | { error: string };

// Wait for typing to stop before running the (sometimes heavy) calculation.
const DEBOUNCE_MS = 200;

function presetDraft(name: string, presetIndex: number, row: Partial<ProfileRow>): SideDraft {
    const preset = TARGET_PRESETS[presetIndex];
    return {
        name,
        rows: [{ ...newRow(preset.target.models), ...row }],
        defence: preset.target,
        presetName: preset.name,
        situation: DEFAULT_SITUATION,
    };
}

const DEFAULT_A = presetDraft("Intercessors", 3, { name: "Bolt rifle", attacks: "2", skill: "3+", strength: "4", ap: "-1", damage: "1" });
const DEFAULT_B = presetDraft("Ork Boyz", 1, { name: "Choppa", attacks: "3", skill: "3+", strength: "5", ap: "-1", damage: "1" });

function toSide(draft: SideDraft): BattleSide {
    return { name: draft.name, profiles: rowsToProfiles(draft.rows), defence: draft.defence, situation: draft.situation };
}

function run(mode: Mode, a: BattleSide, b: BattleSide, rounds: number, first: Fighter): Outcome {
    try {
        return mode === "exchange"
            ? { mode, result: singleExchange(a, b) }
            : { mode, result: fightToTheDeath(a, b, { rounds, first }) };
    }
    catch (error) {
        if (error instanceof MathhammerInputError) return { error: error.message };
        throw error;
    }
}

export default function Battle() {
    const [mode, setMode] = useState<Mode>("death");
    const [rounds, setRounds] = useState(5);
    const [first, setFirst] = useState<Fighter>("a");
    const [drafts, setDrafts] = useState<Record<Fighter, SideDraft>>({ a: DEFAULT_A, b: DEFAULT_B });

    const nameA = drafts.a.name.trim() || "Unit A";
    const nameB = drafts.b.name.trim() || "Unit B";

    const sides = useMemo(() => ({ a: toSide(drafts.a), b: toSide(drafts.b) }), [drafts]);
    const inputKey = useMemo(() => JSON.stringify({ mode, rounds, first, sides }), [mode, rounds, first, sides]);

    const [computed, setComputed] = useState<{ key: string; outcome: Outcome } | null>(null);
    useEffect(() => {
        const timer = window.setTimeout(() => {
            setComputed({ key: inputKey, outcome: run(mode, sides.a, sides.b, rounds, first) });
        }, computed ? DEBOUNCE_MS : 0);
        return () => window.clearTimeout(timer);
        // `computed` only decides the first delay; re-running on it would loop.
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [inputKey]);

    const pending = computed?.key !== inputKey;
    const outcome = computed?.outcome;

    const updateDraft = (fighter: Fighter, change: Partial<SideDraft>) =>
        setDrafts((current) => ({ ...current, [fighter]: { ...current[fighter], ...change } }));

    return (
        <div className="whk-battle">
            <section className="whk-panel">
                <h2 className="whk-panel-title">Battle</h2>
                <p className="whk-hint">
                    Pick two units and see who comes out on top. Each unit's weapons are fired at the other's defensive stats.
                </p>

                <div className="whk-chip-row" role="radiogroup" aria-label="Battle type">
                    {([
                        { id: "exchange", label: "One exchange" },
                        { id: "death", label: "To the death" },
                    ] as const).map((option) => (
                        <button
                            key={option.id}
                            type="button"
                            role="radio"
                            aria-checked={mode === option.id}
                            className={mode === option.id ? "whk-chip active" : "whk-chip"}
                            onClick={() => setMode(option.id)}
                        >
                            {option.label}
                        </button>
                    ))}
                </div>

                {mode === "exchange" ? (
                    <p className="whk-hint">Both units attack once, at full strength.</p>
                ) : (
                    <div className="whk-setup-row whk-battle-setup">
                        <label className="whk-field">
                            <span>Battle rounds (max)</span>
                            <select value={rounds} onChange={(e) => setRounds(Number(e.target.value))}>
                                {Array.from({ length: 10 }, (_, i) => i + 1).map((n) => <option key={n} value={n}>{n}</option>)}
                            </select>
                        </label>
                        <fieldset className="whk-field whk-radio-group">
                            <legend>Attacks first each round</legend>
                            {(["a", "b"] as const).map((fighter) => (
                                <label key={fighter} className="whk-check">
                                    <input type="radio" name="battle-first" checked={first === fighter} onChange={() => setFirst(fighter)} />
                                    {fighter === "a" ? nameA : nameB}
                                </label>
                            ))}
                        </fieldset>
                        <p className="whk-hint whk-battle-note">
                            Each round both units attack with everything they have left. Casualties remove models with the most
                            common weapons first, and damage on a wounded model carries over. Max {MAX_DUEL_STATES} models × wounds per unit.
                        </p>
                    </div>
                )}
            </section>

            <div className="whk-columns">
                {(["a", "b"] as const).map((fighter) => {
                    const draft = drafts[fighter];
                    return (
                        <section key={fighter} className={`whk-panel whk-battle-side whk-battle-side--${fighter}`}>
                            <h2 className="whk-panel-title">
                                <span className={`whk-legend-swatch whk-duel-${fighter}`} aria-hidden="true" />
                                Unit {fighter.toUpperCase()}
                            </h2>

                            <label className="whk-field whk-field--wide">
                                <span>Name</span>
                                <input value={draft.name} onChange={(e) => updateDraft(fighter, { name: e.target.value })} />
                            </label>

                            <h3 className="whk-subtitle">Defence</h3>
                            <DefenceEditor
                                target={draft.defence}
                                presetName={draft.presetName}
                                onChange={(defence, presetName) => updateDraft(fighter, { defence, presetName })}
                            />

                            <h3 className="whk-subtitle">Weapons</h3>
                            <WeaponRowsEditor
                                rows={draft.rows}
                                onChange={(rows) => updateDraft(fighter, { rows })}
                                defaultModels={Math.floor(draft.defence.models)}
                            />

                            <details className="whk-battle-situation">
                                <summary>Situation when attacking</summary>
                                <SituationEditor situation={draft.situation} onChange={(situation) => updateDraft(fighter, { situation })} />
                            </details>
                        </section>
                    );
                })}
            </div>

            <section className={pending ? "whk-panel whk-results pending" : "whk-panel whk-results"} aria-live="polite" aria-busy={pending}>
                <h2 className="whk-panel-title">Results {pending && <small>calculating…</small>}</h2>

                {!outcome ? null : "error" in outcome ? (
                    <p className="whk-error">{outcome.error}</p>
                ) : outcome.mode === "exchange" ? (
                    <ExchangeResults result={outcome.result} nameA={nameA} nameB={nameB} drafts={drafts} />
                ) : (
                    <DuelResults result={outcome.result} nameA={nameA} nameB={nameB} rounds={rounds} />
                )}
            </section>
        </div>
    );
}

function ExchangeResults({
    result,
    nameA,
    nameB,
    drafts,
}: {
    result: ExchangeResult;
    nameA: string;
    nameB: string;
    drafts: Record<Fighter, SideDraft>;
}) {
    return (
        <>
            <h3 className="whk-subtitle">{nameA} attacks {nameB}</h3>
            <Results result={result.aOnB} models={Math.floor(drafts.b.defence.models)} />

            <h3 className="whk-subtitle">{nameB} attacks {nameA}</h3>
            <Results result={result.bOnA} models={Math.floor(drafts.a.defence.models)} />
        </>
    );
}

function DuelResults({ result, nameA, nameB, rounds }: { result: DuelResult; nameA: string; nameB: string; rounds: number }) {
    const favourite =
        Math.abs(result.aWins - result.bWins) < 0.02
            ? "It's a coin flip."
            : result.aWins > result.bWins
                ? `${nameA} is favoured.`
                : `${nameB} is favoured.`;

    return (
        <>
            <div className="whk-result-banner whk-battle-verdict">
                <strong>{favourite}</strong>
                <span>Within {rounds} battle round{rounds === 1 ? "" : "s"}.</span>
            </div>

            <div className="whk-tiles">
                <div className="whk-tile">
                    <span className="whk-tile-label"><span className="whk-legend-swatch whk-duel-a" aria-hidden="true" />{nameA} wins</span>
                    <span className="whk-tile-value">{percent(result.aWins)}</span>
                </div>
                <div className="whk-tile">
                    <span className="whk-tile-label"><span className="whk-legend-swatch whk-duel-b" aria-hidden="true" />{nameB} wins</span>
                    <span className="whk-tile-value">{percent(result.bWins)}</span>
                </div>
                <div className="whk-tile">
                    <span className="whk-tile-label"><span className="whk-legend-swatch whk-duel-ongoing" aria-hidden="true" />Both still standing</span>
                    <span className="whk-tile-value">{percent(result.ongoing)}</span>
                </div>
            </div>

            <DuelChart rounds={result.rounds} nameA={nameA} nameB={nameB} />

            <div className="whk-columns whk-battle-survivors">
                <div>
                    <h3 className="whk-subtitle">{nameA} models left <small>avg {decimal(expectedValue(result.aSurvivors))}</small></h3>
                    <KillChart killAtLeast={atLeast(result.aSurvivors)} killDistribution={result.aSurvivors} title="Chance at least N models are left" countLabel="Models left" side="a" />
                </div>
                <div>
                    <h3 className="whk-subtitle">{nameB} models left <small>avg {decimal(expectedValue(result.bSurvivors))}</small></h3>
                    <KillChart killAtLeast={atLeast(result.bSurvivors)} killDistribution={result.bSurvivors} title="Chance at least N models are left" countLabel="Models left" side="b" />
                </div>
            </div>
        </>
    );
}

function atLeast(dist: number[]): number[] {
    return dist.map((_, k) => dist.slice(k).reduce((sum, p) => sum + p, 0));
}
