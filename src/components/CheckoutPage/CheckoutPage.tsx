import { Link } from 'wouter';
import { CartLines } from '../CartLines/CartLines';
import styles from './CheckoutPage.module.css';
import { useState } from 'react';
import { CheckoutAddressForm } from '../CheckoutAddressForm/CheckoutAddressForm';
import { CheckoutPaymentForm } from '../CheckoutPaymentForm/CheckoutPaymentForm';
import { CheckoutSuccessSection } from '../CheckoutSuccessSection/CheckoutSuccessSection';

export function CheckoutPage() {
  const [step, setStep] = useState<'address' | 'payment' | 'success'>('address');
  return (
    <div className={styles.main_box}>
      <div className={styles.form_box}>
        <div className={styles.form_sub_box}>
          <div className={styles.logo_box}>
            <Link href="/">TITLE</Link>
          </div>
          {step === 'address' ? (
            <CheckoutAddressForm
              onSubmitButtonClicked={() => {
                setStep('payment');
              }}
            />
          ) : step === 'payment' ? (
            <CheckoutPaymentForm
              onSubmitButtonClicked={() => {
                setStep('success');
              }}
            />
          ) : (
            <CheckoutSuccessSection />
          )}
        </div>
      </div>
      <div className={styles.cart_lines_box}>
        <div className={styles.cart_lines_sub_box}>
          <h2 className={styles.cart_lines_title}>Summary</h2>
          <CartLines />
        </div>
      </div>
    </div>
  );
}
