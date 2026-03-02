import styles from './FaqSection.module.css';

interface FAQSectionProps {
    title: string;
    intro?: string;
    items: Array<{
        question: string;
        answer: string;
    }>;
}

export default function FAQSection({ title, intro, items }: FAQSectionProps) {
    return (
        <section className={styles.section}>
            <span className={styles.label}>{title}</span>
            {intro ? <p className={styles.intro}>{intro}</p> : null}
            <div className={styles.list}>
                {items.map((item) => (
                    <details key={item.question} className={styles.item}>
                        <summary className={styles.question}>{item.question}</summary>
                        <p className={styles.answer}>{item.answer}</p>
                    </details>
                ))}
            </div>
        </section>
    );
}
