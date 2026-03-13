# SEO-аудит artidom.art — спецификация v2

Дата: 2026-03-13
Сайт: artidom.art (artodom_com/)
Локали: sr (default), en, ru

---

## Контекст

artidom.art не найден ни по одному из 5 ключевых запросов в Google (март 2026).
GSC: 2 клика, 20 показов за 30 дней. GA4: 37 сессий (73% direct).

Главный конкурент: Smart Construction (smartmneconstruction.com) — #1 по "custom furniture Montenegro".
Слабости конкурента: нет JSON-LD, нет hreflang, Tilda (DOM 4.2s), портфолио на внешнем домене.

Ранее в этой сессии уже сделано:
- Два контакта (Veronika + Vladimir) добавлены в footer, contact, schema
- Hero LCP оптимизирован (native img + fetchPriority)
- Title укорочен, Facebook в sameAs
- Permanent redirect / → /sr для canonical

---

## Блок 1: Sitemap cleanup

**Файл:** `src/app/sitemap.ts`

Убрать `/solutions` из `staticPages` (строка 16) — это redirect (302 → `/solutions/residential`).
Google не индексирует redirect-URL в sitemap, может понизить trust.

Sub-pages остаются: `/solutions/residential`, `/horeca`, `/education`, `/workspace`.

Добавить итерацию по blog posts из `src/lib/blog.ts` (блок 7).

---

## Блок 2: Dead code cleanup

**Файл:** `src/lib/seo/schema.ts`

Удалить функцию `getProjectSchema` (строки 123-142) — нигде не импортируется, не вызывается.

---

## Блок 3: llms.txt + llms-full.txt контакты

**Файлы:** `public/llms.txt`, `public/llms-full.txt`

Текущее состояние:
- WhatsApp: +7 912 037 0170 (ок, оставить — привязан к этому номеру)
- Нет Viber
- Нет Vladimir

Обновить секцию Contact в обоих файлах:
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

---

## Блок 4: BreadcrumbList schema

**Новый файл:** `src/lib/seo/breadcrumbs.ts`

BreadcrumbList JSON-LD для страниц глубже 1 уровня. Google показывает breadcrumbs вместо URL в сниппете (подтверждено schemavalidator.org, февраль 2026 — работает для всех сайтов).

Примеры:
- `/sr/solutions/residential` → Početna > Rješenja > Stanovi
- `/en/solutions/horeca` → Home > Solutions > HoReCa
- `/sr/catalog/kuhinje` → Početna > Katalog > Kuhinje
- `/en/blog/custom-kitchens-bar` → Home > Blog > Custom Kitchens Bar

Функция `getBreadcrumbSchema(locale, path, labels)` генерирует JSON-LD.
Labels берутся из translations (`Breadcrumbs` namespace в en.json/sr.json).

Инжектировать в layout.tsx рядом с существующим LocalBusiness schema.

---

## Блок 5: FAQ контент + schema (AI-видимость)

**Факт (март 2026):** Google с августа 2023 ограничил FAQ rich results для государственных/медицинских сайтов. artidom.art НЕ получит раскрывающиеся Q&A аккордеоны.

**Зачем делаем:**
- AI-поисковики (Perplexity, ChatGPT Search, Gemini) читают FAQPage schema
- Помогает попасть в обычные featured snippets
- FAQ-контент на странице улучшает поведенческие (время на сайте)

**Где:**
- `/solutions/residential` — вопросы про кухни, шкафы, сроки, цены
- `/workshop` — вопросы про материалы, процесс, доставку

**Реализация:**
- Вопросы в translations: `FAQ.residential`, `FAQ.workshop` (массивы {q, a})
- Функция `getFaqSchema(locale, questions)` в `src/lib/seo/schema.ts`
- HTML-секция `<details>/<summary>` на страницах
- JSON-LD `FAQPage` рядом с BreadcrumbList

Вопросы из llms-full.txt (уже готовые):
1. Koliko vremena treba za kuhinju po mjeri? / How long does a custom kitchen take?
2. Da li isporučujete van Bara? / Do you deliver outside Bar?
3. Koje materijale koristite? / What materials do you use?
4. Možete li opremiti cijeli apartman? / Can you furnish a whole apartment?
5. Koliko košta kuhinja po mjeri u Crnoj Gori? / How much does a custom kitchen cost?
6. Radite li sa arhitektama? / Do you work with architects?

---

## Блок 6: Гео-привязка (serviceArea + areaServed)

**Файл:** `src/lib/seo/schema.ts`

Текущее: `areaServed` с Montenegro + 5 городов (Bar, Podgorica, Budva, Tivat, Kotor).

Обновить:
1. Добавить `serviceArea` (ARTIDOM выезжает на замеры/установку — serviceArea точнее для мобильного бизнеса, подтверждено localmighty.com, seenos.ai)
2. Расширить города: Herceg Novi, Ulcinj, Nikšić, Cetinje, Sutomore
3. `serviceArea` с `GeoCircle`: центр Sutomore (42.0931, 19.1003), радиус 150 km
4. Оставить `areaServed` для совместимости

```json
"serviceArea": {
  "@type": "GeoCircle",
  "geoMidpoint": {
    "@type": "GeoCoordinates",
    "latitude": 42.0931,
    "longitude": 19.1003
  },
  "geoRadius": "150000"
}
```

---

## Блок 7: Блог-система

### Новые файлы:
- `src/lib/blog.ts` — массив постов (slug, title, excerpt, body, date, locale, tags)
- `src/app/[locale]/blog/[slug]/page.tsx` — страница поста с generateMetadata

### Модификация:
- `src/app/sitemap.ts` — итерация по blogPosts из blog.ts
- `src/messages/en.json`, `sr.json` — переводы UI блога (Back, Read more, Published)

### Данные постов:
Начальные 3 SEO-статьи на SR + EN (под запросы без конкуренции по данным SerpAPI):
1. `kuhinje-po-mjeri-bar` / `custom-kitchens-bar-montenegro`
2. `namjestaj-po-mjeri-crna-gora` / `custom-furniture-montenegro`
3. `opremanje-apartmana-crna-gora` / `apartment-furnishing-montenegro`

Контент: 500-800 слов на пост, с гео-привязкой к Bar/Montenegro, внутренние ссылки на /catalog и /solutions/residential.

---

## Что НЕ входит

- ~~Twitter Cards~~ — нет аккаунта
- ~~x-default sr→en~~ — SR-аудитория приоритет
- ~~Прайс-лист~~ — цены индивидуальные
- ~~Google Business Profile~~ — ручная регистрация
- ~~Favicon~~ — пользователь генерирует отдельно
- Русский сайт (a-96.ru) — отдельный проект
- Линкбилдинг — не техническая задача

---

## Порядок реализации

1. Блоки 1-3 (sitemap, dead code, llms.txt) — параллельно, без зависимостей
2. Блок 6 (geo schema) — параллельно с 1-3
3. Блок 4 (breadcrumbs) — после 6, использует schema инфраструктуру
4. Блок 5 (FAQ) — после 4, зависит от translations
5. Блок 7 (блог) — последний, самый большой

## Верификация

- `npm run build` — сборка без ошибок
- Проверка sitemap.xml — нет /solutions, есть blog posts
- Rich Results Test — BreadcrumbList валиден
- Schema Validator — LocalBusiness + serviceArea валидны
- llms.txt — правильные контакты (2 телефона + WhatsApp + Viber)
