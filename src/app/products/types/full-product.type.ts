import { ProductDto } from './product-dto.type';

export interface FullProductDto extends ProductDto {
  expirationDate?: string;
  size?: string;
  recommendedAge?: string;
}
