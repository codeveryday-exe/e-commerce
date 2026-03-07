import { SubmitButton } from '../SubmitButton/SubmitButton';
import styles from './Cart.module.css';
import { CartLines } from '../CartLines/CartLines';
import { useLocation } from 'wouter';

export function Cart() {
  const [, setLocation] = useLocation();

  return (
    <>
      <CartLines />

      <div className={styles.checkout_btn_box}>
        <SubmitButton
          onClick={() => {
            setLocation('/checkout');
          }}
          className={styles.checkout_btn}
          type="button"
        >
          CHECKOUT
        </SubmitButton>
      </div>
    </>
  );
}
