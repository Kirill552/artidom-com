import type { Metadata } from 'next';
import { Link } from '@/i18n/routing';
import { getProjectsByLocale } from '@/lib/projects';
import Image from 'next/image';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { defaultLocale, isAppLocale } from '@/i18n/locale-config';
import { getPageMetadata } from '@/lib/seo/page-metadata';
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

    return (
        <main className="container">
            <section className={styles.page}>
                <h1 className={styles.title}>{t('title')}</h1>
                <p className={styles.subtitle}>{t('subtitle')}</p>

                <div className={styles.grid}>
                    {projects.map((p, i) => (
                        <Link
                            key={p.slug}
                            href={`/projects/${p.slug}`}
                            className={`${styles.card} ${i === 0 ? styles.cardWide : ''}`}
                        >
                            <div className={styles.cardImage}>
                                <Image
                                    src={p.coverImage}
                                    alt={p.title}
                                    fill
                                    className={styles.image}
                                    sizes="(max-width: 900px) 100vw, (max-width: 1400px) 50vw, 33vw"
                                />
                                <div className={styles.cardOverlay}>
                                    <span className={styles.cardTitle}>{p.title}</span>
                                    <span className={styles.cardMeta}>{p.location} · {p.year}</span>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
            </section>
        </main>
    );
}
