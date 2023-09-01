import { createSlice } from '@reduxjs/toolkit';
import { getProducts } from './products.actions';
import { ProductsState } from '../types/products-state.type';
import productsJson from '../products.json';

const initialState: ProductsState = {
  products: productsJson.slice(0, 6),
  pending: true,
  error: null,
};

export const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // ============ GET PRODUCTS ============ //
      .addCase(getProducts.pending, (state) => {
        state.pending = true;
        state.error = null;
      })
      .addCase(getProducts.fulfilled, (state, { payload }) => {
        state.pending = false;
        state.products = payload;
      })
      .addCase(getProducts.rejected, (state, action: any & { payload: any }) => {
        state.pending = false;
        state.error = action.payload.message;
      });
  },
});
