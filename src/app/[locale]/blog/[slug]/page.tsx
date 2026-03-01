import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import fs from 'fs/promises';
import path from 'path';

async function getArticle(slug: string) {
  try {
    const dataFilePath = path.join(process.cwd(), 'data', 'articles.json');
    const fileData = await fs.readFile(dataFilePath, 'utf-8');
    const articles = JSON.parse(fileData);
    return articles.find((a: any) => a.slug === slug);
  } catch (e) {
    return null;
  }
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const article = await getArticle(slug);
  
  if (!article) return { title: 'Not Found' };
  
  return {
    title: `${article.title} | ARTIDOM Journal`,
    description: article.excerpt,
  };
}

export default async function ArticlePage({ params }: { params: Promise<{ slug: string, locale: string }> }) {
  const { slug, locale } = await params;
  const article = await getArticle(slug);

  if (!article) notFound();

  const schema = {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": article.title,
    "description": article.excerpt,
    "datePublished": article.date,
    "author": { "@type": "Organization", "name": "ARTIDOM" }
  };

  return (
    <main style={{ minHeight: '100vh', padding: '6rem 0' }}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      <div className="container" style={{ maxWidth: '800px' }}>
        <span style={{ textTransform: 'uppercase', letterSpacing: '2px', color: 'var(--color-accent)', fontSize: '0.8rem', fontWeight: '600' }}>
          {new Date(article.date).toLocaleDateString(locale)}
        </span>
        <h1 style={{ fontSize: '3.5rem', margin: '1.5rem 0 3rem 0' }}>{article.title}</h1>
        
        <div style={{ fontSize: '1.2rem', lineHeight: '1.8', color: 'var(--color-text)', opacity: 0.9 }}>
          {article.content.split('\n').map((paragraph: string, i: number) => (
            <p key={i} style={{ marginBottom: '1.5rem' }}>{paragraph}</p>
          ))}
        </div>
      </div>
    </main>
  );
}
