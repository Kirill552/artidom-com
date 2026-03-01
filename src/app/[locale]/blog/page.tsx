import Link from 'next/link';
import fs from 'fs/promises';
import path from 'path';

async function getArticles() {
  try {
    const dataFilePath = path.join(process.cwd(), 'data', 'articles.json');
    const fileData = await fs.readFile(dataFilePath, 'utf-8');
    return JSON.parse(fileData);
  } catch (e) {
    return [];
  }
}

export default async function BlogIndexPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const articles = await getArticles();

  return (
    <main style={{ minHeight: '100vh', padding: '6rem 0' }}>
      <div className="container">
        <h1 style={{ fontSize: '4rem', marginBottom: '1rem' }}>Journal & Insights (SEO)</h1>
        <p style={{ fontSize: '1.2rem', opacity: 0.8, marginBottom: '4rem' }}>
          Industry insights, case studies, and updates automatically published via AI.
        </p>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '2rem', maxWidth: '800px' }}>
          {articles.map((article: any) => (
            <Link 
              key={article.slug} 
              href={`/${locale}/blog/${article.slug}`}
              style={{
                display: 'block',
                padding: '2.5rem',
                background: 'white',
                borderRadius: '20px',
                boxShadow: 'var(--shadow-soft)',
                border: '1px solid rgba(0,0,0,0.03)'
              }}
            >
              <h2 style={{ fontSize: '2rem', marginBottom: '1rem', color: 'var(--color-accent)' }}>
                {article.title}
              </h2>
              <p style={{ opacity: 0.8, fontSize: '1.1rem', marginBottom: '1.5rem', lineHeight: '1.6' }}>{article.excerpt}</p>
              <span style={{ fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '1px', opacity: 0.5, fontWeight: '600' }}>
                {new Date(article.date).toLocaleDateString(locale)}
              </span>
            </Link>
          ))}
          {articles.length === 0 && <p>No articles found. Use the API to publish.</p>}
        </div>
      </div>
    </main>
  );
}
