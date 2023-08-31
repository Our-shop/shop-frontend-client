import React, { FC } from 'react';
import ProductCardComp from './components/product-card.comp';
import PageLayoutComp from '../../components/page-layout.com';
import { IProductCard } from './types/i-product-card.type';

const testCard: IProductCard = {
  title: 'Purina meals',
  price: 14,
  description: 'Product description: very cool meal for your puppey',
  image: 'https://content2.onliner.by/catalog/device/header/13dc9813c5cdae172911b1ba9dfd696d.jpeg',
  quantity: 247,
  category: 'Food',
  type: 'Dry food',
};

const ProductTestPage: FC = () => {
  return (
    <PageLayoutComp>
      <ProductCardComp card={testCard} />
    </PageLayoutComp>
  );
};

export default ProductTestPage;
