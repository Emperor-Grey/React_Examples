import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { Product, ProductsResponse } from '../types/Product';

export const DummyApi = createApi({
  reducerPath: 'products',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://dummyjson.com' }),
  endpoints: (builder) => ({
    // Get all Products
    getAllProducts: builder.query<ProductsResponse, void>({
      query: () => '/products',
    }),

    // Get Single product
    getSingleProduct: builder.query<Product, number>({
      query: (id) => `/products/${id}}`,
    }),

    // Add a single product
    addProduct: builder.mutation({
      query: (newProduct: Product) => ({
        url: '/product/add',
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: newProduct, // Providing this for looking for the new product
      }),
    }),

    // Update a single Product
    updateProduct: builder.mutation({
      query: ({ id, updatedProduct }) => ({
        method: 'PUT',
        url: `/products/${id}`,
        headers: { 'Content-Type': 'application/json' },
        body: updatedProduct,
      }),
    }),

    // Deleting a product
    deleteProduct: builder.mutation<void, number>({
      // this returns nothing(void) and the id parameter is of type number
      query: (id) => ({
        method: 'DELETE',
        url: `/products/${id}`,
        headers: { 'Content-Type': 'application/json' },
      }),
    }),
  }),
});

export const {
  useGetAllProductsQuery,
  useGetSingleProductQuery,
  useAddProductMutation,
  useUpdateProductMutation,
  useDeleteProductMutation,
} = DummyApi;
