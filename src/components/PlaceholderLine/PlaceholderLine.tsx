import styles from './PlaceholderLine.module.css';

interface Props {
  width: string | number;
  height: string | number;
  margin?: string;
  borderRadius?: string;
}

export function PlaceholderLine({ width, height, margin, borderRadius = '16px' }: Props) {
  return (
    <div className={styles.placeholder_line_box} style={{ width, height, margin }}>
      <div className={styles.placeholder_line} style={{ borderRadius }} />
    </div>
  );
}
