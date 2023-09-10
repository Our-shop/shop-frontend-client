import React, { FC, useEffect, useState } from 'react';
import Stack from '@mui/material/Stack';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import { Typography, MenuItem } from '@mui/material';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import { useSelector } from 'react-redux';
import { productsPendingSelector, productsSelector } from '../store/products.selectors';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../../store';
import { setProducts } from '../store/products.actions';
import { ProductDto } from '../types/product-dto.type';
import { useTranslation } from 'react-i18next';

const SidebarComp: FC = () => {
  const { t } = useTranslation();

  const allCategories = [
    { name: `${t('products:all-products')}`, value: '' },
    { name: `${t('products:food')}`, value: 'food' },
    { name: `${t('products:clothes')}`, value: 'clothes' },
    { name: `${t('products:toys')}`, value: 'toys' },
  ];

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

  // SORT
  const allSorts = ['Title', 'Price', 'Type'];
  const [currentSort, setCurrentSort] = useState('');

  const handleSortChange = async (event: SelectChangeEvent) => {
    setCurrentSort(event.target.value as string);
    const field = event.target.value.toLocaleLowerCase() as keyof ProductDto;

    dispatch(
      setProducts(
        [...products].sort((a, b) =>
          a[field].toString().toLocaleLowerCase() < b[field].toString().toLocaleLowerCase()
            ? -1
            : 1,
        ),
      ),
    );
  };

  return (
    <Stack width={220} direction="column" gap={4}>
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

      <FormControl fullWidth>
        <InputLabel id="sort-label">Sort by</InputLabel>
        <Select
          labelId="sort-label"
          label="sort by"
          value={currentSort}
          onChange={handleSortChange}
        >
          {allSorts.map((item) => (
            <MenuItem value={item} key={item}>
              {item}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Stack>
  );
};

export default SidebarComp;
