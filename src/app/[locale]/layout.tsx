import { NextIntlClientProvider } from 'next-intl';
import { SpeedInsights } from '@vercel/speed-insights/next';
import { Analytics } from '@vercel/analytics/next';
import { getMessages, setRequestLocale } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { defaultLocale, isAppLocale } from '@/i18n/locale-config';
import { getSchemaData } from '@/lib/seo/schema';
import Nav from '@/components/Nav';
import Footer from '@/components/Footer';
import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  metadataBase: new URL('https://artidom.com'),
  title: { default: 'ARTIDOM | Furniture Manufacturing Montenegro', template: '%s | ARTIDOM' },
  description: 'Custom furniture manufacturing in Bar, Montenegro. FF&E for hotels, schools, villas. EU delivery.',
  openGraph: {
    siteName: 'ARTIDOM',
    locale: 'sr_ME',
    type: 'website',
  },
};

export default async function LocaleLayout({
  children,
  params
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (!isAppLocale(locale)) {
    notFound();
  }

  setRequestLocale(locale);

  const messages = await getMessages();
  const schemaData = getSchemaData(locale);

  return (
    <html lang={locale}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }}
        />
        <link rel="alternate" hrefLang="en" href="https://artidom.com/en/" />
        <link rel="alternate" hrefLang="sr" href="https://artidom.com/sr/" />
        <link rel="alternate" hrefLang="x-default" href={`https://artidom.com/${defaultLocale}/`} />
      </head>
      <body>
        <NextIntlClientProvider messages={messages} locale={locale}>
          <div className="container">
            <Nav />
          </div>

          {children}

          <Footer />
        </NextIntlClientProvider>
        <SpeedInsights />
        <Analytics />
      </body>
    </html>
  );
}
