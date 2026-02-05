import { skipToken, useQuery } from '@tanstack/react-query';
import { getCart } from '../services/mock-shop';
import { useCartId } from '../hooks/useCartId';

export default function Cart() {
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
    <div>
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
    </div>
  );
}
