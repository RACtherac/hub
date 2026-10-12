import type { ReactNode } from "react";

/** Small building blocks shared by the full game sheets (Wrath & Glory, Dragonbane, Call of Cthulhu). */

export function TextField({ label, value, onChange, placeholder, list }: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  list?: { id: string; options: string[] };
}) {
  return (
    <label className="rpg-field">
      <span>{label}</span>
      <input value={value} placeholder={placeholder} list={list?.id} onChange={(e) => onChange(e.target.value)} />
      {list && (
        <datalist id={list.id}>
          {list.options.map((option) => <option key={option} value={option} />)}
        </datalist>
      )}
    </label>
  );
}

export function SelectField({ label, value, options, onChange }: {
  label: string;
  value: string;
  options: string[];
  onChange: (value: string) => void;
}) {
  return (
    <label className="rpg-field">
      <span>{label}</span>
      <select value={value} onChange={(e) => onChange(e.target.value)}>
        {!options.includes(value) && <option value={value}>{value || "—"}</option>}
        {options.map((option) => <option key={option} value={option}>{option}</option>)}
      </select>
    </label>
  );
}

/** An editable number box, optionally showing the maximum it counts down from. */
export function Counter({ label, value, onChange, max, title }: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  max?: number;
  title?: string;
}) {
  return (
    <label className="rpg-score-box" title={title}>
      <span>{label}</span>
      <input inputMode="numeric" value={value} onChange={(e) => onChange(e.target.value)} />
      {max !== undefined && <small>of {max}</small>}
    </label>
  );
}

/** A read-only value worked out from other fields; `title` explains the formula. */
export function Derived({ label, value, title }: { label: string; value: ReactNode; title: string }) {
  return (
    <div className="rpg-score-box rpg-score-box--derived" title={title}>
      <span>{label}</span>
      <strong>{value}</strong>
    </div>
  );
}

export function TextBlock({ label, value, onChange, placeholder = "One per line" }: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}) {
  return (
    <div className="rpg-core-box">
      <p className="rpg-panel-label">// {label}</p>
      <textarea className="rpg-dw-textarea" value={value} placeholder={placeholder} onChange={(e) => onChange(e.target.value)} />
    </div>
  );
}

export function Toggle({ label, checked, onChange, title }: {
  label: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
  title?: string;
}) {
  return (
    <label className={`rpg-toggle ${checked ? "rpg-toggle--on" : ""}`} title={title}>
      <input type="checkbox" checked={checked} onChange={(e) => onChange(e.target.checked)} />
      <span>{label}</span>
    </label>
  );
}

/** A row of tick boxes, e.g. death rolls. `value` is how many are ticked. */
export function TickTrack({ label, count, value, onChange }: {
  label: string;
  count: number;
  value: number;
  onChange: (value: number) => void;
}) {
  return (
    <div className="rpg-tick-track">
      <span>{label}</span>
      <div>
        {Array.from({ length: count }, (_, index) => (
          <button
            key={index}
            type="button"
            className={`rpg-tick ${index < value ? "rpg-tick--on" : ""}`}
            onClick={() => onChange(index < value ? index : index + 1)}
            aria-label={`${label} ${index + 1}`}
            aria-pressed={index < value}
          />
        ))}
      </div>
    </div>
  );
}

type Row = { id: string } & Record<string, string>;

/** An editable table of weapons (or anything else with the same columns). */
export function RowTable<T extends Row>({ label, columns, rows, onChange, blankRow }: {
  label: string;
  columns: { key: Exclude<keyof T, "id"> & string; label: string; width: string }[];
  rows: T[];
  onChange: (rows: T[]) => void;
  blankRow: () => T;
}) {
  const gridTemplateColumns = `${columns.map((column) => column.width).join(" ")} auto`;
  return (
    <div className="rpg-core-box">
      <div className="rpg-section-header">
        <p className="rpg-panel-label">// {label}</p>
        <button className="rpg-inline-btn" onClick={() => onChange([...rows, blankRow()])}>+ Add</button>
      </div>
      <div className="rpg-dw-weapons">
        <div className="rpg-row-table rpg-dw-weapon-head" style={{ gridTemplateColumns }}>
          {columns.map((column) => <span key={column.key}>{column.label}</span>)}
          <span />
        </div>
        {rows.map((row) => (
          <div key={row.id} className="rpg-row-table" style={{ gridTemplateColumns }}>
            {columns.map((column) => (
              <input
                key={column.key}
                value={row[column.key]}
                onChange={(e) => onChange(rows.map((item) => (item.id === row.id ? { ...item, [column.key]: e.target.value } : item)))}
                aria-label={`${row.name || label} ${column.label}`}
              />
            ))}
            <button className="rpg-remove-btn" onClick={() => onChange(rows.filter((item) => item.id !== row.id))}>Remove</button>
          </div>
        ))}
      </div>
    </div>
  );
}
