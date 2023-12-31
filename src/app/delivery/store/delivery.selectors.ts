import { RootState } from '../../../store';

export const deliveryItemsSelector = (state: RootState) => state.deliveries.deliveryItems;
export const deliverySelector = (state: RootState) => state.deliveries.delivery;

export const deliveriesPendingSelector = (state: RootState) => state.deliveries.pending;
