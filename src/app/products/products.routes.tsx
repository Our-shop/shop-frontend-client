import React, { FC, PropsWithChildren, Suspense } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';

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

      {/* DEFAULT */}
      <Route path="*" element={<Navigate to="/products" />} />
    </Routes>
  );
};

export default ProductsRoutes;
