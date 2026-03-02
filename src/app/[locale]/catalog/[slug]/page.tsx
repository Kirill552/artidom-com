import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { Link } from '@/i18n/routing';
import {
    getCatalogItem,
    getCatalogLocaleValue,
} from '@/lib/catalog';
import { buildMetadata } from '@/lib/seo/page-metadata';
import { defaultLocale, isAppLocale, type AppLocale } from '@/i18n/locale-config';
import styles from './page.module.css';

export async function generateMetadata({
    params,
}: {
    params: Promise<{ slug: string; locale: string }>;
}): Promise<Metadata> {
    const { slug, locale } = await params;
    const item = getCatalogItem(slug);
    const appLocale = isAppLocale(locale) ? locale : defaultLocale;

    if (!item) {
        return {};
    }

    return buildMetadata({
        locale: appLocale,
        path: `/catalog/${slug}`,
        image: item.coverImage,
        title: item.name[appLocale],
        description: item.description[appLocale],
    });
}

export default async function CatalogItemPage({ params }: { params: Promise<{ slug: string, locale: string }> }) {
    const { slug, locale } = await params;
    setRequestLocale(locale);
    const item = getCatalogItem(slug);
    if (!item) notFound();

    const t = await getTranslations('Catalog');
    const localeKey: AppLocale = isAppLocale(locale) ? locale : defaultLocale;
    const name = item.name[localeKey];
    const desc = item.description[localeKey];
    const material = getCatalogLocaleValue(item.material, localeKey);
    const origin = getCatalogLocaleValue(item.origin, localeKey);
    const dimensions = getCatalogLocaleValue(item.dimensions, localeKey);
    const leadTime = getCatalogLocaleValue(item.leadTime, localeKey);
    const finishOptions = item.finishOptions.map((option) => getCatalogLocaleValue(option, localeKey));
    const galleryImages = item.images.slice(1);

    return (
        <main className="container">
            <section className={styles.page}>
                <div className={styles.gallery}>
                    <div className={styles.mainImage}>
                        <Image
                            src={item.coverImage}
                            alt={name}
                            fill
                            className={styles.image}
                            sizes="(max-width: 1100px) 100vw, 55vw"
                        />
                    </div>
                    {galleryImages.length > 0 && (
                        <div className={styles.galleryGrid}>
                            {galleryImages.map((image, index) => (
                                <div key={`${item.slug}-${index}`} className={styles.galleryThumb}>
                                    <Image
                                        src={image}
                                        alt={`${name} ${index + 2}`}
                                        fill
                                        className={styles.image}
                                        sizes="(max-width: 1100px) 50vw, 20vw"
                                    />
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                <div className={styles.specs}>
                    <h1 className={styles.name}>{name}</h1>
                    <p className={styles.desc}>{desc}</p>

                    <dl className={styles.specList}>
                        <dt>{t('specs.material')}</dt><dd>{material}</dd>
                        <dt>{t('specs.origin')}</dt><dd>{origin}</dd>
                        <dt>{t('specs.dimensions')}</dt><dd>{dimensions}</dd>
                        <dt>{t('specs.finish')}</dt><dd>{finishOptions.join(', ')}</dd>
                        <dt>{t('specs.lead_time')}</dt><dd>{leadTime}</dd>
                    </dl>

                    <Link href="/contact" className={styles.cta}>
                        {t('request_cta')}
                    </Link>
                </div>
            </section>
        </main>
    );
}
