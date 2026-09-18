'use strict';

const test = require('node:test');
const assert = require('node:assert/strict');
const { subtotalCents, orderTotalCents } = require('../src/checkout');

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
