import { RootState } from '../../../store';

export const cartSelector = (state: RootState) => state.carts.cart;
export const cartPendingSelector = (state: RootState) => state.carts.pending;
