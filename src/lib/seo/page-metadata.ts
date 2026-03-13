import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import { appLocales, defaultLocale, type AppLocale } from '@/i18n/locale-config';

const siteUrl = 'https://artidom.art';

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
      locale: locale === 'sr' ? 'sr_ME' : locale === 'ru' ? 'ru_RU' : 'en_US',
      type: 'website',
      images: [{ url: image
        ? resolveImageUrl(image)
        : staticOgImages[normalizePath(path)]
          ? `${siteUrl}${staticOgImages[normalizePath(path)]}`
          : `${siteUrl}/api/og?title=${encodeURIComponent(title)}&subtitle=${encodeURIComponent(description.slice(0, 100))}`
      }],
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
