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
const SignInPage = React.lazy(() => import('./sign-in-page'));
const SignUpPage = React.lazy(() => import('./sign-up-page'));
const ForgotPasswordPage = React.lazy(() => import('./forgot-password'));
const ResetPasswordPage = React.lazy(() => import('./reset-password'));

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
