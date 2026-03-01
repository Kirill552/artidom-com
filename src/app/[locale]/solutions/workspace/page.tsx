import SectorPage from '@/components/SectorPage';
import { setRequestLocale } from 'next-intl/server';

export default async function WorkspacePage({ params }: { params: Promise<{ locale: string }> }) {
    const { locale } = await params;
    setRequestLocale(locale);
    return <SectorPage sector="workspace" proofVariant="residential" />;
}
