import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/routing';
import ui from './ui.module.css';
import styles from './PricingSection.module.css';

export default function PricingSection() {
  const t = useTranslations('Index');

  return (
    <section className={`container ${ui.section}`}>
      <div className={`${styles.pricing} rv`}>
        <h2 className={styles.title}>{t('pricing.title')}</h2>
        <p className={styles.text}>{t('pricing.text')}</p>
        <Link href="/contact" className={`${ui.linkQuiet} ${styles.link}`}>
          {t('pricing.cta')}
        </Link>
      </div>
    </section>
  );
}
