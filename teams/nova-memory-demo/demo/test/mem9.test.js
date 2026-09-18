'use strict';

const test = require('node:test');
const assert = require('node:assert/strict');
const { remember, recall, inspect } = require('../src/mem9');

const env = { MEM9_BASE_URL: 'http://localhost:8080/', MEM9_API_KEY: 'test-key' };

test('writes the supplied decision to mem9 as a pinned memory', async () => {
  let captured;
  const fakeFetch = async (url, options) => {
    captured = { url, options };
    return new Response(JSON.stringify({ id: 'memory-1', content: 'Rule', state: 'active' }), { status: 201 });
  };
  const saved = await remember('  Rule  ', env, fakeFetch);
  assert.equal(saved.id, 'memory-1');
  assert.equal(captured.url, 'http://localhost:8080/v1alpha2/mem9s/memories');
  assert.equal(captured.options.headers['X-API-Key'], 'test-key');
  assert.deepEqual(JSON.parse(captured.options.body), {
    content: 'Rule', memory_type: 'pinned', tags: ['nova-overnight-demo'],
  });
});

test('recalls by keyword and inspects a specific stored memory', async () => {
  const urls = [];
  const fakeFetch = async (url) => {
    urls.push(url);
    return new Response(JSON.stringify({ memories: [{ id: 'memory-1' }] }), { status: 200 });
  };
  await recall('Friday shipping', env, fakeFetch);
  await inspect('memory-1', env, fakeFetch);
  assert.match(urls[0], /q=Friday\+shipping&search_mode=keyword/);
  assert.equal(urls[1], 'http://localhost:8080/v1alpha2/mem9s/memories/memory-1');
});
