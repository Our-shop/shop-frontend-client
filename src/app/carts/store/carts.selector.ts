import { RootState } from '../../../store';

export const cartSelector = (state: RootState) => state.carts.cart;
export const cartItemsSelector = (state: RootState) => state.carts.cartItems;

export const cartsPendingSelector = (state: RootState) => state.carts.pending;
export const cartsErrorsSelector = (state: RootState) => state.carts.errors;
