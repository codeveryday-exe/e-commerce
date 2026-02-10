import { Link } from 'wouter';
import styles from './LoginLink.module.css';
import { UserIcon } from 'lucide-react';

export function LoginLink() {
  return (
    <Link title="Login" className={styles.link} href="/login">
      <UserIcon />
      <span className="sr-only">Login</span>
    </Link>
  );
}
