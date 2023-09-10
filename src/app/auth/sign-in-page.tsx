import React, { FC, useState } from 'react';
import {
  Grid,
  Paper,
  Avatar,
  TextField,
  Button,
  Typography,
  Link,
  Snackbar,
  Alert,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import { colors } from '../../themes';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { NavLink as RouterLink, useNavigate } from 'react-router-dom';
import { Form, Formik, Field, ErrorMessage } from 'formik';
import { signInSchema } from './validation-schemas/sign-in.schema';
import BackHomeBtn from '../../components/ui/back.btn.comp';
import { useDispatch } from 'react-redux';
import storage from '../../local-storage/storage';
import jwt_decode from 'jwt-decode';
import { register } from './store/auth.slice';
import { isAxiosError } from 'axios';
import { DefaultError } from '../../types/error.type';
import { AppDispatch } from '../../store';
import { Tokens } from './types/tokens.type';
import { signIn } from './store/auth.actions';
import { useTranslation } from 'react-i18next';

const StyledPaper = styled(Paper)`
  padding: 20px;
  min-height: 50vh;
  width: 400px;
  margin: 70px auto 20px;
`;

const StyledAvatar = styled(Avatar)`
  background-color: ${colors.lightViolet};
  margin-bottom: 10px;
`;

interface FormValues {
  email: string;
  password: string;
}

const SignInPage: FC = () => {
  const [loading, setLoading] = useState(false);
  const [alertOpen, setAlertOpen] = useState(false);
  const [alertText, setAlertText] = useState('');

  const { t } = useTranslation();

  const initialValues: FormValues = {
    email: '',
    password: '',
  };

  const navigate = useNavigate();

  const closeAlert = () => {
    setAlertOpen(false);
  };

  const dispatch = useDispatch<AppDispatch>();

  const handleSubmit = async (values: FormValues, props: any) => {
    try {
      setLoading(true);
      const activeUser = {
        email: values.email,
        password: values.password,
      };

      const resultAction = await dispatch(signIn(activeUser));
      const data = resultAction.payload as Tokens;

      storage.set('access-token', data.access_token);
      storage.set('refresh-token', data.refresh_token);
      storage.set('at_expired', data.at_expiration);
      storage.set('rt_expired', data.rt_expiration);

      const payload: { id: string; email: string; roleId: string; permissions: [] } = jwt_decode(
        data.access_token,
      );
      dispatch(
        register({
          id: payload.id,
          email: payload.email,
          role_id: payload.roleId,
          permissions: payload.permissions,
          isRegistered: true,
        }),
      );

      // eslint-disable-next-line react/prop-types
      props.resetForm();
      navigate('/');
    } catch (error) {
      if (isAxiosError<DefaultError>(error)) {
        setAlertOpen(true);
        setAlertText(error.response?.data.message || error.message);
      } else {
        setAlertOpen(true);
        setAlertText(`${t('validation:Ooops')}`);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <Grid container justifyContent="center">
      <StyledPaper elevation={10}>
        <Grid container direction="column" alignItems="center">
          <StyledAvatar>
            <LockOutlinedIcon />
          </StyledAvatar>
          <Typography variant="h5" marginBottom={3}>
            {t('signIn:Sign-in')}
          </Typography>
        </Grid>
        <Formik
          initialValues={initialValues}
          onSubmit={handleSubmit}
          validationSchema={signInSchema}
        >
          {(props) => (
            <Form>
              <Field
                as={TextField}
                label={t('signIn:Email')}
                name="email"
                type="email"
                placeholder={t('signIn:Enter-email')}
                fullWidth
                required
                sx={{ marginBottom: '10px' }}
                helperText={<ErrorMessage name="email" />}
                autoComplete={t('signIn:Email')}
              />
              <Field
                as={TextField}
                label={t('signIn:Password')}
                name="password"
                placeholder={t('signIn:Enter-password')}
                type="password"
                fullWidth
                required
                helperText={<ErrorMessage name="password" />}
                autoComplete={t('signIn:Password')}
              />
              <Button
                type="submit"
                color="primary"
                variant="contained"
                fullWidth
                sx={{ margin: '8px 0' }}
                disabled={loading}
              >
                {loading ? `${t('signIn:Loading')}` : `${t('signIn:Sign-in')}`}
              </Button>
            </Form>
          )}
        </Formik>
        <Typography sx={{ marginTop: '5px' }}>
          <Link component={RouterLink} to="/auth/forgot-password">
            {t('signIn:Forgot-password')}
          </Link>
        </Typography>
        <Typography sx={{ marginTop: '5px' }}>{t('signIn:Do-you-have')}</Typography>
        <Typography sx={{ marginBottom: '15px' }}>
          <Link component={RouterLink} to="/auth/sign-up">
            {t('signIn:Sign-up')}
          </Link>
        </Typography>
        <BackHomeBtn />
      </StyledPaper>
      <Snackbar
        open={alertOpen}
        autoHideDuration={5000}
        onClose={closeAlert}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Alert variant="filled" severity="error">
          {alertText}
        </Alert>
      </Snackbar>
    </Grid>
  );
};

export default SignInPage;
