import { BaseState } from '../../../types/base-state.type';
import { CartItemDto } from './cart-item.dto';
import { CartDto } from './cart.dto';

export interface CartsState extends BaseState {
  cart: CartDto | null;
  cartItems: CartItemDto[];
  pending: {
    cart: boolean;
    cartItems: boolean;
  };
  errors: {
    cart: string | null;
    cartItems: string | null;
  };
}
