import type { Metadata } from 'next';
import SectorPage from '@/components/SectorPage';
import FAQSection from '@/components/FaqSection';
import LocalSeoLinks from '@/components/LocalSeoLinks';
import { setRequestLocale } from 'next-intl/server';
import { defaultLocale, isAppLocale } from '@/i18n/locale-config';
import { getPageMetadata } from '@/lib/seo/page-metadata';
import { getFaqPageSchema, getBreadcrumbSchema } from '@/lib/seo/local-page-schema';
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

    const breadcrumbSchema = getBreadcrumbSchema([
        { name: appLocale === 'sr' ? 'Početna' : 'Home', url: `https://www.artidom.art/${appLocale}` },
        { name: appLocale === 'sr' ? 'Rješenja' : 'Solutions', url: `https://www.artidom.art/${appLocale}/solutions` },
        { name: appLocale === 'sr' ? 'Stanovi' : 'Residential', url: `https://www.artidom.art/${appLocale}/solutions/residential` },
    ]);

    return (
        <>
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
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
