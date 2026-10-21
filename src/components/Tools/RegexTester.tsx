import { useMemo, useState } from "react";

import { MAX_MATCHES, REGEX_FLAGS, ToolError, highlightSegments, regexReplace, runRegex } from "../../utils/devTools";
import CopyButton from "./CopyButton";

const FLAG_HELP: Record<(typeof REGEX_FLAGS)[number], string> = {
    g: "global: find every match",
    i: "ignore case",
    m: "multiline: ^ and $ match at each line",
    s: "dot matches line breaks too",
    u: "unicode",
    y: "sticky: match only at lastIndex",
};

const SAMPLE = `Ulf the Barkeep <ulf@rusty-tavern.example>
Vex <vex@shadows.example>, phone 070-123 45 67
Merrin (no email)`;

export default function RegexTester() {
    const [pattern, setPattern] = useState("(?<name>[\\w.-]+)@(?<domain>[\\w.-]+)");
    const [flags, setFlags] = useState("g");
    const [text, setText] = useState(SAMPLE);
    const [replacement, setReplacement] = useState("$<name> at $<domain>");
    const [showReplace, setShowReplace] = useState(false);

    const toggleFlag = (flag: string) =>
        setFlags((current) => (current.includes(flag) ? current.replace(flag, "") : REGEX_FLAGS.filter((f) => current.includes(f) || f === flag).join("")));

    const outcome = useMemo(() => {
        try {
            const result = runRegex(pattern, flags, text);
            return {
                ok: true as const,
                ...result,
                segments: highlightSegments(text, result.matches),
                replaced: showReplace ? regexReplace(pattern, flags, text, replacement) : "",
            };
        }
        catch (error) {
            if (error instanceof ToolError) return { ok: false as const, message: error.message };
            throw error;
        }
    }, [pattern, flags, text, replacement, showReplace]);

    const groupNames = outcome.ok && outcome.matches[0] ? Object.keys(outcome.matches[0].named) : [];

    return (
        <div className="tl-stack">
            <section className="tl-panel">
                <div className="tl-regex-input">
                    <span className="tl-regex-slash" aria-hidden="true">/</span>
                    <input
                        className="tl-mono-input"
                        value={pattern}
                        spellCheck={false}
                        aria-label="Regular expression"
                        aria-invalid={!outcome.ok}
                        placeholder="pattern"
                        onChange={(e) => setPattern(e.target.value)}
                    />
                    <span className="tl-regex-slash" aria-hidden="true">/{flags}</span>
                </div>
                <div className="tl-toolbar">
                    <div className="tl-segmented" role="group" aria-label="Flags">
                        {REGEX_FLAGS.map((flag) => (
                            <button key={flag} type="button" className={flags.includes(flag) ? "active" : ""} aria-pressed={flags.includes(flag)} title={FLAG_HELP[flag]} onClick={() => toggleFlag(flag)}>
                                {flag}
                            </button>
                        ))}
                    </div>
                    <label className="tl-check">
                        <input type="checkbox" checked={showReplace} onChange={(e) => setShowReplace(e.target.checked)} />
                        Replace
                    </label>
                    {outcome.ok && pattern && (
                        <span className={`tl-badge tl-badge--${outcome.matches.length ? "ok" : "warn"}`}>
                            {outcome.truncated ? `First ${MAX_MATCHES} matches` : `${outcome.matches.length} match${outcome.matches.length === 1 ? "" : "es"}`}
                        </span>
                    )}
                </div>
                {!outcome.ok && <p className="tl-status-error" role="alert"><strong>Invalid pattern:</strong> {outcome.message}</p>}
                {showReplace && (
                    <label className="tl-field">
                        <span>Replace with ($1, $&lt;name&gt;, $&amp; work)</span>
                        <input className="tl-mono-input" value={replacement} spellCheck={false} onChange={(e) => setReplacement(e.target.value)} />
                    </label>
                )}
            </section>

            <div className="tl-two">
                <section className="tl-panel">
                    <h2 className="tl-panel-title">Test text</h2>
                    <textarea className="tl-code tl-code--short" value={text} spellCheck={false} aria-label="Test text" onChange={(e) => setText(e.target.value)} />
                </section>
                <section className="tl-panel">
                    <div className="tl-panel-header">
                        <h2 className="tl-panel-title">{showReplace ? "Result" : "Matches"}</h2>
                        {showReplace && outcome.ok && <CopyButton text={outcome.replaced} />}
                    </div>
                    {showReplace && outcome.ok ? (
                        <pre className="tl-pre tl-pre--wrap">{outcome.replaced}</pre>
                    ) : (
                        <pre className="tl-pre tl-pre--wrap" aria-label="Test text with matches highlighted">
                            {outcome.ok
                                ? outcome.segments.map((s, i) => (s.match === null ? s.text : <mark key={i} className={s.match % 2 ? "alt" : ""}>{s.text}</mark>))
                                : text}
                        </pre>
                    )}
                </section>
            </div>

            {outcome.ok && outcome.matches.length > 0 && (
                <section className="tl-panel">
                    <h2 className="tl-panel-title">Groups</h2>
                    <div className="tl-table-wrap">
                        <table className="tl-table">
                            <thead>
                                <tr>
                                    <th scope="col">#</th>
                                    <th scope="col">At</th>
                                    <th scope="col">Match</th>
                                    {outcome.matches[0].groups.map((_, g) => (
                                        <th key={g} scope="col">{groupNames[g] ? `${groupNames[g]} ($${g + 1})` : `$${g + 1}`}</th>
                                    ))}
                                </tr>
                            </thead>
                            <tbody>
                                {outcome.matches.slice(0, 200).map((m, i) => (
                                    <tr key={i}>
                                        <td>{i + 1}</td>
                                        <td>{m.index}</td>
                                        <td><code>{m.text || "(empty)"}</code></td>
                                        {m.groups.map((g, gi) => <td key={gi}><code>{g ?? "—"}</code></td>)}
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                    {outcome.matches.length > 200 && <p className="tl-hint">Showing the first 200 rows.</p>}
                </section>
            )}
        </div>
    );
}
