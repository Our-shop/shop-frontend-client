import { BaseState } from '../../../types/base-state.type';
import { ProductDto } from './product-dto.type';

export interface ProductsState extends BaseState {
  products: ProductDto[];
}
