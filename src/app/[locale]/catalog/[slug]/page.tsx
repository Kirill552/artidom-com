import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { Link } from '@/i18n/routing';
import {
    getCatalogItem,
    getCatalogLocaleValue,
} from '@/lib/catalog';
import { ImageLightbox } from '@/components/ImageLightbox';
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

    return (
        <main className="container">
            <section className={styles.page}>
                <ImageLightbox
                    images={item.images}
                    alt={name}
                    mainClassName={styles.mainImage}
                    thumbClassName={styles.galleryThumb}
                    imageClassName={styles.image}
                />

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
