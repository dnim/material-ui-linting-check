#!/usr/bin/env node
const fs = require('fs');
const path = require('path');

const root = path.resolve(__dirname, '..');
const inputPath = path.join(root, 'eslint-rules-list.txt');
const outputPath = path.join(root, 'eslint-rules-list.sorted.txt');

if (!fs.existsSync(inputPath)) {
  console.error('Input file not found:', inputPath);
  process.exit(2);
}

const raw = fs.readFileSync(inputPath, 'utf8');
const lines = raw.split(/\r?\n/).filter(Boolean);

// Parse lines like: "rule/name — levelName (levelNum)"
function parseLine(line) {
  // split by the em dash "—" (U+2014) or hyphen
  const parts = line.split('—');
  if (parts.length < 2) return { line, name: line, lvlNum: -1 };
  const name = parts[0].trim();
  const rest = parts.slice(1).join('—').trim();
  const m = rest.match(/\((\d+)\)\s*$/);
  const lvlNum = m ? Number(m[1]) : (rest.includes('error') ? 2 : rest.includes('warn') ? 1 : 0);
  return { line, name, lvlNum };
}

const parsed = lines.map(parseLine);

// Sort: highest numeric level first (2 -> 1 -> 0), tie-breaker alphabetic name
parsed.sort((a, b) => {
  if (b.lvlNum !== a.lvlNum) return b.lvlNum - a.lvlNum;
  return a.name.localeCompare(b.name);
});

const out = parsed.map(p => p.line).join('\n') + '\n';
fs.writeFileSync(outputPath, out);
console.log('Wrote', outputPath, '- total lines:', parsed.length);
