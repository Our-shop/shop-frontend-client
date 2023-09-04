import { createSlice } from '@reduxjs/toolkit';
import { getProducts, setProducts } from './products.actions';
import { ProductsState } from '../types/products-state.type';
import productsJson from '../products.json';

const initialState: ProductsState = {
  products: [],
  pending: true,
  error: null,
};

export const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    setProducts: (state, action) => {
      state.products = action.payload;
    },
  },
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
      })
      // ============ SET PRODUCTS ============ //
      .addCase(setProducts, (state, action) => {
        state.products = action.payload;
      });
  },
});
