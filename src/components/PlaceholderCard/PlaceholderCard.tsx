import type { ReactNode } from 'react';
import styles from './PlaceholderCard.module.css';

export function PlaceholderCard({
  width,
  height,
  children,
}: {
  width: string | number;
  height: string | number;
  children?: ReactNode;
}) {
  return (
    <div className={styles.placeholder} style={{ width, height }}>
      {children}
    </div>
  );
}
