import { useEffect, useState, type Dispatch, type FormEvent, type SetStateAction } from "react";

import { toInt } from "../../utils/makeId";
import {
    MINUTES_PER_DAY,
    advanceTime,
    clampDate,
    createEvent,
    dayNumber,
    eventsOn,
    formatDate,
    formatTime,
    goToDate,
    moonPhase,
    rerollWeather,
    sameDate,
    setMonths,
    timeOfDay,
    upcomingEvents,
    weatherOn,
    weekday,
    type Calendar,
    type CalendarDate,
    type CalendarEvent,
} from "../../utils/dmCalendar";
import { activeBoard, createNode, eventCards, removeEvent, updateActiveBoard, type DmScreenData } from "../../utils/dmScreen";
import ConfirmButton from "./ConfirmButton";

interface CalendarViewProps {
    data: DmScreenData;
    setData: Dispatch<SetStateAction<DmScreenData>>;
    // A day to open on, e.g. from a time card, instead of today.
    focusDate: CalendarDate | null;
    onFocused: () => void;
    onShowCard: (boardId: string, nodeId: string) => void;
}

const STEPS = [
    { label: "−1 h", minutes: -60 },
    { label: "+10 min", minutes: 10 },
    { label: "+1 h", minutes: 60 },
    { label: "+8 h", minutes: 8 * 60 },
    { label: "+1 day", minutes: MINUTES_PER_DAY },
    { label: "+1 week", minutes: 7 * MINUTES_PER_DAY },
];

export default function CalendarView({ data, setData, focusDate, onFocused, onShowCard }: CalendarViewProps) {
    const calendar = data.calendar;
    const today = calendar.today;
    const start = focusDate ?? today;
    // The month shown in the grid, and the day picked in it.
    const [view, setView] = useState({ year: start.year, month: start.month });
    const [selected, setSelected] = useState<CalendarDate>(start);

    useEffect(() => {
        if (focusDate) onFocused();
    }, [focusDate, onFocused]);
    const [eventTitle, setEventTitle] = useState("");
    const [settingsOpen, setSettingsOpen] = useState(false);

    const update = (change: (current: Calendar) => Calendar) =>
        setData((current) => ({ ...current, calendar: change(current.calendar) }));
    const updateEvent = (id: string, fields: Partial<CalendarEvent>) =>
        update((c) => ({ ...c, events: c.events.map((e) => (e.id === id ? { ...e, ...fields } : e)) }));

    const moon = moonPhase(calendar, today);
    const weather = weatherOn(calendar, today);
    const selectedWeather = weatherOn(calendar, selected);
    const viewMonth = Math.min(view.month, calendar.months.length - 1);
    const month = calendar.months[viewMonth];
    const firstDay = { year: view.year, month: viewMonth, day: 1 };
    const n = calendar.weekdays.length;
    // Blank cells before day 1, so days line up under their weekday.
    const lead = n ? ((dayNumber(calendar, firstDay) % n) + n) % n : 0;

    const shiftView = (by: number) => {
        const total = view.year * calendar.months.length + view.month + by;
        setView({ year: Math.floor(total / calendar.months.length), month: ((total % calendar.months.length) + calendar.months.length) % calendar.months.length });
    };
    const goToToday = (date: CalendarDate = calendar.today) => {
        setView({ year: date.year, month: date.month });
        setSelected(date);
    };
    const move = (minutes: number) => {
        const next = advanceTime(calendar, minutes);
        update(() => next);
        goToToday(next.today);
    };

    const addEvent = (e: FormEvent) => {
        e.preventDefault();
        const title = eventTitle.trim();
        if (!title) return;
        update((c) => ({ ...c, events: [...c.events, createEvent(selected, { title })] }));
        setEventTitle("");
    };

    const selectedEvents = eventsOn(calendar, selected);
    const upcoming = upcomingEvents(calendar);

    return (
        <div className="dms-calendar">
            {/* ---------------- Now ---------------- */}
            <section className="dms-panel dms-calendar-now">
                <div className="dms-calendar-today">
                    <span className="dms-round-label">Today</span>
                    <strong className="dms-calendar-date">{formatDate(calendar, today)}</strong>
                    <span className="dms-calendar-meta">
                        {weekday(calendar, today)}
                        {moon && <> · <span title={moon.label}>{moon.icon} {moon.label}</span></>}
                    </span>
                </div>
                {weather && (
                    <div className="dms-calendar-weather">
                        <span className="dms-round-label">Weather</span>
                        <strong className="dms-calendar-weather-value">{weather.icon} {weather.label}</strong>
                        <button type="button" className="dms-link-button" onClick={() => update((c) => rerollWeather(c, c.today))}>
                            🎲 Reroll
                        </button>
                    </div>
                )}
                <div className="dms-calendar-clock">
                    <span className="dms-round-label">Time</span>
                    <strong className="dms-calendar-time">{formatTime(calendar.minutes)}</strong>
                    <span className="dms-calendar-meta">{timeOfDay(calendar.minutes)}</span>
                </div>
                <div className="dms-calendar-steps" role="group" aria-label="Move time">
                    {STEPS.map((step) => (
                        <button key={step.label} type="button" className="dms-button dms-button--ghost" onClick={() => move(step.minutes)}>
                            {step.label}
                        </button>
                    ))}
                </div>
                <div className="dms-calendar-set">
                    <label className="dms-field dms-small">
                        <span>Hour</span>
                        <input
                            inputMode="numeric"
                            value={Math.floor(calendar.minutes / 60)}
                            onChange={(e) => update((c) => ({ ...c, minutes: Math.min(23, Math.max(0, toInt(e.target.value))) * 60 + (c.minutes % 60) }))}
                        />
                    </label>
                    <label className="dms-field dms-small">
                        <span>Min</span>
                        <input
                            inputMode="numeric"
                            value={calendar.minutes % 60}
                            onChange={(e) => update((c) => ({ ...c, minutes: Math.floor(c.minutes / 60) * 60 + Math.min(59, Math.max(0, toInt(e.target.value))) }))}
                        />
                    </label>
                    <button
                        type="button"
                        className="dms-link-button"
                        disabled={sameDate(selected, today)}
                        onClick={() => update((c) => goToDate(c, selected))}
                    >
                        Make {formatDate(calendar, selected)} today
                    </button>
                </div>
            </section>

            <div className="dms-calendar-body">
                {/* ---------------- Month grid ---------------- */}
                <section className="dms-panel dms-calendar-month">
                    <div className="dms-calendar-month-header">
                        <button type="button" className="dms-icon-button" aria-label="Previous month" onClick={() => shiftView(-1)}>‹</button>
                        <h2 className="dms-panel-title">{month.name} {view.year}{calendar.era && ` ${calendar.era}`}</h2>
                        <button type="button" className="dms-icon-button" aria-label="Next month" onClick={() => shiftView(1)}>›</button>
                        <button type="button" className="dms-link-button" onClick={() => goToToday()}>Today</button>
                    </div>
                    <div className="dms-calendar-grid" style={{ gridTemplateColumns: `repeat(${Math.max(1, n)}, minmax(0, 1fr))` }}>
                        {calendar.weekdays.map((d) => <span key={d} className="dms-calendar-weekday" title={d}>{d.slice(0, 3)}</span>)}
                        {Array.from({ length: lead }, (_, i) => <span key={`lead-${i}`} />)}
                        {Array.from({ length: month.days }, (_, i) => {
                            const date = { year: view.year, month: viewMonth, day: i + 1 };
                            const events = eventsOn(calendar, date);
                            const classes = [
                                "dms-calendar-day",
                                sameDate(date, today) ? "today" : "",
                                sameDate(date, selected) ? "selected" : "",
                            ].filter(Boolean).join(" ");
                            return (
                                <button
                                    key={i}
                                    type="button"
                                    className={classes}
                                    aria-pressed={sameDate(date, selected)}
                                    aria-label={`${formatDate(calendar, date)}${events.length ? `, ${events.length} event${events.length > 1 ? "s" : ""}` : ""}`}
                                    onClick={() => setSelected(date)}
                                >
                                    <span>{i + 1}</span>
                                    {calendar.weather && (
                                        <span className="dms-calendar-day-weather" aria-hidden="true">{weatherOn(calendar, date)?.icon}</span>
                                    )}
                                    {events.length > 0 && <span className="dms-calendar-dot" title={events.map((e) => e.title).join(", ")}>●</span>}
                                </button>
                            );
                        })}
                    </div>
                </section>

                {/* ---------------- Selected day & upcoming ---------------- */}
                <aside className="dms-panel dms-calendar-side">
                    <h2 className="dms-panel-title">{formatDate(calendar, selected)}</h2>
                    <p className="dms-inspector-help">
                        {weekday(calendar, selected)}
                        {(() => {
                            const diff = dayNumber(calendar, selected) - dayNumber(calendar, today);
                            return diff === 0 ? " · today" : diff > 0 ? ` · in ${diff} day${diff > 1 ? "s" : ""}` : ` · ${-diff} day${diff < -1 ? "s" : ""} ago`;
                        })()}
                        {selectedWeather && (
                            <>
                                {" · "}{selectedWeather.icon} {selectedWeather.label}{" "}
                                <button type="button" className="dms-link-button" onClick={() => update((c) => rerollWeather(c, selected))}>🎲</button>
                            </>
                        )}
                    </p>

                    {selectedEvents.length > 0 && (
                        <ul className="dms-calendar-events">
                            {selectedEvents.map((event) => (
                                <li key={event.id}>
                                    <label className="dms-field">
                                        <span>Event</span>
                                        <input value={event.title} onChange={(e) => updateEvent(event.id, { title: e.target.value })} />
                                    </label>
                                    <label className="dms-field">
                                        <span>Notes</span>
                                        <textarea
                                            rows={3}
                                            value={event.notes}
                                            placeholder="Who is there, what happens, what the party might hear about it…"
                                            onChange={(e) => updateEvent(event.id, { notes: e.target.value })}
                                        />
                                    </label>
                                    <div className="dms-calendar-event-actions">
                                        {eventCards(data, event.id).map(({ board, node }) => (
                                            <button key={node.id} type="button" className="dms-link-button" onClick={() => onShowCard(board.id, node.id)}>
                                                {board.name || "Board"} →
                                            </button>
                                        ))}
                                        <button
                                            type="button"
                                            className="dms-link-button"
                                            onClick={() => {
                                                const board = activeBoard(data);
                                                const offset = (board.nodes.length % 5) * 24;
                                                const node = { ...createNode("time", 40 + offset, 40 + offset), title: event.title, eventId: event.id };
                                                setData((current) => updateActiveBoard(current, (b) => ({ ...b, nodes: [...b.nodes, node] })));
                                                onShowCard(board.id, node.id);
                                            }}
                                        >
                                            + Story board
                                        </button>
                                        <ConfirmButton label="Remove" confirmLabel="Sure?" onConfirm={() => setData((current) => removeEvent(current, event.id))} />
                                    </div>
                                </li>
                            ))}
                        </ul>
                    )}
                    <form className="dms-calendar-add" onSubmit={addEvent}>
                        <label className="dms-field">
                            <span>New event on this day</span>
                            <input value={eventTitle} placeholder="e.g. Harvest festival" onChange={(e) => setEventTitle(e.target.value)} />
                        </label>
                        <button type="submit" className="dms-button" disabled={!eventTitle.trim()}>+ Event</button>
                    </form>

                    <div className="dms-inspector-section">
                        <span className="dms-subtitle">Coming up</span>
                        {upcoming.length === 0 ? (
                            <p className="dms-inspector-help">Nothing planned. Pick a day and add an event.</p>
                        ) : (
                            <ul className="dms-connection-list">
                                {upcoming.map(({ event, inDays }) => (
                                    <li key={event.id}>
                                        <button type="button" className="dms-link-button" onClick={() => goToToday(event)}>
                                            {event.title || "Untitled"} · {inDays === 0 ? "today" : inDays === 1 ? "tomorrow" : `in ${inDays} days`}
                                        </button>
                                    </li>
                                ))}
                            </ul>
                        )}
                    </div>
                </aside>
            </div>

            {/* ---------------- Settings ---------------- */}
            <section className="dms-panel">
                <button type="button" className="dms-link-button" aria-expanded={settingsOpen} onClick={() => setSettingsOpen((o) => !o)}>
                    {settingsOpen ? "▾" : "▸"} Calendar settings: months, weekdays, era and moon
                </button>
                {settingsOpen && <CalendarSettings calendar={calendar} update={update} />}
            </section>
        </div>
    );
}

interface CalendarSettingsProps {
    calendar: Calendar;
    update: (change: (current: Calendar) => Calendar) => void;
}

function CalendarSettings({ calendar, update }: CalendarSettingsProps) {
    // Edited as text, so typing commas and spaces isn't fought.
    const [weekdays, setWeekdays] = useState(calendar.weekdays.join(", "));
    const changeMonths = (months: Calendar["months"]) => update((c) => setMonths(c, months));

    return (
        <div className="dms-calendar-settings">
            <div className="dms-npc-row dms-npc-stats">
                <label className="dms-field">
                    <span>Year</span>
                    <input
                        inputMode="numeric"
                        value={calendar.today.year}
                        onChange={(e) => update((c) => ({ ...c, today: clampDate(c, { ...c.today, year: toInt(e.target.value) }) }))}
                    />
                </label>
                <label className="dms-field">
                    <span>Era (after the year)</span>
                    <input value={calendar.era} placeholder="e.g. DR" onChange={(e) => update((c) => ({ ...c, era: e.target.value }))} />
                </label>
                <label className="dms-field">
                    <span>Moon cycle (days, 0 = none)</span>
                    <input inputMode="numeric" value={calendar.moonCycle} onChange={(e) => update((c) => ({ ...c, moonCycle: Math.max(0, toInt(e.target.value)) }))} />
                </label>
            </div>
            <label className="dms-check-field">
                <input type="checkbox" checked={calendar.weather} onChange={(e) => update((c) => ({ ...c, weather: e.target.checked }))} />
                <span>Generate weather for each day (by season: the first and last months are winter)</span>
            </label>

            <label className="dms-field">
                <span>Weekdays, separated by commas</span>
                <input
                    value={weekdays}
                    onChange={(e) => {
                        setWeekdays(e.target.value);
                        update((c) => ({ ...c, weekdays: e.target.value.split(",").map((d) => d.trim()).filter(Boolean) }));
                    }}
                />
            </label>

            <div className="dms-field">
                <span>Months</span>
                <ol className="dms-calendar-month-list">
                    {calendar.months.map((m, i) => (
                        <li key={i}>
                            <input
                                aria-label={`Month ${i + 1} name`}
                                value={m.name}
                                onChange={(e) => changeMonths(calendar.months.map((x, j) => (j === i ? { ...x, name: e.target.value } : x)))}
                            />
                            <input
                                aria-label={`Days in ${m.name}`}
                                inputMode="numeric"
                                value={m.days}
                                onChange={(e) => changeMonths(calendar.months.map((x, j) => (j === i ? { ...x, days: Math.min(999, Math.max(1, toInt(e.target.value, 1))) } : x)))}
                            />
                            <span className="dms-inspector-help">days</span>
                            <button
                                type="button"
                                className="dms-icon-button"
                                aria-label={`Remove ${m.name}`}
                                disabled={calendar.months.length <= 1}
                                onClick={() => changeMonths(calendar.months.filter((_, j) => j !== i))}
                            >
                                ×
                            </button>
                        </li>
                    ))}
                </ol>
                <button
                    type="button"
                    className="dms-link-button"
                    onClick={() => changeMonths([...calendar.months, { name: `Month ${calendar.months.length + 1}`, days: 30 }])}
                >
                    + Month
                </button>
            </div>
        </div>
    );
}
