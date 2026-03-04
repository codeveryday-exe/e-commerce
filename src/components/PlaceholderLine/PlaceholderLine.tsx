import styles from './PlaceholderLine.module.css';

interface Props {
  width: string | number;
  height?: string | number;
  aspectRatio?: number;
  borderRadius?: string;
}

export function PlaceholderLine({ width, height, aspectRatio, borderRadius = '16px' }: Props) {
  return <div className={styles.placeholder_line} style={{ maxWidth: width, height, aspectRatio, borderRadius }} />;
}
