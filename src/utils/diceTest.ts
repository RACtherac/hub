// =====================================
// Dice tester: is this physical die fair?
// =====================================
//
// You roll a real die and log each result; these helpers say how far the
// counts are from what a fair die would give. Pure functions, so they can be
// tested without React.

export const DIE_SIZES = [4, 6, 8, 10, 12, 20] as const;

export type DieSize = typeof DIE_SIZES[number];

export type DiceVerdict = "empty" | "need-more" | "fair" | "suspicious" | "biased";

export const VERDICT_LABELS: Record<DiceVerdict, string> = {
    "empty": "No rolls yet",
    "need-more": "Keep rolling",
    "fair": "Looks fair",
    "suspicious": "Suspicious",
    "biased": "Likely biased",
};

export interface FaceResult {
    face: number;
    count: number;
    // Share of all rolls, 0-1.
    share: number;
    // A 95% range for this face's true share, given the rolls so far.
    low: number;
    high: number;
    // Set when a fair die's share (1 / sides) is outside that range.
    flag: "high" | "low" | null;
}

export interface ThresholdResult {
    // "4+" means rolling this or higher.
    target: number;
    share: number;
    expected: number;
}

export interface DiceAnalysis {
    sides: number;
    total: number;
    // Rolls needed before the chi-square test means much: 5 per face.
    minRolls: number;
    average: number;
    expectedAverage: number;
    chiSquare: number;
    // Chance a fair die would look at least this uneven. Low means suspicious.
    pValue: number;
    verdict: DiceVerdict;
    faces: FaceResult[];
    thresholds: ThresholdResult[];
}

// ---------- Maths ----------

// ln(Γ(x)) by the Lanczos approximation.
function logGamma(x: number): number {
    const g = [
        76.180091729471, -86.505320329417, 24.014098240831,
        -1.231739572450155, 0.1208650973866179e-2, -0.5395239384953e-5,
    ];
    let y = x;
    const tmp = x + 5.5 - (x + 0.5) * Math.log(x + 5.5);
    let series = 1 + 1.90015e-10;
    for (const c of g) series += c / ++y;
    return -tmp + Math.log((Math.sqrt(2 * Math.PI) * series) / x);
}

// The regularised upper incomplete gamma function Q(a, x), by a series for
// small x and a continued fraction otherwise (Numerical Recipes, 6.2).
function upperGamma(a: number, x: number): number {
    if (x <= 0) return 1;
    const front = -x + a * Math.log(x) - logGamma(a);
    if (x < a + 1) {
        let term = 1 / a;
        let sum = term;
        for (let n = 1; n < 500; n++) {
            term *= x / (a + n);
            sum += term;
            if (Math.abs(term) < Math.abs(sum) * 1e-12) break;
        }
        return 1 - sum * Math.exp(front);
    }
    const tiny = 1e-300;
    let b = x + 1 - a;
    let c = 1 / tiny;
    let d = 1 / b;
    let h = d;
    for (let i = 1; i < 500; i++) {
        const an = -i * (i - a);
        b += 2;
        d = an * d + b;
        if (Math.abs(d) < tiny) d = tiny;
        c = b + an / c;
        if (Math.abs(c) < tiny) c = tiny;
        d = 1 / d;
        const step = d * c;
        h *= step;
        if (Math.abs(step - 1) < 1e-12) break;
    }
    return Math.exp(front) * h;
}

// Chance of a chi-square value at least this big with this many degrees of freedom.
export function chiSquarePValue(chiSquare: number, degreesOfFreedom: number): number {
    return Math.min(1, Math.max(0, upperGamma(degreesOfFreedom / 2, chiSquare / 2)));
}

export function chiSquare(counts: number[]): number {
    const total = counts.reduce((sum, c) => sum + c, 0);
    if (total === 0) return 0;
    const expected = total / counts.length;
    return counts.reduce((sum, observed) => sum + (observed - expected) ** 2 / expected, 0);
}

// Wilson score interval: a 95% range for a share, which behaves with few rolls.
export function wilsonInterval(successes: number, total: number, z = 1.96): { low: number; high: number } {
    if (total === 0) return { low: 0, high: 1 };
    const p = successes / total;
    const denominator = 1 + (z * z) / total;
    const centre = p + (z * z) / (2 * total);
    const spread = z * Math.sqrt((p * (1 - p)) / total + (z * z) / (4 * total * total));
    return { low: Math.max(0, (centre - spread) / denominator), high: Math.min(1, (centre + spread) / denominator) };
}

// ---------- Analysis ----------

export function analyzeRolls(counts: number[]): DiceAnalysis {
    const sides = counts.length;
    const total = counts.reduce((sum, c) => sum + c, 0);
    const fairShare = 1 / sides;
    const minRolls = 5 * sides;
    const value = chiSquare(counts);
    const pValue = total ? chiSquarePValue(value, sides - 1) : 1;

    const faces: FaceResult[] = counts.map((count, i) => {
        const { low, high } = wilsonInterval(count, total);
        const flag = total < minRolls ? null : fairShare < low ? "high" : fairShare > high ? "low" : null;
        return { face: i + 1, count, share: total ? count / total : 0, low, high, flag };
    });

    // 2+ up to the top face, the way Warhammer rolls are read.
    const thresholds: ThresholdResult[] = [];
    for (let target = 2; target <= sides; target++) {
        const hits = counts.slice(target - 1).reduce((sum, c) => sum + c, 0);
        thresholds.push({ target, share: total ? hits / total : 0, expected: (sides - target + 1) / sides });
    }

    let verdict: DiceVerdict = "fair";
    if (total === 0) verdict = "empty";
    else if (total < minRolls) verdict = "need-more";
    else if (pValue < 0.01) verdict = "biased";
    else if (pValue < 0.05) verdict = "suspicious";

    return {
        sides,
        total,
        minRolls,
        average: total ? counts.reduce((sum, c, i) => sum + c * (i + 1), 0) / total : 0,
        expectedAverage: (sides + 1) / 2,
        chiSquare: value,
        pValue,
        verdict,
        faces,
        thresholds,
    };
}

export const emptyCounts = (sides: number) => Array<number>(sides).fill(0);
