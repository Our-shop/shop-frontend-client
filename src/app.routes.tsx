import React, { FC, Suspense } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import LoaderComp from './components/loader.comp';
import storage from './local-storage/storage';
import jwt_decode from 'jwt-decode';

const isAllowed = () => {
  const token = storage.get('access-token') as string;

  if (token) {
    const payload: { id: string; email: string; roleId: string; permissions: [] } =
      jwt_decode(token);
    const userId = payload.id;
    if (userId) return true;
  }
  return false;
};

// ======= private route ======= //
const PrivateRoute: FC<{ element: any }> = ({ element: Element }) => {
  return isAllowed() ? (
    <Suspense fallback={<LoaderComp />}>
      <Element />
    </Suspense>
  ) : (
    <Navigate to={'/auth/sign-in-page'} />
  );
};

// ======= public route ======= //
const PublicRoute: FC<{ element: any }> = ({ element: Element }) => (
  <Suspense fallback={<LoaderComp />}>
    <Element />
  </Suspense>
);

// ======= pages ======= //
const ProductsPage = React.lazy(() => import('./app/products'));
const AuthPage = React.lazy(() => import('./app/auth'));
const HomePage = React.lazy(() => import('./app/home'));
const ProfilePage = React.lazy(() => import('./app/user-profile'));
const CartsPage = React.lazy(() => import('./app/carts'));

const AppRoutes: FC = () => {
  return (
    <Routes>
      {/* PUBLIC */}
      <Route path="/products/*" element={<PublicRoute element={ProductsPage} />} />
      <Route path="/auth/*" element={<PublicRoute element={AuthPage} />} />
      <Route path="/*" element={<PublicRoute element={HomePage} />} />

      {/* PRIVATE */}
      <Route path="/carts/*" element={<PrivateRoute element={CartsPage} />} />
      <Route path="/profile/*" element={<PrivateRoute element={ProfilePage} />} />

      {/* DEFAULT */}
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
};
export default AppRoutes;
