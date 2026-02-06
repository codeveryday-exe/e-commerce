import { skipToken, useQuery } from '@tanstack/react-query';
import { getCart } from '../../services/mock-shop';
import { useCartId } from '../../hooks/useCartId';
import SubmitButton from '../SubmitButton/SubmitButton';
import styles from './Cart.module.css';

interface Props {
  setIsCartOpen?: () => void;
}

export default function Cart({ setIsCartOpen }: Props) {
  const [cartId] = useCartId();

  const {
    data: cart,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ['cart', cartId],
    queryFn: cartId ? () => getCart(cartId) : skipToken,
  });

  if (isLoading) {
    return (
      <div>
        <h1>Loading...</h1>
      </div>
    );
  }

  if (isError || !cart) {
    return (
      <div>
        <h1>Product Not Found</h1>
      </div>
    );
  }

  return (
    <div className={styles.cart_box}>
      <button onClick={setIsCartOpen} className={styles.close_btn} type="button">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="size-6"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
        </svg>
      </button>
      <h2 className={styles.cart_title}>Cart</h2>
      <div>
        {/* Product cards, example here */}
        <img src="" alt="" />
        <div>
          <h3>Title</h3>
          {cart.lines.edges.map((line) => {
            return <div key={line.node.id}>{line.node.merchandise.title}</div>;
          })}
          <div>
            <p>Size</p>
            <p>{/* Size value here */}</p>
          </div>
          <div>
            <p>Color</p>
            <p>{/* Color value here */}</p>
          </div>
          <div>
            <p>Quantity</p>
            <p>{/* Quantity value here */}</p>
          </div>
          <div>
            <p>Total (price)</p>
            <p>{/* Product price here */}</p>
          </div>
        </div>
        <div className={styles.total_price_box}>
          <p>TOTAL</p>
          <p>{/* all total price here */}00.0 CAD</p>
        </div>
        <SubmitButton type="button">CHECKOUT</SubmitButton>
      </div>
    </div>
  );
}
