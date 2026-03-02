import { Link } from '@/i18n/routing';
import { catalogItems } from '@/lib/catalog';
import WorkshopProof from '@/components/WorkshopProof';
import { setRequestLocale } from 'next-intl/server';
import styles from './page.module.css';

export default async function CatalogPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <main>
      <section className={`container ${styles.header}`}>
        <h1 className={styles.title}>What we make</h1>
        <p className={styles.subtitle}>Custom-produced in Bar, Montenegro. Lead time 3–6 weeks.</p>

        <div className={styles.tabs}>
          {(['all', 'kitchens', 'storage', 'bespoke'] as const).map((c) => (
            <span key={c} className={styles.tab}>{c}</span>
          ))}
        </div>
      </section>

      <WorkshopProof variant="catalog" />

      <section className={`container ${styles.grid}`}>
        {catalogItems.map((item) => {
          const name = item.name[locale as 'en' | 'sr'] ?? item.name.en;
          return (
            <Link key={item.slug} href={`/catalog/${item.slug}`} className={styles.card}>
              <div className={styles.cardImage} />
              <div className={styles.cardInfo}>
                <span className={styles.cardName}>{name}</span>
                <span className={styles.cardMeta}>{item.material} · {item.dimensions}</span>
                <span className={styles.cardCta}>Request →</span>
              </div>
            </Link>
          );
        })}
      </section>
    </main>
  );
}
