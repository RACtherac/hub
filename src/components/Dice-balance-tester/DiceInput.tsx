interface Props {
  counts: number[];
  onChange: (
    index: number,
    value: number
  ) => void;
  onIncrement: (
    face: number
  ) => void;
}

export default function DiceInput({
  counts,
  onChange,
  onIncrement,
}: Props) {
  return (
    <>
      <div className="dbt-input-grid">
        {counts.map(
          (count, index) => (
            <div
              key={index}
              className="dbt-input-card"
            >
              <label className="dbt-input-label">
                Face {index + 1}
              </label>

              <input
                type="number"
                min="0"
                value={count}
                className="dbt-input"
                onChange={e =>
                  onChange(
                    index,
                    Number(
                      e.target.value
                    ) || 0
                  )
                }
              />
            </div>
          )
        )}
      </div>

      <div className="dbt-roll-grid">
        {[1, 2, 3, 4, 5, 6].map(
          face => (
            <button
              key={face}
              className="dbt-roll-btn"
              onClick={() =>
                onIncrement(face)
              }
            >
              +{face}
            </button>
          )
        )}
      </div>
    </>
  );
}