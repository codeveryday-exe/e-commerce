import styles from './HomePage.module.css';
import { BadgePercent, CornerDownLeft, Heart, Sparkle, Truck, X } from 'lucide-react';
import { Link } from 'wouter';
import { useState } from 'react';
import { HomeCollections } from './HomeCollections';
import { HomeProducts } from './HomeProducts';

export function HomePage() {
  const [isNotifierOpen, setIsNotifierOpen] = useState(true);

  return (
    <div className={styles.main_box}>
      {isNotifierOpen && (
        <div className={styles.discount_notifier_box}>
          <button
            onClick={() => {
              setIsNotifierOpen(false);
            }}
            type="button"
            title="Close notifier"
          >
            <X className={styles.discount_close_btn} size={24} />
            <span className="sr-only">Close notifier</span>
          </button>
          <div className={styles.discount_icon_text_box}>
            <BadgePercent size={24} />
            <div className={styles.discount_text_box}>
              <p>
                <b>Enjoy 10% off</b> your first purchase
              </p>
              <p className={styles.discount_sign_text}>Stay in the know about our newest collections.</p>
            </div>
          </div>
          <Link className={styles.discount_notifier_link} href="/login">
            Sign up
          </Link>
        </div>
      )}

      <HomeCollections />

      <section className={styles.trust_section}>
        <div className={styles.trust_container}>
          <div className={styles.trust_item}>
            <Truck size={20} strokeWidth={1.5} />
            <h4>Free Shipping</h4>
            <p>On orders over $100</p>
          </div>

          <div className={styles.trust_item}>
            <CornerDownLeft size={20} strokeWidth={1.5} />
            <h4>Easy Returns</h4>
            <p>30-day guarantee</p>
          </div>

          <div className={styles.trust_item}>
            <Sparkle size={20} strokeWidth={1.5} />
            <h4>Premium Fabrics</h4>
            <p>Quality you can feel</p>
          </div>

          <div className={styles.trust_item}>
            <Heart size={20} strokeWidth={1.5} />
            <h4>Loved Worldwide</h4>
            <p>Thousands of happy clients</p>
          </div>
        </div>
      </section>
      <HomeProducts />
    </div>
  );
}
