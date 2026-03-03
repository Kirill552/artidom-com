import type { Metadata } from 'next';
import Image from 'next/image';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { Link } from '@/i18n/routing';
import FAQSection from '@/components/FaqSection';
import WorkshopProof from '@/components/WorkshopProof';
import { defaultLocale, isAppLocale } from '@/i18n/locale-config';
import { getPageMetadata } from '@/lib/seo/page-metadata';
import { getFaqPageSchema, getHowToSchema, getBreadcrumbSchema } from '@/lib/seo/local-page-schema';
import { getWorkshopFaqSection } from '@/features/local-seo';
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
  const appLocale = isAppLocale(locale) ? locale : defaultLocale;
  setRequestLocale(appLocale);

  const t = await getTranslations({ locale: appLocale, namespace: 'Workshop' });
  const faqSection = getWorkshopFaqSection(appLocale);
  const faqSchema = getFaqPageSchema(faqSection.items);

  const howToSchema = getHowToSchema(
    t('hero_title'),
    t('intro_text'),
    ['step1', 'step2', 'step3', 'step4'].map((s) => ({
      name: t(`${s}_title`),
      text: t(`${s}_text`),
    })),
  );

  const breadcrumbSchema = getBreadcrumbSchema([
    { name: appLocale === 'sr' ? 'Početna' : 'Home', url: `https://artidom.art/${appLocale}` },
    { name: t('hero_title'), url: `https://artidom.art/${appLocale}/workshop` },
  ]);

  const steps = ['step1', 'step2', 'step3', 'step4'] as const;
  const stepImages: Record<string, { src: string; alt: Record<string, string> }> = {
    step1: {
      src: '/images/workshop/step-material-intake.webp',
      alt: {
        en: 'Material intake at ARTIDOM furniture workshop in Bar, Montenegro',
        sr: 'Prijem materijala u radionici ARTIDOM, Bar, Crna Gora',
      },
    },
    step2: {
      src: '/images/workshop/step-cnc-cutting.webp',
      alt: {
        en: 'CNC panel cutting for custom kitchens and wardrobes, Bar workshop',
        sr: 'CNC rezanje ploča za kuhinje i plakare po mjeri, radionica Bar',
      },
    },
    step3: {
      src: '/images/workshop/step-assembly-finishing.webp',
      alt: {
        en: 'Cabinet assembly and finishing at ARTIDOM workshop in Sutomore',
        sr: 'Sklapanje i završna obrada korpusa u ARTIDOM radionici, Sutomore',
      },
    },
    step4: {
      src: '/images/workshop/step-qc-packing.webp',
      alt: {
        en: 'Quality control and packing of custom furniture for delivery in Montenegro',
        sr: 'Kontrola kvaliteta i pakovanje namještaja za isporuku u Crnoj Gori',
      },
    },
  };

  const materials = ['mat1', 'mat2', 'mat3'] as const;
  const materialImages: Record<string, { src: string; alt: Record<string, string> }> = {
    mat1: {
      src: '/images/workshop/mat-oak-veneer.webp',
      alt: {
        en: 'Oak veneer samples used for custom apartment furniture in Montenegro',
        sr: 'Uzorci hrastovog furnira za namještaj po mjeri u Crnoj Gori',
      },
    },
    mat2: {
      src: '/images/workshop/mat-lacquered-mdf.webp',
      alt: {
        en: 'Lacquered MDF panels for kitchen fronts and wardrobes',
        sr: 'Lakirane MDF ploče za frontove kuhinja i plakara',
      },
    },
    mat3: {
      src: '/images/workshop/mat-stone-tops.webp',
      alt: {
        en: 'Compact laminate and stone countertop samples for kitchen projects',
        sr: 'Kompakt laminat i kamene radne ploče za kuhinjske projekte',
      },
    },
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
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
                <div className={styles.stepImage}>
                  <Image
                    src={stepImages[s].src}
                    alt={stepImages[s].alt[appLocale] || stepImages[s].alt.en}
                    fill
                    sizes="(max-width: 768px) 100vw, 25vw"
                    style={{ objectFit: 'cover' }}
                  />
                </div>
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
                <div className={styles.materialImage}>
                  <Image
                    src={materialImages[m].src}
                    alt={materialImages[m].alt[appLocale] || materialImages[m].alt.en}
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    style={{ objectFit: 'cover' }}
                  />
                </div>
                <span className={styles.materialName}>{t(`${m}_name`)}</span>
                <span className={styles.materialOrigin}>{t(`${m}_origin`)}</span>
              </div>
            ))}
          </div>
        </section>

        <div className="container">
          <FAQSection
            title={faqSection.title}
            intro={faqSection.intro}
            items={faqSection.items}
          />
        </div>

        {/* Capacity */}
        <WorkshopProof variant="default" />

        {/* Link to Projects */}
        <div className={`container ${styles.projectsLink}`}>
          <Link href="/projects">{t('projects_link')}</Link>
        </div>
      </main>
    </>
  );
}
