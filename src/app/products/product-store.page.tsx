import React, { FC, useEffect } from 'react';
import PageLayoutComp from '../../components/page-layout.com';
import CardListComp from './components/card-list.comp';
import SidebarComp from './components/sidebar.comp';
import { Stack } from '@mui/material';
import { useDispatch } from 'react-redux';
import { getProducts } from './store/products.actions';
import { AppDispatch } from '../../store';

const ProductStorePage: FC = () => {
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(getProducts());
  }, [dispatch]);

  return (
    <PageLayoutComp>
      <Stack direction="row" gap={10}>
        <SidebarComp />
        <CardListComp />
      </Stack>
    </PageLayoutComp>
  );
};

export default ProductStorePage;
