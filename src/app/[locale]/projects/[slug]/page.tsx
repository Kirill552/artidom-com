import { notFound } from 'next/navigation';
import { getProject } from '@/lib/projects';
import { Link } from '@/i18n/routing';
import Image from 'next/image';
import { setRequestLocale } from 'next-intl/server';
import styles from './page.module.css';

export default async function ProjectPage({ params }: { params: Promise<{ slug: string, locale: string }> }) {
    const { slug, locale } = await params;
    setRequestLocale(locale);
    const project = getProject(slug);
    if (!project) notFound();

    const title = project.title[locale as 'en' | 'sr'] ?? project.title.en;
    const desc = project.description[locale as 'en' | 'sr'] ?? project.description.en;

    return (
        <main>
            <div className={styles.hero}>
                <Image src={project.coverImage} alt={title} fill className={styles.heroImage} priority />
            </div>

            <section className={`container ${styles.content}`}>
                <div className={styles.meta}>
                    <span>{project.sector}</span>
                    <span>{project.sqm} sqm</span>
                    {project.units && <span>{project.units} units</span>}
                    <span>{project.location}</span>
                    <span>{project.year}</span>
                </div>

                <h1 className={styles.title}>{title}</h1>
                <p className={styles.desc}>{desc}</p>
            </section>

            <div className={`container ${styles.back}`}>
                <Link href="/projects">← All projects</Link>
            </div>
        </main>
    );
}
