import { SubmitButton } from '../SubmitButton/SubmitButton';
import styles from './Cart.module.css';
import { useCartPanel } from '../../contexts/CartPanelContext';
import { X } from 'lucide-react';
import { ScrollLock } from '../ScrollLock/ScrollLock';
import { CartLines } from '../CartLines/CartLines';
import { useLocation } from 'wouter';

export function Cart() {
  const [, setLocation] = useLocation();
  const { setIsCartOpen } = useCartPanel();

  const closeCart = () => {
    setIsCartOpen(false);
  };

  return (
    <>
      <div aria-hidden onClick={closeCart} className={styles.backdrop_box} />
      <ScrollLock />
      <div className={styles.cart_box}>
        <button onClick={closeCart} className={styles.close_btn} type="button">
          <X size={28} />
          <span className="sr-only">Close cart</span>
        </button>
        <h2 className={styles.cart_title}>Cart</h2>
        <CartLines />
        <div className={styles.checkout_btn_box}>
          <SubmitButton
            onClick={() => {
              closeCart();
              setLocation('/checkout');
            }}
            className={styles.checkout_btn}
            type="button"
          >
            CHECKOUT
          </SubmitButton>
        </div>
      </div>
    </>
  );
}
