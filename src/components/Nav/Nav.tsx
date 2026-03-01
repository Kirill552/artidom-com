'use client';
import { useTranslations, useLocale } from 'next-intl';
import { Link } from '@/i18n/routing';
import { usePathname } from 'next/navigation';
import styles from './Nav.module.css';

export default function Nav() {
  const t = useTranslations('Nav');
  const locale = useLocale();
  const pathname = usePathname(); // e.g., /en/projects

  const locales = ['en', 'de', 'sr'] as const;

  // Replace current locale prefix with new one for hard navigation
  const getLocalizedHref = (lang: string) => {
    if (!pathname) return `/${lang}`;
    const prefixRegex = new RegExp(`^/(${locales.join('|')})(?:/|$)`);
    if (prefixRegex.test(pathname)) {
      return pathname.replace(prefixRegex, `/${lang}/`).replace(/\/$/, ''); // Remove trailing slash
    }
    return `/${lang}${pathname}`;
  };

  return (
    <header className={styles.nav}>
      <Link href="/" className={styles.logo}>
        Artidom
      </Link>

      <nav className={styles.links}>
        <Link href="/solutions/horeca">{t('solutions')}</Link>
        <Link href="/workshop">{t('workshop')}</Link>
        <Link href="/catalog">{t('catalog')}</Link>
        <Link href="/projects">{t('projects')}</Link>
        <Link href="/blog">{t('journal')}</Link>
      </nav>

      <div className={styles.right}>
        <div className={styles.langSwitch}>
          {locales.map((lang) => {
            const isActive = locale === lang;
            return (
              <a
                key={lang}
                href={isActive ? undefined : getLocalizedHref(lang)}
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
