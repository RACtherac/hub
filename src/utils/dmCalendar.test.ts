/// <reference types="node" />

import { test } from "node:test";
import assert from "node:assert/strict";

import {
    advanceTime,
    createCalendar,
    createEvent,
    dateFromDayNumber,
    dayNumber,
    formatDate,
    formatDuration,
    formatTime,
    goToDate,
    moonPhase,
    passedEvents,
    rerollWeather,
    seasonOf,
    TRAVEL_MODES,
    travelMinutes,
    weatherOn,
    normalizeCalendar,
    setMonths,
    timeOfDay,
    upcomingEvents,
    weekday,
    type Calendar,
} from "./dmCalendar";
import { LOCATION_KINDS, generateField, generateLocation } from "./dmGenerators";

// Two short months, so rollovers are easy to see.
function tiny(): Calendar {
    return {
        ...createCalendar(),
        months: [{ name: "Ember", days: 3 }, { name: "Frost", days: 2 }],
        weekdays: ["Sun", "Moon"],
        era: "AR",
        today: { year: 10, month: 0, day: 1 },
        minutes: 0,
        moonCycle: 4,
    };
}

test("day numbers and dates convert both ways, across months and years", () => {
    const calendar = tiny();
    for (let n = -12; n < 20; n++) {
        assert.equal(dayNumber(calendar, dateFromDayNumber(calendar, n)), n);
    }
    assert.deepEqual(dateFromDayNumber(calendar, 3), { year: 0, month: 1, day: 1 });
    assert.deepEqual(dateFromDayNumber(calendar, -1), { year: -1, month: 1, day: 2 });
});

test("advancing time rolls over days, months and years, and can go back", () => {
    const calendar = { ...tiny(), minutes: 23 * 60 };
    const later = advanceTime(calendar, 90);
    assert.equal(later.minutes, 30);
    assert.deepEqual(later.today, { year: 10, month: 0, day: 2 });

    const nextYear = advanceTime(tiny(), 5 * 24 * 60);
    assert.deepEqual(nextYear.today, { year: 11, month: 0, day: 1 });

    const back = advanceTime(tiny(), -60);
    assert.equal(back.minutes, 23 * 60);
    assert.deepEqual(back.today, { year: 9, month: 1, day: 2 });
});

test("weekdays, moon phases, times and dates read sensibly", () => {
    const calendar = tiny();
    const days = [0, 1, 2, 3].map((n) => dateFromDayNumber(calendar, dayNumber(calendar, calendar.today) + n));
    assert.notEqual(weekday(calendar, days[0]), weekday(calendar, days[1]));
    assert.equal(weekday(calendar, days[0]), weekday(calendar, days[2]));
    assert.equal(moonPhase({ ...calendar, moonCycle: 0 }, days[0]), null);
    assert.ok(moonPhase(calendar, days[0]));

    assert.equal(formatTime(9 * 60 + 5), "09:05");
    assert.equal(timeOfDay(13 * 60), "Midday");
    assert.equal(timeOfDay(2 * 60), "Night");
    assert.equal(formatDate(calendar, calendar.today), "1 Ember, 10 AR");
});

test("upcoming events skip the past and count the days", () => {
    const calendar = tiny();
    const past = createEvent({ year: 9, month: 1, day: 2 }, { title: "Old" });
    const soon = createEvent({ year: 10, month: 0, day: 3 }, { title: "Feast" });
    const now = createEvent({ year: 10, month: 0, day: 1 }, { title: "Market" });
    const list = upcomingEvents({ ...calendar, events: [past, soon, now] });
    assert.deepEqual(list.map(({ event, inDays }) => [event.title, inDays]), [["Market", 0], ["Feast", 2]]);
});

test("shortening or removing months keeps today and events on real days", () => {
    const calendar = { ...tiny(), today: { year: 10, month: 1, day: 2 }, events: [createEvent({ year: 10, month: 0, day: 3 })] };
    const shorter = setMonths(calendar, [{ name: "Ember", days: 2 }]);
    assert.deepEqual(shorter.today, { year: 10, month: 0, day: 2 });
    assert.equal(shorter.events[0].day, 2);
    assert.equal(setMonths(calendar, []), calendar);
});

test("calendars load from saves and repair junk", () => {
    const calendar = { ...tiny(), events: [createEvent({ year: 10, month: 1, day: 2 }, { title: "Duel" })] };
    assert.deepEqual(normalizeCalendar(JSON.parse(JSON.stringify(calendar))), calendar);
    assert.equal(normalizeCalendar(null).months.length, 12);
    const repaired = normalizeCalendar({ months: [{ name: "Only", days: 5 }], today: { year: 3, month: 7, day: 99 }, minutes: 99999 });
    assert.deepEqual(repaired.today, { year: 3, month: 0, day: 5 });
    assert.equal(repaired.minutes, 24 * 60 - 1);
});

test("the location generator fills every field and follows the type", () => {
    // A fixed sequence, so the result is the same every run.
    let seed = 0;
    const random = () => (seed = (seed * 9301 + 49297) % 233280) / 233280;
    const tavern = generateLocation("Tavern", random);
    assert.equal(tavern.kind, "Tavern");
    assert.ok(tavern.name.startsWith("The "));
    assert.ok(Object.values(tavern).every((v) => v.trim().length > 0));
    assert.ok(LOCATION_KINDS.includes(generateLocation("", random).kind as typeof LOCATION_KINDS[number]));
    assert.ok(generateField("npc", "Ruins", random).endsWith("."));
    assert.ok(generateField("name", "Temple", random).includes(" of "));
});

test("durations read as days, hours and minutes", () => {
    assert.equal(formatDuration(45), "45 min");
    assert.equal(formatDuration(90), "1 h 30 min");
    assert.equal(formatDuration(8 * 60), "8 h");
    assert.equal(formatDuration(3 * 24 * 60 + 60), "3 d 1 h");
    assert.equal(formatDuration(0), "0 min");
});

test("moving time onto an event raises it, moving back drops it again", () => {
    const feast = createEvent({ year: 10, month: 0, day: 3 }, { title: "Feast" });
    const duel = createEvent({ year: 10, month: 1, day: 1 }, { title: "Duel" });
    const today = createEvent({ year: 10, month: 0, day: 1 }, { title: "Already today" });
    const calendar = { ...tiny(), events: [duel, feast, today] };

    // Same day: nothing new.
    assert.deepEqual(advanceTime(calendar, 60).passed, []);
    const later = advanceTime(calendar, 3 * 24 * 60);
    assert.deepEqual(passedEvents(later).map((e) => e.title), ["Feast", "Duel"]);
    // Keeps them through more moves forward, without doubling up.
    assert.deepEqual(advanceTime(later, 60).passed, later.passed);
    // Back before the duel: only the feast is still passed.
    assert.deepEqual(passedEvents(advanceTime(later, -24 * 60)).map((e) => e.title), ["Feast"]);

    // Jumping to a day counts too, and keeps the time of day.
    const jumped = goToDate({ ...calendar, minutes: 600 }, { year: 10, month: 0, day: 3 });
    assert.deepEqual(jumped.passed, [feast.id]);
    assert.equal(jumped.minutes, 600);
});

test("weather is stable per day, follows the season, and rerolls", () => {
    const calendar = createCalendar();
    assert.equal(seasonOf(calendar, 0), "winter");
    assert.equal(seasonOf(calendar, 11), "winter");
    assert.equal(seasonOf(calendar, 3), "spring");
    assert.equal(seasonOf(calendar, 6), "summer");
    assert.equal(seasonOf(calendar, 9), "autumn");

    const day = { year: 1, month: 6, day: 10 };
    assert.deepEqual(weatherOn(calendar, day), weatherOn(calendar, day));
    assert.equal(weatherOn({ ...calendar, weather: false }, day), null);
    // No snow in summer, over a whole month.
    for (let d = 1; d <= 30; d++) assert.ok(!/Snow|Blizzard/.test(weatherOn(calendar, { ...day, day: d })!.label));

    // Rerolling eventually changes it, and only for that day.
    let rolled = calendar;
    for (let i = 0; i < 20 && weatherOn(rolled, day)!.label === weatherOn(calendar, day)!.label; i++) rolled = rerollWeather(rolled, day);
    assert.notEqual(weatherOn(rolled, day)!.label, weatherOn(calendar, day)!.label);
    assert.deepEqual(weatherOn(rolled, { ...day, day: 11 }), weatherOn(calendar, { ...day, day: 11 }));
    assert.deepEqual(normalizeCalendar(JSON.parse(JSON.stringify(rolled))).weatherRolls, rolled.weatherRolls);
});

test("travel time counts full days as 24 hours and the rest as hours on the road", () => {
    const walk = TRAVEL_MODES.find((m) => m.id === "walk")!;
    const ship = TRAVEL_MODES.find((m) => m.id === "ship")!;
    assert.equal(travelMinutes(0, walk), 0);
    assert.equal(travelMinutes(12, walk), 4 * 60);
    assert.equal(travelMinutes(24, walk), 24 * 60);
    assert.equal(travelMinutes(60, walk), 2 * 24 * 60 + 4 * 60);
    assert.equal(travelMinutes(96, ship), 2 * 24 * 60);
});
