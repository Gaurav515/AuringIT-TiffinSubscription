const DAY = 24 * 60 * 60 * 1000;

export function parseDate(value) {
  if (typeof value !== 'string' || !/^\d{4}-\d{2}-\d{2}$/.test(value)) return null;
  const date = new Date(`${value}T00:00:00.000Z`);
  return Number.isNaN(date.getTime()) || date.toISOString().slice(0, 10) !== value ? null : date;
}

export function dateString(date) { return date.toISOString().slice(0, 10); }
export function today() { return dateString(new Date()); }
export function isWeekday(date) { return date.getUTCDay() !== 0 && date.getUTCDay() !== 6; }

export function calculateBill(customer, month, cutoff = today()) {
  if (!/^\d{4}-(0[1-9]|1[0-2])$/.test(month)) throw new Error('Month must be YYYY-MM');
  const first = parseDate(`${month}-01`);
  const last = new Date(Date.UTC(first.getUTCFullYear(), first.getUTCMonth() + 1, 0));
  const cutoffDate = parseDate(cutoff);
  if (!cutoffDate) throw new Error('Invalid cutoff date');
  const end = cutoffDate < last ? cutoffDate : last;
  let weekdays = 0, deliveredDays = 0, pausedDays = 0;
  const subscriptionStart = parseDate(customer.startDate);
  for (let day = first; day <= last; day = new Date(day.getTime() + DAY)) {
    if (!isWeekday(day)) continue;
    weekdays++;
    const stamp = dateString(day);
    if (day > end || day < subscriptionStart) continue;
    const paused = customer.pauses.some(p => p.startDate <= stamp && (!p.endDate || stamp <= p.endDate));
    if (paused) pausedDays++;
    else deliveredDays++;
  }
  const monthlyPrice = Number(customer.monthlyPrice);
  return {
    month, monthlyPrice, weekdays, deliveredDays, pausedDays,
    amount: Math.round((monthlyPrice * deliveredDays / weekdays + Number.EPSILON) * 100) / 100,
    provisional: end < last, through: end < first ? null : dateString(end)
  };
}

export function currentStatus(customer, date = today()) {
  if (customer.startDate > date) return 'upcoming';
  return customer.pauses.some(p => p.startDate <= date && (!p.endDate || date <= p.endDate)) ? 'paused' : 'active';
}
