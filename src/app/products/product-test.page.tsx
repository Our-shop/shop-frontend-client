import React, { FC } from 'react';
import ProductCardComp from './components/product-card.comp';
import PageLayoutComp from '../../components/page-layout.com';
import { IProductCard } from './types/i-product-card.type';
import CardListComp from './components/card-list.comp';

const cards: IProductCard[] = [
  {
    title: 'Purina meals',
    price: 14,
    description: 'Product description: very cool meal for your puppey',
    image:
      'https://content2.onliner.by/catalog/device/header/13dc9813c5cdae172911b1ba9dfd696d.jpeg',
    quantity: 247,
    category: 'Food',
    type: 'Dry food',
  },
  {
    title: 'Purina meals',
    price: 14,
    description: 'Product description: very cool meal for your puppey',
    image:
      'https://content2.onliner.by/catalog/device/header/8e0353aea069692c5f13c2da7f7a8bcf.jpeg',
    quantity: 247,
    category: 'Food',
    type: 'Dry food',
  },
  {
    title: 'Purina meals',
    price: 14,
    description: 'Product description: very cool meal for your puppey',
    image:
      'https://content2.onliner.by/catalog/device/header/f8d391e837a6b3b585a50364061c47a4.jpeg',
    quantity: 247,
    category: 'Food',
    type: 'Dry food',
  },
  {
    title: 'Purina meals',
    price: 14,
    description: 'Product description: very cool meal for your puppey',
    image: 'https://content2.onliner.by/catalog/device/header/f9f16299cdc8fd9360ef485d5e110297.png',
    quantity: 247,
    category: 'Food',
    type: 'Dry food',
  },
  {
    title: 'Purina meals',
    price: 14,
    description: 'Product description: very cool meal for your puppey',
    image:
      'https://content2.onliner.by/catalog/device/header/824ae7f4895d561f41dcf0508ab1c2ce.jpeg',
    quantity: 247,
    category: 'Food',
    type: 'Dry food',
  },
  {
    title: 'Purina meals',
    price: 14,
    description: 'Product description: very cool meal for your puppey',
    image:
      'https://content2.onliner.by/catalog/device/header/13dc9813c5cdae172911b1ba9dfd696d.jpeg',
    quantity: 247,
    category: 'Food',
    type: 'Dry food',
  },
];

const ProductTestPage: FC = () => {
  return (
    <PageLayoutComp>
      <CardListComp cards={cards} />
    </PageLayoutComp>
  );
};

export default ProductTestPage;
