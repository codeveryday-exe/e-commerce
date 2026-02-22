import { FormInputElement } from '../FormInputElement/FormInputElement';
import { SubmitButton } from '../SubmitButton/SubmitButton';
import styles from './RegisterForm.module.css';

export function RegisterForm() {
  return (
    <form className={styles.form}>
      <FormInputElement labelText="Email" inputType="email" inputName="email" isRequired={true} />

      <FormInputElement labelText="Password" inputType="password" inputName="password" isRequired={true} />

      <div className={styles.row_box}>
        <FormInputElement labelText="First name" inputType="text" inputName="firstName" isRequired={true} />
        <FormInputElement labelText="Last name" inputType="text" inputName="lastName" isRequired={true} />
      </div>

      <SubmitButton type="submit" className={styles.register_btn}>
        REGISTER
      </SubmitButton>
    </form>
  );
}
