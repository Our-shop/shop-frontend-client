import { ProductDto } from './product-dto.type';

export interface ApiDataDto extends ProductDto {
  expirationDate?: string;
  size?: string;
  recommendedAge?: string;
}
