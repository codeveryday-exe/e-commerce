import { useQuery } from '@tanstack/react-query';
import styles from './HomePage.module.css';
import { ProductCard } from '../ProductCard/ProductCard';
import { fetchProducts } from '../../services/mock-shop';
import { CornerDownLeft, Heart, Sparkle, Truck } from 'lucide-react';

export function HomePage() {
  const {
    data: products,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ['product-list', 'product'],
    queryFn: () => fetchProducts(),
  });

  if (isLoading) {
    return (
      <div>
        <h1>Loading...</h1>
      </div>
    );
  }

  if (isError || !products) {
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
