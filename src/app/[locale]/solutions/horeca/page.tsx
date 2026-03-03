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
        namespace: 'Solutions.horeca',
        path: '/solutions/horeca',
        image: '/images/projects/horeca-counters/03.webp',
    });
}

export default async function HoRecaPage({ params }: { params: Promise<{ locale: string }> }) {
    const { locale } = await params;
    setRequestLocale(locale);
    return <SectorPage sector="horeca" proofVariant="horeca" />;
}
