import React, { FC, useState } from 'react';
import { useSelector } from 'react-redux';
import { cartItemsSelector } from '../store/carts.selector';
import { Table, TableBody, TableContainer, Typography, Button } from '@mui/material';
import CartItemComp from './cart-item.comp';
import MakeOrderModalComp from './make-order-modal.comp';
import Stack from '@mui/material/Stack';

const CartItemListComp: FC = () => {
  const cartItems = useSelector(cartItemsSelector);
  const [isOpened, setIsOpened] = useState(false);

  const totalAmount = cartItems.reduce(
    (totalAmount, cartItem) => (totalAmount += cartItem.productQuantity * cartItem.product.price),
    0,
  );

  return (
    <>
      <Stack direction="row" justifyContent="center" alignItems="center" gap={3}>
        <Typography variant="body1" color="initial">
          Total amount: ${totalAmount.toFixed(2)}
        </Typography>
        <Button color="success" variant="contained" onClick={() => setIsOpened(true)}>
          Make order
        </Button>
      </Stack>
      <TableContainer>
        <Table sx={{ width: '100%' }}>
          <TableBody>
            {cartItems.map((cartItem) => (
              <CartItemComp cartItem={cartItem} key={cartItem.id} />
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <MakeOrderModalComp isOpened={isOpened} setIsOpened={setIsOpened} />
    </>
  );
};

export default CartItemListComp;
