import { useMemo, useState } from "react";

import {
    ToolError,
    contrastRatio,
    parseColor,
    toHex,
    toHslString,
    toRgbString,
    wcagLevel,
    type Rgba,
} from "../../utils/devTools";
import CopyButton from "./CopyButton";

const WHITE: Rgba = { r: 255, g: 255, b: 255, a: 1 };
const BLACK: Rgba = { r: 0, g: 0, b: 0, a: 1 };

function Contrast({ color, against, label }: { color: Rgba; against: Rgba; label: string }) {
    const ratio = contrastRatio({ ...color, a: 1 }, against);
    const level = wcagLevel(ratio);
    return (
        <div className="tl-contrast" style={{ background: toHex(against), color: toHex({ ...color, a: 1 }) }}>
            <strong>Aa</strong>
            <span>
                on {label}: {ratio.toFixed(2)}:1
                <em className={`tl-badge tl-badge--${level === "Fail" ? "error" : level === "AA large" ? "warn" : "ok"}`}>{level}</em>
            </span>
        </div>
    );
}

export default function ColorConverter() {
    const [input, setInput] = useState("#e8c547");

    const outcome = useMemo(() => {
        try {
            return { ok: true as const, color: parseColor(input) };
        }
        catch (error) {
            if (error instanceof ToolError) return { ok: false as const, message: error.message };
            throw error;
        }
    }, [input]);

    const formats = outcome.ok
        ? [
            { label: "HEX", value: toHex(outcome.color) },
            { label: "RGB", value: toRgbString(outcome.color) },
            { label: "HSL", value: toHslString(outcome.color) },
        ]
        : [];

    return (
        <div className="tl-stack">
            <section className="tl-panel">
                <h2 className="tl-panel-title">Colour</h2>
                <div className="tl-color-input">
                    <input
                        type="color"
                        aria-label="Pick a colour"
                        // The picker has no alpha, so it gets the colour without it.
                        value={outcome.ok ? toHex({ ...outcome.color, a: 1 }) : "#000000"}
                        onChange={(e) => setInput(e.target.value)}
                    />
                    <input
                        className="tl-mono-input tl-mono-input--big"
                        value={input}
                        spellCheck={false}
                        aria-label="Colour value"
                        aria-invalid={!outcome.ok}
                        placeholder="#ff8800, rgb(255 136 0), hsl(32 100% 50%) or orange"
                        onChange={(e) => setInput(e.target.value)}
                    />
                </div>
                {!outcome.ok && <p className="tl-status-error" role="alert"><strong>Can't read it:</strong> {outcome.message}</p>}
            </section>

            {outcome.ok && (
                <div className="tl-two">
                    <section className="tl-panel">
                        <div className="tl-swatch" style={{ background: toRgbString(outcome.color) }} aria-hidden="true" />
                        <div className="tl-readouts tl-readouts--column">
                            {formats.map((f) => (
                                <div key={f.label} className="tl-readout">
                                    <span>{f.label}</span>
                                    <strong>{f.value}</strong>
                                    <CopyButton text={f.value} className="tl-link-button" />
                                </div>
                            ))}
                        </div>
                    </section>
                    <section className="tl-panel">
                        <h2 className="tl-panel-title">Contrast (WCAG)</h2>
                        <Contrast color={outcome.color} against={WHITE} label="white" />
                        <Contrast color={outcome.color} against={BLACK} label="black" />
                        <p className="tl-hint">
                            Normal text needs 4.5:1 for AA and 7:1 for AAA; large text (about 24px, or 19px bold) needs 3:1.
                            {outcome.color.a < 1 && " Transparency is ignored here."}
                        </p>
                    </section>
                </div>
            )}
        </div>
    );
}
