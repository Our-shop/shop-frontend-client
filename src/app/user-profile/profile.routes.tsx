import React, { FC, PropsWithChildren, Suspense } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import { CircularProgress } from '@mui/material';
import LoaderComp from '../../components/loader.comp';

const Suspended: FC<PropsWithChildren & { element: any }> = ({ element: Element }) => {
  return (
    <Suspense fallback={<LoaderComp />}>
      <Element />
    </Suspense>
  );
};

// ======= pages ======= //
const UserProfilePage = React.lazy(() => import('./user-profile'));
const UserDeliveryPage = React.lazy(() => import('./user-delivery-page'));
const UserAddAddressPage = React.lazy(() => import('./user-add-address'));

const ProfileRoutes: FC = () => {
  return (
    <Routes>
      <Route path="/" element={<Suspended element={UserProfilePage} />} />
      <Route path="/delivery-details" element={<Suspended element={UserDeliveryPage} />} />
      <Route path="/add-address" element={<Suspended element={UserAddAddressPage} />} />

      {/*/!* DEFAULT *!/*/}
      <Route path="*" element={<Navigate to="/profile" />} />
    </Routes>
  );
};
export default ProfileRoutes;
