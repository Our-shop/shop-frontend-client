import { BaseState } from '../../../types/base-state.type';
import { DeliveryDto } from './delivery-dto.type';

export interface DeliveryState extends BaseState {
  delivery: DeliveryDto | null;
  deliveryItems: DeliveryDto[];
  pending: {
    delivery: boolean;
    deliveryItems: boolean;
  };
  errors: {
    delivery: string | null;
    deliveryItems: string | null;
  };
}
