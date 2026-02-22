import { FormInputElement } from '../FormInputElement/FormInputElement';
import { SubmitButton } from '../SubmitButton/SubmitButton';
import styles from './CheckoutAddressForm.module.css';

export function CheckoutAddressForm({ onSubmitButtonClicked }: { onSubmitButtonClicked: () => void }) {
  return (
    <>
      <h2 className={styles.title}>Checkout</h2>
      <form className={styles.form}>
        <FormInputElement labelText="Email" inputType="email" inputName="email" isRequired={true} />
        <FormInputElement labelText="Phone number" inputType="tel" inputName="phone" isRequired={false} />

        <div className={styles.row_box}>
          <FormInputElement labelText="First name" inputType="text" inputName="firstName" isRequired={true} />
          <FormInputElement labelText="Last name" inputType="text" inputName="lastName" isRequired={true} />
        </div>

        <FormInputElement
          labelText="Company (required for business addresses)"
          inputType="text"
          inputName="company"
          isRequired={false}
        />

        <FormInputElement labelText="Address" inputType="text" inputName="address" isRequired={true} />

        <FormInputElement
          labelText="Address continued"
          inputType="text"
          inputName="additionalAddress"
          isRequired={false}
        />

        <label className={styles.column_box}>
          <span>Country</span>
          <select className={styles.country_selector} name="country" required>
            <option value="">Select country</option>
            <option value="FI">Finland</option>
            <option value="FR">France</option>
            <option value="DE">Germany</option>
            <option value="GR">Greece</option>
            <option value="IT">Italy</option>
            <option value="NO">Norway</option>
            <option value="PL">Poland</option>
            <option value="PT">Portugal</option>
            <option value="RO">Romania</option>
            <option value="RU">Russia</option>
            <option value="ES">Spain</option>
            <option value="SE">Sweden</option>
            <option value="CH">Switzerland</option>
            <option value="TR">Türkiye</option>
            <option value="UA">Ukraine</option>
            <option value="GB">United Kingdom</option>
          </select>
        </label>

        <div className={styles.row_box}>
          <FormInputElement labelText="City" inputType="text" inputName="city" isRequired={true} />
          <FormInputElement labelText="Zip code" inputType="text" inputName="zip" isRequired={true} />
        </div>

        <SubmitButton className={styles.checkout_info_btn} onClick={onSubmitButtonClicked} type="submit">
          Continue
        </SubmitButton>
      </form>
    </>
  );
}
