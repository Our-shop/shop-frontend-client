import React, { FC } from 'react';
import { Avatar, Button, Grid, Link, Paper, TextField, Typography } from '@mui/material';
import LockResetIcon from '@mui/icons-material/LockReset';
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

const ResetPasswordPage: FC = () => {
  return (
    <Grid container justifyContent="center">
      <StyledPaper elevation={10}>
        <Grid container direction="column" alignItems="center">
          <StyledAvatar>
            <LockResetIcon />
          </StyledAvatar>
          <Typography variant="h5" marginBottom={3}>
            Reset password
          </Typography>
        </Grid>
        <Typography variant="h6" marginBottom={3} textAlign={'center'}>
          Please enter your email and new password:
        </Typography>
        <TextField
          label="Email"
          placeholder="Enter email"
          fullWidth
          required
          sx={{ marginBottom: '10px' }}
        />
        <TextField
          label="New password"
          placeholder="Enter new password"
          fullWidth
          required
          sx={{ marginBottom: '10px' }}
        />
        <TextField
          label="Dublicate new password"
          placeholder="Dublicate new password"
          fullWidth
          required
          sx={{ marginBottom: '10px' }}
        />
        <Button
          type="submit"
          color="primary"
          variant="contained"
          fullWidth
          sx={{ margin: '8px 0' }}
        >
          Save
        </Button>
      </StyledPaper>
    </Grid>
  );
};

export default ResetPasswordPage;
