import { useTranslations } from 'next-intl';
import styles from './Hero.module.css';

export default function Hero() {
  const t = useTranslations('Index.hero');

  return (
    <section className={styles.hero}>
      <div className={styles.content}>
        <span className={styles.badge}>{t('label')}</span>
        <h1 className={styles.title}>{t('title')}</h1>
        <p className={styles.description}>{t('description')}</p>
        <button className={styles.button}>{t('cta')}</button>
      </div>
      <div className={styles.visual}>
        <div className={styles.imagePlaceholder}>
          {/* Real photo of the Montenegro workshop or school goes here */}
        </div>
        <div className={styles.floatingTag}>
          Montenegro Workshop
        </div>
      </div>
    </section>
  );
}
