# SEO-аудит artidom.art — план реализации v2

> **For agentic workers:** REQUIRED: Use superpowers:subagent-driven-development (if subagents available) or superpowers:executing-plans to implement this plan. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Исправить SEO-проблемы artidom.art и создать блог-систему для ранжирования по ключевым запросам в Черногории.

**Architecture:** 7 блоков: quick fixes (sitemap, dead code, llms.txt), schema (geo, breadcrumbs), FAQ, blog. Все изменения внутри `artodom_com/`. Деплой: `git push origin main` → Vercel auto-build.

**Tech Stack:** Next.js 16, next-intl 4.8, TypeScript, JSON-LD structured data

**Spec:** `docs/superpowers/specs/2026-03-13-artidom-art-seo-audit-design.md`

---

## Chunk 1: Quick fixes (блоки 1-3)

### Task 1: Sitemap — убрать /solutions redirect

**Files:**
- Modify: `src/app/sitemap.ts:16`

- [ ] **Step 1: Удалить /solutions из staticPages**

В `src/app/sitemap.ts` удалить строку:
```typescript
    { path: '/solutions', priority: 0.7, lastModified: '2026-03-08' },
```

- [ ] **Step 2: Проверить билд**

Run: `cd C:/Users/whirp/Desktop/Dev/site_vova/artodom_com && npm run build`
Expected: Build succeeds

- [ ] **Step 3: Commit**

```bash
git add src/app/sitemap.ts
git commit -m "fix(seo): убрать redirect /solutions из sitemap"
```

---

### Task 2: Dead code — удалить getProjectSchema

**Files:**
- Modify: `src/lib/seo/schema.ts:123-142`

- [ ] **Step 1: Проверить что getProjectSchema нигде не импортируется**

Run: `grep -r "getProjectSchema" src/`
Expected: Только определение в schema.ts, никаких импортов

- [ ] **Step 2: Удалить функцию getProjectSchema**

В `src/lib/seo/schema.ts` удалить строки 123-142 (функция `getProjectSchema` целиком).

- [ ] **Step 3: Commit**

```bash
git add src/lib/seo/schema.ts
git commit -m "refactor: удалить неиспользуемый getProjectSchema"
```

---

### Task 3: llms.txt + llms-full.txt — обновить контакты

**Files:**
- Modify: `public/llms.txt:21-25`
- Modify: `public/llms-full.txt:94-100`

- [ ] **Step 1: Обновить llms.txt секцию Contact**

Заменить текущую секцию Contact в `public/llms.txt` на:
```
## Contact
- Veronika: +382 69 256 978
- Vladimir: +382 68 282 371
- Email: artidom96@gmail.com
- WhatsApp: +7 912 037 0170
- Viber: +7 912 037 0170
- Address: Mirošica 2, Sutomore, 85000 Bar, Montenegro
```

- [ ] **Step 2: Обновить llms-full.txt секцию Contact**

Заменить текущую секцию Contact в `public/llms-full.txt` на:
```
## Contact
- Veronika: +382 69 256 978
- Vladimir: +382 68 282 371
- Email: artidom96@gmail.com
- WhatsApp: +7 912 037 0170
- Viber: +7 912 037 0170
- Address: Mirošica 2, Sutomore, 85000 Bar, Montenegro
- Working hours: Mon-Fri 09:00-18:00
```

- [ ] **Step 3: Commit**

```bash
git add public/llms.txt public/llms-full.txt
git commit -m "fix(seo): обновить контакты в llms.txt — добавить Vladimir, Viber"
```

---

## Chunk 2: Schema improvements (блоки 4, 6)

### Task 4: Гео-привязка — serviceArea + расширение городов

**Files:**
- Modify: `src/lib/seo/schema.ts`

- [ ] **Step 1: Добавить serviceArea с GeoCircle в getSchemaData()**

После `areaServed` массива добавить:
```typescript
    "serviceArea": {
      "@type": "GeoCircle",
      "geoMidpoint": {
        "@type": "GeoCoordinates",
        "latitude": 42.0931,
        "longitude": 19.1003
      },
      "geoRadius": "150000"
    },
```

- [ ] **Step 2: Расширить areaServed городами**

Добавить в массив `areaServed`:
```typescript
      {
        "@type": "City",
        "name": "Herceg Novi"
      },
      {
        "@type": "City",
        "name": "Ulcinj"
      },
      {
        "@type": "City",
        "name": "Nikšić"
      },
      {
        "@type": "City",
        "name": "Cetinje"
      },
      {
        "@type": "City",
        "name": "Sutomore"
      }
```

- [ ] **Step 3: Проверить билд**

Run: `npm run build`
Expected: Build succeeds

- [ ] **Step 4: Commit**

```bash
git add src/lib/seo/schema.ts
git commit -m "feat(seo): serviceArea GeoCircle + расширение городов Черногории"
```

---

### Task 5: BreadcrumbList schema

**Files:**
- Create: `src/lib/seo/breadcrumbs.ts`
- Modify: `src/messages/en.json` (Breadcrumbs namespace)
- Modify: `src/messages/sr.json` (Breadcrumbs namespace)
- Modify: pages с глубиной > 1 уровня

- [ ] **Step 1: Создать breadcrumbs.ts**

Создать `src/lib/seo/breadcrumbs.ts`:
```typescript
const siteUrl = 'https://artidom.art';

type BreadcrumbItem = {
  name: string;
  url: string;
};

export function getBreadcrumbSchema(items: BreadcrumbItem[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": items.map((item, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "name": item.name,
      "item": item.url,
    })),
  };
}

export function buildBreadcrumbs(
  locale: string,
  segments: Array<{ key: string; label: string }>
): BreadcrumbItem[] {
  const items: BreadcrumbItem[] = [
    { name: locale === 'sr' ? 'Početna' : 'Home', url: `${siteUrl}/${locale}` },
  ];

  let path = `${siteUrl}/${locale}`;
  for (const segment of segments) {
    path += `/${segment.key}`;
    items.push({ name: segment.label, url: path });
  }

  return items;
}
```

- [ ] **Step 2: Добавить переводы Breadcrumbs**

В `src/messages/en.json` добавить:
```json
"Breadcrumbs": {
  "home": "Home",
  "catalog": "Catalog",
  "projects": "Projects",
  "solutions": "Solutions",
  "residential": "Residential",
  "horeca": "HoReCa",
  "education": "Education",
  "workspace": "Workspace",
  "workshop": "Workshop",
  "contact": "Contact",
  "blog": "Blog"
}
```

В `src/messages/sr.json` добавить:
```json
"Breadcrumbs": {
  "home": "Početna",
  "catalog": "Katalog",
  "projects": "Projekti",
  "solutions": "Rješenja",
  "residential": "Stanovi",
  "horeca": "HoReCa",
  "education": "Obrazovanje",
  "workspace": "Radni prostor",
  "workshop": "Radionica",
  "contact": "Kontakt",
  "blog": "Blog"
}
```

- [ ] **Step 3: Добавить BreadcrumbList на /solutions/* страницы**

В каждой странице (`residential/page.tsx`, `horeca/page.tsx`, `education/page.tsx`, `workspace/page.tsx`) добавить JSON-LD:

```tsx
import { getBreadcrumbSchema, buildBreadcrumbs } from '@/lib/seo/breadcrumbs';
import { getTranslations } from 'next-intl/server';

// В компоненте:
const t = await getTranslations({ locale, namespace: 'Breadcrumbs' });
const breadcrumbs = buildBreadcrumbs(locale, [
  { key: 'solutions', label: t('solutions') },
  { key: 'residential', label: t('residential') },
]);

// В JSX:
<script
  type="application/ld+json"
  dangerouslySetInnerHTML={{ __html: JSON.stringify(getBreadcrumbSchema(breadcrumbs)) }}
/>
```

- [ ] **Step 4: Добавить BreadcrumbList на /catalog/[slug] и /projects/[slug]**

Аналогично step 3, breadcrumbs: Home > Catalog > {itemName} и Home > Projects > {projectName}.

- [ ] **Step 5: Проверить билд**

Run: `npm run build`
Expected: Build succeeds

- [ ] **Step 6: Commit**

```bash
git add src/lib/seo/breadcrumbs.ts src/messages/ src/app/
git commit -m "feat(seo): BreadcrumbList JSON-LD для вложенных страниц"
```

---

## Chunk 3: FAQ (блок 5)

### Task 6: FAQ schema + контент

**Files:**
- Modify: `src/lib/seo/schema.ts` (добавить getFaqSchema)
- Modify: `src/messages/en.json` (FAQ namespace)
- Modify: `src/messages/sr.json` (FAQ namespace)
- Modify: `src/app/[locale]/solutions/residential/page.tsx`
- Modify: `src/app/[locale]/workshop/page.tsx`

- [ ] **Step 1: Добавить getFaqSchema в schema.ts**

В `src/lib/seo/schema.ts` добавить:
```typescript
export function getFaqSchema(questions: Array<{ question: string; answer: string }>) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": questions.map((q) => ({
      "@type": "Question",
      "name": q.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": q.answer,
      },
    })),
  };
}
```

- [ ] **Step 2: Добавить FAQ переводы в en.json**

```json
"FAQ": {
  "title": "Frequently Asked Questions",
  "residential": [
    { "q": "How long does a custom kitchen take?", "a": "3-5 weeks from approval of drawings and materials." },
    { "q": "Do you deliver outside Bar?", "a": "Yes. Measurement, delivery and installation across Montenegro: Budva, Tivat, Kotor, Podgorica." },
    { "q": "Can you furnish a whole apartment?", "a": "Yes. Kitchen + wardrobes + storage + TV wall + bathroom joinery in one package from one workshop." },
    { "q": "How much does a custom kitchen cost in Montenegro?", "a": "Price depends on size, materials and layout. Send a floor plan for a free estimate within 24 hours." }
  ],
  "workshop": [
    { "q": "What materials do you use?", "a": "European-grade oak, veneer, lacquered MDF, compact HPL and stone tops. Blum and Hettich fittings." },
    { "q": "Do you work with architects and developers?", "a": "Yes. We take B2B and HoReCa projects with technical drawings (DWG, PDF)." },
    { "q": "Where is your workshop?", "a": "Sutomore, Bar, Montenegro. 300 sqm production floor with CNC cutting, assembly and finishing." }
  ]
}
```

- [ ] **Step 3: Добавить FAQ переводы в sr.json**

```json
"FAQ": {
  "title": "Često postavljana pitanja",
  "residential": [
    { "q": "Koliko vremena treba za kuhinju po mjeri?", "a": "3-5 sedmica od odobrenja crteža i materijala." },
    { "q": "Da li isporučujete van Bara?", "a": "Da. Mjerenje, isporuka i montaža širom Crne Gore: Budva, Tivat, Kotor, Podgorica." },
    { "q": "Možete li opremiti cijeli apartman?", "a": "Da. Kuhinja + plakari + ormarići + TV zid + kupatilski namještaj u jednom paketu iz jedne radionice." },
    { "q": "Koliko košta kuhinja po mjeri u Crnoj Gori?", "a": "Cijena zavisi od veličine, materijala i rasporeda. Pošaljite tlocrt za besplatnu procjenu u roku od 24 sata." }
  ],
  "workshop": [
    { "q": "Koje materijale koristite?", "a": "Evropski hrast, furnir, lakirani MDF, kompakt HPL i kamene ploče. Blum i Hettich okovi." },
    { "q": "Radite li sa arhitektama i investitorima?", "a": "Da. Prihvatamo B2B i HoReCa projekte sa tehničkim crtežima (DWG, PDF)." },
    { "q": "Gdje se nalazi vaša radionica?", "a": "Sutomore, Bar, Crna Gora. 300 m² proizvodnog prostora sa CNC rezanjem, montažom i završnom obradom." }
  ]
}
```

- [ ] **Step 4: Добавить FAQ секцию на /solutions/residential**

В `src/app/[locale]/solutions/residential/page.tsx` после основного контента добавить:
```tsx
// FAQ section
const t = await getTranslations({ locale, namespace: 'FAQ' });
const faqItems = locale === 'sr'
  ? [/* sr items */]
  : [/* en items */];
// Читать из messages через useTranslations или raw import

<section>
  <h2>{t('title')}</h2>
  {questions.map((item, i) => (
    <details key={i}>
      <summary>{item.q}</summary>
      <p>{item.a}</p>
    </details>
  ))}
</section>

<script
  type="application/ld+json"
  dangerouslySetInnerHTML={{
    __html: JSON.stringify(getFaqSchema(
      questions.map(item => ({ question: item.q, answer: item.a }))
    ))
  }}
/>
```

- [ ] **Step 5: Добавить FAQ секцию на /workshop**

Аналогично step 4, с `FAQ.workshop` вопросами.

- [ ] **Step 6: Проверить билд**

Run: `npm run build`
Expected: Build succeeds

- [ ] **Step 7: Commit**

```bash
git add src/lib/seo/schema.ts src/messages/ src/app/
git commit -m "feat(seo): FAQ секции + FAQPage JSON-LD для AI-видимости"
```

---

## Chunk 4: Блог-система (блок 7)

### Task 7: Blog data layer

**Files:**
- Create: `src/lib/blog.ts`

- [ ] **Step 1: Создать типы и helpers в blog.ts**

```typescript
export type BlogPost = {
  slug: string;
  locale: 'sr' | 'en';
  title: string;
  excerpt: string;
  body: string;
  date: string;
  tags: string[];
};

export function getBlogPostsByLocale(locale: string): BlogPost[] {
  return blogPosts.filter(p => p.locale === locale);
}

export function getBlogPost(slug: string, locale: string): BlogPost | undefined {
  return blogPosts.find(p => p.slug === slug && p.locale === locale);
}

export function getAllBlogSlugs(): Array<{ slug: string; locale: string }> {
  return blogPosts.map(p => ({ slug: p.slug, locale: p.locale }));
}
```

- [ ] **Step 2: Написать 3 поста на SR**

Посты 500-800 слов каждый:
1. `kuhinje-po-mjeri-bar` — кухни по мери в Баре, с упоминанием процесса, материалов, сроков
2. `namjestaj-po-mjeri-crna-gora` — намештај по мери, покрытие всей Черногории
3. `opremanje-apartmana-crna-gora` — опремање апартмана, пакетное решение

Каждый с внутренними ссылками на `/sr/catalog` и `/sr/solutions/residential`.

- [ ] **Step 3: Написать 3 поста на EN**

1. `custom-kitchens-bar-montenegro`
2. `custom-furniture-montenegro`
3. `apartment-furnishing-montenegro`

Каждый с внутренними ссылками на `/en/catalog` и `/en/solutions/residential`.

- [ ] **Step 4: Commit**

```bash
git add src/lib/blog.ts
git commit -m "feat(blog): data layer с 6 SEO-постами (SR + EN)"
```

---

### Task 8: Blog post page

**Files:**
- Create: `src/app/[locale]/blog/[slug]/page.tsx`
- Modify: `src/messages/en.json`, `sr.json` (Blog namespace)

- [ ] **Step 1: Добавить Blog переводы**

В `en.json`:
```json
"Blog": {
  "meta": { "title": "Blog — ARTIDOM", "description": "Articles about custom furniture, kitchens and apartment furnishing in Montenegro." },
  "back": "Back to blog",
  "published": "Published",
  "readMore": "Read more"
}
```

В `sr.json`:
```json
"Blog": {
  "meta": { "title": "Blog — ARTIDOM", "description": "Članci o namještaju po mjeri, kuhinjama i opremanju apartmana u Crnoj Gori." },
  "back": "Nazad na blog",
  "published": "Objavljeno",
  "readMore": "Pročitajte više"
}
```

- [ ] **Step 2: Создать blog/[slug]/page.tsx**

```typescript
import { getBlogPost, getAllBlogSlugs } from '@/lib/blog';
import { notFound } from 'next/navigation';
import { buildMetadata } from '@/lib/seo/page-metadata';
import { getBreadcrumbSchema, buildBreadcrumbs } from '@/lib/seo/breadcrumbs';
import type { AppLocale } from '@/i18n/locale-config';

export function generateStaticParams() {
  return getAllBlogSlugs();
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string; slug: string }> }) {
  const { locale, slug } = await params;
  const post = getBlogPost(slug, locale);
  if (!post) return {};

  return buildMetadata({
    locale: locale as AppLocale,
    path: `/blog/${slug}`,
    title: post.title,
    description: post.excerpt,
  });
}

export default async function BlogPostPage({ params }: { params: Promise<{ locale: string; slug: string }> }) {
  const { locale, slug } = await params;
  const post = getBlogPost(slug, locale);
  if (!post) notFound();

  const breadcrumbs = buildBreadcrumbs(locale, [
    { key: 'blog', label: locale === 'sr' ? 'Blog' : 'Blog' },
    { key: slug, label: post.title },
  ]);

  return (
    <article>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(getBreadcrumbSchema(breadcrumbs)) }}
      />
      <h1>{post.title}</h1>
      <time dateTime={post.date}>{new Date(post.date).toLocaleDateString(locale === 'sr' ? 'sr-Latn-ME' : 'en-US')}</time>
      <div dangerouslySetInnerHTML={{ __html: post.body }} />
    </article>
  );
}
```

- [ ] **Step 3: Проверить билд**

Run: `npm run build`
Expected: Build succeeds, blog post pages generated

- [ ] **Step 4: Commit**

```bash
git add src/app/ src/messages/
git commit -m "feat(blog): страница поста с meta + breadcrumbs"
```

---

### Task 9: Sitemap — добавить blog posts

**Files:**
- Modify: `src/app/sitemap.ts`

- [ ] **Step 1: Добавить blog posts в sitemap**

В `src/app/sitemap.ts` добавить импорт и итерацию:
```typescript
import { blogPosts } from '@/lib/blog';

// После существующих итераций (projects):
for (const post of blogPosts) {
  entries.push({
    url: `${BASE_URL}/${post.locale}/blog/${post.slug}`,
    lastModified: new Date(post.date),
    changeFrequency: 'monthly' as const,
    priority: 0.6,
  });
}
```

- [ ] **Step 2: Проверить билд**

Run: `npm run build`
Expected: Build succeeds

- [ ] **Step 3: Commit**

```bash
git add src/app/sitemap.ts
git commit -m "feat(seo): blog posts в sitemap"
```

---

## Финальная проверка

- [ ] `npm run build` — полный билд без ошибок
- [ ] Проверить HTML вывод: JSON-LD содержит LocalBusiness + serviceArea + GeoCircle
- [ ] Проверить HTML вывод: BreadcrumbList на вложенных страницах
- [ ] Проверить HTML вывод: FAQPage на residential и workshop
- [ ] Проверить sitemap: нет /solutions, есть 6 blog posts
- [ ] Проверить llms.txt: Veronika, Vladimir, WhatsApp, Viber
- [ ] Проверить что getProjectSchema удалён
