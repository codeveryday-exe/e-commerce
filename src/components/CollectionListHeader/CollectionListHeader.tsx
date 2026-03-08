import { Link } from 'wouter';
import styles from './CollectionListHeader.module.css';
import { useQuery } from '@tanstack/react-query';
import { getCollections } from '../../services/mock-shop';
import { ScrollLock } from '../ScrollLock/ScrollLock';
import { WatchPathname } from '../WatchPathname/WatchPathname';
import { Transition } from 'react-transition-group';
import { useRef } from 'react';

const DURATION_MS = 100;

export function CollectionListHeader({ isOpen, closeCollections }: { isOpen: boolean; closeCollections: () => void }) {
  const ref = useRef<HTMLUListElement>(null);
  const { data: collections } = useQuery({
    queryKey: ['collection-list', 'collection'],
    queryFn: () => getCollections(),
  });

  if (!collections) {
    return null;
  }

  return (
    <>
      <Transition mountOnEnter unmountOnExit nodeRef={ref} in={isOpen} timeout={DURATION_MS}>
        {(state) => (
          <>
            {state !== 'unmounted' && state !== 'exited' && (
              <>
                <ScrollLock />
              </>
            )}

            <ul
              style={
                {
                  '--animation-duration': `${DURATION_MS}ms`,
                } as React.CSSProperties
              }
              data-transition-state={state}
              ref={ref}
              className={styles.collection_box}
            >
              {collections.edges.map((edge) => {
                const collectionId = edge.node.id.split('/').at(-1) ?? '';
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

            <WatchPathname onPathChange={closeCollections} />
          </>
        )}
      </Transition>
    </>
  );
}
