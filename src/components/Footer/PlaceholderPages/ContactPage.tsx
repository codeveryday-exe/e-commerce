import styles from './PlaceholderPages.module.css';

export function ContactPage() {
  return (
    <div className={styles.main_box}>
      <h2 className={styles.title}>Contact Us</h2>
      <p className={styles.info_text}>
        We value your questions, feedback, and inquiries. Please do not hesitate to reach out to our team for
        assistance. Whether you need support with an order, information about our products, or general guidance, we are
        here to help and aim to respond promptly. For detailed contact options and hours of availability, please refer
        to our full Contact page
      </p>
    </div>
  );
}
