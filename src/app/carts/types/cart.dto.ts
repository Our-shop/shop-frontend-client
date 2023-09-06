import { BaseDto } from '../../../types/base-dto.type';

export interface CartDto extends BaseDto {
  userId: string;
  discount: number;
  orderItemsQuantity: number;
}
