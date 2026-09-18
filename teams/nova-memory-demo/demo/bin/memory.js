#!/usr/bin/env node
'use strict';

const readline = require('node:readline/promises');
const { stdin, stdout } = require('node:process');
const { remember, recall, inspect } = require('../src/mem9');

async function main() {
  const [command, ...args] = process.argv.slice(2);
  if (command === 'remember') {
    let content = args.join(' ');
    if (!content) {
      const rl = readline.createInterface({ input: stdin, output: stdout });
      content = await rl.question('Paste the day-one decision, then press Enter: ');
      rl.close();
    }
    const saved = await remember(content);
    console.log(JSON.stringify({ id: saved.id, content: saved.content, state: saved.state }, null, 2));
  } else if (command === 'recall') {
    const found = await recall(args.join(' '));
    console.log(JSON.stringify(found, null, 2));
  } else if (command === 'inspect') {
    console.log(JSON.stringify(await inspect(args[0]), null, 2));
  } else {
    console.log('Usage: node bin/memory.js remember [decision] | recall <keywords> | inspect <memory-id>');
    if (command) process.exitCode = 1;
  }
}

main().catch((error) => { console.error(error.message); process.exitCode = 1; });
