import { Link } from 'wouter';
import styles from './NotFoundPage.module.css';
import { MoveLeft } from 'lucide-react';

export function NotFoundPage() {
  return (
    <div className={styles.not_found_box}>
      <h1 className={styles.not_found_title}>Page Not Found</h1>
      <p>The page you're looking for could not found.</p>
      <Link className={styles.home_link} href="/">
        <MoveLeft size={16} strokeWidth={2} />
        <span>Return to Home</span>
      </Link>
    </div>
  );
}
