import { FormInputElement } from '../../FormInputElement/FormInputElement';
import { SubmitButton } from '../../SubmitButton/SubmitButton';
import styles from './CheckoutPaymentForm.module.css';
import { Lock } from 'lucide-react';

export function CheckoutPaymentForm({ onSubmit }: { onSubmit: () => void }) {
  return (
    <>
      <form className={styles.form}>
        <h3 className={styles.title}>Payment</h3>

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
