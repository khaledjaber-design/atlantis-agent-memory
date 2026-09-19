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

test('recall falls back to persisted memories when keyword search is empty', async () => {
  const calls = [];
  const fetchImpl = async (url) => {
    calls.push(url);
    const body = calls.length === 1
      ? { memories: [], total: 0, limit: 20, offset: 0 }
      : {
          memories: [
            { id: 'decision', content: 'Friday free shipping applies to orders over $75.' },
            { id: 'other', content: 'Unrelated setup check.' },
          ],
          total: 2,
          limit: 200,
          offset: 0,
        };
    return { ok: true, text: async () => JSON.stringify(body) };
  };

  const result = await recall('Friday shipping', { MEM9_API_KEY: 'test-key' }, fetchImpl);

  assert.equal(calls.length, 2);
  assert.equal(result.total, 1);
  assert.deepEqual(result.memories.map((memory) => memory.id), ['decision']);
});

test('recall keeps server keyword results without listing all memories', async () => {
  const fetchImpl = async () => ({
    ok: true,
    text: async () => JSON.stringify({ memories: [{ id: 'server-result' }], total: 1 }),
  });

  const result = await recall('Friday shipping', { MEM9_API_KEY: 'test-key' }, fetchImpl);
  assert.deepEqual(result.memories.map((memory) => memory.id), ['server-result']);
});
