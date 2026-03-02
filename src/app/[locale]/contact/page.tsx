'use client';
import { useState } from 'react';
import { useTranslations } from 'next-intl';
import styles from './page.module.css';

export default function ContactPage() {
    const t = useTranslations('Contact');
    const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
    const phone = t('phone');
    const phoneHref = phone.replace(/\s+/g, '');
    const email = t('email');

    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        setStatus('loading');
        const form = e.currentTarget;
        try {
            await fetch('/api/contact', { method: 'POST', body: new FormData(form) });
            setStatus('success');
        } catch {
            setStatus('error');
        }
    }

    return (
        <main className="container">
            <section className={styles.page}>
                <div className={styles.left}>
                    <h1 className={styles.title}>{t('title')}</h1>
                    <p className={styles.subtitle}>{t('subtitle')}</p>

                    {status === 'success' ? (
                        <div className={styles.success}>{t('success')}</div>
                    ) : (
                        <form className={styles.form} onSubmit={handleSubmit}>
                            <input name="name" placeholder={t('name')} required />
                            <input name="company" placeholder={t('company')} />
                            <select name="projectType">
                                <option value="">{t('project_type')}</option>
                                {(['villa', 'hotel', 'office', 'school', 'other'] as const).map(v => (
                                    <option key={v} value={v}>{t(`type_${v}`)}</option>
                                ))}
                            </select>
                            <input name="country" placeholder={t('country')} />
                            <textarea name="message" placeholder={t('message')} rows={5} required />
                            <button type="submit">{t('submit')}</button>
                        </form>
                    )}
                </div>

                <div className={styles.right}>
                    <div className={styles.contactDetail}>
                        <span className={styles.detailLabel}>{t('phone_label')}</span>
                        <a href={`tel:${phoneHref}`}>{phone}</a>
                    </div>
                    <div className={styles.contactDetail}>
                        <span className={styles.detailLabel}>{t('email_label')}</span>
                        <a href={`mailto:${email}`}>{email}</a>
                    </div>
                    <div className={styles.contactDetail}>
                        <span className={styles.detailLabel}>{t('company_label')}</span>
                        <span className={styles.detailValue}>{t('company_name')}</span>
                    </div>
                    <div className={styles.contactDetail}>
                        <span className={styles.detailLabel}>{t('tax_id_label')}</span>
                        <span className={styles.detailValue}>{t('tax_id')}</span>
                    </div>
                    <div className={styles.contactDetail}>
                        <span className={styles.detailLabel}>{t('location_label')}</span>
                        <span className={styles.detailValue}>{t('address')}</span>
                    </div>
                </div>
            </section>
        </main>
    );
}
