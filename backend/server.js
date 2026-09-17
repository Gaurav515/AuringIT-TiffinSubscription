const express = require('express');
const cors = require('cors');
const path = require('path');

const customersRouter = require('./routes/customers');
const { loadAll } = require('./data');
const { computeBill, currentStatus } = require('./billing');

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api/customers', customersRouter);

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
