import { alpha, styled } from '@mui/material/styles';
import SearchIcon from '@mui/icons-material/Search';
import * as React from 'react';
import { FC, useState, useEffect } from 'react';
import InputBase from '@mui/material/InputBase';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import MenuItem from '@mui/material/MenuItem';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../store';
import { useSelector } from 'react-redux';
import { foundproductsSelector } from '../app/products/store/products.selectors';
import { searchProducts } from '../app/products/store/products.actions';
import { useNavigate } from 'react-router';
import { ProductDto } from '../app/products/types/product-dto.type';

const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(3),
    width: 'auto',
  },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '20ch',
    },
  },
}));

interface SearchCompProps {
  placeholder: string;
}

const SearchProductsComp: FC<SearchCompProps> = ({ placeholder }) => {
  // SEARCH
  const [value, setValue] = useState('');
  const [query, setQuery] = useState('');

  useEffect(() => {
    const debounceTimeout = setTimeout(() => {
      setQuery(value);
    }, 500);

    return () => {
      clearTimeout(debounceTimeout);
    };
  }, [value]);

  // FOUND PRODUCTS
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const foundProducts = useSelector(foundproductsSelector);

  useEffect(() => {
    if (query) {
      dispatch(searchProducts({ query }));
    }
  }, [query]);

  const clickProduct = (product: ProductDto) => {
    navigate(`/products/${product.category}/${product.id}`);
    window.location.reload();
  };

  return (
    <Stack>
      <Search>
        <SearchIconWrapper>
          <SearchIcon />
        </SearchIconWrapper>
        <StyledInputBase
          placeholder={placeholder}
          inputProps={{ 'aria-label': 'search' }}
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />
      </Search>

      <Card elevation={4} sx={{ position: 'absolute', top: 50, left: 70 }}>
        {query &&
          foundProducts.slice(0, 5).map((product) => (
            <MenuItem key={product.id} onClick={() => clickProduct(product)}>
              <Stack direction="row" alignItems="center" gap={3}>
                <img src={product.image} height={50}></img>
                <Typography>{product.title}</Typography>
              </Stack>
            </MenuItem>
          ))}
      </Card>
    </Stack>
  );
};

export default SearchProductsComp;
