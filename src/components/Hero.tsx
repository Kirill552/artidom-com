import { useTranslations } from 'next-intl';
import Image from 'next/image';
import styles from './Hero.module.css';

export default function Hero() {
  const t = useTranslations('Index.hero');

  return (
    <section className={styles.hero}>
      <div className={styles.content}>
        <img
          src="/images/shell.png"
          alt=""
          aria-hidden="true"
          className={styles.shellBg}
        />
        <span className={styles.badge}>{t('label')}</span>
        <h1 className={styles.title}>{t('title')}</h1>
        <p className={styles.description}>{t('description')}</p>
        <button className={styles.button}>{t('cta')}</button>
      </div>
      <div className={styles.visual}>
        <div className={styles.imageWrapper}>
          <Image 
            src="/images/projects/school/photo_5267340135563465940_y.jpg"
            alt="Artidom Furniture Production Montenegro"
            fill
            className={styles.image}
            priority
          />
        </div>
        <div className={styles.floatingTag}>
          Montenegro Workshop
        </div>
      </div>
    </section>
  );
}
