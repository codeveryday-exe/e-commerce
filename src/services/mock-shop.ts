import { request, gql } from 'graphql-request';
import {
  CartCreateResponseSchema,
  CartLinesAddResponseSchema,
  CartLinesRemoveResponseSchema,
  CartLinesUpdateSchema,
  CartQueryResponseSchema,
  CollectionProductsSchema,
  CollectionsQuerySchema,
  ProductQuerySchema,
  ProductsQuerySchema,
} from '../schemas/shop';

const listProductFragment = `
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
`;

export async function fetchProducts() {
  const query = gql`
    {
      products(first: 20) {
        edges {
          node {
            ${listProductFragment}
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

export async function addLinesToCart(variables: {
  cartId: string;
  line: {
    merchandiseId: string;
    quantity: number;
  };
}) {
  const query = gql`
    mutation CartLinesAdd($cartId: ID!, $line: CartLineInput!) {
      cartLinesAdd(cartId: $cartId, lines: [$line]) {
        cart {
          ${cartFragment}
        }
      }
    }
  `;

  const response = await request('https://mock.shop/api', query, variables);
  const parsedResponse = CartLinesAddResponseSchema.parse(response);
  return parsedResponse.cartLinesAdd.cart;
}

export async function removeLinesFromCart(variables: { cartId: string; lineId: string }) {
  const query = gql`
    mutation CartLinesRemove($cartId: ID!, $lineId: ID!) {
      cartLinesRemove(cartId: $cartId, lineIds: [$lineId]) {
        cart {
          ${cartFragment}
        }
      }
    }
  `;
  const response = await request('https://mock.shop/api', query, variables);
  const parsedResponse = CartLinesRemoveResponseSchema.parse(response);
  return parsedResponse.cartLinesRemove.cart;
}

export async function editLinesFromCart(variables: { cartId: string; line: { id: string; quantity: number } }) {
  const query = gql`
    mutation CartLinesUpdate($cartId: ID!, $line: CartLineUpdateInput!) {
      cartLinesUpdate(cartId: $cartId, lines: [$line]) {
        cart {
          ${cartFragment}
        }
      }
    }
  `;

  const response = await request('https://mock.shop/api', query, variables);
  const parsedResponse = CartLinesUpdateSchema.parse(response);
  console.log('edit line response: ', parsedResponse);
  return parsedResponse.cartLinesUpdate.cart;
}

export async function getCollections() {
  const query = gql`
    {
      collections(first: 10) {
        edges {
          cursor
          node {
            id
            handle
            title
            description
            image {
              id
              url
            }
          }
        }
      }
    }
  `;
  const response = CollectionsQuerySchema.parse(await request('https://mock.shop/api', query));
  console.log(response.collections);
  return response.collections;
}

export async function getCollectionProducts(variantId: string) {
  const query = gql`
    {
      collection(id: "gid://shopify/Collection/${variantId}") {
        id
        handle
        title
        description
        image {
          id
          url
        }
        products(first: 20) {
          edges {
            node {
              ${listProductFragment}
            }
          }
        }
      }
    }
  `;
  const response = CollectionProductsSchema.parse(await request('https://mock.shop/api', query));
  console.log(response.collection);
  return response.collection;
}
