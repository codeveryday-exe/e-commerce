import { queryOptions, skipToken, useQuery } from '@tanstack/react-query';
import { getCart } from '../../services/mock-shop';
import { useCartId } from '../../hooks/useCartId';
import { SubmitButton } from '../SubmitButton/SubmitButton';
import styles from './Cart.module.css';
import { RemoveLineButton } from '../RemoveLineButton/RemoveLineButton';
import { useCartPanel } from '../../contexts/CartPanelContext';
import { X } from 'lucide-react';

export const cartQuery = (id: string | null) =>
  queryOptions({
    queryKey: ['cart', id],
    queryFn: id ? () => getCart(id) : skipToken,
  });

export function Cart() {
  const [cartId] = useCartId();
  const { data: cart, isLoading } = useQuery(cartQuery(cartId));
  const { setIsCartOpen } = useCartPanel();

  const closeCart = () => {
    setIsCartOpen(false);
  };

  if (isLoading) {
    return (
      <div>
        <h1>Loading...</h1>
      </div>
    );
  }

  return (
    <>
      <div aria-hidden onClick={closeCart} className={styles.backdrop_box} />
      <div className={styles.cart_box}>
        <button onClick={closeCart} className={styles.close_btn} type="button">
          <X size={28} />
        </button>
        <h2 className={styles.cart_title}>Cart</h2>
        {!cart && (
          <div className={styles.empty_cart_box}>
            <p>Your cart is empty</p>
          </div>
        )}
        {cart && (
          <>
            <div className={styles.lines_box}>
              {cart.lines.edges.map((line) => {
                return (
                  <div className={styles.line_box} key={line.node.id}>
                    <div className={styles.line_image_box}>
                      <img src={line.node.merchandise.image?.url} alt={line.node.merchandise.image?.altText ?? ''} />
                    </div>
                    <div className={styles.line_details_box}>
                      <div className={styles.variant_box}>
                        <p>Variant</p>
                        <p>{line.node.merchandise.title}</p>
                      </div>
                      <div className={styles.quantity_box}>
                        <p>Quantity</p>
                        <p>{line.node.quantity}</p>
                      </div>
                      <div className={styles.line_price_box}>
                        <p>Price</p>
                        <p>
                          {line.node.cost.totalAmount.amount} {line.node.cost.totalAmount.currencyCode}
                        </p>
                      </div>
                      <div className={styles.remove_line_box}>
                        <RemoveLineButton lineId={line.node.id} />
                      </div>
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
            <div className={styles.checkout_btn_box}>
              <SubmitButton className={styles.checkout_btn} type="button">
                CHECKOUT
              </SubmitButton>
            </div>
          </>
        )}
      </div>
    </>
  );
}
