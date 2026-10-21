import { useState } from "react";

import { CASES, LINE_OPERATIONS, applyLineOperation, convertCase, textStats } from "../../utils/devTools";
import CopyButton from "./CopyButton";

const SAMPLE = `user first name
billing_address
XMLHttpRequest
shipping-zip-code`;

export default function TextTools() {
    const [text, setText] = useState(SAMPLE);
    // The text before the last button press, for one step of undo.
    const [previous, setPrevious] = useState<string | null>(null);
    const stats = textStats(text);

    const apply = (next: string) => {
        if (next === text) return;
        setPrevious(text);
        setText(next);
    };

    return (
        <div className="tl-stack">
            <section className="tl-panel">
                <div className="tl-panel-header">
                    <h2 className="tl-panel-title">Text</h2>
                    <div className="tl-panel-actions">
                        <button type="button" className="tl-button tl-button--ghost" disabled={previous === null} onClick={() => { setText(previous ?? text); setPrevious(null); }}>
                            ↶ Undo
                        </button>
                        <CopyButton text={text} />
                        <button type="button" className="tl-button tl-button--ghost" onClick={() => apply("")} disabled={!text}>Clear</button>
                    </div>
                </div>
                <textarea className="tl-code tl-code--short" value={text} spellCheck={false} aria-label="Text" onChange={(e) => { setText(e.target.value); setPrevious(null); }} />
                <div className="tl-stats" aria-label="Counts">
                    <span><strong>{stats.characters.toLocaleString()}</strong> characters</span>
                    <span><strong>{stats.charactersNoSpaces.toLocaleString()}</strong> without spaces</span>
                    <span><strong>{stats.words.toLocaleString()}</strong> words</span>
                    <span><strong>{stats.lines.toLocaleString()}</strong> lines</span>
                    <span><strong>{stats.bytes.toLocaleString()}</strong> bytes (UTF-8)</span>
                </div>
            </section>

            <div className="tl-two">
                <section className="tl-panel">
                    <h2 className="tl-panel-title">Change case</h2>
                    <p className="tl-hint">Each line is converted on its own.</p>
                    <div className="tl-button-grid">
                        {CASES.map((c) => (
                            <button key={c.value} type="button" className="tl-button tl-button--ghost" title={`e.g. ${c.example}`} onClick={() => apply(convertCase(text, c.value))}>
                                {c.label}
                            </button>
                        ))}
                    </div>
                </section>
                <section className="tl-panel">
                    <h2 className="tl-panel-title">Lines</h2>
                    <p className="tl-hint">Sorting is natural, so “item 2” comes before “item 10”.</p>
                    <div className="tl-button-grid">
                        {LINE_OPERATIONS.map((op) => (
                            <button key={op.value} type="button" className="tl-button tl-button--ghost" onClick={() => apply(applyLineOperation(text, op.value))}>
                                {op.label}
                            </button>
                        ))}
                    </div>
                </section>
            </div>
        </div>
    );
}
