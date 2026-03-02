import type { Metadata } from 'next';
import SectorPage from '@/components/SectorPage';
import FAQSection from '@/components/FaqSection';
import LocalSeoLinks from '@/components/LocalSeoLinks';
import { setRequestLocale } from 'next-intl/server';
import { defaultLocale, isAppLocale } from '@/i18n/locale-config';
import { getPageMetadata } from '@/lib/seo/page-metadata';
import { getFaqPageSchema } from '@/lib/seo/local-page-schema';
import {
    getResidentialFaqSection,
    getResidentialLocalLinks,
    getResidentialLocalLinksHeading,
} from '@/features/local-seo';

export async function generateMetadata({
    params,
}: {
    params: Promise<{ locale: string }>;
}): Promise<Metadata> {
    const { locale } = await params;
    const appLocale = isAppLocale(locale) ? locale : defaultLocale;

    return getPageMetadata({
        locale: appLocale,
        namespace: 'Solutions.residential',
        path: '/solutions/residential',
        image: '/images/projects/warm-minimal-apartment/01.jpg',
    });
}

export default async function ResidentialPage({ params }: { params: Promise<{ locale: string }> }) {
    const { locale } = await params;
    const appLocale = isAppLocale(locale) ? locale : defaultLocale;

    setRequestLocale(appLocale);

    const localLinksHeading = getResidentialLocalLinksHeading(appLocale);
    const localLinks = getResidentialLocalLinks(appLocale);
    const faqSection = getResidentialFaqSection(appLocale);
    const faqSchema = getFaqPageSchema(faqSection.items);

    return (
        <>
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
            <SectorPage sector="residential" proofVariant="residential">
                <div className="container">
                    <LocalSeoLinks
                        title={localLinksHeading.title}
                        intro={localLinksHeading.intro}
                        items={localLinks}
                    />
                    <FAQSection
                        title={faqSection.title}
                        intro={faqSection.intro}
                        items={faqSection.items}
                    />
                </div>
            </SectorPage>
        </>
    );
}
