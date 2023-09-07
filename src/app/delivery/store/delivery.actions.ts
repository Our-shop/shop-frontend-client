import { createAsyncThunk } from '@reduxjs/toolkit';
import { DeliveryDto } from '../types/delivery-dto.type';
import repository from '../../../repository';

export const getActiveDeliveries = createAsyncThunk<DeliveryDto[], { userId: string }>(
  'GET/delivery/active/:userId',
  async ({ userId }, { rejectWithValue }) => {
    try {
      const response = await repository.get('delivery/active/' + userId);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error);
    }
  },
);

export const getDeliveryItemById = createAsyncThunk<DeliveryDto, { id: string }>(
  'GET/deliveryById',
  async ({ id }, { rejectWithValue }) => {
    try {
      const response = await repository.get<DeliveryDto>(`/delivery/${id}`);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error);
    }
  },
);

export const deleteDeliveryItem = createAsyncThunk<DeliveryDto, { deliveryItemId: string }>(
  'DELETE/delivery/:deliveryItemId',
  async ({ deliveryItemId }, { rejectWithValue }) => {
    try {
      const response = await repository.delete('delivery/' + deliveryItemId);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error);
    }
  },
);

export const addDeliveryItem = createAsyncThunk<DeliveryDto, { deliveryDto: Partial<DeliveryDto> }>(
  'POST/delivery/',
  async ({ deliveryDto }, { rejectWithValue }) => {
    try {
      const response = await repository.post<DeliveryDto>('/delivery', deliveryDto);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error);
    }
  },
);

export const editDeliveryItem = createAsyncThunk<
  DeliveryDto,
  { id: string; updatedDelivery: Partial<DeliveryDto> }
>('PUT/delivery', async ({ id, updatedDelivery }, { rejectWithValue }) => {
  try {
    const response = await repository.put<DeliveryDto>(`/delivery/${id}`, updatedDelivery);
    return response.data;
  } catch (error: any) {
    return rejectWithValue(error);
  }
});
