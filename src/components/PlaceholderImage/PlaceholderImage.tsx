import styles from './PlaceholderImage.module.css';

interface Props {
  width: string | number;
  height?: string | number;
  variant?: 'white' | 'brown';
  borderRadius?: string;
  aspectRatio?: number;
}

export function PlaceholderImage({ width, height, variant = 'white', borderRadius, aspectRatio }: Props) {
  return (
    <div
      data-variant={variant}
      className={styles.placeholder_image}
      style={{ width, height, borderRadius, aspectRatio }}
    />
  );
}
