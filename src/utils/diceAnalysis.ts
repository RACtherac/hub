export function calculateChiSquare(
  counts: number[]
): number {
  const total = counts.reduce(
    (sum, count) => sum + count,
    0
  );

  const expected = total / 6;

  return counts.reduce(
    (sum, observed) =>
      sum +
      ((observed - expected) ** 2) /
        expected,
    0
  );
}

export function bootstrapChiSquare(
  counts: number[],
  iterations = 10000
) {
  const rolls: number[] = [];

  counts.forEach((count, face) => {
    for (let i = 0; i < count; i++) {
      rolls.push(face + 1);
    }
  });

  const results: number[] = [];

  for (let i = 0; i < iterations; i++) {
    const sample: number[] = [];

    for (let j = 0; j < rolls.length; j++) {
      sample.push(
        rolls[
          Math.floor(
            Math.random() *
              rolls.length
          )
        ]
      );
    }

    const sampleCounts =
      Array(6).fill(0);

    sample.forEach(face => {
      sampleCounts[face - 1]++;
    });

    results.push(
      calculateChiSquare(
        sampleCounts
      )
    );
  }

  results.sort((a, b) => a - b);

  return {
    lower95:
      results[
        Math.floor(
          iterations * 0.025
        )
      ],
    median:
      results[
        Math.floor(
          iterations * 0.5
        )
      ],
    upper95:
      results[
        Math.floor(
          iterations * 0.975
        )
      ],
  };
}

export function monteCarloFairnessTest(
  rolls: number,
  iterations = 10000
) {
  const simulated: number[] = [];

  for (let i = 0; i < iterations; i++) {
    const counts =
      Array(6).fill(0);

    for (let j = 0; j < rolls; j++) {
      const face =
        Math.floor(
          Math.random() * 6
        );

      counts[face]++;
    }

    simulated.push(
      calculateChiSquare(
        counts
      )
    );
  }

  simulated.sort(
    (a, b) => a - b
  );

  return simulated;
}

export function analyzeDice(
  counts: number[],
  iterations = 10000
) {
  const totalRolls = counts.reduce(
    (sum, count) => sum + count,
    0
  );

  if (totalRolls === 0) {
    return {
      totalRolls: 0,
      fairnessScore: 0,
      chiSquare: 0,
      bootstrapPValue: 0,
      rating: "No Data",
      confidence: "0%",
    };
  }

  const chiSquare =
    calculateChiSquare(counts);

  const simulated =
    monteCarloFairnessTest(
      totalRolls,
      iterations
    );

  const pValue =
    simulated.filter(
      value => value >= chiSquare
    ).length / iterations;

  const fairnessScore = Math.round(
    pValue * 100
  );

  let rating = "Poor";

  if (fairnessScore >= 90) {
    rating = "Excellent";
  } else if (fairnessScore >= 75) {
    rating = "Good";
  } else if (fairnessScore >= 50) {
    rating = "Questionable";
  }

  return {
    totalRolls,
    fairnessScore,
    chiSquare: Number(
      chiSquare.toFixed(2)
    ),
    bootstrapPValue: Number(
      (pValue * 100).toFixed(1)
    ),
    rating,
    confidence: `${(
      pValue * 100
    ).toFixed(1)}%`,
  };
}