import styles from './PlaceholderImage.module.css';

export function PlaceholderImage({ width, height }: { width: string | number; height: string | number }) {
  return <div className={styles.placeholder_image} style={{ maxWidth: width, height }} />;
}
