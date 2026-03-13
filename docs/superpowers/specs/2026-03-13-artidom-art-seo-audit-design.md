# SEO + GEO аудит artidom.art — спецификация

Дата: 2026-03-13
Сайт: artidom.art (artodom_com/)
Локали: en, sr, ru

---

## Блок 1. Обновление контактов

### Что меняем

| Поле | Было | Стало |
|------|------|-------|
| Email | director@a-96.ru | artidom96@gmail.com |
| Телефон | +382 68 282 371 | +382 69 256 978 |
| Имя контакта | (нет) | Veronika |

### Где появляется имя «Veronika»

- В `llms.txt` и `llms-full.txt` (контактное лицо)
- В `schema.ts` → `contactPoint.name`: `"Veronika"`
- НЕ на видимых страницах сайта (нет такого UI-элемента)

### Где менять

**Файлы переводов** (en.json, sr.json, ru.json):
- `Contact.email` — email в блоке контактов
- `Contact.phone` — телефон в блоке контактов
- `Footer.email` — email в футере
- `Footer.phone` — телефон в футере

**Schema.org** (`src/lib/seo/schema.ts`):
- `email` (строка 11) → `artidom96@gmail.com`
- `telephone` (строка 12) → `+38269256978`
- `contactPoint.telephone` (строка 37) → `+38269256978`
- `contactPoint.email` (строка 38) → `artidom96@gmail.com`

### WhatsApp / Viber иконки

Добавить в футер и на страницу контактов иконки быстрого перехода:
- WhatsApp: `https://wa.me/79120370170`
- Viber: `viber://chat?number=%2B79120370170`

Номер для мессенджеров: +79120370170 (директор).

**Реализация:** SVG-иконки WhatsApp и Viber рядом с телефоном в футере (`Footer`) и на странице `/contact`. Компонент `MessengerLinks` с двумя иконками-ссылками.

---

## Блок 2. Коммерческие ключи в meta-тегах

### Принцип

Добавить коммерческие слова-триггеры в `meta.title` и `meta.description` всех страниц:
- EN: "Order", "Buy", "Custom" (уже есть частично), "Price"
- SR: "Naručite", "Kupite", "Cijena", "Po mjeri"
- RU: "Заказать", "Купить", "Цена", "На заказ"

### Страницы с существующими meta (обновить ключи)

| Страница | Namespace | en.json | sr.json | ru.json |
|----------|-----------|---------|---------|---------|
| Главная | Index | есть | есть | есть |
| Мастерская | Workshop | есть | есть | есть |
| Каталог | Catalog | есть | есть | есть |
| Проекты | Projects | есть | есть | есть |
| Residential | Solutions.residential | есть | есть | есть |
| HoReCa | Solutions.horeca | есть | есть | есть |
| Education | Solutions.education | есть | есть | есть |
| Workspace | Solutions.workspace | есть | есть | есть |
| Контакт | Contact | есть meta в JSON | есть meta в JSON | есть meta в JSON |

Примечание: для Contact переводы (`Contact.meta.title`, `Contact.meta.description`) уже есть во всех 3 локалях, но на странице нет `generateMetadata` — ключи не используются.

### Страницы БЕЗ generateMetadata (добавить)

1. **`/contact`** — `layout.tsx` с `generateMetadata()` уже существует и вызывает `getPageMetadata({ namespace: 'Contact', path: '/contact' })`. Переводы meta тоже есть. **Новый файл НЕ нужен** — только обновить ключи `Contact.meta.title` / `Contact.meta.description` с коммерческими словами.
2. **`/blog`** — нет `generateMetadata`. Текст H1 и subtitle захардкожены на английском — перенести в переводы. Добавить namespace `Blog` с meta + UI-текстами.
3. **`/blog/[slug]`** — нет `generateMetadata`. Post-модель имеет `seoTitle?` и `seoDescription?` (из frontmatter). Использовать `post.seoTitle ?? post.title` для title, `post.seoDescription ?? post.body.slice(0, 160)` (stripped HTML) для description.

### `/contact` — meta уже работает

`src/app/[locale]/contact/layout.tsx` уже содержит `generateMetadata()` → `getPageMetadata({ namespace: 'Contact' })`. Новый файл не нужен. Только обновить тексты `Contact.meta.*` в переводах.

### Новые ключи в переводах

Добавить в en.json, sr.json, ru.json:
- `Blog.meta.title` / `Blog.meta.description` — для meta-тегов страницы блога
- `Blog.title` / `Blog.subtitle` / `Blog.empty` — для UI-текстов (сейчас захардкожены на EN: "Journal", "Interior, materials, production notes from Montenegro", "Posts coming soon.")

### Примеры обновлённых meta

**Index (EN):**
- title: `Order Custom Kitchens & Apartment Furniture in Montenegro — ARTIDOM`
- description: `Order custom kitchens, wardrobes and built-in furniture in Montenegro. Workshop in Bar. Measurement, production and installation across the coast. Get a free estimate.`

**Index (SR):**
- title: `Naručite kuhinje po mjeri i namještaj za apartmane u Crnoj Gori — ARTIDOM`
- description: `Naručite kuhinje po mjeri, plakare i ugradni namještaj u Crnoj Gori. Radionica u Baru. Mjerenje, proizvodnja i montaža. Zatražite besplatnu procjenu. Cijena po projektu.`

**Index (RU):**
- title: `Заказать кухню и мебель на заказ в Черногории — ARTIDOM`
- description: `Закажите кухни, шкафы и встроенную мебель в Черногории. Цех в Баре. Замер, производство и установка. Бесплатный расчёт стоимости.`

Аналогичный подход для остальных страниц: внедрить «Order/Naručite/Заказать» и «Price/Cijena/Цена» в title и description, сохраняя читаемость.

---

## Блок 3. Статические OG-изображения

### Проблема

Текущий `/api/og` генерирует OG-картинки через edge runtime (`ImageResponse`). Некоторые соцсети и мессенджеры не дожидаются рендера edge-функции → картинка не подтягивается при репосте.

### Решение

Создать статические PNG-файлы (1200×630) для ключевых страниц и прописать их в `buildMetadata()`.

**Страницы со статическими OG:**
- `/` (главная) → `public/og/home.png`
- `/workshop` → `public/og/workshop.png`
- `/catalog` → `public/og/catalog.png`
- `/projects` → `public/og/projects.png`
- `/contact` → `public/og/contact.png`
- `/solutions/residential` → `public/og/residential.png`
- `/solutions/horeca` → `public/og/horeca.png`
- `/solutions/workspace` → `public/og/workspace.png`
- `/solutions/education` → `public/og/education.png`

**Динамические OG (оставить `/api/og`):**
- `/projects/[slug]` — название проекта на картинке
- `/catalog/[slug]` — название позиции
- `/blog/[slug]` — заголовок статьи

### Создание статических OG

Одноразовый скрипт `scripts/generate-og.ts` (Node.js + `satori` + `sharp`), использующий тот же дизайн что в `/api/og/route.tsx` (тёмный фон, спираль аммонита, текст).

- Запуск: `npx tsx scripts/generate-og.ts` (ручной, не часть билда)
- Один PNG на страницу, без локализации текста (универсальный: название ARTIDOM + тип страницы)
- Перегенерировать при значительных изменениях брендинга
- Каждый файл: 1200×630, формат PNG, размер < 300 KB

### Изменения в коде

В `buildMetadata()` (`src/lib/seo/page-metadata.ts`): если для страницы есть статический OG-файл, использовать его вместо `/api/og?...`. Маппинг path → OG image в отдельном объекте.

---

## Блок 4. Кликабельные изображения в проектах

### Проблема

Галерея на `/projects/[slug]` рендерит `<Image>` без обёртки — картинки не кликабельны, не открываются для просмотра, нет отдельных URL.

### Решение

Заменить текущую галерею на `ImageLightbox` (`src/components/ImageLightbox/ImageLightbox.tsx`). Этот компонент уже рендерит:
- Сетку картинок (главная + миниатюры) с кликабельными кнопками
- Лайтбокс-оверлей с prev/next, keyboard Escape/Arrow, счётчиком

Дополнительно: синхронизация URL через `?photo=N`.

### Подход

**Вариант: обёртка ImageLightbox + URL-синхронизация.**

Текущая галерея на странице проекта (plain `<Image>` в `<div>`) заменяется на `ImageLightbox`. Компонент уже имеет свою сетку и лайтбокс — дублирования не будет.

Для URL-синхронизации (`?photo=N`) — создать тонкую обёртку `ProjectGallery.tsx`:
- Принимает `images: string[]` и `alt: string`
- Добавляет `initialIndex` из `?photo=N` при первой загрузке
- Синхронизирует URL при открытии/закрытии лайтбокса

### Модификация ImageLightbox

Добавить два опциональных пропа:
- `initialIndex?: number` — если передан, лайтбокс открывается сразу на этом фото
- `onLightboxChange?: (index: number | null) => void` — колбэк при смене/закрытии фото

Это обратно-совместимо — существующие вызовы компонента не сломаются.

### Поведение

1. Клик по любой картинке галереи → лайтбокс с навигацией (уже работает в ImageLightbox)
2. URL меняется: `?photo=N` (N — номер фото, начиная с 1)
3. Прямой заход по URL `?photo=N` → лайтбокс открывается автоматически
4. Закрытие лайтбокса → URL возвращается к базовому
5. Alt-текст: `{title}` для обложки, `{title} — {N}` для галереи

### URL-синхронизация: технические детали

- Использовать `useRouter().replace()` из `next/navigation` (не raw `pushState`, чтобы не десинхронизировать Next.js router state)
- `useSearchParams()` требует `<Suspense>` — обернуть `ProjectGallery` в `<Suspense>` на серверной странице
- Параметр `?photo=N` НЕ индексируется поисковиками (не меняет `canonical`)

### Изменения в файлах

**`src/components/ImageLightbox/ImageLightbox.tsx`:**
- Добавить пропы `initialIndex?` и `onLightboxChange?`

**`src/app/[locale]/projects/[slug]/page.tsx`:**
- Удалить текущую разметку галереи (plain Image)
- Импорт `ProjectGallery`
- Обернуть `<ProjectGallery>` в `<Suspense>`

**`src/app/[locale]/projects/[slug]/ProjectGallery.tsx`** (новый client component):
- Читает `?photo=N` через `useSearchParams()`
- Рендерит `<ImageLightbox>` с `initialIndex` и `onLightboxChange`
- В `onLightboxChange` вызывает `router.replace()` для обновления URL

---

## Блок 5. GEO (Generative Engine Optimization)

### 5.1 llms.txt + llms-full.txt

Создать два файла в `public/`:

**`public/llms.txt`** — краткая справка (≈30 строк):
```
# ARTIDOM — Custom Furniture Workshop in Montenegro

> Custom kitchens, wardrobes and built-in furniture for apartments in Montenegro.
> Workshop in Sutomore, Bar. Measurement and installation across the coast.

## What we do
- Custom kitchens for apartments and villas
- Wardrobes and built-in storage
- TV walls, entry storage, bathroom joinery
- Selected HoReCa and B2B fit-outs

## Workshop
- Location: Sutomore, Bar, Montenegro
- Area: 300 sqm production floor
- Equipment: CNC cutting, assembly, finishing
- Team: 40 craftsmen

## Service area
Bar, Budva, Tivat, Kotor, Podgorica — all of Montenegro

## Contact
- Veronika: +382 69 256 978
- Email: artidom96@gmail.com
- Address: Mirošica 2, Sutomore, 85000 Bar, Montenegro
- WhatsApp: +7 912 037 0170

## Links
- Website: https://artidom.art
- Projects (SR): https://artidom.art/sr/projects
- Projects (EN): https://artidom.art/en/projects
- Catalog (SR): https://artidom.art/sr/catalog
- Catalog (EN): https://artidom.art/en/catalog
- Contact: https://artidom.art/sr/contact
```

**`public/llms-full.txt`** — расширенная версия (≈150–200 строк):
- Все данные из llms.txt
- Полный список направлений (residential, horeca, education, workspace) с описаниями
- Процесс работы (brief → drawings → production → install)
- Материалы (дуб/шпон, лакированный MDF, камень/компакт)
- Мощности и сроки (3–5 недель, 300 м²)
- FAQ (5–7 вопросов)
- Ценовая политика (описание подхода, не конкретные цифры)

### 5.2 FAQ Schema (FAQPage)

Добавить `FAQPage` schema.org разметку на главную страницу.

**Вопросы (5–7 штук), пример EN:**
1. How long does a custom kitchen take? → 3–5 weeks from approval.
2. Do you deliver outside Bar? → Yes, across Montenegro: Budva, Tivat, Kotor, Podgorica.
3. What materials do you use? → European-grade oak, veneer, lacquered MDF, compact/stone tops.
4. Can you furnish a whole apartment? → Yes, kitchens + wardrobes + storage + TV walls in one package.
5. How much does a custom kitchen cost in Montenegro? → Price depends on size, materials and layout. Contact us for a free estimate.
6. Do you work with architects and developers? → Yes, we take B2B and HoReCa projects with technical drawings.

FAQ тексты хранятся в переводах (en.json, sr.json, ru.json) в namespace `FAQ`. Schema генерируется функцией `getFaqSchema(locale)` в `src/lib/seo/schema.ts` и инжектится на главную как отдельный `<script type="application/ld+json">` (рядом с существующим LocalBusiness schema).

### 5.3 Контент про цены («cijena»)

Добавить на главную страницу блок «Pricing approach» / «Kako formiramo cijenu» / «Как формируется цена»:
- Не конкретные цифры, а объяснение подхода
- Что влияет на цену: размер, материалы, сложность, количество
- Призыв запросить бесплатный расчёт
- Ключевые слова: price/cijena/цена, estimate/procjena/расчёт, cost/trošak/стоимость

Текст хранится в переводах: `Index.pricing.title`, `Index.pricing.text`, `Index.pricing.cta`.

### 5.4 Усиление гео-привязки

В существующем schema.org (`src/lib/seo/schema.ts`):
- Уже есть `areaServed` с городами — сохраняем
- Добавить `hasOfferCatalog` с основными услугами
- Добавить `priceRange`: "€€" (средний сегмент)

В meta-описаниях усилить упоминания городов: Bar, Budva, Podgorica, Tivat, Kotor.

### 5.5 Google Business Profile

**Вне кода. Ручная задача для владельца.**

Создать профиль Google Business для:
- Название: ARTIDOM / Artidom DOO
- Адрес: Mirošica 2, Sutomore, 85000 Bar, Montenegro
- Категория: Furniture Store / Custom Furniture Maker
- Телефон: +382 69 256 978
- Сайт: https://artidom.art
- Часы работы: Пн-Пт 09:00–18:00

Это критично для появления в local pack Google по запросам типа «custom furniture Bar Montenegro».

---

## Файлы, которые будут изменены

| Файл | Блоки |
|------|-------|
| `src/messages/en.json` | 1, 2, 5 |
| `src/messages/sr.json` | 1, 2, 5 |
| `src/messages/ru.json` | 1, 2, 5 |
| `src/lib/seo/schema.ts` | 1, 5 |
| `src/lib/seo/page-metadata.ts` | 3 |
| `src/app/[locale]/contact/layout.tsx` | — (уже существует, без изменений) |
| `src/app/[locale]/blog/page.tsx` | 2 (+ перенос хардкода H1/subtitle в переводы) |
| `src/app/[locale]/blog/[slug]/page.tsx` | 2 |
| `src/components/ImageLightbox/ImageLightbox.tsx` | 4 (добавить initialIndex + onLightboxChange) |
| `src/app/[locale]/projects/[slug]/page.tsx` | 4 |
| `src/app/[locale]/projects/[slug]/ProjectGallery.tsx` | 4 (новый файл) |
| `src/components/MessengerLinks/MessengerLinks.tsx` | 1 (новый файл) |
| `src/components/Footer/Footer.tsx` | 1 |
| `src/app/api/og/route.tsx` | 3 (без изменений, сохраняется) |
| `public/og/*.png` | 3 (новые файлы, 9 штук) |
| `public/llms.txt` | 5 (новый файл) |
| `public/llms-full.txt` | 5 (новый файл) |
| `scripts/generate-og.ts` | 3 (новый файл) |

## Новые файлы

| Файл | Назначение |
|------|-----------|
| `src/app/[locale]/projects/[slug]/ProjectGallery.tsx` | Клиентский компонент: ImageLightbox + URL-синхронизация |
| `src/components/MessengerLinks/MessengerLinks.tsx` | Иконки WhatsApp и Viber |
| `src/components/MessengerLinks/index.ts` | Barrel export |
| `public/og/home.png` ... `public/og/education.png` | Статические OG-картинки (9 шт.) |
| `public/llms.txt` | Краткая справка для LLM |
| `public/llms-full.txt` | Расширенная справка для LLM |
| `scripts/generate-og.ts` | Скрипт генерации статических OG |

## Порядок реализации

1. **Блок 1** — контакты (быстро, без зависимостей)
2. **Блок 2** — meta-теги (зависит от обновлённых контактов)
3. **Блок 5** — GEO: llms.txt, FAQ, pricing, schema (параллельно с 4)
4. **Блок 4** — лайтбокс для проектов (независим)
5. **Блок 3** — статические OG (последний, т.к. зависит от финальных текстов в meta)

## Вне скоупа

- Google Business Profile — ручная регистрация, не код
- Изменения на русском сайте (a-96.ru / artidom_ru/) — отдельный проект
- Покупка ссылок, линкбилдинг — не техническая задача
- Google Ads / Yandex Direct — не SEO
