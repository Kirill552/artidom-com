import { useTranslations } from 'next-intl';
import Image from 'next/image';
import { Link } from '@/i18n/routing';
import styles from './Hero.module.css';

export default function Hero() {
  const t = useTranslations('Index.hero');

  return (
    <section className={styles.hero}>
      <div className={styles.content}>
        <Image
          src="/images/shell.webp"
          alt=""
          aria-hidden="true"
          className={styles.shellBg}
          width={480}
          height={480}
          sizes="480px"
          loading="lazy"
        />
        <span className={styles.badge}>{t('label')}</span>
        <h1 className={styles.title}>{t('title')}</h1>
        <p className={styles.description} data-speakable>{t('description')}</p>
        <Link href="/contact" className={styles.button}>
          {t('cta')}
        </Link>
      </div>
      <div className={styles.visual}>
        <div className={styles.imageWrapper}>
          <Image
            src="/images/projects/warm-minimal-apartment/hero.webp"
            alt={t('image_alt')}
            fill
            className={styles.image}
            sizes="(max-width: 640px) calc(100vw - 32px), (max-width: 1024px) 70vw, 45vw"
            quality={70}
            fetchPriority="high"
            preload
          />
        </div>
        <div className={styles.floatingTag}>
          {t('tag')}
        </div>
      </div>
    </section>
  );
}
