import { NoStatusDto } from '../../../types/no-status.dto';
import { ProductDto } from '../../products/types/product-dto.type';

export interface CartItemDto extends NoStatusDto {
  orderId: string;
  product: ProductDto;
  productQuantity: number;
}
