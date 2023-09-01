import React, { FC, PropsWithChildren, Suspense } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import SignInPage from './sign-in-page';

const Suspended: FC<PropsWithChildren & { element: any }> = ({ element: Element }) => {
  return (
    <Suspense fallback={<div>Logging Loading...</div>}>
      <Element />
    </Suspense>
  );
};

// ======= pages ======= //
const AuthPage = React.lazy(() => import('./index'));

const AuthRoutes: FC = () => {
  return (
    <Routes>
      <Route path="/" element={<Suspended element={SignInPage} />} />

      {/*/!* DEFAULT *!/*/}
      {/*<Route path="*" element={<Navigate to="/?" />} />*/}
    </Routes>
  );
};

export default AuthRoutes;
