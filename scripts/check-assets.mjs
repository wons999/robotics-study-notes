import { readFile } from 'node:fs/promises';
import { createHash } from 'node:crypto';
import path from 'node:path';
const inventories = [
  ['astra-policy', 59],
  ['unexpected-robot-policy', 18],
  ['gpt-policy', 15],
  ['codeactionbench', 29],
];
let total = 0;
for (const [directory, count] of inventories) {
  const root = path.resolve('public', directory);
  const manifest = JSON.parse(await readFile(path.join(root, 'manifest.json'), 'utf8'));
  if (manifest.assets.length !== count) throw new Error(`${directory}: PDF inventory must contain ${count} images`);
  for (const asset of manifest.assets) {
    const buffer = await readFile(path.join(root, asset.file));
    if (buffer.length !== asset.bytes || createHash('sha256').update(buffer).digest('hex') !== asset.sha256) throw new Error(`Asset checksum mismatch: ${directory}/${asset.file}`);
  }
  total += manifest.assets.length;
}
console.log(`PDF asset manifests verified: ${total} images`);
