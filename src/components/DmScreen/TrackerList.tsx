import { toInt } from "../../utils/makeId";
import { TRACKER_RESETS, createTracker, stepTracker, type Tracker, type TrackerReset } from "../../utils/dmScreen";

interface TrackerListProps {
    trackers: Tracker[];
    onChange: (trackers: Tracker[]) => void;
}

// Quick picks for common counters; anything else is a blank one to name.
const PRESETS: { name: string; max: number | null; resets: TrackerReset }[] = [
    { name: "Inspiration", max: 1, resets: "none" },
    { name: "Spell slots", max: 4, resets: "long" },
    { name: "Hit dice", max: 1, resets: "long" },
    { name: "Ammo", max: null, resets: "none" },
];

// Named counters, each with − and +, an optional max and a short note.
export default function TrackerList({ trackers, onChange }: TrackerListProps) {
    const update = (id: string, change: (current: Tracker) => Tracker) =>
        onChange(trackers.map((t) => (t.id === id ? change(t) : t)));
    const unused = PRESETS.filter((p) => !trackers.some((t) => t.name.toLowerCase() === p.name.toLowerCase()));

    return (
        <div className="dms-trackers">
            {trackers.length > 0 && (
                <ul className="dms-tracker-list">
                    {trackers.map((tracker) => (
                        <li key={tracker.id} className="dms-tracker-row">
                            <label className="dms-field dms-tracker-name">
                                <span>Name</span>
                                <input
                                    value={tracker.name}
                                    placeholder="e.g. Rage"
                                    onChange={(e) => update(tracker.id, (t) => ({ ...t, name: e.target.value }))}
                                />
                            </label>
                            <div className="dms-tracker-stepper" role="group" aria-label={`${tracker.name || "Tracker"} count`}>
                                <button
                                    type="button"
                                    aria-label={`One less ${tracker.name}`}
                                    disabled={tracker.value <= 0}
                                    onClick={() => update(tracker.id, (t) => stepTracker(t, -1))}
                                >
                                    −
                                </button>
                                <input
                                    aria-label={`${tracker.name || "Tracker"} value`}
                                    inputMode="numeric"
                                    value={tracker.value}
                                    onChange={(e) => update(tracker.id, (t) => stepTracker({ ...t, value: 0 }, toInt(e.target.value)))}
                                />
                                <button
                                    type="button"
                                    aria-label={`One more ${tracker.name}`}
                                    disabled={tracker.max !== null && tracker.value >= tracker.max}
                                    onClick={() => update(tracker.id, (t) => stepTracker(t, 1))}
                                >
                                    +
                                </button>
                            </div>
                            <label className="dms-field dms-tracker-max">
                                <span>Max</span>
                                <input
                                    inputMode="numeric"
                                    value={tracker.max ?? ""}
                                    placeholder="—"
                                    onChange={(e) => {
                                        const max = e.target.value.trim() === "" ? null : Math.max(0, toInt(e.target.value));
                                        update(tracker.id, (t) => stepTracker({ ...t, max }, 0));
                                    }}
                                />
                            </label>
                            <label className="dms-field dms-tracker-resets">
                                <span>Refills on</span>
                                <select
                                    value={tracker.resets}
                                    disabled={tracker.max === null}
                                    title={tracker.max === null ? "Give it a max to refill it on a rest" : undefined}
                                    onChange={(e) => update(tracker.id, (t) => ({ ...t, resets: e.target.value as TrackerReset }))}
                                >
                                    {TRACKER_RESETS.map((r) => <option key={r.value} value={r.value}>{r.label}</option>)}
                                </select>
                            </label>
                            <label className="dms-field dms-tracker-notes">
                                <span>Notes</span>
                                <input
                                    value={tracker.notes}
                                    placeholder="e.g. resets on long rest"
                                    onChange={(e) => update(tracker.id, (t) => ({ ...t, notes: e.target.value }))}
                                />
                            </label>
                            <button
                                type="button"
                                className="dms-icon-button dms-tracker-remove"
                                aria-label={`Remove ${tracker.name || "tracker"}`}
                                title="Remove"
                                onClick={() => onChange(trackers.filter((t) => t.id !== tracker.id))}
                            >
                                ×
                            </button>
                        </li>
                    ))}
                </ul>
            )}
            <div className="dms-attack-add">
                <button type="button" className="dms-link-button" onClick={() => onChange([...trackers, createTracker()])}>
                    + Tracker
                </button>
                {unused.map((preset) => (
                    <button
                        key={preset.name}
                        type="button"
                        className="dms-link-button"
                        onClick={() => onChange([...trackers, createTracker({ name: preset.name, max: preset.max, resets: preset.resets, value: preset.max ?? 0 })])}
                    >
                        + {preset.name}
                    </button>
                ))}
            </div>
        </div>
    );
}
