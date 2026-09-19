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

const FRIDAY_FREE_SHIPPING_STATES = new Set([
  'AL', 'AZ', 'AR', 'CA', 'CO', 'CT', 'DE', 'DC', 'FL', 'GA',
  'ID', 'IL', 'IN', 'IA', 'KS', 'KY', 'LA', 'ME', 'MD', 'MA',
  'MI', 'MN', 'MS', 'MO', 'MT', 'NE', 'NV', 'NH', 'NJ', 'NM',
  'NY', 'NC', 'ND', 'OH', 'OK', 'OR', 'PA', 'RI', 'SC', 'SD',
  'TN', 'TX', 'UT', 'VT', 'VA', 'WA', 'WV', 'WI', 'WY',
]);

const ISO_TIMESTAMP_WITH_ZONE =
  /^(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2})(?::(\d{2})(?:\.\d+)?)?(Z|[+-]\d{2}:\d{2})$/;

function parseIsoTimestampWithZone(value) {
  if (typeof value !== 'string') {
    return null;
  }

  const match = ISO_TIMESTAMP_WITH_ZONE.exec(value);
  if (!match) {
    return null;
  }

  const [, yearText, monthText, dayText, hourText, minuteText, secondText = '0', zone] = match;
  const year = Number(yearText);
  const month = Number(monthText);
  const day = Number(dayText);
  const hour = Number(hourText);
  const minute = Number(minuteText);
  const second = Number(secondText);
  const daysInMonth = new Date(Date.UTC(year, month, 0)).getUTCDate();

  if (
    month < 1 || month > 12 || day < 1 || day > daysInMonth ||
    hour > 23 || minute > 59 || second > 59
  ) {
    return null;
  }

  if (zone !== 'Z') {
    const offsetHour = Number(zone.slice(1, 3));
    const offsetMinute = Number(zone.slice(4, 6));
    if (offsetHour > 23 || offsetMinute > 59) {
      return null;
    }
  }

  const timestamp = new Date(value);
  return Number.isNaN(timestamp.getTime()) ? null : timestamp;
}

function eligibleForFridayFreeShipping({ items, destinationState, orderedAt }) {
  if (!Array.isArray(items) || items.length === 0) {
    return false;
  }

  const timestamp = parseIsoTimestampWithZone(orderedAt);
  if (timestamp === null) {
    return false;
  }

  if (
    typeof destinationState !== 'string' ||
    !FRIDAY_FREE_SHIPPING_STATES.has(destinationState.toUpperCase())
  ) {
    return false;
  }

  const weekday = new Intl.DateTimeFormat('en-US', {
    timeZone: 'America/New_York',
    weekday: 'long',
  }).format(timestamp);
  if (weekday !== 'Friday') {
    return false;
  }

  let productSubtotalCents = 0;
  for (const item of items) {
    if (!Number.isSafeInteger(item.unitPriceCents) || item.unitPriceCents < 0) {
      throw new TypeError('unitPriceCents must be a nonnegative integer');
    }
    if (!Number.isSafeInteger(item.quantity) || item.quantity < 0) {
      throw new TypeError('quantity must be a nonnegative integer');
    }
    if (item.kind === 'product') {
      productSubtotalCents += item.unitPriceCents * item.quantity;
    }
  }

  return productSubtotalCents >= 5000;
}

module.exports = { subtotalCents, orderTotalCents, eligibleForFridayFreeShipping };
