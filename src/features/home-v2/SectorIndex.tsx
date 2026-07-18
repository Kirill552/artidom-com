import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/routing';
import SectorPreview from './SectorPreview';
import ui from './ui.module.css';
import styles from './SectorIndex.module.css';

const SECTORS = [
  { slug: 'residential', preview: '/images/projects/warm-minimal-apartment/01.jpg' },
  { slug: 'horeca', preview: '/images/projects/horeca-counters/01.webp' },
  { slug: 'workspace', preview: '/images/projects/workspace-cover.webp' },
  { slug: 'education', preview: '/images/projects/school/photo_5267340135563465942_y.jpg' },
] as const;

export default function SectorIndex() {
  const t = useTranslations('Index');

  return (
    <section className={`container ${ui.section}`} id="sectors">
      <h2 className={`${styles.title} rv`}>{t('sectors.title')}</h2>
      <ul className={styles.sectorList}>
        {SECTORS.map((sector) => (
          <li key={sector.slug} className={`${styles.sectorRow} rv`}>
            <Link href={`/solutions/${sector.slug}`} data-preview={sector.preview}>
              <span className={styles.sectorName}>{t(`sectors.${sector.slug}.label`)}</span>
              <span className={styles.sectorDesc}>{t(`sectors.${sector.slug}.description`)}</span>
              <span className={styles.sectorArr} aria-hidden="true">
                →
              </span>
            </Link>
          </li>
        ))}
      </ul>
      <SectorPreview />
    </section>
  );
}
