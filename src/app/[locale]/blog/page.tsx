import { Link } from '@/i18n/routing';
import { getPosts } from '@/lib/cms';
import { setRequestLocale } from 'next-intl/server';
import styles from './page.module.css';

export default async function BlogPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const posts = await getPosts(locale);

  return (
    <main className="container">
      <section className={styles.header}>
        <h1 className={styles.title}>Journal</h1>
        <p className={styles.subtitle}>Interior, materials, production notes from Montenegro</p>
      </section>

      {posts.length === 0 ? (
        <p className={styles.empty}>Posts coming soon.</p>
      ) : (
        <div className={styles.grid}>
          {posts.map((post, i) => (
            <Link
              key={post.id}
              href={`/blog/${post.slug}`}
              className={`${styles.card} ${i === 0 ? styles.cardWide : ''}`}
            >
              <div className={styles.cardImage} />
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
