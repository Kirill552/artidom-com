import { Link } from '@/i18n/routing';
import { getPosts } from '@/lib/cms';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { defaultLocale, isAppLocale } from '@/i18n/locale-config';
import { getPageMetadata } from '@/lib/seo/page-metadata';
import type { Metadata } from 'next';
import Image from 'next/image';
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
  const [featured, ...restPosts] = posts;

  return (
    <main className="container">
      <section className={styles.header}>
        <h1 className={styles.title}>{t('title')}</h1>
        <p className={styles.subtitle}>{t('subtitle')}</p>
      </section>

      {posts.length === 0 ? (
        <p className={styles.empty}>{t('empty')}</p>
      ) : (
        <>
          <Link href={`/blog/${featured.slug}`} className={styles.featured}>
            {featured.coverImage && (
              <span className={styles.featuredFrame}>
                <Image
                  src={featured.coverImage.url}
                  alt={`${featured.title} - ARTIDOM journal`}
                  fill
                  className={styles.featuredImage}
                  sizes="(max-width: 900px) 100vw, 90vw"
                />
              </span>
            )}
            <span className={styles.featuredCap}>
              <span className={styles.cardMeta}>
                {featured.tag} &middot; {new Date(featured.publishedAt).toLocaleDateString()}
              </span>
              <h2 className={styles.featuredTitle}>{featured.title}</h2>
            </span>
          </Link>

          <div className={styles.rows}>
            {restPosts.map((post) => (
              <Link key={post.id} href={`/blog/${post.slug}`} className={styles.row}>
                <span className={styles.rowMeta}>
                  {new Date(post.publishedAt).toLocaleDateString()} &middot; {post.tag}
                </span>
                <span className={styles.rowBody}>
                  <span className={styles.rowTitle}>{post.title}</span>
                  {post.seoDescription && (
                    <span className={styles.rowExcerpt}>{post.seoDescription}</span>
                  )}
                </span>
              </Link>
            ))}
          </div>
        </>
      )}
    </main>
  );
}
