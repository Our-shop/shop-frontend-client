import React, { FC, useState } from 'react';
import {
  AppBar,
  Box,
  Container,
  IconButton,
  List,
  ListItem,
  ListItemText,
  Toolbar,
  Typography,
} from '@mui/material';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import BackHomeBtn from '../../components/ui/back.btn.comp';
import styled from '@emotion/styled';

const StyledBox = styled(Box)`
  flex-grow: 1;
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
  const [selectedMenuItem, setSelectedMenuItem] = useState<string>('Home');

  const handleMenuItemClick = (item: string) => {
    setSelectedMenuItem(item);
  };

  return (
    <>
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
          <Container>
            {selectedMenuItem === 'Settings' && (
              <Typography variant="h4">Edit personal information</Typography>
            )}
            {selectedMenuItem === 'Edit address details' && (
              <Typography variant="h4">Edit address details</Typography>
            )}
            {selectedMenuItem === 'Forgot password' && (
              <Typography variant="h4">Forgot password</Typography>
            )}
            {selectedMenuItem === 'Delivery details' && (
              <Typography variant="h4">Delivery details</Typography>
            )}
            {selectedMenuItem === 'Orders history' && (
              <Typography variant="h4">Orders history</Typography>
            )}
            {selectedMenuItem === 'Delete account' && (
              <Typography variant="h4">Delete account</Typography>
            )}
          </Container>
        </StyledBox>
      </Box>
    </>
  );
};

export default UserProfilePage;
