import styles from './Backdrop.module.css';

export function Backdrop({ onClick }: { onClick: () => void }) {
  return <div aria-hidden onClick={onClick} className={styles.backdrop_box} />;
}
