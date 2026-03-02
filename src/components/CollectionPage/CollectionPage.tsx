import { keepPreviousData, useQuery } from '@tanstack/react-query';
import styles from './CollectionPage.module.css';
import { getCollectionProducts } from '../../services/mock-shop';
import { useParams } from 'wouter';
import { ProductCard } from '../ProductCard/ProductCard';
import { useState } from 'react';
import { useDebounceValue } from 'usehooks-ts';
import { ListFilter } from 'lucide-react';
import { ClosePanelButton } from '../ClosePanelButton/ClosePanelButton';
import { Backdrop } from '../Backdrop/Backdrop';
import { ScrollLock } from '../ScrollLock/ScrollLock';

const PRICE_DEBOUNCE_MS = 1000;

export function CollectionPage() {
  const { collectionId } = useParams<{ collectionId: string }>();
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [availableOnly, setAvailableOnly] = useState(false);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [minPrice, setMinPrice] = useDebounceValue(0, PRICE_DEBOUNCE_MS);
  const [maxPrice, setMaxPrice] = useDebounceValue(1000000, PRICE_DEBOUNCE_MS);

  const filters = [
    {
      available: availableOnly || undefined,
      price: { min: minPrice, max: maxPrice },
    },
    ...selectedTags.map((tag) => ({ tag })),
  ];

  const {
    data: collection,
    isPlaceholderData,
    isPending,
    isError,
  } = useQuery({
    queryKey: ['collection', collectionId, filters],
    placeholderData: keepPreviousData,
    queryFn: () => getCollectionProducts(`gid://shopify/Collection/${collectionId}`, filters),
  });

  if (isPending) {
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

  const tagFilters = collection.products.filters.find((filter) => filter.id === 'filter.p.tag')?.values ?? [];

  console.log('filters', collection.products.filters);
  console.log('tagFilters: ', selectedTags);
  console.log(`min: ${minPrice.toString()}, max: ${maxPrice.toString()}`);

  return (
    <div className={styles.main_box}>
      <h2 className={styles.collection_title}>{collection.title.toUpperCase()}</h2>

      <div className={styles.description_box}>
        <p className={styles.collection_description}>{collection.description}</p>
      </div>

      {isFilterOpen && (
        <>
          <div className={styles.filters_box}>
            <ScrollLock />
            <ClosePanelButton
              onClick={() => {
                setIsFilterOpen(false);
              }}
            />
            <div className={styles.availability_box}>
              <h3 className={styles.box_title}>Availability</h3>
              <label className={styles.input_box}>
                <input
                  className={styles.input}
                  onChange={(e) => {
                    setAvailableOnly(e.target.checked);
                  }}
                  checked={availableOnly}
                  type="checkbox"
                />
                <span className={styles.input_text}>Available only</span>
              </label>
            </div>

            {tagFilters.length > 0 && (
              <fieldset className={styles.tags_box}>
                <legend className={styles.box_title}>Categories</legend>

                {tagFilters.map((value) => {
                  return (
                    <label className={styles.tag_box} key={value.label}>
                      <input
                        className={styles.input}
                        name="tag"
                        onChange={(e) => {
                          if (e.target.checked) {
                            setSelectedTags((prev) => [...prev, value.label]);
                          } else {
                            setSelectedTags((prev) => prev.filter((item) => item !== value.label));
                          }
                        }}
                        checked={selectedTags.includes(value.label)}
                        type="checkbox"
                      />
                      <span className={styles.input_text}>
                        {value.label[0].toUpperCase() + value.label.slice(1)} ({value.count})
                      </span>
                    </label>
                  );
                })}
              </fieldset>
            )}

            <div className={styles.price_range_box}>
              <h3 className={styles.box_title}>Price Range</h3>
              <label className={styles.input_box}>
                <span className={styles.input_text}>Minimum: </span>
                <input
                  className={styles.input}
                  onChange={(e) => {
                    setMinPrice(parseInt(e.target.value));
                  }}
                  defaultValue={minPrice}
                  type="number"
                />
              </label>

              <label className={styles.input_box}>
                <span className={styles.input_text}>Maximum: </span>
                <input
                  className={styles.input}
                  onChange={(e) => {
                    setMaxPrice(parseInt(e.target.value));
                  }}
                  defaultValue={maxPrice}
                  type="number"
                />
              </label>

              <button
                onClick={() => {
                  setMinPrice(0);
                  setMaxPrice(1000000);
                }}
                className={styles.price_reset_btn}
                type="button"
              >
                Reset
              </button>
            </div>
          </div>
          <Backdrop
            onClick={() => {
              setIsFilterOpen(false);
            }}
          />
        </>
      )}

      <button
        className={styles.filters_button}
        onClick={() => {
          setIsFilterOpen((prev) => !prev);
        }}
      >
        <ListFilter size={16} strokeWidth={1.75} />
        <span>Filters</span>
      </button>

      {isPlaceholderData && <p>Filtering...</p>}

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
