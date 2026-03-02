import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getProject } from '@/lib/projects';
import { Link } from '@/i18n/routing';
import Image from 'next/image';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { defaultLocale, isAppLocale, type AppLocale } from '@/i18n/locale-config';
import { buildMetadata } from '@/lib/seo/page-metadata';
import styles from './page.module.css';

export async function generateMetadata({
    params,
}: {
    params: Promise<{ slug: string; locale: string }>;
}): Promise<Metadata> {
    const { slug, locale } = await params;
    const project = getProject(slug);
    const appLocale = isAppLocale(locale) ? locale : defaultLocale;

    if (!project) {
        return {};
    }

    return buildMetadata({
        locale: appLocale,
        path: `/projects/${slug}`,
        image: project.coverImage,
        title: project.title[appLocale],
        description: project.description[appLocale],
    });
}

export default async function ProjectPage({ params }: { params: Promise<{ slug: string, locale: string }> }) {
    const { slug, locale } = await params;
    setRequestLocale(locale);
    const project = getProject(slug);
    if (!project) notFound();

    const t = await getTranslations('Projects');
    const localeKey: AppLocale = isAppLocale(locale) ? locale : defaultLocale;
    const title = project.title[localeKey];
    const desc = project.description[localeKey];
    const galleryImages = project.images.filter((image, index) => index !== 0);
    const sectorLabel = t(`sectors.${project.sector}`);
    const unitsLabel = project.units ? `${project.units} ${localeKey === 'sr' ? 'jedinica' : 'units'}` : null;
    const sqmLabel = project.sqm ? `${project.sqm} m²` : null;

    return (
        <main>
            <div className={styles.hero}>
                <Image
                    src={project.coverImage}
                    alt={title}
                    fill
                    className={styles.heroImage}
                    priority
                    sizes="100vw"
                />
            </div>

            <section className={`container ${styles.content}`}>
                <div className={styles.meta}>
                    <span>{sectorLabel}</span>
                    {sqmLabel && <span>{sqmLabel}</span>}
                    {unitsLabel && <span>{unitsLabel}</span>}
                    <span>{project.location}</span>
                    <span>{project.year}</span>
                </div>

                <h1 className={styles.title}>{title}</h1>
                <p className={styles.desc}>{desc}</p>
            </section>

            {galleryImages.length > 0 && (
                <section className={`container ${styles.gallery}`}>
                    {galleryImages.map((image, index) => (
                        <div key={`${project.slug}-${index}`} className={styles.galleryItem}>
                            <Image
                                src={image}
                                alt={`${title} — ${index + 2}`}
                                fill
                                className={styles.galleryImage}
                                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                            />
                        </div>
                    ))}
                </section>
            )}

            <div className={`container ${styles.back}`}>
                <Link href="/projects">← {t('all')}</Link>
            </div>
        </main>
    );
}
