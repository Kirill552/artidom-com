# SEO + GEO аудит artidom.art — план реализации

> **For agentic workers:** REQUIRED: Use superpowers:subagent-driven-development (if subagents available) or superpowers:executing-plans to implement this plan. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Исправить SEO-проблемы artidom.art: обновить контакты, добавить коммерческие ключи в meta, создать статические OG-картинки, подключить лайтбокс на проектах, внедрить GEO (llms.txt, FAQ, pricing, schema).

**Architecture:** 5 независимых блоков, реализуемых последовательно. Блок 1 (контакты) → Блок 2 (meta) → Блоки 4+5 (лайтбокс + GEO, параллельно) → Блок 3 (OG-картинки, зависит от финальных meta). Все изменения внутри `artodom_com/`. Деплой через `git push origin main` → Vercel auto-build.

**Tech Stack:** Next.js 16, next-intl 4.8, TypeScript, satori + sharp (для OG-скрипта)

**Spec:** `docs/superpowers/specs/2026-03-13-artidom-art-seo-audit-design.md`

---

## Chunk 1: Блоки 1–2 (контакты + meta-теги)

### Task 1: Обновить контакты в переводах

**Files:**
- Modify: `src/messages/en.json` — ключи `Contact.email`, `Contact.phone`, `Footer.email`, `Footer.phone`
- Modify: `src/messages/sr.json` — те же ключи
- Modify: `src/messages/ru.json` — те же ключи

- [ ] **Step 1: Обновить en.json — контакты**

В `src/messages/en.json` заменить:

```
"Contact" секция:
  "email": "director@a-96.ru"  →  "email": "artidom96@gmail.com"
  "phone": "+382 68 282 371"   →  "phone": "+382 69 256 978"

"Footer" секция:
  "email": "director@a-96.ru"  →  "email": "artidom96@gmail.com"
  "phone": "+382 68 282 371"   →  "phone": "+382 69 256 978"
```

- [ ] **Step 2: Обновить sr.json — контакты**

Проверить что ключи совпадают с en.json (те же пути, те же старые значения). В `src/messages/sr.json` замены:
- `Contact.email`: `"director@a-96.ru"` → `"artidom96@gmail.com"`
- `Contact.phone`: `"+382 68 282 371"` → `"+382 69 256 978"`
- `Footer.email`: `"director@a-96.ru"` → `"artidom96@gmail.com"`
- `Footer.phone`: `"+382 68 282 371"` → `"+382 69 256 978"`

- [ ] **Step 3: Обновить ru.json — контакты**

В `src/messages/ru.json` те же замены (4 ключа: `Contact.email`, `Contact.phone`, `Footer.email`, `Footer.phone`).

- [ ] **Step 4: Проверить билд**

```bash
cd artodom_com && npm run build
```

Ожидание: билд проходит без ошибок.

- [ ] **Step 5: Коммит**

```bash
cd artodom_com && git add src/messages/en.json src/messages/sr.json src/messages/ru.json
git commit -m "fix: обновить email и телефон во всех локалях"
```

---

### Task 2: Обновить контакты в Schema.org

**Files:**
- Modify: `src/lib/seo/schema.ts:11,12,37,38` — email и telephone
- Modify: `src/lib/seo/local-page-schema.ts:85-86` — email и telephone в `getServiceSchema`

- [ ] **Step 1: Обновить schema.ts**

В `src/lib/seo/schema.ts` заменить:

```typescript
// строка 11
"email": "director@a-96.ru"  →  "email": "artidom96@gmail.com"
// строка 12
"telephone": "+38268282371"  →  "telephone": "+38269256978"
// строка 37
"telephone": "+38268282371"  →  "telephone": "+38269256978"
// строка 38
"email": "director@a-96.ru"  →  "email": "artidom96@gmail.com"
```

Добавить имя контакта в `contactPoint`:

```typescript
"contactPoint": {
  "@type": "ContactPoint",
  "name": "Veronika",           // ← ДОБАВИТЬ
  "contactType": "customer support",
  "telephone": "+38269256978",
  "email": "artidom96@gmail.com",
  "areaServed": "ME",
  "availableLanguage": ["sr", "en", "ru"]
},
```

- [ ] **Step 2: Обновить local-page-schema.ts**

В `src/lib/seo/local-page-schema.ts`, функция `getServiceSchema` (строки 85-86):

```typescript
// было:
telephone: '+38268282371',
email: 'director@a-96.ru',

// стало:
telephone: '+38269256978',
email: 'artidom96@gmail.com',
```

- [ ] **Step 3: Проверить билд**

```bash
cd artodom_com && npm run build
```

- [ ] **Step 4: Коммит**

```bash
cd artodom_com && git add src/lib/seo/schema.ts src/lib/seo/local-page-schema.ts
git commit -m "fix: обновить контакты в Schema.org и Service schema"
```

---

### Task 3: Создать компонент MessengerLinks

**Files:**
- Create: `src/components/MessengerLinks/MessengerLinks.tsx`
- Create: `src/components/MessengerLinks/MessengerLinks.module.css`
- Create: `src/components/MessengerLinks/index.ts`

- [ ] **Step 1: Создать MessengerLinks.tsx**

```tsx
// src/components/MessengerLinks/MessengerLinks.tsx
import styles from './MessengerLinks.module.css';

const WA_URL = 'https://wa.me/79120370170';
const VIBER_URL = 'viber://chat?number=%2B79120370170';

export default function MessengerLinks({ className }: { className?: string }) {
  return (
    <div className={`${styles.links} ${className || ''}`}>
      <a href={WA_URL} target="_blank" rel="noopener noreferrer" aria-label="WhatsApp" className={styles.icon}>
        <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51l-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
        </svg>
      </a>
      <a href={VIBER_URL} target="_blank" rel="noopener noreferrer" aria-label="Viber" className={styles.icon}>
        <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
          <path d="M11.4 0C9.473.028 5.333.344 3.252 2.27 1.638 3.855 1.04 6.2 .976 9.089.912 11.978.796 17.427 6.1 18.988h.004l-.004 2.416s-.04.977.607 1.174c.782.238 1.242-.504 1.99-1.31.41-.442.977-1.092 1.404-1.588 3.867.326 6.84-.418 7.18-.53.782-.258 5.21-.822 5.932-6.71.744-6.065-.362-9.9-2.398-11.628C19.08.571 15.23-.04 11.4 0zm.742 1.902c3.314-.036 6.554.395 8.378 1.96 1.602 1.355 2.544 4.618 1.898 9.648-.58 4.67-4.024 5.374-4.682 5.592-.282.092-2.822.722-6.07.538 0 0-2.406 2.903-3.157 3.672-.118.12-.256.167-.348.144-.13-.032-.166-.188-.162-.414.004-.328.024-4.086.024-4.086-4.506-1.32-4.236-5.816-4.182-8.344.054-2.528.558-4.516 1.882-5.82 1.726-1.576 5.105-1.862 6.419-1.89zm.095 2.09c-.078 0-.078.118 0 .12 1.594.07 2.94.588 3.972 1.55 1.028.96 1.568 2.254 1.698 3.836 0 .08.132.074.126-.006-.136-1.666-.716-3.057-1.812-4.08-1.098-1.022-2.526-1.37-3.984-1.42zm-4.71 1.44c-.376-.004-.778.1-1.156.38-.614.45-.654 1.186-.564 1.642.228 1.198.848 2.49 1.896 3.918a14.743 14.743 0 003.696 3.756c1.592 1.07 2.986 1.47 3.966 1.59.232.028.744.01 1.266-.332.392-.256.606-.646.678-.976.054-.242.02-.448-.046-.564-.122-.212-.37-.338-.532-.428l-1.818-.954c-.324-.168-.54-.148-.754.102l-.588.672c-.242.274-.486.242-.486.242l-.008.004c-2.36-.622-4.27-2.604-4.27-2.604s-.238-.244.036-.486l.672-.588c.252-.214.27-.43.102-.754l-.954-1.818c-.146-.262-.38-.47-.76-.604a1.425 1.425 0 00-.376-.018zm5.652.562c-.078-.004-.082.118-.004.124.84.092 1.556.396 2.17.92.608.52.95 1.14 1.056 1.896.014.08.14.066.13-.014-.078-.814-.392-1.502-1.06-2.078-.664-.576-1.448-.78-2.292-.848zm-.286 1.294c-.072-.008-.088.1-.016.12.462.09.838.276 1.132.562.296.284.46.648.508 1.102.006.078.136.072.13-.008-.04-.504-.224-.928-.56-1.254-.336-.324-.752-.474-1.194-.522z" />
        </svg>
      </a>
    </div>
  );
}
```

- [ ] **Step 2: Создать CSS модуль**

```css
/* src/components/MessengerLinks/MessengerLinks.module.css */
.links {
  display: flex;
  gap: 12px;
  align-items: center;
}

.icon {
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--color-muted, #7a826e);
  transition: color 0.2s;
}

.icon:hover {
  color: var(--color-text, #fdfaf5);
}
```

- [ ] **Step 3: Создать barrel export**

```typescript
// src/components/MessengerLinks/index.ts
export { default } from './MessengerLinks';
```

- [ ] **Step 4: Проверить билд**

```bash
cd artodom_com && npm run build
```

- [ ] **Step 5: Коммит**

```bash
cd artodom_com && git add src/components/MessengerLinks/
git commit -m "feat: компонент MessengerLinks (WhatsApp + Viber)"
```

---

### Task 4: Добавить MessengerLinks в Footer и Contact

**Files:**
- Modify: `src/components/Footer/Footer.tsx:29-32` — добавить MessengerLinks после телефона
- Modify: `src/app/[locale]/contact/page.tsx:87-91` — добавить MessengerLinks после блока phone

- [ ] **Step 1: Добавить в Footer**

В `src/components/Footer/Footer.tsx` добавить импорт:

```tsx
import MessengerLinks from '@/components/MessengerLinks';
```

В блоке `<div className={styles.contact}>` (строки 29-32) добавить после `<a href={...}>{phone}</a>`:

```tsx
<div className={styles.contact}>
    <a href={`mailto:${email}`}>{email}</a>
    <a href={`tel:${phoneHref}`}>{phone}</a>
    <MessengerLinks />
</div>
```

- [ ] **Step 2: Добавить на Contact страницу**

В `src/app/[locale]/contact/page.tsx` добавить импорт:

```tsx
import MessengerLinks from '@/components/MessengerLinks';
```

После блока с телефоном (строка 91), добавить отдельный блок:

```tsx
<div className={styles.contactDetail}>
    <span className={styles.detailLabel}>{t('phone_label')}</span>
    <a href={`tel:${phoneHref}`}>{phone}</a>
</div>
{/* Добавить сюда: */}
<div className={styles.contactDetail}>
    <span className={styles.detailLabel}>WhatsApp / Viber</span>
    <MessengerLinks />
</div>
```

- [ ] **Step 3: Проверить билд**

```bash
cd artodom_com && npm run build
```

- [ ] **Step 4: Коммит**

```bash
cd artodom_com && git add src/components/Footer/Footer.tsx src/app/\[locale\]/contact/page.tsx
git commit -m "feat: добавить иконки WhatsApp/Viber в футер и контакты"
```

---

### Task 5: Коммерческие ключи в meta — en.json

**Files:**
- Modify: `src/messages/en.json` — обновить все `meta.title` и `meta.description`

- [ ] **Step 1: Обновить meta-ключи в en.json**

Заменить `meta.title` и `meta.description` для каждого namespace. Принцип: добавить "Order" / "Price" / "Estimate" сохраняя читаемость. Полный список замен:

**Index.meta:**
```json
"title": "Order Custom Kitchens & Apartment Furniture in Montenegro — ARTIDOM",
"description": "Order custom kitchens, wardrobes and built-in furniture in Montenegro. Workshop in Bar. Measurement, production and installation across the coast. Get a free estimate."
```

**Workshop.meta:**
```json
"title": "Custom Furniture Workshop in Bar, Montenegro — ARTIDOM",
"description": "Order custom kitchens, wardrobes and joinery from ARTIDOM workshop in Sutomore, Bar. CNC cutting, assembly and finishing. 300 sqm production floor, 40 craftsmen."
```

**Catalog.meta:**
```json
"title": "Order Custom Kitchens, Wardrobes & Joinery in Montenegro — ARTIDOM",
"description": "Browse and order ARTIDOM custom kitchens, storage and joinery for apartments and villas in Montenegro. Each item built to your floor plan. Free estimate."
```

**Projects.meta:**
```json
"title": "Custom Furniture Projects in Montenegro — ARTIDOM Portfolio",
"description": "See completed apartment kitchens, wardrobes, built-in joinery and HoReCa projects by ARTIDOM in Bar, Budva, Podgorica and across Montenegro."
```

**Contact.meta:**
```json
"title": "Contact ARTIDOM — Order Custom Furniture in Montenegro",
"description": "Send your floor plan or project brief to ARTIDOM. Custom kitchens and furniture workshop in Bar, Montenegro. Free estimate within 24 hours."
```

**Solutions.residential.meta:**
```json
"title": "Order Custom Kitchens & Apartment Furnishing in Montenegro — ARTIDOM",
"description": "Order custom kitchens, wardrobes, TV walls and built-in storage for apartments and villas in Montenegro. Production in Bar, installation across the coast. Price by project."
```

**Solutions.horeca.meta:**
```json
"title": "Order Restaurant & Hotel Furniture in Montenegro — ARTIDOM",
"description": "Order custom counters, hotel room furniture and service joinery in Montenegro. Production and installation from ARTIDOM workshop in Bar."
```

**Solutions.education.meta:**
```json
"title": "Order School Furniture & Joinery in Montenegro — ARTIDOM",
"description": "Order classroom storage, reception desks and public-zone joinery for schools in Montenegro. Batch production in Bar with installation support."
```

**Solutions.workspace.meta:**
```json
"title": "Order Custom Office Furniture in Montenegro — ARTIDOM",
"description": "Order reception desks, meeting tables and built-in storage for offices and clinics in Montenegro. Custom production in Bar to your layout."
```

- [ ] **Step 2: Проверить билд**

```bash
cd artodom_com && npm run build
```

- [ ] **Step 3: Коммит**

```bash
cd artodom_com && git add src/messages/en.json
git commit -m "seo: коммерческие ключи в meta-тегах (en)"
```

---

### Task 6: Коммерческие ключи в meta — sr.json

**Files:**
- Modify: `src/messages/sr.json` — обновить все `meta.title` и `meta.description`

- [ ] **Step 1: Обновить meta-ключи в sr.json**

Принцип: добавить "Naručite" / "Cijena" / "Procjena". Замены:

**Index.meta:**
```json
"title": "Naručite kuhinje po mjeri i namještaj za apartmane u Crnoj Gori — ARTIDOM",
"description": "Naručite kuhinje po mjeri, plakare i ugradni namještaj u Crnoj Gori. Radionica u Baru. Mjerenje, proizvodnja i montaža. Besplatna procjena. Cijena po projektu."
```

**Workshop.meta:**
```json
"title": "Radionica za namještaj po mjeri u Baru — naručite kod ARTIDOM",
"description": "Naručite kuhinje po mjeri, plakare i stolariju iz ARTIDOM radionice u Sutomoru, Bar. CNC rezanje, sklapanje, završna obrada. 300 m², 40 majstora."
```

**Catalog.meta:**
```json
"title": "Naručite kuhinje po mjeri, plakare i stolariju u Crnoj Gori — ARTIDOM",
"description": "Pregledajte i naručite ARTIDOM kuhinje po mjeri, odlaganje i stolariju za apartmane i vile. Izrada po osnovi prostora. Besplatna procjena. Cijena po projektu."
```

**Projects.meta:**
```json
"title": "Projekti namještaja po mjeri u Crnoj Gori — ARTIDOM portfolio",
"description": "Pogledajte završene kuhinje, plakare, ugradnu stolariju i HoReCa projekte iz ARTIDOM radionice u Baru, Budvi, Podgorici."
```

**Contact.meta:**
```json
"title": "Kontakt ARTIDOM — naručite namještaj po mjeri u Crnoj Gori",
"description": "Pošaljite osnovu ili opis projekta. Radionica u Baru. Besplatna procjena u roku od 24 sata. Cijena po veličini i materijalu."
```

**Solutions.residential.meta:**
```json
"title": "Naručite kuhinje po mjeri i opremanje apartmana u Crnoj Gori — ARTIDOM",
"description": "Naručite kuhinje po mjeri, plakare, TV zidove i ugradno odlaganje za stanove i vile. Pogon u Baru, montaža širom zemlje. Cijena po projektu."
```

**Solutions.horeca.meta:**
```json
"title": "Naručite restoranski i hotelski namještaj u Crnoj Gori — ARTIDOM",
"description": "Naručite pultove po mjeri, namještaj za sobe i servisnu stolariju u Crnoj Gori. Proizvodnja i montaža iz radionice u Baru."
```

**Solutions.education.meta:**
```json
"title": "Naručite školski namještaj i stolariju u Crnoj Gori — ARTIDOM",
"description": "Naručite ormare za učionice, recepcije i stolariju za javne zone škola u Crnoj Gori. Serijska proizvodnja u Baru."
```

**Solutions.workspace.meta:**
```json
"title": "Naručite kancelarijski namještaj po mjeri u Crnoj Gori — ARTIDOM",
"description": "Naručite recepcije, stolove za sastanke i ugradno odlaganje za kancelarije i klinike u Crnoj Gori. Izrada po vašem rasporedu u Baru."
```

- [ ] **Step 2: Проверить билд**

```bash
cd artodom_com && npm run build
```

- [ ] **Step 3: Коммит**

```bash
cd artodom_com && git add src/messages/sr.json
git commit -m "seo: коммерческие ключи в meta-тегах (sr)"
```

---

### Task 7: Коммерческие ключи в meta — ru.json

**Files:**
- Modify: `src/messages/ru.json` — обновить все `meta.title` и `meta.description`

- [ ] **Step 1: Обновить meta-ключи в ru.json**

Принцип: добавить "Заказать" / "Цена" / "Расчёт". Замены:

**Index.meta:**
```json
"title": "Заказать кухню и мебель на заказ в Черногории — ARTIDOM",
"description": "Закажите кухни, шкафы и встроенную мебель в Черногории. Цех в Баре. Замер, производство и установка. Бесплатный расчёт стоимости. Цена по проекту."
```

**Workshop.meta:**
```json
"title": "Мебельный цех в Баре — заказать мебель у ARTIDOM",
"description": "Закажите кухни, шкафы и столярные изделия из цеха ARTIDOM в Суторморе (Бар). ЧПУ-раскрой, сборка, отделка. 300 м², 40 мастеров."
```

**Catalog.meta:**
```json
"title": "Заказать кухню, шкафы и столярные изделия в Черногории — ARTIDOM",
"description": "Каталог мебели на заказ: кухни, системы хранения и столярные изделия для квартир и вилл. Изготовление по вашему плану в Баре. Бесплатный расчёт."
```

**Projects.meta:**
```json
"title": "Реализованные проекты мебели в Черногории — портфолио ARTIDOM",
"description": "Кухни, шкафы, встроенная мебель для квартир и HoReCa-проекты в Баре, Будве, Подгорице. Произведено в цехе ARTIDOM."
```

**Contact.meta:**
```json
"title": "Связаться с ARTIDOM — заказать мебель в Черногории",
"description": "Пришлите план квартиры или описание проекта. Цех в Баре. Бесплатный расчёт в течение 24 часов. Цена зависит от размера и материалов."
```

**Solutions.residential.meta:**
```json
"title": "Заказать кухню и мебель для квартиры в Черногории — ARTIDOM",
"description": "Закажите кухни, шкафы-купе, ТВ-зоны и встроенную мебель для квартир и вилл. Цех в Баре, монтаж по всей стране. Цена по проекту."
```

**Solutions.horeca.meta:**
```json
"title": "Заказать мебель для ресторанов и отелей в Черногории — ARTIDOM",
"description": "Закажите барные стойки, мебель для номеров и общественных зон в Черногории. Производство и установка из цеха в Баре."
```

**Solutions.education.meta:**
```json
"title": "Заказать мебель для школ в Черногории — ARTIDOM",
"description": "Закажите шкафы для классов, ресепшн-зоны и мебель общественных зон для школ. Серийное производство в Баре."
```

**Solutions.workspace.meta:**
```json
"title": "Заказать офисную мебель на заказ в Черногории — ARTIDOM",
"description": "Закажите стойки ресепшн, столы для переговоров и системы хранения для офисов и клиник. Изготовление в Баре по вашей планировке."
```

- [ ] **Step 2: Проверить билд**

```bash
cd artodom_com && npm run build
```

- [ ] **Step 3: Коммит**

```bash
cd artodom_com && git add src/messages/ru.json
git commit -m "seo: коммерческие ключи в meta-тегах (ru)"
```

---

### Task 8: Добавить meta и переводы для Blog

**Files:**
- Modify: `src/messages/en.json` — добавить namespace `Blog`
- Modify: `src/messages/sr.json` — добавить namespace `Blog`
- Modify: `src/messages/ru.json` — добавить namespace `Blog`
- Modify: `src/app/[locale]/blog/page.tsx` — добавить `generateMetadata` + перевести хардкод
- Modify: `src/app/[locale]/blog/[slug]/page.tsx` — добавить `generateMetadata`

- [ ] **Step 1: Добавить Blog namespace в en.json**

В `src/messages/en.json` добавить после секции `Footer`:

```json
"Blog": {
    "meta": {
        "title": "ARTIDOM Journal — Furniture, Materials & Projects in Montenegro",
        "description": "Articles about custom kitchens, materials, production and apartment projects in Montenegro from ARTIDOM workshop in Bar."
    },
    "title": "Journal",
    "subtitle": "Interior, materials, production notes from Montenegro",
    "empty": "Posts coming soon.",
    "back": "Journal"
}
```

- [ ] **Step 2: Добавить Blog namespace в sr.json**

```json
"Blog": {
    "meta": {
        "title": "ARTIDOM novosti — namještaj, materijali i projekti u Crnoj Gori",
        "description": "Članci o kuhinjama po mjeri, materijalima, proizvodnji i apartmanskim projektima u Crnoj Gori iz ARTIDOM radionice u Baru."
    },
    "title": "Novosti",
    "subtitle": "Enterijer, materijali, bilješke iz proizvodnje u Crnoj Gori",
    "empty": "Članci dolaze uskoro.",
    "back": "Novosti"
}
```

- [ ] **Step 3: Добавить Blog namespace в ru.json**

```json
"Blog": {
    "meta": {
        "title": "Журнал ARTIDOM — мебель, материалы и проекты в Черногории",
        "description": "Статьи о кухнях на заказ, материалах, производстве и проектах меблировки квартир в Черногории от цеха ARTIDOM в Баре."
    },
    "title": "Журнал",
    "subtitle": "Интерьер, материалы, заметки о производстве в Черногории",
    "empty": "Статьи скоро появятся.",
    "back": "Журнал"
}
```

- [ ] **Step 4: Обновить blog/page.tsx — добавить generateMetadata и переводы**

В `src/app/[locale]/blog/page.tsx`:

1. Обновить существующий импорт `next-intl/server` (строка 3 файла):

**Было:**
```tsx
import { setRequestLocale } from 'next-intl/server';
```
**Стало:**
```tsx
import { getTranslations, setRequestLocale } from 'next-intl/server';
```

Добавить новые импорты вверху файла:
```tsx
import { defaultLocale, isAppLocale } from '@/i18n/locale-config';
import { getPageMetadata } from '@/lib/seo/page-metadata';
import type { Metadata } from 'next';
```

2. Добавить `generateMetadata` перед `export default`:
```tsx
export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const appLocale = isAppLocale(locale) ? locale : defaultLocale;
  return getPageMetadata({ locale: appLocale, namespace: 'Blog', path: '/blog' });
}
```

3. Заменить хардкод на переводы. В теле компонента добавить:
```tsx
const t = await getTranslations('Blog');
```

Заменить:
- `<h1 ...>Journal</h1>` → `<h1 ...>{t('title')}</h1>`
- `<p ...>Interior, materials...</p>` → `<p ...>{t('subtitle')}</p>`
- `<p ...>Posts coming soon.</p>` → `<p ...>{t('empty')}</p>`

- [ ] **Step 5: Обновить blog/[slug]/page.tsx — добавить generateMetadata**

В `src/app/[locale]/blog/[slug]/page.tsx`:

1. Обновить существующий импорт `next-intl/server` (строка 5 файла):

**Было:**
```tsx
import { setRequestLocale } from 'next-intl/server';
```
**Стало:**
```tsx
import { getTranslations, setRequestLocale } from 'next-intl/server';
```

Добавить новые импорты вверху файла:
```tsx
import type { Metadata } from 'next';
import { defaultLocale, isAppLocale, type AppLocale } from '@/i18n/locale-config';
import { buildMetadata } from '@/lib/seo/page-metadata';
```

2. Добавить `generateMetadata` перед `export default`:
```tsx
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string; locale: string }>;
}): Promise<Metadata> {
  const { slug, locale } = await params;
  const appLocale = isAppLocale(locale) ? locale : defaultLocale;
  const post = await getPost(slug, locale);
  if (!post) return {};

  const title = post.seoTitle ?? post.title;
  const description = post.seoDescription ?? post.body.replace(/<[^>]*>/g, '').slice(0, 160);

  return buildMetadata({
    locale: appLocale,
    path: `/blog/${slug}`,
    title,
    description,
    image: post.coverImage?.url,
  });
}
```

3. Заменить хардкод "← Journal" (строка 39):
```tsx
// Добавить в начало компонента:
const t = await getTranslations('Blog');

// Заменить:
<Link href="/blog">← Journal</Link>
// На:
<Link href="/blog">← {t('back')}</Link>
```

- [ ] **Step 6: Проверить билд**

```bash
cd artodom_com && npm run build
```

- [ ] **Step 7: Коммит**

```bash
cd artodom_com && git add src/messages/ src/app/\[locale\]/blog/
git commit -m "seo: meta-теги и переводы для blog и blog/[slug]"
```

---

## Chunk 2: Блок 4 (лайтбокс проектов)

### Task 9: Расширить ImageLightbox — initialIndex + onLightboxChange

**Files:**
- Modify: `src/components/ImageLightbox/ImageLightbox.tsx` — добавить два опциональных пропа

- [ ] **Step 1: Добавить пропы в интерфейс**

В `src/components/ImageLightbox/ImageLightbox.tsx`:

Обновить `interface Props`:

```tsx
interface Props {
  images: string[]
  alt: string
  mainClassName?: string
  thumbClassName?: string
  imageClassName?: string
  mainHeight?: string
  thumbHeight?: string
  initialIndex?: number              // ← ДОБАВИТЬ
  onLightboxChange?: (index: number | null) => void  // ← ДОБАВИТЬ
}
```

- [ ] **Step 2: Добавить логику initialIndex**

В деструктуризации пропов добавить:

```tsx
export default function ImageLightbox({
  images,
  alt,
  mainClassName,
  thumbClassName,
  imageClassName,
  mainHeight = '550px',
  thumbHeight = '160px',
  initialIndex,           // ← ДОБАВИТЬ
  onLightboxChange,       // ← ДОБАВИТЬ
}: Props) {
```

Заменить `useState` для `lightboxIndex`:

```tsx
const [lightboxIndex, setLightboxIndex] = useState<number | null>(initialIndex ?? null)
```

- [ ] **Step 3: Добавить useEffect для колбэка**

После существующего `useEffect` (keyboard) добавить:

```tsx
useEffect(() => {
  onLightboxChange?.(lightboxIndex)
}, [lightboxIndex, onLightboxChange])
```

- [ ] **Step 4: Проверить билд**

```bash
cd artodom_com && npm run build
```

Ожидание: билд проходит. Существующие использования ImageLightbox (без новых пропов) работают как раньше.

- [ ] **Step 5: Коммит**

```bash
cd artodom_com && git add src/components/ImageLightbox/ImageLightbox.tsx
git commit -m "feat: ImageLightbox — initialIndex и onLightboxChange пропы"
```

---

### Task 10: Создать ProjectGallery компонент

**Files:**
- Create: `src/app/[locale]/projects/[slug]/ProjectGallery.tsx`

- [ ] **Step 1: Создать ProjectGallery.tsx**

```tsx
// src/app/[locale]/projects/[slug]/ProjectGallery.tsx
'use client'

import { useCallback } from 'react'
import { useSearchParams, useRouter, usePathname } from 'next/navigation'
import ImageLightbox from '@/components/ImageLightbox'

interface Props {
  images: string[]
  alt: string
}

export default function ProjectGallery({ images, alt }: Props) {
  const searchParams = useSearchParams()
  const router = useRouter()
  const pathname = usePathname()

  const photoParam = searchParams.get('photo')
  const initialIndex = photoParam ? Math.max(0, Math.min(parseInt(photoParam, 10) - 1, images.length - 1)) : undefined

  const handleLightboxChange = useCallback((index: number | null) => {
    if (index !== null) {
      router.replace(`${pathname}?photo=${index + 1}`, { scroll: false })
    } else {
      router.replace(pathname, { scroll: false })
    }
  }, [router, pathname])

  return (
    <ImageLightbox
      images={images}
      alt={alt}
      initialIndex={isNaN(initialIndex as number) ? undefined : initialIndex}
      onLightboxChange={handleLightboxChange}
    />
  )
}
```

- [ ] **Step 2: Проверить билд**

```bash
cd artodom_com && npm run build
```

- [ ] **Step 3: Коммит**

```bash
cd artodom_com && git add "src/app/[locale]/projects/[slug]/ProjectGallery.tsx"
git commit -m "feat: ProjectGallery — обёртка ImageLightbox с URL-синхронизацией"
```

---

### Task 11: Подключить ProjectGallery на странице проекта

**Files:**
- Modify: `src/app/[locale]/projects/[slug]/page.tsx:43,74-88` — заменить gallery на ProjectGallery

- [ ] **Step 1: Обновить page.tsx**

В `src/app/[locale]/projects/[slug]/page.tsx`:

1. Добавить импорт вверху файла:
```tsx
import { Suspense } from 'react';
import ProjectGallery from './ProjectGallery';
```

2. Удалить строку 43 (`const galleryImages = ...`) — больше не нужна, ImageLightbox сам разделяет cover + gallery.

3. Заменить блок галереи (строки 74-88):

**Было:**
```tsx
{galleryImages.length > 0 && (
    <section className={`container ${styles.gallery}`}>
        {galleryImages.map((image, index) => (
            <div key={`${project.slug}-${index}`} className={styles.galleryItem}>
                <Image
                    src={image}
                    alt={`${title} — ${index + 2}`}
                    fill
                    className={styles.galleryImage}
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
            </div>
        ))}
    </section>
)}
```

**Стало:**
```tsx
{project.images.length > 0 && (
    <section className={`container ${styles.gallery}`}>
        <Suspense>
            <ProjectGallery images={project.images} alt={title} />
        </Suspense>
    </section>
)}
```

4. Удалить `import Image from 'next/image'` если `Image` больше нигде не используется (hero image ещё использует его — оставить если да).

Проверить: hero image на строке 51-58 использует `<Image>`, значит импорт `Image` оставляем.

- [ ] **Step 2: Проверить билд**

```bash
cd artodom_com && npm run build
```

- [ ] **Step 3: Проверить визуально**

```bash
cd artodom_com && npm run dev
```

Открыть любой проект (например `http://localhost:3000/sr/projects/warm-minimal-apartment`):
- Картинки отображаются в сетке
- Клик по картинке → лайтбокс
- URL меняется на `?photo=N`
- Escape закрывает лайтбокс
- Стрелки переключают фото

- [ ] **Step 4: Коммит**

```bash
cd artodom_com && git add "src/app/[locale]/projects/[slug]/page.tsx"
git commit -m "feat: кликабельные изображения проектов с лайтбоксом и URL ?photo=N"
```

---

## Chunk 3: Блок 5 (GEO)

### Task 12: Создать llms.txt

**Files:**
- Create: `public/llms.txt`

- [ ] **Step 1: Создать llms.txt**

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

- [ ] **Step 2: Проверить билд**

```bash
cd artodom_com && npm run build
```

- [ ] **Step 3: Коммит**

```bash
cd artodom_com && git add public/llms.txt
git commit -m "geo: добавить llms.txt для AI-поисковиков"
```

---

### Task 13: Создать llms-full.txt

**Files:**
- Create: `public/llms-full.txt`

- [ ] **Step 1: Создать llms-full.txt**

```
# ARTIDOM — Custom Furniture Workshop in Montenegro
# Full reference for AI systems

> Custom kitchens, wardrobes and built-in furniture for apartments in Montenegro.
> Workshop in Sutomore, Bar. Measurement and installation across the coast and Podgorica.

## Company
- Legal name: Artidom DOO
- PIB (tax ID): 03505464
- Country: Montenegro
- Founded workshop in Bar for custom residential and B2B furniture production

## What we make
- Custom kitchens for apartments and villas
- Wardrobes and walk-in closets
- TV walls, entry storage, bathroom joinery
- Built-in shelving and storage systems
- Counters, reception desks and branded fronts for HoReCa
- Classroom storage, staff room furniture for education projects
- Meeting tables and office storage for workspaces and clinics

## Directions

### Residential (primary)
Custom kitchens, wardrobes, TV walls and apartment furnishing packages.
For apartment owners, investors and rental property managers.
One workshop handles the whole apartment: kitchen + wardrobes + storage + panels.

### HoReCa (secondary)
Restaurant counters, hotel room furniture, branded fronts and service joinery.
Selected projects only, when the brief is technical and the schedule is clear.

### Education
Classroom storage, reception zones, staff rooms and public joinery.
Batch production for consistent dimensions and finishes across the package.

### Workspace
Reception desks, meeting tables and built-in storage for offices, clinics and public spaces.
Built to actual floor plan, not standard modules.

## Workshop
- Location: Sutomore, Bar, Montenegro (Mirošica 2, 85000)
- Production floor: 300 sqm
- Equipment: CNC cutting machines, edge banding, assembly stations, finishing area
- Team: 40 craftsmen
- Capabilities: cutting, assembly, lacquer/veneer finishing, packing
- All stages in one facility

## Process
1. Brief — discuss layout, style, budget. On-site measurement in Bar, Budva, Podgorica.
2. Drawings & estimate — 3D renders, technical drawings, transparent cost estimate.
3. Production — CNC cutting, assembly, finishing at workshop in Sutomore.
4. Delivery & installation — on-site across Montenegro. Lead time 3–5 weeks from approval.

## Materials
- European-grade oak and veneer (EU suppliers)
- Lacquered MDF (project finish options)
- Compact HPL and stone tops (selected project suppliers)
- Blum, Hettich and other European fittings

## Service area
Bar, Budva, Tivat, Kotor, Herceg Novi, Podgorica — all of Montenegro.
Measurement and installation included for coastal cities and Podgorica.

## Pricing approach
Price depends on: project size, materials, finish complexity, number of units.
No fixed price list — each project is estimated individually.
Free estimate within 24 hours of receiving floor plan or brief.
Typical range: mid-segment (€€), competitive for custom workshop production.

## FAQ

Q: How long does a custom kitchen take?
A: 3–5 weeks from approval of drawings and materials.

Q: Do you deliver outside Bar?
A: Yes. Measurement, delivery and installation across Montenegro: Budva, Tivat, Kotor, Podgorica.

Q: What materials do you use?
A: European-grade oak, veneer, lacquered MDF, compact HPL and stone tops. Blum/Hettich fittings.

Q: Can you furnish a whole apartment?
A: Yes. Kitchen + wardrobes + storage + TV wall + bathroom joinery in one package from one workshop.

Q: How much does a custom kitchen cost in Montenegro?
A: Price depends on size, materials and layout. Send a floor plan for a free estimate within 24 hours.

Q: Do you work with architects and developers?
A: Yes. We take B2B and HoReCa projects with technical drawings (DWG, PDF).

Q: Do you work with rental properties?
A: Yes. We specify finishes that hold up in daily use and short-stay rentals.

## Contact
- Contact person: Veronika
- Phone: +382 69 256 978
- Email: artidom96@gmail.com
- WhatsApp: +7 912 037 0170
- Address: Mirošica 2, Sutomore, 85000 Bar, Montenegro
- Working hours: Mon–Fri 09:00–18:00

## Links
- Website: https://artidom.art
- Projects (SR): https://artidom.art/sr/projects
- Projects (EN): https://artidom.art/en/projects
- Catalog (SR): https://artidom.art/sr/catalog
- Catalog (EN): https://artidom.art/en/catalog
- Workshop: https://artidom.art/sr/workshop
- Contact: https://artidom.art/sr/contact
- Residential: https://artidom.art/sr/solutions/residential
- HoReCa: https://artidom.art/sr/solutions/horeca
```

- [ ] **Step 2: Проверить билд**

```bash
cd artodom_com && npm run build
```

- [ ] **Step 3: Коммит**

```bash
cd artodom_com && git add public/llms-full.txt
git commit -m "geo: добавить llms-full.txt — расширенная справка для AI"
```

---

### Task 14: Добавить FAQ на главную страницу

**Files:**
- Modify: `src/messages/en.json` — добавить namespace `FAQ`
- Modify: `src/messages/sr.json` — добавить namespace `FAQ`
- Modify: `src/messages/ru.json` — добавить namespace `FAQ`
- Modify: `src/app/[locale]/page.tsx` — добавить FAQSection + FAQPage schema

- [ ] **Step 1: Добавить FAQ namespace в en.json**

```json
"FAQ": {
    "title": "Frequently asked questions",
    "items": [
        {
            "question": "How long does a custom kitchen take?",
            "answer": "3–5 weeks from approval of drawings and materials."
        },
        {
            "question": "Do you deliver outside Bar?",
            "answer": "Yes. Measurement, delivery and installation across Montenegro: Budva, Tivat, Kotor, Podgorica."
        },
        {
            "question": "What materials do you use?",
            "answer": "European-grade oak, veneer, lacquered MDF, compact HPL and stone tops with Blum/Hettich fittings."
        },
        {
            "question": "Can you furnish a whole apartment?",
            "answer": "Yes — kitchen, wardrobes, storage, TV wall and bathroom joinery in one package from one workshop."
        },
        {
            "question": "How much does a custom kitchen cost in Montenegro?",
            "answer": "Price depends on size, materials and layout. Send a floor plan for a free estimate within 24 hours."
        },
        {
            "question": "Do you work with architects and developers?",
            "answer": "Yes. We accept B2B and HoReCa projects with technical drawings (DWG, PDF)."
        }
    ]
}
```

- [ ] **Step 2: Добавить FAQ namespace в sr.json**

```json
"FAQ": {
    "title": "Često postavljana pitanja",
    "items": [
        {
            "question": "Koliko traje izrada kuhinje po mjeri?",
            "answer": "3–5 sedmica od odobrenja crteža i materijala."
        },
        {
            "question": "Da li dostavljate van Bara?",
            "answer": "Da. Mjerenje, isporuka i montaža širom Crne Gore: Budva, Tivat, Kotor, Podgorica."
        },
        {
            "question": "Koje materijale koristite?",
            "answer": "Hrast evropskog kvaliteta, furnir, lakirani MDF, kompakt HPL i kamene ploče. Blum/Hettich okovi."
        },
        {
            "question": "Možete li opremiti cijeli apartman?",
            "answer": "Da — kuhinja, plakari, odlaganje, TV zid i kupatilski elementi u jednom paketu iz jedne radionice."
        },
        {
            "question": "Koliko košta kuhinja po mjeri u Crnoj Gori?",
            "answer": "Cijena zavisi od veličine, materijala i rasporeda. Pošaljite osnovu za besplatnu procjenu u roku od 24 sata."
        },
        {
            "question": "Da li radite sa arhitektama i investitorima?",
            "answer": "Da. Prihvatamo B2B i HoReCa projekte sa tehničkim crtežima (DWG, PDF)."
        }
    ]
}
```

- [ ] **Step 3: Добавить FAQ namespace в ru.json**

```json
"FAQ": {
    "title": "Частые вопросы",
    "items": [
        {
            "question": "Сколько времени занимает изготовление кухни на заказ?",
            "answer": "3–5 недель с момента согласования чертежей и материалов."
        },
        {
            "question": "Вы доставляете за пределы Бара?",
            "answer": "Да. Замер, доставка и монтаж по всей Черногории: Будва, Тиват, Котор, Подгорица."
        },
        {
            "question": "Какие материалы вы используете?",
            "answer": "Дуб европейского качества, шпон, лакированный МДФ, компакт HPL и каменные столешницы. Фурнитура Blum/Hettich."
        },
        {
            "question": "Можно ли заказать меблировку всей квартиры?",
            "answer": "Да — кухня, шкафы, хранение, ТВ-зона и мебель для ванной в одном пакете из одного цеха."
        },
        {
            "question": "Сколько стоит кухня на заказ в Черногории?",
            "answer": "Цена зависит от размера, материалов и планировки. Пришлите план для бесплатного расчёта в течение 24 часов."
        },
        {
            "question": "Вы работаете с архитекторами и застройщиками?",
            "answer": "Да. Берём B2B и HoReCa проекты с техническими чертежами (DWG, PDF)."
        }
    ]
}
```

- [ ] **Step 4: Добавить FAQSection на главную**

В `src/app/[locale]/page.tsx`:

1. Добавить импорты:
```tsx
import FAQSection from '@/components/FaqSection';
import { getFaqPageSchema } from '@/lib/seo/local-page-schema';
```

2. В теле компонента (после `const howToSchema = ...`) добавить:
```tsx
const faqT = await getTranslations('FAQ');
const faqItems = (faqT.raw('items') as Array<{ question: string; answer: string }>);
const faqSchema = getFaqPageSchema(faqItems);
```

3. Добавить второй `<script>` для FAQ schema рядом с существующим `howToSchema` (строка 53):
```tsx
<script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }} />
<script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
```

4. Добавить `<FAQSection>` перед CTA-блоком (перед строкой 129 `{/* CTA Block */}`):
```tsx
{/* FAQ */}
<section className="container">
    <FAQSection title={faqT('title')} items={faqItems} />
</section>
```

- [ ] **Step 5: Проверить билд**

```bash
cd artodom_com && npm run build
```

- [ ] **Step 6: Коммит**

```bash
cd artodom_com && git add src/messages/ src/app/\[locale\]/page.tsx
git commit -m "geo: FAQ schema + секция на главной (3 локали)"
```

---

### Task 15: Блок цен (pricing) на главной

**Files:**
- Modify: `src/messages/en.json` — добавить `Index.pricing.*`
- Modify: `src/messages/sr.json` — добавить `Index.pricing.*`
- Modify: `src/messages/ru.json` — добавить `Index.pricing.*`
- Modify: `src/app/[locale]/page.tsx` — добавить секцию pricing

- [ ] **Step 1: Добавить pricing ключи в en.json**

В секции `Index` после `cta`:

```json
"pricing": {
    "title": "Pricing approach",
    "text": "Every project is priced individually based on size, materials, finish complexity and number of units. There is no fixed price list — we estimate each order after reviewing the floor plan or brief. A typical apartment kitchen in Montenegro starts from a mid-range budget. Send your plan for a free estimate within 24 hours.",
    "cta": "Get a free estimate →"
}
```

- [ ] **Step 2: Добавить pricing ключи в sr.json**

```json
"pricing": {
    "title": "Kako formiramo cijenu",
    "text": "Svaki projekat se kalkuliše pojedinačno na osnovu veličine, materijala, složenosti završne obrade i broja jedinica. Nemamo fiksni cjenovnik — procjenu radimo nakon pregleda osnove ili opisa projekta. Tipična kuhinja po mjeri za apartman u Crnoj Gori kreće od srednjeg budžeta. Pošaljite plan za besplatnu procjenu u roku od 24 sata.",
    "cta": "Zatražite besplatnu procjenu →"
}
```

- [ ] **Step 3: Добавить pricing ключи в ru.json**

```json
"pricing": {
    "title": "Как формируется цена",
    "text": "Каждый проект рассчитывается индивидуально: размер, материалы, сложность отделки, количество изделий. Фиксированного прайс-листа нет — смету составляем после изучения плана или описания проекта. Типичная кухня на заказ для квартиры в Черногории начинается от среднего бюджета. Пришлите план для бесплатного расчёта в течение 24 часов.",
    "cta": "Получить бесплатный расчёт →"
}
```

- [ ] **Step 4: Добавить секцию на главную**

В `src/app/[locale]/page.tsx`, перед FAQ-секцией добавить:

```tsx
{/* Pricing */}
<section className={`container ${styles.pricing}`}>
    <span className={styles.label}>{t('pricing.title')}</span>
    <p className={styles.pricingText}>{t('pricing.text')}</p>
    <Link href="/contact" className={styles.pricingCta}>{t('pricing.cta')}</Link>
</section>
```

- [ ] **Step 5: Добавить стили pricing в page.module.css**

В `src/app/[locale]/page.module.css` добавить:

```css
.pricing {
    padding: var(--section-padding, 80px 0);
}

.pricingText {
    max-width: 680px;
    line-height: 1.7;
    color: var(--color-muted, #a09b93);
    margin-bottom: 24px;
}

.pricingCta {
    display: inline-block;
    color: var(--color-accent, #7a826e);
    font-weight: 500;
}
```

- [ ] **Step 6: Проверить билд**

```bash
cd artodom_com && npm run build
```

- [ ] **Step 7: Коммит**

```bash
cd artodom_com && git add src/messages/ src/app/\[locale\]/page.tsx src/app/\[locale\]/page.module.css
git commit -m "geo: секция pricing на главной (3 локали, ключ cijena/цена)"
```

---

### Task 16: Усилить Schema.org — hasOfferCatalog + priceRange

**Files:**
- Modify: `src/lib/seo/schema.ts` — добавить `hasOfferCatalog` и `priceRange`

- [ ] **Step 1: Обновить schema.ts**

В `src/lib/seo/schema.ts`, в объекте `getSchemaData`, перед `"sameAs": []` добавить:

```typescript
"priceRange": "€€",
"hasOfferCatalog": {
    "@type": "OfferCatalog",
    "name": "Custom furniture",
    "itemListElement": [
        {
            "@type": "Offer",
            "itemOffered": {
                "@type": "Service",
                "name": "Custom kitchens"
            }
        },
        {
            "@type": "Offer",
            "itemOffered": {
                "@type": "Service",
                "name": "Wardrobes and built-in storage"
            }
        },
        {
            "@type": "Offer",
            "itemOffered": {
                "@type": "Service",
                "name": "Apartment furnishing packages"
            }
        },
        {
            "@type": "Offer",
            "itemOffered": {
                "@type": "Service",
                "name": "HoReCa and B2B joinery"
            }
        }
    ]
},
```

- [ ] **Step 2: Проверить билд**

```bash
cd artodom_com && npm run build
```

- [ ] **Step 3: Коммит**

```bash
cd artodom_com && git add src/lib/seo/schema.ts
git commit -m "geo: hasOfferCatalog и priceRange в Schema.org"
```

---

## Chunk 4: Блок 3 (статические OG-картинки)

### Task 17: Создать скрипт генерации OG

**Files:**
- Create: `scripts/generate-og.ts`

- [ ] **Step 1: Установить зависимости**

```bash
cd artodom_com && npm install --save-dev satori sharp @types/sharp
```

Примечание: `satori` генерирует SVG из JSX, `sharp` конвертирует SVG → PNG.

- [ ] **Step 2: Скачать шрифт для satori**

Satori требует хотя бы один шрифт. Скачать Inter:

```bash
cd artodom_com && curl -L -o scripts/Inter-Regular.ttf "https://github.com/rsms/inter/raw/master/fonts/InterVariable.ttf"
```

Если curl не работает — скачать вручную с https://rsms.me/inter/ и сохранить как `scripts/Inter-Regular.ttf`.

- [ ] **Step 3: Создать scripts/generate-og.ts**

```typescript
// scripts/generate-og.ts
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
                    style: { fontSize: '13px', color: '#7a826e', letterSpacing: '3px', textTransform: 'uppercase' },
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
    console.log(`✓ ${page.file} (${(buffer.length / 1024).toFixed(0)} KB)`);
  }

  console.log(`\nGenerated ${pages.length} OG images in public/og/`);
}

main().catch(console.error);
```

- [ ] **Step 4: Запустить скрипт**

```bash
cd artodom_com && npx tsx scripts/generate-og.ts
```

Ожидание: 9 PNG-файлов в `public/og/`, каждый < 300 KB.

- [ ] **Step 5: Коммит**

```bash
cd artodom_com && git add scripts/generate-og.ts scripts/Inter-Regular.ttf public/og/
git commit -m "feat: скрипт генерации статических OG-картинок + 9 PNG"
```

---

### Task 18: Подключить статические OG в buildMetadata

**Files:**
- Modify: `src/lib/seo/page-metadata.ts:41-72` — маппинг path → статический OG

- [ ] **Step 1: Добавить маппинг статических OG**

В `src/lib/seo/page-metadata.ts`, перед функцией `buildMetadata` добавить:

```typescript
const staticOgImages: Record<string, string> = {
  '': '/og/home.png',
  '/workshop': '/og/workshop.png',
  '/catalog': '/og/catalog.png',
  '/projects': '/og/projects.png',
  '/contact': '/og/contact.png',
  '/solutions/residential': '/og/residential.png',
  '/solutions/horeca': '/og/horeca.png',
  '/solutions/workspace': '/og/workspace.png',
  '/solutions/education': '/og/education.png',
};
```

- [ ] **Step 2: Обновить buildMetadata — использовать статический OG**

В функции `buildMetadata`, заменить строку с `images`:

**Было (строка 70):**
```typescript
images: [{ url: image ? resolveImageUrl(image) : `${siteUrl}/api/og?title=${encodeURIComponent(title)}&subtitle=${encodeURIComponent(description.slice(0, 100))}` }],
```

**Стало:**
```typescript
images: [{ url: image
    ? resolveImageUrl(image)
    : staticOgImages[normalizePath(path)]
        ? `${siteUrl}${staticOgImages[normalizePath(path)]}`
        : `${siteUrl}/api/og?title=${encodeURIComponent(title)}&subtitle=${encodeURIComponent(description.slice(0, 100))}`
}],
```

Логика: если передан `image` (напр. обложка проекта) → используем его. Иначе: если путь есть в маппинге → статический PNG. Иначе → динамический `/api/og`.

- [ ] **Step 3: Проверить билд**

```bash
cd artodom_com && npm run build
```

- [ ] **Step 4: Коммит**

```bash
cd artodom_com && git add src/lib/seo/page-metadata.ts
git commit -m "seo: статические OG-картинки для ключевых страниц, динамические для slug-страниц"
```

---

## Финальная проверка

### Task 19: Полный билд и визуальная проверка

- [ ] **Step 1: Полный билд**

```bash
cd artodom_com && npm run build
```

Ожидание: билд проходит без ошибок и warnings.

- [ ] **Step 2: Визуальная проверка dev-сервера**

```bash
cd artodom_com && npm run dev
```

Проверить:
1. Главная (`/sr/`) — FAQ-секция видна, pricing-секция видна
2. Футер — новый email, телефон, иконки WhatsApp/Viber
3. Контакты (`/sr/contact`) — новый email, телефон, иконки мессенджеров
4. Проект (`/sr/projects/warm-minimal-apartment`) — картинки кликабельны, лайтбокс работает, URL `?photo=N`
5. Блог (`/sr/blog`) — переведённый заголовок, не "Journal"
6. View source главной — FAQPage JSON-LD присутствует
7. `artidom.art/llms.txt` (после деплоя) — файл доступен
8. OG-картинки: `curl -I https://localhost:3000/og/home.png` — 200

- [ ] **Step 3: Коммит всех оставшихся изменений (если есть)**

```bash
cd artodom_com && git status
```

Если есть незакоммиченные файлы — добавить и закоммитить.

---

## Ручные задачи (вне кода)

После деплоя передать владельцу:

1. **Google Business Profile** — создать профиль: Artidom DOO, Mirošica 2, Sutomore, 85000 Bar, Montenegro. Категория: Furniture Store. Телефон: +382 69 256 978. Сайт: https://artidom.art
2. **Проверить OG-картинки** — вставить URL в Facebook Sharing Debugger, Twitter Card Validator, Telegram
3. **Проверить llms.txt** — открыть https://artidom.art/llms.txt в браузере
