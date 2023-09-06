import React, { FC, useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import { Typography } from '@mui/material';
import { useSelector } from 'react-redux';
import { productsPendingSelector, productsSelector } from '../store/products.selectors';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../../store';
import { setProducts } from '../store/products.actions';
import { ProductDto } from '../types/product-dto.type';

const allCategories = [
  { name: 'all products', value: '' },
  { name: 'food', value: 'food' },
  { name: 'clothes', value: 'clothes' },
  { name: 'toys', value: 'toys' },
];

const SidebarComp: FC = () => {
  const dispatch = useDispatch<AppDispatch>();

  // CATEGORY
  const [category, setCategory] = useState<string>(allCategories[0].value);

  const changeCategory = (event: React.MouseEvent<HTMLElement>, nextCategory: string) => {
    setCategory(nextCategory);
  };

  // PRODUCTS
  const products = useSelector(productsSelector);
  const [originalProducts, setOriginalProducts] = useState<ProductDto[]>([]);

  useEffect(() => {
    dispatch(
      setProducts(
        originalProducts.filter((product) => (category ? product.category === category : true)),
      ),
    );
  }, [category]);

  // PENDING
  const pending = useSelector(productsPendingSelector);

  useEffect(() => {
    setOriginalProducts(products);
  }, [pending]);

  return (
    <Box width={220}>
      <ToggleButtonGroup
        fullWidth
        color="primary"
        orientation="vertical"
        value={category}
        exclusive
        onChange={changeCategory}
      >
        {allCategories.map((item) => (
          <ToggleButton key={item.name} value={item.value} aria-label={item.name}>
            <Typography>{item.name}</Typography>
          </ToggleButton>
        ))}
      </ToggleButtonGroup>
    </Box>
  );
};

export default SidebarComp;
