'use client';
import { useState } from 'react';
import { useTranslations } from 'next-intl';
import MessengerLinks from '@/components/MessengerLinks';
import styles from './page.module.css';

export default function ContactPage() {
    const t = useTranslations('Contact');
    const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error' | 'rate_limit'>('idle');
    const [errorField, setErrorField] = useState('');
    const contacts = t.raw('contacts') as Array<{ name: string; phone: string; role: string }>;
    const email = t('email');

    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        setStatus('loading');
        setErrorField('');
        const form = e.currentTarget;
        try {
            const res = await fetch('/api/contact', { method: 'POST', body: new FormData(form) });
            if (res.status === 429) {
                setStatus('rate_limit');
                return;
            }
            if (res.status === 400) {
                const data = await res.json();
                setErrorField(data.error || '');
                setStatus('error');
                return;
            }
            if (!res.ok) {
                setStatus('error');
                return;
            }
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
                            <input name="phone" type="tel" placeholder={t('phone_placeholder')} />
                            <input name="email" type="email" placeholder={t('email_placeholder')} />
                            <input name="company" placeholder={t('company')} />
                            <select name="projectType">
                                <option value="">{t('project_type')}</option>
                                {(['villa', 'hotel', 'office', 'school', 'other'] as const).map(v => (
                                    <option key={v} value={v}>{t(`type_${v}`)}</option>
                                ))}
                            </select>
                            <input name="country" placeholder={t('country')} />
                            <textarea name="message" placeholder={t('message')} rows={5} required />
                            <input name="website" style={{ display: 'none' }} tabIndex={-1} autoComplete="off" />
                            <button type="submit" disabled={status === 'loading'}>
                                {t('submit')}
                            </button>
                            {status === 'rate_limit' && (
                                <p className={styles.errorMsg}>{t('error_rate_limit')}</p>
                            )}
                            {status === 'error' && errorField === 'phone' && (
                                <p className={styles.errorMsg}>{t('error_phone')}</p>
                            )}
                            {status === 'error' && errorField === 'email' && (
                                <p className={styles.errorMsg}>{t('error_email')}</p>
                            )}
                            {status === 'error' && errorField === 'name' && (
                                <p className={styles.errorMsg}>{t('error_name')}</p>
                            )}
                            {status === 'error' && !['phone', 'email', 'name'].includes(errorField) && (
                                <p className={styles.errorMsg}>{t('error_generic')}</p>
                            )}
                        </form>
                    )}
                </div>

                <div className={styles.right}>
                    {contacts.map((c) => (
                        <div key={c.name} className={styles.contactDetail}>
                            <span className={styles.detailLabel}>{c.name} — {c.role}</span>
                            <a href={`tel:${c.phone.replace(/\s+/g, '')}`}>{c.phone}</a>
                        </div>
                    ))}
                    <div className={styles.contactDetail}>
                        <span className={styles.detailLabel}>WhatsApp / Viber</span>
                        <MessengerLinks />
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
