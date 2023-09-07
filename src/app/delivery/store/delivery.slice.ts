import { createSlice } from '@reduxjs/toolkit';
import { DeliveryState } from '../types/delivery-state.type';
import {
  addDeliveryItem,
  deleteDeliveryItem,
  editDeliveryItem,
  getActiveDeliveries,
} from './delivery.actions';

const initialState: DeliveryState = {
  delivery: null,
  deliveryItems: [],
  pending: {
    delivery: true,
    deliveryItems: true,
  },
  errors: {
    delivery: null,
    deliveryItems: null,
  },
};

export const deliverySlice = createSlice({
  name: 'delivery-details',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder

      // ============ GET ACTIVE DELIVERIES ============ //
      .addCase(getActiveDeliveries.pending, (state) => {
        state.pending.deliveryItems = true;
        state.errors.deliveryItems = null;
      })
      .addCase(getActiveDeliveries.fulfilled, (state, { payload }) => {
        state.pending.deliveryItems = false;
        state.deliveryItems = payload;
      })
      .addCase(getActiveDeliveries.rejected, (state, action: any & { payload: any }) => {
        state.pending.deliveryItems = false;
        state.errors.deliveryItems = action.payload.message;
      })

      //============ ADD DELIVERY ITEM ============ //
      .addCase(addDeliveryItem.pending, (state) => {
        state.pending.delivery = true;
        state.errors.delivery = null;
      })
      .addCase(addDeliveryItem.fulfilled, (state, { payload }) => {
        state.delivery = payload;
        state.pending.delivery = false;
      })
      .addCase(addDeliveryItem.rejected, (state, action: any & { payload: any }) => {
        state.errors.delivery = action.payload.message;
        state.pending.delivery = false;
      })

      //============ EDIT DELIVERY ITEM ============ //
      .addCase(editDeliveryItem.pending, (state) => {
        state.pending.delivery = true;
        state.errors.delivery = null;
      })
      .addCase(editDeliveryItem.fulfilled, (state, { payload }) => {
        state.delivery = payload;
        state.pending.delivery = false;
      })
      .addCase(editDeliveryItem.rejected, (state, action: any & { payload: any }) => {
        state.errors.delivery = action.payload.message;
        state.pending.delivery = false;
      })

      // ============ DELETE DELIVERY ITEM ============ //
      .addCase(deleteDeliveryItem.pending, (state) => {
        state.pending.delivery = true;
      })
      .addCase(deleteDeliveryItem.fulfilled, (state, { payload }) => {
        state.delivery = payload;
        state.pending.delivery = false;
      })
      .addCase(deleteDeliveryItem.rejected, (state, action: any & { payload: any }) => {
        state.errors.delivery = action.payload.message;
        state.pending.delivery = false;
      });
  },
});
