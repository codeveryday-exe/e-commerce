import styles from './SearchPage.module.css';
import { useQuery } from '@tanstack/react-query';
import { getSearchProducts } from '../../services/mock-shop';
import { ProductCard } from '../ProductCard/ProductCard';

export function SearchPage() {
  const searchParams = new URLSearchParams(window.location.search);
  const searchValue = searchParams.get('searchValue');

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

  if (isError) {
    return <h1>Query Error</h1>;
  }

  if (!products) {
    return <h1>Products Not Found</h1>;
  }

  console.log('products: ', products);

  return (
    <div className={styles.main_box}>
      <div>
        <h2 className={styles.title}>Results</h2>
        <p className={styles.info_text}>
          {products.edges.length} items for <span className={styles.search_value}>"{searchValue}"</span>
        </p>
      </div>
      <ul className={styles.products_container}>
        {products.edges.length > 0 &&
          products.edges.map((edge) => {
            return (
              <li key={edge.node.id}>
                <ProductCard product={edge.node} />
              </li>
            );
          })}
      </ul>
    </div>
  );
}
