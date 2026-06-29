import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import { appLocales, defaultLocale, type AppLocale } from '@/i18n/locale-config';

const siteUrl = 'https://artidom.art';

const localeNames: Record<AppLocale, string> = {
  en: 'English',
  sr: 'Srpski',
  ru: 'Русский',
};

const localeKeywords: Record<AppLocale, string[]> = {
  en: [
    'custom kitchens Montenegro',
    'custom furniture Montenegro',
    'apartment furnishing Montenegro',
    'custom wardrobes Montenegro',
    'custom kitchen Bar Montenegro',
    'furniture maker Montenegro',
    'kitchen prices Montenegro',
  ],
  sr: [
    'kuhinje po mjeri crna gora',
    'kuhinje po mjeri bar crna gora',
    'namjestaj po mjeri crna gora',
    'namještaj po mjeri crna gora',
    'izrada namještaja po mjeri',
    'namjestaj po mjeri bar',
    'plakari po mjeri crna gora',
    'kuhinje po mjeri bar',
    'kuhinje po mjeri podgorica',
    'opremanje apartmana crna gora',
    'cijena kuhinje po mjeri',
  ],
  ru: [
    'кухни на заказ Черногория',
    'мебель на заказ Черногория',
    'мебель Черногория',
    'мебель на заказ Бар Черногория',
    'шкафы на заказ Черногория',
    'шкафы-купе на заказ Черногория',
    'меблировка квартиры Черногория',
    'стоимость кухни на заказ Черногория',
    'производство мебели Черногория',
  ],
};

const pathKeywords: Record<string, string[]> = {
  '': ['ARTIDOM', 'furniture workshop Bar', 'Zaljevo Bar Montenegro', 'kuhinje po mjeri Bar Crna Gora'],
  '/workshop': ['custom furniture workshop Montenegro', 'custom joinery Montenegro', 'carpentry workshop Bar', 'izrada namještaja po mjeri Bar'],
  '/catalog': ['custom apartment kitchen', 'built-in wardrobe system', 'service counter joinery', 'kuhinje po mjeri', 'plakari po mjeri'],
  '/projects': ['custom furniture projects Montenegro', 'apartment kitchen projects', 'wardrobe projects Montenegro', 'namjestaj po mjeri slike', 'kuhinje po mjeri slike'],
  '/solutions/residential': ['apartment furnishing services Montenegro', 'rental apartment furnishing', 'custom kitchens and wardrobes'],
  '/solutions/residential/bar': ['custom kitchens Bar', 'custom furniture Bar Montenegro', 'kuhinje po mjeri Bar', 'kuhinje po mjeri Bar Crna Gora', 'namještaj po mjeri Bar', 'izrada namještaja po mjeri Bar'],
  '/solutions/residential/budva': ['custom furniture Budva', 'apartment fit-out Budva', 'namjestaj po mjeri Budva', 'kuhinje po mjeri Budva'],
  '/solutions/residential/podgorica': ['custom kitchens Podgorica', 'apartment furnishing Podgorica', 'namjestaj po mjeri Podgorica', 'kuhinje po mjeri Podgorica'],
  '/solutions/residential/cijena': ['custom kitchen cost Montenegro', 'kuhinje po mjeri cijena', 'cijena kuhinje po mjeri', 'цена кухни на заказ Черногория'],
  '/solutions/horeca': ['restaurant furniture Montenegro', 'hotel furniture Montenegro', 'bar counter Montenegro custom'],
  '/solutions/workspace': ['custom office furniture Montenegro', 'reception desk Montenegro'],
  '/solutions/education': ['school furniture Montenegro', 'classroom storage Montenegro'],
};

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

function getMetadataKeywords(locale: AppLocale, path = '') {
  const normalizedPath = normalizePath(path);
  const exactPathKeywords = pathKeywords[normalizedPath] ?? [];

  return Array.from(new Set([
    ...exactPathKeywords,
    ...localeKeywords[locale],
  ]));
}

function getOgImageAlt(locale: AppLocale, path: string, title: string) {
  const normalizedPath = normalizePath(path);

  if (normalizedPath.includes('/solutions/residential/cijena')) {
    return locale === 'ru'
      ? 'Расчет стоимости кухни и мебели на заказ в Черногории от ARTIDOM'
      : locale === 'sr'
        ? 'Procjena cijene kuhinje po mjeri i namještaja u Crnoj Gori'
        : 'Custom kitchen pricing and furniture estimate in Montenegro by ARTIDOM';
  }

  if (normalizedPath.includes('/workshop')) {
    return locale === 'ru'
      ? 'Мебельный цех ARTIDOM в Залево, Бар, Черногория'
      : locale === 'sr'
        ? 'ARTIDOM radionica za namještaj po mjeri u Zaljevu, Bar'
        : 'ARTIDOM custom furniture workshop in Zaljevo, Bar, Montenegro';
  }

  return `${title} - ARTIDOM Montenegro`;
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
  const normalizedPath = normalizePath(path);
  const imageUrl = image
    ? resolveImageUrl(image)
    : staticOgImages[normalizedPath]
      ? `${siteUrl}${staticOgImages[normalizedPath]}`
      : `${siteUrl}/api/og?title=${encodeURIComponent(title)}&subtitle=${encodeURIComponent(description.slice(0, 100))}`;
  const imageAlt = getOgImageAlt(locale, normalizedPath, title);

  return {
    title,
    description,
    applicationName: 'ARTIDOM',
    authors: [{ name: 'ARTIDOM', url: siteUrl }],
    creator: 'ARTIDOM',
    publisher: 'ARTIDOM',
    category: 'custom furniture',
    classification: 'LocalBusiness',
    keywords: getMetadataKeywords(locale, path),
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-image-preview': 'large',
        'max-snippet': -1,
        'max-video-preview': -1,
      },
    },
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
      images: [{ url: imageUrl, alt: imageAlt }],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [{ url: imageUrl, alt: imageAlt }],
    },
    formatDetection: {
      telephone: false,
      address: false,
      email: false,
    },
    other: {
      'geo.region': 'ME',
      'geo.placename': 'Bar, Montenegro',
      ICBM: '42.0649384, 19.1172821',
      language: localeNames[locale],
      'business:contact_data:country_name': 'Montenegro',
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
