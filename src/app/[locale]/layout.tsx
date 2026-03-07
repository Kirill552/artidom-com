import { NextIntlClientProvider } from 'next-intl';
import { SpeedInsights } from '@vercel/speed-insights/next';
import { Analytics } from '@vercel/analytics/next';
import Script from 'next/script';
import { getMessages, setRequestLocale } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { Outfit, Cormorant_Garamond } from 'next/font/google';
import { isAppLocale } from '@/i18n/locale-config';
import { getSchemaData } from '@/lib/seo/schema';
import Nav from '@/components/Nav';
import Footer from '@/components/Footer';
import type { Metadata } from 'next';
import './globals.css';

const outfit = Outfit({
  subsets: ['latin', 'latin-ext'],
  weight: ['200', '300', '400', '500', '600'],
  display: 'swap',
  variable: '--font-main',
});

const cormorant = Cormorant_Garamond({
  subsets: ['latin', 'latin-ext', 'cyrillic'],
  weight: ['300', '400', '600'],
  style: ['normal', 'italic'],
  display: 'swap',
  variable: '--font-display',
});

export const metadata: Metadata = {
  metadataBase: new URL('https://www.artidom.art'),
  title: { default: 'ARTIDOM | Custom Kitchens & Furniture in Montenegro', template: '%s | ARTIDOM' },
  description: 'Custom kitchens, wardrobes and apartment furniture made in Bar, Montenegro. Residential projects first, selected HoReCa and B2B fit-outs.',
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: '48x48' },
      { url: '/favicon.svg', type: 'image/svg+xml' },
      { url: '/favicon-96x96.png', sizes: '96x96', type: 'image/png' },
    ],
    apple: '/apple-touch-icon.png',
  },
  manifest: '/site.webmanifest',
  openGraph: {
    siteName: 'ARTIDOM',
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
    <html lang={locale} className={`${outfit.variable} ${cormorant.variable}`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }}
        />
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
        {/* Google Analytics */}
        <Script
          id="google-analytics"
          strategy="lazyOnload"
          src="https://www.googletagmanager.com/gtag/js?id=G-45T3K75X9X"
        />
        <Script
          id="google-analytics-config"
          strategy="lazyOnload"
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-45T3K75X9X');
            `,
          }}
        />
      </body>
    </html>
  );
}
