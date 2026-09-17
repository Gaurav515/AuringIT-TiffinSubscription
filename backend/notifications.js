// Stand-in "Notification Service". In a real deployment this would call
// an SMS/WhatsApp/push provider. Here it just records what would have been
// sent, so it can be inspected via GET /api/outbox (and graded from there).

let outbox = [];
let counter = 0;

function send(customer, dateISO, message) {
  counter += 1;
  const entry = {
    id: 'n_' + Date.now() + '_' + counter,
    customerId: customer.id,
    name: customer.name,
    phone: customer.phone,
    date: dateISO,       // the delivery date this notification is about
    message: message,
    sentAt: new Date().toISOString(),
  };
  outbox.push(entry);
  return entry;
}

function getOutbox() {
  return outbox;
}

function clearOutbox() {
  outbox = [];
}

module.exports = { send, getOutbox, clearOutbox };
