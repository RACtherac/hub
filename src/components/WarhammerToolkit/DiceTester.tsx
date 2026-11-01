import { useEffect, useState } from "react";

import { toInt } from "../../utils/makeId";
import { DIE_SIZES, VERDICT_LABELS, analyzeRolls, emptyCounts, type DieSize } from "../../utils/diceTest";

const STORAGE_KEY = "whk-dice-tester-v1";

interface Stored {
    die: DieSize;
    // Counts per die size, so switching dice keeps each one's rolls.
    counts: Partial<Record<DieSize, number[]>>;
}

function loadStored(): Stored {
    try {
        const parsed = JSON.parse(localStorage.getItem(STORAGE_KEY) ?? "null");
        const die = DIE_SIZES.find((d) => d === parsed?.die) ?? 6;
        const counts: Stored["counts"] = {};
        for (const size of DIE_SIZES) {
            const list = parsed?.counts?.[size];
            if (Array.isArray(list) && list.length === size) counts[size] = list.map((c: unknown) => Math.max(0, toInt(String(c))));
        }
        return { die, counts };
    }
    catch {
        return { die: 6, counts: {} };
    }
}

const percent = (share: number) => `${(share * 100).toFixed(1)}%`;

// Roll a real die, tap each result, and see whether it looks fair.
export default function DiceTester() {
    const [stored, setStored] = useState<Stored>(loadStored);
    // Faces in the order they were tapped, for undo. Not saved.
    const [history, setHistory] = useState<number[]>([]);
    const [typing, setTyping] = useState(false);

    const die = stored.die;
    const counts = stored.counts[die] ?? emptyCounts(die);
    const result = analyzeRolls(counts);
    const tallest = Math.max(...counts, 1);

    useEffect(() => {
        try {
            localStorage.setItem(STORAGE_KEY, JSON.stringify(stored));
        }
        catch {
            // Storage can be full or blocked; the tester keeps working in memory.
        }
    }, [stored]);

    const setCounts = (next: number[]) => setStored((current) => ({ ...current, counts: { ...current.counts, [die]: next } }));
    const pickDie = (size: DieSize) => {
        setStored((current) => ({ ...current, die: size }));
        setHistory([]);
    };
    const logRoll = (face: number) => {
        setCounts(counts.map((c, i) => (i === face - 1 ? c + 1 : c)));
        setHistory((h) => [...h, face]);
    };
    const undo = () => {
        const face = history[history.length - 1];
        if (!face) return;
        setCounts(counts.map((c, i) => (i === face - 1 ? Math.max(0, c - 1) : c)));
        setHistory((h) => h.slice(0, -1));
    };

    const verdictText = {
        "empty": `Roll your d${die} and tap the face that comes up. Aim for at least ${result.minRolls} rolls.`,
        "need-more": `${result.minRolls - result.total} more rolls before it's worth judging (${result.minRolls} = 5 per face).`,
        "fair": `A fair d${die} would look this uneven or worse ${percent(result.pValue)} of the time. Nothing to worry about.`,
        "suspicious": `A fair d${die} would only look this uneven ${percent(result.pValue)} of the time. Roll more to be sure.`,
        "biased": `A fair d${die} would look this uneven just ${percent(result.pValue)} of the time. This die probably favours some faces.`,
    }[result.verdict];

    return (
        <div className="whk-dice">
            <section className="whk-panel">
                <div className="whk-dice-header">
                    <h2 className="whk-panel-title">Pick a die</h2>
                    <div className="whk-dice-picker" role="group" aria-label="Die size">
                        {DIE_SIZES.map((size) => (
                            <button
                                key={size}
                                type="button"
                                className={size === die ? "whk-chip active" : "whk-chip"}
                                aria-pressed={size === die}
                                onClick={() => pickDie(size)}
                            >
                                d{size}
                            </button>
                        ))}
                    </div>
                </div>

                <p className="whk-subtitle">Tap what you rolled</p>
                <div className={`whk-dice-faces whk-dice-faces--d${die}`}>
                    {counts.map((count, i) => (
                        <button key={i} type="button" className="whk-dice-face" onClick={() => logRoll(i + 1)} aria-label={`Rolled a ${i + 1}`}>
                            <span className="whk-dice-face-value">{i + 1}</span>
                            <small>×{count}</small>
                        </button>
                    ))}
                </div>

                <div className="whk-dice-actions">
                    <button type="button" className="whk-button whk-button--ghost" onClick={undo} disabled={history.length === 0}>
                        Undo{history.length > 0 && ` (${history[history.length - 1]})`}
                    </button>
                    <button type="button" className="whk-link-button" onClick={() => setTyping((t) => !t)}>
                        {typing ? "Hide totals" : "Type in totals instead"}
                    </button>
                    <button
                        type="button"
                        className="whk-link-button"
                        disabled={result.total === 0}
                        onClick={() => {
                            setCounts(emptyCounts(die));
                            setHistory([]);
                        }}
                    >
                        Reset d{die}
                    </button>
                </div>

                {typing && (
                    <div className="whk-dice-totals">
                        {counts.map((count, i) => (
                            <label key={i} className="whk-field">
                                <span>{i + 1}s</span>
                                <input
                                    inputMode="numeric"
                                    value={count}
                                    onChange={(e) => setCounts(counts.map((c, j) => (j === i ? Math.max(0, toInt(e.target.value)) : c)))}
                                />
                            </label>
                        ))}
                    </div>
                )}
            </section>

            <section className="whk-panel" aria-live="polite">
                <h2 className="whk-panel-title">How does it look?</h2>

                <div className={`whk-dice-verdict whk-dice-verdict--${result.verdict}`}>
                    <strong>{VERDICT_LABELS[result.verdict]}</strong>
                    <p>{verdictText}</p>
                </div>

                <div className="whk-tiles">
                    <div className="whk-tile">
                        <span className="whk-tile-label">Rolls</span>
                        <span className="whk-tile-value">{result.total}</span>
                    </div>
                    <div className="whk-tile">
                        <span className="whk-tile-label">Average roll</span>
                        <span className="whk-tile-value">{result.total ? result.average.toFixed(2) : "—"}</span>
                        <small>fair: {result.expectedAverage}</small>
                    </div>
                    <div className="whk-tile">
                        <span className="whk-tile-label">Chi-square</span>
                        <span className="whk-tile-value">{result.total ? result.chiSquare.toFixed(1) : "—"}</span>
                        <small>{die - 1} degrees of freedom</small>
                    </div>
                </div>

                <p className="whk-subtitle">Each face</p>
                <ul className="whk-dice-bars">
                    {result.faces.map((f) => (
                        <li key={f.face} className={f.flag ? `whk-dice-bar whk-dice-bar--${f.flag}` : "whk-dice-bar"}>
                            <span className="whk-dice-bar-face">{f.face}</span>
                            <span className="whk-dice-bar-track">
                                <span className="whk-dice-bar-fill" style={{ width: `${(f.count / tallest) * 100}%` }} />
                                {result.total > 0 && (
                                    <span
                                        className="whk-dice-bar-expected"
                                        style={{ left: `${Math.min(100, (result.total / die / tallest) * 100)}%` }}
                                        title="What a fair die would give"
                                    />
                                )}
                            </span>
                            <span className="whk-dice-bar-value">
                                {f.count} · {percent(f.share)}
                                {f.flag && <strong> {f.flag === "high" ? "▲ too often" : "▼ too rarely"}</strong>}
                            </span>
                        </li>
                    ))}
                </ul>
                <p className="whk-dice-help">
                    The line on each bar is what a fair die would give. A face is flagged once there are enough rolls and a fair share
                    ({percent(1 / die)}) falls outside its 95% range.
                </p>

                {result.total > 0 && (
                    <>
                        <p className="whk-subtitle">Rolling X or higher</p>
                        <div className="whk-table-wrap">
                            <table className="whk-table">
                                <thead>
                                    <tr>
                                        <th scope="col">Roll</th>
                                        <th scope="col">This die</th>
                                        <th scope="col">Fair die</th>
                                        <th scope="col">Difference</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {result.thresholds.map((t) => {
                                        const diff = t.share - t.expected;
                                        return (
                                            <tr key={t.target}>
                                                <th scope="row">{t.target}+</th>
                                                <td>{percent(t.share)}</td>
                                                <td>{percent(t.expected)}</td>
                                                <td className={diff > 0 ? "whk-dice-up" : diff < 0 ? "whk-dice-down" : undefined}>
                                                    {diff > 0 ? "+" : ""}{(diff * 100).toFixed(1)} pts
                                                </td>
                                            </tr>
                                        );
                                    })}
                                </tbody>
                            </table>
                        </div>
                    </>
                )}
            </section>
        </div>
    );
}
