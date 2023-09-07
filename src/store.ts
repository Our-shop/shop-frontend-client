import { configureStore } from '@reduxjs/toolkit';
import { productsSlice } from './app/products/store/products.slice';
import { authSlice } from './app/auth/store/auth.slice';
import { cartsSlice } from './app/carts/store/carts.slice';
import { deliverySlice } from './app/delivery/store/delivery.slice';

const store = configureStore({
  reducer: {
    products: productsSlice.reducer,
    auth: authSlice.reducer,
    carts: cartsSlice.reducer,
    deliveries: deliverySlice.reducer,
  },
  devTools: process.env.NODE_ENV !== 'production',
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
