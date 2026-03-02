import { Link } from '@/i18n/routing';
import styles from './LocalSeoLinks.module.css';

interface LocalSeoLinksProps {
    title: string;
    intro: string;
    items: Array<{
        slug: string;
        title: string;
        description: string;
    }>;
}

export default function LocalSeoLinks({ title, intro, items }: LocalSeoLinksProps) {
    return (
        <section className={styles.section}>
            <span className={styles.label}>{title}</span>
            <p className={styles.intro}>{intro}</p>
            <div className={styles.grid}>
                {items.map((item) => (
                    <Link key={item.slug} href={`/solutions/residential/${item.slug}`} className={styles.card}>
                        <span className={styles.cardTitle}>{item.title}</span>
                        <p className={styles.cardText}>{item.description}</p>
                        <span className={styles.arrow}>→</span>
                    </Link>
                ))}
            </div>
        </section>
    );
}
