import { get } from '@/api';
import { Product } from '@/types/example';

interface GetProductsPayload {
  perPage: number,
  page: number,
}

interface GetProductsResponse {
  products: Product[],
  pagination: {
    page: number,
    perPage: number,
  }
}

export const getProducts = (
  payload: GetProductsPayload,
) => get<GetProductsResponse>('/products', payload);
