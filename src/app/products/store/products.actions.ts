import { createAction, createAsyncThunk } from '@reduxjs/toolkit';
import { ProductDto } from '../types/product-dto.type';
import repository from '../../../repository';

export const getProducts = createAsyncThunk<ProductDto[]>(
  'GET/products',
  async (_, { rejectWithValue }) => {
    try {
      const response = await repository.get('products/active');
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error);
    }
  },
);

export const searchProducts = createAsyncThunk<ProductDto[], { query: string }>(
  'GET/products/query',
  async ({ query }, { rejectWithValue }) => {
    try {
      const response = await repository.get('products/' + query);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error);
    }
  },
);

export const setProducts = createAction<ProductDto[]>('products/setProducts');
