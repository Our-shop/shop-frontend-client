import { RootState } from '../../../store';

export const productsSelector = (state: RootState) => state.products.products;
export const productsPendingSelector = (state: RootState) => state.products.pending;

export const foundproductsSelector = (state: RootState) => state.products.foundProducts;
