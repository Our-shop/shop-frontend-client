import React, { FC, PropsWithChildren, Suspense } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import ProductDetailsPage from './product-details.page';

const Suspended: FC<PropsWithChildren & { element: any }> = ({ element: Element }) => {
  return (
    <Suspense fallback={<div>Products Loading...</div>}>
      <Element />
    </Suspense>
  );
};

// ======= pages ======= //
const ProductStorePage = React.lazy(() => import('./product-store.page'));

const ProductsRoutes: FC = () => {
  return (
    <Routes>
      <Route path="/" element={<Suspended element={ProductStorePage} />} />
      <Route path="/:category/:id" element={<Suspended element={ProductDetailsPage} />} />

      {/* DEFAULT */}
      <Route path="*" element={<Navigate to="/products" />} />
    </Routes>
  );
};

export default ProductsRoutes;
