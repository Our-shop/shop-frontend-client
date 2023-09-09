import React, { FC, useEffect, useState } from 'react';
import PageLayoutComp from '../../components/page-layout.com';
import { useParams } from 'react-router-dom';
import repository from '../../repository';
import { FullProductDto } from './types/full-product.type';
import { Box, Button, Divider, Stack, Typography } from '@mui/material';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../store';
import { useSelector } from 'react-redux';
import {
  cartItemsSelector,
  cartSelector,
  cartsPendingSelector,
} from '../carts/store/carts.selector';
import { addCartItem, getCartItems } from '../carts/store/carts.actions';
import { useTranslation } from 'react-i18next';
import LoaderComp from '../../components/loader.comp';

const ProductDetailsPage: FC = () => {
  const { t } = useTranslation();

  const dispatch = useDispatch<AppDispatch>();

  const { category, id } = useParams();

  // GET PRODUCT
  const [product, setProduct] = useState<FullProductDto>();

  useEffect(() => {
    repository.get(`${category}/${id}`).then(({ data }: { data: FullProductDto }) => {
      setProduct(data);
    });
  }, []);

  // ADD TO CART
  const cart = useSelector(cartSelector);
  const cartItems = useSelector(cartItemsSelector);
  const cartsPending = useSelector(cartsPendingSelector);

  if (cartsPending.cartItems) {
    cart && dispatch(getCartItems({ cartId: cart.id }));
  }

  const addToCart = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    event.stopPropagation();
    cart && product && dispatch(addCartItem({ cartId: cart?.id, productId: product.id }));
  };

  if (!product) return <LoaderComp />;

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
          <Typography variant="body1">{`${t('productDetails:Price')} ${product.price}`}</Typography>
          <Typography variant="body1">{product.type}</Typography>

          <Typography variant="body2">
            {product?.expirationDate &&
              `${t('productDetails:Expiratioan-date')}` + product.expirationDate}
            {product?.size && `${t('productDetails:Clothes-size')}` + product.size}
            {product?.recommendedAge &&
              `${t('productDetails:Recommended-age')}` + product.recommendedAge}
          </Typography>

          {cartItems.some((item) => item.product.id === product.id) ? (
            <Button variant="contained" sx={{ marginTop: 3 }} disabled>
              {t('productDetails:Already-in-cart')}
            </Button>
          ) : (
            <Button variant="contained" sx={{ marginTop: 3 }} onClick={(event) => addToCart(event)}>
              {t('productDetails:Add-to-cart')}
            </Button>
          )}
        </Stack>
      </Stack>
    </PageLayoutComp>
  );
};

export default ProductDetailsPage;
