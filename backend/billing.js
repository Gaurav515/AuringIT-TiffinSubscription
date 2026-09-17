// Date + billing math shared by all routes.
// Dates are always plain "YYYY-MM-DD" strings on the wire; we convert to
// local Date objects only for calculation, never storing/using timezones.

function toISO(d) {
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${y}-${m}-${day}`;
}

function fromISO(s) {
  const [y, m, d] = s.split('-').map(Number);
  return new Date(y, m - 1, d);
}

function todayISO() {
  return toISO(new Date());
}

function addDays(d, n) {
  const r = new Date(d);
  r.setDate(r.getDate() + n);
  return r;
}

function isWeekday(d) {
  const g = d.getDay();
  return g !== 0 && g !== 6;
}

// inclusive weekday count between two Date objects
function countWeekdays(start, end) {
  if (start > end) return 0;
  let c = 0;
  let cur = new Date(start);
  while (cur <= end) {
    if (isWeekday(cur)) c++;
    cur = addDays(cur, 1);
  }
  return c;
}

// Is this customer paused on a given ISO date? Defaults to today.
function isPausedOn(customer, dateISO = todayISO()) {
  const d = fromISO(dateISO);
  return customer.pauses.some((p) => {
    const s = fromISO(p.start);
    const e = p.end ? fromISO(p.end) : null;
    return d >= s && (e === null || d <= e);
  });
}

function currentStatus(customer) {
  return isPausedOn(customer) ? 'paused' : 'active';
}

// Core billing rule:
// bill = (plan price / weekdays in month) * weekdays actually delivered
// "delivered" = weekdays in month, from whichever is later of (subscription
// start, month start), through month end, minus any weekdays that fall
// inside a pause range.
function computeBill(customer, year, month) {
  const monthStart = new Date(year, month, 1);
  const monthEnd = new Date(year, month + 1, 0);
  const totalWeekdaysInMonth = countWeekdays(monthStart, monthEnd);

  const subStart = fromISO(customer.startDate);
  const effectiveStart = subStart > monthStart ? subStart : monthStart;

  if (effectiveStart > monthEnd) {
    return {
      totalWeekdaysInMonth,
      billableWeekdays: 0,
      pausedWeekdays: 0,
      deliveredWeekdays: 0,
      perDay: 0,
      bill: 0,
    };
  }

  const billableWeekdays = countWeekdays(effectiveStart, monthEnd);

  let pausedWeekdays = 0;
  customer.pauses.forEach((p) => {
    const pStart = fromISO(p.start);
    const pEnd = p.end ? fromISO(p.end) : monthEnd; // open pause capped at month end for billing
    const s = pStart > effectiveStart ? pStart : effectiveStart;
    const e = pEnd < monthEnd ? pEnd : monthEnd;
    if (s <= e) pausedWeekdays += countWeekdays(s, e);
  });

  const deliveredWeekdays = Math.max(0, billableWeekdays - pausedWeekdays);
  const perDay = totalWeekdaysInMonth > 0 ? customer.planPrice / totalWeekdaysInMonth : 0;
  const bill = Math.round(perDay * deliveredWeekdays);

  return { totalWeekdaysInMonth, billableWeekdays, pausedWeekdays, deliveredWeekdays, perDay, bill };
}

module.exports = {
  toISO,
  fromISO,
  todayISO,
  addDays,
  isWeekday,
  countWeekdays,
  isPausedOn,
  currentStatus,
  computeBill,
};
