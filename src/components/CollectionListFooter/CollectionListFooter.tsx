import { useQuery } from '@tanstack/react-query';
import styles from './CollectionListFooter.module.css';
import { getCollections } from '../../services/mock-shop';
import { Link } from 'wouter';

export function CollectionListFooter() {
  const {
    data: collections,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ['collection-list', 'collection'],
    queryFn: () => getCollections(),
  });

  if (isLoading) {
    return (
      <div>
        <h1>Loading...</h1>
      </div>
    );
  }

  if (isError || !collections) {
    return (
      <div>
        <h1>Collections Not Found</h1>
      </div>
    );
  }

  return (
    <ul className={styles.collection_box}>
      {collections.edges.map((edge) => {
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        const collectionId = edge.node.id.split('/').at(-1)!;
        return (
          <li key={edge.node.id}>
            <Link href={`/collection/${collectionId}`}>{edge.node.title}</Link>
          </li>
        );
      })}
    </ul>
  );
}
