import React, { FC, PropsWithChildren, Suspense } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import SignInPage from './sign-in-page';
import SignUpPage from './sign-up-page';
import ForgotPasswordPage from './forgot-password';
import ResetPasswordPage from './reset-password';

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
      <Route path="/sign-in" element={<Suspended element={SignInPage} />} />
      <Route path="/sign-up" element={<Suspended element={SignUpPage} />} />
      <Route path="/forgot-password" element={<Suspended element={ForgotPasswordPage} />} />
      <Route path="/reset-password" element={<Suspended element={ResetPasswordPage} />} />

      {/*/!* DEFAULT *!/*/}
      <Route path="*" element={<Navigate to="./sign-in" replace />} />
    </Routes>
  );
};

export default AuthRoutes;
