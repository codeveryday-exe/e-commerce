import { useQuery } from '@tanstack/react-query';
import styles from './CollectionPage.module.css';
import { fetchProducts, getCollectionProducts } from '../../services/mock-shop';
import { useParams } from 'wouter';
import { ProductCard } from '../ProductCard/ProductCard';
import { ProductFilter } from '../ProductFilter/ProductFilter';
import { useState } from 'react';

export function CollectionPage() {
  const { collectionId } = useParams<{ collectionId: string }>();
  const [filter, setFilter] = useState('');

  const {
    data: collection,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ['collection', collectionId],
    queryFn: () => getCollectionProducts(`gid://shopify/Collection/${collectionId}`),
  });

  const {
    data: filteredProducts,
    isLoading: isFilteredProductsLoading,
    isError: isFilteredProductsError,
  } = useQuery({
    queryKey: ['filtered-products', filter],
    queryFn: () => fetchProducts(filter),
  });

  if (isLoading || isFilteredProductsLoading) {
    return (
      <div>
        <h1>Loading...</h1>
      </div>
    );
  }

  if (isError || !collection) {
    return (
      <div>
        <h1>Collection Not Found</h1>
      </div>
    );
  }

  if (isFilteredProductsError) {
    <div>
      <h1>Filtered Products Not Found</h1>
    </div>;
  }

  const productIds = collection.products.edges.map((edge) => edge.node.id);

  return (
    <div className={styles.main_box}>
      <h2 className={styles.collection_title}>{collection.title.toUpperCase()}</h2>

      <div className={styles.description_box}>
        <p className={styles.collection_description}>{collection.description}</p>
      </div>

      <ProductFilter
        onSubmit={(data) => {
          setFilter(data);
        }}
        onReset={() => {
          setFilter('');
        }}
      />

      <ul className={styles.products_container}>
        {filter === '' &&
          collection.products.edges.map((edge) => {
            console.log('tags: ', edge.node.tags);

            return (
              <li key={edge.node.id}>
                <ProductCard product={edge.node} />
              </li>
            );
          })}

        {filter !== '' && (
          <ul className={styles.products_container}>
            {filteredProducts?.map(
              (product) =>
                productIds.includes(product.id) && (
                  <li key={product.id}>
                    <ProductCard product={product} />
                  </li>
                ),
            )}
          </ul>
        )}
      </ul>
    </div>
  );
}
