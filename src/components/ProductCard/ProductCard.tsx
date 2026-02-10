import { Link } from 'wouter';
import { z } from 'zod';
import styles from './ProductCard.module.css';
import type { ProductNodeSchema } from '../../schemas/shop';

interface Props {
  product: z.infer<typeof ProductNodeSchema>;
}

export function ProductCard({ product }: Props) {
  const firstVariantPrice = product.selectedOrFirstAvailableVariant?.price ?? {
    amount: '?',
    currencyCode: '?',
  };
  const productId = product.id.slice(product.id.lastIndexOf('/') + 1);

  return (
    <div className={styles.product_card_box}>
      {product.featuredImage && (
        <img
          className={styles.product_card_image}
          src={product.featuredImage.url}
          alt={product.featuredImage.altText ?? ''}
        />
      )}
      <div className={styles.product_card_text_info}>
        <Link href={`/product/${productId}`} className={styles.title}>
          {product.title.toUpperCase()}
        </Link>
        <div className={styles.price}>
          {firstVariantPrice.amount} {firstVariantPrice.currencyCode}
        </div>
      </div>
    </div>
  );
}
