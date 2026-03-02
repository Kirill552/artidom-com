import type { Metadata } from 'next';
import Image from 'next/image';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { Link } from '@/i18n/routing';
import { catalogItems, getCatalogLocaleValue } from '@/lib/catalog';
import WorkshopProof from '@/components/WorkshopProof';
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
    { name: localeKey === 'sr' ? 'Početna' : 'Home', url: `https://www.artidom.art/${locale}` },
    { name: t('title'), url: `https://www.artidom.art/${locale}/catalog` },
  ]);

  return (
    <>
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
    <main>
      <section className={`container ${styles.header}`}>
        <h1 className={styles.title}>{t('title')}</h1>
        <p className={styles.subtitle}>{t('subtitle')}</p>

        <div className={styles.tabs}>
          {(['all', 'kitchens', 'storage', 'bespoke'] as const).map((c) => (
            <span key={c} className={styles.tab}>{t(`tabs.${c}`)}</span>
          ))}
        </div>
      </section>

      <WorkshopProof variant="catalog" />

      <section className={`container ${styles.grid}`}>
        {catalogItems.map((item) => {
          const name = item.name[localeKey];
          const leadTime = getCatalogLocaleValue(item.leadTime, localeKey);

          return (
            <Link key={item.slug} href={`/catalog/${item.slug}`} className={styles.card}>
              <div className={styles.cardImage}>
                <Image
                  src={item.coverImage}
                  alt={name}
                  fill
                  className={styles.image}
                  sizes="(max-width: 900px) 100vw, (max-width: 1400px) 50vw, 33vw"
                />
              </div>
              <div className={styles.cardInfo}>
                <span className={styles.cardName}>{name}</span>
                <span className={styles.cardMeta}>
                  {t(`categories.${item.category}`)} · {leadTime}
                </span>
                <span className={styles.cardCta}>{t('card_cta')}</span>
              </div>
            </Link>
          );
        })}
      </section>
    </main>
    </>
  );
}
