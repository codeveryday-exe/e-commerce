import { queryOptions, skipToken, useQuery } from '@tanstack/react-query';
import { QuantityStepper } from '../QuantityStepper/QuantityStepper';
import { RemoveLineButton } from '../RemoveLineButton/RemoveLineButton';
import styles from './CartLines.module.css';
import { getCart } from '../../services/mock-shop';
import { useCartId } from '../../hooks/useCartId';
import { Link } from 'wouter';
import { Equal } from 'lucide-react';

export const cartQuery = (id: string | null) =>
  queryOptions({
    queryKey: ['cart', id],
    queryFn: id ? () => getCart(id) : skipToken,
  });

export function CartLines({ isReadOnly = false, closeCart }: { isReadOnly?: boolean; closeCart?: () => void }) {
  const [cartId] = useCartId();
  const { data: cart, isLoading } = useQuery(cartQuery(cartId));

  const hasItems = !!cart && cart.lines.edges.length > 0;

  if (isLoading) {
    return (
      <div>
        <h1>Loading...</h1>
      </div>
    );
  }

  return (
    <>
      {!hasItems && (
        <div className={styles.empty_cart_box}>
          <p>Your cart is empty</p>
        </div>
      )}
      {hasItems && (
        <>
          <div className={styles.lines_box}>
            {cart.lines.edges.map((line) => {
              // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
              const productId = line.node.merchandise.product.id.split('/').at(-1)!;

              return (
                <div className={styles.line_box} key={line.node.id}>
                  <div className={styles.line_image_box}>
                    <img src={line.node.merchandise.image?.url} alt={line.node.merchandise.image?.altText ?? ''} />
                  </div>
                  <div className={styles.line_details_box}>
                    <div className={styles.title_box}>
                      <Link onClick={closeCart} href={`/product/${productId}`}>
                        {line.node.merchandise.product.title.toUpperCase()}
                      </Link>
                    </div>
                    <div className={styles.variant_box}>
                      <p>Variant</p>
                      <Equal size={14} strokeWidth={1.5} />
                      <p>{line.node.merchandise.title}</p>
                    </div>
                    <div className={styles.quantity_box}>
                      <p>Quantity</p>
                      <Equal size={14} strokeWidth={1.5} />
                      <p>{line.node.quantity}</p>
                    </div>
                    <div className={styles.line_price_box}>
                      <p>Price</p>
                      <Equal size={14} strokeWidth={1.5} />
                      <p>
                        {line.node.cost.totalAmount.amount} {line.node.cost.totalAmount.currencyCode}
                      </p>
                    </div>
                    {!isReadOnly && (
                      <div className={styles.remove_line_box}>
                        <RemoveLineButton lineId={line.node.id} />
                        <QuantityStepper lineId={line.node.id} initialQuantity={line.node.quantity} />
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
          <div className={styles.total_price_box}>
            <p>TOTAL</p>
            <p className={styles.total_price_text}>
              {cart.cost.totalAmount.amount} {cart.cost.totalAmount.currencyCode}
            </p>
          </div>
        </>
      )}
    </>
  );
}
