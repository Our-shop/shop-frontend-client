import React, { FC, useEffect } from 'react';
import HeaderComp from '../../components/header.comp';
import FooterComp from '../../components/footer.comp';
import PageLayoutComp from '../../components/page-layout.com';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../store';
import { getActiveCart } from './store/carts.actions';
import { useSelector } from 'react-redux';
import { cartSelector } from './store/carts.selector';

const CartsPage: FC = () => {
  return (
    <>
      <HeaderComp />
      <PageLayoutComp>Carts page</PageLayoutComp>
      <FooterComp />
    </>
  );
};

export default CartsPage;
