import { Link } from 'wouter';
import CartButton from '../CartButton/CartButton';
import styles from './Header.module.css';
import { useState } from 'react';
import LoginLink from '../LoginLink/LoginLink';
import Cart from '../Cart/Cart';

export default function Header() {
  const [isCartOpen, setIsCartOpen] = useState(false);
  return (
    <header className={styles.header}>
      <div className={styles.logo_box}>
        <Link href="/">TITLE</Link>
      </div>
      <nav className={styles.navbar}>{/* titles here e.g. WOMEN MEN KIDS HOME BEAUTY */}</nav>
      <div className={styles.other_box}>
        {/* search bar here OPTIONAL */}
        <LoginLink />
        <CartButton
          onClick={() => {
            setIsCartOpen(true);
          }}
        />
      </div>
      {isCartOpen && (
        <Cart
          setIsCartOpen={() => {
            setIsCartOpen(false);
          }}
        />
      )}
    </header>
  );
}
