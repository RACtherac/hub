import type { AnalysisResult } from "../../types/dice";

interface Props {
  result: AnalysisResult;
}

export default function StatsPanel({
  result,
}: Props) {
  return (
    <div className="dbt-stats-grid">
      <div className="dbt-stat">
        <span>ROLLS</span>
        <strong>
          {result.totalRolls}
        </strong>
      </div>

      <div className="dbt-stat">
        <span>FAIRNESS</span>
        <strong>
          {result.fairnessScore}/100
        </strong>
      </div>

      <div className="dbt-stat">
        <span>CHI-SQUARE</span>
        <strong>
          {result.chiSquare}
        </strong>
      </div>

      <div className="dbt-stat">
        <span>BOOTSTRAP</span>
        <strong>
          {
            result.bootstrapPValue
          }
          %
        </strong>
      </div>
    </div>
  );
}