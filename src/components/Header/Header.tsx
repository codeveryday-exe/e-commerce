import { Link } from 'wouter';
import { CartButton } from '../CartButton/CartButton';
import styles from './Header.module.css';
import { LoginLink } from '../LoginLink/LoginLink';
import { Cart, cartQuery } from '../Cart/Cart';
import { useCartId } from '../../hooks/useCartId';
import { useQuery } from '@tanstack/react-query';
import { useCartPanel } from '../../contexts/CartPanelContext';
import { CollectionList } from '../CollectionList/CollectionList';

export function Header() {
  const [cartId] = useCartId();

  useQuery(cartQuery(cartId));

  const { isCartOpen, setIsCartOpen } = useCartPanel();

  return (
    <header className={styles.header}>
      <div className={styles.logo_box}>
        <Link href="/">TITLE</Link>
      </div>
      <nav className={styles.navbar}>
        <CollectionList />
      </nav>
      <div className={styles.other_box}>
        {/* search bar here */}
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
