import { useState } from 'react';
import styles from './ResetPasswordPage.module.css';
import { SubmitButton } from '../SubmitButton/SubmitButton';

export function ResetPasswordPage() {
  const [email, setEmail] = useState('');
  const [submittedEmail, setSubmittedEmail] = useState('');

  const handleSubmit = (e: React.SubmitEvent<HTMLFormElement>) => {
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
        <label className={styles.column_box}>
          <span>Email</span>
          <input
            onChange={(e) => {
              setEmail(e.target.value);
            }}
            value={email}
            type="email"
            name="email"
            required
          />
        </label>
        <SubmitButton type="submit">RESET PASSWORD</SubmitButton>
      </form>
    </div>
  );
}
