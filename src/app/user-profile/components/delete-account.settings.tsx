import React, { FC } from 'react';
import { Box, Button, Link, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';

const StyledBox = styled(Box)`
  margin-top: 20px;
  display: flex;
  flex-direction: column;
`;

const DeleteAccountSettings: FC = () => {
  const handleClick = () => {
    console.log('deleted');
    // TODO add logic for deleting user by id
  };

  return (
    <StyledBox>
      <Typography variant="h5">
        If you are sure that you want to delete your account press the button below.
      </Typography>
      <Button
        color="primary"
        variant="contained"
        sx={{ marginTop: '20px', width: '15%' }}
        onClick={handleClick}
      >
        Delete account
      </Button>
    </StyledBox>
  );
};

export default DeleteAccountSettings;
