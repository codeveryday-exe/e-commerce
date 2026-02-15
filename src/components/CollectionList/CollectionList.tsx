import { Link } from 'wouter';
import styles from './CollectionList.module.css';
import { useQuery } from '@tanstack/react-query';
import { getCollections } from '../../services/mock-shop';

export function CollectionList() {
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
          // <div key={edge.cursor}>
          //   <p>cursor: {edge.cursor}</p>
          //   <p>description: {edge.node.description}</p>
          //   <p>handle: {edge.node.handle}</p>
          //   <p>id: {edge.node.id}</p>
          //   <img src={edge.node.image?.url} alt={edge.node.title} />
          //   <p>image id: {edge.node.image?.id}</p>
          //   <p>title: {edge.node.title}</p>
          // </div>
          <li key={edge.node.id}>
            <Link href={`/collection/${collectionId}`}>{edge.node.title}</Link>
          </li>
        );
      })}
    </ul>
  );
}
