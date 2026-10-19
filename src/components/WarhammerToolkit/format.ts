export const percent = (value: number) =>
    value > 0 && value < 0.001 ? "<0.1%" : `${(value * 100).toFixed(value < 0.01 ? 1 : 0)}%`;

export const decimal = (value: number) => value.toFixed(value >= 100 ? 0 : 2);
