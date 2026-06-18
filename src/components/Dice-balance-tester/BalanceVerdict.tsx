interface Props {
  rating: string;
  confidence: string;
}

export default function BalanceVerdict({
  rating,
  confidence,
}: Props) {
  return (
    <div className="dbt-verdict">
      <div
        className={`dbt-rating dbt-rating--${rating
          .toLowerCase()
          .replace(/\s/g, "-")}`}
      >
        {rating}
      </div>

      <p>
        Confidence: {confidence}
      </p>
    </div>
  );
}