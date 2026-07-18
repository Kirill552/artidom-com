import styles from './Veil.module.css';

export default function Veil() {
  return (
    <div className={styles.veil} aria-hidden="true">
      <div className={`${styles.panel} ${styles.left}`} />
      <div className={`${styles.panel} ${styles.right}`} />
      <span className={styles.word}>Artidom</span>
    </div>
  );
}
