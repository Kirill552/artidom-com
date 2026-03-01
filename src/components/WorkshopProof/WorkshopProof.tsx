import { useTranslations } from 'next-intl';
import styles from './WorkshopProof.module.css';

type ProofVariant = 'default' | 'horeca' | 'residential' | 'catalog';

interface WorkshopProofProps {
    variant?: ProofVariant;
}

export default function WorkshopProof({ variant = 'default' }: WorkshopProofProps) {
    const t = useTranslations('WorkshopProof');
    const items = t.raw(variant) as string[];

    return (
        <div className={styles.strip}>
            {items.map((item, i) => (
                <span key={i} className={styles.item}>
                    {item}
                    {i < items.length - 1 && <span className={styles.dot}>·</span>}
                </span>
            ))}
        </div>
    );
}
