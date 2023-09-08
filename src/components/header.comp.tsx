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
import { Button, ButtonGroup, Icon, Link } from '@mui/material';
import PetsIcon from '@mui/icons-material/Pets';
import { colors } from '../themes';
import { NavLink as RouterLink, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getIsRegistered } from '../app/auth/store/auth.selectors';
import { logout } from '../app/auth/store/auth.slice';
import { signOut } from '../app/auth/api/sign-out';
import storage from '../local-storage/storage';
import { AppDispatch } from '../store';
import { cartSelector, cartsPendingSelector } from '../app/carts/store/carts.selector';
import { getActiveCart } from '../app/carts/store/carts.actions';
import { useTranslation } from 'react-i18next';
import i18next from 'i18next';
import { deleteDeliveryItem, getActiveDeliveries } from '../app/delivery/store/delivery.actions';
import LanguageSwitcher from './language-switcher.comp';

const pages = [
  { name: 'products', href: '/products' },
  { name: 'about', href: '/about' },
];

const buttonStyle = {
  border: `1px solid ${colors.lightViolet}`,
  borderRadius: '50%',
  margin: '0 4px',
};

const tempUserId = '9f5a5b41-46d7-414b-8e8b-b55b3cad9daf';

const HeaderComp: FC = () => {
  // const userWithTranslate: IUserWithTranslate = t("user", {
  //   returnObjects: true,
  // });

  const [token, setToken] = useState('');
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();

  // CART
  const cart = useSelector(cartSelector);
  const cartsPending = useSelector(cartsPendingSelector);

  if (cartsPending.cart) {
    dispatch(getActiveCart({ userId: tempUserId }));
  }

  const isRegistered = useSelector(getIsRegistered);

  const handleSignOut = async () => {
    await signOut();
    storage.clear();
    dispatch(logout());
    navigate('/');
  };

  const handleToken = (token: string) => {
    setToken(token);
  };

  // const lang = storage.get('i18nextLng') as string;

  useEffect(() => {
    const token = storage.get('refresh-token');
    if (token) {
      handleToken(token);
    }
  }, []);
  // if (lang?.length > 2) {
  //   i18next.changeLanguage('en');
  // }

  // const handleLanguageChange = (
  //   event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  //   value: string,
  // ) => {
  //   event.stopPropagation();
  //   i18n.changeLanguage(value);
  // };

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

        <SearchComp placeholder={'Search products...'} />

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
          {isRegistered && token ? (
            <Link component={RouterLink} to="/profile">
              <IconButton size="large" edge="end" aria-label="user" sx={{ color: colors.white }}>
                <AccountCircle />
              </IconButton>
            </Link>
          ) : (
            ''
          )}
        </Box>

        {isRegistered && token ? (
          <Box paddingLeft={3}>
            <Button aria-label="sign-out" sx={{ color: colors.white }} onClick={handleSignOut}>
              Sign Out
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
                Sign In
                {/*{t('sign-in')}*/}
              </Link>
            </Button>
          </Box>
        )}

        <LanguageSwitcher />

        {/*<ButtonGroup sx={{paddingLeft: '5px'}}  onChange={handleLanguageChange}>*/}
        {/*  <IconButton*/}
        {/*    aria-label="Switch to Russian"*/}
        {/*    color="inherit"*/}
        {/*    size="small"*/}
        {/*    style={buttonStyle}*/}
        {/*    value="ru"*/}
        {/*  >*/}
        {/*    <Typography fontSize={14}>RU</Typography>*/}
        {/*  </IconButton>*/}
        {/*  <IconButton*/}
        {/*    aria-label="Switch to English"*/}
        {/*    color="inherit"*/}
        {/*    size="small"*/}
        {/*    style={buttonStyle}*/}
        {/*    value="en"*/}
        {/*     >*/}
        {/*    <Typography fontSize={14}>EN</Typography>*/}
        {/*  </IconButton>*/}
        {/*</ButtonGroup>*/}
      </Toolbar>
    </AppBar>
  );
};

export default HeaderComp;
