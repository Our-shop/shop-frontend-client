import { createAsyncThunk } from '@reduxjs/toolkit';
import repository from '../../../repository';
import { CartDto } from '../types/cart.dto';

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
  'GET/active-cart/:userId',
  async ({ userId }, { rejectWithValue }) => {
    try {
      const response = await repository.get('carts/user/' + userId);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error);
    }
  },
);
