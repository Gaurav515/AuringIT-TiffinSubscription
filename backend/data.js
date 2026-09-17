// Very small file-based "database". Good enough for a single tiffin
// owner running this on one machine. Swap this module out for a real
// database later without touching routes/billing logic.

const fs = require('fs');
const path = require('path');

const DB_PATH = path.join(__dirname, 'data', 'customers.json');

function loadAll() {
  try {
    const raw = fs.readFileSync(DB_PATH, 'utf-8');
    return JSON.parse(raw);
  } catch (e) {
    return [];
  }
}

function saveAll(customers) {
  fs.writeFileSync(DB_PATH, JSON.stringify(customers, null, 2));
}

function genId() {
  return 'c_' + Date.now() + '_' + Math.random().toString(36).slice(2, 8);
}

module.exports = { loadAll, saveAll, genId };
