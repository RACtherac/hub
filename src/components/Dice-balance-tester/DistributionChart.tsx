interface Props {
  counts: number[];
}

export default function DistributionChart({
  counts,
}: Props) {
  const total = counts.reduce(
    (a, b) => a + b,
    0
  );

  return (
    <div className="dbt-distribution">
      {counts.map(
        (count, index) => {
          const percent = total
            ? (count / total) * 100
            : 0;

          return (
            <div
              key={index}
              className="dbt-dist-row"
            >
              <span>
                Face {index + 1}
              </span>

              <div className="dbt-bar-wrap">
                <div
                  className="dbt-bar"
                  style={{
                    width: `${percent}%`,
                  }}
                />
              </div>

              <span>
                {percent.toFixed(1)}
                %
              </span>
            </div>
          );
        }
      )}
    </div>
  );
}