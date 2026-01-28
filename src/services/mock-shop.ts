import { request, gql } from 'graphql-request';
import { ProductQuerySchema, ProductsQuerySchema } from '../schemas/shop';

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
        featuredImage {
          id
          url
        }
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
