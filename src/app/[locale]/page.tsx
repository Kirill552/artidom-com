import Hero from '@/components/Hero';
import { useTranslations } from 'next-intl';
import styles from './page.module.css';

export default function IndexPage() {
  const t = useTranslations('Index');

  return (
    <main className={styles.main}>
      <div className="container">
        <Hero />

        <section className={styles.cases}>
          <div className={styles.caseHeader}>
            <span className={styles.caseLabel}>Featured Project</span>
            <h2 className={styles.caseTitle}>{t('cases.school.title')}</h2>
          </div>
          <div className={styles.caseContent}>
            <div className={styles.caseText}>
              <p>{t('cases.school.description')}</p>
              <div className={styles.stats}>
                <div className={styles.statItem}>
                  <strong>1,200</strong>
                  <span>Sqm Total</span>
                </div>
                <div className={styles.statItem}>
                  <strong>Montenegro</strong>
                  <span>Location</span>
                </div>
              </div>
            </div>
            <div className={styles.caseVisual}>
               {/* School photo placeholder */}
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
