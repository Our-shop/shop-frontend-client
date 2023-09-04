import React, { FC } from 'react';
import { Box, Button, Link, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import { NavLink as RouterLink } from 'react-router-dom';

const StyledBox = styled(Box)`
  margin-top: 20px;
  display: flex;
  flex-direction: column;
`;

const ForgotPswSettings: FC = () => {
  return (
    <StyledBox>
      <Typography variant="h5">
        If you are sure that you want to reset your password press the button below.
      </Typography>
      <Link component={RouterLink} to="/auth/forgot-password">
        <Button
          type="submit"
          color="primary"
          variant="contained"
          sx={{ marginTop: '20px', width: '15%' }}
        >
          Forgot password
        </Button>
      </Link>
    </StyledBox>
  );
};

export default ForgotPswSettings;
