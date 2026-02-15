import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useParams, useSearchParams } from 'wouter';
import styles from './ProductPage.module.css';
import { addLinesToCart, createCart, fetchProduct } from '../../services/mock-shop';
import { useState } from 'react';
import clsx from 'clsx';
import { ButtonGroup } from '../ButtonGroup/ButtonGroup';
import { MinusIcon, PlusIcon } from 'lucide-react';
import { toast } from 'sonner';
import { SubmitButton } from '../SubmitButton/SubmitButton';
import { useCartId } from '../../hooks/useCartId';
import { cartQuery } from '../Cart/Cart';
import { useCartPanel } from '../../contexts/CartPanelContext';

export function ProductPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [cartId, setCartId] = useCartId();
  const [quantity, setQuantity] = useState(1);
  const { setIsCartOpen } = useCartPanel();
  const queryClient = useQueryClient();

  const createCartMutation = useMutation({
    mutationFn: createCart,
    onSuccess: (cart) => {
      setCartId(cart.id);
      setIsCartOpen(true);
    },
  });

  const addLinesToCartMutation = useMutation({
    mutationFn: addLinesToCart,
    onSuccess: (cart, variables) => {
      queryClient.setQueryData(cartQuery(variables.cartId).queryKey, cart);
      setIsCartOpen(true);
    },
  });

  const { productId } = useParams<{ productId: string }>();

  const {
    data: product,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ['product', productId],
    queryFn: () => fetchProduct(productId),
  });

  if (isLoading) {
    return (
      <div>
        <h1>Loading...</h1>
      </div>
    );
  }

  if (isError || !product) {
    return (
      <div>
        <h1>Product Not Found</h1>
      </div>
    );
  }

  function onSubmit() {
    if (!selectedVariantId) {
      return;
    }

    if (cartId) {
      addLinesToCartMutation.mutate(
        { cartId, line: { merchandiseId: `gid://shopify/ProductVariant/${selectedVariantId}`, quantity } },
        {
          onError: () => {
            toast.error('Something went wrong');
          },
        },
      );
    } else {
      createCartMutation.mutate(
        { variantId: selectedVariantId, quantity },
        {
          onError: () => {
            toast.error('Something went wrong');
          },
        },
      );
    }
  }

  const sizeOptions = product.options.find((option) => option.name === 'Size');
  const colorOptions = product.options.find((option) => option.name === 'Color');

  const selectedVariantId =
    searchParams.get('variant') ?? product.selectedOrFirstAvailableVariant?.id.split('/').at(-1);
  const selectedVariant = product.variants.edges.find(
    (variant) => variant.node.id.split('/').at(-1) === selectedVariantId,
  );
  const selectedSize = selectedVariant?.node.selectedOptions.find((option) => option.name === 'Size')?.value;
  const selectedColor = selectedVariant?.node.selectedOptions.find((option) => option.name === 'Color')?.value;
  const hasNullSwatch = colorOptions?.optionValues.some((optionValue) => optionValue.swatch === null);

  const selectVariant = (color: string | undefined, size: string | undefined) => {
    const newVariant = product.variants.edges.find((variant) => {
      const isRightColor = variant.node.selectedOptions.some(
        (option) => option.name === 'Color' && option.value === color,
      );
      const isRightSize = variant.node.selectedOptions.some(
        (option) => option.name === 'Size' && option.value === size,
      );
      return isRightColor && isRightSize;
    });

    if (!newVariant) {
      toast.error('Error: Variant not found');
      return;
    }

    setSearchParams(
      (prev) => {
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        prev.set('variant', newVariant.node.id.split('/').at(-1)!);
        return prev;
      },
      { replace: true },
    );
  };

  return (
    <div className={styles.product_details_box}>
      {selectedVariant?.node.image && (
        <div className={styles.image_box}>
          <img
            className={styles.image}
            src={selectedVariant.node.image.url}
            alt={selectedVariant.node.image.altText ?? ''}
          />
        </div>
      )}
      <div className={styles.text_box}>
        <h1 className={styles.title}>{product.title.toUpperCase()}</h1>
        <p className={styles.price}>
          {selectedVariant?.node.price.amount} {selectedVariant?.node.price.currencyCode}
        </p>
        <div className={styles.text_info_box}>
          {sizeOptions && (
            <div className={styles.size_info_box}>
              <h2 className={styles.size_title}>SIZES: </h2>
              <ButtonGroup
                options={sizeOptions.optionValues}
                selectedOption={selectedSize}
                onSelect={(size) => {
                  selectVariant(selectedColor, size);
                }}
              />
            </div>
          )}
          {colorOptions && (
            <div className={styles.color_info_box}>
              <h2 className={styles.color_title}>COLORS: </h2>
              {hasNullSwatch ? (
                <ButtonGroup
                  options={colorOptions.optionValues}
                  selectedOption={selectedColor}
                  onSelect={(color) => {
                    selectVariant(color, selectedSize);
                  }}
                />
              ) : (
                <ul className={styles.color_box}>
                  {colorOptions.optionValues.map((optionValue) => {
                    return (
                      <li
                        className={clsx(styles.color_item, {
                          [styles.selected]: selectedColor === optionValue.name,
                        })}
                        key={optionValue.id}
                      >
                        <button
                          title={optionValue.name}
                          style={
                            optionValue.swatch?.color
                              ? {
                                  backgroundColor: optionValue.swatch.color,
                                }
                              : {}
                          }
                          onClick={() => {
                            selectVariant(optionValue.name, selectedSize);
                          }}
                          type="button"
                        >
                          <span className={'sr-only'}>{optionValue.name}</span>
                        </button>
                      </li>
                    );
                  })}
                </ul>
              )}
            </div>
          )}
          <div className={styles.quantity_box}>
            <h2>QUANTITY: </h2>
            <div className={styles.quantity_btn_box}>
              <button
                title="Decrease"
                onClick={() => {
                  setQuantity((prev) => prev - 1);
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
                  setQuantity((prev) => prev + 1);
                }}
                type="button"
              >
                <PlusIcon size={16} />
                <span className="sr-only">Increase</span>
              </button>
            </div>
          </div>
        </div>
        <SubmitButton
          onClick={onSubmit}
          type="button"
          className={styles.cart_btn}
          disabled={createCartMutation.isPending}
        >
          {createCartMutation.isPending ? 'LOADING' : 'ADD TO CART'}
        </SubmitButton>
        <p className={styles.description}>{product.description}</p>
      </div>
    </div>
  );
}
