import { makeId } from "./makeId";

// =====================================
// DM Screen: in-game calendar and clock
// =====================================
//
// Any calendar: the DM names the months (each with its own length) and the
// weekdays. Dates are turned into a day count from year 0 for maths, so
// moving time, weekdays, moon phases and "in 3 days" all work the same way.

export interface CalendarMonth {
    name: string;
    days: number;
}

export interface CalendarDate {
    year: number;
    // 0-based index into months.
    month: number;
    // 1-based day of the month.
    day: number;
}

export interface CalendarEvent extends CalendarDate {
    id: string;
    title: string;
    notes: string;
}

export interface Calendar {
    months: CalendarMonth[];
    weekdays: string[];
    // Shown after the year, e.g. "DR" or "AC".
    era: string;
    // Today in the game.
    today: CalendarDate;
    // Minutes since midnight.
    minutes: number;
    // Days from one new moon to the next, or 0 for no moon.
    moonCycle: number;
    events: CalendarEvent[];
    // Events whose day time has moved onto or past since the DM last
    // dismissed the alert, oldest first.
    passed: string[];
    // Show generated weather for each day.
    weather: boolean;
    // Rerolls per day (keyed by day number), so a day's weather is stable
    // until the DM rerolls it.
    weatherRolls: Record<string, number>;
}

export const MINUTES_PER_DAY = 24 * 60;

export function createCalendar(): Calendar {
    return {
        months: [
            "Deepwinter", "Thaw", "Seedtime", "Rainmonth", "Blossom", "Highsun",
            "Midsummer", "Harvest", "Leaffall", "Mistmonth", "Frost", "Longnight",
        ].map((name) => ({ name, days: 30 })),
        weekdays: ["Moonday", "Tideday", "Windsday", "Thunderday", "Fireday", "Starday", "Sunday"],
        era: "",
        today: { year: 1, month: 0, day: 1 },
        minutes: 8 * 60,
        moonCycle: 28,
        events: [],
        passed: [],
        weather: true,
        weatherRolls: {},
    };
}

export function createEvent(date: CalendarDate, fields: Partial<CalendarEvent> = {}): CalendarEvent {
    return { id: makeId(), title: "New event", notes: "", ...date, ...fields };
}

export const daysInYear = (calendar: Calendar) => calendar.months.reduce((sum, m) => sum + m.days, 0);

// Days since day 1 of month 0, year 0. Negative before that.
export function dayNumber(calendar: Calendar, date: CalendarDate): number {
    const before = calendar.months.slice(0, date.month).reduce((sum, m) => sum + m.days, 0);
    return date.year * daysInYear(calendar) + before + date.day - 1;
}

export function dateFromDayNumber(calendar: Calendar, value: number): CalendarDate {
    const length = daysInYear(calendar);
    const year = Math.floor(value / length);
    let rest = value - year * length;
    for (let month = 0; month < calendar.months.length; month++) {
        if (rest < calendar.months[month].days) return { year, month, day: rest + 1 };
        rest -= calendar.months[month].days;
    }
    return { year, month: calendar.months.length - 1, day: calendar.months[calendar.months.length - 1].days };
}

export const sameDate = (a: CalendarDate, b: CalendarDate) => a.year === b.year && a.month === b.month && a.day === b.day;

// Moves the clock by any number of minutes, forwards or back, rolling over
// days, months and years. Events on the days moved onto are added to
// `passed`; moving back drops the ones that are in the future again.
export function advanceTime(calendar: Calendar, minutes: number): Calendar {
    const total = calendar.minutes + Math.trunc(minutes);
    const days = Math.floor(total / MINUTES_PER_DAY);
    const from = dayNumber(calendar, calendar.today);
    const to = from + days;
    const reached = calendar.events
        .filter((e) => {
            const day = dayNumber(calendar, e);
            return day > from && day <= to;
        })
        .sort((a, b) => dayNumber(calendar, a) - dayNumber(calendar, b))
        .map((e) => e.id);
    const kept = calendar.passed.filter((id) => {
        const event = calendar.events.find((e) => e.id === id);
        return event && dayNumber(calendar, event) <= to;
    });
    return {
        ...calendar,
        minutes: total - days * MINUTES_PER_DAY,
        today: dateFromDayNumber(calendar, to),
        passed: [...kept, ...reached.filter((id) => !kept.includes(id))],
    };
}

// Jumps to a day at the same time of day, as if the days had passed.
export const goToDate = (calendar: Calendar, date: CalendarDate) =>
    advanceTime(calendar, (dayNumber(calendar, date) - dayNumber(calendar, calendar.today)) * MINUTES_PER_DAY);

export const passedEvents = (calendar: Calendar) =>
    calendar.passed.map((id) => calendar.events.find((e) => e.id === id)).filter((e): e is CalendarEvent => !!e);

// ---------- Weather ----------

export type Season = "winter" | "spring" | "summer" | "autumn";

// The year is split into four seasons by month, starting in midwinter, so the
// default calendar's first and last months are the coldest.
export function seasonOf(calendar: Calendar, month: number): Season {
    const position = ((month + 0.5) / calendar.months.length + 1 / 12) % 1;
    return (["winter", "spring", "summer", "autumn"] as const)[Math.floor(position * 4)];
}

export interface Weather {
    icon: string;
    label: string;
}

// Each season's weather and how likely it is.
const WEATHER: Record<Season, [Weather, number][]> = {
    winter: [
        [{ icon: "☀️", label: "Cold and clear" }, 3], [{ icon: "☁️", label: "Overcast" }, 3], [{ icon: "🌨️", label: "Snow" }, 3],
        [{ icon: "❄️", label: "Blizzard" }, 1], [{ icon: "🌫️", label: "Freezing fog" }, 2], [{ icon: "🌬️", label: "Bitter wind" }, 2],
        [{ icon: "🌧️", label: "Sleet" }, 1],
    ],
    spring: [
        [{ icon: "☀️", label: "Clear" }, 3], [{ icon: "⛅", label: "Cloudy" }, 3], [{ icon: "🌧️", label: "Rain" }, 4],
        [{ icon: "⛈️", label: "Thunderstorm" }, 1], [{ icon: "🌫️", label: "Morning fog" }, 2], [{ icon: "🌬️", label: "Windy" }, 2],
    ],
    summer: [
        [{ icon: "☀️", label: "Clear" }, 6], [{ icon: "🥵", label: "Hot" }, 3], [{ icon: "⛅", label: "Cloudy" }, 2],
        [{ icon: "⛈️", label: "Thunderstorm" }, 2], [{ icon: "🌦️", label: "Showers" }, 1], [{ icon: "🔥", label: "Heatwave" }, 1],
    ],
    autumn: [
        [{ icon: "☀️", label: "Crisp and clear" }, 3], [{ icon: "☁️", label: "Overcast" }, 3], [{ icon: "🌧️", label: "Rain" }, 3],
        [{ icon: "🌫️", label: "Fog" }, 3], [{ icon: "🍂", label: "Windy" }, 3], [{ icon: "⛈️", label: "Storm" }, 1],
    ],
};

// A number from 0 to 1 that's always the same for the same input.
function hash(value: number): number {
    let h = Math.imul(value ^ 0x9e3779b9, 0x85ebca6b);
    h = Math.imul(h ^ (h >>> 13), 0xc2b2ae35);
    return ((h ^ (h >>> 16)) >>> 0) / 4294967296;
}

// The day's weather: the same every time it's asked, until it's rerolled.
export function weatherOn(calendar: Calendar, date: CalendarDate): Weather | null {
    if (!calendar.weather) return null;
    const day = dayNumber(calendar, date);
    const rolls = calendar.weatherRolls[String(day)] ?? 0;
    const table = WEATHER[seasonOf(calendar, date.month)];
    const total = table.reduce((sum, [, weight]) => sum + weight, 0);
    let pick = hash(day * 7919 + rolls * 104729) * total;
    for (const [weather, weight] of table) {
        pick -= weight;
        if (pick < 0) return weather;
    }
    return table[table.length - 1][0];
}

export function rerollWeather(calendar: Calendar, date: CalendarDate): Calendar {
    const key = String(dayNumber(calendar, date));
    return { ...calendar, weatherRolls: { ...calendar.weatherRolls, [key]: (calendar.weatherRolls[key] ?? 0) + 1 } };
}

// ---------- Travel ----------

export interface TravelMode {
    id: string;
    label: string;
    milesPerHour: number;
    // Hours of travel a day; the rest is camp, rest and sleep.
    hoursPerDay: number;
}

export const TRAVEL_MODES: TravelMode[] = [
    { id: "walk", label: "Walking", milesPerHour: 3, hoursPerDay: 8 },
    { id: "walk-slow", label: "Walking, carefully", milesPerHour: 2, hoursPerDay: 8 },
    { id: "walk-fast", label: "Walking, fast", milesPerHour: 4, hoursPerDay: 8 },
    { id: "mounted", label: "Mounted", milesPerHour: 4, hoursPerDay: 8 },
    { id: "wagon", label: "Wagon or cart", milesPerHour: 2, hoursPerDay: 8 },
    { id: "boat", label: "Rowboat", milesPerHour: 1.5, hoursPerDay: 8 },
    { id: "ship", label: "Sailing ship (day and night)", milesPerHour: 2, hoursPerDay: 24 },
    { id: "flying", label: "Flying mount", milesPerHour: 8, hoursPerDay: 8 },
];

export const KM_PER_MILE = 1.609344;

// How long a journey takes on the calendar: full travel days count as 24
// hours each, and the last part of the trip as just the hours on the road.
export function travelMinutes(miles: number, mode: TravelMode): number {
    if (miles <= 0) return 0;
    const perDay = mode.milesPerHour * mode.hoursPerDay;
    const days = Math.floor(miles / perDay + 1e-9);
    const leftover = miles - days * perDay;
    return days * MINUTES_PER_DAY + Math.round((leftover / mode.milesPerHour) * 60);
}

export function weekday(calendar: Calendar, date: CalendarDate): string {
    if (calendar.weekdays.length === 0) return "";
    const n = calendar.weekdays.length;
    return calendar.weekdays[((dayNumber(calendar, date) % n) + n) % n];
}

export const MOON_PHASES = [
    { icon: "🌑", label: "New moon" },
    { icon: "🌒", label: "Waxing crescent" },
    { icon: "🌓", label: "First quarter" },
    { icon: "🌔", label: "Waxing gibbous" },
    { icon: "🌕", label: "Full moon" },
    { icon: "🌖", label: "Waning gibbous" },
    { icon: "🌗", label: "Last quarter" },
    { icon: "🌘", label: "Waning crescent" },
];

export function moonPhase(calendar: Calendar, date: CalendarDate): typeof MOON_PHASES[number] | null {
    if (calendar.moonCycle <= 0) return null;
    const cycle = calendar.moonCycle;
    const position = (((dayNumber(calendar, date) % cycle) + cycle) % cycle) / cycle;
    return MOON_PHASES[Math.round(position * 8) % 8];
}

export function timeOfDay(minutes: number): string {
    const hour = Math.floor(minutes / 60);
    if (hour < 5) return "Night";
    if (hour < 7) return "Dawn";
    if (hour < 12) return "Morning";
    if (hour < 14) return "Midday";
    if (hour < 18) return "Afternoon";
    if (hour < 21) return "Evening";
    return "Night";
}

export const formatTime = (minutes: number) =>
    `${String(Math.floor(minutes / 60)).padStart(2, "0")}:${String(minutes % 60).padStart(2, "0")}`;

// "2 d 4 h", "1 h 30 min", "45 min".
export function formatDuration(minutes: number): string {
    const days = Math.floor(minutes / MINUTES_PER_DAY);
    const hours = Math.floor((minutes % MINUTES_PER_DAY) / 60);
    const rest = minutes % 60;
    const parts = [days && `${days} d`, hours && `${hours} h`, rest && `${rest} min`].filter(Boolean);
    return parts.length ? parts.join(" ") : "0 min";
}

export function formatDate(calendar: Calendar, date: CalendarDate): string {
    const month = calendar.months[date.month]?.name ?? "";
    return `${date.day} ${month}, ${date.year}${calendar.era ? ` ${calendar.era}` : ""}`;
}

// Events from today on, soonest first, with how many days away they are.
export function upcomingEvents(calendar: Calendar, limit = 8): { event: CalendarEvent; inDays: number }[] {
    const today = dayNumber(calendar, calendar.today);
    return calendar.events
        .map((event) => ({ event, inDays: dayNumber(calendar, event) - today }))
        .filter(({ inDays }) => inDays >= 0)
        .sort((a, b) => a.inDays - b.inDays || a.event.title.localeCompare(b.event.title))
        .slice(0, limit);
}

export const eventsOn = (calendar: Calendar, date: CalendarDate) => calendar.events.filter((e) => sameDate(e, date));

// Keeps a date inside the calendar after months are renamed, shortened or removed.
export function clampDate(calendar: Calendar, date: CalendarDate): CalendarDate {
    const month = Math.min(Math.max(0, date.month), calendar.months.length - 1);
    const day = Math.min(Math.max(1, date.day), calendar.months[month].days);
    return { year: date.year, month, day };
}

// Changing the months keeps today and every event on a valid day.
export function setMonths(calendar: Calendar, months: CalendarMonth[]): Calendar {
    if (months.length === 0) return calendar;
    const next = { ...calendar, months };
    return {
        ...next,
        today: clampDate(next, calendar.today),
        events: calendar.events.map((e) => ({ ...e, ...clampDate(next, e) })),
    };
}

// ---------- Loading ----------

const isObject = (value: unknown): value is Record<string, unknown> =>
    typeof value === "object" && value !== null && !Array.isArray(value);
const str = (value: unknown, fallback = "") => (typeof value === "string" ? value : fallback);
const int = (value: unknown, fallback = 0) =>
    typeof value === "number" && Number.isFinite(value) ? Math.trunc(value) : fallback;

function normalizeDate(value: unknown, calendar: Calendar): CalendarDate {
    const source = isObject(value) ? value : {};
    return clampDate(calendar, { year: int(source.year, 1), month: int(source.month), day: int(source.day, 1) });
}

// Saves from before the calendar get the default one.
export function normalizeCalendar(value: unknown): Calendar {
    const fallback = createCalendar();
    if (!isObject(value)) return fallback;
    const months = Array.isArray(value.months)
        ? value.months.filter(isObject).map((m) => ({ name: str(m.name, "Month"), days: Math.min(999, Math.max(1, int(m.days, 30))) }))
        : [];
    const calendar: Calendar = {
        months: months.length ? months : fallback.months,
        weekdays: Array.isArray(value.weekdays) ? value.weekdays.filter((d): d is string => typeof d === "string") : fallback.weekdays,
        era: str(value.era),
        today: fallback.today,
        minutes: Math.min(MINUTES_PER_DAY - 1, Math.max(0, int(value.minutes, fallback.minutes))),
        moonCycle: Math.max(0, int(value.moonCycle, fallback.moonCycle)),
        events: [],
        passed: [],
        weather: value.weather !== false,
        weatherRolls: isObject(value.weatherRolls)
            ? Object.fromEntries(Object.entries(value.weatherRolls).filter((entry): entry is [string, number] => typeof entry[1] === "number" && entry[1] > 0))
            : {},
    };
    calendar.today = normalizeDate(value.today, calendar);
    calendar.events = Array.isArray(value.events)
        ? value.events.filter(isObject).map((e) => ({
            id: str(e.id) || makeId(),
            title: str(e.title, "Event"),
            notes: str(e.notes),
            ...normalizeDate(e, calendar),
        }))
        : [];
    const eventIds = new Set(calendar.events.map((e) => e.id));
    calendar.passed = Array.isArray(value.passed)
        ? value.passed.filter((id): id is string => typeof id === "string" && eventIds.has(id))
        : [];
    return calendar;
}
