import { BaseDto } from '../../../types/base-dto.type';
import { OrderItemDto } from './order-item.dto';

export interface OrderDto extends BaseDto {
  userId: string;
  deliveryId?: string;
  orderStatus: string;
  discount: number;
  totalAmount: number;
  orderItemsQuantity?: number;
  orderItems?: OrderItemDto[];
}
