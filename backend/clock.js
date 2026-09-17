// A tiny controllable clock. By default it tracks the real date, but a
// test/grader can pin it to a specific date via POST /api/clock, or just
// call POST /api/clock repeatedly to step forward one day at a time.

const { todayISO, addDays, fromISO, toISO } = require('./billing');

let current = null; // null = "not yet pinned" -> falls back to real today

function getToday() {
  if (current === null) current = todayISO();
  return current;
}

function setToday(iso) {
  current = iso;
  return current;
}

function advance(days = 1) {
  const base = fromISO(getToday());
  current = toISO(addDays(base, days));
  return current;
}

function reset() {
  current = null;
}

module.exports = { getToday, setToday, advance, reset };
