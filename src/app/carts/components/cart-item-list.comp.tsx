import React, { FC, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { cartItemsSelector, cartSelector, cartsPendingSelector } from '../store/carts.selector';
import { getCartItems } from '../store/carts.actions';
import { AppDispatch } from '../../../store';
import { Table, TableBody, TableContainer, TableHead } from '@mui/material';
import CartItemComp from './cart-item.comp';

const CartItemListComp: FC = () => {
  const dispatch = useDispatch<AppDispatch>();

  //CART ITEMS
  const cartItems = useSelector(cartItemsSelector);

  // CART
  const cart = useSelector(cartSelector);
  useEffect(() => {
    cart?.id && dispatch(getCartItems({ cartId: cart.id }));
  }, [cart?.id]);

  // PENDING
  const pending = useSelector(cartsPendingSelector);
  if (pending.cartItems) return <div>Loading...</div>;

  const totalAmount = cartItems.reduce(
    (totalAmount, cartItem) => (totalAmount += cartItem.productQuantity * cartItem.product.price),
    0,
  );

  return (
    <TableContainer>
      {/* <TableHead>{totalAmount}</TableHead> */}
      <Table sx={{ width: '100%' }}>
        <TableBody>
          {cartItems.map((cartItem) => (
            <CartItemComp cartItem={cartItem} key={cartItem.id} />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default CartItemListComp;
