import { useState } from "react";

interface KillChartProps {
    // P(at least k models destroyed), k = 0..models
    killAtLeast: number[];
    // P(exactly k models destroyed), k = 0..models
    killDistribution: number[];
}

const WIDTH = 640;
const HEIGHT = 240;
const MARGIN = { top: 24, right: 12, bottom: 32, left: 44 };
const PLOT_WIDTH = WIDTH - MARGIN.left - MARGIN.right;
const PLOT_HEIGHT = HEIGHT - MARGIN.top - MARGIN.bottom;
const MAX_BAR = 24;
const RADIUS = 4;

const percent = (value: number) =>
    value > 0 && value < 0.001 ? "<0.1%" : `${(value * 100).toFixed(value < 0.01 ? 1 : 0)}%`;

// Column with a 4px rounded top and a square base on the baseline.
function columnPath(x: number, width: number, top: number, bottom: number): string {
    const height = bottom - top;
    if (height <= 0) return "";
    const r = Math.min(RADIUS, width / 2, height);
    return [
        `M ${x} ${bottom}`,
        `L ${x} ${top + r}`,
        `Q ${x} ${top} ${x + r} ${top}`,
        `L ${x + width - r} ${top}`,
        `Q ${x + width} ${top} ${x + width} ${top + r}`,
        `L ${x + width} ${bottom}`,
        "Z",
    ].join(" ");
}

export default function KillChart({ killAtLeast, killDistribution }: KillChartProps) {
    const [hovered, setHovered] = useState<number | null>(null);
    const [showTable, setShowTable] = useState(false);

    const models = killAtLeast.length - 1;
    const kills = Array.from({ length: models }, (_, i) => i + 1);

    const slot = PLOT_WIDTH / Math.max(1, models);
    const barWidth = Math.max(2, Math.min(MAX_BAR, slot * 0.6));
    const xOf = (k: number) => MARGIN.left + (k - 1) * slot + (slot - barWidth) / 2;
    const yOf = (p: number) => MARGIN.top + PLOT_HEIGHT * (1 - p);
    const baseline = MARGIN.top + PLOT_HEIGHT;

    const labelEvery = models <= 20 ? 1 : models <= 50 ? 5 : 10;
    const showValues = models <= 10;

    return (
        <figure className="whk-chart">
            <figcaption className="whk-chart-header">
                <span className="whk-chart-title">Chance to kill at least N models</span>
                <button type="button" className="whk-link-button" onClick={() => setShowTable((v) => !v)} aria-expanded={showTable}>
                    {showTable ? "Hide table" : "Show table"}
                </button>
            </figcaption>

            <div className="whk-chart-plot">
                <svg viewBox={`0 0 ${WIDTH} ${HEIGHT}`} role="img" aria-label="Column chart of the chance to kill at least each number of models">
                    {[0, 0.5, 1].map((tick) => (
                        <g key={tick}>
                            <line className="whk-chart-grid" x1={MARGIN.left} x2={WIDTH - MARGIN.right} y1={yOf(tick)} y2={yOf(tick)} />
                            <text className="whk-chart-axis" x={MARGIN.left - 8} y={yOf(tick)} textAnchor="end" dominantBaseline="middle">
                                {tick * 100}%
                            </text>
                        </g>
                    ))}

                    {kills.map((k) => {
                        const p = killAtLeast[k];
                        const x = xOf(k);
                        const isHovered = hovered === k;

                        return (
                            <g key={k}>
                                <path
                                    className={isHovered ? "whk-chart-bar active" : "whk-chart-bar"}
                                    d={columnPath(x, barWidth, yOf(p), baseline)}
                                />
                                {showValues && p >= 0.005 && (
                                    <text className="whk-chart-value" x={x + barWidth / 2} y={yOf(p) - 6} textAnchor="middle">
                                        {percent(p)}
                                    </text>
                                )}
                                {(k % labelEvery === 0 || k === 1) && (
                                    <text className="whk-chart-axis" x={x + barWidth / 2} y={baseline + 18} textAnchor="middle">
                                        {k}
                                    </text>
                                )}
                                {/* Hit target: the whole column slot, bigger than the bar. */}
                                <rect
                                    className="whk-chart-hit"
                                    x={MARGIN.left + (k - 1) * slot}
                                    y={MARGIN.top}
                                    width={slot}
                                    height={PLOT_HEIGHT}
                                    tabIndex={0}
                                    aria-label={`At least ${k}: ${percent(p)}`}
                                    onMouseEnter={() => setHovered(k)}
                                    onMouseLeave={() => setHovered(null)}
                                    onFocus={() => setHovered(k)}
                                    onBlur={() => setHovered(null)}
                                />
                            </g>
                        );
                    })}

                    <line className="whk-chart-baseline" x1={MARGIN.left} x2={WIDTH - MARGIN.right} y1={baseline} y2={baseline} />
                </svg>

                {hovered !== null && (
                    <div
                        className="whk-chart-tooltip"
                        style={{
                            left: `${((xOf(hovered) + barWidth / 2) / WIDTH) * 100}%`,
                            top: `${(yOf(killAtLeast[hovered]) / HEIGHT) * 100}%`,
                        }}
                        role="status"
                    >
                        <strong>{hovered} model{hovered === 1 ? "" : "s"}</strong>
                        <span>At least: {percent(killAtLeast[hovered])}</span>
                        <span>Exactly: {percent(killDistribution[hovered])}</span>
                    </div>
                )}
            </div>

            {showTable && (
                <div className="whk-table-wrap">
                    <table className="whk-table whk-table--compact">
                        <thead>
                            <tr>
                                <th scope="col">Models killed</th>
                                <th scope="col">Exactly</th>
                                <th scope="col">At least</th>
                            </tr>
                        </thead>
                        <tbody>
                            {killDistribution.map((p, k) => (
                                <tr key={k}>
                                    <th scope="row">{k}</th>
                                    <td>{percent(p)}</td>
                                    <td>{percent(killAtLeast[k])}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </figure>
    );
}
