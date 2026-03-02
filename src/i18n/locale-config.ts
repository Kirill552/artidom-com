export const appLocales = ['sr', 'en'] as const;
export const legacyLocales = ['de'] as const;
export const allLocales = [...appLocales, ...legacyLocales] as const;

export type AppLocale = (typeof appLocales)[number];

export const defaultLocale: AppLocale = 'sr';

export function isAppLocale(locale: string): locale is AppLocale {
  return appLocales.some((appLocale) => appLocale === locale);
}

export function replaceLocaleInPathname(pathname: string | null, locale: AppLocale): string {
  if (!pathname || pathname === '/') {
    return `/${locale}`;
  }

  const prefixRegex = new RegExp(`^/(${allLocales.join('|')})(?=/|$)`);

  if (prefixRegex.test(pathname)) {
    const localizedPath = pathname.replace(prefixRegex, `/${locale}`);
    return localizedPath === '' ? `/${locale}` : localizedPath;
  }

  return `/${locale}${pathname.startsWith('/') ? pathname : `/${pathname}`}`;
}

export function mapLegacyLocalePathname(pathname: string): string | null {
  if (!pathname.match(/^\/de(?=\/|$)/)) {
    return null;
  }

  const localizedPath = pathname.replace(/^\/de(?=\/|$)/, `/${defaultLocale}`);
  return localizedPath === '' ? `/${defaultLocale}` : localizedPath;
}
