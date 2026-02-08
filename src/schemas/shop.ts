import { z } from 'zod';

export const ProductNodeSchema = z.object({
  id: z.string(),
  tags: z.array(z.string()),
  title: z.string(),
  featuredImage: z
    .object({
      id: z.string(),
      url: z.url(),
      altText: z.string().nullable(),
    })
    .nullable(),
  selectedOrFirstAvailableVariant: z
    .object({
      price: z.object({
        amount: z.string(),
        currencyCode: z.string(),
      }),
    })
    .nullable(),
});

export const ProductsQuerySchema = z.object({
  products: z.object({
    edges: z.array(
      z.object({
        node: ProductNodeSchema,
      }),
    ),
  }),
});

export const ProductQuerySchema = z.object({
  product: z
    .object({
      id: z.string(),
      title: z.string(),
      description: z.string(),
      options: z.array(
        z.object({
          id: z.string(),
          name: z.string(),
          optionValues: z.array(
            z.object({
              id: z.string(),
              name: z.string(),
              swatch: z
                .object({
                  color: z.string().nullable(),
                })
                .nullable(),
            }),
          ),
        }),
      ),
      selectedOrFirstAvailableVariant: z
        .object({
          id: z.string(),
        })
        .nullable(),
      variants: z.object({
        edges: z.array(
          z.object({
            node: z.object({
              id: z.string(),
              availableForSale: z.boolean(),
              image: z
                .object({
                  id: z.string(),
                  url: z.url(),
                  altText: z.string().nullable(),
                })
                .nullable(),
              selectedOptions: z.array(
                z.object({
                  name: z.string(),
                  value: z.string(),
                }),
              ),
              price: z.object({
                amount: z.string(),
                currencyCode: z.string(),
              }),
            }),
          }),
        ),
      }),
    })
    .nullable(), // product can be null if not found
});

export const CartCreateResponseSchema = z.object({
  cartCreate: z.object({
    cart: z.object({
      id: z.string(),
    }),
  }),
});

const MoneyV2Schema = z.object({
  amount: z.string(),
  currencyCode: z.string(),
});

const ImageSchema = z.object({
  id: z.string(),
  url: z.string(),
  altText: z.string().nullable(),
});

const MerchandiseSchema = z.object({
  id: z.string(),
  title: z.string(),
  image: ImageSchema.nullable(),
});

const CartLineNodeSchema = z.object({
  id: z.string(),
  quantity: z.number(),
  cost: z.object({
    totalAmount: MoneyV2Schema,
  }),
  merchandise: MerchandiseSchema,
});

const CartLineEdgeSchema = z.object({
  node: CartLineNodeSchema,
});

const CartLinesSchema = z.object({
  edges: z.array(CartLineEdgeSchema),
});

const CartCostSchema = z.object({
  totalAmount: MoneyV2Schema,
  subtotalAmount: MoneyV2Schema,
});

export const CartSchema = z.object({
  id: z.string(),
  createdAt: z.string(),
  updatedAt: z.string(),
  lines: CartLinesSchema,
  cost: CartCostSchema,
});

export const CartQueryResponseSchema = z.object({
  cart: CartSchema,
});

export const CartLinesAddResponseSchema = z.object({
  cartLinesAdd: z.object({
    cart: CartSchema,
  }),
});
