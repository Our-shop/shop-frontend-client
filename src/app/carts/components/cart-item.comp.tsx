import React, { FC } from 'react';
import Box from '@mui/material/Box';
import { Button, CardActionArea, CardActions } from '@mui/material';
import Stack from '@mui/material/Stack';
import { ProductDto } from '../../products/types/product-dto.type';
import { CartItemDto } from '../types/cart-item.dto';

interface CartItemCompProps {
  cartItem: CartItemDto;
}

const CartItemComp: FC<CartItemCompProps> = ({ cartItem }) => {
  return (
    <Stack height={100} direction="row">
      cartItem
    </Stack>
  );
};

export default CartItemComp;
