import { notFound } from 'next/navigation';
import { getPost } from '@/lib/cms';
import WorkshopProof from '@/components/WorkshopProof';
import { Link } from '@/i18n/routing';
import { setRequestLocale } from 'next-intl/server';
import styles from './page.module.css';

export default async function PostPage({ params }: { params: Promise<{ slug: string, locale: string }> }) {
  const { slug, locale } = await params;
  setRequestLocale(locale);
  const post = await getPost(slug, locale);
  if (!post) notFound();

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
        <Link href="/blog">← Journal</Link>
      </div>
    </main>
  );
}
