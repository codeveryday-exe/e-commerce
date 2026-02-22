import styles from './CheckoutSuccessSection.module.css';
import { CircleCheckBig } from 'lucide-react';

export function CheckoutSuccessSection() {
  return (
    <div className={styles.main_box}>
      <CircleCheckBig size={64} />
      <h2 className={styles.title}>Payment Successful!</h2>
      <p className={styles.info_text}>Thank you for your purchase. Your order has been confirmed.</p>
      <button
        onClick={() => {
          window.history.back();
        }}
        className={styles.home_link}
        type="button"
      >
        Continue Shopping
      </button>
    </div>
  );
}
