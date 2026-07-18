import { Fragment } from 'react';
import { useTranslations } from 'next-intl';
import Image from 'next/image';
import { Link } from '@/i18n/routing';
import ui from './ui.module.css';
import styles from './HeroSection.module.css';

export default function HeroSection() {
  const t = useTranslations('Index.hero');
  const tWorkshop = useTranslations('Workshop');
  const words = t('title').split(' ');

  return (
    <section className={styles.hero}>
      <div className={styles.heroMedia}>
        <Image
          src="/images/hero/hero-evening.webp"
          alt={t('image_alt')}
          fill
          priority
          fetchPriority="high"
          sizes="100vw"
          className={styles.heroImage}
        />
        <span className={`${styles.ignite} ${styles.ignite1}`} aria-hidden="true" />
        <span className={`${styles.ignite} ${styles.ignite2}`} aria-hidden="true" />
        <span className={`${styles.ignite} ${styles.ignite3}`} aria-hidden="true" />
      </div>
      <div className={styles.heroScrim} aria-hidden="true" />
      <div className={`container ${styles.heroContent}`}>
        <p className={`${ui.eyebrow} ${styles.heroLabel}`}>{t('label')}</p>
        <h1 className={styles.title}>
          {words.map((word, i) => (
            <Fragment key={`${word}-${i}`}>
              <span className={styles.clip}>
                <span style={{ animationDelay: `calc(var(--reveal-base) + ${i} * 70ms)` }}>{word}</span>
              </span>
              {i < words.length - 1 ? ' ' : null}
            </Fragment>
          ))}
        </h1>
        <p className={styles.heroDesc} data-speakable>
          {t('description')}
        </p>
        <div className={styles.heroCtas}>
          <Link href="/contact" className={ui.btn}>
            {t('cta')}
          </Link>
          <Link href="/projects" className={ui.linkQuiet}>
            {tWorkshop('projects_link')}
          </Link>
        </div>
      </div>
    </section>
  );
}
