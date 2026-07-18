import { useTranslations } from 'next-intl';
import { CtaForm } from '@/components/CtaForm';
import ui from './ui.module.css';
import styles from './CtaSection.module.css';

export default function CtaSection() {
  const t = useTranslations('Index');

  return (
    <section className={`${styles.cta} ${ui.section}`} id="contact">
      <div className={`container ${styles.ctaGrid}`}>
        <div className="rv">
          <h2 className={styles.title}>{t('cta.title')}</h2>
          <p className={styles.ctaSub}>{t('cta.subtitle')}</p>
        </div>
        <CtaForm className={`${styles.ctaForm} rv`} />
      </div>
    </section>
  );
}
