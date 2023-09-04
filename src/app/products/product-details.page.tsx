import React, { FC, useEffect, useState } from 'react';
import PageLayoutComp from '../../components/page-layout.com';
import { useParams } from 'react-router-dom';
import repository from '../../repository';
import { ProductDto } from './types/product-dto.type';
import { ApiDataDto } from './types/api-data-dto.type';
import { Box, Button, Divider, Stack, Typography } from '@mui/material';

const ProductDetailsPage: FC = () => {
  const { category, id } = useParams();

  const [product, setProduct] = useState<ProductDto>();
  const [specialField, setSpecialField] = useState<string>();

  useEffect(() => {
    repository.get(`${category}/${id}`).then(({ data }: { data: ApiDataDto }) => {
      console.log(data);
      setProduct(data);
      setSpecialField(data?.expirationDate || data?.size || data?.recommendedAge);
    });
  }, []);
  console.log(category, id);

  if (!product) return <div>Loading...</div>;

  return (
    <PageLayoutComp>
      <Stack direction="row" gap={10}>
        <img src={product.image} height="200%" />
        <Box padding={2}>
          <Typography variant="h3">{product.title}</Typography>
          <Divider />
          <Typography variant="body1">{product.description}</Typography>
          <Typography variant="body1">Price: ${product.price}</Typography>
          <Typography variant="body1">Category: {product.category}</Typography>
          <Typography variant="body1">Type: {product.type}</Typography>
          <Button>Add to Cart</Button>
        </Box>
      </Stack>
    </PageLayoutComp>
  );
};

export default ProductDetailsPage;
