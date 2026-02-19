import clsx from 'clsx';
import { MinusIcon, PlusIcon } from 'lucide-react';
import styles from './QuantityStepper.module.css';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { editLinesFromCart } from '../../services/mock-shop';
import { cartQuery } from '../Cart/Cart';
import { useCartId } from '../../hooks/useCartId';
import { useCallback, useState } from 'react';
import { toast } from 'sonner';
import { useDebounceCallback } from 'usehooks-ts';

interface Props {
  lineId: string;
  initialQuantity: number;
}

export function QuantityStepper({ lineId, initialQuantity }: Props) {
  const [quantity, setQuantity] = useState(initialQuantity);
  const [cartId] = useCartId();
  const queryClient = useQueryClient();

  const editLinesFromCartMutation = useMutation({
    mutationFn: editLinesFromCart,
    onSuccess: (cart, variables) => {
      queryClient.setQueryData(cartQuery(variables.cartId).queryKey, cart);
    },
  });

  const mutateLines = editLinesFromCartMutation.mutate;
  const onCountChanged = useCallback(
    (newQuantity: number) => {
      if (!cartId) {
        toast.error('Error: can not find cartId');
        return;
      }

      mutateLines(
        { cartId, line: { id: lineId, quantity: newQuantity } },
        {
          onError: () => {
            toast.error('Something went wrong');
          },
        },
      );
    },
    [cartId, mutateLines, lineId],
  );

  const debouncedOnCountChanged = useDebounceCallback(onCountChanged, 1000);

  return (
    <div className={clsx(styles.quantity_btn_box)}>
      <button
        title="Decrease"
        onClick={() => {
          setQuantity(quantity - 1);
          debouncedOnCountChanged(quantity - 1);
        }}
        type="button"
        disabled={quantity === 1}
      >
        <MinusIcon size={16} />
        <span className="sr-only">Decrease</span>
      </button>
      <p>{quantity}</p>
      <button
        title="Increase"
        onClick={() => {
          setQuantity(quantity + 1);
          debouncedOnCountChanged(quantity + 1);
        }}
        type="button"
      >
        <PlusIcon size={16} />
        <span className="sr-only">Increase</span>
      </button>
    </div>
  );
}
