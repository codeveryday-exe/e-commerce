import { useQuery } from '@tanstack/react-query';
import styles from './HomePage.module.css';
import ProductCard from '../ProductCard/ProductCard';
import { fetchProducts } from '../../services/mock-shop';

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
    <ul className={styles.products_container}>
      {products.map((product) => (
        <li key={product.id}>
          <ProductCard product={product} />
        </li>
      ))}
    </ul>
  );
}
