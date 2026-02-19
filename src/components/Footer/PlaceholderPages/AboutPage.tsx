import styles from './PlaceholderPages.module.css';

export function AboutPage() {
  return (
    <div className={styles.main_box}>
      <h2 className={styles.title}>About Us</h2>
      <p className={styles.info_text}>
        We are passionate about delivering products and services that make a real difference. Since our founding, we've
        focused on innovation, quality, and building lasting relationships with our customers. Our team is dedicated to
        solving problems, creating value, and providing exceptional support every step of the way. Whether you're
        exploring our offerings or partnering with us, we strive to make every experience meaningful, seamless, and
        reliable.
      </p>
    </div>
  );
}
