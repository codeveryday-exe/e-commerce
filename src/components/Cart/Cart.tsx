import { SubmitButton } from '../SubmitButton/SubmitButton';
import styles from './Cart.module.css';
import { useCartPanel } from '../../contexts/CartPanelContext';
import { ScrollLock } from '../ScrollLock/ScrollLock';
import { CartLines } from '../CartLines/CartLines';
import { useLocation } from 'wouter';
import { ClosePanelButton } from '../ClosePanelButton/ClosePanelButton';
import { Backdrop } from '../Backdrop/Backdrop';

export function Cart() {
  const [, setLocation] = useLocation();
  const { setIsCartOpen } = useCartPanel();

  const closeCart = () => {
    setIsCartOpen(false);
  };

  return (
    <>
      <Backdrop onClick={closeCart} />
      <ScrollLock />
      <div className={styles.cart_box}>
        <ClosePanelButton
          onClick={() => {
            setIsCartOpen(false);
          }}
        />

        <CartLines closeCart={closeCart} />
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
