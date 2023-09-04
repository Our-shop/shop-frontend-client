import React, { FC, PropsWithChildren, Suspense } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import { CircularProgress } from '@mui/material';

const Suspended: FC<PropsWithChildren & { element: any }> = ({ element: Element }) => {
  return (
    <Suspense
      fallback={
        <CircularProgress
          sx={{
            position: 'absolute',
            top: '30%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
          }}
        />
      }
    >
      <Element />
    </Suspense>
  );
};

// ======= pages ======= //
const UserProfilePage = React.lazy(() => import('./user-profile'));
const UserDeliveryPage = React.lazy(() => import('./user-delivery-page'));
const UserAddAddressPage = React.lazy(() => import('./user-add-address'));
// const UserEditAddressPage = React.lazy(() => import('./user-edit-address'));

const ProfileRoutes: FC = () => {
  return (
    <Routes>
      <Route path="/" element={<Suspended element={UserProfilePage} />} />
      <Route path="/delivery-details" element={<Suspended element={UserDeliveryPage} />} />
      <Route path="/add-address" element={<Suspended element={UserAddAddressPage} />} />
      {/*<Route path="/edit-address/:id" element={<Suspended element={UserEditAddressPage} />} />*/}
      {/*/!* DEFAULT *!/*/}
      <Route path="*" element={<Navigate to="/profile" />} />
    </Routes>
  );
};
export default ProfileRoutes;
