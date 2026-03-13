import { notFound } from 'next/navigation';
import { getPost } from '@/lib/cms';
import WorkshopProof from '@/components/WorkshopProof';
import { Link } from '@/i18n/routing';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { defaultLocale, isAppLocale, type AppLocale } from '@/i18n/locale-config';
import { buildMetadata } from '@/lib/seo/page-metadata';
import type { Metadata } from 'next';
import styles from './page.module.css';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string; locale: string }>;
}): Promise<Metadata> {
  const { slug, locale } = await params;
  const appLocale = isAppLocale(locale) ? locale : defaultLocale;
  const post = await getPost(slug, locale);
  if (!post) return {};

  const title = post.seoTitle ?? post.title;
  const description = post.seoDescription ?? post.body.replace(/<[^>]*>/g, '').slice(0, 160);

  return buildMetadata({
    locale: appLocale,
    path: `/blog/${slug}`,
    title,
    description,
    image: post.coverImage?.url,
  });
}

export default async function PostPage({ params }: { params: Promise<{ slug: string, locale: string }> }) {
  const { slug, locale } = await params;
  setRequestLocale(locale);
  const post = await getPost(slug, locale);
  if (!post) notFound();
  const t = await getTranslations('Blog');

  return (
    <main>
      {post.coverImage && (
        <div className={styles.heroImage} style={{ backgroundImage: `url(${post.coverImage.url})` }} />
      )}

      <article className={`container ${styles.article}`}>
        <div className={styles.meta}>
          <span className={styles.tag}>{post.tag}</span>
          <span className={styles.date}>
            {new Date(post.publishedAt).toLocaleDateString()}
          </span>
        </div>

        <h1 className={styles.title}>{post.title}</h1>

        <div
          className={styles.body}
          dangerouslySetInnerHTML={{ __html: post.body }}
        />
      </article>

      <WorkshopProof />

      <div className={`container ${styles.back}`}>
        <Link href="/blog">← {t('back')}</Link>
      </div>
    </main>
  );
}
