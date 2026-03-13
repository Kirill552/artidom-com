import satori from 'satori';
import sharp from 'sharp';
import { readFileSync, writeFileSync, mkdirSync, existsSync } from 'fs';
import { join } from 'path';

const WIDTH = 1200;
const HEIGHT = 630;
const OUT_DIR = join(process.cwd(), 'public', 'og');

const pages = [
  { file: 'home.png', title: 'ARTIDOM', subtitle: 'Custom Kitchens & Furniture in Montenegro' },
  { file: 'workshop.png', title: 'Workshop', subtitle: 'Custom Furniture Production in Bar' },
  { file: 'catalog.png', title: 'Catalog', subtitle: 'Kitchens, Wardrobes & Joinery' },
  { file: 'projects.png', title: 'Projects', subtitle: 'Selected Work in Montenegro' },
  { file: 'contact.png', title: 'Contact', subtitle: 'Get a Free Estimate' },
  { file: 'residential.png', title: 'Residential', subtitle: 'Apartment Kitchens & Furnishing' },
  { file: 'horeca.png', title: 'HoReCa', subtitle: 'Restaurant & Hotel Furniture' },
  { file: 'workspace.png', title: 'Workspace', subtitle: 'Office & Clinic Furniture' },
  { file: 'education.png', title: 'Education', subtitle: 'School & Public Zone Joinery' },
];

const fontPath = join(process.cwd(), 'scripts', 'Inter-Regular.ttf');
const fontData = readFileSync(fontPath);

async function generateOgImage(title: string, subtitle: string): Promise<Buffer> {
  const svg = await satori(
    {
      type: 'div',
      props: {
        style: {
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          padding: '80px',
          backgroundColor: '#2d2a26',
          position: 'relative',
        },
        children: [
          {
            type: 'div',
            props: {
              style: { width: '60px', height: '3px', backgroundColor: '#7a826e', marginBottom: '40px' },
            },
          },
          {
            type: 'div',
            props: {
              style: {
                fontSize: title.length > 40 ? '48px' : '64px',
                color: '#fdfaf5',
                fontWeight: 300,
                fontStyle: 'italic',
                lineHeight: 1.15,
                maxWidth: '800px',
                marginBottom: '24px',
              },
              children: title,
            },
          },
          {
            type: 'div',
            props: {
              style: {
                fontSize: '24px',
                color: '#e5e0d8',
                fontWeight: 300,
                letterSpacing: '1px',
                maxWidth: '700px',
                opacity: 0.7,
              },
              children: subtitle,
            },
          },
          {
            type: 'div',
            props: {
              style: {
                position: 'absolute',
                bottom: '50px',
                left: '80px',
                display: 'flex',
                alignItems: 'center',
                gap: '16px',
              },
              children: [
                {
                  type: 'div',
                  props: {
                    style: { fontSize: '28px', color: '#fdfaf5', fontStyle: 'italic', fontWeight: 300, letterSpacing: '3px' },
                    children: 'Artidom',
                  },
                },
                {
                  type: 'div',
                  props: { style: { width: '1px', height: '20px', backgroundColor: '#7a826e' } },
                },
                {
                  type: 'div',
                  props: {
                    style: { fontSize: '13px', color: '#7a826e', letterSpacing: '3px', textTransform: 'uppercase' as const },
                    children: 'artidom.art',
                  },
                },
              ],
            },
          },
        ],
      },
    },
    {
      width: WIDTH,
      height: HEIGHT,
      fonts: [{ name: 'Inter', data: fontData, weight: 400, style: 'normal' as const }],
    },
  );

  return sharp(Buffer.from(svg)).png({ quality: 90 }).toBuffer();
}

async function main() {
  if (!existsSync(OUT_DIR)) mkdirSync(OUT_DIR, { recursive: true });

  for (const page of pages) {
    const buffer = await generateOgImage(page.title, page.subtitle);
    const outPath = join(OUT_DIR, page.file);
    writeFileSync(outPath, buffer);
    console.log(`Done: ${page.file} (${(buffer.length / 1024).toFixed(0)} KB)`);
  }

  console.log(`\nGenerated ${pages.length} OG images in public/og/`);
}

main().catch(console.error);
