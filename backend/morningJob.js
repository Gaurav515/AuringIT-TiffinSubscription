// The actual rule from the spec:
// "notify the customers due a delivery today (active, a weekday, not paused)"

const { loadAll } = require('./data');
const { isWeekday, isPausedOn, fromISO } = require('./billing');
const notifications = require('./notifications');

function isDueToday(customer, dateISO, dateObj) {
  if (!isWeekday(dateObj)) return false;              // no deliveries on weekends
  if (customer.startDate > dateISO) return false;     // subscription hasn't started yet
  if (isPausedOn(customer, dateISO)) return false;     // paused covers "not active" for that day
  return true;
}

function runMorningNotifications(dateISO) {
  const dateObj = fromISO(dateISO);
  const customers = loadAll();
  const due = customers.filter((c) => isDueToday(c, dateISO, dateObj));

  return due.map((c) =>
    notifications.send(c, dateISO, `Hi ${c.name}, your tiffin is on its way today!`)
  );
}

module.exports = { runMorningNotifications, isDueToday };
