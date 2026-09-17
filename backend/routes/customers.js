const express = require('express');
const router = express.Router();
const { loadAll, saveAll, genId } = require('../data');
const { computeBill, currentStatus, todayISO, addDays, fromISO, toISO } = require('../billing');

function currentPeriod(req) {
  const now = new Date();
  const year = req.query.year ? parseInt(req.query.year, 10) : now.getFullYear();
  const month = req.query.month !== undefined ? parseInt(req.query.month, 10) : now.getMonth();
  return { year, month };
}

// GET /api/customers?search=&status=all|active|paused&year=&month=
router.get('/', (req, res) => {
  const { search = '', status = 'all' } = req.query;
  const { year, month } = currentPeriod(req);
  const q = search.trim().toLowerCase();
  const qDigits = q.replace(/\D/g, '');

  const customers = loadAll();
  const result = customers
    .filter((c) => {
      const st = currentStatus(c);
      if (status !== 'all' && status !== st) return false;
      if (q) {
        const inPhone = qDigits.length > 0 && c.phone.replace(/\D/g, '').includes(qDigits);
        const inName = c.name.toLowerCase().includes(q);
        if (!inPhone && !inName) return false;
      }
      return true;
    })
    .map((c) => ({
      ...c,
      status: currentStatus(c),
      bill: computeBill(c, year, month),
    }));

  res.json(result);
});

// POST /api/customers  { name, phone, planPrice, startDate }
router.post('/', (req, res) => {
  const { name, phone, planPrice, startDate } = req.body || {};
  if (!name || !phone || !planPrice || Number(planPrice) <= 0) {
    return res.status(400).json({ error: 'name, phone and a positive planPrice are required' });
  }
  const customers = loadAll();
  const customer = {
    id: genId(),
    name: String(name).trim(),
    phone: String(phone).trim(),
    planPrice: Number(planPrice),
    startDate: startDate || todayISO(),
    pauses: [],
  };
  customers.push(customer);
  saveAll(customers);
  res.status(201).json(customer);
});

// GET /api/customers/:id?year=&month=
router.get('/:id', (req, res) => {
  const { year, month } = currentPeriod(req);
  const customers = loadAll();
  const c = customers.find((x) => x.id === req.params.id);
  if (!c) return res.status(404).json({ error: 'Customer not found' });
  res.json({ ...c, status: currentStatus(c), bill: computeBill(c, year, month) });
});

// PUT /api/customers/:id  { name?, phone?, planPrice?, startDate? }
router.put('/:id', (req, res) => {
  const customers = loadAll();
  const idx = customers.findIndex((x) => x.id === req.params.id);
  if (idx === -1) return res.status(404).json({ error: 'Customer not found' });

  const { name, phone, planPrice, startDate } = req.body || {};
  if (name !== undefined) customers[idx].name = String(name).trim();
  if (phone !== undefined) customers[idx].phone = String(phone).trim();
  if (planPrice !== undefined) customers[idx].planPrice = Number(planPrice);
  if (startDate !== undefined) customers[idx].startDate = startDate;

  saveAll(customers);
  res.json(customers[idx]);
});

// DELETE /api/customers/:id
router.delete('/:id', (req, res) => {
  const customers = loadAll();
  const idx = customers.findIndex((x) => x.id === req.params.id);
  if (idx === -1) return res.status(404).json({ error: 'Customer not found' });
  customers.splice(idx, 1);
  saveAll(customers);
  res.status(204).end();
});

// POST /api/customers/:id/pause  { start, end? }
router.post('/:id/pause', (req, res) => {
  const { start, end } = req.body || {};
  if (!start) return res.status(400).json({ error: 'start date is required' });
  if (end && end < start) {
    return res.status(400).json({ error: 'end date cannot be before start date' });
  }
  const customers = loadAll();
  const c = customers.find((x) => x.id === req.params.id);
  if (!c) return res.status(404).json({ error: 'Customer not found' });

  c.pauses.push({ start, end: end || null });
  saveAll(customers);
  res.json(c);
});

// POST /api/customers/:id/resume  -> closes any open pause as of yesterday
router.post('/:id/resume', (req, res) => {
  const customers = loadAll();
  const c = customers.find((x) => x.id === req.params.id);
  if (!c) return res.status(404).json({ error: 'Customer not found' });

  const today = todayISO();
  const yesterday = toISO(addDays(fromISO(today), -1));
  c.pauses.forEach((p) => {
    if (!p.end || p.end >= today) p.end = yesterday;
  });
  saveAll(customers);
  res.json(c);
});

// DELETE /api/customers/:id/pauses/:index  -> remove a logged pause entirely
router.delete('/:id/pauses/:index', (req, res) => {
  const customers = loadAll();
  const c = customers.find((x) => x.id === req.params.id);
  if (!c) return res.status(404).json({ error: 'Customer not found' });

  const idx = parseInt(req.params.index, 10);
  if (Number.isNaN(idx) || idx < 0 || idx >= c.pauses.length) {
    return res.status(400).json({ error: 'Invalid pause index' });
  }
  c.pauses.splice(idx, 1);
  saveAll(customers);
  res.json(c);
});

module.exports = router;
