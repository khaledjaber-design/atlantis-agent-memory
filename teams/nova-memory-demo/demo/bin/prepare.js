#!/usr/bin/env node
'use strict';

const fs = require('node:fs');
const path = require('node:path');

const destination = process.argv[2];
if (!destination) {
  console.error('Usage: node bin/prepare.js <empty-output-directory>');
  process.exit(1);
}
const root = path.resolve(__dirname, '..');
const out = path.resolve(destination);
if (fs.existsSync(out) && fs.readdirSync(out).length) {
  console.error(`Output directory must be empty: ${out}`);
  process.exit(1);
}

for (const variant of ['baseline', 'with-memory']) {
  const target = path.join(out, variant);
  fs.mkdirSync(path.join(target, 'src'), { recursive: true });
  fs.mkdirSync(path.join(target, 'test'), { recursive: true });
  fs.mkdirSync(path.join(target, 'bin'), { recursive: true });
  fs.copyFileSync(path.join(root, 'package.json'), path.join(target, 'package.json'));
  fs.copyFileSync(path.join(root, 'src', 'checkout.js'), path.join(target, 'src', 'checkout.js'));
  fs.copyFileSync(path.join(root, 'src', 'mem9.js'), path.join(target, 'src', 'mem9.js'));
  fs.copyFileSync(path.join(root, 'test', 'checkout.test.js'), path.join(target, 'test', 'checkout.test.js'));
  fs.copyFileSync(path.join(root, 'bin', 'memory.js'), path.join(target, 'bin', 'memory.js'));
}
console.log(`Identical starter copies created in ${out}`);
