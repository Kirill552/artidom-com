import { useTranslations } from 'next-intl';
import Image from 'next/image';
import { Link } from '@/i18n/routing';
import { getProject } from '@/lib/projects';
import type { AppLocale } from '@/i18n/locale-config';
import ui from './ui.module.css';
import styles from './FeaturedCase.module.css';

interface FeaturedCaseProps {
  locale: AppLocale;
}

export default function FeaturedCase({ locale }: FeaturedCaseProps) {
  const t = useTranslations('Index');
  const tWorkshop = useTranslations('Workshop');

  const project = getProject('warm-minimal-apartment');

  if (!project) {
    throw new Error('Featured project is missing.');
  }

  return (
    <section className={`container ${ui.section}`}>
      <div className={styles.caseGrid}>
        <Link href={`/projects/${project.slug}`} className={`${styles.caseMedia} rv`}>
          <Image
            src={project.coverImage}
            alt={t('cases.featured.image_alt')}
            width={1419}
            height={933}
            sizes="(max-width: 1023px) 100vw, 55vw"
            className={styles.caseImage}
            style={{ viewTransitionName: 'featured-project' }}
          />
        </Link>
        <div className={`${styles.caseBody} rv`}>
          <p className={ui.eyebrow}>{t('cases.featured.label')}</p>
          <h2 className={styles.caseTitle}>{project.title[locale]}</h2>
          <p className={styles.caseDesc}>{project.description[locale]}</p>
          <dl className={styles.caseFacts}>
            <div>
              <dt>{t('cases.featured.location_label')}</dt>
              <dd>{project.location}</dd>
            </div>
            <div>
              <dt>{t('cases.featured.scope_label')}</dt>
              <dd>{t('cases.featured.scope_value')}</dd>
            </div>
            <div>
              <dt>{t('cases.featured.type_label')}</dt>
              <dd>{t('cases.featured.type_value')}</dd>
            </div>
          </dl>
          <Link href={`/projects/${project.slug}`} className={`${ui.linkQuiet} ${styles.caseLink}`}>
            {tWorkshop('projects_link')}
          </Link>
        </div>
      </div>
    </section>
  );
}
