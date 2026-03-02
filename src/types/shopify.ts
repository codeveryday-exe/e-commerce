export interface ProductFilter {
  available?: boolean;
  category?: CategoryFilter;
  price?: PriceRangeFilter;
  productMetafield?: MetafieldFilter;
  productType?: string;
  productVendor?: string;
  tag?: string;
  taxonomyMetafield?: TaxonomyMetafieldFilter;
  variantMetafield?: MetafieldFilter;
  variantOption?: VariantOptionFilter;
}

// Nested filter types

export interface CategoryFilter {
  id: string; // Category ID to filter on
}

export interface PriceRangeFilter {
  min?: number | null; // Minimum price (defaults to 0 if undefined)
  max?: number | null; // Maximum price (null means no upper limit)
}

export interface MetafieldFilter {
  namespace: string;
  key: string;
  value: string;
}

export interface TaxonomyMetafieldFilter {
  namespace: string;
  key: string;
  value: string;
}

export interface VariantOptionFilter {
  name: string;
  value: string;
}
