import { request, gql } from 'graphql-request';
import { useQuery } from '@tanstack/react-query';
import type { ListProduct } from '../types/mockShop';
import styles from './HomePage.module.css';
import ProductCard from './ProductCard';

async function fetchProducts() {
  const query = gql`
    {
      products(first: 20) {
        edges {
          node {
            id
            title
            description
            featuredImage {
              id
              url
            }
            variants(first: 3) {
              edges {
                node {
                  price {
                    amount
                    currencyCode
                  }
                }
              }
            }
          }
        }
      }
    }
  `;

  interface ProductsResponse {
    products: { edges: { node: ListProduct }[] };
  }

  const response: ProductsResponse = await request('https://mock.shop/api', query);

  console.log(response.products.edges);
  return response.products.edges.map((edge) => edge.node);
}

export function HomePage() {
  const {
    data: products,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ['product-list', 'product'],
    queryFn: () => fetchProducts(),
  });

  if (isLoading) {
    return (
      <div>
        <h1>Loading...</h1>
      </div>
    );
  }

  if (isError || !products) {
    return (
      <div>
        <h1>Products Not Found</h1>
      </div>
    );
  }

  return (
    <ul className={styles.products_container}>
      {products.map((product) => (
        <li key={product.id}>
          <ProductCard product={product} />
        </li>
      ))}
    </ul>
  );
}
