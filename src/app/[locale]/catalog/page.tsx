import type { Metadata } from 'next';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { catalogItems } from '@/lib/catalog';
import WorkshopProof from '@/components/WorkshopProof';
import { CatalogGrid } from '@/components/CatalogGrid';
import { defaultLocale, isAppLocale, type AppLocale } from '@/i18n/locale-config';
import { getPageMetadata } from '@/lib/seo/page-metadata';
import { getBreadcrumbSchema } from '@/lib/seo/local-page-schema';
import styles from './page.module.css';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const appLocale = isAppLocale(locale) ? locale : defaultLocale;

  return getPageMetadata({ locale: appLocale, namespace: 'Catalog', path: '/catalog' });
}

export default async function CatalogPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations('Catalog');
  const localeKey: AppLocale = isAppLocale(locale) ? locale : defaultLocale;

  const breadcrumbSchema = getBreadcrumbSchema([
    { name: localeKey === 'sr' ? 'Početna' : 'Home', url: `https://artidom.art/${locale}` },
    { name: t('title'), url: `https://artidom.art/${locale}/catalog` },
  ]);

  return (
    <>
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
    <main>
      <section className={`container ${styles.header}`}>
        <h1 className={styles.title}>{t('title')}</h1>
        <p className={styles.subtitle}>{t('subtitle')}</p>

        <CatalogGrid
          items={catalogItems}
          locale={localeKey}
          tabs={{
            all: t('tabs.all'),
            kitchens: t('tabs.kitchens'),
            storage: t('tabs.storage'),
            bespoke: t('tabs.bespoke'),
          }}
          categories={{
            kitchens: t('categories.kitchens'),
            storage: t('categories.storage'),
            bespoke: t('categories.bespoke'),
          }}
          cardCta={t('card_cta')}
        />
      </section>

      <WorkshopProof variant="catalog" />
    </main>
    </>
  );
}
