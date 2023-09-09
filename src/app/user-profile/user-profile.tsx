import React, { FC, useState } from 'react';
import { Box } from '@mui/material';
import styled from '@emotion/styled';
import PageLayoutComp from '../../components/page-layout.com';
import Sidebar from './components/side-bar';
import UserDeliveryComp from './components/user-delivery.comp';
import ForgotPswSettingsComp from './components/forgot-psw.settings.comp';
import DeleteAccountComp from './components/delete-account.comp';
import EditUserComp from './components/edit-user.comp';
import { useTranslation } from 'react-i18next';

const StyledBox = styled(Box)`
  padding-left: 30px;
  display: flex;
  flex-grow: 1;
`;

const UserProfilePage: FC = () => {
  const { t } = useTranslation();

  const allSettings = [
    { name: `${t('userProfile:Edit-user-details')}`, value: 'Edit user details' },
    { name: `${t('userProfile:Delivery-details')}`, value: 'Delivery details' },
    { name: `${t('userProfile:Forgot-password')}`, value: 'Forgot password' },
    { name: `${t('userProfile:Orders-history')}`, value: 'Orders history' },
    { name: `${t('userProfile:Delete-account')}`, value: 'Delete account' },
  ];

  const [settings, setSetting] = useState<string>(allSettings[0].value);
  console.log(settings);

  const handleClick = (next: string) => {
    setSetting(next);
  };

  return (
    <PageLayoutComp sx={{ display: 'flex' }}>
      <Sidebar settings={settings} handleClick={handleClick} />
      <StyledBox>
        {settings === 'Edit user details' && <EditUserComp />}
        {settings === 'Delivery details' && <UserDeliveryComp />}
        {settings === 'Forgot password' && <ForgotPswSettingsComp />}
        {settings === 'Orders history' && <div>Orders history</div>}
        {settings === 'Delete account' && <DeleteAccountComp />}
      </StyledBox>
    </PageLayoutComp>
  );
};

export default UserProfilePage;
