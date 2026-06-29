import type { MetadataRoute } from 'next';
import { appLocales } from '@/i18n/locale-config';
import { catalogItems } from '@/lib/catalog';
import { projects } from '@/lib/projects';
import { getPosts } from '@/lib/cms';
import { buildSharedPathAlternates, buildSitemapAlternates } from '@/lib/seo/sitemap-alternates';

const BASE_URL = 'https://artidom.art';
const SEO_UPDATE_DATE = '2026-04-24';

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
        alternates: buildSharedPathAlternates(page.path),
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
        alternates: buildSharedPathAlternates(`/solutions/residential/${slug}`),
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
        alternates: buildSharedPathAlternates(`/catalog/${item.slug}`),
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
        alternates: buildSharedPathAlternates(`/projects/${project.slug}`),
        images: project.images.map((image) => `${BASE_URL}${image}`),
      });
    }
  }

  for (const locale of appLocales) {
    const posts = await getPosts(locale);
    for (const post of posts) {
      const path = `/blog/${post.slug}`;
      const alternates = buildSitemapAlternates({ [locale]: path });

      entries.push({
        url: `${BASE_URL}/${locale}${path}`,
        lastModified: post.publishedAt ? new Date(post.publishedAt) : new Date('2026-03-08'),
        changeFrequency: 'monthly',
        priority: 0.6,
        ...(alternates ? { alternates } : {}),
        images: post.coverImage ? [`${BASE_URL}${post.coverImage.url}`] : undefined,
      });
    }
  }

  return entries;
}
