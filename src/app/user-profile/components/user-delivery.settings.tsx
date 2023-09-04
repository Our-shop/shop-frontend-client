import React, { FC } from 'react';
import styled from '@emotion/styled';
import { Box, Grid, Link, Typography } from '@mui/material';
import { NavLink as RouterLink } from 'react-router-dom';

const StyledGrid = styled(Grid)`
  margin-top: 20px;
  display: flex;
  flex-direction: column;
`;

const Header = styled(Box)`
  display: flex;
  margin-bottom: 20px;
`;

const Tabs = styled(Typography)`
  font-size: 1.2em;
  margin-right: 20px;

  &:last-of-type {
    margin-right: 0;
  }
`;

const UserDeliverySettings: FC = () => {
  return (
    <StyledGrid>
      <Header>
        <Link
          component={RouterLink}
          to="/profile/delivery-details"
          sx={{ textDecoration: 'none', marginRight: '20px' }}
        >
          <Tabs>See all addresses</Tabs>
        </Link>
        <Link component={RouterLink} to="/profile/add-address" sx={{ textDecoration: 'none' }}>
          <Tabs>Add address</Tabs>
        </Link>
      </Header>
    </StyledGrid>
  );
};

export default UserDeliverySettings;
