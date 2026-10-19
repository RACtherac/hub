import { useMemo, useState } from "react";

import {
    DEFAULT_SITUATION,
    MathhammerInputError,
    TARGET_PRESETS,
    calculate,
    type MathhammerResult,
    type Situation,
    type Target,
} from "../../utils/mathhammer";
import { decimal, percent } from "./format";
import KillChart from "./KillChart";
import { DefenceEditor, SituationEditor, WeaponRowsEditor } from "./ProfileEditor";
import { newRow, rowsToProfiles, type ProfileRow } from "./profileRows";

export default function Mathhammer() {
    const [rows, setRows] = useState<ProfileRow[]>(() => [newRow()]);
    const [target, setTarget] = useState<Target>(TARGET_PRESETS[3].target);
    const [presetName, setPresetName] = useState(TARGET_PRESETS[3].name);
    const [situation, setSituation] = useState<Situation>(DEFAULT_SITUATION);

    const outcome = useMemo((): { result: MathhammerResult } | { error: string } => {
        try {
            return { result: calculate(rowsToProfiles(rows), target, situation) };
        }
        catch (error) {
            if (error instanceof MathhammerInputError) return { error: error.message };
            throw error;
        }
    }, [rows, target, situation]);

    return (
        <div className="whk-mathhammer">
            <div className="whk-columns">
                {/* ---------------- Attacker ---------------- */}
                <section className="whk-panel">
                    <h2 className="whk-panel-title">Attacker</h2>

                    <WeaponRowsEditor rows={rows} onChange={setRows} />

                    <h3 className="whk-subtitle">Situation</h3>
                    <SituationEditor situation={situation} onChange={setSituation} />
                </section>

                {/* ---------------- Target ---------------- */}
                <section className="whk-panel">
                    <h2 className="whk-panel-title">Target</h2>

                    <DefenceEditor
                        target={target}
                        presetName={presetName}
                        onChange={(next, name) => {
                            setTarget(next);
                            setPresetName(name);
                        }}
                    />
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

export function Results({ result, models }: { result: MathhammerResult; models: number }) {
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
