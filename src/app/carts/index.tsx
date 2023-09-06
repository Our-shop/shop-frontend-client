import React, { FC, useEffect } from 'react';
import HeaderComp from '../../components/header.comp';
import FooterComp from '../../components/footer.comp';
import PageLayoutComp from '../../components/page-layout.com';
import CartItemListComp from './components/cart-item-list.comp';
import { useSelector } from 'react-redux';
import { cartSelector, cartsPendingSelector } from './store/carts.selector';
import { useDispatch } from 'react-redux';
import { getCartItems } from './store/carts.actions';
import { AppDispatch } from '../../store';

const CartsPage: FC = () => {
  const dispatch = useDispatch<AppDispatch>();

  const cart = useSelector(cartSelector);
  const pending = useSelector(cartsPendingSelector);

  useEffect(() => {
    cart && dispatch(getCartItems({ cartId: cart.id }));
  }, [pending.cart]);

  return (
    <>
      <HeaderComp />
      <PageLayoutComp>
        <CartItemListComp />
      </PageLayoutComp>
      <FooterComp />
    </>
  );
};

export default CartsPage;
