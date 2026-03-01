import { getTranslations, setRequestLocale } from 'next-intl/server';
import { Link } from '@/i18n/routing';
import Hero from '@/components/Hero';
import WorkshopProof from '@/components/WorkshopProof';
import Image from 'next/image';
import styles from './page.module.css';

export default async function IndexPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations('Index');

  return (
    <main>
      {/* Hero */}
      <div className="container">
        <Hero />
      </div>

      {/* Workshop Proof Strip */}
      <WorkshopProof />

      {/* Featured Case */}
      <section className={`container ${styles.case}`}>
        <div className={styles.caseHeader}>
          <span className={styles.label}>{t('cases.school.label')}</span>
          <h2 className={styles.caseTitle}>{t('cases.school.title')}</h2>
        </div>
        <div className={styles.caseBody}>
          <div className={styles.caseText}>
            <p>{t('cases.school.description')}</p>
            <div className={styles.stats}>
              <div className={styles.stat}>
                <strong>{t('cases.school.stat_sqm')}</strong>
                <span>Total area</span>
              </div>
              <div className={styles.stat}>
                <strong>{t('cases.school.stat_units')}</strong>
                <span>Custom units</span>
              </div>
              <div className={styles.stat}>
                <strong>{t('cases.school.stat_location')}</strong>
                <span>Location</span>
              </div>
            </div>
          </div>
          <div className={styles.caseImage}>
            <Image
              src="/images/projects/school/photo_5267340135563465942_y.jpg"
              alt="International School Montenegro by Artidom"
              fill
              className={styles.image}
            />
          </div>
        </div>
      </section>

      {/* Sectors */}
      <section className={`container ${styles.sectors}`}>
        <span className={styles.label}>{t('sectors.title')}</span>
        <div className={styles.sectorGrid}>
          {(['horeca', 'education', 'workspace', 'residential'] as const).map((s) => (
            <Link key={s} href={`/solutions/${s}`} className={styles.sectorCard}>
              <span className={styles.sectorLabel}>{t(`sectors.${s}.label`)}</span>
              <p className={styles.sectorDesc}>{t(`sectors.${s}.description`)}</p>
              <span className={styles.sectorArrow}>→</span>
            </Link>
          ))}
        </div>
      </section>

      {/* Process */}
      <section className={styles.process}>
        <div className="container">
          <span className={styles.label}>{t('process.title')}</span>
          <div className={styles.processSteps}>
            {(['step1', 'step2', 'step3', 'step4'] as const).map((s, i) => (
              <div key={s} className={styles.processStep}>
                <span className={styles.processNum}>0{i + 1}</span>
                <span className={styles.processName}>{t(`process.${s}`)}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Block */}
      <section className={`container ${styles.ctaBlock}`}>
        <h2 className={styles.ctaTitle}>{t('cta.title')}</h2>
        <p className={styles.ctaSub}>{t('cta.subtitle')}</p>
        <form className={styles.ctaForm} action="/api/contact" method="POST">
          <input name="name" placeholder={t('cta.name')} required />
          <input name="company" placeholder={t('cta.company')} />
          <textarea name="message" placeholder={t('cta.message')} rows={4} required />
          <button type="submit">{t('cta.submit')}</button>
        </form>
      </section>
    </main>
  );
}
