import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/routing';
import styles from './Footer.module.css';

export default function Footer() {
    const t = useTranslations('Footer');
    const year = new Date().getFullYear();

    return (
        <footer className={styles.footer}>
            <div className={styles.inner}>
                <div className={styles.brand}>
                    <span className={styles.logo}>Artidom</span>
                    <p className={styles.tagline}>{t('tagline')}</p>
                    <p className={styles.address}>{t('address')}</p>
                </div>

                <nav className={styles.links}>
                    <Link href="/solutions/horeca">{t('nav_solutions')}</Link>
                    <Link href="/workshop">{t('nav_workshop')}</Link>
                    <Link href="/catalog">{t('nav_catalog')}</Link>
                    <Link href="/projects">{t('nav_projects')}</Link>
                    <Link href="/contact">{t('nav_contact')}</Link>
                </nav>

                <div className={styles.contact}>
                    <a href={`mailto:${t('email')}`}>{t('email')}</a>
                    <a href={`tel:${t('phone')}`}>{t('phone')}</a>
                </div>
            </div>

            <div className={styles.bottom}>
                <span>{t('copyright')} © {year}</span>
                <span>Bar, Montenegro</span>
            </div>
        </footer>
    );
}
