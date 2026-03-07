import { keepPreviousData, useQuery } from '@tanstack/react-query';
import styles from './CollectionPage.module.css';
import { getCollectionProducts } from '../../services/mock-shop';
import { useParams } from 'wouter';
import { ProductCard } from '../ProductCard/ProductCard';
import { useState } from 'react';
import { useDebounceValue } from 'usehooks-ts';
import { ListFilter } from 'lucide-react';
import { PlaceholderCard } from '../PlaceholderCard/PlaceholderCard';
import { PlaceholderLine } from '../PlaceholderLine/PlaceholderLine';
import { Spinner } from '../Spinner/Spinner';
import { PlaceholderImage } from '../PlaceholderImage/PlaceholderImage';
import { Panel } from '../Panel/Panel';

const PRICE_DEBOUNCE_MS = 1000;

export function CollectionPage() {
  const { collectionId } = useParams<{ collectionId: string }>();
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [availableOnly, setAvailableOnly] = useState(false);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [minPriceValue, setMinPriceValue] = useState(0);
  const [maxPriceValue, setMaxPriceValue] = useState(1000000);
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
      <div className={styles.main_box}>
        <div>
          <PlaceholderLine width={420} height={78} borderRadius="48px" />
        </div>

        <PlaceholderCard width={'100%'} height={136} padding="48px 36px">
          <PlaceholderLine width={'100%'} height={22} />
          <PlaceholderLine width={'40%'} height={22} />
        </PlaceholderCard>

        <button className={styles.filters_button} disabled>
          <ListFilter size={16} strokeWidth={1.75} />
          <span>Filters</span>
        </button>

        <ul className={styles.products_container}>
          {Array.from({ length: 20 }, (_, i) => {
            return (
              <li key={i}>
                <PlaceholderCard width={'100%'} height={'100%'}>
                  <PlaceholderImage width={'100%'} aspectRatio={1} variant="brown" borderRadius={'16px 16px 0 0'} />
                  <div style={{ padding: '8px 16px' }}>
                    <PlaceholderLine width={246} height={18} />
                    <PlaceholderLine width={140} height={14} />
                  </div>
                </PlaceholderCard>
              </li>
            );
          })}
        </ul>
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

      {collection.description !== '' && (
        <div className={styles.description_box}>
          <p className={styles.collection_description}>{collection.description}</p>
        </div>
      )}

      <Panel
        isOpen={isFilterOpen}
        position="left"
        closePanel={() => {
          setIsFilterOpen(false);
        }}
      >
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
                setMinPriceValue(parseInt(e.target.value));
                setMinPrice(parseInt(e.target.value));
              }}
              value={minPriceValue}
              type="number"
            />
          </label>

          <label className={styles.input_box}>
            <span className={styles.input_text}>Maximum: </span>
            <input
              className={styles.input}
              onChange={(e) => {
                setMaxPriceValue(parseInt(e.target.value));
                setMaxPrice(parseInt(e.target.value));
              }}
              value={maxPriceValue}
              type="number"
            />
          </label>
        </div>
        <div className={styles.filter_btn_box}>
          <button
            onClick={() => {
              setAvailableOnly(false);
              setSelectedTags([]);
              setMinPriceValue(0);
              setMaxPriceValue(1000000);
              setMinPrice(0);
              setMaxPrice(1000000);
            }}
            className={styles.price_reset_btn}
            type="button"
          >
            Reset all
          </button>
          <button
            onClick={() => {
              setIsFilterOpen(false);
            }}
            className={styles.price_view_btn}
            type="button"
          >
            View
          </button>
        </div>
      </Panel>

      <button
        className={styles.filters_button}
        onClick={() => {
          setIsFilterOpen((prev) => !prev);
        }}
      >
        <ListFilter size={16} strokeWidth={1.75} />
        <span>Filters</span>
      </button>

      {isPlaceholderData && <Spinner text="Filtering..." />}

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
