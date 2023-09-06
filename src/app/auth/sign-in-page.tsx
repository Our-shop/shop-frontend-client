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
import { signIn } from './api/sign-in';
import storage from '../../local-storage/storage';
import jwt_decode from 'jwt-decode';
import { register } from './store/auth.slice';
import { isAxiosError } from 'axios';
import { DefaultError } from '../../types/error.type';

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

  const initialValues: FormValues = {
    email: '',
    password: '',
  };

  const navigate = useNavigate();

  const closeAlert = () => {
    setAlertOpen(false);
  };

  const dispatch = useDispatch();

  const handleSubmit = async (values: FormValues, props: any) => {
    console.log('Form values:', values);

    try {
      setLoading(true);
      const activeUser = {
        email: values.email,
        password: values.password,
      };
      const { data } = await signIn(activeUser);

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

      storage.set('userId', payload.id);

      props.resetForm();
      navigate('/');
    } catch (error) {
      if (isAxiosError<DefaultError>(error)) {
        setAlertOpen(true);
        setAlertText(error.response?.data.message || error.message);
      } else {
        setAlertOpen(true);
        setAlertText('Ooops...Something-went-wrong');
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
            Sign In
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
                label="Email"
                name="email"
                type="email"
                placeholder="Enter email"
                fullWidth
                required
                sx={{ marginBottom: '10px' }}
                helperText={<ErrorMessage name="email" />}
                autoComplete="email"
              />
              <Field
                as={TextField}
                label="Password"
                name="password"
                placeholder="Enter password"
                type="password"
                fullWidth
                required
                helperText={<ErrorMessage name="password" />}
                autoComplete="password"
              />
              <Button
                type="submit"
                color="primary"
                variant="contained"
                fullWidth
                sx={{ margin: '8px 0' }}
                disabled={loading}
              >
                {loading ? 'Loading' : 'Sign in'}
              </Button>
            </Form>
          )}
        </Formik>
        <Typography sx={{ marginTop: '5px' }}>
          <Link component={RouterLink} to="/auth/forgot-password">
            Forgot password?
          </Link>
        </Typography>
        <Typography sx={{ marginTop: '5px' }}>Do you have an account?</Typography>
        <Typography sx={{ marginBottom: '15px' }}>
          <Link component={RouterLink} to="/auth/sign-up">
            Sign Up
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
