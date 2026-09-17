const express = require('express');
const cors = require('cors');
const path = require('path');

const customersRouter = require('./routes/customers');
const clockRouter = require('./routes/clock');          // NEW
const notifications = require('./notifications');       // NEW
const { loadAll } = require('./data');
const { computeBill, currentStatus } = require('./billing');

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api/customers', customersRouter);
app.use('/api/clock', clockRouter);                      // NEW

// GET /api/outbox -> every notification the Notification Service has sent
app.get('/api/outbox', (req, res) => {                    // NEW
  res.json(notifications.getOutbox());
});

// DELETE /api/outbox -> clear it (handy for re-running a test from scratch)
app.delete('/api/outbox', (req, res) => {                 // NEW
  notifications.clearOutbox();
  res.status(204).end();
});

// GET /api/summary?year=&month=  -> totals for the hero bar
app.get('/api/summary', (req, res) => {
  const now = new Date();
  const year = req.query.year ? parseInt(req.query.year, 10) : now.getFullYear();
  const month = req.query.month !== undefined ? parseInt(req.query.month, 10) : now.getMonth();

  const customers = loadAll();
  let total = 0;
  let active = 0;
  let paused = 0;
  customers.forEach((c) => {
    total += computeBill(c, year, month).bill;
    if (currentStatus(c) === 'active') active++;
    else paused++;
  });

  res.json({ total, active, paused, year, month });
});

// Serve the static frontend
app.use(express.static(path.join(__dirname, '../frontend')));

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Tiffin Ledger running at http://localhost:${PORT}`);
});
