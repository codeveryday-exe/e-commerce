import SubmitButton from '../SubmitButton/SubmitButton';
import styles from './RegisterForm.module.css';

export default function RegisterForm() {
  return (
    <form className={styles.form}>
      <label htmlFor="email">Email</label>
      <input className={styles.input} type="email" name="email" id="email" />

      <label htmlFor="password">Password</label>
      <input className={styles.input} type="password" name="password" id="password" />

      <div className={styles.name_details_box}>
        <div className={styles.field}>
          <label htmlFor="firstName">First Name</label>
          <input className={styles.input} type="text" name="firstName" id="firstName" />
        </div>

        <div className={styles.field}>
          <label htmlFor="lastName">Last Name</label>
          <input className={styles.input} type="text" name="lastName" id="lastName" />
        </div>
      </div>

      <SubmitButton type="submit" className={styles.register_btn}>
        REGISTER
      </SubmitButton>
    </form>
  );
}
