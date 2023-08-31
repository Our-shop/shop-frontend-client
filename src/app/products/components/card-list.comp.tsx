import { Grid } from '@mui/material';
import React, { FC } from 'react';
import { IProductCard } from '../types/i-product-card.type';
import ProductCardComp from './product-card.comp';

interface CardListCompProps {
  cards: IProductCard[];
}

const CardListComp: FC<CardListCompProps> = ({ cards }) => {
  return (
    <Grid container spacing={3} maxWidth={750}>
      {cards.map((card) => (
        <Grid item xs={3}>
          <ProductCardComp key={card.title} card={card} />
        </Grid>
      ))}
    </Grid>
  );
};

export default CardListComp;
