import React, { FC } from 'react';
import { Box, Button, Link, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import { NavLink as RouterLink } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const StyledBox = styled(Box)`
  margin-top: 20px;
  display: flex;
  flex-direction: column;
`;

const ForgotPswSettingsComp: FC = () => {
  const { t } = useTranslation();

  return (
    <StyledBox>
      <Typography variant="h5">{t('userProfile:If-reset-password')}</Typography>
      <Link component={RouterLink} to="/auth/forgot-password">
        <Button
          type="submit"
          color="primary"
          variant="contained"
          sx={{ marginTop: '20px', width: '200px' }}
        >
          {t('userProfile:Forgot-password')}
        </Button>
      </Link>
    </StyledBox>
  );
};

export default ForgotPswSettingsComp;
