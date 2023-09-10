import { BaseDto } from '../../../types/base-dto.type';
import { ProductDto } from '../../products/types/product-dto.type';

export interface OrderItemDto extends BaseDto {
  orderId?: string;
  productId: string;
  productQuantity?: number;
  productTitle?: string;
  productPrice?: number;
  product?: ProductDto;
}
