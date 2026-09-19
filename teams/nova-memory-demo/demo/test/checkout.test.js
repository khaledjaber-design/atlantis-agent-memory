'use strict';

const test = require('node:test');
const assert = require('node:assert/strict');
const {
  subtotalCents,
  orderTotalCents,
  eligibleForFridayFreeShipping,
} = require('../src/checkout');

test('calculates an order subtotal from prices and quantities', () => {
  const items = [
    { unitPriceCents: 1250, quantity: 2, kind: 'product' },
    { unitPriceCents: 500, quantity: 1, kind: 'gift-card' },
  ];
  assert.equal(subtotalCents(items), 3000);
});

test('adds tax and shipping to the subtotal', () => {
  assert.equal(
    orderTotalCents({ items: [{ unitPriceCents: 1000, quantity: 1 }], taxCents: 80, shippingCents: 250 }),
    1330
  );
});

test('rejects invalid money values', () => {
  assert.throws(() => subtotalCents([{ unitPriceCents: -1, quantity: 1 }]), TypeError);
  assert.throws(() => orderTotalCents({ items: [], taxCents: 1.5 }), TypeError);
});

const fridayOrder = {
  items: [{ unitPriceCents: 2500, quantity: 2, kind: 'product' }],
  destinationState: 'NY',
  orderedAt: '2026-09-18T12:00:00-04:00',
};

test('grants Friday free shipping at the exact product subtotal threshold', () => {
  assert.equal(eligibleForFridayFreeShipping(fridayOrder), true);
  assert.equal(
    eligibleForFridayFreeShipping({
      ...fridayOrder,
      items: [{ unitPriceCents: 4999, quantity: 1, kind: 'product' }],
    }),
    false
  );
});

test('counts only items whose kind is exactly product', () => {
  assert.equal(
    eligibleForFridayFreeShipping({
      ...fridayOrder,
      items: [
        { unitPriceCents: 4999, quantity: 1, kind: 'product' },
        { unitPriceCents: 5000, quantity: 1, kind: 'gift-card' },
        { unitPriceCents: 5000, quantity: 1, kind: 'digital' },
        { unitPriceCents: 5000, quantity: 1, kind: 'Product' },
      ],
    }),
    false
  );
});

test('requires a nonempty cart and valid item money and quantities', () => {
  assert.equal(eligibleForFridayFreeShipping({ ...fridayOrder, items: [] }), false);
  assert.equal(eligibleForFridayFreeShipping({ ...fridayOrder, items: null }), false);
  assert.throws(
    () => eligibleForFridayFreeShipping({
      ...fridayOrder,
      items: [{ unitPriceCents: -1, quantity: 1, kind: 'gift-card' }],
    }),
    TypeError
  );
  assert.throws(
    () => eligibleForFridayFreeShipping({
      ...fridayOrder,
      items: [{ unitPriceCents: 5000, quantity: 1.5, kind: 'product' }],
    }),
    TypeError
  );
});

test('accepts contiguous US states and DC case-insensitively', () => {
  assert.equal(eligibleForFridayFreeShipping({ ...fridayOrder, destinationState: 'ca' }), true);
  assert.equal(eligibleForFridayFreeShipping({ ...fridayOrder, destinationState: 'dc' }), true);
  assert.equal(eligibleForFridayFreeShipping({ ...fridayOrder, destinationState: 'AK' }), false);
  assert.equal(eligibleForFridayFreeShipping({ ...fridayOrder, destinationState: 'HI' }), false);
  assert.equal(eligibleForFridayFreeShipping({ ...fridayOrder, destinationState: 'PR' }), false);
  assert.equal(eligibleForFridayFreeShipping({ ...fridayOrder, destinationState: ' CA ' }), false);
});

test('uses the Friday calendar day in America/New_York', () => {
  assert.equal(
    eligibleForFridayFreeShipping({ ...fridayOrder, orderedAt: '2026-09-19T02:30:00Z' }),
    true
  );
  assert.equal(
    eligibleForFridayFreeShipping({ ...fridayOrder, orderedAt: '2026-09-18T02:30:00Z' }),
    false
  );
  assert.equal(
    eligibleForFridayFreeShipping({ ...fridayOrder, orderedAt: '2026-12-05T04:30:00Z' }),
    true
  );
});

test('rejects timestamps without an explicit zone or with invalid calendar fields', () => {
  for (const orderedAt of [
    '2026-09-18T12:00:00',
    '2026-09-18',
    '2026-02-30T12:00:00Z',
    '2026-09-18T24:00:00Z',
    'not-a-date',
    null,
  ]) {
    assert.equal(eligibleForFridayFreeShipping({ ...fridayOrder, orderedAt }), false);
  }
});

test('does not change orderTotalCents behavior', () => {
  const items = [
    { unitPriceCents: 5000, quantity: 1, kind: 'product' },
    { unitPriceCents: 2000, quantity: 1, kind: 'gift-card' },
  ];
  assert.equal(orderTotalCents({ items, taxCents: 100, shippingCents: 500 }), 7600);
});
