import { request, gql } from 'graphql-request';
import {
  CartCreateResponseSchema,
  CartLinesAddResponseSchema,
  CartQueryResponseSchema,
  ProductQuerySchema,
  ProductsQuerySchema,
} from '../schemas/shop';

export async function fetchProducts() {
  const query = gql`
    {
      products(first: 20) {
        edges {
          node {
            id
            tags
            title
            featuredImage {
              id
              url
              altText
            }
            selectedOrFirstAvailableVariant {
              price {
                amount
                currencyCode
              }
            }
          }
        }
      }
    }
  `;

  const response = ProductsQuerySchema.parse(await request('https://mock.shop/api', query));

  console.log(response.products.edges);
  return response.products.edges.map((edge) => edge.node);
}

export async function fetchProduct(productId: string) {
  const query = gql`
    {
      product(id: "gid://shopify/Product/${productId}") {
        id
        title
        description
        options {
          id
          name
          optionValues {
            id
            name
            swatch {
              color
            }
          }
        }
        selectedOrFirstAvailableVariant {
          id
        }
        variants(first: 50) {
          edges {
            node {
              id
              availableForSale
              image {
                id
                url
                altText
              }
              selectedOptions {
                name
                value
              }
              price {
                amount
                currencyCode
              }
            }
          }
        }
      }
    }
  `;

  const response = ProductQuerySchema.parse(await request('https://mock.shop/api', query));
  console.log(response.product);

  return response.product;
}

const cartFragment = `
  id
  createdAt
  updatedAt
  lines(first: 10) {
    edges {
      node {
        id
        quantity
        cost {
          totalAmount {
            amount
            currencyCode
          }
        }
        merchandise {
          ... on ProductVariant {
            id
            title
            image {
              id
              url
              altText
            }
          }
        }
      }
    }
  }
  cost {
    totalAmount {
      amount
      currencyCode
    }
    subtotalAmount {
      amount
      currencyCode
    }
  }
`;

export async function getCart(id: string) {
  const query = gql`
    query Cart {
      cart(id: "${id}") {
        ${cartFragment}
      }
    }
  `;

  const response = CartQueryResponseSchema.parse(await request('https://mock.shop/api', query));
  return response.cart;
}

export async function createCart({ variantId, quantity }: { variantId: string; quantity: number }) {
  const query = gql`
    mutation CartCreate {
      cartCreate(input: { lines: [{ quantity: ${quantity}, merchandiseId: "gid://shopify/ProductVariant/${variantId}" }] }) {
        cart {
          id
        }
      }
    }
  `;

  const response = CartCreateResponseSchema.parse(await request('https://mock.shop/api', query));
  return response.cartCreate.cart;
}

export async function addLinesToCart({
  cartId,
  variantId,
  quantity,
}: {
  cartId: string;
  variantId: string;
  quantity: number;
}) {
  const query = gql`
    mutation CartLinesAdd {
      cartLinesAdd(cartId: "${cartId}", lines: [{ quantity: ${quantity}, merchandiseId: "gid://shopify/ProductVariant/${variantId}" }]) {
        cart {
          ${cartFragment}
        }
      }
    }
  `;

  const response = CartLinesAddResponseSchema.parse(await request('https://mock.shop/api', query));
  return response.cartLinesAdd.cart;
}
