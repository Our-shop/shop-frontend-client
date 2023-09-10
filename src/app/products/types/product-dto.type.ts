import { BaseDto } from '../../../types/base-dto.type';

export interface ProductDto extends BaseDto {
  title: string;
  price: number;
  description: string;
  image: string;
  quantity: number;
  category: string;
  type: string;
}
