// =====================================
// Dev tools
// =====================================
//
// The logic behind the small tools on the Dev Tools page (the JSON converter
// has its own file). Pure functions, so they can be tested without React.
// Errors are thrown as ToolError with a message meant for the page.

export class ToolError extends Error {
    constructor(message: string) {
        super(message);
        this.name = "ToolError";
    }
}

// =====================================
// Encode / decode
// =====================================

export type Codec = "base64" | "base64url" | "url" | "html";

export const CODECS: { value: Codec; label: string }[] = [
    { value: "base64", label: "Base64" },
    { value: "base64url", label: "Base64 (URL-safe)" },
    { value: "url", label: "URL encoding" },
    { value: "html", label: "HTML entities" },
];

// Base64 of the text's UTF-8 bytes, so "é" and emoji round-trip (btoa alone
// only handles Latin-1).
export function base64Encode(text: string, urlSafe = false): string {
    const bytes = new TextEncoder().encode(text);
    let binary = "";
    bytes.forEach((b) => { binary += String.fromCharCode(b); });
    const encoded = btoa(binary);
    return urlSafe ? encoded.replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "") : encoded;
}

// Accepts standard and URL-safe Base64, with or without padding and with
// line breaks, as long as the bytes are UTF-8 text.
export function base64Decode(encoded: string): string {
    const clean = encoded.replace(/\s+/g, "").replace(/-/g, "+").replace(/_/g, "/");
    if (clean === "") return "";
    if (!/^[A-Za-z0-9+/]*={0,2}$/.test(clean)) {
        const bad = clean.replace(/[A-Za-z0-9+/=]/g, "")[0];
        throw new ToolError(`"${bad}" isn't a Base64 character`);
    }
    if (clean.replace(/=+$/, "").length % 4 === 1) throw new ToolError("This Base64 is cut off: its length doesn't work out");
    const padded = clean.replace(/=+$/, "").padEnd(Math.ceil(clean.replace(/=+$/, "").length / 4) * 4, "=");
    const binary = atob(padded);
    const bytes = Uint8Array.from(binary, (c) => c.charCodeAt(0));
    try {
        return new TextDecoder("utf-8", { fatal: true }).decode(bytes);
    }
    catch {
        throw new ToolError("This decodes to binary data, not text (it may be an image or a file)");
    }
}

export function urlDecode(encoded: string): string {
    try {
        // Forms encode spaces as "+".
        return decodeURIComponent(encoded.replace(/\+/g, " "));
    }
    catch {
        const bad = /%(?![0-9A-Fa-f]{2})/.exec(encoded);
        throw new ToolError(bad ? `"%" at position ${bad.index + 1} isn't followed by two hex digits` : "This isn't valid URL encoding");
    }
}

const HTML_ESCAPES: Record<string, string> = { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" };

const NAMED_ENTITIES: Record<string, string> = {
    amp: "&", lt: "<", gt: ">", quot: '"', apos: "'", nbsp: " ", copy: "©", reg: "®", trade: "™",
    hellip: "…", mdash: "—", ndash: "–", lsquo: "‘", rsquo: "’", ldquo: "“", rdquo: "”", euro: "€",
    pound: "£", yen: "¥", cent: "¢", deg: "°", times: "×", divide: "÷", middot: "·", bull: "•",
    aring: "å", auml: "ä", ouml: "ö", Aring: "Å", Auml: "Ä", Ouml: "Ö", eacute: "é", uuml: "ü", szlig: "ß",
};

export function htmlEscape(text: string): string {
    return text.replace(/[&<>"']/g, (c) => HTML_ESCAPES[c]);
}

// Named entities from a common set, plus every numeric one (&#233; &#xE9;).
// Unknown names are left as they are.
export function htmlUnescape(text: string): string {
    return text.replace(/&(#x[0-9a-fA-F]+|#\d+|[A-Za-z]+);/g, (whole, body: string) => {
        if (body[0] === "#") {
            const code = body[1] === "x" || body[1] === "X" ? parseInt(body.slice(2), 16) : parseInt(body.slice(1), 10);
            return code > 0 && code <= 0x10ffff ? String.fromCodePoint(code) : whole;
        }
        return NAMED_ENTITIES[body] ?? whole;
    });
}

export function encode(codec: Codec, text: string): string {
    switch (codec) {
        case "base64": return base64Encode(text);
        case "base64url": return base64Encode(text, true);
        case "url": return encodeURIComponent(text);
        case "html": return htmlEscape(text);
    }
}

export function decode(codec: Codec, text: string): string {
    switch (codec) {
        case "base64":
        case "base64url": return base64Decode(text);
        case "url": return urlDecode(text);
        case "html": return htmlUnescape(text);
    }
}

// =====================================
// JWT decoder
// =====================================

export interface DecodedJwt {
    header: Record<string, unknown>;
    payload: Record<string, unknown>;
    signature: string;
    // From the standard iat / nbf / exp claims, when present.
    issuedAt?: Date;
    notBefore?: Date;
    expiresAt?: Date;
}

function decodeJwtPart(part: string, name: string): Record<string, unknown> {
    let text: string;
    try {
        text = base64Decode(part);
    }
    catch (error) {
        throw new ToolError(`The ${name} isn't valid Base64: ${(error as Error).message}`);
    }
    let value: unknown;
    try {
        value = JSON.parse(text);
    }
    catch {
        throw new ToolError(`The ${name} decodes, but it isn't JSON`);
    }
    if (typeof value !== "object" || value === null || Array.isArray(value)) throw new ToolError(`The ${name} should be a JSON object`);
    return value as Record<string, unknown>;
}

const claimDate = (value: unknown) => (typeof value === "number" && Number.isFinite(value) ? new Date(value * 1000) : undefined);

// Decodes only: the signature is shown but can't be checked without the key.
export function decodeJwt(token: string): DecodedJwt {
    const clean = token.trim().replace(/^Bearer\s+/i, "");
    const parts = clean.split(".");
    if (parts.length !== 3) {
        throw new ToolError(`A JWT has three parts separated by dots (header.payload.signature); this has ${parts.length}`);
    }
    const header = decodeJwtPart(parts[0], "header");
    const payload = decodeJwtPart(parts[1], "payload");
    return {
        header,
        payload,
        signature: parts[2],
        issuedAt: claimDate(payload.iat),
        notBefore: claimDate(payload.nbf),
        expiresAt: claimDate(payload.exp),
    };
}

export type JwtStatus = "valid" | "expired" | "not-yet-valid" | "no-expiry";

// Only about time; it says nothing about whether the signature is genuine.
export function jwtStatus(jwt: DecodedJwt, now: Date): JwtStatus {
    if (jwt.notBefore && now < jwt.notBefore) return "not-yet-valid";
    if (!jwt.expiresAt) return "no-expiry";
    return now >= jwt.expiresAt ? "expired" : "valid";
}

// =====================================
// Regex tester
// =====================================

export interface RegexMatch {
    index: number;
    text: string;
    // Numbered groups ($1, $2...), undefined when a group didn't take part.
    groups: (string | undefined)[];
    named: Record<string, string | undefined>;
}

export interface RegexResult {
    matches: RegexMatch[];
    // More matches than MAX_MATCHES; only the first ones are listed.
    truncated: boolean;
}

export const MAX_MATCHES = 1000;
export const REGEX_FLAGS = ["g", "i", "m", "s", "u", "y"] as const;

export function buildRegex(pattern: string, flags: string): RegExp {
    try {
        return new RegExp(pattern, flags);
    }
    catch (error) {
        // "Invalid regular expression: /(/: Unterminated group" -> "Unterminated group"
        const message = (error as Error).message.replace(/^Invalid regular expression: \/.*\/[a-z]*: /, "");
        throw new ToolError(message);
    }
}

export function runRegex(pattern: string, flags: string, text: string): RegexResult {
    if (pattern === "") return { matches: [], truncated: false };
    const regex = buildRegex(pattern, flags.includes("g") ? flags : `${flags}g`);
    const matches: RegexMatch[] = [];
    let truncated = false;
    let match: RegExpExecArray | null;
    while ((match = regex.exec(text)) !== null) {
        if (matches.length >= MAX_MATCHES) {
            truncated = true;
            break;
        }
        matches.push({ index: match.index, text: match[0], groups: match.slice(1), named: { ...match.groups } });
        // A match of nothing (like /a*/ on "b") would find itself forever.
        if (match[0] === "") regex.lastIndex += regex.unicode && (text.codePointAt(regex.lastIndex) ?? 0) > 0xffff ? 2 : 1;
        // Without "g" only the first match counts, like String.match.
        if (!flags.includes("g")) break;
    }
    return { matches, truncated };
}

// Splits the text into plain and matched pieces, for highlighting.
export function highlightSegments(text: string, matches: RegexMatch[]): { text: string; match: number | null }[] {
    const segments: { text: string; match: number | null }[] = [];
    let at = 0;
    matches.forEach((m, i) => {
        if (m.text === "") return;
        if (m.index > at) segments.push({ text: text.slice(at, m.index), match: null });
        segments.push({ text: m.text, match: i });
        at = m.index + m.text.length;
    });
    if (at < text.length) segments.push({ text: text.slice(at), match: null });
    return segments;
}

export function regexReplace(pattern: string, flags: string, text: string, replacement: string): string {
    if (pattern === "") return text;
    return text.replace(buildRegex(pattern, flags), replacement);
}

// =====================================
// Timestamps
// =====================================

export interface ParsedTime {
    date: Date;
    // How the input was read, e.g. "Unix seconds".
    source: string;
}

// Numbers are Unix time: seconds when they're small enough to be, otherwise
// milliseconds (1e11 seconds is the year 5138). Anything else goes to Date.parse,
// so ISO 8601 and most written dates work.
export function parseTimestamp(input: string, now: Date): ParsedTime {
    const text = input.trim();
    if (text === "" || text.toLowerCase() === "now") return { date: now, source: "Now" };
    if (/^-?\d+(?:\.\d+)?$/.test(text)) {
        const value = Number(text);
        const seconds = Math.abs(value) < 1e11;
        const date = new Date(seconds ? value * 1000 : value);
        if (Number.isNaN(date.getTime())) throw new ToolError("That number is too large to be a date");
        return { date, source: seconds ? "Unix seconds" : "Unix milliseconds" };
    }
    const parsed = Date.parse(text);
    if (Number.isNaN(parsed)) throw new ToolError("That doesn't look like a date. Try 1700000000, 2026-10-21T14:30:00Z or \"now\"");
    return { date: new Date(parsed), source: /^\d{4}-\d{2}-\d{2}/.test(text) ? "ISO 8601" : "Date text" };
}

const UNITS: [Intl.RelativeTimeFormatUnit, number][] = [
    ["year", 365 * 24 * 3600],
    ["month", 30 * 24 * 3600],
    ["week", 7 * 24 * 3600],
    ["day", 24 * 3600],
    ["hour", 3600],
    ["minute", 60],
    ["second", 1],
];

// "3 days ago", "in 2 hours", "now"; uses the biggest unit that fits.
export function relativeTime(date: Date, now: Date, locale = "en"): string {
    const seconds = Math.round((date.getTime() - now.getTime()) / 1000);
    if (Math.abs(seconds) < 5) return "now";
    const format = new Intl.RelativeTimeFormat(locale, { numeric: "auto" });
    const [unit, size] = UNITS.find(([, s]) => Math.abs(seconds) >= s) ?? ["second", 1];
    return format.format(Math.trunc(seconds / size), unit);
}

// =====================================
// Colours
// =====================================

export interface Rgba { r: number; g: number; b: number; a: number }

const clampByte = (v: number) => Math.min(255, Math.max(0, Math.round(v)));
const clampUnit = (v: number) => Math.min(1, Math.max(0, v));

function hslToRgb(h: number, s: number, l: number): [number, number, number] {
    const hue = ((h % 360) + 360) % 360;
    const c = (1 - Math.abs(2 * l - 1)) * s;
    const x = c * (1 - Math.abs(((hue / 60) % 2) - 1));
    const m = l - c / 2;
    const [r, g, b] = hue < 60 ? [c, x, 0] : hue < 120 ? [x, c, 0] : hue < 180 ? [0, c, x] : hue < 240 ? [0, x, c] : hue < 300 ? [x, 0, c] : [c, 0, x];
    return [(r + m) * 255, (g + m) * 255, (b + m) * 255];
}

export function rgbToHsl({ r, g, b }: Rgba): { h: number; s: number; l: number } {
    const [rr, gg, bb] = [r / 255, g / 255, b / 255];
    const max = Math.max(rr, gg, bb);
    const min = Math.min(rr, gg, bb);
    const l = (max + min) / 2;
    if (max === min) return { h: 0, s: 0, l };
    const d = max - min;
    const s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    const h = max === rr ? (gg - bb) / d + (gg < bb ? 6 : 0) : max === gg ? (bb - rr) / d + 2 : (rr - gg) / d + 4;
    return { h: h * 60, s, l };
}

const NAMED_COLORS: Record<string, string> = {
    black: "#000000", white: "#ffffff", red: "#ff0000", green: "#008000", lime: "#00ff00", blue: "#0000ff",
    yellow: "#ffff00", cyan: "#00ffff", magenta: "#ff00ff", gray: "#808080", grey: "#808080", orange: "#ffa500",
    purple: "#800080", pink: "#ffc0cb", brown: "#a52a2a", navy: "#000080", teal: "#008080", gold: "#ffd700",
    silver: "#c0c0c0", maroon: "#800000", olive: "#808000", transparent: "#00000000",
};

// HEX (#rgb, #rgba, #rrggbb, #rrggbbaa), rgb()/rgba(), hsl()/hsla() or a
// common colour name. Comma and space separated forms both work.
export function parseColor(input: string): Rgba {
    const text = input.trim().toLowerCase();
    const named = NAMED_COLORS[text];
    if (named) return parseColor(named);

    const hex = /^#?([0-9a-f]{3,4}|[0-9a-f]{6}|[0-9a-f]{8})$/.exec(text);
    if (hex) {
        const digits = hex[1].length <= 4 ? [...hex[1]].map((d) => d + d).join("") : hex[1];
        const value = (i: number) => parseInt(digits.slice(i * 2, i * 2 + 2), 16);
        return { r: value(0), g: value(1), b: value(2), a: digits.length === 8 ? Math.round((value(3) / 255) * 100) / 100 : 1 };
    }

    const fn = /^(rgba?|hsla?)\(\s*([^)]*)\)$/.exec(text);
    if (fn) {
        const parts = fn[2].split(/[\s,/]+/).filter(Boolean);
        if (parts.length < 3 || parts.length > 4) throw new ToolError(`${fn[1]}() needs 3 values (and an optional alpha)`);
        const alpha = parts[3] === undefined ? 1 : parts[3].endsWith("%") ? parseFloat(parts[3]) / 100 : parseFloat(parts[3]);
        if (parts.some((p) => Number.isNaN(parseFloat(p)))) throw new ToolError(`${fn[1]}() values must be numbers`);
        if (fn[1].startsWith("rgb")) {
            const channel = (p: string) => (p.endsWith("%") ? (parseFloat(p) / 100) * 255 : parseFloat(p));
            return { r: clampByte(channel(parts[0])), g: clampByte(channel(parts[1])), b: clampByte(channel(parts[2])), a: clampUnit(alpha) };
        }
        const [r, g, b] = hslToRgb(parseFloat(parts[0]), clampUnit(parseFloat(parts[1]) / 100), clampUnit(parseFloat(parts[2]) / 100));
        return { r: clampByte(r), g: clampByte(g), b: clampByte(b), a: clampUnit(alpha) };
    }

    throw new ToolError("Try #ff8800, #f80, rgb(255 136 0), hsl(32 100% 50%) or a name like orange");
}

const hex2 = (v: number) => clampByte(v).toString(16).padStart(2, "0");

export function toHex(color: Rgba): string {
    return `#${hex2(color.r)}${hex2(color.g)}${hex2(color.b)}${color.a < 1 ? hex2(color.a * 255) : ""}`;
}

export function toRgbString(color: Rgba): string {
    return color.a < 1 ? `rgba(${color.r}, ${color.g}, ${color.b}, ${color.a})` : `rgb(${color.r}, ${color.g}, ${color.b})`;
}

export function toHslString(color: Rgba): string {
    const { h, s, l } = rgbToHsl(color);
    const body = `${Math.round(h)}, ${Math.round(s * 100)}%, ${Math.round(l * 100)}%`;
    return color.a < 1 ? `hsla(${body}, ${color.a})` : `hsl(${body})`;
}

// WCAG relative luminance and contrast ratio (1 to 21).
export function luminance({ r, g, b }: Rgba): number {
    const channel = (v: number) => {
        const c = v / 255;
        return c <= 0.04045 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4;
    };
    return 0.2126 * channel(r) + 0.7152 * channel(g) + 0.0722 * channel(b);
}

export function contrastRatio(a: Rgba, b: Rgba): number {
    const [light, dark] = [luminance(a), luminance(b)].sort((x, y) => y - x);
    return (light + 0.05) / (dark + 0.05);
}

// The WCAG level for normal-size text.
export function wcagLevel(ratio: number): "AAA" | "AA" | "AA large" | "Fail" {
    if (ratio >= 7) return "AAA";
    if (ratio >= 4.5) return "AA";
    if (ratio >= 3) return "AA large";
    return "Fail";
}

// =====================================
// Text
// =====================================

export type CaseKind = "camel" | "pascal" | "snake" | "constant" | "kebab" | "title" | "sentence" | "lower" | "upper";

export const CASES: { value: CaseKind; label: string; example: string }[] = [
    { value: "camel", label: "camelCase", example: "userFirstName" },
    { value: "pascal", label: "PascalCase", example: "UserFirstName" },
    { value: "snake", label: "snake_case", example: "user_first_name" },
    { value: "constant", label: "CONSTANT_CASE", example: "USER_FIRST_NAME" },
    { value: "kebab", label: "kebab-case", example: "user-first-name" },
    { value: "title", label: "Title Case", example: "User First Name" },
    { value: "sentence", label: "Sentence case", example: "User first name" },
    { value: "lower", label: "lower case", example: "user first name" },
    { value: "upper", label: "UPPER CASE", example: "USER FIRST NAME" },
];

// Splits "userFirstName", "user_first_name", "XMLHttpRequest" or
// "user first-name" into words.
export function splitWords(text: string): string[] {
    return text
        .replace(/([a-z0-9])([A-Z])/g, "$1 $2")
        .replace(/([A-Z]+)([A-Z][a-z])/g, "$1 $2")
        .split(/[^\p{L}\p{N}]+/u)
        .filter(Boolean);
}

const capitalise = (word: string) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();

// Converts each line on its own, so a list of names converts line by line.
export function convertCase(text: string, kind: CaseKind): string {
    return text.split("\n").map((line) => {
        if (kind === "lower") return line.toLowerCase();
        if (kind === "upper") return line.toUpperCase();
        const words = splitWords(line);
        if (words.length === 0) return line;
        switch (kind) {
            case "camel": return words.map((w, i) => (i === 0 ? w.toLowerCase() : capitalise(w))).join("");
            case "pascal": return words.map(capitalise).join("");
            case "snake": return words.map((w) => w.toLowerCase()).join("_");
            case "constant": return words.map((w) => w.toUpperCase()).join("_");
            case "kebab": return words.map((w) => w.toLowerCase()).join("-");
            case "title": return words.map(capitalise).join(" ");
            case "sentence": return words.map((w, i) => (i === 0 ? capitalise(w) : w.toLowerCase())).join(" ");
        }
    }).join("\n");
}

export interface TextStats {
    characters: number;
    charactersNoSpaces: number;
    words: number;
    lines: number;
    // UTF-8 size, what a file of this text would weigh.
    bytes: number;
}

export function textStats(text: string): TextStats {
    return {
        // Counts emoji and other astral characters once, not as two halves.
        characters: [...text].length,
        charactersNoSpaces: [...text.replace(/\s/g, "")].length,
        words: (text.match(/[\p{L}\p{N}'’-]+/gu) ?? []).length,
        lines: text === "" ? 0 : text.split("\n").length,
        bytes: new TextEncoder().encode(text).length,
    };
}

export type LineOperation = "sort" | "sort-desc" | "unique" | "reverse" | "trim" | "remove-empty" | "shuffle";

export const LINE_OPERATIONS: { value: LineOperation; label: string }[] = [
    { value: "sort", label: "Sort A → Z" },
    { value: "sort-desc", label: "Sort Z → A" },
    { value: "unique", label: "Remove duplicates" },
    { value: "reverse", label: "Reverse order" },
    { value: "trim", label: "Trim spaces" },
    { value: "remove-empty", label: "Remove empty lines" },
    { value: "shuffle", label: "Shuffle" },
];

export function applyLineOperation(text: string, operation: LineOperation, random: () => number = Math.random): string {
    const lines = text.split("\n");
    // Natural order, so "item 2" sorts before "item 10".
    const collator = new Intl.Collator(undefined, { numeric: true, sensitivity: "base" });
    switch (operation) {
        case "sort": return [...lines].sort(collator.compare).join("\n");
        case "sort-desc": return [...lines].sort((a, b) => collator.compare(b, a)).join("\n");
        case "unique": return [...new Set(lines)].join("\n");
        case "reverse": return [...lines].reverse().join("\n");
        case "trim": return lines.map((l) => l.trim()).join("\n");
        case "remove-empty": return lines.filter((l) => l.trim() !== "").join("\n");
        case "shuffle": {
            const shuffled = [...lines];
            for (let i = shuffled.length - 1; i > 0; i--) {
                const j = Math.floor(random() * (i + 1));
                [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
            }
            return shuffled.join("\n");
        }
    }
}

// =====================================
// Generators
// =====================================

export type HashAlgorithm = "SHA-1" | "SHA-256" | "SHA-384" | "SHA-512";

export const HASH_ALGORITHMS: HashAlgorithm[] = ["SHA-256", "SHA-1", "SHA-384", "SHA-512"];

export function bytesToHex(buffer: ArrayBuffer): string {
    return [...new Uint8Array(buffer)].map((b) => b.toString(16).padStart(2, "0")).join("");
}

// Uses the browser's Web Crypto, so it's fast and never leaves the page.
export async function hashText(text: string, algorithm: HashAlgorithm): Promise<string> {
    const digest = await crypto.subtle.digest(algorithm, new TextEncoder().encode(text));
    return bytesToHex(digest);
}

// A version 4 UUID from 16 random bytes: sets the version (4) and variant
// (10xx) bits as RFC 9562 requires.
export function uuidFromBytes(bytes: Uint8Array): string {
    if (bytes.length !== 16) throw new ToolError("A UUID needs 16 bytes");
    const b = Uint8Array.from(bytes);
    b[6] = (b[6] & 0x0f) | 0x40;
    b[8] = (b[8] & 0x3f) | 0x80;
    const hex = bytesToHex(b.buffer);
    return `${hex.slice(0, 8)}-${hex.slice(8, 12)}-${hex.slice(12, 16)}-${hex.slice(16, 20)}-${hex.slice(20)}`;
}

// crypto.randomUUID only exists on secure (https or localhost) pages.
export function randomUuid(): string {
    if (typeof crypto.randomUUID === "function") return crypto.randomUUID();
    return uuidFromBytes(crypto.getRandomValues(new Uint8Array(16)));
}

export type UuidFormat = "lower" | "upper" | "no-dashes" | "braces";

export function formatUuid(uuid: string, format: UuidFormat): string {
    switch (format) {
        case "upper": return uuid.toUpperCase();
        case "no-dashes": return uuid.replace(/-/g, "");
        case "braces": return `{${uuid}}`;
        default: return uuid;
    }
}
