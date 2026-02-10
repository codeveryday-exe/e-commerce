import { Link } from 'wouter';
import { CartButton } from '../CartButton/CartButton';
import styles from './Header.module.css';
import { LoginLink } from '../LoginLink/LoginLink';
import { Cart, cartQuery } from '../Cart/Cart';
import { useCartId } from '../../hooks/useCartId';
import { useQuery } from '@tanstack/react-query';
import { useCartPanel } from '../../contexts/CartPanelContext';

export function Header() {
  const [cartId] = useCartId();

  useQuery(cartQuery(cartId));

  const { isCartOpen, setIsCartOpen } = useCartPanel();

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
      {isCartOpen && <Cart />}
    </header>
  );
}
