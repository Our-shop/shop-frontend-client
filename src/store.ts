import { configureStore } from '@reduxjs/toolkit';
import { productsSlice } from './app/products/store/products.slice';
import { authSlice } from './app/auth/store/auth.slice';
import { cartsSlice } from './app/carts/store/carts.slice';

const store = configureStore({
  reducer: {
    products: productsSlice.reducer,
    auth: authSlice.reducer,
    carts: cartsSlice.reducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
