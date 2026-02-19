import styles from './PlaceholderPages.module.css';

export function ShippingPage() {
  return (
    <div className={styles.main_box}>
      <h2 className={styles.title}>Shipping</h2>
      <p className={styles.info_text}>
        We are committed to processing and delivering your order as quickly and efficiently as possible. Orders are
        typically processed within 1-3 business days, with shipping times varying based on your location and selected
        delivery method. Once your order has shipped, you will receive a confirmation email with tracking information.
        Please note that delivery estimates may be affected by holidays, high-volume periods, or unforeseen carrier
        delays. For additional details regarding shipping rates, international orders, or expedited options, please
        contact our customer support team.
      </p>
    </div>
  );
}
