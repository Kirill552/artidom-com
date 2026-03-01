import { useTranslations } from 'next-intl';
import WorkshopProof from '@/components/WorkshopProof';
import { Link } from '@/i18n/routing';
import styles from './SectorPage.module.css';

type Sector = 'horeca' | 'education' | 'workspace' | 'residential';
type ProofVariant = 'default' | 'horeca' | 'residential' | 'catalog';

interface SectorPageProps {
    sector: Sector;
    proofVariant?: ProofVariant;
}

export default function SectorPage({ sector, proofVariant = 'default' }: SectorPageProps) {
    const t = useTranslations(`Solutions.${sector}`);
    const pains = ['pain1', 'pain2', 'pain3', 'pain4'] as const;

    return (
        <main>
            {/* Hero */}
            <section className={`container ${styles.hero}`}>
                <span className={styles.label}>{t('label')}</span>
                <div className={styles.heroBody}>
                    <div className={styles.heroText}>
                        <h1 className={styles.heroTitle}>{t('title')}</h1>
                        <p className={styles.heroDesc}>{t('description')}</p>
                    </div>
                    <div className={styles.heroImage} />
                </div>
            </section>

            <WorkshopProof variant={proofVariant} />

            {/* Pain → Solution */}
            <section className={`container ${styles.painSol}`}>
                <div className={styles.painSolGrid}>
                    <div>
                        <h2 className={styles.painSolTitle}>What this sector needs</h2>
                        <div className={styles.pains}>
                            {pains.map((p) => (
                                <div key={p} className={styles.painItem}>
                                    <span className={styles.painText}>{t(p)}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div>
                        <h2 className={styles.painSolTitle}>How we handle it</h2>
                        <div className={styles.solutions}>
                            {pains.map((p, i) => (
                                <div key={p} className={styles.solItem}>
                                    <span className={styles.solText}>{t(`sol${i + 1}`)}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA */}
            <section className={`container ${styles.cta}`}>
                <Link href="/contact" className={styles.ctaBtn}>
                    Tell us about your project →
                </Link>
            </section>
        </main>
    );
}
