import styles from './PlaceholderPages.module.css';

export function CookiePolicyPage() {
  return (
    <div className={styles.main_box}>
      <h2 className={styles.title}>Cookie Policy</h2>
      <p className={styles.info_text}>
        Our website uses cookies to enhance your browsing experience, analyze site traffic, and personalize content. By
        continuing to use our site, you consent to the use of cookies in accordance with our Cookie Policy. Please refer
        to the full policy for detailed information on the types of cookies we use, their purposes, and how you can
        manage your preferences.
      </p>
    </div>
  );
}
