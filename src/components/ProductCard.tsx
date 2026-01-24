import { Link } from 'wouter';
import type { ListProduct } from '../types/mockShop';
import styles from './ProductCard.module.css';

interface Props {
  product: ListProduct;
}

export default function ProductCard({ product }: Props) {
  const firstVariantPrice = product.variants.edges[0].node.price;

  return (
    <div className={styles.product_card_box}>
      <img className={styles.product_card_image} src={product.featuredImage.url} alt={product.title}></img>
      <Link
        href={`/product/${product.id.slice(product.id.lastIndexOf('/') + 1)}`}
        className={styles.product_card_title}
      >
        {product.title}
      </Link>
      <div>
        {firstVariantPrice.currencyCode} {firstVariantPrice.amount}
      </div>
    </div>
  );
}
