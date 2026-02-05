import { request, gql } from 'graphql-request';
import {
  CartCreateResponseSchema,
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

export async function getCart(id: string) {
  const query = gql`
    query Cart {
      cart(id: "${id}") {
        id
        createdAt
        updatedAt
        lines(first: 10) {
          edges {
            node {
              id
              merchandise {
                ... on ProductVariant {
                  id
                  title
                  image {
                    id
                    url
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
      }
    }
  `;

  const response = CartQueryResponseSchema.parse(await request('https://mock.shop/api', query));
  return response.cart;
}

export async function createCart(variantId: string) {
  const query = gql`
    mutation CartCreate {
      cartCreate(input: { lines: [{ quantity: 1, merchandiseId: "gid://shopify/ProductVariant/${variantId}" }] }) {
        cart {
          id
        }
      }
    }
  `;
  const response = CartCreateResponseSchema.parse(await request('https://mock.shop/api', query));
  return response.cartCreate.cart;
}
