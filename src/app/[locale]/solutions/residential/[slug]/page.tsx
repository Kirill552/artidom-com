import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { setRequestLocale } from 'next-intl/server';
import ResidentialLocalPage from '@/components/ResidentialLocalPage';
import { defaultLocale, isAppLocale } from '@/i18n/locale-config';
import { buildMetadata } from '@/lib/seo/page-metadata';
import { getFaqPageSchema, getServiceSchema } from '@/lib/seo/local-page-schema';
import {
    getResidentialLocalPage,
    resolveResidentialLocalPage,
    residentialLocalPageSlugs,
} from '@/features/local-seo';

export function generateStaticParams() {
    return residentialLocalPageSlugs.map((slug) => ({ slug }));
}

export async function generateMetadata({
    params,
}: {
    params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
    const { locale, slug } = await params;
    const appLocale = isAppLocale(locale) ? locale : defaultLocale;
    const page = getResidentialLocalPage(slug);

    if (!page) {
        return {};
    }

    const resolved = resolveResidentialLocalPage(page, appLocale);

    return buildMetadata({
        locale: appLocale,
        path: `/solutions/residential/${slug}`,
        title: resolved.metaTitle,
        description: resolved.metaDescription,
        image: resolved.image,
    });
}

export default async function ResidentialLocalSeoPage({
    params,
}: {
    params: Promise<{ locale: string; slug: string }>;
}) {
    const { locale, slug } = await params;
    const appLocale = isAppLocale(locale) ? locale : null;

    if (!appLocale) {
        notFound();
    }

    const page = getResidentialLocalPage(slug);

    if (!page) {
        notFound();
    }

    setRequestLocale(appLocale);

    const resolved = resolveResidentialLocalPage(page, appLocale);
    const faqSchema = getFaqPageSchema(resolved.faqs);
    const serviceSchema = getServiceSchema({
        title: resolved.title,
        description: resolved.intro,
        areaServed: resolved.areaServed,
        image: resolved.image,
        path: `/solutions/residential/${slug}`,
        locale: appLocale,
    });

    return (
        <>
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }} />
            <ResidentialLocalPage page={resolved} />
        </>
    );
}
