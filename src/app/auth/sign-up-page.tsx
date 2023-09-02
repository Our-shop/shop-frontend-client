import React, { FC } from 'react';
import { Link } from '@mui/material';
import { NavLink as RouterLink } from 'react-router-dom';

const SignUpPage: FC = () => {
  return (
    <>
      Sign up page
      <Link component={RouterLink} to="/auth/sign-in">
        Sign In
      </Link>
    </>
  );
};

export default SignUpPage;
