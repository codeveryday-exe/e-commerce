import type { ReactNode } from 'react';
import styles from './PlaceholderCard.module.css';

export function PlaceholderCard({
  width,
  height,
  padding,
  children,
}: {
  width: string | number;
  height: string | number;
  padding?: string;
  children?: ReactNode;
}) {
  return (
    <div className={styles.placeholder} style={{ width, height, padding }}>
      {children}
    </div>
  );
}
