'use strict';

function config(env = process.env) {
  const baseUrl = env.MEM9_BASE_URL || 'http://127.0.0.1:8080';
  const apiKey = env.MEM9_API_KEY;
  if (!apiKey) throw new Error('Set MEM9_API_KEY in your local environment.');
  return { baseUrl: baseUrl.replace(/\/$/, ''), apiKey };
}

async function request(path, options = {}, env = process.env, fetchImpl = fetch) {
  const { baseUrl, apiKey } = config(env);
  const response = await fetchImpl(`${baseUrl}${path}`, {
    ...options,
    headers: {
      'X-API-Key': apiKey,
      ...(options.body ? { 'Content-Type': 'application/json' } : {}),
      ...options.headers,
    },
  });
  const raw = await response.text();
  let data;
  try { data = raw ? JSON.parse(raw) : {}; } catch { data = { message: raw }; }
  if (!response.ok) {
    throw new Error(`mem9 returned ${response.status}: ${data.error || data.message || raw}`);
  }
  return data;
}

async function remember(content, env, fetchImpl) {
  if (!content || !content.trim()) throw new Error('Memory content cannot be empty.');
  return request('/v1alpha2/mem9s/memories', {
    method: 'POST',
    body: JSON.stringify({ content: content.trim(), memory_type: 'pinned', tags: ['nova-overnight-demo'] }),
  }, env, fetchImpl);
}

function recall(query, env, fetchImpl) {
  if (!query || !query.trim()) throw new Error('Search query cannot be empty.');
  const params = new URLSearchParams({ q: query.trim(), search_mode: 'keyword', limit: '20' });
  return request(`/v1alpha2/mem9s/memories?${params}`, {}, env, fetchImpl);
}

function inspect(id, env, fetchImpl) {
  if (!id) throw new Error('A memory ID is required.');
  return request(`/v1alpha2/mem9s/memories/${encodeURIComponent(id)}`, {}, env, fetchImpl);
}

module.exports = { config, request, remember, recall, inspect };
