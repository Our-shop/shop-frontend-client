import React, { FC } from 'react';
import HeaderComp from '../../components/header.comp';
import ProductsRoutes from './products.routes';
import FooterComp from '../../components/footer.comp';

const ProductsPage: FC = () => {
  return (
    <>
      <HeaderComp />
      <ProductsRoutes />
      <FooterComp />
    </>
  );
};

export default ProductsPage;
