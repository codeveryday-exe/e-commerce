import { useQuery } from '@tanstack/react-query';
import styles from './HomePage.module.css';
import { ProductCard } from '../ProductCard/ProductCard';
import { fetchProducts } from '../../services/mock-shop';
import { CornerDownLeft, Heart, Sparkle, Truck } from 'lucide-react';
import { PlaceholderCard } from '../PlaceholderCard/PlaceholderCard';
import { PlaceholderLine } from '../PlaceholderLine/PlaceholderLine';

export function HomePage() {
  const {
    data: products,
    isPending,
    isError,
  } = useQuery({
    queryKey: ['product-list', 'product'],
    queryFn: () => fetchProducts(),
  });

  if (isPending) {
    return (
      <div className={styles.main_box}>
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

        <ul className={styles.products_container}>
          {Array.from({ length: 20 }, (_, i) => {
            return (
              <li key={i}>
                <PlaceholderCard width={'100%'} height={'100%'}>
                  <PlaceholderLine width={333} aspectRatio={1} borderRadius={'16px 16px 0 0'} />
                  <div style={{ padding: '8px 16px' }}>
                    <PlaceholderLine width={246} height={18} />
                    <PlaceholderLine width={140} height={14} />
                  </div>
                </PlaceholderCard>
              </li>
            );
          })}
        </ul>
      </div>
    );
  }

  if (isError) {
    return (
      <div>
        <h1>Products Not Found</h1>
      </div>
    );
  }

  return (
    <div className={styles.main_box}>
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
      <ul className={styles.products_container}>
        {products.map((product) => (
          <li key={product.id}>
            <ProductCard product={product} />
          </li>
        ))}
      </ul>
    </div>
  );
}
