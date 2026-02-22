import styles from './SearchPage.module.css';
import { useQuery } from '@tanstack/react-query';
import { getSearchProducts } from '../../services/mock-shop';
import { ProductCard } from '../ProductCard/ProductCard';
import { useSearchParams } from 'wouter';

export function SearchPage() {
  const [searchParams] = useSearchParams();
  const searchValue = searchParams.get('q');

  const {
    data: products,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ['search-products', searchValue],
    queryFn: () => getSearchProducts(searchValue ?? ''),
  });

  if (isLoading) {
    return (
      <div>
        <h1>Loading...</h1>
      </div>
    );
  }

  if (isError || !products) {
    return <h1>Something went wrong</h1>;
  }

  return (
    <div className={styles.main_box}>
      <div>
        <h2 className={styles.title}>Results</h2>
        <p className={styles.info_text}>
          {products.edges.length} items for <span className={styles.search_value}>"{searchValue}"</span>
        </p>
      </div>
      {products.edges.length > 0 && (
        <ul className={styles.products_container}>
          {products.edges.map((edge) => {
            return (
              <li key={edge.node.id}>
                <ProductCard product={edge.node} />
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
