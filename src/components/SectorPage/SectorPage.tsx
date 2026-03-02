import { useTranslations } from 'next-intl';
import WorkshopProof from '@/components/WorkshopProof';
import { Link } from '@/i18n/routing';
import Image from 'next/image';
import styles from './SectorPage.module.css';

type Sector = 'horeca' | 'education' | 'workspace' | 'residential';
type ProofVariant = 'default' | 'horeca' | 'residential' | 'catalog';

interface SectorPageProps {
    sector: Sector;
    proofVariant?: ProofVariant;
}

export default function SectorPage({ sector, proofVariant = 'default' }: SectorPageProps) {
    const t = useTranslations(`Solutions.${sector}`);
    const tCommon = useTranslations('Solutions.common');
    const pains = ['pain1', 'pain2', 'pain3', 'pain4'] as const;
    const sectorImages = {
        residential: '/images/projects/warm-minimal-apartment/01.jpg',
        horeca: '/images/projects/horeca-counters/04.jpg',
        education: '/images/projects/school/photo_5267340135563465942_y.jpg',
        workspace: '/images/projects/school/photo_5267340135563465940_y.jpg',
    } as const;

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
                    <div className={styles.heroImage}>
                        <Image
                            src={sectorImages[sector]}
                            alt={t('image_alt')}
                            fill
                            className={styles.heroImageMedia}
                            sizes="(max-width: 900px) 100vw, 50vw"
                        />
                    </div>
                </div>
            </section>

            <WorkshopProof variant={proofVariant} />

            {/* Pain → Solution */}
            <section className={`container ${styles.painSol}`}>
                <div className={styles.painSolGrid}>
                    <div>
                        <h2 className={styles.painSolTitle}>{tCommon('needs_title')}</h2>
                        <div className={styles.pains}>
                            {pains.map((p) => (
                                <div key={p} className={styles.painItem}>
                                    <span className={styles.painText}>{t(p)}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div>
                        <h2 className={styles.painSolTitle}>{tCommon('solution_title')}</h2>
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
                    {tCommon('cta')}
                </Link>
            </section>
        </main>
    );
}
