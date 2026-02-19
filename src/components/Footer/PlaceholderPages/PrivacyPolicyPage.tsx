import styles from './PlaceholderPages.module.css';

export function PrivacyPolicyPage() {
  return (
    <div className={styles.main_box}>
      <h2 className={styles.title}>Privacy Policy</h2>
      <p className={styles.info_text}>
        Your privacy is important to us. We are committed to protecting the personal information you share with us and
        handling it responsibly. Our Privacy Policy outlines how we collect, use, and safeguard your data, as well as
        your rights regarding your information. Please refer to the full policy for detailed information and guidance on
        how we ensure your privacy is respected at all times.
      </p>
    </div>
  );
}
