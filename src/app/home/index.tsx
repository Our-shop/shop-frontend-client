import React, { FC } from 'react';
import ProfileRoutes from '../user-profile/profile.routes';
import FooterComp from '../../components/footer.comp';
import HeaderComp from '../../components/header.comp';
import Home from './home';

const HomePage: FC = () => {
  return (
    <>
      <HeaderComp />
      <Home />
      <FooterComp />
    </>
  );
};

export default HomePage;
