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

const ProfileRoutes: FC = () => {
  return (
    <Routes>
      <Route path="/profile" element={<Suspended element={UserProfilePage} />} />
      {/*/!* DEFAULT *!/*/}
      <Route path="*" element={<Navigate to="./" replace />} />
    </Routes>
  );
};
export default ProfileRoutes;
