import React, { FC, useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import { Typography } from '@mui/material';
import { useSelector } from 'react-redux';
import { productsSelector } from '../store/products.selectors';
import { useDispatch } from 'react-redux';

const categories = [{ value: 'all' }];

const SidebarComp: FC = () => {
  const dispatch = useDispatch();
  const products = useSelector(productsSelector);

  const [category, setCategory] = useState('all');

  useEffect(() => {
    const filtered = products.filter((product) => {
      return category === 'all' ? true : product.category === category;
    });
    console.log(filtered);
    console.log(category);
  }, [category]);

  const handleChange = (event: React.MouseEvent<HTMLElement>, nextCategory: string) => {
    setCategory(nextCategory);
  };

  return (
    <Box width={220}>
      <ToggleButtonGroup
        fullWidth
        color="primary"
        orientation="vertical"
        value={category}
        exclusive
        onChange={handleChange}
      >
        <ToggleButton value="all" aria-label="all">
          <Typography>All products</Typography>
        </ToggleButton>
        <ToggleButton value="food" aria-label="food">
          <Typography>Food</Typography>
        </ToggleButton>
        <ToggleButton value="clothes" aria-label="clothes">
          <Typography>Clothes</Typography>
        </ToggleButton>
        <ToggleButton value="toys" aria-label="toys">
          <Typography>Toys</Typography>
        </ToggleButton>
      </ToggleButtonGroup>
    </Box>
  );
};

export default SidebarComp;
