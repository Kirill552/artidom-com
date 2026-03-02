'use client';
import { useTranslations, useLocale } from 'next-intl';
import { Link } from '@/i18n/routing';
import { appLocales, replaceLocaleInPathname } from '@/i18n/locale-config';
import { usePathname } from 'next/navigation';
import styles from './Nav.module.css';

export default function Nav() {
  const t = useTranslations('Nav');
  const locale = useLocale();
  const pathname = usePathname();

  return (
    <header className={styles.nav}>
      <Link href="/" className={styles.logo}>
        Artidom
      </Link>

      <nav className={styles.links}>
        <Link href="/solutions/residential">{t('solutions')}</Link>
        <Link href="/workshop">{t('workshop')}</Link>
        <Link href="/catalog">{t('catalog')}</Link>
        <Link href="/projects">{t('projects')}</Link>
        <Link href="/blog">{t('journal')}</Link>
      </nav>

      <div className={styles.right}>
        <div className={styles.langSwitch}>
          {appLocales.map((lang) => {
            const isActive = locale === lang;
            return (
              <a
                key={lang}
                href={isActive ? undefined : replaceLocaleInPathname(pathname, lang)}
                className={`${styles.lang} ${isActive ? styles.langActive : ''}`}
                style={isActive ? { pointerEvents: 'none' } : undefined}
              >
                {t(`lang_${lang}`)}
              </a>
            );
          })}
        </div>
        <Link href="/contact" className={styles.cta}>
          {t('cta')} →
        </Link>
      </div>
    </header>
  );
}
