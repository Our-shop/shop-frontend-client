import React, { FC } from 'react';
import FooterComp from '../../components/footer.comp';
import ProfileRoutes from './profile.routes';

const ProfilePage: FC = () => {
  return (
    <>
      <ProfileRoutes />
      <FooterComp />
    </>
  );
};

export default ProfilePage;
