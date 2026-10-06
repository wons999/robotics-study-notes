import { test } from 'node:test';
import assert from 'node:assert/strict';
import { mkdtemp, mkdir, writeFile, rm } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import path from 'node:path';
import { spawnSync } from 'node:child_process';

const checker = path.resolve('scripts/check-content.mjs');
async function fixture(body, metadata = true) {
  const dir = await mkdtemp(path.join(tmpdir(), 'notes-content-'));
  await mkdir(path.join(dir, 'src/content/docs/paper-notes'), { recursive: true });
  await mkdir(path.join(dir, 'src/data'), { recursive: true });
  await mkdir(path.join(dir, 'public'), { recursive: true });
  await writeFile(path.join(dir, 'src/data/trex-slides.ts'), 'export const rawSlides = [];');
  await writeFile(path.join(dir, 'src/content/docs/index.mdx'), '---\ntitle: Home\n---\n');
  await writeFile(path.join(dir, 'src/content/docs/paper-notes/example.mdx'), `---\ntitle: Example\n${metadata ? 'research: {kind: paper, topics: [vla], status: reviewing, reviewedAt: null}\n' : ''}---\n${body}`);
  return dir;
}
for (const [name, body, metadata, pass] of [
  ['directory route resolves to home', '[Home](../../)', true, true],
  ['missing route fails', '[Missing](../../missing/)', true, false],
  ['missing figure fails', '<PaperFigure src="/absent.png" alt="example" />', true, false],
  ['missing research metadata fails', '', false, false],
  ['code examples do not count as links', '```md\n[Example](/missing/)\n```', true, true]
]) test(name, async () => {
  const dir = await fixture(body, metadata);
  try {
    const result = spawnSync(process.execPath, [checker], { cwd: dir, encoding: 'utf8' });
    assert.equal(result.status, pass ? 0 : 1, result.stderr);
  } finally { await rm(dir, { recursive: true, force: true }); }
});
