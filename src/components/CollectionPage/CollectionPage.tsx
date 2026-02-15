import { useQuery } from '@tanstack/react-query';
import styles from './CollectionPage.module.css';
import { getCollectionProducts } from '../../services/mock-shop';
import { useParams } from 'wouter';
import { ProductCard } from '../ProductCard/ProductCard';

export function CollectionPage() {
  const { collectionId } = useParams<{ collectionId: string }>();

  const {
    data: collection,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ['collection', collectionId],
    queryFn: () => getCollectionProducts(collectionId),
  });

  if (isLoading) {
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

  return (
    <div className={styles.main_box}>
      <h2 className={styles.collection_title}>{collection.title.toUpperCase()}</h2>
      <div className={styles.description_box}>
        <p className={styles.collection_description}>{collection.description}</p>
      </div>
      <img className={styles.collection_image} src={collection.image?.url} alt={collection.title} />
      <ul className={styles.products_container}>
        {collection.products.edges.map((edge) => {
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
