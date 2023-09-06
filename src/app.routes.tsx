import React, { FC, Suspense } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import LoaderComp from './components/loader.comp';

// ======= private route ======= //
const PrivateRoute: FC<{ element: any }> = ({ element: Element }) => {
  return true ? (
    <Suspense fallback={<LoaderComp />}>
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
      <Route path="/profile/*" element={<PublicRoute element={ProfilePage} />} />
      <Route path="/*" element={<PublicRoute element={HomePage} />} />

      {/* PRIVATE */}
      <Route path="/carts/*" element={<PrivateRoute element={CartsPage} />} />

      {/* DEFAULT */}
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
};
export default AppRoutes;
