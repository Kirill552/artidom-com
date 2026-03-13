import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/routing';
import MessengerLinks from '@/components/MessengerLinks';
import styles from './Footer.module.css';

export default function Footer() {
    const t = useTranslations('Footer');
    const year = new Date().getFullYear();
    const contacts = t.raw('contacts') as Array<{ name: string; phone: string }>;
    const email = t('email');

    return (
        <footer className={styles.footer}>
            <div className={styles.inner}>
                <div className={styles.brand}>
                    <span className={styles.logo}>Artidom</span>
                    <p className={styles.tagline}>{t('tagline')}</p>
                    <p className={styles.address}>{t('address')}</p>
                </div>

                <nav className={styles.links}>
                    <Link href="/solutions/residential">{t('nav_solutions')}</Link>
                    <Link href="/workshop">{t('nav_workshop')}</Link>
                    <Link href="/catalog">{t('nav_catalog')}</Link>
                    <Link href="/projects">{t('nav_projects')}</Link>
                    <Link href="/contact">{t('nav_contact')}</Link>
                </nav>

                <div className={styles.contact}>
                    <a href={`mailto:${email}`}>{email}</a>
                    {contacts.map((c) => (
                        <a key={c.name} href={`tel:${c.phone.replace(/\s+/g, '')}`}>
                            {c.name}: {c.phone}
                        </a>
                    ))}
                    <MessengerLinks />
                </div>
            </div>

            <div className={styles.bottom}>
                <span>{t('copyright')} © {year}</span>
                <span>{t('legal')}</span>
            </div>
        </footer>
    );
}
