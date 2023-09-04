import React, { FC, Suspense } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import AuthPage from './app/auth';
import ProfilePage from './app/user-profile';
import { CircularProgress } from '@mui/material';

// ======= private route ======= //
const PrivateRoute: FC<{ element: any }> = ({ element: Element }) => {
  return true ? (
    <Suspense fallback={<div>PrivateRoute Loading...</div>}>
      <div>
        <Element />
      </div>
    </Suspense>
  ) : (
    <Navigate to={''} />
  );
};

// ======= public route ======= //
const PublicRoute: FC<{ element: any }> = ({ element: Element }) => (
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

// ======= pages ======= //
const ProductsPage = React.lazy(() => import('./app/products'));

const AppRoutes: FC = () => {
  return (
    <Routes>
      {/* PUBLIC */}
      <Route path="/products/*" element={<PublicRoute element={ProductsPage} />} />

      <Route path="/auth/*" element={<PublicRoute element={AuthPage} />} />

      <Route path="/profile/*" element={<PublicRoute element={ProfilePage} />} />

      {/* PRIVATE */}
      <Route path="/private/*" element={<PrivateRoute element={<>Private</>} />} />

      {/* DEFAULT */}
      <Route path="*" element={<Navigate to="/products" />} />
    </Routes>
  );
};
export default AppRoutes;
