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
  SearchProductsSchema,
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

export async function fetchProducts(filterQuery?: string) {
  const query = gql`
    query Products($query: String) {
      products(first: 20, query: $query) {
        edges {
          node {
            ${listProductFragment}
          }
        }
      }
    }
  `;

  const response = await request('https://mock.shop/api', query, { query: filterQuery });
  const parsedResponse = ProductsQuerySchema.parse(response);

  console.log(parsedResponse.products.edges);
  return parsedResponse.products.edges.map((edge) => edge.node);
}

export async function fetchProduct(variables: { productId: string }) {
  const query = gql`
    query Product($productId: ID!) {
      product(id: $productId) {
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

  const response = await request('https://mock.shop/api', query, variables);
  const parsedResponse = ProductQuerySchema.parse(response);
  console.log(parsedResponse.product);

  return parsedResponse.product;
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
    query Cart($id: ID!) {
      cart(id: $id) {
        ${cartFragment}
      }
    }
  `;

  const response = await request('https://mock.shop/api', query, { id });
  const parsedResponse = CartQueryResponseSchema.parse(response);
  return parsedResponse.cart;
}

export async function createCart(input: { lines: { merchandiseId: string; quantity: number }[] }) {
  const query = gql`
    mutation CartCreate($input: CartInput) {
      cartCreate(input: $input) {
        cart {
          id
        }
      }
    }
  `;

  const response = await request('https://mock.shop/api', query, { input });
  const parsedResponse = CartCreateResponseSchema.parse(response);
  return parsedResponse.cartCreate.cart;
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
    query Collections {
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

export async function getCollectionProducts(collectionId: string) {
  const query = gql`
    query Collection($id: ID!) {
      collection(id: $id) {
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

  const response = await request('https://mock.shop/api', query, { id: collectionId });
  const parsedResponse = CollectionProductsSchema.parse(response);
  console.log(parsedResponse.collection);
  return parsedResponse.collection;
}

export async function getSearchProducts(searchInput: string) {
  const query = gql`
    query Search($query: String!, $first: Int!) {
      search(query: $query, first: $first, types: PRODUCT) {
        edges {
          node {
            ... on Product {
              ${listProductFragment}
            }
          }
        }
      }
    }
  `;

  const response = await request('https://mock.shop/api', query, { query: searchInput, first: 12 });
  const parsedResponse = SearchProductsSchema.parse(response);
  console.log(parsedResponse.search);
  return parsedResponse.search;
}
