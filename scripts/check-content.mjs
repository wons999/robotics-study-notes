import { readdir, readFile, stat } from 'node:fs/promises';
import path from 'node:path';
import { parse } from 'yaml';

const root = process.cwd();
const docs = path.join(root, 'src/content/docs');
const errors = [];
async function files(dir) {
  const entries = await readdir(dir, { withFileTypes: true });
  return (await Promise.all(entries.map(entry => entry.isDirectory() ? files(path.join(dir, entry.name)) : path.join(dir, entry.name)))).flat();
}
const documents = (await files(docs)).filter(file => /\.mdx?$/.test(file));
const routes = new Set(documents.map(file => path.relative(docs, file).replace(/\.mdx?$/, '').replace(/(^|\/)index$/, '').replace(/\/$/, '')));
async function exists(file) { try { return (await stat(file)).isFile(); } catch { return false; } }
async function checkLink(file, target, asset = false) {
  if (/^(https?:|mailto:|tel:|data:|#)/.test(target) || target.includes('${') || target.includes('{')) return;
  const clean = decodeURIComponent(target.split(/[?#]/)[0]);
  if (!clean) return;
  const rel = path.relative(docs, file).replace(/\.mdx?$/, '');
  const route = rel.replace(/(^|\/)index$/, '');
  const location = path.posix.normalize(clean.startsWith('/') ? clean.slice(1) : path.posix.join(route, clean)).replace(/\/$/, '');
  const normalized = location === '.' ? '' : location;
  if (!asset && routes.has(normalized)) return;
  const publicPath = path.join(root, 'public', location);
  if (await exists(publicPath)) return;
  if (!asset && await exists(path.resolve(path.dirname(file), clean))) return;
  errors.push(`${path.relative(root, file)}: ${asset ? '없는 이미지' : '없는 내부 링크'} ${target}`);
}
for (const file of documents) {
  const text = await readFile(file, 'utf8');
  const match = text.match(/^---\n([\s\S]*?)\n---/);
  if (!match) { errors.push(`${file}: frontmatter 없음`); continue; }
  const meta = parse(match[1]);
  const rel = path.relative(docs, file);
  if (/^(paper-notes|robot-learning|experiments)\//.test(rel) && !/(^|\/)index\.mdx$/.test(rel) && !/catalog\.mdx$/.test(rel) && !meta.research) errors.push(`${rel}: research 메타데이터 없음`);
  if (meta.research?.status === 'verified' && !meta.research.reviewedAt) errors.push(`${rel}: 검토일 없음`);
  const content = text.slice(match[0].length).replace(/```[\s\S]*?```/g, '');
  for (const link of content.matchAll(/(!?)\[[^\]]*\]\(([^\s)]+)(?:\s+"[^"]*")?\)/g)) await checkLink(file, link[2], !!link[1]);
  for (const tag of content.matchAll(/<(?:PaperFigure|PublicImage|img)\b[^>]*?src=["']([^"']+)["']/g)) await checkLink(file, tag[1], true);
  for (const tag of content.matchAll(/<(?:LinkCard|a)\b[^>]*?href=["']([^"']+)["']/g)) await checkLink(file, tag[1]);
}
const deck = await readFile(path.join(root, 'src/data/trex-slides.ts'), 'utf8');
for (const image of deck.matchAll(/src="(\/[^"\s]+)"/g)) if (!await exists(path.join(root, 'public', image[1]))) errors.push(`T-Rex: 없는 이미지 ${image[1]}`);
if (errors.length) { console.error(errors.join('\n')); process.exitCode = 1; }
else console.log(`콘텐츠 검증 통과: ${documents.length}개 문서, 내부 링크·로컬 이미지·필수 메타데이터`);
