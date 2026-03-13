import type { MetadataRoute } from 'next';
import { appLocales } from '@/i18n/locale-config';
import { catalogItems } from '@/lib/catalog';
import { projects } from '@/lib/projects';
import { getPosts } from '@/lib/cms';

const BASE_URL = 'https://artidom.art';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const entries: MetadataRoute.Sitemap = [];

  const staticPages = [
    { path: '', priority: 1.0, lastModified: '2026-03-08' },
    { path: '/workshop', priority: 0.9, lastModified: '2026-03-08' },
    { path: '/catalog', priority: 0.8, lastModified: '2026-03-08' },
    { path: '/projects', priority: 0.8, lastModified: '2026-03-08' },
    { path: '/solutions/residential', priority: 0.8, lastModified: '2026-03-08' },
    { path: '/solutions/horeca', priority: 0.7, lastModified: '2026-03-08' },
    { path: '/solutions/education', priority: 0.6, lastModified: '2026-03-08' },
    { path: '/solutions/workspace', priority: 0.6, lastModified: '2026-03-08' },
    { path: '/contact', priority: 0.7, lastModified: '2026-03-08' },
    { path: '/blog', priority: 0.6, lastModified: '2026-03-08' },
  ];

  const residentialLocalSlugs = ['bar', 'podgorica', 'budva', 'cijena'];

  for (const page of staticPages) {
    for (const locale of appLocales) {
      entries.push({
        url: `${BASE_URL}/${locale}${page.path}`,
        lastModified: new Date(page.lastModified),
        changeFrequency: page.priority >= 0.8 ? 'weekly' : 'monthly',
        priority: page.priority,
      });
    }
  }

  for (const slug of residentialLocalSlugs) {
    for (const locale of appLocales) {
      entries.push({
        url: `${BASE_URL}/${locale}/solutions/residential/${slug}`,
        lastModified: new Date('2026-03-08'),
        changeFrequency: 'monthly',
        priority: 0.8,
      });
    }
  }

  for (const item of catalogItems) {
    for (const locale of appLocales) {
      entries.push({
        url: `${BASE_URL}/${locale}/catalog/${item.slug}`,
        lastModified: new Date('2026-03-08'),
        changeFrequency: 'monthly',
        priority: 0.7,
      });
    }
  }

  for (const project of projects) {
    for (const locale of appLocales) {
      entries.push({
        url: `${BASE_URL}/${locale}/projects/${project.slug}`,
        lastModified: new Date('2026-03-08'),
        changeFrequency: 'monthly',
        priority: 0.7,
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
      });
    }
  }

  return entries;
}
