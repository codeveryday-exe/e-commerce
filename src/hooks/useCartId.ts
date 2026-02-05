import { useLocalStorage } from 'usehooks-ts';

export function useCartId() {
  return useLocalStorage<string | null>('cartId', null);
}
