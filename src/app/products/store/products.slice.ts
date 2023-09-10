import { createSlice } from '@reduxjs/toolkit';
import { getProducts, searchProducts, setProducts } from './products.actions';
import { ProductsState } from '../types/products-state.type';

const initialState: ProductsState = {
  products: [],
  foundProducts: [],
  pending: {
    products: true,
    foundProducts: true,
  },
  errors: {
    products: null,
    foundProducts: null,
  },
};

export const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // ============ GET PRODUCTS ============ //
      .addCase(getProducts.pending, (state) => {
        state.pending.products = true;
        state.errors.products = null;
      })
      .addCase(getProducts.fulfilled, (state, { payload }) => {
        state.pending.products = false;
        state.products = payload;
      })
      .addCase(getProducts.rejected, (state, action: any & { payload: any }) => {
        state.pending.products = false;
        state.errors.products = action.payload.message;
      })
      // ============ SEARCH PRODUCTS ============ //
      .addCase(searchProducts.pending, (state) => {
        state.pending.foundProducts = true;
        state.errors.foundProducts = null;
      })
      .addCase(searchProducts.fulfilled, (state, { payload }) => {
        state.pending.foundProducts = false;
        state.foundProducts = payload;
      })
      .addCase(searchProducts.rejected, (state, action: any & { payload: any }) => {
        state.pending.foundProducts = false;
        state.errors.foundProducts = action.payload.message;
      })
      // ============ SET PRODUCTS ============ //
      .addCase(setProducts, (state, action) => {
        state.products = action.payload;
      });
  },
});
