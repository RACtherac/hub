import type { Dispatch, SetStateAction } from "react";

import { formatDuration as duration, formatTime } from "../../utils/dmCalendar";
import { toInt } from "../../utils/makeId";
import { DEFAULT_SETTINGS, type DmScreenData, type DmSettings, type RestKind } from "../../utils/dmScreen";

interface SettingsViewProps {
    data: DmScreenData;
    setData: Dispatch<SetStateAction<DmScreenData>>;
}

const RESTS: { kind: RestKind; key: keyof DmSettings; label: string; help: string }[] = [
    { kind: "short", key: "shortRestMinutes", label: "☕ Short rest", help: "Refills trackers set to refill on a short rest." },
    { kind: "long", key: "longRestMinutes", label: "🌙 Long rest", help: "Restores HP, clears death saves and refills short- and long-rest trackers." },
];

export default function SettingsView({ data, setData }: SettingsViewProps) {
    const settings = data.settings;
    const set = (fields: Partial<DmSettings>) => setData((current) => ({ ...current, settings: { ...current.settings, ...fields } }));
    // Hours and minutes edited separately, stored as one number of minutes.
    const setPart = (key: keyof DmSettings, hours: number, minutes: number) =>
        set({ [key]: Math.min(7 * 24 * 60, Math.max(0, hours) * 60 + Math.min(59, Math.max(0, minutes))) });

    return (
        <div className="dms-settings">
            <section className="dms-panel">
                <h2 className="dms-panel-title">Rests</h2>
                <p className="dms-inspector-help">
                    How long each rest takes at your table. The party rest buttons in the Players tab move the calendar on by this much
                    (it's {formatTime(data.calendar.minutes)} there now).
                </p>
                <div className="dms-settings-rests">
                    {RESTS.map(({ key, label, help }) => {
                        const value = settings[key];
                        return (
                            <div key={key} className="dms-settings-rest">
                                <span className="dms-subtitle">{label}</span>
                                <div className="dms-settings-duration">
                                    <label className="dms-field dms-small">
                                        <span>Hours</span>
                                        <input inputMode="numeric" value={Math.floor(value / 60)} onChange={(e) => setPart(key, toInt(e.target.value), value % 60)} />
                                    </label>
                                    <label className="dms-field dms-small">
                                        <span>Minutes</span>
                                        <input inputMode="numeric" value={value % 60} onChange={(e) => setPart(key, Math.floor(value / 60), toInt(e.target.value))} />
                                    </label>
                                    <span className="dms-settings-total">= {duration(value)}</span>
                                </div>
                                <p className="dms-inspector-help">{help}</p>
                                {value !== DEFAULT_SETTINGS[key] && (
                                    <button type="button" className="dms-link-button" onClick={() => set({ [key]: DEFAULT_SETTINGS[key] })}>
                                        Reset to {duration(DEFAULT_SETTINGS[key])}
                                    </button>
                                )}
                            </div>
                        );
                    })}
                </div>
            </section>
        </div>
    );
}
