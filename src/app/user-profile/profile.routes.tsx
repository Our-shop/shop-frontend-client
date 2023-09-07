import React, { FC, PropsWithChildren, Suspense } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
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

const ProfileRoutes: FC = () => {
  return (
    <Routes>
      <Route path="/" element={<Suspended element={UserProfilePage} />} />

      {/*/!* DEFAULT *!/*/}
      <Route path="*" element={<Navigate to="/profile" />} />
    </Routes>
  );
};
export default ProfileRoutes;
