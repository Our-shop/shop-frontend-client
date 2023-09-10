import React, { FC, useState, useEffect } from 'react';
import { Grid } from '@mui/material';
import ProductCardComp from './product-card.comp';
import { useSelector } from 'react-redux';
import { productsSelector } from '../store/products.selectors';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';

const CardListComp: FC = () => {
  const products = useSelector(productsSelector);

  // PAGINATION
  const pageLimit = 8;
  const pages = Math.ceil(products.length / pageLimit);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    setCurrentPage(1);
  }, [products]);

  const handlePageChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setCurrentPage(value);
  };

  const slicedProducts = products.slice((currentPage - 1) * pageLimit, currentPage * pageLimit);

  return (
    <Stack
      direction="column"
      alignItems="center"
      justifyContent="space-between"
      gap={3}
      sx={{ width: '100%' }}
    >
      <Grid container spacing={3}>
        {slicedProducts.map((product) => (
          <Grid item xs={3} key={product.id}>
            <ProductCardComp product={product} />
          </Grid>
        ))}
      </Grid>

      <Pagination
        count={pages}
        defaultPage={currentPage}
        siblingCount={0}
        onChange={handlePageChange}
      />
    </Stack>
  );
};

export default CardListComp;
