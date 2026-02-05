import styles from './LoginPage.module.css';
import LoginForm from './LoginForm';
import RegisterForm from './RegisterForm';

export default function LoginPage() {
  return (
    <div className={styles.main_box}>
      <div className={styles.form_box}>
        <h2>Login</h2>
        <LoginForm />
      </div>
      <div className={styles.form_box}>
        <h2>Register</h2>
        <RegisterForm />
      </div>
    </div>
  );
}
