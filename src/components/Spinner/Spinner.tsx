import styles from './Spinner.module.css';

export function Spinner({ text }: { text: string }) {
  return (
    <div className={styles.ring_box}>
      <div className={styles.ring}></div>
      <p>{text}</p>
    </div>
  );
}
