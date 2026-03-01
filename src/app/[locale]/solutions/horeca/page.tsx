import SectorPage from '@/components/SectorPage';
import { setRequestLocale } from 'next-intl/server';

export default async function HoRecaPage({ params }: { params: Promise<{ locale: string }> }) {
    const { locale } = await params;
    setRequestLocale(locale);
    return <SectorPage sector="horeca" proofVariant="horeca" />;
}
