import { Link } from 'wouter';
import { CartButton } from '../CartButton/CartButton';
import styles from './Header.module.css';
import { LoginLink } from '../LoginLink/LoginLink';
import { cartQuery } from '../CartLines/CartLines';
import { useCartId } from '../../hooks/useCartId';
import { useQuery } from '@tanstack/react-query';
import { useCartPanel } from '../../contexts/CartPanelContext';
import { CollectionListHeader } from '../CollectionListHeader/CollectionListHeader';
import { SearchForm } from '../SearchForm/SearchForm';
import { Cart } from '../Cart/Cart';

export function Header() {
  const [cartId] = useCartId();
  useQuery(cartQuery(cartId));
  const { isCartOpen, setIsCartOpen } = useCartPanel();

  return (
    <header className={styles.header}>
      <nav className={styles.navbar}>
        <CollectionListHeader />
      </nav>
      <div className={styles.logo_box}>
        <Link href="/">allShop</Link>
      </div>
      <div className={styles.other_box}>
        <SearchForm />
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
