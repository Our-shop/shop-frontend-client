import { Grid } from '@mui/material';
import React, { FC } from 'react';
import { ProductDto } from '../types/product-dto.type';
import ProductCardComp from './product-card.comp';

interface CardListCompProps {
  products: ProductDto[];
}

const CardListComp: FC<CardListCompProps> = ({ products }) => {
  return (
    <Grid container spacing={3}>
      {products.map((product) => (
        <Grid item xs={3} key={product.id}>
          <ProductCardComp product={product} />
        </Grid>
      ))}
    </Grid>
  );
};

export default CardListComp;
