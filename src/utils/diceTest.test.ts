/// <reference types="node" />

import { test } from "node:test";
import assert from "node:assert/strict";

import { analyzeRolls, chiSquare, chiSquarePValue, emptyCounts, wilsonInterval } from "./diceTest";

const close = (actual: number, expected: number, tolerance = 0.001) =>
    assert.ok(Math.abs(actual - expected) < tolerance, `${actual} is not close to ${expected}`);

test("chi-square p-values match the standard tables", () => {
    close(chiSquarePValue(3.841, 1), 0.05);
    close(chiSquarePValue(11.07, 5), 0.05);
    close(chiSquarePValue(15.086, 5), 0.01);
    close(chiSquarePValue(30.144, 19), 0.05);
    close(chiSquarePValue(0, 5), 1);
    close(chiSquarePValue(2, 5), 0.8491);
});

test("a perfectly even die looks fair, whatever its size", () => {
    for (const sides of [4, 6, 20]) {
        const result = analyzeRolls(Array(sides).fill(10));
        assert.equal(result.chiSquare, 0);
        assert.equal(result.pValue, 1);
        assert.equal(result.verdict, "fair");
        assert.equal(result.average, (sides + 1) / 2);
        assert.ok(result.faces.every((f) => f.flag === null));
    }
});

test("a die that loves sixes is caught, and the six is flagged", () => {
    const result = analyzeRolls([15, 15, 15, 15, 15, 45]);
    assert.equal(chiSquare([15, 15, 15, 15, 15, 45]), 37.5);
    assert.equal(result.verdict, "biased");
    assert.equal(result.faces[5].flag, "high");
    assert.ok(result.average > result.expectedAverage);
    // 6+ comes up 37.5% of the time against 16.7% for a fair die.
    const six = result.thresholds.find((t) => t.target === 6)!;
    close(six.share, 0.375);
    close(six.expected, 1 / 6);
});

test("a slightly uneven die over many rolls is only suspicious", () => {
    // chi-square 12 with 5 degrees of freedom: p ≈ 0.035.
    const result = analyzeRolls([28, 32, 40, 40, 44, 56]);
    assert.equal(result.chiSquare, 12);
    assert.ok(result.pValue < 0.05 && result.pValue >= 0.01, `p was ${result.pValue}`);
    assert.equal(result.verdict, "suspicious");
});

test("too few rolls asks for more instead of judging", () => {
    assert.equal(analyzeRolls(emptyCounts(6)).verdict, "empty");
    const few = analyzeRolls([0, 0, 0, 0, 0, 10]);
    assert.equal(few.minRolls, 30);
    assert.equal(few.verdict, "need-more");
    assert.ok(few.faces.every((f) => f.flag === null));
});

test("wilson intervals stay inside 0-1 and narrow with more rolls", () => {
    const small = wilsonInterval(1, 6);
    const large = wilsonInterval(100, 600);
    assert.ok(small.low >= 0 && small.high <= 1);
    assert.ok(large.high - large.low < small.high - small.low);
    assert.deepEqual(wilsonInterval(0, 0), { low: 0, high: 1 });
});
