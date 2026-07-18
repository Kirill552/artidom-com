'use client';
import { useState } from 'react';
import { useTranslations, useLocale } from 'next-intl';
import { Link, usePathname, useRouter } from '@/i18n/routing';
import { appLocales } from '@/i18n/locale-config';
import styles from './Nav.module.css';

export default function Nav() {
  const t = useTranslations('Nav');
  const locale = useLocale();
  const pathname = usePathname();
  const router = useRouter();
  const [open, setOpen] = useState(false);

  return (
    <header className={styles.nav}>
      <Link href="/" className={styles.logo}>
        Artidom
      </Link>

      <button
        className={styles.burger}
        onClick={() => setOpen(!open)}
        aria-label="Menu"
        aria-expanded={open}
      >
        <span className={`${styles.burgerLine} ${open ? styles.burgerOpen : ''}`} />
      </button>

      <div className={`${styles.menu} ${open ? styles.menuOpen : ''}`}>
        <nav className={styles.links}>
          <Link href="/solutions/residential" onClick={() => setOpen(false)}>{t('solutions')}</Link>
          <Link href="/workshop" onClick={() => setOpen(false)}>{t('workshop')}</Link>
          <Link href="/catalog" onClick={() => setOpen(false)}>{t('catalog')}</Link>
          <Link href="/projects" onClick={() => setOpen(false)}>{t('projects')}</Link>
          <Link href="/blog" onClick={() => setOpen(false)}>{t('journal')}</Link>
        </nav>

        <div className={styles.right}>
          <div className={styles.langSwitch}>
            {appLocales.map((lang) => {
              const isActive = locale === lang;
              return (
                <button
                  key={lang}
                  type="button"
                  onClick={() => {
                    setOpen(false);
                    router.replace(pathname, { locale: lang });
                  }}
                  className={`${styles.lang} ${isActive ? styles.langActive : ''}`}
                  aria-current={isActive ? 'true' : undefined}
                >
                  {t(`lang_${lang}`)}
                </button>
              );
            })}
          </div>
          <Link href="/contact" className={styles.cta} onClick={() => setOpen(false)}>
            {t('cta')} →
          </Link>
        </div>
      </div>
    </header>
  );
}
