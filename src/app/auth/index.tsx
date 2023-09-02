import React, { FC } from 'react';
import FooterComp from '../../components/footer.comp';
import AuthRoutes from './auth.routes';

const AuthPage: FC = () => {
  return (
    <>
      <AuthRoutes />
      <FooterComp />
    </>
  );
};

export default AuthPage;
