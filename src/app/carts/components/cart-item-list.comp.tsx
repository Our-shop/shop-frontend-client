import React, { FC } from 'react';
import { useSelector } from 'react-redux';
import { cartItemsSelector } from '../store/carts.selector';
import { Table, TableBody, TableContainer } from '@mui/material';
import CartItemComp from './cart-item.comp';

const CartItemListComp: FC = () => {
  const cartItems = useSelector(cartItemsSelector);

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
