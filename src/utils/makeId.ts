export function makeId() {
  return `${Date.now()}-${Math.random().toString(16).slice(2, 8)}`;
}

/** Parses a sheet input into a whole number, treating blanks and junk as `fallback`. */
export function toInt(value: string | number | undefined, fallback = 0) {
  const parsed = typeof value === "number" ? value : Number.parseInt(value ?? "", 10);
  return Number.isFinite(parsed) ? Math.trunc(parsed) : fallback;
}
