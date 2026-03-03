import Image from 'next/image';
import { Link } from '@/i18n/routing';
import WorkshopProof from '@/components/WorkshopProof';
import FAQSection from '@/components/FaqSection';
import type { ResolvedResidentialLocalPageContent } from '@/features/local-seo';
import styles from './ResidentialLocalPage.module.css';

interface ResidentialLocalPageProps {
    page: ResolvedResidentialLocalPageContent;
}

export default function ResidentialLocalPage({ page }: ResidentialLocalPageProps) {
    return (
        <main>
            <section className={`container ${styles.hero}`}>
                <div className={styles.heroText}>
                    <span className={styles.label}>{page.label}</span>
                    <h1 className={styles.title}>{page.title}</h1>
                    <p className={styles.intro}>{page.intro}</p>
                </div>
                <div className={styles.heroImage}>
                    <Image
                        src={page.image}
                        alt={page.title}
                        fill
                        className={styles.heroMedia}
                        sizes="(max-width: 900px) 100vw, 50vw"
                    />
                </div>
            </section>

            <WorkshopProof variant="residential" />

            <section className={`container ${styles.sections}`}>
                <div className={styles.card}>
                    <h2 className={styles.cardTitle}>{page.focusTitle}</h2>
                    <ul className={styles.list}>
                        {page.focusItems.map((item) => (
                            <li key={item}>{item}</li>
                        ))}
                    </ul>
                </div>
                <div className={styles.card}>
                    <h2 className={styles.cardTitle}>{page.processTitle}</h2>
                    <ul className={styles.list}>
                        {page.processItems.map((item) => (
                            <li key={item}>{item}</li>
                        ))}
                    </ul>
                </div>
            </section>

            <section className={`container ${styles.noteWrap}`}>
                <div className={styles.note}>{page.note}</div>
            </section>

            <div className="container">
                <FAQSection title={page.title} intro={page.note} items={page.faqs} />
            </div>

            <section className={`container ${styles.cta}`}>
                <Link href="/contact" className={styles.ctaBtn}>
                    {page.cta}
                </Link>
            </section>

            <div className={`container ${styles.back}`}>
                <Link href="/solutions/residential">← Residential</Link>
            </div>
        </main>
    );
}
