import { Link } from 'wouter';
import Cart from './Cart';
import styles from './Header.module.css';

export default function Header() {
  return (
    <header className={styles.header}>
      <div className={styles.logo_box}>
        <Link href="/">BRUH</Link>
      </div>
      <nav className={styles.navbar}>{/* titles here e.g. WOMEN MEN KIDS HOME BEAUTY */}</nav>
      <div className={styles.other_box}>
        {/* search bar here OPTIONAL */}
        <Cart />
        {/* login signup here OPTIONAL */}
      </div>
    </header>
  );
}
