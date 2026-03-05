/* eslint-disable @typescript-eslint/restrict-template-expressions */
import { useQuery } from '@tanstack/react-query';
import { getCollections } from '../../services/mock-shop';
import { PlaceholderLine } from '../PlaceholderLine/PlaceholderLine';
import { Link } from 'wouter';
import styles from './HomeCollections.module.css';

export function HomeCollections() {
  const {
    data: collections,
    isPending,
    isError,
  } = useQuery({
    queryKey: ['collection'],
    queryFn: () => getCollections(4),
  });

  if (isPending) {
    return (
      <div className={styles.collections_box}>
        <h2 className={styles.collections_big_title}>Best Collections For You</h2>
        <div className={styles.collections_sub_box}>
          {Array.from({ length: 4 }, (_, i) => {
            return (
              <div key={i}>
                <PlaceholderLine width={350} aspectRatio={1} />
                <PlaceholderLine width={125} height={40} />
              </div>
            );
          })}
        </div>
      </div>
    );
  }

  if (isError) {
    return (
      <div>
        <h1>Collections Not Found</h1>
      </div>
    );
  }

  return (
    <div className={styles.collections_box}>
      <h2 className={styles.collections_big_title}>Best Collections For You</h2>
      <div className={styles.collections_sub_box}>
        {collections.edges.map((edge) => {
          return (
            <div className={styles.collection_box} key={edge.cursor}>
              <img className={styles.collection_image} src={edge.node.image?.url} alt={edge.node.title} />
              <Link className={styles.collection_title} href={`/collection/${edge.node.id.split('/').at(-1)}`}>
                {edge.node.title}
              </Link>
            </div>
          );
        })}
      </div>
    </div>
  );
}
