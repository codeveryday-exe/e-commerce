import { ShoppingBag } from 'lucide-react';
import styles from './CartButton.module.css';

interface Props {
  onClick: () => void;
}

export function CartButton({ onClick }: Props) {
  return (
    <button
      onClick={() => {
        onClick();
      }}
      type="button"
      title="Show cart"
      className={styles.cart}
    >
      <ShoppingBag />
      <span className="sr-only">Show cart</span>
    </button>
  );
}
