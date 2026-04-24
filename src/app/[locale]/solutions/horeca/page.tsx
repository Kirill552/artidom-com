import type { Metadata } from 'next';
import SectorPage from '@/components/SectorPage';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { defaultLocale, isAppLocale } from '@/i18n/locale-config';
import { getPageMetadata } from '@/lib/seo/page-metadata';
import { getBreadcrumbSchema, getServiceSchema } from '@/lib/seo/local-page-schema';

export async function generateMetadata({
    params,
}: {
    params: Promise<{ locale: string }>;
}): Promise<Metadata> {
    const { locale } = await params;
    const appLocale = isAppLocale(locale) ? locale : defaultLocale;

    return getPageMetadata({
        locale: appLocale,
        namespace: 'Solutions.horeca',
        path: '/solutions/horeca',
        image: '/images/projects/horeca-counters/03.webp',
    });
}

export default async function HoRecaPage({ params }: { params: Promise<{ locale: string }> }) {
    const { locale } = await params;
    const appLocale = isAppLocale(locale) ? locale : defaultLocale;
    setRequestLocale(appLocale);
    const t = await getTranslations({ locale: appLocale, namespace: 'Solutions.horeca' });

    const breadcrumbSchema = getBreadcrumbSchema([
        { name: appLocale === 'sr' ? 'Početna' : 'Home', url: `https://artidom.art/${appLocale}` },
        { name: appLocale === 'sr' ? 'Rješenja' : 'Solutions', url: `https://artidom.art/${appLocale}/solutions` },
        { name: 'HoReCa', url: `https://artidom.art/${appLocale}/solutions/horeca` },
    ]);
    const serviceSchema = getServiceSchema({
        title: t('title'),
        description: t('description'),
        areaServed: appLocale === 'ru' ? 'Черногория' : appLocale === 'sr' ? 'Crna Gora' : 'Montenegro',
        image: '/images/projects/horeca-counters/03.webp',
        path: '/solutions/horeca',
        locale: appLocale,
    });

    return (
        <>
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }} />
            <SectorPage sector="horeca" proofVariant="horeca" />
        </>
    );
}
