import React, { FC, useEffect, useState } from 'react';
import PageLayoutComp from '../../components/page-layout.com';
import { useParams } from 'react-router-dom';
import repository from '../../repository';
import { FullProductDto } from './types/full-product.type';
import { Box, Button, Divider, Stack, Typography } from '@mui/material';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../store';
import { useSelector } from 'react-redux';
import { cartSelector } from '../carts/store/carts.selector';
import { addCartItem } from '../carts/store/carts.actions';

const ProductDetailsPage: FC = () => {
  const dispatch = useDispatch<AppDispatch>();

  const { category, id } = useParams();

  const [product, setProduct] = useState<FullProductDto>();

  useEffect(() => {
    repository.get(`${category}/${id}`).then(({ data }: { data: FullProductDto }) => {
      setProduct(data);
    });
  }, []);

  // ADD TO CART
  const cart = useSelector(cartSelector);

  const addToCart = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    event.stopPropagation();
    cart && product && dispatch(addCartItem({ cartId: cart?.id, productId: product.id }));
  };

  if (!product) return <div>Loading...</div>;

  return (
    <PageLayoutComp>
      <Stack direction="row" gap={10} justifyContent="center" alignItems="center">
        <Box>
          <img src={product.image} alt={product.title} />
        </Box>
        <Stack padding={2} gap={2} maxWidth={500}>
          <Typography variant="h3">{product.title}</Typography>
          <Divider />
          <Typography variant="body1">{product.description}</Typography>
          <Typography variant="body1">Price: ${product.price}</Typography>
          <Typography variant="body1">{product.type}</Typography>
          <Typography variant="body2">
            {product?.expirationDate && 'Expiratioan date: ' + product.expirationDate}
            {product?.size && 'Clothes size: ' + product.size}
            {product?.recommendedAge && 'Recommended age: ' + product.recommendedAge}
          </Typography>
          <Button variant="contained" sx={{ marginTop: 3 }} onClick={(event) => addToCart(event)}>
            Add to Cart
          </Button>
        </Stack>
      </Stack>
    </PageLayoutComp>
  );
};

export default ProductDetailsPage;
