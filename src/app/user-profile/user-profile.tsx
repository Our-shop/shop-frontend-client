import React, { FC, useState } from 'react';
import PageLayoutComp from '../../components/page-layout.com';
import Sidebar from './components/side-bar';
import { Box } from '@mui/material';
import UserDeliveryComp from './components/user-delivery.comp';
import ForgotPswSettingsComp from './components/forgot-psw.settings.comp';
import DeleteAccountComp from './components/delete-account.comp';
import styled from '@emotion/styled';

const StyledBox = styled(Box)`
  padding-left: 30px;
  display: flex;
  flex-grow: 1;
`;

const allSettings = [
  { name: 'Edit user details', value: 'Edit user details' },
  { name: 'Delivery details', value: 'Delivery details' },
  { name: 'Forgot password', value: 'Forgot password' },
  { name: 'Orders history', value: 'Orders history' },
  { name: 'Delete account', value: 'Delete account' },
];

const UserProfilePage: FC = () => {
  const [settings, setSetting] = useState<string>(allSettings[0].value);

  const handleClick = (next: string) => {
    setSetting(next);
  };

  return (
    <PageLayoutComp sx={{ display: 'flex' }}>
      <Sidebar settings={settings} handleClick={handleClick} />
      <StyledBox>
        {settings === 'Edit user details' && <div>Edit user details content</div>}
        {settings === 'Delivery details' && <UserDeliveryComp />}
        {settings === 'Forgot password' && <ForgotPswSettingsComp />}
        {settings === 'Orders history' && <div>Orders history</div>}
        {settings === 'Delete account' && <DeleteAccountComp />}
      </StyledBox>
    </PageLayoutComp>
  );
};

export default UserProfilePage;
