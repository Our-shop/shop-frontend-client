import { createSlice } from '@reduxjs/toolkit';
import { CartsState } from '../types/carts-state.type';
import { getActiveCart } from './carts.actions';

const initialState: CartsState = {
  cart: null,
  cartItems: [],
  pending: {
    cart: true,
    cartItems: true,
  },
  errors: {
    cart: null,
  },
};

export const cartsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // ============ GET ACTIVE CART ============ //
      .addCase(getActiveCart.pending, (state) => {
        state.pending.cart = true;
        state.errors.cart = null;
      })
      .addCase(getActiveCart.fulfilled, (state, { payload }) => {
        state.pending.cart = false;
        state.cart = payload;
      })
      .addCase(getActiveCart.rejected, (state, action: any & { payload: any }) => {
        state.pending.cart = false;
        state.errors.cart = action.payload.message;
      });
  },
});
