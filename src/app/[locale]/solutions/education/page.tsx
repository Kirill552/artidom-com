import type { Metadata } from 'next';
import SectorPage from '@/components/SectorPage';
import { setRequestLocale } from 'next-intl/server';
import { defaultLocale, isAppLocale } from '@/i18n/locale-config';
import { getPageMetadata } from '@/lib/seo/page-metadata';
import { getBreadcrumbSchema } from '@/lib/seo/local-page-schema';

export async function generateMetadata({
    params,
}: {
    params: Promise<{ locale: string }>;
}): Promise<Metadata> {
    const { locale } = await params;
    const appLocale = isAppLocale(locale) ? locale : defaultLocale;

    return getPageMetadata({
        locale: appLocale,
        namespace: 'Solutions.education',
        path: '/solutions/education',
        image: '/images/projects/school/photo_5267340135563465942_y.jpg',
    });
}

export default async function EducationPage({ params }: { params: Promise<{ locale: string }> }) {
    const { locale } = await params;
    const appLocale = isAppLocale(locale) ? locale : defaultLocale;
    setRequestLocale(appLocale);

    const breadcrumbSchema = getBreadcrumbSchema([
        { name: appLocale === 'sr' ? 'Početna' : 'Home', url: `https://artidom.art/${appLocale}` },
        { name: appLocale === 'sr' ? 'Rješenja' : 'Solutions', url: `https://artidom.art/${appLocale}/solutions` },
        { name: appLocale === 'sr' ? 'Obrazovanje' : 'Education', url: `https://artidom.art/${appLocale}/solutions/education` },
    ]);

    return (
        <>
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
            <SectorPage sector="education" proofVariant="default" />
        </>
    );
}
