import type { Metadata } from 'next';
import { Link } from '@/i18n/routing';
import { getProjectsByLocale } from '@/lib/projects';
import Image from 'next/image';
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
    const projects = getProjectsByLocale(locale);
    const appLocale = isAppLocale(locale) ? locale : defaultLocale;

    const breadcrumbSchema = getBreadcrumbSchema([
        { name: appLocale === 'sr' ? 'Početna' : 'Home', url: `https://artidom.art/${locale}` },
        { name: t('title'), url: `https://artidom.art/${locale}/projects` },
    ]);
    const itemListSchema = {
        '@context': 'https://schema.org',
        '@type': 'ItemList',
        name: t('title'),
        itemListElement: projects.map((project, index) => ({
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

            <div className={styles.grid}>
                {projects.map((p, i) => (
                    <Link
                        key={p.slug}
                        href={`/projects/${p.slug}`}
                        className={`${styles.card} rv`}
                        style={{ transitionDelay: `${(i % 3) * 70}ms` }}
                    >
                        <span className={styles.frame}>
                            <Image
                                src={p.coverImage}
                                alt={
                                    appLocale === 'ru'
                                        ? `${p.title}: проект мебели на заказ в ${p.location}, ${p.year}`
                                        : appLocale === 'sr'
                                            ? `${p.title}: projekat namještaja po mjeri u ${p.location}, ${p.year}`
                                            : `${p.title}: custom furniture project in ${p.location}, ${p.year}`
                                }
                                fill
                                className={styles.image}
                                style={i === 0 ? { viewTransitionName: 'featured-project' } : undefined}
                                sizes="(max-width: 720px) 100vw, (max-width: 1023px) 50vw, 33vw"
                            />
                        </span>
                        <span className={styles.cap}>
                            <span className={styles.capTitle}>{p.title}</span>
                            <span className={styles.capMeta}>{p.location} &middot; {p.year}</span>
                        </span>
                    </Link>
                ))}
            </div>
        </main>
        </>
    );
}
