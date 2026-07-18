# Night Showroom — план реализации редизайна artidom.art

> **Для исполнителя:** план выполняется задача за задачей, все работы ТОЛЬКО в ворктри `kimi_desing` (ветка `kimi_desing` репозитория artodom_com). Коммиты — только после явного разрешения пользователя (партиями по фазам). Деплой на прод — НИКОГДА без отдельной команды.

**Goal:** Применить утверждённую концепцию «Night Showroom» (см. `design-mockups/CONCEPT.md`, эталон — `design-mockups/index.html` v2 и `design-mockups/projects.html`) ко всему сайту artodom.art: тёмная палитра sitewide, кинематографичная главная, сдержанные тёмные внутренние страницы. Тексты, URL, SEO-разметка, аналитика — без изменений.

**Architecture:** Токены и шрифты меняются централизованно (variables.css + layout.tsx), что делает сайт тёмным «бесплатно»; дальше каждая страница точечно чистится от хардкода и получает свой layout-паттерн (антислоп: у каждого типа страниц — свой паттерн, не одна сетка карточек на всё). Главная собирается заново по макету v2 в `src/features/home-v2/`. GSAP — один клиентский островок для пин-сцены, lazy. Всё остальное — чистый CSS.

**Tech Stack:** Next.js 16 (RSC), next-intl 4.8 (sr/en/ru), CSS Modules, next/font (Unbounded + Commissioner), GSAP 3.13 (только пин-сцена), node:test.

**Жёсткие инварианты (проверять в каждой задаче):**
- Тексты из `src/messages/*.json` НЕ меняются (кроме случаев, явно оговоренных в задаче). H1, meta, JSON-LD, hreflang, sitemap, slugs — не трогаем.
- Атрибуты `data-speakable` сохраняются в разметке (Hero, SectorPage, ResidentialLocalPage, workshop intro).
- Поля форм: `name, phone, email, company, projectType (contact), country (contact), message, website (honeypot)` — имена не менять.
- События аналитики: `contact_form_submit`, `cta_request_estimate`, `phone_click`, `whatsapp_click`, `viber_click` — все вызовы `trackLeadEvent` на месте.
- `?photo=N` контракт галереи проекта (`ProjectGallery`) не ломать.
- Контент читается без JS: reveal-классы ставит JS (паттерн `.js .rv`), veil — CSS-only с noscript-отключением, пин-сцена деградирует в статичный список.
- Контрасты: body-текст ≥4.5:1, крупный текст ≥3:1 (ink-dim на surface-night ≈ 7:1 — ок).
- Моушн-кодекс: только transform/opacity/clip-path/filter; нет `transition: all`, `ease-in`, `scale(0)`; hover под `@media (hover:hover) and (pointer:fine)`; reduced-motion — статика/opacity ≤200ms.

---

## Аудит внутренних страниц (что с чем делаем)

| Страница | Сейчас (слоп-риск) | Решение в Night Showroom |
|---|---|---|
| `/projects` | Сетка карточек с градиент-оверлеем на фото | Как в макете `projects.html`: асимметричная сетка (3+3+2... ритм 4:3 / 3:3.6 / 2.4:1), подписи ПОД фото (никаких пилюль на изображениях), hover = подсветка снизу + scale 1.03 |
| `/projects/[slug]` | Hero 65vh + галерея | Кинематографичный hero со scrim (без load-анимации — вход только на главной), мета-строка, тёмный lightbox с янтарными контролами. Цель View Transition с главной |
| `/catalog` | Табы-пилюли + 3 одинаковые карточки = ecommerce-шаблон | Фильтры — тихие текстовые кнопки с янтарным подчёркиванием (не пилюли); асимметричная сетка как на projects (первый элемент шире); удалить мёртвый CSS `.tabs/.grid/.card` из `catalog/page.module.css` |
| `/catalog/[slug]` | Таблица спецификаций | dl-строки с hairline (5 строк — норма), тёмная галерея, CTA-кнопка янтарная |
| `/workshop` | Hero БЕЗ фото (серая заливка!), сетка 4 одинаковых шага, 3 карточки материалов | Hero с реальным фото цеха + scrim; шаги — крупные строки с Unbounded-цифрами (не пин-сцена — она эксклюзив главной); материалы — асимметричный ряд с фото |
| `/solutions/*` (SectorPage) | Две колонки-списка pain/solution | Строки «проблема → решение» с hairline и стрелкой; hero со scrim; `data-speakable` на месте |
| `/solutions/residential/[slug]` | Карточки bg-muted, note с border-left 2px | Токены dark; **border-left stripe — ЗАПРЕЩЁН** (impeccable): заменить на hairline-top или bg-tint |
| `/blog` | Карточки 2-кол | Текстовый индекс: строки (дата, тег, заголовок), первый пост с фото. Отличается от projects/catalog паттерном — правило «разные layout-семьи» |
| `/blog/[slug]` | Светлая статья, стили только h2/p | Тёмное чтение: measure 68ch, Commissioner; расширить стили тела (h3, ul, blockquote, a, strong, img radius 12) |
| `/contact` | Светлая форма | Тёмный сплит; hairline-инпуты как в CTA; ошибки — функциональный красный `oklch(0.65 0.17 45)` (семантика, не акцент) |
| Nav/Footer | Светлые; lang-switcher = полная перезагрузка | Тёмный blur-nav; lang-switcher — клиентский `router.replace` через next-intl (без reload, сохраняет скролл); Footer уже тёмный — отделить hairline-top |
| Lightbox | z-index 9999, белый текст | Семантическая шкала z (overlay=90); янтарные контролы |
| OG-изображения `/og/*.png` | Светлые | Фаза «опционально» в конце — регенерировать тёмные, не блокер |

---

## Phase 0 — подготовка

### Task 0.1: Тест-раннер и базовая проверка

**Files:** Modify `package.json` (scripts)

Сейчас тесты есть (`src/**/*.test.ts`, 6 файлов), но нет скрипта запуска. Добавить:

```json
"test": "node --experimental-strip-types --test \"src/**/*.test.ts\""
```

**Verify:** `cd artodom_com(worktree) && npm test` — 6 файлов зелёные (если флаг strip-types ругается на версии Node — уточнить `node -v`, Node ≥22.18/≥24 идёт с type stripping по умолчанию; тогда просто `node --test`).
**Verify:** `npm run build` зелёный ДО начала работ (базовая линия).
**Commit:** `chore: add test script` (с разрешения).

### Task 0.2: Ассеты главной

**Files:**
- Create: `public/images/hero/hero-evening.webp` — из `design-mockups/assets/hero-evening.jpg` (временное фото из архива владельца; конвертация sharp, q≈72, max-width 2400)
- Compress: `public/images/projects/horeca-counters/*.webp` — 7.3MB → цель ≤250KB на файл (указано в спеке 16.07 как фаза 0)

Скрипт: `scripts/optimize-images.mjs` (sharp из devDependencies), запуск `node scripts/optimize-images.mjs`. НЕ коммитить скрипт, если решим одноразово — обсудить.

**Verify:** `ls -la public/images/hero/`, размеры; `npm run build` не сломан; визуально фото на месте.
**Commit:** `chore: add hero asset, recompress horeca photos`.

### Task 0.3: Шрифты — проверка кириллицы

Unbounded (500, 600) и Commissioner (400, 500, 600) — оба имеют кириллицу и latin-ext на Google Fonts. Проверить рендер «čćžšđ ČĆŽŠĐ» и «Кухње њаместај» до интеграции: открыть `design-mockups/fonts-test.html` (создать: одна страница с двумя семействами, все веса).

**Verify:** скриншот, глазами ок.

---

## Phase 1 — токены и шрифты (сайт становится тёмным)

### Task 1.1: variables.css — Night Showroom

**Files:** Modify `src/app/[locale]/variables.css` (19 строк → полная замена)

```css
:root {
  /* Night Showroom — forced dark theme (2026-07 redesign) */
  --surface-night: oklch(0.17 0.01 50);
  --surface-deep: oklch(0.12 0.008 50);
  --surface-elevated: oklch(0.22 0.012 55);
  --hairline: oklch(0.95 0.015 85 / 0.10);
  --ink-warm: oklch(0.95 0.015 85);
  --ink-dim: oklch(0.72 0.02 75);
  --amber-light: oklch(0.78 0.14 75);
  --amber-deep: oklch(0.62 0.15 60);
  --error: oklch(0.65 0.17 45);
  --glow-under: 0 14px 44px -12px oklch(0.78 0.14 75 / 0.28);
  --radius: 12px;
  --ease-out-brand: cubic-bezier(0.23, 1, 0.32, 1);
  --ease-in-out-brand: cubic-bezier(0.77, 0, 0.175, 1);

  /* legacy aliases — существующие CSS-модули продолжают работать */
  --color-bg: var(--surface-night);
  --color-text: var(--ink-warm);
  --color-accent: var(--amber-light);
  --color-muted: var(--surface-elevated);
  --color-white: #ffffff;
  --space-unit: 1rem;
  --container-max: 1400px;
  --shadow-soft: 0 10px 30px -10px oklch(0 0 0 / 0.5);
  --shadow-float: var(--glow-under);
  --transition-smooth: 0.3s var(--ease-out-brand);
}
```

**Verify:** `npm run dev`, весь сайт тёмный; ничего не «сломалось» вёрсткой (цвета — да, layout — нет).
**Commit:** `feat(design): night showroom tokens`.

### Task 1.2: Шрифты в layout.tsx

**Files:** Modify `src/app/[locale]/layout.tsx:13-26`

Заменить Outfit/Cormorant_Garamond на:

```ts
import { Commissioner, Unbounded } from 'next/font/google';

const commissioner = Commissioner({
  subsets: ['latin', 'latin-ext', 'cyrillic'],
  weight: ['400', '500', '600'],
  display: 'swap',
  variable: '--font-main',
});
const unbounded = Unbounded({
  subsets: ['latin', 'latin-ext', 'cyrillic'],
  weight: ['500', '600'],
  display: 'swap',
  variable: '--font-display',
});
```

`<html className={`${commissioner.variable} ${unbounded.variable}`}>`. Имена переменных те же → CSS-модули не трогаем.

### Task 1.3: globals.css — база

**Files:** Modify `src/app/[locale]/globals.css`

- `body`: `font-weight: 400` (было 300 — Commissioner 300 нет в наборе), `color-scheme: dark`, `background: var(--surface-night)`.
- Добавить: `::selection { background: oklch(0.78 0.14 75 / 0.3) }`, `:focus-visible { outline: 2px solid var(--amber-light); outline-offset: 3px }`, `img { display:block; max-width:100% }`.
- `a { transition: color 0.2s var(--ease-out-brand) }` (убрать transition all-properties).
- Добавить film-grain `body::after` (fixed, pointer-events none, opacity 0.045, SVG noise data-uri — скопировать из `design-mockups/index.html`).
- `.container` оставить.

**Verify:** dev, скриншоты 3 страниц; `npm run build`.
**Commit:** `feat(design): unbounded + commissioner fonts, dark globals`.

---

## Phase 2 — общий каркас (Nav, Footer, моушн-инфраструктура)

### Task 2.1: Nav — тёмный + клиентский lang-switcher

**Files:** Modify `src/components/Nav/Nav.tsx`, `Nav.module.css`

- CSS: фон `oklch(0.17 0.01 50 / 0.72)` + `backdrop-filter: blur(14px)`, hairline bottom, высота 64px, радиусы из токенов; убрать z-index 100/101 → шкала: nav=50, menu=80.
- Lang-switcher: заменить `<a href={replaceLocaleInPathname(...)}>` на кнопки с `useRouter()` из `@/i18n/routing` → `router.replace(pathname, { locale: lang })` (сохраняет скролл, без full reload). Активная локаль — `useLocale()`. Удалить неиспользуемый импорт `replaceLocaleInPathname`, если больше не нужен (его тест остаётся валидным — функция в locale-config не трогаем).
- Мобильное меню: оверлей `background: var(--surface-night)`, крупные пункты Unbounded.
- CTA-кнопка: `background: var(--amber-light); color: var(--surface-night)`, `:active scale(0.97)`, hover `var(--amber-deep)`.

**Verify:** переключение языка не перезагружает страницу (Network: нет document-запроса), скролл сохраняется; мобильное меню открывается/закрывается; контраст ссылок ок.
**Commit:** `feat(nav): dark nav, client-side locale switch`.

### Task 2.2: Footer — hairline отделение

**Files:** Modify `src/components/Footer/Footer.module.css`

Фон = `var(--surface-night)` (сливается со страницей), отделить `border-top: 1px solid var(--hairline)`, вторичный текст `var(--ink-dim)`, ссылки hover → `var(--ink-warm)`.

### Task 2.3: Моушн-инфраструктура (3 новых клиентских компонента)

**Files:**
- Create: `src/components/motion/Spotlight.tsx` — «фонарик» (fixed div, radial-gradient mix-blend screen, lerp 0.09, только fine-pointer и не reduced-motion; SSR-safe: рендерит div, логика в useEffect). Подключить в `layout.tsx` внутри провайдера (без next-intl зависимостей — можно и снаружи).
- Create: `src/components/motion/Reveal.tsx` — обёртка `<div className="rv">` + IntersectionObserver (once, threshold 0.18), сервер-рендерит детей видимыми, JS добавляет скрытие: паттерн — корневой `<html class="js">` ставит inline-скрипт в layout (`<script>document.documentElement.classList.add('js')</script>`), CSS `.js .rv {opacity:0...}` в globals.
- Create: `src/components/motion/Veil.tsx` — CSS-only «двери шоурума»: SSR-разметка с keyframes (панели уезжают, `both` fill, pointer-events none), `<noscript>`-стиль скрывает; inline-скрипт в layout читает `sessionStorage.artidom_seen` → если был, добавляет `html.veil-skip` (CSS скрывает veil мгновенно); при уходе со страницы скрипт ставит флаг. Reduced-motion: `@media (prefers-reduced-motion: reduce) { .veil { display: none } }`. Рендерить Veil только на главной (в `page.tsx` главной, не в layout).

**Verify:** первый визит — veil играет; повторный — нет; `prefers-reduced-motion` — нет; без JS — нет veil, контент виден.
**Commit:** `feat(motion): spotlight, reveal, veil infrastructure`.

### Task 2.4: CtaForm — стили и состояния

**Files:** Modify `src/app/[locale]/page.module.css` (`.ctaForm*` блок, строки 201-243)

Hairline-инпуты (border-bottom `var(--hairline)`, focus → `var(--amber-light)`), лейблы `var(--ink-dim)`, кнопка янтарная. Состояния loading/success/error уже в компоненте — стилизовать: success — рамка `oklch(0.78 0.14 75 / 0.4)` + янтарный текст; error-текст `var(--error)`.

**Verify:** форма отправляет (Network → /api/contact), success заменяет форму, события `contact_form_submit` + `cta_request_estimate` в консоли аналитики (ym/gtag стабы) — не регрессировано.

---

## Phase 3 — главная (эталон: `design-mockups/index.html`)

Новые компоненты в `src/features/home-v2/` (по архитектурной конвенции codex-плана). `page.tsx` становится тонкой композицией; после миграции удалить `src/components/Hero.tsx`, `Hero.module.css` и секции из `page.module.css`, которые переехали. JSON-LD (HowTo/FAQPage/Speakable) и `data-speakable` — перенести как есть.

### Task 3.1: Hero «Свет включается»

**Files:** Create `src/features/home-v2/HeroSection.tsx` + `HeroSection.module.css`

- SSR `<Image src="/images/hero/hero-evening.webp" fill priority fetchPriority="high">`, scrim (3 градиента из макета), 3 `.ignite` спана (чистый CSS, delays из макета: 1.05/1.25/1.45s).
- Тексты: `Index.hero.*` (label/title/description/cta) — title бьём на 3 `.clip` строки статично (per locale одинаковый смысл; для SR/RU разбивка может отличаться — проверить длину строк на трёх локалях, worst-case перенос естественный: `overflow: hidden` на строке + `<span>` с transform).
- CTA → `Link href="/contact"` (next-intl Link), secondary link → `/projects`.
- `data-speakable` на description.
- Разметка veil из Task 2.3 рендерится на этой странице.

**Verify:** скриншоты входа (t≈0.6/1.5/3s), LCP-изображение грузится первым, reduced-motion = всё видно сразу.

### Task 3.2: Proof strip + Featured case + Sectors index

**Files:** Create `src/features/home-v2/{ProofStrip,FeaturedCase,SectorIndex}.tsx` (+ CSS modules)

- ProofStrip: 3 пункта `WorkshopProof.default`, hairline-колонки (НЕ dot-разделители; существующий компонент WorkshopProof для главной заменяем, на других страницах он тоже получит dark-токены автоматически — сверить).
- FeaturedCase: данные `warm-minimal-apartment` (как сейчас, хардкод допустим — уже хардкод), layout 1.25fr/1fr, `--glow-under` под фото, dl-факты (location/scope/type из messages), `view-transition-name: featured-project` на `<Image>` (inline style `style={{ viewTransitionName: 'featured-project' }}`).
- SectorIndex: 4 строки из `Index.sectors.*`, hover-превью — клиентский подкомпонент `SectorPreview.tsx` (pointermove lerp + wipe + tilt, как в макете; только fine-pointer; превью-изображения: `/images/projects/warm-minimal-apartment/01.jpg`, `/images/projects/horeca-counters/01.webp`, `/images/projects/workspace-cover.webp`, `/images/projects/school/photo_5267340135563465942_y.jpg`). Ссылки → `/solutions/{residential,horeca,workspace,education}`.

**Verify:** hover-превью работает, на touch — нет; кликабельность строк; view-transition-name уникален на странице.

### Task 3.3: ProcessScene — пин «Свет ведёт»

**Files:** Create `src/features/home-v2/ProcessScene.tsx` (client) + CSS module; `npm i gsap@3.13` (prod dependency).

- SSR-разметка: статичный список 4 этапов (тексты `Index.process.step*` — HowTo-инвариант!) + SVG-нить. Без JS/на mobile/reduced-motion — так и остаётся списком с `.rv`-reveal.
- Усиление: `useEffect` → `matchMedia('(min-width:1024px)') && !reducedMotion && (await import('gsap'))` → динамический импорт gsap + ScrollTrigger, добавить класс `is-pinned`, таймлайн как в макете (start 'top top', end '+=300%', pin, scrub 1; нить dashoffset; узлы `.lit`; sweep-спаны xPercent -130→130 на входе каждого этапа; последний `tl.to({}, {duration: 0.4})`).
- Cleanup: `ctx.revert()` (gsap.context).
- Аналитика сцены: события `home_workshop_story_half` / `home_workshop_story_complete` через `trackLeadEvent`? В утверждённом спеке — да (50%/95%, один раз). Добавить в `lib/analytics/lead-events.ts` два новых события (имена из спека) + тест к существующему `lead-events.test.ts`.

**Verify:** пин работает, scrub без рывков; mobile = список; reduced-motion = список; bundle: gsap не в первом чанке (динамический import); `npm test` зелёный.
**Commit:** `feat(home): cinematic hero, sector index, pinned process scene`.

### Task 3.4: Pricing + FAQ + CTA + сборка page.tsx

**Files:** Create `src/features/home-v2/{PricingSection,FaqSection,CtaSection}.tsx`; Modify `src/app/[locale]/page.tsx`, `page.module.css`; Delete `src/components/Hero.tsx`, `Hero.module.css`

- Pricing: узкая колонка, текст `Index.pricing.*`, link-CTA → `/contact`.
- FAQ: существующий `FaqSection` компонент используется на нескольких страницах — для главной сделать свой с анимацией `::details-content` (interpolate-size) и plus-иконкой из макета; общий `FaqSection` тоже получит эти стили (Task 7) — решить: один компонент с пропом variant или единый апгрейд. **Решение: апгрейдим общий `FaqSection`** (одна реализация, меньше кода).
- CTA: заголовок/подзаголовок `Index.cta.*` + существующий `CtaForm` (стили из Task 2.4).
- `page.tsx`: композиция `HeroSection, ProofStrip, FeaturedCase, SectorIndex, ProcessScene, PricingSection, FaqSection, CtaSection` + Veil + JSON-LD как было. Удалить мёртвые стили из `page.module.css` (всё, что переехало; оставить `.ctaForm*`).
- Eyebrow-бюджет: 2 (hero label, case label) — проверить, что других `.label`/eyebrow на главной нет.

**Verify:** полная страница vs макет (скриншоты всех секций, 1440/1024/390); тексты побайтово из messages; `npm run build` + `npm test` зелёные.
**Commit:** `feat(home): night showroom homepage composition`.

---

## Phase 4 — Projects

### Task 4.1: projects index

**Files:** Modify `src/app/[locale]/projects/page.tsx` + `page.module.css`

- Сетка 6-кол: карточки 1-2 span 3, 3-5 span 2, 6 span 6 (ритм как в `design-mockups/projects.html`); mobile: 2-кол → 1-кол.
- Подписи ПОД фото (title + `location · year` — один middle dot, как в данных), оверлей на фото УБРАТЬ.
- Hover: `box-shadow: var(--glow-under)` + img `scale(1.03)` + `filter: brightness(0.92→1)` под `(hover:hover) and (pointer:fine)`.
- Первая карточка: `viewTransitionName: 'featured-project'` на `<Image>` (пара к Task 3.2).
- Заголовок страницы: убрать italic (Unbounded не имеет курсива) — `Projects.title` в Unbounded 500.

**Verify:** сетка на 1440/768/390; VT-имя уникально.

### Task 4.2: project [slug]

**Files:** Modify `src/app/[locale]/projects/[slug]/page.tsx` + CSS, `src/components/ImageLightbox/*`

- Hero: scrim снизу (текст читается), meta-строка (sector/location/year), Unbounded H1.
- `ImageLightbox`: overlay уже `rgba(0,0,0,0.92)` — оставить; контролы/счётчик янтарные; z-index 9999 → 90; закрытие по Esc/стрелки — на месте; `?photo=N` контракт не трогать.
- Радиусы 40px → `var(--radius)` везде на странице.

**Verify:** галерея, клавиатура, query-параметр; скриншот.
**Commit:** `feat(projects): dark gallery + cinematic project pages`.

---

## Phase 5 — Catalog

### Task 5.1: catalog index

**Files:** Modify `src/components/CatalogGrid/*`, `src/app/[locale]/catalog/page.tsx` + `page.module.css`

- Табы → тихие текстовые кнопки: `border-bottom: 1px solid transparent`, active → `border-color: var(--amber-light); color: var(--amber-light)`; убрать pill-фоны.
- Сетка: первый элемент span-широкий (асимметрия как projects, но НЕ идентичная: catalog — 2 больших + 3 обычных, подписи с meta-строкой категории), радиус 12.
- Удалить мёртвые `.tabs/.tab/.grid/.card*` стили из `catalog/page.module.css` (дубль, не используется).
- Заголовок без italic.

### Task 5.2: catalog [slug]

**Files:** Modify `src/app/[locale]/catalog/[slug]/page.module.css`

- `.specList`: hairline-строки (border-bottom между, не обе стороны), dt `var(--ink-dim)`, dd жирнее; CTA янтарная; радиусы 12.

**Verify:** фильтры переключают, сетка не скачет (CLS), скриншоты.
**Commit:** `feat(catalog): quiet filters, editorial grid`.

---

## Phase 6 — Workshop

**Files:** Modify `src/app/[locale]/workshop/page.tsx` + `page.module.css`

- Hero: добавить реальное фото (`/images/workshop/step-assembly-finishing.webp` — самое «живое»; alt из существующей trilingual alt-map) + scrim; тексты на месте (`hero_label`, `hero_title`).
- Steps: из 4-кол сетки → крупные строки (фото слева ~40%, номер Unbounded янтарный + заголовок + текст), hairline-разделители; НЕ пин.
- Materials: асимметричный ряд — первый материал крупнее (1.5fr уже есть), радиусы 12, подписи под фото.
- `data-speakable` на intro_text — проверить, что не потерялся.

**Verify:** скриншоты; JSON-LD HowTo (workshop) — тексты шагов не изменились.
**Commit:** `feat(workshop): real photo hero, editorial steps`.

---

## Phase 7 — Solutions + local landings

### Task 7.1: SectorPage

**Files:** Modify `src/components/SectorPage/*`

- Hero: scrim-градиент на изображении, label янтарный, H1 Unbounded.
- Pain/solution: из двух колонок-списков → строки: каждая пара (pain→sol) одной строкой с hairline-bottom и стрелкой `→` между (на mobile — стек). h2-заголовки колонок — Unbounded.
- CTA-кнопка янтарная.

### Task 7.2: ResidentialLocalPage + LocalSeoLinks

**Files:** Modify `src/features/local-seo/ResidentialLocalPage/*`, `src/components/LocalSeoLinks/*`

- `.note`: **убрать `border-left: 2px solid accent`** → `border-top: 1px solid var(--hairline)` + `padding-top`, текст `var(--ink-dim)`.
- `.card`: bg `var(--surface-elevated)`, радиус 12 (было 32).
- LocalSeoLinks cards: hairline-строки или elevated-плитки с подсветкой hover (выбрать плитки + `--glow-under`).

### Task 7.3: Общий FaqSection + WorkshopProof

**Files:** Modify `src/components/FaqSection/*`, `src/components/WorkshopProof/*`

- FaqSection: анимация раскрытия из макета (`interpolate-size`, `@supports`), plus-иконка; label → eyebrow стиль только если есть (сейчас `span.label` — оставить, стиль из токенов).
- WorkshopProof: `bg: var(--color-muted)` → теперь это surface-elevated (автоматически); точки-разделители заменить на hairline-колонки как ProofStrip (одинаковый паттерн — объединить: WorkshopProof и ProofStrip — ОДИН компонент с variant).

**Verify:** все страницы solutions + landings скриншотами; `data-speakable` на месте.
**Commit:** `feat(solutions): dark sector pages, hairline pattern`.

---

## Phase 8 — Blog + Contact

### Task 8.1: blog index

**Files:** Modify `src/app/[locale]/blog/page.tsx` + CSS

- Первый пост — крупная карточка с фото (как featured), остальные — текстовые строки: дата + тег `var(--ink-dim)`, заголовок Commissioner 600, hairline-bottom; hover — заголовок в янтарь.
- Никаких карточек-одинаковок с фото (отстройка от projects).

### Task 8.2: blog [slug]

**Files:** Modify `src/app/[locale]/blog/[slug]/page.module.css`

- Hero-image 55vh + scrim; article `max-width: 68ch`, Commissioner 400 1.05rem/1.75.
- `.body`: добавить стили `h3, ul/ol, blockquote (border-top/bottom hairline, НЕ border-left!), a (янтарный, underline), strong, img (radius 12), code`.
- Даты/теги `var(--ink-dim)`.

### Task 8.3: contact

**Files:** Modify `src/app/[locale]/contact/page.module.css`

- Инпуты/select/textarea: hairline стиль как CtaForm; `.errorMsg` → `var(--error)`; success-блок — как в CtaForm.
- Правая колонка: hairline-разделители между контакт-деталями.

**Verify:** форма отправляет, ошибки 400/429 отображаются, `phone_click`/`whatsapp_click`/`viber_click` на месте.
**Commit:** `feat(blog,contact): dark reading + forms`.

---

## Phase 9 — полировка (антислоп-аудит)

Чек-лист (пройти по всем страницам, фиксить точечно):
- [ ] Ни одного `—` (em-dash) в НОВОЙ разметке/стилях-комментариях (существующие тексты messages не трогаем — инвариант).
- [ ] Нет `rgba(45,42,38,…)`, `rgba(253,250,245,…)`, `#fdfaf5`, `#7a826e`, `#c44`, `white`/`#fff` литералов вне variables.css (grep по `src/`).
- [ ] Нет `border-left/right` >1px акцентных полос; нет радиусов >12px (grep `border-radius: (1[3-9]|[2-9][0-9])`).
- [ ] Нет `box-shadow` кроме токенов `--glow-under`/`--shadow-soft`.
- [ ] Eyebrow-количество: главная ≤2, остальные ≤1-2.
- [ ] Нет пилюль/тегов поверх фото; подписи под изображениями.
- [ ] Все `data-speakable` на месте (grep); JSON-LD блоки не тронуты (git diff по `<script type="application/ld+json">`).
- [ ] Reduced-motion: veil off, spotlight off, пин-сцена — список, ignite off.
- [ ] Контрасты: ink-dim/surface-night, amber/surface-night, ink-warm/elevated — ≥4.5.
- [ ] Клавиатура: меню, FAQ, галерея, форма — фокус-ринги видны.
- [ ] Мобильные 390px: нет горизонтального скролла, hero читается, сетки складываются.
- [ ] Перфоманс: hero LCP <2.5s локально; gsap не в initial chunk; изображения lazy кроме hero.
- [ ] `npm run build` + `npm test` зелёные.

**Commit:** `fix(design): anti-slop audit fixes`.

---

## Phase 10 — превью и выкатка

1. `npm run build` чистый, `npm run lint` чистый.
2. Коммит-партии по фазам (С РАЗРЕШЕНИЯ пользователя) → push ветки `kimi_desing` в origin → **Vercel preview** (не прод!). Проверить preview URL: все страницы, 3 локали, формы (лиды приходят в Telegram).
3. Мониторинг плана: после прода — Яндекс.Вебмастер + Метрика 1-2 недели (спек 16.07).
4. OG-изображения (опционально): регенерировать тёмные `/og/*.png` — отдельной задачей после утверждения превью.
5. Merge в main и прод-деплой — ТОЛЬКО по отдельной команде пользователя.

---

## Риски и решения

| Риск | Решение |
|---|---|
| Потеря позиций в Яндексе | Тексты/H1/URL/JSON-LD не меняются; фазовый раскат; мониторинг |
| GSAP ломает SSR/гидрацию | Динамический import в useEffect, gsap.context + revert; статичный fallback |
| View Transitions нестабильны | `experimental.viewTransition`; без флага — обычная навигация; проверить на preview |
| Фото разного качества в тёмной теме | Единая «ночная градация»: `filter: brightness(0.92)` по умолчанию, hover → 1 |
| Кириллица в Unbounded выглядит плохо | Task 0.3 проверка до интеграции; fallback — Commissioner для SR/RU display |
| Смешанные CRLF в файлах | Edit-точно с `\r`; не переформатировать файлы целиком |
