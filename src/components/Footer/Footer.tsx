import { Link } from 'wouter';
import { CollectionList } from '../CollectionList/CollectionList';
import styles from './Footer.module.css';

export function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.box}>
        <h2 className={styles.title}>Shop</h2>
        <CollectionList className="footer" />
      </div>

      <div className={styles.box}>
        <h2 className={styles.title}>Help</h2>
        <div className={styles.link_box}>
          <Link href="/login">My Account</Link>
          <Link href="/shipping">Shipping</Link>
          <Link href="/returns">Returns & Exchanges</Link>
          <Link href="/contact">Contact Us</Link>
        </div>
      </div>

      <div className={styles.box}>
        <h2 className={styles.title}>Legal</h2>
        <div className={styles.link_box}>
          <Link href="/privacy">Privacy Policy</Link>
          <Link href="/terms">Terms & Conditions</Link>
          <Link href="/cookies">Cookie Policy</Link>
        </div>
      </div>

      <div className={styles.box}>
        <h2 className={styles.title}>Company</h2>
        <div className={styles.link_box}>
          <Link href="/about">About us</Link>
        </div>
      </div>
    </footer>
  );
}
