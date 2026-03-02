import { notFound } from 'next/navigation';
import { getCatalogItem } from '@/lib/catalog';
import { Link } from '@/i18n/routing';
import { setRequestLocale } from 'next-intl/server';
import styles from './page.module.css';

export default async function CatalogItemPage({ params }: { params: Promise<{ slug: string, locale: string }> }) {
    const { slug, locale } = await params;
    setRequestLocale(locale);
    const item = getCatalogItem(slug);
    if (!item) notFound();

    const name = item.name[locale as 'en' | 'sr'] ?? item.name.en;
    const desc = item.description[locale as 'en' | 'sr'] ?? item.description.en;

    return (
        <main className="container">
            <section className={styles.page}>
                <div className={styles.gallery}>
                    <div className={styles.mainImage} />
                </div>

                <div className={styles.specs}>
                    <h1 className={styles.name}>{name}</h1>
                    <p className={styles.desc}>{desc}</p>

                    <dl className={styles.specList}>
                        <dt>Material</dt><dd>{item.material} ({item.origin})</dd>
                        <dt>Dimensions</dt><dd>{item.dimensions}</dd>
                        <dt>Finish options</dt><dd>{item.finishOptions.join(', ')}</dd>
                        <dt>Lead time</dt><dd>{item.leadTime}</dd>
                    </dl>

                    <Link href="/contact" className={styles.cta}>
                        Request this product →
                    </Link>
                </div>
            </section>
        </main>
    );
}
