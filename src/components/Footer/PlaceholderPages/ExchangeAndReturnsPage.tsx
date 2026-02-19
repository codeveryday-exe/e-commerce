import styles from './PlaceholderPages.module.css';

export function ExchangeAndReturnsPage() {
  return (
    <div className={styles.main_box}>
      <h2 className={styles.title}>Exchange & Returns</h2>
      <p className={styles.info_text}>
        We are committed to ensuring your complete satisfaction with every purchase. If you find that an item does not
        meet your expectations, our Returns & Exchanges process is designed to be straightforward and efficient. Please
        refer to our full policy for detailed information regarding eligibility, timelines, and instructions for
        returning or exchanging items. Our goal is to make the experience as seamless as possible, so you can shop with
        confidence.
      </p>
    </div>
  );
}
