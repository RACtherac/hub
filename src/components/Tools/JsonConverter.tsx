import { useEffect, useMemo, useRef, useState } from "react";

import {
    ConvertError,
    DEFAULT_OPTIONS,
    EXAMPLES,
    INPUT_FORMATS,
    convert,
    formatJson,
    jsonFileName,
    type ConvertOptions,
    type ConvertResult,
    type Delimiter,
    type Indent,
    type InputFormat,
} from "../../utils/jsonConverter";

// The text being converted is kept between visits, in this browser only.
const DRAFT_KEY = "tools-json-draft";

const DELIMITERS: { value: Delimiter; label: string }[] = [
    { value: "auto", label: "Detect" },
    { value: ",", label: "Comma ," },
    { value: ";", label: "Semicolon ;" },
    { value: "\t", label: "Tab" },
    { value: "|", label: "Pipe |" },
];

const INDENTS: { value: Indent; label: string }[] = [
    { value: "2", label: "2 spaces" },
    { value: "4", label: "4 spaces" },
    { value: "tab", label: "Tabs" },
    { value: "min", label: "Minified" },
];

const formatLabel = (format: InputFormat) => INPUT_FORMATS.find((f) => f.value === format)?.label ?? format;

function loadDraft(): string {
    try {
        return localStorage.getItem(DRAFT_KEY) ?? EXAMPLES.csv;
    }
    catch {
        return EXAMPLES.csv;
    }
}

type Outcome = { ok: true; result: ConvertResult } | { ok: false; error: ConvertError };

export default function JsonConverter() {
    const [input, setInput] = useState(loadDraft);
    const [options, setOptions] = useState<ConvertOptions>(DEFAULT_OPTIONS);
    const [indent, setIndent] = useState<Indent>("2");
    const [sortKeys, setSortKeys] = useState(false);
    const [fileName, setFileName] = useState("converted");
    const [copied, setCopied] = useState(false);
    const inputRef = useRef<HTMLTextAreaElement>(null);
    const fileInput = useRef<HTMLInputElement>(null);

    useEffect(() => {
        try {
            localStorage.setItem(DRAFT_KEY, input);
        }
        catch {
            // Storage can be full or blocked; the draft just isn't kept.
        }
    }, [input]);

    useEffect(() => {
        if (!copied) return;
        const timer = window.setTimeout(() => setCopied(false), 1500);
        return () => window.clearTimeout(timer);
    }, [copied]);

    const outcome: Outcome | null = useMemo(() => {
        if (input.trim() === "") return null;
        try {
            return { ok: true, result: convert(input, options) };
        }
        catch (error) {
            if (error instanceof ConvertError) return { ok: false, error };
            throw error;
        }
    }, [input, options]);

    const output = outcome?.ok ? formatJson(outcome.result.value, indent, sortKeys) : "";
    const setOption = (fields: Partial<ConvertOptions>) => setOptions((current) => ({ ...current, ...fields }));
    const csvInUse = outcome?.ok ? outcome.result.format === "csv" : options.format === "csv";
    const typesMatter = options.format === "auto" || options.format === "csv" || options.format === "keyvalue";

    // Puts the cursor on the line and column of an error.
    const showError = (error: ConvertError) => {
        const textarea = inputRef.current;
        if (!textarea) return;
        const lines = input.split("\n");
        const index = lines.slice(0, error.line - 1).reduce((sum, l) => sum + l.length + 1, 0) + error.column - 1;
        textarea.focus();
        textarea.setSelectionRange(index, Math.min(index + 1, input.length));
    };

    const loadFile = async (file: File | undefined) => {
        if (!file) return;
        setInput(await file.text());
        setFileName(file.name.replace(/\.[^.]+$/, "") || "converted");
        // Let auto-detect work out a file's format from its name or contents.
        const extension = file.name.split(".").pop()?.toLowerCase();
        const byExtension: Record<string, InputFormat> = { json: "json", csv: "csv", tsv: "csv", env: "keyvalue", ini: "keyvalue", properties: "keyvalue", js: "js", ts: "js" };
        setOption({ format: (extension && byExtension[extension]) || "auto" });
    };

    const copy = async () => {
        try {
            await navigator.clipboard.writeText(output);
            setCopied(true);
        }
        catch {
            // Clipboard blocked (e.g. not a secure page); the text can still be selected by hand.
        }
    };

    const download = () => {
        const url = URL.createObjectURL(new Blob([output], { type: "application/json" }));
        const link = document.createElement("a");
        link.href = url;
        link.download = jsonFileName(fileName);
        link.click();
        URL.revokeObjectURL(url);
    };

    // An excerpt of the line with the error, with a caret under the column.
    const errorExcerpt = (error: ConvertError) => {
        const line = input.split("\n")[error.line - 1] ?? "";
        const start = Math.max(0, error.column - 40);
        return { text: line.slice(start, start + 80), caret: " ".repeat(Math.max(0, error.column - 1 - start)) + "^" };
    };

    return (
        <div className="tl-json">
            {/* ---------------- Input ---------------- */}
            <section className="tl-panel" aria-labelledby="tl-json-input-title">
                <div className="tl-panel-header">
                    <h2 id="tl-json-input-title" className="tl-panel-title">Input</h2>
                    <div className="tl-panel-actions">
                        <label className="tl-field tl-field--inline">
                            <span>Format</span>
                            <select value={options.format} onChange={(e) => setOption({ format: e.target.value as ConvertOptions["format"] })}>
                                <option value="auto">Detect</option>
                                {INPUT_FORMATS.map((f) => <option key={f.value} value={f.value}>{f.label}</option>)}
                            </select>
                        </label>
                        <select
                            className="tl-select-button"
                            aria-label="Load an example"
                            value=""
                            onChange={(e) => {
                                const format = e.target.value as InputFormat;
                                if (!format) return;
                                setInput(EXAMPLES[format]);
                                setOption({ format: "auto" });
                            }}
                        >
                            <option value="">Example…</option>
                            {INPUT_FORMATS.map((f) => <option key={f.value} value={f.value}>{f.label}</option>)}
                        </select>
                        <button type="button" className="tl-button tl-button--ghost" onClick={() => fileInput.current?.click()}>
                            Open file
                        </button>
                        <input
                            ref={fileInput}
                            type="file"
                            accept=".json,.csv,.tsv,.txt,.env,.ini,.properties,.js,.ts,text/*,application/json"
                            hidden
                            onChange={(e) => {
                                void loadFile(e.target.files?.[0]);
                                e.target.value = "";
                            }}
                        />
                        <button type="button" className="tl-button tl-button--ghost" onClick={() => setInput("")} disabled={!input}>
                            Clear
                        </button>
                    </div>
                </div>

                <textarea
                    ref={inputRef}
                    className="tl-code"
                    value={input}
                    spellCheck={false}
                    autoCapitalize="off"
                    autoComplete="off"
                    placeholder="Paste or type JSON, a JS object, CSV or key = value lines…"
                    aria-label="Text to convert"
                    aria-invalid={outcome?.ok === false}
                    aria-describedby="tl-json-status"
                    onChange={(e) => setInput(e.target.value)}
                    onDragOver={(e) => e.preventDefault()}
                    onDrop={(e) => {
                        const file = e.dataTransfer.files[0];
                        if (!file) return;
                        e.preventDefault();
                        void loadFile(file);
                    }}
                />

                <div className="tl-options">
                    {typesMatter && (
                        <label className="tl-check">
                            <input type="checkbox" checked={options.detectTypes} onChange={(e) => setOption({ detectTypes: e.target.checked })} />
                            Numbers &amp; true/false as values
                        </label>
                    )}
                    {csvInUse && (
                        <>
                            <label className="tl-check">
                                <input type="checkbox" checked={options.headerRow} onChange={(e) => setOption({ headerRow: e.target.checked })} />
                                First row is the header
                            </label>
                            <label className="tl-field tl-field--inline">
                                <span>Delimiter</span>
                                <select value={options.delimiter} onChange={(e) => setOption({ delimiter: e.target.value as Delimiter })}>
                                    {DELIMITERS.map((d) => <option key={d.label} value={d.value}>{d.label}</option>)}
                                </select>
                            </label>
                        </>
                    )}
                </div>

                <div id="tl-json-status" className="tl-status" role="status" aria-live="polite">
                    {outcome === null && <p className="tl-hint">Paste something above, open a file, or drop one on the box.</p>}
                    {outcome?.ok && (
                        <p className="tl-status-ok">
                            ✓ {options.format === "auto" ? `Read as ${formatLabel(outcome.result.format)}` : formatLabel(outcome.result.format)} · {outcome.result.summary}
                        </p>
                    )}
                    {outcome && !outcome.ok && (
                        <div className="tl-status-error">
                            <p>
                                <strong>Line {outcome.error.line}, column {outcome.error.column}:</strong> {outcome.error.message}
                                {" "}
                                <button type="button" className="tl-link-button" onClick={() => showError(outcome.error)}>Show me</button>
                            </p>
                            {input.split("\n")[outcome.error.line - 1]?.trim() && (
                                <pre className="tl-error-excerpt" aria-hidden="true">
                                    {errorExcerpt(outcome.error).text}{"\n"}<span>{errorExcerpt(outcome.error).caret}</span>
                                </pre>
                            )}
                        </div>
                    )}
                </div>
            </section>

            {/* ---------------- Output ---------------- */}
            <section className="tl-panel" aria-labelledby="tl-json-output-title">
                <div className="tl-panel-header">
                    <h2 id="tl-json-output-title" className="tl-panel-title">JSON</h2>
                    <div className="tl-panel-actions">
                        <label className="tl-field tl-field--inline">
                            <span>Indent</span>
                            <select value={indent} onChange={(e) => setIndent(e.target.value as Indent)}>
                                {INDENTS.map((i) => <option key={i.value} value={i.value}>{i.label}</option>)}
                            </select>
                        </label>
                        <label className="tl-check">
                            <input type="checkbox" checked={sortKeys} onChange={(e) => setSortKeys(e.target.checked)} />
                            Sort keys
                        </label>
                    </div>
                </div>

                <textarea
                    className="tl-code tl-code--output"
                    value={output}
                    readOnly
                    spellCheck={false}
                    placeholder={outcome && !outcome.ok ? "Fix the input to see the JSON." : "The JSON shows up here."}
                    aria-label="Converted JSON"
                />

                <div className="tl-download">
                    <button type="button" className="tl-button tl-button--ghost" onClick={copy} disabled={!output}>
                        {copied ? "Copied ✓" : "Copy"}
                    </button>
                    <label className="tl-field tl-field--inline tl-file-name">
                        <span>File name</span>
                        <input value={fileName} onChange={(e) => setFileName(e.target.value)} />
                    </label>
                    <button type="button" className="tl-button" onClick={download} disabled={!output}>
                        Download {jsonFileName(fileName)}
                    </button>
                </div>
                {output && <p className="tl-hint">{new Blob([output]).size.toLocaleString()} bytes · {output.split("\n").length.toLocaleString()} lines</p>}
            </section>
        </div>
    );
}
