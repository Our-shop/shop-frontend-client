import React, { FC, useState } from 'react';
import {
  AppBar,
  Box,
  IconButton,
  List,
  ListItem,
  ListItemText,
  Toolbar,
  Typography,
} from '@mui/material';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import styled from '@emotion/styled';
import BackHomeBtn from '../../components/ui/back.btn.comp';
import ForgotPswSettings from './components/forgot-psw.settings';
import DeleteAccountSettings from './components/delete-account.settings';

const StyledBox = styled(Box)`
  flex-grow: 1;
  justify-content: center;
  align-items: center;
  padding: 20px;
  margin-top: 70px;
`;

const menuItems: string[] = [
  'Settings',
  'Delivery details',
  'Forgot password',
  'Orders history',
  'Delete account',
];

const UserProfilePage: FC = () => {
  const [selectedMenuItem, setSelectedMenuItem] = useState<string>('Settings');

  const handleMenuItemClick = (item: string) => {
    setSelectedMenuItem(item);
  };

  return (
      <Box sx={{ display: 'flex' }}>
        <AppBar position="fixed">
          <Toolbar>
            <IconButton edge="start" color="inherit" aria-label="menu">
              <ManageAccountsIcon />
            </IconButton>
            <Typography variant="h6" noWrap marginRight={5}>
              User Profile
            </Typography>
            <BackHomeBtn />
          </Toolbar>
        </AppBar>
        <List sx={{ marginTop: '80px', width: '160px' }}>
          {menuItems.map((item: string, index: number) => (
            <ListItem
              button
              key={item}
              selected={selectedMenuItem === item}
              onClick={() => handleMenuItemClick(item)}
            >
              <ListItemText primary={item} />
            </ListItem>
          ))}
        </List>
        <StyledBox>
          <Box sx={{ marginLeft: '20px' }}>
            {selectedMenuItem === 'Settings' && (
              <Typography variant="h4">Edit personal information</Typography>
            )}
            {selectedMenuItem === 'Edit address details' && (
              <Typography variant="h4">Edit address details</Typography>
            )}
            {selectedMenuItem === 'Forgot password' && (
              <>
                <Typography variant="h4">Forgot password</Typography>
                <ForgotPswSettings />
              </>
            )}
            {selectedMenuItem === 'Delivery details' && (
              <Typography variant="h4">Delivery details</Typography>
            )}
            {selectedMenuItem === 'Orders history' && (
              <Typography variant="h4">Orders history</Typography>
            )}
            {selectedMenuItem === 'Delete account' && (
              <>
                <Typography variant="h4">Delete account</Typography>
                <DeleteAccountSettings />
              </>
            )}
          </Box>
        </StyledBox>
      </Box>
  );
};

export default UserProfilePage;
