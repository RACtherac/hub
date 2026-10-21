import { useEffect, useState } from "react";

import { HASH_ALGORITHMS, formatUuid, hashText, randomUuid, type HashAlgorithm, type UuidFormat } from "../../utils/devTools";
import CopyButton from "./CopyButton";

const UUID_FORMATS: { value: UuidFormat; label: string }[] = [
    { value: "lower", label: "lower" },
    { value: "upper", label: "UPPER" },
    { value: "no-dashes", label: "no dashes" },
    { value: "braces", label: "{braces}" },
];

const makeUuids = (count: number) => Array.from({ length: count }, randomUuid);

function UuidGenerator() {
    const [count, setCount] = useState(5);
    const [format, setFormat] = useState<UuidFormat>("lower");
    const [uuids, setUuids] = useState(() => makeUuids(5));
    const text = uuids.map((u) => formatUuid(u, format)).join("\n");

    return (
        <section className="tl-panel">
            <div className="tl-panel-header">
                <h2 className="tl-panel-title">UUIDs (v4)</h2>
                <CopyButton text={text} label="Copy all" />
            </div>
            <div className="tl-toolbar">
                <label className="tl-field tl-field--inline">
                    <span>How many</span>
                    <input
                        type="number"
                        min={1}
                        max={100}
                        value={count}
                        onChange={(e) => setCount(Math.min(100, Math.max(1, Math.trunc(Number(e.target.value)) || 1)))}
                    />
                </label>
                <div className="tl-segmented" role="group" aria-label="Format">
                    {UUID_FORMATS.map((f) => (
                        <button key={f.value} type="button" className={format === f.value ? "active" : ""} aria-pressed={format === f.value} onClick={() => setFormat(f.value)}>
                            {f.label}
                        </button>
                    ))}
                </div>
                <button type="button" className="tl-button" onClick={() => setUuids(makeUuids(count))}>Generate</button>
            </div>
            <pre className="tl-pre">{text}</pre>
            <p className="tl-hint">Made with the browser's cryptographic random numbers.</p>
        </section>
    );
}

function HashGenerator() {
    const [text, setText] = useState("hello world");
    const [hashes, setHashes] = useState<Partial<Record<HashAlgorithm, string>>>({});

    // Web Crypto is async; the latest text wins if several are in flight.
    useEffect(() => {
        let cancelled = false;
        Promise.all(HASH_ALGORITHMS.map(async (algorithm) => [algorithm, await hashText(text, algorithm)] as const))
            .then((pairs) => { if (!cancelled) setHashes(Object.fromEntries(pairs)); })
            .catch(() => { if (!cancelled) setHashes({}); });
        return () => { cancelled = true; };
    }, [text]);

    return (
        <section className="tl-panel">
            <h2 className="tl-panel-title">Hashes</h2>
            <textarea className="tl-code tl-code--tiny" value={text} spellCheck={false} aria-label="Text to hash" onChange={(e) => setText(e.target.value)} />
            <div className="tl-readouts tl-readouts--column">
                {HASH_ALGORITHMS.map((algorithm) => (
                    <div key={algorithm} className="tl-readout tl-readout--hash">
                        <span>{algorithm}</span>
                        <strong>{hashes[algorithm] ?? "…"}</strong>
                        <CopyButton text={hashes[algorithm] ?? ""} className="tl-link-button" />
                    </div>
                ))}
            </div>
            <p className="tl-hint">Of the text's UTF-8 bytes. SHA-1 is fine for checksums but not for security.</p>
        </section>
    );
}

export default function Generators() {
    return (
        <div className="tl-two">
            <UuidGenerator />
            <HashGenerator />
        </div>
    );
}
