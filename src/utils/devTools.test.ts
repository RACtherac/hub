import { test } from "node:test";
import assert from "node:assert/strict";

import {
    ToolError,
    applyLineOperation,
    base64Decode,
    base64Encode,
    contrastRatio,
    convertCase,
    decode,
    decodeJwt,
    encode,
    formatUuid,
    hashText,
    highlightSegments,
    htmlEscape,
    htmlUnescape,
    jwtStatus,
    parseColor,
    parseTimestamp,
    regexReplace,
    relativeTime,
    runRegex,
    splitWords,
    textStats,
    toHex,
    toHslString,
    toRgbString,
    urlDecode,
    uuidFromBytes,
    wcagLevel,
} from "./devTools";

function errorFrom(fn: () => unknown): ToolError {
    try {
        fn();
    }
    catch (error) {
        assert.ok(error instanceof ToolError, `expected a ToolError, got ${error}`);
        return error;
    }
    assert.fail("expected an error");
}

// ---- Encode / decode

test("Base64 handles UTF-8, the URL-safe alphabet and missing padding", () => {
    assert.equal(base64Encode("hello"), "aGVsbG8=");
    assert.equal(base64Encode("héllo 👋"), "aMOpbGxvIPCfkYs=");
    assert.equal(base64Decode("aMOpbGxvIPCfkYs="), "héllo 👋");
    assert.equal(base64Encode("??>", true), "Pz8-");
    assert.equal(base64Decode("Pz8-"), "??>");
    assert.equal(base64Decode("aGVsbG8"), "hello");
    assert.equal(base64Decode("aGVs\nbG8="), "hello");
    assert.equal(base64Decode(""), "");
});

test("Base64 errors say what's wrong", () => {
    assert.match(errorFrom(() => base64Decode("abc$")).message, /"\$" isn't a Base64 character/);
    assert.match(errorFrom(() => base64Decode("a")).message, /cut off/);
    // 0xff 0xfe isn't valid UTF-8.
    assert.match(errorFrom(() => base64Decode("//4=")).message, /binary data/);
});

test("URL and HTML encoding round-trip", () => {
    assert.equal(encode("url", "a b&c=d/é"), "a%20b%26c%3Dd%2F%C3%A9");
    assert.equal(decode("url", "a%20b%26c%3Dd%2F%C3%A9"), "a b&c=d/é");
    assert.equal(urlDecode("a+b"), "a b");
    assert.match(errorFrom(() => urlDecode("100%")).message, /position 4/);

    assert.equal(htmlEscape(`<a href="x">'Tom' & Jerry</a>`), "&lt;a href=&quot;x&quot;&gt;&#39;Tom&#39; &amp; Jerry&lt;/a&gt;");
    assert.equal(htmlUnescape("&lt;b&gt; &amp;amp; &eacute;&#233;&#xE9; &copy; &unknown;"), "<b> &amp; ééé © &unknown;");
    assert.equal(decode("html", encode("html", "<\"&'>")), "<\"&'>");
});

// ---- JWT

// header {"alg":"HS256","typ":"JWT"}, payload {"sub":"42","name":"Ulf","iat":1700000000,"exp":1700003600}
const TOKEN = [
    base64Encode('{"alg":"HS256","typ":"JWT"}', true),
    base64Encode('{"sub":"42","name":"Ulf","iat":1700000000,"exp":1700003600}', true),
    "c2lnbmF0dXJl",
].join(".");

test("a JWT decodes into header, payload and claim dates", () => {
    const jwt = decodeJwt(`Bearer ${TOKEN}`);
    assert.deepEqual(jwt.header, { alg: "HS256", typ: "JWT" });
    assert.equal(jwt.payload.name, "Ulf");
    assert.equal(jwt.issuedAt?.toISOString(), "2023-11-14T22:13:20.000Z");
    assert.equal(jwt.expiresAt?.toISOString(), "2023-11-14T23:13:20.000Z");
    assert.equal(jwt.signature, "c2lnbmF0dXJl");

    assert.equal(jwtStatus(jwt, new Date("2023-11-14T22:30:00Z")), "valid");
    assert.equal(jwtStatus(jwt, new Date("2024-01-01T00:00:00Z")), "expired");
    assert.equal(jwtStatus({ ...jwt, expiresAt: undefined }, new Date()), "no-expiry");
    assert.equal(jwtStatus({ ...jwt, notBefore: new Date("2030-01-01") }, new Date("2025-01-01")), "not-yet-valid");
});

test("broken JWTs say which part is wrong", () => {
    assert.match(errorFrom(() => decodeJwt("abc.def")).message, /three parts.*this has 2/);
    assert.match(errorFrom(() => decodeJwt("$$$.e30.x")).message, /header isn't valid Base64/);
    assert.match(errorFrom(() => decodeJwt(`${base64Encode("not json")}.e30.x`)).message, /header decodes, but it isn't JSON/);
    assert.match(errorFrom(() => decodeJwt(`e30.${base64Encode("[1]")}.x`)).message, /payload should be a JSON object/);
});

// ---- Regex

test("regex matches list their groups and stop at the limit", () => {
    const result = runRegex("(?<word>\\w+)@(\\w+)", "g", "ulf@hub vex@tavern");
    assert.deepEqual(result.matches.map((m) => [m.index, m.text, m.groups, m.named.word]), [
        [0, "ulf@hub", ["ulf", "hub"], "ulf"],
        [8, "vex@tavern", ["vex", "tavern"], "vex"],
    ]);
    // Without g, only the first match.
    assert.equal(runRegex("\\d", "", "1 2 3").matches.length, 1);
    // Empty matches don't loop forever.
    assert.equal(runRegex("x*", "g", "abc").matches.length, 4);
    assert.equal(runRegex("", "g", "abc").matches.length, 0);
    assert.equal(runRegex(".", "gs", "a".repeat(1500)).truncated, true);
    assert.match(errorFrom(() => runRegex("(", "g", "x")).message, /^Unterminated group/);
});

test("highlight segments cover the whole text, and replace previews work", () => {
    const text = "a1b22c";
    const segments = highlightSegments(text, runRegex("\\d+", "g", text).matches);
    assert.deepEqual(segments, [
        { text: "a", match: null }, { text: "1", match: 0 }, { text: "b", match: null }, { text: "22", match: 1 }, { text: "c", match: null },
    ]);
    assert.equal(segments.map((s) => s.text).join(""), text);
    assert.equal(regexReplace("(\\w+)@(\\w+)", "g", "ulf@hub", "$2:$1"), "hub:ulf");
    assert.equal(regexReplace("", "g", "same", "x"), "same");
});

// ---- Timestamps

const NOW = new Date("2026-10-21T12:00:00Z");

test("timestamps read seconds, milliseconds and dates", () => {
    assert.deepEqual(parseTimestamp("1700000000", NOW), { date: new Date("2023-11-14T22:13:20Z"), source: "Unix seconds" });
    assert.deepEqual(parseTimestamp("1700000000123", NOW), { date: new Date(1700000000123), source: "Unix milliseconds" });
    assert.equal(parseTimestamp("2026-10-21T14:30:00Z", NOW).source, "ISO 8601");
    assert.equal(parseTimestamp("now", NOW).date, NOW);
    assert.equal(parseTimestamp("", NOW).source, "Now");
    assert.match(errorFrom(() => parseTimestamp("tuesday-ish", NOW)).message, /doesn't look like a date/);
});

test("relative time picks the biggest unit that fits", () => {
    assert.equal(relativeTime(NOW, NOW), "now");
    assert.equal(relativeTime(new Date("2026-10-18T12:00:00Z"), NOW), "3 days ago");
    assert.equal(relativeTime(new Date("2026-10-21T14:00:00Z"), NOW), "in 2 hours");
    assert.equal(relativeTime(new Date("2026-10-20T12:00:00Z"), NOW), "yesterday");
    assert.equal(relativeTime(new Date("2024-10-21T12:00:00Z"), NOW), "2 years ago");
});

// ---- Colours

test("colours parse from hex, rgb, hsl and names, and convert back", () => {
    assert.deepEqual(parseColor("#f80"), { r: 255, g: 136, b: 0, a: 1 });
    assert.deepEqual(parseColor("FF8800"), { r: 255, g: 136, b: 0, a: 1 });
    assert.deepEqual(parseColor("#ff880080"), { r: 255, g: 136, b: 0, a: 0.5 });
    assert.deepEqual(parseColor("rgb(255, 136, 0)"), { r: 255, g: 136, b: 0, a: 1 });
    assert.deepEqual(parseColor("rgb(255 136 0 / 50%)"), { r: 255, g: 136, b: 0, a: 0.5 });
    assert.deepEqual(parseColor("hsl(32 100% 50%)"), { r: 255, g: 136, b: 0, a: 1 });
    assert.deepEqual(parseColor("Orange"), { r: 255, g: 165, b: 0, a: 1 });

    const orange = parseColor("#ff8800");
    assert.equal(toHex(orange), "#ff8800");
    assert.equal(toHex({ ...orange, a: 0.5 }), "#ff880080");
    assert.equal(toRgbString(orange), "rgb(255, 136, 0)");
    assert.equal(toHslString(orange), "hsl(32, 100%, 50%)");
    assert.equal(toHslString(parseColor("#808080")), "hsl(0, 0%, 50%)");

    assert.match(errorFrom(() => parseColor("#ggg")).message, /Try #ff8800/);
    assert.match(errorFrom(() => parseColor("rgb(1, 2)")).message, /needs 3 values/);
});

test("contrast follows WCAG", () => {
    const black = parseColor("#000");
    const white = parseColor("#fff");
    assert.equal(contrastRatio(black, white), 21);
    assert.equal(contrastRatio(white, black), 21);
    assert.equal(contrastRatio(white, white), 1);
    assert.equal(Math.round(contrastRatio(parseColor("#767676"), white) * 100) / 100, 4.54);
    assert.equal(wcagLevel(21), "AAA");
    assert.equal(wcagLevel(4.54), "AA");
    assert.equal(wcagLevel(3.2), "AA large");
    assert.equal(wcagLevel(2), "Fail");
});

// ---- Text

test("words split from any naming style, and convert to each case", () => {
    assert.deepEqual(splitWords("userFirstName"), ["user", "First", "Name"]);
    assert.deepEqual(splitWords("XMLHttpRequest"), ["XML", "Http", "Request"]);
    assert.deepEqual(splitWords("user_first-name  åsa"), ["user", "first", "name", "åsa"]);

    const input = "user first_name";
    assert.equal(convertCase(input, "camel"), "userFirstName");
    assert.equal(convertCase(input, "pascal"), "UserFirstName");
    assert.equal(convertCase(input, "snake"), "user_first_name");
    assert.equal(convertCase(input, "constant"), "USER_FIRST_NAME");
    assert.equal(convertCase(input, "kebab"), "user-first-name");
    assert.equal(convertCase("the LORD of the rings", "title"), "The Lord Of The Rings");
    assert.equal(convertCase("HELLO there", "sentence"), "Hello there");
    // Line by line, keeping empty lines.
    assert.equal(convertCase("first name\n\nlast name", "camel"), "firstName\n\nlastName");
});

test("text stats count characters, words, lines and UTF-8 bytes", () => {
    assert.deepEqual(textStats(""), { characters: 0, charactersNoSpaces: 0, words: 0, lines: 0, bytes: 0 });
    // 17 ASCII bytes, 2 × "å" at 2 bytes and 👋 at 4; the line break counts as a space.
    assert.deepEqual(textStats("Hej på dig 👋\nrad två"), { characters: 20, charactersNoSpaces: 15, words: 5, lines: 2, bytes: 25 });
    assert.equal(textStats("don't stop-me").words, 2);
});

test("line operations", () => {
    const text = "item 10\nitem 2\n  b  \n\nitem 2";
    assert.equal(applyLineOperation(text, "sort"), "\n  b  \nitem 2\nitem 2\nitem 10");
    assert.equal(applyLineOperation("a\nC\nb", "sort-desc"), "C\nb\na");
    assert.equal(applyLineOperation(text, "unique"), "item 10\nitem 2\n  b  \n");
    assert.equal(applyLineOperation("1\n2\n3", "reverse"), "3\n2\n1");
    assert.equal(applyLineOperation(text, "trim"), "item 10\nitem 2\nb\n\nitem 2");
    assert.equal(applyLineOperation(text, "remove-empty"), "item 10\nitem 2\n  b  \nitem 2");
    // Seeded, so the order is fixed; a shuffle keeps every line.
    const shuffled = applyLineOperation("1\n2\n3\n4", "shuffle", () => 0);
    assert.equal(shuffled, "2\n3\n4\n1");
    assert.deepEqual(shuffled.split("\n").sort(), ["1", "2", "3", "4"]);
});

// ---- Generators

test("hashes match known values", async () => {
    assert.equal(await hashText("abc", "SHA-256"), "ba7816bf8f01cfea414140de5dae2223b00361a396177a9cb410ff61f20015ad");
    assert.equal(await hashText("abc", "SHA-1"), "a9993e364706816aba3e25717850c26c9cd0d89d");
    assert.equal((await hashText("", "SHA-512")).length, 128);
});

test("UUIDs from random bytes are valid version 4, and format as asked", () => {
    const uuid = uuidFromBytes(new Uint8Array(16).fill(0xff));
    assert.equal(uuid, "ffffffff-ffff-4fff-bfff-ffffffffffff");
    assert.match(uuidFromBytes(new Uint8Array(16)), /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/);
    assert.match(errorFrom(() => uuidFromBytes(new Uint8Array(4))).message, /16 bytes/);

    assert.equal(formatUuid(uuid, "upper"), "FFFFFFFF-FFFF-4FFF-BFFF-FFFFFFFFFFFF");
    assert.equal(formatUuid(uuid, "no-dashes"), "ffffffffffff4fffbfffffffffffffff");
    assert.equal(formatUuid(uuid, "braces"), "{ffffffff-ffff-4fff-bfff-ffffffffffff}");
    assert.equal(formatUuid(uuid, "lower"), uuid);
});
