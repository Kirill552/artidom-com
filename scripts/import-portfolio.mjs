// Portfolio import pipeline: source photos -> public/images/projects/<slug>/<NN>.webp
// Corrections (conservative): cast = modulate brightness/sat + hue rotate;
// dehaze = linear contrast + saturation; lowres = gentle sharpen.
import sharp from 'sharp';
import { mkdir, stat } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.dirname(path.dirname(fileURLToPath(import.meta.url)));
const SRC = 'C:/Users/whirp/Desktop/Dev/site_vova/docs';

const FIXES = {
  magenta: (img) => img.modulate({ brightness: 1.06, saturation: 0.88, hue: -12 }),
  warmcast: (img) => img.modulate({ brightness: 1.06, saturation: 0.88, hue: 8 }),
  lift: (img) => img.modulate({ brightness: 1.06, saturation: 0.88 }),
  dehaze: (img) => img.linear(1.08, -6).modulate({ saturation: 1.12 }),
  lowres: (img) => img.sharpen({ sigma: 0.8 }),
};

const jobs = [
  // CHICKO
  { src: 'portfolio_selected/CHICKO/Ставрополь.jpg', slug: 'chicko-restaurant', out: '01.webp', fix: 'magenta' },
  { src: 'photo/chicko/photo_5267340135563465806_y.jpg', slug: 'chicko-restaurant', out: '02.webp' },
  { src: 'portfolio_selected/CHICKO/photo_5267340135563465817_y.jpg', slug: 'chicko-restaurant', out: '03.webp' },
  { src: 'photo/chicko/photo_5267340135563465807_y.jpg', slug: 'chicko-restaurant', out: '04.webp' },
  { src: 'portfolio_selected/CHICKO/photo_5267340135563465810_y.jpg', slug: 'chicko-restaurant', out: '05.webp' },
  // Hochupuri
  { src: 'portfolio_selected/хочупури/moscow.jpg', slug: 'hochupuri-moscow', out: '01.webp', fix: 'warmcast' },
  { src: 'portfolio_selected/хочупури/photo_5271672151247361061_y.jpg', slug: 'hochupuri-moscow', out: '02.webp' },
  { src: 'portfolio_selected/хочупури/photo_5271672151247361062_y.jpg', slug: 'hochupuri-moscow', out: '03.webp' },
  { src: 'portfolio_selected/хочупури/photo_5271672151247361068_y.jpg', slug: 'hochupuri-moscow', out: '04.webp' },
  { src: 'portfolio_selected/хочупури/photo_5278590862524879537_y.jpg', slug: 'hochupuri-moscow', out: '05.webp' },
  // Atlantik
  { src: 'portfolio_selected/stoiki kafe_gazprom/kafe_atlantik_4.webp', slug: 'atlantik-hotel-bar', out: '01.webp', fix: 'warmcast' },
  { src: 'portfolio_selected/stoiki kafe_gazprom/atlantik_bar.webp', slug: 'atlantik-hotel-bar', out: '02.webp', fix: 'warmcast' },
  { src: 'portfolio_selected/stoiki kafe_gazprom/kafe_atlantik_6-768x576.webp', slug: 'atlantik-hotel-bar', out: '03.webp' },
  { src: 'portfolio_selected/stoiki kafe_gazprom/fartuna2-768x576.webp', slug: 'atlantik-hotel-bar', out: '04.webp' },
  // School canteen
  { src: 'portfolio_selected/01_Hero/hero_school_cafe.jpg', slug: 'school-canteen', out: '01.webp' },
  { src: 'photo/shcool/photo_5258267339273213464_y.jpg', slug: 'school-canteen', out: '02.webp' },
  { src: 'photo/shcool/photo_5258267339273213467_y.jpg', slug: 'school-canteen', out: '03.webp' },
  { src: 'photo/shcool/photo_5258267339273213472_y.jpg', slug: 'school-canteen', out: '04.webp' },
  { src: 'photo/shcool/photo_5258267339273213490_y.jpg', slug: 'school-canteen', out: '05.webp' },
  // Wall panels
  { src: 'photo/стеновые панели/DSC04268.JPG', slug: 'wall-panels-hall', out: '01.webp', fix: 'dehaze' },
  { src: 'photo/стеновые панели/DSC04265.JPG', slug: 'wall-panels-hall', out: '02.webp', fix: 'dehaze' },
  { src: 'photo/стеновые панели/IMG_1888.JPG', slug: 'wall-panels-hall', out: '03.webp', fix: 'lift' },
  // Chaiburg
  { src: 'portfolio_selected/чайбург/52983703_2056276854470562_1950310744641765376_n.jpg', slug: 'chaiburg-kiosk', out: '01.webp', fix: 'lowres' },
  { src: 'portfolio_selected/чайбург/53160542_2056277004470547_6032636181206794240_n.jpg', slug: 'chaiburg-kiosk', out: '02.webp', fix: 'lowres' },
  // Burger King
  { src: 'photo/burger_king/IMAG0037.jpg', slug: 'burger-king-ekaterinburg', out: '01.webp' },
  { src: 'photo/burger_king/IMAG0034.jpg', slug: 'burger-king-ekaterinburg', out: '02.webp' },
];

for (const job of jobs) {
  const srcPath = path.join(SRC, job.src);
  const outDir = path.join(root, 'public/images/projects', job.slug);
  await mkdir(outDir, { recursive: true });
  const outPath = path.join(outDir, job.out);

  let img = sharp(srcPath);
  if (job.fix) img = FIXES[job.fix](img);
  await img.resize({ width: 2000, withoutEnlargement: true }).webp({ quality: 74 }).toFile(outPath);

  const s = await stat(outPath);
  console.log(`${job.slug}/${job.out} ${(s.size / 1024).toFixed(0)} KB${job.fix ? ` [${job.fix}]` : ''} <- ${job.src}`);
}
