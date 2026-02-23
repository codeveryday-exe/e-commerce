import { FormInputElement } from '../../FormInputElement/FormInputElement';
import { SubmitButton } from '../../SubmitButton/SubmitButton';
import styles from './CheckoutAddressForm.module.css';
import { checkoutInfoSchema, type CheckoutInfoFormData } from '../schema';

export function CheckoutAddressForm({ onSubmit }: { onSubmit: (data: CheckoutInfoFormData) => void }) {
  const handleSubmit = (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const parsedFormData = checkoutInfoSchema.parse(Object.fromEntries(formData.entries()));
    onSubmit(parsedFormData);
  };

  return (
    <>
      <h2 className={styles.title}>Checkout</h2>
      <form onSubmit={handleSubmit} className={styles.form}>
        <FormInputElement labelText="Email" inputType="email" inputName="email" isRequired />
        <FormInputElement labelText="Phone number" inputType="tel" inputName="phone" />

        <div className={styles.row_box}>
          <FormInputElement labelText="First name" inputName="firstName" isRequired />
          <FormInputElement labelText="Last name" inputName="lastName" isRequired />
        </div>

        <FormInputElement labelText="Company (required for business addresses)" inputName="company" />
        <FormInputElement labelText="Address" inputName="address" isRequired />
        <FormInputElement labelText="Address continued" inputName="additionalAddress" />

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
          <FormInputElement labelText="City" inputName="city" isRequired />
          <FormInputElement labelText="Zip code" inputName="zip" isRequired />
        </div>

        <SubmitButton className={styles.checkout_info_btn} type="submit">
          Continue
        </SubmitButton>
      </form>
    </>
  );
}
