import { createAction, createAsyncThunk } from '@reduxjs/toolkit';
import repository from '../../../repository';
import { CartDto } from '../types/cart.dto';
import { CartItemDto } from '../types/cart-item.dto';

// export const getActiveCart = createAsyncThunk<CartDto>(
//   'GET/active-cart',
//   async (_, { rejectWithValue }) => {
//     try {
//       const response = await repository.get('active-cart');
//       return response.data;
//     } catch (error: any) {
//       return rejectWithValue(error);
//     }
//   },
// );

export const getActiveCart = createAsyncThunk<CartDto, { userId: string }>(
  'GET/carts/user/:userId',
  async ({ userId }, { rejectWithValue }) => {
    try {
      const response = await repository.get('carts/user/' + userId);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error);
    }
  },
);

export const getCartItems = createAsyncThunk<CartItemDto[], { cartId: string }>(
  'GET/order-items/order/:orderId',
  async ({ cartId }, { rejectWithValue }) => {
    try {
      const response = await repository.get('order-items/order/' + cartId);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error);
    }
  },
);

export const addCartItem = createAsyncThunk<CartItemDto, { cartId: string; productId: string }>(
  'POST/order-items',
  async ({ cartId, productId }, { rejectWithValue }) => {
    try {
      const response = await repository.post('order-items', { orderId: cartId, productId });
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error);
    }
  },
);

export const editProductQuantity = createAsyncThunk<CartItemDto, Partial<CartItemDto>>(
  'PUT/order-items/:orderItemId',
  async (cartItem, { rejectWithValue }) => {
    try {
      const response = await repository.put('order-items/' + cartItem.id, cartItem);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error);
    }
  },
);

export const deleteCartItem = createAsyncThunk<CartItemDto, { cartItemId: string }>(
  'DELETE/order-items/:orderItemId',
  async ({ cartItemId }, { rejectWithValue }) => {
    try {
      const response = await repository.delete('order-items/' + cartItemId);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error);
    }
  },
);
