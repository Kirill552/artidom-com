import { appLocales, defaultLocale, type AppLocale } from '../../i18n/locale-config.ts';

const BASE_URL = 'https://artidom.art';

type LocalePathMap = Partial<Record<AppLocale, string>>;

type SitemapAlternates = {
  languages: Record<string, string>;
};

function localizedUrl(locale: AppLocale, path: string) {
  return `${BASE_URL}/${locale}${path}`;
}

export function buildSitemapAlternates(pathsByLocale: LocalePathMap): SitemapAlternates | undefined {
  const localesWithPath = appLocales.filter((locale) => pathsByLocale[locale] !== undefined);

  if (localesWithPath.length < 2) {
    return undefined;
  }

  const xDefaultLocale = pathsByLocale[defaultLocale] !== undefined ? defaultLocale : localesWithPath[0];
  const languages = Object.fromEntries(
    localesWithPath.map((locale) => [locale, localizedUrl(locale, pathsByLocale[locale] ?? '')]),
  );

  return {
    languages: {
      ...languages,
      'x-default': localizedUrl(xDefaultLocale, pathsByLocale[xDefaultLocale] ?? ''),
    },
  };
}

export function buildSharedPathAlternates(path: string): SitemapAlternates {
  const pathsByLocale = Object.fromEntries(
    appLocales.map((locale) => [locale, path]),
  ) as Record<AppLocale, string>;

  const alternates = buildSitemapAlternates(pathsByLocale);

  if (!alternates) {
    throw new Error(`Expected shared alternates for ${path}`);
  }

  return alternates;
}
