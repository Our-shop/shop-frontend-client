import React, { FC } from 'react';
import { Avatar, Button, Grid, Link, Paper, TextField, Typography } from '@mui/material';
import LockResetIcon from '@mui/icons-material/LockReset';
import { NavLink as RouterLink } from 'react-router-dom';
import { colors } from '../../themes';
import { styled } from '@mui/material/styles';

const StyledPaper = styled(Paper)`
  padding: 20px;
  min-height: 50vh;
  width: 400px;
  margin: 50px auto 20px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const StyledAvatar = styled(Avatar)`
  background-color: ${colors.lightViolet};
  margin-bottom: 10px;
`;

const ForgotPasswordPage: FC = () => {
  return (
    <Grid container justifyContent="center">
      <StyledPaper elevation={10}>
        <Grid container direction="column" alignItems="center">
          <StyledAvatar>
            <LockResetIcon />
          </StyledAvatar>
          <Typography variant="h5" marginBottom={3}>
            Forgot password
          </Typography>
        </Grid>
        <Typography variant="h6" marginBottom={3} textAlign={'center'}>
          To restore the password please enter your email:
        </Typography>
        <TextField
          label="Email"
          placeholder="Enter email"
          fullWidth
          required
          sx={{ marginBottom: '10px' }}
        />
        <Link component={RouterLink} to="/auth/reset-password" color={colors.white}>
          <Button
            type="submit"
            color="primary"
            variant="contained"
            sx={{ margin: '20px auto 8px' }}
          >
            Restore password
          </Button>
        </Link>
      </StyledPaper>
    </Grid>
  );
};

export default ForgotPasswordPage;
