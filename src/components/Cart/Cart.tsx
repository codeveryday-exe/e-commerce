import { queryOptions, skipToken, useQuery } from '@tanstack/react-query';
import { QuantityStepper } from '../QuantityStepper/QuantityStepper';
import { RemoveLineButton } from '../RemoveLineButton/RemoveLineButton';
import styles from './Cart.module.css';
import { getCart } from '../../services/mock-shop';
import { useCartId } from '../../hooks/useCartId';
import { Link, useLocation } from 'wouter';
import { usePanel } from '../Panel/Panel';
import { SubmitButton } from '../SubmitButton/SubmitButton';

export const cartQuery = (id: string | null) =>
  queryOptions({
    queryKey: ['cart', id],
    queryFn: id ? () => getCart(id) : skipToken,
  });

export function Cart({ isReadOnly = false }: { isReadOnly?: boolean }) {
  const [cartId] = useCartId();
  const { data: cart, isLoading } = useQuery(cartQuery(cartId));
  const [location] = useLocation();
  const { closePanel } = usePanel();

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
          <SubmitButton onClick={closePanel}>Continue Shopping</SubmitButton>
        </div>
      )}
      {hasItems && (
        <>
          <div className={styles.lines_box}>
            <h2 className={styles.cart_title}>Cart</h2>
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
                      <Link href={`/product/${productId}`}>{line.node.merchandise.product.title.toUpperCase()}</Link>
                    </div>
                    <div className={styles.text_info_box}>
                      <div className={styles.variant_box}>
                        <p>Variant: </p>
                        <p>{line.node.merchandise.title}</p>
                      </div>
                      <div className={styles.line_price_box}>
                        <p>Price: </p>
                        <p>
                          {line.node.cost.totalAmount.amount} {line.node.cost.totalAmount.currencyCode}
                        </p>
                      </div>
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

          {location !== '/checkout' && (
            <div className={styles.checkout_btn_box}>
              <Link className={styles.link} href="/checkout">
                CHECKOUT
              </Link>
            </div>
          )}
        </>
      )}
    </>
  );
}
