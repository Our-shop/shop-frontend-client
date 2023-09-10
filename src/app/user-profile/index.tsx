import React, { FC } from 'react';
import FooterComp from '../../components/footer.comp';
import ProfileRoutes from './profile.routes';
import HeaderComp from '../../components/header.comp';

const ProfilePage: FC = () => {
  return (
    <>
      <HeaderComp />
      <ProfileRoutes />
      <FooterComp />
    </>
  );
};

export default ProfilePage;
