import type { MetadataRoute } from 'next';
import { appLocales, defaultLocale } from '@/i18n/locale-config';
import { catalogItems } from '@/lib/catalog';
import { projects } from '@/lib/projects';
import { getPosts } from '@/lib/cms';

const BASE_URL = 'https://artidom.art';
const SEO_UPDATE_DATE = '2026-04-24';

function localizedAlternates(path: string) {
  return {
    languages: {
      ...Object.fromEntries(appLocales.map((locale) => [locale, `${BASE_URL}/${locale}${path}`])),
      'x-default': `${BASE_URL}/${defaultLocale}${path}`,
    },
  };
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const entries: MetadataRoute.Sitemap = [];

  const staticPages = [
    { path: '', priority: 1.0, lastModified: SEO_UPDATE_DATE },
    { path: '/workshop', priority: 0.9, lastModified: SEO_UPDATE_DATE },
    { path: '/catalog', priority: 0.8, lastModified: SEO_UPDATE_DATE },
    { path: '/projects', priority: 0.8, lastModified: SEO_UPDATE_DATE },
    { path: '/solutions/residential', priority: 0.85, lastModified: SEO_UPDATE_DATE },
    { path: '/solutions/horeca', priority: 0.7, lastModified: '2026-03-08' },
    { path: '/solutions/education', priority: 0.6, lastModified: '2026-03-01' },
    { path: '/solutions/workspace', priority: 0.6, lastModified: '2026-03-01' },
    { path: '/contact', priority: 0.7, lastModified: '2026-03-08' },
    { path: '/blog', priority: 0.6, lastModified: '2026-03-10' },
  ];

  const residentialLocalSlugs = ['bar', 'podgorica', 'budva', 'cijena'];

  for (const page of staticPages) {
    for (const locale of appLocales) {
      entries.push({
        url: `${BASE_URL}/${locale}${page.path}`,
        lastModified: new Date(page.lastModified),
        changeFrequency: page.priority >= 0.8 ? 'weekly' : 'monthly',
        priority: page.priority,
        alternates: localizedAlternates(page.path),
      });
    }
  }

  for (const slug of residentialLocalSlugs) {
    for (const locale of appLocales) {
      entries.push({
        url: `${BASE_URL}/${locale}/solutions/residential/${slug}`,
        lastModified: new Date('2026-03-15'),
        changeFrequency: 'weekly',
        priority: slug === 'cijena' ? 0.85 : 0.8,
        alternates: localizedAlternates(`/solutions/residential/${slug}`),
      });
    }
  }

  for (const item of catalogItems) {
    for (const locale of appLocales) {
      entries.push({
        url: `${BASE_URL}/${locale}/catalog/${item.slug}`,
        lastModified: new Date('2026-03-15'),
        changeFrequency: 'monthly',
        priority: 0.7,
        alternates: localizedAlternates(`/catalog/${item.slug}`),
        images: item.images.map((image) => `${BASE_URL}${image}`),
      });
    }
  }

  for (const project of projects) {
    for (const locale of appLocales) {
      entries.push({
        url: `${BASE_URL}/${locale}/projects/${project.slug}`,
        lastModified: new Date('2026-03-15'),
        changeFrequency: 'monthly',
        priority: 0.7,
        alternates: localizedAlternates(`/projects/${project.slug}`),
        images: project.images.map((image) => `${BASE_URL}${image}`),
      });
    }
  }

  for (const locale of appLocales) {
    const posts = await getPosts(locale);
    for (const post of posts) {
      entries.push({
        url: `${BASE_URL}/${locale}/blog/${post.slug}`,
        lastModified: post.publishedAt ? new Date(post.publishedAt) : new Date('2026-03-08'),
        changeFrequency: 'monthly',
        priority: 0.6,
        alternates: localizedAlternates(`/blog/${post.slug}`),
        images: post.coverImage ? [`${BASE_URL}${post.coverImage.url}`] : undefined,
      });
    }
  }

  return entries;
}
