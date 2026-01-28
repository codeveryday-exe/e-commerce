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
      featuredImage: z
        .object({
          id: z.string(),
          url: z.url(),
        })
        .nullable(),

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
