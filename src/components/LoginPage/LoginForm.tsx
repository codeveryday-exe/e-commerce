import { Link } from 'wouter';
import styles from './LoginForm.module.css';
import { SubmitButton } from '../SubmitButton/SubmitButton';

export function LoginForm() {
  return (
    <form className={styles.form}>
      <label htmlFor="email">Email</label>
      <input className={styles.input} type="email" name="email" id="email" required />

      <div className={styles.password_box}>
        <label htmlFor="password">Password</label>
        <Link href="reset-password">Forgot password?</Link>
      </div>
      <input className={styles.input} type="password" name="password" id="password" required />

      <SubmitButton type="submit" className={styles.login_btn}>
        LOGIN
      </SubmitButton>
    </form>
  );
}
