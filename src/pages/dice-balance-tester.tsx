import { useState } from "react";
import { useNavigate } from "react-router-dom";

import "../components/styles/dice-balance-tester.css";

import DiceInput from "../components/Dice-balance-tester/DiceInput";
import DistributionChart from "../components/Dice-balance-tester/DistributionChart";
import StatsPanel from "../components/Dice-balance-tester/StatsPanel";
import BalanceVerdict from "../components/Dice-balance-tester/BalanceVerdict";

import { analyzeDice } from "../utils/diceAnalysis";

export default function DiceBalanceTester() {
  const navigate = useNavigate();

  const [counts, setCounts] = useState([
    0, 0, 0, 0, 0, 0,
  ]);

  const result = analyzeDice(counts);

  function resetTest() {
    setCounts([0, 0, 0, 0, 0, 0]);
  }

  return (
    <div className="dbt-page">
      <div className="rl-topbar">
        <button
          className="rl-topbar-back"
          onClick={() => navigate("/")}
        >
          ← OH<span>/</span>Hub
        </button>

        <span className="rl-topbar-title">
          Dice Balance Tester
        </span>
      </div>

      <section className="dbt-hero">
        <div className="dbt-eyebrow">
          Statistical Analysis
        </div>

        <h1 className="dbt-title">
          Dice <em>Balance</em> Tester
        </h1>

        <p className="dbt-subtitle">
          Record dice rolls manually or enter
          totals directly to evaluate fairness.
        </p>
      </section>

      <section className="dbt-content">
        <div className="dbt-section-header">
          <h2>Roll Entry</h2>

          <button
            className="dbt-reset-btn"
            onClick={resetTest}
          >
            Reset Test
          </button>
        </div>

        <DiceInput
          counts={counts}
          onChange={(index, value) => {
            setCounts(prev => {
              const next = [...prev];
              next[index] = value;
              return next;
            });
          }}
          onIncrement={face => {
            setCounts(prev => {
              const next = [...prev];
              next[face - 1]++;
              return next;
            });
          }}
        />

        <StatsPanel result={result} />

        <BalanceVerdict
          rating={result.rating}
          confidence={result.confidence}
        />

        <div className="dbt-chart-section">
          <div className="dbt-chart-header">
            Distribution
          </div>

          <DistributionChart counts={counts} />
        </div>

        <div className="dbt-explanation">
          <div className="dbt-explanation-title">
            What do the results mean?
          </div>

          <ul>
            <li>
              <strong>Fairness Score</strong>{" "}
              combines distribution,
              chi-square analysis and
              bootstrap simulation.
            </li>

            <li>
              <strong>Chi-Square</strong>{" "}
              measures how far the
              results are from a
              perfectly balanced die.
            </li>

            <li>
              <strong>Bootstrap</strong>{" "}
              creates thousands of
              resampled datasets from
              your submitted rolls and
              estimates confidence
              intervals for the
              fairness measurements.
            </li>

            <li>
              Higher roll counts produce
              more reliable results.
            </li>

            <li>
              For best results, collect
              at least 100–300 rolls
              before evaluating a die.
            </li>
          </ul>
        </div>
      </section>
    </div>
  );
}