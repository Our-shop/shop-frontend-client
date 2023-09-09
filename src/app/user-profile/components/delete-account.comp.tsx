import React, { FC } from 'react';
import { Box, Button, Link, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import storage from '../../../local-storage/storage';
import jwt_decode from 'jwt-decode';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../../store';
import { deleteUser } from '../../user/store/user.actions';
import { signOut } from '../../auth/api/sign-out';
import { logout } from '../../auth/store/auth.slice';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const StyledBox = styled(Box)`
  margin-top: 20px;
  display: flex;
  flex-direction: column;
`;

const DeleteAccountComp: FC = () => {
  const dispatch = useDispatch<AppDispatch>();

  const { t } = useTranslation();

  const navigate = useNavigate();

  const token = storage.get('access-token') as string;
  const payload: { id: string; email: string; roleId: string; permissions: [] } = jwt_decode(token);
  const userId = payload.id;

  const handleClick = async (event: any) => {
    event.stopPropagation();
    await dispatch(deleteUser({ userId: userId })).then(() => {
      signOut();
      storage.clear();
      dispatch(logout());
      navigate('/');
    });
  };

  return (
    <StyledBox>
      <Typography variant="h5">{t('userProfile:If-delete-account')}</Typography>
      <Button
        type="submit"
        color="primary"
        variant="contained"
        sx={{ marginTop: '20px', width: '200px' }}
        onClick={(event) => handleClick(event)}
      >
        {t('userProfile:Delete-account')}
      </Button>
    </StyledBox>
  );
};

export default DeleteAccountComp;
