import { NextIntlClientProvider } from 'next-intl';
import { getMessages, setRequestLocale } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { Commissioner, Unbounded } from 'next/font/google';
import { appLocales, isAppLocale } from '@/i18n/locale-config';
import { getSchemaData, getWebSiteSchema } from '@/lib/seo/schema';
import Nav from '@/components/Nav';
import Footer from '@/components/Footer';
import AnalyticsScripts from '@/components/AnalyticsScripts';
import Spotlight from '@/components/motion/Spotlight';
import RevealController from '@/components/motion/RevealController';
import type { Metadata } from 'next';
import './globals.css';

const commissioner = Commissioner({
  subsets: ['latin', 'latin-ext', 'cyrillic'],
  weight: ['400', '500', '600'],
  display: 'swap',
  variable: '--font-main',
});

const unbounded = Unbounded({
  subsets: ['latin', 'latin-ext', 'cyrillic'],
  weight: ['500', '600'],
  display: 'swap',
  variable: '--font-display',
});

export const metadata: Metadata = {
  metadataBase: new URL('https://artidom.art'),
  title: { default: 'ARTIDOM | Custom Kitchens & Furniture in Montenegro', template: '%s | ARTIDOM' },
  description: 'Custom kitchens, wardrobes and apartment furniture made in Bar, Montenegro. Residential projects first, selected HoReCa and B2B fit-outs.',
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: '48x48', type: 'image/x-icon' },
      { url: '/favicon-120x120.png', sizes: '120x120', type: 'image/png' },
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

// Static rendering: prerender all locales at build time (TTFB via CDN instead of SSR)
export function generateStaticParams() {
  return appLocales.map((locale) => ({ locale }));
}

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
  const websiteSchema = getWebSiteSchema(locale);

  return (
    <html lang={locale} className={`${commissioner.variable} ${unbounded.variable}`} suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html:
              "try{var d=document.documentElement;d.classList.add('js');if(sessionStorage.getItem('artidom_seen')){d.classList.add('veil-skip')}else{sessionStorage.setItem('artidom_seen','1')}}catch(e){d.classList.add('js')}",
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
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
        <Spotlight />
        <RevealController />
        <AnalyticsScripts />
      </body>
    </html>
  );
}
