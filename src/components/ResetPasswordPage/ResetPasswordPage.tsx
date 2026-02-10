import { useState } from 'react';
import styles from './ResetPasswordPage.module.css';

export function ResetPasswordPage() {
  const [email, setEmail] = useState('');
  const [submittedEmail, setSubmittedEmail] = useState('');

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmittedEmail(email);
    setEmail('');
  };

  return (
    <div className={styles.main_box}>
      <h2>Enter your email to reset password</h2>
      {submittedEmail && (
        <div className={styles.notification_box}>
          We sent a recovery link to you at {submittedEmail}. Please check your inbox.
        </div>
      )}
      <form onSubmit={handleSubmit}>
        <label htmlFor="email">Email</label>
        <input
          onChange={(e) => {
            setEmail(e.target.value);
          }}
          value={email}
          type="email"
          name="email"
          id="email"
          required
        />
        <button type="submit">RESET PASSWORD</button>
      </form>
    </div>
  );
}
