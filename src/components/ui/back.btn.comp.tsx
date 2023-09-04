import { Button, Link } from '@mui/material';
import { NavLink as RouterLink } from 'react-router-dom';
import { colors } from '../../themes';
import React, { FC } from 'react';
import { styled } from '@mui/material/styles';

const StyledBackBtn = styled(Button)`
  justify-content: center;
  align-items: center;
  border: 1px solid #fff;
`;

const BackHomeBtn: FC = () => {
  return (
    <Link component={RouterLink} to="/" color={colors.white}>
      <StyledBackBtn variant="contained">Go Back</StyledBackBtn>
    </Link>
  );
};
export default BackHomeBtn;
