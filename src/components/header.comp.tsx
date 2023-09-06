import React, { FC } from 'react';
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
import { getIsRegistered } from '../app/auth/store/auth.selectors';
import { logout } from '../app/auth/store/auth.slice';
import { signOut } from '../app/auth/api/sign-out';
import storage from '../local-storage/storage';

const pages = [
  { name: 'products', href: '/products' },
  { name: 'about', href: '/about' },
];

const buttonStyle = {
  border: `1px solid ${colors.lightViolet}`,
  borderRadius: '50%',
  margin: '0 4px',
};

const HeaderComp: FC = () => {
  const navigate = useNavigate();
  const isRegistered = useSelector(getIsRegistered);
  const dispatch = useDispatch();

  const handleSignOut = async () => {
    await signOut();
    storage.clear();
    dispatch(logout());
  };

  return (
    <AppBar position="sticky">
      <Toolbar>
        <Typography variant="h5">
          <Icon>
            <PetsIcon />
          </Icon>
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
          <IconButton size="large" aria-label="cart" color="inherit">
            <Badge badgeContent={4} color="error">
              <ShoppingCartIcon />
            </Badge>
          </IconButton>
          <Link component={RouterLink} to="/profile">
            <IconButton size="large" edge="end" aria-label="user" sx={{ color: colors.white }}>
              <AccountCircle />
            </IconButton>
          </Link>
        </Box>

        {isRegistered ? (
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
              </Link>
            </Button>
          </Box>
        )}

        <Box paddingLeft={3}>
          <IconButton
            aria-label="Switch to Russian"
            color="inherit"
            size="small"
            style={buttonStyle}
          >
            <Typography fontSize={14}>RU</Typography>
          </IconButton>
          <IconButton
            aria-label="Switch to English"
            color="inherit"
            size="small"
            style={buttonStyle}
          >
            <Typography fontSize={14}>EN</Typography>
          </IconButton>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default HeaderComp;
