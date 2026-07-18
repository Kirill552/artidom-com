// Regenerate static OG cards from the /api/og generator (Night Showroom).
// Requires dev server on :3100. Writes public/og/*.png.
import { writeFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.dirname(path.dirname(fileURLToPath(import.meta.url)));
const base = process.env.OG_BASE || 'http://127.0.0.1:3100';

const cards = [
  ['home', 'Custom kitchens and apartment furnishing in Montenegro', 'Workshop in Bar. Measurement, production, installation.'],
  ['workshop', 'Custom furniture workshop in Bar', 'Kitchens, wardrobes and joinery made in Zaljevo, Bar.'],
  ['catalog', 'Custom kitchens, wardrobes and joinery', 'Productised starting points, built to your floor plan.'],
  ['projects', 'Selected projects in Montenegro', 'Apartments, HoReCa and public interiors from our Bar workshop.'],
  ['contact', 'Tell us about your project', 'Send a floor plan or brief. We reply with the next step.'],
  ['residential', 'Custom kitchens, wardrobes and apartment furnishing', 'For apartments, villas and rental properties in Montenegro.'],
  ['horeca', 'Restaurant, hotel and service counter joinery', 'Selected HoReCa and B2B projects from our workshop.'],
  ['workspace', 'Reception desks, meeting tables and storage', 'Built-in joinery for offices, clinics and public spaces.'],
  ['education', 'School storage, reception and public-zone joinery', 'Batch production in Bar with installation support.'],
];

for (const [name, title, subtitle] of cards) {
  const url = `${base}/api/og?title=${encodeURIComponent(title)}&subtitle=${encodeURIComponent(subtitle)}`;
  const res = await fetch(url);
  if (!res.ok) throw new Error(`${name}: HTTP ${res.status}`);
  const buf = Buffer.from(await res.arrayBuffer());
  const out = path.join(root, 'public', 'og', `${name}.png`);
  await writeFile(out, buf);
  console.log(`${name}.png ${(buf.length / 1024).toFixed(0)} KB`);
}
