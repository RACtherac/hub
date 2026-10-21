import { test } from "node:test";
import assert from "node:assert/strict";

import {
    ConvertError,
    DEFAULT_OPTIONS,
    EXAMPLES,
    convert,
    detectDelimiter,
    detectFormat,
    formatJson,
    jsonFileName,
    parseCsv,
    parseCsvRows,
    parseJsObject,
    parseJson,
    parseKeyValue,
    typedValue,
} from "./jsonConverter";

// Runs fn, expects a ConvertError, and returns it.
function errorFrom(fn: () => unknown): ConvertError {
    try {
        fn();
    }
    catch (error) {
        assert.ok(error instanceof ConvertError, `expected a ConvertError, got ${error}`);
        return error;
    }
    assert.fail("expected an error");
}

test("strict JSON parses like JSON.parse", () => {
    const text = '{"a": [1, -2.5, 3e2, true, false, null], "b": {"c": "x\\n\\u00e9\\"y"}, "": 0}';
    assert.deepEqual(parseJson(text), JSON.parse(text));
    assert.equal(parseJson("  42  "), 42);
    assert.deepEqual(parseJson("[]"), []);
});

test("JSON errors point at the line and column", () => {
    const missingComma = errorFrom(() => parseJson('{\n  "a": 1\n  "b": 2\n}'));
    assert.equal(missingComma.line, 3);
    assert.equal(missingComma.column, 3);
    assert.equal(missingComma.message, `Expected "," or "}" in the object, found '"'`);

    const unclosed = errorFrom(() => parseJson('[1, 2'));
    assert.match(unclosed.message, /never closed with \]/);
    assert.equal(unclosed.column, 1);

    assert.match(errorFrom(() => parseJson('{"a": 1,}')).message, /Trailing commas/);
    assert.match(errorFrom(() => parseJson("{a: 1}")).message, /double quotes/);
    assert.match(errorFrom(() => parseJson("{'a': 1}")).message, /Expected a key|double quotes/);
    assert.match(errorFrom(() => parseJson("// hi\n{}")).message, /Comments/);
    assert.match(errorFrom(() => parseJson('{"a": 1} x')).message, /after the end/);
    assert.match(errorFrom(() => parseJson("01")).message, /after the end|in a number/);
    assert.match(errorFrom(() => parseJson("tru")).message, /expected a value/);
});

test("relaxed JS objects allow comments, bare keys, single quotes and trailing commas", () => {
    const value = parseJsObject(`const npc = {
        // a comment
        name: 'Ulf', /* block */ "race": "Dwarf",
        hp: +30, hex: 0x1F, nothing: undefined,
        tags: ['a', 'b',],
    };`);
    assert.deepEqual(value, { name: "Ulf", race: "Dwarf", hp: 30, hex: 31, nothing: null, tags: ["a", "b"] });
    assert.deepEqual(parseJsObject("export default [1, 2,]"), [1, 2]);
    // Comments before the declaration, a type annotation, and code after the ";".
    assert.deepEqual(parseJsObject("// npc\nconst npc = { name: 'Ulf', hp: 30, tags: ['barkeep',], };"), { name: "Ulf", hp: 30, tags: ["barkeep"] });
    assert.deepEqual(parseJsObject("/* config */\nexport const config: Config = { a: 1 }; // end"), { a: 1 });
    // Errors still point at the text as typed, past the blanked-out prefix.
    const bad = errorFrom(() => parseJsObject("// x\nconst a = { b: }"));
    assert.equal(bad.line, 2);
    assert.equal(bad.column, 16);
    assert.match(errorFrom(() => parseJsObject("{ a: Infinity }")).message, /Infinity or NaN/);
});

test("values in CSV and key = value become numbers, booleans and null only when they clearly are", () => {
    assert.equal(typedValue("42", true), 42);
    assert.equal(typedValue("-3.5", true), -3.5);
    assert.equal(typedValue("true", true), true);
    assert.equal(typedValue("null", true), null);
    // Leading zeros (zip codes, phone numbers) stay text.
    assert.equal(typedValue("007", true), "007");
    assert.equal(typedValue("12345678901234567890", true), "12345678901234567890");
    assert.equal(typedValue("42", false), "42");
    assert.equal(typedValue("hello", true), "hello");
});

test("CSV rows follow RFC 4180 quoting", () => {
    assert.deepEqual(parseCsvRows('a,"b, c","say ""hi"""\r\n1,"two\nlines",3\n\n', ","), [
        ["a", "b, c", 'say "hi"'],
        ["1", "two\nlines", "3"],
    ]);
    const unclosed = errorFrom(() => parseCsvRows('a,b\n1,"oops', ","));
    assert.equal(unclosed.line, 2);
    assert.equal(unclosed.column, 3);
});

test("CSV with a header row becomes objects; ragged rows and blank headers keep every cell", () => {
    assert.deepEqual(parseCsv(EXAMPLES.csv, DEFAULT_OPTIONS), [
        { name: "Ulf", race: "Dwarf", hp: 30, alive: true },
        { name: "Vex", race: "Tiefling", hp: 40, alive: true },
        { name: "Merrin, the Abbot", race: "Human", hp: 12, alive: false },
    ]);
    assert.deepEqual(parseCsv("a,,a\n1,2,3,4\n5", DEFAULT_OPTIONS), [
        { a: 1, column2: 2, a_2: 3, column4: 4 },
        { a: 5, column2: "", a_2: "" },
    ]);
    assert.deepEqual(parseCsv("1;2\n3;4", { ...DEFAULT_OPTIONS, headerRow: false }), [[1, 2], [3, 4]]);
});

test("the CSV delimiter is the one that splits the first line most", () => {
    assert.equal(detectDelimiter("a,b,c"), ",");
    assert.equal(detectDelimiter("a;b;c\n1;2;3"), ";");
    assert.equal(detectDelimiter("a\tb\tc"), "\t");
    assert.equal(detectDelimiter('"x;y",b,c'), ",");
});

test("key = value files nest sections and dotted keys", () => {
    assert.deepEqual(parseKeyValue(EXAMPLES.keyvalue, true), {
        APP_NAME: "Hub",
        PORT: 5173,
        DEBUG: false,
        database: { host: "localhost", port: 5432, user: { name: "admin" } },
    });
    assert.deepEqual(parseKeyValue('export A="1"\nB: two # comment\nC=\'#not a comment\'', true), { A: "1", B: "two", C: "#not a comment" });

    const bad = errorFrom(() => parseKeyValue("A=1\n  oops", true));
    assert.equal(bad.line, 2);
    assert.equal(bad.column, 3);
    assert.match(errorFrom(() => parseKeyValue("a=1\na.b=2", true)).message, /already has a value/);
    assert.match(errorFrom(() => parseKeyValue("# only a comment", true)).message, /No key = value/);
});

test("auto-detect picks the right format for each example", () => {
    assert.equal(detectFormat(EXAMPLES.json), "json");
    assert.equal(detectFormat(EXAMPLES.js), "js");
    assert.equal(detectFormat("{a: 1}"), "js");
    assert.equal(detectFormat("// one\n/* two */\n// three\nconst x = { a: 1 }"), "js");
    assert.equal(detectFormat(EXAMPLES.csv), "csv");
    assert.equal(detectFormat("name\tage\nUlf\t30"), "csv");
    assert.equal(detectFormat(EXAMPLES.keyvalue), "keyvalue");
    assert.equal(detectFormat("host: localhost\nport: 5432"), "keyvalue");
});

test("convert reports what it did, and an empty input is an error", () => {
    const csv = convert(EXAMPLES.csv, DEFAULT_OPTIONS);
    assert.equal(csv.format, "csv");
    assert.equal(csv.summary, "3 rows, 4 columns");
    assert.equal(convert(EXAMPLES.json, DEFAULT_OPTIONS).summary, "Object with 5 keys");
    assert.equal(convert("[1]", DEFAULT_OPTIONS).summary, "Array of 1 item");
    // A forced format is used even when auto would pick another.
    assert.equal(convert("a=1", { ...DEFAULT_OPTIONS, format: "csv" }).format, "csv");
    assert.match(errorFrom(() => convert("   ", DEFAULT_OPTIONS)).message, /empty/);
});

test("output indent and key sorting", () => {
    const value = { b: 1, a: { d: [1], c: 2 } };
    assert.equal(formatJson(value, "min"), '{"b":1,"a":{"d":[1],"c":2}}');
    assert.equal(formatJson(value, "min", true), '{"a":{"c":2,"d":[1]},"b":1}');
    assert.equal(formatJson({ a: 1 }, "2"), '{\n  "a": 1\n}');
    assert.equal(formatJson({ a: 1 }, "4"), '{\n    "a": 1\n}');
    assert.equal(formatJson({ a: 1 }, "tab"), '{\n\t"a": 1\n}');
});

test("download file names are safe and end in .json", () => {
    assert.equal(jsonFileName("my data"), "my-data.json");
    assert.equal(jsonFileName("export.JSON"), "export.json");
    assert.equal(jsonFileName('a/b:c*?"<>|'), "abc.json");
    assert.equal(jsonFileName("  "), "converted.json");
});
