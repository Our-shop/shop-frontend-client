import React, { FC } from 'react';
import { Button, Link } from '@mui/material';
import { NavLink as RouterLink } from 'react-router-dom';
import { colors } from '../../themes';
import { styled } from '@mui/material/styles';
import { useTranslation } from 'react-i18next';

const StyledBackBtn = styled(Button)`
  justify-content: center;
  align-items: center;
  border: 1px solid #fff;
`;

const BackHomeBtn: FC = () => {
  const { t } = useTranslation();

  return (
    <Link component={RouterLink} to="/" color={colors.white} data-testid="back-btn">
      <StyledBackBtn variant="contained">{t('signIn:Go-Back')}</StyledBackBtn>
    </Link>
  );
};
export default BackHomeBtn;
