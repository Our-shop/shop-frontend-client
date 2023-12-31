import React, { FC, useState } from 'react';
import { useSelector } from 'react-redux';
import { cartItemsSelector, cartSelector } from '../store/carts.selector';
import { Table, TableBody, TableContainer, Typography, Button } from '@mui/material';
import CartItemComp from './cart-item.comp';
import MakeOrderModalComp from './make-order-modal.comp';
import Stack from '@mui/material/Stack';
import { useTranslation } from 'react-i18next';

const CartItemListComp: FC = () => {
  const cart = useSelector(cartSelector);
  const cartItems = useSelector(cartItemsSelector);
  const [isOpened, setIsOpened] = useState(false);

  const { t } = useTranslation();

  const totalAmount = cartItems.reduce(
    (totalAmount, cartItem) => (totalAmount += cartItem.productQuantity * cartItem.product.price),
    0,
  );

  return (
    <>
      <Stack direction="row" justifyContent="center" alignItems="center" gap={3}>
        <Stack direction="row" gap={1}>
          <Typography variant="body1" color="initial">
            {t('cartItem:Total-amount')} ${totalAmount.toFixed(2)}
          </Typography>
          <Typography variant="body1" color="green">
            {cart && cart.discount > 0 && `(-$${((cart.discount / 100) * totalAmount).toFixed(2)})`}
          </Typography>
        </Stack>

        <Button color="success" variant="contained" onClick={() => setIsOpened(true)}>
          {t('cartItem:Make-order')}
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
