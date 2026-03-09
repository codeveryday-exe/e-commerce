import clsx from 'clsx';
import styles from './PlaceholderLine.module.css';

interface Props {
  width: string | number;
  height: string | number;
  margin?: string;
  borderRadius?: string;
  isTitle?: boolean;
}

export function PlaceholderLine({ width, height, margin, isTitle = false, borderRadius = '16px' }: Props) {
  return (
    <div className={clsx(styles.placeholder_line_box, { [styles.title]: isTitle })} style={{ width, height, margin }}>
      <div className={styles.placeholder_line} style={{ borderRadius }} />
    </div>
  );
}
