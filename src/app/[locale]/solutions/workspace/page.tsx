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
        namespace: 'Solutions.workspace',
        path: '/solutions/workspace',
        image: '/images/projects/school/photo_5267340135563465940_y.jpg',
    });
}

export default async function WorkspacePage({ params }: { params: Promise<{ locale: string }> }) {
    const { locale } = await params;
    setRequestLocale(locale);
    return <SectorPage sector="workspace" proofVariant="default" />;
}
