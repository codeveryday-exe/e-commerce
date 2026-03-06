import { Link } from 'wouter';
import styles from './CollectionListHeader.module.css';
import { useQuery } from '@tanstack/react-query';
import { getCollections } from '../../services/mock-shop';
import { ScrollLock } from '../ScrollLock/ScrollLock';

export function CollectionListHeader() {
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
    <>
      <ScrollLock />
      <ul className={styles.collection_box}>
        {collections.edges.map((edge) => {
          // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
          const collectionId = edge.node.id.split('/').at(-1)!;
          return (
            <li className={styles.collection_list} key={edge.node.id}>
              <div className={styles.image_box}>
                <img className={styles.collection_image} src={edge.node.image?.url} alt={edge.node.title} />
              </div>
              <div className={styles.description_box}>
                <Link className={styles.collection_title} href={`/collection/${collectionId}`}>
                  {edge.node.title.toUpperCase()}
                </Link>
                <p className={styles.description}>
                  {edge.node.description === ''
                    ? `Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quisquam, accusantium enim
                     ipsam ratione deserunt sed ipsa vero deleniti eos! Rerum, ullam! A possimus consectetur consequuntur.`
                    : edge.node.description}
                </p>
              </div>
            </li>
          );
        })}
      </ul>
    </>
  );
}
