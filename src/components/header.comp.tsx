import React, { FC, useEffect, useState } from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import Badge from '@mui/material/Badge';
import AccountCircle from '@mui/icons-material/AccountCircle';
import SearchComp from './ui/search.comp';
import { Button, Icon, Link } from '@mui/material';
import PetsIcon from '@mui/icons-material/Pets';
import { colors } from '../themes';
import { NavLink as RouterLink, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../app/auth/store/auth.slice';
import { signOut } from '../app/auth/api/sign-out';
import storage from '../local-storage/storage';
import { AppDispatch } from '../store';
import { cartSelector, cartsPendingSelector } from '../app/carts/store/carts.selector';
import { getActiveCart } from '../app/carts/store/carts.actions';
import LanguageSwitcher from './language-switcher.comp';
import { useTranslation } from 'react-i18next';

const HeaderComp: FC = () => {
  const { t } = useTranslation();

  const [token, setToken] = useState('');
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();

  const pages = [{ name: `${t('header:Products')}`, href: '/products' }];

  // CART
  const cart = useSelector(cartSelector);
  const cartsPending = useSelector(cartsPendingSelector);

  if (cartsPending.cart) {
    dispatch(getActiveCart());
  }

  const handleSignOut = async () => {
    await signOut();
    storage.clear();
    dispatch(logout());
    navigate('/');
  };

  const handleToken = (token: string) => {
    setToken(token);
  };

  useEffect(() => {
    const token = storage.get('refresh-token');
    if (token) {
      handleToken(token);
    }
  }, []);

  return (
    <AppBar position="sticky">
      <Toolbar>
        <Typography variant="h5">
          <Link component={RouterLink} to="/" color={colors.white}>
            <Icon>
              <PetsIcon />
            </Icon>
          </Link>
        </Typography>

        <SearchComp placeholder={`${t('header:Search-products')}`} />

        <Box>
          {pages.map((page) => (
            <Button
              key={page.name}
              aria-label={page.name}
              color="inherit"
              onClick={() => navigate(page.href)}
            >
              {page.name}
            </Button>
          ))}
        </Box>

        <Box flexGrow={1} />
        <Box>
          <IconButton
            size="large"
            aria-label="cart"
            color="inherit"
            onClick={() => navigate('/carts')}
          >
            <Badge badgeContent={cart?.orderItemsQuantity} color="error">
              <ShoppingCartIcon />
            </Badge>
          </IconButton>

          {token ? (
            <Link component={RouterLink} to="/profile">
              <IconButton size="large" edge="end" aria-label="user" sx={{ color: colors.white }}>
                <AccountCircle />
              </IconButton>
            </Link>
          ) : (
            ''
          )}
        </Box>

        {token ? (
          <Box paddingLeft={3}>
            <Button aria-label="sign-out" sx={{ color: colors.white }} onClick={handleSignOut}>
              {t('header:Sign-out')}
            </Button>
          </Box>
        ) : (
          <Box paddingLeft={3}>
            <Button aria-label="sign-in">
              <Link
                component={RouterLink}
                to="/auth/sign-in"
                sx={{ color: colors.white, textDecoration: 'none' }}
              >
                {t('header:Sign-in')}
              </Link>
            </Button>
          </Box>
        )}
        <LanguageSwitcher />
      </Toolbar>
    </AppBar>
  );
};

export default HeaderComp;
