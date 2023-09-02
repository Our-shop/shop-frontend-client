import React, { FC } from 'react';
import { Grid, Paper, Avatar, TextField, Button, Typography, Link, Theme } from '@mui/material';
import { styled } from '@mui/material/styles';
import { colors } from '../../themes';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';

const StyledPaper = styled(Paper)`
  padding: 20px;
  height: 50vh;
  width: 280px;
  margin: 50px auto 20px;
`;

const StyledAvatar = styled(Avatar)`
  background-color: ${colors.lightViolet};
  margin-bottom: 10px;
`;

const SignInPage: FC = () => {
  return (
    <Grid container justifyContent="center">
      <StyledPaper elevation={10}>
        <Grid container direction="column" alignItems="center">
          <StyledAvatar>
            <LockOutlinedIcon />
          </StyledAvatar>
          <Typography variant="h5" marginBottom={3}>
            Sign In
          </Typography>
        </Grid>
        <TextField
          label="Email"
          placeholder="Enter email"
          fullWidth
          required
          sx={{ marginBottom: '10px' }}
        />
        <TextField
          label="Password"
          placeholder="Enter password"
          type="password"
          fullWidth
          required
        />
        <Button
          type="submit"
          color="primary"
          variant="contained"
          fullWidth
          sx={{ margin: '8px 0' }}
        >
          Sign in
        </Button>
        <Typography sx={{ marginTop: '5px' }}>
          <Link href="#">Forgot password?</Link>
        </Typography>
        <Typography sx={{ marginTop: '5px' }}>Do you have an account?</Typography>
        <Typography>
          <Link href="#">Sign Up</Link>
        </Typography>
      </StyledPaper>
    </Grid>
  );
};

export default SignInPage;
