import { FormInputElement } from '../FormInputElement/FormInputElement';
import { SubmitButton } from '../SubmitButton/SubmitButton';
import styles from './CheckoutPaymentForm.module.css';
import amazonPayLogo from '../../assets/amazon-pay-logo.png';
import applePayLogo from '../../assets/apple-pay-logo.png';
import payPalLogo from '../../assets/paypal-logo.png';
import clsx from 'clsx';
import { Lock } from 'lucide-react';

export function CheckoutPaymentForm({ onSubmit }: { onSubmit: () => void }) {
  return (
    <>
      <h2 className={styles.title}>Payment</h2>
      <form className={styles.form}>
        <fieldset className={styles.payment_btn_box}>
          <legend>Express checkout</legend>
          <button className={clsx(styles.pay_btn, styles.amazon_btn)} type="button">
            <img className={styles.btn_image} src={amazonPayLogo} alt="amazon-pay-logo" />
          </button>
          <button className={clsx(styles.pay_btn, styles.apple_btn)} type="button">
            <img className={styles.btn_image} src={applePayLogo} alt="apple-pay-logo" />
          </button>
          <button className={clsx(styles.pay_btn, styles.paypal_btn)} type="button">
            <img className={styles.btn_image} src={payPalLogo} alt="paypal-logo" />
          </button>
        </fieldset>

        <div className={styles.divider}>
          <span>OR CONTINUE BELOW TO PAY WITH A CREDIT CARD</span>
        </div>

        <FormInputElement
          className={styles.input_element}
          labelText="Card number"
          inputType="email"
          inputName="email"
          placeholder="1234 5678 9012 3456"
          isRequired={true}
        />

        <div className={styles.row_box}>
          <FormInputElement
            className={styles.input_element}
            labelText="Expiry date"
            inputType="text"
            inputName="expiryDate"
            placeholder="MM/YY"
            isRequired={true}
          />
          <FormInputElement
            className={styles.input_element}
            labelText="Security code"
            inputType="text"
            inputName="securityCode"
            placeholder="3 digits"
            isRequired={true}
          />
        </div>

        <FormInputElement
          className={styles.input_element}
          labelText="Name on card"
          inputType="text"
          inputName="nameOnCard"
          placeholder="J. Smith"
          isRequired={true}
        />

        <SubmitButton className={styles.payment_info_btn} onClick={onSubmit} type="submit">
          <Lock size={18} />
          Pay
        </SubmitButton>
      </form>
    </>
  );
}
