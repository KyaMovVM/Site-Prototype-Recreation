#!/usr/bin/env node
const { readdirSync, readFileSync, writeFileSync } = require('fs');
const { join, extname } = require('path');

// Директория UI-компонентов
const uiDir = join(__dirname, '../components/ui');

function processFile(filePath) {
  const text = readFileSync(filePath, 'utf8');
  const updated = text
    .replace(/transition-all/g, 'transition-default')
    .replace(/focus-visible:ring-ring\/50/g, 'focus-visible:ring-primary/50')
    .replace(/focus-visible:border-ring/g, 'focus-visible:border-primary');
  if (updated !== text) {
    writeFileSync(filePath, updated, 'utf8');
    console.log(`Updated: ${filePath}`);
  }
}

function walkDir(dir) {
  readdirSync(dir, { withFileTypes: true }).forEach(entry => {
    const full = join(dir, entry.name);
    if (entry.isDirectory()) walkDir(full);
    else if (entry.isFile() && extname(entry.name) === '.tsx') processFile(full);
  });
}

walkDir(uiDir);
console.log('Batch refactor complete');
