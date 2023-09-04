import { createAction, createAsyncThunk } from '@reduxjs/toolkit';
import { ProductDto } from '../types/product-dto.type';
import repository from '../../../repository';

export const getProducts = createAsyncThunk<ProductDto[]>(
  'products/getAll',
  async (_, { rejectWithValue }) => {
    try {
      const response = await repository.get('products/active');
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error);
    }
  },
);

export const setProducts = createAction<ProductDto[]>('products/setProducts');
