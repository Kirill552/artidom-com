// One-off image optimization for Night Showroom redesign.
// - hero-evening: from design-mockups/assets -> public/images/hero (webp, max 2400w)
// - horeca-counters: recompress in place (webp q72, max 1600w)
import sharp from 'sharp';
import { mkdir, readdir, stat, readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.dirname(path.dirname(fileURLToPath(import.meta.url)));

async function hero() {
  const src = path.join(root, 'design-mockups/assets/hero-evening.jpg');
  const outDir = path.join(root, 'public/images/hero');
  await mkdir(outDir, { recursive: true });
  const out = path.join(outDir, 'hero-evening.webp');
  await sharp(src).resize({ width: 2400, withoutEnlargement: true }).webp({ quality: 74 }).toFile(out);
  const s = await stat(out);
  console.log(`hero-evening.webp ${(s.size / 1024).toFixed(0)} KB`);
}

async function horeca() {
  const dir = path.join(root, 'public/images/projects/horeca-counters');
  for (const f of await readdir(dir)) {
    if (!f.endsWith('.webp')) continue;
    const p = path.join(dir, f);
    const before = (await stat(p)).size;
    const input = await readFile(p);
    const out = await sharp(input).resize({ width: 1600, withoutEnlargement: true }).webp({ quality: 72 }).toBuffer();
    await writeFile(p, out);
    const after = (await stat(p)).size;
    console.log(`${f}: ${(before / 1024).toFixed(0)} KB -> ${(after / 1024).toFixed(0)} KB`);
  }
}

await hero();
await horeca();
