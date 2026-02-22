import { Trash2Icon } from 'lucide-react';
import styles from './RemoveLineButton.module.css';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { removeLinesFromCart } from '../../services/mock-shop';
import { toast } from 'sonner';
import { useCartId } from '../../hooks/useCartId';
import { cartQuery } from '../CartLines/CartLines';

export function RemoveLineButton({ lineId }: { lineId: string }) {
  const queryClient = useQueryClient();
  const [cartId] = useCartId();

  const removeLinesFromCartMutation = useMutation({
    mutationFn: removeLinesFromCart,
    onSuccess: (cart, variables) => {
      queryClient.setQueryData(cartQuery(variables.cartId).queryKey, cart);
    },
  });

  const removeLine = () => {
    if (!cartId) {
      toast.error('Error: can not find cartId');
      return;
    }

    removeLinesFromCartMutation.mutate(
      {
        cartId,
        lineId,
      },
      {
        onError: () => {
          toast.error('Something went wrong');
        },
      },
    );
  };

  return (
    <button onClick={removeLine} className={styles.remove_line_btn} type="button" title="Remove item">
      <Trash2Icon size={20} />
      <span className="sr-only">Remove item</span>
    </button>
  );
}
