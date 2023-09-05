import { BaseDto } from '../../../types/base-dto.type';
import { CartItemDto } from './cart-item.dto';

export interface CartDto extends BaseDto {
  userId: string;
  discount: number;
  orderItemsQuantity: number;
}
