import type { Metadata } from 'next';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { Link } from '@/i18n/routing';
import WorkshopProof from '@/components/WorkshopProof';
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

  return getPageMetadata({ locale: appLocale, namespace: 'Workshop', path: '/workshop' });
}

export default async function WorkshopPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations('Workshop');

  const steps = ['step1', 'step2', 'step3', 'step4'] as const;
  const materials = ['mat1', 'mat2', 'mat3'] as const;

  return (
    <main>
      {/* Hero */}
      <section className={styles.hero}>
        <div className={styles.heroOverlay}>
          <span className={styles.heroLabel}>{t('hero_label')}</span>
          <h1 className={styles.heroTitle}>{t('hero_title')}</h1>
        </div>
      </section>

      {/* Intro */}
      <section className={`container ${styles.intro}`}>
        <div className={styles.introFact}>
          {t('intro_fact').split('\n').map((line, i) => (
            <p key={i}>{line}</p>
          ))}
        </div>
        <p className={styles.introText}>{t('intro_text')}</p>
      </section>

      <WorkshopProof />

      {/* Steps */}
      <section className={`container ${styles.steps}`}>
        <span className={styles.label}>{t('steps_title')}</span>
        <div className={styles.stepsGrid}>
          {steps.map((s) => (
            <div key={s} className={styles.step}>
              <div className={styles.stepImage} />
              <h3 className={styles.stepTitle}>{t(`${s}_title`)}</h3>
              <p className={styles.stepText}>{t(`${s}_text`)}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Materials */}
      <section className={`container ${styles.materials}`}>
        <span className={styles.label}>{t('materials_title')}</span>
        <div className={styles.materialsGrid}>
          {materials.map((m) => (
            <div key={m} className={styles.material}>
              <div className={styles.materialImage} />
              <span className={styles.materialName}>{t(`${m}_name`)}</span>
              <span className={styles.materialOrigin}>{t(`${m}_origin`)}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Capacity */}
      <WorkshopProof variant="default" />

      {/* Link to Projects */}
      <div className={`container ${styles.projectsLink}`}>
        <Link href="/projects">{t('projects_link')}</Link>
      </div>
    </main>
  );
}
