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
        namespace: 'Solutions.workspace',
        path: '/solutions/workspace',
        image: '/images/projects/workspace-cover.webp',
    });
}

export default async function WorkspacePage({ params }: { params: Promise<{ locale: string }> }) {
    const { locale } = await params;
    const appLocale = isAppLocale(locale) ? locale : defaultLocale;
    setRequestLocale(appLocale);
    const t = await getTranslations({ locale: appLocale, namespace: 'Solutions.workspace' });

    const breadcrumbSchema = getBreadcrumbSchema([
        { name: appLocale === 'sr' ? 'Početna' : 'Home', url: `https://artidom.art/${appLocale}` },
        { name: appLocale === 'sr' ? 'Rješenja' : 'Solutions', url: `https://artidom.art/${appLocale}/solutions` },
        { name: appLocale === 'sr' ? 'Radni prostor' : 'Workspace', url: `https://artidom.art/${appLocale}/solutions/workspace` },
    ]);
    const serviceSchema = getServiceSchema({
        title: t('title'),
        description: t('description'),
        areaServed: appLocale === 'ru' ? 'Черногория' : appLocale === 'sr' ? 'Crna Gora' : 'Montenegro',
        image: '/images/projects/workspace-cover.webp',
        path: '/solutions/workspace',
        locale: appLocale,
    });

    return (
        <>
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }} />
            <SectorPage sector="workspace" proofVariant="default" />
        </>
    );
}
