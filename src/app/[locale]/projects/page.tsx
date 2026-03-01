import { Link } from '@/i18n/routing';
import { getProjectsByLocale } from '@/lib/projects';
import Image from 'next/image';
import { setRequestLocale } from 'next-intl/server';
import styles from './page.module.css';

export default async function ProjectsPage({ params }: { params: Promise<{ locale: string }> }) {
    const { locale } = await params;
    setRequestLocale(locale);
    const projects = getProjectsByLocale(locale);

    return (
        <main className="container">
            <section className={styles.page}>
                <h1 className={styles.title}>Completed projects</h1>

                <div className={styles.grid}>
                    {projects.map((p, i) => (
                        <Link
                            key={p.slug}
                            href={`/projects/${p.slug}`}
                            className={`${styles.card} ${i === 0 ? styles.cardWide : ''}`}
                        >
                            <div className={styles.cardImage}>
                                <Image src={p.coverImage} alt={p.title} fill className={styles.image} />
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
