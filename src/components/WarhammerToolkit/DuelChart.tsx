import { useState } from "react";

import type { RoundOdds } from "../../utils/battle";
import { percent } from "./format";

interface DuelChartProps {
    rounds: RoundOdds[];
    nameA: string;
    nameB: string;
}

// Only label a segment when the label fits inside it.
const MIN_LABEL_SHARE = 0.12;

// One 100% bar per round: A has won | still fighting | B has won.
// Plain HTML so bars keep a fixed height at any width.
export default function DuelChart({ rounds, nameA, nameB }: DuelChartProps) {
    const [hovered, setHovered] = useState<number | null>(null);
    const [showTable, setShowTable] = useState(false);

    return (
        <figure className="whk-chart">
            <figcaption className="whk-chart-header">
                <span className="whk-chart-title">Who has won by the end of each round</span>
                <button type="button" className="whk-link-button" onClick={() => setShowTable((v) => !v)} aria-expanded={showTable}>
                    {showTable ? "Hide table" : "Show table"}
                </button>
            </figcaption>

            <ul className="whk-legend" aria-label="Legend">
                <li><span className="whk-legend-swatch whk-duel-a" aria-hidden="true" />{nameA} wins</li>
                <li><span className="whk-legend-swatch whk-duel-ongoing" aria-hidden="true" />Still fighting</li>
                <li><span className="whk-legend-swatch whk-duel-b" aria-hidden="true" />{nameB} wins</li>
            </ul>

            <div className="whk-duel-rows">
                {rounds.map((round, index) => {
                    const shares = [
                        { key: "a", value: round.aWins },
                        { key: "ongoing", value: round.ongoing },
                        { key: "b", value: round.bWins },
                    ].filter((share) => share.value > 0.0005);
                    const isHovered = hovered === index;

                    return (
                        <div
                            key={round.round}
                            className={isHovered ? "whk-duel-row active" : "whk-duel-row"}
                            tabIndex={0}
                            aria-label={`Round ${round.round}: ${nameA} ${percent(round.aWins)}, still fighting ${percent(round.ongoing)}, ${nameB} ${percent(round.bWins)}`}
                            onMouseEnter={() => setHovered(index)}
                            onMouseLeave={() => setHovered(null)}
                            onFocus={() => setHovered(index)}
                            onBlur={() => setHovered(null)}
                        >
                            <span className="whk-duel-round" aria-hidden="true">R{round.round}</span>
                            <div className="whk-duel-bar" aria-hidden="true">
                                {shares.map((share) => (
                                    <span key={share.key} className={`whk-duel-segment whk-duel-${share.key}`} style={{ flexGrow: share.value }}>
                                        {share.value >= MIN_LABEL_SHARE && percent(share.value)}
                                    </span>
                                ))}
                            </div>

                            {isHovered && (
                                <div className="whk-chart-tooltip whk-duel-tooltip" role="status">
                                    <strong>After round {round.round}</strong>
                                    <span><span className="whk-legend-swatch whk-duel-a" aria-hidden="true" />{nameA} won: {percent(round.aWins)}</span>
                                    <span><span className="whk-legend-swatch whk-duel-ongoing" aria-hidden="true" />Still fighting: {percent(round.ongoing)}</span>
                                    <span><span className="whk-legend-swatch whk-duel-b" aria-hidden="true" />{nameB} won: {percent(round.bWins)}</span>
                                </div>
                            )}
                        </div>
                    );
                })}
            </div>

            {showTable && (
                <div className="whk-table-wrap">
                    <table className="whk-table whk-table--compact">
                        <thead>
                            <tr>
                                <th scope="col">Round</th>
                                <th scope="col">{nameA} won</th>
                                <th scope="col">Still fighting</th>
                                <th scope="col">{nameB} won</th>
                            </tr>
                        </thead>
                        <tbody>
                            {rounds.map((round) => (
                                <tr key={round.round}>
                                    <th scope="row">{round.round}</th>
                                    <td>{percent(round.aWins)}</td>
                                    <td>{percent(round.ongoing)}</td>
                                    <td>{percent(round.bWins)}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </figure>
    );
}
