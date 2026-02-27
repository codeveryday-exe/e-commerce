import { Link } from 'wouter';
import { CartButton } from '../CartButton/CartButton';
import styles from './Header.module.css';
import { LoginLink } from '../LoginLink/LoginLink';
import { cartQuery } from '../CartLines/CartLines';
import { useCartId } from '../../hooks/useCartId';
import { useQuery } from '@tanstack/react-query';
import { useCartPanel } from '../../contexts/CartPanelContext';
import { CollectionListHeader } from '../CollectionListHeader/CollectionListHeader';
import { Cart } from '../Cart/Cart';
import { Search } from 'lucide-react';
import { useState } from 'react';
import { SearchPanel } from '../SearchPanel/SearchPanel';

export function Header() {
  const [cartId] = useCartId();
  useQuery(cartQuery(cartId));
  const { isCartOpen, setIsCartOpen } = useCartPanel();
  const [isSearchPanelOpen, setIsSearchPanelOpen] = useState(false);

  return (
    <header className={styles.header}>
      <nav className={styles.navbar}>
        <CollectionListHeader />
      </nav>
      <div className={styles.logo_box}>
        <Link href="/">allShop</Link>
      </div>
      <div className={styles.other_box}>
        <button
          className={styles.search_btn}
          onClick={() => {
            setIsSearchPanelOpen((prev) => !prev);
          }}
          type="button"
          title="Search"
        >
          <Search className={styles.search_btn} size={24} />
          <span className="sr-only">Search</span>
        </button>
        <LoginLink />
        <CartButton
          onClick={() => {
            setIsCartOpen(true);
          }}
        />
      </div>
      {isCartOpen && <Cart />}
      {isSearchPanelOpen && (
        <SearchPanel
          isSearchPanelOpen={isSearchPanelOpen}
          closeSearchPanel={() => {
            setIsSearchPanelOpen(false);
          }}
        />
      )}
    </header>
  );
}
