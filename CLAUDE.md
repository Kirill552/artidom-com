# Artidom — международный сайт (artidom.art)

Next.js + next-intl. Зарубежный сайт для EU-рынка (EN/DE/SR). Деплой через GitHub → Vercel.

## ВАЖНО: два проекта

| Проект | Домен | Деплой | Путь |
|--------|-------|--------|------|
| **Этот** | artidom.art | GitHub → Vercel (auto) | `artodom_com/` |
| **Русский** | a-96.ru | SSH → сервер 176.108.245.56 | `artidom_ru/` |

Это НЕ один проект. Не путать деплой — русский сайт на Vercel не деплоится.

## Команды

- `npm run dev` — разработка (Turbopack)
- `npm run build` — production сборка
- `git push origin main` — триггерит автодеплой на Vercel

## Деплой

Push в `main` на GitHub → Vercel автоматически билдит и деплоит.
Репо: `github.com/Kirill552/artidom-com`
См. `.claude/rules/deploy.md`

## Архитектура

| Путь | Назначение |
|------|-----------|
| `src/app/[locale]/` | Страницы с роутингом по локали |
| `src/components/` | UI компоненты |
| `src/messages/` | Переводы: en.json, de.json, sr.json |
| `src/i18n/` | Конфиг next-intl (routing, request) |
| `src/middleware.ts` | Locale middleware |

## i18n

Локали: `en`, `de`, `sr`. Default: `en`. Prefix: always (`/en/`, `/de/`, `/sr/`).

**Критично:** динамический import с template literal не работает в Turbopack production.
Используется статический import map в `src/i18n/request.ts`.

## Стек

Next.js 15, next-intl 4.8.3, TypeScript, Turbopack, Vercel
