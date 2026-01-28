import { useQuery } from '@tanstack/react-query';
import { useParams, useSearchParams } from 'wouter';
import styles from './ProductPage.module.css';
import { fetchProduct } from '../services/mock-shop';
import { useState } from 'react';
import clsx from 'clsx';

export default function ProductPage() {
  const [searchParams, setSearchParams] = useSearchParams();

  const [quantity, setQuantity] = useState(1);

  const { productId } = useParams<{ productId: string }>();

  const {
    data: product,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ['product', productId],
    queryFn: () => fetchProduct(productId),
  });

  if (isLoading) {
    return (
      <div>
        <h1>Loading...</h1>
      </div>
    );
  }

  if (isError || !product) {
    return (
      <div>
        <h1>Products Not Found</h1>
      </div>
    );
  }

  const sizeOptions = product.options.find((option) => option.name === 'Size');
  const colorOptions = product.options.find((option) => option.name === 'Color');

  const selectedSize = searchParams.get('size') ?? sizeOptions?.optionValues[0].id;
  const selectedColor = searchParams.get('color') ?? colorOptions?.optionValues[0].id;

  return (
    <div className={styles.product_details_box}>
      {product.featuredImage && (
        <div className={styles.image_box}>
          <img className={styles.image} src={product.featuredImage.url} alt={product.title} />
        </div>
      )}
      <div className={styles.text_info_box}>
        <h1 className={styles.title}>{product.title.toUpperCase()}</h1>
        {sizeOptions && (
          <div>
            <h2 className={styles.size_title}>SIZES: </h2>
            <ul className={styles.size_box}>
              {sizeOptions.optionValues.map((optionValue) => {
                return (
                  <li
                    className={clsx(styles.size_item, {
                      [styles.selected]: selectedSize === optionValue.id,
                    })}
                    key={optionValue.id}
                  >
                    <button
                      type="button"
                      onClick={() => {
                        setSearchParams(
                          (prev) => {
                            prev.set('size', optionValue.id);
                            return prev;
                          },
                          { replace: true },
                        );
                      }}
                    >
                      {optionValue.name.toUpperCase()}
                    </button>
                  </li>
                );
              })}
            </ul>
          </div>
        )}
        {colorOptions && (
          <div>
            <h2 className={styles.color_title}>COLORS: </h2>
            <ul className={styles.color_box}>
              {colorOptions.optionValues.map((optionValue) => {
                return (
                  <li
                    className={clsx(styles.color_item, {
                      [styles.selected]: selectedColor === optionValue.id,
                    })}
                    key={optionValue.id}
                  >
                    <button
                      title={optionValue.name}
                      style={
                        optionValue.swatch?.color
                          ? {
                              backgroundColor: optionValue.swatch.color,
                            }
                          : {}
                      }
                      onClick={() => {
                        setSearchParams(
                          (prev) => {
                            prev.set('color', optionValue.id);
                            return prev;
                          },
                          { replace: true },
                        );
                      }}
                      type="button"
                    >
                      <span className="sr-only">{optionValue.name}</span>
                    </button>
                  </li>
                );
              })}
            </ul>
          </div>
        )}
        <div className={styles.quantity_box}>
          <h2>QUANTITY: </h2>
          <div className={styles.quantity_btn_box}>
            <button
              onClick={() => {
                setQuantity((prev) => prev - 1);
              }}
              type="button"
              disabled={quantity === 1}
            >
              ‒
            </button>
            <p>{quantity}</p>
            <button
              onClick={() => {
                setQuantity((prev) => prev + 1);
              }}
              type="button"
            >
              +
            </button>
          </div>
        </div>
        <button className={styles.cart_btn} type="button">
          ADD TO CART
        </button>
        <p className={styles.description}>{product.description}</p>
      </div>
    </div>
  );
}
