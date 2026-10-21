// =====================================
// JSON converter
// =====================================
//
// Turns text in a few common shapes into JSON: JSON itself (to check and
// reformat it), relaxed JS object literals, CSV/TSV and key = value files
// (.env, .ini, .properties). Pure functions, so they can be tested without
// React. Errors carry a line and column so the page can point at them.

export type InputFormat = "json" | "js" | "csv" | "keyvalue";

export const INPUT_FORMATS: { value: InputFormat; label: string }[] = [
    { value: "json", label: "JSON" },
    { value: "js", label: "JS object" },
    { value: "csv", label: "CSV / TSV" },
    { value: "keyvalue", label: "Key = value" },
];

export type Delimiter = "auto" | "," | ";" | "\t" | "|";

export interface ConvertOptions {
    // "auto" picks a format from the text.
    format: InputFormat | "auto";
    // Turn "42", "true" and "null" in CSV and key = value input into numbers,
    // booleans and null instead of strings.
    detectTypes: boolean;
    // CSV: the first row names the columns. Without it each row is an array.
    headerRow: boolean;
    delimiter: Delimiter;
}

export const DEFAULT_OPTIONS: ConvertOptions = {
    format: "auto",
    detectTypes: true,
    headerRow: true,
    delimiter: "auto",
};

export type Indent = "2" | "4" | "tab" | "min";

export class ConvertError extends Error {
    line: number;
    column: number;

    constructor(message: string, line: number, column: number) {
        super(message);
        this.name = "ConvertError";
        this.line = line;
        this.column = column;
    }
}

export type JsonValue = string | number | boolean | null | JsonValue[] | { [key: string]: JsonValue };

export interface ConvertResult {
    value: JsonValue;
    // The format actually used (what "auto" picked).
    format: InputFormat;
    // A short description for the status line, e.g. "12 rows, 4 columns".
    summary: string;
}

// ---- Positions

function lineAndColumn(text: string, index: number): { line: number; column: number } {
    const before = text.slice(0, index);
    const line = before.split("\n").length;
    const column = index - before.lastIndexOf("\n");
    return { line, column };
}

// ---- JSON and relaxed JS object literals
//
// One small recursive-descent parser for both. In strict mode it accepts
// exactly JSON; relaxed mode also allows comments, unquoted keys, single
// quotes, trailing commas and a leading "+" on numbers.

const IDENTIFIER_START = /[A-Za-z_$]/;
const IDENTIFIER_PART = /[A-Za-z0-9_$]/;

class Parser {
    private index = 0;
    private readonly text: string;
    private readonly relaxed: boolean;

    constructor(text: string, relaxed: boolean) {
        this.text = text;
        this.relaxed = relaxed;
    }

    parse(): JsonValue {
        this.skipSpace();
        if (this.index >= this.text.length) this.fail("The input is empty");
        const value = this.parseValue();
        this.skipSpace();
        // Code pasted from a file ends its statement with ";".
        if (this.relaxed && this.text[this.index] === ";") {
            this.index++;
            this.skipSpace();
        }
        if (this.index < this.text.length) this.fail(`Unexpected ${this.describe()} after the end of the value`);
        return value;
    }

    // Skips whitespace and comments at the current position, for callers that
    // need to look at what comes first.
    skipLeading(): number {
        this.skipSpace();
        return this.index;
    }

    private fail(message: string, at = this.index): never {
        const { line, column } = lineAndColumn(this.text, at);
        throw new ConvertError(message, line, column);
    }

    private describe(): string {
        const char = this.text[this.index];
        if (char === undefined) return "end of input";
        if (char === "\n") return "line break";
        // A quote inside quotes ("""") is hard to read.
        if (char === '"') return "'\"'";
        return `"${char}"`;
    }

    private skipSpace() {
        for (;;) {
            const char = this.text[this.index];
            if (char === " " || char === "\t" || char === "\n" || char === "\r" || char === "﻿") {
                this.index++;
            }
            else if (char === "/" && (this.text[this.index + 1] === "/" || this.text[this.index + 1] === "*")) {
                if (!this.relaxed) this.fail("Comments aren't allowed in JSON (try the JS object format)");
                if (this.text[this.index + 1] === "/") {
                    const end = this.text.indexOf("\n", this.index);
                    this.index = end === -1 ? this.text.length : end;
                }
                else {
                    const end = this.text.indexOf("*/", this.index + 2);
                    if (end === -1) this.fail("This comment is never closed with */");
                    this.index = end + 2;
                }
            }
            else {
                return;
            }
        }
    }

    private parseValue(): JsonValue {
        const char = this.text[this.index];
        if (char === "{") return this.parseObject();
        if (char === "[") return this.parseArray();
        if (char === '"' || (char === "'" && this.relaxed)) return this.parseString();
        if (char === "'") this.fail("JSON strings use double quotes (try the JS object format)");
        if (char === "-" || char === "+" || (char !== undefined && /[0-9.]/.test(char))) return this.parseNumber();
        // So relaxed input gets a clear "can't hold Infinity" instead of "unexpected I".
        if (this.relaxed && /^(?:Infinity|NaN)\b/.test(this.text.slice(this.index))) return this.parseNumber();
        if (this.text.startsWith("true", this.index)) return this.word("true", true);
        if (this.text.startsWith("false", this.index)) return this.word("false", false);
        if (this.text.startsWith("null", this.index)) return this.word("null", null);
        if (this.relaxed && this.text.startsWith("undefined", this.index)) return this.word("undefined", null);
        this.fail(`Unexpected ${this.describe()}: expected a value`);
    }

    private word<T extends JsonValue>(word: string, value: T): T {
        const next = this.text[this.index + word.length];
        if (next !== undefined && IDENTIFIER_PART.test(next)) this.fail(`Unexpected ${this.describe()}: expected a value`);
        this.index += word.length;
        return value;
    }

    private parseObject(): { [key: string]: JsonValue } {
        const start = this.index;
        this.index++;
        const result: { [key: string]: JsonValue } = {};
        this.skipSpace();
        if (this.text[this.index] === "}") {
            this.index++;
            return result;
        }
        for (;;) {
            this.skipSpace();
            if (this.text[this.index] === "}" && this.relaxed) {
                this.index++;
                return result;
            }
            if (this.index >= this.text.length) this.fail("This object is never closed with }", start);
            const key = this.parseKey();
            this.skipSpace();
            if (this.text[this.index] !== ":") this.fail(`Expected ":" after the key "${key}", found ${this.describe()}`);
            this.index++;
            this.skipSpace();
            result[key] = this.parseValue();
            this.skipSpace();
            const char = this.text[this.index];
            if (char === ",") {
                this.index++;
                this.skipSpace();
                if (this.text[this.index] === "}" && !this.relaxed) this.fail("Trailing commas aren't allowed in JSON (try the JS object format)");
                continue;
            }
            if (char === "}") {
                this.index++;
                return result;
            }
            if (char === undefined) this.fail("This object is never closed with }", start);
            this.fail(`Expected "," or "}" in the object, found ${this.describe()}`);
        }
    }

    private parseKey(): string {
        const char = this.text[this.index];
        if (char === '"' || (char === "'" && this.relaxed)) return this.parseString();
        if (this.relaxed && char !== undefined && IDENTIFIER_START.test(char)) {
            const start = this.index;
            while (this.index < this.text.length && IDENTIFIER_PART.test(this.text[this.index])) this.index++;
            return this.text.slice(start, this.index);
        }
        if (this.relaxed && char !== undefined && /[0-9]/.test(char)) {
            const start = this.index;
            while (this.index < this.text.length && /[0-9]/.test(this.text[this.index])) this.index++;
            return this.text.slice(start, this.index);
        }
        if (!this.relaxed && char !== undefined && IDENTIFIER_START.test(char)) {
            this.fail("JSON keys need double quotes (try the JS object format)");
        }
        this.fail(`Expected a key, found ${this.describe()}`);
    }

    private parseArray(): JsonValue[] {
        const start = this.index;
        this.index++;
        const result: JsonValue[] = [];
        this.skipSpace();
        if (this.text[this.index] === "]") {
            this.index++;
            return result;
        }
        for (;;) {
            this.skipSpace();
            if (this.text[this.index] === "]" && this.relaxed) {
                this.index++;
                return result;
            }
            if (this.index >= this.text.length) this.fail("This array is never closed with ]", start);
            result.push(this.parseValue());
            this.skipSpace();
            const char = this.text[this.index];
            if (char === ",") {
                this.index++;
                this.skipSpace();
                if (this.text[this.index] === "]" && !this.relaxed) this.fail("Trailing commas aren't allowed in JSON (try the JS object format)");
                continue;
            }
            if (char === "]") {
                this.index++;
                return result;
            }
            if (char === undefined) this.fail("This array is never closed with ]", start);
            this.fail(`Expected "," or "]" in the array, found ${this.describe()}`);
        }
    }

    private parseString(): string {
        const quote = this.text[this.index];
        const start = this.index;
        this.index++;
        let result = "";
        for (;;) {
            const char = this.text[this.index];
            if (char === undefined) this.fail("This string is never closed", start);
            if (char === quote) {
                this.index++;
                return result;
            }
            if (char === "\n") this.fail("Strings can't span lines; close it with a quote first", start);
            if (char === "\\") {
                const next = this.text[this.index + 1];
                const escapes: Record<string, string> = { '"': '"', "'": "'", "\\": "\\", "/": "/", b: "\b", f: "\f", n: "\n", r: "\r", t: "\t" };
                if (next === "u") {
                    const hex = this.text.slice(this.index + 2, this.index + 6);
                    if (!/^[0-9a-fA-F]{4}$/.test(hex)) this.fail("\\u needs four hex digits, like \\u00e9");
                    result += String.fromCharCode(parseInt(hex, 16));
                    this.index += 6;
                    continue;
                }
                if (next === undefined || !(next in escapes) || (next === "'" && !this.relaxed)) {
                    this.fail(`Unknown escape \\${next ?? ""}`);
                }
                result += escapes[next];
                this.index += 2;
                continue;
            }
            if (char < " " && char !== "\t") this.fail("Control characters must be escaped in strings");
            if (char === "\t" && !this.relaxed) this.fail("Tabs must be written as \\t in JSON strings");
            result += char;
            this.index++;
        }
    }

    private parseNumber(): number {
        const start = this.index;
        const pattern = this.relaxed
            ? /^[+-]?(?:Infinity|NaN|0[xX][0-9a-fA-F]+|(?:\d+\.?\d*|\.\d+)(?:[eE][+-]?\d+)?)/
            : /^-?(?:0|[1-9]\d*)(?:\.\d+)?(?:[eE][+-]?\d+)?/;
        const match = pattern.exec(this.text.slice(this.index));
        if (!match) this.fail(`Unexpected ${this.describe()}: expected a number`);
        const raw = match[0];
        const value = /0[xX]/.test(raw) ? (raw.startsWith("-") ? -1 : 1) * parseInt(raw.replace(/^[+-]/, ""), 16) : Number(raw);
        if (!Number.isFinite(value)) this.fail("JSON can't hold Infinity or NaN", start);
        this.index += raw.length;
        const next = this.text[this.index];
        if (next !== undefined && IDENTIFIER_PART.test(next)) this.fail(`Unexpected ${this.describe()} in a number`);
        return value;
    }
}

export function parseJson(text: string): JsonValue {
    return new Parser(text, false).parse();
}

export function parseJsObject(text: string): JsonValue {
    // Allow a pasted "const x = {...};" or "export default {...}", after any
    // leading comments. The prefix is blanked out rather than cut, so error
    // positions still match the text as typed.
    const start = new Parser(text, true).skipLeading();
    const prefix = /^(?:export\s+default\s+|(?:export\s+)?(?:const|let|var)\s+[A-Za-z_$][\w$]*(?:\s*:\s*[^=]+?)?\s*=\s*)/.exec(text.slice(start));
    const body = prefix
        ? text.slice(0, start) + prefix[0].replace(/[^\n]/g, " ") + text.slice(start + prefix[0].length)
        : text;
    return new Parser(body, true).parse();
}

// ---- Typed values for CSV and key = value

export function typedValue(raw: string, detectTypes: boolean): JsonValue {
    if (!detectTypes) return raw;
    const text = raw.trim();
    if (text === "true") return true;
    if (text === "false") return false;
    if (text === "null") return null;
    // Plain decimal numbers only, and not ones with leading zeros like a zip
    // code or phone number, which should stay text.
    if (/^-?(?:0|[1-9]\d*)(?:\.\d+)?(?:[eE][+-]?\d+)?$/.test(text)) {
        const value = Number(text);
        if (Number.isFinite(value) && Math.abs(value) <= Number.MAX_SAFE_INTEGER) return value;
    }
    return raw;
}

// ---- CSV / TSV

// Picks the delimiter that splits the first line into the most columns.
export function detectDelimiter(text: string): "," | ";" | "\t" | "|" {
    const firstLine = text.split(/\r?\n/).find((l) => l.trim() !== "") ?? "";
    const candidates = [",", ";", "\t", "|"] as const;
    let best: "," | ";" | "\t" | "|" = ",";
    let bestCount = 0;
    for (const delimiter of candidates) {
        // Ignore delimiters inside quotes.
        const count = firstLine.replace(/"[^"]*"/g, "").split(delimiter).length - 1;
        if (count > bestCount) {
            best = delimiter;
            bestCount = count;
        }
    }
    return best;
}

// Splits CSV into rows of cells, following RFC 4180 quoting: cells in double
// quotes can hold the delimiter, line breaks and "" for a quote.
export function parseCsvRows(text: string, delimiter: string): string[][] {
    const rows: string[][] = [];
    let row: string[] = [];
    let cell = "";
    let quoted = false;
    let quoteStart = 0;
    let index = 0;

    while (index < text.length) {
        const char = text[index];
        if (quoted) {
            if (char === '"') {
                if (text[index + 1] === '"') {
                    cell += '"';
                    index += 2;
                    continue;
                }
                quoted = false;
                index++;
                continue;
            }
            cell += char;
            index++;
            continue;
        }
        if (char === '"' && cell.trim() === "") {
            quoted = true;
            quoteStart = index;
            cell = "";
            index++;
            continue;
        }
        if (char === delimiter) {
            row.push(cell);
            cell = "";
            index++;
            continue;
        }
        if (char === "\n" || char === "\r") {
            row.push(cell);
            rows.push(row);
            row = [];
            cell = "";
            index += char === "\r" && text[index + 1] === "\n" ? 2 : 1;
            continue;
        }
        cell += char;
        index++;
    }
    if (quoted) {
        const { line, column } = lineAndColumn(text, quoteStart);
        throw new ConvertError("This quoted cell is never closed with a quote", line, column);
    }
    if (cell !== "" || row.length > 0) {
        row.push(cell);
        rows.push(row);
    }
    // Blank lines aren't rows.
    return rows.filter((r) => !(r.length === 1 && r[0].trim() === ""));
}

export function parseCsv(text: string, options: Pick<ConvertOptions, "headerRow" | "delimiter" | "detectTypes">): JsonValue[] {
    const delimiter = options.delimiter === "auto" ? detectDelimiter(text) : options.delimiter;
    const rows = parseCsvRows(text, delimiter);
    if (rows.length === 0) throw new ConvertError("The input is empty", 1, 1);
    const cell = (raw: string) => typedValue(raw, options.detectTypes);

    if (!options.headerRow) return rows.map((r) => r.map(cell));

    // Blank or repeated headers get a name, so no column is lost.
    const seen = new Map<string, number>();
    const headers = rows[0].map((raw, i) => {
        const base = raw.trim() || `column${i + 1}`;
        const count = (seen.get(base) ?? 0) + 1;
        seen.set(base, count);
        return count === 1 ? base : `${base}_${count}`;
    });

    return rows.slice(1).map((r) => {
        const record: { [key: string]: JsonValue } = {};
        const width = Math.max(headers.length, r.length);
        for (let i = 0; i < width; i++) {
            record[headers[i] ?? `column${i + 1}`] = cell(r[i] ?? "");
        }
        return record;
    });
}

// ---- Key = value (.env, .ini, .properties)

function setPath(target: { [key: string]: JsonValue }, path: string[], value: JsonValue, line: number) {
    let node = target;
    path.slice(0, -1).forEach((part, i) => {
        const existing = node[part];
        if (existing === undefined) node[part] = {};
        else if (typeof existing !== "object" || existing === null || Array.isArray(existing)) {
            throw new ConvertError(`"${path.slice(0, i + 1).join(".")}" already has a value, so it can't also hold "${path.slice(i + 1).join(".")}"`, line, 1);
        }
        node = node[part] as { [key: string]: JsonValue };
    });
    const last = path[path.length - 1];
    if (typeof node[last] === "object" && node[last] !== null && !Array.isArray(node[last])) {
        throw new ConvertError(`"${path.join(".")}" already holds nested keys`, line, 1);
    }
    node[last] = value;
}

const unquote = (value: string) => {
    const match = /^(["'])(.*)\1$/.exec(value);
    if (!match) return null;
    return match[1] === '"' ? match[2].replace(/\\n/g, "\n").replace(/\\"/g, '"').replace(/\\\\/g, "\\") : match[2];
};

export function parseKeyValue(text: string, detectTypes: boolean): { [key: string]: JsonValue } {
    const result: { [key: string]: JsonValue } = {};
    let section: string[] = [];

    text.split(/\r?\n/).forEach((rawLine, i) => {
        const lineNumber = i + 1;
        const line = rawLine.trim();
        if (line === "" || line.startsWith("#") || line.startsWith(";") || line.startsWith("//")) return;

        // [section] or [section.sub] from .ini files
        const header = /^\[([^\]]+)\]$/.exec(line);
        if (header) {
            section = header[1].split(".").map((s) => s.trim()).filter(Boolean);
            return;
        }

        const withoutExport = line.replace(/^export\s+/, "");
        const match = /^([^=:]+?)\s*[=:]\s*(.*)$/.exec(withoutExport);
        if (!match) {
            const column = rawLine.length - rawLine.trimStart().length + 1;
            throw new ConvertError('Expected "key = value" or "key: value" on this line', lineNumber, column);
        }
        const key = match[1].trim();
        const rawValue = match[2].trim();
        const quoted = unquote(rawValue);
        // Strip "value # comment", but only outside quotes.
        const value = quoted !== null ? quoted : rawValue.replace(/\s+[#;].*$/, "");
        const path = [...section, ...key.split(".").map((p) => p.trim()).filter(Boolean)];
        if (path.length === 0) throw new ConvertError("This line has no key", lineNumber, 1);
        setPath(result, path, quoted !== null ? value : typedValue(value, detectTypes), lineNumber);
    });

    if (Object.keys(result).length === 0) throw new ConvertError("No key = value lines found", 1, 1);
    return result;
}

// ---- Detecting the format

export function detectFormat(text: string): InputFormat {
    // Code often starts with comments; they say nothing about the format.
    let trimmed = text.trim();
    const leadingComment = /^(?:\/\/[^\n]*(?:\n|$)|\/\*[\s\S]*?\*\/)\s*/;
    while (leadingComment.test(trimmed)) trimmed = trimmed.replace(leadingComment, "");
    if (/^[[{]/.test(trimmed)) {
        try {
            parseJson(trimmed);
            return "json";
        }
        catch {
            return "js";
        }
    }
    if (/^(?:export\s+default\s|(?:export\s+)?(?:const|let|var)\s)/.test(trimmed)) return "js";

    const lines = trimmed.split(/\r?\n/).map((l) => l.trim()).filter((l) => l && !/^[#;]/.test(l));
    // key = value files: most lines have "=" (or "key: value") and there's no
    // delimiter-separated header with several columns.
    const keyValueLines = lines.filter((l) => /^\[[^\]]+\]$/.test(l) || /^(?:export\s+)?[\w.-]+\s*[=:]\s*/.test(l));
    const delimiter = detectDelimiter(trimmed);
    const columns = (lines[0] ?? "").split(delimiter).length;
    if (keyValueLines.length >= Math.ceil(lines.length * 0.8) && !(columns > 2 && lines.length > 1 && lines.every((l) => l.split(delimiter).length === columns))) {
        return "keyvalue";
    }
    return "csv";
}

// ---- Converting

const plural = (count: number, word: string) => `${count} ${word}${count === 1 ? "" : "s"}`;

function describe(value: JsonValue, format: InputFormat): string {
    if (format === "csv" && Array.isArray(value)) {
        const columns = value[0] && typeof value[0] === "object" && value[0] !== null
            ? (Array.isArray(value[0]) ? value[0].length : Object.keys(value[0]).length)
            : 0;
        return `${plural(value.length, "row")}, ${plural(columns, "column")}`;
    }
    if (Array.isArray(value)) return `Array of ${plural(value.length, "item")}`;
    if (value !== null && typeof value === "object") return `Object with ${plural(Object.keys(value).length, "key")}`;
    return `A single ${value === null ? "null" : typeof value}`;
}

export function convert(text: string, options: ConvertOptions): ConvertResult {
    if (text.trim() === "") throw new ConvertError("The input is empty", 1, 1);
    const format = options.format === "auto" ? detectFormat(text) : options.format;
    let value: JsonValue;
    switch (format) {
        case "json":
            value = parseJson(text);
            break;
        case "js":
            value = parseJsObject(text);
            break;
        case "csv":
            value = parseCsv(text, options);
            break;
        case "keyvalue":
            value = parseKeyValue(text, options.detectTypes);
            break;
    }
    return { value, format, summary: describe(value, format) };
}

function sortKeysDeep(value: JsonValue): JsonValue {
    if (Array.isArray(value)) return value.map(sortKeysDeep);
    if (value !== null && typeof value === "object") {
        return Object.fromEntries(
            Object.keys(value).sort((a, b) => a.localeCompare(b)).map((key) => [key, sortKeysDeep(value[key])])
        );
    }
    return value;
}

export function formatJson(value: JsonValue, indent: Indent, sortKeys = false): string {
    const space = indent === "min" ? undefined : indent === "tab" ? "\t" : Number(indent);
    return JSON.stringify(sortKeys ? sortKeysDeep(value) : value, null, space);
}

// A safe file name for the download: "my data" -> "my-data.json".
export function jsonFileName(name: string): string {
    const base = name.trim().replace(/\.json$/i, "").replace(/[\\/:*?"<>|]+/g, "").replace(/\s+/g, "-");
    return `${base || "converted"}.json`;
}

export const EXAMPLES: Record<InputFormat, string> = {
    json: '{"name":"Ulf","race":"Dwarf","hp":30,"tags":["barkeep","quest giver"],"alive":true}',
    js: `// Pasted from code: comments, unquoted keys, single quotes and trailing commas are fine
const npc = {
  name: 'Ulf',
  race: 'Dwarf',
  hp: 30,
  tags: ['barkeep', 'quest giver',],
  alive: true,
};`,
    csv: `name,race,hp,alive
Ulf,Dwarf,30,true
Vex,Tiefling,40,true
"Merrin, the Abbot",Human,12,false`,
    keyvalue: `# .env, .ini or .properties
APP_NAME=Hub
PORT=5173
DEBUG=false

[database]
host = localhost
port = 5432
user.name = "admin"`,
};
