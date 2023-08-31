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
const ProductTestPage = React.lazy(() => import('./product-test.page'));

const ProductsRoutes: FC = () => {
  return (
    <Routes>
      <Route path="/" element={<Suspended element={ProductTestPage} />} />

      {/* DEFAULT */}
      <Route path="*" element={<Navigate to="/products" />} />
    </Routes>
  );
};

export default ProductsRoutes;
