import { useEffect, useMemo, useState } from "react";

import { ToolError, parseTimestamp, relativeTime } from "../../utils/devTools";
import CopyButton from "./CopyButton";

function Readout({ label, value }: { label: string; value: string }) {
    return (
        <div className="tl-readout">
            <span>{label}</span>
            <strong>{value}</strong>
            <CopyButton text={value} className="tl-link-button" />
        </div>
    );
}

export default function TimestampConverter() {
    const [input, setInput] = useState(() => String(Math.floor(Date.now() / 1000)));
    const [now, setNow] = useState(() => new Date());

    // Ticks so "now" and "x seconds ago" stay current.
    useEffect(() => {
        const timer = window.setInterval(() => setNow(new Date()), 1000);
        return () => window.clearInterval(timer);
    }, []);

    const outcome = useMemo(() => {
        try {
            return { ok: true as const, ...parseTimestamp(input, now) };
        }
        catch (error) {
            if (error instanceof ToolError) return { ok: false as const, message: error.message };
            throw error;
        }
    }, [input, now]);

    const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;

    return (
        <div className="tl-stack">
            <section className="tl-panel">
                <div className="tl-panel-header">
                    <h2 className="tl-panel-title">Timestamp or date</h2>
                    <div className="tl-panel-actions">
                        <button type="button" className="tl-button tl-button--ghost" onClick={() => setInput(String(Math.floor(Date.now() / 1000)))}>Now (seconds)</button>
                        <button type="button" className="tl-button tl-button--ghost" onClick={() => setInput(String(Date.now()))}>Now (ms)</button>
                        <button type="button" className="tl-button tl-button--ghost" onClick={() => setInput(new Date().toISOString())}>Now (ISO)</button>
                    </div>
                </div>
                <input
                    className="tl-mono-input tl-mono-input--big"
                    value={input}
                    spellCheck={false}
                    aria-label="Timestamp or date"
                    aria-invalid={!outcome.ok}
                    placeholder="1700000000, 1700000000000, 2026-10-21T14:30:00Z or now"
                    onChange={(e) => setInput(e.target.value)}
                />
                {outcome.ok
                    ? <p className="tl-status-ok">✓ Read as {outcome.source.toLowerCase()} · {relativeTime(outcome.date, now)}</p>
                    : <p className="tl-status-error" role="alert"><strong>Can't read it:</strong> {outcome.message}</p>}
            </section>

            {outcome.ok && (
                <div className="tl-readouts">
                    <Readout label="Unix seconds" value={String(Math.floor(outcome.date.getTime() / 1000))} />
                    <Readout label="Unix milliseconds" value={String(outcome.date.getTime())} />
                    <Readout label="ISO 8601 (UTC)" value={outcome.date.toISOString()} />
                    <Readout label={`Local (${timeZone})`} value={outcome.date.toLocaleString()} />
                    <Readout label="UTC" value={outcome.date.toUTCString()} />
                    <Readout label="Relative" value={relativeTime(outcome.date, now)} />
                </div>
            )}
        </div>
    );
}
