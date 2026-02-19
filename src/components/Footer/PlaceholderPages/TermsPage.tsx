import styles from './PlaceholderPages.module.css';

export function TermsPage() {
  return (
    <div className={styles.main_box}>
      <h2 className={styles.title}>Terms & Conditions</h2>
      <p className={styles.info_text}>
        By accessing or using our website and services, you agree to comply with and be bound by our Terms & Conditions.
        These terms outline the rules, responsibilities, and guidelines governing the use of our site, products, and
        services. For complete details, including user obligations, limitations of liability, and other important
        information, please refer to the full Terms & Conditions page.
      </p>
    </div>
  );
}
