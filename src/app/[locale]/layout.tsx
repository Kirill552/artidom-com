import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { routing } from '@/i18n/routing';
import { getSchemaData } from '@/lib/seo/schema';
import Link from 'next/link';
import './globals.css';

export default async function LocaleLayout({
  children,
  params
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (!routing.locales.includes(locale as any)) {
    notFound();
  }

  const messages = await getMessages();
  const schemaData = getSchemaData(locale);

  return (
    <html lang={locale}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }}
        />
      </head>
      <body>
        <NextIntlClientProvider messages={messages}>
          <div className="container">
            <header className="site-header">
              <div className="site-logo">Artidom</div>
              <nav className="site-nav">
                <Link href={`/${locale}/solutions`}>solutions</Link>
                <Link href={`/${locale}/catalog`}>catalog</Link>
                <Link href={`/${locale}/workshop`}>the workshop</Link>
                <Link href={`/${locale}/blog`}>journal (seo)</Link>
              </nav>
            </header>
          </div>
          
          {children}

          <footer className="site-footer">
            <div className="container">
              <h2>ARTIDOM</h2>
              <p>Montenegro Manufacturing Facility &bull; 2026</p>
            </div>
          </footer>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
