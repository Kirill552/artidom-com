import { createNavigation } from 'next-intl/navigation';
import { defineRouting } from 'next-intl/routing';
import { appLocales, defaultLocale } from './locale-config';

export const routing = defineRouting({
  locales: appLocales,
  defaultLocale,
  localePrefix: 'always'
});

export const { Link, redirect, usePathname, useRouter, getPathname } = createNavigation(routing);
