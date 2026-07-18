import type { Metadata } from 'next';
import { projects, getProjectImageAlt } from '@/lib/projects';
import { ProjectsGrid } from '@/components/ProjectsGrid';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { defaultLocale, isAppLocale } from '@/i18n/locale-config';
import { getPageMetadata } from '@/lib/seo/page-metadata';
import { getBreadcrumbSchema } from '@/lib/seo/local-page-schema';
import styles from './page.module.css';

export async function generateMetadata({
    params,
}: {
    params: Promise<{ locale: string }>;
}): Promise<Metadata> {
    const { locale } = await params;
    const appLocale = isAppLocale(locale) ? locale : defaultLocale;

    return getPageMetadata({ locale: appLocale, namespace: 'Projects', path: '/projects' });
}

export default async function ProjectsPage({ params }: { params: Promise<{ locale: string }> }) {
    const { locale } = await params;
    setRequestLocale(locale);
    const t = await getTranslations('Projects');
    const appLocale = isAppLocale(locale) ? locale : defaultLocale;

    const items = projects.map((p) => ({
        slug: p.slug,
        country: p.country,
        title: p.title[appLocale] ?? p.title.en,
        location: p.location,
        year: p.year,
        coverImage: p.coverImage,
        alt: getProjectImageAlt(p, appLocale, 0),
    }));

    const breadcrumbSchema = getBreadcrumbSchema([
        { name: appLocale === 'sr' ? 'Početna' : 'Home', url: `https://artidom.art/${locale}` },
        { name: t('title'), url: `https://artidom.art/${locale}/projects` },
    ]);
    const itemListSchema = {
        '@context': 'https://schema.org',
        '@type': 'ItemList',
        name: t('title'),
        itemListElement: items.map((project, index) => ({
            '@type': 'ListItem',
            position: index + 1,
            url: `https://artidom.art/${appLocale}/projects/${project.slug}`,
            name: project.title,
        })),
    };

    return (
        <>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListSchema) }} />
        <main className={`container ${styles.page}`}>
            <section className={styles.pageHead}>
                <h1 className={styles.title}>{t('title')}</h1>
                <p className={styles.subtitle}>{t('subtitle')}</p>
            </section>

            <ProjectsGrid
                items={items}
                labels={{
                    all: t('all'),
                    montenegro: t('filters.montenegro'),
                    russia: t('filters.russia'),
                }}
                locale={appLocale}
            />
        </main>
        </>
    );
}
