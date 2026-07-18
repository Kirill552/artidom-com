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
            <h2 className={styles.faqTitle}>{title}</h2>
            {intro ? <p className={styles.intro}>{intro}</p> : null}
            <div className={styles.list}>
                {items.map((item) => (
                    <details key={item.question} className={styles.item}>
                        <summary className={styles.question}>
                            {item.question}
                            <span className={styles.plus} aria-hidden="true" />
                        </summary>
                        <div className={styles.answer}>{item.answer}</div>
                    </details>
                ))}
            </div>
        </section>
    );
}
