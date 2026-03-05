/* eslint-disable @typescript-eslint/restrict-template-expressions */
import { useQuery } from '@tanstack/react-query';
import styles from './HomePage.module.css';
import { ProductCard } from '../ProductCard/ProductCard';
import { fetchProducts, getCollections } from '../../services/mock-shop';
import { BadgePercent, CornerDownLeft, Heart, Sparkle, Truck, X } from 'lucide-react';
import { PlaceholderCard } from '../PlaceholderCard/PlaceholderCard';
import { PlaceholderLine } from '../PlaceholderLine/PlaceholderLine';
import { Link } from 'wouter';
import { useState } from 'react';

export function HomePage() {
  const [isNotifierOpen, setIsNotifierOpen] = useState(true);

  return (
    <div className={styles.main_box}>
      {isNotifierOpen && (
        <div className={styles.discount_notifier_box}>
          <button
            onClick={() => {
              setIsNotifierOpen(false);
            }}
            type="button"
            title="Close notifier"
          >
            <X className={styles.discount_close_btn} size={24} />
            <span className="sr-only">Close notifier</span>
          </button>
          <div className={styles.discount_icon_text_box}>
            <BadgePercent size={24} />
            <div className={styles.discount_text_box}>
              <p>
                <b>Enjoy 10% off</b> your first purchase
              </p>
              <p className={styles.discount_sign_text}>Stay in the know about our newest collections.</p>
            </div>
          </div>
          <Link className={styles.discount_notifier_link} href="/login">
            Sign up
          </Link>
        </div>
      )}

      <HomeCollections />

      <section className={styles.trust_section}>
        <div className={styles.trust_container}>
          <div className={styles.trust_item}>
            <Truck size={20} strokeWidth={1.5} />
            <h4>Free Shipping</h4>
            <p>On orders over $100</p>
          </div>

          <div className={styles.trust_item}>
            <CornerDownLeft size={20} strokeWidth={1.5} />
            <h4>Easy Returns</h4>
            <p>30-day guarantee</p>
          </div>

          <div className={styles.trust_item}>
            <Sparkle size={20} strokeWidth={1.5} />
            <h4>Premium Fabrics</h4>
            <p>Quality you can feel</p>
          </div>

          <div className={styles.trust_item}>
            <Heart size={20} strokeWidth={1.5} />
            <h4>Loved Worldwide</h4>
            <p>Thousands of happy clients</p>
          </div>
        </div>
      </section>
      <HomeProducts />
    </div>
  );
}

// make them separated components
function HomeCollections() {
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

function HomeProducts() {
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
