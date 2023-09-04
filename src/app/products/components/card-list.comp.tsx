import { Grid } from '@mui/material';
import React, { FC } from 'react';
import ProductCardComp from './product-card.comp';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../../store';
import { useSelector } from 'react-redux';
import { productsSelector } from '../store/products.selectors';

const CardListComp: FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const products = useSelector(productsSelector);

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
