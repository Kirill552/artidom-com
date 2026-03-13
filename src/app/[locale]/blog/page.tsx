import { Link } from '@/i18n/routing';
import { getPosts } from '@/lib/cms';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { defaultLocale, isAppLocale } from '@/i18n/locale-config';
import { getPageMetadata } from '@/lib/seo/page-metadata';
import type { Metadata } from 'next';
import styles from './page.module.css';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const appLocale = isAppLocale(locale) ? locale : defaultLocale;
  return getPageMetadata({ locale: appLocale, namespace: 'Blog', path: '/blog' });
}

export default async function BlogPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const posts = await getPosts(locale);
  const t = await getTranslations('Blog');

  return (
    <main className="container">
      <section className={styles.header}>
        <h1 className={styles.title}>{t('title')}</h1>
        <p className={styles.subtitle}>{t('subtitle')}</p>
      </section>

      {posts.length === 0 ? (
        <p className={styles.empty}>{t('empty')}</p>
      ) : (
        <div className={styles.grid}>
          {posts.map((post, i) => (
            <Link
              key={post.id}
              href={`/blog/${post.slug}`}
              className={`${styles.card} ${i === 0 ? styles.cardWide : ''}`}
            >
              {post.coverImage && (
                <div className={styles.cardImage} style={{ backgroundImage: `url(${post.coverImage.url})` }} />
              )}
              <div className={styles.cardBody}>
                <span className={styles.cardTag}>{post.tag}</span>
                <h2 className={styles.cardTitle}>{post.title}</h2>
                <span className={styles.cardDate}>
                  {new Date(post.publishedAt).toLocaleDateString()}
                </span>
              </div>
            </Link>
          ))}
        </div>
      )}
    </main>
  );
}
