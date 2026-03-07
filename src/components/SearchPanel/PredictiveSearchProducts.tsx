import { useQuery } from '@tanstack/react-query';
import { getPredictiveSearch } from '../../services/mock-shop';
import { Link } from 'wouter';
import styles from './PredictiveSearchProducts.module.css';
import { ChevronDown } from 'lucide-react';
import { useState } from 'react';
import { PlaceholderLine } from '../PlaceholderLine/PlaceholderLine';
import clsx from 'clsx';
import { PlaceholderImage } from '../PlaceholderImage/PlaceholderImage';

export function PredictiveSearchResults({ searchValue }: { searchValue: string }) {
  const [isProductsOpen, setIsProductsOpen] = useState(true);
  const [isCollectionsOpen, setIsCollectionsOpen] = useState(true);
  const {
    data: searchResult,
    isPending,
    isError,
  } = useQuery({
    queryKey: ['predictive-search', searchValue],
    queryFn: () => getPredictiveSearch(searchValue),
    enabled: searchValue.length > 0,
  });

  if (searchValue.length === 0) {
    return null;
  }

  if (isPending) {
    return (
      <div className={styles.search_items_box}>
        <div className={styles.products}>
          <PlaceholderLine width={125} height={33} />
          <ul className={styles.products_box}>
            {Array.from({ length: 2 }, (_, i) => {
              return (
                <li className={styles.product_box} key={i}>
                  {/* <PlaceholderCard width={'100%'} height={90}> */}
                  <PlaceholderImage width={90} aspectRatio={1} variant="white" borderRadius="16px" />
                  <div className={styles.product_text_box}>
                    <PlaceholderLine width={267} height={28} />
                    <PlaceholderLine width={106} height={24} />
                  </div>
                  {/* </PlaceholderCard> */}
                </li>
              );
            })}
          </ul>
        </div>

        <>
          <hr className={styles.separator} />
          <div className={styles.collections}>
            <PlaceholderLine width={125} height={33} />
            <ul className={styles.collections_box}>
              {Array.from({ length: 2 }, (_, i) => {
                return (
                  <li className={styles.collection_box} key={i}>
                    <PlaceholderImage width={'100%'} borderRadius="16px" aspectRatio={1} variant="brown" />
                    <PlaceholderLine width={112} height={37} margin="0 auto" />
                  </li>
                );
              })}
            </ul>
          </div>
        </>
      </div>
    );
  }

  if (isError) {
    return (
      <div>
        <p>Products Not Found</p>
      </div>
    );
  }

  return (
    <div className={styles.search_items_box}>
      {searchResult.products.length > 0 && (
        <div className={styles.products}>
          <button
            className={clsx(styles.minimize_btn, { [styles.closed]: !isProductsOpen })}
            onClick={() => {
              setIsProductsOpen((prev) => !prev);
            }}
            type="button"
            title="Minimize products"
          >
            <ChevronDown />
            <span className={styles.main_title}>Products</span>
          </button>
          {isProductsOpen && (
            <ul className={styles.products_box}>
              {searchResult.products.map((product) => {
                return (
                  <li className={styles.product_box} key={product.id}>
                    <img
                      className={styles.product_image}
                      src={product.featuredImage?.url}
                      alt={product.featuredImage?.altText ?? product.title}
                    />
                    <div className={styles.product_text_box}>
                      <Link className={styles.product_title} href={`/product/${product.id.split('/').at(-1) ?? ''}`}>
                        {product.title.toUpperCase()}
                      </Link>
                      <p className={styles.product_price}>
                        from {product.priceRange?.minVariantPrice?.amount}{' '}
                        {product.priceRange?.minVariantPrice?.currencyCode}
                      </p>
                    </div>
                  </li>
                );
              })}
            </ul>
          )}
        </div>
      )}

      {searchResult.collections.length > 0 && (
        <>
          <hr className={styles.separator} />
          <div className={styles.collections}>
            <button
              className={clsx(styles.minimize_btn, { [styles.closed]: !isCollectionsOpen })}
              onClick={() => {
                setIsCollectionsOpen((prev) => !prev);
              }}
              type="button"
              title="Minimize collections"
            >
              <ChevronDown />
              <span className={styles.main_title}>Collections</span>
            </button>
            {isCollectionsOpen && (
              <ul className={styles.collections_box}>
                {searchResult.collections.map((collection) => {
                  return (
                    <li className={styles.collection_box} key={collection.id}>
                      <img
                        className={styles.collection_image}
                        src={collection.image?.url}
                        alt={collection.image?.altText ?? collection.title}
                      />
                      <Link
                        className={styles.collection_title}
                        href={`/collection/${collection.id.split('/').at(-1) ?? ''}`}
                      >
                        {collection.title}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            )}
          </div>
        </>
      )}

      {searchResult.products.length === 0 && searchResult.collections.length === 0 && (
        <div className={styles.not_found_box}>Products/Collections Not Found</div>
      )}
    </div>
  );
}
