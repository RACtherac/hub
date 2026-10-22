// =====================================
// Code block editing
// =====================================
//
// Helpers for the Project Tree's code blocks. The code is only ever stored and
// shown as text; nothing here (or in the block) runs it.

export const CODE_LANGUAGES: { value: string; label: string }[] = [
    { value: "plaintext", label: "Plain text" },
    { value: "typescript", label: "TypeScript" },
    { value: "javascript", label: "JavaScript" },
    { value: "tsx", label: "TSX / JSX" },
    { value: "csharp", label: "C#" },
    { value: "python", label: "Python" },
    { value: "sql", label: "SQL" },
    { value: "html", label: "HTML" },
    { value: "css", label: "CSS" },
    { value: "json", label: "JSON" },
    { value: "bash", label: "Shell" },
    { value: "powershell", label: "PowerShell" },
    { value: "java", label: "Java" },
    { value: "go", label: "Go" },
    { value: "rust", label: "Rust" },
    { value: "yaml", label: "YAML" },
    { value: "markdown", label: "Markdown" },
];

export const DEFAULT_LANGUAGE = "typescript";

export const INDENT = "  ";

export const languageLabel = (value: string | undefined) =>
    CODE_LANGUAGES.find((l) => l.value === value)?.label ?? "Plain text";

export interface Edit {
    value: string;
    selectionStart: number;
    selectionEnd: number;
}

// Where the line containing `index` starts.
const lineStart = (value: string, index: number) => value.lastIndexOf("\n", index - 1) + 1;

// Tab: with no selection, inserts an indent at the cursor. With a selection,
// indents every line it touches. Shift+Tab removes one indent (or whatever
// leading spaces there are, up to one indent) from those lines instead.
export function indentSelection(value: string, start: number, end: number, outdent: boolean): Edit {
    if (!outdent && start === end) {
        return { value: value.slice(0, start) + INDENT + value.slice(end), selectionStart: start + INDENT.length, selectionEnd: start + INDENT.length };
    }

    const from = lineStart(value, start);
    // A selection ending right at the start of a line doesn't include that line.
    const last = end > start && value[end - 1] === "\n" ? end - 1 : end;
    // Whole lines, so the part after the cursor counts too.
    const lineEnd = value.indexOf("\n", last);
    const to = lineEnd === -1 ? value.length : lineEnd;
    const lines = value.slice(from, to).split("\n");

    // How many removed characters were before the selection's start and end,
    // so both move back by exactly that much.
    let removedBeforeStart = 0;
    let removedBeforeEnd = 0;
    let offset = from;
    const changed = lines.map((line) => {
        const lineAt = offset;
        offset += line.length + 1;
        if (!outdent) return INDENT + line;
        const leading = /^ */.exec(line)![0].length;
        const remove = line.startsWith("\t") ? 1 : Math.min(leading, INDENT.length);
        removedBeforeStart += Math.max(0, Math.min(remove, start - lineAt));
        removedBeforeEnd += Math.max(0, Math.min(remove, end - lineAt));
        return line.slice(remove);
    });

    const next = value.slice(0, from) + changed.join("\n") + value.slice(to);
    if (!outdent) {
        return {
            value: next,
            selectionStart: start + INDENT.length,
            selectionEnd: end + INDENT.length * lines.length,
        };
    }
    return {
        value: next,
        selectionStart: start - removedBeforeStart,
        selectionEnd: end - removedBeforeEnd,
    };
}

// Enter keeps the current line's indentation, and adds one more after an
// opening bracket, so typing code doesn't mean re-indenting every line.
// Between a pair like {|} the closer moves to its own line below the cursor.
export function newlineWithIndent(value: string, start: number, end: number): Edit {
    const line = value.slice(lineStart(value, start), start);
    const indent = /^[ \t]*/.exec(line)![0];
    const extra = /[{[(:]\s*$/.test(line) ? INDENT : "";
    const insert = `\n${indent}${extra}`;
    const between = start === end && BRACKETS[value[start - 1]] !== undefined && BRACKETS[value[start - 1]] === value[start];
    const after = between ? `\n${indent}` : "";
    return {
        value: value.slice(0, start) + insert + after + value.slice(end),
        selectionStart: start + insert.length,
        selectionEnd: start + insert.length,
    };
}

// ---- Bracket pairs

export const BRACKETS: Record<string, string> = { "{": "}", "[": "]", "(": ")" };
const CLOSERS = new Set(Object.values(BRACKETS));

export const isOpener = (key: string) => key in BRACKETS;
export const isCloser = (key: string) => CLOSERS.has(key);

// Typing an opening bracket. With a selection, wraps it: (selection). With
// none, adds the closer too and puts the cursor between them, but only when
// the next character is a space, the end of the line or another closer, so
// typing "(" right in front of a word doesn't leave a stray ")".
// Returns null to let the browser type the character as usual.
export function typeOpener(value: string, start: number, end: number, opener: string): Edit | null {
    const closer = BRACKETS[opener];
    if (!closer) return null;
    if (start !== end) {
        const selected = value.slice(start, end);
        return {
            value: value.slice(0, start) + opener + selected + closer + value.slice(end),
            selectionStart: start + 1,
            selectionEnd: end + 1,
        };
    }
    const next = value[start];
    if (next !== undefined && !/\s/.test(next) && !CLOSERS.has(next) && next !== ";" && next !== ",") return null;
    return { value: value.slice(0, start) + opener + closer + value.slice(end), selectionStart: start + 1, selectionEnd: start + 1 };
}

// Typing a closing bracket right before the same closer steps over it,
// so an auto-added ")" isn't doubled.
export function typeCloser(value: string, start: number, end: number, closer: string): Edit | null {
    if (start !== end || value[start] !== closer) return null;
    return { value, selectionStart: start + 1, selectionEnd: start + 1 };
}

// Backspace between an empty pair, (|), deletes both halves.
export function backspacePair(value: string, start: number, end: number): Edit | null {
    if (start !== end || start === 0) return null;
    const closer = BRACKETS[value[start - 1]];
    if (closer === undefined || value[start] !== closer) return null;
    return { value: value.slice(0, start - 1) + value.slice(start + 1), selectionStart: start - 1, selectionEnd: start - 1 };
}

export function lineCount(value: string): number {
    return value === "" ? 1 : value.split("\n").length;
}
