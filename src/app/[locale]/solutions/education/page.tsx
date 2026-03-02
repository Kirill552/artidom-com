import type { Metadata } from 'next';
import SectorPage from '@/components/SectorPage';
import { setRequestLocale } from 'next-intl/server';
import { defaultLocale, isAppLocale } from '@/i18n/locale-config';
import { getPageMetadata } from '@/lib/seo/page-metadata';

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
    setRequestLocale(locale);
    return <SectorPage sector="education" proofVariant="default" />;
}
