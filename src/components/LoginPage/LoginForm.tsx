import { Link } from 'wouter';
import styles from './LoginForm.module.css';
import { SubmitButton } from '../SubmitButton/SubmitButton';
import { FormInputElement } from '../FormInputElement/FormInputElement';

export function LoginForm() {
  return (
    <form className={styles.form}>
      <FormInputElement labelText="Email" inputType="email" inputName="email" isRequired={true} />

      <label className={styles.column_box}>
        <span className={styles.additional_title}>
          Password <Link href="reset-password">Forgot password?</Link>
        </span>
        <input className={styles.input} type="password" name="password" id="password" required />
      </label>

      <SubmitButton type="submit" className={styles.login_btn}>
        LOGIN
      </SubmitButton>
    </form>
  );
}
