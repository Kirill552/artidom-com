import { createNavigation } from 'next-intl/navigation';
import { defineRouting } from 'next-intl/routing';
import { appLocales, defaultLocale } from './locale-config';

export const routing = defineRouting({
  locales: appLocales,
  defaultLocale,
  localePrefix: 'always',
  // hreflang отдаём через HTML metadata + sitemap; отключаем дублирующий Link header от next-intl
  alternateLinks: false
});

export const { Link, redirect, usePathname, useRouter, getPathname } = createNavigation(routing);
