import { createSlice } from '@reduxjs/toolkit';
import { CartsState } from '../types/carts-state.type';
import {
  addCartItem,
  deleteCartItem,
  editProductQuantity,
  getActiveCart,
  getCartItems,
} from './carts.actions';

const initialState: CartsState = {
  cart: null,
  cartItems: [],
  pending: {
    cart: true,
    cartItems: true,
  },
  errors: {
    cart: null,
    cartItems: null,
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
      })
      // ============ GET CART ITEMS ============ //
      .addCase(getCartItems.pending, (state) => {
        state.pending.cartItems = true;
        state.errors.cartItems = null;
      })
      .addCase(getCartItems.fulfilled, (state, { payload }) => {
        state.pending.cartItems = false;
        state.cartItems = payload;
      })
      .addCase(getCartItems.rejected, (state, action: any & { payload: any }) => {
        state.pending.cartItems = false;
        state.errors.cartItems = action.payload.message;
      })
      // ============ ADD CART ITEM ============ //
      .addCase(addCartItem.fulfilled, (state) => {
        if (state.cart) state.cart.orderItemsQuantity += 1;
      })
      .addCase(addCartItem.rejected, (state, action: any & { payload: any }) => {
        state.pending.cartItems = false;
        state.errors.cartItems = action.payload.message;
      })
      // ============ EDIT CART ITEM ============ //
      .addCase(editProductQuantity.fulfilled, (state, { payload }) => {
        const index = state.cartItems.findIndex((item) => item.id === payload.id);
        state.cartItems[index] = payload;
      })
      .addCase(editProductQuantity.rejected, (state, action: any & { payload: any }) => {
        state.errors.cartItems = action.payload.message;
      })
      // ============ DELETE CART ITEM ============ //
      .addCase(deleteCartItem.fulfilled, (state, { payload }) => {
        state.cartItems = state.cartItems.filter((item) => item.id !== payload.id);
        if (state.cart) state.cart.orderItemsQuantity -= 1;
      })
      .addCase(deleteCartItem.rejected, (state, action: any & { payload: any }) => {
        state.errors.cartItems = action.payload.message;
      });
  },
});
