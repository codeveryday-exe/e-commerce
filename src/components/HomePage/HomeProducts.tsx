import { useQuery } from '@tanstack/react-query';
import { fetchProducts } from '../../services/mock-shop';
import { PlaceholderCard } from '../PlaceholderCard/PlaceholderCard';
import { PlaceholderLine } from '../PlaceholderLine/PlaceholderLine';
import { ProductCard } from '../ProductCard/ProductCard';
import styles from './HomeProducts.module.css';

export function HomeProducts() {
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
    <ul className={styles.products_container}>
      {products.map((product) => (
        <li key={product.id}>
          <ProductCard product={product} />
        </li>
      ))}
    </ul>
  );
}
