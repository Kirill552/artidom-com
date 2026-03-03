export const appLocales = ['sr', 'en'] as const;

export type AppLocale = (typeof appLocales)[number];

export const defaultLocale: AppLocale = 'sr';

export function isAppLocale(locale: string): locale is AppLocale {
  return appLocales.some((appLocale) => appLocale === locale);
}

export function replaceLocaleInPathname(pathname: string | null, locale: AppLocale): string {
  if (!pathname || pathname === '/') {
    return `/${locale}`;
  }

  const prefixRegex = new RegExp(`^/(${appLocales.join('|')})(?=/|$)`);

  if (prefixRegex.test(pathname)) {
    const localizedPath = pathname.replace(prefixRegex, `/${locale}`);
    return localizedPath === '' ? `/${locale}` : localizedPath;
  }

  return `/${locale}${pathname.startsWith('/') ? pathname : `/${pathname}`}`;
}
