import { useState } from "react";

import { NO_DEATH_SAVES, deathSaveState, rollD20, rollDeathSave, type DeathSaves } from "../../utils/dmScreen";

interface DeathSaveTrackerProps {
    target: { hp: number; deathSaves: DeathSaves };
    onChange: (fields: { hp: number; deathSaves: DeathSaves }) => void;
}

const STATE_LABELS = {
    rolling: "Dying",
    stable: "Stable",
    dead: "Dead",
};

// Three success and three failure boxes for someone at 0 HP. Click a box to
// set the count, or roll a d20 for the next save.
export default function DeathSaveTracker({ target, onChange }: DeathSaveTrackerProps) {
    const [lastRoll, setLastRoll] = useState<number | null>(null);
    const saves = target.deathSaves;
    const state = deathSaveState(saves);

    const setCount = (key: keyof DeathSaves, index: number) => {
        // Clicking the last filled box empties it, so a misclick is easy to undo.
        const count = saves[key] === index + 1 ? index : index + 1;
        onChange({ hp: target.hp, deathSaves: { ...saves, [key]: count } });
    };

    const roll = () => {
        const value = rollD20();
        setLastRoll(value);
        onChange(rollDeathSave(target, value));
    };

    const row = (key: keyof DeathSaves, label: string) => (
        <div className={`dms-death-save-row dms-death-save-row--${key === "successes" ? "success" : "failure"}`} role="group" aria-label={label}>
            <span>{label}</span>
            {[0, 1, 2].map((i) => (
                <button
                    key={i}
                    type="button"
                    className={i < saves[key] ? "dms-death-save-box filled" : "dms-death-save-box"}
                    aria-label={`${label} ${i + 1}`}
                    aria-pressed={i < saves[key]}
                    onClick={() => setCount(key, i)}
                />
            ))}
        </div>
    );

    return (
        <div className={state === "stable" ? "dms-death-saves dms-death-saves--stable" : "dms-death-saves"}>
            <span className="dms-death-saves-title">💀 Death saves · {STATE_LABELS[state]}</span>
            {row("successes", "Successes")}
            {row("failures", "Failures")}
            {state === "rolling" ? (
                <button type="button" className="dms-button dms-button--ghost" onClick={roll}>Roll d20</button>
            ) : (
                <button type="button" className="dms-link-button" onClick={() => onChange({ hp: target.hp, deathSaves: NO_DEATH_SAVES })}>
                    Clear
                </button>
            )}
            {lastRoll !== null && (
                <span role="status">
                    Rolled {lastRoll}
                    {lastRoll >= 20 ? ": back up with 1 HP!" : lastRoll <= 1 ? ": two failures" : lastRoll >= 10 ? ": success" : ": failure"}
                </span>
            )}
        </div>
    );
}
