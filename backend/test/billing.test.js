import test from 'node:test';
import assert from 'node:assert/strict';
import { calculateBill, currentStatus } from '../src/billing.js';

test('prorates only served weekdays and excludes inclusive pause dates', () => {
  const customer = { startDate: '2026-09-01', monthlyPrice: 2200, pauses: [{ startDate: '2026-09-07', endDate: '2026-09-11' }] };
  const bill = calculateBill(customer, '2026-09', '2026-10-01');
  assert.equal(bill.weekdays, 22);
  assert.equal(bill.pausedDays, 5);
  assert.equal(bill.deliveredDays, 17);
  assert.equal(bill.amount, 1700);
});
test('subscription start and current cutoff exclude unserved days', () => {
  const customer = { startDate: '2026-09-10', monthlyPrice: 2200, pauses: [] };
  const bill = calculateBill(customer, '2026-09', '2026-09-11');
  assert.equal(bill.deliveredDays, 2);
  assert.equal(bill.amount, 200);
  assert.equal(bill.provisional, true);
});
test('status follows dated pause', () => {
  const c = { startDate: '2026-09-01', pauses: [{ startDate: '2026-09-07', endDate: '2026-09-11' }] };
  assert.equal(currentStatus(c, '2026-09-09'), 'paused');
  assert.equal(currentStatus(c, '2026-09-12'), 'active');
});
