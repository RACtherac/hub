import { test } from "node:test";
import assert from "node:assert/strict";

import {
    backspacePair,
    indentSelection,
    languageLabel,
    lineCount,
    newlineWithIndent,
    typeCloser,
    typeOpener,
} from "./codeEditing";

// Shows a result as text with [ and ] where the selection is, for readable asserts.
const show = ({ value, selectionStart, selectionEnd }: { value: string; selectionStart: number; selectionEnd: number }) =>
    value.slice(0, selectionStart) + "[" + value.slice(selectionStart, selectionEnd) + "]" + value.slice(selectionEnd);

test("Tab with no selection inserts an indent at the cursor", () => {
    assert.equal(show(indentSelection("ab", 1, 1, false)), "a  []b");
});

test("Tab with a selection indents every line it touches", () => {
    const value = "one\ntwo\nthree";
    // From the middle of "one" to the middle of "two".
    assert.equal(show(indentSelection(value, 1, 6, false)), "  o[ne\n  tw]o\nthree");
    // A selection ending at the start of a line leaves that line alone.
    assert.equal(show(indentSelection(value, 0, 4, false)), "  [one\n]two\nthree");
});

test("Shift+Tab removes up to one indent from each touched line", () => {
    assert.equal(show(indentSelection("    a\n b\nc", 4, 8, true)), "  [a\nb]\nc");
    assert.equal(show(indentSelection("\tx", 1, 1, true)), "[]x");
    // Nothing to remove: unchanged.
    assert.equal(show(indentSelection("abc", 1, 1, true)), "a[]bc");
    // The cursor doesn't move before the start of its line.
    assert.equal(show(indentSelection("  abc", 1, 1, true)), "[]abc");
    // A selection ending inside the next line's indent ends at that line's start.
    assert.equal(show(indentSelection("  a\n  b", 2, 5, true)), "[a\n]b");
});

test("Enter keeps the indentation and adds one after an opening bracket", () => {
    assert.equal(show(newlineWithIndent("    return x", 12, 12)), "    return x\n    []");
    assert.equal(show(newlineWithIndent("if (a) {", 8, 8)), "if (a) {\n  []");
    assert.equal(show(newlineWithIndent("def f():", 8, 8)), "def f():\n  []");
    // Replaces a selection.
    assert.equal(show(newlineWithIndent("ab", 0, 2)), "\n[]");
});

test("an opening bracket adds its closer, with the cursor in between", () => {
    assert.equal(show(typeOpener("", 0, 0, "{")!), "{[]}");
    assert.equal(show(typeOpener("f", 1, 1, "(")!), "f([])");
    assert.equal(show(typeOpener("x = ", 4, 4, "[")!), "x = [[]]");
    // Before a space, a closer, ";" or "," it still pairs.
    assert.equal(show(typeOpener("a b", 1, 1, "(")!), "a([]) b");
    assert.equal(show(typeOpener("f()", 2, 2, "[")!), "f([[]])");
    assert.equal(show(typeOpener("x;", 1, 1, "(")!), "x([]);");
    // Right in front of a word it doesn't, so the browser types just "(".
    assert.equal(typeOpener("word", 0, 0, "("), null);
    assert.equal(typeOpener("a", 0, 0, "<"), null);
});

test("an opening bracket wraps a selection", () => {
    assert.equal(show(typeOpener("x = a + b;", 4, 9, "(")!), "x = ([a + b]);");
    assert.equal(show(typeOpener("item", 0, 4, "[")!), "[[item]]");
});

test("a closing bracket steps over the same closer instead of doubling it", () => {
    assert.equal(show(typeCloser("f()", 2, 2, ")")!), "f()[]");
    assert.equal(typeCloser("f()", 2, 2, "]"), null);
    assert.equal(typeCloser("f(", 2, 2, ")"), null);
    assert.equal(typeCloser("f()", 1, 3, ")"), null);
});

test("backspace between an empty pair deletes both halves", () => {
    assert.equal(show(backspacePair("f()", 2, 2)!), "f[]");
    assert.equal(show(backspacePair("[{}]", 2, 2)!), "[[]]");
    assert.equal(backspacePair("f(x)", 3, 3), null);
    assert.equal(backspacePair("()", 0, 0), null);
    assert.equal(backspacePair("(]", 1, 1), null);
});

test("Enter between a pair puts the closer on its own line", () => {
    assert.equal(show(newlineWithIndent("if (a) {}", 8, 8)), "if (a) {\n  []\n}");
    assert.equal(show(newlineWithIndent("  call([])", 8, 8)), "  call([\n    []\n  ])");
    // Not between a pair (and not right after an opener): just a newline.
    assert.equal(show(newlineWithIndent("{ x }", 3, 3)), "{ x\n[] }");
});

test("line count and language labels", () => {
    assert.equal(lineCount(""), 1);
    assert.equal(lineCount("a\nb\n"), 3);
    assert.equal(languageLabel("csharp"), "C#");
    assert.equal(languageLabel(undefined), "Plain text");
    assert.equal(languageLabel("klingon"), "Plain text");
});
