import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import { appLocales, defaultLocale, type AppLocale } from '@/i18n/locale-config';

const siteUrl = 'https://www.artidom.art';

function normalizePath(path = '') {
  if (!path || path === '/') {
    return '';
  }

  return path.startsWith('/') ? path : `/${path}`;
}

function resolveImageUrl(image: string) {
  if (image.startsWith('http://') || image.startsWith('https://')) {
    return image;
  }

  return `${siteUrl}${image.startsWith('/') ? image : `/${image}`}`;
}

export function getLocalizedUrl(locale: AppLocale, path = '') {
  return `${siteUrl}/${locale}${normalizePath(path)}`;
}

export function getPageAlternates(path = '') {
  const languages = Object.fromEntries(
    appLocales.map((locale) => [locale, getLocalizedUrl(locale, path)]),
  ) as Record<AppLocale, string>;

  return {
    canonical: getLocalizedUrl(defaultLocale, path),
    languages: {
      ...languages,
      'x-default': getLocalizedUrl(defaultLocale, path),
    },
  };
}

export function buildMetadata({
  locale,
  path = '',
  title,
  description,
  image,
}: {
  locale: AppLocale;
  path?: string;
  title: string;
  description: string;
  image?: string;
}): Metadata {
  const url = getLocalizedUrl(locale, path);

  return {
    title,
    description,
    alternates: {
      canonical: url,
      languages: getPageAlternates(path).languages,
    },
    openGraph: {
      title,
      description,
      url,
      siteName: 'ARTIDOM',
      locale: locale === 'sr' ? 'sr_ME' : 'en_US',
      type: 'website',
      images: [{ url: image ? resolveImageUrl(image) : `${siteUrl}/api/og?title=${encodeURIComponent(title)}&subtitle=${encodeURIComponent(description.slice(0, 100))}` }],
    },
  };
}

export async function getPageMetadata({
  locale,
  namespace,
  path = '',
  image,
}: {
  locale: AppLocale;
  namespace: string;
  path?: string;
  image?: string;
}) {
  const t = await getTranslations({ locale, namespace });

  return buildMetadata({
    locale,
    path,
    image,
    title: t('meta.title'),
    description: t('meta.description'),
  });
}
