import type { Metadata } from 'next';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { Link } from '@/i18n/routing';
import { defaultLocale, isAppLocale, type AppLocale } from '@/i18n/locale-config';
import Hero from '@/components/Hero';
import WorkshopProof from '@/components/WorkshopProof';
import Image from 'next/image';
import { getProject } from '@/lib/projects';
import { getPageMetadata } from '@/lib/seo/page-metadata';
import { getHowToSchema, getBreadcrumbSchema } from '@/lib/seo/local-page-schema';
import styles from './page.module.css';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const appLocale = isAppLocale(locale) ? locale : defaultLocale;

  return getPageMetadata({ locale: appLocale, namespace: 'Index' });
}

export default async function IndexPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations('Index');
  const featuredProject = getProject('warm-minimal-apartment');
  const localeKey: AppLocale = isAppLocale(locale) ? locale : defaultLocale;

  if (!featuredProject) {
    throw new Error('Featured project is missing.');
  }

  const featuredTitle = featuredProject.title[localeKey];
  const featuredDescription = featuredProject.description[localeKey];

  const howToSchema = getHowToSchema(
    t('process.title'),
    localeKey === 'sr'
      ? 'Kako naručiti namještaj po mjeri u Crnoj Gori — od brifa do montaže'
      : 'How to order custom furniture in Montenegro — from brief to installation',
    ['step1', 'step2', 'step3', 'step4'].map((s) => ({
      name: t(`process.${s}`),
      text: t(`process.${s}_text`),
    })),
  );

  return (
    <>
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }} />
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
          <span className={styles.label}>{t('cases.featured.label')}</span>
          <h2 className={styles.caseTitle}>{featuredTitle}</h2>
        </div>
        <div className={styles.caseBody}>
          <div className={styles.caseText}>
            <p>{featuredDescription}</p>
            <div className={styles.stats}>
              <div className={styles.stat}>
                <strong>{featuredProject.location}</strong>
                <span>{t('cases.featured.location_label')}</span>
              </div>
              <div className={styles.stat}>
                <strong>{t('cases.featured.scope_value')}</strong>
                <span>{t('cases.featured.scope_label')}</span>
              </div>
              <div className={styles.stat}>
                <strong>{t('cases.featured.type_value')}</strong>
                <span>{t('cases.featured.type_label')}</span>
              </div>
            </div>
          </div>
          <div className={styles.caseImage}>
            <Image
              src={featuredProject.coverImage}
              alt={t('cases.featured.image_alt')}
              fill
              className={styles.image}
              sizes="(max-width: 1024px) 100vw, 55vw"
            />
          </div>
        </div>
      </section>

      {/* Sectors */}
      <section className={`container ${styles.sectors}`}>
        <span className={styles.label}>{t('sectors.title')}</span>
        <div className={styles.sectorGrid}>
          {(['residential', 'horeca', 'workspace', 'education'] as const).map((s) => (
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
    </>
  );
}
