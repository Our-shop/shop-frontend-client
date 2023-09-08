import React, { FC, useEffect } from 'react';
import HeaderComp from '../../components/header.comp';
import FooterComp from '../../components/footer.comp';
import PageLayoutComp from '../../components/page-layout.com';
import CartItemListComp from './components/cart-item-list.comp';
import { useSelector } from 'react-redux';
import { cartItemsSelector, cartSelector, cartsPendingSelector } from './store/carts.selector';
import { useDispatch } from 'react-redux';
import { getCartItems } from './store/carts.actions';
import { AppDispatch } from '../../store';
import Stack from '@mui/material/Stack';
import { Typography, Button } from '@mui/material';

const CartsPage: FC = () => {
  const dispatch = useDispatch<AppDispatch>();

  const cart = useSelector(cartSelector);
  const cartItems = useSelector(cartItemsSelector);
  const pending = useSelector(cartsPendingSelector);

  useEffect(() => {
    cart &&
      cart.orderItemsQuantity !== cartItems.length &&
      dispatch(getCartItems({ cartId: cart.id }));
  }, [pending.cart, pending.cartItems]);

  return (
    <>
      <HeaderComp />
      <PageLayoutComp>
        {cartItems.length ? (
          <CartItemListComp />
        ) : (
          <Stack direction="row" justifyContent="center">
            <Typography variant="h5" color="initial">
              Your Cart is empty
            </Typography>
          </Stack>
        )}
      </PageLayoutComp>
      <FooterComp />
    </>
  );
};

export default CartsPage;
