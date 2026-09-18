'use strict';

function subtotalCents(items) {
  if (!Array.isArray(items)) {
    throw new TypeError('items must be an array');
  }

  return items.reduce((sum, item) => {
    if (!Number.isSafeInteger(item.unitPriceCents) || item.unitPriceCents < 0) {
      throw new TypeError('unitPriceCents must be a nonnegative integer');
    }
    if (!Number.isSafeInteger(item.quantity) || item.quantity < 0) {
      throw new TypeError('quantity must be a nonnegative integer');
    }
    return sum + item.unitPriceCents * item.quantity;
  }, 0);
}

function orderTotalCents({ items, taxCents = 0, shippingCents = 0 }) {
  if (!Number.isSafeInteger(taxCents) || taxCents < 0) {
    throw new TypeError('taxCents must be a nonnegative integer');
  }
  if (!Number.isSafeInteger(shippingCents) || shippingCents < 0) {
    throw new TypeError('shippingCents must be a nonnegative integer');
  }
  return subtotalCents(items) + taxCents + shippingCents;
}

module.exports = { subtotalCents, orderTotalCents };
