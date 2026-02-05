import { Link } from 'wouter';
import CartButton from '../CartButton/CartButton';
import styles from './Header.module.css';
import { useState } from 'react';
import LoginLink from '../LoginLink/LoginLink';
import SubmitButton from '../SubmitButton/SubmitButton';

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
        <div className={styles.cart_box}>
          <button
            onClick={() => {
              setIsCartOpen(false);
            }}
            type="button"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="size-6"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
            </svg>
          </button>
          <h2>Cart</h2>
          <div>
            {/* Carts here */}
            <div>
              <p>TOTAL {/* price here */}</p>
            </div>
            <SubmitButton type="button">CHECKOUT</SubmitButton>
          </div>
        </div>
      )}
    </header>
  );
}
