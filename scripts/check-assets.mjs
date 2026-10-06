import { readFile } from 'node:fs/promises';
import { createHash } from 'node:crypto';
import path from 'node:path';
const root = path.resolve('public/astra-policy');
const manifest = JSON.parse(await readFile(path.join(root, 'manifest.json'), 'utf8'));
if (manifest.assets.length !== 59) throw new Error('Astra PDF inventory must contain 22 figures and 37 tables');
for (const asset of manifest.assets) {
  const buffer = await readFile(path.join(root, asset.file));
  if (buffer.length !== asset.bytes || createHash('sha256').update(buffer).digest('hex') !== asset.sha256) throw new Error(`Asset checksum mismatch: ${asset.file}`);
}
console.log(`PDF asset manifest verified: ${manifest.assets.length} images`);
